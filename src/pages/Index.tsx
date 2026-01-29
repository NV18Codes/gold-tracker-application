import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Target, Gem, RefreshCw } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { StatCard } from "@/components/StatCard";
import { GoldChart } from "@/components/GoldChart";
import { TimeframeSelector } from "@/components/TimeframeSelector";
import { MarketInfo } from "@/components/MarketInfo";
import { generateChartData, goldStats } from "@/lib/goldData";
import { useGoldPrice } from "@/hooks/useGoldPrice";

const Index = () => {
  const [timeframe, setTimeframe] = useState('24H');
  const chartData = generateChartData(timeframe);
  const { data: livePrice, isLoading, isError, refetch } = useGoldPrice();
  
  // Use live data if available, fallback to static data
  const currentPrice = livePrice?.price ?? goldStats.currentPrice;
  const change = livePrice?.change ?? goldStats.change;
  const changePercent = livePrice?.changePercent ?? goldStats.changePercent;
  const high24h = livePrice?.high ?? goldStats.high24h;
  const low24h = livePrice?.low ?? goldStats.low24h;
  const openPrice = livePrice?.open ?? goldStats.openPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 pulse-gold">
                <Gem className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold gold-gradient-text">Digital Gold</h1>
                <p className="text-muted-foreground text-xs">Rate Monitor</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => refetch()} 
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                title="Refresh price"
              >
                <RefreshCw className={`w-4 h-4 text-muted-foreground ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10">
                <span className={`w-2 h-2 rounded-full ${isError ? 'bg-destructive' : 'bg-success'} animate-pulse`} />
                <span className={`text-sm font-medium ${isError ? 'text-destructive' : 'text-success'}`}>
                  {isLoading ? 'Loading...' : isError ? 'Offline' : 'Live'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Price Display */}
        <div className="mb-8">
          <PriceDisplay 
            price={currentPrice}
            change={change}
            changePercent={changePercent}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="24H High"
            value={`$${high24h.toLocaleString()}`}
            icon={TrendingUp}
            trend="up"
          />
          <StatCard 
            title="24H Low"
            value={`$${low24h.toLocaleString()}`}
            icon={TrendingDown}
            trend="down"
          />
          <StatCard 
            title="Open Price"
            value={`$${openPrice.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard 
            title="All-Time High"
            value={`$${goldStats.allTimeHigh.toLocaleString()}`}
            subtitle="Dec 2024"
            icon={Target}
          />
        </div>

        {/* Chart Section */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <TimeframeSelector selected={timeframe} onSelect={setTimeframe} />
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>Volume: {goldStats.volume}</span>
              </div>
            </div>
            <GoldChart data={chartData} timeframe={timeframe} />
          </div>
          
          <div className="lg:col-span-1">
            <MarketInfo />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Data provided for informational purposes only. Not financial advice.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
