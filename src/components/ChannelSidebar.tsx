import React from 'react';
import { ChannelId, ChannelItem, MembershipTier, Language } from '../types';
import { getTranslation } from '../locales/translations';
import { 
  Hash, 
  Radio, 
  Lock, 
  Calendar, 
  Newspaper, 
  Bot, 
  ShoppingBag, 
  GraduationCap, 
  ChevronDown, 
  ShieldCheck, 
  Zap,
  Sparkles
} from 'lucide-react';
import { MBKLogo } from './MBKLogo';

interface SidebarChannel {
  id: ChannelId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  isLocked?: boolean;
  badge?: string;
  isLive?: boolean;
}

interface ChannelSidebarProps {
  activeChannel: ChannelId;
  onSelectChannel: (channelId: ChannelId) => void;
  userTier: MembershipTier;
  onUpgradeTier: () => void;
  lang: Language;
}

export const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  activeChannel,
  onSelectChannel,
  userTier,
  onUpgradeTier,
  lang,
}) => {
  const t = getTranslation(lang);

  const categories: { id: string; title: string; channels: SidebarChannel[] }[] = [
    {
      id: 'info',
      title: t.infoCategory,
      channels: [
        { id: 'market-news', name: t.newsChannel, icon: Newspaper },
        { id: 'eco-calendar', name: t.calendarChannel, icon: Calendar },
      ]
    },
    {
      id: 'signals',
      title: t.signalsCategory,
      channels: [
        { 
          id: 'mbk-auto-bot' as ChannelId, 
          name: t.autoBotChannel, 
          icon: Zap,
          isLocked: userTier === 'free',
          badge: 'AUTO'
        },
        { 
          id: 'manual-vip' as ChannelId, 
          name: t.manualVipChannel, 
          icon: ShieldCheck,
          isLocked: userTier === 'free',
          badge: 'VIP'
        },
        { 
          id: 'free-signals' as ChannelId, 
          name: t.freeSignalsChannel, 
          icon: Hash 
        },
      ]
    },
    {
      id: 'community',
      title: t.communityCategory,
      channels: [
        { id: 'traders-chat' as ChannelId, name: t.tradersChatChannel, icon: Hash },
        { 
          id: 'live-room' as ChannelId, 
          name: t.liveRoomChannel, 
          icon: Radio,
          isLive: true 
        },
      ]
    },
    {
      id: 'store',
      title: t.storeCategory,
      channels: [
        { id: 'buy-indicators' as ChannelId, name: t.buyIndicatorsChannel, icon: ShoppingBag },
        { id: 'trading-courses' as ChannelId, name: t.coursesChannel, icon: GraduationCap },
      ]
    }
  ];

  return (
    <div className="w-56 bg-slate-900/90 border-r border-slate-800 flex flex-col h-full select-none shrink-0 z-10 text-xs">
      {/* Hub Brand Header */}
      <div className="px-3.5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MBKLogo size="sm" glow animated />
          <div>
            <div className="font-bold text-white font-sans text-xs flex items-center gap-1.5">
              <span>MBK Official Hub</span>
              <Sparkles className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
              US100 & Gold Institutional
            </div>
          </div>
        </div>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="px-2 mb-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase flex items-center justify-between">
              <span>{cat.title}</span>
            </div>

            <div className="space-y-0.5">
              {cat.channels.map((chan) => {
                const Icon = chan.icon;
                const isActive = activeChannel === chan.id;
                const isLocked = chan.isLocked;

                return (
                  <button
                    key={chan.id}
                    onClick={() => {
                      if (isLocked) {
                        onUpgradeTier();
                      } else {
                        onSelectChannel(chan.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white font-bold'
                        : isLocked
                        ? 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {chan.isLive ? (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                      ) : (
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                      )}

                      <span className="truncate">{chan.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {isLocked ? (
                        <Lock className="w-3 h-3 text-amber-400" />
                      ) : chan.badge ? (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                          {chan.badge}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Tier Footnote */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-emerald-950 border border-emerald-700/60 flex items-center justify-center font-mono font-bold text-emerald-400 text-[10px]">
            {userTier === 'pro' ? 'PRO' : userTier === 'basic' ? 'BSC' : 'FREE'}
          </div>
          <div>
            <div className="font-bold text-white text-[11px] truncate">
              {userTier === 'pro' ? 'Pro Member' : userTier === 'basic' ? 'Basic Member' : 'Free Visitor'}
            </div>
            <div className="text-[9px] font-mono text-emerald-400">
              {userTier === 'pro' ? 'All Channels Open' : userTier === 'basic' ? 'Signals Active' : 'Signals Locked'}
            </div>
          </div>
        </div>

        {userTier === 'free' && (
          <button
            onClick={onUpgradeTier}
            className="px-2 py-1 text-[10px] font-mono bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition-colors cursor-pointer"
          >
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
};
