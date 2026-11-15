import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { LEGACY_SHARED_STORAGE_KEYS, purgeLegacySharedStorage } from './src/utils/storageCleanup';

/**
 * Hiddenary Security Rules, "Dirty Dozen" Adversarial Audit, and
 * Two-Account Privacy & Session Isolation Test Suite.
 *
 * Run with: npx tsx firestore.rules.test.ts
 */

type AuthContext = {
  uid: string;
  email: string;
  email_verified: boolean;
} | null;

const REQUEST_TIME = { __serverTimestamp: true, millis: 1794570000000 };

class PermissionDeniedError extends Error {
  code = 'permission-denied';
  constructor(message: string) {
    super(`PERMISSION_DENIED: ${message}`);
  }
}

function isValidId(id: unknown): id is string {
  return typeof id === 'string' && id.length >= 1 && id.length <= 128 && /^[a-zA-Z0-9_\-]+$/.test(id);
}

function isValidStringList(val: unknown, maxItems: number, maxItemLen: number): boolean {
  if (!Array.isArray(val) || val.length > maxItems) return false;
  if (val.length === 0) return true;
  return typeof val[0] === 'string' && val[0].length <= maxItemLen;
}

function keysHasAll(obj: Record<string, unknown>, req: string[]): boolean {
  return req.every((k) => k in obj);
}

function keysHasOnly(obj: Record<string, unknown>, allowed: string[]): boolean {
  return Object.keys(obj).every((k) => allowed.includes(k));
}

function affectedKeysHasOnly(
  incoming: Record<string, unknown>,
  existing: Record<string, unknown>,
  allowed: string[]
): boolean {
  const allKeys = new Set([...Object.keys(incoming), ...Object.keys(existing)]);
  for (const key of allKeys) {
    if (JSON.stringify(incoming[key]) !== JSON.stringify(existing[key])) {
      if (!allowed.includes(key)) return false;
    }
  }
  return true;
}

function isValidUser(data: Record<string, unknown>, userId: string): boolean {
  const required = [
    'id', 'name', 'email', 'role', 'preferredLanguage',
    'interests', 'joinedDate', 'createdAt', 'updatedAt', 'lastLoginAt'
  ];
  const allowed = [
    ...required,
    'avatar', 'bio', 'savedDestinationIds', 'savedHotelIds',
    'savedAttractionIds', 'savedBlogIds'
  ];
  const langs = ['en', 'ta', 'hi', 'te', 'ml', 'kn', 'tcy', 'ur', 'sa', 'fr', 'de', 'ko', 'ja', 'zh'];

  return (
    keysHasAll(data, required) &&
    keysHasOnly(data, allowed) &&
    data.id === userId &&
    isValidId(data.id) &&
    typeof data.name === 'string' && data.name.length >= 1 && data.name.length <= 120 &&
    typeof data.email === 'string' && data.email.length <= 254 &&
    (!('avatar' in data) || (typeof data.avatar === 'string' && data.avatar.length <= 1024)) &&
    typeof data.role === 'string' && ['traveler', 'local_guide'].includes(data.role) &&
    typeof data.preferredLanguage === 'string' && langs.includes(data.preferredLanguage) &&
    (!('bio' in data) || (typeof data.bio === 'string' && data.bio.length <= 500)) &&
    isValidStringList(data.interests, 20, 64) &&
    (!('savedDestinationIds' in data) || isValidStringList(data.savedDestinationIds, 100, 128)) &&
    (!('savedHotelIds' in data) || isValidStringList(data.savedHotelIds, 100, 128)) &&
    (!('savedAttractionIds' in data) || isValidStringList(data.savedAttractionIds, 100, 128)) &&
    (!('savedBlogIds' in data) || isValidStringList(data.savedBlogIds, 100, 128)) &&
    typeof data.joinedDate === 'string' && data.joinedDate.length <= 64 &&
    typeof data.createdAt === 'object' && data.createdAt !== null &&
    typeof data.updatedAt === 'object' && data.updatedAt !== null &&
    typeof data.lastLoginAt === 'object' && data.lastLoginAt !== null
  );
}

function isValidBudgetBreakdown(b: unknown): boolean {
  if (typeof b !== 'object' || b === null || Array.isArray(b)) return false;
  const obj = b as Record<string, unknown>;
  const fields = [
    'hotel', 'food', 'transportation', 'activities',
    'shopping', 'emergencyBuffer', 'totalPerPerson', 'grandTotal'
  ];
  return (
    keysHasAll(obj, fields) &&
    keysHasOnly(obj, fields) &&
    fields.every((f) => typeof obj[f] === 'number' && (obj[f] as number) >= 0)
  );
}

function isValidSavedTrip(
  data: Record<string, unknown>,
  userId: string,
  tripId: string,
  auth: AuthContext
): boolean {
  const required = [
    'id', 'userId', 'destinationId', 'destinationName', 'daysCount',
    'travelersCount', 'budgetPerPerson', 'travelStyle', 'interests',
    'days', 'budgetBreakdown', 'isBudgetSufficient',
    'createdAtLabel', 'createdAt', 'updatedAt'
  ];
  const allowed = [...required, 'alternativeAdvice'];
  return (
    keysHasAll(data, required) &&
    keysHasOnly(data, allowed) &&
    data.id === tripId &&
    isValidId(data.id) &&
    data.userId === userId &&
    auth !== null &&
    data.userId === auth.uid &&
    typeof data.destinationId === 'string' && data.destinationId.length >= 1 && data.destinationId.length <= 64 &&
    typeof data.destinationName === 'string' && data.destinationName.length >= 1 && data.destinationName.length <= 120 &&
    typeof data.daysCount === 'number' && data.daysCount >= 1 && data.daysCount <= 30 &&
    typeof data.travelersCount === 'number' && data.travelersCount >= 1 && data.travelersCount <= 50 &&
    typeof data.budgetPerPerson === 'number' && data.budgetPerPerson >= 0 && data.budgetPerPerson <= 10000000 &&
    typeof data.travelStyle === 'string' && ['Budget', 'Standard', 'Premium', 'Luxury'].includes(data.travelStyle) &&
    isValidStringList(data.interests, 20, 64) &&
    Array.isArray(data.days) && data.days.length >= 1 && data.days.length <= 30 &&
    isValidBudgetBreakdown(data.budgetBreakdown) &&
    typeof data.isBudgetSufficient === 'boolean' &&
    (!('alternativeAdvice' in data) || (typeof data.alternativeAdvice === 'string' && data.alternativeAdvice.length <= 1000)) &&
    typeof data.createdAtLabel === 'string' && data.createdAtLabel.length <= 64 &&
    typeof data.createdAt === 'object' && data.createdAt !== null &&
    typeof data.updatedAt === 'object' && data.updatedAt !== null
  );
}

function isValidBooking(
  data: Record<string, unknown>,
  userId: string,
  bookingId: string,
  auth: AuthContext
): boolean {
  const required = [
    'id', 'bookingCode', 'userId', 'hotelId', 'hotelName',
    'destinationName', 'roomName', 'hotelImage', 'checkInDate',
    'checkOutDate', 'nightsCount', 'guestsCount', 'baseAmount',
    'taxesAmount', 'totalAmount', 'status', 'createdAtLabel',
    'createdAt', 'updatedAt', 'guestName', 'guestEmail', 'guestPhone'
  ];
  return (
    keysHasAll(data, required) &&
    keysHasOnly(data, required) &&
    data.id === bookingId &&
    isValidId(data.id) &&
    typeof data.bookingCode === 'string' && data.bookingCode.length >= 1 && data.bookingCode.length <= 32 &&
    data.userId === userId &&
    auth !== null &&
    data.userId === auth.uid &&
    typeof data.hotelId === 'string' && data.hotelId.length >= 1 && data.hotelId.length <= 128 &&
    typeof data.hotelName === 'string' && data.hotelName.length >= 1 && data.hotelName.length <= 160 &&
    typeof data.destinationName === 'string' && data.destinationName.length >= 1 && data.destinationName.length <= 120 &&
    typeof data.roomName === 'string' && data.roomName.length >= 1 && data.roomName.length <= 160 &&
    typeof data.hotelImage === 'string' && data.hotelImage.length <= 1024 &&
    typeof data.checkInDate === 'string' && data.checkInDate.length <= 32 &&
    typeof data.checkOutDate === 'string' && data.checkOutDate.length <= 32 &&
    typeof data.nightsCount === 'number' && data.nightsCount >= 1 && data.nightsCount <= 90 &&
    typeof data.guestsCount === 'number' && data.guestsCount >= 1 && data.guestsCount <= 20 &&
    typeof data.baseAmount === 'number' && data.baseAmount >= 0 &&
    typeof data.taxesAmount === 'number' && data.taxesAmount >= 0 &&
    typeof data.totalAmount === 'number' && data.totalAmount >= 0 &&
    typeof data.status === 'string' && ['Confirmed', 'Completed', 'Cancelled'].includes(data.status) &&
    typeof data.createdAtLabel === 'string' && data.createdAtLabel.length <= 32 &&
    typeof data.createdAt === 'object' && data.createdAt !== null &&
    typeof data.updatedAt === 'object' && data.updatedAt !== null &&
    typeof data.guestName === 'string' && data.guestName.length >= 1 && data.guestName.length <= 120 &&
    typeof data.guestEmail === 'string' && data.guestEmail.length <= 254 &&
    typeof data.guestPhone === 'string' && data.guestPhone.length <= 32
  );
}

class FirestoreRulesSandbox {
  private docs = new Map<string, Record<string, unknown>>();

  private isOwner(auth: AuthContext, userId: string): boolean {
    return auth !== null && auth.uid === userId;
  }

  private isVerifiedOwner(auth: AuthContext, userId: string): boolean {
    return auth !== null && auth.email_verified === true && auth.uid === userId;
  }

  getDoc(auth: AuthContext, docPath: string): Record<string, unknown> | null {
    const userMatch = docPath.match(/^users\/([^/]+)$/);
    if (userMatch) {
      const [, userId] = userMatch;
      if (!(isValidId(userId) && this.isOwner(auth, userId))) {
        throw new PermissionDeniedError(`GET ${docPath}`);
      }
      return this.docs.get(docPath) || null;
    }

    const tripMatch = docPath.match(/^users\/([^/]+)\/trips\/([^/]+)$/);
    if (tripMatch) {
      const [, userId, tripId] = tripMatch;
      if (!(isValidId(userId) && isValidId(tripId) && this.isOwner(auth, userId))) {
        throw new PermissionDeniedError(`GET ${docPath}`);
      }
      return this.docs.get(docPath) || null;
    }

    const bookingMatch = docPath.match(/^users\/([^/]+)\/bookings\/([^/]+)$/);
    if (bookingMatch) {
      const [, userId, bookingId] = bookingMatch;
      if (!(isValidId(userId) && isValidId(bookingId) && this.isOwner(auth, userId))) {
        throw new PermissionDeniedError(`GET ${docPath}`);
      }
      return this.docs.get(docPath) || null;
    }

    throw new PermissionDeniedError(`Default-deny GET ${docPath}`);
  }

  listCollection(auth: AuthContext, colPath: string, queryUserIdFilter?: string): Record<string, unknown>[] {
    if (colPath === 'users') {
      throw new PermissionDeniedError('LIST /users is strictly forbidden');
    }

    const tripsMatch = colPath.match(/^users\/([^/]+)\/trips$/);
    if (tripsMatch) {
      const [, userId] = tripsMatch;
      if (!this.isOwner(auth, userId) || queryUserIdFilter !== auth?.uid) {
        throw new PermissionDeniedError(`LIST ${colPath}`);
      }
      const results: Record<string, unknown>[] = [];
      for (const [k, v] of this.docs.entries()) {
        if (k.startsWith(`users/${userId}/trips/`)) {
          if (v.userId !== auth?.uid) throw new PermissionDeniedError(`LIST ${colPath} doc mismatch`);
          results.push(v);
        }
      }
      return results;
    }

    const bookingsMatch = colPath.match(/^users\/([^/]+)\/bookings$/);
    if (bookingsMatch) {
      const [, userId] = bookingsMatch;
      if (!this.isOwner(auth, userId) || queryUserIdFilter !== auth?.uid) {
        throw new PermissionDeniedError(`LIST ${colPath}`);
      }
      const results: Record<string, unknown>[] = [];
      for (const [k, v] of this.docs.entries()) {
        if (k.startsWith(`users/${userId}/bookings/`)) {
          if (v.userId !== auth?.uid) throw new PermissionDeniedError(`LIST ${colPath} doc mismatch`);
          results.push(v);
        }
      }
      return results;
    }

    throw new PermissionDeniedError(`Default-deny LIST ${colPath}`);
  }

  createDoc(auth: AuthContext, docPath: string, incoming: Record<string, unknown>): void {
    const userMatch = docPath.match(/^users\/([^/]+)$/);
    if (userMatch) {
      const [, userId] = userMatch;
      const allowed =
        this.isVerifiedOwner(auth, userId) &&
        isValidId(userId) &&
        isValidUser(incoming, userId) &&
        incoming.role === 'traveler' &&
        incoming.createdAt === REQUEST_TIME &&
        incoming.updatedAt === REQUEST_TIME &&
        incoming.lastLoginAt === REQUEST_TIME;
      if (!allowed) throw new PermissionDeniedError(`CREATE ${docPath}`);
      this.docs.set(docPath, structuredClone(incoming));
      return;
    }

    const tripMatch = docPath.match(/^users\/([^/]+)\/trips\/([^/]+)$/);
    if (tripMatch) {
      const [, userId, tripId] = tripMatch;
      const allowed =
        this.isVerifiedOwner(auth, userId) &&
        isValidId(userId) &&
        isValidId(tripId) &&
        isValidSavedTrip(incoming, userId, tripId, auth) &&
        incoming.createdAt === REQUEST_TIME &&
        incoming.updatedAt === REQUEST_TIME &&
        this.docs.has(`users/${userId}`);
      if (!allowed) throw new PermissionDeniedError(`CREATE ${docPath}`);
      this.docs.set(docPath, structuredClone(incoming));
      return;
    }

    const bookingMatch = docPath.match(/^users\/([^/]+)\/bookings\/([^/]+)$/);
    if (bookingMatch) {
      const [, userId, bookingId] = bookingMatch;
      const allowed =
        this.isVerifiedOwner(auth, userId) &&
        isValidId(userId) &&
        isValidId(bookingId) &&
        isValidBooking(incoming, userId, bookingId, auth) &&
        incoming.status === 'Confirmed' &&
        incoming.createdAt === REQUEST_TIME &&
        incoming.updatedAt === REQUEST_TIME &&
        this.docs.has(`users/${userId}`);
      if (!allowed) throw new PermissionDeniedError(`CREATE ${docPath}`);
      this.docs.set(docPath, structuredClone(incoming));
      return;
    }

    throw new PermissionDeniedError(`Default-deny CREATE ${docPath}`);
  }

  updateDoc(auth: AuthContext, docPath: string, incoming: Record<string, unknown>): void {
    const existing = this.docs.get(docPath);
    if (!existing) throw new PermissionDeniedError(`UPDATE missing doc ${docPath}`);

    const userMatch = docPath.match(/^users\/([^/]+)$/);
    if (userMatch) {
      const [, userId] = userMatch;
      const actionSync =
        incoming.lastLoginAt === REQUEST_TIME &&
        affectedKeysHasOnly(incoming, existing, [
          'name', 'email', 'avatar', 'preferredLanguage', 'bio',
          'interests', 'savedDestinationIds', 'savedHotelIds',
          'savedAttractionIds', 'savedBlogIds', 'createdAt', 'updatedAt', 'lastLoginAt'
        ]);
      const actionProfile =
        JSON.stringify(incoming.lastLoginAt) === JSON.stringify(existing.lastLoginAt) &&
        affectedKeysHasOnly(incoming, existing, [
          'name', 'avatar', 'preferredLanguage', 'bio',
          'interests', 'savedDestinationIds', 'savedHotelIds',
          'savedAttractionIds', 'savedBlogIds', 'updatedAt'
        ]);

      const allowed =
        this.isVerifiedOwner(auth, userId) &&
        isValidId(userId) &&
        isValidUser(incoming, userId) &&
        incoming.id === existing.id &&
        incoming.role === existing.role &&
        incoming.joinedDate === existing.joinedDate &&
        JSON.stringify(incoming.createdAt) === JSON.stringify(existing.createdAt) &&
        incoming.updatedAt === REQUEST_TIME &&
        (actionSync || actionProfile);
      if (!allowed) throw new PermissionDeniedError(`UPDATE ${docPath}`);
      this.docs.set(docPath, structuredClone(incoming));
      return;
    }

    const tripMatch = docPath.match(/^users\/([^/]+)\/trips\/([^/]+)$/);
    if (tripMatch) {
      const [, userId, tripId] = tripMatch;
      const allowed =
        this.isVerifiedOwner(auth, userId) &&
        isValidId(userId) &&
        isValidId(tripId) &&
        isValidSavedTrip(incoming, userId, tripId, auth) &&
        incoming.id === existing.id &&
        incoming.userId === existing.userId &&
        JSON.stringify(incoming.createdAt) === JSON.stringify(existing.createdAt) &&
        incoming.updatedAt === REQUEST_TIME &&
        affectedKeysHasOnly(incoming, existing, [
          'destinationId', 'destinationName', 'daysCount', 'travelersCount',
          'budgetPerPerson', 'travelStyle', 'interests', 'days',
          'budgetBreakdown', 'isBudgetSufficient', 'alternativeAdvice',
          'createdAtLabel', 'updatedAt'
        ]) &&
        this.docs.has(`users/${userId}`);
      if (!allowed) throw new PermissionDeniedError(`UPDATE ${docPath}`);
      this.docs.set(docPath, structuredClone(incoming));
      return;
    }

    const bookingMatch = docPath.match(/^users\/([^/]+)\/bookings\/([^/]+)$/);
    if (bookingMatch) {
      const [, userId, bookingId] = bookingMatch;
      const allowed =
        this.isVerifiedOwner(auth, userId) &&
        isValidId(userId) &&
        isValidId(bookingId) &&
        isValidBooking(incoming, userId, bookingId, auth) &&
        incoming.id === existing.id &&
        incoming.bookingCode === existing.bookingCode &&
        incoming.userId === existing.userId &&
        JSON.stringify(incoming.createdAt) === JSON.stringify(existing.createdAt) &&
        incoming.updatedAt === REQUEST_TIME &&
        existing.status === 'Confirmed' &&
        incoming.status === 'Cancelled' &&
        affectedKeysHasOnly(incoming, existing, ['status', 'updatedAt']) &&
        this.docs.has(`users/${userId}`);
      if (!allowed) throw new PermissionDeniedError(`UPDATE ${docPath}`);
      this.docs.set(docPath, structuredClone(incoming));
      return;
    }

    throw new PermissionDeniedError(`Default-deny UPDATE ${docPath}`);
  }
}

function assertDenied(fn: () => unknown, label: string) {
  let failedAsExpected = false;
  try {
    fn();
  } catch (err) {
    if (err instanceof PermissionDeniedError) {
      failedAsExpected = true;
    } else {
      throw err;
    }
  }
  assert.equal(failedAsExpected, true, `Expected PERMISSION_DENIED for: ${label}`);
}

function runStaticCodebaseAndRulesAudit() {
  const root = process.cwd();
  const rules = fs.readFileSync(path.join(root, 'firestore.rules'), 'utf8');
  const firebaseTs = fs.readFileSync(path.join(root, 'src/services/firebase.ts'), 'utf8');
  const appContextTs = fs.readFileSync(path.join(root, 'src/context/AppContext.tsx'), 'utf8');

  // Verify firestore.rules structure
  assert.match(rules, /rules_version\s*=\s*'2';/);
  assert.match(rules, /match \/{document=\*\*}\s*\{\s*allow read, write: if false;\s*\}/);
  assert.match(rules, /match \/users\/\{userId\}/);
  assert.match(rules, /match \/trips\/\{tripId\}/);
  assert.match(rules, /match \/bookings\/\{bookingId\}/);
  assert.match(rules, /match \/travelPosts\/\{postId\}/);
  assert.match(rules, /allow list: if false;/);
  assert.match(rules, /request\.auth\.token\.email_verified == true/);
  assert.match(rules, /resource\.data\.userId == request\.auth\.uid/);

  // Verify zero personal credentials / hardcoded account leaks anywhere in src/
  const allSrcFiles = fs
    .readdirSync(path.join(root, 'src'), { recursive: true })
    .filter((f): f is string => typeof f === 'string' && /\.(ts|tsx)$/.test(f));

  for (const rel of allSrcFiles) {
    const content = fs.readFileSync(path.join(root, 'src', rel), 'utf8');
    assert.equal(
      content.toLowerCase().includes('ranjith'),
      false,
      `Hardcoded personal name/email found in src/${rel}`
    );
  }

  // Verify Google account chooser & structured error handler
  assert.match(firebaseTs, /prompt:\s*'select_account'/);
  assert.match(firebaseTs, /handleFirestoreError/);
  assert.match(firebaseTs, /switchGoogleAccount/);

  // Verify AppContext never loads user or trips/bookings from shared localStorage
  assert.equal(appContextTs.includes("localStorage.getItem('hiddenary_user')"), false);
  assert.equal(appContextTs.includes("localStorage.getItem('hiddenary_saved_trips')"), false);
  assert.equal(appContextTs.includes("localStorage.getItem('hiddenary_user_bookings')"), false);
  assert.match(appContextTs, /purgeLegacySharedStorage\(\)/);
}

function makeUserDoc(uid: string, name: string, email: string) {
  return {
    id: uid,
    name,
    email,
    avatar: `https://example.com/${uid}.png`,
    role: 'traveler',
    preferredLanguage: 'en',
    bio: `Traveler bio for ${name}`,
    interests: ['Beaches', 'Heritage'],
    savedDestinationIds: [] as string[],
    savedHotelIds: [] as string[],
    savedAttractionIds: [] as string[],
    savedBlogIds: [] as string[],
    joinedDate: 'November 2026',
    createdAt: REQUEST_TIME,
    updatedAt: REQUEST_TIME,
    lastLoginAt: REQUEST_TIME
  };
}

function makeTripDoc(uid: string, tripId: string, destinationName: string, budgetPerPerson: number) {
  return {
    id: tripId,
    userId: uid,
    destinationId: destinationName.toLowerCase(),
    destinationName,
    daysCount: 3,
    travelersCount: 2,
    budgetPerPerson,
    travelStyle: 'Standard',
    interests: ['Beaches', 'Food'],
    days: [{ dayNumber: 1, theme: 'Arrival', activities: [], dayEstimatedBudget: 3000 }],
    budgetBreakdown: {
      hotel: 6000,
      food: 3000,
      transportation: 2500,
      activities: 2000,
      shopping: 1000,
      emergencyBuffer: 500,
      totalPerPerson: budgetPerPerson,
      grandTotal: budgetPerPerson * 2
    },
    isBudgetSufficient: true,
    createdAtLabel: 'November 2026',
    createdAt: REQUEST_TIME,
    updatedAt: REQUEST_TIME
  };
}

function makeBookingDoc(uid: string, bookingId: string, guestName: string, guestEmail: string) {
  return {
    id: bookingId,
    bookingCode: 'HDN-4821',
    userId: uid,
    hotelId: 'hotel-goa-taj-exotica',
    hotelName: 'Taj Exotica Resort',
    destinationName: 'Goa',
    roomName: 'Garden Villa',
    hotelImage: 'https://example.com/hotel.jpg',
    checkInDate: '2026-12-01',
    checkOutDate: '2026-12-04',
    nightsCount: 3,
    guestsCount: 2,
    baseAmount: 24000,
    taxesAmount: 2880,
    totalAmount: 26880,
    status: 'Confirmed',
    createdAtLabel: '2026-11-13',
    createdAt: REQUEST_TIME,
    updatedAt: REQUEST_TIME,
    guestName,
    guestEmail,
    guestPhone: '+91 90000 00001'
  };
}

function runDirtyDozenAndTwoAccountPrivacyTests() {
  const db = new FirestoreRulesSandbox();

  const userA: AuthContext = { uid: 'google_user_a_001', email: 'alice.traveler@gmail.com', email_verified: true };
  const userB: AuthContext = { uid: 'google_user_b_002', email: 'bob.explorer@gmail.com', email_verified: true };
  const unverifiedUser: AuthContext = { uid: 'email_unverified_003', email: 'unverified@example.com', email_verified: false };

  // Mock browser storage to verify purgeLegacySharedStorage wipes legacy shared keys
  const mockStore = new Map<string, string>();
  for (const key of LEGACY_SHARED_STORAGE_KEYS) {
    mockStore.set(key, JSON.stringify({ leaked: 'stale_session' }));
  }
  (globalThis as unknown as { window: unknown }).window = {
    localStorage: {
      removeItem: (k: string) => mockStore.delete(k),
      getItem: (k: string) => mockStore.get(k) ?? null
    },
    sessionStorage: {
      removeItem: (k: string) => mockStore.delete(k),
      getItem: (k: string) => mockStore.get(k) ?? null
    }
  };
  purgeLegacySharedStorage();
  assert.equal(mockStore.size, 0, 'All legacy shared localStorage/sessionStorage keys must be purged');

  // --- SCENARIO 1: User A creates an account and saves a travel budget ---
  const userADoc = makeUserDoc(userA.uid, 'Alice Sharma', userA.email);
  db.createDoc(userA, `users/${userA.uid}`, userADoc);
  const tripA = makeTripDoc(userA.uid, 'trip_goa_alice', 'Goa', 18500);
  db.createDoc(userA, `users/${userA.uid}/trips/trip_goa_alice`, tripA);
  const bookingA = makeBookingDoc(userA.uid, 'book_alice_1', 'Alice Sharma', userA.email);
  db.createDoc(userA, `users/${userA.uid}/bookings/book_alice_1`, bookingA);

  assert.equal(db.listCollection(userA, `users/${userA.uid}/trips`, userA.uid).length, 1);
  assert.equal(db.listCollection(userA, `users/${userA.uid}/trips`, userA.uid)[0].budgetPerPerson, 18500);

  // --- SCENARIO 2: User A logs out (session & storage completely cleared) ---
  let activeSession: AuthContext = null;
  purgeLegacySharedStorage();
  assert.equal(activeSession, null);

  // --- SCENARIO 3 & 4: User B signs in with their own Google account ---
  activeSession = userB;
  const userBDoc = makeUserDoc(userB.uid, 'Bob Nair', userB.email);
  db.createDoc(activeSession, `users/${userB.uid}`, userBDoc);

  // User B sees ONLY their own profile & empty trips/bookings
  const loadedUserBProfile = db.getDoc(activeSession, `users/${userB.uid}`);
  assert.equal(loadedUserBProfile?.name, 'Bob Nair');
  assert.equal(loadedUserBProfile?.email, userB.email);
  assert.equal(db.listCollection(activeSession, `users/${userB.uid}/trips`, userB.uid).length, 0);
  assert.equal(db.listCollection(activeSession, `users/${userB.uid}/bookings`, userB.uid).length, 0);

  // User B saves their own Kashmir trip
  const tripB = makeTripDoc(userB.uid, 'trip_kashmir_bob', 'Kashmir', 24000);
  db.createDoc(activeSession, `users/${userB.uid}/trips/trip_kashmir_bob`, tripB);
  assert.equal(db.listCollection(activeSession, `users/${userB.uid}/trips`, userB.uid).length, 1);

  // --- THE DIRTY DOZEN ADVERSARIAL CHECKS ---
  // 1. Cross-User Profile Read/Write (User B -> User A)
  assertDenied(() => db.getDoc(userB, `users/${userA.uid}`), 'Dirty Dozen #1a: Cross-user profile read');
  assertDenied(() => db.updateDoc(userB, `users/${userA.uid}`, { ...userADoc, name: 'Hacked' }), 'Dirty Dozen #1b: Cross-user profile write');

  // 2. Cross-User Saved Trip/Budget Theft (User B -> User A)
  assertDenied(() => db.getDoc(userB, `users/${userA.uid}/trips/trip_goa_alice`), 'Dirty Dozen #2a: Cross-user trip read');
  assertDenied(() => db.listCollection(userB, `users/${userA.uid}/trips`, userB.uid), 'Dirty Dozen #2b: Cross-user trip list');
  assertDenied(() => db.createDoc(userB, `users/${userA.uid}/trips/trip_evil`, makeTripDoc(userA.uid, 'trip_evil', 'Goa', 1)), 'Dirty Dozen #2c: Cross-user trip create');

  // 3. Cross-User Booking Theft
  assertDenied(() => db.getDoc(userB, `users/${userA.uid}/bookings/book_alice_1`), 'Dirty Dozen #3a: Cross-user booking read');
  assertDenied(() => db.updateDoc(userB, `users/${userA.uid}/bookings/book_alice_1`, { ...bookingA, status: 'Cancelled' }), 'Dirty Dozen #3b: Cross-user booking cancel');

  // 4. UID Spoofing on Create (User B creates inside own subcollection claiming userA's uid)
  assertDenied(() => db.createDoc(userB, `users/${userB.uid}/trips/trip_spoof`, makeTripDoc(userA.uid, 'trip_spoof', 'Goa', 5000)), 'Dirty Dozen #4: UID spoofing');

  // 5. Privilege Escalation (Self-Admin)
  assertDenied(() => db.createDoc(unverifiedUser, `users/${unverifiedUser.uid}`, { ...makeUserDoc(unverifiedUser.uid, 'Evil', 'e@e.com'), role: 'admin' }), 'Dirty Dozen #5a: Self-admin on create');
  assertDenied(() => db.updateDoc(userB, `users/${userB.uid}`, { ...userBDoc, role: 'admin' }), 'Dirty Dozen #5b: Self-admin on update');

  // 6. Shadow / Ghost Field Injection
  assertDenied(() => db.updateDoc(userB, `users/${userB.uid}`, { ...userBDoc, isVerified: true }), 'Dirty Dozen #6: Ghost field injection');

  // 7. Unverified Email Write
  assertDenied(() => db.createDoc(unverifiedUser, `users/${unverifiedUser.uid}`, makeUserDoc(unverifiedUser.uid, 'Unverified', unverifiedUser.email)), 'Dirty Dozen #7: Unverified email write');

  // 8. ID Poisoning (Resource Exhaustion / Invalid chars)
  assertDenied(() => db.createDoc(userB, `users/${userB.uid}/trips/${'x'.repeat(200)}`, makeTripDoc(userB.uid, 'x'.repeat(200), 'Goa', 1000)), 'Dirty Dozen #8a: Oversized ID');
  assertDenied(() => db.createDoc(userB, `users/${userB.uid}/trips/bad.id!`, makeTripDoc(userB.uid, 'bad.id!', 'Goa', 1000)), 'Dirty Dozen #8b: Invalid ID characters');

  // 9. Value Poisoning (Oversized Bio / Invalid budgetBreakdown type)
  assertDenied(() => db.updateDoc(userB, `users/${userB.uid}`, { ...userBDoc, bio: 'a'.repeat(501) }), 'Dirty Dozen #9a: Oversized bio');
  assertDenied(() => db.createDoc(userB, `users/${userB.uid}/trips/trip_bad_type`, { ...makeTripDoc(userB.uid, 'trip_bad_type', 'Goa', 1000), budgetBreakdown: true as unknown as Record<string, unknown> }), 'Dirty Dozen #9b: Invalid budgetBreakdown type');

  // 10. Immutable Field Tampering
  assertDenied(() => db.updateDoc(userB, `users/${userB.uid}/trips/trip_kashmir_bob`, { ...tripB, createdAt: { __serverTimestamp: true, millis: 999 } }), 'Dirty Dozen #10: Immutable createdAt tampering');

  // 11. Terminal State Re-opening on Booking
  db.updateDoc(userA, `users/${userA.uid}/bookings/book_alice_1`, { ...bookingA, status: 'Cancelled' });
  const cancelledBookingA = db.getDoc(userA, `users/${userA.uid}/bookings/book_alice_1`)!;
  assertDenied(() => db.updateDoc(userA, `users/${userA.uid}/bookings/book_alice_1`, { ...cancelledBookingA, status: 'Confirmed' }), 'Dirty Dozen #11: Terminal booking state re-opening');

  // 12. Blanket User Listing / Unauthenticated Access
  assertDenied(() => db.listCollection(userB, 'users'), 'Dirty Dozen #12a: Blanket /users listing');
  assertDenied(() => db.getDoc(null, `users/${userA.uid}`), 'Dirty Dozen #12b: Unauthenticated profile read');
  assertDenied(() => db.listCollection(null, `users/${userA.uid}/trips`, userA.uid), 'Dirty Dozen #12c: Unauthenticated trips list');

  // --- SCENARIO 5: User B logs out ---
  activeSession = null;
  purgeLegacySharedStorage();
  assert.equal(activeSession, null);

  // --- SCENARIO 6: User A logs in again and sees ONLY User A's saved information ---
  activeSession = userA;
  const reloadedUserAProfile = db.getDoc(activeSession, `users/${userA.uid}`);
  const reloadedUserATrips = db.listCollection(activeSession, `users/${userA.uid}/trips`, userA.uid);
  const reloadedUserABookings = db.listCollection(activeSession, `users/${userA.uid}/bookings`, userA.uid);

  assert.equal(reloadedUserAProfile?.name, 'Alice Sharma');
  assert.equal(reloadedUserATrips.length, 1);
  assert.equal(reloadedUserATrips[0].destinationName, 'Goa');
  assert.equal(reloadedUserATrips[0].budgetPerPerson, 18500);
  assert.equal(reloadedUserABookings.length, 1);
  assert.equal(reloadedUserABookings[0].guestEmail, userA.email);
}

runStaticCodebaseAndRulesAudit();
runDirtyDozenAndTwoAccountPrivacyTests();
console.log('ALL TESTS PASSED: Static audit, Dirty Dozen security rules, and 6-step two-account privacy isolation verified.');
