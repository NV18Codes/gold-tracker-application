import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Target, Gem, RefreshCw, Sparkles, LogOut, User } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { StatCard } from "@/components/StatCard";
import { GoldChart } from "@/components/GoldChart";
import { TimeframeSelector } from "@/components/TimeframeSelector";
import { MarketInfo } from "@/components/MarketInfo";
import { generateChartData, goldStats } from "@/lib/goldData";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [timeframe, setTimeframe] = useState('24H');
  const chartData = generateChartData(timeframe);
  const { data: livePrice, isLoading, isError, refetch } = useGoldPrice();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);
  
  // Use live data if available, fallback to static data
  const currentPrice = livePrice?.usd?.price ?? goldStats.currentPrice;
  const change = livePrice?.usd?.change ?? goldStats.change;
  const changePercent = livePrice?.usd?.changePercent ?? goldStats.changePercent;
  const high24h = livePrice?.usd?.high ?? goldStats.high24h;
  const low24h = livePrice?.usd?.low ?? goldStats.low24h;
  const openPrice = livePrice?.usd?.open ?? goldStats.openPrice;
  
  // INR data
  const inrPrice = livePrice?.inr?.price;
  const inrChange = livePrice?.inr?.change;
  const inrChangePercent = livePrice?.inr?.changePercent;

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="p-4 rounded-2xl bg-primary/10 pulse-gold">
          <Gem className="w-8 h-8 text-primary icon-glow animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/2 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-2xl sticky top-0 z-50 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 pulse-gold relative">
                <Gem className="w-7 h-7 text-primary icon-glow" />
                <div className="absolute inset-0 rounded-2xl bg-primary/5 animate-ping" style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold gold-gradient-text">Digital Gold</h1>
                  <Sparkles className="w-4 h-4 text-primary/50" />
                </div>
                <p className="text-muted-foreground/70 text-xs tracking-widest uppercase mt-0.5">Rate Monitor</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* User profile info */}
              <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-2xl bg-muted/30 border border-border/30">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {profile?.full_name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-border/50" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Assets</span>
                  <span className="text-sm font-semibold gold-gradient-text">₹17,63,000</span>
                </div>
              </div>
              
              <button 
                onClick={() => refetch()} 
                className="p-2.5 rounded-xl hover:bg-primary/10 transition-all duration-300 hover:scale-105 border border-transparent hover:border-primary/20"
                title="Refresh price"
              >
                <RefreshCw className={`w-5 h-5 text-muted-foreground hover:text-primary transition-colors ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <div className={`hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl backdrop-blur-sm border ${
                isError 
                  ? 'bg-destructive/10 border-destructive/20' 
                  : 'bg-success/10 border-success/20'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isError ? 'bg-destructive' : 'bg-success'} animate-pulse`} />
                <span className={`text-sm font-medium ${isError ? 'text-destructive' : 'text-success'}`}>
                  {isLoading ? 'Syncing...' : isError ? 'Offline' : 'Live'}
                </span>
              </div>
              <button 
                onClick={handleSignOut} 
                className="p-2.5 rounded-xl hover:bg-destructive/10 transition-all duration-300 hover:scale-105 border border-transparent hover:border-destructive/20"
                title="Sign out"
              >
                <LogOut className="w-5 h-5 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 relative">
        {/* Price Display */}
        <div className="mb-10">
          <PriceDisplay 
            price={currentPrice}
            change={change}
            changePercent={changePercent}
            inrPrice={inrPrice}
            inrChange={inrChange}
            inrChangePercent={inrChangePercent}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <StatCard 
            title="24H High"
            value={`$${high24h.toLocaleString()}`}
            icon={TrendingUp}
            trend="up"
            delay={100}
          />
          <StatCard 
            title="24H Low"
            value={`$${low24h.toLocaleString()}`}
            icon={TrendingDown}
            trend="down"
            delay={150}
          />
          <StatCard 
            title="Open Price"
            value={`$${openPrice.toLocaleString()}`}
            icon={DollarSign}
            delay={200}
          />
          <StatCard 
            title="All-Time High"
            value={`$${goldStats.allTimeHigh.toLocaleString()}`}
            subtitle="Dec 2024"
            icon={Target}
            delay={250}
          />
        </div>

        {/* Chart Section */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <TimeframeSelector selected={timeframe} onSelect={setTimeframe} />
              <div className="flex items-center gap-2 text-muted-foreground/70 text-sm px-4 py-2 rounded-xl bg-muted/30 border border-border/30">
                <BarChart3 className="w-4 h-4" />
                <span>Volume: <span className="text-foreground font-medium">{goldStats.volume}</span></span>
              </div>
            </div>
            <GoldChart data={chartData} timeframe={timeframe} />
          </div>
          
          <div className="lg:col-span-1">
            <MarketInfo />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Index;
