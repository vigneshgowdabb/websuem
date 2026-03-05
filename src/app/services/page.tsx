'use client';

import Navbar from '@/components/layout/Navbar';
import Services from '@/components/sections/Services';
import { SectionReveal } from '@/components/ui/Reveal';
import Link from 'next/link';

import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  return (
    <main className='relative min-h-screen bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      {/* Hero */}
      <section className='pt-48 pb-12 px-6 sm:px-12'>
        <div className='max-w-[1400px] mx-auto'>
          <SectionReveal>
            <h2 className='text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-12'>Prestations</h2>
            <h1 className='text-6xl sm:text-[8vw] font-serif font-light leading-[0.9] tracking-tighter text-foreground mb-16'>
              <span className="sr-only">Web Design, AI Automation, and Branding Services. </span>
              Our Digital <br />
              <span className='italic opacity-60'>Expertise.</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <Services />

      <Footer />
    </main>
  );
}
