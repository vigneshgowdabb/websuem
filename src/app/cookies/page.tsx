'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionReveal } from '@/components/ui/Reveal';

export default function CookiesPage() {
  return (
    <main className='relative min-h-screen bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      <section className='pt-48 pb-32 px-6 sm:px-12'>
        <div className='max-w-[800px] mx-auto'>
          <SectionReveal>
            <h1 className='text-4xl sm:text-6xl font-serif font-light text-foreground mb-16'>Cookies Policy</h1>

            <div className='space-y-12 text-foreground/60 font-sans leading-relaxed'>
              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>1. What is a cookie?</h2>
                <p>A "cookie" is a small file, usually consisting of letters and numbers, sent by the web server to your browser's cookie file located on your computer's hard drive.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>2. Purpose of cookies</h2>
                <p>We use cookies to improve navigation on the site, analyze its usage, and provide you with tailored content.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>3. Cookie Management</h2>
                <p>You can choose to disable these cookies at any time via your browser settings. However, please note that disabling cookies may reduce or prevent accessibility to all or part of the services offered by the site.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
