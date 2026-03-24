import { stripe, PLANS } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error(`[WEBHOOK_ERROR] ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan as "STARTER" | "PRO";

    if (userId && plan) {
      const selectedPlan = PLANS[plan];

      // Insert Purchase
      await prisma.purchase.create({
        data: {
          userId,
          stripeId: session.id,
          plan: plan,
          amount: selectedPlan.amount,
        }
      });

      // Update User Plan and Credits
      if (plan === "PRO") {
        await prisma.user.update({
          where: { id: userId },
          data: { 
            plan: "PRO", 
            stripeId: session.customer as string,
            // PRO has unlimited credits, we represent it logic-side via plan.
          }
        });
      } else if (plan === "STARTER") {
        await prisma.user.update({
          where: { id: userId },
          data: { 
            plan: "STARTER", 
            stripeId: session.customer as string,
            credits: { increment: selectedPlan.credits }
          }
        });
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
