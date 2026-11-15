import React, { useState } from 'react';
import { Sparkles, MapPin, Compass } from 'lucide-react';
import { HIDDEN_GEMS_DATA } from '../data/hiddenGemsData';
import { HiddenGemCard } from '../components/cards/HiddenGemCard';

export const HiddenGemsPage: React.FC = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Moderate' | 'Challenging'>('all');

  const filteredGems = HIDDEN_GEMS_DATA.filter(g => {
    if (difficultyFilter === 'all') return true;
    return g.travelDifficulty === difficultyFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200/80 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Secret India Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hidden Gems & Undiscovered Spots
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Escape the tour bus crowds and selfie sticks. Explore tranquil riverine bird sanctuaries, secluded virgin coastal coves, ancient geometric stepwells, and high-altitude Himalayan hamlets.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        <span className="text-slate-500 font-bold uppercase tracking-wider mr-1">Trek / Access:</span>
        {(['all', 'Easy', 'Moderate', 'Challenging'] as const).map(diff => (
          <button
            key={diff}
            onClick={() => setDifficultyFilter(diff)}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              difficultyFilter === diff
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {diff === 'all' ? 'All Difficulties' : diff}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGems.map(gem => (
          <HiddenGemCard key={gem.id} gem={gem} />
        ))}
      </div>
    </div>
  );
};
