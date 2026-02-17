"use client";

import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-deep-green relative overflow-hidden border-t border-white/5">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-green/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green/10 border border-accent-green/20 rounded-full mb-8">
            <Sparkles className="w-8 h-8 text-accent-green" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to build something{" "}
            <span className="text-accent-green">great?</span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-muted-cream mb-10">
            Book a free 15-minute strategy call. No pitch, no pressure — just a
            conversation about your goals.
          </p>

          {/* CTA Button */}
          <a
            href="https://calendly.com/hello-websuem/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent-green text-deep-green font-bold text-lg rounded-xl hover:bg-bright-green hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Your Free Call
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Microcopy */}
          <p className="text-muted-cream/50 mt-6 text-sm">
            Usually responds within 2 hours • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
