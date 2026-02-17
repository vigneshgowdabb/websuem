"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check, Download } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - replace with actual newsletter signup logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-dark-navy via-dark-navy to-deep-green relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-white mb-6 border border-white/5">
              <Download className="w-4 h-4 text-accent-green" />
              Free Resource
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Get Our Free Website{" "}
              <span className="text-accent-green">Launch Checklist</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              50+ essential checks before going live. Plus, get weekly insights
              on web design, AI automation, and growing your business online.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            {[
              "50+ pre-launch checks",
              "SEO optimization tips",
              "Performance best practices",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 justify-center text-white/80"
              >
                <Check className="w-5 h-5 text-accent-green" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-accent-green" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  You&apos;re In!
                </h3>
                <p className="text-white/70">
                  Check your inbox for the download link. Welcome to the
                  Websuem community!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-cream/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.05] text-warm-cream placeholder-muted-cream/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-green text-deep-green font-semibold rounded-xl hover:bg-bright-green hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-deep-green/30 border-t-deep-green rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Get Free Checklist
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {error && (
              <p className="text-red-400 text-sm text-center mt-3">{error}</p>
            )}

            <p className="text-white/30 text-xs text-center mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
