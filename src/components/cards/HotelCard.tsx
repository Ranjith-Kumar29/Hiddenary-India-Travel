import React from 'react';
import { Heart, Star, Sparkles, ShieldCheck, MapPin, Wifi, Utensils, Waves, Check } from 'lucide-react';
import { Hotel } from '../../types/travel';
import { useApp } from '../../context/AppContext';

interface Props {
  hotel: Hotel;
}

export const HotelCard: React.FC<Props> = ({ hotel }) => {
  const { savedHotelIds, toggleSaveHotel, openBookingModal, navigate } = useApp();
  const isSaved = savedHotelIds.includes(hotel.id);

  const handleCardClick = () => {
    navigate('hotels', { hotelId: hotel.id });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveHotel(hotel.id);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openBookingModal(hotel);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
    >
      {/* Hotel Image Gallery preview */}
      <div className="relative md:w-72 shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-100">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />

        {/* Save button */}
        <button
          onClick={handleSaveClick}
          aria-label="Save Hotel"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-white transition-all shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Brand tag */}
        <span className="absolute top-3 left-3 text-[11px] font-semibold text-slate-800 bg-white/95 px-2 py-0.5 rounded shadow-xs">
          {hotel.brand}
        </span>
      </div>

      {/* Hotel Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header Row with Rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-700">{hotel.hotelType}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {hotel.destinationName}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#102B4E] group-hover:text-[#0879C9] transition-colors mt-0.5">
                {hotel.name}
              </h3>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-[#EAF5FD] text-[#102B4E] px-2 py-1 rounded-md text-xs font-bold border border-[#42B9F5]/40">
                <Star className="w-3.5 h-3.5 fill-[#0879C9] text-[#0879C9]" />
                <span>{hotel.rating.toFixed(1)}</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {hotel.reviewsCount} reviews
              </span>
            </div>
          </div>

          {/* Distance and Hygiene Indicator */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
            <span>{hotel.distance}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hygiene {hotel.hygieneIndicator}/5</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Key Amenities Preview */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {hotel.amenities.slice(0, 5).map(amenity => (
              <span
                key={amenity}
                className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{amenity}</span>
              </span>
            ))}
            {hotel.amenities.length > 5 && (
              <span className="text-[11px] text-slate-400">
                +{hotel.amenities.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing, Availability & CTAs */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-bold text-slate-900">
                ₹{hotel.startingPrice.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
            <span className="text-xs font-semibold text-rose-600">
              {hotel.roomAvailability} rooms left at this price
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCardClick}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              View Rooms
            </button>
            <button
              onClick={handleBookClick}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0879C9] hover:bg-[#0667AE] rounded-xl shadow-xs transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
