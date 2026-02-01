import { useState, useEffect, useRef } from 'react';

const INITIAL_ASSETS = 1613000; // ₹17,24,000
const MONTHLY_GROWTH_RATE = 0.15; // 15% per month
const START_DATE = new Date('2026-02-01T00:00:00'); // Fixed start date - Feb 1, 2026

// Calculate per-millisecond growth rate
// (1 + 0.15)^(1/month_in_ms) - 1
const MS_PER_MONTH = 30 * 24 * 60 * 60 * 1000;
const PER_MS_MULTIPLIER = Math.pow(1 + MONTHLY_GROWTH_RATE, 1 / MS_PER_MONTH);

export function useAnimatedAssets() {
  const [displayValue, setDisplayValue] = useState(INITIAL_ASSETS);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    const calculateCurrentValue = () => {
      const now = Date.now();
      const elapsed = now - START_DATE.getTime();
      
      if (elapsed <= 0) return INITIAL_ASSETS;
      
      // Compound growth: initialValue * (1 + rate)^(elapsed/period)
      const currentValue = INITIAL_ASSETS * Math.pow(1 + MONTHLY_GROWTH_RATE, elapsed / MS_PER_MONTH);
      return currentValue;
    };

    const animate = () => {
      const targetValue = calculateCurrentValue();
      
      setDisplayValue(prev => {
        // Smooth animation towards target
        const diff = targetValue - prev;
        const step = diff * 0.1; // Easing factor
        
        if (Math.abs(diff) < 0.01) {
          return targetValue;
        }
        
        return prev + step;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial calculation
    setDisplayValue(calculateCurrentValue());
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Format the value in Indian number system
  const formatIndianCurrency = (value: number): string => {
    const rounded = Math.floor(value);
    return rounded.toLocaleString('en-IN');
  };

  return {
    value: displayValue,
    formatted: formatIndianCurrency(displayValue),
    monthlyGrowth: MONTHLY_GROWTH_RATE * 100,
  };
}
