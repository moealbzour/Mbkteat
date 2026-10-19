import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string; // e.g. 'US100' or 'XAUUSD'
  interval?: string;
  theme?: 'dark' | 'light';
}

function getTradingViewSymbol(symbol: string): string {
  switch (symbol.toUpperCase()) {
    case 'US100':
    case 'NQ':
    case 'NDX':
      return 'NASDAQ:NDX';
    case 'XAUUSD':
    case 'GOLD':
      return 'OANDA:XAUUSD';
    case 'EURUSD':
      return 'FX:EURUSD';
    case 'BTCUSD':
      return 'COINBASE:BTCUSD';
    case 'SPX500':
      return 'FOREXCOM:SPXUSD';
    case 'DXY':
      return 'CAPITALCOM:DXY';
    default:
      return `NASDAQ:${symbol}`;
  }
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(({
  symbol,
  interval = '15',
  theme = 'dark'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tvSymbol = getTradingViewSymbol(symbol);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: theme,
      style: '1',
      locale: 'en',
      enable_publishing: false,
      backgroundColor: 'rgba(2, 6, 23, 1)',
      gridColor: 'rgba(30, 41, 59, 0.4)',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: true,
      calendar: false,
      hide_volume: false,
      support_host: 'https://www.tradingview.com'
    });

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';

    containerRef.current.appendChild(widgetContainer);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [tvSymbol, interval, theme]);

  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden flex flex-col">
      <div 
        ref={containerRef} 
        className="tradingview-widget-container flex-1 w-full h-full"
        style={{ height: '100%', minHeight: '440px' }}
      />
    </div>
  );
});
