import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, MapPin, Send } from 'lucide-react';
import { TravelPost } from '../../types/travel';
import { useApp } from '../../context/AppContext';

interface Props {
  post: TravelPost;
}

export const FeedPostCard: React.FC<Props> = ({ post }) => {
  const { toggleLikePost, addCommentToPost, navigate } = useApp();
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addCommentToPost(post.id, commentInput);
    setCommentInput('');
    setShowComments(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden max-w-xl mx-auto transition-all">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.userAvatar}
            alt={post.userName}
            className="w-10 h-10 rounded-full object-cover border border-slate-100"
          />
          <div>
            <h4 className="font-bold text-sm text-slate-900 leading-tight">
              {post.userName}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <span>{post.userHandle}</span>
              <span aria-hidden="true">·</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Destination Location Badge */}
        <button
          onClick={() => navigate('destination', { destinationId: post.destinationId })}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#102B4E] bg-[#EAF5FD] hover:bg-sky-100 rounded-lg transition-colors border border-[#42B9F5]/40"
        >
          <MapPin className="w-3 h-3 text-[#0879C9]" />
          <span className="truncate max-w-[120px]">{post.destinationName}</span>
        </button>
      </div>

      {/* Main Post Image */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={post.image}
          alt={post.caption}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action Bar */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleLikePost(post.id)}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-rose-600 transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-transform active:scale-125 ${
                  post.isLikedByUser ? 'fill-rose-600 text-rose-600' : 'text-slate-700'
                }`}
              />
              <span>{post.likesCount}</span>
            </button>

            <button
              onClick={() => setShowComments(prev => !prev)}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-slate-700" />
              <span>{post.comments.length}</span>
            </button>

            <button
              onClick={handleShare}
              className="text-slate-700 hover:text-slate-900 transition-colors relative"
              title="Share post"
            >
              <Share2 className="w-5 h-5" />
              {copiedShare && (
                <span className="absolute -top-7 -left-4 text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded shadow">
                  Copied link!
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsSaved(prev => !prev)}
            className="text-slate-700 hover:text-slate-900 transition-colors"
            title="Bookmark post"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-[#0879C9] text-[#0879C9]' : ''}`} />
          </button>
        </div>

        {/* Caption */}
        <p className="text-sm text-slate-800 leading-relaxed">
          <span className="font-bold mr-1.5">{post.userName}</span>
          {post.caption}
        </p>

        {/* Comments section */}
        {post.comments.length > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-xs text-slate-500 font-medium hover:text-slate-800 mt-2 block"
          >
            View all {post.comments.length} comments
          </button>
        )}

        {showComments && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 max-h-48 overflow-y-auto">
            {post.comments.map(c => (
              <div key={c.id} className="text-xs">
                <span className="font-bold text-slate-900 mr-1.5">{c.userName}</span>
                <span className="text-slate-700">{c.comment}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Comment Input Form */}
      <form onSubmit={handleCommentSubmit} className="px-4 py-3 border-t border-slate-100 flex items-center gap-2">
        <input
          type="text"
          value={commentInput}
          onChange={e => setCommentInput(e.target.value)}
          placeholder="Add a travel tip or comment..."
          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!commentInput.trim()}
          className="p-2 text-[#0879C9] hover:text-[#102B4E] disabled:text-slate-300 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
