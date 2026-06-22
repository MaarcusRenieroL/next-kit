import { Cta } from "@/components/pages/home/cta";
import { Features } from "@/components/pages/home/features";
import { Hero } from "@/components/pages/home/hero";
import { Install } from "@/components/pages/home/install";
import { Integrations } from "@/components/pages/home/integrations";
import { Steps } from "@/components/pages/home/steps";

export default function Home() {
  return (
    <>
      <Hero />
      <Install />
      <Features />
      <Steps />
      <Integrations />
      <Cta />
    </>
  );
}
