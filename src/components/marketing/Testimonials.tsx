"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Founder",
    company: "Lumina Lighting",
    content: "Websuem delivered our e-commerce site in just 10 days. The attention to detail and conversion optimization exceeded our expectations. Our sales increased by 45% in the first month.",
    rating: 5,
    avatar: "SC",
    color: "bg-lavender",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "Vortex Analytics",
    content: "The rebranding transformed how our clients perceive us. Professional, modern, and perfectly aligned with our vision. The team was responsive and incredibly easy to work with.",
    rating: 5,
    avatar: "MR",
    color: "bg-cream",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Operations Director",
    company: "Nimbus AI",
    content: "The AI automation workflow they built saves us 20+ hours per week. Response times dropped by 85% and customer satisfaction is at an all-time high. Game changer for our business.",
    rating: 5,
    avatar: "EW",
    color: "bg-mint",
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="w-10 h-10 text-vibrant-yellow" aria-hidden="true" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-vibrant-yellow text-vibrant-yellow" aria-hidden="true" />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center`}>
          <span className="text-deep-purple font-semibold text-sm">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="font-semibold text-deep-purple">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
            What our clients say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what business owners have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
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
            <p className="text-3xl md:text-4xl font-bold text-deep-purple">100%</p>
            <p className="text-gray-500 text-sm">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-deep-purple">50+</p>
            <p className="text-gray-500 text-sm">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-deep-purple">12+</p>
            <p className="text-gray-500 text-sm">Countries Served</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-deep-purple">5.0</p>
            <p className="text-gray-500 text-sm">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
