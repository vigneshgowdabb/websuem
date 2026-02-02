"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, Palette, Zap } from "lucide-react";

const projects = [
  {
    id: "lumina",
    title: "Lumina E-Commerce",
    category: "Website Development",
    description: "High-conversion platform with AI recommendations.",
    bgColor: "bg-lavender",
    gradientColor: "bg-gradient-to-r from-purple-200 to-pink-200",
    icon: Globe,
    stats: [
      { label: "Conversion", value: "+45%" },
      { label: "Load Time", value: "1.2s" },
    ],
  },
  {
    id: "vortex",
    title: "Vortex SaaS",
    category: "Brand Identity",
    description: "Complete rebranding for a data analytics platform.",
    bgColor: "bg-cream",
    gradientColor: "bg-gradient-to-r from-orange-200 to-yellow-200",
    icon: Palette,
    stats: [
      { label: "Deliverables", value: "25+" },
      { label: "Timeline", value: "2 Weeks" },
    ],
  },
  {
    id: "nimbus",
    title: "Nimbus AI",
    category: "AI Automation",
    description: "Automated customer support workflow.",
    bgColor: "bg-mint",
    gradientColor: "bg-gradient-to-r from-green-200 to-teal-200",
    icon: Zap,
    stats: [
      { label: "Time Saved", value: "80%" },
      { label: "Efficiency", value: "+300%" },
    ],
  },
];

const PortfolioCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Link href={`/portfolio/${project.id}`}>
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-300">
          {/* Image container with browser mockup */}
          <div className={`relative h-64 overflow-hidden ${project.bgColor}`}>
            {/* Browser Mockup */}
            <div className="absolute inset-3 md:inset-4 bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Browser Header */}
              <div className="h-6 bg-gray-100 flex items-center gap-1.5 px-3">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="ml-2 flex-1 h-3 bg-gray-200 rounded-full max-w-[80px]" />
              </div>

              {/* Mockup Content */}
              <div className="p-3 space-y-2">
                {/* Nav placeholder */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-3 bg-gray-200 rounded" />
                  <div className="flex gap-1.5">
                    <div className="w-8 h-2 bg-gray-100 rounded" />
                    <div className="w-8 h-2 bg-gray-100 rounded" />
                  </div>
                </div>

                {/* Hero placeholder */}
                <div className={`h-20 rounded-lg ${project.gradientColor}`} />

                {/* Content placeholders */}
                <div className="space-y-1.5">
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>

                {/* Card grid placeholder */}
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-8 bg-gray-50 rounded" />
                  <div className="h-8 bg-gray-50 rounded" />
                  <div className="h-8 bg-gray-50 rounded" />
                </div>
              </div>
            </div>

            {/* Category Icon Badge */}
            <div className="absolute top-2 left-2 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center">
              <Icon className="w-5 h-5 text-deep-purple" aria-hidden="true" />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-deep-purple/0 group-hover:bg-deep-purple/30 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                <span className="text-deep-purple font-semibold text-sm">View Project</span>
                <ArrowRight className="w-4 h-4 text-deep-purple" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="text-xs font-bold text-vibrant-yellow uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-xl font-heading font-semibold text-deep-purple mt-1 mb-2 group-hover:text-warm-orange transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>

            {/* Stats */}
            <div className="flex gap-6">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-bold text-vibrant-yellow">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
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
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
