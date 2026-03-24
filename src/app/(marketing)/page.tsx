import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Features } from "@/components/landing/features";
import { LiveDemo } from "@/components/landing/live-demo";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function MarketingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-base text-text-primary select-none">
      <Hero />
      <SocialProof />
      <Features />
      <LiveDemo />
      <Pricing />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}
