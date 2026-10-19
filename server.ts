import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initial Institutional Signals Database
let signals = [
  {
    id: 'sig-mbk-101',
    ticker: 'US100',
    direction: 'BUY',
    entry: 20420.50,
    sl: 20340.00,
    tp1: 20560.00,
    tp2: 20720.00,
    currentPrice: 20495.30,
    score: 96,
    rvol: 2.8,
    timeframe: '15m',
    status: 'TP1 HIT',
    isVip: false,
    strategy: 'MBK Institutional FVG Sweep',
    author: 'MBK Master Engine',
    timestamp: '12m ago',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    notes: 'Swept sell-side liquidity at London open into 15m bullish order block. High volume delta confirmation.'
  },
  {
    id: 'sig-mbk-102',
    ticker: 'XAUUSD',
    direction: 'BUY',
    entry: 2718.40,
    sl: 2707.00,
    tp1: 2736.00,
    tp2: 2755.00,
    currentPrice: 2729.80,
    score: 93,
    rvol: 2.1,
    timeframe: '1H',
    status: 'RUNNER TRAILING',
    isVip: false,
    strategy: 'Point of Control (POC) Breakout',
    author: 'Marcus Vance (CIO)',
    timestamp: '34m ago',
    createdAt: new Date(Date.now() - 34 * 60 * 1000).toISOString(),
    notes: 'Weekly POC held firm with massive institutional absorption. Runner trailing SL moved to +1.5R breakeven.'
  },
  {
    id: 'sig-mbk-103',
    ticker: 'US100',
    direction: 'SELL',
    entry: 20580.00,
    sl: 20645.00,
    tp1: 20460.00,
    tp2: 20380.00,
    currentPrice: 20530.10,
    score: 91,
    rvol: 1.9,
    timeframe: '5m',
    status: 'RUNNING',
    isVip: true,
    strategy: 'Bearish Order Block Rejection',
    author: 'Elena Rostova (Quant)',
    timestamp: '48m ago',
    createdAt: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    notes: 'NYSE open premium expansion rejected at session high. Bearish change of character (CHoCH) verified.'
  },
  {
    id: 'sig-mbk-104',
    ticker: 'XAUUSD',
    direction: 'SELL',
    entry: 2742.50,
    sl: 2753.00,
    tp1: 2724.00,
    tp2: 2708.00,
    currentPrice: 2735.60,
    score: 95,
    rvol: 3.4,
    timeframe: '15m',
    status: 'RUNNING',
    isVip: true,
    strategy: 'MBK Master Institutional Engine',
    author: 'MBK Master Engine',
    timestamp: '1h ago',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    notes: 'Algorithmic trigger: Asian high liquidity grab followed by severe fair value gap fill and momentum shift.'
  },
  {
    id: 'sig-mbk-105',
    ticker: 'EURUSD',
    direction: 'BUY',
    entry: 1.08450,
    sl: 1.08150,
    tp1: 1.08950,
    tp2: 1.09400,
    currentPrice: 1.08620,
    score: 89,
    rvol: 1.7,
    timeframe: '4H',
    status: 'RUNNING',
    isVip: false,
    strategy: 'Macro Liquidity Displacement',
    author: 'Kai Tanaka (Macro)',
    timestamp: '2h ago',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    notes: 'ECB rate guidance stabilization leading into dollar index (DXY) resistance testing.'
  }
];

// Initial Trader Community Chat Feed
let chatMessages = [
  {
    id: 'msg-1',
    user: 'Marcus_CIO',
    role: 'Admin',
    avatar: 'MV',
    text: 'US100 runners secured. TP1 was taken at 20,560; stop moved to breakeven +40 pts.',
    timestamp: '3m ago',
    upvotes: 18
  },
  {
    id: 'msg-2',
    user: 'ApexTrader_NY',
    role: 'VIP',
    avatar: 'AT',
    text: 'That XAUUSD POC bounce was clean. In since 2719, taking partials at 2732.',
    timestamp: '7m ago',
    upvotes: 12
  },
  {
    id: 'msg-3',
    user: 'QuantElena',
    role: 'Admin',
    avatar: 'ER',
    text: 'Watch US100 around 20,580 - high volume node and 15m FVG overlapping here.',
    timestamp: '15m ago',
    upvotes: 24
  },
  {
    id: 'msg-4',
    user: 'ScalpMaster88',
    role: 'Free',
    avatar: 'SM',
    text: 'Does @MBK-AI see continuation on Gold today?',
    timestamp: '21m ago',
    upvotes: 4
  },
  {
    id: 'msg-5',
    user: 'CyberBull_VIP',
    role: 'VIP',
    avatar: 'CB',
    text: 'The webhook alert popped on my phone before the 1m candle closed. Institutional latency is unreal.',
    timestamp: '28m ago',
    upvotes: 9
  }
];

// Curated Fallback News
const fallbackNews = [
  {
    id: 'news-1',
    headline: 'US Nasdaq 100 rallies past resistance as mega-cap tech leads momentum push',
    source: 'ForexLive / Reuters',
    time: '4m ago',
    impact: 'High',
    sentiment: 'Bullish',
    category: 'Indices',
    summary: 'Strong buying pressure emerged at London fix, absorbing liquidity across index futures with RVOL reaching 2.8x daily average.',
    link: 'https://www.forexlive.com'
  },
  {
    id: 'news-2',
    headline: 'Gold (XAU/USD) holds firm above key institutional Point of Control as bond yields soften',
    source: 'ForexLive / Bloomberg',
    time: '18m ago',
    impact: 'High',
    sentiment: 'Bullish',
    category: 'Commodities',
    summary: 'Spot gold defended critical $2,718 demand zone after central bank gold accumulation reports sparked fresh spot bids.',
    link: 'https://www.forexlive.com'
  },
  {
    id: 'news-3',
    headline: 'Federal Reserve rate probability meters shift as PPI prints within projections',
    source: 'FXStreet Financial Wire',
    time: '42m ago',
    impact: 'Medium',
    sentiment: 'Neutral',
    category: 'Macro',
    summary: 'Interest rate swap curves indicate 88% probability of steady policy stance in upcoming FOMC decision cycle.',
    link: 'https://www.fxstreet.com'
  },
  {
    id: 'news-4',
    headline: 'Dollar Index (DXY) retests 103.80 supply cluster with declining orderflow velocity',
    source: 'ForexLive Institutional',
    time: '1h ago',
    impact: 'Medium',
    sentiment: 'Bearish',
    category: 'Forex',
    summary: 'Multiple rejections at upper regression channel suggest potential dollar rotation towards key support bands.',
    link: 'https://www.forexlive.com'
  },
  {
    id: 'news-5',
    headline: 'Crude oil volatility contracts as OPEC+ maintains supply compliance baseline',
    source: 'FXStreet Markets',
    time: '2h ago',
    impact: 'Low',
    sentiment: 'Neutral',
    category: 'Energy',
    summary: 'WTI futures consolidate in a $2.20 channel with market participants awaiting weekly inventory drawdown data.',
    link: 'https://www.fxstreet.com'
  }
];

// Live RSS Feeds Ingestion with 60-second cache
let cachedNews: any[] = [];
let lastNewsFetch = 0;

async function getMarketNews() {
  const now = Date.now();
  if (cachedNews.length > 0 && now - lastNewsFetch < 60000) {
    return cachedNews;
  }

  const items: any[] = [];
  try {
    const res = await fetch('https://www.forexlive.com/feed/news', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const xml = await res.text();
      const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g);
      if (itemBlocks && itemBlocks.length > 0) {
        itemBlocks.slice(0, 10).forEach((block, idx) => {
          const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || block.match(/<title>(.*?)<\/title>/)?.[1];
          const desc = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || block.match(/<description>(.*?)<\/description>/)?.[1];
          const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
          const link = block.match(/<link>(.*?)<\/link>/)?.[1];

          if (title) {
            const cleanTitle = title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
            const cleanSummary = desc
              ? desc.replace(/<[^>]*>?/gm, '').replace(/&amp;/g, '&').trim().substring(0, 150) + '...'
              : 'Institutional breaking wire update.';

            const tLower = cleanTitle.toLowerCase();
            const impact = tLower.includes('fed') || tLower.includes('rate') || tLower.includes('cpi') || tLower.includes('powell') || tLower.includes('gold') ? 'High' : 'Medium';
            const sentiment = tLower.includes('jump') || tLower.includes('rally') || tLower.includes('gain') || tLower.includes('high') ? 'Bullish' : tLower.includes('fall') || tLower.includes('drop') || tLower.includes('slide') ? 'Bearish' : 'Neutral';
            const category = tLower.includes('gold') || tLower.includes('xau') || tLower.includes('oil') ? 'Commodities' : tLower.includes('nasdaq') || tLower.includes('spx') || tLower.includes('stock') || tLower.includes('yield') ? 'Indices' : 'Forex';

            items.push({
              id: `fl-${idx}-${Date.now()}`,
              headline: cleanTitle,
              source: 'ForexLive Wire',
              time: pubDate ? new Date(pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live',
              impact,
              sentiment,
              category,
              summary: cleanSummary,
              link: link || 'https://www.forexlive.com'
            });
          }
        });
      }
    }
  } catch (err) {
    // If external feed is blocked or times out, use curated fallback news
  }

  if (items.length > 0) {
    cachedNews = items;
    lastNewsFetch = now;
    return items;
  }

  return fallbackNews;
}

// In-memory & disk custom logo storage
let customLogoData: string | null = null;

// Endpoint to retrieve custom uploaded logo
app.get('/api/logo', (_req, res) => {
  res.json({ logo: customLogoData });
});

// Endpoint to upload and persist custom logo
app.post('/api/logo', (req, res) => {
  try {
    const { logo } = req.body;
    if (!logo || typeof logo !== 'string') {
      return res.status(400).json({ error: 'Valid logo dataUrl or string is required' });
    }
    customLogoData = logo;
    res.json({ success: true, message: 'Custom logo updated successfully', logo: customLogoData });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update logo' });
  }
});

// 1. Webhook Endpoint: Receive TradingView Alert JSON payload
app.post('/api/webhook/mbk', (req, res) => {
  try {
    const payload = req.body;
    console.log('Incoming TradingView Webhook alert received:', payload);

    if (!payload || !payload.ticker) {
      return res.status(400).json({
        error: 'Invalid webhook payload. Missing ticker or direction.',
        example: {
          ticker: 'US100',
          direction: 'BUY',
          entry: 20450.00,
          sl: 20380.00,
          tp1: 20560.00,
          tp2: 20680.00,
          score: 95,
          rvol: 2.8,
          strategy: 'MBK Master Institutional Engine',
          timeframe: '15m'
        }
      });
    }

    const newSignal = {
      id: `sig-webhook-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ticker: (payload.ticker || 'US100').toUpperCase(),
      direction: (payload.direction || 'BUY').toUpperCase() === 'SELL' ? 'SELL' : 'BUY',
      entry: Number(payload.entry) || (payload.ticker === 'XAUUSD' ? 2725.50 : 20450.00),
      sl: Number(payload.sl) || (payload.ticker === 'XAUUSD' ? 2715.00 : 20370.00),
      tp1: Number(payload.tp1) || (payload.ticker === 'XAUUSD' ? 2740.00 : 20570.00),
      tp2: Number(payload.tp2) || (payload.ticker === 'XAUUSD' ? 2755.00 : 20690.00),
      currentPrice: Number(payload.entry) || (payload.ticker === 'XAUUSD' ? 2725.50 : 20450.00),
      score: Number(payload.score) || Math.floor(Math.random() * 8 + 91),
      rvol: Number(payload.rvol) || Number((Math.random() * 2 + 1.8).toFixed(1)),
      timeframe: payload.timeframe || '15m',
      status: 'RUNNING',
      isVip: Boolean(payload.isVip),
      strategy: payload.strategy || 'MBK Master Institutional Engine',
      author: payload.author || 'TradingView Webhook Engine',
      timestamp: 'Just now',
      createdAt: new Date().toISOString(),
      notes: payload.notes || 'Alert triggered automatically via PineScript Webhook condition.'
    };

    signals.unshift(newSignal);

    // Keep memory cache trimmed to 50 items
    if (signals.length > 50) {
      signals = signals.slice(0, 50);
    }

    return res.status(200).json({
      success: true,
      message: 'TradingView alert successfully ingested and broadcast to MBK Signal Blotter.',
      signal: newSignal
    });
  } catch (err: any) {
    console.error('Webhook ingestion error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error in webhook handler' });
  }
});

// 2. Signals GET / POST
app.get('/api/signals', (_req, res) => {
  res.json({ signals, count: signals.length });
});

app.post('/api/signals', (req, res) => {
  const data = req.body;
  const newSignal = {
    id: `sig-manual-${Date.now()}`,
    ticker: (data.ticker || 'US100').toUpperCase(),
    direction: data.direction || 'BUY',
    entry: Number(data.entry) || 20450,
    sl: Number(data.sl) || 20380,
    tp1: Number(data.tp1) || 20550,
    tp2: Number(data.tp2) || 20680,
    currentPrice: Number(data.entry) || 20450,
    score: Number(data.score) || 94,
    rvol: Number(data.rvol) || 2.4,
    timeframe: data.timeframe || '15m',
    status: data.status || 'RUNNING',
    isVip: Boolean(data.isVip),
    strategy: data.strategy || 'MBK Institutional Manual Setup',
    author: data.author || 'Desk Portfolio Manager',
    timestamp: 'Just now',
    createdAt: new Date().toISOString(),
    notes: data.notes || 'Manual institutional setup published by terminal administrator.'
  };
  signals.unshift(newSignal);
  res.json({ success: true, signal: newSignal });
});

// 3. News Feed GET (Live ForexLive / FXStreet Wire)
app.get('/api/news', async (_req, res) => {
  try {
    const news = await getMarketNews();
    res.json({ news });
  } catch (err) {
    res.json({ news: fallbackNews });
  }
});

// 4. Community Trader Chat GET / POST
app.get('/api/chat/messages', (_req, res) => {
  res.json({ messages: chatMessages });
});

app.post('/api/chat/messages', (req, res) => {
  const { user, role, text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text cannot be empty' });
  }
  const newMsg = {
    id: `msg-${Date.now()}`,
    user: user || 'TerminalTrader',
    role: role || 'VIP',
    avatar: (user || 'TT').substring(0, 2).toUpperCase(),
    text: text.trim(),
    timestamp: 'Just now',
    upvotes: 0
  };
  chatMessages.push(newMsg);
  if (chatMessages.length > 100) {
    chatMessages.shift();
  }
  res.json({ success: true, message: newMsg });
});

// 5. Ask @MBK-AI Assistant Route using @google/genai
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType, ticker, timeframe, currentPrice } = req.body;

    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Prompt or image is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured in environment secrets.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `You are @MBK-AI, an elite institutional quantitative trading intelligence engine and SMC (Smart Money Concepts) specialist for the "MBK Trading Terminal".
You specialize in US100 (NASDAQ 100), XAUUSD (Gold), EURUSD, and major asset market mechanics.
Your core analysis methodology covers:
- Institutional Market Structure (BOS - Break of Structure, CHoCH - Change of Character).
- Order Blocks (OB) and Mitigations.
- Fair Value Gaps (FVG) and Liquidity Imbalances.
- Point of Control (POC) and Volume Profile nodes (VAH, VAL).
- Relative Volume (RVOL) surges and session liquidity sweeps (London/NY overlap).
- Strict Risk Management: Min 1:2 R:R, precise Stop Loss, Partial TP1, TP2, and trailing stop rules.

When answering, adopt a professional, sharp, institutional trading tone. Be structured, data-driven, and actionable. Provide specific numerical price points, probability scores (e.g. MBK Confidence Score 85-98%), and clear execution checklists. Always conclude with a one-sentence institutional risk statement.`;

    const parts: any[] = [];

    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: mimeType || 'image/png'
        }
      });
    }

    let userContent = prompt || 'Please analyze this market chart and identify key Order Blocks, FVGs, and institutional entry levels.';
    if (ticker) {
      userContent = `[Active Terminal Asset: ${ticker} | Timeframe: ${timeframe || '15m'} | Current Level: ${currentPrice || 'Live'}]\n\n${userContent}`;
    }

    parts.push({ text: userContent });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.65,
      }
    });

    const reply = response.text || 'Market analysis completed with standard institutional parameters.';

    return res.json({
      reply,
      model: 'gemini-3.8-flash',
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Gemini API Error in /api/gemini/chat:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate AI market analysis'
    });
  }
});

// Vite middleware in development, static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const publicPath = path.resolve(process.cwd(), 'public');
  app.use(express.static(publicPath));

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MBK Trading Terminal] Full-stack engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
