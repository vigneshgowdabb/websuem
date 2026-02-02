"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram, Facebook, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Web Development", href: "/services#web" },
      { label: "Social Media", href: "/services#social" },
      { label: "AI Automation", href: "/services#automation" },
      { label: "Brand Identity", href: "/services#branding" },
    ],
    social: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/websuem/",
        icon: Linkedin,
      },
      { label: "Twitter", href: "https://x.com/websuem", icon: Twitter },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61587178088685",
        icon: Facebook,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/websuem/",
        icon: Instagram,
      },
    ],
  };

  return (
    <footer className="bg-deep-purple text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Websuem Home">
              <Image
                src="/logo.png"
                alt="Websuem Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-heading font-bold">WEBSUEM</span>
            </Link>
            <p className="text-white/60 mt-4 mb-6">
              Premium websites, social media management & AI automation —
              delivered in days, not months.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-vibrant-yellow hover:text-deep-purple transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-vibrant-yellow transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-vibrant-yellow transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Get in Touch</h4>
            <a
              href="mailto:hello@websuem.com"
              className="flex items-center gap-2 text-white/60 hover:text-vibrant-yellow transition-colors duration-300 mb-4"
            >
              <Mail className="w-4 h-4" />
              hello@websuem.com
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-vibrant-yellow text-deep-purple font-semibold rounded-lg hover:shadow-glow transition-all duration-300 mt-4"
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Websuem. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-white/40 text-sm hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 text-sm hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Also export as named export for backward compatibility
export { Footer };
