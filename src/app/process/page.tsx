import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Process",
  description: "A simple, transparent 6-step process designed for speed and quality. From discovery to launch in as little as 1-2 weeks.",
  openGraph: {
    title: "Our Process | Websuem",
    description: "See how we take your project from idea to launch in 6 simple steps.",
  },
};

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We discuss your goals, target audience, and preferences in a quick consultation call."
    },
    {
        number: "02",
        title: "Proposal",
        description: "We send a transparent quote and timeline. No hidden fees, no surprises."
    },
    {
        number: "03",
        title: "Design",
        description: "We create a high-fidelity visual design for your approval."
    },
    {
        number: "04",
        title: "Build",
        description: "Our team develops your site using the latest tech stack (Next.js, Tailwind)."
    },
    {
        number: "05",
        title: "Review",
        description: "You review the live demo. We make refinements until it's perfect."
    },
    {
        number: "06",
        title: "Launch",
        description: "We go live! We also help with SEO setup and analytics integration."
    }
];

export default function ProcessPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6 mb-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-heading text-5xl font-bold mb-6">How We Work</h1>
                        <p className="text-xl text-gray-600">
                            A simple, transparent 6-step process designed for speed and quality.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6">
                    <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                        {steps.map((step) => (
                            <li key={step.number} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 group">
                                <div className="text-5xl font-heading font-bold text-gray-100 group-hover:text-vibrant-yellow/40 transition-colors mb-4" aria-hidden="true">
                                    {step.number}
                                </div>
                                <h2 className="font-heading text-2xl font-bold text-deep-purple mb-3">
                                    {step.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-20 text-center">
                        <Button size="lg" className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 hover:shadow-glow font-bold text-lg px-10 py-6 h-auto rounded-xl" asChild>
                            <Link href="/contact">Start Your Project</Link>
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
