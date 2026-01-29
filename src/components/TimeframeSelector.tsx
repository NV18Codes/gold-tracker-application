interface TimeframeSelectorProps {
  selected: string;
  onSelect: (timeframe: string) => void;
}

const timeframes = ['1H', '24H', '7D', '1M', '1Y'];

export const TimeframeSelector = ({ selected, onSelect }: TimeframeSelectorProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-xl">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onSelect(tf)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selected === tf
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};
