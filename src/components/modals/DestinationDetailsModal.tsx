import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  Calendar,
  Clock,
  Sun,
  MapPin,
  Sparkles,
  Phone,
  Plane,
  Train,
  Bus,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Images,
  Utensils,
  Landmark,
  Hotel as HotelIcon
} from 'lucide-react';
import { Destination } from '../../types/travel';
import { useApp } from '../../context/AppContext';
import { HOTELS_DATA } from '../../data/hotelsData';
import { ATTRACTIONS_DATA } from '../../data/attractionsData';
import { FOOD_DATA } from '../../data/foodData';
import { HIDDEN_GEMS_DATA } from '../../data/hiddenGemsData';
import { ImageLightbox } from '../common/ImageLightbox';
import { LiveMapDashboard } from '../map/LiveMapDashboard';
import { HotelCard } from '../cards/HotelCard';
import { AttractionCard } from '../cards/AttractionCard';
import { FoodCard } from '../cards/FoodCard';
import { HiddenGemCard } from '../cards/HiddenGemCard';

interface Props {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationDetailsModal: React.FC<Props> = ({ destination, onClose }) => {
  const { savedDestinationIds, toggleSaveDestination, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'hotels' | 'attractions' | 'food' | 'gems' | 'map' | 'transit'>('overview');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!destination) return null;

  const isSaved = savedDestinationIds.includes(destination.id);

  // Query related items for this destination
  const destHotels = HOTELS_DATA.filter(h => h.destinationId === destination.id);
  const destAttractions = ATTRACTIONS_DATA.filter(a => a.destinationId === destination.id);
  const destFoods = FOOD_DATA.filter(f => f.destinationId === destination.id);
  const destGems = HIDDEN_GEMS_DATA.filter(g => g.destinationId === destination.id);

  const allGalleryImages = [destination.heroImage, ...(destination.gallery || [])];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePlanTripClick = () => {
    onClose();
    navigate('trip-planner');
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Top Sticky Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-20 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#102B4E] bg-[#EAF5FD] px-2.5 py-0.5 rounded">
                {destination.state}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{destination.name}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveDestination(destination.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
                title="Save Destination"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors relative"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -bottom-8 right-0 text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            {/* Visual Hero Gallery Grid */}
            <div className="relative p-4 sm:p-6 bg-slate-950 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden max-h-[360px]">
                {/* Large Hero Main Photo */}
                <div
                  onClick={() => handleOpenLightbox(0)}
                  className="md:col-span-2 relative aspect-[16/10] md:aspect-auto overflow-hidden rounded-xl cursor-pointer group"
                >
                  <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs uppercase tracking-widest text-[#42B9F5] font-bold block">
                      {destination.culture.epithet}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-0.5">
                      {destination.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 max-w-xl">
                      {destination.tagline}
                    </p>
                  </div>
                </div>

                {/* Secondary Gallery Previews */}
                <div className="hidden md:grid grid-rows-2 gap-3">
                  {destination.gallery.slice(1, 3).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleOpenLightbox(idx + 1)}
                      className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[16/10]"
                    >
                      <img
                        src={img}
                        alt={`${destination.name} gallery ${idx + 2}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* View All Photos Button */}
              <button
                onClick={() => handleOpenLightbox(0)}
                className="absolute bottom-8 right-8 px-3.5 py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 transition-all shadow-lg"
              >
                <Images className="w-3.5 h-3.5" />
                <span>View All {allGalleryImages.length} Photos</span>
              </button>
            </div>

            {/* Quick Metrics & CTA Bar */}
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Rating</span>
                  <span className="font-bold text-slate-900 text-sm">★ {destination.rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Best Time</span>
                  <span className="font-bold text-slate-900 text-sm">{destination.bestTime.months}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Avg Budget</span>
                  <span className="font-bold text-slate-900 text-sm">₹{destination.startingBudget.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Recommended Duration</span>
                  <span className="font-bold text-slate-900 text-sm">{destination.recommendedDuration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Live Temp</span>
                  <span className="font-bold text-[#0879C9] text-sm">{destination.weather.temp}°C · {destination.weather.condition}</span>
                </div>
              </div>

              <button
                onClick={handlePlanTripClick}
                className="px-5 py-2.5 bg-[#0879C9] hover:bg-[#0667AE] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Plan Trip to {destination.name}</span>
              </button>
            </div>

            {/* Segmented Section Navigation Tabs */}
            <div className="px-5 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center gap-2 overflow-x-auto text-xs py-2 scrollbar-none">
              {[
                { id: 'overview', label: 'Overview & Weather' },
                { id: 'hotels', label: `Hotels (${destHotels.length || '3+'})` },
                { id: 'attractions', label: `Attractions (${destAttractions.length || '2+'})` },
                { id: 'food', label: `Food Guide (${destFoods.length || '3+'})` },
                { id: 'gems', label: `Hidden Gems (${destGems.length || '1+'})` },
                { id: 'map', label: 'Interactive Map' },
                { id: 'transit', label: 'How to Reach' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-8 space-y-8">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Destination Description & History */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-xl font-bold text-slate-900">
                        About {destination.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {destination.description}
                      </p>

                      {/* Cultural Background Box */}
                      <div className="bg-[#F4F9FE] border border-[#42B9F5]/40 rounded-2xl p-4 sm:p-5 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#102B4E] block">
                          Culture, Heritage & Rulers
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#102B4E]">
                          <div>
                            <span className="text-[#0879C9] font-medium block">Historical Dynasty / King:</span>
                            <span className="font-semibold text-slate-900">{destination.culture.heritageKing}</span>
                          </div>
                          <div>
                            <span className="text-[#0879C9] font-medium block">Key Festivals:</span>
                            <span className="font-semibold text-slate-900">{destination.culture.festivals.join(', ')}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-[#0879C9] font-medium block">Traditions:</span>
                            <span className="text-slate-700 leading-relaxed">{destination.culture.traditions}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weather & Crowd Dashboard */}
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Live Weather
                          </span>
                          <span className="text-xs font-semibold text-[#0879C9] flex items-center gap-1">
                            <Sun className="w-3.5 h-3.5" />
                            {destination.weather.temp}°C
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-3xl font-extrabold text-slate-900">
                            {destination.weather.temp}°C
                          </div>
                          <div className="text-xs text-slate-500">
                            <span className="block font-semibold text-slate-800">{destination.weather.condition}</span>
                            <span>Rain probability: {destination.weather.rainProbability}%</span>
                          </div>
                        </div>

                        {/* 4-Day Forecast */}
                        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-200 text-center">
                          {destination.weather.forecast.map(f => (
                            <div key={f.day} className="p-1 rounded bg-white border border-slate-200/60">
                              <span className="text-[10px] text-slate-400 block font-semibold">{f.day}</span>
                              <span className="text-xs font-bold text-slate-900 block">{f.temp}°</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Crowd & Peak Hours Box */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Tourist Crowd Level:</span>
                          <span className="font-bold text-[#102B4E] bg-[#EAF5FD] px-2 py-0.5 rounded">
                            {destination.crowdLevel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Peak Timing:</span>
                          <span className="font-semibold text-slate-900">{destination.peakHours}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Traffic Condition:</span>
                          <span className="font-semibold text-emerald-700">{destination.trafficStatus} Flow</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nearby Emergency Services */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>Nearby Emergency Services & 24/7 Assistance</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {destination.emergencyServices.map((em, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-400 text-[10px] uppercase">
                              {em.type}
                            </span>
                            {em.isOpen24x7 && (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                24x7 Open
                              </span>
                            )}
                          </div>
                          <h6 className="font-bold text-slate-900 truncate">{em.name}</h6>
                          <p className="text-[11px] text-slate-500 truncate">{em.address}</p>
                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">{em.distance}</span>
                            <a
                              href={`tel:${em.phone}`}
                              className="font-semibold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{em.phone.split('/')[0]}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HOTELS */}
              {activeTab === 'hotels' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Top Stays in {destination.name}</h4>
                      <p className="text-xs text-slate-500">Verified luxury resorts, heritage havelis & boutique hostels</p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('hotels');
                      }}
                      className="text-xs font-semibold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1"
                    >
                      <span>Explore all hotels</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {destHotels.length > 0 ? (
                      destHotels.map(h => <HotelCard key={h.id} hotel={h} />)
                    ) : (
                      HOTELS_DATA.slice(0, 2).map(h => <HotelCard key={h.id} hotel={h} />)
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ATTRACTIONS */}
              {activeTab === 'attractions' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Famous Sightseeing & Attractions</h4>
                    <p className="text-xs text-slate-500">Timings, peak hours, entry ticket costs and photo spots</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destAttractions.length > 0 ? (
                      destAttractions.map(a => <AttractionCard key={a.id} attraction={a} />)
                    ) : (
                      ATTRACTIONS_DATA.slice(0, 2).map(a => <AttractionCard key={a.id} attraction={a} />)
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: FOOD GUIDE */}
              {activeTab === 'food' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{destination.name} Culinary & Food Guide</h4>
                    <p className="text-xs text-slate-500">Iconic local dishes, approximate pricing and legendary places to try</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {destFoods.length > 0 ? (
                      destFoods.map(f => <FoodCard key={f.id} food={f} />)
                    ) : (
                      FOOD_DATA.slice(0, 3).map(f => <FoodCard key={f.id} food={f} />)
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: HIDDEN GEMS */}
              {activeTab === 'gems' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Secret Off-Beat Spots</h4>
                    <p className="text-xs text-slate-500">Uncrowded nature walks, virgin shorelines and ancient villages</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destGems.length > 0 ? (
                      destGems.map(g => <HiddenGemCard key={g.id} gem={g} />)
                    ) : (
                      HIDDEN_GEMS_DATA.slice(0, 2).map(g => <HiddenGemCard key={g.id} gem={g} />)
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: INTERACTIVE MAP */}
              {activeTab === 'map' && (
                <div className="space-y-4">
                  <LiveMapDashboard destination={destination} />
                </div>
              )}

              {/* TAB 7: HOW TO REACH & TRANSIT */}
              {activeTab === 'transit' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">How to Reach {destination.name}</h4>
                    <p className="text-xs text-slate-500">Airport, railway, inter-state bus and local mobility options</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {destination.transportation.map((tr, idx) => {
                      let Icon = Bus;
                      if (tr.type === 'Flight') Icon = Plane;
                      if (tr.type === 'Train') Icon = Train;

                      return (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-[#EAF5FD] text-[#0879C9]">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 text-sm block">{tr.type}</span>
                              <span className="text-[11px] text-slate-400">{tr.distance}</span>
                            </div>
                          </div>

                          <h6 className="font-semibold text-xs text-slate-800">{tr.hubName}</h6>

                          <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Estimated Transit Time</span>
                              <span className="font-semibold text-slate-800">{tr.estimatedTime}</span>
                            </div>
                            <div className="pt-1">
                              <span className="text-slate-400 block text-[10px]">Estimated Fare</span>
                              <span className="font-bold text-emerald-700">{tr.estimatedCost}</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500">{tr.frequency}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allGalleryImages}
        initialIndex={lightboxIndex}
        title={`${destination.name} Photo Gallery`}
      />
    </>
  );
};
