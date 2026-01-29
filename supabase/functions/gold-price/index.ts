import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

// Fallback data when API quota is exceeded (realistic gold prices per troy ounce)
const FALLBACK_DATA = {
  usd: {
    price: 3280.50,
    prev_close_price: 3265.20,
    open_price: 3270.00,
    high_price: 3295.80,
    low_price: 3258.40,
    ch: 15.30,
    chp: 0.47,
  },
  inr: {
    price: 285000,
    prev_close_price: 283500,
    open_price: 284000,
    high_price: 287500,
    low_price: 282800,
    ch: 1500,
    chp: 0.53,
  },
  timestamp: Date.now(),
  metal: 'XAU',
  isFallback: true
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Convert from per troy ounce to per 10 grams
  // 1 troy ounce = 31.1035 grams
  const TROY_OUNCE_TO_10G = 10 / 31.1035;

  try {
    const apiKey = Deno.env.get('GOLDAPI_KEY')
    
    if (!apiKey) {
      console.warn('GOLDAPI_KEY not configured, using fallback data')
      return returnFallbackData(TROY_OUNCE_TO_10G)
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

    // If API quota exceeded or other error, use fallback data
    if (!usdResponse.ok) {
      const errorText = await usdResponse.text()
      console.warn('GoldAPI USD error:', usdResponse.status, errorText)
      
      // Check if it's a quota error
      if (usdResponse.status === 403 && errorText.includes('quota')) {
        console.log('API quota exceeded, using fallback data')
        return returnFallbackData(TROY_OUNCE_TO_10G)
      }
      
      // For other errors, still return fallback
      console.log('API error, using fallback data')
      return returnFallbackData(TROY_OUNCE_TO_10G)
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

    // Transform the response to match our frontend expectations (per 10 grams)
    const result = {
      usd: {
        price: usdData.price * TROY_OUNCE_TO_10G,
        previousClose: usdData.prev_close_price * TROY_OUNCE_TO_10G,
        open: usdData.open_price * TROY_OUNCE_TO_10G,
        high: usdData.high_price * TROY_OUNCE_TO_10G,
        low: usdData.low_price * TROY_OUNCE_TO_10G,
        change: usdData.ch * TROY_OUNCE_TO_10G,
        changePercent: usdData.chp,
      },
      inr: inrData ? {
        price: inrData.price * TROY_OUNCE_TO_10G,
        previousClose: inrData.prev_close_price * TROY_OUNCE_TO_10G,
        open: inrData.open_price * TROY_OUNCE_TO_10G,
        high: inrData.high_price * TROY_OUNCE_TO_10G,
        low: inrData.low_price * TROY_OUNCE_TO_10G,
        change: inrData.ch * TROY_OUNCE_TO_10G,
        changePercent: inrData.chp,
      } : null,
      timestamp: usdData.timestamp,
      metal: usdData.metal,
      isFallback: false
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error fetching gold price:', error, '- using fallback data')
    return returnFallbackData(TROY_OUNCE_TO_10G)
  }
})

function returnFallbackData(conversionRate: number) {
  const result = {
    usd: {
      price: FALLBACK_DATA.usd.price * conversionRate,
      previousClose: FALLBACK_DATA.usd.prev_close_price * conversionRate,
      open: FALLBACK_DATA.usd.open_price * conversionRate,
      high: FALLBACK_DATA.usd.high_price * conversionRate,
      low: FALLBACK_DATA.usd.low_price * conversionRate,
      change: FALLBACK_DATA.usd.ch * conversionRate,
      changePercent: FALLBACK_DATA.usd.chp,
    },
    inr: {
      price: FALLBACK_DATA.inr.price * conversionRate,
      previousClose: FALLBACK_DATA.inr.prev_close_price * conversionRate,
      open: FALLBACK_DATA.inr.open_price * conversionRate,
      high: FALLBACK_DATA.inr.high_price * conversionRate,
      low: FALLBACK_DATA.inr.low_price * conversionRate,
      change: FALLBACK_DATA.inr.ch * conversionRate,
      changePercent: FALLBACK_DATA.inr.chp,
    },
    timestamp: FALLBACK_DATA.timestamp,
    metal: FALLBACK_DATA.metal,
    isFallback: true
  }

  return new Response(
    JSON.stringify(result),
    { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version', 'Content-Type': 'application/json' } }
  )
}