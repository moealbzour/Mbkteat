import React from 'react';
import { HubItem, Language } from '../types';
import { Trophy, Plus, ShieldCheck, Flame } from 'lucide-react';
import { MBKLogo } from './MBKLogo';

interface HubRailProps {
  activeHubId: string;
  onSelectHub: (hubId: string) => void;
  lang: Language;
}

const HUBS: HubItem[] = [
  {
    id: 'mbk-official',
    name: 'MBK Official Trading Hub',
    nameAr: 'مساحة إم بي كي الرسمية',
    initials: 'MBK',
    isVerified: true
  },
  {
    id: 'hub-leaderboard',
    name: 'Top Creators Leaderboard',
    nameAr: 'لوحة كبار المتداولين',
    initials: '🏆'
  },
  {
    id: 'creator-marcus',
    name: 'Marcus Vance Quant Desk',
    nameAr: 'مكتب ماركوس فانس الكمي',
    initials: 'MV',
    creatorHandle: '@marcus_mbk',
    isVerified: true
  },
  {
    id: 'creator-elena',
    name: 'Elena Rostova Gold Desk',
    nameAr: 'مكتب إيلينا لصفقات الذهب',
    initials: 'ER',
    creatorHandle: '@elena_gold',
    isVerified: true
  }
];

export const HubRail: React.FC<HubRailProps> = ({ activeHubId, onSelectHub, lang }) => {
  return (
    <div className="w-14 bg-slate-950 border-r border-slate-800/80 flex flex-col items-center py-3 gap-3 shrink-0 select-none z-20">
      {/* MBK Core Logo Hub */}
      <button
        onClick={() => onSelectHub('mbk-official')}
        className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer ${
          activeHubId === 'mbk-official'
            ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/30'
            : 'opacity-85 hover:opacity-100'
        }`}
        title={lang === 'ar' ? 'مساحة إم بي كي الرسمية' : 'MBK Official Hub'}
      >
        <MBKLogo size="md" glow={activeHubId === 'mbk-official'} animated />
        {activeHubId === 'mbk-official' && (
          <span className="absolute -left-2 top-2.5 bottom-2.5 w-1 bg-emerald-400 rounded-r" />
        )}
      </button>

      {/* Divider */}
      <div className="w-6 h-px bg-slate-800 my-0.5" />

      {/* Creator & Sub Hubs */}
      {HUBS.filter(h => h.id !== 'mbk-official').map((hub) => {
        const isActive = activeHubId === hub.id;
        const isTrophy = hub.id === 'hub-leaderboard';

        return (
          <button
            key={hub.id}
            onClick={() => onSelectHub(hub.id)}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-slate-800 text-white border border-emerald-500/80 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title={lang === 'ar' ? hub.nameAr : hub.name}
          >
            {isTrophy ? (
              <Trophy className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
            ) : (
              <span>{hub.initials}</span>
            )}

            {isActive && (
              <span className="absolute -left-2 top-2.5 bottom-2.5 w-1 bg-white rounded-r" />
            )}
          </button>
        );
      })}

      {/* Add New Hub / Join as Creator */}
      <button
        onClick={() => onSelectHub('apply-creator')}
        className="w-10 h-10 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-emerald-500 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors mt-auto cursor-pointer"
        title={lang === 'ar' ? 'انضم كصانع محتوى / متداول معتمد' : 'Host Your Desk / Apply as Creator'}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
