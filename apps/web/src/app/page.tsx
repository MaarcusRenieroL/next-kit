import { CommunitySection } from "@/components/pages/home/sections/community-section";
import { CtaSection } from "@/components/pages/home/sections/cta-section";
import { FeatureSection } from "@/components/pages/home/sections/feature-section";
import { HeroSection } from "@/components/pages/home/sections/hero-section";
import { HowItWorksSection } from "@/components/pages/home/sections/how-it-works-section";
import { IntegrationsSection } from "@/components/pages/home/sections/integrations-section";
import { QuickstartSection } from "@/components/pages/home/sections/quickstart-section";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-20 py-10">
      <HeroSection />
      <QuickstartSection />
      <HowItWorksSection />
      <FeatureSection />
      <IntegrationsSection />
      <CommunitySection />
      <CtaSection />
    </div>
  );
}
