"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Star,
  Shield,
  Clock,
  Sparkles,
  Globe,
  Palette,
  Bot,
  MessageCircle,
} from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    subtitle: "Perfect for new businesses",
    price: "1,500",
    period: "one-time",
    description:
      "Everything you need to establish your online presence and start attracting customers.",
    icon: Zap,
    color: "bg-mint",
    iconColor: "text-green-600",
    popular: false,
    features: [
      { name: "5-page responsive website", included: true },
      { name: "Mobile-optimized design", included: true },
      { name: "Contact form integration", included: true },
      { name: "Basic SEO setup", included: true },
      { name: "SSL certificate", included: true },
      { name: "1 month support", included: true },
      { name: "Social media integration", included: false },
      { name: "Custom animations", included: false },
      { name: "E-commerce functionality", included: false },
      { name: "AI automation", included: false },
    ],
    cta: "Get Started",
    deliveryTime: "7-10 days",
  },
  {
    name: "Professional",
    subtitle: "Most popular choice",
    price: "3,500",
    period: "one-time",
    description:
      "Comprehensive solution for growing businesses ready to scale their digital presence.",
    icon: Star,
    color: "bg-vibrant-yellow",
    iconColor: "text-deep-purple",
    popular: true,
    features: [
      { name: "10-page custom website", included: true },
      { name: "Mobile-optimized design", included: true },
      { name: "Advanced contact forms", included: true },
      { name: "Full SEO optimization", included: true },
      { name: "SSL certificate", included: true },
      { name: "3 months support", included: true },
      { name: "Social media integration", included: true },
      { name: "Custom animations", included: true },
      { name: "Basic e-commerce (up to 50 products)", included: true },
      { name: "Basic AI chatbot", included: false },
    ],
    cta: "Start Project",
    deliveryTime: "14-21 days",
  },
  {
    name: "Enterprise",
    subtitle: "Full-service solution",
    price: "7,500",
    period: "starting at",
    description:
      "Complete digital transformation with custom solutions, AI automation, and ongoing support.",
    icon: Shield,
    color: "bg-soft-pink",
    iconColor: "text-pink-600",
    popular: false,
    features: [
      { name: "Unlimited pages", included: true },
      { name: "Custom design system", included: true },
      { name: "Advanced integrations", included: true },
      { name: "Enterprise SEO strategy", included: true },
      { name: "SSL + security audit", included: true },
      { name: "12 months priority support", included: true },
      { name: "Full social media setup", included: true },
      { name: "Advanced animations", included: true },
      { name: "Full e-commerce solution", included: true },
      { name: "AI automation suite", included: true },
    ],
    cta: "Contact Us",
    deliveryTime: "4-8 weeks",
  },
];

const serviceAddons = [
  {
    name: "Social Media Management",
    price: "500",
    period: "/month",
    description: "Content creation, scheduling, and engagement across platforms",
    icon: MessageCircle,
  },
  {
    name: "Brand Identity Package",
    price: "1,200",
    period: "one-time",
    description: "Logo, color palette, typography, and brand guidelines",
    icon: Palette,
  },
  {
    name: "AI Automation Setup",
    price: "800",
    period: "one-time",
    description: "Custom workflows, chatbots, and process automation",
    icon: Bot,
  },
  {
    name: "International SEO",
    price: "600",
    period: "/month",
    description: "Multi-language optimization and global reach strategy",
    icon: Globe,
  },
];

const faqs = [
  {
    question: "What's included in the support period?",
    answer:
      "Our support includes bug fixes, content updates, security patches, and technical assistance. You'll have direct access to our team via email and chat during business hours. We also provide monthly performance reports and recommendations.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Absolutely! You can upgrade your plan at any time. We'll credit the difference and seamlessly transition your project to the higher tier with additional features and support.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment options. For projects over $2,000, you can split payments into 2-3 installments. We require 50% upfront to begin work, with the remainder due upon completion or in scheduled payments.",
  },
  {
    question: "What happens after the support period ends?",
    answer:
      "After your included support period, you can continue with our monthly maintenance plan starting at $150/month. This includes hosting management, security updates, content changes, and priority support.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a satisfaction guarantee. If you're not happy with our initial concepts within the first week, we'll refund your deposit. Once development begins based on approved designs, we work with you until you're satisfied with the result.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Each tier includes a set number of revision rounds. Starter includes 2 rounds, Professional includes 4 rounds, and Enterprise includes unlimited revisions. Additional revisions are billed at our hourly rate.",
  },
];

const PricingCard = ({
  tier,
  index,
}: {
  tier: (typeof pricingTiers)[0];
  index: number;
}) => {
  const Icon = tier.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`relative bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 ${
        tier.popular ? "ring-2 ring-vibrant-yellow scale-105 z-10" : ""
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-vibrant-yellow text-deep-purple text-sm font-bold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`w-12 h-12 ${tier.color} rounded-xl flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${tier.iconColor}`} />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-deep-purple">
              {tier.name}
            </h3>
            <p className="text-sm text-gray-500">{tier.subtitle}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-gray-500">{tier.period === "starting at" ? "Starting at" : ""}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-heading font-bold text-deep-purple">
              ${tier.price}
            </span>
            {tier.period === "/month" && (
              <span className="text-gray-500">/month</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">{tier.description}</p>

        {/* Delivery Time */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Clock className="w-4 h-4 text-warm-orange" />
          <span className="text-gray-600">
            Delivery: <strong>{tier.deliveryTime}</strong>
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature) => (
            <li key={feature.name} className="flex items-center gap-3">
              {feature.included ? (
                <Check className="w-5 h-5 text-mint flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
              )}
              <span
                className={
                  feature.included ? "text-gray-700" : "text-gray-400"
                }
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className={`block w-full text-center py-4 rounded-lg font-semibold transition-all duration-300 ${
            tier.popular
              ? "bg-vibrant-yellow text-deep-purple hover:shadow-glow"
              : "bg-deep-purple text-white hover:bg-deep-purple/90"
          }`}
        >
          {tier.cta}
        </Link>
      </div>
    </motion.div>
  );
};

const AddonCard = ({
  addon,
  index,
}: {
  addon: (typeof serviceAddons)[0];
  index: number;
}) => {
  const Icon = addon.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-lavender rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-deep-purple" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-deep-purple mb-1">{addon.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
          <p className="text-lg font-bold text-vibrant-yellow">
            ${addon.price}
            <span className="text-sm font-normal text-gray-500">
              {addon.period}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FAQItem = ({
  faq,
  index,
}: {
  faq: (typeof faqs)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-b border-gray-200 pb-6"
    >
      <h4 className="text-lg font-semibold text-deep-purple mb-2">
        {faq.question}
      </h4>
      <p className="text-gray-600">{faq.answer}</p>
    </motion.div>
  );
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-lavender to-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-deep-purple mb-6">
                <Sparkles className="w-4 h-4 text-vibrant-yellow" />
                Transparent Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-deep-purple mb-6">
                Simple, Honest Pricing
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                No hidden fees, no surprises. Choose a plan that fits your needs
                and budget. Every project includes our signature quality and
                dedicated support.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-mint" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-mint" />
                  <span>100% satisfaction guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-mint" />
                  <span>Flexible payment options</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <PricingCard key={tier.name} tier={tier} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* What's Included in All Plans */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mb-4">
                Included in Every Plan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Regardless of which tier you choose, you'll receive these
                essential features and benefits as standard.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Responsive Design",
                  description: "Perfect on every device, from phones to desktops",
                },
                {
                  title: "Performance Optimized",
                  description: "Fast loading speeds for better user experience",
                },
                {
                  title: "Source Code Access",
                  description: "Full ownership of your website's code",
                },
                {
                  title: "Training Session",
                  description: "1-on-1 walkthrough of your new website",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-soft text-center"
                >
                  <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-deep-purple mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                Enhance Your Project
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
                Add-On Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expand your digital presence with these complementary services.
                Add them to any plan or purchase separately.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {serviceAddons.map((addon, index) => (
                <AddonCard key={addon.name} addon={addon} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-lavender">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                Questions?
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem key={faq.question} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-deep-purple">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Not sure which plan is right for you?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Let's talk about your project. We'll help you choose the perfect
                solution for your business goals and budget.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-vibrant-yellow text-deep-purple font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
                >
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
