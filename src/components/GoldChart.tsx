import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  time: string;
  price: number;
}

interface GoldChartProps {
  data: ChartDataPoint[];
  timeframe: string;
}

export const GoldChart = ({ data, timeframe }: GoldChartProps) => {
  const minPrice = Math.min(...data.map(d => d.price)) * 0.998;
  const maxPrice = Math.max(...data.map(d => d.price)) * 1.002;

  return (
    <div className="card-glass card-glass-hover rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground tracking-tight">Price History</h3>
          <p className="text-muted-foreground/70 text-sm mt-1">{timeframe} performance</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
          <span className="text-primary text-sm font-medium">{timeframe}</span>
        </div>
      </div>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(43 74% 52%)" stopOpacity={0.35} />
                <stop offset="50%" stopColor="hsl(43 74% 52%)" stopOpacity={0.1} />
                <stop offset="100%" stopColor="hsl(43 74% 52%)" stopOpacity={0} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(220 18% 14%)" 
              vertical={false} 
            />
            <XAxis 
              dataKey="time" 
              stroke="hsl(220 12% 40%)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              domain={[minPrice, maxPrice]}
              stroke="hsl(220 12% 40%)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-5}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(220 20% 8%)',
                border: '1px solid hsl(43 74% 52% / 0.2)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 0 30px hsl(43 74% 52% / 0.1), 0 20px 40px -20px hsl(0 0% 0% / 0.5)',
              }}
              labelStyle={{ color: 'hsl(220 12% 50%)', marginBottom: '6px', fontSize: '12px' }}
              formatter={(value: number) => [
                <span className="text-primary font-semibold text-lg">
                  ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>, 
                ''
              ]}
              cursor={{ stroke: 'hsl(43 74% 52% / 0.3)', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(43 74% 52%)" 
              strokeWidth={2.5}
              fill="url(#goldGradient)"
              filter="url(#glow)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: 'hsl(43 74% 52%)', 
                stroke: 'hsl(220 20% 8%)', 
                strokeWidth: 3,
                filter: 'drop-shadow(0 0 8px hsl(43 74% 52% / 0.6))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
