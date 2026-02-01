import { Header } from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import StatsSection from "@/components/marketing/StatsSection";
import ProcessPreview from "@/components/marketing/ProcessPreview";
import PortfolioPreview from "@/components/marketing/PortfolioPreview";
import FinalCTA from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
      <Header />

      <main className="flex-grow">
        <Hero />
        <ServicesGrid />
        <StatsSection />
        <ProcessPreview />
        <PortfolioPreview />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
