import { CommunitySection } from "@/components/pages/home/sections/community-section";
import { FeatureSection } from "@/components/pages/home/sections/feature-section";
import { HeroSection } from "@/components/pages/home/sections/hero-section";
import { IntegrationsSection } from "@/components/pages/home/sections/integrations-section";
import { QuickstartSection } from "@/components/pages/home/sections/quickstart-section";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-20 py-10">
      <HeroSection />
      <QuickstartSection />
      <FeatureSection />
      <IntegrationsSection />
      <CommunitySection />
    </div>
  );
}
