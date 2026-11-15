import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  targetTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: { userName: string; rating: number; comment: string }) => void;
}

export const WriteReviewModal: React.FC<Props> = ({
  targetTitle,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const { currentUser } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState(currentUser?.name || '');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmitReview({
      userName: userName || 'Traveler',
      rating,
      comment: comment.trim()
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Write a Review</h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">{targetTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Review Published!</h4>
              <p className="text-xs text-slate-500">
                Thank you for helping fellow travelers explore Bharat better.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1 text-slate-300 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            isFilled
                              ? 'fill-[#0879C9] text-[#0879C9]'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-bold text-[#102B4E] ml-2">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Experience & Tips
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share details about room cleanliness, food quality, best sunset timings, transport tips..."
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 outline-none focus:border-[#0879C9] resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0879C9] hover:bg-[#0667AE] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
