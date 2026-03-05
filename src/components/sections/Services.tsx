'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SectionReveal } from '@/components/ui/Reveal';

const services = [
  {
    id: '01',
    title: 'Digital Architecture',
    description: 'Engineering bespoke web ecosystems that balance extreme performance with aesthetic perfection. At Websuem, our core philosophy revolves around creating robust, scalable, and lightning-fast digital solutions tailored for ambitious startups. We specialize in leveraging Next.js and high-speed cloud infrastructure to ensure your platform not only looks stunning but operates flawlessly under heavy traffic. From headless commerce solutions to custom web applications, our digital architecture services lay the unbreakable foundation your brand needs to scale globally. We ensure Lighthouse 100 performance scores across all critical metrics, combining clean code with state-of-the-art deployment pipelines to give you an unparalleled competitive edge in the digital arena.',
    details: [
      'Next.js 15 & React 19 Implementation',
      'Performance Optimization (Lighthouse 100)',
      'Headless CMS Integration',
      'E-commerce & Custom Web Apps'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Intelligent Automation',
    description: 'We harness the transformative power of Large Language Models (LLMs) and advanced AI systems to streamline agency workflows, reduce operational friction by up to 80%, and supercharge your team’s productivity. Our intelligent automation services seamlessly integrate AI directly into your business processes, creating autonomous agents capable of handling complex logic, data-driven decision-making, and round-the-clock customer interactions. By connecting external APIs and orchestrating workflow automation tools like Zapier or n8n, we build smart infrastructures that learn and adapt. The result is a highly efficient operational ecosystem where AI handles repetitive friction, allowing your human talent to focus exclusively on high-level strategy and creative execution.',
    details: [
      'Custom LLM Integration',
      'Autonomous Agent Development',
      'Workflow Automation (Zapier/n8n)',
      'Data-Driven Decision Systems'
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Visual Alchemy',
    description: 'Forging brand identities that resonate deeply in the modern digital age requires more than just a logo—it demands a holistic visual system. Our visual alchemy services create striking, premium interfaces that communicate unshakeable authority and unparalleled quality from the very first interaction. We meticulously design user experiences and user interfaces (UX/UI) that guide visitors through an intuitive, emotionally engaging journey. Incorporating high-end 3D visuals, sophisticated typography, and fluid motion design, we sculpt digital environments that leave a lasting impression. From the initial strategic prototyping to the final polished implementation, we ensure your brand’s visual narrative perfectly aligns with its technological excellence.',
    details: [
      'Brand Identity Design',
      'Motion & Interaction Design',
      'UX/UI Strategy',
      '3D Visuals & Prototypes'
    ],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop'
  }
];

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>('01');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section id='services' className='relative py-40 px-6 sm:px-12 bg-background overflow-hidden'>
      <div className='max-w-[1400px] mx-auto'>
        <div className='mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12'>
          <div className='max-w-2xl'>
            <SectionReveal>
              <h2 className='text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8'>Expertise</h2>
              <h3 className='text-5xl sm:text-8xl font-serif font-light tracking-tight text-foreground'>
                Services <br />
                <span className='italic opacity-60'>Refined.</span>
              </h3>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.2}>
            <p className='text-gray-500 max-w-sm font-sans text-sm leading-relaxed tracking-wide mb-4'>
              Our digital atelier provides elite services at the intersection of design and technology. We deploy solutions that are as robust as they are beautiful.
            </p>
          </SectionReveal>
        </div>

        <div className='relative divide-y divide-white/5 border-t border-b border-white/5'>
          {services.map((service, index) => {
            const isExpanded = expanded === service.id;
            return (
              <div
                key={service.id}
                className='relative'
                onMouseEnter={() => setHoveredImage(service.image)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : service.id)}
                  className='w-full py-12 flex flex-col lg:flex-row gap-8 lg:items-center text-left group transition-all duration-500'
                >
                  <div className='flex-shrink-0 w-24'>
                    <span className='text-xs font-sans font-bold text-[#D4AF37] tracking-[0.2em]'>
                      {service.id}
                    </span>
                  </div>

                  <div className='flex-grow'>
                    <h4 className={cn(
                      'text-3xl sm:text-6xl font-serif font-light text-foreground transition-all duration-700',
                      isExpanded ? 'italic' : 'group-hover:translate-x-4'
                    )}>
                      {service.title}
                    </h4>
                  </div>

                  <div className='flex-shrink-0 ml-auto'>
                    <div className={cn(
                      'w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500',
                      isExpanded ? 'bg-[#D4AF37] border-[#D4AF37]' : 'group-hover:border-white/30'
                    )}>
                      {isExpanded ? <Minus className='text-background' size={20} /> : <Plus className='text-gray-500 group-hover:text-foreground' size={20} />}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className='overflow-hidden'
                    >
                      <div className='pb-16 pl-0 lg:pl-32 grid grid-cols-1 lg:grid-cols-2 gap-16'>
                        <div className='space-y-8'>
                          <p className='text-xl text-gray-400 font-serif leading-relaxed'>
                            {service.description}
                          </p>
                          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4'>
                            {service.details.map((detail) => (
                              <li key={detail} className='flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-widest text-gray-600'>
                                <div className='w-1 h-1 rounded-full bg-[#D4AF37]' />
                                {detail}
                              </li>
                            ))}
                          </ul>

                        </div>
                        <div className='hidden lg:block relative aspect-video rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000'>
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className='object-cover scale-110 hover:scale-100 transition-transform duration-[2s]'
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Image Mask Effect (Oroya Prestations Style) */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'>
        {/* Could add mouse-following images here if needed for more "wow" factor */}
      </div>
    </section>
  );
}
