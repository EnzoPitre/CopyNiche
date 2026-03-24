export function SocialProof() {
  return (
    <section className="py-12 border-y border-border bg-surface/30">
      <div className="container px-4 mx-auto text-center">
        <p className="text-sm font-medium text-text-muted mb-8 uppercase tracking-widest">
          Déjà utilisé par 1 200+ e-commerçants sur
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {/* Shopify Placeholder SVG */}
          <div className="flex items-center gap-2 font-display text-2xl font-bold">
            <div className="w-8 h-8 rounded-md bg-[#95BF47]" />
            Shopify
          </div>
          {/* WooCommerce Placeholder SVG */}
          <div className="flex items-center gap-2 font-display text-2xl font-bold">
            <div className="w-8 h-8 rounded-md bg-[#96588A]" />
            WooCommerce
          </div>
          {/* Prestashop Placeholder SVG */}
          <div className="flex items-center gap-2 font-display text-2xl font-bold">
            <div className="w-8 h-8 rounded-md bg-[#DF0067]" />
            PrestaShop
          </div>
        </div>
      </div>
    </section>
  );
}
