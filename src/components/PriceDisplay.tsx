import { TrendingUp, TrendingDown } from "lucide-react";

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
    <div className="card-glass rounded-2xl p-8 text-center">
      <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
        Current Gold Price
      </p>
      
      {/* USD Price */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-primary text-lg">●</span>
          <span className="text-muted-foreground text-sm">XAU/USD</span>
        </div>
        
        <h1 className="font-display text-6xl md:text-7xl font-bold gold-gradient-text mb-4">
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          isPositive ? 'bg-success/10' : 'bg-destructive/10'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-5 h-5 text-success" />
          ) : (
            <TrendingDown className="w-5 h-5 text-destructive" />
          )}
          <span className={`font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* INR Price */}
      {inrPrice && (
        <div className="pt-6 border-t border-border/30">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-primary/70 text-sm">●</span>
            <span className="text-muted-foreground text-sm">XAU/INR</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground/90 mb-3">
            ₹{inrPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          
          {inrChange !== undefined && inrChangePercent !== undefined && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
              isInrPositive ? 'bg-success/10' : 'bg-destructive/10'
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
      
      <p className="text-muted-foreground text-xs mt-4">
        Per Troy Ounce • Updated just now
      </p>
    </div>
  );
};
