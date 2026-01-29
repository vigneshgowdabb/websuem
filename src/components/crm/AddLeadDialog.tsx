'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadForm } from '@/components/crm/LeadForm'
import { createLead } from '@/lib/actions/leads'
import { toast } from 'sonner'
import type { LeadInput } from '@/lib/validations/lead'

interface AddLeadDialogProps {
    onSuccess?: () => void
}

export function AddLeadDialog({ onSuccess }: AddLeadDialogProps) {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (data: LeadInput) => {
        try {
            const result = await createLead(data)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Lead added successfully')
                setOpen(false)
                onSuccess?.()
            }
        } catch {
            toast.error('Something went wrong')
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-deep-purple text-white rounded-xl hover:bg-deep-purple/90 transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" />
                <span>Add Lead</span>
            </Button>

            <LeadForm
                open={open}
                onOpenChange={setOpen}
                onSubmit={handleSubmit}
            />
        </>
    )
}
