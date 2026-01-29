import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

async function fetchGoldPrice(): Promise<GoldPriceData> {
  const { data, error } = await supabase.functions.invoke('gold-price');
  
  if (error) {
    console.error('Error fetching gold price:', error);
    throw new Error(error.message || 'Failed to fetch gold price');
  }
  
  return data;
}

export function useGoldPrice() {
  return useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldPrice,
    refetchInterval: 6 * 60 * 60 * 1000, // Refetch every 6 hours
    staleTime: 3 * 60 * 60 * 1000, // Consider data stale after 3 hours
    retry: 2,
  });
}
