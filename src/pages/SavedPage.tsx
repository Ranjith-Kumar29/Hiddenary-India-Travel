import React, { useState } from 'react';
import { Heart, Compass, Hotel, Landmark, BookOpen, Wifi, WifiOff, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { HOTELS_DATA } from '../data/hotelsData';
import { ATTRACTIONS_DATA } from '../data/attractionsData';
import { BLOGS_DATA } from '../data/blogsData';
import { DestinationCard } from '../components/cards/DestinationCard';
import { HotelCard } from '../components/cards/HotelCard';
import { AttractionCard } from '../components/cards/AttractionCard';
import { BlogCard } from '../components/cards/BlogCard';

export const SavedPage: React.FC = () => {
  const {
    savedDestinationIds,
    savedHotelIds,
    savedAttractionIds,
    savedBlogIds,
    isOfflineSimulated,
    toggleOfflineSimulation,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'destinations' | 'hotels' | 'attractions' | 'blogs'>('all');

  const savedDestinations = DESTINATIONS_DATA.filter(d => savedDestinationIds.includes(d.id));
  const savedHotels = HOTELS_DATA.filter(h => savedHotelIds.includes(h.id));
  const savedAttractions = ATTRACTIONS_DATA.filter(a => savedAttractionIds.includes(a.id));
  const savedBlogs = BLOGS_DATA.filter(b => savedBlogIds.includes(b.id));

  const totalSavedCount =
    savedDestinations.length + savedHotels.length + savedAttractions.length + savedBlogs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Offline Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Saved & Offline Favorites
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your bookmarked stays, destinations, and travel articles anytime — synced privately to your account.
          </p>
        </div>

        {/* Account Sync Indicator Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-800">Private per-account cloud sync</span>
          </div>

          <button
            onClick={toggleOfflineSimulation}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              isOfflineSimulated
                ? 'bg-[#EAF5FD] text-[#102B4E] border-[#42B9F5]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
          >
            {isOfflineSimulated ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOfflineSimulated ? 'Offline Mode ON' : 'Test Offline'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2 overflow-x-auto">
        {[
          { id: 'all', label: `All Saved (${totalSavedCount})` },
          { id: 'destinations', label: `Destinations (${savedDestinations.length})` },
          { id: 'hotels', label: `Hotels (${savedHotels.length})` },
          { id: 'attractions', label: `Attractions (${savedAttractions.length})` },
          { id: 'blogs', label: `Blogs (${savedBlogs.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {totalSavedCount === 0 ? (
        <div className="py-24 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
          <Heart className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your saved trips will appear here</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Click the heart icon on any destination, hotel, or guide to store it for offline browsing.
            </p>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Explore Destinations
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Saved Destinations */}
          {(activeTab === 'all' || activeTab === 'destinations') && savedDestinations.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0879C9]" />
                <span>Saved Destinations ({savedDestinations.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedDestinations.map(d => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Hotels */}
          {(activeTab === 'all' || activeTab === 'hotels') && savedHotels.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Hotel className="w-4 h-4 text-indigo-600" />
                <span>Saved Hotels & Stays ({savedHotels.length})</span>
              </h3>
              <div className="space-y-4">
                {savedHotels.map(h => (
                  <HotelCard key={h.id} hotel={h} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Attractions */}
          {(activeTab === 'all' || activeTab === 'attractions') && savedAttractions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Landmark className="w-4 h-4 text-rose-600" />
                <span>Saved Attractions ({savedAttractions.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedAttractions.map(a => (
                  <AttractionCard key={a.id} attraction={a} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Blogs */}
          {(activeTab === 'all' || activeTab === 'blogs') && savedBlogs.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Saved Travel Guides ({savedBlogs.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBlogs.map(b => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
