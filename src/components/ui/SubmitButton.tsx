'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      disabled={pending}
      className='group relative px-12 py-4 overflow-hidden rounded-full border border-[#D4AF37]/20 transition-all duration-500 hover:border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed'
    >
      <span className='relative z-10 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-background transition-colors duration-500 flex items-center justify-center gap-2'>
        {pending ? (
          <>
            Transmitting...
            <Loader2 className='w-3 h-3 animate-spin' />
          </>
        ) : (
          'Send Inquiry'
        )}
      </span>
      <div className='absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.77,0,0.175,1]' />
    </button>
  )
}
