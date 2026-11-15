import { Hotel } from '../types/travel';

export const HOTELS_DATA: Hotel[] = [
  // GOA
  {
    id: 'hotel-goa-taj-exotica',
    name: 'Taj Exotica Resort & Spa, Goa',
    destinationId: 'goa',
    destinationName: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1420,
    startingPrice: 14500,
    roomAvailability: 4,
    hygieneIndicator: 4.9,
    distance: 'Directly on Benaulim Beach (50 m)',
    hotelType: 'Luxury',
    brand: 'Taj Hotels & Resorts',
    amenities: ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC', 'Family rooms'],
    description: 'Set along the sun-drenched coast of Benaulim overlooking the Arabian Sea, this 56-acre Mediterranean-inspired resort offers luxury villas, private plunge pools, Jiva Spa, and world-class Goan seafood.',
    locationAddress: 'Calwaddo, Benaulim, Salcete, Goa 403716',
    contact: {
      phone: '+91 832 6683333',
      email: 'exotica.goa@tajhotels.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '38 mins from Dabolim (GOI) / 60 mins from MOPA',
      fromRailway: '18 mins from Madgaon Junction (MAO)',
      estimatedCabFare: '₹900 – ₹1,200'
    },
    rooms: [
      {
        id: 'taj-deluxe-sea-view',
        name: 'Deluxe Sea View Room with Balcony',
        pricePerNight: 14500,
        capacity: '2 Adults, 1 Child',
        bedType: 'King Bed or Twin Beds',
        sizeSqFt: 580,
        amenities: ['Private Balcony', 'Ocean View', 'Complimentary Breakfast', 'Free Wi-Fi', 'Luxury Bathtub'],
        availableCount: 4,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'taj-villa-plunge-pool',
        name: 'Premium Sunset Villa with Private Plunge Pool',
        pricePerNight: 28000,
        capacity: '3 Adults or 2 Adults + 2 Kids',
        bedType: 'Grand King Bed',
        sizeSqFt: 1100,
        amenities: ['Private Plunge Pool', 'Personal Butler', 'Ocean Sunset Terrace', 'Free Airport Transfer', 'Jiva Spa Voucher'],
        availableCount: 2,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-goa-1',
        userName: 'Aarav Malhotra',
        rating: 5,
        date: 'March 2026',
        comment: 'Exceptional hospitality. The private beach access, breakfast buffet with fresh Goan poi and poi sandwiches, and the golf cart rides made our family vacation truly unforgettable.',
        helpfulCount: 38
      },
      {
        id: 'rev-goa-2',
        userName: 'Priya Sundaram',
        rating: 4.8,
        date: 'February 2026',
        comment: 'Jiva Spa treatments were top tier. Room was spacious and the balcony sunset view over Benaulim was magical.',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'hotel-goa-zostel-morjim',
    name: 'Zostel Plus Morjim, Goa',
    destinationId: 'goa',
    destinationName: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewsCount: 890,
    startingPrice: 1899,
    roomAvailability: 7,
    hygieneIndicator: 4.8,
    distance: '400 m from Morjim Turtle Beach',
    hotelType: 'Hostel',
    brand: 'Zostel',
    amenities: ['Swimming Pool', 'Wi-Fi', 'Restaurant', 'AC', 'Parking'],
    description: 'A vibrant backpacker haven and co-working paradise in North Goa. Enjoy infinity pool views over the Chapora river, community game nights, and serene turtle nesting beach vibes.',
    locationAddress: 'Morjim-Ashwem Road, Morjim, Goa 403512',
    contact: {
      phone: '+91 832 2974411',
      email: 'morjim@zostel.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '45 mins from MOPA',
      fromRailway: '35 mins from Thivim',
      estimatedCabFare: '₹700 – ₹1,000'
    },
    rooms: [
      {
        id: 'zostel-dorm-6',
        name: 'Mixed Air-Conditioned 6-Bed Dorm with Locker',
        pricePerNight: 1899,
        capacity: '1 Guest',
        bedType: 'Bunk Bed with Privacy Curtain',
        sizeSqFt: 350,
        amenities: ['High-speed Wi-Fi', 'Ensuite Bathroom', 'Personal Reading Lamp', 'Keycard Access'],
        availableCount: 6,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'zostel-private-room',
        name: 'Deluxe Private Room with River Balcony',
        pricePerNight: 4499,
        capacity: '2 Guests',
        bedType: 'Queen Bed',
        sizeSqFt: 420,
        amenities: ['River Balcony', 'Dedicated Work Desk', 'AC', 'Free High-speed Wi-Fi'],
        availableCount: 3,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-zostel-1',
        userName: 'Rohan Deshmukh',
        rating: 4.8,
        date: 'January 2026',
        comment: 'Best remote work stay in Goa! Great Wi-Fi, friendly travelers, and sunsets by the pool.',
        helpfulCount: 15
      }
    ]
  },

  // KERALA
  {
    id: 'hotel-kerala-kumarakom-lake-resort',
    name: 'Kumarakom Lake Resort, Kerala',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1250,
    startingPrice: 16500,
    roomAvailability: 3,
    hygieneIndicator: 5.0,
    distance: 'On the banks of Vembanad Lake',
    hotelType: 'Resort',
    brand: 'Heritage Haven Collection',
    amenities: ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC', 'Family rooms'],
    description: 'Heritage cottages recreated from 16th-century ancestral Kerala homes along a 250-meter meandering swimming pool, private houseboat charters, and authentic Ayurmana healing.',
    locationAddress: 'Vembanad Lake, Kumarakom, Kottayam, Kerala 686566',
    contact: {
      phone: '+91 481 2524900',
      email: 'reservations@klr.in',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '70 mins from Cochin International (COK)',
      fromRailway: '20 mins from Kottayam Railway (KTYM)',
      estimatedCabFare: '₹1,400 – ₹1,800'
    },
    rooms: [
      {
        id: 'klr-meandering-pool-villa',
        name: 'Heritage Villa with Meandering Pool Access',
        pricePerNight: 16500,
        capacity: '2 Adults, 1 Child',
        bedType: 'Antique King Four-Poster Bed',
        sizeSqFt: 650,
        amenities: ['Direct Pool Access from Verandah', 'Open-roof Courtyard Bathroom', 'Daily Sunset Cruise', 'Complimentary Breakfast'],
        availableCount: 3,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'klr-presidential-suite-pool',
        name: 'Presidential Suite with Private Lakefront Pool',
        pricePerNight: 32000,
        capacity: '4 Guests',
        bedType: '2 King Beds',
        sizeSqFt: 1300,
        amenities: ['Private Infinity Pool', 'Vembanad Lake Panorama', 'Private Butler', 'Ayurvedic Massage Session Included'],
        availableCount: 1,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-klr-1',
        userName: 'Meenakshi Raman',
        rating: 5,
        date: 'March 2026',
        comment: 'Prince Charles celebrated his 65th birthday here, and you immediately see why. Stepping directly into the meandering pool from your room veranda is an absolute dream.',
        helpfulCount: 42
      }
    ]
  },

  // JAIPUR
  {
    id: 'hotel-jaipur-rambagh-palace',
    name: 'Rambagh Palace, Jaipur',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    heroImage: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1890,
    startingPrice: 24000,
    roomAvailability: 2,
    hygieneIndicator: 5.0,
    distance: '3.2 km from City Palace / Hawa Mahal',
    hotelType: 'Luxury',
    brand: 'Taj Hotels & Resorts',
    amenities: ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC', 'Family rooms'],
    description: 'Former residence of the Maharaja of Jaipur, Rambagh Palace was voted TripAdvisor’s #1 Hotel in the World. Features 47 acres of Mughal gardens with peacocks, Polo Bar, and regal royal suites.',
    locationAddress: 'Bhawani Singh Road, Jaipur, Rajasthan 302005',
    contact: {
      phone: '+91 141 2385700',
      email: 'rambagh.jaipur@tajhotels.com',
      receptionHours: '24 Hours Royal Concierge'
    },
    transitTimes: {
      fromAirport: '18 mins from Jaipur International (JAI)',
      fromRailway: '12 mins from Jaipur Junction (JP)',
      estimatedCabFare: '₹350 – ₹500'
    },
    rooms: [
      {
        id: 'rambagh-palace-room',
        name: 'Palace Room with Courtyard Garden View',
        pricePerNight: 24000,
        capacity: '2 Adults',
        bedType: 'Royal Four-Poster King Bed',
        sizeSqFt: 550,
        amenities: ['Heritage Architecture', 'Champagne Breakfast', 'Peacock Garden View', 'Fine Italian Marble Bath'],
        availableCount: 2,
        image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rambagh-maharani-suite',
        name: 'Grand Royal Suite (Maharani Suite)',
        pricePerNight: 55000,
        capacity: '2 Adults, 2 Children',
        bedType: 'Emperor Royal Bed',
        sizeSqFt: 1400,
        amenities: ['Private Royal Salon', 'Antique Chandeliers', 'Personal Butler 24x7', 'Vintage Car Airport Pick-up'],
        availableCount: 1,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-rambagh-1',
        userName: 'Vikramaditya Rathore',
        rating: 5,
        date: 'February 2026',
        comment: 'Living like a Maharaja! The afternoon high tea on the lawns with peacocks roaming freely was straight out of a royal fairy tale.',
        helpfulCount: 56
      }
    ]
  },
  {
    id: 'hotel-jaipur-haveli-heritage',
    name: 'Alsisar Haveli - Heritage Hotel',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewsCount: 960,
    startingPrice: 4800,
    roomAvailability: 5,
    hygieneIndicator: 4.8,
    distance: '1.5 km from Old Pink City Bazaars',
    hotelType: 'Homestay',
    brand: 'Heritage Haven Collection',
    amenities: ['Swimming Pool', 'Breakfast', 'Wi-Fi', 'Parking', 'Restaurant', 'AC'],
    description: 'An authentic 1892 Rajput nobleman\'s haveli with traditional Shekhawati fresco paintings, courtyards, fountain pool, and cozy folk music evenings.',
    locationAddress: 'Sansar Chandra Road, Jaipur 302001',
    contact: {
      phone: '+91 141 2368290',
      email: 'alsisar@alsisar.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '22 mins',
      fromRailway: '8 mins',
      estimatedCabFare: '₹200 – ₹350'
    },
    rooms: [
      {
        id: 'haveli-deluxe',
        name: 'Heritage Deluxe Room with Carved Archways',
        pricePerNight: 4800,
        capacity: '2 Guests',
        bedType: 'Carved Wood Queen Bed',
        sizeSqFt: 450,
        amenities: ['AC', 'Courtyard View', 'Free Wi-Fi', 'Traditional Rajasthani Breakfast'],
        availableCount: 5,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-alsisar-1',
        userName: 'Sanya Kapoor',
        rating: 4.7,
        date: 'January 2026',
        comment: 'Stunning courtyard pool and very peaceful despite being so close to the bustling city center. Food was delicious.',
        helpfulCount: 19
      }
    ]
  },

  // CHENNAI
  {
    id: 'hotel-chennai-itc-grand-chola',
    name: 'ITC Grand Chola, A Luxury Collection Hotel',
    destinationId: 'chennai',
    destinationName: 'Chennai',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 2150,
    startingPrice: 11500,
    roomAvailability: 6,
    hygieneIndicator: 4.9,
    distance: '8 km from Marina Beach / 15 mins to Airport',
    hotelType: 'Luxury',
    brand: 'Marriott Bonvoy / ITC',
    amenities: ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC', 'Family rooms'],
    description: 'A grand tribute to Southern India’s golden Chola Dynasty, this palace hotel features magnificent white marble carving, 10 signature restaurants including Bukhara/Peshawri, and Kaya Kalp royal spa.',
    locationAddress: '63 Mount Road, Guindy, Chennai 600032',
    contact: {
      phone: '+91 44 22200000',
      email: 'reservations.itcgrandchola@itchotels.in',
      receptionHours: '24 Hours Concierge'
    },
    transitTimes: {
      fromAirport: '15 mins from Chennai International (MAA)',
      fromRailway: '25 mins from Chennai Central',
      estimatedCabFare: '₹350 – ₹500'
    },
    rooms: [
      {
        id: 'chola-executive-club',
        name: 'Executive Club Grand Marble Room',
        pricePerNight: 11500,
        capacity: '2 Adults',
        bedType: 'King Featherbed',
        sizeSqFt: 520,
        amenities: ['Marble Bathroom', 'Express Check-in', 'Buffet Breakfast at Madras Pavilion', 'High-speed Wi-Fi'],
        availableCount: 6,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-chola-1',
        userName: 'Karthik Subramanian',
        rating: 5,
        date: 'March 2026',
        comment: 'Architecture is awe-inspiring. The grand steps, Chola bronze artifacts, and the breakfast spread at Madras Pavilion are unparalleled.',
        helpfulCount: 31
      }
    ]
  },

  // MANALI
  {
    id: 'hotel-manali-solang-valley-resort',
    name: 'Solang Valley Resort & Spa',
    destinationId: 'manali',
    destinationName: 'Manali',
    heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewsCount: 1120,
    startingPrice: 7999,
    roomAvailability: 4,
    hygieneIndicator: 4.8,
    distance: 'Right on the banks of Beas River in Solang',
    hotelType: 'Resort',
    brand: 'Boutique Collection',
    amenities: ['Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC', 'Family rooms'],
    description: 'Surrounded by deodar cedar pine groves with uninterrupted views of snow-clad glaciers, bonfire evenings, open lawns beside the Beas river, and close proximity to the Atal Tunnel.',
    locationAddress: 'VPO Palchan, Solang Valley, Manali 175131',
    contact: {
      phone: '+91 1902 256150',
      email: 'reservations@solangvalleyresort.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '90 mins from Kullu Bhuntar Airport',
      fromRailway: 'Mall Road is 15 mins away',
      estimatedCabFare: '₹600 – ₹800'
    },
    rooms: [
      {
        id: 'manali-glacier-deluxe',
        name: 'Glacier View Pine Wood Suite with Fireplace',
        pricePerNight: 7999,
        capacity: '2 Adults, 1 Child',
        bedType: 'King Bed with Heated Blanket',
        sizeSqFt: 540,
        amenities: ['Snow Peak Balcony', 'Room Heating', 'Hot Water Tub', 'Daily Mountain Breakfast'],
        availableCount: 4,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-solang-1',
        userName: 'Tanvi Sharma',
        rating: 5,
        date: 'February 2026',
        comment: 'Waking up to fresh snowfall on the balcony and drinking hot Kahwa while looking at the Beas river was pure bliss.',
        helpfulCount: 28
      }
    ]
  },

  // UDAIPUR
  {
    id: 'hotel-udaipur-taj-lake-palace',
    name: 'Taj Lake Palace, Udaipur',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1680,
    startingPrice: 32000,
    roomAvailability: 2,
    hygieneIndicator: 5.0,
    distance: 'Floating island in the center of Lake Pichola (Access via private boat)',
    hotelType: 'Luxury',
    brand: 'Taj Hotels & Resorts',
    amenities: ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Gym', 'Spa', 'Restaurant', 'AC'],
    description: 'Built in 1746 by Maharana Jagat Singh II as a royal pleasure palace on Lake Pichola, this white marble jewel is accessible exclusively by private heritage motorboat.',
    locationAddress: 'P.O. Box 5, Lake Pichola, Udaipur, Rajasthan 313001',
    contact: {
      phone: '+91 294 2428800',
      email: 'lakepalace.udaipur@tajhotels.com',
      receptionHours: '24 Hours Royal Butler Service'
    },
    transitTimes: {
      fromAirport: '40 mins from Udaipur Airport (UDR)',
      fromRailway: '15 mins to private jetty',
      estimatedCabFare: '₹600 – ₹800'
    },
    rooms: [
      {
        id: 'taj-lake-palace-suite',
        name: 'Palace Lake View Suite with Jharokha Window',
        pricePerNight: 32000,
        capacity: '2 Guests',
        bedType: 'Royal Four-Poster Bed',
        sizeSqFt: 620,
        amenities: ['Direct Lake Pichola View', 'Private Motorboat Transfers', 'Royal Champagne Welcome', 'Heritage Spa Voucher'],
        availableCount: 2,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-lakepalace-1',
        userName: 'Siddharth Oberoi',
        rating: 5,
        date: 'March 2026',
        comment: 'There is nothing else like it on Earth. The private boat ride, rose petal showers on arrival, and candle-lit dinner overlooking City Palace are heavenly.',
        helpfulCount: 65
      }
    ]
  },

  // ANDAMAN
  {
    id: 'hotel-andaman-barefoot-havelock',
    name: 'Barefoot at Havelock (Radhanagar Beach)',
    destinationId: 'andaman',
    destinationName: 'Andaman & Nicobar',
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewsCount: 780,
    startingPrice: 12500,
    roomAvailability: 3,
    hygieneIndicator: 4.9,
    distance: 'Direct trail to Radhanagar Beach (Beach No. 7)',
    hotelType: 'Resort',
    brand: 'Boutique Collection',
    amenities: ['Breakfast', 'Buffet', 'Wi-Fi', 'Spa', 'Restaurant', 'AC', 'Family rooms'],
    description: 'Nestled in rainforest foliage steps away from Asia’s finest white-sand beach, featuring eco-crafted thatched cottages, scuba diving center, and bird watching.',
    locationAddress: 'Beach No. 7, Radhanagar, Swaraj Dweep (Havelock), Andaman 744211',
    contact: {
      phone: '+91 44 43444100',
      email: 'stay@barefootindia.com',
      receptionHours: '06:00 AM – 11:00 PM'
    },
    transitTimes: {
      fromAirport: 'Catamaran ferry from Port Blair to Havelock (90m), then 20m cab',
      fromRailway: 'Island location',
      estimatedCabFare: '₹500 Island cab'
    },
    rooms: [
      {
        id: 'barefoot-andaman-villa',
        name: 'Andaman Nicobari Thatched Cottage',
        pricePerNight: 12500,
        capacity: '2 Adults, 1 Child',
        bedType: 'Teakwood King Bed',
        sizeSqFt: 580,
        amenities: ['Private Rain Canopy Verandah', 'Organic Toiletries', 'Tropical Breakfast', 'Direct Beach Path'],
        availableCount: 3,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-barefoot-1',
        userName: 'Ananya Roy',
        rating: 5,
        date: 'January 2026',
        comment: 'Walking out of your jungle cottage right onto Radhanagar beach barefoot for sunset is pure paradise.',
        helpfulCount: 24
      }
    ]
  },

  // VARANASI
  {
    id: 'hotel-varanasi-brijrama-palace',
    name: 'BrijRama Palace - A Heritage Hotel on Darbhanga Ghat',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1350,
    startingPrice: 18500,
    roomAvailability: 2,
    hygieneIndicator: 5.0,
    distance: 'Right on Darbhanga Ghat / 5 mins walk to Dashashwamedh Aarti',
    hotelType: 'Luxury',
    brand: 'Heritage Haven Collection',
    amenities: ['Breakfast', 'Buffet', 'Wi-Fi', 'Spa', 'Restaurant', 'AC'],
    description: 'An 18th-century Maratha palace perched atop Darbhanga Ghat with private Bajra boat transfers, South Asian classical flute recitals at sunrise, and purely vegetarian fine dining.',
    locationAddress: 'Darbhanga Ghat, Dashashwamedh, Varanasi 221001',
    contact: {
      phone: '+91 542 2452222',
      email: 'reservations@brijramapalace.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '45 mins cab + private royal boat ride from Rajghat',
      fromRailway: '20 mins from Varanasi Jn',
      estimatedCabFare: '₹700 – ₹900'
    },
    rooms: [
      {
        id: 'brijrama-river-view',
        name: 'Darbhanga Ganga View Royal Suite',
        pricePerNight: 18500,
        capacity: '2 Guests',
        bedType: 'Heritage King Bed',
        sizeSqFt: 580,
        amenities: ['Sacred Ganga River View', 'Sunrise Boat Ride Included', 'Pure Vegetarian Breakfast', 'Classical Music Soirée'],
        availableCount: 2,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-brijrama-1',
        userName: 'Gautam Trivedi',
        rating: 5,
        date: 'February 2026',
        comment: 'Arrival by private boat on the Ganga followed by a traditional Aarti welcome made this the most spiritually uplifting hotel stay of my life.',
        helpfulCount: 39
      }
    ]
  },

  // OOTY
  {
    id: 'hotel-ooty-savoy-ihcl',
    name: 'Savoy - IHCL SeleQtions, Ooty',
    destinationId: 'ooty',
    destinationName: 'Ooty',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewsCount: 940,
    startingPrice: 11000,
    roomAvailability: 4,
    hygieneIndicator: 4.9,
    distance: '1.2 km from Botanical Garden / 800 m from Charing Cross',
    hotelType: 'Resort',
    brand: 'Taj Hotels & Resorts',
    amenities: ['Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'Family rooms'],
    description: 'Colonial 180-year-old English cottage resort with working wood fireplaces, Nilgiri tea tasting on manicured lawns, and cozy highland charm.',
    locationAddress: '77 Sylks Road, Ooty, Tamil Nadu 643001',
    contact: {
      phone: '+91 423 2225500',
      email: 'savoy.ooty@tajhotels.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '2.5 hours from Coimbatore (CJB)',
      fromRailway: '10 mins from Ooty Railway Station',
      estimatedCabFare: '₹2,200 cab from Coimbatore'
    },
    rooms: [
      {
        id: 'savoy-heritage-room',
        name: 'Heritage Cottage with Working Wood Fireplace',
        pricePerNight: 11000,
        capacity: '2 Adults, 1 Child',
        bedType: 'Plush King Bed',
        sizeSqFt: 480,
        amenities: ['Real Wood Fireplace (Lit Daily)', 'English Breakfast', 'Lawn View', 'Nilgiri Tea Hamper'],
        availableCount: 4,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-savoy-1',
        userName: 'Deepa Krishnan',
        rating: 4.9,
        date: 'March 2026',
        comment: 'Having the staff light up the real wood fireplace at 7 PM while outside was 12°C was so comforting. Excellent scones and tea!',
        helpfulCount: 20
      }
    ]
  },

  // COORG
  {
    id: 'hotel-coorg-earthen-haven',
    name: 'The Tamara Coorg - Eco Luxury Retreat',
    destinationId: 'coorg',
    destinationName: 'Coorg',
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 1180,
    startingPrice: 17500,
    roomAvailability: 3,
    hygieneIndicator: 5.0,
    distance: 'Set inside 180-acre organic coffee and spice plantation',
    hotelType: 'Luxury',
    brand: 'Boutique Collection',
    amenities: ['Swimming Pool', 'Breakfast', 'Buffet', 'Wi-Fi', 'Parking', 'Gym', 'Spa', 'Restaurant', 'AC'],
    description: 'Elevated wooden cottages built on stilts through organic coffee and cardamom plantations, waterfall yoga decks, custom coffee blending sessions, and zero single-use plastic.',
    locationAddress: 'Kabbinakad Estate, Yevakapadi, Coorg 571212',
    contact: {
      phone: '+91 8272 258000',
      email: 'reservations@thetamara.com',
      receptionHours: '24 Hours Front Desk'
    },
    transitTimes: {
      fromAirport: '2.5 hours from Kannur International (CNN)',
      fromRailway: '2.5 hours from Mysuru Junction',
      estimatedCabFare: '₹2,500 cab'
    },
    rooms: [
      {
        id: 'tamara-suite-cottage',
        name: 'Luxury Wooden Cottage on Stilts',
        pricePerNight: 17500,
        capacity: '2 Adults',
        bedType: 'Handcrafted Teak King Bed',
        sizeSqFt: 620,
        amenities: ['Forest Canopy Balcony', 'Plantation Tour Included', 'Coffee Tasting Workshop', 'Organic Breakfast'],
        availableCount: 3,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-tamara-1',
        userName: 'Varun Nair',
        rating: 5,
        date: 'February 2026',
        comment: 'Pure peace. You literally wake up inside the clouds with birds chirping and fresh coffee brewing. Worth every penny.',
        helpfulCount: 27
      }
    ]
  }
];
