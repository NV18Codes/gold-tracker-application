import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GOLDAPI_KEY')
    
    if (!apiKey) {
      console.error('GOLDAPI_KEY not configured')
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Fetching gold price from GoldAPI.io...')
    
    const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GoldAPI error:', response.status, errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch gold price', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    console.log('Gold price fetched successfully:', data.price)

    // Transform the response to match our frontend expectations
    const result = {
      price: data.price,
      previousClose: data.prev_close_price,
      open: data.open_price,
      high: data.high_price,
      low: data.low_price,
      change: data.ch,
      changePercent: data.chp,
      timestamp: data.timestamp,
      currency: data.currency,
      metal: data.metal
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error fetching gold price:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
