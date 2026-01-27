'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ClientForm } from '@/components/crm/ClientForm'
import { createClient as createClientAction } from '@/lib/actions/clients'
import { toast } from 'sonner'

export function AddClientDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (data: any) => {
        try {
            const result = await createClientAction(data)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Client added successfully')
                setOpen(false)
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
                <span>Add Client</span>
            </Button>

            <ClientForm
                open={open}
                onOpenChange={setOpen}
                onSubmit={handleSubmit}
            />
        </>
    )
}
