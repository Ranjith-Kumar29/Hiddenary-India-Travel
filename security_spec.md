# Hiddenary Firestore Security Specification

## 1. Data Invariants
1. **Strict Owner Isolation (PII & Private State)**: `/users/{userId}`, `/users/{userId}/trips/{tripId}`, and `/users/{userId}/bookings/{bookingId}` can ONLY be read, listed, created, updated, or deleted when `request.auth != null && request.auth.uid == userId`.
2. **Verified Email Mandate**: All write operations (`create`, `update`, `delete`) require `request.auth.token.email_verified == true`.
3. **Master Gate Integrity**: No `SavedTrip` or `Booking` subcollection document can be created, updated, or deleted unless the parent `/users/{userId}` document exists (`exists(...)`), and `incoming().userId == userId == request.auth.uid`.
4. **No Self-Assigned Privileges**: New `/users/{userId}` documents must initialize `role == 'traveler'`, and `role` cannot be escalated by the user during updates.
5. **Strict Key & Size Enforcement (Anti-Shadow / Anti-DoW)**: Every document enforces `keys().hasAll(...)` and `keys().hasOnly(...)` on create, `affectedKeys().hasOnly(...)` on update, `isValidId()` regex (`^[a-zA-Z0-9_\-]+$`, `<= 128` chars), bounded string `.size()` limits, and bounded array `.size()` limits.
6. **Temporal Integrity**: Client timestamps are never trusted; `createdAt == request.time` on create, `createdAt == existing().createdAt` (immutable) and `updatedAt == request.time` on update.
7. **Terminal State Locking**: Once a `Booking` reaches `Cancelled` or `Completed`, no further client updates are permitted; only `Confirmed -> Cancelled` is allowed for the owner.
8. **Public Feed PII Isolation**: `/travelPosts/{postId}` strictly forbids PII fields (`email`, `phone`, `address`) via `hasOnly(...)` allowlisting and locks post mutations/deletes to `existing().userId == request.auth.uid`.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Cross-User Profile Read/Write**: User B (`uid: user_b`) attempts `get` or `set` on `/users/user_a`. -> `PERMISSION_DENIED`.
2. **Cross-User Saved Trip/Budget Theft**: User B (`uid: user_b`) attempts `get`, `list`, `create`, `update`, or `delete` on `/users/user_a/trips/trip_1`. -> `PERMISSION_DENIED`.
3. **Cross-User Booking Theft**: User B (`uid: user_b`) attempts to read or cancel `/users/user_a/bookings/book_1`. -> `PERMISSION_DENIED`.
4. **UID Spoofing on Create**: User B (`uid: user_b`) creates `/users/user_b/trips/trip_2` with `userId: "user_a"`. -> `PERMISSION_DENIED`.
5. **Privilege Escalation (Self-Admin)**: User A creates or updates `/users/user_a` with `role: "admin"`. -> `PERMISSION_DENIED`.
6. **Shadow / Ghost Field Injection**: User A includes an unexpected key `isVerified: true` or `adminOverride: true` in `/users/user_a` or `/users/user_a/trips/trip_1`. -> `PERMISSION_DENIED`.
7. **Unverified Email Write**: An authenticated user with `email_verified: false` attempts to write `/users/{uid}/trips/trip_1` or `/travelPosts/post_1`. -> `PERMISSION_DENIED`.
8. **ID Poisoning (Resource Exhaustion)**: User A attempts to create a document with a 2KB ID or invalid characters (`../admin`). -> `PERMISSION_DENIED`.
9. **Value Poisoning (Oversized String / Invalid Type)**: User A updates `/users/user_a` with a 5,000-character `bio` (`> 500` limit) or sets `budgetBreakdown` to a boolean. -> `PERMISSION_DENIED`.
10. **Immutable Field Tampering**: User A attempts to change `createdAt` or `id` or `userId` during an update of a saved trip. -> `PERMISSION_DENIED`.
11. **Terminal State Re-opening**: User A attempts to update a `Cancelled` booking back to `Confirmed`. -> `PERMISSION_DENIED`.
12. **Blanket User Listing / Unauthenticated Access**: An unauthenticated user or User B attempts to `list` `/users` or `/users/user_a/trips`. -> `PERMISSION_DENIED`.
