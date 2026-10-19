import React, { useState } from 'react';
import { Radio, Mic, MicOff, Users, Hand, MessageSquare, Volume2, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface LiveRoomProps {
  lang: Language;
}

export const LiveRoom: React.FC<LiveRoomProps> = ({ lang }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [listenersCount, setListenersCount] = useState(148);

  const speakers = [
    {
      id: 'spk-1',
      name: 'Marcus Vance',
      role: 'Host · Chief Investment Officer',
      avatar: 'MV',
      isSpeaking: true
    },
    {
      id: 'spk-2',
      name: 'Elena Rostova',
      role: 'Co-Host · Quantitative SMC Analyst',
      avatar: 'ER',
      isSpeaking: false
    },
    {
      id: 'spk-3',
      name: 'Kai Tanaka',
      role: 'Macro Forex Strategist',
      avatar: 'KT',
      isSpeaking: false
    }
  ];

  const listeners = [
    { name: 'Alex_Quant', avatar: 'AQ' },
    { name: 'Tarek_Dubai', avatar: 'TD' },
    { name: 'SMC_Sniper', avatar: 'SS' },
    { name: 'Nadir_FX', avatar: 'NF' },
    { name: 'Jordan99', avatar: 'J9' },
    { name: 'Trader_Salim', avatar: 'TS' },
    { name: 'NovaCapital', avatar: 'NC' },
    { name: 'Omar_Riyadh', avatar: 'OR' }
  ];

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Stage Banner */}
        <div className="rounded-xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 p-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest">
                LIVE FLOOR STAGE
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>{listenersCount} {lang === 'ar' ? 'مستمع حاضر' : 'Listening Now'}</span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-white font-sans mb-1.5">
            {lang === 'ar'
              ? 'غرفة البث المباشر: اصطياد سيولة الذهب والناسداك مع افتتاح نيويورك'
              : 'London Fix & NY Open: US100 & Gold Liquidity Sweeps Live Audio'}
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'تحليل مباشر لتدفق الأوامر في الوقت الفعلي مع ماركوس فانس وفريق التداول المؤسسي.'
              : 'Live real-time order flow commentary, Point of Control shifts, and trade execution checkpoints.'}
          </p>

          {/* Audio Visualizer Wave Simulation */}
          <div className="flex items-center gap-1 mt-5 h-8">
            {[18, 35, 65, 90, 45, 80, 100, 70, 50, 85, 95, 40, 25, 75, 60, 90, 30, 60, 85, 45].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-emerald-500 transition-all duration-300"
                style={{
                  height: `${h}%`,
                  opacity: Math.max(0.3, h / 100)
                }}
              />
            ))}
          </div>
        </div>

        {/* Stage Speakers Grid */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>{lang === 'ar' ? 'المتحدثون على المنصة' : 'Speakers on Stage'}</span>
            <span className="text-[10px] text-emerald-400">Audio Broadcast Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {speakers.map((spk) => (
              <div
                key={spk.id}
                className={`p-4 rounded-lg bg-slate-950 border flex flex-col items-center text-center relative transition-all ${
                  spk.isSpeaking
                    ? 'border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/30'
                    : 'border-slate-800'
                }`}
              >
                <div className="relative mb-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-slate-900 flex items-center justify-center font-mono font-bold text-white text-base shadow-sm">
                    {spk.avatar}
                  </div>
                  {spk.isSpeaking && (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 text-slate-950">
                      <Volume2 className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="font-bold text-white text-xs mb-0.5">{spk.name}</div>
                <div className="text-[10px] text-slate-400 font-mono leading-tight">{spk.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Listeners */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
            {lang === 'ar' ? 'المتداولون الحاضرون' : 'Floor Audience'}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {listeners.map((l, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-xs">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[9px] text-slate-300 font-bold">
                  {l.avatar}
                </div>
                <span className="text-slate-300 font-mono text-[11px]">{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Bottom Interactive Bar */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isMuted ? 'Muted' : 'Speaking'}</span>
            </button>

            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                handRaised
                  ? 'bg-amber-950 text-amber-300 border border-amber-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{handRaised ? 'Hand Raised' : 'Request Mic'}</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {lang === 'ar' ? 'جلسة لندن ونيويورك متواصلة' : 'Session Duration: 42m 18s'}
          </div>
        </div>
      </div>
    </div>
  );
};
