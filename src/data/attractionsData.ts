import { Attraction } from '../types/travel';

export const ATTRACTIONS_DATA: Attraction[] = [
  // GOA
  {
    id: 'attraction-fort-aguada',
    name: 'Fort Aguada & Lighthouse',
    destinationId: 'goa',
    destinationName: 'Goa',
    category: 'Heritage',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    reviewsCount: 2850,
    entryFee: '₹50 (Indians) / ₹300 (Foreigners)',
    openingTime: '09:00 AM',
    closingTime: '06:00 PM',
    peakHours: '04:00 PM – 06:00 PM (Sunset timing)',
    recommendedDuration: '2 hours',
    holidayInfo: 'Open all days including national holidays',
    description: 'A 17th-century Portuguese fortress standing proudly at the confluence of the Mandovi River and the Arabian Sea, featuring a grand four-storey freshwater reservoir that supplied passing ships.',
    history: 'Constructed in 1612 under Portuguese Governor Jeronimo de Azevedo to guard against the Marathas and Dutch ships. "Aguada" translates to "Watering Place" in Portuguese.',
    nearbyRestaurants: ['Fisherman\'s Wharf Candolim', 'Calamari Bathed & Bunked', 'Tuscany Gardens'],
    nearbyHotels: ['Taj Fort Aguada Resort', 'Vivanta Goa', 'Heritage Village Resort'],
    contact: '+91 832 2494200 (Goa Tourism Development)',
    reviews: [
      {
        id: 'rev-aguada-1',
        userName: 'Sanjay Dutt',
        rating: 5,
        date: 'March 2026',
        comment: 'Mesmerizing panoramic views of the Arabian Sea crashing against the red laterite ramparts. Best visited right around 4:30 PM for golden hour photography.',
        helpfulCount: 26
      }
    ]
  },
  {
    id: 'attraction-basilica-bom-jesus',
    name: 'Basilica of Bom Jesus (UNESCO Site)',
    destinationId: 'goa',
    destinationName: 'Goa',
    category: 'Heritage',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewsCount: 3200,
    entryFee: 'Free (Donation voluntary)',
    openingTime: '08:30 AM',
    closingTime: '05:30 PM',
    peakHours: '11:00 AM – 02:00 PM',
    recommendedDuration: '1.5 hours',
    holidayInfo: 'Sunday Mass hours: 08:00 AM & 09:15 AM (Visitors restricted during service)',
    description: 'World-famous Baroque Catholic basilica holding the sacred mortal remains of St. Francis Xavier in a silver casket inside Old Goa.',
    history: 'Consecrated in May 1605, this basilica represents one of the finest examples of Jesuit architecture in Asia and is constructed out of unplastered black laterite stone.',
    nearbyRestaurants: ['The Riverhouse Old Goa', 'Assa Cafe & Bakery'],
    nearbyHotels: ['The Postcard Cuelim', 'DoubleTree by Hilton Panaji'],
    reviews: [
      {
        id: 'rev-bom-1',
        userName: 'Maria Fernandes',
        rating: 5,
        date: 'February 2026',
        comment: 'Intricate gilded altar and profound peacefulness. The historical museum inside reveals fascinating Portuguese Goa history.',
        helpfulCount: 30
      }
    ]
  },

  // KERALA
  {
    id: 'attraction-alleppey-backwaters',
    name: 'Alleppey Backwaters & Punnamada Lake',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    category: 'Nature',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 4500,
    entryFee: 'Day cruise ₹800 – ₹1,500 / Overnight Kettuvallam Houseboat ₹8,500+',
    openingTime: '07:00 AM',
    closingTime: '06:00 PM',
    peakHours: '11:00 AM – 04:00 PM',
    recommendedDuration: '4 hours (Day cruise) or 1 Night (Houseboat stay)',
    holidayInfo: 'Boats operate 365 days; special celebrations during August Nehru Trophy Boat Race',
    description: 'Glide quietly through labyrinthine canals, vast lotus ponds, and emerald paddy fields below sea level on traditional bamboo-thatched houseboats.',
    history: 'The traditional houseboats (Kettuvallams) were originally constructed to transport spices and rice grains from Kuttanad to the port of Kochi before being transformed into luxury floating homes.',
    nearbyRestaurants: ['Thaff Restaurant Alleppey', 'Harbour Restaurant', 'Mushroom Houseboat Bistro'],
    nearbyHotels: ['Kumarakom Lake Resort', 'Marari Beach Resort', 'Lake Palace Resort'],
    reviews: [
      {
        id: 'rev-kerala-1',
        userName: 'Sunita Menon',
        rating: 5,
        date: 'March 2026',
        comment: 'Fresh Karimeen Pollichathu (pearl spot fish) prepared on board while sailing through serene water lilies is an unmatched experience.',
        helpfulCount: 48
      }
    ]
  },

  // JAIPUR
  {
    id: 'attraction-amber-fort',
    name: 'Amber Fort (Amer Fort)',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    category: 'Heritage',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603288940356-9b044d50cbf1?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 4800,
    entryFee: '₹200 (Indian Adults) / ₹500 (Foreigners)',
    openingTime: '08:00 AM',
    closingTime: '06:00 PM (Night viewing 07:00 PM – 09:00 PM)',
    peakHours: '10:30 AM – 02:00 PM',
    recommendedDuration: '2.5–3 hours',
    holidayInfo: 'Open daily; Sound & Light show presented in English at 7:30 PM, Hindi at 8:30 PM',
    description: 'Rising majestically above Maota Lake, this UNESCO hilltop fort is famed for its artistic Hindu-Rajput style elements, massive ramparts, and the breathtaking Sheesh Mahal (Mirror Palace).',
    history: 'Founded by Raja Man Singh I in 1592 and later expanded by Mirza Raja Jai Singh, the fort served as the principal seat of Kachhwaha Rajputs before Jaipur was planned.',
    nearbyRestaurants: ['1135 AD Fine Dining inside Fort', 'Surabhi Restaurant', 'The Stag Rooftop Restro Cafe'],
    nearbyHotels: ['Rambagh Palace', 'Alsisar Haveli', 'Samode Palace'],
    reviews: [
      {
        id: 'rev-amber-1',
        userName: 'Divya Singhania',
        rating: 5,
        date: 'February 2026',
        comment: 'Sheesh Mahal with a single candlelight reflecting in thousands of Belgian convex mirrors left us completely speechless. Must take a certified audio guide!',
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'attraction-hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    category: 'Heritage',
    heroImage: 'https://images.unsplash.com/photo-1603288940356-9b044d50cbf1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603288940356-9b044d50cbf1?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewsCount: 3900,
    entryFee: '₹50 (Indians) / ₹200 (Foreigners)',
    openingTime: '09:00 AM',
    closingTime: '05:00 PM',
    peakHours: '09:30 AM – 11:30 AM (Best morning light)',
    recommendedDuration: '1.5 hours',
    holidayInfo: 'Open all days',
    description: 'A five-story pyramidal pink sandstone facade boasting 953 intricately carved jharokha honeycomb windows that allowed royal ladies to observe street processions unseen.',
    history: 'Built in 1799 by Maharaja Sawai Pratap Singh and designed by Lal Chand Ustad in the form of the crown of Lord Krishna.',
    nearbyRestaurants: ['Tattoo Cafe & Lounge (Iconic view opposite)', 'Wind View Cafe', 'Laxmi Mishthan Bhandar (LMB)'],
    nearbyHotels: ['Rambagh Palace', 'Heritage Haveli', 'ITC Rajputana'],
    reviews: [
      {
        id: 'rev-hawa-1',
        userName: 'Amitav Ghosh',
        rating: 4.8,
        date: 'January 2026',
        comment: 'Sitting across the street at Tattoo Cafe with a cup of spiced masala chai while looking at Hawa Mahal in the morning light is an absolute must-do.',
        helpfulCount: 34
      }
    ]
  },

  // CHENNAI
  {
    id: 'attraction-kapaleeshwarar-temple',
    name: 'Kapaleeshwarar Temple, Mylapore',
    destinationId: 'chennai',
    destinationName: 'Chennai',
    category: 'Spiritual',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 3400,
    entryFee: 'Free entry (Special darshan ₹50)',
    openingTime: '05:30 AM',
    closingTime: '12:30 PM & 04:30 PM – 09:30 PM',
    peakHours: '06:00 PM – 08:30 PM (Evening Deeparadhana)',
    recommendedDuration: '1.5 hours',
    holidayInfo: 'Annual Panguni Peruvizha chariot festival celebrated with grand pump in March/April',
    description: 'The crowning masterpiece of Dravidian temple architecture in Chennai, dedicated to Lord Shiva (Kapaleeshwarar) and Goddess Karpagambal with a soaring 37-meter rainbow gopuram.',
    history: 'Originally built by the 7th-century Pallavas, and subsequently rebuilt by the Vijayanagara Nayak emperors in the 16th century.',
    nearbyRestaurants: ['Rayar\'s Mess Mylapore (Legendary Ghee Podi Idli)', 'Mami Tiffin Stall', 'Saravana Bhavan Luz'],
    nearbyHotels: ['ITC Grand Chola', 'The Leela Palace Chennai', 'Taj Coromandel'],
    reviews: [
      {
        id: 'rev-kapa-1',
        userName: 'S. Rajagopalan',
        rating: 5,
        date: 'February 2026',
        comment: 'The scent of jasmine garlands, reverberation of Nadaswaram bells, and the sacred temple tank at sunset create pure divine serenity.',
        helpfulCount: 41
      }
    ]
  },

  // AGRA
  {
    id: 'attraction-taj-mahal',
    name: 'The Taj Mahal (UNESCO World Heritage Site)',
    destinationId: 'agra',
    destinationName: 'Agra',
    category: 'Heritage',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewsCount: 8200,
    entryFee: '₹50 (Indian Citizen) + ₹200 (Main Mausoleum) / ₹1,100 (Foreigner)',
    openingTime: '30 mins before sunrise',
    closingTime: '30 mins before sunset',
    peakHours: 'Sunrise (05:45 AM – 08:00 AM) & Sunset (04:30 PM – 06:15 PM)',
    recommendedDuration: '3 hours',
    holidayInfo: 'CLOSED EVERY FRIDAY for general public prayers',
    description: 'An ivory-white marble mausoleum on the south bank of the Yamuna River, commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his beloved wife Mumtaz Mahal.',
    history: 'Built over 22 years by 20,000 artisans utilizing translucent white Makrana marble from Rajasthan, jasper from Punjab, and turquoise from Tibet.',
    nearbyRestaurants: ['Pinch of Spice Fatehabad Rd', 'Peshawri at ITC Mughal', 'Dasaprakash'],
    nearbyHotels: ['The Oberoi Amarvilas (Uninterrupted views from every room)', 'ITC Mughal', 'Tajview Agra'],
    reviews: [
      {
        id: 'rev-taj-1',
        userName: 'Elena Rostova',
        rating: 5,
        date: 'March 2026',
        comment: 'No photo does justice to seeing the marble dome turn soft blush pink as the sun crests the morning mist. Absolutely ethereal.',
        helpfulCount: 75
      }
    ]
  },

  // VARANASI
  {
    id: 'attraction-dashashwamedh-ghat',
    name: 'Dashashwamedh Ghat & Evening Ganga Aarti',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    category: 'Spiritual',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewsCount: 6100,
    entryFee: 'Free to attend from Ghat steps / ₹250 – ₹400 for River Boat seat',
    openingTime: '24 Hours Open',
    closingTime: '24 Hours Open',
    peakHours: '06:15 PM – 07:45 PM (Maha Aarti ceremony)',
    recommendedDuration: '2 hours',
    holidayInfo: 'Conducted every single evening without interruption for centuries',
    description: 'The most sacred and vibrant ghat on the Ganges in Varanasi, where seven young priests perform a synchronized cosmic fire offering with multi-tiered brass lamps, conch shells, and incense.',
    history: 'According to Hindu lore, Lord Brahma created this ghat to welcome Lord Shiva and performed the Dasa-Ashwamedha yajna (ten-horse sacrifice) here.',
    nearbyRestaurants: ['Kashi Chat Bhandar', 'Dolphin Restaurant (Rooftop river view)', 'Blue Lassi Shop'],
    nearbyHotels: ['BrijRama Palace', 'Taj Ganges Varanasi', 'Amritara Suryauday Haveli'],
    reviews: [
      {
        id: 'rev-ganga-1',
        userName: 'Anand Paranjpe',
        rating: 5,
        date: 'February 2026',
        comment: 'Sitting on a wooden boat amidst floating marigold diyas while the chants resound across the river gives you goosebumps. The true heartbeat of Bharat.',
        helpfulCount: 68
      }
    ]
  }
];
