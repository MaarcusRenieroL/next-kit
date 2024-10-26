import { CommunitySection } from "@/components/pages/home/sections/community-section";
import { FeatureSection } from "@/components/pages/home/sections/feature-section";
import { HeroSection } from "@/components/pages/home/sections/hero-section";

export default function Home() {
  return (
    <div className="h-full w-full">
      <HeroSection />
      <FeatureSection />
      <CommunitySection />
    </div>
  );
}
