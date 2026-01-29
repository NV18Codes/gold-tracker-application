import { Globe, Clock, Activity } from "lucide-react";

export const MarketInfo = () => {
  return (
    <div className="card-glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Market Info</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Activity className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-foreground font-medium">Market Open</p>
            <p className="text-muted-foreground text-sm">Trading Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium">London Fix</p>
            <p className="text-muted-foreground text-sm">$2,645.50</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium">Next Update</p>
            <p className="text-muted-foreground text-sm">In 30 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};
