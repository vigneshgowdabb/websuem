"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, Sparkles, Globe, Zap } from "lucide-react";

const Hero = () => {
  // Word-by-word animation for headline
  const headlineWords = ["Meet", "the", "Super-fast", "AI", "Web", "Agency"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 0, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-lavender to-cream">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-vibrant-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-pink/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-deep-purple border border-deep-purple/10">
                <Sparkles className="w-4 h-4 text-vibrant-yellow" />
                AI-Powered Web Agency
              </span>
            </motion.div>

            {/* Headline with word-by-word animation */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-deep-purple leading-tight"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className={`inline-block mr-4 ${
                    word === "Super-fast" || word === "AI"
                      ? "text-vibrant-yellow"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl text-gray-600 max-w-lg"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              Premium websites, social media management & AI automation —
              delivered in days, not months.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-vibrant-yellow text-deep-purple font-semibold rounded-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Free Call
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-deep-purple font-semibold rounded-lg border-2 border-deep-purple/20 hover:border-deep-purple/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center gap-6 pt-4"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-mint rounded-full" />
                <span className="text-sm text-gray-600">100% Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-vibrant-yellow rounded-full" />
                <span className="text-sm text-gray-600">12+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warm-orange rounded-full" />
                <span className="text-sm text-gray-600">2hr Response</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Main mockup/visual placeholder */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white rounded-2xl shadow-soft-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Browser mockup header */}
              <div className="h-8 bg-gray-100 flex items-center gap-2 px-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gradient-to-br from-lavender to-soft-pink rounded-lg" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </motion.div>

            {/* Floating stat card 1 */}
            <motion.div
              className="absolute top-10 left-0 bg-white p-4 rounded-xl shadow-soft-lg border border-gray-100"
              variants={floatVariants}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-mint rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-purple">7 Days</p>
                  <p className="text-sm text-gray-500">Avg. Delivery</p>
                </div>
              </div>
            </motion.div>

            {/* Floating stat card 2 */}
            <motion.div
              className="absolute bottom-20 left-10 bg-white p-4 rounded-xl shadow-soft-lg border border-gray-100"
              variants={floatVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-soft-pink rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-purple">50+</p>
                  <p className="text-sm text-gray-500">Projects Done</p>
                </div>
              </div>
            </motion.div>

            {/* Floating stat card 3 */}
            <motion.div
              className="absolute top-20 right-0 bg-white p-4 rounded-xl shadow-soft-lg border border-gray-100"
              variants={floatVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-purple">12+</p>
                  <p className="text-sm text-gray-500">Countries</p>
                </div>
              </div>
            </motion.div>

            {/* Floating stat card 4 */}
            <motion.div
              className="absolute bottom-10 right-10 bg-vibrant-yellow p-4 rounded-xl shadow-glow"
              variants={floatVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-deep-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-purple">100%</p>
                  <p className="text-sm text-deep-purple/70">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-deep-purple/30 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-deep-purple/50 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
