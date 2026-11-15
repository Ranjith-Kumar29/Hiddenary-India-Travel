import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { HotelBookingModal } from './components/modals/HotelBookingModal';
import { HotelDetailsModal } from './components/modals/HotelDetailsModal';
import { AttractionDetailsModal } from './components/modals/AttractionDetailsModal';
import { DestinationDetailsModal } from './components/modals/DestinationDetailsModal';
import { LoadingScreen } from './components/common/LoadingScreen';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HotelsPage } from './pages/HotelsPage';
import { AttractionsPage } from './pages/AttractionsPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { TravelFeedPage } from './pages/TravelFeedPage';
import { BlogsPage } from './pages/BlogsPage';
import { FoodGuidePage } from './pages/FoodGuidePage';
import { HiddenGemsPage } from './pages/HiddenGemsPage';
import { SavedPage } from './pages/SavedPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';

// Data lookups for modals
import { DESTINATIONS_DATA } from './data/destinationsData';
import { HOTELS_DATA } from './data/hotelsData';
import { ATTRACTIONS_DATA } from './data/attractionsData';

const MainRouter: React.FC = () => {
  const {
    activePage,
    selectedDestinationId,
    selectedHotelId,
    selectedAttractionId,
    bookingHotel,
    closeBookingModal,
    navigate,
    currentUser,
    isAuthLoading,
    isGuestMode,
    setGuestMode
  } = useApp();

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  // If unauthenticated and not exploring as guest, show the dedicated Login / Sign Up portal
  if (!currentUser && !isGuestMode) {
    return (
      <LoginPage
        onContinueAsGuest={() => setGuestMode(true)}
      />
    );
  }

  // Find active entity objects for opened detail modals
  const activeDestination = selectedDestinationId
    ? DESTINATIONS_DATA.find(d => d.id === selectedDestinationId) || null
    : null;

  const activeHotel = selectedHotelId
    ? HOTELS_DATA.find(h => h.id === selectedHotelId) || null
    : null;

  const activeAttraction = selectedAttractionId
    ? ATTRACTIONS_DATA.find(a => a.id === selectedAttractionId) || null
    : null;

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExplorePage />;
      case 'hotels':
        return <HotelsPage />;
      case 'attractions':
        return <AttractionsPage />;
      case 'trip-planner':
        return <TripPlannerPage />;
      case 'feed':
        return <TravelFeedPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'food':
        return <FoodGuidePage />;
      case 'hidden-gems':
        return <HiddenGemsPage />;
      case 'saved':
        return <SavedPage />;
      case 'my-trips':
      case 'bookings':
        return <MyTripsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'login':
        return <LoginPage onContinueAsGuest={() => setGuestMode(true)} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FE] text-[#102B4E] selection:bg-[#42B9F5]/25 selection:text-[#102B4E]">
      {/* Sticky Primary Header */}
      <Navbar />

      {/* Guest Mode Notice Banner */}
      {!currentUser && isGuestMode && (
        <div className="bg-[#EAF5FD] border-b border-[#42B9F5]/40 px-4 py-2 text-xs text-[#102B4E] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 max-w-2xl truncate">
            <span className="w-2 h-2 rounded-full bg-[#0879C9] shrink-0" />
            <span className="truncate">
              Browsing Hiddenary in Preview Mode. Sign In or Create an Account to save destinations and manage hotel bookings.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setGuestMode(false)}
              className="px-2.5 py-1 text-[11px] font-bold bg-[#0879C9] hover:bg-[#0662A6] text-white rounded-md transition-colors cursor-pointer"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Main Page Body */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav />

      {/* Global Modals */}
      <GlobalSearchModal />
      <AuthModal />

      {/* Booking Checkout Modal */}
      {bookingHotel && (
        <HotelBookingModal
          hotel={bookingHotel}
          onClose={closeBookingModal}
        />
      )}

      {/* Hotel Details Modal */}
      {activeHotel && (
        <HotelDetailsModal
          hotel={activeHotel}
          onClose={() => navigate(activePage, { hotelId: undefined })}
        />
      )}

      {/* Attraction Details Modal */}
      {activeAttraction && (
        <AttractionDetailsModal
          attraction={activeAttraction}
          onClose={() => navigate(activePage, { attractionId: undefined })}
        />
      )}

      {/* Destination Details Modal */}
      {activeDestination && (
        <DestinationDetailsModal
          destination={activeDestination}
          onClose={() => navigate(activePage, { destinationId: undefined })}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
