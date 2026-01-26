import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const services = {
    "web": {
        title: "Website Development",
        subtitle: "Custom websites that convert visitors into customers.",
        description: "We build high-performance, visually stunning websites using the latest technologies. No generic templates—only custom-coded solutions designed to scale with your business.",
        features: [
            "Custom Next.js Development",
            "Responsive & Mobile-First Design",
            "SEO Optimization Built-in",
            "CMS Integration (Sanity, Contentful)",
            "High-Performance Animations"
        ],
        process: [
            "Discovery & Strategy",
            "Wireframing & UX Design",
            "Development & Coding",
            "Testing & Launch"
        ],
        color: "bg-lavender"
    },
    "social": {
        title: "Social Media Management",
        subtitle: "Content that builds brands and engages audiences.",
        description: "We handle your entire social media presence, from content creation to community management. We help you find your voice and grow a loyal following across all major platforms.",
        features: [
            "Content Strategy & Planning",
            "Visual Content Creation",
            "Copywriting & Captioning",
            "Community Engagement",
            "Analytics & Reporting"
        ],
        process: [
            "Audit & Goal Setting",
            "Content Calendar Creation",
            "Production & Scheduling",
            "Growth Monitoring"
        ],
        color: "bg-cream"
    },
    "branding": {
        title: "Brand Identity",
        subtitle: "Logos & visual distinctiveness that tell your story.",
        description: "Your brand is more than just a logo. We create comprehensive visual identity systems that communicate your values and distinguish you from competitors.",
        features: [
            "Logo Design & Variations",
            "Color Palette & Typography",
            "Brand Guidelines / Style Guide",
            "Social Media Assets",
            "Marketing Collateral"
        ],
        process: [
            "Brand Workshop",
            "Concept Development",
            "Refinement & Iteration",
            "Final Asset Delivery"
        ],
        color: "bg-soft-pink"
    },
    "automation": {
        title: "AI Automation",
        subtitle: "Save 10+ hours weekly with custom intelligent workflows.",
        description: "Leverage the power of AI to automate repetitive tasks. We build custom agents and workflows that handle customer support, data entry, and lead qualification for you.",
        features: [
            "Custom GPT/Claude Agents",
            "Make.com / Zapier Workflows",
            "Automated Customer Support",
            "Lead Scoring & Routing",
            "Data Analysis & Reporting"
        ],
        process: [
            "Workflow Audit",
            "Solution Architecture",
            "Implementation & Testing",
            "Training & Handover"
        ],
        color: "bg-mint"
    }
};

export function generateStaticParams() {
    return Object.keys(services).map((slug) => ({
        slug,
    }));
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const service = services[params.slug as keyof typeof services];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <Button asChild><Link href="/services">Back to Services</Link></Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <div className={`pt-40 pb-20 ${service.color} bg-opacity-30`}>
                    <div className="container mx-auto px-6">
                        <Link href="/services" className="inline-flex items-center text-sm font-bold uppercase tracking-wider mb-8 hover:underline opacity-60">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Services
                        </Link>
                        <div className="max-w-4xl">
                            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-2xl md:text-3xl font-light text-deep-purple/80 max-w-2xl leading-relaxed mb-6">
                                {service.subtitle}
                            </p>
                            <Button size="lg" className="bg-deep-purple text-white hover:bg-deep-purple/90 font-bold" asChild>
                                <Link href="/contact">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 py-24">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        <div className="space-y-12">
                            <section>
                                <h2 className="font-heading text-3xl font-bold mb-6">Overview</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl font-bold mb-6">What's Included</h2>
                                <ul className="space-y-4">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg font-medium text-gray-700">
                                            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
                            <h2 className="font-heading text-2xl font-bold mb-8">Our Process</h2>
                            <div className="space-y-8">
                                {service.process.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-deep-purple shadow-sm">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{step}</h3>
                                            <p className="text-gray-500 text-sm">We ensure everything is perfect at this stage.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-10 border-t border-gray-200">
                                <Button className="w-full bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 font-bold py-6 text-lg" asChild>
                                    <Link href="/contact">Book a Consultation</Link>
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
