import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, MapPin, Building, Landmark, Utensils, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS_DATA } from '../../data/destinationsData';
import { HOTELS_DATA } from '../../data/hotelsData';
import { ATTRACTIONS_DATA } from '../../data/attractionsData';
import { FOOD_DATA } from '../../data/foodData';
import { BLOGS_DATA } from '../../data/blogsData';
import { HIDDEN_GEMS_DATA } from '../../data/hiddenGemsData';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, closeSearchModal, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'destinations' | 'hotels' | 'attractions' | 'food' | 'blogs'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [searchModalOpen]);

  // Quick suggestions
  const SUGGESTIONS = ['Goa', 'Kerala', 'Jaipur', 'Varanasi', 'Ooty', 'Manali', 'Kashmir', 'Chennai', 'Mumbai', 'Andaman'];

  const results = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      return {
        destinations: DESTINATIONS_DATA.slice(0, 4),
        hotels: HOTELS_DATA.slice(0, 3),
        attractions: ATTRACTIONS_DATA.slice(0, 3),
        food: FOOD_DATA.slice(0, 3),
        blogs: BLOGS_DATA.slice(0, 2),
        gems: HIDDEN_GEMS_DATA.slice(0, 2)
      };
    }

    return {
      destinations: DESTINATIONS_DATA.filter(
        d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q)
      ),
      hotels: HOTELS_DATA.filter(
        h => h.name.toLowerCase().includes(q) || h.destinationName.toLowerCase().includes(q) || h.brand.toLowerCase().includes(q)
      ),
      attractions: ATTRACTIONS_DATA.filter(
        a => a.name.toLowerCase().includes(q) || a.destinationName.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
      ),
      food: FOOD_DATA.filter(
        f => f.name.toLowerCase().includes(q) || f.destinationName.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
      ),
      blogs: BLOGS_DATA.filter(
        b => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.destinationName.toLowerCase().includes(q)
      ),
      gems: HIDDEN_GEMS_DATA.filter(
        g => g.name.toLowerCase().includes(q) || g.destinationName.toLowerCase().includes(q)
      )
    };
  }, [searchTerm]);

  if (!searchModalOpen) return null;

  const handleSelectDestination = (id: string) => {
    closeSearchModal();
    navigate('destination', { destinationId: id });
  };

  const handleSelectHotel = (id: string) => {
    closeSearchModal();
    navigate('hotels', { hotelId: id });
  };

  const handleSelectAttraction = (id: string) => {
    closeSearchModal();
    navigate('attractions', { attractionId: id });
  };

  const handleSelectFood = () => {
    closeSearchModal();
    navigate('food');
  };

  const handleSelectBlog = (id: string) => {
    closeSearchModal();
    navigate('blogs', { blogId: id });
  };

  const hasAnyResults =
    results.destinations.length > 0 ||
    results.hotels.length > 0 ||
    results.attractions.length > 0 ||
    results.food.length > 0 ||
    results.blogs.length > 0;

  return (
    <div
      onClick={closeSearchModal}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-[#0879C9] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Chennai, Goa, Kerala, hotels, street food, temples..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-base"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Suggestion tags */}
        {!searchTerm && (
          <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs text-slate-600">
            <span className="font-medium text-slate-500 shrink-0">Popular:</span>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setSearchTerm(s)}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200/80 hover:border-[#42B9F5] hover:text-[#0879C9] transition-colors shrink-0 font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Category Tabs */}
        {searchTerm && (
          <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-100 bg-white text-xs overflow-x-auto">
            {(['all', 'destinations', 'hotels', 'attractions', 'food', 'blogs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors shrink-0 ${
                  activeTab === tab
                    ? 'bg-[#EAF5FD] text-[#102B4E] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!hasAnyResults ? (
            <div className="py-14 text-center">
              <Compass className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
              <p className="text-base font-semibold text-slate-800">We couldn't find matches for "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for Indian states, popular tourist cities like "Jaipur", or categories like "Backwaters", "Temples", or "Biriyani".
              </p>
            </div>
          ) : (
            <>
              {/* DESTINATIONS */}
              {(activeTab === 'all' || activeTab === 'destinations') && results.destinations.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0879C9]" />
                      Destinations ({results.destinations.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.destinations.map(d => (
                      <div
                        key={d.id}
                        onClick={() => handleSelectDestination(d.id)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F9FE] border border-transparent hover:border-slate-200/80 cursor-pointer transition-all group"
                      >
                        <img
                          src={d.heroImage}
                          alt={d.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#102B4E] text-sm group-hover:text-[#0879C9] transition-colors">
                              {d.name}
                            </span>
                            <span className="text-xs text-slate-400">· {d.state}</span>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{d.tagline}</p>
                          <span className="text-[11px] font-semibold text-emerald-700">
                            From ₹{d.startingBudget.toLocaleString()}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HOTELS */}
              {(activeTab === 'all' || activeTab === 'hotels') && results.hotels.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      Hotels & Resorts ({results.hotels.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.hotels.map(h => (
                      <div
                        key={h.id}
                        onClick={() => handleSelectHotel(h.id)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition-all group"
                      >
                        <img
                          src={h.heroImage}
                          alt={h.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#102B4E] text-sm group-hover:text-[#0879C9] truncate transition-colors">
                            {h.name}
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{h.destinationName} · {h.hotelType}</p>
                          <span className="text-xs font-semibold text-slate-900">
                            ₹{h.startingPrice.toLocaleString()}
                            <span className="text-[10px] text-slate-400 font-normal"> /night</span>
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ATTRACTIONS */}
              {(activeTab === 'all' || activeTab === 'attractions') && results.attractions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-rose-600" />
                      Attractions & Sightseeing ({results.attractions.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.attractions.map(a => (
                      <div
                        key={a.id}
                        onClick={() => handleSelectAttraction(a.id)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition-all group"
                      >
                        <img
                          src={a.heroImage}
                          alt={a.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#102B4E] text-sm group-hover:text-[#0879C9] truncate transition-colors">
                            {a.name}
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{a.destinationName} · {a.category}</p>
                          <span className="text-xs font-medium text-slate-600">
                            Entry: {a.entryFee}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FOOD GUIDE */}
              {(activeTab === 'all' || activeTab === 'food') && results.food.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#0879C9]" />
                      Local Food Guide ({results.food.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.food.map(f => (
                      <div
                        key={f.id}
                        onClick={handleSelectFood}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F9FE] border border-transparent hover:border-slate-200/80 cursor-pointer transition-all group"
                      >
                        <img
                          src={f.image}
                          alt={f.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#102B4E] text-sm group-hover:text-[#0879C9] truncate transition-colors">
                            {f.name}
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{f.destinationName} · {f.approxPrice}</p>
                          <span className="text-[11px] text-slate-600 line-clamp-1">
                            Where: {f.whereToTry}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BLOGS */}
              {(activeTab === 'all' || activeTab === 'blogs') && results.blogs.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      Travel Guides & Articles ({results.blogs.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {results.blogs.map(b => (
                      <div
                        key={b.id}
                        onClick={() => handleSelectBlog(b.id)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition-all group"
                      >
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          className="w-16 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-[#102B4E] text-sm group-hover:text-[#0879C9] line-clamp-1 transition-colors">
                            {b.title}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{b.category} · {b.readingTime}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mr-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
