"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Founder",
    company: "Lumina Lighting",
    content:
      "Websuem delivered our e-commerce site in just 10 days. The attention to detail and conversion optimization exceeded our expectations. Our sales increased by 45% in the first month.",
    rating: 5,
    avatar: "SC",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "Vortex Analytics",
    content:
      "The rebranding transformed how our clients perceive us. Professional, modern, and perfectly aligned with our vision. The team was responsive and incredibly easy to work with.",
    rating: 5,
    avatar: "MR",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Operations Director",
    company: "Nimbus AI",
    content:
      "The AI automation workflow they built saves us 20+ hours per week. Response times dropped by 85% and customer satisfaction is at an all-time high. Game changer for our business.",
    rating: 5,
    avatar: "EW",
  },
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-accent-green/20 transition-all duration-300"
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote
          className="w-10 h-10 text-accent-green/40"
          aria-hidden="true"
        />
      </div>

      {/* Rating */}
      <div
        className="flex gap-1 mb-4"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-accent-green text-accent-green"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-muted-cream leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-accent-green/10 border border-accent-green/20 rounded-full flex items-center justify-center">
          <span className="text-accent-green font-semibold text-sm">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-muted-cream">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-deep-green">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-cream max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what business
            owners have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
            <p className="text-muted-cream text-sm">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
            <p className="text-muted-cream text-sm">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">12+</p>
            <p className="text-muted-cream text-sm">Countries Served</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">5.0</p>
            <p className="text-muted-cream text-sm">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
