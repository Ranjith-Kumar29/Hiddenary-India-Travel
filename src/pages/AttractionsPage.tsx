import React, { useState, useMemo } from 'react';
import { Search, Landmark, Clock, Ticket } from 'lucide-react';
import { ATTRACTIONS_DATA } from '../data/attractionsData';
import { AttractionCard } from '../components/cards/AttractionCard';

export const AttractionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const CATEGORIES = ['all', 'Heritage', 'Nature', 'Spiritual', 'Beach', 'Adventure'];

  const filteredAttractions = useMemo(() => {
    return ATTRACTIONS_DATA.filter(attraction => {
      const matchesSearch =
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'all' || attraction.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Iconic Attractions & Monuments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Explore UNESCO World Heritage forts, ancient Dravidian temples, backwater lagoons, and Mughal masterpieces with visitor timings, ticket pricing, and peak crowd hours.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Amber Fort, Basilica, Taj Mahal, backwaters..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:border-[#0879C9]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl capitalize font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#102B4E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map(attraction => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};
