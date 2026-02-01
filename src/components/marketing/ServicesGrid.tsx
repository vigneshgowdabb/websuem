"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Smartphone, Zap, Palette, ArrowRight } from "lucide-react";

const services = [
  {
    id: "web",
    title: "Website Development",
    description:
      "Custom websites that convert visitors into customers. Mobile-first, blazing fast, SEO-ready.",
    icon: Globe,
    color: "bg-sky",
    iconColor: "text-blue-600",
    tag: "1-2 Week Delivery",
    tagColor: "bg-mint text-green-700",
    size: "large",
    href: "/services#web",
  },
  {
    id: "social",
    title: "Social Media",
    description:
      "Content that builds your brand and engages your audience.",
    icon: Smartphone,
    color: "bg-soft-pink",
    iconColor: "text-pink-600",
    tag: "Monthly Plans",
    tagColor: "bg-soft-pink text-pink-700",
    size: "small",
    href: "/services#social",
  },
  {
    id: "automation",
    title: "AI Automation",
    description: "Save 10+ hours weekly with intelligent workflows.",
    icon: Zap,
    color: "bg-vibrant-yellow/30",
    iconColor: "text-yellow-700",
    tag: "Custom Solutions",
    tagColor: "bg-vibrant-yellow text-deep-purple",
    size: "small",
    href: "/services#automation",
  },
  {
    id: "branding",
    title: "Brand Identity",
    description: "Logos, colors, and visual systems that resonate.",
    icon: Palette,
    color: "bg-lavender",
    iconColor: "text-purple-600",
    tag: "Full Package",
    tagColor: "bg-lavender text-purple-700",
    size: "small",
    href: "/services#branding",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const Icon = service.icon;
  const isLarge = service.size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`${isLarge ? "md:row-span-2" : ""}`}
    >
      <Link href={service.href}>
        <div
          className={`group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-300 h-full ${
            isLarge ? "min-h-[400px]" : "min-h-[200px]"
          }`}
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6`}
          >
            <Icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>

          {/* Tag */}
          <span
            className={`inline-block px-3 py-1 ${service.tagColor} text-xs font-medium rounded-full mb-4`}
          >
            {service.tag}
          </span>

          {/* Content */}
          <h3 className="text-xl font-heading font-semibold text-deep-purple mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-6">{service.description}</p>

          {/* Arrow */}
          <div className="flex items-center gap-2 text-deep-purple font-medium group-hover:gap-3 transition-all duration-300">
            Learn more
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-vibrant-yellow/0 to-vibrant-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
            A web agency designed for growth
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built to help you stand out, convert visitors, and save time with
            the power of AI.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large card - Website Development */}
          <ServiceCard service={services[0]} index={0} />

          {/* Small cards */}
          <div className="space-y-6">
            <ServiceCard service={services[1]} index={1} />
            <ServiceCard service={services[2]} index={2} />
          </div>

          {/* Brand Identity + Stats Card */}
          <div className="space-y-6">
            <ServiceCard service={services[3]} index={3} />

            {/* Stats mini card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-deep-purple p-8 rounded-2xl text-white"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-vibrant-yellow">50+</p>
                  <p className="text-white/70 text-sm">Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-vibrant-yellow">12+</p>
                  <p className="text-white/70 text-sm">Countries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-vibrant-yellow">&lt;7</p>
                  <p className="text-white/70 text-sm">Day Delivery</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-vibrant-yellow">100%</p>
                  <p className="text-white/70 text-sm">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
