import React from 'react';
import { 
  Terminal, 
  Zap, 
  Trophy, 
  ShoppingBag, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Bell,
  Globe,
  BookOpen,
  Download,
  Upload,
  UserCheck
} from 'lucide-react';
import { MembershipTier, Language, ActiveTab } from '../types';
import { getTranslation } from '../locales/translations';
import { MBKLogo } from './MBKLogo';

export type { ActiveTab };

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  userTier: MembershipTier;
  onChangeTier: (tier: MembershipTier) => void;
  onOpenWebhookModal: () => void;
  signalsCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRequestPushNotifications: () => void;
  hasPushPermission: boolean;
  lang: Language;
  onToggleLang: () => void;
  onOpenOverview: () => void;
  onOpenLogoUploader?: () => void;
  onOpenWelcomeRegister?: () => void;
  onInstallApp?: () => void;
  isInstallable?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  userTier,
  onChangeTier,
  onOpenWebhookModal,
  signalsCount,
  soundEnabled,
  onToggleSound,
  onRequestPushNotifications,
  hasPushPermission,
  lang,
  onToggleLang,
  onOpenOverview,
  onOpenLogoUploader,
  onOpenWelcomeRegister,
  onInstallApp,
  isInstallable,
}) => {
  const t = getTranslation(lang);

  const tabs = [
    { id: 'overview' as ActiveTab, label: t.overviewTab, icon: BookOpen },
    { id: 'terminal' as ActiveTab, label: t.deskTab, icon: Terminal },
    { 
      id: 'signals' as ActiveTab, 
      label: t.signalsTab, 
      icon: Zap,
      badge: signalsCount > 0 ? `${signalsCount}` : undefined
    },
    { id: 'creators' as ActiveTab, label: t.creatorsTab, icon: Trophy },
    { id: 'indicators' as ActiveTab, label: t.storeTab, icon: ShoppingBag },
    { id: 'admin' as ActiveTab, label: t.adminTab, icon: ShieldCheck },
  ];

  return (
    <header className="flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-slate-950 border-b border-slate-800 text-slate-100 sticky top-0 z-40 select-none">
      {/* Zone 1: MBK Branding Header */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="relative group flex items-center gap-2.5 sm:gap-3">
          <button 
            type="button"
            onClick={() => {
              if (onOpenLogoUploader) onOpenLogoUploader();
              else onTabChange('terminal');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer relative"
            title={lang === 'ar' ? 'انقر لتغيير أو تحميل شعارك الخاص' : 'Click to customize or upload your brand logo'}
          >
            <div className="relative">
              <MBKLogo size="md" glow animated />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                <Upload className="w-2.5 h-2.5" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-black tracking-tight text-white font-sans whitespace-nowrap">
                  {t.terminalTitle}
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden xs:inline-block">
                  OFFICIAL
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-semibold uppercase -mt-0.5">
                {t.terminalSubtitle}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Zone 2: Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Actions, Language, Overview & Tier Switch */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Welcome & Register Button */}
        {onOpenWelcomeRegister && (
          <button
            onClick={onOpenWelcomeRegister}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xs transition-all cursor-pointer"
            title={lang === 'ar' ? 'صفحة الترحيب والتسجيل والاشتراكات' : 'Welcome & Registration Gateway'}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{lang === 'ar' ? 'التسجيل والترحيب' : 'Welcome & Register'}</span>
          </button>
        )}

        {/* Upload Logo CTA */}
        {onOpenLogoUploader && (
          <button
            onClick={onOpenLogoUploader}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-mono font-medium rounded-md bg-slate-900 border border-slate-700 hover:border-emerald-500/70 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={lang === 'ar' ? 'تحميل أو تغيير شعار المنصة' : 'Upload or customize brand logo'}
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">{lang === 'ar' ? 'الشعار' : 'Logo'}</span>
          </button>
        )}

        {/* Welcome Index & Platform Overview CTA */}
        <button
          onClick={onOpenOverview}
          className="flex items-center gap-1 px-2 py-1.5 text-xs font-mono font-semibold rounded-md bg-emerald-950/70 border border-emerald-600/70 text-emerald-300 hover:bg-emerald-900 transition-colors cursor-pointer"
          title={lang === 'ar' ? 'دليل المنصة والخدمات' : 'Platform Index & Services'}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">{lang === 'ar' ? 'دليل المنصة' : 'Index'}</span>
        </button>

        {/* PWA Install Button if Installable */}
        {isInstallable && onInstallApp && (
          <button
            onClick={onInstallApp}
            className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs font-mono font-bold rounded-md bg-cyan-950/80 border border-cyan-700 text-cyan-300 hover:bg-cyan-900 transition-colors cursor-pointer"
            title="Install as Progressive Web App"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Install App</span>
          </button>
        )}

        {/* Bilingual EN / العربية Toggle */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1 px-2 py-1.5 text-xs font-mono font-bold rounded-md bg-slate-900 border border-slate-700 hover:border-emerald-500 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          title={lang === 'en' ? 'التبديل إلى اللغة العربية' : 'Switch to English'}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
        </button>

        {/* Audio Alerts Chime Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={soundEnabled ? 'Signal sound alert enabled' : 'Signal sound alert muted'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Browser Push Notifications */}
        <button
          onClick={onRequestPushNotifications}
          className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
            hasPushPermission
              ? 'bg-cyan-950/60 border-cyan-700/60 text-cyan-300'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={hasPushPermission ? 'Browser alerts enabled' : 'Enable browser push notifications'}
        >
          <Bell className="w-3.5 h-3.5" />
        </button>

        {/* Webhook API Button */}
        <button
          onClick={onOpenWebhookModal}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-md bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Configure & Test TradingView Webhook"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xl:inline">{t.webhookBtn}</span>
        </button>

        {/* Tier Selector: Free / Basic / Pro */}
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-md p-0.5 text-xs font-mono">
          <button
            onClick={() => onChangeTier('free')}
            className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
              userTier === 'free'
                ? 'bg-slate-800 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.freeTier}
          </button>
          <button
            onClick={() => onChangeTier('basic')}
            className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
              userTier === 'basic'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.basicTier}
          </button>
          <button
            onClick={() => onChangeTier('pro')}
            className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
              userTier === 'pro'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.proTier}
          </button>
          <button
            onClick={() => onChangeTier('elite')}
            className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer ${
              userTier === 'elite'
                ? 'bg-amber-950 text-amber-300 border border-amber-800 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Elite
          </button>
        </div>
      </div>
    </header>
  );
};
