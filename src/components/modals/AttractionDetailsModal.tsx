import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  Clock,
  Ticket,
  MapPin,
  Utensils,
  Hotel as HotelIcon,
  Phone,
  Images,
  Star,
  MessageSquare
} from 'lucide-react';
import { Attraction } from '../../types/travel';
import { useApp } from '../../context/AppContext';
import { ImageLightbox } from '../common/ImageLightbox';
import { WriteReviewModal } from './WriteReviewModal';

interface Props {
  attraction: Attraction | null;
  onClose: () => void;
}

export const AttractionDetailsModal: React.FC<Props> = ({ attraction, onClose }) => {
  const { savedAttractionIds, toggleSaveAttraction, navigate } = useApp();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [localReviews, setLocalReviews] = useState(attraction?.reviews || []);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!attraction) return null;

  const isSaved = savedAttractionIds.includes(attraction.id);
  const allImages = [attraction.heroImage, ...(attraction.gallery || [])];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (newRev: { userName: string; rating: number; comment: string }) => {
    const revObj = {
      id: `rev-${Date.now()}`,
      userName: newRev.userName,
      rating: newRev.rating,
      date: 'Just now',
      comment: newRev.comment,
      helpfulCount: 1
    };
    setLocalReviews(prev => [revObj, ...prev]);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 shrink-0">
            <div>
              <span className="text-[11px] font-bold text-[#102B4E] bg-[#EAF5FD] px-2 py-0.5 rounded">
                {attraction.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{attraction.name}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveAttraction(attraction.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors relative"
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

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            {/* Image Showcase */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-950 overflow-hidden">
              <img
                src={attraction.heroImage}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 shadow-lg"
              >
                <Images className="w-3.5 h-3.5" />
                <span>View {allImages.length} Photos</span>
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-8">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <span className="text-slate-400 block font-medium">Opening Hours</span>
                  <span className="font-bold text-slate-900">{attraction.openingTime} – {attraction.closingTime}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <span className="text-slate-400 block font-medium">Entry Ticket</span>
                  <span className="font-bold text-emerald-700">{attraction.entryFee}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <span className="text-slate-400 block font-medium">Peak Visitor Hours</span>
                  <span className="font-bold text-slate-900">{attraction.peakHours}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <span className="text-slate-400 block font-medium">Recommended Duration</span>
                  <span className="font-bold text-slate-900">{attraction.recommendedDuration}</span>
                </div>
              </div>

              {/* Description & History */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1.5">Overview</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {attraction.description}
                  </p>
                </div>

                <div className="bg-[#F4F9FE] border border-[#42B9F5]/40 rounded-2xl p-4 sm:p-5">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#102B4E] mb-1">
                    Historical Background & Architecture
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {attraction.history}
                  </p>
                </div>

                {attraction.holidayInfo && (
                  <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-700 mr-1">Holiday / Visiting Notice:</span>
                    <span>{attraction.holidayInfo}</span>
                  </div>
                )}
              </div>

              {/* Nearby Recommendations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <Utensils className="w-4 h-4 text-[#0879C9]" />
                    <span>Nearby Recommended Restaurants</span>
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    {attraction.nearbyRestaurants.map((res, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0879C9]" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <HotelIcon className="w-4 h-4 text-indigo-600" />
                    <span>Nearby Hotels & Stays</span>
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    {attraction.nearbyHotels.map((hot, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span>{hot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visitor Reviews */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-base">Visitor Reviews</h4>
                  <button
                    onClick={() => setWriteReviewOpen(true)}
                    className="text-xs font-semibold text-[#0879C9] hover:text-[#102B4E] flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Write Review</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {localReviews.map(r => (
                    <div
                      key={r.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{r.userName}</span>
                          <span className="text-slate-400 text-[11px]">{r.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-[#0879C9] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#0879C9] text-[#0879C9]" />
                          <span>{r.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        initialIndex={lightboxIndex}
        title={attraction.name}
      />

      <WriteReviewModal
        targetTitle={attraction.name}
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        onSubmitReview={handleReviewSubmit}
      />
    </>
  );
};
