'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Websuem Home">
          <Image
            src="/logo.png"
            alt="Websuem Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="font-heading font-bold text-2xl text-deep-purple">WEBSUEM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Portfolio
          </Link>
          <Link href="/pricing" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Pricing
          </Link>
          <Link href="/process" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            Process
          </Link>
          <Link href="/about" className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors">
            About
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-deep-purple p-2"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-6 py-4 bg-white border-t border-gray-100">
          <div className="flex flex-col gap-4">
            <Link
              href="/services"
              className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Portfolio
            </Link>
            <Link
              href="/pricing"
              className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <Link
              href="/process"
              className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Process
            </Link>
            <Link
              href="/about"
              className="text-deep-purple hover:text-vibrant-yellow font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link href="/contact" onClick={closeMenu}>
              <Button className="w-full bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 font-bold mt-2">
                Book a Call
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
