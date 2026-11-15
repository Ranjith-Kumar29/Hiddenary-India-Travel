import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDocFromServer,
  serverTimestamp,
  Timestamp,
  Firestore,
  Unsubscribe
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import {
  User,
  LanguageCode,
  SavedTripItinerary,
  Booking,
  TravelPost
} from '../types/travel';

// Initialize Firebase
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfigData);
export const auth: Auth = getAuth(app);

// Ensure Firebase Auth persists per browser session (cleared completely on signOut)
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Auth persistence setup warning:', err);
});

// Initialize Firestore with the provisioned database ID
export const db: Firestore = firebaseConfigData.firestoreDatabaseId
  ? getFirestore(app, firebaseConfigData.firestoreDatabaseId)
  : getFirestore(app);

// Structured Firestore Error Reporting (required by Firebase Security Integration)
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email
        })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Always create a fresh GoogleAuthProvider with prompt: 'select_account'
// so every user explicitly selects their own Google account.
function createGoogleProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return provider;
}

const VALID_LANGUAGES: LanguageCode[] = [
  'en', 'ta', 'hi', 'te', 'ml', 'kn', 'tcy', 'ur', 'sa', 'fr', 'de', 'ko', 'ja', 'zh'
];

function sanitizeId(raw: string, fallbackPrefix: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
  return cleaned || `${fallbackPrefix}_${Date.now()}`;
}

function sanitizeStringList(items: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    .map((v) => v.trim().slice(0, maxLen))
    .slice(0, maxItems);
}

function formatTimestampMillis(ts: unknown): number {
  if (ts instanceof Timestamp) return ts.toMillis();
  if (typeof ts === 'object' && ts !== null && 'toMillis' in ts && typeof (ts as { toMillis: () => number }).toMillis === 'function') {
    return (ts as { toMillis: () => number }).toMillis();
  }
  return 0;
}

export interface UserFavoritesData {
  savedDestinationIds: string[];
  savedHotelIds: string[];
  savedAttractionIds: string[];
  savedBlogIds: string[];
}

export interface HydratedUserRecord {
  user: User;
  favorites: UserFavoritesData;
}

// Build User + Favorites from Firestore snapshot + Firebase Auth user
function mapDocToHydratedUser(fbUser: FirebaseUser, data?: Record<string, unknown>): HydratedUserRecord {
  const resolvedName =
    (typeof data?.name === 'string' && data.name.trim()) ||
    fbUser.displayName?.trim() ||
    fbUser.email?.split('@')[0] ||
    'Traveler';
  const resolvedAvatar =
    (typeof data?.avatar === 'string' && data.avatar.trim()) ||
    fbUser.photoURL ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(resolvedName)}`;
  const rawLang = typeof data?.preferredLanguage === 'string' ? (data.preferredLanguage as LanguageCode) : 'en';
  const resolvedLanguage = VALID_LANGUAGES.includes(rawLang) ? rawLang : 'en';
  const rawRole = typeof data?.role === 'string' ? data.role : 'traveler';
  const resolvedRole: User['role'] = rawRole === 'local_guide' ? 'local_guide' : 'traveler';

  return {
    user: {
      id: fbUser.uid,
      name: resolvedName.slice(0, 120),
      email: (fbUser.email || (typeof data?.email === 'string' ? data.email : '')).slice(0, 254),
      avatar: resolvedAvatar.slice(0, 1024),
      role: resolvedRole,
      preferredLanguage: resolvedLanguage,
      bio: (typeof data?.bio === 'string' ? data.bio : 'Exploring incredible destinations across India.').slice(0, 500),
      interests: sanitizeStringList(data?.interests, 20, 64),
      joinedDate:
        (typeof data?.joinedDate === 'string' && data.joinedDate.slice(0, 64)) ||
        new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      emailVerified: fbUser.emailVerified
    },
    favorites: {
      savedDestinationIds: sanitizeStringList(data?.savedDestinationIds, 100, 128),
      savedHotelIds: sanitizeStringList(data?.savedHotelIds, 100, 128),
      savedAttractionIds: sanitizeStringList(data?.savedAttractionIds, 100, 128),
      savedBlogIds: sanitizeStringList(data?.savedBlogIds, 100, 128)
    }
  };
}

// Convert a Firebase Auth user + private Firestore /users/{uid} doc into our isolated User record
export async function syncUserProfile(
  fbUser: FirebaseUser,
  extraData?: {
    name?: string;
    preferredLanguage?: LanguageCode;
    interests?: string[];
  }
): Promise<HydratedUserRecord> {
  const userPath = `users/${fbUser.uid}`;
  const userRef = doc(db, 'users', fbUser.uid);

  let existingData: Record<string, unknown> | undefined;
  let docExists = false;

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      docExists = true;
      existingData = userSnap.data() as Record<string, unknown>;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, userPath);
  }

  const resolvedName = (
    extraData?.name ||
    (typeof existingData?.name === 'string' && existingData.name) ||
    fbUser.displayName ||
    fbUser.email?.split('@')[0] ||
    'Traveler'
  ).slice(0, 120);

  const resolvedAvatar = (
    fbUser.photoURL ||
    (typeof existingData?.avatar === 'string' && existingData.avatar) ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(resolvedName)}`
  ).slice(0, 1024);

  const candidateLang = extraData?.preferredLanguage || (existingData?.preferredLanguage as LanguageCode) || 'en';
  const resolvedLanguage = VALID_LANGUAGES.includes(candidateLang) ? candidateLang : 'en';

  const resolvedInterests = sanitizeStringList(
    extraData?.interests || existingData?.interests || ['Beaches', 'Heritage'],
    20,
    64
  );

  const resolvedJoinedDate = (
    (typeof existingData?.joinedDate === 'string' && existingData.joinedDate) ||
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  ).slice(0, 64);

  const resolvedBio = (
    (typeof existingData?.bio === 'string' && existingData.bio) ||
    'Exploring incredible destinations across India.'
  ).slice(0, 500);

  const resolvedRole: User['role'] =
    existingData?.role === 'local_guide' ? 'local_guide' : 'traveler';

  const savedDestinationIds = sanitizeStringList(existingData?.savedDestinationIds, 100, 128);
  const savedHotelIds = sanitizeStringList(existingData?.savedHotelIds, 100, 128);
  const savedAttractionIds = sanitizeStringList(existingData?.savedAttractionIds, 100, 128);
  const savedBlogIds = sanitizeStringList(existingData?.savedBlogIds, 100, 128);

  const localHydrated: HydratedUserRecord = {
    user: {
      id: fbUser.uid,
      name: resolvedName,
      email: (fbUser.email || '').slice(0, 254),
      avatar: resolvedAvatar,
      role: resolvedRole,
      preferredLanguage: resolvedLanguage,
      bio: resolvedBio,
      interests: resolvedInterests,
      joinedDate: resolvedJoinedDate,
      emailVerified: fbUser.emailVerified
    },
    favorites: {
      savedDestinationIds,
      savedHotelIds,
      savedAttractionIds,
      savedBlogIds
    }
  };

  // Security rules strictly mandate email_verified == true for Firestore writes.
  // Google accounts always have emailVerified === true. Unverified email/password accounts
  // keep an isolated Auth session without triggering denied Firestore writes until verified.
  if (!fbUser.emailVerified) {
    return localHydrated;
  }

  const basePayload = {
    id: fbUser.uid,
    name: resolvedName,
    email: (fbUser.email || '').slice(0, 254),
    avatar: resolvedAvatar,
    role: resolvedRole,
    preferredLanguage: resolvedLanguage,
    bio: resolvedBio,
    interests: resolvedInterests,
    savedDestinationIds,
    savedHotelIds,
    savedAttractionIds,
    savedBlogIds,
    joinedDate: resolvedJoinedDate,
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp()
  };

  try {
    if (!docExists) {
      await setDoc(userRef, {
        ...basePayload,
        createdAt: serverTimestamp()
      });
    } else {
      const existingCreatedAt = existingData?.createdAt;
      await setDoc(userRef, {
        ...basePayload,
        createdAt: existingCreatedAt instanceof Timestamp ? existingCreatedAt : serverTimestamp()
      });
    }
  } catch (err) {
    handleFirestoreError(err, docExists ? OperationType.UPDATE : OperationType.CREATE, userPath);
  }

  return localHydrated;
}

// 1. Google Sign-In (Always forces Google account chooser via prompt: 'select_account')
export async function signInWithGoogle(): Promise<HydratedUserRecord> {
  await setPersistence(auth, browserLocalPersistence);
  const provider = createGoogleProvider();
  const result = await signInWithPopup(auth, provider);
  return await syncUserProfile(result.user);
}

// 1b. Switch Google Account: clears current Firebase session first, then opens Google account chooser
export async function switchGoogleAccount(): Promise<HydratedUserRecord> {
  await signOut(auth);
  return await signInWithGoogle();
}

// 2. Email & Password Sign-In
export async function signInWithEmail(email: string, password: string): Promise<HydratedUserRecord> {
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithEmailAndPassword(auth, email, password);
  return await syncUserProfile(result.user);
}

// 3. Email & Password Sign-Up
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
  language: LanguageCode = 'en',
  interests: string[] = ['Beaches', 'Heritage']
): Promise<HydratedUserRecord> {
  await setPersistence(auth, browserLocalPersistence);
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (name.trim()) {
    try {
      await updateProfile(result.user, { displayName: name.trim().slice(0, 120) });
    } catch (e) {
      console.warn('Could not set displayName on Firebase Auth user:', e);
    }
  }

  if (!result.user.emailVerified) {
    try {
      await sendEmailVerification(result.user);
    } catch (e) {
      console.warn('Could not send verification email:', e);
    }
  }

  return await syncUserProfile(result.user, {
    name: name.trim(),
    preferredLanguage: language,
    interests
  });
}

export async function resendVerificationEmail(): Promise<void> {
  if (auth.currentUser && !auth.currentUser.emailVerified) {
    await sendEmailVerification(auth.currentUser);
  }
}

export async function reloadCurrentAuthUser(): Promise<HydratedUserRecord | null> {
  if (!auth.currentUser) return null;
  await auth.currentUser.reload();
  const refreshed = auth.currentUser;
  if (!refreshed) return null;
  return await syncUserProfile(refreshed);
}

// 4. Sign Out
export async function logOutFirebase(): Promise<void> {
  await signOut(auth);
}

// 5. Auth State Listener (Firebase Auth is the SOLE source of truth)
export function subscribeToAuthChanges(
  callback: (fbUser: FirebaseUser | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, (fbUser) => {
    callback(fbUser);
  });
}

// 6. Subscribe to Current User's Private Profile & Favorites (/users/{uid})
export function subscribeToUserProfile(
  fbUser: FirebaseUser,
  onData: (hydrated: HydratedUserRecord) => void
): Unsubscribe {
  const userPath = `users/${fbUser.uid}`;
  const userRef = doc(db, 'users', fbUser.uid);

  return onSnapshot(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(mapDocToHydratedUser(fbUser, snapshot.data() as Record<string, unknown>));
      } else {
        onData(mapDocToHydratedUser(fbUser));
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, userPath);
    }
  );
}

export async function updateUserProfileFields(
  uid: string,
  fields: Partial<{
    name: string;
    avatar: string;
    preferredLanguage: LanguageCode;
    bio: string;
    interests: string[];
    savedDestinationIds: string[];
    savedHotelIds: string[];
    savedAttractionIds: string[];
    savedBlogIds: string[];
  }>
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error('Unauthorized profile update attempt.');
  }
  if (!auth.currentUser.emailVerified) {
    return;
  }

  const userPath = `users/${uid}`;
  const userRef = doc(db, 'users', uid);

  const sanitized: Record<string, unknown> = {
    updatedAt: serverTimestamp()
  };

  if (typeof fields.name === 'string') sanitized.name = fields.name.trim().slice(0, 120) || 'Traveler';
  if (typeof fields.avatar === 'string') sanitized.avatar = fields.avatar.slice(0, 1024);
  if (fields.preferredLanguage && VALID_LANGUAGES.includes(fields.preferredLanguage)) {
    sanitized.preferredLanguage = fields.preferredLanguage;
  }
  if (typeof fields.bio === 'string') sanitized.bio = fields.bio.slice(0, 500);
  if (fields.interests !== undefined) sanitized.interests = sanitizeStringList(fields.interests, 20, 64);
  if (fields.savedDestinationIds !== undefined) {
    sanitized.savedDestinationIds = sanitizeStringList(fields.savedDestinationIds, 100, 128);
  }
  if (fields.savedHotelIds !== undefined) {
    sanitized.savedHotelIds = sanitizeStringList(fields.savedHotelIds, 100, 128);
  }
  if (fields.savedAttractionIds !== undefined) {
    sanitized.savedAttractionIds = sanitizeStringList(fields.savedAttractionIds, 100, 128);
  }
  if (fields.savedBlogIds !== undefined) {
    sanitized.savedBlogIds = sanitizeStringList(fields.savedBlogIds, 100, 128);
  }

  try {
    await updateDoc(userRef, sanitized);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, userPath);
  }
}

// 7. Private Saved Trips & Travel Budgets (/users/{uid}/trips)
export function subscribeToUserTrips(
  uid: string,
  onData: (trips: SavedTripItinerary[]) => void
): Unsubscribe {
  const path = `users/${uid}/trips`;
  const q = query(collection(db, 'users', uid, 'trips'), where('userId', '==', uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs
        .map((d) => {
          const raw = d.data() as Record<string, unknown>;
          return {
            sortKey: formatTimestampMillis(raw.createdAt),
            trip: {
              id: (raw.id as string) || d.id,
              destinationId: String(raw.destinationId || ''),
              destinationName: String(raw.destinationName || ''),
              daysCount: Number(raw.daysCount || 1),
              travelersCount: Number(raw.travelersCount || 1),
              budgetPerPerson: Number(raw.budgetPerPerson || 0),
              travelStyle: (raw.travelStyle as SavedTripItinerary['travelStyle']) || 'Standard',
              interests: sanitizeStringList(raw.interests, 20, 64),
              createdAt: String(raw.createdAtLabel || ''),
              days: Array.isArray(raw.days) ? raw.days : [],
              budgetBreakdown: raw.budgetBreakdown as SavedTripItinerary['budgetBreakdown'],
              isBudgetSufficient: Boolean(raw.isBudgetSufficient),
              ...(typeof raw.alternativeAdvice === 'string' ? { alternativeAdvice: raw.alternativeAdvice } : {})
            } as SavedTripItinerary
          };
        })
        .sort((a, b) => b.sortKey - a.sortKey)
        .map((entry) => entry.trip);

      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function saveUserTrip(uid: string, itinerary: SavedTripItinerary): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error('Sign in required to save trip itinerary.');
  }
  if (!auth.currentUser.emailVerified) {
    throw new Error('Please verify your email address before saving trips.');
  }

  const tripId = sanitizeId(itinerary.id, 'trip');
  const path = `users/${uid}/trips/${tripId}`;
  const tripRef = doc(db, 'users', uid, 'trips', tripId);

  const payload: Record<string, unknown> = {
    id: tripId,
    userId: uid,
    destinationId: itinerary.destinationId.slice(0, 64),
    destinationName: itinerary.destinationName.slice(0, 120),
    daysCount: Math.max(1, Math.min(30, Number(itinerary.daysCount) || 1)),
    travelersCount: Math.max(1, Math.min(50, Number(itinerary.travelersCount) || 1)),
    budgetPerPerson: Math.max(0, Math.min(10000000, Number(itinerary.budgetPerPerson) || 0)),
    travelStyle: itinerary.travelStyle,
    interests: sanitizeStringList(itinerary.interests, 20, 64),
    days: itinerary.days.slice(0, 30),
    budgetBreakdown: {
      hotel: Math.max(0, Number(itinerary.budgetBreakdown.hotel) || 0),
      food: Math.max(0, Number(itinerary.budgetBreakdown.food) || 0),
      transportation: Math.max(0, Number(itinerary.budgetBreakdown.transportation) || 0),
      activities: Math.max(0, Number(itinerary.budgetBreakdown.activities) || 0),
      shopping: Math.max(0, Number(itinerary.budgetBreakdown.shopping) || 0),
      emergencyBuffer: Math.max(0, Number(itinerary.budgetBreakdown.emergencyBuffer) || 0),
      totalPerPerson: Math.max(0, Number(itinerary.budgetBreakdown.totalPerPerson) || 0),
      grandTotal: Math.max(0, Number(itinerary.budgetBreakdown.grandTotal) || 0)
    },
    isBudgetSufficient: Boolean(itinerary.isBudgetSufficient),
    createdAtLabel: (itinerary.createdAt || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })).slice(0, 64),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  if (itinerary.alternativeAdvice) {
    payload.alternativeAdvice = itinerary.alternativeAdvice.slice(0, 1000);
  }

  try {
    await setDoc(tripRef, payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function deleteUserTrip(uid: string, tripId: string): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error('Unauthorized delete attempt.');
  }
  const cleanTripId = sanitizeId(tripId, 'trip');
  const path = `users/${uid}/trips/${cleanTripId}`;
  try {
    await deleteDoc(doc(db, 'users', uid, 'trips', cleanTripId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// 8. Private Hotel Bookings (/users/{uid}/bookings)
export function subscribeToUserBookings(
  uid: string,
  onData: (bookings: Booking[]) => void
): Unsubscribe {
  const path = `users/${uid}/bookings`;
  const q = query(collection(db, 'users', uid, 'bookings'), where('userId', '==', uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs
        .map((d) => {
          const raw = d.data() as Record<string, unknown>;
          return {
            sortKey: formatTimestampMillis(raw.createdAt),
            booking: {
              id: (raw.id as string) || d.id,
              bookingCode: String(raw.bookingCode || ''),
              hotelId: String(raw.hotelId || ''),
              hotelName: String(raw.hotelName || ''),
              destinationName: String(raw.destinationName || ''),
              roomName: String(raw.roomName || ''),
              hotelImage: String(raw.hotelImage || ''),
              checkInDate: String(raw.checkInDate || ''),
              checkOutDate: String(raw.checkOutDate || ''),
              nightsCount: Number(raw.nightsCount || 1),
              guestsCount: Number(raw.guestsCount || 1),
              baseAmount: Number(raw.baseAmount || 0),
              taxesAmount: Number(raw.taxesAmount || 0),
              totalAmount: Number(raw.totalAmount || 0),
              status: (raw.status as Booking['status']) || 'Confirmed',
              createdAt: String(raw.createdAtLabel || ''),
              guestName: String(raw.guestName || ''),
              guestEmail: String(raw.guestEmail || ''),
              guestPhone: String(raw.guestPhone || '')
            } as Booking
          };
        })
        .sort((a, b) => b.sortKey - a.sortKey)
        .map((entry) => entry.booking);

      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function saveUserBooking(uid: string, booking: Booking): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error('Sign in required to create booking.');
  }
  if (!auth.currentUser.emailVerified) {
    throw new Error('Please verify your email address before making bookings.');
  }

  const bookingId = sanitizeId(booking.id, 'book');
  const path = `users/${uid}/bookings/${bookingId}`;
  const bookingRef = doc(db, 'users', uid, 'bookings', bookingId);

  const payload = {
    id: bookingId,
    bookingCode: booking.bookingCode.slice(0, 32),
    userId: uid,
    hotelId: booking.hotelId.slice(0, 128),
    hotelName: booking.hotelName.slice(0, 160),
    destinationName: booking.destinationName.slice(0, 120),
    roomName: booking.roomName.slice(0, 160),
    hotelImage: booking.hotelImage.slice(0, 1024),
    checkInDate: booking.checkInDate.slice(0, 32),
    checkOutDate: booking.checkOutDate.slice(0, 32),
    nightsCount: Math.max(1, Math.min(90, Number(booking.nightsCount) || 1)),
    guestsCount: Math.max(1, Math.min(20, Number(booking.guestsCount) || 1)),
    baseAmount: Math.max(0, Number(booking.baseAmount) || 0),
    taxesAmount: Math.max(0, Number(booking.taxesAmount) || 0),
    totalAmount: Math.max(0, Number(booking.totalAmount) || 0),
    status: 'Confirmed' as const,
    createdAtLabel: booking.createdAt.slice(0, 32),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    guestName: booking.guestName.trim().slice(0, 120) || 'Guest',
    guestEmail: booking.guestEmail.trim().slice(0, 254),
    guestPhone: booking.guestPhone.trim().slice(0, 32)
  };

  try {
    await setDoc(bookingRef, payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function cancelUserBooking(uid: string, bookingId: string): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error('Unauthorized booking cancellation attempt.');
  }
  const cleanId = sanitizeId(bookingId, 'book');
  const path = `users/${uid}/bookings/${cleanId}`;

  try {
    await updateDoc(doc(db, 'users', uid, 'bookings', cleanId), {
      status: 'Cancelled',
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// 9. Public Non-PII Community Travel Feed (/travelPosts)
export function subscribeToTravelPosts(onData: (posts: TravelPost[]) => void): Unsubscribe {
  const path = 'travelPosts';
  return onSnapshot(
    collection(db, 'travelPosts'),
    (snapshot) => {
      const items = snapshot.docs
        .map((d) => {
          const raw = d.data() as Record<string, unknown>;
          return {
            sortKey: formatTimestampMillis(raw.createdAt),
            post: {
              id: (raw.id as string) || d.id,
              userName: String(raw.userName || 'Traveler'),
              userHandle: String(raw.userHandle || '@explorer'),
              userAvatar: String(raw.userAvatar || ''),
              destinationId: String(raw.destinationId || ''),
              destinationName: String(raw.destinationName || ''),
              image: String(raw.image || ''),
              caption: String(raw.caption || ''),
              likesCount: Number(raw.likesCount || 0),
              isLikedByUser: false,
              comments: [],
              createdAt: String(raw.createdAtLabel || 'Recently')
            } as TravelPost
          };
        })
        .sort((a, b) => b.sortKey - a.sortKey)
        .map((entry) => entry.post);

      onData(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function createTravelPost(
  user: User,
  data: { destinationId: string; destinationName: string; image: string; caption: string }
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== user.id) {
    throw new Error('Sign in required to publish travel post.');
  }
  if (!auth.currentUser.emailVerified) {
    throw new Error('Please verify your email address before posting.');
  }

  const postId = `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const path = `travelPosts/${postId}`;
  const cleanHandle = `@${user.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 40) || 'explorer'}`;

  const payload = {
    id: postId,
    userId: user.id,
    userName: user.name.slice(0, 120),
    userHandle: cleanHandle.slice(0, 80),
    userAvatar: user.avatar.slice(0, 1024),
    destinationId: data.destinationId.slice(0, 64),
    destinationName: data.destinationName.slice(0, 160),
    image: data.image.slice(0, 1024),
    caption: data.caption.trim().slice(0, 1000),
    likesCount: 1,
    createdAtLabel: 'Just now',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'travelPosts', postId), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}
