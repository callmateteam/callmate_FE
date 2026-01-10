import CTASection from "@/components/landing/CTASection";
import FeatureSection from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/HeroSection";
import HowltWorksSection from "@/components/landing/HowltWorksSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeatureSection />
      <HowltWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
