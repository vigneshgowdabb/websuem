'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface CrmUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'admin' | 'member' | 'viewer'
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [crmUser, setCrmUser] = useState<CrmUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Fetch CRM user profile
          const { data: crmUserData } = await supabase
            .from('crm_users')
            .select('*')
            .eq('id', user.id)
            .single()

          if (crmUserData) {
            setCrmUser(crmUserData)
          } else {
            // Create basic CRM user from auth data
            setCrmUser({
              id: user.id,
              email: user.email!,
              full_name: user.user_metadata?.full_name || user.email,
              avatar_url: user.user_metadata?.avatar_url,
              role: 'member',
              settings: {},
              created_at: user.created_at,
              updated_at: user.updated_at || user.created_at,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null
        setUser(user)

        if (user) {
          const { data: crmUserData } = await supabase
            .from('crm_users')
            .select('*')
            .eq('id', user.id)
            .single()

          if (crmUserData) {
            setCrmUser(crmUserData)
          }
        } else {
          setCrmUser(null)
        }

        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    crmUser,
    loading,
    isAuthenticated: !!user,
  }
}
