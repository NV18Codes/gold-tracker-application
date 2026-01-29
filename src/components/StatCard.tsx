import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, delay = 0 }: StatCardProps) => {
  return (
    <div 
      className="stat-card group opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.15em] font-medium">{title}</p>
        <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300 group-hover:scale-110">
          <Icon className="w-4 h-4 text-primary icon-glow" />
        </div>
      </div>
      
      <div className="number-highlight">
        <p className={`text-2xl md:text-3xl font-bold tracking-tight ${
          trend === 'up' ? 'text-success' : 
          trend === 'down' ? 'text-destructive' : 
          'text-foreground'
        }`}>
          {value}
        </p>
      </div>
      
      {subtitle && (
        <p className="text-muted-foreground/60 text-xs mt-2 font-medium">{subtitle}</p>
      )}
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at 50% 0%, hsl(43 74% 52% / 0.08) 0%, transparent 60%)'
        }} 
      />
    </div>
  );
};
