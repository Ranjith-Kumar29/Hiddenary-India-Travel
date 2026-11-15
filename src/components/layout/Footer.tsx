import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HiddenaryLogo } from '../common/HiddenaryLogo';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#102B4E] text-sky-100/90 pt-16 pb-20 md:pb-12 border-t border-[#1D4273]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => navigate('home')} className="inline-block cursor-pointer group">
              <HiddenaryLogo variant="dark" size="md" showTagline tagline="Incredible India" />
            </div>
            <p className="text-sm text-sky-100/75 leading-relaxed max-w-sm">
              Discover India. Plan Better. Travel Smarter. An enterprise-grade, modern travel platform covering 20+ states, heritage stays, local delicacies, and smart day-by-day itineraries.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-100/80 bg-[#0B203B] p-2.5 rounded-xl border border-white/10 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-[#42B9F5] shrink-0" />
              <span>Offline-first architecture with localized browser storage cache.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Explore India</h4>
            <ul className="space-y-2 text-sm text-sky-100/75">
              <li>
                <button onClick={() => navigate('explore')} className="hover:text-[#42B9F5] transition-colors">
                  All 20+ Destinations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('hotels')} className="hover:text-[#42B9F5] transition-colors">
                  Hotels & Heritage Stays
                </button>
              </li>
              <li>
                <button onClick={() => navigate('attractions')} className="hover:text-[#42B9F5] transition-colors">
                  UNESCO & Attractions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('food')} className="hover:text-[#42B9F5] transition-colors">
                  Authentic Food Guides
                </button>
              </li>
              <li>
                <button onClick={() => navigate('hidden-gems')} className="hover:text-[#42B9F5] transition-colors">
                  Secret Hidden Gems
                </button>
              </li>
            </ul>
          </div>

          {/* Planning & Community */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Plan & Social</h4>
            <ul className="space-y-2 text-sm text-sky-100/75">
              <li>
                <button onClick={() => navigate('trip-planner')} className="hover:text-[#42B9F5] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#42B9F5]" />
                  <span>Smart Trip Planner</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('feed')} className="hover:text-[#42B9F5] transition-colors">
                  Traveler Photo Feed
                </button>
              </li>
              <li>
                <button onClick={() => navigate('blogs')} className="hover:text-[#42B9F5] transition-colors">
                  Curated Travel Blogs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('saved')} className="hover:text-[#42B9F5] transition-colors">
                  Saved Destinations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('bookings')} className="hover:text-[#42B9F5] transition-colors">
                  My Hotel Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Helpline & Safety</h4>
            <div className="space-y-2.5 text-xs text-sky-100/75">
              <div>
                <span className="block font-medium text-white/90">National Tourist Helpline:</span>
                <span className="text-[#42B9F5] font-semibold text-sm">1363 / 1800-11-1363</span>
                <span className="block text-[11px] text-sky-200/60">24/7 Toll-Free in 12 languages</span>
              </div>
              <div>
                <span className="block font-medium text-white/90">Emergency Police:</span>
                <span className="text-white font-semibold">112</span>
              </div>
              <div>
                <span className="block font-medium text-white/90">Medical Ambulance:</span>
                <span className="text-white font-semibold">108</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/70">
          <div>
            © 2026 Hiddenary. Crafted with pride for Incredible India.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>API Connectivity Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
