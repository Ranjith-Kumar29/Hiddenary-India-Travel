import React from 'react';
import { Star, MapPin, Utensils } from 'lucide-react';
import { FoodItem } from '../../types/travel';

interface Props {
  food: FoodItem;
}

export const FoodCard: React.FC<Props> = ({ food }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-white bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded shadow-xs">
            {food.destinationName}
          </span>
          {food.isVegetarian !== undefined && (
            <span
              className={`w-4 h-4 rounded-sm border bg-white flex items-center justify-center ${
                food.isVegetarian ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  food.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white drop-shadow-sm truncate">
              {food.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold bg-black/40 px-2 py-0.5 rounded text-[#42B9F5]">
              <Star className="w-3.5 h-3.5 fill-[#42B9F5] text-[#42B9F5]" />
              <span>{food.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {food.description}
        </p>

        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Approx. Price:</span>
            <span className="font-bold text-slate-900">{food.approxPrice}</span>
          </div>

          <div className="text-xs text-slate-700 bg-[#F4F9FE] border border-[#42B9F5]/40 p-2 rounded-lg">
            <span className="font-semibold text-[#102B4E] block text-[11px] uppercase tracking-wider mb-0.5">
              Where to Try:
            </span>
            <span className="line-clamp-1">{food.whereToTry}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
