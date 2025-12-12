import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { OverviewSection } from "@/components/OverviewSection";
import { PlatformSection } from "@/components/PlatformSection";
import { ToxicitySection } from "@/components/ToxicitySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <OverviewSection />
        <PlatformSection />
        <ToxicitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
