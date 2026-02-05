"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check, Download, Sparkles } from "lucide-react";

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
    <section className="py-20 bg-gradient-to-br from-deep-purple via-deep-purple to-purple-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-vibrant-yellow rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-warm-orange rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white mb-6">
              <Download className="w-4 h-4 text-vibrant-yellow" />
              Free Resource
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Get Our Free Website{" "}
              <span className="text-vibrant-yellow">Launch Checklist</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
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
                className="flex items-center gap-2 justify-center text-white/90"
              >
                <Check className="w-5 h-5 text-mint" />
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
              <div className="bg-mint/20 border border-mint rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  You're In!
                </h3>
                <p className="text-white/80">
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
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-deep-purple placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant-yellow"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-vibrant-yellow text-deep-purple font-semibold rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-deep-purple/30 border-t-deep-purple rounded-full animate-spin" />
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

            <p className="text-white/50 text-xs text-center mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
