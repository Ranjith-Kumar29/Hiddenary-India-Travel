import React from 'react';
import { Star } from 'lucide-react';

interface Props {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewsCount?: number;
  className?: string;
}

export const RatingStars: React.FC<Props> = ({
  rating,
  maxStars = 5,
  size = 'sm',
  showNumber = true,
  reviewsCount,
  className = ''
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-[#0879C9]">
        {Array.from({ length: maxStars }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const half = !filled && index < rating;
          return (
            <Star
              key={index}
              className={`${iconSize} ${
                filled
                  ? 'fill-[#0879C9] text-[#0879C9]'
                  : half
                  ? 'fill-[#42B9F5]/60 text-[#0879C9]'
                  : 'text-slate-300'
              }`}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-semibold text-slate-800 ${textSize}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-500">
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
