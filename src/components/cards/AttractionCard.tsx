import React from 'react';
import { Heart, Star, Clock, Ticket, MapPin, ArrowRight } from 'lucide-react';
import { Attraction } from '../../types/travel';
import { useApp } from '../../context/AppContext';

interface Props {
  attraction: Attraction;
}

export const AttractionCard: React.FC<Props> = ({ attraction }) => {
  const { savedAttractionIds, toggleSaveAttraction, navigate } = useApp();
  const isSaved = savedAttractionIds.includes(attraction.id);

  const handleCardClick = () => {
    navigate('attractions', { attractionId: attraction.id });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveAttraction(attraction.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={attraction.heroImage}
          alt={attraction.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <button
          onClick={handleSaveClick}
          aria-label="Save Attraction"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-white transition-all shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        <span className="absolute top-3 left-3 text-[11px] font-semibold text-white bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded shadow-xs">
          {attraction.category}
        </span>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold truncate group-hover:text-[#42B9F5] transition-colors drop-shadow-sm">
              {attraction.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-semibold bg-black/40 px-2 py-0.5 rounded text-[#42B9F5] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#42B9F5] text-[#42B9F5]" />
              <span>{attraction.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/80 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-300" />
            <span>{attraction.destinationName}</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Timing and entry fee details */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Hours:</span>
            </span>
            <span className="font-medium text-slate-800">
              {attraction.openingTime} – {attraction.closingTime}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-500">
              <Ticket className="w-3.5 h-3.5 text-slate-400" />
              <span>Entry Fee:</span>
            </span>
            <span className="font-semibold text-emerald-700">
              {attraction.entryFee}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Peak: {attraction.peakHours}</span>
            <span>Duration: {attraction.recommendedDuration}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {attraction.description}
        </p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            {attraction.reviewsCount} visitor ratings
          </span>
          <span className="inline-flex items-center gap-1 text-[#0879C9] font-semibold group-hover:text-[#102B4E] transition-colors">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
