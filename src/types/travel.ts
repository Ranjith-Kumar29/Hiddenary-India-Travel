export type LanguageCode = 
  | 'en' 
  | 'ta' 
  | 'hi' 
  | 'te' 
  | 'ml' 
  | 'kn' 
  | 'tcy' 
  | 'ur' 
  | 'sa' 
  | 'fr' 
  | 'de' 
  | 'ko' 
  | 'ja' 
  | 'zh';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'traveler' | 'local_guide' | 'admin';
  preferredLanguage: LanguageCode;
  bio?: string;
  interests: string[];
  joinedDate: string;
  emailVerified?: boolean;
}

export interface WeatherInfo {
  temp: number;
  condition: string; // 'Sunny' | 'Partly Cloudy' | 'Misty' | 'Rainy' | 'Pleasant'
  rainProbability: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
  }[];
}

export interface EmergencyContact {
  type: 'Hospital' | 'Police' | 'Pharmacy' | 'Tourist Helpline' | 'Bus Stop' | 'ATM';
  name: string;
  distance: string;
  phone: string;
  address: string;
  isOpen24x7: boolean;
  rating?: number;
}

export interface TransitOption {
  type: 'Flight' | 'Train' | 'Bus' | 'Taxi/Cab' | 'Metro' | 'Auto';
  hubName: string;
  distance: string;
  estimatedTime: string;
  estimatedCost: string;
  frequency: string;
}

export interface FoodItem {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  image: string;
  description: string;
  approxPrice: string;
  whereToTry: string;
  rating: number;
  isVegetarian?: boolean;
}

export interface HiddenGem {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  image: string;
  description: string;
  bestTime: string;
  estimatedBudget: string;
  crowdLevel: 'Very Low' | 'Low' | 'Medium';
  travelDifficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlight: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  description: string;
  rating: number;
  reviewsCount: number;
  startingBudget: number; // in INR
  bestTime: {
    months: string;
    peakSeason: string;
    offSeason: string;
  };
  recommendedDuration: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
  trafficStatus: 'Low' | 'Moderate' | 'Heavy';
  peakHours: string;
  weather: WeatherInfo;
  culture: {
    epithet: string;
    heritageKing: string;
    festivals: string[];
    traditions: string;
    famousFor: string[];
  };
  emergencyServices: EmergencyContact[];
  transportation: TransitOption[];
  isTrending?: boolean;
  travelerCount?: string;
}

export interface RoomOption {
  id: string;
  name: string;
  pricePerNight: number;
  capacity: string;
  bedType: string;
  sizeSqFt: number;
  amenities: string[];
  availableCount: number;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  images?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  roomAvailability: number;
  hygieneIndicator: number; // e.g. 4.9 out of 5
  distance: string;
  hotelType: 'Hotel' | 'Resort' | 'Hostel' | 'Homestay' | 'Villa' | 'Luxury';
  brand: string;
  amenities: string[]; // ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC', 'Family rooms']
  rooms: RoomOption[];
  description: string;
  locationAddress: string;
  contact: {
    phone: string;
    email: string;
    receptionHours: string;
  };
  reviews: Review[];
  transitTimes: {
    fromAirport?: string;
    fromRailway?: string;
    estimatedCabFare?: string;
  };
}

export interface Attraction {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  category: 'Heritage' | 'Nature' | 'Beach' | 'Spiritual' | 'Adventure' | 'Cultural';
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  entryFee: string; // e.g. '₹200' or 'Free'
  openingTime: string; // e.g. '08:00 AM'
  closingTime: string; // e.g. '06:00 PM'
  peakHours: string; // e.g. '11:00 AM – 02:00 PM'
  recommendedDuration: string; // e.g. '2–3 hours'
  holidayInfo: string;
  description: string;
  history: string;
  nearbyRestaurants: string[];
  nearbyHotels: string[];
  contact?: string;
  reviews: Review[];
}

export interface ItineraryActivity {
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  time: string;
  title: string;
  description: string;
  location: string;
  entryFee: string;
  foodSuggestion: string;
  estimatedCost: number;
  peakHours: string;
  openCloseHours: string;
  travelTips?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dateStr?: string;
  theme: string;
  activities: ItineraryActivity[];
  dayEstimatedBudget: number;
}

export interface SavedTripItinerary {
  id: string;
  destinationId: string;
  destinationName: string;
  daysCount: number;
  travelersCount: number;
  budgetPerPerson: number;
  travelStyle: 'Budget' | 'Standard' | 'Premium' | 'Luxury';
  interests: string[];
  createdAt: string;
  days: ItineraryDay[];
  budgetBreakdown: {
    hotel: number;
    food: number;
    transportation: number;
    activities: number;
    shopping: number;
    emergencyBuffer: number;
    totalPerPerson: number;
    grandTotal: number;
  };
  isBudgetSufficient: boolean;
  alternativeAdvice?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
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
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface TravelPost {
  id: string;
  userName: string;
  userAvatar: string;
  userHandle: string;
  destinationId: string;
  destinationName: string;
  image: string;
  caption: string;
  likesCount: number;
  isLikedByUser: boolean;
  comments: {
    id: string;
    userName: string;
    userAvatar?: string;
    comment: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface TravelBlog {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: 'Travel Guides' | 'Budget Travel' | 'Food' | 'Adventure' | 'Luxury' | 'Hidden Gems' | 'Family Travel' | 'Weekend Trips';
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  destinationId: string;
  destinationName: string;
  likesCount: number;
  content: string[];
  tips: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'alert' | 'booking' | 'weather' | 'blog' | 'recommendation';
  read: boolean;
  linkAction?: {
    page: string;
    itemId?: string;
  };
}
