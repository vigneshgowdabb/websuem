'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Services from '@/components/sections/Services';
import { useRef } from 'react';
import Link from 'next/link';
import { TextReveal, SectionReveal } from '@/components/ui/Reveal';
import { ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';

import Footer from '@/components/layout/Footer';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0.1]);

  return (
    <main ref={containerRef} className='relative bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      {/* Immersive Hero with "Masked" Visuals */}
      <section className='relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24'>
        <div className='text-center z-10 max-w-5xl mt-8 sm:mt-0'>
          <SectionReveal>
            <span className='text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-[#D4AF37] mb-8 block'>
              Digital Excellence
            </span>
          </SectionReveal>

          <h1 className='text-6xl sm:text-[9vw] font-serif font-light leading-[0.85] tracking-tighter text-foreground mb-12'>
            <span className="sr-only">Websuem: Next-Gen Web Design and AI Agency. </span>
            <TextReveal text="Designing" delay={0.1} />
            <span className='italic font-light opacity-80'>
              <TextReveal text="Intelligence" delay={0.2} />
            </span>
            <TextReveal text="into Motion." delay={0.3} />
          </h1>

          <SectionReveal delay={0.8}>
            <p className='max-w-xl mx-auto text-sm sm:text-lg text-gray-400 font-sans leading-relaxed tracking-wide opacity-60 mb-12'>
              Websuem is a next-gen digital studio. We build high-performance ecosystems for founders who demand excellence without compromise.
            </p>
            <Link href='/contact' className='group relative inline-flex items-center gap-4 px-12 py-5 overflow-hidden rounded-full border border-[#D4AF37]/20 transition-all duration-500 hover:border-[#D4AF37]'>
              <span className='relative z-10 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-background transition-colors duration-500'>
                Initiate Project
              </span>
              <div className='absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.77,0,0.175,1]' />
              <ArrowRight className='w-4 h-4 relative z-10 text-[#D4AF37] group-hover:text-background transition-colors' />
            </Link>
          </SectionReveal>
        </div>

        {/* Cinematic Background - Simulating masked video/fluidity */}
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className='absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform'
        >
          <div className='w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,transparent_70%)]' />
          <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")] opacity-10 mix-blend-overlay' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#D4AF37,transparent_60%)] blur-[100px] opacity-[0.05] transform-gpu' />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4'
        >
          <div className='w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent animate-bounce' />
        </motion.div>
      </section>

      {/* Featured Quote - Oroya Style */}
      <section className='py-40 px-6 sm:px-12 border-t border-white/5'>
        <div className='max-w-4xl mx-auto text-center'>
          <SectionReveal>
            <h2 className='text-3xl sm:text-5xl font-serif italic text-gray-400 leading-relaxed'>
              "The detail is not the detail. <br className='hidden sm:block' /> It is the design."
            </h2>
            <p className='mt-8 text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37]'>— Charles Eames</p>
          </SectionReveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id='about' className='relative py-40 px-6 sm:px-12 bg-[#050505]'>
        <div className='max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start'>
          <div className='sticky top-40'>
            <SectionReveal>
              <h2 className='text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-6'>Philosophy</h2>
              <h3 className='text-5xl sm:text-7xl font-serif font-light leading-tight text-[#FDFDFD]'>
                Incisive Design. <br />
                <span className='italic opacity-60'>Infallible Code.</span>
              </h3>
            </SectionReveal>
          </div>
          <div className='space-y-16 pt-12'>
            <SectionReveal delay={0.2}>
              <p className='text-xl sm:text-2xl font-serif font-light leading-relaxed text-gray-400'>
                Websuem operates at the edge of possibility. We don't just build websites; we engineer digital engines that drive growth, authority, and transformation.
              </p>
            </SectionReveal>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-white/5'>
              <SectionReveal delay={0.4}>
                <div className='text-3xl font-serif text-[#FDFDFD] mb-4 text-glow'>48h</div>
                <p className='text-xs font-sans uppercase tracking-widest text-gray-500 leading-loose'>
                  Rapid Prototyping. Your vision, materialized with precision in the blink of an eye.
                </p>
              </SectionReveal>
              <SectionReveal delay={0.6}>
                <div className='text-3xl font-serif text-[#FDFDFD] mb-4 text-glow'>AI-Core</div>
                <p className='text-xs font-sans uppercase tracking-widest text-gray-500 leading-loose'>
                  Augmented intelligence applied to every stage of development for superior outcomes.
                </p>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <Services />

      <Footer />
    </main>
  );
}
