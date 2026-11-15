import React from 'react';
import { Heart, Clock, ArrowRight, User } from 'lucide-react';
import { TravelBlog } from '../../types/travel';
import { useApp } from '../../context/AppContext';

interface Props {
  blog: TravelBlog;
}

export const BlogCard: React.FC<Props> = ({ blog }) => {
  const { navigate, savedBlogIds, toggleSaveBlog } = useApp();
  const isSaved = savedBlogIds.includes(blog.id);

  const handleClick = () => {
    navigate('blogs', { blogId: blog.id });
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveBlog(blog.id);
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={blog.coverImage}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded shadow-xs">
          {blog.category}
        </span>

        <button
          onClick={handleSave}
          aria-label="Save blog article"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-600 hover:bg-white transition-all shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata clean unboxed */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>{blog.date}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readingTime}
            </span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-[#102B4E] group-hover:text-[#0879C9] transition-colors leading-snug">
            {blog.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {blog.subtitle}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs font-medium text-slate-700">{blog.author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-rose-600 font-medium">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              {blog.likesCount}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </article>
  );
};
