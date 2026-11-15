import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Compass,
  Heart,
  Star,
  MapPin,
  Calendar,
  Utensils,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { HOTELS_DATA } from '../data/hotelsData';
import { BLOGS_DATA } from '../data/blogsData';
import { FOOD_DATA } from '../data/foodData';
import { HIDDEN_GEMS_DATA } from '../data/hiddenGemsData';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/cards/DestinationCard';
import { HotelCard } from '../components/cards/HotelCard';
import { BlogCard } from '../components/cards/BlogCard';
import { FoodCard } from '../components/cards/FoodCard';
import { HiddenGemCard } from '../components/cards/HiddenGemCard';
import { HiddenaryIcon } from '../components/common/HiddenaryLogo';

export const HomePage: React.FC = () => {
  const { navigate, openSearchModal, savedDestinationIds, t } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'beaches' | 'hills' | 'heritage' | 'backwaters'>('all');

  const trendingDestinations = DESTINATIONS_DATA.filter(d => d.isTrending);

  // Filter popular destinations based on category
  const filteredDestinations = DESTINATIONS_DATA.filter(d => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'beaches') return ['goa', 'andaman', 'pondicherry'].includes(d.id);
    if (activeCategoryFilter === 'hills') return ['ooty', 'manali', 'kashmir', 'coorg', 'darjeeling', 'rishikesh'].includes(d.id);
    if (activeCategoryFilter === 'heritage') return ['jaipur', 'chennai', 'varanasi', 'udaipur', 'agra', 'delhi', 'mysore', 'hyderabad'].includes(d.id);
    if (activeCategoryFilter === 'backwaters') return ['kerala'].includes(d.id);
    return true;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Full-width High-Definition Travel Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
            alt="Majestic India Palace Heritage"
            className="w-full h-full object-cover object-center brightness-[0.62] scale-105 animate-in fade-in zoom-in-105 duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/60" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102B4E]/60 backdrop-blur-md border border-[#42B9F5]/40 text-xs font-semibold text-sky-100">
            <HiddenaryIcon size={20} variant="dark" />
            <span>Hiddenary · Curated Travel & Tourism Portal for India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif-luxury drop-shadow-md">
            {t.heroHeadline}
          </h1>

          <p className="text-sm sm:text-lg text-sky-50/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
            {t.heroSubtitle}
          </p>

          {/* Large Interactive Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <div
              onClick={openSearchModal}
              className="bg-white/95 backdrop-blur-md p-2 rounded-2xl sm:rounded-full shadow-2xl border border-white/40 flex flex-col sm:flex-row items-center gap-2 cursor-pointer group hover:bg-white transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3 px-4 py-2 w-full text-[#102B4E]">
                <Search className="w-5 h-5 text-[#0879C9] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm sm:text-base font-medium truncate text-slate-500">
                  Search destinations, hotels, attractions, foods...
                </span>
              </div>
              <button
                type="button"
                className="w-full sm:w-auto px-7 py-3 bg-[#0879C9] hover:bg-[#0662A6] text-white font-bold text-sm rounded-full shrink-0 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick destination suggestion pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/90 mt-3 drop-shadow">
              <span className="font-semibold text-[#42B9F5]">Try searching:</span>
              {['Goa', 'Kerala', 'Jaipur', 'Varanasi', 'Ooty', 'Kashmir', 'Manali'].map(city => (
                <button
                  key={city}
                  onClick={() => navigate('destination', { destinationId: city.toLowerCase() })}
                  className="px-2.5 py-1 rounded-full bg-[#102B4E]/60 hover:bg-[#0879C9] border border-white/25 transition-all font-medium text-sky-100 hover:text-white"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => navigate('explore')}
              className="px-6 py-3 rounded-xl bg-white text-[#102B4E] font-bold text-sm shadow-md hover:bg-[#EAF5FD] transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#0879C9]" />
              <span>{t.exploreDestinations}</span>
            </button>
            <button
              onClick={() => navigate('trip-planner')}
              className="px-6 py-3 rounded-xl bg-[#102B4E]/85 hover:bg-[#102B4E] text-white border border-[#42B9F5]/40 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#42B9F5]" />
              <span>{t.planMyTrip}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trending in India (Horizontal Scrolling Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#0879C9] font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Real-Time Popularity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] tracking-tight mt-1">
              {t.trendingInIndia}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top destinations favored by domestic and international travelers this season
            </p>
          </div>

          <button
            onClick={() => navigate('explore')}
            className="text-xs sm:text-sm font-bold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1 transition-colors"
          >
            <span>See All Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none">
          {trendingDestinations.map(dest => (
            <div key={dest.id} className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-start shrink-0">
              <DestinationCard destination={dest} showTrendingBadge={true} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.popularDestinations}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore 20+ magnificent Indian states, coastal hubs, hill stations and heritage capitals
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: 'All Places' },
              { id: 'beaches', label: 'Beaches & Coastal' },
              { id: 'hills', label: 'Hill Retreats' },
              { id: 'heritage', label: 'Royal & Heritage' },
              { id: 'backwaters', label: 'Backwaters' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id as typeof activeCategoryFilter)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  activeCategoryFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.slice(0, 12).map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {filteredDestinations.length > 12 && (
          <div className="text-center pt-8">
            <button
              onClick={() => navigate('explore')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              Browse All 20+ Indian Destinations
            </button>
          </div>
        )}
      </section>

      {/* 4. Smart Trip Planner Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102B4E] via-[#0B467D] to-[#0879C9] text-white p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#42B9F5]/20 text-sky-100 text-xs font-bold border border-[#42B9F5]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#42B9F5]" />
              <span>Intelligent Day-by-Day Scheduling</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Plan Your Dream Trip in Under 60 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
              Input your destination, duration, budget, and travel style. Our smart planner creates morning-to-night schedules with estimated costs, entry fees, and peak-hour guidance.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('trip-planner')}
                className="px-6 py-3 bg-white hover:bg-[#EAF5FD] text-[#102B4E] font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <span>Launch Smart Trip Planner</span>
                <ArrowRight className="w-4 h-4 text-[#0879C9]" />
              </button>
            </div>
          </div>

          {/* Decorative Background Accent */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden lg:block bg-[radial-gradient(#42B9F5_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
        </div>
      </section>

      {/* 5. Handpicked Luxury & Heritage Stays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] tracking-tight">
              Featured Stays & Heritage Resorts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified palace hotels, Ayurvedic backwater villas, and beachfront sanctuaries
            </p>
          </div>

          <button
            onClick={() => navigate('hotels')}
            className="text-xs sm:text-sm font-bold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1 transition-colors"
          >
            <span>View All Hotels</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {HOTELS_DATA.slice(0, 3).map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 6. Authentic Culinary & Street Food Guide Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#0879C9] font-bold text-xs uppercase tracking-wider">
              <Utensils className="w-4 h-4" />
              <span>Flavours of Bharat</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] tracking-tight mt-1">
              Iconic Regional Foods & Where to Eat
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              From Chennai Filter Kaapi to Goan Fish Curry and Hyderabadi Dum Biryani
            </p>
          </div>

          <button
            onClick={() => navigate('food')}
            className="text-xs sm:text-sm font-bold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1 transition-colors"
          >
            <span>Explore All Delicacies</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOOD_DATA.slice(0, 3).map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* 7. Hidden Gems Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] tracking-tight">
              Secret Hidden Gems
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Untouched mangrove sanctuaries, quiet stepwells, and unspoiled fishing beaches
            </p>
          </div>

          <button
            onClick={() => navigate('hidden-gems')}
            className="text-xs sm:text-sm font-bold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1 transition-colors"
          >
            <span>Discover Hidden Gems</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIDDEN_GEMS_DATA.slice(0, 3).map(gem => (
            <HiddenGemCard key={gem.id} gem={gem} />
          ))}
        </div>
      </section>

      {/* 8. Curated Travel Blogs Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#0879C9] font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Traveler Stories & Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] tracking-tight mt-1">
              Expert Travel Advice
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Comprehensive budget hacks, photography secrets and cultural perspectives
            </p>
          </div>

          <button
            onClick={() => navigate('blogs')}
            className="text-xs sm:text-sm font-bold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1 transition-colors"
          >
            <span>Read All Blogs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS_DATA.slice(0, 3).map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
};
