import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Bot, 
  Newspaper, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  Radio,
  ExternalLink,
  Camera,
  RefreshCw,
  Lock,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage, NewsItem, MembershipTier } from '../types';
import { MBKLogo } from './MBKLogo';

interface RightUtilityDockProps {
  activeTicker: string;
  userTier: MembershipTier;
  isOpen: boolean;
  onToggleOpen: () => void;
  onUpgradeTier?: () => void;
}

export const RightUtilityDock: React.FC<RightUtilityDockProps> = ({
  activeTicker,
  userTier,
  isOpen,
  onToggleOpen,
  onUpgradeTier,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'ai' | 'news'>('ai');

  // Trader Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // AI Assistant state
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; image?: string; timestamp: string }>>([
    {
      role: 'assistant',
      text: `Hello! I am @MBK-AI, your quantitative SMC market intelligence engine.\n\nActive chart: ${activeTicker}. You can ask about current Order Blocks, Fair Value Gaps (FVG), Point of Control (POC), or snap the current chart for instant institutional technical analysis.`,
      timestamp: 'Just now'
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQueryCount, setAiQueryCount] = useState(2); // Simulated count
  const [selectedImage, setSelectedImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiBottomRef = useRef<HTMLDivElement>(null);

  // Market News state
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsFilter, setNewsFilter] = useState<'ALL' | 'Forex' | 'Indices' | 'Commodities'>('ALL');
  const [newsLoading, setNewsLoading] = useState(false);

  // Fetch initial chat messages & news from backend
  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.news) setNews(data.news);
    } catch (err) {
      console.error(err);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/chat/messages')
      .then(res => res.json())
      .then(data => {
        if (data.messages) setChatMessages(data.messages);
      })
      .catch(console.error);

    fetchNews();
  }, []);

  // Auto-scroll chat and AI
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'ai') {
      aiBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, aiMessages, activeTab]);

  // Handle Send Chat
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userRole = userTier === 'pro' ? 'VIP' : userTier === 'basic' ? 'VIP' : 'Free';
    const text = chatInput.trim();
    setChatInput('');

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userTier === 'pro' ? 'ProQuant_Member' : userTier === 'basic' ? 'BasicTrader' : 'FloorVisitor',
          role: userRole,
          text
        })
      });
      const data = await res.json();
      if (data.message) {
        setChatMessages(prev => [...prev, data.message]);
      }
    } catch (err) {
      console.error('Failed to post message:', err);
    }
  };

  // Handle Image Upload for Gemini
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setSelectedImage({
        base64: base64Data,
        mimeType: file.type,
        preview: result
      });
    };
    reader.readAsDataURL(file);
  };

  // Quick Snapshot current active chart
  const handleSnapChart = () => {
    handleSendAi(`Analyze current ${activeTicker} market structure, Order Blocks, and Fair Value Gaps (FVG) from current chart desk.`);
  };

  // Handle Send AI Prompt to Gemini
  const handleSendAi = async (customPrompt?: string) => {
    const promptToSend = customPrompt || aiInput.trim();
    if (!promptToSend && !selectedImage) return;

    if (userTier === 'free' && aiQueryCount >= 5) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'You have reached your 5 daily free queries on @MBK-AI. Upgrade to Basic ($49) or Pro ($99) for unlimited institutional quant intelligence.',
          timestamp: 'Just now'
        }
      ]);
      return;
    }

    const userEntry = {
      role: 'user' as const,
      text: promptToSend,
      image: selectedImage?.preview,
      timestamp: 'Just now'
    };

    setAiMessages(prev => [...prev, userEntry]);
    if (!customPrompt) setAiInput('');
    const imagePayload = selectedImage;
    setSelectedImage(null);
    setAiLoading(true);
    setAiQueryCount(prev => prev + 1);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          imageBase64: imagePayload?.base64,
          mimeType: imagePayload?.mimeType,
          ticker: activeTicker
        })
      });

      const data = await res.json();
      if (data.reply) {
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.reply,
            timestamp: 'Just now'
          }
        ]);
      } else {
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.error || 'Unable to generate analysis at this time.',
            timestamp: 'Just now'
          }
        ]);
      }
    } catch (err: any) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Analysis error: ${err.message || 'Connection failure'}`,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const filteredNews = news.filter(item => {
    if (newsFilter === 'ALL') return true;
    return item.category === newsFilter;
  });

  const renderDrawerContent = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
      {/* TAB 1: @MBK-AI ASSISTANT */}
      {activeTab === 'ai' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header info */}
          <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini 3.8 Flash SMC Vision</span>
            </div>
            
            <div className="font-mono text-[10px]">
              {userTier === 'free' ? (
                <span className="text-amber-400">
                  {Math.max(0, 5 - aiQueryCount)} Queries Left
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Unlimited Pro
                </span>
              )}
            </div>
          </div>

          {/* Messages feed */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-emerald-950/80 border border-emerald-800/70 text-slate-100'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-800">
                      <MBKLogo size="xs" glow animated />
                      <span className="font-mono text-[10px] font-bold text-emerald-400">@MBK-AI QUANT</span>
                    </div>
                  )}
                  {msg.image && (
                    <div className="mb-2 rounded overflow-hidden border border-slate-700">
                      <img
                        src={msg.image}
                        alt="Chart Screenshot"
                        className="w-full max-h-40 object-cover"
                      />
                    </div>
                  )}
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {aiLoading && (
              <div className="flex items-center gap-2 p-3 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Analyzing Order Flow & Imbalances...</span>
              </div>
            )}
            <div ref={aiBottomRef} />
          </div>

          {/* Quick Actions Strip */}
          <div className="px-3 py-1.5 bg-slate-900/50 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-mono">
            <button
              onClick={handleSnapChart}
              className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-800/80 text-emerald-300 whitespace-nowrap flex items-center gap-1 cursor-pointer hover:bg-emerald-900"
            >
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Snap Chart</span>
            </button>
            <button
              onClick={() => handleSendAi(`What is the high-probability 1:3 R:R execution checklist for ${activeTicker} today?`)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
            >
              1:3 R:R Plan
            </button>
            <button
              onClick={() => handleSendAi(`Scan for Fair Value Gaps and Point of Control on ${activeTicker}.`)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer"
            >
              FVG / POC
            </button>
          </div>

          {/* Input & Image Upload */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            {selectedImage && (
              <div className="relative mb-2 inline-block rounded border border-emerald-500/50 overflow-hidden">
                <img
                  src={selectedImage.preview}
                  alt="Upload preview"
                  className="w-20 h-14 object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0.5 right-0.5 bg-slate-950/80 text-rose-400 rounded-full p-0.5 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Upload chart screenshot for vision analysis"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendAi();
                  }
                }}
                placeholder={`Ask @MBK-AI about ${activeTicker}...`}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-hidden font-sans"
              />

              <button
                onClick={() => handleSendAi()}
                disabled={aiLoading || (!aiInput.trim() && !selectedImage)}
                className="p-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRADER COMMUNITY CHAT */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-medium">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Terminal Floor Chat</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Active Traders: 342</span>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
            {chatMessages.map((msg) => {
              const isAdmin = msg.role === 'Admin';
              const isVipMsg = msg.role === 'VIP';

              return (
                <div key={msg.id} className="p-2.5 rounded bg-slate-900/80 border border-slate-800/70">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-200">
                        {msg.user}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                          isAdmin
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : isVipMsg
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {msg.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">{msg.text}</p>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Send message */}
          <form onSubmit={handleSendChat} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Share market observation..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded px-3 py-2 text-xs text-white placeholder-slate-500 outline-hidden"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="p-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: LIVE MARKET NEWS (ForexLive & FXStreet RSS) */}
      {activeTab === 'news' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-mono font-medium">
              <Newspaper className="w-3.5 h-3.5" />
              <span>ForexLive & FXStreet Wire</span>
            </div>
            
            <button
              onClick={fetchNews}
              disabled={newsLoading}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh News Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${newsLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="px-3 py-1.5 bg-slate-900/30 border-b border-slate-800 flex items-center gap-1 text-[11px] font-mono">
            {(['ALL', 'Indices', 'Forex', 'Commodities'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setNewsFilter(cat)}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  newsFilter === cat
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        item.impact === 'High'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {item.impact}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">{item.time}</span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-100 text-xs mb-1.5 leading-snug">
                  {item.headline}
                </h4>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1.5 border-t border-slate-800/60">
                  <span>{item.source}</span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Read Source</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className={item.sentiment === 'Bullish' ? 'text-emerald-400' : item.sentiment === 'Bearish' ? 'text-rose-400' : 'text-slate-400'}>
                      {item.sentiment}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. MOBILE SLIDE-OVER DRAWER WITH BACKDROP */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-xs">
          <div 
            className="w-full sm:w-96 max-w-[100vw] h-full bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col relative pb-16"
          >
            {/* Mobile Header Bar */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 text-xs font-mono shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'ai' ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>@MBK-AI</span>
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'chat' ? 'bg-slate-800 text-cyan-400 border border-slate-700 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'news' ? 'bg-slate-800 text-amber-400 border border-slate-700 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Newspaper className="w-3.5 h-3.5 text-amber-400" />
                  <span>News</span>
                </button>
              </div>

              <button
                onClick={onToggleOpen}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                title="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Content */}
            {renderDrawerContent()}
          </div>
          <div className="hidden sm:block flex-1" onClick={onToggleOpen} />
        </div>
      )}

      {/* 2. DESKTOP DOCKED SIDEBAR */}
      <div
        className={`hidden md:flex h-full flex-col bg-slate-950 border-l border-slate-800 transition-all duration-300 relative select-none ${
          isOpen ? 'w-80 lg:w-96' : 'w-12'
        }`}
      >
        {/* Collapse / Expand Tab Strip */}
        <div className="h-10 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-2 text-xs font-mono">
          {isOpen ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>@MBK-AI</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Trader Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'news'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5 text-amber-400" />
                <span>News Wire</span>
              </button>
            </div>
          ) : null}

          <button
            onClick={onToggleOpen}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto cursor-pointer"
            title={isOpen ? 'Collapse panel' : 'Expand panel'}
          >
            {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* When Collapsed: Vertical icon rail */}
        {!isOpen && (
          <div className="flex flex-col items-center gap-4 py-4 text-slate-400">
            <button
              onClick={() => { onToggleOpen(); setActiveTab('ai'); }}
              className="p-2 rounded hover:bg-slate-800 hover:text-emerald-400 transition-colors cursor-pointer"
              title="Open @MBK-AI"
            >
              <Bot className="w-5 h-5 text-emerald-400" />
            </button>
            <button
              onClick={() => { onToggleOpen(); setActiveTab('chat'); }}
              className="p-2 rounded hover:bg-slate-800 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Open Trader Chat"
            >
              <MessageSquare className="w-5 h-5 text-cyan-400" />
            </button>
            <button
              onClick={() => { onToggleOpen(); setActiveTab('news'); }}
              className="p-2 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors cursor-pointer"
              title="Open Live Market News"
            >
              <Newspaper className="w-5 h-5 text-amber-400" />
            </button>
          </div>
        )}

        {/* Main Drawer Content when Open on Desktop */}
        {isOpen && renderDrawerContent()}
      </div>
    </>
  );
};

