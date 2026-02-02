import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, Share2, Zap, Palette, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive web development, branding, social media management, and AI automation services to help your business grow.",
  openGraph: {
    title: "Services | Websuem",
    description: "Web development, branding, social media, and AI automation - all delivered in record time.",
  },
};

const services = [
    {
        id: "web",
        title: "Website Development",
        description: "Custom websites that convert visitors into customers. Mobile-first, blazing fast, SEO-ready.",
        longDescription: "We build modern, responsive websites using Next.js and Tailwind CSS. Every site is optimized for speed, SEO, and conversion. From landing pages to full e-commerce platforms.",
        icon: Globe,
        color: "bg-lavender",
        features: ["Custom Design", "Mobile-First", "SEO Optimized", "Fast Loading", "Analytics Ready"],
    },
    {
        id: "social",
        title: "Social Media",
        description: "Content that builds your brand and engages your audience.",
        longDescription: "Strategic content creation and management for platforms like Instagram, LinkedIn, Twitter, and TikTok. We help you build a consistent brand voice and grow your following.",
        icon: Share2,
        color: "bg-cream",
        features: ["Content Strategy", "Post Design", "Scheduling", "Analytics", "Community Management"],
    },
    {
        id: "branding",
        title: "Brand Identity",
        description: "Logos, colors, and visual systems that resonate with your audience.",
        longDescription: "Complete branding packages including logo design, color palettes, typography, and brand guidelines. We create visual identities that make your business memorable.",
        icon: Palette,
        color: "bg-soft-pink",
        features: ["Logo Design", "Color System", "Typography", "Brand Guidelines", "Collateral Design"],
    },
    {
        id: "automation",
        title: "AI Automation",
        description: "Save 10+ hours weekly with intelligent workflows.",
        longDescription: "Custom AI-powered workflows using tools like Make.com, Zapier, and Claude. Automate repetitive tasks, streamline operations, and scale your business efficiently.",
        icon: Zap,
        color: "bg-mint",
        features: ["Workflow Design", "AI Integration", "Process Automation", "Custom Bots", "API Connections"],
    },
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h1 className="font-heading text-5xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive designs, automation, and strategies to help your business grow.
                    </p>
                </div>

                {/* Services Grid with Anchor IDs */}
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <section
                                    key={service.id}
                                    id={service.id}
                                    className={`${service.color} rounded-3xl p-8 md:p-10 scroll-mt-24`}
                                    aria-labelledby={`${service.id}-heading`}
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-7 h-7 text-deep-purple" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h2
                                                id={`${service.id}-heading`}
                                                className="font-heading text-2xl font-bold text-deep-purple"
                                            >
                                                {service.title}
                                            </h2>
                                            <p className="text-gray-700">{service.description}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.longDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {service.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-deep-purple"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/services/${service.id}`}
                                        className="inline-flex items-center gap-2 text-deep-purple font-semibold hover:gap-3 transition-all duration-300"
                                    >
                                        Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </Link>
                                </section>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="container mx-auto px-6 mt-20 text-center">
                    <div className="bg-deep-purple text-white rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-vibrant-yellow rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none" aria-hidden="true"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-soft-pink rounded-full blur-3xl opacity-20 -ml-16 -mb-16 pointer-events-none" aria-hidden="true"></div>

                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to transform your online presence?</h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                            Whether you need a new website, a brand refresh, or AI automation, we deliver premium results in record time.
                        </p>
                        <Button size="lg" className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 hover:shadow-glow font-bold relative z-10" asChild>
                            <Link href="/contact">Get Your Custom Quote</Link>
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
