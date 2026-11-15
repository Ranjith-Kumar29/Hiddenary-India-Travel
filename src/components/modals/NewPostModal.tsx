import React, { useState } from 'react';
import { X, Image as ImageIcon, Send, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS_DATA } from '../../data/destinationsData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addFeedPost } = useApp();
  const [caption, setCaption] = useState('');
  const [destinationId, setDestinationId] = useState(DESTINATIONS_DATA[0].id);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80'
  );

  const SAMPLE_IMAGES = [
    { label: 'Kerala Backwaters', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Goa Sunset', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Jaipur Palace', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Kashmir Snow', url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Varanasi Ghats', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80' }
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;
    const dest = DESTINATIONS_DATA.find(d => d.id === destinationId) || DESTINATIONS_DATA[0];
    try {
      await addFeedPost({
        destinationId: dest.id,
        destinationName: `${dest.name}, ${dest.state}`,
        image: imageUrl,
        caption: caption.trim()
      });
      setCaption('');
      onClose();
    } catch (err) {
      console.error('Failed to publish travel post:', err);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0879C9]" />
            <h3 className="font-bold text-[#102B4E] text-base">Share Travel Memory</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tagged Destination
            </label>
            <select
              value={destinationId}
              onChange={e => setDestinationId(e.target.value)}
              className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] bg-white"
            >
              {DESTINATIONS_DATA.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}, {d.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select or Paste Image
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
            />
            {/* Quick preset chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SAMPLE_IMAGES.map(s => (
                <button
                  type="button"
                  key={s.label}
                  onClick={() => setImageUrl(s.url)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                    imageUrl === s.url
                      ? 'bg-[#EAF5FD] border-[#42B9F5] text-[#102B4E] font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={imageUrl}
              alt="Post preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Caption & Travel Tips
            </label>
            <textarea
              rows={3}
              required
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="What made this spot special? Best sunrise angle, street food recommendation, or travel tips..."
              className="w-full text-xs border border-slate-200 rounded-xl p-3 outline-none focus:border-[#0879C9] resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#0879C9] hover:bg-[#0667AE] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Post to Hiddenary Travel Feed</span>
          </button>
        </form>
      </div>
    </div>
  );
};
