"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Supabase", category: "Backend" },
  { name: "Vercel", category: "Hosting" },
  { name: "Figma", category: "Design" },
  { name: "Shopify", category: "E-commerce" },
  { name: "Webflow", category: "No-code" },
  { name: "Make.com", category: "Automation" },
  { name: "Claude AI", category: "AI" },
];

const TechStack = () => {
  return (
    <section className="py-16 bg-dark-navy overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-cream text-sm uppercase tracking-wider font-medium">
            Powered by modern technology
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-navy to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-navy to-transparent z-10" />

          {/* Scrolling Logos */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Double the items for seamless loop */}
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] rounded-full whitespace-nowrap hover:bg-white/[0.06] border border-white/5 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-white/[0.08] rounded-lg flex items-center justify-center">
                    <span className="text-accent-green font-bold text-xs">
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-warm-cream font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          className="text-center text-muted-cream/60 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          We use the best tools to deliver exceptional results
        </motion.p>
      </div>
    </section>
  );
};

export default TechStack;
