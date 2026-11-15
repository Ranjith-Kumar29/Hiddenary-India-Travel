# Hiddenary - Travel & Tourism Portal for India

> **"Discover India. Plan Better. Travel Smarter."**  
> An enterprise-grade, modern, and responsive commercial travel tech web application for exploring destinations, booking heritage stays, discovering local culinary treasures, and generating custom day-by-day itineraries across Bharat.

---

## 🌟 Key Features

### 1. Comprehensive India-Wide Destination Coverage

<img width="1906" height="891" alt="Screenshot 2026-11-15 192311" src="https://github.com/user-attachments/assets/f24b35d6-93a0-4139-a47d-f15dcae0597e" />


- **20+ Curated Indian Destinations**: Goa, Kerala, Chennai, Ooty, Coorg, Bengaluru, Hyderabad, Mumbai, Delhi, Jaipur, Udaipur, Agra, Varanasi, Manali, Kashmir, Andaman & Nicobar, Mysuru, Puducherry, Rishikesh, and Darjeeling.
- **Deep Destination Dashboards**: Cultural epithets, historical rulers & dynasties, best seasons (peak & off-season), crowd levels, live demo temperatures, 4-day forecasts, and peak hour timelines.
- **High-Resolution Photography**: Hero visual showcases and photo galleries with built-in Lightbox viewer.

### 2. Smart Trip Planner & Budget Calculator
- **Step-by-Step Wizard**: Destination, duration (1–7 days), party size (Solo, Couple, Family, Group), budget range, travel style (Budget, Standard, Premium, Luxury), and 10+ focus interests.
- **Dynamic Morning-to-Night Schedule**: Detailed activities with timings, locations, entry fees, recommended food dishes, and local transit tips.
- **Itemized Budget Breakdown**: Transparent expense calculator for Stays, Food, Transportation, Activities, Shopping, and Emergency buffer with low-budget advisory notices.
- **1-Click Save**: Store generated itineraries directly to *My Trips*.

<img width="1912" height="898" alt="Screenshot 2026-11-15 192351" src="https://github.com/user-attachments/assets/8d453502-d911-41c5-99e5-5a5315d02bf2" />


### 3. Hotels & Heritage Stays Discovery
- **Flipkart/Amazon-Style Filter Sidebar**: Filter by Budget range (< ₹2.5k, ₹2.5k–₹5k, ₹5k–₹10k, ₹10k+), Guest Rating (4+, 4.5+, 4.8+), Property Type (Luxury, Resort, Hotel, Homestay, Hostel), Brand (Taj, Marriott/ITC, Heritage Haven, Zostel), and Amenities (Pool, Breakfast, Wi-Fi, Gym, Spa, AC).
- **Interactive Booking Checkout**: Select room categories (Deluxe, Suite, Villa), choose check-in/out dates, guest counts, and receive an instant demo booking receipt with a unique Booking Code.
- **Direct Hotel Contact**: Simulated front-desk calling, emailing, and inquiry message dispatch.

<img width="1906" height="900" alt="Screenshot 2026-11-15 192530" src="https://github.com/user-attachments/assets/cb452538-dc97-4117-b216-b87e3b65322e" />


### 4. Monuments & Sightseeing Directory
- Detailed attraction cards covering opening/closing hours, entry ticket costs (domestic vs foreigner), peak visitor windows, and recommended stay duration.
- Historical narratives, architectural significance, and nearby restaurants and hotels.

### 5. Regional Food Guides ("Flavours of Bharat")
- Destination-specific culinary guides (Goan Fish Curry & Bebinca, Chennai Filter Kaapi & Ghee Podi Idli, Kerala Sadya & Appam, Mumbai Vada Pav, Hyderabadi Dum Biryani, Rajasthani Dal Baati Churma).
- Approximate pricing, dietary tags (Pure Veg 🟢 / Non-Veg 🔴), and legendary eateries where each dish is celebrated.

### 6. Secret Hidden Gems
- Uncrowded, off-the-beaten-path locations (Chorao Island mangroves, Marari fishing cove, Chand Baori stepwell, Pulicat Lake flamingos, Malana ancient village).
- Tagged with *"Not a tourist hotspot"* badges, trekking difficulty, and estimated excursion budgets.

### 7. Mini Social Travel Feed & "For You" Recommendations
- Social feed with traveler photos, captions, destination tags, likes, and comment threads.
- In-app **"+ Share Travel Memory"** modal to publish custom travel snapshots.
- Algorithmic *"For You"* section recommending destinations and stays based on saved favorites.

### 8. Multilingual Architecture (i18n)
- Language selector supporting 14 languages: **English**, **Tamil (தமிழ்)**, **Hindi (हिन्दी)**, Telugu, Malayalam, Kannada, Tulu, Urdu, Sanskrit, French, German, Japanese, Korean, and Mandarin.
- Core UI strings fully translated into English, Tamil, and Hindi with fallback mechanisms.

### 9. Saved & Offline Experience
- Universal heart/bookmark save on any destination, hotel, attraction, or blog.
- **Local Storage Persistence**: All saved items, bookings, custom itineraries, and posts persist across page reloads.
- Built-in **Offline Cache Indicator** with a toggle to test simulated offline browsing.

---

## 🛠 Tech Stack

- **Framework**: React 19 (Functional components, Hooks, Context API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Build Tool**: Vite 8
- **Typography**: Plus Jakarta Sans & Playfair Display

---

## 📂 Project Structure

```
hiddenary/
├── public/
├── src/
│   ├── components/
│   │   ├── cards/          # DestinationCard, HotelCard, AttractionCard, FoodCard, BlogCard, FeedPostCard, HiddenGemCard
│   │   ├── common/         # ImageLightbox, OfflineBadge, RatingStars, DemoDataBadge
│   │   ├── layout/         # Navbar, MobileBottomNav, Footer, GlobalSearchModal, NotificationDrawer, LanguageSelectorModal
│   │   ├── map/            # LiveMapDashboard (tactical map with traffic and amenity pins)
│   │   ├── modals/         # HotelBookingModal, HotelDetailsModal, AttractionDetailsModal, DestinationDetailsModal, ContactHotelModal, WriteReviewModal, NewPostModal, AuthModal
│   │   └── planner/        # SmartTripPlanner, BudgetBreakdown
│   ├── context/
│   │   └── AppContext.tsx  # Central state management & localStorage synchronization
│   ├── data/
│   │   ├── destinationsData.ts   # 20+ comprehensive destination seed datasets
│   │   ├── hotelsData.ts         # Verified hotel records with room options
│   │   ├── attractionsData.ts    # Attractions with timings and fees
│   │   ├── foodData.ts           # Regional culinary dishes
│   │   ├── hiddenGemsData.ts     # Off-beat secret spots
│   │   ├── blogsData.ts          # Travel blogs & insider guides
│   │   ├── feedPostsData.ts      # Social feed seed posts
│   │   └── translations.ts       # Multilingual i18n dictionary
│   ├── types/
│   │   └── travel.ts       # Core TypeScript interfaces
│   ├── App.tsx             # Main router, modal manager, and application wrapper
│   ├── index.css           # Tailwind CSS imports & custom typography
│   └── main.tsx            # React DOM mounting
├── index.html              # HTML entry with metadata and Google Fonts
├── metadata.json           # Applet configuration
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd hiddenary

# Install dependencies
npm install

# Start local development server (runs on port 3000)
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🚢 Quick Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset: **Vite**.
5. Click **"Deploy"**.

### Option 2: Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/` containing `/* /index.html 200` for client-side routing.
5. Deploy site.

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to 'dist'
# Configure as single-page app: Yes
npm run build
firebase deploy --only hosting
```

---

## 🔌 Real API Integration Ready

The codebase is deliberately organized to allow rapid plug-and-play connection to real cloud services:
- **Google Maps Platform / Mapbox**: Replace the SVG vector grid in `src/components/map/LiveMapDashboard.tsx` with `@react-google-maps/api` or `mapbox-gl`.
- **Weather & Live Traffic**: Connect `src/data/destinationsData.ts` weather properties to OpenWeatherMap or Tomorrow.io.
- **Firebase Authentication**: Swap mock login in `src/context/AppContext.tsx` with `signInWithEmailAndPassword` / `signInWithPopup(auth, googleProvider)`.
- **Payment Gateway**: Replace the mock checkout handler in `src/components/modals/HotelBookingModal.tsx` with Razorpay / Stripe checkout scripts.
