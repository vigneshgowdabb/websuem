"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import {
  ArrowRight,
  Award,
  Zap,
  Target,
  Shield,
  Clock,
  CheckCircle,
  Globe,
  Code,
  Palette,
  Bot,
} from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "50+", icon: CheckCircle },
  { label: "Happy Clients", value: "40+", icon: Award },
  { label: "Countries Served", value: "12", icon: Globe },
  { label: "Avg. Delivery Time", value: "14 days", icon: Clock },
];

const values = [
  {
    title: "Quality First",
    description:
      "Every deliverable reflects expertise and attention to detail. We never compromise on quality.",
    icon: Award,
  },
  {
    title: "Speed Second",
    description:
      "Most projects delivered in 1-2 weeks. We work efficiently without sacrificing excellence.",
    icon: Zap,
  },
  {
    title: "Affordability Third",
    description:
      "Premium work without the premium markup. Agency quality at accessible prices.",
    icon: Target,
  },
  {
    title: "Transparency Always",
    description:
      "Clear communication, honest pricing, no hidden fees. You always know where your project stands.",
    icon: Shield,
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
    <div className="flex flex-col min-h-screen font-body text-warm-cream">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-deep-green relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-green/[0.03] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-green/[0.02] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full text-sm font-medium text-accent-green border border-white/10 mb-8">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                We Build Digital Experiences That{" "}
                <span className="text-accent-green">Drive Growth</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-cream max-w-2xl mx-auto leading-relaxed">
                An AI-powered agency on a mission to democratize premium web
                services. Quality first, speed second, affordability third.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-dark-navy border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                    <Icon className="w-8 h-8 text-accent-green mx-auto mb-3" />
                    <p className="text-3xl md:text-4xl font-heading font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-cream mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-deep-green">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-8">
                  Why We Started Websuem
                </h2>
                <div className="space-y-5 text-muted-cream leading-relaxed">
                  <p>
                    The traditional agency model is broken. It&apos;s too slow, too
                    expensive, and often disconnects clients from the people
                    actually doing the work. Freelancers can be hit-or-miss, and
                    finding reliable talent is a gamble.
                  </p>
                  <p>
                    We saw an opportunity to bridge this gap. By leveraging AI
                    to handle repetitive tasks — research, initial drafts, code
                    boilerplates — we free ourselves to focus on what truly
                    matters: creativity, strategy, and delivering exceptional
                    results.
                  </p>
                  <p>
                    The result? Agency-level quality at freelancer prices,
                    delivered in days instead of months. That&apos;s not a marketing
                    gimmick — it&apos;s our operating model.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h3 className="font-heading font-bold text-xl text-white mb-8">
                  Our Journey
                </h3>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-accent-green/20 border border-accent-green/30 rounded-full flex items-center justify-center text-accent-green font-bold text-sm">
                          {milestone.year.slice(-2)}
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="w-px h-full bg-white/10 mt-3" />
                        )}
                      </div>
                      <div className="pb-2">
                        <h4 className="font-semibold text-white">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-muted-cream mt-1">
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
        <section className="py-20 bg-dark-navy">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
                What We Stand For
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-cream max-w-2xl mx-auto">
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
                    className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent-green/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-accent-green" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-cream">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-deep-green">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
                Meet The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-4">
                The People Behind Websuem
              </h2>
              <p className="text-muted-cream max-w-2xl mx-auto">
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
                    className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-accent-green/20 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-green/20 to-accent-green/5 border border-accent-green/20 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-accent-green" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-accent-green text-sm font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-muted-cream text-sm mb-5">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-warm-cream border border-white/10"
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
        <section className="py-20 bg-dark-navy">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
                Why Websuem
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-4">
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
                  className="flex gap-4 p-6 bg-white/[0.03] rounded-xl border border-white/5"
                >
                  <div className="w-10 h-10 bg-accent-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-cream">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-deep-green border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-lg text-muted-cream mb-10 max-w-2xl mx-auto">
                Let&apos;s discuss your project and see how we can help you achieve
                your digital goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://calendly.com/hello-websuem/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-accent-green text-deep-green font-bold text-lg rounded-xl hover:bg-bright-green hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  View Services
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
