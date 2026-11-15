import { Destination } from '../types/travel';

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun, Sand, Heritage & Vibrant Coastal Culture',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Goa blends Portuguese colonial architecture, pristine Arabian Sea beaches, bustling night bazaars, spice plantations, and laid-back susegad lifestyle.',
    rating: 4.8,
    reviewsCount: 3840,
    startingBudget: 12500,
    bestTime: {
      months: 'November to March',
      peakSeason: 'Dec – Jan (Sunburn Festival & New Year)',
      offSeason: 'June – September (Monsoon greenery)'
    },
    recommendedDuration: '4–5 Days',
    crowdLevel: 'High',
    trafficStatus: 'Moderate',
    peakHours: 'Baga & Calangute Beach: 5:30 PM – 9:30 PM',
    weather: {
      temp: 29,
      condition: 'Sunny & Coastal Breeze',
      rainProbability: 12,
      forecast: [
        { day: 'Fri', temp: 30, condition: 'Sunny' },
        { day: 'Sat', temp: 31, condition: 'Clear Sky' },
        { day: 'Sun', temp: 29, condition: 'Breezy' },
        { day: 'Mon', temp: 28, condition: 'Partly Cloudy' }
      ]
    },
    culture: {
      epithet: 'Pearl of the Orient',
      heritageKing: 'Kadamba Dynasty & Adil Shahi Sultans (later Portuguese Goa)',
      festivals: ['Goa Carnival', 'Shigmo', 'Feast of St. Francis Xavier', 'Sunburn'],
      traditions: 'Susegad living, Konkani folk dance Dhalo, traditional feni brewing',
      famousFor: ['Calangute & Palolem Beaches', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Flea Markets']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Goa Medical College & Hospital (GMC)',
        distance: '4.2 km from Panaji',
        phone: '+91 832 2458700',
        address: 'Bambolim, Goa 403202',
        isOpen24x7: true,
        rating: 4.5
      },
      {
        type: 'Police',
        name: 'Calangute Tourist Police Station',
        distance: '1.2 km from Beach',
        phone: '+91 832 2278294',
        address: 'Tito\'s Lane Junction, Calangute',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Apollo 24x7 Pharmacy & Wellness',
        distance: '800 m',
        phone: '+91 832 2431234',
        address: 'Chogm Road, Porvorim',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'State Bank of India (SBI) Multi-Currency ATM',
        distance: '350 m',
        phone: '1800-425-3800',
        address: 'Baga Main Road, Near Cafe Mambo',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Manohar Int\'l Airport (MOPA) & Dabolim (GOI)',
        distance: '32 km / 28 km',
        estimatedTime: '45 mins taxi ride',
        estimatedCost: '₹1,200 – ₹1,800 prepaid cab',
        frequency: 'Hourly domestic flights from DEL, BOM, BLR, MAA'
      },
      {
        type: 'Train',
        hubName: 'Madgaon Junction (MAO) & Thivim (THVM)',
        distance: '18 km from North Goa beaches',
        estimatedTime: '30 mins auto/cab',
        estimatedCost: '₹500 – ₹800 taxi',
        frequency: 'Vande Bharat & Superfast expresses daily'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'GoaMiles & Local Yellow-Black Taxis / Self-Drive Scooters',
        distance: 'Available state-wide',
        estimatedTime: 'Instant / 10 min arrival',
        estimatedCost: 'Scooter ₹400/day, Car ₹1,500/day',
        frequency: 'Available on-demand'
      }
    ],
    isTrending: true,
    travelerCount: '1.2M+ this season'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    tagline: 'Backwaters, Ayurvedic Hills & Tropical Tranquility',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Renowned as God\'s Own Country, Kerala delights travelers with emerald palm-fringed backwaters, Munnar tea estates, Kathakali art, and authentic Ayurvedic wellness.',
    rating: 4.9,
    reviewsCount: 4210,
    startingBudget: 14000,
    bestTime: {
      months: 'September to March',
      peakSeason: 'Dec – Jan (Houseboat cruises & Kochi Biennale)',
      offSeason: 'June – August (Monsoon Ayurvedic rejuvenation)'
    },
    recommendedDuration: '5–6 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Low',
    peakHours: 'Alleppey Punnamada Houseboat Docks: 10:00 AM – 1:00 PM',
    weather: {
      temp: 27,
      condition: 'Tropical & Gentle Breeze',
      rainProbability: 25,
      forecast: [
        { day: 'Fri', temp: 28, condition: 'Partly Cloudy' },
        { day: 'Sat', temp: 27, condition: 'Mild Rain' },
        { day: 'Sun', temp: 29, condition: 'Pleasant' },
        { day: 'Mon', temp: 28, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: "God's Own Country",
      heritageKing: 'Chera Dynasty, Travancore Royalty & Zamorins of Calicut',
      festivals: ['Onam', 'Thrissur Pooram', 'Vishu', 'Nehru Trophy Boat Race'],
      traditions: 'Kathakali classical dance, Kalaripayattu martial art, Sadya feast on banana leaf',
      famousFor: ['Alleppey Backwaters', 'Munnar Tea Hills', 'Wayanad Waterfalls', 'Fort Kochi Heritage']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Aster Medcity Multi-Speciality',
        distance: '6.5 km from Kochi',
        phone: '+91 484 6699999',
        address: 'Cheranalloor, Kochi 682027',
        isOpen24x7: true,
        rating: 4.8
      },
      {
        type: 'Police',
        name: 'Kerala Tourist Police Assistance Desk',
        distance: '1.5 km',
        phone: '112 / +91 471 2320101',
        address: 'Boat Jetty Road, Alleppey',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Kottakkal Arya Vaidya Sala & 24/7 MedPlus',
        distance: '400 m',
        phone: '+91 484 2381289',
        address: 'MG Road, Ernakulam',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'Federal Bank / HDFC ATM',
        distance: '200 m',
        phone: '1800-420-1199',
        address: 'Finishing Point, Alleppey',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Cochin International Airport (COK - Fully Solar Powered)',
        distance: '36 km from Ernakulam',
        estimatedTime: '45 mins',
        estimatedCost: '₹1,000 – ₹1,400 Uber/Ola',
        frequency: 'Frequent international and domestic routes'
      },
      {
        type: 'Train',
        hubName: 'Ernakulam Junction (ERS) & Alappuzha (ALLP)',
        distance: 'Direct city access',
        estimatedTime: '15 mins',
        estimatedCost: '₹100 – ₹200 auto rickshaw',
        frequency: 'Over 40 daily express trains'
      },
      {
        type: 'Bus',
        hubName: 'KSRTC SWIFT Deluxe / Water Metro Kochi',
        distance: 'Across water & roadways',
        estimatedTime: 'Frequent ferry connections',
        estimatedCost: '₹20 – ₹50 water metro',
        frequency: 'Every 15 mins'
      }
    ],
    isTrending: true,
    travelerCount: '980K+ this season'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'Palaces, Forts & The Regal Heritage of Rajputana',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603288940356-9b044d50cbf1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The iconic Pink City is a UNESCO World Heritage treasure famous for the majestic Amber Fort, Hawa Mahal, ornate city palaces, and block-print handicrafts.',
    rating: 4.8,
    reviewsCount: 3650,
    startingBudget: 11000,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Dec – Feb (Jaipur Literature Fest & kite flying)',
      offSeason: 'April – June (Hot desert summer)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'High',
    trafficStatus: 'Moderate',
    peakHours: 'Amber Fort & Hawa Mahal: 10:30 AM – 2:00 PM',
    weather: {
      temp: 26,
      condition: 'Clear Sky & Mild Warmth',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 27, condition: 'Sunny' },
        { day: 'Sat', temp: 28, condition: 'Clear' },
        { day: 'Sun', temp: 26, condition: 'Pleasant' },
        { day: 'Mon', temp: 25, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The Pink City / Royal Rajasthan',
      heritageKing: 'Maharaja Sawai Jai Singh II (Kachhwaha Rajputs)',
      festivals: ['Teej Festival', 'Gangaur', 'Jaipur Literature Festival', 'Elephant Festival'],
      traditions: 'Ghoomar dance, Blue pottery craft, Bandhani tie-dye textile',
      famousFor: ['Hawa Mahal', 'Amber Fort', 'City Palace', 'Jantar Mantar Observatory', 'Chokhi Dhani']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Sawai Man Singh (SMS) Medical Institute',
        distance: '3.0 km from City Palace',
        phone: '+91 141 2518380',
        address: 'Jawahar Lal Nehru Marg, Jaipur',
        isOpen24x7: true,
        rating: 4.6
      },
      {
        type: 'Police',
        name: 'Walled City Tourist Police Station',
        distance: '400 m from Hawa Mahal',
        phone: '+91 141 2618032',
        address: 'Badi Chaupar, Old Jaipur',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Jaipur 24 Hours Chemist & Healthcare',
        distance: '600 m',
        phone: '+91 141 2367123',
        address: 'MI Road, Jaipur',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'ICICI Bank / HDFC ATM',
        distance: '200 m',
        phone: '1800-1080',
        address: 'Johari Bazaar, Jaipur',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Jaipur International Airport (JAI)',
        distance: '12 km south of city center',
        estimatedTime: '25 mins taxi',
        estimatedCost: '₹450 – ₹650',
        frequency: 'Over 60 domestic and Gulf flights daily'
      },
      {
        type: 'Train',
        hubName: 'Jaipur Junction (JP)',
        distance: '3 km from MI Road',
        estimatedTime: '10 mins',
        estimatedCost: '₹120 auto rickshaw',
        frequency: 'Vande Bharat to Delhi in 3h 45m'
      },
      {
        type: 'Metro',
        hubName: 'Jaipur Metro Rail (Pink Line)',
        distance: 'Direct access to Chandpole & Badi Chaupar',
        estimatedTime: 'Immediate transit',
        estimatedCost: '₹10 – ₹20 token',
        frequency: 'Every 8 mins'
      }
    ],
    isTrending: true,
    travelerCount: '850K+ this season'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Gateway of South India, Dravidian Temples & Filter Coffee',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Chennai is the cultural heart of Tamil Nadu, celebrated for the towering Kapaleeshwarar Temple, Marina Beach (world’s 2nd longest), Carnatic music season, and culinary legacy.',
    rating: 4.7,
    reviewsCount: 3120,
    startingBudget: 9500,
    bestTime: {
      months: 'November to February',
      peakSeason: 'December (Madras Music Season & Margazhi)',
      offSeason: 'April – June (Agni Nakshatram summer)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Moderate',
    peakHours: 'Marina Beach & Mylapore: 5:00 PM – 8:30 PM',
    weather: {
      temp: 30,
      condition: 'Humid & Coastal Sunshine',
      rainProbability: 15,
      forecast: [
        { day: 'Fri', temp: 31, condition: 'Sunny' },
        { day: 'Sat', temp: 30, condition: 'Partly Cloudy' },
        { day: 'Sun', temp: 29, condition: 'Breezy' },
        { day: 'Mon', temp: 30, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'Cultural Capital of South India',
      heritageKing: 'Pallava Dynasty, Cholas, Vijayanagara & Nayak rulers',
      festivals: ['Pongal', 'Margazhi Music & Dance Festival', 'Brahmotsavam at Mylapore'],
      traditions: 'Bharatanatyam, Kanchipuram silk sarees, filter kaapi rituals',
      famousFor: ['Marina Beach Promenade', 'Kapaleeshwarar Temple', 'San Thome Basilica', 'Mahabalipuram shore temples nearby']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Apollo Main Hospital Greams Road',
        distance: '2.5 km',
        phone: '+91 44 28290200',
        address: '21 Greams Lane, Thousand Lights, Chennai',
        isOpen24x7: true,
        rating: 4.9
      },
      {
        type: 'Police',
        name: 'Mylapore Police Station & Tourist Wing',
        distance: '800 m',
        phone: '+91 44 23452570',
        address: 'Kutchery Road, Mylapore',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'MedPlus 24 Hours Pharmacy',
        distance: '300 m',
        phone: '+91 44 24641234',
        address: 'Luz Church Road, Mylapore',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'State Bank of India (SBI) / Indian Bank',
        distance: '150 m',
        phone: '1800-425-0018',
        address: 'Near Kapaleeshwarar Temple Tank',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Chennai International Airport (MAA - Meenambakkam)',
        distance: '15 km from city center',
        estimatedTime: '35 mins via Airport Metro',
        estimatedCost: '₹50 Metro / ₹450 Uber',
        frequency: 'Major international hub to Southeast Asia and Europe'
      },
      {
        type: 'Train',
        hubName: 'Chennai Central (MAS) & Egmore (MS)',
        distance: 'Heritage hub in heart of city',
        estimatedTime: 'Direct metro connection',
        estimatedCost: '₹20 Metro / ₹100 auto',
        frequency: 'Dozens of Vande Bharat and Superfast trains'
      },
      {
        type: 'Metro',
        hubName: 'CMRL (Chennai Metro Rail Network)',
        distance: 'Connected to Airport, Central, Vadapalani',
        estimatedTime: 'Transit every 5 mins',
        estimatedCost: '₹10 – ₹50 ticket',
        frequency: 'Every 5 to 7 mins'
      }
    ],
    isTrending: false,
    travelerCount: '710K+ this season'
  },
  {
    id: 'ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    tagline: 'Queen of Hill Stations, Nilgiri Toy Train & Pine Forests',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled in the Nilgiri Blue Mountains, Ooty enchants with the UNESCO Nilgiri Mountain Railway, sprawling botanical gardens, Doddabetta Peak, and handmade chocolates.',
    rating: 4.7,
    reviewsCount: 2890,
    startingBudget: 10500,
    bestTime: {
      months: 'March to June & September to November',
      peakSeason: 'April – May (Summer Ooty Flower Show)',
      offSeason: 'July – August (Heavy monsoon mist)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Moderate',
    peakHours: 'Ooty Botanical Garden & Lake Boating: 11:00 AM – 3:30 PM',
    weather: {
      temp: 16,
      condition: 'Chilly & Mountain Mist',
      rainProbability: 20,
      forecast: [
        { day: 'Fri', temp: 17, condition: 'Misty' },
        { day: 'Sat', temp: 16, condition: 'Pleasant' },
        { day: 'Sun', temp: 15, condition: 'Light Shiver' },
        { day: 'Mon', temp: 17, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'Queen of Hill Stations',
      heritageKing: 'Toda Indigenous Tribes & British Madras Presidency',
      festivals: ['Nilgiris Flower Show', 'Tea & Tourism Festival', 'Toda Modhweth'],
      traditions: 'Toda tribal embroidery, eucalyptus oil distillation, handmade baking',
      famousFor: ['Nilgiri Mountain Toy Train', 'Ooty Lake & Boathouse', 'Doddabetta Peak', 'Rose Garden']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Government District Headquarters Hospital Ooty',
        distance: '1.2 km',
        phone: '+91 423 2442222',
        address: 'Hospital Road, Udhagamandalam',
        isOpen24x7: true,
        rating: 4.3
      },
      {
        type: 'Police',
        name: 'Ooty Town Central Police Station',
        distance: '900 m',
        phone: '+91 423 2442333',
        address: 'Commercial Road, Ooty',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Nilgiris Chemist & Wellness 24x7',
        distance: '400 m',
        phone: '+91 423 2443456',
        address: 'Charing Cross, Ooty',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'Canara Bank / SBI ATM',
        distance: '150 m',
        phone: '1800-425-0018',
        address: 'Near Botanical Garden Gate',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Train',
        hubName: 'Nilgiri Mountain Railway (Toy Train to Mettupalayam)',
        distance: 'Ooty Railway Station',
        estimatedTime: '3.5 hours scenic ride',
        estimatedCost: '₹200 – ₹500 First Class',
        frequency: 'Daily UNESCO heritage run'
      },
      {
        type: 'Flight',
        hubName: 'Coimbatore International Airport (CJB)',
        distance: '88 km downhill',
        estimatedTime: '2.5 hours scenic ghat road taxi',
        estimatedCost: '₹2,200 – ₹2,800 cab',
        frequency: 'Daily flights from all metros'
      },
      {
        type: 'Bus',
        hubName: 'Ooty Central Bus Stand',
        distance: 'Central town',
        estimatedTime: 'Continuous buses from Bangalore, Mysore, Coimbatore',
        estimatedCost: '₹150 – ₹450 KSRTC / TNSTC',
        frequency: 'Every 30 mins'
      }
    ],
    isTrending: false,
    travelerCount: '540K+ this season'
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Snow Peaks, Solang Valley Adventure & Pine Valleys',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched in the Beas River Valley, Manali offers majestic views of Pir Panjal peaks, skiing in Solang Valley, Atal Tunnel transit to Lahaul, and cozy Old Manali cafes.',
    rating: 4.8,
    reviewsCount: 3950,
    startingBudget: 13000,
    bestTime: {
      months: 'October to June',
      peakSeason: 'Dec – Feb for snowfall; May – June for summer retreat',
      offSeason: 'July – August (Monsoon landslides risk)'
    },
    recommendedDuration: '4–5 Days',
    crowdLevel: 'High',
    trafficStatus: 'Heavy',
    peakHours: 'Solang Valley & Mall Road: 4:30 PM – 9:00 PM',
    weather: {
      temp: 9,
      condition: 'Crisp Cold & Mountain Breeze',
      rainProbability: 10,
      forecast: [
        { day: 'Fri', temp: 10, condition: 'Sunny' },
        { day: 'Sat', temp: 8, condition: 'Cold' },
        { day: 'Sun', temp: 7, condition: 'Snow dusting high altitude' },
        { day: 'Mon', temp: 9, condition: 'Clear Sky' }
      ]
    },
    culture: {
      epithet: 'Valley of the Gods',
      heritageKing: 'Sage Manu & Kullu Rajas',
      festivals: ['Kullu Dussehra', 'Hadimba Temple Fair', 'Winter Carnival Manali'],
      traditions: 'Himachali Kullu caps, wool weaving, Nati traditional folk dance',
      famousFor: ['Solang Valley Skiing', 'Atal Tunnel', 'Hadimba Temple', 'Rohtang Pass', 'Jogini Waterfall']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Lady Willingdon Hospital Old Manali',
        distance: '1.5 km',
        phone: '+91 1902 252315',
        address: 'Old Manali Road, Manali',
        isOpen24x7: true,
        rating: 4.7
      },
      {
        type: 'Police',
        name: 'Manali Tourist Police Station',
        distance: '400 m',
        phone: '+91 1902 252322',
        address: 'Near Mall Road, Manali',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Mall Road 24x7 Chemists',
        distance: '100 m',
        phone: '+91 1902 253456',
        address: 'Mall Road, Manali',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'Punjab National Bank / SBI ATM',
        distance: '80 m',
        phone: '1800-180-2222',
        address: 'Main Mall Road Plaza',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Bhuntar / Kullu-Manali Airport (KUU)',
        distance: '50 km south',
        estimatedTime: '1.5 hours taxi',
        estimatedCost: '₹1,800 – ₹2,200',
        frequency: 'Flights from Delhi and Chandigarh'
      },
      {
        type: 'Bus',
        hubName: 'HPTDC Volvo & Private Luxury Sleeper',
        distance: 'Mall Road Bus Stand',
        estimatedTime: '12 hours overnight from Delhi (Majnu Ka Tilla)',
        estimatedCost: '₹1,100 – ₹1,800 luxury volvo',
        frequency: 'Over 50 nightly buses'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Himachal Taxi Union Counters',
        distance: 'Available for Solang, Atal Tunnel, Rohtang',
        estimatedTime: 'Full day hire',
        estimatedCost: '₹2,500 – ₹3,500 day trip',
        frequency: 'Instant booking'
      }
    ],
    isTrending: true,
    travelerCount: '1.1M+ this season'
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    state: 'Jammu & Kashmir',
    tagline: 'Paradise on Earth, Dal Lake Shikaras & Gulmarg Snow',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Described by Mughal emperors as "Paradise on Earth", Kashmir stuns with ornate houseboats on Dal Lake, Gulmarg gondolas, Pahalgam pine meadows, and warm saffron Kahwa.',
    rating: 4.9,
    reviewsCount: 4100,
    startingBudget: 16500,
    bestTime: {
      months: 'Year-Round (March to October for meadows, Dec to Feb for snow)',
      peakSeason: 'April – May (Tulip Festival) & Dec – Jan (Gulmarg skiing)',
      offSeason: 'Mid-summer monsoon'
    },
    recommendedDuration: '5–6 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Low',
    peakHours: 'Dal Lake Shikara Ghat: 5:00 PM – 7:30 PM sunset',
    weather: {
      temp: 14,
      condition: 'Crisp Autumn / Spring Air',
      rainProbability: 8,
      forecast: [
        { day: 'Fri', temp: 15, condition: 'Pleasant' },
        { day: 'Sat', temp: 14, condition: 'Clear Sky' },
        { day: 'Sun', temp: 13, condition: 'Cool Breeze' },
        { day: 'Mon', temp: 14, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'Paradise on Earth / Firdaus',
      heritageKing: 'Sultan Zain-ul-Abidin & Mughal Emperor Jahangir',
      festivals: ['Tulip Festival', 'Shikara Festival', 'Saffron Harvest Fair'],
      traditions: 'Pashmina shawl weaving, Paper Mache craft, Wazwan multi-course feast',
      famousFor: ['Dal Lake Shikara & Houseboats', 'Gulmarg Gondola Ride', 'Betaab Valley Pahalgam', 'Shankaracharya Temple']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'SKIMS (Sher-i-Kashmir Institute of Medical Sciences)',
        distance: '5 km from Dal Lake',
        phone: '+91 194 2401013',
        address: 'Soura, Srinagar',
        isOpen24x7: true,
        rating: 4.7
      },
      {
        type: 'Police',
        name: 'Tourist Reception Centre (TRC) Tourist Police',
        distance: '1.2 km',
        phone: '+91 194 2502279',
        address: 'TRC Complex, Srinagar',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Kashmir Medicos 24/7',
        distance: '400 m',
        phone: '+91 194 2471200',
        address: 'Boulevard Road, Srinagar',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'J&K Bank Floating & Boulevard ATM',
        distance: '200 m',
        phone: '1800-890-2122',
        address: 'Ghat No. 7, Boulevard Road',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Sheikh ul-Alam International Airport Srinagar (SXR)',
        distance: '12 km from Dal Lake',
        estimatedTime: '25 mins cab',
        estimatedCost: '₹600 – ₹900',
        frequency: 'Daily nonstop flights from Delhi, Mumbai, Bengaluru'
      },
      {
        type: 'Train',
        hubName: 'Udhampur-Srinagar-Baramulla Rail Link (USBRL)',
        distance: 'Now connecting Kashmir Valley with Indian rail grid',
        estimatedTime: 'Direct trains to Srinagar station',
        estimatedCost: 'Standard rail fare',
        frequency: 'Daily Vande Bharat expansion'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Kashmir Tourist Taxi Union',
        distance: 'Srinagar - Gulmarg - Pahalgam circuits',
        estimatedTime: 'Fixed Union rates',
        estimatedCost: '₹2,500 – ₹3,500/day',
        frequency: 'On-demand'
      }
    ],
    isTrending: true,
    travelerCount: '1.4M+ this season'
  },
  {
    id: 'coorg',
    name: 'Coorg',
    state: 'Karnataka',
    tagline: 'Coffee Plantations, Misty Western Ghats & Kodava Culture',
    heroImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Revered as the Scotland of India, Coorg (Kodagu) is a lush green paradise filled with aroma of Arabica coffee, Abbey Falls, Dubare Elephant Camp, and martial Kodava traditions.',
    rating: 4.8,
    reviewsCount: 2450,
    startingBudget: 11500,
    bestTime: {
      months: 'October to April',
      peakSeason: 'Dec – Jan (Chilly evenings & coffee harvest)',
      offSeason: 'July – August (Heavy lush monsoons)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Low',
    trafficStatus: 'Low',
    peakHours: 'Raja\'s Seat Sunset Point: 5:00 PM – 7:00 PM',
    weather: {
      temp: 20,
      condition: 'Misty & Pleasant Forest Breeze',
      rainProbability: 15,
      forecast: [
        { day: 'Fri', temp: 21, condition: 'Misty' },
        { day: 'Sat', temp: 20, condition: 'Clear' },
        { day: 'Sun', temp: 19, condition: 'Cool' },
        { day: 'Mon', temp: 21, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'Scotland of India',
      heritageKing: 'Haleri Kings & Kodava Martial Clans',
      festivals: ['Kailpodh (Weapon Festival)', 'Kaveri Sankramana', 'Huttari (Harvest)'],
      traditions: 'Kodava saree drape style, pork curry (Pandi Curry), martial folklore',
      famousFor: ['Abbey & Iruppu Falls', 'Raja\'s Seat', 'Dubare Elephant Camp', 'Namdroling Golden Temple Bylakuppe']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'District Hospital Madikeri',
        distance: '1.0 km',
        phone: '+91 8272 228345',
        address: 'College Road, Madikeri',
        isOpen24x7: true,
        rating: 4.2
      },
      {
        type: 'Police',
        name: 'Madikeri Town Police Station',
        distance: '600 m',
        phone: '+91 8272 228222',
        address: 'Fort Road, Madikeri',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Kodagu LifeCare Pharmacy 24 Hours',
        distance: '350 m',
        phone: '+91 8272 229123',
        address: 'Main Market, Madikeri',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'Canara Bank / SBI ATM',
        distance: '150 m',
        phone: '1800-425-0018',
        address: 'Near Raja\'s Seat Road',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Kannur International (CNN) & Mangalore (IXE)',
        distance: '90 km / 135 km',
        estimatedTime: '2.5 hours scenic drive',
        estimatedCost: '₹2,400 – ₹3,000 cab',
        frequency: 'Daily international and domestic flights'
      },
      {
        type: 'Train',
        hubName: 'Mysuru Junction (MYS)',
        distance: '115 km east',
        estimatedTime: '2.5 hours by car/bus',
        estimatedCost: '₹250 bus / ₹2,000 cab',
        frequency: 'Connected to all major South Indian metros'
      },
      {
        type: 'Bus',
        hubName: 'KSRTC Airavat Club Class from Bengaluru',
        distance: '250 km from Bangalore',
        estimatedTime: '5.5 hours',
        estimatedCost: '₹650 – ₹850',
        frequency: 'Every hour from Satellite Bus Station BLR'
      }
    ],
    isTrending: false,
    travelerCount: '480K+ this season'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'The City of Dreams, Marine Drive & Colonial Grandeur',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566552881560-0be86c53210f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'India\'s economic dynamo and home of Bollywood, Mumbai dazzles with the Gateway of India, Victorian Gothic CST station, Queen\'s Necklace at Marine Drive, and legendary street food.',
    rating: 4.8,
    reviewsCount: 4600,
    startingBudget: 13500,
    bestTime: {
      months: 'November to February',
      peakSeason: 'Dec – Jan (Kala Ghoda Arts Fest & mild winters)',
      offSeason: 'July – August (Heavy Mumbai monsoons)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'High',
    trafficStatus: 'Heavy',
    peakHours: 'Marine Drive & Bandra Bandstand: 6:00 PM – 10:00 PM',
    weather: {
      temp: 29,
      condition: 'Humid & Breezy',
      rainProbability: 10,
      forecast: [
        { day: 'Fri', temp: 30, condition: 'Sunny' },
        { day: 'Sat', temp: 29, condition: 'Clear Sky' },
        { day: 'Sun', temp: 29, condition: 'Breezy' },
        { day: 'Mon', temp: 30, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The City of Dreams / Maximum City',
      heritageKing: 'Silhara Dynasty, Sultanate of Gujarat & British Bombay Presidency',
      festivals: ['Ganesh Chaturthi (10-day grand festival)', 'Kala Ghoda Arts Festival', 'Bandra Fair'],
      traditions: 'Dabbawala logistics miracle, Bollywood cinema culture, Parsi cafe heritage',
      famousFor: ['Gateway of India & Taj Mahal Palace', 'Marine Drive Queen\'s Necklace', 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', 'Elephanta Caves']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Lilavati Hospital & Research Centre Bandra',
        distance: '3.0 km from Bandra West',
        phone: '+91 22 26751000',
        address: 'A-791, Bandra Reclamation, Mumbai',
        isOpen24x7: true,
        rating: 4.8
      },
      {
        type: 'Police',
        name: 'Colaba Tourist Police Outpost',
        distance: '200 m from Gateway of India',
        phone: '+91 22 22852885',
        address: 'Near Radio Club, Colaba',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Nobel Medicals & Apollo 24 Hours',
        distance: '250 m',
        phone: '+91 22 22021122',
        address: 'Colaba Causeway, Mumbai',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'HDFC / Axis Multi-Currency ATM',
        distance: '100 m',
        phone: '1800-209-5577',
        address: 'Opposite Taj Mahal Palace, Colaba',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Chhatrapati Shivaji Maharaj Int\'l Airport (BOM - T1/T2)',
        distance: '20 km north of South Bombay',
        estimatedTime: '35 mins via Western Express / Coastal Road',
        estimatedCost: '₹600 – ₹900 Uber',
        frequency: 'One of the busiest global hubs in Asia'
      },
      {
        type: 'Train',
        hubName: 'Mumbai Suburban Locals & CSMT / Mumbai Central',
        distance: 'Covers entire metropolitan region',
        estimatedTime: 'Every 3 mins',
        estimatedCost: '₹10 – ₹50 local / Vande Bharat',
        frequency: 'Lifeline of Mumbai'
      },
      {
        type: 'Metro',
        hubName: 'Mumbai Metro Lines (Line 3 Aqua & Line 2A/7)',
        distance: 'Expanding underground & elevated lines',
        estimatedTime: 'Fast transit avoiding road traffic',
        estimatedCost: '₹20 – ₹60',
        frequency: 'Every 4 to 6 mins'
      }
    ],
    isTrending: true,
    travelerCount: '1.8M+ this season'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'World’s Oldest Living City, Sacred Ganga Ghats & Evening Aarti',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Continuously inhabited for over 3,000 years, Kashi (Varanasi) is the spiritual soul of India, world-famous for its sunrise boat rides on the Ganges, Kashi Vishwanath Corridor, and mesmerising Ganga Aarti.',
    rating: 4.9,
    reviewsCount: 3820,
    startingBudget: 9000,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Nov (Dev Deepawali - 1 million lamps on ghats)',
      offSeason: 'May – June (High summer heat)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'High',
    trafficStatus: 'Moderate',
    peakHours: 'Dashashwamedh Ghat Aarti: 6:00 PM – 8:00 PM',
    weather: {
      temp: 24,
      condition: 'Pleasant & Spiritual Breeze',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 25, condition: 'Sunny' },
        { day: 'Sat', temp: 24, condition: 'Clear' },
        { day: 'Sun', temp: 23, condition: 'Pleasant' },
        { day: 'Mon', temp: 25, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The Spiritual Capital of India / Kashi',
      heritageKing: 'Kashi Kingdom & Maratha Rani Ahilyabai Holkar',
      festivals: ['Dev Deepavali', 'Maha Shivaratri', 'Ganga Mahotsav', 'Budhwa Mangal'],
      traditions: 'Banarasi silk saree weaving, classical Indian music (Benaras Gharana), wrestling Akharas',
      famousFor: ['Dashashwamedh Ghat Evening Aarti', 'Kashi Vishwanath Corridor', 'Assi Ghat Sunrise', 'Sarnath Buddhist Stupa']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Sir Sunderlal Hospital (BHU Institute of Medical Sciences)',
        distance: '4.5 km',
        phone: '+91 542 2369299',
        address: 'Banaras Hindu University, Varanasi',
        isOpen24x7: true,
        rating: 4.7
      },
      {
        type: 'Police',
        name: 'Dashashwamedh Tourist Police Station',
        distance: '300 m from Ghat',
        phone: '+91 542 2451233',
        address: 'Ghat Road, Varanasi',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Kashi 24x7 Medicos',
        distance: '200 m',
        phone: '+91 542 2458989',
        address: 'Godowlia Crossing, Varanasi',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'SBI & Bank of Baroda ATM',
        distance: '150 m',
        phone: '1800-425-3800',
        address: 'Godowlia Chauraha',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Lal Bahadur Shastri International Airport (VNS - Babatpur)',
        distance: '25 km northwest',
        estimatedTime: '45 mins taxi ride',
        estimatedCost: '₹650 – ₹900',
        frequency: 'Daily nonstop flights from DEL, BOM, BLR, CCU'
      },
      {
        type: 'Train',
        hubName: 'Varanasi Junction (BSB) & Pt. Deen Dayal Upadhyaya (DDU)',
        distance: '4 km / 16 km',
        estimatedTime: '20 mins / 40 mins',
        estimatedCost: '₹150 auto / ₹400 cab',
        frequency: 'Flagship Vande Bharat Express to New Delhi in 8 hours'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'E-Rickshaws & Traditional Ganga Boats',
        distance: 'Walled gullies and river highway',
        estimatedTime: 'Instant',
        estimatedCost: 'E-rickshaw ₹30 – ₹50 / Boat ride ₹200 – ₹500',
        frequency: 'Every minute'
      }
    ],
    isTrending: true,
    travelerCount: '1.3M+ this season'
  },
  {
    id: 'andaman',
    name: 'Andaman & Nicobar',
    state: 'Andaman and Nicobar Islands',
    tagline: 'Turquoise Waters, Radhanagar Beach & Coral Reefs',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Tropical jewel of India featuring Radhanagar Beach (Asia’s best beach), scuba diving in Havelock, historic Cellular Jail in Port Blair, and untouched coral ecosystems.',
    rating: 4.9,
    reviewsCount: 2280,
    startingBudget: 22000,
    bestTime: {
      months: 'October to May',
      peakSeason: 'Dec – Jan (Perfect calm waters for scuba & snorkeling)',
      offSeason: 'June – August (Monsoon sea swells)'
    },
    recommendedDuration: '5–6 Days',
    crowdLevel: 'Low',
    trafficStatus: 'Low',
    peakHours: 'Radhanagar Sunset & Elephant Beach Scuba: 3:30 PM – 6:00 PM',
    weather: {
      temp: 28,
      condition: 'Tropical Blue Skies',
      rainProbability: 10,
      forecast: [
        { day: 'Fri', temp: 28, condition: 'Sunny' },
        { day: 'Sat', temp: 29, condition: 'Clear' },
        { day: 'Sun', temp: 28, condition: 'Gentle Breeze' },
        { day: 'Mon', temp: 28, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'Emerald Isles of the Bay of Bengal',
      heritageKing: 'Chola Navy (under Rajendra Chola I as Ma-Nakkavaram) & Indian Freedom Struggle',
      festivals: ['Island Tourism Festival', 'Subhash Mela', 'Beach Carnival'],
      traditions: 'Indigenous Great Andamanese crafts, shell carving, coastal seafood cooking',
      famousFor: ['Radhanagar Beach Havelock', 'Cellular Jail National Memorial', 'Elephant Beach Reef', 'Neil Island Natural Bridge']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'G.B. Pant District Hospital Port Blair',
        distance: '2.0 km',
        phone: '+91 3192 232102',
        address: 'Atlanta Point, Port Blair',
        isOpen24x7: true,
        rating: 4.6
      },
      {
        type: 'Police',
        name: 'Port Blair Tourist Police Assistance Booth',
        distance: '300 m from Jetty',
        phone: '+91 3192 233077',
        address: 'Phoenix Bay Jetty, Port Blair',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Island Health 24/7 Chemist',
        distance: '400 m',
        phone: '+91 3192 234567',
        address: 'Aberdeen Bazaar, Port Blair',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'State Bank of India Island Branch ATM',
        distance: '100 m',
        phone: '1800-425-3800',
        address: 'Aberdeen Bazaar',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Veer Savarkar International Airport (IXZ - Port Blair)',
        distance: '4 km from city center',
        estimatedTime: '10 mins cab',
        estimatedCost: '₹300 – ₹450',
        frequency: 'Daily nonstop flights from MAA, CCU, BLR, DEL'
      },
      {
        type: 'Bus',
        hubName: 'Makruzz / Green Ocean High-Speed Catamaran Ferries',
        distance: 'Port Blair to Havelock (Swaraj Dweep) & Neil Island',
        estimatedTime: '90 mins cruise across blue sea',
        estimatedCost: '₹1,200 – ₹2,200 per passenger',
        frequency: 'Multiple departures daily'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Self-Drive Scooters & Island Cabs',
        distance: 'Havelock and Neil Islands',
        estimatedTime: 'Instant rental',
        estimatedCost: 'Scooter ₹500/day',
        frequency: 'Ubiquitous'
      }
    ],
    isTrending: true,
    travelerCount: '420K+ this season'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls, Charminar & Authentic Nizami Dum Biryani',
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A harmonious blend of opulent Nizami history and ultra-modern Cyberabad tech, famed for the 430-year-old Charminar, Golconda Fort, pearl markets, and mouthwatering biryani.',
    rating: 4.8,
    reviewsCount: 3410,
    startingBudget: 10000,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Nov – Feb (Pleasant weather & Numaish Exhibition)',
      offSeason: 'April – June (Summer heat)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Moderate',
    peakHours: 'Charminar & Laad Bazaar: 6:00 PM – 10:00 PM',
    weather: {
      temp: 28,
      condition: 'Warm & Dry',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 29, condition: 'Sunny' },
        { day: 'Sat', temp: 28, condition: 'Clear' },
        { day: 'Sun', temp: 27, condition: 'Pleasant' },
        { day: 'Mon', temp: 29, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The City of Pearls & Nizams',
      heritageKing: 'Qutb Shahi Dynasty & Asaf Jahi Nizams',
      festivals: ['Numaish All India Industrial Exhibition', 'Bonalu', 'Ramadan Haleem Season', 'Bathukamma'],
      traditions: 'Bidriware metallic inlay, Laad Bazaar lacquer bangles, Deccani Urdu etiquette',
      famousFor: ['Charminar & Mecca Masjid', 'Golconda Fort Sound & Light Show', 'Ramoji Film City', 'Chowmahalla Palace', 'Paradise & Shadab Biryani']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Yashoda Hospitals Somajiguda & Malakpet',
        distance: '4.0 km',
        phone: '+91 40 45674567',
        address: 'Raj Bhavan Road, Hyderabad',
        isOpen24x7: true,
        rating: 4.8
      },
      {
        type: 'Police',
        name: 'Charminar Police Station & Tourist Assistance',
        distance: '200 m from monument',
        phone: '+91 40 27854774',
        address: 'Charminar Road, Old City',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Apollo 24x7 Healthcare Hub',
        distance: '300 m',
        phone: '+91 40 23607777',
        address: 'Banjara Hills / Abids, Hyderabad',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'SBI / HDFC 24x7 ATM',
        distance: '150 m',
        phone: '1800-425-3800',
        address: 'Near Chowmahalla Palace Entrance',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Rajiv Gandhi International Airport (HYD - Shamshabad)',
        distance: '22 km via PVNR Elevated Expressway',
        estimatedTime: '30 mins cab / Pushpak Aero Express bus',
        estimatedCost: '₹250 Aero bus / ₹700 Uber',
        frequency: 'Voted India\'s best on-time international airport'
      },
      {
        type: 'Train',
        hubName: 'Secunderabad (SC) & Hyderabad Deccan Nampally (HYB)',
        distance: 'Central transit hubs',
        estimatedTime: '15 mins',
        estimatedCost: '₹80 auto / ₹20 Metro',
        frequency: 'Vande Bharat trains to Vizag, Tirupati, Bangalore'
      },
      {
        type: 'Metro',
        hubName: 'Hyderabad Metro Rail (Red, Blue & Green Lines)',
        distance: 'Connects Miyapur, Hitec City, MGBS, Old City',
        estimatedTime: 'Fastest urban commute',
        estimatedCost: '₹15 – ₹60',
        frequency: 'Every 4 to 5 mins'
      }
    ],
    isTrending: false,
    travelerCount: '790K+ this season'
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'City of Lakes, White Marble Palaces & Royal Romance',
    heroImage: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603288940356-9b044d50cbf1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Often crowned the Venice of the East, Udaipur sits around serene Lake Pichola, featuring the monumental City Palace, floating Taj Lake Palace, and enchanting rooftop dining.',
    rating: 4.9,
    reviewsCount: 3100,
    startingBudget: 13500,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Dec – Jan (Romantic winter holidays & weddings)',
      offSeason: 'April – June (Hot desert months)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Low',
    peakHours: 'Lake Pichola Sunset Boating & Ambrai Ghat: 5:00 PM – 7:30 PM',
    weather: {
      temp: 25,
      condition: 'Clear Sky & Lake Breeze',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 26, condition: 'Sunny' },
        { day: 'Sat', temp: 25, condition: 'Clear' },
        { day: 'Sun', temp: 24, condition: 'Pleasant' },
        { day: 'Mon', temp: 25, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The City of Lakes / Venice of the East',
      heritageKing: 'Maharana Udai Singh II & Maharana Pratap (Mewar Dynasty)',
      festivals: ['Mewar Festival', 'Shilpgram Crafts Mela', 'Gangaur Lake Procession'],
      traditions: 'Mewar miniature paintings, silver jewellery, puppets (Kathputli)',
      famousFor: ['City Palace Complex', 'Lake Pichola & Jag Mandir', 'Taj Lake Palace', 'Saheliyon-ki-Bari', 'Monsoon Palace']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Geetanjali Medical College & Hospital',
        distance: '4.5 km',
        phone: '+91 294 2500000',
        address: 'Hiran Magri, Udaipur',
        isOpen24x7: true,
        rating: 4.7
      },
      {
        type: 'Police',
        name: 'Old City Tourist Police Outpost',
        distance: '300 m from City Palace',
        phone: '+91 294 2420555',
        address: 'Jagdish Temple Chowk, Udaipur',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'City Care 24/7 Medicos',
        distance: '200 m',
        phone: '+91 294 2421234',
        address: 'Bhatiyani Chohatta, Udaipur',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'State Bank of India / HDFC ATM',
        distance: '100 m',
        phone: '1800-425-3800',
        address: 'Jagdish Temple Road',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Maharana Pratap Airport (UDR - Dabok)',
        distance: '22 km east of Old City',
        estimatedTime: '35 mins taxi',
        estimatedCost: '₹600 – ₹850',
        frequency: 'Daily nonstop flights from DEL, BOM, BLR, JAI'
      },
      {
        type: 'Train',
        hubName: 'Udaipur City Railway Station (UDZ)',
        distance: '3 km from Lake Pichola',
        estimatedTime: '10 mins auto',
        estimatedCost: '₹120 – ₹150',
        frequency: 'Vande Bharat trains to Jaipur and Delhi'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Local Auto-Rickshaws & Heritage Boats',
        distance: 'Cruises across Lake Pichola and Fateh Sagar',
        estimatedTime: 'Continuous',
        estimatedCost: 'Boat ride ₹300 – ₹500',
        frequency: 'Every 15 mins'
      }
    ],
    isTrending: true,
    travelerCount: '680K+ this season'
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'Monument to Eternal Love, Mughal Architecture & Heritage',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Home of the timeless Taj Mahal—one of the Seven Wonders of the World—Agra showcases the pinnacle of Mughal craftsmanship alongside the red sandstone Agra Fort and Fatehpur Sikri.',
    rating: 4.9,
    reviewsCount: 5200,
    startingBudget: 8500,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Dec – Feb (Pleasant winter weather & Taj Mahotsav)',
      offSeason: 'May – June (High summer)'
    },
    recommendedDuration: '2–3 Days',
    crowdLevel: 'High',
    trafficStatus: 'Moderate',
    peakHours: 'Taj Mahal East Gate Sunrise: 5:45 AM – 8:30 AM',
    weather: {
      temp: 25,
      condition: 'Sunny & Pleasant',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 26, condition: 'Sunny' },
        { day: 'Sat', temp: 25, condition: 'Clear' },
        { day: 'Sun', temp: 24, condition: 'Pleasant' },
        { day: 'Mon', temp: 26, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The Taj City / Seat of Mughals',
      heritageKing: 'Emperor Shah Jahan, Akbar the Great & Babur',
      festivals: ['Taj Mahotsav (10-day cultural fiesta)', 'Bateshwar Cattle Fair', 'Sulah-kul Peace Fair'],
      traditions: 'Pietra Dura (marble stone inlay work), Petha confectionery, Zardozi embroidery',
      famousFor: ['The Taj Mahal', 'Agra Fort Red Sandstone Palace', 'Fatehpur Sikri Ghost City', 'Mehtab Bagh Sunset View', 'Panchi Petha']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'S.N. Medical College & Hospital Agra',
        distance: '3.5 km',
        phone: '+91 562 2260353',
        address: 'Hospital Road, Agra',
        isOpen24x7: true,
        rating: 4.4
      },
      {
        type: 'Police',
        name: 'Taj Protection Police Station',
        distance: '150 m from East Gate',
        phone: '+91 562 2330085',
        address: 'Taj East Gate Road, Agra',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Taj Chemist & 24 Hours Wellness',
        distance: '200 m',
        phone: '+91 562 2420111',
        address: 'Fatehabad Road, Agra',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'HDFC Bank & SBI ATM',
        distance: '100 m',
        phone: '1800-425-3800',
        address: 'East Gate Complex, Agra',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Train',
        hubName: 'Gatimaan Express & Vande Bharat to Agra Cantt (AGC)',
        distance: '4 km from Taj Mahal',
        estimatedTime: 'Just 1 hour 40 mins from Delhi Hazrat Nizamuddin',
        estimatedCost: '₹750 – ₹1,500 chair car',
        frequency: 'Multiple superfast trains per day'
      },
      {
        type: 'Bus',
        hubName: 'Taj Express Highway (Yamuna Expressway)',
        distance: 'Direct highway from Delhi/Noida',
        estimatedTime: '2.5 hours car drive',
        estimatedCost: '₹1,800 – ₹2,500 private cab',
        frequency: '24/7 express tollway'
      },
      {
        type: 'Metro',
        hubName: 'Agra Metro (Yellow Line connecting Taj East Gate to Fort)',
        distance: 'New modern air-conditioned metro system',
        estimatedTime: 'Transit every 7 mins',
        estimatedCost: '₹10 – ₹20 token',
        frequency: 'High frequency'
      }
    ],
    isTrending: false,
    travelerCount: '2.4M+ this season'
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    tagline: 'Heart of the Nation, Seven Historic Cities & Street Food Capital',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'India\'s sprawling capital harmonizes ancient empires and contemporary vibrancy, encompassing Qutub Minar, Humayun’s Tomb, India Gate, Chandni Chowk street food, and Rashtrapati Bhavan.',
    rating: 4.7,
    reviewsCount: 5800,
    startingBudget: 10000,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Dec – Feb (Crisp winter sunshine & food walks)',
      offSeason: 'May – July (Peak loo summer)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'High',
    trafficStatus: 'Heavy',
    peakHours: 'Chandni Chowk & Connaught Place: 5:00 PM – 9:00 PM',
    weather: {
      temp: 24,
      condition: 'Sunny & Crisp Autumn',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 25, condition: 'Sunny' },
        { day: 'Sat', temp: 24, condition: 'Clear' },
        { day: 'Sun', temp: 23, condition: 'Pleasant' },
        { day: 'Mon', temp: 25, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'Dilli Dilwalo Ki / The Imperial Capital',
      heritageKing: 'Tomara Rajputs, Delhi Sultanate, Mughals & Sir Edwin Lutyens',
      festivals: ['Republic Day Parade (Kartavya Path)', 'Diwali Dilli Haat', 'Qutub Music Festival'],
      traditions: 'Old Delhi Chaat culture, Urdu poetry mushairas, Daryaganj Sunday book bazaar',
      famousFor: ['India Gate & Kartavya Path', 'Qutub Minar', 'Humayun\'s Tomb', 'Red Fort', 'Lotus Temple']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'AIIMS (All India Institute of Medical Sciences)',
        distance: '4.0 km from Connaught Place',
        phone: '+91 11 26588500',
        address: 'Ansari Nagar, New Delhi',
        isOpen24x7: true,
        rating: 4.9
      },
      {
        type: 'Police',
        name: 'Delhi Tourist Police Helpline & CP Post',
        distance: '100 m from Inner Circle CP',
        phone: '1093 / +91 11 23469500',
        address: 'Palika Bazaar / Connaught Place',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Apollo 24x7 & Guardian Pharmacy CP',
        distance: '150 m',
        phone: '+91 11 23412345',
        address: 'Block E, Connaught Place',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'SBI / Standard Chartered Global ATM',
        distance: '50 m',
        phone: '1800-425-3800',
        address: 'Inner Circle CP',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Indira Gandhi International Airport (DEL - T3 World-Class)',
        distance: '16 km southwest of CP',
        estimatedTime: '19 mins via Airport Express Metro',
        estimatedCost: '₹60 Metro / ₹450 Uber',
        frequency: 'India\'s premier aviation gateway'
      },
      {
        type: 'Metro',
        hubName: 'DMRC (Delhi Metro - 390+ km Network)',
        distance: 'Stations at every landmark',
        estimatedTime: 'Trains every 2 to 4 mins',
        estimatedCost: '₹10 – ₹60',
        frequency: 'World benchmark urban transit system'
      },
      {
        type: 'Train',
        hubName: 'New Delhi (NDLS), Old Delhi (DLI) & Hazrat Nizamuddin (NZM)',
        distance: 'Connecting entire nation',
        estimatedTime: 'Direct metro interchange',
        estimatedCost: '₹20 – ₹50',
        frequency: 'Hundreds of daily express trains'
      }
    ],
    isTrending: false,
    travelerCount: '2.8M+ this season'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley of India, Garden City & Craft Beer Hub',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Renowned for its salubrious year-round climate, lush botanical gardens, bustling Indiranagar craft microbreweries, and high-tech energy alongside the historic Bangalore Palace.',
    rating: 4.7,
    reviewsCount: 3600,
    startingBudget: 11000,
    bestTime: {
      months: 'Year-Round (Best Oct to March)',
      peakSeason: 'Dec – Jan (Lalbagh Flower Show & New Year)',
      offSeason: 'April (Warmest month, still moderate ~34°C)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'High',
    trafficStatus: 'Heavy',
    peakHours: 'Koramangala & Indiranagar: 6:00 PM – 10:30 PM',
    weather: {
      temp: 23,
      condition: 'Pleasant & Mild Breeze',
      rainProbability: 10,
      forecast: [
        { day: 'Fri', temp: 24, condition: 'Pleasant' },
        { day: 'Sat', temp: 23, condition: 'Clear' },
        { day: 'Sun', temp: 22, condition: 'Breezy' },
        { day: 'Mon', temp: 24, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The Garden City / Silicon Valley of India',
      heritageKing: 'Kempe Gowda I (Founder) & Tipu Sultan / Wodeyars',
      festivals: ['Lalbagh Republic Day Flower Show', 'Bengaluru Karaga (Oldest Festival)', 'Bangalore Literature Festival'],
      traditions: 'Filter coffee at Vidyarthi Bhavan, Sunday morning cycling at Cubbon Park, microbrewery tasting',
      famousFor: ['Cubbon Park & Vidhana Soudha', 'Lalbagh Botanical Gardens', 'Bangalore Palace', 'Indiranagar 100ft Road Cafes']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Manipal Hospital HAL Airport Road',
        distance: '3.0 km from Indiranagar',
        phone: '+91 80 25024444',
        address: '98 HAL Old Airport Rd, Bengaluru',
        isOpen24x7: true,
        rating: 4.8
      },
      {
        type: 'Police',
        name: 'Cubbon Park Police Station & Tourist Wing',
        distance: '500 m',
        phone: '+91 80 22942583',
        address: 'Kasturba Road, Bengaluru',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Apollo 24x7 Indiranagar / MG Road',
        distance: '200 m',
        phone: '+91 80 25251122',
        address: '100 Feet Road, Indiranagar',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'Canara Bank / HDFC Multi-Currency ATM',
        distance: '100 m',
        phone: '1800-425-0018',
        address: 'MG Road Metro Station Arcade',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Kempegowda International Airport (BLR - Terminal 2 Bamboo Garden)',
        distance: '35 km north',
        estimatedTime: '50 mins via Vayu Vajra KIA AC Bus / Cab',
        estimatedCost: '₹250 KIA Bus / ₹950 Uber',
        frequency: 'Voted World\'s Most Beautiful Airport Terminal by UNESCO Prix Versailles'
      },
      {
        type: 'Metro',
        hubName: 'Namma Metro (Purple & Green Lines)',
        distance: 'Spanning Whitefield, MG Road, Majestic, Kengeri',
        estimatedTime: 'Every 4 mins',
        estimatedCost: '₹10 – ₹60',
        frequency: 'Clean and rapid transit'
      },
      {
        type: 'Train',
        hubName: 'KSR Bengaluru (SBC) & Yesvantpur (YPR)',
        distance: 'Central Majestic junction',
        estimatedTime: 'Immediate metro link',
        estimatedCost: '₹20 – ₹50',
        frequency: 'Dozens of high speed expresses'
      }
    ],
    isTrending: false,
    travelerCount: '1.2M+ this season'
  },
  {
    id: 'mysore',
    name: 'Mysuru (Mysore)',
    state: 'Karnataka',
    tagline: 'City of Palaces, Sandalwood, Silk & Grand Dasara',
    heroImage: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The royal capital of Karnataka shines with the illuminated Mysore Palace (over 100,000 bulbs), Chamundi Hills, Ashtanga Yoga centers, fragrant sandalwood, and Mysore Pak sweet.',
    rating: 4.8,
    reviewsCount: 2950,
    startingBudget: 9000,
    bestTime: {
      months: 'September to March',
      peakSeason: 'October (World-Famous Mysore Dasara Jumbo Savari)',
      offSeason: 'May (Warm summer)'
    },
    recommendedDuration: '2–3 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Low',
    peakHours: 'Mysore Palace Illumination (Sundays & Holidays): 7:00 PM – 8:00 PM',
    weather: {
      temp: 24,
      condition: 'Pleasant & Breezy',
      rainProbability: 10,
      forecast: [
        { day: 'Fri', temp: 25, condition: 'Sunny' },
        { day: 'Sat', temp: 24, condition: 'Clear' },
        { day: 'Sun', temp: 23, condition: 'Pleasant' },
        { day: 'Mon', temp: 25, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The City of Palaces / Cultural Capital of Karnataka',
      heritageKing: 'Wodeyar Dynasty (Maharaja Krishnaraja Wadiyar IV)',
      festivals: ['Mysore Dasara (State Festival)', 'Yuva Dasara', 'Chamundeshwari Rathotsava'],
      traditions: 'Mysore silk weaving, Mysore painting, authentic Ashtanga Vinyasa Yoga capital',
      famousFor: ['Mysore Palace', 'Chamundeshwari Temple atop Chamundi Hills', 'Brindavan Gardens Musical Fountain', 'Guru Sweets Mysore Pak']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Apollo BGS Hospitals Kuvempunagar',
        distance: '3.0 km',
        phone: '+91 821 2568888',
        address: 'Adhichunchanagiri Road, Mysuru',
        isOpen24x7: true,
        rating: 4.7
      },
      {
        type: 'Police',
        name: 'Devaraja Police Station & Tourist Assistance',
        distance: '400 m from Palace',
        phone: '+91 821 2418306',
        address: 'Sayyaji Rao Road, Mysuru',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Mysore MedPlus 24 Hours',
        distance: '200 m',
        phone: '+91 821 2423456',
        address: 'Near Gandhi Square, Mysuru',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'State Bank of India Heritage Branch ATM',
        distance: '150 m',
        phone: '1800-425-3800',
        address: 'Palace North Gate',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Train',
        hubName: 'Mysuru Junction (MYS) - Vande Bharat Express',
        distance: '1.5 km from Palace',
        estimatedTime: 'Just 1 hour 45 mins from Bangalore KSR',
        estimatedCost: '₹350 – ₹700',
        frequency: 'Hourly fast trains from Bengaluru'
      },
      {
        type: 'Bus',
        hubName: 'Bengaluru-Mysuru 10-Lane Access-Controlled Expressway',
        distance: 'Direct 90-minute smooth highway run',
        estimatedTime: '1.5 to 2 hours',
        estimatedCost: '₹200 KSRTC Electric Bus / ₹1,500 cab',
        frequency: 'Buses every 5 mins from Bangalore'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Tonga Horse Carriages & Auto Rickshaws',
        distance: 'Heritage heritage circle',
        estimatedTime: 'Leisurely rides',
        estimatedCost: 'Tonga ₹200 – ₹300 / Auto ₹50 – ₹100',
        frequency: 'Available at palace gates'
      }
    ],
    isTrending: false,
    travelerCount: '620K+ this season'
  },
  {
    id: 'pondicherry',
    name: 'Puducherry (Pondicherry)',
    state: 'Puducherry',
    tagline: 'French Colonial Quarters, Auroville & Bohemian Beachside Cafes',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A charming seaside Union Territory with pastel French villas, bougainvillea-draped alleys in White Town, Sri Aurobindo Ashram, international township Auroville, and Promenade Beach.',
    rating: 4.8,
    reviewsCount: 2750,
    startingBudget: 10500,
    bestTime: {
      months: 'October to March',
      peakSeason: 'Dec – Jan (Chic winter, cafe culture & surfing)',
      offSeason: 'May – June (Humid coastal summer)'
    },
    recommendedDuration: '2–3 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Low',
    peakHours: 'Promenade Rock Beach (Vehicle-Free): 5:30 PM – 9:00 PM',
    weather: {
      temp: 28,
      condition: 'Coastal Breeze & Sunny',
      rainProbability: 12,
      forecast: [
        { day: 'Fri', temp: 29, condition: 'Sunny' },
        { day: 'Sat', temp: 28, condition: 'Clear' },
        { day: 'Sun', temp: 28, condition: 'Breezy' },
        { day: 'Mon', temp: 29, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The French Riviera of the East',
      heritageKing: 'French East India Company (Joseph François Dupleix) & Tamil Heritage',
      festivals: ['Bastille Day (July 14)', 'Auroville Birthday (Feb 28)', 'International Yoga Festival'],
      traditions: 'Franco-Tamil fusion cuisine, cycling in White Town, handmade paper making',
      famousFor: ['White Town French Quarter Alleys', 'Promenade Rock Beach', 'Auroville Matrimandir', 'Sri Aurobindo Ashram']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'JIPMER (Jawaharlal Institute of Postgraduate Medical Education)',
        distance: '4.5 km',
        phone: '+91 413 2272380',
        address: 'Dhanvantari Nagar, Gorimedu, Puducherry',
        isOpen24x7: true,
        rating: 4.9
      },
      {
        type: 'Police',
        name: 'Grand Bazaar & Tourist Police Beach Desk',
        distance: '200 m from Promenade',
        phone: '+91 413 2334000',
        address: 'Goubert Avenue, Puducherry',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Apollo 24x7 Pharmacy Mission Street',
        distance: '300 m',
        phone: '+91 413 2221234',
        address: 'Mission Street, Heritage Town',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'State Bank of India French Town ATM',
        distance: '100 m',
        phone: '1800-425-3800',
        address: 'Rue Suffren, White Town',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Bus',
        hubName: 'East Coast Road (ECR) Scenic Drive from Chennai',
        distance: '150 km south of Chennai',
        estimatedTime: '2.5 to 3 hours scenic coastal drive',
        estimatedCost: '₹150 bus / ₹2,000 cab',
        frequency: 'Non-stop buses from Chennai CMBT and Thiruvanmiyur'
      },
      {
        type: 'Train',
        hubName: 'Puducherry Railway Station (PDY)',
        distance: '1 km from White Town',
        estimatedTime: '5 mins auto',
        estimatedCost: '₹80',
        frequency: 'Daily express trains to Chennai and Bangalore'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Classic Vintage Bicycles & Scooters',
        distance: 'Every street in French Quarter',
        estimatedTime: 'Instant rental',
        estimatedCost: 'Bicycle ₹100/day, Scooter ₹350/day',
        frequency: 'The most popular way to explore'
      }
    ],
    isTrending: false,
    travelerCount: '510K+ this season'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tagline: 'Yoga Capital of the World, White Water Rafting & Ganga Aarti',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'At the foothills of the Himalayas along the emerald Ganges, Rishikesh is revered globally for spiritual ashrams, yoga retreats, thrilling white-water rafting, and the Beatles Ashram.',
    rating: 4.8,
    reviewsCount: 3340,
    startingBudget: 9500,
    bestTime: {
      months: 'September to April',
      peakSeason: 'March (International Yoga Festival) & Oct – Nov (Rafting peak)',
      offSeason: 'July – August (Monsoon river swells, rafting closed)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Moderate',
    peakHours: 'Triveni Ghat & Parmarth Niketan Evening Aarti: 5:45 PM – 7:30 PM',
    weather: {
      temp: 21,
      condition: 'Fresh Himalayan Air & Mountain Breeze',
      rainProbability: 5,
      forecast: [
        { day: 'Fri', temp: 22, condition: 'Sunny' },
        { day: 'Sat', temp: 21, condition: 'Clear' },
        { day: 'Sun', temp: 20, condition: 'Pleasant' },
        { day: 'Mon', temp: 22, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The Yoga Capital of the World',
      heritageKing: 'Garhwal Kings & Ancient Himalayan Rulers/Sages',
      festivals: ['International Yoga Festival', 'Ganga Dussehra', 'Kaanwar Mela'],
      traditions: 'Vedic chanting, Hatha yoga training, organic Ayurvedic sattvic diet',
      famousFor: ['Ram Jhula & Lakshman Jhula', 'Triveni Ghat Maha Aarti', 'The Beatles Ashram (Chaurasi Kutia)', 'Shivpuri White Water Rafting']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'AIIMS Rishikesh (Premier Himalayan Institute)',
        distance: '4.0 km from Ram Jhula',
        phone: '+91 135 2462929',
        address: 'Virbhadra Road, Rishikesh',
        isOpen24x7: true,
        rating: 4.8
      },
      {
        type: 'Police',
        name: 'Muni Ki Reti Tourist Police Station',
        distance: '400 m from Ram Jhula',
        phone: '+91 135 2430155',
        address: 'Ram Jhula Road, Rishikesh',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Himalayan Health Chemist 24 Hours',
        distance: '250 m',
        phone: '+91 135 2434567',
        address: 'Laxman Jhula Market',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'Punjab National Bank & SBI ATM',
        distance: '100 m',
        phone: '1800-180-2222',
        address: 'Near Ram Jhula Bridge Head',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Dehradun Jolly Grant Airport (DED)',
        distance: '21 km northwest',
        estimatedTime: '30 mins scenic highway cab',
        estimatedCost: '₹600 – ₹800',
        frequency: 'Daily nonstop flights from Delhi, Mumbai, Bengaluru'
      },
      {
        type: 'Train',
        hubName: 'Yog Nagari Rishikesh (YNRK) & Haridwar (HW)',
        distance: 'Modern Himalayan rail terminal',
        estimatedTime: 'Vande Bharat directly from Delhi in 4 hours',
        estimatedCost: '₹650 – ₹1,200',
        frequency: 'Daily express connectivity'
      },
      {
        type: 'Taxi/Cab',
        hubName: 'Rafting Jeeps & Shared E-Rickshaws',
        distance: 'Tapovan to Shivpuri rafting launch pads',
        estimatedTime: 'Continuous',
        estimatedCost: 'E-rickshaw ₹20 – ₹40 / Shared jeep ₹50',
        frequency: 'Every minute'
      }
    ],
    isTrending: true,
    travelerCount: '780K+ this season'
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    state: 'West Bengal',
    tagline: 'Champagne of Teas, Kanchenjunga Sunrise & Himalayan Toy Train',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Crowning the Lesser Himalayas, Darjeeling is celebrated for sunrise over Mt. Kanchenjunga (world’s 3rd highest peak) from Tiger Hill, world-renowned Darjeeling black tea, and UNESCO Toy Train.',
    rating: 4.8,
    reviewsCount: 2680,
    startingBudget: 11500,
    bestTime: {
      months: 'March to May & October to December',
      peakSeason: 'April – May (Spring rhododendrons) & Oct – Nov (Crystal clear mountain views)',
      offSeason: 'July – August (Heavy monsoon fog)'
    },
    recommendedDuration: '3–4 Days',
    crowdLevel: 'Medium',
    trafficStatus: 'Low',
    peakHours: 'Tiger Hill Sunrise: 4:30 AM – 6:00 AM',
    weather: {
      temp: 13,
      condition: 'Crisp Mountain Breeze & Pine Mist',
      rainProbability: 10,
      forecast: [
        { day: 'Fri', temp: 14, condition: 'Sunny' },
        { day: 'Sat', temp: 13, condition: 'Clear' },
        { day: 'Sun', temp: 12, condition: 'Chilly' },
        { day: 'Mon', temp: 14, condition: 'Sunny' }
      ]
    },
    culture: {
      epithet: 'The Queen of the Hills (Eastern Himalayas)',
      heritageKing: 'Kingdom of Sikkim, Chogyals & British Hill Sanitarium',
      festivals: ['Darjeeling Tea & Tourism Fest', 'Losar (Tibetan New Year)', 'Tihar (Diwali)'],
      traditions: 'Orthodox tea plucking, Tibetan momos & thukpa, Gorkha bravery folklore',
      famousFor: ['Tiger Hill Mt. Kanchenjunga Sunrise', 'Darjeeling Himalayan Railway (DHR Toy Train)', 'Happy Valley Tea Estate', 'Himalayan Mountaineering Institute']
    },
    emergencyServices: [
      {
        type: 'Hospital',
        name: 'Darjeeling District Hospital (Eden Hospital)',
        distance: '1.2 km',
        phone: '+91 354 2254218',
        address: 'Hospital Road, Darjeeling',
        isOpen24x7: true,
        rating: 4.3
      },
      {
        type: 'Police',
        name: 'Sadar Police Station & Mall Road Tourist Desk',
        distance: '300 m from Chowrasta',
        phone: '+91 354 2254422',
        address: 'Chowrasta Mall, Darjeeling',
        isOpen24x7: true
      },
      {
        type: 'Pharmacy',
        name: 'Frank Ross Pharmacy Mall Road',
        distance: '150 m',
        phone: '+91 354 2252111',
        address: 'Nehru Road, Chowrasta',
        isOpen24x7: true
      },
      {
        type: 'ATM',
        name: 'SBI & HDFC Bank ATM',
        distance: '100 m',
        phone: '1800-425-3800',
        address: 'Chowrasta Mall Square',
        isOpen24x7: true
      }
    ],
    transportation: [
      {
        type: 'Flight',
        hubName: 'Bagdogra International Airport (IXB)',
        distance: '68 km downhill via Rohini Road',
        estimatedTime: '2.5 to 3 hours mountain taxi',
        estimatedCost: '₹2,200 – ₹2,800 private cab / ₹300 shared jeep',
        frequency: 'Daily nonstop flights from DEL, CCU, BOM, BLR'
      },
      {
        type: 'Train',
        hubName: 'New Jalpaiguri (NJP) & Darjeeling Toy Train',
        distance: '72 km from hill station',
        estimatedTime: 'Direct trains across India to NJP',
        estimatedCost: 'Standard Indian Railways / ₹1,400 Toy Train joyride',
        frequency: 'Multiple daily Vande Bharat trains from Kolkata'
      },
      {
        type: 'Bus',
        hubName: 'Shared Hill Jeeps (Bolero/Sumo)',
        distance: 'Siliguri to Darjeeling Chowrasta',
        estimatedTime: '3 hours scenic climb',
        estimatedCost: '₹250 per seat',
        frequency: 'Every 15 mins from morning till 4 PM'
      }
    ],
    isTrending: false,
    travelerCount: '490K+ this season'
  }
];
