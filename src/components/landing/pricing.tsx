import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Pour tester et approuver.",
    features: [
      "5 générations de fiches",
      "Tous les tons disponibles",
      "Export Markdown basique"
    ],
    button: "Commencer",
    popular: false,
    link: "/login"
  },
  {
    name: "Starter",
    price: "29",
    oldPrice: "49€",
    description: "Le plus populaire pour les petites boutiques.",
    features: [
      "100 générations de fiches",
      "Paiement unique (Pas d'abonnement)",
      "Tous les formats e-commerce",
      "Support standard"
    ],
    button: "Acheter Starter",
    popular: true,
    link: "/login"
  },
  {
    name: "Pro",
    price: "79",
    oldPrice: "149€",
    description: "Pour les agences et grosses boutiques.",
    features: [
      "Générations illimitées",
      "Paiement unique (Pas d'abonnement)",
      "Export CSV complet en masse",
      "Support prioritaire",
      "Accès aux futures nouveautés"
    ],
    button: "Devenir Pro",
    popular: false,
    link: "/login"
  }
];

export function Pricing() {
  return (
    <section className="py-32" id="pricing">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl lg:text-5xl mb-6">Des prix clairs. Pas d'abonnement.</h2>
          <p className="text-text-secondary text-lg">Payez une fois, utilisez à vie. Fini les abonnements mensuels SaaS inutiles.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular 
                  ? "bg-surface border-2 border-accent shadow-glow transition-all hover:-translate-y-2 z-10" 
                  : "bg-surface/50 border border-border hover:border-border-strong hover:-translate-y-1 transition-all mt-4 mb-4 md:mt-0 md:mb-0"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider py-1 px-3 bg-accent text-white rounded-full">
                  Le plus populaire
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-text-secondary text-sm h-10">{plan.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-display font-bold text-text-primary">{plan.price}€</span>
                {plan.oldPrice && <span className="text-text-muted line-through text-lg">{plan.oldPrice}</span>}
                {plan.price !== "0" && <span className="text-sm text-text-muted uppercase font-semibold block w-full">One-time payment</span>}
              </div>
              
              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-text-secondary items-start">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? "text-accent" : "text-text-muted"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={plan.link}>
                <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                  {plan.button}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
