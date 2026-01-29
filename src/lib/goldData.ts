// Simulated gold price data
export const generateChartData = (timeframe: string) => {
  const basePrice = 2648.50;
  const volatility = timeframe === '1H' ? 5 : timeframe === '24H' ? 15 : timeframe === '7D' ? 40 : timeframe === '1M' ? 80 : 200;
  
  const points = timeframe === '1H' ? 12 : timeframe === '24H' ? 24 : timeframe === '7D' ? 7 : timeframe === '1M' ? 30 : 12;
  
  const labels = {
    '1H': (i: number) => `${i * 5}m`,
    '24H': (i: number) => `${i}:00`,
    '7D': (i: number) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    '1M': (i: number) => `Day ${i + 1}`,
    '1Y': (i: number) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  };

  return Array.from({ length: points }, (_, i) => ({
    time: labels[timeframe as keyof typeof labels](i),
    price: basePrice + (Math.sin(i * 0.5) * volatility) + (Math.random() - 0.5) * volatility * 0.5,
  }));
};

export const goldStats = {
  currentPrice: 2648.50,
  change: 12.35,
  changePercent: 0.47,
  high24h: 2658.20,
  low24h: 2632.15,
  openPrice: 2636.15,
  volume: '125.4K',
  marketCap: '$13.2T',
  allTimeHigh: 2685.42,
};
