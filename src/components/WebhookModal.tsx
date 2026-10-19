import React, { useState } from 'react';
import { X, Copy, Check, Server, Zap, ExternalLink } from 'lucide-react';

interface WebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAdmin: () => void;
}

export const WebhookModal: React.FC<WebhookModalProps> = ({
  isOpen,
  onClose,
  onGoToAdmin
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!isOpen) return null;

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/webhook/mbk` 
    : 'https://ais-dev-su76d2j4wcb2m2t6wflcfw-6705890240.us-east5.run.app/api/webhook/mbk';

  const jsonSample = `{
  "ticker": "US100",
  "direction": "BUY",
  "entry": 20490.50,
  "sl": 20410.00,
  "tp1": 20580.00,
  "tp2": 20720.00,
  "score": 96,
  "rvol": 2.8,
  "strategy": "MBK Institutional FVG Sweep",
  "timeframe": "15m",
  "isVip": false
}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(jsonSample);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>TradingView Webhook Integration</span>
        </div>

        <h2 className="text-lg font-bold text-white font-sans mb-2">
          Connect Your PineScript Alert
        </h2>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          The MBK Trading Terminal ingests automated alerts via HTTP POST. Use the credentials below in your TradingView alert dialog:
        </p>

        {/* Webhook URL */}
        <div className="mb-4">
          <div className="text-xs font-mono text-slate-300 mb-1 flex items-center justify-between">
            <span>Webhook URL:</span>
            <button
              onClick={handleCopyUrl}
              className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded p-2.5 font-mono text-xs text-emerald-300 break-all select-all">
            {webhookUrl}
          </div>
        </div>

        {/* JSON Alert Payload Sample */}
        <div className="mb-4">
          <div className="text-xs font-mono text-slate-300 mb-1 flex items-center justify-between">
            <span>JSON Message Body:</span>
            <button
              onClick={handleCopyPayload}
              className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedPayload ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto">
            {jsonSample}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onGoToAdmin();
            }}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Interactive Webhook Lab</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-medium rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
