import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      generations: {
        take: 3,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) return null;

  const creditsPercent = user.plan === "PRO" ? 100 : Math.min(100, Math.max(0, (user.credits / (user.plan === "STARTER" ? 100 : 5)) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-display font-bold mb-2">Bonjour, {user.name || "Utilisateur"} 👋</h1>
           <p className="text-text-secondary">Voici un résumé de votre activité sur CopyNiche.</p>
        </div>
        <Link href="/generate">
          <Button variant="primary" className="gap-2">
            Nouvelle génération <Sparkles className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-32 h-32 text-accent" />
          </div>
          <CardHeader>
            <CardTitle>Vos Crédits</CardTitle>
            <CardDescription>
              {user.plan === "PRO" ? "Générations illimitées" : `${user.credits} génération(s) restante(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="w-full h-3 bg-surface border border-border rounded-full overflow-hidden mb-4">
               <div 
                 className={`h-full transition-all duration-1000 ${user.plan === "PRO" ? "bg-success" : "bg-accent"}`} 
                 style={{ width: `${creditsPercent}%` }} 
               />
             </div>
             {user.plan !== "PRO" && (
               <p className="text-sm text-text-muted">
                 Plan actuel : <span className="font-semibold text-text-primary capitalize">{user.plan.toLowerCase()}</span>
               </p>
             )}
          </CardContent>
        </Card>

        {user.plan === "FREE" && user.credits < 3 && (
          <Card className="border-accent/30 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Passer au Pro
              </CardTitle>
              <CardDescription>Vos crédits s'épuisent. Passez au niveau supérieur pour débloquer votre plein potentiel.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pricing">
                <Button className="w-full gap-2">
                  Voir les offres <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-text-muted" /> Dernières générations
          </h2>
          {user.generations.length > 0 && (
            <Link href="/history" className="text-sm text-accent hover:underline">Voir tout l'historique</Link>
          )}
        </div>
        
        {user.generations.length === 0 ? (
          <div className="text-center py-12 glass-card">
            <p className="text-text-muted mb-4">Vous n'avez pas encore généré de fiche produit.</p>
            <Link href="/generate">
              <Button variant="outline">Créer ma première fiche</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {user.generations.map((gen) => {
              const input = gen.input as any;
              return (
                <Card key={gen.id} className="hover:border-border-strong transition-colors">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base truncate">{input.productName}</CardTitle>
                    <CardDescription className="text-xs">{new Date(gen.createdAt).toLocaleDateString('fr-FR')}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs text-text-secondary line-clamp-3 mb-4 font-mono leading-relaxed opacity-70">
                      {gen.output.replace(/#/g, '')}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="flex gap-2">
                         <span className="text-[10px] uppercase font-bold px-2 py-1 bg-surface border border-border rounded text-text-muted">
                           {gen.platform}
                         </span>
                       </div>
                       <Link href={`/history`}>
                         <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Revoir</Button>
                       </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
