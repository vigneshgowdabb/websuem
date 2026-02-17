"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, PenTool, Code, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn your goals",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description: "Concepts in 48-72hrs",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description: "Daily progress updates",
    icon: Code,
  },
  {
    number: "04",
    title: "Launch",
    description: "Go live with support",
    icon: Rocket,
  },
];

const ProcessPreview = () => {
  return (
    <section className="py-20 bg-deep-green">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-4">
            From idea to launch in 4 simple steps
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />

          {/* Animated line overlay */}
          <motion.div
            className="hidden md:block absolute top-1/2 left-0 h-px bg-accent-green -translate-y-1/2"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {/* Circle with icon */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto border border-accent-green/20">
                      <Icon className="w-8 h-8 text-accent-green" />
                    </div>
                    {/* Number badge */}
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent-green text-deep-green text-sm font-bold rounded-full flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-cream">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-accent-green font-semibold hover:gap-3 transition-all duration-300"
          >
            See our full process
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessPreview;
