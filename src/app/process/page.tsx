"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { ArrowRight, Search, PenTool, Code, Rocket, FileCheck, MessageSquare } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We discuss your goals, target audience, and preferences in a quick consultation call.",
    icon: Search,
  },
  {
    number: "02",
    title: "Proposal",
    description:
      "We send a transparent quote and timeline. No hidden fees, no surprises.",
    icon: MessageSquare,
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create a high-fidelity visual design for your approval.",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Build",
    description:
      "Our team develops your site using the latest tech stack (Next.js, Tailwind).",
    icon: Code,
  },
  {
    number: "05",
    title: "Review",
    description:
      "You review the live demo. We make refinements until it's perfect.",
    icon: FileCheck,
  },
  {
    number: "06",
    title: "Launch",
    description:
      "We go live! We also help with SEO setup and analytics integration.",
    icon: Rocket,
  },
];

export default function ProcessPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-warm-cream">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-deep-green relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-accent-green/[0.03] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full text-sm font-medium text-accent-green border border-white/10 mb-8">
                Our Process
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                How We Work
              </h1>
              <p className="text-lg md:text-xl text-muted-cream">
                A simple, transparent 6-step process designed for speed and
                quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Grid */}
        <section className="py-20 bg-dark-navy">
          <div className="container mx-auto px-6">
            <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-accent-green/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="text-4xl font-heading font-bold text-white/10 group-hover:text-accent-green/30 transition-colors">
                        {step.number}
                      </div>
                      <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-green" />
                      </div>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h2>
                    <p className="text-muted-cream leading-relaxed">
                      {step.description}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-deep-green border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-cream mb-10 max-w-2xl mx-auto">
                Book a free discovery call and let&apos;s discuss your project.
              </p>
              <a
                href="https://calendly.com/hello-websuem/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-accent-green text-deep-green font-bold text-lg rounded-xl hover:bg-bright-green hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
