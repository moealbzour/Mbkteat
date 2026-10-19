import React, { useState } from 'react';
import { Signal, SignalStatus } from '../types';
import { 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight, 
  Copy, 
  Check, 
  Lock, 
  Calculator, 
  Target, 
  Flame, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';

interface LiveSignalsDeskProps {
  signals: Signal[];
  isVip: boolean;
  onUnlockVip: () => void;
  onTradeOnChart: (signal: Signal) => void;
}

export const LiveSignalsDesk: React.FC<LiveSignalsDeskProps> = ({
  signals,
  isVip,
  onUnlockVip,
  onTradeOnChart,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'US100' | 'XAUUSD' | 'RUNNING'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Risk Calculator State
  const [accountBalance, setAccountBalance] = useState(50000);
  const [riskPercent, setRiskPercent] = useState(1); // 1%
  const [calcSignal, setCalcSignal] = useState<Signal | null>(signals[0] || null);

  const filteredSignals = signals.filter(s => {
    if (filter === 'US100') return s.ticker === 'US100';
    if (filter === 'XAUUSD') return s.ticker === 'XAUUSD';
    if (filter === 'RUNNING') return s.status === 'RUNNING';
    return true;
  });

  const handleCopy = (sig: Signal) => {
    const text = `MBK Institutional Signal\nAsset: ${sig.ticker} (${sig.direction})\nEntry: ${sig.entry}\nSL: ${sig.sl}\nTP1: ${sig.tp1}\nTP2: ${sig.tp2}\nMBK Confidence: ${sig.score}%`;
    navigator.clipboard.writeText(text);
    setCopiedId(sig.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Calculate position sizing
  const riskDollar = (accountBalance * riskPercent) / 100;
  const slDistance = calcSignal ? Math.abs(calcSignal.entry - calcSignal.sl) : 20;
  const estimatedUnits = slDistance > 0 ? (riskDollar / slDistance).toFixed(2) : '0';

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      <div className="max-w-6xl mx-auto mb-8">
        {/* Performance KPI Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-500 uppercase">Audited Win Rate</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
              88.4%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Last 120 verified setups</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-500 uppercase">Net Pip Gain (30D)</div>
            <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
              +4,820 Pips
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">+24.6% portfolio growth</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-500 uppercase">Avg Risk : Reward</div>
            <div className="text-xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
              1 : 2.85
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Strict SMC invalidation</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-500 uppercase">Active Signals</div>
            <div className="text-xl font-bold font-mono text-purple-400 mt-1 tabular-nums">
              {signals.length} Live
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Webhook auto-updated</div>
          </div>
        </div>

        {/* 2-Column Layout: Signal Stream + Risk Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Signals Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter buttons */}
            <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-sans">Signal Stream</span>
              </div>

              <div className="flex items-center gap-1 font-mono text-xs">
                <button
                  onClick={() => setFilter('ALL')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${filter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  All ({signals.length})
                </button>
                <button
                  onClick={() => setFilter('US100')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${filter === 'US100' ? 'bg-emerald-950 text-emerald-300' : 'text-slate-400 hover:text-white'}`}
                >
                  US100
                </button>
                <button
                  onClick={() => setFilter('XAUUSD')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${filter === 'XAUUSD' ? 'bg-amber-950 text-amber-300' : 'text-slate-400 hover:text-white'}`}
                >
                  XAUUSD
                </button>
                <button
                  onClick={() => setFilter('RUNNING')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${filter === 'RUNNING' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400 hover:text-white'}`}
                >
                  Running
                </button>
              </div>
            </div>

            {/* List of full cards */}
            <div className="space-y-3">
              {filteredSignals.map((sig) => {
                const isBuy = sig.direction === 'BUY';
                const isLocked = sig.isVip && !isVip;

                return (
                  <div
                    key={sig.id}
                    className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold font-mono text-white">
                          {sig.ticker}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                            isBuy
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {isBuy ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {sig.direction}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{sig.timeframe}</span>
                        <span className="text-xs text-slate-500 font-sans">by {sig.author}</span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-emerald-400 font-bold">MBK Score: {sig.score}%</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">RVOL: {sig.rvol}x</span>
                      </div>
                    </div>

                    {/* Levels Matrix */}
                    <div className="relative rounded bg-slate-950 p-3 border border-slate-800/80 mb-3">
                      {isLocked ? (
                        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-between px-6 rounded z-10">
                          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Exclusive VIP Algorithmic Signal</span>
                          </div>
                          <button
                            onClick={onUnlockVip}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded cursor-pointer"
                          >
                            Unlock VIP
                          </button>
                        </div>
                      ) : null}

                      <div className="grid grid-cols-4 gap-4 text-center font-mono">
                        <div>
                          <div className="text-[10px] text-slate-500">ENTRY</div>
                          <div className="text-sm font-bold text-white mt-0.5 tabular-nums">
                            {sig.entry}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-rose-400">STOP LOSS</div>
                          <div className="text-sm font-bold text-rose-300 mt-0.5 tabular-nums">
                            {sig.sl}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-emerald-400">TARGET 1</div>
                          <div className="text-sm font-bold text-emerald-300 mt-0.5 tabular-nums">
                            {sig.tp1}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-emerald-400">TARGET 2</div>
                          <div className="text-sm font-bold text-emerald-300 mt-0.5 tabular-nums">
                            {sig.tp2}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rationale & Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
                      <p className="text-slate-400 font-sans text-xs">
                        <strong>Strategy:</strong> {sig.strategy}. {sig.notes}
                      </p>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setCalcSignal(sig)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Calculator className="w-3 h-3 text-cyan-400" />
                          <span>Calc Risk</span>
                        </button>

                        <button
                          onClick={() => handleCopy(sig)}
                          disabled={isLocked}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] flex items-center gap-1 cursor-pointer disabled:opacity-40"
                        >
                          {copiedId === sig.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === sig.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => onTradeOnChart(sig)}
                          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>View on Chart</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Institutional Risk & Lot Size Calculator */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-sans">
                Position Size & Risk Calculator
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Account Equity ($)</label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-3 py-1.5 text-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Risk Tolerance (% of Account)</label>
                <div className="flex items-center gap-2">
                  {[0.5, 1, 2].map(r => (
                    <button
                      key={r}
                      onClick={() => setRiskPercent(r)}
                      className={`flex-1 py-1 rounded border text-xs cursor-pointer ${
                        riskPercent === r
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {calcSignal && (
                <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[11px] text-slate-400">
                    Selected Setup: <strong className="text-white">{calcSignal.ticker} ({calcSignal.direction})</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Dollar Risk ($):</span>
                    <strong className="text-rose-400">${riskDollar.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Stop Loss Distance:</span>
                    <strong className="text-white">{slDistance.toFixed(2)} pts</strong>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                    <span>Recommended Size:</span>
                    <strong className="text-emerald-400 text-sm">{estimatedUnits} contracts/lots</strong>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-500 font-sans leading-relaxed">
                Rules: Institutional accounts never exceed 1-2% risk per position. Move stop to breakeven immediately upon TP1 mitigation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
