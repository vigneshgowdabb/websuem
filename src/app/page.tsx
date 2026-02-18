import { Header } from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import TechStack from "@/components/marketing/TechStack";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import ProcessPreview from "@/components/marketing/ProcessPreview";
import NewsletterCTA from "@/components/marketing/NewsletterCTA";
import FinalCTA from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
      <Header />

      <main className="flex-grow">
        <Hero />
        <TechStack />
        <ServicesGrid />
        <ProcessPreview />
        <NewsletterCTA />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
