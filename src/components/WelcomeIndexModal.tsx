import React, { useState } from 'react';
import { 
  X, 
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
  Radio
} from 'lucide-react';
import { Language, MembershipTier } from '../types';
import { MBKLogo } from './MBKLogo';

interface WelcomeIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: () => void;
  onSelectTier: (tier: MembershipTier) => void;
  onGoToDesk: () => void;
  onGoToStore: () => void;
  onInstallApp?: () => void;
  isInstallable?: boolean;
}

export const WelcomeIndexModal: React.FC<WelcomeIndexModalProps> = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  onSelectTier,
  onGoToDesk,
  onGoToStore,
  onInstallApp,
  isInstallable,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'layers' | 'tiers' | 'quickstart'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none">
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden my-auto"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <MBKLogo size="sm" glow animated />
            <div>
              <div className="font-bold text-white font-sans text-sm flex items-center gap-2">
                <span>{lang === 'ar' ? 'دليل منصة إم بي كي المؤسسية' : 'MBK Trading Terminal Platform Index'}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.4 INSTITUTIONAL
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {lang === 'ar' ? 'الجيل الجديد من منصات التداول والتحليل الخوارزمي' : 'Algorithmic Execution & Multi-Tenant Trading Infrastructure'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Welcome Index */}
        <div className="px-6 border-b border-slate-800 bg-slate-950/40 flex items-center gap-4 text-xs font-mono shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ar' ? 'نظرة عامة والخدمات' : 'Platform Overview'}
          </button>
          <button
            onClick={() => setActiveTab('layers')}
            className={`py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'layers'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ar' ? 'الطبقات التقنية الخمس' : 'The 5 Terminal Layers'}
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tiers'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ar' ? 'باقات الاشتراك والترقية' : 'Membership Tiers'}
          </button>
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`py-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'quickstart'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'ar' ? 'دليل البدء السريع' : 'Quick Start Guide'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200 text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Banner */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-slate-800">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'منصة التداول المؤسسية المتكاملة' : 'Institutional Trading Engineering'}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight mb-2">
                    {lang === 'ar'
                      ? 'مرحباً بك في منصة إم بي كي: بيئة التداول والتحليل الخوارزمي المتقدمة'
                      : 'Welcome to MBK Trading Terminal: Institutional Edge for SMC & Algorithmic Traders'}
                  </h2>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    {lang === 'ar'
                      ? 'منصة تداول متكاملة تجمع بين شاشات تداول بلومبرج الاحترافية وتحديثات الأسعار الفورية، وتدفق إشارات مؤتمتة عبر الويب هوك لأزواج الناسداك (US100) والذهب (XAUUSD)، ومجتمع تداول صوتي وكتابي مباشر، مع مساعد كمي مدعوم بالذكاء الاصطناعي.'
                      : 'Designed to transition Telegram trading communities onto a high-performance web application. Delivers sub-millisecond ticker feeds, native TradingView broker charts, algorithmic Order Block & FVG detection, and automated PineScript webhook trade execution.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onGoToDesk();
                      }}
                      className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                    >
                      <span>{lang === 'ar' ? 'الدخول إلى منصة التداول' : 'Enter Trading Terminal'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onGoToStore();
                      }}
                      className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
                    >
                      <span>{lang === 'ar' ? 'استعراض المؤشرات والدورات' : 'Explore Indicator Suite'}</span>
                    </button>

                    {isInstallable && onInstallApp && (
                      <button
                        onClick={onInstallApp}
                        className="px-4 py-2.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'تثبيت كتطبيق هاتف (PWA)' : 'Install as Mobile App'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 3 Core Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-3">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">
                    {lang === 'ar' ? 'إشارات فورية عبر الويب هوك' : 'Sub-20ms Webhook Alerts'}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {lang === 'ar'
                      ? 'ربط مباشر مع مؤشرات PineScript على TradingView لتنفيذ الصفقات وتحديث سجل التداول فورياً مع تنبيهات صوتية ودفع للمتصفح.'
                      : 'Ingests automated PineScript alert payloads directly into the live blotter cards with precise Entry, SL, TP1, and TP2 targets.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">
                    {lang === 'ar' ? 'محرك مفاهيم صانع السوق (SMC)' : 'Institutional SMC Overlays'}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {lang === 'ar'
                      ? 'رسم تلقائي لمناطق صانع السوق (Order Blocks) والفجوات السعرية (FVG) ونقاط التحكم الحجمي (POC) على شارت HTML5 تفاعلي.'
                      : 'Automated live detection of high-volume demand/supply order blocks and liquidity voids on US100 and Gold.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-3">
                    <Bot className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">
                    {lang === 'ar' ? 'المساعد الكمي @MBK-AI' : 'Gemini 3.8 Flash Vision'}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {lang === 'ar'
                      ? 'التقاط فوري لبيانات الشارت أو رفع لقطات شاشة لتحليل هيكل السوق واقتراح صفقات بنسبة عائد للمخاطرة 1:3.'
                      : 'Instant chart snapshot analysis powered by server-side Google GenAI, checking liquidity sweeps and invalidation criteria.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE 5 LAYERS */}
          {activeTab === 'layers' && (
            <div className="space-y-4">
              <div className="text-slate-400 text-xs mb-2">
                {lang === 'ar'
                  ? 'تم تصميم المنصة وفق 5 طبقات بصرية تفصل أدوات التداول المؤسسية الاحترافية عن مواقع التداول التقليدية:'
                  : 'Engineered according to the 5 visual layers that separate institutional terminals from basic retail sites:'}
              </div>

              {[
                {
                  step: '01',
                  title: lang === 'ar' ? 'شريط الأسعار الحي المتدفق (Global Marquee)' : 'Global Real-Time Ticker Marquee',
                  desc: lang === 'ar' 
                    ? 'شريط علوي دائم يبث تحديثات أسعار لحظية لأزواج US100، XAUUSD، EURUSD، وBTC مع وميض أخضر وأحمر مع كل صفقة.'
                    : 'Streaming live bid/ask updates for US100, Gold, EURUSD, and BTC with low-latency red/green flash animations.',
                  tag: 'Low-Latency WebSocket'
                },
                {
                  step: '02',
                  title: lang === 'ar' ? 'شاشات التداول المتقدمة (TradingView & SMC Canvas)' : 'Institutional Multi-Pane Trading Desk',
                  desc: lang === 'ar'
                    ? 'شارتات تداول تفاعلية بدقة متناهية مع خيارات إظهار مناطق الدعم والمقاومة المؤسسية والفجوات السعرية (FVG) ونقاط الارتكاز (POC).'
                    : 'High-density chart workspace featuring dark-mode TradingView feeds and custom HTML5 Canvas SMC overlays.',
                  tag: 'Dual-Engine Chart'
                },
                {
                  step: '03',
                  title: lang === 'ar' ? 'سجل الصفقات الفوري (Live Signal Blotter)' : 'Live Signal & Execution Blotter',
                  desc: lang === 'ar'
                    ? 'بطاقات صفقات آنية تعرض اتجاه الدخول، وقف الخسارة، والأهداف مع مؤشر ثقة MBK وخاصية النسخ لمنصات MT4/MT5 بضغطة زر.'
                    : 'Real-time trade cards tracking Entry, SL, TP1, TP2, MBK Score, and status states (RUNNING, TP1 HIT, RUNNER TRAILING).',
                  tag: '1-Click MT4/MT5 Export'
                },
                {
                  step: '04',
                  title: lang === 'ar' ? 'الدرج الجانبي المخصص (Desk Utility Dock)' : 'Side Utility Dock (Chat, AI & News)',
                  desc: lang === 'ar'
                    ? 'لوحة جانبية قابلة للطي تحافظ على مساحة الشارت نظيفة، وتضم شات المتداولين، والمساعد الذكي، وشريط أخبار ForexLive/FXStreet المباشر.'
                    : 'Keeps community chatter and news off the chart workspace while providing instant access to @MBK-AI vision.',
                  tag: 'Collapsible Drawer'
                },
                {
                  step: '05',
                  title: lang === 'ar' ? 'مساحات صناع المحتوى والأكاديمية (Hubs & Academy)' : 'Multi-Tenant Hubs & Learn Mode',
                  desc: lang === 'ar'
                    ? 'شريط مساحات ديسكورد للتنقل بين كبار المتداولين المعتمدين، وقاعات بث صوتي مباشر، وفصول تدريبية لتتبع تقدم الدورات.'
                    : 'Discord-style icon rail switching between verified trader desks, live voice rooms, and video course classrooms.',
                  tag: 'Multi-Tenant Scale'
                }
              ].map((layer) => (
                <div key={layer.step} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
                  <div className="text-xl font-mono font-black text-emerald-400 shrink-0">
                    {layer.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-xs">{layer.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {layer.tag}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TIERS */}
          {activeTab === 'tiers' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Free Desk</span>
                    <div className="text-2xl font-mono font-bold text-white my-2">$0</div>
                    <ul className="space-y-2 text-[11px] text-slate-300 mb-4">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-400" /> Live TradingView Charts</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-400" /> ForexLive News Wire</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-slate-400" /> Public Floor Chat</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400" /> 5 Daily @MBK-AI Queries</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTier('free');
                      onClose();
                    }}
                    className="w-full py-2 rounded font-mono text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                  >
                    Select Free Desk
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-700/80 flex flex-col justify-between shadow-md">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Basic Signals</span>
                    <div className="text-2xl font-mono font-bold text-white my-2">$49 <span className="text-xs font-normal text-slate-500">/mo</span></div>
                    <ul className="space-y-2 text-[11px] text-slate-300 mb-4">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-400" /> Full US100 & Gold Signals Blotter</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-400" /> Precise Entry, SL, TP1, and TP2</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-400" /> Browser Push & Sound Alerts</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-cyan-400" /> Unlimited @MBK-AI Quant Analysis</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTier('basic');
                      onClose();
                    }}
                    className="w-full py-2 rounded font-mono text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
                  >
                    Activate Basic ($49)
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500 flex flex-col justify-between shadow-lg ring-1 ring-emerald-500/30">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Pro Institutional</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">POPULAR</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-white my-2">$99 <span className="text-xs font-normal text-slate-500">/mo</span></div>
                    <ul className="space-y-2 text-[11px] text-slate-300 mb-4">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Everything in Basic Signals</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> MBK Engine PineScript v6 Invite Key</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Institutional Video Masterclass (18h)</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400" /> Direct TradingView Webhook Bridge</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTier('pro');
                      onClose();
                    }}
                    className="w-full py-2 rounded font-mono text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                  >
                    Unlock Pro Suite ($99)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUICKSTART */}
          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <h3 className="font-bold text-white text-sm mb-2">
                {lang === 'ar' ? 'كيف تبدأ التداول مع إم بي كي في 3 خطوات:' : 'How to Trade with MBK in 3 Simple Steps:'}
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === 'ar' ? 'اختر أصل التداول وشاهد مناطق صانع السوق' : 'Select US100 or XAUUSD on the Chart Desk'}
                    </div>
                    <div className="text-slate-400 font-sans text-xs mt-0.5">
                      Toggle the <strong>MBK Institutional SMC Engine</strong> to view real-time Order Blocks (+OB in emerald, -OB in crimson), Fair Value Gaps, and the Point of Control golden line.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === 'ar' ? 'راقب بطاقات الإشارات الحية في أسفل الشاشة' : 'Execute From Live Signals Blotter'}
                    </div>
                    <div className="text-slate-400 font-sans text-xs mt-0.5">
                      When a new trade card triggers, view the Entry, Stop Loss, and TP targets. Click the <strong>Copy icon</strong> to paste directly into MetaTrader 4/5 or cTrader.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <div>
                    <div className="font-bold text-white">
                      {lang === 'ar' ? 'استخدم المساعد الذكي @MBK-AI لتحليل الصفقات' : 'Ask @MBK-AI & Snap Current Chart'}
                    </div>
                    <div className="text-slate-400 font-sans text-xs mt-0.5">
                      Open the right utility dock, tap <strong>"Snap Chart"</strong> or upload a screenshot to get Gemini 3.8 Flash's instant quantitative 1:3 R:R checklist and liquidity analysis.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{lang === 'ar' ? 'المنصة جاهزة للتداول الفوري' : 'Institutional Desk Active & Ready'}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onGoToDesk();
            }}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'ابدأ التداول الآن' : 'Launch Terminal Desk'}
          </button>
        </div>
      </div>
    </div>
  );
};
