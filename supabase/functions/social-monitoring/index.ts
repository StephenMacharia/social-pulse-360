
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

    const { keywords = ['your brand'] } = await req.json()

    // Simulate social media monitoring data
    const mentions = [
      {
        platform: 'twitter',
        content: `Just tried ${keywords[0]} and I'm impressed! Great user experience.`,
        author: 'tech_reviewer_23',
        author_url: 'https://twitter.com/tech_reviewer_23',
        post_url: 'https://twitter.com/tech_reviewer_23/status/123456789',
        sentiment: 0.8,
        sentiment_label: 'positive',
        engagement_count: 45,
        reach: 1200,
        mention_date: new Date().toISOString()
      },
      {
        platform: 'facebook',
        content: `${keywords[0]} customer service could be better. Had to wait 30 minutes for support.`,
        author: 'Sarah Johnson',
        author_url: 'https://facebook.com/sarah.johnson',
        post_url: 'https://facebook.com/posts/123456789',
        sentiment: -0.6,
        sentiment_label: 'negative',
        engagement_count: 12,
        reach: 350,
        mention_date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        platform: 'instagram',
        content: `Using ${keywords[0]} for my morning routine. Works well!`,
        author: 'fitness_guru_mike',
        author_url: 'https://instagram.com/fitness_guru_mike',
        post_url: 'https://instagram.com/p/ABC123DEF456',
        sentiment: 0.4,
        sentiment_label: 'positive',
        engagement_count: 89,
        reach: 2100,
        mention_date: new Date(Date.now() - 172800000).toISOString()
      }
    ]

    // Insert mentions into database
    const mentionInserts = mentions.map(mention => ({
      ...mention,
      user_id: user.id
    }))

    const { data, error } = await supabaseClient
      .from('mentions')
      .insert(mentionInserts)
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, mentions: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
