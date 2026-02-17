"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Globe, Share2, Zap, Palette, ArrowRight } from "lucide-react";

const services = [
  {
    id: "web",
    title: "Website Development",
    description:
      "Custom websites that convert visitors into customers. Mobile-first, blazing fast, SEO-ready.",
    longDescription:
      "We build modern, responsive websites using Next.js and Tailwind CSS. Every site is optimized for speed, SEO, and conversion. From landing pages to full e-commerce platforms.",
    icon: Globe,
    features: [
      "Custom Design",
      "Mobile-First",
      "SEO Optimized",
      "Fast Loading",
      "Analytics Ready",
    ],
  },
  {
    id: "social",
    title: "Social Media",
    description:
      "Content that builds your brand and engages your audience.",
    longDescription:
      "Strategic content creation and management for platforms like Instagram, LinkedIn, Twitter, and TikTok. We help you build a consistent brand voice and grow your following.",
    icon: Share2,
    features: [
      "Content Strategy",
      "Post Design",
      "Scheduling",
      "Analytics",
      "Community Management",
    ],
  },
  {
    id: "branding",
    title: "Brand Identity",
    description:
      "Logos, colors, and visual systems that resonate with your audience.",
    longDescription:
      "Complete branding packages including logo design, color palettes, typography, and brand guidelines. We create visual identities that make your business memorable.",
    icon: Palette,
    features: [
      "Logo Design",
      "Color System",
      "Typography",
      "Brand Guidelines",
      "Collateral Design",
    ],
  },
  {
    id: "automation",
    title: "AI Automation",
    description: "Save 10+ hours weekly with intelligent workflows.",
    longDescription:
      "Custom AI-powered workflows using tools like Make.com, Zapier, and Claude. Automate repetitive tasks, streamline operations, and scale your business efficiently.",
    icon: Zap,
    features: [
      "Workflow Design",
      "AI Integration",
      "Process Automation",
      "Custom Bots",
      "API Connections",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-warm-cream">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-deep-green relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-green/[0.03] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full text-sm font-medium text-accent-green border border-white/10 mb-8">
                What We Do
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                Our Services
              </h1>
              <p className="text-lg md:text-xl text-muted-cream max-w-2xl mx-auto">
                Comprehensive designs, automation, and strategies to help your
                business grow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-dark-navy">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.section
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/5 hover:border-accent-green/20 transition-all duration-300 scroll-mt-24"
                    aria-labelledby={`${service.id}-heading`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-accent-green/10 border border-accent-green/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon
                          className="w-7 h-7 text-accent-green"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h2
                          id={`${service.id}-heading`}
                          className="font-heading text-2xl font-bold text-white"
                        >
                          {service.title}
                        </h2>
                        <p className="text-muted-cream">{service.description}</p>
                      </div>
                    </div>

                    <p className="text-muted-cream mb-6 leading-relaxed">
                      {service.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium text-warm-cream border border-white/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 text-accent-green font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Learn more{" "}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </motion.section>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-deep-green border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                Ready to transform your online presence?
              </h2>
              <p className="text-lg text-muted-cream mb-10 max-w-2xl mx-auto">
                Whether you need a new website, a brand refresh, or AI
                automation, we deliver premium results in record time.
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
