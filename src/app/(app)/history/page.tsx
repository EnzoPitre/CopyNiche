import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) return null;

  const generations = await prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Historique</h1>
          <p className="text-text-secondary">Retrouvez et réutilisez toutes vos générations passées.</p>
        </div>
      </div>

      <div className="border border-border rounded-xl bg-surface overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-surface/50 border-b border-border text-text-muted text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Produit</th>
              <th className="px-6 py-4">Plateforme</th>
              <th className="px-6 py-4">Ton</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {generations.map((gen) => {
              const input = gen.input as any;
              return (
                <tr key={gen.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                    {new Date(gen.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary">
                    {input?.productName || "Sans nom"}
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    <span className="inline-flex px-2 py-1 bg-border/50 rounded text-xs">{gen.platform}</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {gen.tone}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                         <Copy className="w-3.5 h-3.5 mr-1" /> Copier
                       </Button>
                       {/* Note: Delete logic requires an API route or server action. Left visual for demo completion. */}
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                         <Trash2 className="w-3.5 h-3.5" />
                       </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {generations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                  Aucun historique disponible. Générez votre première fiche produit !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
