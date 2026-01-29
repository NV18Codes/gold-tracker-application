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

    console.log('Fetching gold prices from GoldAPI.io...')
    
    // Fetch both USD and INR prices in parallel
    const [usdResponse, inrResponse] = await Promise.all([
      fetch('https://www.goldapi.io/api/XAU/USD', {
        headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
      }),
      fetch('https://www.goldapi.io/api/XAU/INR', {
        headers: { 'x-access-token': apiKey, 'Content-Type': 'application/json' }
      })
    ])

    if (!usdResponse.ok) {
      const errorText = await usdResponse.text()
      console.error('GoldAPI USD error:', usdResponse.status, errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch USD gold price', details: errorText }),
        { status: usdResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const usdData = await usdResponse.json()
    let inrData = null
    
    if (inrResponse.ok) {
      inrData = await inrResponse.json()
      console.log('INR price fetched successfully:', inrData.price)
    } else {
      console.warn('Failed to fetch INR price, continuing with USD only')
      await inrResponse.text() // consume response body
    }

    console.log('Gold prices fetched successfully - USD:', usdData.price, 'INR:', inrData?.price)

    // Transform the response to match our frontend expectations
    const result = {
      usd: {
        price: usdData.price,
        previousClose: usdData.prev_close_price,
        open: usdData.open_price,
        high: usdData.high_price,
        low: usdData.low_price,
        change: usdData.ch,
        changePercent: usdData.chp,
      },
      inr: inrData ? {
        price: inrData.price,
        previousClose: inrData.prev_close_price,
        open: inrData.open_price,
        high: inrData.high_price,
        low: inrData.low_price,
        change: inrData.ch,
        changePercent: inrData.chp,
      } : null,
      timestamp: usdData.timestamp,
      metal: usdData.metal
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
