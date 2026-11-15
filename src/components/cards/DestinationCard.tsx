import React from 'react';
import { Heart, Star, Compass, ArrowRight, Sun } from 'lucide-react';
import { Destination } from '../../types/travel';
import { useApp } from '../../context/AppContext';

interface Props {
  destination: Destination;
  showTrendingBadge?: boolean;
}

export const DestinationCard: React.FC<Props> = ({ destination, showTrendingBadge }) => {
  const { savedDestinationIds, toggleSaveDestination, navigate } = useApp();
  const isSaved = savedDestinationIds.includes(destination.id);

  const handleCardClick = () => {
    navigate('destination', { destinationId: destination.id });
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveDestination(destination.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={destination.heroImage}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          {showTrendingBadge && destination.isTrending ? (
            <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#0879C9] px-2.5 py-0.5 rounded shadow-sm">
              Trending
            </span>
          ) : (
            <span className="text-xs font-medium text-white/90 drop-shadow-sm">
              {destination.state}
            </span>
          )}

          <button
            onClick={handleSaveClick}
            aria-label="Save destination"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-white transition-all shadow-sm"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-rose-600 text-rose-600' : ''
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[#42B9F5]">
              <Star className="w-3.5 h-3.5 fill-[#42B9F5] text-[#42B9F5]" />
              <span>{destination.rating}</span>
            </div>
          </div>
          <p className="text-xs text-white/80 line-clamp-1 mt-0.5 drop-shadow-xs">
            {destination.culture.epithet || destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Subtle unboxed metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{destination.bestTime.months}</span>
          <span aria-hidden="true">·</span>
          <span>{destination.recommendedDuration}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-600">
            <Sun className="w-3 h-3 text-[#0879C9]" />
            {destination.weather.temp}°C
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        {/* Footer with Starting Budget & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] text-slate-400 font-medium">Starting budget</span>
            <span className="text-sm font-bold text-slate-900">
              ₹{destination.startingBudget.toLocaleString()}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0879C9] group-hover:text-[#102B4E] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
