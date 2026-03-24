import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Dois-je payer un abonnement mensuel ?",
    answer: "Non, absolument pas. CopyNiche fonctionne avec un système de paiement unique (plan Starter ou Pro). Vous l'achetez une fois, il est à vous. Pas d'engagement.",
  },
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer: "Vous créez un compte sans renseigner votre carte bancaire. Nous vous offrons 5 générations complètes pour tester la qualité de notre IA. Si vous êtes convaincu, vous pouvez passer au plan Starter ou Pro.",
  },
  {
    question: "L'IA est-elle vraiment optimisée pour le e-commerce ?",
    answer: "Oui. Contrairement à ChatGPT qui génère du texte générique, notre système est fine-tuné avec les meilleures pratiques du copywriting (AIDA) et du SEO on-page pour convertir vos visiteurs en acheteurs.",
  },
  {
    question: "Puis-je exporter les fiches pour Shopify ?",
    answer: "Certainement. Les fiches sont générées en Markdown structuré avec des balises claires, ce qui permet un copier-coller parfait dans l'éditeur de description de Shopify ou WooCommerce.",
  },
  {
    question: "Quelle est la différence avec le plan Pro ?",
    answer: "Le plan Pro est conçu pour les agences ou les très grandes boutiques. Il offre des générations illimitées, la possibilité d'exporter l'historique en CSV et un support prioritaire.",
  }
];

export function Faq() {
  return (
    <section className="py-24 border-t border-border" id="faq">
      <div className="container px-4 mx-auto max-w-3xl">
        <h2 className="text-center font-display text-4xl mb-12">Questions fréquentes</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group glass-card overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-text-primary hover:text-accent transition-colors">
                {faq.question}
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5 text-text-muted" />
                </span>
              </summary>
              <div className="text-text-secondary p-6 pt-0 leading-relaxed border-t border-border/50 bg-black/20">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
