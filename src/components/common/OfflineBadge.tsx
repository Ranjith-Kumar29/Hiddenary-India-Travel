import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBadge: React.FC = () => {
  const { isOfflineSimulated, toggleOfflineSimulation } = useApp();

  return (
    <button
      onClick={toggleOfflineSimulation}
      title="Click to toggle simulated offline cache mode"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
        isOfflineSimulated
          ? 'bg-sky-100 text-[#102B4E] border border-[#42B9F5]'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
      }`}
    >
      {isOfflineSimulated ? (
        <>
          <WifiOff className="w-3.5 h-3.5 text-[#0879C9]" />
          <span>Offline Cache Active</span>
        </>
      ) : (
        <>
          <Wifi className="w-3.5 h-3.5 text-emerald-600" />
          <span>Online · Cached</span>
        </>
      )}
    </button>
  );
};
