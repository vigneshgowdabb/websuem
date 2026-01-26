import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock Data - In a real app, this would come from a database or CMS
const projects = {
    "lumina": {
        title: "Lumina E-Commerce",
        category: "Website Development",
        description: "A high-conversion e-commerce platform for a luxury lighting brand, featuring 3D product previews and AI-driven recommendations.",
        challenge: "Lumina needed a digital storefront that matched the elegance of their physical showrooms. The existing site was slow, not mobile-friendly, and lacked the visual fidelity required to sell high-end lighting fixtures.",
        solution: "We built a headless commerce solution using Next.js and Shopify. We implemented Three.js for 3D product rendering, allowing customers to visualize fixtures in their homes. AI algorithms were used to suggest complementary products based on style and room type.",
        results: [
            "40% increase in conversion rate within 3 months",
            "50% reduction in page load speeds",
            "25% increase in average order value"
        ],
        color: "bg-lavender"
    },
    "vortex": {
        title: "Vortex SaaS",
        category: "Brand Identity",
        description: "Complete rebranding for a data analytics platform, including logo design, color system, and marketing collateral.",
        challenge: "Vortex was struggling to differentiate itself in a crowded market. Their visual identity felt dated and 'corporate', failing to communicate their innovative AI-first approach.",
        solution: "We developed a dynamic brand identity based on the concept of 'clarity from chaos'. The new visual system uses generative patterns that change based on data inputs, creating a living brand that embodies their core value proposition.",
        results: [
            "2x increase in demo requests post-rebrand",
            "Featured on BrandNew and Awwwards",
            "Successful Series B funding round raised"
        ],
        color: "bg-cream"
    },
    "elevate": {
        title: "Elevate Partners",
        category: "Website Development",
        description: "Professional services website for a top-tier consulting firm, designed to establish authority and generate qualified leads.",
        challenge: "Elevate Partners needed to shift their perception from a generalist firm to specialized strategic advisors. Their website needed to communicate trust, expertise, and rapid value delivery.",
        solution: "We designed a minimalist, typography-driven website that puts their thought leadership front and center. We built a custom content management workflow that allows their busy partners to easily publish insights.",
        results: [
            "300% increase in organic traffic",
            "High-value leads increased by 60%",
            "Reduced bounce rate by 45%"
        ],
        color: "bg-soft-pink"
    },
    "nimbus": {
        title: "Nimbus AI",
        category: "AI Automation",
        description: "Custom automated customer support workflow using Claude and Make.com, reducing response times by 85%.",
        challenge: "Nimbus was overwhelmed by support tickets, with a backlog of 3+ days. They needed a way to triage and resolve common queries without hiring more staff.",
        solution: "We implemented an intelligent automation layer using Large Language Models to analyze incoming tickets. The system auto-resolves Tier 1 issues, routes complex cases to the right specialists, and drafts suggested responses.",
        results: [
            "Response time dropped from 3 days to <1 hour",
            "85% of Tier 1 tickets auto-resolved",
            "$120k estimated annual savings"
        ],
        color: "bg-mint"
    }
};

export function generateStaticParams() {
    return Object.keys(projects).map((slug) => ({
        slug,
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects[params.slug as keyof typeof projects];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Button asChild><Link href="/portfolio">Back to Portfolio</Link></Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <div className={`pt-40 pb-20 ${project.color} bg-opacity-30`}>
                    <div className="container mx-auto px-6">
                        <Link href="/portfolio" className="inline-flex items-center text-sm font-bold uppercase tracking-wider mb-8 hover:underline opacity-60">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                        </Link>
                        <div className="max-w-4xl">
                            <span className="text-vibrant-yellow font-heading font-bold tracking-widest uppercase mb-4 block bg-white/50 backdrop-blur w-fit px-3 py-1 rounded-full text-xs">
                                {project.category}
                            </span>
                            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-deep-purple/80 max-w-2xl leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-16">
                            <section>
                                <h2 className="font-heading text-3xl font-bold mb-6">The Challenge</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {project.challenge}
                                </p>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl font-bold mb-6">The Solution</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {project.solution}
                                </p>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl font-bold mb-6">Key Results</h2>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {project.results.map((result, i) => (
                                        <li key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                                            <span className="w-8 h-8 flex items-center justify-center bg-vibrant-yellow text-deep-purple font-bold rounded-full text-sm">
                                                {i + 1}
                                            </span>
                                            <span className="font-medium text-lg">{result}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        {/* Sidebar CTA */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-deep-purple text-white p-8 rounded-3xl sticky top-24">
                                <h3 className="font-heading text-2xl font-bold mb-4">Want results like this?</h3>
                                <p className="text-white/80 mb-8">
                                    Lets discuss how we can help you achieve similar growth through design and automation.
                                </p>
                                <Button size="lg" className="w-full bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 font-bold" asChild>
                                    <Link href="/contact">Start Your Project</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
