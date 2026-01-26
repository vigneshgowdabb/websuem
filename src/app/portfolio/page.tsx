import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "Lumina E-Commerce",
        category: "Website Development",
        description: "A high-conversion e-commerce platform for a luxury lighting brand, featuring 3D product previews and AI-driven recommendations.",
        imageColor: "bg-lavender",
        slug: "lumina",
    },
    {
        title: "Vortex SaaS",
        category: "Brand Identity",
        description: "Complete rebranding for a data analytics platform, including logo design, color system, and marketing collateral.",
        imageColor: "bg-cream",
        slug: "vortex",
    },
    {
        title: "Elevate Partners",
        category: "Website Development",
        description: "Professional services website for a top-tier consulting firm, designed to establish authority and generate qualified leads.",
        imageColor: "bg-soft-pink",
        slug: "elevate",
    },
    {
        title: "Nimbus AI",
        category: "AI Automation",
        description: "Custom automated customer support workflow using Claude and Make.com, reducing response times by 85%.",
        imageColor: "bg-mint",
        slug: "nimbus",
    }
];

export default function PortfolioPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6 mb-20">
                    <div className="max-w-3xl">
                        <span className="text-vibrant-yellow font-heading font-bold tracking-widest uppercase mb-4 block">Our Work</span>
                        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Selected <span className="text-gray-400">projects</span> from our portfolio.
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                            We help ambitious brands define their story and scale their digital presence through design and technology.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                {...project}
                                className={index % 2 === 1 ? "md:mt-20" : ""}
                            />
                        ))}
                    </div>

                    <div className="mt-32 text-center bg-gray-50 rounded-[3rem] p-16">
                        <h2 className="font-heading text-4xl font-bold mb-6">Have a project in mind?</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                            We'd love to help you build something amazing. Let's discuss your goals and how we can achieve them.
                        </p>
                        <Button size="lg" className="bg-deep-purple text-white hover:bg-deep-purple/90 h-auto py-4 px-10 text-lg rounded-xl">
                            Start a Project
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
