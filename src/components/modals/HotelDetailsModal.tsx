import React, { useState } from 'react';
import {
  X,
  Heart,
  Star,
  ShieldCheck,
  MapPin,
  Phone,
  Check,
  ArrowRight,
  Sparkles,
  Plane,
  Train,
  MessageSquare,
  Images
} from 'lucide-react';
import { Hotel } from '../../types/travel';
import { useApp } from '../../context/AppContext';
import { ImageLightbox } from '../common/ImageLightbox';
import { ContactHotelModal } from './ContactHotelModal';
import { WriteReviewModal } from './WriteReviewModal';

interface Props {
  hotel: Hotel | null;
  onClose: () => void;
}

export const HotelDetailsModal: React.FC<Props> = ({ hotel, onClose }) => {
  const { savedHotelIds, toggleSaveHotel, openBookingModal } = useApp();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [localReviews, setLocalReviews] = useState(hotel?.reviews || []);

  if (!hotel) return null;

  const isSaved = savedHotelIds.includes(hotel.id);
  const allImages = [hotel.heroImage, ...(hotel.gallery || [])];

  const handleOpenLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const handleBookRoom = (roomId: string) => {
    onClose();
    openBookingModal(hotel);
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
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                  {hotel.hotelType}
                </span>
                <span className="text-xs text-slate-500 font-medium">{hotel.brand}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{hotel.name}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveHotel(hotel.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
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
            {/* Hero Image Showcase */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-950 overflow-hidden">
              <img
                src={hotel.heroImage}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleOpenLightbox(0)}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 shadow-lg"
              >
                <Images className="w-3.5 h-3.5" />
                <span>View {allImages.length} Photos</span>
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-8">
              {/* Hotel Overview & Key Metrics */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#0879C9]" />
                    <span>{hotel.locationAddress}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="font-semibold text-slate-900">{hotel.distance}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Hygiene {hotel.hygieneIndicator}/5</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Contact Hotel
                  </button>
                  <button
                    onClick={() => openBookingModal(hotel)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">About the Property</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              {/* Room Cards Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-base">Select Your Room</h4>
                  <span className="text-xs text-rose-600 font-semibold">
                    {hotel.roomAvailability} rooms available across categories
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.rooms.map(room => (
                    <div
                      key={room.id}
                      className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded">
                          {room.sizeSqFt} sq ft
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">{room.name}</h5>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {room.capacity} · {room.bedType}
                          </p>

                          <div className="space-y-1 mt-2.5">
                            {room.amenities.map(a => (
                              <div
                                key={a}
                                className="flex items-center gap-1.5 text-xs text-slate-600"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-slate-900">
                              ₹{room.pricePerNight.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-slate-500"> / night</span>
                          </div>

                          <button
                            onClick={() => handleBookRoom(room.id)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                          >
                            Book Room
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">Popular Amenities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                  {hotel.amenities.map(am => (
                    <div
                      key={am}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-700"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transportation Transit Guide */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-900 text-sm block">How to Reach This Hotel</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-600">
                  <div className="flex items-start gap-2">
                    <Plane className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-800">From Airport:</span>
                      <span>{hotel.transitTimes.fromAirport || '45 mins cab ride'}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Train className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-800">From Railway Station:</span>
                      <span>{hotel.transitTimes.fromRailway || '20 mins transit'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-800">Estimated Cab Fare:</span>
                    <span className="text-emerald-700 font-bold">{hotel.transitTimes.estimatedCabFare || '₹500 – ₹800'}</span>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-base">Verified Guest Reviews</h4>
                    <span className="text-xs text-slate-400">({localReviews.length})</span>
                  </div>
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

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        initialIndex={lightboxIndex}
        title={hotel.name}
      />

      {/* Contact Hotel Modal */}
      <ContactHotelModal
        hotel={hotel}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        targetTitle={hotel.name}
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        onSubmitReview={handleReviewSubmit}
      />
    </>
  );
};
