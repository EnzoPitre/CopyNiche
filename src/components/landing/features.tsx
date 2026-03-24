import { PenLine, Settings2, CopyCheck } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "1. Décris ton produit",
    description: "Indique simplement le nom du produit et ses quelques caractéristiques clés. Notre IA comprend immédiatement la valeur ajoutée de ton offre (30 secondes).",
  },
  {
    icon: Settings2,
    title: "2. Choisis ta cible",
    description: "Sélectionne le ton souhaité (professionnel, luxe, décontracté) et ta plateforme (Shopify, WooCommerce). La structure s'adapte automatiquement.",
  },
  {
    icon: CopyCheck,
    title: "3. Copie-colle",
    description: "Obtiens une fiche produit complète structurée en Markdown (AIDA, SEO on-page optimisé, bullet points) prête à être publiée sur ta boutique.",
  }
];

export function Features() {
  return (
    <section className="py-32 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-display text-4xl md:text-5xl mb-6">Comment ça marche ?</h2>
          <p className="text-text-secondary text-lg">
            Un processus simple pour passer d'une page blanche à une description produit hautement persuasive en quelques clics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-32 h-32 text-accent" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
