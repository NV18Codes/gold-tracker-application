import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GoldPriceData {
  price: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  timestamp: number;
  currency: string;
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
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
    retry: 2,
  });
}
