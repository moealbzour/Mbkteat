import React, { useState } from 'react';
import { Creator } from '../types';
import { Trophy, CheckCircle2, TrendingUp, Users, ArrowUpRight, ShieldCheck, Filter } from 'lucide-react';

const CREATORS_DATA: Creator[] = [
  {
    id: 'creator-1',
    name: 'Marcus Vance',
    role: 'Chief Investment Officer & Algo Lead',
    handle: '@marcus_mbk',
    winRate: 88.4,
    totalPips: 8420,
    monthlyReturn: 24.6,
    subscribers: 2840,
    specialty: 'US100 / Nasdaq Order Flow & FVG Sweeps',
    verifiedBadge: true,
    activeSignalsCount: 2,
    bio: 'Former prop firm quant. Developed the MBK Master Institutional Engine running PineScript v6 on 15m/1H liquidity voids.'
  },
  {
    id: 'creator-2',
    name: 'Elena Rostova',
    role: 'Senior Quantitative SMC Strategist',
    handle: '@elena_quant',
    winRate: 85.9,
    totalPips: 6150,
    monthlyReturn: 19.8,
    subscribers: 1920,
    specialty: 'XAUUSD / Gold Volume Profile & POC',
    verifiedBadge: true,
    activeSignalsCount: 1,
    bio: 'Specialist in Asian/London session gold manipulation, Point of Control retests, and interbank order flow.'
  },
  {
    id: 'creator-3',
    name: 'Kai Tanaka',
    role: 'Macro Forex & Rates Strategist',
    handle: '@kai_macro',
    winRate: 82.3,
    totalPips: 4890,
    monthlyReturn: 16.2,
    subscribers: 1410,
    specialty: 'EURUSD, GBPUSD & DXY Divergence',
    verifiedBadge: true,
    activeSignalsCount: 2,
    bio: 'Central bank swap spread modeler and institutional session breakout trader. 9 years full-time experience.'
  },
  {
    id: 'creator-4',
    name: 'MBK Algorithmic Desk Alpha',
    role: 'Automated High-Frequency SMC Bot',
    handle: '@mbk_algo_engine',
    winRate: 91.2,
    totalPips: 14200,
    monthlyReturn: 31.4,
    subscribers: 5600,
    specialty: 'US100 & SPX 5-min Fair Value Gap Sweeps',
    verifiedBadge: true,
    activeSignalsCount: 4,
    bio: 'Fully automated low-latency webhook signals generated directly from custom TradingView PineScript engine.'
  }
];

export const TopCreatorsLeaderboard: React.FC = () => {
  const [creators] = useState<Creator[]>(CREATORS_DATA);
  const [subscribedIds, setSubscribedIds] = useState<string[]>(['creator-4']);
  const [filter, setFilter] = useState<'all' | 'us100' | 'gold'>('all');

  const filteredCreators = creators.filter(c => {
    if (filter === 'us100') return c.specialty.includes('US100');
    if (filter === 'gold') return c.specialty.includes('Gold') || c.specialty.includes('XAUUSD');
    return true;
  });

  const toggleSubscribe = (id: string) => {
    setSubscribedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      {/* Header section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
              <Trophy className="w-4 h-4" />
              <span>Multi-Tenant Marketplace Leaderboard</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Verified Signal Providers & Creators
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Track audited win rates, monthly ROI, and automated webhook execution metrics. Subscribe to copy signals directly to your terminal desk.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono text-xs">
            <div>
              <div className="text-slate-500 text-[10px]">Total Desk Volume</div>
              <div className="text-sm font-bold text-white tabular-nums">$48.2M</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-slate-500 text-[10px]">Avg Win Rate</div>
              <div className="text-sm font-bold text-emerald-400 tabular-nums">86.4%</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-slate-500 text-[10px]">Platform Commission</div>
              <div className="text-sm font-bold text-cyan-400 tabular-nums">15% Split</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Providers
          </button>
          <button
            onClick={() => setFilter('us100')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              filter === 'us100'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            US100 Specialists
          </button>
          <button
            onClick={() => setFilter('gold')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              filter === 'gold'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gold / XAUUSD Quant
          </button>
        </div>

        {/* Creators Table */}
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Provider / Desk</th>
                  <th className="px-4 py-3.5">Primary Asset</th>
                  <th className="px-4 py-3.5 text-right">Win Rate</th>
                  <th className="px-4 py-3.5 text-right">Total Pips</th>
                  <th className="px-4 py-3.5 text-right">30D ROI</th>
                  <th className="px-4 py-3.5 text-right">Subscribers</th>
                  <th className="px-5 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCreators.map((creator) => {
                  const isSubbed = subscribedIds.includes(creator.id);

                  return (
                    <tr
                      key={creator.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs shrink-0">
                            {creator.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-slate-100">
                              <span>{creator.name}</span>
                              {creator.verifiedBadge && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              {creator.handle} · {creator.role}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-300 font-mono text-[11px]">
                        {creator.specialty}
                      </td>

                      <td className="px-4 py-4 text-right font-mono font-bold text-emerald-400 tabular-nums">
                        {creator.winRate}%
                      </td>

                      <td className="px-4 py-4 text-right font-mono text-slate-200 tabular-nums">
                        +{creator.totalPips.toLocaleString()}
                      </td>

                      <td className="px-4 py-4 text-right font-mono font-bold text-emerald-300 tabular-nums">
                        +{creator.monthlyReturn}%
                      </td>

                      <td className="px-4 py-4 text-right font-mono text-slate-300 tabular-nums">
                        {creator.subscribers.toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => toggleSubscribe(creator.id)}
                          className={`px-3.5 py-1.5 rounded-md font-medium text-xs transition-colors cursor-pointer whitespace-nowrap ${
                            isSubbed
                              ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                          }`}
                        >
                          {isSubbed ? 'Subscribed' : 'Subscribe Signals'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
