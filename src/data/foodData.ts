import { FoodItem } from '../types/travel';

export const FOOD_DATA: FoodItem[] = [
  // GOA
  {
    id: 'food-goan-fish-curry',
    name: 'Goan Fish Curry Thali (Xitt Codi)',
    destinationId: 'goa',
    destinationName: 'Goa',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh kingfish cooked in freshly squeezed coconut milk, Kashmiri red chillies, coriander seeds, and tart kokum berry, served with steaming Goan red rice, fried fish, and kismur salad.',
    approxPrice: '₹280 – ₹450',
    whereToTry: 'Ritz Classic (Panaji) or Anand Seafood Bar (Anjuna)',
    rating: 4.9,
    isVegetarian: false
  },
  {
    id: 'food-goan-bebinca',
    name: 'Bebinca (The Queen of Goan Desserts)',
    destinationId: 'goa',
    destinationName: 'Goa',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    description: 'A traditional 7 to 16 layered Portuguese-Goan delicacy baked slowly layer-by-layer using rich coconut milk, egg yolks, sugar, pure ghee, and aromatic nutmeg.',
    approxPrice: '₹180 per slice / ₹450 per box',
    whereToTry: 'Confeitaria 31 De Janeiro (Fontainhas) or Martin\'s Corner (Betalbatim)',
    rating: 4.8,
    isVegetarian: false
  },
  {
    id: 'food-goan-pork-vindaloo',
    name: 'Traditional Goan Pork Vindaloo',
    destinationId: 'goa',
    destinationName: 'Goa',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    description: 'Tender pork steeped in authentic toddy palm vinegar, fiery red chilies, garlic, and cloves, delivering a tangy punch that pairs harmoniously with crusty Goan poi bread.',
    approxPrice: '₹350 – ₹480',
    whereToTry: 'Mum\'s Kitchen (Panaji) or Fisherman\'s Wharf',
    rating: 4.7,
    isVegetarian: false
  },

  // CHENNAI
  {
    id: 'food-chennai-filter-coffee',
    name: 'South Indian Filter Kaapi (Degree Coffee)',
    destinationId: 'chennai',
    destinationName: 'Chennai',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Freshly roasted Chicory-infused Arabica decoction brewed in a brass percolator, poured with frothy boiled milk from a meter-high height between a dabara and tumbler.',
    approxPrice: '₹30 – ₹60',
    whereToTry: 'Madras Coffee House, Rayar\'s Mess Mylapore or Sangeetha',
    rating: 5.0,
    isVegetarian: true
  },
  {
    id: 'food-chennai-ghee-podi-idli',
    name: 'Mini Ghee Podi Idli',
    destinationId: 'chennai',
    destinationName: 'Chennai',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'Pillowy steamed fermented rice and black gram dumplings tossed in generous homemade golden Cow\'s Ghee and spicy roasted Gunpowder (Milagai Podi), served with 3 chutneys and hot sambar.',
    approxPrice: '₹90 – ₹140',
    whereToTry: 'Murugan Idli Shop, Rayar\'s Mess, or Ratna Cafe Triplicane',
    rating: 4.9,
    isVegetarian: true
  },
  {
    id: 'food-chennai-crispy-masala-dosa',
    name: 'Crispy Butter Masala Dosa',
    destinationId: 'chennai',
    destinationName: 'Chennai',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    description: 'Golden crepe fermented with rice and lentils roasted crisp in butter, stuffed with spiced mustard-tempered potato onion mash, served with coconut, tomato, and mint chutneys.',
    approxPrice: '₹110 – ₹180',
    whereToTry: 'Saravana Bhavan, Mathsya, or Welcome Hotel Purasawalkam',
    rating: 4.9,
    isVegetarian: true
  },
  {
    id: 'food-chennai-thalappakatti-biriyani',
    name: 'Dindigul Thalappakatti Seeraga Samba Biriyani',
    destinationId: 'chennai',
    destinationName: 'Chennai',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: 'Fragrant short-grain tiny Seeraga Samba rice slow-cooked on firewood with tender mutton, crushed shallots, curd, and hand-ground Tamil spices, accompanied by onion raita and Dalcha.',
    approxPrice: '₹320 – ₹420',
    whereToTry: 'Dindigul Thalappakatti (Nungambakkam) or Ya Mohideen (Pallavaram)',
    rating: 4.8,
    isVegetarian: false
  },

  // KERALA
  {
    id: 'food-kerala-sadya',
    name: 'Grand Kerala Onam Sadya on Plantain Leaf',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    description: 'A regal feast of 24+ vegetarian delicacies served on a banana leaf: Parippu with ghee, Sambar, Avial, Thoran, Olan, Kaalan, Pachadi, Injipuli ginger pickle, Sharkara Upperi, and Ada Pradhaman payasam.',
    approxPrice: '₹350 – ₹550',
    whereToTry: 'Mothers Veg Plaza (Trivandrum) or BTH Sarovaram (Kochi)',
    rating: 5.0,
    isVegetarian: true
  },
  {
    id: 'food-kerala-appam-stew',
    name: 'Lacy Appam with Creamy Vegetable or Chicken Stew',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'Bowl-shaped fermented rice hoppers with soft spongy centers and crispy lacy edges, paired with aromatic coconut milk stew flavored with green chilies, whole peppercorns, and curry leaves.',
    approxPrice: '₹140 – ₹240',
    whereToTry: 'Paragon Restaurant (Kozhikode/Kochi) or Grand Hotel Ernakulam',
    rating: 4.9,
    isVegetarian: true
  },

  // HYDERABAD
  {
    id: 'food-hyderabad-dum-biryani',
    name: 'Hyderabadi Kachche Gosht Ki Dum Biryani',
    destinationId: 'hyderabad',
    destinationName: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: 'Long-grain aged basmati rice layered with raw mutton marinated in raw papaya paste, saffron, mint, and fried onions (birista), sealed with dough in a heavy handi and slow-cooked over coal ember.',
    approxPrice: '₹280 – ₹420',
    whereToTry: 'Hotel Shadab (Charminar), Cafe Bahar, or Paradise Secunderabad',
    rating: 5.0,
    isVegetarian: false
  },

  // MUMBAI
  {
    id: 'food-mumbai-vada-pav',
    name: 'Mumbai Vada Pav & Pav Bhaji',
    destinationId: 'mumbai',
    destinationName: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    description: 'The heartbeat of Mumbai street food: spiced mashed potato fritter in chickpea batter pressed inside buttered pav bun with dry garlic chutney and fried green chilies; plus sizzling butter-drenched vegetable bhaji.',
    approxPrice: '₹25 – ₹120',
    whereToTry: 'Aaram Vada Pav (CST), Ashok Vada Pav (Kirti College), or Sardar Pav Bhaji (Tardeo)',
    rating: 4.9,
    isVegetarian: true
  },

  // JAIPUR
  {
    id: 'food-jaipur-dal-baati-churma',
    name: 'Authentic Rajasthani Dal Baati Churma',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Hard wheat flour dough balls baked over charcoal and drenched in desi ghee, served with spicy Panchmel five-lentil dal, sweet crushed churma, gatte ki sabzi, and fiery garlic chutney.',
    approxPrice: '₹250 – ₹450',
    whereToTry: 'Chokhi Dhani Ethnic Resort or Laxmi Mishthan Bhandar (LMB Johari Bazaar)',
    rating: 4.9,
    isVegetarian: true
  }
];
