const testimonials = [
  {
    name: "Sarah M.",
    role: "Fondatrice, Myla Jewelry",
    content: "Avant CopyNiche, je passais 45 minutes par fiche produit à chercher mes mots. Maintenant ça me prend littéralement 2 minutes. La qualité du texte généré est bluffante, surtout pour le ton Luxe que j'utilise.",
    rating: 5,
  },
  {
    name: "Thomas D.",
    role: "Expert Shopify",
    content: "Mes taux de conversion ont augmenté de 12% depuis que j'utilise cet outil pour les boutiques de mes clients. La structure AIDA appliquée par défaut fait toute la différence.",
    rating: 5,
  },
  {
    name: "Alexia V.",
    role: "Propriétaire E-commerce",
    content: "Le fait de payer en une fois m'a convaincue. Marre des outils d'IA à 30€ par mois que j'utilise une fois tous les 15 jours. Et le résultat est meilleur que ChatGPT.",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-24 border-t border-border bg-surface/10">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-display text-4xl md:text-5xl mb-16">Ils ont boosté leurs ventes</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-8">
              <div className="flex gap-1 mb-4 text-[#F59E0B]">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-text-primary leading-relaxed mb-6 font-medium">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-border-strong flex items-center justify-center text-accent font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
