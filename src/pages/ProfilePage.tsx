import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Settings,
  Check,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import { LanguageCode } from '../types/travel';

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    switchAccountWithGoogle,
    updateUserBio,
    resendEmailVerificationLink,
    refreshVerificationStatus,
    openAuthModal,
    currentLanguage,
    setLanguage,
    savedDestinationIds,
    savedHotelIds,
    userBookings,
    savedTrips,
    navigate
  } = useApp();

  const [bioInput, setBioInput] = useState(currentUser?.bio || '');
  const [savedBio, setSavedBio] = useState(false);
  const [savingBio, setSavingBio] = useState(false);
  const [switchingAccount, setSwitchingAccount] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState<string | null>(null);

  useEffect(() => {
    setBioInput(currentUser?.bio || '');
  }, [currentUser?.id, currentUser?.bio]);

  // If user is not logged in
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-[#EAF5FD] rounded-full flex items-center justify-center mx-auto text-[#0879C9] border border-[#42B9F5]/50">
          <UserIcon className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#102B4E] tracking-tight">
            Sign In to View Your Profile
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            Log in to manage your bookings, save your favorite destinations across India, and access custom itineraries.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 bg-[#102B4E] hover:bg-[#0B203B] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className="px-6 py-2.5 bg-[#0879C9] hover:bg-[#0667AE] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateBio = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBio(true);
    try {
      await updateUserBio(bioInput);
      setSavedBio(true);
      setTimeout(() => setSavedBio(false), 2000);
    } catch (err) {
      console.error('Failed to save bio:', err);
    } finally {
      setSavingBio(false);
    }
  };

  const handleSwitchAccount = async () => {
    setSwitchingAccount(true);
    try {
      await switchAccountWithGoogle();
    } catch (err) {
      console.error('Switch Google account error:', err);
    } finally {
      setSwitchingAccount(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendEmailVerificationLink();
      setVerificationMsg('Verification link sent! Please check your inbox and then click Refresh Status.');
    } catch {
      setVerificationMsg('Could not send verification email right now. Please try again shortly.');
    }
  };

  const handleCheckVerification = async () => {
    const verified = await refreshVerificationStatus();
    setVerificationMsg(
      verified
        ? 'Email verified! Your profile and saved trips are now syncing privately to cloud.'
        : 'Email not verified yet. Please click the verification link in your inbox.'
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Unverified Email Notice (only shown for unverified Email/Password signups) */}
      {currentUser.emailVerified === false && (
        <div className="p-4 rounded-2xl bg-[#EAF5FD] border border-[#42B9F5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#102B4E]">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#0879C9] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Verify your email to sync private trips & bookings</p>
              <p className="text-slate-600 mt-0.5">
                {verificationMsg || 'Or switch to Continue with Google for instant verified cloud sync.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleResendVerification}
              className="px-3 py-1.5 rounded-lg bg-white border border-sky-200 font-semibold text-[#0879C9] hover:bg-sky-50 cursor-pointer"
            >
              Resend Email
            </button>
            <button
              type="button"
              onClick={handleCheckVerification}
              className="px-3 py-1.5 rounded-lg bg-[#0879C9] text-white font-semibold hover:bg-[#0662A6] cursor-pointer"
            >
              Refresh Status
            </button>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md bg-[#EAF5FD]"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-[#102B4E] tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-[10px] uppercase font-bold text-[#102B4E] bg-[#EAF5FD] px-2 py-0.5 rounded">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{currentUser.email}</p>
            <p className="text-xs text-slate-700 max-w-md pt-1 leading-relaxed">
              {currentUser.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              {currentUser.interests.map(i => (
                <span
                  key={i}
                  className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 shrink-0">
          <button
            type="button"
            disabled={switchingAccount}
            onClick={handleSwitchAccount}
            className="px-4 py-2 text-xs font-semibold text-[#0879C9] hover:bg-[#EAF5FD] border border-sky-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${switchingAccount ? 'animate-spin' : ''}`} />
            <span>{switchingAccount ? 'Switching...' : 'Switch Google Account'}</span>
          </button>

          <button
            type="button"
            onClick={logoutUser}
            className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('saved')}
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:shadow-md transition-all text-center"
        >
          <span className="text-2xl font-extrabold text-slate-900 block">
            {savedDestinationIds.length}
          </span>
          <span className="text-xs text-slate-500 font-medium">Saved Destinations</span>
        </div>

        <div
          onClick={() => navigate('saved')}
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:shadow-md transition-all text-center"
        >
          <span className="text-2xl font-extrabold text-slate-900 block">
            {savedHotelIds.length}
          </span>
          <span className="text-xs text-slate-500 font-medium">Saved Hotels</span>
        </div>

        <div
          onClick={() => navigate('my-trips')}
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:shadow-md transition-all text-center"
        >
          <span className="text-2xl font-extrabold text-slate-900 block">
            {userBookings.length}
          </span>
          <span className="text-xs text-slate-500 font-medium">Hotel Bookings</span>
        </div>

        <div
          onClick={() => navigate('my-trips')}
          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer hover:shadow-md transition-all text-center"
        >
          <span className="text-2xl font-extrabold text-slate-900 block">
            {savedTrips.length}
          </span>
          <span className="text-xs text-slate-500 font-medium">Custom Itineraries</span>
        </div>
      </div>

      {/* Language & Preference Settings */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Settings className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-base">Travel & UI Preferences</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Preferred Language
            </label>
            <select
              value={currentLanguage}
              onChange={e => setLanguage(e.target.value as LanguageCode)}
              className="w-full text-xs font-semibold border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#0879C9] bg-white"
            >
              {SUPPORTED_LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Core translations available in English, Tamil, Hindi, and more.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Firebase Account Status
            </label>
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Connected via Firebase Authentication</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed truncate">
                User UID: <span className="font-mono text-[10px] text-slate-500">{currentUser.id}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Update Bio form */}
        <form onSubmit={handleUpdateBio} className="pt-2 border-t border-slate-100 space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Explorer Bio
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={bioInput}
              onChange={e => setBioInput(e.target.value)}
              placeholder="Tell fellow travelers about your travel passions..."
              className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
            />
            <button
              type="submit"
              disabled={savingBio}
              className="px-4 py-2 bg-[#102B4E] hover:bg-[#0B203B] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {savedBio ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>{savingBio ? 'Saving...' : 'Save Bio'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
