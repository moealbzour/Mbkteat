import React, { useEffect, useState } from 'react';
import { MarketTicker, TickerSymbol, Language } from '../types';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';
import { getTranslation } from '../locales/translations';

interface HeaderMarqueeProps {
  onSelectTicker?: (ticker: TickerSymbol) => void;
  activeTicker?: string;
  lang?: Language;
}

const INITIAL_TICKERS: MarketTicker[] = [
  {
    symbol: 'US100',
    name: 'Nasdaq 100 Index',
    price: 20495.30,
    change: +164.20,
    changePercent: +0.81,
    high24h: 20560.00,
    low24h: 20310.50,
    tickDirection: 'up'
  },
  {
    symbol: 'XAUUSD',
    name: 'Spot Gold / USD',
    price: 2729.80,
    change: +18.40,
    changePercent: +0.68,
    high24h: 2744.10,
    low24h: 2708.90,
    tickDirection: 'up'
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: 1.08625,
    change: -0.00185,
    changePercent: -0.17,
    high24h: 1.08940,
    low24h: 1.08410,
    tickDirection: 'down'
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    price: 68420.00,
    change: +1240.50,
    changePercent: +1.85,
    high24h: 69150.00,
    low24h: 66980.00,
    tickDirection: 'up'
  },
  {
    symbol: 'SPX500',
    name: 'S&P 500 Index',
    price: 5865.25,
    change: +38.60,
    changePercent: +0.66,
    high24h: 5882.00,
    low24h: 5821.10,
    tickDirection: 'up'
  },
  {
    symbol: 'DXY',
    name: 'US Dollar Index',
    price: 103.45,
    change: -0.28,
    changePercent: -0.27,
    high24h: 103.88,
    low24h: 103.30,
    tickDirection: 'down'
  }
];

export const HeaderMarquee: React.FC<HeaderMarqueeProps> = ({ onSelectTicker, activeTicker, lang = 'en' }) => {
  const [tickers, setTickers] = useState<MarketTicker[]>(INITIAL_TICKERS);
  const [flashingSymbol, setFlashingSymbol] = useState<string | null>(null);
  const [flashColor, setFlashColor] = useState<'emerald' | 'crimson' | null>(null);
  const t = getTranslation(lang);

  // Live price tick simulation (mimics low-latency WebSocket feed)
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random ticker to update
      const randomIndex = Math.floor(Math.random() * tickers.length);
      const target = tickers[randomIndex];
      
      const isUp = Math.random() > 0.45;
      const stepMagnitude = target.symbol === 'XAUUSD' 
        ? (Math.random() * 0.70 + 0.10) 
        : target.symbol === 'US100'
        ? (Math.random() * 4.50 + 0.80)
        : target.symbol === 'BTCUSD'
        ? (Math.random() * 25.0 + 5.0)
        : target.symbol === 'EURUSD'
        ? 0.00008
        : 0.08;

      const delta = isUp ? stepMagnitude : -stepMagnitude;
      const newPrice = Number((target.price + delta).toFixed(target.symbol === 'EURUSD' ? 5 : 2));
      const newChange = Number((target.change + delta).toFixed(target.symbol === 'EURUSD' ? 5 : 2));
      const newPercent = Number(((newChange / (target.price - newChange)) * 100).toFixed(2));

      setTickers(prev => prev.map((item, idx) => {
        if (idx !== randomIndex) return item;
        return {
          ...item,
          price: newPrice,
          change: newChange,
          changePercent: newPercent,
          tickDirection: isUp ? 'up' : 'down'
        };
      }));

      setFlashingSymbol(target.symbol);
      setFlashColor(isUp ? 'emerald' : 'crimson');

      setTimeout(() => {
        setFlashingSymbol(null);
        setFlashColor(null);
      }, 700);
    }, 1800);

    return () => clearInterval(interval);
  }, [tickers]);

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 px-3 py-1.5 flex items-center text-xs overflow-x-auto whitespace-nowrap scrollbar-none select-none z-30">
      {/* Live Feed Status indicator */}
      <div className="flex items-center gap-1.5 pr-4 border-r border-slate-800 shrink-0 text-slate-400">
        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span className="font-mono uppercase tracking-wider text-[11px] text-slate-300 font-semibold">
          {t.liveFeed}
        </span>
      </div>

      {/* Marquee ticker stream */}
      <div className="flex items-center gap-5 px-4 overflow-x-auto scrollbar-none">
        {tickers.map((ticker) => {
          const isFlashing = flashingSymbol === ticker.symbol;
          const isPositive = ticker.change >= 0;
          const isSelected = activeTicker === ticker.symbol;

          let flashClasses = 'transition-colors duration-200';
          if (isFlashing && flashColor === 'emerald') {
            flashClasses = 'bg-emerald-500/20 text-emerald-300 font-medium px-1.5 py-0.5 rounded';
          } else if (isFlashing && flashColor === 'crimson') {
            flashClasses = 'bg-rose-500/20 text-rose-300 font-medium px-1.5 py-0.5 rounded';
          }

          return (
            <button
              key={ticker.symbol}
              onClick={() => onSelectTicker && onSelectTicker(ticker.symbol)}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 border border-slate-700 text-white' 
                  : 'hover:bg-slate-900/60 text-slate-300'
              }`}
            >
              <span className="font-mono font-bold tracking-tight text-slate-200">
                {ticker.symbol}
              </span>

              <span className={`font-mono tabular-nums ${flashClasses}`}>
                {ticker.symbol === 'EURUSD'
                  ? ticker.price.toFixed(5)
                  : ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>

              <span
                className={`flex items-center text-[11px] font-mono tabular-nums ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                )}
                {isPositive ? '+' : ''}
                {ticker.changePercent.toFixed(2)}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Institutional Session Info */}
      <div className="ml-auto pl-4 border-l border-slate-800 shrink-0 hidden lg:flex items-center gap-3 text-slate-400 font-mono text-[11px]">
        <span className="text-slate-500">{t.session}:</span>
        <span className="text-emerald-400 font-semibold tracking-wide">
          {t.sessionName}
        </span>
        <span className="text-slate-500">|</span>
        <span>RVOL: <strong className="text-slate-200">2.6x</strong></span>
      </div>
    </div>
  );
};
