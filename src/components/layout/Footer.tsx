'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='relative pt-40 pb-12 px-6 sm:px-12 border-t border-border bg-background overflow-hidden'>
      <div className='max-w-[1400px] mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-16 mb-24 relative z-10'>
          <div className='md:col-span-2'>
            <div className="relative h-12 w-48 hidden dark:block">
              <Image src="/images/Logo1.png" alt="Websuem Logo" fill priority className="object-contain object-left mix-blend-screen invert" />
            </div>
            <div className="relative h-12 w-48 block dark:hidden">
              <Image src="/images/Logo1.png" alt="Websuem Logo" fill priority className="object-contain object-left mix-blend-multiply" />
            </div>
            <p className='mt-8 text-foreground/60 max-w-sm font-sans text-sm leading-relaxed'>
              The premier digital studio for the next generation of founders.
              Blending human intuition with machine intelligence to create excellence at scale.
            </p>
            <div className='flex gap-6 mt-12'>
              <a href='https://www.instagram.com/websuem/' target='_blank' rel='noopener noreferrer' className='text-foreground/50 hover:text-[#D4AF37] transition-colors'><Instagram size={20} strokeWidth={1.5} /></a>
              <a href='https://x.com/websuem' target='_blank' rel='noopener noreferrer' className='text-foreground/50 hover:text-[#D4AF37] transition-colors'><Twitter size={20} strokeWidth={1.5} /></a>
              <a href='https://www.linkedin.com/company/websuem/' target='_blank' rel='noopener noreferrer' className='text-foreground/50 hover:text-[#D4AF37] transition-colors'><Linkedin size={20} strokeWidth={1.5} /></a>
              <a href='https://www.facebook.com/profile.php?id=61587178088685' target='_blank' rel='noopener noreferrer' className='text-foreground/50 hover:text-[#D4AF37] transition-colors'><Facebook size={20} strokeWidth={1.5} /></a>
            </div>
          </div>

          <div>
            <h4 className='text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8'>Navigation</h4>
            <ul className='space-y-4 text-sm text-foreground/60 font-sans'>
              <li><Link href='/about' className='hover:text-foreground transition-colors'>Philosophy</Link></li>
              <li><Link href='/services' className='hover:text-foreground transition-colors'>Expertise</Link></li>
              <li><Link href='/portal' className='hover:text-foreground transition-colors'>Client Portal</Link></li>
              <li><Link href='/contact' className='hover:text-foreground transition-colors'>Initiate Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8'>Legal</h4>
            <ul className='space-y-4 text-sm text-foreground/60 font-sans'>
              <li><Link href='/legal' className='hover:text-foreground transition-colors'>Legal Notice</Link></li>
              <li><Link href='/privacy' className='hover:text-foreground transition-colors'>Privacy Policy</Link></li>
              <li><Link href='/cookies' className='hover:text-foreground transition-colors'>Cookies Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-border text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/40 relative z-10'>
          <p>© 2026 Websuem Digital Studio. All rights reserved.</p>
        </div>
      </div>

      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 text-[30vw] font-serif font-bold text-foreground/[0.02] leading-none pointer-events-none select-none uppercase tracking-tighter'>
        Websuem
      </div>
    </footer>
  );
}
