import React, { useState } from 'react';
import { Signal, TickerSymbol } from '../types';
import { 
  ShieldCheck, 
  Zap, 
  Send, 
  Copy, 
  Check, 
  Code, 
  Server, 
  Terminal as TerminalIcon, 
  PlusCircle, 
  AlertCircle,
  Database,
  Radio,
  Lock,
  Key,
  LogOut
} from 'lucide-react';

interface AdminPortalProps {
  onSignalAdded?: (signal: Signal) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onSignalAdded }) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('mbk_admin_unlocked') === 'true';
    }
    return false;
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Webhook Simulator State
  const [simTicker, setSimTicker] = useState<TickerSymbol>('US100');
  const [simDirection, setSimDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [simEntry, setSimEntry] = useState('20485.50');
  const [simSL, setSimSL] = useState('20410.00');
  const [simTP1, setSimTP1] = useState('20590.00');
  const [simTP2, setSimTP2] = useState('20740.00');
  const [simScore, setSimScore] = useState('96');
  const [simRVOL, setSimRVOL] = useState('2.9');
  const [simStrategy, setSimStrategy] = useState('MBK Master Institutional Engine');
  const [simIsVip, setSimIsVip] = useState(false);

  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);
  const [isFiring, setIsFiring] = useState(false);
  const [responseLog, setResponseLog] = useState<string | null>(null);

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/webhook/mbk` 
    : 'https://ais-dev-su76d2j4wcb2m2t6wflcfw-6705890240.us-east5.run.app/api/webhook/mbk';

  const pineScriptCode = `// MBK TradingView Alert Payload Template (PineScript v5/v6)
if (buy_condition)
    alert('{"ticker":"US100","direction":"BUY","entry":' + str.tostring(close) + ',"sl":' + str.tostring(low - 20) + ',"tp1":' + str.tostring(close + 40) + ',"tp2":' + str.tostring(close + 90) + ',"score":95,"rvol":2.8,"timeframe":"15m","strategy":"MBK Institutional FVG Sweep"}', alert.freq_once_per_bar_close)`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pineScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Quick Preset Handlers
  const loadPresetUS100 = () => {
    setSimTicker('US100');
    setSimDirection('BUY');
    setSimEntry('20490.00');
    setSimSL('20415.00');
    setSimTP1('20610.00');
    setSimTP2('20750.00');
    setSimScore('97');
    setSimRVOL('3.2');
    setSimStrategy('MBK Institutional FVG Sweep');
    setSimIsVip(false);
  };

  const loadPresetGold = () => {
    setSimTicker('XAUUSD');
    setSimDirection('SELL');
    setSimEntry('2738.50');
    setSimSL('2749.00');
    setSimTP1('2720.00');
    setSimTP2('2704.00');
    setSimScore('94');
    setSimRVOL('2.6');
    setSimStrategy('Asian Session High Liquidity Sweep');
    setSimIsVip(true);
  };

  // Trigger real POST to /api/webhook/mbk
  const handleFireWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFiring(true);
    setWebhookStatus(null);
    setResponseLog(null);

    const payload = {
      ticker: simTicker,
      direction: simDirection,
      entry: parseFloat(simEntry),
      sl: parseFloat(simSL),
      tp1: parseFloat(simTP1),
      tp2: parseFloat(simTP2),
      score: parseInt(simScore, 10),
      rvol: parseFloat(simRVOL),
      timeframe: '15m',
      strategy: simStrategy,
      author: 'TradingView Live Webhook',
      isVip: simIsVip,
      notes: `Institutional alert triggered via PineScript condition at ${new Date().toLocaleTimeString()}`
    };

    try {
      const res = await fetch('/api/webhook/mbk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWebhookStatus('SUCCESS: 200 OK — Alert ingested and added to Live Signal Blotter');
        setResponseLog(JSON.stringify(data, null, 2));
        if (onSignalAdded && data.signal) {
          onSignalAdded(data.signal);
        }
      } else {
        setWebhookStatus(`ERROR: ${data.error || 'Failed to ingest'}`);
        setResponseLog(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setWebhookStatus(`NETWORK ERROR: ${err.message}`);
    } finally {
      setIsFiring(false);
    }
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '8888') {
      setIsAdminUnlocked(true);
      setPinError(false);
      try {
        sessionStorage.setItem('mbk_admin_unlocked', 'true');
      } catch (e) {}
    } else {
      setPinError(true);
    }
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    setPinInput('');
    try {
      sessionStorage.removeItem('mbk_admin_unlocked');
    } catch (e) {}
  };

  if (!isAdminUnlocked) {
    return (
      <div className="w-full flex-1 p-6 bg-slate-950 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white font-sans">
              Admin & Webhook Console
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Restricted to desk administrators. Enter master access PIN to access the TradingView webhook lab.
            </p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError(false);
                }}
                placeholder="Enter Master PIN"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-center font-mono text-base tracking-widest text-white focus:outline-hidden ${
                  pinError
                    ? 'border-rose-500 focus:border-rose-400'
                    : 'border-slate-700 focus:border-emerald-500'
                }`}
              />
              {pinError && (
                <p className="text-xs font-mono text-rose-400 mt-1.5">
                  Invalid PIN. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Unlock Desk Console</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Master Admin Demo PIN: <strong className="text-emerald-400">8888</strong></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      <div className="max-w-6xl mx-auto mb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Desk & Webhook Control Plane</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              TradingView Webhook Integration Lab
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Connect institutional PineScript alerts, test incoming webhook JSON payloads, and monitor live signal ingestion into the MBK blotter.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg font-mono text-xs text-slate-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Endpoint: /api/webhook/mbk</span>
            </div>

            <button
              onClick={handleLockAdmin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
              title="Lock Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Session</span>
            </button>
          </div>
        </div>

        {/* Webhook URL Endpoint Box */}
        <div className="mt-6 p-4 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>Production Webhook URL (Paste into TradingView Alert dialog):</span>
            </div>
            <div className="font-mono text-xs text-emerald-400 select-all bg-slate-950 px-3 py-1.5 rounded border border-slate-800 break-all">
              {webhookUrl}
            </div>
          </div>

          <button
            onClick={handleCopyUrl}
            className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
          </button>
        </div>

        {/* 2-Column Grid: Webhook Simulator & PineScript Snippet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Column 1: Interactive Webhook Test Bench */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-sans">
                  Interactive Alert Dispatcher
                </h3>
              </div>

              {/* Preset buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={loadPresetUS100}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Load US100
                </button>
                <button
                  type="button"
                  onClick={loadPresetGold}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Load Gold
                </button>
              </div>
            </div>

            <form onSubmit={handleFireWebhook} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Ticker</label>
                  <select
                    value={simTicker}
                    onChange={(e) => setSimTicker(e.target.value as TickerSymbol)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2.5 py-1.5 text-white outline-hidden cursor-pointer"
                  >
                    <option value="US100">US100 (Nasdaq)</option>
                    <option value="XAUUSD">XAUUSD (Gold)</option>
                    <option value="EURUSD">EURUSD (Euro)</option>
                    <option value="BTCUSD">BTCUSD (Bitcoin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Direction</label>
                  <select
                    value={simDirection}
                    onChange={(e) => setSimDirection(e.target.value as 'BUY' | 'SELL')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2.5 py-1.5 text-white outline-hidden cursor-pointer"
                  >
                    <option value="BUY">BUY / Long</option>
                    <option value="SELL">SELL / Short</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Entry Price</label>
                  <input
                    type="number"
                    step="any"
                    value={simEntry}
                    onChange={(e) => setSimEntry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2 py-1.5 text-white outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-rose-400 mb-0.5">Stop Loss</label>
                  <input
                    type="number"
                    step="any"
                    value={simSL}
                    onChange={(e) => setSimSL(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded px-2 py-1.5 text-rose-300 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-emerald-400 mb-0.5">Take Profit 1</label>
                  <input
                    type="number"
                    step="any"
                    value={simTP1}
                    onChange={(e) => setSimTP1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2 py-1.5 text-emerald-300 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-emerald-400 mb-0.5">Take Profit 2</label>
                  <input
                    type="number"
                    step="any"
                    value={simTP2}
                    onChange={(e) => setSimTP2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2 py-1.5 text-emerald-300 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">MBK Score (%)</label>
                  <input
                    type="number"
                    value={simScore}
                    onChange={(e) => setSimScore(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2 py-1.5 text-white outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">RVOL (x)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={simRVOL}
                    onChange={(e) => setSimRVOL(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2 py-1.5 text-white outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">Strategy Tag</label>
                <input
                  type="text"
                  value={simStrategy}
                  onChange={(e) => setSimStrategy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-2.5 py-1.5 text-white outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isVipCheck"
                  checked={simIsVip}
                  onChange={(e) => setSimIsVip(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-emerald-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isVipCheck" className="text-slate-300 text-xs cursor-pointer select-none">
                  Require VIP Access to view levels
                </label>
              </div>

              <button
                type="submit"
                disabled={isFiring}
                className="w-full mt-3 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isFiring ? 'Sending Alert...' : 'Dispatch Webhook to /api/webhook/mbk'}</span>
              </button>
            </form>

            {/* Ingestion Response Display */}
            {webhookStatus && (
              <div className="mt-4 p-3 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono">
                <div className={webhookStatus.startsWith('SUCCESS') ? 'text-emerald-400 font-bold mb-1' : 'text-rose-400 font-bold mb-1'}>
                  {webhookStatus}
                </div>
                {responseLog && (
                  <pre className="text-slate-400 text-[10px] overflow-x-auto max-h-32">
                    {responseLog}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Column 2: PineScript Alert Guide & Integration Info */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-sans">
                    PineScript Webhook Code Pattern
                  </h3>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Place this snippet in your TradingView indicator. In TradingView's Alert creation dialog, check <strong>Webhook URL</strong> and enter your endpoint.
              </p>

              <pre className="bg-slate-950 border border-slate-800/80 rounded p-3 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {pineScriptCode}
              </pre>

              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Supabase / Firebase Ready:</strong> The backend handler formats signals into atomic documents, ready for real-time Firestore or PostgreSQL subscriptions.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Radio className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Real-Time Ingestion:</strong> Ingested trades instantly render in the Live Signals Blotter without requiring a page refresh.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-500">
              MBK Institutional Gateway Latency: ~14ms · Memory Queue: Active (Max 50)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
