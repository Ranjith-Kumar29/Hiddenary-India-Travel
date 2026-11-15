import React from 'react';
import { HiddenaryLogo } from './HiddenaryLogo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-[#F4F9FE] to-[#E6F3FC] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-300">
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-[#42B9F5]/20 blur-xl animate-pulse" />
          <div className="relative">
            <HiddenaryLogo variant="light" size="lg" showTagline tagline="Discover Beyond" />
          </div>
        </div>

        <div className="w-44 h-1.5 bg-[#E1F0FB] rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-[#0879C9] to-[#42B9F5] rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
        </div>

        <p className="text-xs font-medium text-[#102B4E]/70 tracking-wide">
          Preparing your travel experience...
        </p>
      </div>
    </div>
  );
};
