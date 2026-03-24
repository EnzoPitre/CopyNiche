"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const MOCK_OUTPUT = `# Écouteurs Sans Fil SoundMax Pro

Découvrez une immersion sonore absolue avec les SoundMax Pro. Conçus pour les passionnés de musique et les professionnels en mouvement, ils allient design élégant et technologie de pointe.

## Pourquoi vous allez les adorer

Le monde est bruyant. Votre musique ne devrait pas l'être. Grâce à notre système de réduction de bruit active (ANC) dernière génération, plongez dans votre bulle sonore en appuyant simplement sur un bouton.

L'autonomie n'est plus un problème : profitez de **30 heures d'écoute** ininterrompue avec le boîtier de charge rapide. Seulement 15 minutes de charge vous offrent 5h de musique.

* **Son Hi-Res Audio** : Des basses profondes et des aigus cristallins.
* **ANC adaptatif** : S'ajuste intelligemment à votre environnement.
* **Confort premium** : Embouts à mémoire de forme ultra-légers.
* **Étanchéité IPX4** : Résistants à la sueur et à la pluie.

## N'attendez plus
Rejoignez les milliers d'utilisateurs qui ont transformé leur façon d'écouter. Commandez vos SoundMax Pro aujourd'hui et profitez de la livraison expresse offerte.`;

export function LiveDemo() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setHasGenerated(false);
    setOutput("");

    let i = 0;
    const interval = setInterval(() => {
      setOutput(MOCK_OUTPUT.slice(0, i));
      i++;
      if (i > MOCK_OUTPUT.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setHasGenerated(true);
      }
    }, 10);
  };

  return (
    <section className="py-24 bg-surface/20" id="demo">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl mb-4">Essayez-le vous-même</h2>
          <p className="text-text-secondary text-lg">Testez un aperçu de la puissance de CopyNiche en direct, sans inscription.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Form */}
          <div className="glass-card p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">1</span>
              Décrivez votre produit
            </h3>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom du produit</label>
                <Input defaultValue="Écouteurs Sans Fil SoundMax Pro" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Caractéristiques</label>
                <Textarea 
                  defaultValue="30h autonomie, réduction bruit active, résistant eau IPX4, son Hi-Res"
                  className="h-24"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ton</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-base px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent">
                    <option>Persuasif</option>
                    <option>Luxe</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Boutique</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-base px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent">
                    <option>Shopify</option>
                    <option>WooCommerce</option>
                  </select>
                </div>
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full mt-6" 
                isLoading={isGenerating}
                disabled={hasGenerated}
              >
                Générer un extrait IA <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Output */}
          <div className="glass-card p-6 md:p-8 flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">2</span>
              Résultat
            </h3>
            <div className="flex-1 bg-base rounded-lg border border-border p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap text-text-secondary h-[400px]">
              {output || (
                <div className="h-full flex items-center justify-center text-text-muted text-center opacity-50">
                  Le résultat généré s'affichera ici en temps réel.
                </div>
              )}
              {isGenerating && <span className="animate-pulse inline-block w-2 h-4 bg-accent ml-1 -mb-1" />}
            </div>
            
            {hasGenerated && (
              <div className="absolute inset-0 bg-base/80 backdrop-blur-sm flex items-center justify-center p-6 text-center z-10 animate-in fade-in duration-500">
                <div className="bg-surface border border-border rounded-xl p-8 max-w-sm shadow-2xl">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Impressionné ?</h4>
                  <p className="text-text-secondary mb-6">Créez un compte pour voir la fiche complète et obtenir 5 générations offertes.</p>
                  <Link href="/login">
                    <Button variant="primary" className="w-full">
                      Créer un compte <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
