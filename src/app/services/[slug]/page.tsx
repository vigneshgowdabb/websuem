import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Users, Zap, Shield, ArrowRight, HelpCircle } from "lucide-react";

const services = {
    "web": {
        title: "Website Development",
        subtitle: "Custom websites that convert visitors into customers — delivered in 7-14 days.",
        metaDescription: "Get a high-converting, custom-built website in just 7-14 days. Next.js development, mobile-first design, SEO optimization included. No templates, no compromises.",
        heroDescription: "Stop waiting months for a website that doesn't convert. We build lightning-fast, custom-coded websites using Next.js and modern technologies that help service businesses generate more leads and close more deals.",
        overview: `Your website is your hardest-working salesperson — it works 24/7, never takes breaks, and is often the first impression potential clients have of your business. But here's the problem: most web agencies take 3-6 months to deliver a site, charge $15,000-$50,000, and hand you something built on generic templates.

We do things differently. Websuem delivers custom-coded, conversion-optimized websites in just 7-14 days at a fraction of traditional agency costs. How? By combining AI-powered development workflows with battle-tested design systems specifically built for service businesses.

Every website we build is:
• **Custom-coded** — No WordPress themes or page builders. Pure Next.js for maximum speed and flexibility.
• **Conversion-optimized** — Strategic CTA placement, trust signals, and persuasive copy that turns visitors into leads.
• **SEO-ready from day one** — Proper heading structure, meta tags, schema markup, and Core Web Vitals optimization.
• **Mobile-first** — 60%+ of traffic comes from mobile. Your site will look and perform flawlessly on every device.
• **Built to scale** — Clean architecture that grows with your business without technical debt.`,
        benefits: [
            { title: "Launch in 7-14 Days", description: "No more waiting months. Get your site live while your competitors are still in 'discovery phase'.", icon: Clock },
            { title: "Conversion-Focused Design", description: "Every element is strategically placed to guide visitors toward booking a call or submitting an inquiry.", icon: Zap },
            { title: "Built for Service Businesses", description: "We understand the unique needs of consultants, agencies, lawyers, and professional service firms.", icon: Users },
            { title: "No Ongoing Developer Dependency", description: "Easy-to-update content, clear documentation, and optional training so you're never stuck.", icon: Shield },
        ],
        features: [
            "Custom Next.js/React Development",
            "Responsive Mobile-First Design",
            "SEO Optimization & Schema Markup",
            "CMS Integration (Sanity, Contentful, or custom)",
            "High-Performance Page Transitions",
            "Contact Forms with Spam Protection",
            "Analytics & Conversion Tracking Setup",
            "Core Web Vitals Optimization",
            "SSL Certificate & Security Headers",
            "30 Days Post-Launch Support"
        ],
        process: [
            { step: "Discovery Call", description: "We learn about your business, goals, target audience, and competitors. You'll receive a detailed proposal within 24 hours." },
            { step: "Design & Strategy", description: "We create wireframes and high-fidelity designs based on proven conversion patterns. You approve before we write a single line of code." },
            { step: "Development Sprint", description: "Our team builds your site using Next.js, Tailwind CSS, and modern best practices. Daily progress updates keep you informed." },
            { step: "Review & Refinement", description: "You get unlimited revision rounds until you're 100% satisfied. We don't launch until you love it." },
            { step: "Launch & Optimize", description: "We handle deployment, DNS setup, and performance optimization. Plus 30 days of support for any tweaks needed." }
        ],
        faqs: [
            { q: "How is 7-14 days possible when other agencies take months?", a: "We use AI-assisted development workflows, pre-built component libraries, and a focused process that eliminates unnecessary meetings and revision cycles. We also specialize in service businesses, so we're not starting from scratch every time." },
            { q: "Will my site look like a template?", a: "Absolutely not. Every site is custom-designed for your brand. We start with conversion-proven layouts but customize every element — colors, typography, imagery, copy, and structure — to match your unique business." },
            { q: "What if I need changes after launch?", a: "You get 30 days of post-launch support included. After that, we offer affordable monthly maintenance plans, or you can make simple content changes yourself through the CMS we set up." },
            { q: "Do you work with businesses outside the US?", a: "Yes! We've built websites for clients in 12+ countries. Our async communication style works great across time zones." },
            { q: "What's the investment?", a: "Our website packages start at $3,500 for a 5-page marketing site. Complex projects with custom functionality are quoted individually. Schedule a call for a personalized quote." }
        ],
        pricing: { starting: "$3,500", timeline: "7-14 days", includes: "5-page site, CMS, SEO setup" },
        color: "bg-lavender",
        stats: [
            { value: "45%", label: "Avg. conversion increase" },
            { value: "<2s", label: "Page load time" },
            { value: "7-14", label: "Days to launch" }
        ]
    },
    "social": {
        title: "Social Media Management",
        subtitle: "Strategic content that builds your brand and generates leads — without you lifting a finger.",
        metaDescription: "Done-for-you social media management for service businesses. Content strategy, design, copywriting, and posting — all handled by experts. Starting at $1,500/month.",
        heroDescription: "Stop struggling to post consistently or wondering why your content isn't getting engagement. We handle your entire social media presence — from strategy to execution — so you can focus on serving your clients.",
        overview: `Social media should be generating leads for your business, not consuming hours of your time every week. But the reality is: most service business owners either neglect social media entirely or post sporadically without a strategy — and neither approach works.

Here's what happens when you try to DIY your social media:
• You spend 5-10 hours per week creating mediocre content
• Your posting is inconsistent (feast or famine)
• You have no idea what's actually working
• You're always "meaning to" engage more but never do
• Your competitors who post consistently are winning the visibility game

Our social media management service eliminates all of that. We become your dedicated social media team — handling everything from content strategy and creation to posting and community management.

**What makes us different:**
We specialize in service businesses. That means we understand your audience, your sales cycle, and what type of content actually moves the needle. We're not just posting pretty pictures — we're creating content that positions you as the authority in your space and drives qualified inquiries.`,
        benefits: [
            { title: "Save 10+ Hours Weekly", description: "No more scrambling to create content. We handle everything so you can focus on client work.", icon: Clock },
            { title: "Consistent Brand Presence", description: "Stay top-of-mind with your audience through strategic, regular posting across all platforms.", icon: Zap },
            { title: "Content That Converts", description: "We create educational, engaging content that positions you as the go-to expert in your field.", icon: Users },
            { title: "Full Transparency", description: "Monthly reports showing exactly what's working, what's not, and where we're focusing next.", icon: Shield },
        ],
        features: [
            "Custom Content Strategy & Calendar",
            "Professional Graphic Design",
            "Engaging Copywriting & Captions",
            "Hashtag Research & Optimization",
            "Platform-Specific Formatting",
            "Community Management & Engagement",
            "Monthly Analytics Reports",
            "Competitor Monitoring",
            "Trend Identification & Newsjacking",
            "Quarterly Strategy Reviews"
        ],
        process: [
            { step: "Brand Deep-Dive", description: "We learn your voice, values, target audience, and competitors. We'll also audit your existing social presence to identify quick wins." },
            { step: "Strategy Development", description: "We create a custom content strategy including content pillars, posting frequency, and platform prioritization based on where your audience actually is." },
            { step: "Content Creation", description: "Our team designs graphics, writes copy, and builds out a 30-day content calendar. You approve everything before it goes live." },
            { step: "Publishing & Engagement", description: "We handle all posting, hashtag optimization, and community engagement. We respond to comments and DMs on your behalf (with your approval)." },
            { step: "Analyze & Optimize", description: "Monthly reports show what's working. We continuously refine the strategy based on real data, not guesswork." }
        ],
        faqs: [
            { q: "Which platforms do you manage?", a: "We specialize in LinkedIn, Instagram, Twitter/X, and Facebook — the platforms that matter most for service businesses. We'll recommend which platforms to prioritize based on your target audience." },
            { q: "How much content do you create?", a: "Our standard package includes 12 posts per month (3 per week). Higher-frequency packages are available for businesses that want more visibility." },
            { q: "Do I need to provide content ideas?", a: "Nope! We handle ideation based on your expertise, industry trends, and what's working for competitors. Of course, if you have ideas or want to share something specific, we'll work that in." },
            { q: "How involved do I need to be?", a: "Minimal. We send content for approval weekly (takes 10 minutes to review). Beyond that, we handle everything. You can be as hands-on or hands-off as you prefer." },
            { q: "What results can I expect?", a: "Most clients see 2-3x engagement within the first 60 days and start receiving inbound inquiries from social within 90 days. Results vary based on your industry and starting point." }
        ],
        pricing: { starting: "$1,500/month", timeline: "Ongoing", includes: "12 posts/month, design, engagement" },
        color: "bg-cream",
        stats: [
            { value: "3x", label: "Avg. engagement increase" },
            { value: "12+", label: "Posts per month" },
            { value: "10+", label: "Hours saved weekly" }
        ]
    },
    "branding": {
        title: "Brand Identity Design",
        subtitle: "A complete visual identity system that makes your business unforgettable — delivered in 2-3 weeks.",
        metaDescription: "Professional brand identity design for service businesses. Logo, colors, typography, and brand guidelines — everything you need to look as professional as you are. Starting at $2,500.",
        heroDescription: "Your brand is how people perceive your business. A cohesive, professional visual identity builds trust instantly and justifies premium pricing. Stop looking like a startup when you're ready to play in the big leagues.",
        overview: `First impressions happen in milliseconds. Before a potential client reads a single word on your website or hears your pitch, they've already made a judgment about your business based on how you look.

The harsh truth? If your visual identity looks amateur, DIY, or inconsistent, prospects assume your work is too. That's why established businesses invest in professional branding — it's not vanity, it's a business decision that directly impacts revenue.

**What we mean by "brand identity":**
Your brand is more than just a logo. It's a complete system that includes:
• **Logo & variations** — Primary, secondary, icon, and responsive versions
• **Color palette** — Primary, secondary, and accent colors with exact codes
• **Typography** — Headline and body fonts that reflect your personality
• **Visual style** — Photography direction, iconography, and graphic elements
• **Brand guidelines** — Documentation so everything stays consistent

When all these elements work together, magic happens. Your website looks cohesive. Your social media is instantly recognizable. Your proposals feel premium. You stop blending in and start standing out.

**Who this is for:**
Service businesses that have outgrown their DIY logo and want to look as professional as they actually are. If you're charging premium prices but your brand looks like it was made in Canva, we need to talk.`,
        benefits: [
            { title: "Premium Perception", description: "A professional brand justifies premium pricing. Clients expect to pay more when you look established and trustworthy.", icon: Zap },
            { title: "Instant Recognition", description: "Stand out in crowded markets. A distinctive visual identity makes you memorable in seconds.", icon: Users },
            { title: "Consistency Everywhere", description: "Brand guidelines ensure every touchpoint — from business cards to LinkedIn — feels cohesive.", icon: Shield },
            { title: "Confidence to Market", description: "Stop hesitating to put yourself out there. When you love your brand, you want to share it.", icon: Clock },
        ],
        features: [
            "Primary Logo Design (3 concepts → 1 final)",
            "Logo Variations (horizontal, stacked, icon)",
            "Color Palette with Hex, RGB, CMYK codes",
            "Typography Selection & Pairing",
            "Brand Guidelines Document (PDF)",
            "Social Media Profile Templates",
            "Business Card Design",
            "Email Signature Template",
            "Favicon & App Icons",
            "Source Files (AI, EPS, PNG, SVG)"
        ],
        process: [
            { step: "Brand Discovery", description: "A deep-dive questionnaire and strategy call to understand your business, values, audience, and competitors. We also review brands you admire." },
            { step: "Concept Development", description: "We create 3 distinct logo concepts with rationale for each direction. You choose your favorite (or combine elements from multiple)." },
            { step: "Refinement & Expansion", description: "We refine the chosen concept, create all logo variations, and develop the complete visual system (colors, fonts, elements)." },
            { step: "Guidelines & Delivery", description: "You receive a comprehensive brand guidelines document plus all final files in every format you'll ever need." }
        ],
        faqs: [
            { q: "What if I don't like any of the initial concepts?", a: "It's rare, but it happens. If none of the 3 concepts resonate, we'll do a follow-up discovery session to recalibrate and create 2 additional concepts at no extra charge." },
            { q: "Can you work with my existing logo?", a: "Yes! If you have a logo you love but need the full identity system built around it, we offer brand extension packages starting at $1,500." },
            { q: "How long does the process take?", a: "Typically 2-3 weeks from kickoff to final delivery. Rush delivery (7-10 days) is available for an additional fee." },
            { q: "Do I own the final designs?", a: "100%. Upon final payment, you receive full ownership of all brand assets. We retain the right to use the work in our portfolio unless you request otherwise." },
            { q: "What if I need additional materials later?", a: "We offer ongoing design support at $150/hour or discounted monthly retainer packages. Most clients come back for presentation templates, marketing materials, and signage." }
        ],
        pricing: { starting: "$2,500", timeline: "2-3 weeks", includes: "Logo, colors, fonts, guidelines" },
        color: "bg-soft-pink",
        stats: [
            { value: "3", label: "Initial concepts" },
            { value: "∞", label: "Revision rounds" },
            { value: "2-3", label: "Weeks to complete" }
        ]
    },
    "automation": {
        title: "AI Automation",
        subtitle: "Custom AI workflows that save you 10+ hours per week — set up and running in days, not months.",
        metaDescription: "AI automation for service businesses. Custom ChatGPT/Claude agents, workflow automation, and intelligent systems that handle repetitive tasks. Save 10+ hours weekly. Starting at $2,000.",
        heroDescription: "You didn't start your business to do data entry, answer the same questions repeatedly, or manually move information between tools. Let AI handle the busywork while you focus on high-value client work.",
        overview: `Here's a frustrating reality for service business owners: you're spending hours every week on tasks that don't require your expertise. Scheduling. Follow-ups. Data entry. Answering the same questions. Generating reports. Moving information between tools.

These tasks are necessary but not valuable. They don't generate revenue. They don't serve clients. They just... need to get done.

**This is where AI automation transforms your business.**

We build custom AI systems that handle your repetitive tasks automatically:
• **AI assistants** that answer common questions and qualify leads 24/7
• **Automated workflows** that move data between your tools without manual intervention
• **Smart scheduling** that handles booking, reminders, and follow-ups
• **Report generation** that compiles data and creates client deliverables
• **Email automation** that sends personalized responses based on triggers

**The result?** You get 10+ hours per week back. Your clients get faster responses. Your operations run smoother. And you can finally focus on the work that actually moves the needle.

**Why work with us:**
Unlike generic "automation consultants," we specialize in service businesses. We understand your workflows, your tools, and your client relationships. We don't just set up Zapier triggers — we architect intelligent systems that genuinely transform how you operate.`,
        benefits: [
            { title: "Save 10+ Hours Weekly", description: "Reclaim time spent on repetitive tasks. That's 500+ hours per year you can spend on client work or growth.", icon: Clock },
            { title: "24/7 Client Support", description: "AI assistants answer common questions instantly, any time of day. Never miss a lead because you were busy.", icon: Zap },
            { title: "Eliminate Human Error", description: "Automated workflows don't forget steps, miss deadlines, or enter data incorrectly. Consistency guaranteed.", icon: Shield },
            { title: "Scale Without Hiring", description: "Handle more clients without adding headcount. AI scales infinitely at a fraction of the cost of an employee.", icon: Users },
        ],
        features: [
            "Custom ChatGPT/Claude AI Agents",
            "Make.com / Zapier Workflow Automation",
            "Automated Lead Qualification & Routing",
            "Intelligent Email Response Systems",
            "CRM Automation & Data Sync",
            "Automated Reporting & Analytics",
            "Calendar & Scheduling Automation",
            "Document Generation & Processing",
            "Custom API Integrations",
            "Training & Documentation"
        ],
        process: [
            { step: "Workflow Audit", description: "We analyze your current processes to identify the biggest time sinks and automation opportunities. You'll get a prioritized roadmap." },
            { step: "Solution Design", description: "We architect the automation system, select the right tools, and map out every workflow. You approve before we build." },
            { step: "Build & Test", description: "We implement the automations, integrate with your existing tools, and rigorously test every scenario." },
            { step: "Deploy & Train", description: "We deploy the system, provide documentation, and train you (and your team) on how it all works." },
            { step: "Optimize & Support", description: "30 days of support to refine the system based on real-world usage. We ensure everything runs smoothly." }
        ],
        faqs: [
            { q: "What tools do you work with?", a: "We work with Make.com, Zapier, n8n, and custom API integrations. For AI, we use OpenAI (GPT-4), Anthropic (Claude), and other models depending on the use case. We integrate with most popular business tools (CRMs, email, calendars, etc.)." },
            { q: "Is AI automation reliable enough for client-facing work?", a: "Yes, when properly implemented. We build guardrails, fallback systems, and human-in-the-loop options for sensitive workflows. You stay in control while AI handles the heavy lifting." },
            { q: "How much technical knowledge do I need?", a: "None. We handle all the technical implementation and provide clear documentation. You interact with your automations through familiar interfaces — no coding required." },
            { q: "What's the ROI on automation?", a: "Most clients see ROI within 2-3 months. If we save you 10 hours/week at a $150/hour effective rate, that's $6,000/month in recaptured value. Our projects typically start at $2,000-$5,000." },
            { q: "What happens if something breaks?", a: "We build monitoring and alerts into every system. If something fails, you'll know immediately, and we offer ongoing support packages to fix issues fast." }
        ],
        pricing: { starting: "$2,000", timeline: "1-3 weeks", includes: "Custom workflow, integration, training" },
        color: "bg-mint",
        stats: [
            { value: "10+", label: "Hours saved weekly" },
            { value: "85%", label: "Faster response times" },
            { value: "24/7", label: "AI availability" }
        ]
    }
};

export function generateStaticParams() {
    return Object.keys(services).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const service = services[params.slug as keyof typeof services];

    if (!service) {
        return { title: "Service Not Found" };
    }

    return {
        title: service.title,
        description: service.metaDescription,
        openGraph: {
            title: `${service.title} | Websuem`,
            description: service.metaDescription,
        },
    };
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
                <section className={`pt-40 pb-20 ${service.color}`}>
                    <div className="container mx-auto px-6">
                        <Link href="/services" className="inline-flex items-center text-sm font-bold uppercase tracking-wider mb-8 hover:underline text-deep-purple/60 hover:text-deep-purple transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to All Services
                        </Link>
                        <div className="max-w-4xl">
                            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-deep-purple/80 max-w-2xl leading-relaxed mb-8">
                                {service.subtitle}
                            </p>

                            {/* Stats Row */}
                            <div className="flex flex-wrap gap-8 mb-8">
                                {service.stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-3xl md:text-4xl font-bold text-deep-purple">{stat.value}</p>
                                        <p className="text-sm text-deep-purple/60">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="bg-deep-purple text-white hover:bg-deep-purple/90 font-bold h-auto py-4 px-8" asChild>
                                    <Link href="/contact">Get Started <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
                                </Button>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-lg">
                                    <span className="text-sm font-medium">Starting at</span>
                                    <span className="text-lg font-bold">{service.pricing.starting}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hero Description */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed">
                            {service.heroDescription}
                        </p>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose This Service</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {service.benefits.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={benefit.title} className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow">
                                        <div className="w-12 h-12 bg-vibrant-yellow/20 rounded-xl flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-deep-purple" aria-hidden="true" />
                                        </div>
                                        <h3 className="font-heading text-lg font-bold mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Overview Content */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">The Full Picture</h2>
                                <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                    {service.overview}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 lg:sticky lg:top-32">
                                <h3 className="font-heading text-2xl font-bold mb-6">What&apos;s Included</h3>
                                <ul className="space-y-4 mb-8">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t pt-6">
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-3xl font-bold">{service.pricing.starting}</span>
                                        <span className="text-gray-500">• {service.pricing.timeline}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6">Includes: {service.pricing.includes}</p>
                                    <Button className="w-full bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 hover:shadow-glow font-bold py-4" asChild>
                                        <Link href="/contact">Get Your Custom Quote</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-20 bg-lavender">
                    <div className="container mx-auto px-6">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">Our Process</h2>
                        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                            A proven, transparent process designed for speed without sacrificing quality.
                        </p>
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-6">
                                {service.process.map((step, i) => (
                                    <div key={i} className="flex gap-6 bg-white p-6 rounded-2xl shadow-soft">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-vibrant-yellow flex items-center justify-center font-bold text-deep-purple text-lg">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-xl mb-2">{step.step}</h3>
                                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <HelpCircle className="w-6 h-6 text-vibrant-yellow" aria-hidden="true" />
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
                        </div>
                        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                            Got questions? We&apos;ve got answers.
                        </p>
                        <div className="max-w-3xl mx-auto space-y-6">
                            {service.faqs.map((faq, i) => (
                                <div key={i} className="bg-gray-50 rounded-2xl p-6">
                                    <h3 className="font-heading font-bold text-lg mb-3">{faq.q}</h3>
                                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-deep-purple text-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            Book a free 15-minute strategy call. We&apos;ll discuss your goals and see if we&apos;re a good fit. No pressure, no pitch — just a conversation.
                        </p>
                        <Button size="lg" className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 hover:shadow-glow font-bold h-auto py-4 px-10" asChild>
                            <Link href="/contact">Book Your Free Call <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
                        </Button>
                        <p className="text-white/50 text-sm mt-4">Usually responds within 2 hours</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
