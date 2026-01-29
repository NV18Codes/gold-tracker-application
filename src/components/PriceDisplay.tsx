import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceDisplayProps {
  price: number;
  change: number;
  changePercent: number;
}

export const PriceDisplay = ({ price, change, changePercent }: PriceDisplayProps) => {
  const isPositive = change >= 0;

  return (
    <div className="card-glass rounded-2xl p-8 text-center">
      <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
        Current Gold Price
      </p>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-primary text-lg">●</span>
        <span className="text-muted-foreground text-sm">XAU/USD</span>
      </div>
      
      <h1 className="font-display text-6xl md:text-7xl font-bold gold-gradient-text mb-6">
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
      
      <p className="text-muted-foreground text-xs mt-4">
        Per Troy Ounce • Updated just now
      </p>
    </div>
  );
};
