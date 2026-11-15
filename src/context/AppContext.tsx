import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  Hotel,
  TravelPost,
  Booking,
  SavedTripItinerary,
  User,
  LanguageCode,
  AppNotification
} from '../types/travel';
import { INITIAL_FEED_POSTS } from '../data/feedPostsData';
import { TRANSLATIONS, TranslationDictionary } from '../data/translations';
import {
  auth,
  signInWithGoogle,
  switchGoogleAccount,
  signInWithEmail,
  signUpWithEmail,
  logOutFirebase,
  resendVerificationEmail,
  reloadCurrentAuthUser,
  subscribeToAuthChanges,
  syncUserProfile,
  subscribeToUserProfile,
  subscribeToUserTrips,
  subscribeToUserBookings,
  subscribeToTravelPosts,
  updateUserProfileFields,
  saveUserTrip,
  deleteUserTrip,
  saveUserBooking,
  cancelUserBooking,
  createTravelPost,
  HydratedUserRecord
} from '../services/firebase';
import { Unsubscribe } from 'firebase/firestore';
import { LEGACY_SHARED_STORAGE_KEYS, purgeLegacySharedStorage } from '../utils/storageCleanup';

export { LEGACY_SHARED_STORAGE_KEYS, purgeLegacySharedStorage };

interface AppContextType {
  activePage: string;
  selectedDestinationId: string | null;
  selectedHotelId: string | null;
  selectedAttractionId: string | null;
  selectedBlogId: string | null;
  bookingHotel: Hotel | null;
  currentUser: User | null;
  isAuthLoading: boolean;
  savedDestinationIds: string[];
  savedHotelIds: string[];
  savedAttractionIds: string[];
  savedBlogIds: string[];
  savedTrips: SavedTripItinerary[];
  userBookings: Booking[];
  feedPosts: TravelPost[];
  notifications: AppNotification[];
  currentLanguage: LanguageCode;
  searchModalOpen: boolean;
  authModalOpen: boolean;
  authMode: 'login' | 'signup';
  isGuestMode: boolean;
  isOfflineSimulated: boolean;
  t: TranslationDictionary;

  // Actions
  setGuestMode: (val: boolean) => void;
  navigate: (page: string, params?: { destinationId?: string; hotelId?: string; attractionId?: string; blogId?: string }) => void;
  openBookingModal: (hotel: Hotel) => void;
  closeBookingModal: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  toggleSaveDestination: (id: string) => void;
  toggleSaveHotel: (id: string) => void;
  toggleSaveAttraction: (id: string) => void;
  toggleSaveBlog: (id: string) => void;
  saveItinerary: (itinerary: SavedTripItinerary) => Promise<boolean>;
  deleteItinerary: (id: string) => Promise<void>;
  createBooking: (bookingData: {
    hotelId: string;
    hotelName: string;
    destinationName: string;
    roomName: string;
    hotelImage: string;
    checkInDate: string;
    checkOutDate: string;
    nightsCount: number;
    guestsCount: number;
    baseAmount: number;
    taxesAmount: number;
    totalAmount: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
  }) => Promise<Booking | null>;
  cancelBooking: (bookingId: string) => Promise<void>;
  addFeedPost: (data: { destinationId: string; destinationName: string; image: string; caption: string }) => Promise<void>;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, commentText: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setLanguage: (lang: LanguageCode) => void;
  updateUserBio: (bio: string) => Promise<void>;
  loginUser: (user: User) => void;
  loginWithGoogle: () => Promise<void>;
  switchAccountWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmailAccount: (name: string, email: string, password: string, lang?: LanguageCode, interests?: string[]) => Promise<void>;
  resendEmailVerificationLink: () => Promise<void>;
  refreshVerificationStatus: () => Promise<boolean>;
  logoutUser: () => Promise<void>;
  toggleOfflineSimulation: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Weekend Weather Alert',
    message: 'Clear skies and pleasant 29°C coastal breeze forecasted for Goa this weekend.',
    timeAgo: '10m ago',
    type: 'weather',
    read: false,
    linkAction: { page: 'destination', itemId: 'goa' }
  },
  {
    id: 'notif-2',
    title: 'High Demand: Taj Lake Palace',
    message: 'Only 2 rooms remaining for upcoming winter dates in Udaipur.',
    timeAgo: '2h ago',
    type: 'alert',
    read: false,
    linkAction: { page: 'hotel', itemId: 'hotel-udaipur-taj-lake-palace' }
  },
  {
    id: 'notif-3',
    title: 'New Curated Guide Published',
    message: 'Read "How to Backpack Kerala for 7 Days Under ₹12,000".',
    timeAgo: '1d ago',
    type: 'blog',
    read: true,
    linkAction: { page: 'blogs', itemId: 'blog-budget-kerala-backpacking' }
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [selectedAttractionId, setSelectedAttractionId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);

  // Sole source of truth is Firebase Auth; never pre-populate from shared localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  // Strictly isolated per-user state (always empty until authenticated user loads from Firestore)
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);
  const [savedHotelIds, setSavedHotelIds] = useState<string[]>([]);
  const [savedAttractionIds, setSavedAttractionIds] = useState<string[]>([]);
  const [savedBlogIds, setSavedBlogIds] = useState<string[]>([]);
  const [savedTrips, setSavedTrips] = useState<SavedTripItinerary[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const [remotePosts, setRemotePosts] = useState<TravelPost[]>([]);
  const [localFeedInteractions, setLocalFeedInteractions] = useState<TravelPost[]>(INITIAL_FEED_POSTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);

  const userUnsubsRef = useRef<Unsubscribe[]>([]);
  const activeUidRef = useRef<string | null>(null);

  const cleanupUserSubscriptions = useCallback(() => {
    for (const unsub of userUnsubsRef.current) {
      try {
        unsub();
      } catch {
        // Ignore unsubscribe error
      }
    }
    userUnsubsRef.current = [];
  }, []);

  const clearPrivateSessionState = useCallback(() => {
    activeUidRef.current = null;
    cleanupUserSubscriptions();
    setCurrentUser(null);
    setSavedDestinationIds([]);
    setSavedHotelIds([]);
    setSavedAttractionIds([]);
    setSavedBlogIds([]);
    setSavedTrips([]);
    setUserBookings([]);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentLanguage('en');
    setBookingHotel(null);
    purgeLegacySharedStorage();
  }, [cleanupUserSubscriptions]);

  const applyHydratedRecord = useCallback((hydrated: HydratedUserRecord) => {
    setCurrentUser(hydrated.user);
    setSavedDestinationIds(hydrated.favorites.savedDestinationIds);
    setSavedHotelIds(hydrated.favorites.savedHotelIds);
    setSavedAttractionIds(hydrated.favorites.savedAttractionIds);
    setSavedBlogIds(hydrated.favorites.savedBlogIds);
    setCurrentLanguage(hydrated.user.preferredLanguage || 'en');
    setIsGuestMode(false);
  }, []);

  // Purge legacy shared storage on mount and subscribe to Firebase Auth state
  useEffect(() => {
    purgeLegacySharedStorage();

    const safetyTimer = window.setTimeout(() => {
      setIsAuthLoading(false);
    }, 3000);

    const unsubscribeAuth = subscribeToAuthChanges(async (fbUser) => {
      window.clearTimeout(safetyTimer);
      cleanupUserSubscriptions();

      if (!fbUser) {
        clearPrivateSessionState();
        setIsAuthLoading(false);
        return;
      }

      // Immediately clear previous user's in-memory collections before loading the new account
      const uid = fbUser.uid;
      activeUidRef.current = uid;
      setSavedDestinationIds([]);
      setSavedHotelIds([]);
      setSavedAttractionIds([]);
      setSavedBlogIds([]);
      setSavedTrips([]);
      setUserBookings([]);
      setNotifications(INITIAL_NOTIFICATIONS);

      try {
        const hydrated = await syncUserProfile(fbUser);
        if (activeUidRef.current !== uid) return;
        applyHydratedRecord(hydrated);
      } catch (err) {
        console.error('Error syncing authenticated user profile:', err);
        if (activeUidRef.current !== uid) return;
        const fallbackName = fbUser.displayName || fbUser.email?.split('@')[0] || 'Traveler';
        setCurrentUser({
          id: uid,
          name: fallbackName,
          email: fbUser.email || '',
          avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fallbackName)}`,
          role: 'traveler',
          preferredLanguage: 'en',
          bio: 'Exploring incredible destinations across India.',
          interests: ['Beaches', 'Heritage'],
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          emailVerified: fbUser.emailVerified
        });
        setIsGuestMode(false);
      } finally {
        if (activeUidRef.current === uid) {
          setIsAuthLoading(false);
        }
      }

      // Attach real-time Firestore listeners strictly scoped to this authenticated user's UID
      if (activeUidRef.current !== uid) return;
      const unsubProfile = subscribeToUserProfile(fbUser, (hydrated) => {
        if (activeUidRef.current !== uid) return;
        setCurrentUser(hydrated.user);
        setSavedDestinationIds(hydrated.favorites.savedDestinationIds);
        setSavedHotelIds(hydrated.favorites.savedHotelIds);
        setSavedAttractionIds(hydrated.favorites.savedAttractionIds);
        setSavedBlogIds(hydrated.favorites.savedBlogIds);
        setCurrentLanguage(hydrated.user.preferredLanguage || 'en');
      });

      const unsubTrips = subscribeToUserTrips(uid, (trips) => {
        if (activeUidRef.current !== uid) return;
        setSavedTrips(trips);
      });

      const unsubBookings = subscribeToUserBookings(uid, (bookings) => {
        if (activeUidRef.current !== uid) return;
        setUserBookings(bookings);
      });

      userUnsubsRef.current = [unsubProfile, unsubTrips, unsubBookings];
    });

    return () => {
      window.clearTimeout(safetyTimer);
      cleanupUserSubscriptions();
      unsubscribeAuth();
    };
  }, [applyHydratedRecord, cleanupUserSubscriptions, clearPrivateSessionState]);

  // Subscribe to public non-PII community travel posts
  useEffect(() => {
    const unsubPosts = subscribeToTravelPosts((posts) => {
      setRemotePosts(posts);
    });
    return () => {
      try {
        unsubPosts();
      } catch {
        // Ignore cleanup error
      }
    };
  }, []);

  const feedPosts = [...remotePosts, ...localFeedInteractions];
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const navigate = (
    page: string,
    params?: { destinationId?: string; hotelId?: string; attractionId?: string; blogId?: string }
  ) => {
    setActivePage(page);
    if (params?.destinationId !== undefined) setSelectedDestinationId(params.destinationId);
    if (params?.hotelId !== undefined) setSelectedHotelId(params.hotelId);
    if (params?.attractionId !== undefined) setSelectedAttractionId(params.attractionId);
    if (params?.blogId !== undefined) setSelectedBlogId(params.blogId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (hotel: Hotel) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setBookingHotel(hotel);
  };

  const closeBookingModal = () => {
    setBookingHotel(null);
  };

  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => setAuthModalOpen(false);

  const toggleSaveDestination = (id: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setSavedDestinationIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      updateUserProfileFields(currentUser.id, { savedDestinationIds: next }).catch((err) =>
        console.error('Failed to persist saved destinations:', err)
      );
      return next;
    });
  };

  const toggleSaveHotel = (id: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setSavedHotelIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      updateUserProfileFields(currentUser.id, { savedHotelIds: next }).catch((err) =>
        console.error('Failed to persist saved hotels:', err)
      );
      return next;
    });
  };

  const toggleSaveAttraction = (id: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setSavedAttractionIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      updateUserProfileFields(currentUser.id, { savedAttractionIds: next }).catch((err) =>
        console.error('Failed to persist saved attractions:', err)
      );
      return next;
    });
  };

  const toggleSaveBlog = (id: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setSavedBlogIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      updateUserProfileFields(currentUser.id, { savedBlogIds: next }).catch((err) =>
        console.error('Failed to persist saved blogs:', err)
      );
      return next;
    });
  };

  const saveItinerary = async (itinerary: SavedTripItinerary): Promise<boolean> => {
    if (!currentUser) {
      openAuthModal('login');
      return false;
    }
    await saveUserTrip(currentUser.id, itinerary);
    setSavedTrips((prev) => {
      const filtered = prev.filter((item) => item.id !== itinerary.id);
      return [itinerary, ...filtered];
    });
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Itinerary Saved to My Trips',
      message: `${itinerary.daysCount}-day ${itinerary.destinationName} trip saved privately to your account.`,
      timeAgo: 'Just now',
      type: 'booking',
      read: false,
      linkAction: { page: 'my-trips' }
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return true;
  };

  const deleteItinerary = async (id: string): Promise<void> => {
    if (!currentUser) return;
    await deleteUserTrip(currentUser.id, id);
    setSavedTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  const createBooking = async (bookingData: {
    hotelId: string;
    hotelName: string;
    destinationName: string;
    roomName: string;
    hotelImage: string;
    checkInDate: string;
    checkOutDate: string;
    nightsCount: number;
    guestsCount: number;
    baseAmount: number;
    taxesAmount: number;
    totalAmount: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
  }): Promise<Booking | null> => {
    if (!currentUser) {
      openAuthModal('login');
      return null;
    }

    const randomCode = `HDN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: `book_${Date.now()}`,
      bookingCode: randomCode,
      ...bookingData,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    await saveUserBooking(currentUser.id, newBooking);
    setUserBookings((prev) => {
      const filtered = prev.filter((b) => b.id !== newBooking.id);
      return [newBooking, ...filtered];
    });

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Booking Confirmed!',
      message: `Your stay at ${bookingData.hotelName} is booked. ID: ${randomCode}.`,
      timeAgo: 'Just now',
      type: 'booking',
      read: false,
      linkAction: { page: 'bookings' }
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return newBooking;
  };

  const cancelBooking = async (bookingId: string): Promise<void> => {
    if (!currentUser) return;
    await cancelUserBooking(currentUser.id, bookingId);
    setUserBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  const addFeedPost = async (data: {
    destinationId: string;
    destinationName: string;
    image: string;
    caption: string;
  }): Promise<void> => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    await createTravelPost(currentUser, data);
  };

  const toggleLikePost = (postId: string) => {
    setLocalFeedInteractions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            isLikedByUser: !p.isLikedByUser,
            likesCount: p.isLikedByUser ? Math.max(0, p.likesCount - 1) : p.likesCount + 1
          };
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    const authorName = currentUser.name;
    const avatarUrl = currentUser.avatar;

    setLocalFeedInteractions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            userName: authorName,
            userAvatar: avatarUrl,
            comment: commentText.trim(),
            createdAt: 'Just now'
          };
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    if (currentUser) {
      updateUserProfileFields(currentUser.id, { preferredLanguage: lang }).catch((err) =>
        console.error('Failed to persist language preference:', err)
      );
    }
  };

  const updateUserBio = async (bio: string): Promise<void> => {
    if (!currentUser) return;
    const trimmed = bio.slice(0, 500);
    await updateUserProfileFields(currentUser.id, { bio: trimmed });
    setCurrentUser((prev) => (prev ? { ...prev, bio: trimmed } : prev));
  };

  const loginUser = (user: User) => {
    setCurrentUser(user);
    setIsGuestMode(false);
    setAuthModalOpen(false);
  };

  const loginWithGoogle = async () => {
    const hydrated = await signInWithGoogle();
    activeUidRef.current = hydrated.user.id;
    applyHydratedRecord(hydrated);
    setAuthModalOpen(false);
    if (activePage === 'login') {
      setActivePage('home');
    }
  };

  const switchAccountWithGoogle = async () => {
    clearPrivateSessionState();
    setIsGuestMode(false);
    setActivePage('home');
    setAuthModalOpen(false);
    const hydrated = await switchGoogleAccount();
    activeUidRef.current = hydrated.user.id;
    applyHydratedRecord(hydrated);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const hydrated = await signInWithEmail(email, pass);
    activeUidRef.current = hydrated.user.id;
    applyHydratedRecord(hydrated);
    setAuthModalOpen(false);
    if (activePage === 'login') {
      setActivePage('home');
    }
  };

  const signUpWithEmailAccount = async (
    name: string,
    email: string,
    pass: string,
    lang: LanguageCode = 'en',
    interests: string[] = ['Beaches', 'Heritage']
  ) => {
    const hydrated = await signUpWithEmail(name, email, pass, lang, interests);
    activeUidRef.current = hydrated.user.id;
    applyHydratedRecord(hydrated);
    setAuthModalOpen(false);
    if (activePage === 'login') {
      setActivePage('home');
    }
  };

  const resendEmailVerificationLink = async () => {
    await resendVerificationEmail();
  };

  const refreshVerificationStatus = async (): Promise<boolean> => {
    const hydrated = await reloadCurrentAuthUser();
    if (hydrated) {
      applyHydratedRecord(hydrated);
      return Boolean(hydrated.user.emailVerified);
    }
    return Boolean(auth.currentUser?.emailVerified);
  };

  const logoutUser = async () => {
    clearPrivateSessionState();
    setIsGuestMode(false);
    setActivePage('home');
    setAuthModalOpen(false);
    setSearchModalOpen(false);
    try {
      await logOutFirebase();
    } catch (e) {
      console.warn('Firebase sign out:', e);
    }
  };

  const toggleOfflineSimulation = () => {
    setIsOfflineSimulated((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        selectedDestinationId,
        selectedHotelId,
        selectedAttractionId,
        selectedBlogId,
        bookingHotel,
        currentUser,
        isAuthLoading,
        savedDestinationIds,
        savedHotelIds,
        savedAttractionIds,
        savedBlogIds,
        savedTrips,
        userBookings,
        feedPosts,
        notifications,
        currentLanguage,
        searchModalOpen,
        authModalOpen,
        authMode,
        isGuestMode,
        setGuestMode: setIsGuestMode,
        isOfflineSimulated,
        t,
        navigate,
        openBookingModal,
        closeBookingModal,
        openSearchModal,
        closeSearchModal,
        openAuthModal,
        closeAuthModal,
        toggleSaveDestination,
        toggleSaveHotel,
        toggleSaveAttraction,
        toggleSaveBlog,
        saveItinerary,
        deleteItinerary,
        createBooking,
        cancelBooking,
        addFeedPost,
        toggleLikePost,
        addCommentToPost,
        markNotificationRead,
        markAllNotificationsRead,
        setLanguage,
        updateUserBio,
        loginUser,
        loginWithGoogle,
        switchAccountWithGoogle,
        loginWithEmail,
        signUpWithEmailAccount,
        resendEmailVerificationLink,
        refreshVerificationStatus,
        logoutUser,
        toggleOfflineSimulation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
