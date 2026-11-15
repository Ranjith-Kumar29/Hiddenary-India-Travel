import React from 'react';
import { Home, Compass, Calendar, Hotel, BookmarkCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { activePage, navigate, userBookings, savedTrips } = useApp();

  const totalMyTrips = userBookings.length + savedTrips.length;

  const TABS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'trip-planner', label: 'Planner', icon: Calendar, badge: 'Smart' },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'my-trips', label: 'My Trips', icon: BookmarkCheck, count: totalMyTrips }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#0879C9] font-semibold' : 'text-[#102B4E]/65 hover:text-[#102B4E]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-1.5'}`} />
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#0879C9] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 bg-[#EAF5FD] text-[#0879C9] text-[8px] font-bold px-1 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
