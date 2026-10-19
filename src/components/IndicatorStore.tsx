import React, { useState } from 'react';
import { IndicatorProduct, MembershipTier } from '../types';
import { ShoppingBag, Star, Check, Zap, Key, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

const PRODUCTS: IndicatorProduct[] = [
  {
    id: 'prod-1',
    title: 'MBK Master Institutional Engine v6.2 (PineScript)',
    type: 'indicator',
    price: 199,
    originalPrice: 349,
    category: 'PineScript v6 Indicator',
    rating: 4.95,
    reviewsCount: 384,
    description: 'The proprietary PineScript engine powering the MBK Trading Terminal. Automatically plots institutional Order Blocks, Fair Value Gaps, Point of Control (POC), and delivers real-time webhook alert payloads.',
    features: [
      'Native TradingView PineScript v6 invite-only script access',
      'Automated Webhook JSON Alert payloads ready for /api/webhook/mbk',
      'Multi-timeframe Order Block mitigation detection (1m to 4H)',
      'High-volume Fair Value Gap (FVG) and liquidity pool mapping',
      'Lifetime updates and private Discord/Telegram script access'
    ],
    isVipFree: true
  },
  {
    id: 'prod-2',
    title: 'SMC Liquidity & Market Structure Pro Toolkit',
    type: 'indicator',
    price: 149,
    originalPrice: 249,
    category: 'PineScript v6 Suite',
    rating: 4.88,
    reviewsCount: 240,
    description: 'Pinpoints internal and external market structure breaks (BOS/CHoCH) with strict filtering to prevent retail fakeouts on US100 and XAUUSD.',
    features: [
      'Dynamic Break of Structure (BOS) & CHoCH auto-labeling',
      'Session High/Low range projections (Asian, London, NY)',
      'Relative Volume (RVOL) spike alerts on key structural breaks',
      'Custom audio notifications and webhook triggers'
    ],
    isVipFree: true
  },
  {
    id: 'prod-3',
    title: 'Institutional Order Flow Masterclass (Zero to Funded)',
    type: 'course',
    price: 299,
    originalPrice: 499,
    category: 'Institutional Video Course',
    rating: 4.98,
    reviewsCount: 612,
    description: '14 comprehensive modules taught by Marcus Vance (CIO) and Elena Rostova. Master how algorithmic hedge funds execute trades on Nasdaq futures and spot gold.',
    features: [
      '18 hours of high-definition video lessons with trade breakdowns',
      'The exact 1:3 R:R risk management and drawdown recovery matrix',
      'Passing $100k-$200k prop firm evaluation protocols step-by-step',
      'Live weekly market breakdown recordings and PDF workbooks'
    ],
    isVipFree: true
  },
  {
    id: 'prod-4',
    title: 'The London / NY Silver Bullet Scalping Playbook',
    type: 'course',
    price: 99,
    originalPrice: 199,
    category: 'Execution Blueprint',
    rating: 4.91,
    reviewsCount: 188,
    description: 'The precision mechanical rules for trading the 03:00-04:00 AM London and 10:00-11:00 AM New York time windows with institutional FVG models.',
    features: [
      'Time-based algorithmic execution rules (no guesswork)',
      'Complete backtested statistics across 1,200 London/NY sessions',
      'Exact Entry, Invalidation (SL), and TP1/TP2 scaling guidelines'
    ],
    isVipFree: false
  }
];

interface IndicatorStoreProps {
  userTier: MembershipTier;
  onChangeTier: (tier: MembershipTier) => void;
}

export const IndicatorStore: React.FC<IndicatorStoreProps> = ({ userTier, onChangeTier }) => {
  const [tradingViewUsername, setTradingViewUsername] = useState('');
  const [activatedId, setActivatedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<IndicatorProduct | null>(null);

  const handleActivate = (product: IndicatorProduct) => {
    setShowModal(product);
  };

  const handleConfirmAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradingViewUsername.trim() || !showModal) return;

    setActivatedId(showModal.id);
    setTimeout(() => {
      setShowModal(null);
      setTradingViewUsername('');
    }, 1200);
  };

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      <div className="max-w-6xl mx-auto mb-8">
        {/* Header */}
        <div className="pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Institutional Membership & Indicator Store</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Membership Tiers & Algorithmic Tools
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Choose the membership tier that fits your trading scale. Upgrade instantly to unlock automated webhook signal feeds, invite-only PineScript engines, and institutional education.
          </p>
        </div>

        {/* Tier Comparison Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {/* TIER 0: FREE DESK */}
          <div className={`rounded-xl p-5 border flex flex-col justify-between transition-all ${
            userTier === 'free' 
              ? 'bg-slate-900 border-amber-500/60 shadow-md shadow-amber-500/5' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Free Desk</span>
                {userTier === 'free' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    ACTIVE TIER
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-mono text-white mb-3">
                $0 <span className="text-xs text-slate-500 font-sans font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Essential market surveillance for new traders exploring the MBK ecosystem.
              </p>
              <div className="space-y-2 text-xs text-slate-300 mb-6 font-sans">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Live TradingView & SMC Canvas charts</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> ForexLive & FXStreet real-time news wire</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Public community chat room</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> 5 daily @MBK-AI queries</div>
                <div className="flex items-center gap-2 text-slate-500 line-through">Automated live signal blotter</div>
                <div className="flex items-center gap-2 text-slate-500 line-through">PineScript v6 indicator invite keys</div>
              </div>
            </div>

            <button
              onClick={() => onChangeTier('free')}
              className={`w-full py-2 rounded-md font-mono text-xs font-bold transition-colors cursor-pointer ${
                userTier === 'free'
                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {userTier === 'free' ? 'Current Tier' : 'Switch to Free'}
            </button>
          </div>

          {/* TIER 1: BASIC SIGNALS */}
          <div className={`rounded-xl p-5 border flex flex-col justify-between transition-all relative ${
            userTier === 'basic' 
              ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Basic Signals</span>
                {userTier === 'basic' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                    ACTIVE TIER
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-mono text-white mb-3">
                $49 <span className="text-xs text-slate-500 font-sans font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Full access to automated and manual US100 & XAUUSD signals with exact SL/TP parameters.
              </p>
              <div className="space-y-2 text-xs text-slate-300 mb-6 font-sans">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Full Live Signals Blotter (US100 & Gold)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Exact Entry, SL, TP1, and TP2 targets</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> 1-Click MT4/MT5 clipboard export</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Browser push & sound notifications</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Unlimited @MBK-AI market analyses</div>
                <div className="flex items-center gap-2 text-slate-500 line-through">PineScript v6 proprietary indicator suite</div>
              </div>
            </div>

            <button
              onClick={() => onChangeTier('basic')}
              className={`w-full py-2 rounded-md font-mono text-xs font-bold transition-colors cursor-pointer ${
                userTier === 'basic'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              {userTier === 'basic' ? 'Current Tier' : 'Select Basic ($49/mo)'}
            </button>
          </div>

          {/* TIER 2: PRO INSTITUTIONAL ENGINE */}
          <div className={`rounded-xl p-5 border flex flex-col justify-between transition-all relative ${
            userTier === 'pro' 
              ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/15' 
              : 'bg-slate-900/60 border-slate-800'
          }`}>
            <div className="absolute -top-3 right-5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded shadow-sm">
              MOST POPULAR
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Pro Institutional</span>
                {userTier === 'pro' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    ACTIVE TIER
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold font-mono text-white mb-3">
                $99 <span className="text-xs text-slate-500 font-sans font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                The complete institutional suite: signals, proprietary TradingView PineScript engine, and video courses.
              </p>
              <div className="space-y-2 text-xs text-slate-300 mb-6 font-sans">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Everything in Basic Signals</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> MBK Master Institutional Engine PineScript v6 key</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> SMC Liquidity & FVG Pro Toolkit</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Institutional Order Flow Masterclass (18h video)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> VIP role badge in community floor</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Direct webhook setup integration</div>
              </div>
            </div>

            <button
              onClick={() => onChangeTier('pro')}
              className={`w-full py-2 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                userTier === 'pro'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
              }`}
            >
              {userTier === 'pro' ? 'Current Tier' : 'Upgrade to Pro ($99/mo)'}
            </button>
          </div>
        </div>

        {/* Section: Individual PineScript Indicators & Masterclasses */}
        <div className="pt-6 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white font-sans mb-4">
            PineScript Algorithms & Video Masterclasses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((prod) => {
              const isFreeForUser = prod.isVipFree && (userTier === 'pro' || userTier === 'elite');
              const isActivated = activatedId === prod.id;

              return (
                <div
                  key={prod.id}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                        {prod.category}
                      </span>

                      <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{prod.rating}</span>
                        <span className="text-slate-500 text-[10px]">({prod.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white font-sans mb-2">
                      {prod.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {prod.description}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {prod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      {isFreeForUser ? (
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded">
                          INCLUDED IN PRO
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold font-mono text-white">
                            ${prod.price}
                          </span>
                          <span className="text-xs line-through text-slate-500 font-mono">
                            ${prod.originalPrice}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleActivate(prod)}
                      className={`px-3.5 py-1.5 rounded-md font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isFreeForUser
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                      }`}
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>
                        {isActivated 
                          ? 'Access Granted' 
                          : isFreeForUser 
                          ? 'Claim TradingView Key' 
                          : 'Unlock Script'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PineScript Access Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-base font-bold text-white mb-1">
              TradingView Invite-Only Activation
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your TradingView username to activate <strong>{showModal.title}</strong> directly on your charts.
            </p>

            <form onSubmit={handleConfirmAccess} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  TradingView Username
                </label>
                <input
                  type="text"
                  required
                  value={tradingViewUsername}
                  onChange={(e) => setTradingViewUsername(e.target.value)}
                  placeholder="e.g. mbk_trader_pro"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-3 py-2 text-xs text-white outline-hidden font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded cursor-pointer"
                >
                  Confirm & Dispatch Script
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
