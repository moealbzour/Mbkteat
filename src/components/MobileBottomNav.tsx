import React from 'react';
import { Terminal, Hash, Zap, MessageSquare } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { MBKLogo } from './MBKLogo';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onToggleChannels: () => void;
  onToggleRightDock: () => void;
  onOpenOverview: () => void;
  isRightDockOpen: boolean;
  signalsCount: number;
  lang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onToggleChannels,
  onToggleRightDock,
  onOpenOverview,
  isRightDockOpen,
  signalsCount,
  lang,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 pb-[env(safe-area-inset-bottom,0px)] bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-lg flex items-center justify-around px-2 z-40 select-none text-[10px] font-mono shadow-2xl">
      {/* 1. Terminal Desk */}
      <button
        onClick={() => onSelectTab('terminal')}
        className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-lg transition-colors cursor-pointer ${
          activeTab === 'terminal' 
            ? 'text-emerald-400 font-bold bg-slate-900/80' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title={lang === 'ar' ? 'منصة التداول' : 'Trading Desk'}
      >
        <Terminal className="w-4 h-4" />
        <span>{lang === 'ar' ? 'المنصة' : 'Desk'}</span>
      </button>

      {/* 2. Live Signals Blotter Feed */}
      <button
        onClick={() => onSelectTab('signals')}
        className={`relative flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-lg transition-colors cursor-pointer ${
          activeTab === 'signals' 
            ? 'text-emerald-400 font-bold bg-slate-900/80' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title={lang === 'ar' ? 'إشارات الصفقات' : 'Live Signals'}
      >
        <Zap className="w-4 h-4 text-emerald-400" />
        <span>{lang === 'ar' ? 'الصفقات' : 'Signals'}</span>
        {signalsCount > 0 && (
          <span className="absolute top-1 right-2 px-1 min-w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 text-[8px] font-bold flex items-center justify-center">
            {signalsCount}
          </span>
        )}
      </button>

      {/* 3. CENTER MBK BRAND LOGO (Platform Index, Services & Tiers Anchor) */}
      <button
        onClick={() => onSelectTab('overview')}
        className="relative -top-2.5 flex flex-col items-center justify-center cursor-pointer group"
        title={lang === 'ar' ? 'دليل وخدمات MBK' : 'MBK Institutional Ecosystem'}
      >
        <div
          className={`p-1.5 rounded-2xl bg-slate-950 transition-all duration-300 shadow-xl ${
            activeTab === 'overview'
              ? 'border-2 border-emerald-400 ring-4 ring-emerald-500/20 shadow-emerald-500/40 scale-110'
              : 'border border-slate-700/80 hover:border-emerald-500/70'
          }`}
        >
          <MBKLogo 
            size="sm" 
            glow={activeTab === 'overview'} 
            animated={activeTab === 'overview'} 
          />
        </div>
        <span
          className={`text-[9px] font-mono tracking-widest mt-0.5 uppercase transition-colors ${
            activeTab === 'overview'
              ? 'text-emerald-400 font-black'
              : 'text-slate-400 group-hover:text-emerald-300 font-bold'
          }`}
        >
          MBK
        </span>
      </button>

      {/* 4. Community Channels Drawer Trigger */}
      <button
        onClick={onToggleChannels}
        className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        title={lang === 'ar' ? 'قنوات التداول' : 'Channels'}
      >
        <Hash className="w-4 h-4" />
        <span>{lang === 'ar' ? 'القنوات' : 'Channels'}</span>
      </button>

      {/* 5. Chat & AI Assistant Drawer Trigger */}
      <button
        onClick={onToggleRightDock}
        className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-lg transition-colors cursor-pointer ${
          isRightDockOpen 
            ? 'text-cyan-400 font-bold bg-slate-900/80' 
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title={lang === 'ar' ? 'الدردشة والذكاء الاصطناعي' : 'Trader Chat & AI'}
      >
        <MessageSquare className="w-4 h-4" />
        <span>{lang === 'ar' ? 'شات و AI' : 'Chat & AI'}</span>
      </button>
    </div>
  );
};
