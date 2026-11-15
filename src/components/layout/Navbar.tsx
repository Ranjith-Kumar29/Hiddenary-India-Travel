import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Globe,
  Bell,
  Heart,
  Menu,
  X,
  User as UserIcon,
  Calendar,
  LogOut,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OfflineBadge } from '../common/OfflineBadge';
import { HiddenaryLogo } from '../common/HiddenaryLogo';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigate,
    openSearchModal,
    openAuthModal,
    currentUser,
    logoutUser,
    switchAccountWithGoogle,
    notifications,
    savedDestinationIds,
    savedHotelIds,
    t
  } = useApp();

  const [langModalOpen, setLangModalOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [switchingAccount, setSwitchingAccount] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    await logoutUser();
  };

  const handleSwitchAccount = async () => {
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    setSwitchingAccount(true);
    try {
      await switchAccountWithGoogle();
    } catch (err) {
      console.error('Switch Google account error:', err);
    } finally {
      setSwitchingAccount(false);
    }
  };

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const totalSaved = savedDestinationIds.length + savedHotelIds.length;

  const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: t.exploreDestinations || 'Explore' },
    { id: 'trip-planner', label: t.tripPlanner || 'Trip Planner', highlight: true },
    { id: 'hotels', label: t.hotels || 'Hotels' },
    { id: 'attractions', label: t.attractions || 'Attractions' },
    { id: 'food', label: t.foodGuide || 'Food Guide' },
    { id: 'hidden-gems', label: t.hiddenGems || 'Hidden Gems' },
    { id: 'feed', label: t.travelFeed || 'Travel Feed' },
    { id: 'blogs', label: t.blogs || 'Blogs' },
    { id: 'my-trips', label: t.myTrips || 'My Trips' }
  ];

  const handleNavClick = (pageId: string) => {
    navigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 transition-all">
        {/* Top Announcement & Utilities Strip */}
        <div className="bg-[#102B4E] text-sky-100 text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#42B9F5] animate-pulse" />
            <span className="font-medium tracking-wide">
              Hiddenary 2026: Explore 20+ Iconic Indian Destinations & Live Weather
            </span>
          </div>
          <div className="flex items-center gap-4">
            <OfflineBadge />
            <button
              onClick={() => setLangModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#42B9F5]" />
              <span className="font-medium">{t.appName === 'Hiddenary' ? 'English' : 'Language'}</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo */}
            <div
              onClick={() => navigate('home')}
              className="cursor-pointer shrink-0 group"
            >
              <HiddenaryLogo variant="light" size="md" showTagline tagline="Incredible India" />
            </div>

            {/* Prominent Global Destination Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <button
                onClick={openSearchModal}
                className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-500 bg-[#F4F9FE] hover:bg-[#EAF5FD] border border-sky-200/80 rounded-full transition-all group shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Search className="w-4 h-4 text-[#0879C9] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">Where do you want to go? (Goa, Kerala, Jaipur...)</span>
                </div>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-[#102B4E]/60 bg-white border border-sky-200 rounded">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Quick Actions & Profile Area */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search Icon */}
              <button
                onClick={openSearchModal}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Saved Items Button */}
              <button
                onClick={() => navigate('saved')}
                className={`relative p-2 rounded-lg transition-colors ${
                  activePage === 'saved'
                    ? 'bg-[#EAF5FD] text-[#0879C9]'
                    : 'text-[#102B4E]/70 hover:text-[#102B4E] hover:bg-[#F4F9FE]'
                }`}
                title="Saved Destinations & Hotels"
              >
                <Heart className="w-5 h-5" />
                {totalSaved > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#0879C9] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalSaved}
                  </span>
                )}
              </button>

              {/* Notifications Button */}
              <button
                onClick={() => setNotifDrawerOpen(true)}
                className="relative p-2 text-[#102B4E]/70 hover:text-[#102B4E] rounded-lg hover:bg-[#F4F9FE] transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#0879C9] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {/* User Profile / Account Menu / Auth */}
              {currentUser ? (
                <div className="relative" ref={accountMenuRef}>
                  <button
                    type="button"
                    onClick={() => setAccountMenuOpen(prev => !prev)}
                    className="flex items-center gap-2 p-1 pl-2.5 pr-2 bg-[#F4F9FE] hover:bg-[#EAF5FD] rounded-full cursor-pointer transition-colors border border-sky-200"
                    aria-expanded={accountMenuOpen}
                    aria-label="Account menu"
                  >
                    <span className="hidden sm:inline-block text-xs font-semibold text-[#102B4E] max-w-[110px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-white bg-[#EAF5FD]"
                    />
                    <ChevronDown className={`w-3.5 h-3.5 text-[#0879C9] transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {accountMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-sky-100 py-2 z-50 animate-in fade-in duration-150">
                      <div className="px-4 py-2.5 border-b border-sky-100">
                        <p className="text-xs font-bold text-[#102B4E] truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setAccountMenuOpen(false);
                            navigate('profile');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-[#102B4E] hover:bg-[#F4F9FE] flex items-center gap-2.5 cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-[#0879C9]" />
                          <span>My Profile & Preferences</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAccountMenuOpen(false);
                            navigate('my-trips');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-[#102B4E] hover:bg-[#F4F9FE] flex items-center gap-2.5 cursor-pointer"
                        >
                          <Calendar className="w-4 h-4 text-[#0879C9]" />
                          <span>My Trips & Saved Budgets</span>
                        </button>

                        <button
                          type="button"
                          disabled={switchingAccount}
                          onClick={handleSwitchAccount}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-[#0879C9] hover:bg-[#EAF5FD] flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
                        >
                          <RefreshCw className={`w-4 h-4 ${switchingAccount ? 'animate-spin' : ''}`} />
                          <span>{switchingAccount ? 'Switching...' : 'Switch Google Account'}</span>
                        </button>
                      </div>

                      <div className="pt-1 mt-1 border-t border-sky-100">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.login || 'Sign In'}
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0879C9] hover:bg-[#0662A6] rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Hamburger Button for Mobile Drawer */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="md:hidden p-2 text-[#102B4E]/75 hover:text-[#102B4E] rounded-lg hover:bg-[#F4F9FE]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Secondary Horizontal Nav Links */}
        <div className="hidden md:block border-t border-sky-100 bg-[#F4F9FE]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none text-xs font-medium">
              {NAV_ITEMS.map(item => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#102B4E] text-white font-semibold shadow-xs'
                        : item.highlight
                        ? 'text-[#0879C9] bg-[#EAF5FD] hover:bg-[#D8EEFC] font-semibold'
                        : 'text-[#102B4E]/75 hover:text-[#102B4E] hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-xs">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-2xl p-4 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <HiddenaryLogo variant="light" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activePage === item.id
                        ? 'bg-[#102B4E] text-white font-semibold'
                        : 'text-[#102B4E]/80 hover:bg-[#F4F9FE]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-sky-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLangModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#102B4E] bg-[#F4F9FE] rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#0879C9]" />
                  <span>Language</span>
                </div>
                <span className="font-semibold text-[#102B4E]">Change</span>
              </button>

              {currentUser ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleNavClick('profile');
                    }}
                    className="w-full py-2 px-3 bg-[#F4F9FE] text-[#102B4E] text-xs font-semibold rounded-xl text-left flex items-center justify-between"
                  >
                    <span className="truncate">Signed in as {currentUser.name}</span>
                    <UserIcon className="w-3.5 h-3.5 text-[#0879C9] shrink-0" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleSwitchAccount}
                      className="py-2 px-2.5 bg-[#EAF5FD] text-[#0879C9] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Switch Account</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="py-2 px-2.5 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-2 bg-[#0879C9] hover:bg-[#0662A6] text-white text-xs font-semibold rounded-xl text-center transition-colors"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      <LanguageSelectorModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} />

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notifDrawerOpen} onClose={() => setNotifDrawerOpen(false)} />
    </>
  );
};
