import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Heart, ArrowLeft, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { BLOGS_DATA } from '../data/blogsData';
import { BlogCard } from '../components/cards/BlogCard';
import { useApp } from '../context/AppContext';

export const BlogsPage: React.FC = () => {
  const { selectedBlogId, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const CATEGORIES = [
    'all',
    'Travel Guides',
    'Budget Travel',
    'Food',
    'Adventure',
    'Luxury',
    'Hidden Gems',
    'Family Travel',
    'Weekend Trips'
  ];

  const activeArticle = useMemo(() => {
    if (!selectedBlogId) return null;
    return BLOGS_DATA.find(b => b.id === selectedBlogId) || null;
  }, [selectedBlogId]);

  const filteredBlogs = useMemo(() => {
    return BLOGS_DATA.filter(blog => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.destinationName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'all' || blog.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* If a specific blog article is selected, display deep article reader */}
      {activeArticle ? (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
          <button
            onClick={() => navigate('blogs', { blogId: undefined })}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blogs</span>
          </button>

          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#102B4E] bg-[#EAF5FD] px-2.5 py-0.5 rounded">
              {activeArticle.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {activeArticle.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {activeArticle.subtitle}
            </p>

            {/* Author bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span className="font-bold text-slate-900 block">{activeArticle.author.name}</span>
                  <span className="text-slate-400">{activeArticle.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readingTime}</span>
              </div>
            </div>
          </div>

          {/* Cover photo */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 shadow-md">
            <img
              src={activeArticle.coverImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
            {activeArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            {/* Curated Tips Callout */}
            {activeArticle.tips && activeArticle.tips.length > 0 && (
              <div className="not-prose bg-[#F4F9FE] border border-[#42B9F5]/40 rounded-2xl p-5 space-y-2 mt-6">
                <span className="font-bold text-xs uppercase tracking-wider text-[#102B4E] block">
                  Insider Travel Tips:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeArticle.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0879C9] mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => navigate('destination', { destinationId: activeArticle.destinationId })}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Explore {activeArticle.destinationName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Blog Directory Listing */
        <>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Travel Blogs & Field Guides
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              In-depth destination walkthroughs, budget backpacking itineraries, local food maps, and photography viewpoints written by passionate explorers.
            </p>
          </div>

          {/* Search & Categories Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search articles on Goa, Kerala backpacking, photography..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none focus:border-[#0879C9]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl capitalize font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' ? 'All Guides' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
