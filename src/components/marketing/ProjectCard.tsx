import Link from "next/link";
import { ArrowUpRight, Globe, Palette, Zap, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectProps {
    title: string;
    category: string;
    description: string;
    imageColor: string;
    slug: string;
    className?: string;
    gradient?: string;
    stats?: { label: string; value: string }[];
}

const categoryIcons: Record<string, React.ElementType> = {
    "Website Development": Globe,
    "Brand Identity": Palette,
    "AI Automation": Zap,
    "Social Media": TrendingUp,
};

export function ProjectCard({
    title,
    category,
    description,
    imageColor,
    slug,
    className,
    gradient,
    stats
}: ProjectProps) {
    const Icon = categoryIcons[category] || Globe;

    return (
        <Link
            href={`/portfolio/${slug}`}
            className={cn("group block relative", className)}
        >
            <div className={cn(
                "aspect-[4/3] rounded-3xl overflow-hidden relative mb-6 transition-all duration-500 ease-out group-hover:shadow-soft-lg group-hover:-translate-y-2",
                imageColor
            )}>
                {/* Gradient Background */}
                <div className={cn(
                    "absolute inset-0",
                    gradient || "bg-gradient-to-br from-deep-purple/5 via-transparent to-deep-purple/10"
                )} />

                {/* Browser Mockup */}
                <div className="absolute inset-4 md:inset-6 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Browser Header */}
                    <div className="h-6 md:h-8 bg-gray-100 flex items-center gap-1.5 px-3">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400" />
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400" />
                        <div className="ml-2 flex-1 h-3 md:h-4 bg-gray-200 rounded-full max-w-[120px]" />
                    </div>

                    {/* Mockup Content */}
                    <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                        {/* Nav placeholder */}
                        <div className="flex items-center justify-between">
                            <div className="w-16 md:w-20 h-3 md:h-4 bg-gray-200 rounded" />
                            <div className="flex gap-2">
                                <div className="w-8 md:w-12 h-2 md:h-3 bg-gray-100 rounded" />
                                <div className="w-8 md:w-12 h-2 md:h-3 bg-gray-100 rounded" />
                            </div>
                        </div>

                        {/* Hero placeholder */}
                        <div className={cn(
                            "h-16 md:h-24 rounded-lg",
                            imageColor === "bg-lavender" && "bg-gradient-to-r from-purple-200 to-pink-200",
                            imageColor === "bg-cream" && "bg-gradient-to-r from-orange-200 to-yellow-200",
                            imageColor === "bg-soft-pink" && "bg-gradient-to-r from-pink-200 to-rose-200",
                            imageColor === "bg-mint" && "bg-gradient-to-r from-green-200 to-teal-200",
                            !["bg-lavender", "bg-cream", "bg-soft-pink", "bg-mint"].includes(imageColor) && "bg-gradient-to-r from-gray-200 to-gray-300"
                        )} />

                        {/* Content placeholders */}
                        <div className="space-y-1.5 md:space-y-2">
                            <div className="h-2 md:h-3 bg-gray-200 rounded w-3/4" />
                            <div className="h-2 md:h-3 bg-gray-100 rounded w-1/2" />
                        </div>

                        {/* Card grid placeholder */}
                        <div className="grid grid-cols-3 gap-1.5 md:gap-2 pt-1">
                            <div className="h-8 md:h-12 bg-gray-50 rounded" />
                            <div className="h-8 md:h-12 bg-gray-50 rounded" />
                            <div className="h-8 md:h-12 bg-gray-50 rounded" />
                        </div>
                    </div>
                </div>

                {/* Category Icon Badge */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-deep-purple" aria-hidden="true" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-deep-purple/0 group-hover:bg-deep-purple/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                        <span className="text-deep-purple font-semibold text-sm md:text-base">View Project</span>
                        <ArrowUpRight className="w-4 h-4 text-deep-purple" aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-vibrant-yellow font-heading uppercase tracking-wider block">
                        {category}
                    </span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-deep-purple mb-2 group-hover:text-warm-orange transition-colors">
                    {title}
                </h3>
                <p className="text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {description}
                </p>

                {/* Stats Row */}
                {stats && stats.length > 0 && (
                    <div className="flex gap-4 md:gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="text-lg md:text-xl font-bold text-vibrant-yellow">{stat.value}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
