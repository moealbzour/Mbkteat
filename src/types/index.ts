export type TickerSymbol = 'US100' | 'XAUUSD' | 'EURUSD' | 'BTCUSD' | 'SPX500' | 'DXY';

export type MembershipTier = 'free' | 'basic' | 'pro' | 'elite';

export type Language = 'en' | 'ar';

export type ActiveTab = 
  | 'overview'
  | 'terminal' 
  | 'signals' 
  | 'creators' 
  | 'indicators' 
  | 'admin';

export type SignalDirection = 'BUY' | 'SELL';

export type SignalStatus = 'RUNNING' | 'TP1 HIT' | 'RUNNER TRAILING' | 'VIP LOCKED' | 'CLOSED';

export interface Signal {
  id: string;
  ticker: TickerSymbol | string;
  direction: SignalDirection;
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  currentPrice: number;
  score: number; // MBK Confidence Score (e.g. 96)
  rvol: number; // Relative volume (e.g. 2.8)
  timeframe: string;
  status: SignalStatus;
  isVip: boolean;
  tierRequired?: MembershipTier;
  strategy: string;
  author: string;
  timestamp: string;
  createdAt: string;
  notes?: string;
}

export interface MarketTicker {
  symbol: TickerSymbol;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  tickDirection: 'up' | 'down' | 'neutral';
}

export interface ChatMessage {
  id: string;
  user: string;
  role: 'Admin' | 'VIP' | 'Free';
  avatar: string;
  text: string;
  timestamp: string;
  upvotes: number;
  channelId?: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low';
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  category: string;
  summary: string;
  link?: string;
}

export interface Creator {
  id: string;
  name: string;
  role: string;
  handle: string;
  winRate: number; // e.g. 84.6%
  totalPips: number;
  monthlyReturn: number;
  subscribers: number;
  specialty: string;
  verifiedBadge: boolean;
  activeSignalsCount: number;
  bio: string;
}

export interface IndicatorProduct {
  id: string;
  title: string;
  type: 'indicator' | 'course' | 'bundle';
  price: number;
  originalPrice: number;
  category: string;
  rating: number;
  reviewsCount: number;
  features: string[];
  description: string;
  isVipFree: boolean;
}

export type ChannelId = 
  | 'desk'
  | 'market-news' 
  | 'eco-calendar' 
  | 'mbk-auto-bot' 
  | 'manual-vip' 
  | 'free-signals' 
  | 'traders-chat' 
  | 'live-room' 
  | 'buy-indicators' 
  | 'trading-courses';

export interface ChannelItem {
  id: ChannelId;
  name: string;
  nameAr: string;
  category: 'info' | 'signals' | 'community' | 'store';
  icon: string;
  isLocked?: boolean;
  tierRequired?: MembershipTier;
  unreadCount?: number;
}

export interface HubItem {
  id: string;
  name: string;
  nameAr: string;
  initials: string;
  icon?: string;
  isVerified?: boolean;
  creatorHandle?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  titleAr: string;
  duration: string;
  module: string;
  moduleAr: string;
  videoUrl?: string;
  isCompleted?: boolean;
  description: string;
}
