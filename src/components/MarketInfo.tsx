import { Globe, Clock, Activity, Zap } from "lucide-react";

export const MarketInfo = () => {
  return (
    <div className="card-glass card-glass-hover rounded-3xl p-7 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', opacity: 0 }}>
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-4 h-4 text-primary icon-glow" />
        <h3 className="text-lg font-semibold text-foreground tracking-tight">Market Info</h3>
      </div>
      
      <div className="space-y-5">
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-success/5 border border-success/10 transition-all duration-300 hover:bg-success/10">
          <div className="p-2.5 rounded-xl bg-success/15">
            <Activity className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-foreground font-medium text-sm">Market Open</p>
            <p className="text-success text-xs font-medium mt-0.5">Trading Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-primary/5 border border-primary/10 transition-all duration-300 hover:bg-primary/10">
          <div className="p-2.5 rounded-xl bg-primary/15">
            <Globe className="w-4 h-4 text-primary icon-glow" />
          </div>
          <div>
            <p className="text-foreground font-medium text-sm">London Fix</p>
            <p className="text-muted-foreground text-xs mt-0.5">$2,645.50</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-primary/5 border border-primary/10 transition-all duration-300 hover:bg-primary/10">
          <div className="p-2.5 rounded-xl bg-primary/15">
            <Clock className="w-4 h-4 text-primary icon-glow" />
          </div>
          <div>
            <p className="text-foreground font-medium text-sm">Auto Refresh</p>
            <p className="text-muted-foreground text-xs mt-0.5">Every 6 hours</p>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom element */}
      <div className="mt-6 pt-5 border-t border-border/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground/60">
          <span>Data Source</span>
          <span className="text-primary/70 font-medium">GoldAPI.io</span>
        </div>
      </div>
    </div>
  );
};
