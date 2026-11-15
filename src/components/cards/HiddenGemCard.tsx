import React from 'react';
import { Compass, Sparkles, AlertCircle, Clock, Wallet, MapPin } from 'lucide-react';
import { HiddenGem } from '../../types/travel';

interface Props {
  gem: HiddenGem;
}

export const HiddenGemCard: React.FC<Props> = ({ gem }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={gem.image}
          alt={gem.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* Not a Tourist Hotspot Badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-semibold text-emerald-950 bg-emerald-300 px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-900" />
            <span>Not a tourist hotspot</span>
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-base sm:text-lg text-white drop-shadow-sm group-hover:text-[#42B9F5] transition-colors">
            {gem.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-white/80 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-300" />
            <span>{gem.destinationName}</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {gem.description}
        </p>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Crowd Level:</span>
            <span className="font-semibold text-emerald-700">{gem.crowdLevel}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Difficulty:</span>
            <span className="font-semibold text-slate-800">{gem.travelDifficulty}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Est. Budget:</span>
            <span className="font-semibold text-slate-900">{gem.estimatedBudget}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Best Season:</span>
            <span className="font-medium text-slate-700">{gem.bestTime}</span>
          </div>
        </div>

        <div className="pt-2 text-xs text-[#102B4E] font-medium bg-[#EAF5FD]/80 p-2 rounded-lg border border-[#42B9F5]/40">
          <span className="font-bold block text-[10px] uppercase tracking-wider text-[#0879C9]">Highlight</span>
          <span>{gem.highlight}</span>
        </div>
      </div>
    </div>
  );
};
