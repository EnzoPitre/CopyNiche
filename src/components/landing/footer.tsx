import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-base text-sm pt-16 pb-8">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <span>CopyNiche</span>
            </Link>
            <p className="text-text-secondary leading-relaxed">
              Le générateur de fiches produits ultime pour Shopify et WooCommerce. Gagnez du temps et boostez vos ventes.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h4 className="font-semibold mb-4 text-text-primary">Produit</h4>
              <ul className="space-y-3 text-text-secondary">
                <li><Link href="#demo" className="hover:text-accent transition-colors">Demo</Link></li>
                <li><Link href="#pricing" className="hover:text-accent transition-colors">Tarifs</Link></li>
                <li><Link href="#faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-text-primary">Légal</h4>
              <ul className="space-y-3 text-text-secondary">
                <li><Link href="#" className="hover:text-accent transition-colors">CGV</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Politique de confidentialité</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-text-muted">
          <p>© {new Date().getFullYear()} CopyNiche. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-1">
            Fait avec <span className="text-accent">♥</span> par un entrepreneur pour les entrepreneurs.
          </div>
        </div>
      </div>
    </footer>
  );
}
