import { LanguageCode } from '../types/travel';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'tcy', name: 'Tulu', nativeName: 'ತುಳು', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文', flag: '🇨🇳' }
];

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  exploreDestinations: string;
  planMyTrip: string;
  popularDestinations: string;
  trendingInIndia: string;
  travelersCount: string;
  startingFrom: string;
  bestSeason: string;
  viewDetails: string;
  planTrip: string;
  save: string;
  saved: string;
  share: string;
  viewHotels: string;
  viewAttractions: string;
  weather: string;
  bestTime: string;
  crowdLevel: string;
  peakHours: string;
  cultureAndHeritage: string;
  famousFood: string;
  famousLandmarks: string;
  emergencyServices: string;
  transportation: string;
  hotels: string;
  attractions: string;
  foodGuide: string;
  hiddenGems: string;
  tripPlanner: string;
  travelFeed: string;
  blogs: string;
  myTrips: string;
  bookings: string;
  notifications: string;
  profile: string;
  login: string;
  signup: string;
  logout: string;
  bookNow: string;
  availableOffline: string;
  budgetBreakdown: string;
  forYou: string;
  contactHotel: string;
  roomsLeft: string;
  filters: string;
  allDestinations: string;
  writeReview: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'Hiddenary',
    tagline: 'Discover India. Plan Better. Travel Smarter.',
    heroHeadline: 'Discover India. Plan Better. Travel Smarter.',
    heroSubtitle: 'Explore destinations, discover luxury stays, plan custom itineraries and experience India your way.',
    searchPlaceholder: 'Search destinations, hotels, attractions, foods...',
    exploreDestinations: 'Explore Destinations',
    planMyTrip: 'Plan My Trip',
    popularDestinations: 'Popular Destinations',
    trendingInIndia: 'Trending in India',
    travelersCount: 'Travelers',
    startingFrom: 'Starting from',
    bestSeason: 'Best Season',
    viewDetails: 'View Details',
    planTrip: 'Plan Trip',
    save: 'Save',
    saved: 'Saved',
    share: 'Share',
    viewHotels: 'View Hotels',
    viewAttractions: 'View Attractions',
    weather: 'Weather & Forecast',
    bestTime: 'Best Time to Visit',
    crowdLevel: 'Crowd Level',
    peakHours: 'Peak Hours',
    cultureAndHeritage: 'Culture & Heritage',
    famousFood: 'Famous Local Food',
    famousLandmarks: 'Famous Landmarks',
    emergencyServices: 'Nearby Services & Emergency',
    transportation: 'Transportation & Transit',
    hotels: 'Hotels & Stays',
    attractions: 'Attractions',
    foodGuide: 'Food Guide',
    hiddenGems: 'Hidden Gems',
    tripPlanner: 'Trip Planner',
    travelFeed: 'Travel Feed',
    blogs: 'Travel Blogs',
    myTrips: 'My Trips',
    bookings: 'Bookings',
    notifications: 'Notifications',
    profile: 'Profile',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    bookNow: 'Book Now',
    availableOffline: 'Available offline in browser cache',
    budgetBreakdown: 'Smart Budget Breakdown',
    forYou: 'Personalized For You',
    contactHotel: 'Contact Hotel',
    roomsLeft: 'rooms left',
    filters: 'Filters',
    allDestinations: 'All Destinations',
    writeReview: 'Write a Review'
  },
  ta: {
    appName: 'Hiddenary',
    tagline: 'இந்தியாவை அறிவோம். சிறப்பாக திட்டமிடுவோம். பயணியுங்கள்.',
    heroHeadline: 'இந்தியாவை அறிவோம். சிறப்பாக திட்டமிடுவோம். பயணியுங்கள்.',
    heroSubtitle: 'சுற்றுலா தலங்களை கண்டறியுங்கள், தங்குமிடங்களை பதிவு செய்யுங்கள், உங்கள் விருப்பப்படி இந்தியாவை அனுபவியுங்கள்.',
    searchPlaceholder: 'இடங்கள், விடுதிகள், சுற்றுலாத் தலங்கள் தேடுங்கள்...',
    exploreDestinations: 'இடங்களை ஆராயுங்கள்',
    planMyTrip: 'பயணத்தை திட்டமிடுங்கள்',
    popularDestinations: 'பிரபல சுற்றுலா இடங்கள்',
    trendingInIndia: 'இந்தியாவில் ட்ரெண்டிங்',
    travelersCount: 'பயணிகள்',
    startingFrom: 'தொடங்கும் விலை',
    bestSeason: 'சிறந்த பருவம்',
    viewDetails: 'விவரங்களை காண்க',
    planTrip: 'திட்டம் போடுங்கள்',
    save: 'சேமி',
    saved: 'சேமிக்கப்பட்டது',
    share: 'பகிர்',
    viewHotels: 'விடுதிகளை காண்க',
    viewAttractions: 'ஈர்ப்புகளை காண்க',
    weather: 'வானிலை தகவல்',
    bestTime: 'செல்ல சிறந்த நேரம்',
    crowdLevel: 'கூட்ட நெரிசல்',
    peakHours: 'அதிக கூட்ட நேரம்',
    cultureAndHeritage: 'கலாச்சாரம் & பாரம்பரியம்',
    famousFood: 'பிரபல உள்ளூர் உணவுகள்',
    famousLandmarks: 'முக்கிய அடையாளங்கள்',
    emergencyServices: 'அவசர சேவைகள் & உதவிகள்',
    transportation: 'போக்குவரத்து வசதிகள்',
    hotels: 'விடுதிகள் & தங்குமிடம்',
    attractions: 'சுற்றுலா ஈர்ப்புகள்',
    foodGuide: 'உணவு வழிகாட்டி',
    hiddenGems: 'மறைக்கப்பட்ட அழகிய இடங்கள்',
    tripPlanner: 'ஸ்மார்ட் பயண திட்டமிடல்',
    travelFeed: 'பயண சமூகப் பதிவு',
    blogs: 'பயண வலைப்பதிவுகள்',
    myTrips: 'எனது பயணங்கள்',
    bookings: 'முன்பதிவுகள்',
    notifications: 'அறிவிப்புகள்',
    profile: 'சுயவிவரம்',
    login: 'உள்நுழைக',
    signup: 'பதிவு செய்க',
    logout: 'வெளியேறு',
    bookNow: 'முன்பதிவு செய்',
    availableOffline: 'ஆஃப்லைனில் கிடைக்கும்',
    budgetBreakdown: 'பட்ஜெட் பகுப்பாய்வு',
    forYou: 'உங்களுக்காக பிரத்யேகமானது',
    contactHotel: 'விடுதியை தொடர்பு கொள்ள',
    roomsLeft: 'அறைகள் மட்டுமே உள்ளன',
    filters: 'வடிகட்டிகள்',
    allDestinations: 'அனைத்து இடங்கள்',
    writeReview: 'விமர்சனம் எழுதுக'
  },
  hi: {
    appName: 'Hiddenary',
    tagline: 'भारत की खोज करें। बेहतर योजना बनाएं। समझदारी से यात्रा करें।',
    heroHeadline: 'भारत की खोज करें। बेहतर योजना बनाएं। समझदारी से यात्रा करें।',
    heroSubtitle: 'गंतव्यों का अन्वेषण करें, ठहरने के बेहतरीन स्थान खोजें, ट्रिप प्लान करें और भारत का अनुभव लें।',
    searchPlaceholder: 'स्थान, होटल, पर्यटन स्थल, स्थानीय व्यंजन खोजें...',
    exploreDestinations: 'गंतव्यों का अन्वेषण करें',
    planMyTrip: 'ट्रिप प्लान करें',
    popularDestinations: 'लोकप्रिय गंतव्य',
    trendingInIndia: 'भारत में ट्रेंडिंग',
    travelersCount: 'यात्री',
    startingFrom: 'शुरुआती बजट',
    bestSeason: 'सर्वोत्तम मौसम',
    viewDetails: 'विवरण देखें',
    planTrip: 'यात्रा की योजना बनाएं',
    save: 'सहेजें',
    saved: 'सहेजा गया',
    share: 'साझा करें',
    viewHotels: 'होटल देखें',
    viewAttractions: 'आकर्षण देखें',
    weather: 'मौसम और पूर्वानुमान',
    bestTime: 'घूमने का सबसे अच्छा समय',
    crowdLevel: 'भीड़ का स्तर',
    peakHours: 'व्यस्ततम समय',
    cultureAndHeritage: 'संस्कृति और विरासत',
    famousFood: 'प्रसिद्ध स्थानीय व्यंजन',
    famousLandmarks: 'प्रमुख ऐतिहासिक स्थल',
    emergencyServices: 'आपातकालीन सेवाएं और सहायता',
    transportation: 'परिवहन और आवागमन',
    hotels: 'होटल और रिसॉर्ट्स',
    attractions: 'प्रमुख आकर्षण',
    foodGuide: 'फूड गाइड',
    hiddenGems: 'अनदेखे खूबसूरत स्थल',
    tripPlanner: 'स्मार्ट ट्रिप प्लानर',
    travelFeed: 'ट्रैवल सोशल फीड',
    blogs: 'यात्रा ब्लॉग',
    myTrips: 'मेरी यात्राएं',
    bookings: 'मेरी बुकिंग्स',
    notifications: 'सूचनाएं',
    profile: 'प्रोफाइल',
    login: 'लॉग इन करें',
    signup: 'साइन अप करें',
    logout: 'लॉग आउट',
    bookNow: 'अभी बुक करें',
    availableOffline: 'ऑफ़लाइन उपलब्ध',
    budgetBreakdown: 'स्मार्ट बजट गणना',
    forYou: 'आपके लिए अनुशंसित',
    contactHotel: 'होटल से संपर्क करें',
    roomsLeft: 'कमरे शेष हैं',
    filters: 'फ़िल्टर',
    allDestinations: 'सभी गंतव्य',
    writeReview: 'समीक्षा लिखें'
  },
  te: {} as TranslationDictionary,
  ml: {} as TranslationDictionary,
  kn: {} as TranslationDictionary,
  tcy: {} as TranslationDictionary,
  ur: {} as TranslationDictionary,
  sa: {} as TranslationDictionary,
  fr: {} as TranslationDictionary,
  de: {} as TranslationDictionary,
  ja: {} as TranslationDictionary,
  ko: {} as TranslationDictionary,
  zh: {} as TranslationDictionary
};

// Fallback to English for any language without explicit translation keys
(Object.keys(SUPPORTED_LANGUAGES) as LanguageCode[]).forEach(lang => {
  if (lang !== 'en' && lang !== 'ta' && lang !== 'hi') {
    TRANSLATIONS[lang] = { ...TRANSLATIONS.en };
  }
});

// Provide some localized names for other languages
TRANSLATIONS.te = { ...TRANSLATIONS.en, appName: 'Hiddenary', tagline: 'భారతదేశాన్ని అన్వేషించండి' };
TRANSLATIONS.ml = { ...TRANSLATIONS.en, appName: 'Hiddenary', tagline: 'ഇന്ത്യയെ അറിയൂ, മികച്ച യാത്ര ആസൂത്രണം ചെയ്യൂ' };
TRANSLATIONS.kn = { ...TRANSLATIONS.en, appName: 'Hiddenary', tagline: 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ' };
TRANSLATIONS.fr = { ...TRANSLATIONS.en, appName: 'Hiddenary', tagline: 'Découvrez l\'Inde. Planifiez mieux.' };
TRANSLATIONS.de = { ...TRANSLATIONS.en, appName: 'Hiddenary', tagline: 'Entdecken Sie Indien. Reisen Sie smarter.' };
TRANSLATIONS.ja = { ...TRANSLATIONS.en, appName: 'Hiddenary', tagline: 'インドを発見。スマートな旅を。' };
