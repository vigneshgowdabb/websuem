'use client';

import AuthForm from '@/components/ui/AuthForm';
import { login } from '@/app/actions/auth';
import Navbar from '@/components/layout/Navbar';

export default function LoginPage() {
  return (
    <main className='relative min-h-screen bg-[#0A0A0A] flex flex-col'>
      <Navbar />
      <div className='flex-1 flex items-center justify-center px-4 py-32'>
        <AuthForm type='login' onSubmit={login} />
      </div>
    </main>
  );
}
