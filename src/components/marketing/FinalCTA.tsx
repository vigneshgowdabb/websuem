"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-deep-purple via-deep-purple to-purple-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-vibrant-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-warm-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-vibrant-yellow rounded-full mb-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-deep-purple" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to build something{" "}
            <span className="text-vibrant-yellow">great?</span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-white/70 mb-10">
            Book a free 15-minute strategy call. No pitch, no pressure — just a
            conversation about your goals.
          </p>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-vibrant-yellow text-deep-purple font-bold text-lg rounded-xl hover:shadow-glow-lg transition-all duration-300"
            >
              Book Your Free Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Microcopy */}
          <p className="text-white/50 mt-6 text-sm">
            Usually responds within 2 hours • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
