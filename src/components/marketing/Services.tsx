import Link from "next/link";
import { ArrowRight, Globe, Share2, Zap, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Website Development",
        description: "Custom websites that convert visitors into customers.",
        icon: Globe,
        href: "/services#web",
        color: "bg-lavender", // Light purple background
        colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    },
    {
        title: "Social Media",
        description: "Content that builds brands.",
        icon: Share2,
        href: "/services#social",
        color: "bg-cream", // Warm cream background
        colSpan: "col-span-1 md:col-span-1",
    },
    {
        title: "Brand Identity",
        description: "Logos & visual distinctiveness.",
        icon: Palette,
        href: "/services#branding",
        color: "bg-soft-pink", // Soft pink background
        colSpan: "col-span-1 md:col-span-1",
    },
    {
        title: "AI Automation",
        description: "Save 10+ hours weekly with custom workflows.",
        icon: Zap,
        href: "/services#automation",
        color: "bg-mint", // Mint green background
        colSpan: "col-span-1 md:col-span-2",
    },
];

export function Services() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="font-heading text-4xl font-bold text-deep-purple mb-4">
                        A web agency designed for growth
                    </h2>
                    <p className="text-lg text-gray-600">
                        Built to help you stand out, convert visitors, and save time with the power of AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(250px,auto)]">
                    {services.map((service, index) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className={cn(
                                "group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-soft-lg flex flex-col justify-between overflow-hidden",
                                service.color,
                                service.colSpan
                            )}
                        >
                            <div className="relative z-10">
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm text-deep-purple group-hover:scale-110 transition-transform duration-300">
                                    <service.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-deep-purple mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-700 font-medium leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 flex items-center text-sm font-bold text-deep-purple uppercase tracking-wider group-hover:underline">
                                Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>

                            {/* Decorative circle for visual interest */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
