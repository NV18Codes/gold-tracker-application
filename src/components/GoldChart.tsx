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
    <div className="card-glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Price History</h3>
          <p className="text-muted-foreground text-sm">{timeframe} performance</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(43 74% 49%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(43 74% 49%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(220 10% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[minPrice, maxPrice]}
              stroke="hsl(220 10% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(220 18% 10%)',
                border: '1px solid hsl(220 15% 18%)',
                borderRadius: '12px',
                padding: '12px',
              }}
              labelStyle={{ color: 'hsl(220 10% 55%)' }}
              formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Price']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(43 74% 49%)" 
              strokeWidth={2}
              fill="url(#goldGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
