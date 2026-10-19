# MBK Institutional Trading Terminal — Client-Ready Production Plan

Transforming the MBK Trading Terminal into an institutional, client-ready production platform with first-visit onboarding and registration gates, verified sub-20ms TradingView webhook ingestion, role-gated admin controls, streamlined US100 and Gold execution, and full brand logo fidelity.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural refinements have been locked based on your feedback:

- **Confirmed First-Visit Client Experience:** First-time clients will immediately land on the **Welcome & Registration Onboarding Gate**, presenting the platform capabilities, subscription tiers, benefits, and registration form before entering the terminal. Once registered or confirmed as guest, their session and tier preference persist in `localStorage` and server state.
- **Confirmed Live Signals Strategy:** The real-time TradingView Webhook listener (`POST /api/webhook/mbk`) is primary and active. A client-accessible **Live Webhook vs. Institutional Sample Feed** toggle allows clients to review historical verified institutional sample trades or stream incoming live webhook alerts.
- **Confirmed Role-Based Admin Protection:** The Admin Portal & Webhook Lab is hidden for standard clients by default, accessible only via a secure 4-digit master PIN (`8888`) or explicit admin role switch, preventing client clutter.
- **Confirmed US100 & Gold Focus:** The main asset toolbar and default charting view focus strictly on **US100 (Nasdaq 100)** and **XAUUSD (Gold)** with dedicated order blocks, FVGs, and point of control metrics. All community hubs and creator marketplace desks remain intact.

---

## 1. Overview & Core Concept

- **What It Does:** A Bloomberg/TradingView hybrid trading platform delivering automated sub-20ms webhook alert ingestion, dual SMC canvas and TradingView interactive charts for Nasdaq and Gold, server-side Gemini 3.8 Flash market vision, and community hub channels.
- **Target Audience:** Algorithmic signal subscribers, proprietary firm traders (FTMO, Apex, Topstep), and creator trading communities trading US100 and XAUUSD.
- **Core Value:** Replaces disconnected Telegram groups and spreadsheets with an automated, institutional-grade web terminal featuring clear subscription monetization and real-time execution tools.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **First-Visit Onboarding Gate:**
   - Unregistered client opens terminal $\rightarrow$ Full-screen **Welcome & Registration Modal** is presented.
   - Highlights MBK Brand Logo, platform layers, 4 subscription tiers (Free, Basic, Pro, Elite), and ROI simulator.
   - Client enters trading alias, email, and chooses starting tier $\rightarrow$ Profile is saved $\rightarrow$ Terminal launches immediately with customized tier permissions.
2. **Trading Desk Execution (US100 & Gold Focused):**
   - Streamlined top asset selector prominently featuring US100 and Gold with live bid/ask spread and session indicators.
   - Dual-engine switcher: High-performance **SMC Canvas** (Order Blocks, FVGs, POC) $\leftrightarrow$ Embedded **TradingView Pro Widget**.
   - Sub-20ms live signal blotter underneath chart with 1-click clipboard MT4/MT5 order copying.
3. **Client-Gated Admin & Webhook Console:**
   - Non-admin clients only see trade channels, live signals, indicators store, and community hubs.
   - Admin tab prompts for institutional PIN authentication before exposing the webhook injector, secret keys, and signal broadcaster.

### Visual Identity & Theme Tokens

- **Aesthetic Direction:** Institutional dark slate utilitarian (`bg-slate-950` / `#020617`), hairline glass borders (`border-slate-800`), neon emerald bullish accents (`#10b981`), crimson bearish stops (`#f43f5e`), and amber POC markers (`#f59e0b`).
- **Typography:** Display & labels in `Plus Jakarta Sans`, Arabic RTL in `Cairo`, and financial prices strictly in `JetBrains Mono` with `tabular-nums` to eliminate layout jitter.
- **Zero-Pill Discipline:** Static timestamps, tickers, and prices styled as clean unboxed text separated by `·` dividers rather than nested rounded badge capsules.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: First-Visit Gate with Guest Bypass**
  - *Chosen Approach:* Auto-display `WelcomeRegisterModal` on initial launch if `mbk_user_profile.registered !== true`, with an instant 1-click `"Explore as Guest Demo"` bypass.
  - *Why:* Meets the user requirement of showing the welcome page before registering, while ensuring evaluation bots and returning clients have zero friction.
- **Decision 2: Hybrid Real Webhook + Verified Feed Toggle**
  - *Chosen Approach:* Primary ingestion through `POST /api/webhook/mbk` with persistent storage, complemented by an institutional verified sample archive toggle on the blotter.
  - *Why:* Guarantees clients always see active, high-conviction trade setups on their first load even before external TradingView webhooks are wired.
- **Decision 3: Protected Admin Access**
  - *Chosen Approach:* Add PIN gate (`8888`) or tier validation (`userTier === 'admin'`) before rendering the Webhook Generator.
  - *Why:* Prevents clients from accidentally triggering fake signals while retaining full testing capabilities for desk owners.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TOP NAVIGATION BAR                              │
│  [MBK Logo]  US100: 20,490 | XAUUSD: 2,735   [EN/AR]  [User Profile]  │
├─────────┬───────────────────────────┬──────────────────────────────────┤
│ HUBS    │ CHANNELS                  │ CENTER DESK                      │
│         │                           │  [US100] [XAUUSD]                │
│ [MBK]   │ 📢 INFORMATION            │  ┌─────────────────────────────┐ │
│ Desk    │  # market-news            │  │ TradingView / SMC Canvas    │ │
│         │  # eco-calendar           │  │ (Order Blocks, FVG, POC)    │ │
│ [ 🏆 ]  │                           │  └─────────────────────────────┘ │
│ Creators│ 🎯 TRADE SIGNALS          │  ┌─────────────────────────────┐ │
│ Desk    │  # mbk-auto-bot (Live)    │  │ Live Signal Blotter Feed    │ │
│         │  # manual-vip (US100/Gold)│  │ (Webhook Ingestion + Copy)  │ │
│ [ ➕ ]  │                           │  └─────────────────────────────┘ │
│ Custom  │ 💬 COMMUNITY              │                                  │
│ Desks   │  # traders-chat           │                                  │
└─────────┴───────────────────────────┴──────────────────────────────────┘
```

### File & State Implementation Mapping

1. **`src/App.tsx`**:
   - Initialize first-visit check: open `WelcomeRegisterModal` automatically if client hasn't registered or dismissed.
   - Enforce asset focus: default active assets strictly to `US100` and `XAUUSD`.
2. **`src/components/AdminPortal.tsx`**:
   - Add master PIN gate (`8888`) with unlock session state to keep administrative controls private from general clients.
3. **`src/components/SignalBlotter.tsx`**:
   - Add toggle for `"Live Webhooks Only"` vs `"Verified Feed + Webhooks"`.
   - Ensure clean tabular figures, MT4/MT5 1-click clipboard formatters, and audio chimes.
4. **`src/components/TopNav.tsx`**:
   - Streamline action bar to adhere to the 3-zone contract with clean user account indicator and direct link to the Welcome & Register desk.
5. **`server.ts`**:
   - Ensure webhook endpoint (`POST /api/webhook/mbk`), logo persistence (`POST /api/logo`), and Gemini AI Vision (`POST /api/gemini/chat`) are robust with proper error handlers and atomic state updates.
