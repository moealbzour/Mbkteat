import React, { useState, useEffect, useRef } from 'react';
import { HeaderMarquee } from './components/HeaderMarquee';
import { TopNav } from './components/TopNav';
import { HubRail } from './components/HubRail';
import { ChannelSidebar } from './components/ChannelSidebar';
import { TradingViewWidget } from './components/TradingViewWidget';
import { MBKChartCanvas } from './components/MBKChartCanvas';
import { SignalBlotter } from './components/SignalBlotter';
import { RightUtilityDock } from './components/RightUtilityDock';
import { TopCreatorsLeaderboard } from './components/TopCreatorsLeaderboard';
import { IndicatorStore } from './components/IndicatorStore';
import { AdminPortal } from './components/AdminPortal';
import { LiveSignalsDesk } from './components/LiveSignalsDesk';
import { EconomicCalendar } from './components/EconomicCalendar';
import { LiveRoom } from './components/LiveRoom';
import { CourseClassroom } from './components/CourseClassroom';
import { WebhookModal } from './components/WebhookModal';
import { WelcomeIndexModal } from './components/WelcomeIndexModal';
import { WelcomeIndexView } from './components/WelcomeIndexView';
import { WelcomeRegisterModal } from './components/WelcomeRegisterModal';
import { LogoUploaderModal } from './components/LogoUploaderModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { usePWAInstall } from './hooks/usePWAInstall';
import { Signal, TickerSymbol, MembershipTier, Language, ChannelId, ActiveTab } from './types';
import { BarChart2, Layers, X } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('terminal');
  const [activeHubId, setActiveHubId] = useState<string>('mbk-official');
  const [activeChannel, setActiveChannel] = useState<ChannelId>('desk');
  const [activeTicker, setActiveTicker] = useState<TickerSymbol>('US100');
  const [chartMode, setChartMode] = useState<'mbk_smc' | 'tradingview'>('mbk_smc');
  const [userTier, setUserTier] = useState<MembershipTier>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mbk_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.tier) return parsed.tier;
        } catch (e) {}
      }
    }
    return 'pro';
  });
  const [isRightDockOpen, setIsRightDockOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return false;
  });
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isWelcomeRegisterOpen, setIsWelcomeRegisterOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('mbk_user_profile');
    }
    return false;
  });
  const [isLogoUploaderOpen, setIsLogoUploaderOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mbk_user_profile');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return { name: 'Institutional Trader', email: 'trader@mbk.institutional', registered: false };
  });
  const [isMobileChannelsOpen, setIsMobileChannelsOpen] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  // PWA Install Hook
  const { isInstallable, install } = usePWAInstall();

  // Audio and Push Alert states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasPushPermission, setHasPushPermission] = useState(false);
  const [newAlertToast, setNewAlertToast] = useState<Signal | null>(null);
  const prevSignalCountRef = useRef<number>(0);

  // Web Audio alert chime
  const playAlertChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext policy
    }
  };

  // Browser Push Notifications
  const handleRequestPushNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        const granted = permission === 'granted';
        setHasPushPermission(granted);
        if (granted) {
          new Notification('MBK Trading Terminal', {
            body: 'Real-time TradingView alert notifications activated.',
          });
        }
      });
    }
  };

  // Fetch signals from full-stack backend
  const fetchSignals = async () => {
    try {
      const res = await fetch('/api/signals');
      const data = await res.json();
      if (data.signals) {
        if (prevSignalCountRef.current > 0 && data.signals.length > prevSignalCountRef.current) {
          const newest = data.signals[0];
          setNewAlertToast(newest);
          playAlertChime();

          if (hasPushPermission && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(`MBK Alert: ${newest.ticker} ${newest.direction}`, {
              body: `Entry: ${newest.entry} | SL: ${newest.sl} | TP1: ${newest.tp1} (Score: ${newest.score}%)`
            });
          }

          setTimeout(() => setNewAlertToast(null), 6000);
        }
        prevSignalCountRef.current = data.signals.length;
        setSignals(data.signals);
      }
    } catch (err) {
      console.error('Failed to fetch signals:', err);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 5000);
    return () => clearInterval(interval);
  }, [soundEnabled, hasPushPermission]);

  const handleSelectSignal = (sig: Signal) => {
    setSelectedSignal(sig);
    if (['US100', 'XAUUSD', 'EURUSD', 'BTCUSD'].includes(sig.ticker)) {
      setActiveTicker(sig.ticker as TickerSymbol);
    }
  };

  const handleTradeOnChart = (sig: Signal) => {
    handleSelectSignal(sig);
    setActiveTab('terminal');
    setActiveChannel('desk');
  };

  const handleSignalAdded = (newSig: Signal) => {
    setSignals(prev => [newSig, ...prev]);
    setNewAlertToast(newSig);
    playAlertChime();
    setTimeout(() => setNewAlertToast(null), 6000);
  };

  const handleSelectHub = (hubId: string) => {
    setActiveHubId(hubId);
    if (hubId === 'hub-leaderboard') {
      setActiveTab('creators');
    } else {
      setActiveTab('terminal');
      setActiveChannel('desk');
    }
  };

  const handleSelectChannel = (channelId: ChannelId) => {
    setActiveChannel(channelId);
    setIsMobileChannelsOpen(false);
    if (['mbk-auto-bot', 'manual-vip', 'free-signals'].includes(channelId)) {
      setActiveTab('terminal');
    }
  };

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans pb-14 md:pb-0"
    >
      {/* 1. TOP TICKER MARQUEE */}
      <HeaderMarquee 
        onSelectTicker={(sym) => setActiveTicker(sym)} 
        activeTicker={activeTicker} 
        lang={lang}
      />

      {/* 2. TOP NAVIGATION BAR */}
      <TopNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'terminal') setActiveChannel('desk');
          if (tab === 'signals') setActiveChannel('mbk-auto-bot');
          if (tab === 'indicators') setActiveChannel('buy-indicators');
        }}
        userTier={userTier}
        onChangeTier={(t) => setUserTier(t)}
        onOpenWebhookModal={() => setIsWebhookModalOpen(true)}
        signalsCount={signals.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onRequestPushNotifications={handleRequestPushNotifications}
        hasPushPermission={hasPushPermission}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
        onOpenOverview={() => setActiveTab('overview')}
        onOpenLogoUploader={() => setIsLogoUploaderOpen(true)}
        onOpenWelcomeRegister={() => setIsWelcomeRegisterOpen(true)}
        onInstallApp={install}
        isInstallable={isInstallable}
      />

      {/* 3. MAIN 4-ZONE WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ZONE 1: Discord-Style Hub Rail (Visible on md and up when not on overview or admin) */}
        {activeTab !== 'overview' && activeTab !== 'admin' && (
          <div className="hidden md:flex">
            <HubRail
              activeHubId={activeHubId}
              onSelectHub={handleSelectHub}
              lang={lang}
            />
          </div>
        )}

        {/* ZONE 2: Channel Hierarchy Sidebar (Desktop) */}
        {activeTab !== 'admin' && activeTab !== 'overview' && activeHubId !== 'hub-leaderboard' && (
          <div className="hidden md:flex">
            <ChannelSidebar
              activeChannel={activeChannel}
              onSelectChannel={handleSelectChannel}
              userTier={userTier}
              onUpgradeTier={() => {
                setActiveTab('indicators');
                setActiveChannel('buy-indicators');
              }}
              lang={lang}
            />
          </div>
        )}

        {/* Mobile Slide-Out Channel Drawer */}
        {isMobileChannelsOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex">
            <div className="w-72 bg-slate-900 h-full flex flex-col border-r border-slate-800 shadow-2xl relative">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold text-white text-xs">Channels & Hubs</span>
                <button
                  onClick={() => setIsMobileChannelsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <HubRail
                  activeHubId={activeHubId}
                  onSelectHub={(h) => {
                    handleSelectHub(h);
                    setIsMobileChannelsOpen(false);
                  }}
                  lang={lang}
                />
                <div className="flex-1 overflow-y-auto">
                  <ChannelSidebar
                    activeChannel={activeChannel}
                    onSelectChannel={handleSelectChannel}
                    userTier={userTier}
                    onUpgradeTier={() => {
                      setActiveTab('indicators');
                      setActiveChannel('buy-indicators');
                      setIsMobileChannelsOpen(false);
                    }}
                    lang={lang}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMobileChannelsOpen(false)} />
          </div>
        )}

        {/* ZONE 3: Center Workspace Viewport */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
          {/* View Mode 0: Dedicated Welcome & Platform Services Index Tab */}
          {activeTab === 'overview' && (
            <WelcomeIndexView
              lang={lang}
              onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
              onSelectTier={(tier) => setUserTier(tier)}
              onGoToDesk={() => {
                setActiveTab('terminal');
                setActiveChannel('desk');
              }}
              onGoToSignals={() => {
                setActiveTab('signals');
                setActiveChannel('mbk-auto-bot');
              }}
              onGoToStore={() => {
                setActiveTab('indicators');
                setActiveChannel('buy-indicators');
              }}
              onGoToAdmin={() => {
                setActiveTab('admin');
              }}
              onOpenLogoUploader={() => setIsLogoUploaderOpen(true)}
              onOpenRegister={() => setIsWelcomeRegisterOpen(true)}
              onInstallApp={install}
              isInstallable={isInstallable}
            />
          )}

          {/* View Mode A: Active Trading Desk Chart & Blotter */}
          {(activeTab === 'terminal' || activeChannel === 'desk' || activeChannel === 'free-signals' || activeChannel === 'mbk-auto-bot' || activeChannel === 'manual-vip') && activeTab !== 'overview' && activeChannel !== 'eco-calendar' && activeChannel !== 'live-room' && activeChannel !== 'buy-indicators' && activeChannel !== 'trading-courses' && activeTab !== 'signals' && activeTab !== 'creators' && activeTab !== 'admin' && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Asset Bar & Chart Configuration Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-900/90 border-b border-slate-800 shrink-0 text-xs select-none">
                {/* Core Institutional Asset Selectors (US100 & Gold Focus) */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
                    Core Assets:
                  </span>
                  
                  {/* US100 - Nasdaq 100 */}
                  <button
                    onClick={() => setActiveTicker('US100')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeTicker === 'US100'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/70 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                        : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    <span>US100</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-700 font-normal">
                      NASDAQ
                    </span>
                  </button>

                  {/* XAUUSD - Gold Spot */}
                  <button
                    onClick={() => setActiveTicker('XAUUSD')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeTicker === 'XAUUSD'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-600/70 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                        : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    <span>XAUUSD</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-slate-900 text-amber-400/80 border border-slate-700 font-normal">
                      GOLD
                    </span>
                  </button>

                  {/* Secondary Markets */}
                  {(['EURUSD', 'BTCUSD'] as TickerSymbol[]).map((ticker) => {
                    const isSelected = activeTicker === ticker;
                    return (
                      <button
                        key={ticker}
                        onClick={() => setActiveTicker(ticker)}
                        className={`px-2.5 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-slate-800 text-cyan-400 border border-slate-700 font-bold'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent'
                        }`}
                      >
                        {ticker}
                      </button>
                    );
                  })}
                </div>

                {/* Chart Engine Switcher */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
                    <button
                      onClick={() => setChartMode('mbk_smc')}
                      className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium transition-colors cursor-pointer ${
                        chartMode === 'mbk_smc'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>SMC Canvas</span>
                    </button>

                    <button
                      onClick={() => setChartMode('tradingview')}
                      className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium transition-colors cursor-pointer ${
                        chartMode === 'tradingview'
                          ? 'bg-slate-800 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>TradingView</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Full-Height Dominant Chart Area */}
              <div className="flex-1 w-full min-h-[380px] sm:min-h-[440px] max-h-[580px] bg-slate-950 relative border-b border-slate-800">
                {chartMode === 'mbk_smc' ? (
                  <MBKChartCanvas
                    symbol={activeTicker}
                    signals={signals}
                    selectedSignal={selectedSignal}
                    onSelectSignal={handleSelectSignal}
                  />
                ) : (
                  <TradingViewWidget
                    symbol={activeTicker}
                    interval="15"
                    theme="dark"
                  />
                )}
              </div>

              {/* LIVE SIGNAL BLOTTER (Underneath chart) */}
              <SignalBlotter
                signals={signals}
                userTier={userTier}
                onUpgradeTier={() => {
                  setActiveTab('indicators');
                  setActiveChannel('buy-indicators');
                }}
                onSelectSignal={handleSelectSignal}
                selectedSignalId={selectedSignal?.id}
                newAlertToast={newAlertToast}
              />
            </div>
          )}

          {/* View Mode B: Macro Economic Calendar */}
          {activeChannel === 'eco-calendar' && (
            <EconomicCalendar lang={lang} />
          )}

          {/* View Mode C: Live Audio Floor Room */}
          {activeChannel === 'live-room' && (
            <LiveRoom lang={lang} />
          )}

          {/* View Mode D: Learn Mode Course Classroom */}
          {activeChannel === 'trading-courses' && (
            <CourseClassroom
              lang={lang}
              userTier={userTier}
              onUpgradeTier={() => {
                setActiveTab('indicators');
                setActiveChannel('buy-indicators');
              }}
            />
          )}

          {/* View Mode E: Indicator Store & Memberships */}
          {(activeTab === 'indicators' || activeChannel === 'buy-indicators') && (
            <IndicatorStore
              userTier={userTier}
              onChangeTier={(t) => setUserTier(t)}
            />
          )}

          {/* View Mode F: Dedicated Live Signals Desk Tab */}
          {activeTab === 'signals' && (
            <LiveSignalsDesk
              signals={signals}
              isVip={userTier !== 'free'}
              onUnlockVip={() => {
                setActiveTab('indicators');
                setActiveChannel('buy-indicators');
              }}
              onTradeOnChart={handleTradeOnChart}
            />
          )}

          {/* View Mode G: Creators Leaderboard */}
          {(activeTab === 'creators' || activeHubId === 'hub-leaderboard') && (
            <TopCreatorsLeaderboard />
          )}

          {/* View Mode H: Admin Portal & Webhook Lab */}
          {activeTab === 'admin' && (
            <AdminPortal onSignalAdded={handleSignalAdded} />
          )}
        </main>

        {/* ZONE 4: Right-Side Utility Dock (Chat, @MBK-AI & News on the Side) */}
        <RightUtilityDock
          activeTicker={activeTicker}
          userTier={userTier}
          isOpen={isRightDockOpen}
          onToggleOpen={() => setIsRightDockOpen(!isRightDockOpen)}
          onUpgradeTier={() => {
            setActiveTab('indicators');
            setActiveChannel('buy-indicators');
          }}
        />
      </div>

      {/* 4. MOBILE BOTTOM TAB NAVIGATION */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'terminal') setActiveChannel('desk');
          if (tab === 'signals') setActiveChannel('mbk-auto-bot');
          if (tab === 'overview') setIsOverviewOpen(false);
        }}
        onToggleChannels={() => setIsMobileChannelsOpen(!isMobileChannelsOpen)}
        onToggleRightDock={() => setIsRightDockOpen(!isRightDockOpen)}
        onOpenOverview={() => setActiveTab('overview')}
        isRightDockOpen={isRightDockOpen}
        signalsCount={signals.length}
        lang={lang}
      />

      {/* 5. WELCOME INDEX & PLATFORM OVERVIEW MODAL */}
      <WelcomeIndexModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
        onSelectTier={(tier) => setUserTier(tier)}
        onGoToDesk={() => {
          setActiveTab('terminal');
          setActiveChannel('desk');
        }}
        onGoToStore={() => {
          setActiveTab('indicators');
          setActiveChannel('buy-indicators');
        }}
        onInstallApp={install}
        isInstallable={isInstallable}
      />

      {/* 6. WEBHOOK QUICK SETUP MODAL */}
      <WebhookModal
        isOpen={isWebhookModalOpen}
        onClose={() => setIsWebhookModalOpen(false)}
        onGoToAdmin={() => {
          setActiveTab('admin');
        }}
      />

      {/* 7. WELCOME PAGE & PRE-REGISTRATION GATEWAY */}
      <WelcomeRegisterModal
        isOpen={isWelcomeRegisterOpen}
        onClose={() => setIsWelcomeRegisterOpen(false)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
        onRegister={(userData) => {
          setUserTier(userData.tier);
          const updated = { name: userData.name, email: userData.email, registered: true };
          setUserProfile(updated);
          try {
            localStorage.setItem('mbk_user_profile', JSON.stringify(updated));
            localStorage.setItem('mbk_onboarded_dismissed', 'true');
          } catch (e) {}
          setIsWelcomeRegisterOpen(false);
          setActiveTab('terminal');
          setActiveChannel('desk');
        }}
        onContinueAsGuest={() => {
          try {
            localStorage.setItem('mbk_onboarded_dismissed', 'true');
          } catch (e) {}
          setIsWelcomeRegisterOpen(false);
        }}
        onOpenLogoUploader={() => setIsLogoUploaderOpen(true)}
      />

      {/* 8. DEDICATED LOGO UPLOADER & BRAND CUSTOMIZER MODAL */}
      <LogoUploaderModal
        isOpen={isLogoUploaderOpen}
        onClose={() => setIsLogoUploaderOpen(false)}
        lang={lang}
      />

      {/* 9. PWA OFFLINE CONNECTIVITY INDICATOR */}
      <OfflineIndicator />
    </div>
  );
}
