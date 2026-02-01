"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "lumina",
    title: "Lumina E-Commerce",
    category: "Website Development",
    description: "High-conversion platform with AI recommendations.",
    color: "from-blue-500 to-purple-600",
    stats: { conversion: "+45%", speed: "1.2s load" },
  },
  {
    id: "vortex",
    title: "Vortex SaaS",
    category: "Brand Identity",
    description: "Complete rebranding for a data analytics platform.",
    color: "from-orange-500 to-pink-600",
    stats: { brand: "100% new", deliverables: "25+" },
  },
  {
    id: "nimbus",
    title: "Nimbus AI",
    category: "AI Automation",
    description: "Automated customer support workflow.",
    color: "from-green-500 to-teal-600",
    stats: { time: "-80%", efficiency: "+300%" },
  },
];

const PortfolioCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Link href={`/portfolio/${project.id}`}>
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300">
          {/* Image container */}
          <div className="relative h-64 overflow-hidden">
            {/* Gradient placeholder */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-deep-purple/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="flex items-center gap-2 text-white font-semibold">
                View Project <ExternalLink className="w-4 h-4" />
              </span>
            </div>

            {/* Category badge */}
            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-deep-purple text-xs font-medium rounded-full">
              {project.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-heading font-semibold text-deep-purple mb-2 group-hover:text-warm-orange transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>

            {/* Stats */}
            <div className="flex gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-lg font-bold text-vibrant-yellow">
                    {value}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{key}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const PortfolioPreview = () => {
  return (
    <section className="py-20 bg-lavender">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2">
              The results speak for themselves
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-deep-purple font-semibold hover:gap-3 transition-all duration-300 mt-4 md:mt-0"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
