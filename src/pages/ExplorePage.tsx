import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, ArrowUpDown } from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { DestinationCard } from '../components/cards/DestinationCard';
import { useApp } from '../context/AppContext';

export const ExplorePage: React.FC = () => {
  const { t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCrowd, setSelectedCrowd] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'budget-low' | 'budget-high' | 'rating'>('popularity');

  // Extract all unique states
  const states = useMemo(() => {
    const list = Array.from(new Set(DESTINATIONS_DATA.map(d => d.state))).sort();
    return ['all', ...list];
  }, []);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter(dest => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState = selectedState === 'all' || dest.state === selectedState;
      const matchesCrowd = selectedCrowd === 'all' || dest.crowdLevel === selectedCrowd;

      return matchesSearch && matchesState && matchesCrowd;
    }).sort((a, b) => {
      if (sortBy === 'budget-low') return a.startingBudget - b.startingBudget;
      if (sortBy === 'budget-high') return b.startingBudget - a.startingBudget;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [searchQuery, selectedState, selectedCrowd, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Destinations Across India
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          From the sun-kissed shores of Goa and backwaters of Kerala to the snow-covered peaks of Kashmir and spiritual ghats of Varanasi.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter by city, state or keywords..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:border-[#0879C9]"
          />
        </div>

        {/* State Filter */}
        <div className="w-full md:w-auto">
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="w-full md:w-auto text-xs sm:text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] bg-white"
          >
            <option value="all">All States & Territories</option>
            {states.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Crowd Filter */}
        <div className="w-full md:w-auto">
          <select
            value={selectedCrowd}
            onChange={e => setSelectedCrowd(e.target.value)}
            className="w-full md:w-auto text-xs sm:text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] bg-white"
          >
            <option value="all">All Crowd Levels</option>
            <option value="Low">Low Crowd (Peaceful)</option>
            <option value="Medium">Medium Crowd</option>
            <option value="High">High Crowd (Vibrant)</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="w-full md:w-auto text-xs sm:text-sm font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] bg-white"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Highest Rated</option>
            <option value="budget-low">Starting Budget: Low to High</option>
            <option value="budget-high">Starting Budget: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredDestinations.length} destinations</span>
        {(searchQuery || selectedState !== 'all' || selectedCrowd !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedState('all');
              setSelectedCrowd('all');
            }}
            className="text-[#0879C9] hover:text-[#102B4E] font-semibold underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 text-lg">No matching destinations found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting your state filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}
    </div>
  );
};
