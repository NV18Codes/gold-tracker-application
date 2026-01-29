interface TimeframeSelectorProps {
  selected: string;
  onSelect: (timeframe: string) => void;
}

const timeframes = ['1H', '24H', '7D', '1M', '1Y'];

export const TimeframeSelector = ({ selected, onSelect }: TimeframeSelectorProps) => {
  return (
    <div className="inline-flex items-center gap-1 p-1.5 bg-muted/50 backdrop-blur-sm rounded-2xl border border-border/30">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onSelect(tf)}
          className={`
            relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
            ${selected === tf 
              ? 'text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }
          `}
        >
          {selected === tf && (
            <span 
              className="absolute inset-0 rounded-xl bg-primary shadow-lg"
              style={{ 
                boxShadow: '0 0 20px hsl(43 74% 52% / 0.3), 0 4px 12px hsl(43 74% 52% / 0.2)',
              }}
            />
          )}
          <span className="relative z-10">{tf}</span>
        </button>
      ))}
    </div>
  );
};
