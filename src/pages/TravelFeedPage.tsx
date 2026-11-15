import React, { useState } from 'react';
import { Sparkles, PlusCircle, Compass, Heart, Share2, MessageSquare, Bookmark, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FeedPostCard } from '../components/cards/FeedPostCard';
import { NewPostModal } from '../components/modals/NewPostModal';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { HOTELS_DATA } from '../data/hotelsData';
import { FOOD_DATA } from '../data/foodData';

export const TravelFeedPage: React.FC = () => {
  const { feedPosts, savedDestinationIds, navigate } = useApp();
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [feedTab, setFeedTab] = useState<'for-you' | 'community'>('community');

  // Personalized "For You" recommendations based on saved destinations
  const recommendedDestinations = DESTINATIONS_DATA.filter(
    d => savedDestinationIds.includes(d.id) || ['goa', 'kerala', 'jaipur'].includes(d.id)
  ).slice(0, 3);

  const recommendedHotels = HOTELS_DATA.slice(0, 2);
  const recommendedFoods = FOOD_DATA.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Travel Feed & Community
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real photography, live sunset spots, local food discoveries, and personalized recommendations
          </p>
        </div>

        <button
          onClick={() => setNewPostModalOpen(true)}
          className="px-4 py-2.5 bg-[#0879C9] hover:bg-[#0667AE] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>Share Travel Memory</span>
        </button>
      </div>

      {/* Segmented Feed Switcher */}
      <div className="flex border-b border-slate-200 text-sm font-semibold">
        <button
          onClick={() => setFeedTab('community')}
          className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            feedTab === 'community'
              ? 'border-slate-900 text-slate-900 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Traveler Posts</span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
            {feedPosts.length}
          </span>
        </button>

        <button
          onClick={() => setFeedTab('for-you')}
          className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            feedTab === 'for-you'
              ? 'border-[#0879C9] text-[#102B4E] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#0879C9]" />
          <span>Recommended For You</span>
        </button>
      </div>

      {/* FEED CONTENT */}
      {feedTab === 'community' ? (
        <div className="space-y-6">
          {feedPosts.map(post => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* FOR YOU RECOMMENDATION FEED */
        <div className="space-y-8">
          <div className="bg-[#EAF5FD] border border-[#42B9F5]/40 rounded-2xl p-4 flex items-center gap-3 text-xs text-[#102B4E]">
            <Sparkles className="w-5 h-5 text-[#0879C9] shrink-0" />
            <span>
              Curated based on your personal saved destinations and travel preferences.
            </span>
          </div>

          {/* Recommended Destinations */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Destinations You'll Love</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedDestinations.map(d => (
                <div
                  key={d.id}
                  onClick={() => navigate('destination', { destinationId: d.id })}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={d.heroImage}
                      alt={d.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-[#42B9F5] font-semibold uppercase">{d.state}</span>
                      <h4 className="font-bold text-base">{d.name}</h4>
                    </div>
                  </div>
                  <div className="p-3 text-xs text-slate-600">
                    <p className="line-clamp-2">{d.tagline}</p>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between font-semibold text-slate-900">
                      <span>From ₹{d.startingBudget.toLocaleString()}</span>
                      <span className="text-[#0879C9]">★ {d.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Stays */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Stays Matching Your Vibe</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedHotels.map(h => (
                <div
                  key={h.id}
                  onClick={() => navigate('hotels', { hotelId: h.id })}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <img
                    src={h.heroImage}
                    alt={h.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-slate-400 block">{h.destinationName}</span>
                    <h5 className="font-bold text-sm text-slate-900 truncate">{h.name}</h5>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mt-1">
                      <span>₹{h.startingPrice.toLocaleString()} /night</span>
                      <span className="text-[#0879C9] font-bold">★ {h.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      <NewPostModal isOpen={newPostModalOpen} onClose={() => setNewPostModalOpen(false)} />
    </div>
  );
};
