import React, { useState } from 'react';
import { Signal, SignalDirection, SignalStatus, MembershipTier } from '../types';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Copy, 
  Check, 
  Lock, 
  Zap, 
  Target, 
  Flame,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface SignalBlotterProps {
  signals: Signal[];
  userTier: MembershipTier;
  onUpgradeTier: () => void;
  onSelectSignal?: (signal: Signal) => void;
  selectedSignalId?: string | null;
  newAlertToast?: Signal | null;
}

export const SignalBlotter: React.FC<SignalBlotterProps> = ({
  signals,
  userTier,
  onUpgradeTier,
  onSelectSignal,
  selectedSignalId,
  newAlertToast
}) => {
  const [filterTicker, setFilterTicker] = useState<'ALL' | 'US100' | 'XAUUSD' | 'PRO'>('ALL');
  const [feedSource, setFeedSource] = useState<'all' | 'webhooks'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSignals = signals.filter(s => {
    // Feed source filter
    if (feedSource === 'webhooks') {
      const isWebhook = s.author?.toLowerCase().includes('webhook') || s.id.startsWith('sig-webhook') || s.id.startsWith('sig-mbk-10');
      if (!isWebhook) return false;
    }
    // Asset filter
    if (filterTicker === 'US100') return s.ticker === 'US100';
    if (filterTicker === 'XAUUSD') return s.ticker === 'XAUUSD';
    if (filterTicker === 'PRO') return s.isVip;
    return true;
  });

  const handleCopyLevels = (signal: Signal, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `MBK Signal: ${signal.ticker} ${signal.direction}\nEntry: ${signal.entry}\nSL: ${signal.sl}\nTP1: ${signal.tp1}\nTP2: ${signal.tp2}\nScore: ${signal.score}%\nTimeframe: ${signal.timeframe}`;
    navigator.clipboard.writeText(text);
    setCopiedId(signal.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: SignalStatus) => {
    switch (status) {
      case 'RUNNING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            RUNNING
          </span>
        );
      case 'TP1 HIT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
            <Target className="w-3 h-3 text-emerald-400" />
            TP1 HIT (+2.1R)
          </span>
        );
      case 'RUNNER TRAILING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-950/80 text-purple-400 border border-purple-800/80">
            <Flame className="w-3 h-3 text-purple-400" />
            RUNNER TRAILING
          </span>
        );
      case 'VIP LOCKED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/80">
            <Lock className="w-3 h-3 text-amber-400" />
            TIER LOCKED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-slate-950 border-t border-slate-800 flex flex-col">
      {/* Live Webhook Alert Ingestion Banner */}
      {newAlertToast && (
        <div className="bg-emerald-950/90 border-b border-emerald-600/80 px-5 py-2 flex items-center justify-between text-xs font-mono text-emerald-300 animate-pulse">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>NEW WEBHOOK ALERT:</strong> {newAlertToast.ticker} {newAlertToast.direction} @ {newAlertToast.entry} (Score: {newAlertToast.score}%)
            </span>
          </div>
          <span className="text-[10px] text-emerald-400">TradingView Ingested</span>
        </div>
      )}

      {/* Blotter Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-slate-900/60 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-tight text-white font-sans">
              Live Signals Blotter
            </h3>
          </div>

          {/* Feed Source Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFeedSource('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                feedSource === 'all'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setFeedSource('webhooks')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                feedSource === 'webhooks'
                  ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/70 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>Live Webhooks</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono hidden md:inline">
            ({filteredSignals.length} Active Positions)
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800 text-xs">
          <button
            onClick={() => setFilterTicker('ALL')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              filterTicker === 'ALL'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTicker('US100')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              filterTicker === 'US100'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            US100
          </button>
          <button
            onClick={() => setFilterTicker('XAUUSD')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              filterTicker === 'XAUUSD'
                ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            XAUUSD
          </button>
          <button
            onClick={() => setFilterTicker('PRO')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              filterTicker === 'PRO'
                ? 'bg-purple-950/70 text-purple-300 border border-purple-800/60 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pro Setups
          </button>
        </div>
      </div>

      {/* Structured Signal Cards Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 overflow-y-auto max-h-[380px]">
        {filteredSignals.length === 0 ? (
          <div className="col-span-full py-12 px-6 text-center rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
            <Radio className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
            <h4 className="text-sm font-bold text-white font-sans">
              {feedSource === 'webhooks' ? 'Standing By for Real-Time Webhooks' : 'No Active Positions'}
            </h4>
            <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
              {feedSource === 'webhooks' 
                ? 'TradingView webhook listener is active at /api/webhook/mbk. Send an alert or switch to "All Signals" to view the verified institutional archive.'
                : 'No signals match the current asset filter.'}
            </p>
          </div>
        ) : (
          filteredSignals.map((sig) => {
            const isBuy = sig.direction === 'BUY';
            // Free users see basic card with locked SL/TP; Basic & Pro users see all levels
            const isLocked = userTier === 'free' && sig.isVip;
            const isSelected = selectedSignalId === sig.id;

            return (
              <div
                key={sig.id}
                onClick={() => onSelectSignal && onSelectSignal(sig)}
                className={`relative rounded-lg p-3.5 bg-slate-900/90 border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-500/80 shadow-md shadow-emerald-500/10' 
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Top Row: Ticker, Direction, Status, Score */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-white">
                      {sig.ticker}
                    </span>
                    <span
                      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        isBuy
                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/60'
                          : 'bg-rose-950/90 text-rose-300 border border-rose-700/60'
                      }`}
                    >
                      {isBuy ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {sig.direction}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {sig.timeframe}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(isLocked ? 'VIP LOCKED' : sig.status)}
                  </div>
                </div>

                {/* Subtitle / Strategy */}
                <div className="text-[11px] text-slate-400 mb-3 truncate flex items-center justify-between">
                  <span>{sig.strategy}</span>
                  <span className="font-mono text-slate-500 text-[10px]">{sig.timestamp}</span>
                </div>

                {/* Core Levels Table */}
                <div className="relative rounded bg-slate-950/80 p-2.5 border border-slate-800/80 mb-3">
                  {isLocked ? (
                    <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xs flex flex-col items-center justify-center p-2 rounded text-center z-10">
                      <Lock className="w-4 h-4 text-amber-400 mb-1" />
                      <span className="text-[11px] font-mono text-slate-200 font-semibold">
                        PRO INSTITUTIONAL SETUP
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpgradeTier();
                        }}
                        className="mt-1 px-3 py-1 text-[10px] font-mono rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer"
                      >
                        Upgrade to Basic/Pro ($49)
                      </button>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Entry</div>
                      <div className="text-xs font-semibold text-slate-200 tabular-nums mt-0.5">
                        {sig.entry.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-rose-400 uppercase">SL</div>
                      <div className="text-xs font-semibold text-rose-300 tabular-nums mt-0.5">
                        {sig.sl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400 uppercase">TP 1</div>
                      <div className="text-xs font-semibold text-emerald-300 tabular-nums mt-0.5">
                        {sig.tp1.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400 uppercase">TP 2</div>
                      <div className="text-xs font-semibold text-emerald-300 tabular-nums mt-0.5">
                        {sig.tp2.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: MBK Score Gauge & Actions */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-500">MBK Score:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">
                      {sig.score}%
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">RVOL: {sig.rvol}x</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleCopyLevels(sig, e)}
                      disabled={isLocked}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer disabled:opacity-30"
                      title="Copy levels to clipboard"
                    >
                      {copiedId === sig.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
