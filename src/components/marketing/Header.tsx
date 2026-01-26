import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-heading font-bold text-2xl text-deep-purple">
          WEBSUEM
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Portfolio
          </Link>
          <Link href="/process" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Process
          </Link>
          <Link href="/about" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 font-bold">
              Book a Call
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className="md:hidden text-deep-purple">
          <span className="sr-only">Open menu</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
