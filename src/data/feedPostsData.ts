import { TravelPost } from '../types/travel';

export const INITIAL_FEED_POSTS: TravelPost[] = [
  {
    id: 'post-1',
    userName: 'Kavya Nair',
    userHandle: '@kavya_wanders',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    destinationId: 'kerala',
    destinationName: 'Alleppey, Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    caption: 'Waking up to this sunrise on Vembanad Lake! Hot cup of cardamom chai, gentle lapping of backwaters against teakwood, and zero vehicle noise. Kerala, you truly are God’s own creation. ✨🛶☕ #KeralaDiaries #Backwaters #IncredibleIndia',
    likesCount: 284,
    isLikedByUser: false,
    comments: [
      {
        id: 'c1',
        userName: 'Arjun Verma',
        comment: 'Which houseboat company did you book? The woodwork looks magnificent!',
        createdAt: '2 hours ago'
      },
      {
        id: 'c2',
        userName: 'Sneha Patel',
        comment: 'Pure peace! Adding this to my December bucket list.',
        createdAt: '1 hour ago'
      }
    ],
    createdAt: '3 hours ago'
  },
  {
    id: 'post-2',
    userName: 'Vikramaditya Rao',
    userHandle: '@vikram_travels',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    destinationId: 'jaipur',
    destinationName: 'Amber Fort, Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    caption: 'Golden hour hitting the ramparts of Amer. Every stone here whispers stories of Rajput valour and timeless architecture. If you visit, hike up to the watchtower above Maota Lake for this angle! 🏰🌅 #Jaipur #Rajasthan #Heritage',
    likesCount: 412,
    isLikedByUser: true,
    comments: [
      {
        id: 'c3',
        userName: 'Pooja Hegde',
        comment: 'The lighting here is so dreamy! Great shot Vikram.',
        createdAt: '4 hours ago'
      }
    ],
    createdAt: '5 hours ago'
  },
  {
    id: 'post-3',
    userName: 'Tanvi Sengupta',
    userHandle: '@tanvi_explores',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    destinationId: 'goa',
    destinationName: 'Palolem Beach, South Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    caption: 'South Goa susegad hits different. Crescent bay, gentle waves, fresh grilled kingfish, and this sunset. Who needs anywhere else? 🌴🌊 #GoaVibes #SouthGoa #SunsetLovers',
    likesCount: 350,
    isLikedByUser: false,
    comments: [
      {
        id: 'c4',
        userName: 'Rohan Mehra',
        comment: 'Palolem is 10x better than North Goa beaches for genuine relaxation.',
        createdAt: '30 mins ago'
      }
    ],
    createdAt: '7 hours ago'
  },
  {
    id: 'post-4',
    userName: 'Amitabh Sen',
    userHandle: '@amitabh_snaps',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    destinationId: 'varanasi',
    destinationName: 'Dashashwamedh Ghat, Varanasi',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    caption: 'The Maha Aarti on Mother Ganga. Thousands gathered in pin-drop devotion as camphor fires lit up the night sky. An experience that stays etched in your heart forever. 🪔🙏 #Kashi #Varanasi #SpiritualIndia',
    likesCount: 520,
    isLikedByUser: true,
    comments: [],
    createdAt: '1 day ago'
  }
];
