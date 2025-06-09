
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'

interface Influencer {
  id: string
  name: string
  platform: string
  handle: string
  follower_count: number
  engagement_rate: number
  category?: string
  avatar_url?: string
  bio?: string
  is_tracked: boolean
  created_at: string
}

export const useInfluencers = () => {
  const { user } = useAuth()
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadInfluencers()
    }
  }, [user])

  const loadInfluencers = async () => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .order('follower_count', { ascending: false })

      if (error) throw error
      setInfluencers(data || [])
    } catch (error) {
      console.error('Error loading influencers:', error)
    } finally {
      setLoading(false)
    }
  }

  const discoverInfluencers = async (category: string = 'tech', platform: string = 'instagram') => {
    try {
      const response = await supabase.functions.invoke('influencer-discovery', {
        body: { category, platform }
      })

      if (response.error) throw response.error
      
      await loadInfluencers() // Reload influencers after discovery
      return response.data
    } catch (error) {
      console.error('Error discovering influencers:', error)
      throw error
    }
  }

  const toggleTracking = async (influencerId: string, isTracked: boolean) => {
    try {
      const { error } = await supabase
        .from('influencers')
        .update({ is_tracked: isTracked })
        .eq('id', influencerId)

      if (error) throw error
      await loadInfluencers()
    } catch (error) {
      console.error('Error updating influencer tracking:', error)
      throw error
    }
  }

  return {
    influencers,
    loading,
    loadInfluencers,
    discoverInfluencers,
    toggleTracking
  }
}
