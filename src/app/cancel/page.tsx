import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-base text-text-primary flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="font-display text-4xl mb-4 text-text-primary">Paiement Annulé</h1>
        <p className="text-text-secondary mb-8 text-lg">
          Vous n'avez pas été débité. Vous pouvez réessayer quand vous le souhaitez.
        </p>
        <Link href="/pricing">
          <Button variant="outline" className="w-full text-lg h-12">
            <ArrowLeft className="w-5 h-5 mr-2" /> Retour aux tarifs
          </Button>
        </Link>
      </div>
    </div>
  );
}
