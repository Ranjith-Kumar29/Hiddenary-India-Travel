import React, { useState, useMemo } from 'react';
import { Search, Utensils, Star, MapPin } from 'lucide-react';
import { FOOD_DATA } from '../data/foodData';
import { FoodCard } from '../components/cards/FoodCard';

export const FoodGuidePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  const destinations = useMemo(() => {
    const list = Array.from(new Set(FOOD_DATA.map(f => f.destinationName))).sort();
    return ['all', ...list];
  }, []);

  const filteredFoods = useMemo(() => {
    return FOOD_DATA.filter(food => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.whereToTry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDiet =
        dietFilter === 'all' ||
        (dietFilter === 'veg' && food.isVegetarian) ||
        (dietFilter === 'nonveg' && !food.isVegetarian);

      const matchesDest =
        selectedDestination === 'all' || food.destinationName === selectedDestination;

      return matchesSearch && matchesDiet && matchesDest;
    });
  }, [searchTerm, dietFilter, selectedDestination]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5FD] text-[#102B4E] border border-[#42B9F5]/50 text-xs font-bold mb-2">
          <Utensils className="w-3.5 h-3.5 text-[#0879C9]" />
          <span>Culinary Heritage of India</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Destination Food Guides & Legendary Dishes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          From Tamil Nadu’s morning Filter Kaapi and Ghee Podi Idli to Goan Kingfish Thali and Dum Biryani. Discover what to eat, average prices, and verified iconic eateries.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Filter Coffee, Fish Curry, Biriyani, Appam..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:border-[#0879C9]"
          />
        </div>

        {/* Destination Filter */}
        <div className="w-full md:w-auto">
          <select
            value={selectedDestination}
            onChange={e => setSelectedDestination(e.target.value)}
            className="w-full md:w-auto text-xs sm:text-sm font-semibold border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] bg-white"
          >
            <option value="all">All Food Hubs</option>
            {destinations.filter(d => d !== 'all').map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Diet Filter */}
        <div className="flex items-center gap-1.5 w-full md:w-auto text-xs font-semibold">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'veg', label: 'Pure Veg 🟢' },
            { id: 'nonveg', label: 'Non-Veg 🔴' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setDietFilter(d.id as typeof dietFilter)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                dietFilter === d.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};
