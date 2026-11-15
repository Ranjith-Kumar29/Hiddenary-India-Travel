export const LEGACY_SHARED_STORAGE_KEYS = [
  'hiddenary_user',
  'bharatyatra_user',
  'hiddenary_lang',
  'bharatyatra_lang',
  'hiddenary_saved_destinations',
  'bharatyatra_saved_destinations',
  'hiddenary_saved_hotels',
  'bharatyatra_saved_hotels',
  'hiddenary_saved_attractions',
  'bharatyatra_saved_attractions',
  'hiddenary_saved_blogs',
  'bharatyatra_saved_blogs',
  'hiddenary_saved_trips',
  'bharatyatra_saved_trips',
  'hiddenary_user_bookings',
  'bharatyatra_user_bookings',
  'hiddenary_feed_posts',
  'bharatyatra_feed_posts',
  'hiddenary_notifications',
  'bharatyatra_notifications'
] as const;

export function purgeLegacySharedStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    for (const key of LEGACY_SHARED_STORAGE_KEYS) {
      window.localStorage?.removeItem(key);
      window.sessionStorage?.removeItem(key);
    }
  } catch {
    // Ignore storage access errors in restricted contexts
  }
}
