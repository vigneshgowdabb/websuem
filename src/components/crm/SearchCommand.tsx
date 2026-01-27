'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Users,
  Building2,
  Calendar,
  Mail,
  Settings,
  LayoutDashboard,
  Search,
  Plus,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Lead, Client } from '@/types/database'

interface SearchCommandProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SearchCommand({ open: controlledOpen, onOpenChange }: SearchCommandProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, setOpen])

  // Search when query changes
  useEffect(() => {
    const searchItems = async () => {
      if (!search || search.length < 2) {
        setLeads([])
        setClients([])
        return
      }

      setLoading(true)
      const supabase = createClient()

      // Search leads
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*')
        .or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`)
        .limit(5)

      // Search clients
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .or(
          `company_name.ilike.%${search}%,contact_name.ilike.%${search}%,email.ilike.%${search}%`
        )
        .limit(5)

      setLeads(leadsData || [])
      setClients(clientsData || [])
      setLoading(false)
    }

    const timeout = setTimeout(searchItems, 200)
    return () => clearTimeout(timeout)
  }, [search])

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search leads, clients, or type a command..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? 'Searching...' : 'No results found.'}
        </CommandEmpty>

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/leads'))}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/clients'))}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/bookings/schedule'))}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/leads'))}>
            <Users className="mr-2 h-4 w-4" />
            Leads
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/clients'))}>
            <Building2 className="mr-2 h-4 w-4" />
            Clients
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/bookings'))}>
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/email'))}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </CommandItem>
        </CommandGroup>

        {/* Search Results */}
        {leads.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Leads">
              {leads.map((lead) => (
                <CommandItem
                  key={lead.id}
                  onSelect={() =>
                    runCommand(() => router.push(`/dashboard/leads/${lead.id}`))
                  }
                >
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <div className="flex flex-col">
                    <span>{lead.name}</span>
                    <span className="text-xs text-gray-400">
                      {lead.email} {lead.company && `• ${lead.company}`}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {clients.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Clients">
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  onSelect={() =>
                    runCommand(() => router.push(`/dashboard/clients/${client.id}`))
                  }
                >
                  <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                  <div className="flex flex-col">
                    <span>{client.company_name}</span>
                    <span className="text-xs text-gray-400">
                      {client.contact_name} {client.email && `• ${client.email}`}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
