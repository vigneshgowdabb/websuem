'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const supabase = createClient();
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/95 backdrop-blur-2xl border-b border-border py-4'
          : 'bg-transparent py-8'
      )}
    >
      <div className='max-w-[1800px] mx-auto px-6 sm:px-12 flex items-center justify-between'>
        <Link href='/' className='group flex items-center gap-3'>
          <div className="relative h-8 w-32 hidden dark:block">
            <Image src="/images/logo1.png" alt="Websuem Logo" fill priority className="object-contain object-left mix-blend-screen invert" />
          </div>
          <div className="relative h-8 w-32 block dark:hidden">
            <Image src="/images/logo1.png" alt="Websuem Logo" fill priority className="object-contain object-left mix-blend-multiply" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-12'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-[#D4AF37] transition-colors relative group'
            >
              {link.name}
              <span className='absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all group-hover:w-full' />
            </Link>
          ))}

          {!loading && (
            user ? (
              <Link
                href='/portal'
                className='text-[11px] font-sans font-bold uppercase tracking-[0.2em] px-6 py-2.5 border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37] hover:text-background transition-all duration-500 flex items-center gap-2'
              >
                Portal
              </Link>
            ) : (
              <Link
                href='/login'
                className='text-[11px] font-sans font-bold uppercase tracking-[0.2em] px-8 py-2.5 bg-foreground text-background rounded-full hover:bg-[#D4AF37] transition-all duration-500'
              >
                Entrance
              </Link>
            )
          )}

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-foreground/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-6">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
          )}
          <button
            className='text-foreground p-2 -mr-2'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='fixed inset-0 top-0 bg-background z-40 flex flex-col justify-center items-center'
          >
            <div className='space-y-8 text-center'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className='block text-4xl font-serif italic text-foreground hover:text-[#D4AF37] transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className='pt-8'>
                {user ? (
                  <Link
                    href='/portal'
                    className='text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37]'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Portal
                  </Link>
                ) : (
                  <Link
                    href='/login'
                    className='text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37]'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrance
                  </Link>
                )}
              </div>
            </div>
            <button
              className='absolute top-8 right-12 text-foreground'
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
