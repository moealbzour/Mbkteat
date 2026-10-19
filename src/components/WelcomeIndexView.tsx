import React, { useState } from 'react';
import { 
  Terminal, 
  Zap, 
  Layers, 
  Bot, 
  ShieldCheck, 
  Trophy, 
  GraduationCap, 
  ArrowRight, 
  Check, 
  Globe, 
  Sparkles,
  Download,
  ExternalLink,
  Flame,
  Radio,
  BarChart3,
  Smartphone,
  Cpu,
  Clock,
  Volume2,
  Lock,
  Compass,
  TrendingUp,
  CheckCircle2,
  FileText,
  Upload,
  UserCheck
} from 'lucide-react';
import { Language, MembershipTier } from '../types';
import { MBKLogo } from './MBKLogo';

interface WelcomeIndexViewProps {
  lang: Language;
  onToggleLang: () => void;
  onSelectTier: (tier: MembershipTier) => void;
  onGoToDesk: () => void;
  onGoToSignals: () => void;
  onGoToStore: () => void;
  onGoToAdmin: () => void;
  onOpenLogoUploader?: () => void;
  onOpenRegister?: () => void;
  onInstallApp?: () => void;
  isInstallable?: boolean;
}

export const WelcomeIndexView: React.FC<WelcomeIndexViewProps> = ({
  lang,
  onToggleLang,
  onSelectTier,
  onGoToDesk,
  onGoToSignals,
  onGoToStore,
  onGoToAdmin,
  onOpenLogoUploader,
  onOpenRegister,
  onInstallApp,
  isInstallable,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'layers' | 'services' | 'tiers' | 'mobile'>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [simAccountSize, setSimAccountSize] = useState<number>(50000);
  const [simRiskPercent, setSimRiskPercent] = useState<number>(1);

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 select-none"
    >
      {/* 1. HERO INSTITUTIONAL HEADER */}
      <section className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/50 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="relative group cursor-pointer" 
                onClick={onOpenLogoUploader}
                title={lang === 'ar' ? 'انقر لتغيير أو تحميل شعارك الخاص' : 'Click to customize or upload your brand logo'}
              >
                <MBKLogo size="2xl" glow animated />
                <div className="absolute -bottom-2 -right-1 bg-slate-950/95 border border-emerald-500/60 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'تعديل الشعار' : 'Upload Logo'}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    MBK TRADING TERMINAL v2.4
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="font-mono text-xs text-slate-400 mt-1">
                  {lang === 'ar' ? 'بنية تحتية للمتداولين والمجتمعات الخوارزمية' : 'Institutional Trading Architecture & Signals Ecosystem'}
                </div>
              </div>
            </div>

            {onOpenLogoUploader && (
              <button
                onClick={onOpenLogoUploader}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'ar' ? 'تحميل شعارك الخاص' : 'Upload Your Logo'}</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            {lang === 'ar'
              ? 'دليل المنصة والخدمات المؤسسية: بيئة تداول متكاملة للمحترفين'
              : 'The Institutional Trading Terminal & Ecosystem for High-Conviction Traders'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === 'ar'
              ? 'صُممت منصة MBK لنقل مجتمعات التداول وقنوات التليجرام إلى منصة ويب احترافية تحاكي شاشات بلومبرج وتريدينج فيو. تتضمن تدفق إشارات آلي عبر الويب هوك لأزواج الناسداك (US100) والذهب (XAUUSD)، ومحرك مفاهيم صانع السوق (SMC)، ومحلل ذكاء اصطناعي كمي مدعوم بـ Gemini 3.8 Flash، وبنية تحتية للمبدعين مع دعم كامل لتطبيق الهاتف المحمول (PWA).'
              : 'MBK Trading Terminal delivers a unified Bloomberg-grade workspace designed to migrate Telegram communities onto a high-performance web application. Features sub-20ms TradingView webhook ingestion, dual-engine SMC charting, automated signal blotters for US100 & Gold, and server-side Gemini AI vision intelligence.'}
          </p>

          {/* Quick Action Launchpad */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onOpenRegister && (
              <button
                onClick={onOpenRegister}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <UserCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'صفحة التسجيل والاشتراكات' : 'Welcome & Register'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}

            <button
              onClick={onGoToDesk}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-slate-700 active:scale-95"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'فتح منصة التداول' : 'Launch Terminal Desk'}</span>
            </button>

            <button
              onClick={onGoToSignals}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'سجل الصفقات الحية' : 'Live Signal Blotter'}</span>
            </button>

            <button
              onClick={onGoToAdmin}
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'مختبر الويب هوك' : 'Test Webhook Lab'}</span>
            </button>

            {isInstallable && onInstallApp && (
              <button
                onClick={onInstallApp}
                className="px-4 py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'تثبيت كتطبيق هاتف' : 'Install Mobile App'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          {lang === 'ar' ? 'جميع الأقسام' : 'All Overview'}
        </button>
        <button
          onClick={() => setActiveCategory('services')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeCategory === 'services'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          {lang === 'ar' ? 'الخدمات المؤسسية (7)' : 'Institutional Services (7)'}
        </button>
        <button
          onClick={() => setActiveCategory('layers')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeCategory === 'layers'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          {lang === 'ar' ? 'الطبقات التقنية الخمس' : 'The 5 Visual Layers'}
        </button>
        <button
          onClick={() => setActiveCategory('tiers')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeCategory === 'tiers'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          {lang === 'ar' ? 'باقات الاشتراك' : 'Membership Tiers'}
        </button>
        <button
          onClick={() => setActiveCategory('mobile')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeCategory === 'mobile'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          {lang === 'ar' ? 'تطبيق الهاتف (PWA)' : 'Mobile WebApp (PWA)'}
        </button>
      </div>

      {/* 3. CORE SERVICES CATALOG (7 Institutional Services) */}
      {(activeCategory === 'all' || activeCategory === 'services') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'ar' ? 'الخدمات والحلول المؤسسية للمنصة' : 'Institutional Platform Services'}</span>
              </h2>
              <p className="text-slate-400 text-xs font-mono mt-0.5">
                {lang === 'ar' ? '7 خدمات متقدمة للمتداولين والمجموعات والمؤسسات' : 'Comprehensive suite of automated trading execution and analytics'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Service 1 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AUTOMATED
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'ربط إشارات TradingView عبر الويب هوك' : 'Automated TradingView Webhook Bridge'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'مسار API فوري (`/api/webhook/mbk`) يستقبل تنبيهات استراتيجيات مؤشر MBK Master Engine، ويتحقق من جودة الإشارة والحجم النسبي، ويبثها مباشرة إلى سجل الصفقات مع تنبيهات صوتية ودفع فوري.'
                    : 'Sub-20ms endpoint (`/api/webhook/mbk`) ingesting PineScript alert payloads with RVOL validation, threshold scoring, and instant broadcast to all subscriber blotters.'}
                </p>
              </div>
              <button
                onClick={onGoToAdmin}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'تجربة الويب هوك' : 'Test in Webhook Lab'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 2 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    SMC ALGO
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'محرك مفاهيم صانع السوق المؤسسي (SMC)' : 'Institutional SMC & Liquidity Engine'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'كشف تلقائي لمناطق صانع السوق (+OB طلب باللون الزمردي، -OB عرض باللون القرمزي)، والفجوات السعرية (FVG)، ونقاط التحكم الحجمي (POC) مع شارت HTML5 فائق السرعة.'
                    : 'Real-time HTML5 Canvas overlays identifying Bullish/Bearish Order Blocks, Fair Value Gap imbalances, and high-volume Point of Control reference levels on US100 and Gold.'}
                </p>
              </div>
              <button
                onClick={onGoToDesk}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'عرض على الشارت' : 'Inspect on Desk'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 3 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-700 text-purple-400 flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    GEMINI 3.8 FLASH
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'المساعد الذكي الكمي @MBK-AI' : 'Multimodal @MBK-AI Quant Assistant'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'تحليل فوري للقطات الشاشة وفحص هيكل السوق والسيولة وفق معايير 1:3 R:R المعتمدة من Google GenAI مع إمكانية التقاط الشارت الحالي بضغطة زر واحدة.'
                    : 'Institutional quantitative intelligence engine powered by server-side Google GenAI. Upload chart screenshots or snap active viewports for instant order-flow audits.'}
                </p>
              </div>
              <span className="text-purple-400 text-xs font-mono">
                {lang === 'ar' ? 'متاح في اللوحة الجانبية' : 'Available in Side Dock'}
              </span>
            </div>

            {/* Service 4 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-700 text-amber-400 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    EXECUTION
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'سجل الصفقات الفوري وحاسبة المخاطر' : 'Live Signal Blotter & Risk Calculator'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'متابعة حية للصفقات الآلية واليدوية مع حالات (RUNNING، TP1 HIT، RUNNER TRAILING)، ومؤشر ثقة MBK، ونسخ فوري للمستويات لمنصات MT4 وMT5.'
                    : 'Complete trade blotter cards tracking Entry, SL, TP1, and TP2 targets, runner status, and 1-click clipboard formatting for MT4, MT5, and cTrader.'}
                </p>
              </div>
              <button
                onClick={onGoToSignals}
                className="text-amber-400 hover:text-amber-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'فتح سجل الإشارات' : 'Open Signal Blotter'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 5 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center font-bold">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    MARKETPLACE
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'سوق المبدعين والمتداولين المعتمدين' : 'Verified Creator Multi-Tenant Hub'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'بنية متعددة المستأجرين تمكّن قادة مجتمعات التداول وقنوات التليجرام المعتمدة من استضافة غرفهم ومشاركة إشاراتهم مع سجل نتائج ونسب ربح موثقة.'
                    : 'Multi-tenant architecture allowing verified external traders to host their communities on MBK with transparent win-rate, total pips, and ROI tracking.'}
                </p>
              </div>
              <button
                onClick={onGoToStore}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'عرض قائمة المبدعين' : 'Browse Creators'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 6 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    ACADEMY
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'أكاديمية تدفق الأوامر وصناع السوق' : 'Institutional Order Flow Masterclass'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? '18 ساعة تدريبية متقدمة تغطي سيولة تداخل جلستي لندن ونيويورك، واقتناص الفجوات السعرية، وإدارة مخاطر الحسابات الممولة بدون عواطف.'
                    : 'Comprehensive curriculum covering microstructure imbalances, session overlap liquidity, and drawdown mechanics for prop firm and institutional trading.'}
                </p>
              </div>
              <button
                onClick={onGoToStore}
                className="text-blue-400 hover:text-blue-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'استعراض الدورات' : 'View Masterclass'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Service 7 */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-950 border border-rose-700 text-rose-400 flex items-center justify-center font-bold">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    LIVE AUDIO
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">
                  {lang === 'ar' ? 'الغرفة الصوتية المباشرة لجلسات الأخبار' : 'Live Floor Audio Trading Stage'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'بث صوتي مباشر خلال الأحداث الاقتصادية الكبرى (الفيدرالي، التضخم الأمريكي، تقارير الوظائف غير الزراعية) مع تعليق فوري من كبار المتداولين.'
                    : 'Low-latency interactive voice stage connecting traders live during FOMC rate decisions, US CPI, and NFP market events with macro breakdown.'}
                </p>
              </div>
              <button
                onClick={onGoToDesk}
                className="text-rose-400 hover:text-rose-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'دخول الغرفة الصوتية' : 'Join Voice Room'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. THE 5 INSTITUTIONAL TERMINAL LAYERS */}
      {(activeCategory === 'all' || activeCategory === 'layers') && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-sans flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>{lang === 'ar' ? 'الطبقات التقنية الخمس للمنصة المؤسسية' : 'The 5 Institutional Visual Layers'}</span>
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-0.5">
              {lang === 'ar'
                ? 'الهيكل الهندسي الذي يميز شاشات التداول الاحترافية عن المواقع التقليدية'
                : 'Architectural layers separating Bloomberg-grade trading desks from generic retail sites'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                num: '01',
                title: lang === 'ar' ? 'شريط وميض الأسعار الحي (Global Ticker Marquee)' : 'Global Real-Time Ticker Marquee',
                desc: lang === 'ar'
                  ? 'شريط علوي دائم يبث تحديثات أسعار لحظية لأزواج US100، XAUUSD، EURUSD، وBTC مع وميض أخضر وأحمر مع كل صفقة.'
                  : 'Streaming live bid/ask updates for US100, Gold, EURUSD, and BTC with low-latency red/green flash animations.',
                badge: 'Real-Time Tick Stream',
                icon: TrendingUp
              },
              {
                num: '02',
                title: lang === 'ar' ? 'شاشات التداول المزدوجة (Dual-Engine Trading Desk)' : 'Dual-Engine TradingView & SMC Canvas Desk',
                desc: lang === 'ar'
                  ? 'شارتات تداول تفاعلية بدقة متناهية مع خيارات إظهار مناطق الدعم والمقاومة المؤسسية والفجوات السعرية (FVG) ونقاط الارتكاز (POC).'
                  : 'High-density chart workspace featuring dark-mode TradingView feeds and custom HTML5 Canvas SMC overlays.',
                badge: 'HTML5 SMC Canvas',
                icon: Layers
              },
              {
                num: '03',
                title: lang === 'ar' ? 'سجل الصفقات الفوري وحاسبة العقد (Live Signal Blotter)' : 'Live Signal & Execution Blotter',
                desc: lang === 'ar'
                  ? 'بطاقات صفقات آنية تعرض اتجاه الدخول، وقف الخسارة، والأهداف مع مؤشر ثقة MBK وخاصية النسخ لمنصات MT4/MT5 بضغطة زر.'
                  : 'Real-time trade cards tracking Entry, SL, TP1, TP2, MBK Score, and status states (RUNNING, TP1 HIT, RUNNER TRAILING).',
                badge: 'Sub-20ms Updates',
                icon: Zap
              },
              {
                num: '04',
                title: lang === 'ar' ? 'الدرج الجانبي المخصص (Collapsible Utility Dock)' : 'Collapsible Right Utility Dock (Chat, AI & News)',
                desc: lang === 'ar'
                  ? 'لوحة جانبية قابلة للطي تحافظ على مساحة الشارت نظيفة، وتضم شات المتداولين، والمساعد الذكي، وشريط أخبار ForexLive/FXStreet المباشر.'
                  : 'Keeps community chatter and news off the chart workspace while providing instant access to @MBK-AI vision.',
                badge: 'Zero-Clutter Dock',
                icon: Bot
              },
              {
                num: '05',
                title: lang === 'ar' ? 'مساحات صناع المحتوى والأكاديمية (Multi-Tenant Hubs & Academy)' : 'Multi-Tenant Hub Rail & Learn Classrooms',
                desc: lang === 'ar'
                  ? 'شريط مساحات ديسكورد للتنقل بين كبار المتداولين المعتمدين، وقاعات بث صوتي مباشر، وفصول تدريبية لتتبع تقدم الدورات.'
                  : 'Discord-style icon rail switching between verified trader desks, live voice rooms, and video course classrooms.',
                badge: 'Multi-Tenant Scalability',
                icon: Trophy
              }
            ].map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.num}
                  className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 font-mono font-black text-base flex items-center justify-center shrink-0">
                    {layer.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm flex items-center gap-2">
                        <Icon className="w-4 h-4 text-emerald-400" />
                        <span>{layer.title}</span>
                      </h3>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {layer.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. MOBILE WEBAPP (PWA) ARCHITECTURE */}
      {(activeCategory === 'all' || activeCategory === 'mobile') && (
        <section className="rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/60 p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                <Smartphone className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تطبيق ويب تقدمي متجاوب مع الهواتف' : 'Mobile WebApp & PWA Engine'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
                {lang === 'ar' ? 'تجربة تداول أصلية ومرنة على متصفحات الهواتف' : 'Native-Like Mobile Experience in Any Browser'}
              </h2>
            </div>

            {isInstallable && onInstallApp && (
              <button
                onClick={onInstallApp}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-cyan-600/30"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تثبيت التطبيق على جهازك' : 'Install PWA Now'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="font-bold text-white mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'شريط تحكم سفلي مخصص للهواتف' : 'Adaptive Mobile Bottom Bar'}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {lang === 'ar'
                  ? 'وصول سريع وسلس إلى منصة التداول، وسجل الإشارات، والقنوات، وشات الذكاء الاصطناعي مع دعم كامل لمناطق الأمان (Safe Area Insets).'
                  : 'Instant access to Desk, Live Signals, Channel hubs, and AI vision with native safe-area bottom padding.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="font-bold text-white mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'درج جانبي متجاوب ومنزلق' : 'Slide-Out Utility Drawer'}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {lang === 'ar'
                  ? 'على شاشات الهواتف، تنزلق لوحة الدردشة والمساعد الذكي كدرج عائم دون التأثير على وضوح الشارت أو تشويه المساحة.'
                  : 'Chat, AI, and news slide over gracefully without squishing the chart or breaking viewport layout on phones.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="font-bold text-white mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'تشغيل بدون اتصال وتنبيهات صوتية' : 'Offline Support & Push Audio'}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {lang === 'ar'
                  ? 'تخزين مؤقت لملفات التطبيق مع تنبيهات صوتية عند وصول إشارة جديدة حتى أثناء استخدام الهاتف في الخلفية.'
                  : 'Service worker precaches assets, web audio alerts chime on new webhook events, and browser push alerts notify you.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. MEMBERSHIP TIERS & CREATIVE INSTITUTIONAL BENEFITS */}
      {(activeCategory === 'all' || activeCategory === 'tiers') && (
        <section className="space-y-8">
          {/* Section Header & Billing Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {lang === 'ar' ? 'الباقات المؤسسية' : 'TIERED SUBSCRIPTION ARCHITECTURE'}
                </span>
                <span className="text-slate-500 text-xs font-mono">• 0% Broker Commission</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans flex items-center gap-2.5">
                <MBKLogo size="sm" glow />
                <span>{lang === 'ar' ? 'باقات الاشتراك والترقية: استثمار في ميزتك التنافسية' : 'Institutional Subscription Tiers & Benefits'}</span>
              </h2>
              <p className="text-slate-400 text-xs font-mono mt-1 max-w-2xl">
                {lang === 'ar' 
                  ? 'اختر المستوى المناسب لأهدافك الاستثمارية. جميع الباقات تمنحك وصولاً فورياً وبدون أي قيود أو قيود ربط بالوسطاء.' 
                  : 'Transparent institutional pricing designed for serious individual traders, prop firm challenge candidates, and algorithmic desks.'}
              </p>
            </div>

            {/* Interactive Billing Toggle */}
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'ar' ? 'دفع شهري' : 'Monthly'}
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <span>{lang === 'ar' ? 'دفع سنوي' : 'Annual Plan'}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                  -20% OFF
                </span>
              </button>
            </div>
          </div>

          {/* Interactive ROI & Alpha Simulator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-emerald-950/30 border border-emerald-500/30 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حاسبة العائد الاستثماري لمشتركي MBK' : 'MBK ALPHA EDGE & ROI CALCULATOR'}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-sans">
                  {lang === 'ar' ? 'كم تحقق باقة Pro من عائد على رأس مالك؟' : 'Calculate Your Monthly Edge with MBK Engine'}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {lang === 'ar'
                    ? 'بناءً على متوسط إحصائيات إشارات US100 والذهب المحققة (نسبة فوز 74.2% ومتوسط ربح إلى خسارة 1:2.4). صفقة رابحة واحدة تغطي اشتراك السنة بالكامل!'
                    : 'Based on verified 2024-2026 performance metrics (74.2% win rate, 1:2.4 avg Risk/Reward). A single winning setup pays for over 6 to 12 months of membership.'}
                </p>
              </div>

              {/* Interactive Controls & Output */}
              <div className="flex flex-wrap items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                {/* Account Size Selector */}
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    {lang === 'ar' ? 'حجم الحساب:' : 'Account Size:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[10000, 50000, 100000, 200000].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSimAccountSize(size)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                          simAccountSize === size
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        ${size >= 1000 ? `${size / 1000}k` : size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk Per Trade Selector */}
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    {lang === 'ar' ? 'المخاطرة لكل صفقة:' : 'Risk / Trade:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[0.5, 1, 1.5].map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setSimRiskPercent(risk)}
                        className={`px-2 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                          simRiskPercent === risk
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {risk}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Projected Value Badge */}
                <div className="pl-2 border-l border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                    {lang === 'ar' ? 'العائد المتوقع شهرياً:' : 'Est. Monthly Edge:'}
                  </span>
                  <div className="font-mono text-base sm:text-lg font-black text-emerald-400">
                    +${Math.round(simAccountSize * (simRiskPercent / 100) * 2.4 * 3.2).toLocaleString()}
                    <span className="text-[11px] font-normal text-slate-400 ml-1">
                      (~{(simRiskPercent * 2.4 * 3.2).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The 4 Institutional Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* TIER 1: FREE DESK */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Free Desk</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">OBSERVER</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">$0</div>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                  {lang === 'ar' ? 'مناسبة للتعرف على شاشات التداول وأخبار السوق الحية.' : 'Essential charting and market news for retail market observers.'}
                </p>
                <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Live TradingView Charts (US100 & Gold)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Real-time ForexLive & FXStreet News Wire</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Public Community Trader Chat Channel</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>5 Daily @MBK-AI Quant Inquiries</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { onSelectTier('free'); onGoToDesk(); }}
                className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer active:scale-98"
              >
                {lang === 'ar' ? 'تفعيل المكتب المجاني' : 'Access Free Desk'}
              </button>
            </div>

            {/* TIER 2: BASIC SIGNALS */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-800/80 flex flex-col justify-between shadow-lg hover:border-cyan-600 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Basic Signals</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">EXECUTION</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">
                  ${billingCycle === 'annual' ? '39' : '49'}
                  <span className="text-xs font-normal text-slate-500 font-sans"> /month</span>
                </div>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                  {lang === 'ar' ? 'وصول فوري لإشارات US100 والذهب مع أهداف واضحة وتنبيهات صوتية.' : 'Full blotter signals access with push alerts, exact targets, and runner trailing.'}
                </p>
                <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Full US100 & Gold Live Signals Blotter</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Exact Entry, Stop-Loss, TP1, & TP2 target levels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Real-Time Web Audio Chimes & Push Notifications</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Runner Trailing Stops & Break-Even Guidance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Unlimited @MBK-AI Quant Queries</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { onSelectTier('basic'); onGoToDesk(); }}
                className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer active:scale-98 shadow-md shadow-cyan-600/20"
              >
                {lang === 'ar' ? 'تفعيل باقة الإشارات' : `Activate Basic ($${billingCycle === 'annual' ? '39' : '49'}/mo)`}
              </button>
            </div>

            {/* TIER 3: PRO SUITE (MOST POPULAR) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500 flex flex-col justify-between shadow-2xl ring-2 ring-emerald-500/20 relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-mono font-black text-[10px] px-3 py-0.5 rounded-full uppercase shadow-md shadow-emerald-500/30">
                INSTITUTIONAL FLAGSHIP
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MBKLogo size="xs" glow />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Pro Suite</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">ALL-INCLUSIVE</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">
                  ${billingCycle === 'annual' ? '79' : '99'}
                  <span className="text-xs font-normal text-slate-500 font-sans"> /month</span>
                </div>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                  {lang === 'ar' ? 'الترسانة المؤسسية الكاملة: مؤشرات الباين سكريبت والدورات والويب هوك.' : 'The complete institutional engine, TradingView script access & masterclass.'}
                </p>
                <div className="space-y-2.5 text-xs text-slate-200 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">Everything in Basic Signals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>MBK Master Engine PineScript v6 Invite-Only Key</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>18-Hour Institutional Order Flow Masterclass</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Direct TradingView Webhook Bridge Access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Private VIP Alpha Channel & Voice Floor Access</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { onSelectTier('pro'); onGoToDesk(); }}
                className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors cursor-pointer active:scale-98 shadow-lg shadow-emerald-500/30"
              >
                {lang === 'ar' ? 'فتح الباقة الاحترافية الكاملة' : `Unlock Pro Suite ($${billingCycle === 'annual' ? '79' : '99'}/mo)`}
              </button>
            </div>

            {/* TIER 4: INSTITUTIONAL ELITE / PROP DESK */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-purple-800/80 flex flex-col justify-between shadow-lg hover:border-purple-600 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MBKLogo size="xs" glow />
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Elite Prop Desk</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">VIP ELITE</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">
                  ${billingCycle === 'annual' ? '159' : '199'}
                  <span className="text-xs font-normal text-slate-500 font-sans"> /month</span>
                </div>
                <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                  {lang === 'ar' ? 'لحسابات التمويل المؤسسية ($100k+) وإدارة المخاطر وتوجيه مباشر.' : 'Designed for prop challenge traders ($100k-$300k) and multi-account operators.'}
                </p>
                <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">Everything in Pro Suite</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Dedicated Private Webhook Endpoint Secret</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Prop-Firm Challenge Risk Guard Parameters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>1-on-1 Monthly Strategy Onboarding with MBK Quant</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Multi-Creator Hub Hosting & Telegram Webhook Sync</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { onSelectTier('pro'); onGoToDesk(); }}
                className="w-full py-2.5 rounded-xl font-mono text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer active:scale-98 shadow-md shadow-purple-600/20"
              >
                {lang === 'ar' ? 'تفعيل باقة النخبة والممولين' : `Activate Elite ($${billingCycle === 'annual' ? '159' : '199'}/mo)`}
              </button>
            </div>
          </div>

          {/* Feature Matrix Comparison Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white font-sans">
                {lang === 'ar' ? 'جدول المقارنة التفصيلي بين الباقات' : 'Complete Feature Comparison Matrix'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {lang === 'ar' ? 'نظرة شاملة على الخصائص والميزات الفنية المتاحة في كل مستوى' : 'Detailed institutional capability breakdown across all access tiers'}
              </p>
            </div>

            <table className="w-full text-left text-xs text-slate-300 font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                  <th className="py-3 px-3">Feature Capability</th>
                  <th className="py-3 px-3 text-center">Free Desk</th>
                  <th className="py-3 px-3 text-center text-cyan-400">Basic Signals</th>
                  <th className="py-3 px-3 text-center text-emerald-400">Pro Suite</th>
                  <th className="py-3 px-3 text-center text-purple-400">Elite Prop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                <tr>
                  <td className="py-3 px-3 font-medium text-white">TradingView & SMC Canvas Dual-Engine Charts</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">ForexLive & FXStreet RSS Wire Feed</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">US100 & Gold Automated Live Signals Blotter</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">Web Audio Chimes & Browser Push Alerts</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">MBK Engine PineScript v6 Invite-Only Script</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">18-Hour Order Flow & Liquidity Masterclass</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">TradingView Webhook Execution Pipeline</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">Prop-Firm Challenge Risk Guard Parameters</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-purple-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">1-on-1 Monthly Strategy Desk Review</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center text-slate-600">—</td>
                  <td className="py-3 px-3 text-center"><Check className="w-4 h-4 text-purple-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 7. FOOTER LAUNCH ACTION */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MBKLogo size="md" glow animated />
          <div>
            <div className="font-bold text-white text-sm">
              {lang === 'ar' ? 'منصة إم بي كي للتداول المؤسسي' : 'MBK Trading Terminal'}
            </div>
            <div className="text-slate-400 font-mono text-xs">
              {lang === 'ar' ? 'جاهز للتداول والتحليل الخوارزمي الفوري' : 'Algorithmic Execution & Multi-Tenant Trading Infrastructure'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            onClick={onGoToDesk}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Terminal className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الدخول إلى المنصة' : 'Launch Desk'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
