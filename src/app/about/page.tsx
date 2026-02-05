"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import {
  ArrowRight,
  Award,
  Users,
  Zap,
  Target,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Globe,
  Code,
  Palette,
  Bot,
} from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "50+", icon: CheckCircle },
  { label: "Happy Clients", value: "40+", icon: Heart },
  { label: "Countries Served", value: "12", icon: Globe },
  { label: "Avg. Delivery Time", value: "14 days", icon: Clock },
];

const values = [
  {
    title: "Quality First",
    description:
      "Every deliverable reflects expertise and attention to detail. We never compromise on quality.",
    icon: Award,
    color: "bg-lavender",
  },
  {
    title: "Speed Second",
    description:
      "Most projects delivered in 1-2 weeks. We work efficiently without sacrificing excellence.",
    icon: Zap,
    color: "bg-vibrant-yellow",
  },
  {
    title: "Affordability Third",
    description:
      "Premium work without the premium markup. Agency quality at accessible prices.",
    icon: Target,
    color: "bg-mint",
  },
  {
    title: "Transparency Always",
    description:
      "Clear communication, honest pricing, no hidden fees. You always know where your project stands.",
    icon: Shield,
    color: "bg-soft-pink",
  },
];

const teamMembers = [
  {
    name: "Vignesh Gowda",
    role: "Founder & Lead Developer",
    bio: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about leveraging AI to deliver exceptional results faster.",
    expertise: ["Next.js", "React", "Node.js", "AI Integration"],
    icon: Code,
  },
  {
    name: "Creative Team",
    role: "Design & Branding",
    bio: "Our design team brings brands to life with stunning visuals, cohesive identity systems, and user-centered interfaces that convert.",
    expertise: ["UI/UX Design", "Brand Identity", "Motion Graphics", "Figma"],
    icon: Palette,
  },
  {
    name: "Automation Specialists",
    role: "AI & Workflow Automation",
    bio: "We harness the power of AI and automation tools to streamline processes, reduce manual work, and help businesses scale efficiently.",
    expertise: ["Claude AI", "Make.com", "Zapier", "Custom Integrations"],
    icon: Bot,
  },
];

const milestones = [
  {
    year: "2024",
    title: "Founded Websuem",
    description:
      "Started with a mission to democratize premium web services using AI-powered workflows.",
  },
  {
    year: "2024",
    title: "First 10 Clients",
    description:
      "Delivered successful projects across web development, branding, and automation.",
  },
  {
    year: "2024",
    title: "Expanded Services",
    description:
      "Added social media management and comprehensive AI automation solutions.",
  },
  {
    year: "2025",
    title: "Growing Impact",
    description:
      "Now serving clients in 12+ countries with 50+ projects completed.",
  },
];

const whyChooseUs = [
  {
    title: "AI-Enhanced Efficiency",
    description:
      "We leverage AI tools to handle repetitive tasks, allowing us to focus on creativity and strategy while delivering faster.",
  },
  {
    title: "Direct Communication",
    description:
      "No account managers or middlemen. You work directly with the people building your project.",
  },
  {
    title: "Fixed, Transparent Pricing",
    description:
      "Know exactly what you're paying upfront. No surprise invoices or scope creep charges.",
  },
  {
    title: "Proven Results",
    description:
      "Our case studies show real metrics: 40%+ conversion improvements, 300%+ traffic increases, $120K+ cost savings.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
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
                <Users className="w-4 h-4 text-vibrant-yellow" />
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-deep-purple mb-6">
                We Build Digital Experiences That{" "}
                <span className="text-vibrant-yellow">Drive Growth</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                An AI-powered agency on a mission to democratize premium web
                services. Quality first, speed second, affordability third.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Icon className="w-8 h-8 text-vibrant-yellow mx-auto mb-3" />
                    <p className="text-3xl md:text-4xl font-heading font-bold text-deep-purple">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-6">
                  Why We Started Websuem
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    The traditional agency model is broken. It's too slow, too
                    expensive, and often disconnects clients from the people
                    actually doing the work. Freelancers can be hit-or-miss, and
                    finding reliable talent is a gamble.
                  </p>
                  <p>
                    We saw an opportunity to bridge this gap. By leveraging AI
                    to handle repetitive tasks—research, initial drafts, code
                    boilerplates—we free ourselves to focus on what truly
                    matters: creativity, strategy, and delivering exceptional
                    results.
                  </p>
                  <p>
                    The result? Agency-level quality at freelancer prices,
                    delivered in days instead of months. That's not a marketing
                    gimmick—it's our operating model.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-soft"
              >
                <h3 className="font-heading font-bold text-xl text-deep-purple mb-6">
                  Our Journey
                </h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-vibrant-yellow rounded-full flex items-center justify-center text-deep-purple font-bold text-sm">
                          {milestone.year.slice(-2)}
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h4 className="font-semibold text-deep-purple">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide every decision we make and every project
                we deliver.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-deep-purple" />
                    </div>
                    <h3 className="font-semibold text-deep-purple mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-lavender">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                Meet The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
                The People Behind Websuem
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A lean, focused team of specialists dedicated to delivering
                exceptional results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => {
                const Icon = member.icon;
                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-soft"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-vibrant-yellow to-warm-orange rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-deep-purple" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-deep-purple mb-1">
                      {member.name}
                    </h3>
                    <p className="text-warm-orange text-sm font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-deep-purple"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                Why Websuem
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-deep-purple mt-2 mb-4">
                What Makes Us Different
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-purple mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
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
              <Rocket className="w-12 h-12 text-vibrant-yellow mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and see how we can help you achieve
                your digital goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-vibrant-yellow text-deep-purple font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
                >
                  Start a Project
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
