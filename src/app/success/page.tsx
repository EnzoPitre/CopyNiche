import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-base text-text-primary flex items-center justify-center p-4">
      {/* Confetti animation placeholder via CSS pseudo elements could be added, or using a library. Assuming simple CSS-based or static for now without external libs */}
      <div className="glass-card max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="font-display text-4xl mb-4 text-text-primary">Paiement Réussi !</h1>
        <p className="text-text-secondary mb-8 text-lg">
          Merci pour votre achat. Votre compte a été mis à jour et vos nouveaux avantages sont déjà activés.
        </p>
        <Link href="/dashboard">
          <Button variant="primary" className="w-full text-lg h-12">
            Accéder au dashboard <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
