import React, { useId } from 'react';
import { useLogo } from '../utils/logoManager';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';

interface MBKLogoProps {
  size?: LogoSize;
  className?: string;
  showText?: boolean;
  subtitle?: string;
  glow?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

const sizeMap: Record<LogoSize, { box: string; textTitle: string; textSub: string; imgPadding: string }> = {
  xs: { box: 'w-6 h-6 rounded', textTitle: 'text-xs', textSub: 'text-[8px]', imgPadding: 'p-0.5' },
  sm: { box: 'w-8 h-8 rounded-lg', textTitle: 'text-sm', textSub: 'text-[9px]', imgPadding: 'p-1' },
  md: { box: 'w-10 h-10 rounded-xl', textTitle: 'text-base', textSub: 'text-[10px]', imgPadding: 'p-1' },
  lg: { box: 'w-14 h-14 rounded-xl', textTitle: 'text-lg', textSub: 'text-xs', imgPadding: 'p-1.5' },
  xl: { box: 'w-18 h-18 sm:w-20 sm:h-20 rounded-2xl', textTitle: 'text-xl', textSub: 'text-xs', imgPadding: 'p-2' },
  '2xl': { box: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl', textTitle: 'text-2xl', textSub: 'text-sm', imgPadding: 'p-2.5' },
  hero: { box: 'w-28 h-28 sm:w-36 sm:h-36 rounded-3xl', textTitle: 'text-3xl', textSub: 'text-sm', imgPadding: 'p-3' },
};

export const MBKLogo: React.FC<MBKLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  subtitle,
  glow = true,
  animated = false,
  onClick,
}) => {
  const { customLogo } = useLogo();
  const current = sizeMap[size] || sizeMap.md;
  const uniqueId = useId().replace(/:/g, '');
  const gradId = `mbk-grad-${uniqueId}`;
  const glowId = `mbk-glow-${uniqueId}`;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Visual Logo Emblem Container */}
      <div
        className={`relative shrink-0 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-md ${
          current.box
        } ${
          glow ? 'shadow-[0_0_24px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/30' : ''
        } ${
          animated ? 'hover:scale-105 hover:border-emerald-400 transition-all duration-200' : ''
        }`}
      >
        {customLogo ? (
          /* User's Uploaded Custom Logo Image */
          <img
            src={customLogo}
            alt="MBK Brand Logo"
            className={`w-full h-full object-contain ${current.imgPadding} rounded-[inherit]`}
          />
        ) : (
          /* Institutional MBK Master Vector Inscribed Insignia */
          <svg
            viewBox="0 0 512 512"
            width="100%"
            height="100%"
            className="p-1 sm:p-1.5 overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="45%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inscribed Dual Precision Framing */}
            <rect
              x="20"
              y="20"
              width="472"
              height="472"
              rx="92"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="9"
              strokeOpacity="0.5"
            />
            <rect
              x="28"
              y="28"
              width="456"
              height="456"
              rx="84"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeOpacity="0.75"
            />

            {/* Top-Right Live Institutional Status Dot */}
            <circle
              cx="434"
              cy="98"
              r="26"
              fill="#10b981"
              fillOpacity="0.3"
              className={animated ? 'animate-ping' : ''}
            />
            <circle cx="434" cy="98" r="16" fill="#10b981" />
            <circle cx="434" cy="98" r="7" fill="#ffffff" />

            {/* 'M' Segment (Bold Institutional Apex) */}
            <path
              d="M92 384 L92 164 L170 286 L248 164 L248 384"
              stroke={`url(#${gradId})`}
              strokeWidth="38"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* 'B' Institutional Segment */}
            <path
              d="M280 164 L352 164 C388 164 412 184 412 216 C412 242 392 260 364 266 C398 274 418 296 418 330 C418 366 390 384 350 384 L280 384 Z"
              stroke="#34d399"
              strokeWidth="34"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* 'K' Forward High-Liquidity Vector Spur */}
            <path
              d="M346 266 L416 164"
              stroke="#10b981"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M346 266 L424 384"
              stroke="#34d399"
              strokeWidth="32"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Ambient Top Specular Sheen */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-[inherit]" />
      </div>

      {/* Accompanying Typography Label */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-white font-sans ${current.textTitle}`}>
              MBK
            </span>
            <span className="font-mono text-emerald-400 font-semibold tracking-wider text-xs">
              TERMINAL
            </span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              PRO
            </span>
          </div>
          <span className={`font-mono text-slate-400 font-medium tracking-wide ${current.textSub}`}>
            {subtitle || 'INSTITUTIONAL QUANT DESK'}
          </span>
        </div>
      )}
    </div>
  );
};
