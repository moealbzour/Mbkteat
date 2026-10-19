import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Upload, 
  Crown, 
  BarChart2, 
  Flame,
  Radio,
  Lock,
  Layers,
  HelpCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Language, MembershipTier } from '../types';
import { MBKLogo } from './MBKLogo';

interface WelcomeRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: () => void;
  onRegister: (userData: { name: string; email: string; tier: MembershipTier }) => void;
  onContinueAsGuest: () => void;
  onOpenLogoUploader: () => void;
}

export const WelcomeRegisterModal: React.FC<WelcomeRegisterModalProps> = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  onRegister,
  onContinueAsGuest,
  onOpenLogoUploader,
}) => {
  const [selectedTier, setSelectedTier] = useState<MembershipTier>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [activeStep, setActiveStep] = useState<'welcome' | 'register'>('welcome');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({
      name: name.trim() || 'Institutional Trader',
      email: email.trim() || 'trader@mbk.institutional',
      tier: selectedTier,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none">
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden my-auto"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <MBKLogo size="sm" glow animated onClick={onOpenLogoUploader} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {lang === 'ar' ? 'منصة MBK المؤسسية' : 'MBK Institutional Trading Terminal'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  WELCOME DESK
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                {lang === 'ar' ? 'بوابة التسجيل والاشتراكات قبل الدخول للمنصة' : 'Welcome & Registration Gateway before entering the terminal'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenLogoUploader}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Upload or Change Logo"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'تعديل الشعار' : 'Upload Logo'}</span>
            </button>

            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            <button
              onClick={onContinueAsGuest}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* 1. HERO BRAND LOGO SHOWCASE BEFORE REGISTERING */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 border border-emerald-500/30 p-6 sm:p-8 overflow-hidden text-center shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-4">
              {/* Prominent Center Logo */}
              <div className="relative group cursor-pointer" onClick={onOpenLogoUploader} title="Click to upload custom logo">
                <MBKLogo size="hero" glow animated />
                <div className="absolute -bottom-2 right-0 bg-slate-950/90 border border-emerald-500/50 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Upload className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'تغيير الشعار' : 'Change Logo'}</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {lang === 'ar' ? 'أهلاً بك في منصة MBK للتداول المؤسسي' : 'Welcome to MBK Institutional Trading Terminal'}
                </h1>
                <p className="text-sm font-mono text-emerald-400 mt-1">
                  {lang === 'ar' ? 'المعيار المؤسسي لإشارات الناسداك (US100) والذهب (XAUUSD)' : 'The Institutional Standard for Nasdaq & Gold Algorithmic Order Flow'}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {lang === 'ar'
                  ? 'منصة تداول متكاملة تجمع بين رسوم بيانية حية بمفاهيم صانع السوق (SMC)، تدفق إشارات فوري عبر الويب هوك بسرعة أقل من 20 ملي ثانية، ومحلل الذكاء الاصطناعي المؤسسي المدعوم بـ Gemini 3.8 Flash.'
                  : 'A unified Bloomberg-grade execution terminal with sub-20ms TradingView webhook ingestion, Smart Money Concepts (SMC) order-block charting, and real-time algorithmic signal blotters.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" /> &lt;20ms Webhook Engine
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                  <BarChart2 className="w-3 h-3 text-cyan-400" /> Dual SMC & TradingView
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> 74.2% Verified Strike Rate
                </span>
              </div>
            </div>
          </div>

          {/* 2. CREATIVE SUBSCRIPTION TIERS & BENEFITS */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'ar' ? 'باقات الاشتراك والمزايا الحصرية' : 'Subscription Tiers & Creative Institutional Benefits'}</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {lang === 'ar' ? 'اختر خطتك المفضلة قبل الدخول إلى المنصة' : 'Select your tier to activate immediate access to live signal feeds'}
                </p>
              </div>

              {/* Billing Switcher */}
              <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'ar' ? 'شهري' : 'Monthly'}
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{lang === 'ar' ? 'سنوي (خصم 20%)' : 'Annual (Save 20%)'}</span>
                  <span className="text-[9px] px-1 py-0.2 bg-emerald-950 text-emerald-300 rounded font-bold border border-emerald-500/40">
                    2 FREE SCRIPTS
                  </span>
                </button>
              </div>
            </div>

            {/* 4 TIER CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* TIER 1: FREE DESK */}
              <div 
                onClick={() => setSelectedTier('free')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTier === 'free'
                    ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/20 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Tier 0</span>
                    {selectedTier === 'free' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Free Desk</h4>
                    <p className="text-xs text-slate-400">For retail traders exploring institutional concepts</p>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">$0 <span className="text-xs text-slate-400 font-normal">/ month</span></div>

                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Live SMC & TV Charts</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> 5 Daily @MBK-AI Queries</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Public Free Signals Channel</li>
                    <li className="flex items-start gap-1.5 text-slate-500"><Lock className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" /> Automated Webhook Signals</li>
                  </ul>
                </div>

                <button
                  type="button"
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTier === 'free' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {selectedTier === 'free' ? 'Selected' : 'Select Free Desk'}
                </button>
              </div>

              {/* TIER 2: BASIC SIGNALS */}
              <div 
                onClick={() => setSelectedTier('basic')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTier === 'basic'
                    ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/20 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase">Tier 1</span>
                    {selectedTier === 'basic' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Basic Signals</h4>
                    <p className="text-xs text-slate-400">High-conviction algorithmic alerts for US100 & Gold</p>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {billingCycle === 'annual' ? '$39' : '$49'} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>

                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Sub-20ms Webhook Ingestion</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Verified TP1, TP2 & SL Levels</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> 1-Click Clipboard MT4/MT5 Copy</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> 25 Daily @MBK-AI Prompts</li>
                  </ul>
                </div>

                <button
                  type="button"
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTier === 'basic' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {selectedTier === 'basic' ? 'Selected' : 'Select Basic'}
                </button>
              </div>

              {/* TIER 3: PRO SUITE (MOST POPULAR) */}
              <div 
                onClick={() => setSelectedTier('pro')}
                className={`p-5 rounded-2xl border relative transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTier === 'pro'
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-emerald-400 ring-4 ring-emerald-500/25 shadow-xl shadow-emerald-500/10'
                    : 'bg-slate-900/80 border-emerald-500/40 hover:border-emerald-400'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[9px] uppercase tracking-wider shadow-sm">
                  MOST POPULAR
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Tier 2 Flagship</span>
                    {selectedTier === 'pro' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Pro Suite</h4>
                    <p className="text-xs text-slate-400">Full institutional master suite & TradingView scripts</p>
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {billingCycle === 'annual' ? '$79' : '$99'} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>

                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> All Basic Signal alerts</li>
                    <li className="flex items-start gap-1.5 font-semibold text-emerald-300"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> MBK PineScript v6 Invite-Only Key</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> Unlimited Gemini 3.8 AI Vision</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> 18-Hour Order Flow Masterclass</li>
                  </ul>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full py-2 rounded-xl text-xs font-mono font-bold transition-all bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                >
                  {selectedTier === 'pro' ? 'Selected (Active)' : 'Select Pro Suite'}
                </button>
              </div>

              {/* TIER 4: ELITE PROP DESK */}
              <div 
                onClick={() => setSelectedTier('elite')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTier === 'elite'
                    ? 'bg-slate-800/90 border-amber-400 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase">Tier 3 VIP</span>
                    {selectedTier === 'elite' && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Elite Prop Desk</h4>
                    <p className="text-xs text-slate-400">For funded prop-firm traders & community creators</p>
                  </div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    {billingCycle === 'annual' ? '$159' : '$199'} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>

                  <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> FTMO/Apex/Topstep Prop Guard</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> Dedicated Private Webhook Secret</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> 1-on-1 Monthly Quant Onboarding</li>
                    <li className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> Multi-Creator Hub Hosting Rights</li>
                  </ul>
                </div>

                <button
                  type="button"
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTier === 'elite' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {selectedTier === 'elite' ? 'Selected' : 'Select Elite'}
                </button>
              </div>
            </div>
          </div>

          {/* 3. REGISTRATION FORM BEFORE ENTERING TERMINAL */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {lang === 'ar' ? 'نموذج التسجيل الفوري للدخول إلى المنصة' : 'Instant Registration & Access Form'}
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  {lang === 'ar' ? 'سجل بياناتك للبدء بحسابك المؤسسي فوراً' : 'Complete quick registration to enter the terminal with your chosen tier'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    {lang === 'ar' ? 'الاسم الكامل أو اسم التداول:' : 'Full Name or Trading Alias:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Trader"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@mbk.institutional"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {lang === 'ar' ? 'الخطة المحددة:' : 'Selected Plan:'}{' '}
                  <strong className="text-emerald-400 capitalize">{selectedTier} Desk</strong> ({billingCycle})
                </span>
                <span className="text-emerald-300 font-bold">14-Day Full Satisfaction Guarantee</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onContinueAsGuest}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'الدخول كزائر للمعاينة السريعة' : 'Skip & Enter as Guest Demo'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تأكيد التسجيل والدخول للمنصة' : 'Confirm Registration & Launch Desk'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
