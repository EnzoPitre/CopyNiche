"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, Download, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Hook custom — remplace useCompletion de ai/react
function useCompletion(apiPath: string) {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const complete = useCallback(async (body: object) => {
    setIsLoading(true);
    setCompletion("");
    setError(null);

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de la génération");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("Streaming non supporté");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setCompletion(prev => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erreur inconnue"));
    } finally {
      setIsLoading(false);
    }
  }, [apiPath]);

  return { completion, complete, isLoading, error };
}

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "Mode",
    features: "",
    audience: "",
    platform: "Shopify",
    tone: "Professionnel",
    language: "FR",
  });

  const [copied, setCopied] = useState(false);
  const { completion, complete, isLoading, error } = useCompletion("/api/generate");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await complete(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToneChange = (tone: string) => {
    setFormData(prev => ({ ...prev, tone }));
  };

  const handleCopy = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!completion) return;
    const blob = new Blob([completion], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fiche-${formData.productName.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Générateur intelligent</h1>
        <p className="text-text-secondary">
          Remplissez les informations ci-dessous pour créer votre fiche produit.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Column */}
        <Card className="border-border">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Nom du produit <span className="text-red-400">*</span>
                </label>
                <Input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Ex: Montre Nova Pro"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Catégorie <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  {["Mode", "Électronique", "Maison", "Beauté", "Sport", "Autre"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Caractéristiques clés</label>
                <Textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder={"Appuyez sur Entrée pour séparer les points. Ex:\n- Autonomie 24h\n- Étanche IP68"}
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Public cible</label>
                <Input
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="Ex: Femmes 25-40 ans actives"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plateforme</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    {["Shopify", "WooCommerce", "Générique"].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Langue</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    {["FR", "EN", "ES", "DE"].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block">Ton de la rédaction</label>
                <div className="flex flex-wrap gap-2">
                  {["Professionnel", "Casual", "Luxe", "Joueur"].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleToneChange(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${formData.tone === t
                          ? "bg-accent/20 border-accent text-accent"
                          : "bg-surface border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error.message}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-base"
                isLoading={isLoading}
                disabled={!formData.productName || isLoading}
              >
                Générer (consomme 1 crédit) <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Output Column */}
        <Card className="border-border flex flex-col min-h-[600px] overflow-hidden">
          <div className="p-4 border-b border-border bg-surface/50 flex items-center justify-between">
            <h3 className="font-semibold text-sm">Aperçu du résultat</h3>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDownload}
                disabled={!completion || isLoading}
              >
                <Download className="w-4 h-4 mr-2" /> .TXT
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                disabled={!completion || isLoading}
                className="w-24"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-success transition-all scale-110" />
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copier</>
                )}
              </Button>
            </div>
          </div>
          <div className="p-6 flex-1 bg-[#111] overflow-y-auto font-mono text-sm leading-relaxed text-text-secondary whitespace-pre-wrap relative">
            {completion || (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted opacity-50 px-8 text-center">
                <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                <p>La magie opérera ici.</p>
                <p className="text-xs mt-2">Prêt à attirer de nouveaux clients ?</p>
              </div>
            )}
            {isLoading && (
              <span className="animate-pulse inline-block w-2 h-4 bg-accent ml-1 -mb-1" />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}