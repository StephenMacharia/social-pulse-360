
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'

interface Mention {
  id: string
  platform: string
  content: string
  author: string
  author_url?: string
  post_url?: string
  sentiment: number
  sentiment_label: string
  engagement_count: number
  reach: number
  mention_date: string
  created_at: string
}

export const useMentions = () => {
  const { user } = useAuth()
  const [mentions, setMentions] = useState<Mention[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadMentions()
    }
  }, [user])

  const loadMentions = async () => {
    try {
      const { data, error } = await supabase
        .from('mentions')
        .select('*')
        .order('mention_date', { ascending: false })
        .limit(50)

      if (error) throw error
      setMentions(data || [])
    } catch (error) {
      console.error('Error loading mentions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchNewMentions = async (keywords: string[] = ['your brand']) => {
    try {
      const response = await supabase.functions.invoke('social-monitoring', {
        body: { keywords }
      })

      if (response.error) throw response.error
      
      await loadMentions() // Reload mentions after fetching new ones
      return response.data
    } catch (error) {
      console.error('Error fetching mentions:', error)
      throw error
    }
  }

  return {
    mentions,
    loading,
    loadMentions,
    fetchNewMentions
  }
}
