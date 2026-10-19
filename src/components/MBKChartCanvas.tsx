import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Signal, TickerSymbol } from '../types';
import { Eye, EyeOff, Layers, BarChart3, Crosshair, RefreshCw } from 'lucide-react';

interface MBKChartCanvasProps {
  symbol: TickerSymbol | string;
  signals?: Signal[];
  selectedSignal?: Signal | null;
  onSelectSignal?: (signal: Signal) => void;
}

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const MBKChartCanvas: React.FC<MBKChartCanvasProps> = ({
  symbol,
  signals = [],
  selectedSignal,
  onSelectSignal,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Overlay visibility states
  const [showOrderBlocks, setShowOrderBlocks] = useState(true);
  const [showFVG, setShowFVG] = useState(true);
  const [showPOC, setShowPOC] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Generate realistic candles based on symbol
  const candles: Candle[] = useMemo(() => {
    const list: Candle[] = [];
    const count = 48;
    const now = Date.now();
    const isGold = symbol === 'XAUUSD';
    let basePrice = isGold ? 2715.0 : 20410.0;
    const volatility = isGold ? 2.5 : 22.0;

    for (let i = count; i >= 0; i--) {
      const time = now - i * 15 * 60 * 1000;
      const change = (Math.sin(i * 0.4) + (Math.random() - 0.47) * 2) * volatility;
      const open = basePrice;
      const close = Number((open + change).toFixed(isGold ? 2 : 1));
      const high = Number((Math.max(open, close) + Math.random() * volatility * 0.8).toFixed(isGold ? 2 : 1));
      const low = Number((Math.min(open, close) - Math.random() * volatility * 0.8).toFixed(isGold ? 2 : 1));
      const volume = Math.floor(Math.random() * 850 + 250);

      list.push({ time, open, high, low, close, volume });
      basePrice = close;
    }
    return list;
  }, [symbol]);

  // SMC Overlays calculated from candle data
  const smcData = useMemo(() => {
    if (candles.length < 15) return { obBull: null, obBear: null, fvg: null, poc: null };

    const minPrice = Math.min(...candles.map(c => c.low));
    const maxPrice = Math.max(...candles.map(c => c.high));
    const range = maxPrice - minPrice;

    // Bullish Order block around lowest swing candle
    const lowestIdx = candles.reduce((minIdx, c, idx) => c.low < candles[minIdx].low ? idx : minIdx, 0);
    const obBull = {
      startIndex: Math.max(0, lowestIdx - 1),
      endIndex: candles.length - 1,
      top: candles[lowestIdx].high,
      bottom: candles[lowestIdx].low,
      label: '+OB 15m Institutional Demand'
    };

    // Bearish Order block around high
    const highestIdx = candles.reduce((maxIdx, c, idx) => c.high > candles[maxIdx].high ? idx : maxIdx, 0);
    const obBear = {
      startIndex: Math.max(0, highestIdx - 1),
      endIndex: candles.length - 1,
      top: candles[highestIdx].high,
      bottom: candles[highestIdx].low,
      label: '-OB 15m Institutional Supply'
    };

    // Fair Value Gap (imbalance between candle 22 and 24)
    const fvgIdx = Math.floor(candles.length * 0.55);
    const fvg = {
      startIndex: fvgIdx,
      endIndex: candles.length - 1,
      top: Math.max(candles[fvgIdx].low, candles[fvgIdx + 2]?.high || candles[fvgIdx].low + range * 0.08),
      bottom: Math.min(candles[fvgIdx].low, candles[fvgIdx + 2]?.high || candles[fvgIdx].low),
      label: '15m Bullish FVG (Imbalance)'
    };

    // Point of Control (highest volume level)
    const poc = {
      price: Number((minPrice + range * 0.48).toFixed(2)),
      label: 'POC (High Volume Node)'
    };

    return { obBull, obBear, fvg, poc, minPrice, maxPrice };
  }, [candles]);

  // Main Canvas Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 30, right: 75, bottom: 35, left: 10 };

    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    if (candles.length === 0) return;

    let minPrice = Math.min(...candles.map(c => c.low));
    let maxPrice = Math.max(...candles.map(c => c.high));
    const pricePadding = (maxPrice - minPrice) * 0.12 || 1;
    minPrice -= pricePadding;
    maxPrice += pricePadding;

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const getX = (index: number) => padding.left + (index + 0.5) * (chartW / candles.length);
    const getY = (price: number) => padding.top + chartH - ((price - minPrice) / (maxPrice - minPrice)) * chartH;
    const candleW = Math.max(3, (chartW / candles.length) * 0.65);

    // Grid lines (horizontal & vertical)
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
    ctx.lineWidth = 1;
    const gridSteps = 6;
    for (let i = 0; i <= gridSteps; i++) {
      const p = minPrice + (i / gridSteps) * (maxPrice - minPrice);
      const y = getY(p);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Right axis price labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(p.toFixed(symbol === 'EURUSD' ? 5 : 2), width - padding.right + 8, y + 4);
    }

    // 1. Render Fair Value Gap (FVG)
    if (showFVG && smcData.fvg) {
      const x1 = getX(smcData.fvg.startIndex);
      const x2 = width - padding.right;
      const y1 = getY(smcData.fvg.top);
      const y2 = getY(smcData.fvg.bottom);
      const boxH = Math.max(4, Math.abs(y2 - y1));

      ctx.fillStyle = 'rgba(6, 182, 212, 0.14)';
      ctx.fillRect(x1, Math.min(y1, y2), x2 - x1, boxH);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(x1, Math.min(y1, y2), x2 - x1, boxH);
      ctx.setLineDash([]);

      ctx.fillStyle = '#22d3ee';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(smcData.fvg.label, x1 + 6, Math.min(y1, y2) + 12);
    }

    // 2. Render Order Blocks (OB)
    if (showOrderBlocks) {
      if (smcData.obBull) {
        const x1 = getX(smcData.obBull.startIndex);
        const x2 = width - padding.right;
        const y1 = getY(smcData.obBull.top);
        const y2 = getY(smcData.obBull.bottom);
        const boxH = Math.max(4, Math.abs(y2 - y1));

        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fillRect(x1, Math.min(y1, y2), x2 - x1, boxH);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x1, Math.min(y1, y2), x2 - x1, boxH);

        ctx.fillStyle = '#10b981';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(smcData.obBull.label, x1 + 6, Math.min(y1, y2) + 12);
      }

      if (smcData.obBear) {
        const x1 = getX(smcData.obBear.startIndex);
        const x2 = width - padding.right;
        const y1 = getY(smcData.obBear.top);
        const y2 = getY(smcData.obBear.bottom);
        const boxH = Math.max(4, Math.abs(y2 - y1));

        ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
        ctx.fillRect(x1, Math.min(y1, y2), x2 - x1, boxH);
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x1, Math.min(y1, y2), x2 - x1, boxH);

        ctx.fillStyle = '#fb7185';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(smcData.obBear.label, x1 + 6, Math.min(y1, y2) + 12);
      }
    }

    // 3. Render Point of Control (POC) Golden Line
    if (showPOC && smcData.poc) {
      const pocY = getY(smcData.poc.price);
      ctx.beginPath();
      ctx.moveTo(padding.left, pocY);
      ctx.lineTo(width - padding.right, pocY);
      ctx.strokeStyle = '#eab308'; // Amber/Gold POC
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#fef08a';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`${smcData.poc.label}: ${smcData.poc.price.toFixed(2)}`, padding.left + 10, pocY - 5);
    }

    // 4. Render Candlesticks & Volume
    const maxVol = Math.max(...candles.map(c => c.volume));
    candles.forEach((c, i) => {
      const x = getX(i);
      const isUp = c.close >= c.open;
      const color = isUp ? '#10b981' : '#f43f5e';

      // Volume bar at bottom
      const volH = (c.volume / maxVol) * (padding.bottom * 1.5);
      const volY = height - padding.bottom;
      ctx.fillStyle = isUp ? 'rgba(16, 185, 129, 0.22)' : 'rgba(244, 63, 94, 0.22)';
      ctx.fillRect(x - candleW / 2, volY - volH, candleW, volH);

      // Wick
      const highY = getY(c.high);
      const lowY = getY(c.low);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      const openY = getY(c.open);
      const closeY = getY(c.close);
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(2, Math.abs(closeY - openY));

      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyHeight);
    });

    // 5. Render MBK Signals Overlay
    if (showSignals) {
      const relevantSignals = signals.filter(s => s.ticker === symbol);
      relevantSignals.forEach((sig) => {
        const sigY = getY(sig.entry);
        const slY = getY(sig.sl);
        const tp1Y = getY(sig.tp1);
        const isBuy = sig.direction === 'BUY';

        // Entry horizontal line
        ctx.strokeStyle = isBuy ? '#34d399' : '#fb7185';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width - padding.right - 180, sigY);
        ctx.lineTo(width - padding.right, sigY);
        ctx.stroke();

        // SL dashed line
        ctx.strokeStyle = '#f43f5e';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(width - padding.right - 140, slY);
        ctx.lineTo(width - padding.right, slY);
        ctx.stroke();

        // TP1 dashed line
        ctx.strokeStyle = '#10b981';
        ctx.beginPath();
        ctx.moveTo(width - padding.right - 140, tp1Y);
        ctx.lineTo(width - padding.right, tp1Y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Signal badge pill
        ctx.fillStyle = isBuy ? '#065f46' : '#881337';
        ctx.fillRect(width - padding.right - 195, sigY - 10, 50, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillText(isBuy ? '▲ BUY' : '▼ SELL', width - padding.right - 190, sigY + 3);
      });
    }

    // 6. Interactive Crosshair
    if (mousePos && mousePos.x >= padding.left && mousePos.x <= width - padding.right) {
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(mousePos.x, padding.top);
      ctx.lineTo(mousePos.x, height - padding.bottom);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding.left, mousePos.y);
      ctx.lineTo(width - padding.right, mousePos.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Floating price tag on right axis
      const hoverPrice = minPrice + ((height - padding.bottom - mousePos.y) / chartH) * (maxPrice - minPrice);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(width - padding.right + 2, mousePos.y - 10, 70, 20);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(width - padding.right + 2, mousePos.y - 10, 70, 20);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(hoverPrice.toFixed(symbol === 'EURUSD' ? 5 : 2), width - padding.right + 6, mousePos.y + 4);
    }
  }, [candles, smcData, showOrderBlocks, showFVG, showPOC, showSignals, signals, mousePos, symbol]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Mouse Move for Crosshair
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const chartW = canvasRef.current.width - 85;
    const candleIdx = Math.floor((x / chartW) * candles.length);
    if (candleIdx >= 0 && candleIdx < candles.length) {
      setHoveredCandle(candles[candleIdx]);
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredCandle(null);
  };

  const lastCandle = candles[candles.length - 1];

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col bg-slate-950 relative select-none">
      {/* Sub-Header Toolbar for Overlays */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs">
        {/* Candle Data Feed Display */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="font-bold text-slate-200">{symbol} 15m</span>
          {hoveredCandle ? (
            <>
              <span>O: <strong className="text-slate-100">{hoveredCandle.open}</strong></span>
              <span>H: <strong className="text-emerald-400">{hoveredCandle.high}</strong></span>
              <span>L: <strong className="text-rose-400">{hoveredCandle.low}</strong></span>
              <span>C: <strong className="text-slate-100">{hoveredCandle.close}</strong></span>
              <span>Vol: <strong className="text-cyan-400">{hoveredCandle.volume}</strong></span>
            </>
          ) : lastCandle ? (
            <>
              <span>O: <strong className="text-slate-100">{lastCandle.open}</strong></span>
              <span>H: <strong className="text-emerald-400">{lastCandle.high}</strong></span>
              <span>L: <strong className="text-rose-400">{lastCandle.low}</strong></span>
              <span>C: <strong className="text-slate-100">{lastCandle.close}</strong></span>
            </>
          ) : null}
        </div>

        {/* Institutional Overlays Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">OVERLAYS:</span>

          <button
            onClick={() => setShowOrderBlocks(!showOrderBlocks)}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
              showOrderBlocks ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' : 'bg-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Order Blocks (OB)</span>
          </button>

          <button
            onClick={() => setShowFVG(!showFVG)}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
              showFVG ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60' : 'bg-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Fair Value Gaps (FVG)</span>
          </button>

          <button
            onClick={() => setShowPOC(!showPOC)}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
              showPOC ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'bg-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Point of Control (POC)</span>
          </button>

          <button
            onClick={() => setShowSignals(!showSignals)}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
              showSignals ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60' : 'bg-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>MBK Signals</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full relative min-h-[380px]">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full block cursor-crosshair"
        />

        {/* SMC Overlay Legend pill */}
        <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 rounded px-3 py-1.5 flex items-center gap-3 text-[11px] font-mono text-slate-300 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500/30 border border-emerald-500" />
            <span>Demand (+OB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500/30 border border-rose-500" />
            <span>Supply (-OB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500/30 border border-cyan-500" />
            <span>FVG</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-yellow-400" />
            <span>POC Level</span>
          </div>
        </div>
      </div>
    </div>
  );
};
