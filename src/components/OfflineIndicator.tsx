import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-500/90 text-slate-950 font-mono text-xs px-3 py-1.5 font-bold shadow-lg backdrop-blur-xs animate-bounce">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Offline Mode — Operating on cached terminal data</span>
    </div>
  );
};
