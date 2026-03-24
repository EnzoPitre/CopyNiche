import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-strong bg-surface/50 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-text-secondary">✦ Propulsé par Claude AI</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl tracking-tight mb-6 max-w-4xl mx-auto">
          Des fiches produits qui vendent, <br className="hidden md:block" />
          <span className="text-gradient">générées en 10 secondes</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Stoppez le syndrome de la page blanche. Générez des descriptions e-commerce optimisées pour la conversion grâce à l'IA experte en copywriting.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-base group px-8">
              Essayer gratuitement
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-sm text-text-muted sm:hidden">5 générations offertes, sans CB</p>
        </div>
        <p className="hidden sm:block text-sm text-text-muted mt-4">5 générations offertes — Aucune carte requise</p>
        
        {/* Mockup Dashboard */}
        <div className="relative mt-20 mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent z-10" />
          <div className="glass-card overflow-hidden p-2 ring-1 ring-white/10 shadow-2xl">
            <div className="bg-bg-base/80 rounded-xl overflow-hidden border border-border">
              {/* Fake UI Header */}
              <div className="h-12 border-b border-border flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-border-strong" />
                  <div className="w-3 h-3 rounded-full bg-border-strong" />
                  <div className="w-3 h-3 rounded-full bg-border-strong" />
                </div>
              </div>
              {/* Fake UI Body */}
              <div className="p-8 grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <div className="h-4 w-1/4 bg-border rounded" />
                  <div className="h-10 w-full bg-surface border border-border rounded" />
                  <div className="h-4 w-1/3 bg-border rounded" />
                  <div className="h-24 w-full bg-surface border border-border rounded" />
                  <div className="h-10 w-1/3 bg-accent/20 rounded mt-4" />
                </div>
                <div className="space-y-4 font-mono text-sm text-text-secondary">
                  <p className="text-accent"># Montre Connectée Nova Pro</p>
                  <p>Découvrez la révolution au poignet. La Nova Pro repousse les limites de la technologie portable...</p>
                  <ul className="list-disc pl-4 space-y-2 mt-4 text-text-muted">
                     <li>Autonomie de 14 jours</li>
                     <li>Écran AMOLED ultra-lumineux</li>
                     <li>Suivi cardiaque 24/7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
