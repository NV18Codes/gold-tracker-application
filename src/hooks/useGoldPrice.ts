import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface CurrencyPriceData {
  price: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
}

export interface GoldPriceData {
  usd: CurrencyPriceData;
  inr: CurrencyPriceData | null;
  timestamp: number;
  metal: string;
}

async function fetchGoldPrice(): Promise<GoldPriceData | null> {
  try {
    const { data, error } = await supabase.functions.invoke('gold-price');
    
    if (error) {
      console.error('Error fetching gold price:', error);
      // Return null instead of throwing to prevent error state
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch gold price:', error);
    // Return null to gracefully handle errors
    return null;
  }
}

export function useGoldPrice() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldPrice,
    enabled: !!user, // Only fetch when user is authenticated
    refetchInterval: 6 * 60 * 60 * 1000, // Refetch every 6 hours
    staleTime: 3 * 60 * 60 * 1000, // Consider data stale after 3 hours
    retry: 1, // Retry once, then gracefully use fallback data
    retryDelay: 2000, // Wait 2 seconds before retry
  });
}
