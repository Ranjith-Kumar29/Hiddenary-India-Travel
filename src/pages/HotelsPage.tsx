import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Check,
  SlidersHorizontal,
  Building,
  X
} from 'lucide-react';
import { HOTELS_DATA } from '../data/hotelsData';
import { HotelCard } from '../components/cards/HotelCard';
import { useApp } from '../context/AppContext';

export const HotelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const ALL_AMENITIES = [
    'Swimming Pool',
    'Breakfast',
    'Buffet',
    'Wi-Fi',
    'Parking',
    'Gym',
    'Spa',
    'Restaurant',
    'AC',
    'Family rooms'
  ];

  const ALL_TYPES = ['Luxury', 'Resort', 'Hotel', 'Homestay', 'Hostel'];
  const ALL_BRANDS = ['Taj Hotels & Resorts', 'Heritage Haven Collection', 'Marriott Bonvoy / ITC', 'Zostel', 'Boutique Collection'];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleHotelType = (type: string) => {
    setSelectedHotelTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBudgetRange('all');
    setMinRating(0);
    setSelectedHotelTypes([]);
    setSelectedBrands([]);
    setSelectedAmenities([]);
  };

  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter(hotel => {
      // Search
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Budget Range
      let matchesBudget = true;
      if (selectedBudgetRange === 'under-2500') matchesBudget = hotel.startingPrice < 2500;
      else if (selectedBudgetRange === '2500-5000') matchesBudget = hotel.startingPrice >= 2500 && hotel.startingPrice <= 5000;
      else if (selectedBudgetRange === '5000-10000') matchesBudget = hotel.startingPrice >= 5000 && hotel.startingPrice <= 10000;
      else if (selectedBudgetRange === '10000-plus') matchesBudget = hotel.startingPrice > 10000;

      // Rating
      const matchesRating = minRating === 0 || hotel.rating >= minRating;

      // Hotel Type
      const matchesType =
        selectedHotelTypes.length === 0 || selectedHotelTypes.includes(hotel.hotelType);

      // Brand
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(hotel.brand);

      // Amenities
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every(a => hotel.amenities.includes(a));

      return (
        matchesSearch &&
        matchesBudget &&
        matchesRating &&
        matchesType &&
        matchesBrand &&
        matchesAmenities
      );
    });
  }, [
    searchTerm,
    selectedBudgetRange,
    minRating,
    selectedHotelTypes,
    selectedBrands,
    selectedAmenities
  ]);

  const filterSidebarContent = (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <span className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-[#0879C9]" />
          Filters
        </span>
        <button
          onClick={clearAllFilters}
          className="text-[#0879C9] hover:text-[#102B4E] font-semibold underline"
        >
          Clear All
        </button>
      </div>

      {/* Budget Filter */}
      <div>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
          Budget per Night
        </h4>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Budgets' },
            { id: 'under-2500', label: 'Under ₹2,500' },
            { id: '2500-5000', label: '₹2,500 – ₹5,000' },
            { id: '5000-10000', label: '₹5,000 – ₹10,000' },
            { id: '10000-plus', label: '₹10,000+ (Luxury)' }
          ].map(b => (
            <label key={b.id} className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="radio"
                name="budget"
                checked={selectedBudgetRange === b.id}
                onChange={() => setSelectedBudgetRange(b.id)}
                className="accent-[#0879C9]"
              />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
          Guest Rating
        </h4>
        <div className="space-y-1.5">
          {[
            { rating: 0, label: 'Any Rating' },
            { rating: 4.0, label: '4.0+ Stars (Very Good)' },
            { rating: 4.5, label: '4.5+ Stars (Excellent)' },
            { rating: 4.8, label: '4.8+ Stars (Superb)' }
          ].map(r => (
            <label key={r.rating} className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="radio"
                name="rating"
                checked={minRating === r.rating}
                onChange={() => setMinRating(r.rating)}
                className="accent-[#0879C9]"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hotel Type */}
      <div>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
          Property Type
        </h4>
        <div className="space-y-1.5">
          {ALL_TYPES.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={selectedHotelTypes.includes(type)}
                onChange={() => toggleHotelType(type)}
                className="accent-[#0879C9] rounded"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hotel Brand */}
      <div>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
          Hotel Brand
        </h4>
        <div className="space-y-1.5">
          {ALL_BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="accent-[#0879C9] rounded"
              />
              <span className="truncate">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular Amenities */}
      <div>
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
          Amenities
        </h4>
        <div className="space-y-1.5">
          {ALL_AMENITIES.map(amenity => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="accent-[#0879C9] rounded"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Discover Stays & Heritage Resorts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Book verified luxury palaces, tranquil backwater villas, and cozy backpacker hostels across India with instant demo confirmation.
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters ({selectedAmenities.length + selectedHotelTypes.length + (minRating > 0 ? 1 : 0)})</span>
        </button>
      </div>

      {/* Quick Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
        <Search className="w-5 h-5 text-[#0879C9] shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by hotel name, location (Goa, Kerala, Jaipur...), or brand..."
          className="flex-1 text-xs sm:text-sm outline-none text-slate-900 placeholder:text-slate-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sticky Amazon/Flipkart-style Filter Sidebar (Desktop) */}
        <div className="hidden lg:block bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs sticky top-28">
          {filterSidebarContent}
        </div>

        {/* Right Hotel Listings Column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>Showing {filteredHotels.length} available stays</span>
            <span>All properties verified with hygiene badges</span>
          </div>

          {filteredHotels.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Building className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">No hotels match your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range or clearing selected amenities.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#0879C9] hover:bg-[#0667AE] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full p-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="font-bold text-slate-900 text-base">Filter Stays</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterSidebarContent}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Apply Filters ({filteredHotels.length} Stays)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
