import React, { useState } from 'react';
import {
  Mail,
  Lock,
  User as UserIcon,
  Globe,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import { LanguageCode } from '../types/travel';
import { HiddenaryLogo, HiddenaryIcon } from '../components/common/HiddenaryLogo';

interface Props {
  onContinueAsGuest?: () => void;
  defaultMode?: 'login' | 'signup';
}

export const LoginPage: React.FC<Props> = ({ onContinueAsGuest, defaultMode = 'login' }) => {
  const {
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmailAccount,
    currentLanguage,
    setLanguage
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(currentLanguage);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Beaches', 'Heritage']);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const INTEREST_OPTIONS = [
    'Beaches',
    'Heritage',
    'Hill Stations',
    'Wildlife & Nature',
    'Culinary & Food',
    'Spiritual & Temples',
    'Adventure & Trekking',
    'Luxury & Palaces'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const parseAuthError = (err: unknown): string => {
    if (typeof err === 'object' && err !== null && 'code' in err) {
      const code = (err as { code: string }).code;
      switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          return 'Invalid email or password. Please verify your credentials and try again.';
        case 'auth/user-not-found':
          return 'No account found with this email. Please sign up first.';
        case 'auth/email-already-in-use':
          return 'An account already exists with this email address. Try signing in instead.';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters long.';
        case 'auth/invalid-email':
          return 'Please provide a valid email address.';
        case 'auth/popup-closed-by-user':
          return 'Google sign-in popup was closed before finishing.';
        case 'auth/operation-not-allowed':
          return 'This sign-in method is currently disabled in your Firebase console. Please enable it in Authentication -> Sign-in method.';
        default:
          return (err as { message?: string }).message || 'Authentication failed. Please check your credentials.';
      }
    }
    if (err instanceof Error) return err.message;
    return 'An unexpected authentication error occurred.';
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMessage('Successfully signed in with Google!');
    } catch (err) {
      console.error('Google sign-in error:', err);
      setErrorMessage(parseAuthError(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name for your profile.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmailAccount(
          name.trim(),
          email.trim(),
          password,
          selectedLanguage,
          selectedInterests
        );
        setSuccessMessage('Account created successfully! Welcome to Hiddenary.');
      } else {
        await loginWithEmail(email.trim(), password);
        setSuccessMessage('Welcome back! Signed in successfully.');
      }
    } catch (err) {
      console.error('Auth submit error:', err);
      setErrorMessage(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#102B4E] via-[#0B3C70] to-[#0879C9] flex flex-col justify-between text-slate-100 relative overflow-hidden">
      {/* Background Ambient Glow & Map Motif */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#42B9F5_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#42B9F5]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0879C9]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <HiddenaryLogo variant="dark" size="lg" showTagline tagline="Incredible India Travel Portal" />

        {onContinueAsGuest && (
          <button
            onClick={onContinueAsGuest}
            className="text-xs font-semibold text-sky-100 hover:text-white px-3.5 py-1.5 rounded-full border border-white/25 hover:border-[#42B9F5] bg-[#102B4E]/60 backdrop-blur-sm transition-all flex items-center gap-1.5"
          >
            <span>Explore as Guest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white text-[#102B4E] rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-[#102B4E] via-[#0B5494] to-[#0879C9] p-6 text-white text-center relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner border border-white/15">
              <HiddenaryIcon size={38} variant="dark" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-xs text-sky-100 mt-1 max-w-xs mx-auto">
              {mode === 'login'
                ? 'Sign in to access your saved destinations, customized itineraries, and hotel bookings.'
                : 'Join thousands of explorers discovering incredible heritage, stays, and coastal wonders.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex border-b border-sky-100 bg-[#F4F9FE] text-sm font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-3 text-center transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#0879C9] border-b-2 border-[#0879C9] shadow-2xs'
                  : 'text-[#102B4E]/60 hover:text-[#102B4E]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-3 text-center transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#0879C9] border-b-2 border-[#0879C9] shadow-2xs'
                  : 'text-[#102B4E]/60 hover:text-[#102B4E]'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{successMessage}</div>
              </div>
            )}

            {/* Google Account Chooser Sign-In */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                className="w-full py-3 px-4 bg-[#EAF5FD]/60 hover:bg-[#EAF5FD] text-[#102B4E] font-bold text-xs sm:text-sm rounded-xl border border-[#42B9F5]/60 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 text-[#0879C9] animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{googleLoading ? 'Opening Google Account Chooser...' : 'Continue with Google'}</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                Select your own Google account to sign in or create a private Hiddenary account.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                or with email
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Email + Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-[#102B4E] mb-1">
                    Full Name <span className="text-[#0879C9]">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#0879C9]/60 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-sky-200 rounded-xl focus:border-[#0879C9] focus:ring-1 focus:ring-[#0879C9] outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#102B4E] mb-1">
                  Email Address <span className="text-[#0879C9]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#0879C9]/60 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-sky-200 rounded-xl focus:border-[#0879C9] focus:ring-1 focus:ring-[#0879C9] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102B4E] mb-1">
                  Password <span className="text-[#0879C9]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#0879C9]/60 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm border border-sky-200 rounded-xl focus:border-[#0879C9] focus:ring-1 focus:ring-[#0879C9] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-[#0879C9]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#102B4E] mb-1">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-[#0879C9]/60 absolute left-3 top-2.5" />
                      <select
                        value={selectedLanguage}
                        onChange={e => {
                          const val = e.target.value as LanguageCode;
                          setSelectedLanguage(val);
                          setLanguage(val);
                        }}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-sky-200 rounded-xl focus:border-[#0879C9] outline-none bg-white transition-all"
                      >
                        {SUPPORTED_LANGUAGES.map(lang => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.nativeName} ({lang.name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102B4E] mb-1.5">
                      Travel Interests
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                      {INTEREST_OPTIONS.map(interest => {
                        const active = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all ${
                              active
                                ? 'bg-[#EAF5FD] border-[#0879C9] text-[#102B4E] font-bold'
                                : 'bg-[#F4F9FE] border-sky-100 text-slate-600 hover:bg-[#EAF5FD]'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3 bg-[#0879C9] hover:bg-[#0662A6] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#0879C9]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{mode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Hiddenary' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Guest Browsing Link */}
            {onContinueAsGuest && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onContinueAsGuest}
                  className="text-xs font-semibold text-slate-500 hover:text-[#0879C9] transition-colors"
                >
                  Want to explore first? <span className="underline">Continue as Guest</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-[#F4F9FE] border-t border-sky-100 flex items-center justify-center gap-1.5 text-[11px] text-[#102B4E]/70">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0879C9]" />
            <span>Secured with Firebase Authentication & Firestore</span>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-4 text-center text-xs text-sky-100/80">
        Hiddenary &copy; 2026 &bull; Explore Incredible India
      </footer>
    </div>
  );
};
