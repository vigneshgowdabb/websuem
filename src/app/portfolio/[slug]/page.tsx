import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Globe,
  Palette,
  Zap,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Lightbulb,
  Code,
  Layers,
  Smartphone,
  ShoppingCart,
  Bot,
  MessageCircle,
} from "lucide-react";

// Comprehensive project data with detailed case studies
const projects = {
  lumina: {
    title: "Lumina E-Commerce",
    category: "Website Development",
    tagline: "Luxury lighting, brilliantly showcased online",
    description:
      "A high-conversion e-commerce platform for a luxury lighting brand, featuring 3D product previews and AI-driven recommendations.",
    heroColor: "bg-lavender",
    gradientFrom: "from-purple-100",
    gradientTo: "to-pink-100",
    icon: ShoppingCart,

    // Client info
    client: {
      name: "Lumina Lighting Co.",
      industry: "Luxury Home Goods",
      location: "Milan, Italy",
      website: "luminadesign.com",
    },

    // Project stats
    stats: [
      { label: "Conversion Rate", value: "+45%", icon: TrendingUp },
      { label: "Load Time", value: "1.2s", icon: Clock },
      { label: "Mobile Revenue", value: "+68%", icon: Smartphone },
      { label: "AOV Increase", value: "+32%", icon: BarChart3 },
    ],

    // Timeline
    timeline: "6 weeks",
    deliveryDate: "November 2024",

    // Challenge section
    challenge: {
      summary:
        "Lumina needed a digital storefront that matched the elegance of their physical showrooms. The existing site was slow, not mobile-friendly, and lacked the visual fidelity required to sell high-end lighting fixtures.",
      problems: [
        "Legacy Shopify theme with 6+ second load times",
        "No mobile optimization (75% of traffic was mobile)",
        "Product photography didn't convey the true quality of fixtures",
        "Cart abandonment rate of 78%",
        "No product visualization tools for customers",
      ],
      quote:
        "Our website was embarrassing compared to our showroom experience. We were losing customers before they even saw our products.",
      quoteAuthor: "Marco Bellini",
      quoteRole: "CEO, Lumina Lighting Co.",
    },

    // Solution section
    solution: {
      summary:
        "We built a headless commerce solution using Next.js and Shopify. We implemented Three.js for 3D product rendering, allowing customers to visualize fixtures in their homes. AI algorithms suggest complementary products based on style and room type.",
      approach: [
        {
          title: "Performance-First Architecture",
          description:
            "Migrated from legacy Shopify to headless commerce with Next.js, achieving sub-1.5 second load times globally through edge caching and image optimization.",
        },
        {
          title: "Immersive 3D Product Experience",
          description:
            "Implemented Three.js-powered 3D product viewers allowing customers to rotate, zoom, and see fixtures from every angle with realistic lighting simulation.",
        },
        {
          title: "AI-Powered Recommendations",
          description:
            "Built a recommendation engine that analyzes room type, design style, and browsing behavior to suggest perfectly complementary fixtures.",
        },
        {
          title: "Mobile-First Redesign",
          description:
            "Completely rebuilt the mobile experience with touch-optimized interactions, swipe galleries, and streamlined checkout flow.",
        },
      ],
      technologies: [
        "Next.js 14",
        "Shopify Storefront API",
        "Three.js",
        "Tailwind CSS",
        "Vercel Edge",
        "Claude AI",
      ],
    },

    // Results section
    results: {
      summary:
        "Within 90 days of launch, Lumina saw dramatic improvements across all key metrics, with the mobile experience driving the majority of growth.",
      metrics: [
        {
          metric: "Conversion Rate",
          before: "1.2%",
          after: "1.74%",
          change: "+45%",
          description: "Streamlined checkout and better product visualization",
        },
        {
          metric: "Average Order Value",
          before: "$1,840",
          after: "$2,428",
          change: "+32%",
          description: "AI recommendations driving complementary purchases",
        },
        {
          metric: "Mobile Revenue",
          before: "$84K/mo",
          after: "$141K/mo",
          change: "+68%",
          description: "Mobile-first redesign capturing previously lost sales",
        },
        {
          metric: "Page Load Speed",
          before: "6.2s",
          after: "1.2s",
          change: "-81%",
          description: "Headless architecture and edge caching",
        },
        {
          metric: "Cart Abandonment",
          before: "78%",
          after: "52%",
          change: "-33%",
          description: "Simplified checkout and trust signals",
        },
        {
          metric: "Return Visitors",
          before: "18%",
          after: "34%",
          change: "+89%",
          description: "Better UX keeping customers engaged",
        },
      ],
    },

    // Testimonial
    testimonial: {
      quote:
        "Websuem didn't just build us a website—they transformed how we sell online. The 3D product viewer alone has changed how customers interact with our products. Our conversion rate speaks for itself.",
      author: "Marco Bellini",
      role: "CEO, Lumina Lighting Co.",
      image: "/testimonials/marco.jpg",
    },

    // Process highlights
    processHighlights: [
      "Deep-dive discovery session understanding Lumina's brand and customer journey",
      "Competitive analysis of 15 luxury e-commerce experiences",
      "Rapid prototyping with weekly stakeholder reviews",
      "Phased migration to minimize downtime during busy season",
    ],

    // Related services
    services: ["web", "automation"],
  },

  vortex: {
    title: "Vortex SaaS",
    category: "Brand Identity",
    tagline: "Data intelligence meets bold design",
    description:
      "Complete rebranding for a data analytics platform, including logo design, color system, and marketing collateral.",
    heroColor: "bg-cream",
    gradientFrom: "from-orange-100",
    gradientTo: "to-yellow-100",
    icon: Palette,

    client: {
      name: "Vortex Analytics",
      industry: "B2B SaaS",
      location: "San Francisco, USA",
      website: "vortexanalytics.io",
    },

    stats: [
      { label: "Demo Requests", value: "+120%", icon: TrendingUp },
      { label: "Brand Recognition", value: "+85%", icon: Target },
      { label: "Deliverables", value: "25+", icon: Layers },
      { label: "Timeline", value: "2 Weeks", icon: Clock },
    ],

    timeline: "2 weeks",
    deliveryDate: "September 2024",

    challenge: {
      summary:
        "Vortex was struggling to differentiate itself in a crowded market. Their visual identity felt dated and 'corporate', failing to communicate their innovative AI-first approach.",
      problems: [
        "Generic logo that looked like dozens of other tech companies",
        "Inconsistent brand usage across sales materials",
        "Visual identity didn't reflect AI/innovation positioning",
        "Struggling to stand out at conferences and events",
        "Investor presentations lacked visual impact",
      ],
      quote:
        "We had a great product but looked like every other data company. Prospects couldn't remember us after meetings.",
      quoteAuthor: "Sarah Chen",
      quoteRole: "CMO, Vortex Analytics",
    },

    solution: {
      summary:
        "We developed a dynamic brand identity based on the concept of 'clarity from chaos'. The new visual system uses generative patterns that change based on data inputs, creating a living brand that embodies their core value proposition.",
      approach: [
        {
          title: "Strategic Brand Foundation",
          description:
            "Conducted stakeholder interviews and market analysis to define Vortex's unique positioning: 'Making the invisible visible through AI.'",
        },
        {
          title: "Dynamic Logo System",
          description:
            "Created a logo that can generate infinite variations based on data inputs—literally embodying their product's purpose in the brand mark.",
        },
        {
          title: "Comprehensive Visual Language",
          description:
            "Developed a complete design system including colors, typography, iconography, and photography direction that scales across all touchpoints.",
        },
        {
          title: "Implementation Toolkit",
          description:
            "Delivered templates, guidelines, and assets enabling the team to maintain brand consistency without designer involvement.",
        },
      ],
      technologies: [
        "Figma",
        "Adobe Creative Suite",
        "Framer",
        "Lottie Animations",
        "Notion",
      ],
    },

    results: {
      summary:
        "The rebrand launched at their annual user conference to immediate acclaim, with tangible business impact following within weeks.",
      metrics: [
        {
          metric: "Demo Requests",
          before: "45/month",
          after: "99/month",
          change: "+120%",
          description: "Website visitors more likely to engage",
        },
        {
          metric: "Brand Recall",
          before: "23%",
          after: "67%",
          change: "+191%",
          description: "Survey of conference attendees post-event",
        },
        {
          metric: "Sales Cycle",
          before: "42 days",
          after: "31 days",
          change: "-26%",
          description: "Clearer positioning accelerating decisions",
        },
        {
          metric: "Design Awards",
          before: "0",
          after: "3",
          change: "New",
          description: "Featured on BrandNew, Awwwards, and The Dieline",
        },
        {
          metric: "Series B Raised",
          before: "—",
          after: "$28M",
          change: "Success",
          description: "Investors cited strong brand as factor",
        },
        {
          metric: "Team Satisfaction",
          before: "52%",
          after: "94%",
          change: "+81%",
          description: "Internal survey on brand pride",
        },
      ],
    },

    testimonial: {
      quote:
        "The Websuem team understood what we needed before we could articulate it ourselves. Our new brand has become a competitive advantage—prospects remember us, investors take us seriously, and our team is proud to represent us.",
      author: "Sarah Chen",
      role: "CMO, Vortex Analytics",
      image: "/testimonials/sarah.jpg",
    },

    processHighlights: [
      "Intensive 2-day brand strategy workshop",
      "Competitive visual audit of 30+ SaaS brands",
      "Three distinct creative directions presented",
      "Rapid iteration with daily design reviews",
    ],

    services: ["branding"],
  },

  elevate: {
    title: "Elevate Partners",
    category: "Website Development",
    tagline: "Authority built through design",
    description:
      "Professional services website for a top-tier consulting firm, designed to establish authority and generate qualified leads.",
    heroColor: "bg-soft-pink",
    gradientFrom: "from-pink-100",
    gradientTo: "to-rose-100",
    icon: Globe,

    client: {
      name: "Elevate Partners",
      industry: "Management Consulting",
      location: "London, UK",
      website: "elevatepartners.com",
    },

    stats: [
      { label: "Organic Traffic", value: "+300%", icon: TrendingUp },
      { label: "Lead Quality", value: "+60%", icon: Target },
      { label: "Bounce Rate", value: "-45%", icon: BarChart3 },
      { label: "Time on Site", value: "+180%", icon: Clock },
    ],

    timeline: "4 weeks",
    deliveryDate: "October 2024",

    challenge: {
      summary:
        "Elevate Partners needed to shift their perception from a generalist firm to specialized strategic advisors. Their website needed to communicate trust, expertise, and rapid value delivery.",
      problems: [
        "Template-based website that looked generic",
        "Content buried and hard to navigate",
        "No thought leadership platform",
        "Poor SEO with minimal organic traffic",
        "Lead capture limited to a basic contact form",
      ],
      quote:
        "Our website was actively hurting our credibility. We'd win clients despite it, not because of it.",
      quoteAuthor: "James Richardson",
      quoteRole: "Managing Partner, Elevate Partners",
    },

    solution: {
      summary:
        "We designed a minimalist, typography-driven website that puts their thought leadership front and center. We built a custom content management workflow that allows their busy partners to easily publish insights.",
      approach: [
        {
          title: "Authority-First Design",
          description:
            "Created a sophisticated, editorial-style design that positions Elevate as trusted advisors rather than just another consultancy.",
        },
        {
          title: "Content Strategy & SEO",
          description:
            "Developed a pillar content strategy targeting high-intent search terms, with each practice area having dedicated landing pages.",
        },
        {
          title: "Thought Leadership Platform",
          description:
            "Built an insights hub with easy publishing workflow, newsletter integration, and social sharing optimized for LinkedIn.",
        },
        {
          title: "Lead Intelligence System",
          description:
            "Implemented progressive profiling and lead scoring to identify and prioritize the most qualified prospects.",
        },
      ],
      technologies: [
        "Next.js 14",
        "Sanity CMS",
        "Tailwind CSS",
        "Mailchimp",
        "HubSpot",
        "Vercel Analytics",
      ],
    },

    results: {
      summary:
        "The new website transformed Elevate's digital presence, becoming a genuine business development tool rather than a digital brochure.",
      metrics: [
        {
          metric: "Organic Traffic",
          before: "2,400/mo",
          after: "9,600/mo",
          change: "+300%",
          description: "SEO strategy driving qualified visitors",
        },
        {
          metric: "Lead Quality Score",
          before: "34",
          after: "54",
          change: "+60%",
          description: "Higher quality leads from better positioning",
        },
        {
          metric: "Bounce Rate",
          before: "72%",
          after: "40%",
          change: "-45%",
          description: "Engaging content keeping visitors on site",
        },
        {
          metric: "Newsletter Signups",
          before: "12/month",
          after: "89/month",
          change: "+642%",
          description: "Thought leadership driving subscriptions",
        },
        {
          metric: "Avg. Time on Site",
          before: "1:20",
          after: "3:45",
          change: "+180%",
          description: "Valuable content earning engagement",
        },
        {
          metric: "Inbound Inquiries",
          before: "8/month",
          after: "31/month",
          change: "+288%",
          description: "Website as active lead generation tool",
        },
      ],
    },

    testimonial: {
      quote:
        "Websuem created more than a website—they built a platform that's transformed how we attract and engage clients. The thought leadership hub alone has opened doors that cold outreach never could.",
      author: "James Richardson",
      role: "Managing Partner, Elevate Partners",
      image: "/testimonials/james.jpg",
    },

    processHighlights: [
      "Partner interviews to understand expertise and differentiation",
      "Content audit and keyword research for SEO strategy",
      "Design system that scales with firm growth",
      "Training sessions for content publishing workflow",
    ],

    services: ["web"],
  },

  nimbus: {
    title: "Nimbus AI",
    category: "AI Automation",
    tagline: "Support that scales without hiring",
    description:
      "Custom automated customer support workflow using Claude and Make.com, reducing response times by 85%.",
    heroColor: "bg-mint",
    gradientFrom: "from-green-100",
    gradientTo: "to-teal-100",
    icon: Bot,

    client: {
      name: "Nimbus Cloud Services",
      industry: "Cloud Infrastructure",
      location: "Austin, USA",
      website: "nimbuscloud.io",
    },

    stats: [
      { label: "Response Time", value: "-85%", icon: Clock },
      { label: "Auto-Resolved", value: "80%", icon: Check },
      { label: "Annual Savings", value: "$120K", icon: BarChart3 },
      { label: "CSAT Score", value: "+22%", icon: Users },
    ],

    timeline: "3 weeks",
    deliveryDate: "December 2024",

    challenge: {
      summary:
        "Nimbus was overwhelmed by support tickets, with a backlog of 3+ days. They needed a way to triage and resolve common queries without hiring more staff.",
      problems: [
        "3+ day average response time for support tickets",
        "Support team burned out from repetitive queries",
        "Scaling meant hiring, which meant higher burn rate",
        "Inconsistent quality across different support agents",
        "No 24/7 support despite global customer base",
      ],
      quote:
        "We were drowning in tickets. Our support team was exhausted, customers were frustrated, and we couldn't hire fast enough to keep up.",
      quoteAuthor: "David Park",
      quoteRole: "VP of Customer Success, Nimbus",
    },

    solution: {
      summary:
        "We implemented an intelligent automation layer using Large Language Models to analyze incoming tickets. The system auto-resolves Tier 1 issues, routes complex cases to the right specialists, and drafts suggested responses.",
      approach: [
        {
          title: "Ticket Intelligence Layer",
          description:
            "Built an AI system that analyzes every incoming ticket for intent, urgency, and complexity, automatically categorizing and prioritizing the queue.",
        },
        {
          title: "Auto-Resolution Engine",
          description:
            "Created automated workflows that resolve common issues instantly—password resets, billing questions, how-to guides—with personalized responses.",
        },
        {
          title: "Smart Routing",
          description:
            "Complex tickets are automatically routed to the specialist best equipped to handle them, with AI-generated context summaries for faster resolution.",
        },
        {
          title: "Response Assistant",
          description:
            "For human-handled tickets, AI drafts suggested responses based on knowledge base and past successful resolutions, reducing agent time by 60%.",
        },
      ],
      technologies: [
        "Claude AI",
        "Make.com",
        "Zendesk",
        "Slack",
        "Notion",
        "Custom Webhooks",
      ],
    },

    results: {
      summary:
        "The automation system transformed Nimbus's support operations, allowing them to handle 3x the ticket volume with the same team while improving customer satisfaction.",
      metrics: [
        {
          metric: "Response Time",
          before: "3+ days",
          after: "<1 hour",
          change: "-85%",
          description: "Instant auto-responses and faster routing",
        },
        {
          metric: "Tier 1 Auto-Resolved",
          before: "0%",
          after: "80%",
          change: "+80%",
          description: "AI handling routine queries automatically",
        },
        {
          metric: "Annual Savings",
          before: "—",
          after: "$120K",
          change: "New",
          description: "Avoided hiring 2 additional support staff",
        },
        {
          metric: "CSAT Score",
          before: "72",
          after: "88",
          change: "+22%",
          description: "Faster resolution = happier customers",
        },
        {
          metric: "Agent Satisfaction",
          before: "45%",
          after: "82%",
          change: "+82%",
          description: "Team working on interesting problems, not repetition",
        },
        {
          metric: "24/7 Coverage",
          before: "No",
          after: "Yes",
          change: "Enabled",
          description: "AI provides instant support globally",
        },
      ],
    },

    testimonial: {
      quote:
        "Websuem's AI automation didn't just solve our support problem—it transformed our entire customer success strategy. Our team now focuses on high-value interactions while the AI handles the rest. Best investment we've made.",
      author: "David Park",
      role: "VP of Customer Success, Nimbus",
      image: "/testimonials/david.jpg",
    },

    processHighlights: [
      "Analysis of 2,000+ historical tickets to identify patterns",
      "Custom AI training on Nimbus knowledge base",
      "Phased rollout starting with lowest-risk ticket types",
      "Continuous improvement loop with weekly optimization",
    ],

    services: ["automation"],
  },
};

type ProjectKey = keyof typeof projects;

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const project = projects[params.slug as ProjectKey];

  if (!project) {
    return {
      title: "Project Not Found | Websuem",
    };
  }

  return {
    title: `${project.title} Case Study | Websuem Portfolio`,
    description: `${project.description} See how Websuem helped ${project.client.name} achieve ${project.stats[0].value} ${project.stats[0].label.toLowerCase()}.`,
    openGraph: {
      title: `${project.title} Case Study | Websuem`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = projects[params.slug as ProjectKey];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link href="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className={`pt-32 pb-16 bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo}`}
        >
          <div className="container mx-auto px-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-deep-purple/70 hover:text-deep-purple mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${project.heroColor} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-deep-purple" />
                  </div>
                  <span className="text-sm font-bold text-warm-orange uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-deep-purple mb-4">
                  {project.title}
                </h1>

                <p className="text-xl text-deep-purple/70 mb-2">
                  {project.tagline}
                </p>

                <p className="text-lg text-gray-600 mb-8">
                  {project.description}
                </p>

                {/* Client Info */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Client</p>
                      <p className="font-semibold">{project.client.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Industry</p>
                      <p className="font-semibold">{project.client.industry}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Timeline</p>
                      <p className="font-semibold">{project.timeline}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Delivered</p>
                      <p className="font-semibold">{project.deliveryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {project.stats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl p-6 shadow-soft"
                    >
                      <StatIcon className="w-6 h-6 text-warm-orange mb-3" />
                      <p className="text-3xl font-heading font-bold text-deep-purple">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                The Challenge
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-purple mt-2 mb-6">
                What we were up against
              </h2>

              <p className="text-lg text-gray-600 mb-8">
                {project.challenge.summary}
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="font-semibold text-deep-purple mb-4">
                  Key Problems Identified
                </h3>
                <ul className="space-y-3">
                  {project.challenge.problems.map((problem, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-soft-pink rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-deep-purple">
                          {i + 1}
                        </span>
                      </div>
                      <span className="text-gray-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Quote */}
              <blockquote className="border-l-4 border-vibrant-yellow pl-6 py-2">
                <p className="text-xl text-gray-700 italic mb-4">
                  "{project.challenge.quote}"
                </p>
                <footer>
                  <cite className="text-deep-purple font-semibold not-italic">
                    {project.challenge.quoteAuthor}
                  </cite>
                  <span className="text-gray-500">
                    {" "}
                    — {project.challenge.quoteRole}
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-lavender">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                The Solution
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-purple mt-2 mb-6">
                How we solved it
              </h2>

              <p className="text-lg text-gray-600 mb-12">
                {project.solution.summary}
              </p>

              {/* Approach Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {project.solution.approach.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="w-10 h-10 bg-vibrant-yellow rounded-lg flex items-center justify-center mb-4">
                      <span className="text-deep-purple font-bold">{i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-deep-purple mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-deep-purple mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" /> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.solution.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-deep-purple"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                  The Results
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-purple mt-2 mb-4">
                  Measurable impact, real outcomes
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {project.results.summary}
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {project.results.metrics.map((metric) => (
                  <div
                    key={metric.metric}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-soft transition-shadow"
                  >
                    <p className="text-sm text-gray-500 mb-2">{metric.metric}</p>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-heading font-bold text-vibrant-yellow">
                        {metric.change}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="line-through">{metric.before}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="font-semibold text-deep-purple">
                        {metric.after}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-deep-purple rounded-2xl p-8 md:p-12 text-white">
                <Lightbulb className="w-10 h-10 text-vibrant-yellow mb-6" />
                <blockquote className="text-xl md:text-2xl font-light mb-6">
                  "{project.testimonial.quote}"
                </blockquote>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <cite className="font-semibold not-italic block">
                      {project.testimonial.author}
                    </cite>
                    <span className="text-white/70 text-sm">
                      {project.testimonial.role}
                    </span>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </section>

        {/* Process Highlights */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-sm font-semibold text-warm-orange uppercase tracking-wider">
                Our Process
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-purple mt-2 mb-8">
                How we got there
              </h2>

              <div className="space-y-4">
                {project.processHighlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-xl p-6"
                  >
                    <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-deep-purple">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Want results like this?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar growth through
              design, development, and automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-vibrant-yellow text-deep-purple font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
