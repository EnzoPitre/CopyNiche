import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { anthropic, SYSTEM_PROMPT } from "@/lib/anthropic";
import { AnthropicStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { productName, category, features, audience, platform, tone, language } = body;

    if (!productName || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Rate limiting: max 10 req/min per user
    const oneMinuteAgo = new Date(Date.now() - 60000);
    const recentGens = await prisma.generation.count({
      where: {
        userId,
        createdAt: { gte: oneMinuteAgo }
      }
    });

    if (recentGens >= 10) {
      return NextResponse.json({ error: "Rate limit exceeded. Please wait a minute." }, { status: 429 });
    }

    // Check credits
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true, plan: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.plan !== "PRO" && user.credits <= 0) {
      return NextResponse.json({ error: "Insufficient credits. Please upgrade your plan." }, { status: 403 });
    }

    const userPrompt = `Produit : ${productName}
Catégorie : ${category}
Caractéristiques : ${features || "Non spécifiées"}
Public cible : ${audience || "Grand public"}
Plateforme cible : ${platform || "Générique"}
Ton souhaité : ${tone || "Professionnel"}
Langue souhaitée : ${language || "FR"}`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
      stream: true,
    });
    
    const stream = AnthropicStream(response, {
      onCompletion: async (completion: string) => {
        // Decrement credit if not PRO
        if (user.plan !== "PRO") {
          await prisma.user.update({
             where: { id: userId },
             data: { credits: { decrement: 1 } }
          });
        }
        
        // Save generation
        await prisma.generation.create({
           data: {
             userId,
             input: body,
             output: completion,
             platform: platform || "Générique",
             tone: tone || "Professionnel"
           }
        });
      }
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("[GENERATE_ERROR]", error);
    return NextResponse.json({ error: "An error occurred during generation" }, { status: 500 });
  }
}
