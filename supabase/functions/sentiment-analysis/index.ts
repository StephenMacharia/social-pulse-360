
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text } = await req.json()

    // Simple sentiment analysis simulation
    const positiveWords = ['great', 'amazing', 'excellent', 'love', 'wonderful', 'fantastic', 'perfect', 'awesome']
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'disappointing', 'poor']
    
    const words = text.toLowerCase().split(/\s+/)
    let score = 0
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1
      if (negativeWords.includes(word)) score -= 1
    })
    
    // Normalize score to -1 to 1 range
    const normalizedScore = Math.max(-1, Math.min(1, score / words.length * 10))
    
    let label = 'neutral'
    if (normalizedScore > 0.2) label = 'positive'
    else if (normalizedScore < -0.2) label = 'negative'

    return new Response(
      JSON.stringify({ 
        sentiment: normalizedScore,
        sentiment_label: label,
        confidence: Math.abs(normalizedScore)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
