import { Header } from "@/components/marketing/Header";
import Link from "next/link";
import { Footer } from "@/components/marketing/Footer";
import { Services } from "@/components/marketing/Services";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
      <Header />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-lavender to-cream">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
                <span className="bg-white/50 backdrop-blur-sm border border-white/60 px-4 py-2 rounded-full text-sm font-semibold tracking-wide text-deep-purple/80 uppercase">
                  AI-Powered Web Agency
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.1] mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
                Meet the Super-fast <br />
                <span className="text-deep-purple relative">
                  AI Web Agency
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-vibrant-yellow opacity-60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-deep-purple/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
                Premium websites, social media management & AI automation — delivered in days, not months.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
                <Button size="lg" className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 hover:shadow-glow text-base font-bold min-w-[180px]" asChild>
                  <Link href="/contact">Book a Free Call →</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-deep-purple text-deep-purple hover:bg-deep-purple hover:text-white text-base font-semibold min-w-[180px]" asChild>
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>

            {/* Floating Elements (Decorative) */}
            <div className="absolute top-1/4 left-10 md:left-20 animate-float hidden lg:block">
              <div className="bg-white p-4 rounded-2xl shadow-soft-lg rotate-[-6deg]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center text-xl">🚀</div>
                  <div>
                    <div className="font-bold text-sm">Fast Delivery</div>
                    <div className="text-xs text-gray-500">1-2 Weeks</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-10 md:right-20 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
              <div className="bg-white p-4 rounded-2xl shadow-soft-lg rotate-[6deg]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center text-xl">✨</div>
                  <div>
                    <div className="font-bold text-sm">Premium Quality</div>
                    <div className="text-xs text-gray-500">No Templates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Services (Bento Grid) */}
        <Services />

        {/* Section 3: Portfolio Preview */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-heading text-4xl font-bold text-deep-purple mb-4">
                  Recent Work
                </h2>
                <p className="text-lg text-gray-600">
                  Check out some of our latest projects and success stories.
                </p>
              </div>
              <Button variant="outline" className="border-deep-purple text-deep-purple hover:bg-deep-purple hover:text-white" asChild>
                <Link href="/portfolio">View All Projects →</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Importing ProjectCard dynamically would be ideal, but for now we'll inline a simplified version or reuse the component if we can import it. 
                   Let's assume we can use the component we just made. 
               */}
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-lavender relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-6xl text-deep-purple/10">L</div>
                </div>
                <div className="p-8">
                  <div className="text-vibrant-yellow font-bold text-xs uppercase tracking-wider mb-2">Website Development</div>
                  <h3 className="font-heading text-2xl font-bold text-deep-purple mb-2">Lumina E-Commerce</h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">High-conversion platform with AI recommendations.</p>
                  <span className="text-deep-purple font-semibold text-sm group-hover:underline decoration-vibrant-yellow decoration-2 underline-offset-4">View Case Study</span>
                </div>
                <Link href="/portfolio/lumina" className="absolute inset-0 z-10"><span className="sr-only">View Project</span></Link>
              </div>

              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-cream relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-6xl text-deep-purple/10">V</div>
                </div>
                <div className="p-8">
                  <div className="text-vibrant-yellow font-bold text-xs uppercase tracking-wider mb-2">Brand Identity</div>
                  <h3 className="font-heading text-2xl font-bold text-deep-purple mb-2">Vortex SaaS</h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">Complete rebranding for a data analytics platform.</p>
                  <span className="text-deep-purple font-semibold text-sm group-hover:underline decoration-vibrant-yellow decoration-2 underline-offset-4">View Case Study</span>
                </div>
                <Link href="/portfolio/vortex" className="absolute inset-0 z-10"><span className="sr-only">View Project</span></Link>
              </div>

              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-mint relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-6xl text-deep-purple/10">N</div>
                </div>
                <div className="p-8">
                  <div className="text-vibrant-yellow font-bold text-xs uppercase tracking-wider mb-2">AI Automation</div>
                  <h3 className="font-heading text-2xl font-bold text-deep-purple mb-2">Nimbus AI</h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">Automated customer support workflow reducing response time.</p>
                  <span className="text-deep-purple font-semibold text-sm group-hover:underline decoration-vibrant-yellow decoration-2 underline-offset-4">View Case Study</span>
                </div>
                <Link href="/portfolio/nimbus" className="absolute inset-0 z-10"><span className="sr-only">View Project</span></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-8">Trusted by businesses in 12+ countries</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
              {/* Logo placeholders - using text for now until SVGs are available */}
              {["HEIRESS", "TOZO", "HELLBYBIS", "cocokind", "Oxyfresh", "DOT & KEY"].map((logo) => (
                <span key={logo} className="font-heading font-bold text-2xl tracking-tight hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default">{logo}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
