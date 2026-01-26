import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-deep-purple text-white py-12 md:py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="md:col-span-1">
                    <Link href="/" className="font-heading font-bold text-2xl mb-4 block">
                        WEBSUEM
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Premium websites, social media management & AI automation — delivered in days, not months.
                    </p>
                </div>

                {/* Links Column */}
                <div>
                    <h4 className="font-heading font-semibold text-lg mb-4 text-vibrant-yellow">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                        <li><Link href="/process" className="hover:text-white transition-colors">Process</Link></li>
                        <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Services Column */}
                <div>
                    <h4 className="font-heading font-semibold text-lg mb-4 text-vibrant-yellow">Services</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/services#web" className="hover:text-white transition-colors">Web Development</Link></li>
                        <li><Link href="/services#social" className="hover:text-white transition-colors">Social Media</Link></li>
                        <li><Link href="/services#automation" className="hover:text-white transition-colors">AI Automation</Link></li>
                        <li><Link href="/services#branding" className="hover:text-white transition-colors">Brand Identity</Link></li>
                    </ul>
                </div>

                {/* Legal/Contact Column */}
                <div>
                    <h4 className="font-heading font-semibold text-lg mb-4 text-vibrant-yellow">Connect</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="mailto:hello@websuem.com" className="hover:text-white transition-colors">hello@websuem.com</a></li>
                        {/* Social links placeholder */}
                        <li className="pt-4 flex gap-4">
                            {/* Icons would go here */}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center md:text-left">
                <p className="text-gray-500 text-xs">
                    © {new Date().getFullYear()} Websuem. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
