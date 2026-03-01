'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (formData: FormData) => Promise<{ error?: string } | void>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await onSubmit(formData);

    if (result && 'error' in result && result.error) {
      toast.error(result.error);
      setLoading(false);
    }
  }

  return (
    <div className='w-full max-w-md'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-[#111111] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden'
      >
        <div className='absolute top-0 right-0 p-8 opacity-5'>
          <Rocket className='w-24 h-24 text-[#D4AF37]' />
        </div>

        <div className='relative z-10 space-y-8'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-white'>
              {type === 'login' ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className='mt-2 text-sm text-gray-400'>
              {type === 'login'
                ? 'Access your Websuem projects and tracking.'
                : 'Create your account to start your next big project.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {type === 'signup' && (
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-400'>Full Name</label>
                <input
                  required
                  name="fullName"
                  type='text'
                  className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all'
                  placeholder='John Doe'
                />
              </div>
            )}

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-400'>Email Address</label>
              <input
                required
                name="email"
                type='email'
                className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all'
                placeholder='john@example.com'
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium text-gray-400'>Password</label>
                {type === 'login' && (
                  <Link href='/forgot-password' title="Forgot Password" className='text-xs text-[#D4AF37] hover:text-[#B8972D] transition-colors'>
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                required
                name="password"
                type='password'
                className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all'
                placeholder='••••••••'
              />
            </div>

            <button
              disabled={loading}
              className='w-full bg-[#D4AF37] hover:bg-[#B8972D] disabled:bg-[#D4AF37]/50 text-background font-bold py-4 rounded-xl shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 group disabled:cursor-not-allowed'
            >
              {loading ? (
                <Loader2 className='w-5 h-5 animate-spin' />
              ) : (
                <>
                  {type === 'login' ? 'Login' : 'Create Account'}
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </>
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-sm text-gray-500'>
              Account creation is managed by the administrator. Contact support if you need access.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
