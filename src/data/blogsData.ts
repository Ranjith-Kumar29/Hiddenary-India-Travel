import { TravelBlog } from '../types/travel';

export const BLOGS_DATA: TravelBlog[] = [
  {
    id: 'blog-goa-beyond-beaches',
    title: 'Goa Beyond the Shacks: 7 Secret Portuguese Fontainhas Mansions & Spice Trails',
    subtitle: 'Step away from the crowded rave strips to explore Latin quarters, feni distilleries, and inland river backwaters.',
    slug: 'goa-beyond-beaches-heritage-guide',
    category: 'Travel Guides',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Arjun Verma',
      role: 'Senior Travel Writer & Culture Historian',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    date: 'March 18, 2026',
    readingTime: '6 min read',
    destinationId: 'goa',
    destinationName: 'Goa',
    likesCount: 342,
    content: [
      'While millions rush each winter toward Baga and Calangute, Goa’s real soul lingers inside the quiet terracotta-tiled alleys of Fontainhas in Panaji and the verdant spice plantations of Ponda.',
      'Wander through Rua 31 de Janeiro at 8 AM. You will smell wood-fired Goan poi bread baking in community ovens, hear elder residents conversing in melodic Portuguese-Konkani, and see azure glazed azulejo ceramic house tiles.',
      'For lunch, head inland to Sahakari Spice Farm for a traditional feast served on betel nut palm leaves, followed by a tasting of cashew feni distilled in earthen copper pots.'
    ],
    tips: [
      'Rent a retro geared bicycle for ₹150/day in Panaji to navigate the narrow heritage quarter.',
      'Stop by Confeitaria 31 de Janeiro for warm Bebinca fresh out of the oven at 10 AM.',
      'Take the free car ferry from Ribandar to Chorao Island for peaceful birdwatching.'
    ]
  },
  {
    id: 'blog-budget-kerala-backpacking',
    title: 'How to Backpack Kerala for 7 Days Under ₹12,000 Without Sacrificing Comfort',
    subtitle: 'From government KSRTC SWIFT buses to water ferries and community homestays in Munnar.',
    slug: 'backpacking-kerala-budget-itinerary',
    category: 'Budget Travel',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ananya Sharma',
      role: 'Budget Solo Explorer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    date: 'March 14, 2026',
    readingTime: '8 min read',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    likesCount: 512,
    content: [
      'Kerala has a reputation for luxury wellness resorts and high-end private houseboats, but with smart planning, God’s Own Country is one of the most cost-effective and rewarding backpacking journeys in India.',
      'Instead of booking a ₹12,000 private houseboat, take the public State Water Transport Department (SWTD) ferry from Alleppey to Kottayam. For just ₹25, you sail through the exact same backwater canals.',
      'Opt for spice plantation homestays in Munnar where host families serve homemade Appam with stew for breakfast included in a ₹1,200/night room.'
    ],
    tips: [
      'Book KSRTC AC low-floor buses between Kochi and Munnar online via the Ente KSRTC app.',
      'Eat lunch at local Udupi vegetarian messes where a full banana-leaf meal costs just ₹90.',
      'Rent a kayak in Alleppey instead of a motorboat to explore tiny village side canals.'
    ]
  },
  {
    id: 'blog-jaipur-palaces-photography',
    title: 'The Photographer’s Sunrise-to-Sunset Guide to Royal Jaipur',
    subtitle: 'Angles, secret courtyards, lighting conditions, and camera permits in the Pink City.',
    slug: 'photographers-guide-royal-jaipur',
    category: 'Adventure',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Devendra Rathore',
      role: 'Architectural Photographer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    date: 'March 09, 2026',
    readingTime: '5 min read',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    likesCount: 428,
    content: [
      'Jaipur’s terracotta pink facades react dynamically to desert daylight. At sunrise, they glow in soft copper and coral tones; at noon, stark geometric shadows cut through jali stone screens.',
      'Panna Meena Ka Kund stepwell near Amer Fort offers symmetrical geometric framing best shot between 7:30 AM and 8:30 AM before security restricts descent.',
      'Sunset is best captured either from the battlements of Nahargarh Fort overlooking the sprawling city bowl, or from across Maota Lake watching Amer Fort illuminate.'
    ],
    tips: [
      'Bring a 24-70mm lens for general facades and a 70-200mm telephoto for capturing jharokha window details.',
      'Visit City Palace’s Pritam Niwas Chowk peacock gate during mid-afternoon for vibrant natural saturation.'
    ]
  },
  {
    id: 'blog-varanasi-ghats-soul',
    title: 'Varanasi at 5:00 AM: The Sacred Symphony of Ghats, Chants and River Mist',
    subtitle: 'Experiencing the timeless awakening of the world’s oldest living city.',
    slug: 'varanasi-morning-ghats-spiritual-guide',
    category: 'Hidden Gems',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Meera Nambiar',
      role: 'Cultural Documentarian',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    date: 'February 26, 2026',
    readingTime: '7 min read',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    likesCount: 620,
    content: [
      'Before dawn breaks over the eastern bank of the Ganges, Kashi is already wide awake. Temple bells reverberate through misty narrow gullies as devotees make their silent pilgrimage down stone steps.',
      'Hiring a hand-rowed wooden boat from Assi Ghat at 5:15 AM allows you to witness the city wake up: sadhus offering Surya Namaskar to the rising sun, classical flute students practicing on ghat steps, and the scent of camphor in the cool morning air.'
    ],
    tips: [
      'Always choose a manual wooden rowing boat over loud diesel motorboats for peace.',
      'Try the morning Malaiyo (saffron milk foam delicacy served in clay kulhad) in Thatheri Bazaar.',
      'Assi Ghat hosts morning Subah-e-Banaras with Vedic chants and classical sitar from 5:30 AM.'
    ]
  }
];
