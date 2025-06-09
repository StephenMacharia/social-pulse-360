
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { category = 'tech', platform = 'instagram' } = await req.json()

    // Simulate influencer discovery
    const influencers = [
      {
        name: 'Alex Chen',
        platform,
        handle: '@alexchen_tech',
        follower_count: 125000,
        engagement_rate: 3.2,
        category,
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        bio: 'Tech enthusiast sharing the latest gadgets and software reviews.',
        is_tracked: false
      },
      {
        name: 'Maria Rodriguez',
        platform,
        handle: '@maria_tech_life',
        follower_count: 89000,
        engagement_rate: 4.1,
        category,
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        bio: 'Software engineer by day, tech reviewer by night. Building the future.',
        is_tracked: false
      },
      {
        name: 'David Kim',
        platform,
        handle: '@davidkimtech',
        follower_count: 67000,
        engagement_rate: 2.8,
        category,
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        bio: 'Startup founder sharing insights on emerging technologies.',
        is_tracked: false
      }
    ]

    // Insert influencers into database
    const influencerInserts = influencers.map(influencer => ({
      ...influencer,
      user_id: user.id
    }))

    const { data, error } = await supabaseClient
      .from('influencers')
      .insert(influencerInserts)
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, influencers: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
