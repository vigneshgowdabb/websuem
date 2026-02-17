"use client";

import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-deep-green">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-green/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-green/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-40 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <div
            className="opacity-0 animate-[fadeUp_0.5s_ease-out_0.1s_forwards]"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full text-sm font-medium text-accent-green border border-white/10">
              AI-Powered Web Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-8xl font-heading font-bold leading-[1.1] tracking-tight">
            <span
              className="block text-white opacity-0 animate-[fadeUp_0.7s_ease-out_0.3s_forwards]"
            >
              Premium Websites.
            </span>
            <span
              className="block text-accent-green opacity-0 animate-[fadeUp_0.7s_ease-out_0.5s_forwards]"
            >
              Built in Days.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 text-lg md:text-xl text-muted-cream max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeUp_0.6s_ease-out_0.8s_forwards]"
          >
            I design and build high-performance websites using AI-powered
            workflows — delivering agency-quality results at startup speed.
          </p>

          {/* CTA */}
          <div
            className="mt-10 opacity-0 animate-[fadeUp_0.6s_ease-out_1s_forwards]"
          >
            <a
              href="https://calendly.com/hello-websuem/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-accent-green text-deep-green font-bold text-lg rounded-xl hover:bg-bright-green hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Discovery Call
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Verifiable trust indicators */}
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-0 animate-[fadeUp_0.6s_ease-out_1.2s_forwards]"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
              <span className="text-sm text-muted-cream">Solo founder, direct communication</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
              <span className="text-sm text-muted-cream">AI-enhanced delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
              <span className="text-sm text-muted-cream">Next.js + Tailwind stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-navy to-transparent" />
    </section>
  );
};

export default Hero;
