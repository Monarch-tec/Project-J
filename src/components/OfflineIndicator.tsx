import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      id="offline-indicator-banner"
      className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 rounded-2xl bg-amber-500 px-4 py-2.5 text-xs font-black text-amber-950 shadow-2xl animate-bounce"
    >
      <WifiOff className="w-4 h-4" />
      <span>Offline Mode — All 400 curriculum questions are locally cached & available.</span>
    </div>
  );
};
