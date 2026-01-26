import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectProps {
    title: string;
    category: string;
    description: string;
    imageColor: string;
    slug: string;
    className?: string;
}

export function ProjectCard({ title, category, description, imageColor, slug, className }: ProjectProps) {
    return (
        <Link
            href={`/portfolio/${slug}`}
            className={cn("group block relative", className)}
        >
            <div className={cn(
                "aspect-[4/3] rounded-3xl overflow-hidden relative mb-6 transition-all duration-500 ease-out group-hover:shadow-soft-lg group-hover:-translate-y-2",
                imageColor
            )}>
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                    <span className="font-heading font-bold text-8xl text-deep-purple mix-blend-overlay opacity-20">
                        {title.charAt(0)}
                    </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-deep-purple/0 group-hover:bg-deep-purple/5 transition-colors duration-300" />

                {/* Hover Action */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <ArrowUpRight className="w-5 h-5 text-deep-purple" />
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
                <p className="text-gray-500 line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
}
