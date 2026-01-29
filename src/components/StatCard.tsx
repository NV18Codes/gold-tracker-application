import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard = ({ title, value, subtitle, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <p className="text-muted-foreground text-sm uppercase tracking-wide">{title}</p>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <p className={`text-2xl font-bold ${
        trend === 'up' ? 'text-success' : 
        trend === 'down' ? 'text-destructive' : 
        'text-foreground'
      }`}>
        {value}
      </p>
      
      {subtitle && (
        <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>
      )}
    </div>
  );
};
