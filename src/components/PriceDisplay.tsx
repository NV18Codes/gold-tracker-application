import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface PriceDisplayProps {
  price: number;
  change: number;
  changePercent: number;
  inrPrice?: number;
  inrChange?: number;
  inrChangePercent?: number;
}

export const PriceDisplay = ({ 
  price, 
  change, 
  changePercent,
  inrPrice,
  inrChange,
  inrChangePercent 
}: PriceDisplayProps) => {
  const isPositive = change >= 0;
  const isInrPositive = (inrChange ?? 0) >= 0;

  return (
    <div className="card-glass card-glass-hover rounded-3xl p-10 text-center relative overflow-hidden animate-fade-in-up">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-1 left-0 right-0 glow-line" />
      
      <div className="relative">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary/60 icon-glow" />
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-medium">
            Current Gold Price
          </p>
          <Sparkles className="w-4 h-4 text-primary/60 icon-glow" />
        </div>
        
        {/* USD Price */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse icon-glow" />
            <span className="text-muted-foreground text-sm font-medium tracking-wide">XAU / USD</span>
          </div>
          
          <div className="number-highlight inline-block">
            <h1 className="font-display text-7xl md:text-8xl font-bold gold-gradient-text mb-6 tracking-tight">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
          </div>
          
          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl backdrop-blur-sm ${
            isPositive 
              ? 'bg-success/10 border border-success/20' 
              : 'bg-destructive/10 border border-destructive/20'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-success" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
            <span className={`font-semibold text-lg ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)}
            </span>
            <span className={`text-sm font-medium px-2 py-0.5 rounded-lg ${
              isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
            }`}>
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* INR Price */}
        {inrPrice && (
          <div className="pt-8 border-t border-border/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="text-muted-foreground text-sm font-medium tracking-wide">XAU / INR</span>
            </div>
            
            <div className="number-highlight inline-block">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground/90 mb-4 tracking-tight">
                ₹{inrPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            
            {inrChange !== undefined && inrChangePercent !== undefined && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm ${
                isInrPositive 
                  ? 'bg-success/10 border border-success/15' 
                  : 'bg-destructive/10 border border-destructive/15'
              }`}>
                {isInrPositive ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
                <span className={`text-sm font-medium ${isInrPositive ? 'text-success' : 'text-destructive'}`}>
                  {isInrPositive ? '+' : ''}{inrChange.toFixed(2)} ({isInrPositive ? '+' : ''}{inrChangePercent.toFixed(2)}%)
                </span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-muted-foreground/70 text-xs mt-6 tracking-wide">
          Per 10 Grams • Updated just now
        </p>
      </div>
    </div>
  );
};
