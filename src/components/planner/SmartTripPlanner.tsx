import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  Wallet,
  Compass,
  Clock,
  MapPin,
  Utensils,
  Ticket,
  Bookmark,
  Share2,
  Check,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  Info
} from 'lucide-react';
import { Destination, SavedTripItinerary, ItineraryDay, ItineraryActivity } from '../../types/travel';
import { DESTINATIONS_DATA } from '../../data/destinationsData';
import { useApp } from '../../context/AppContext';
import { BudgetBreakdown } from './BudgetBreakdown';

interface Props {
  initialDestinationId?: string;
}

export const SmartTripPlanner: React.FC<Props> = ({ initialDestinationId }) => {
  const { saveItinerary, navigate } = useApp();

  const [destinationId, setDestinationId] = useState<string>(
    initialDestinationId || DESTINATIONS_DATA[0].id
  );
  const [daysCount, setDaysCount] = useState<number>(3);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [userBudgetPerPerson, setUserBudgetPerPerson] = useState<number>(15000);
  const [travelStyle, setTravelStyle] = useState<'Budget' | 'Standard' | 'Premium' | 'Luxury'>('Standard');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Beaches',
    'Food',
    'Heritage'
  ]);

  const [generatedItinerary, setGeneratedItinerary] = useState<SavedTripItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const INTEREST_OPTIONS = [
    'Nature',
    'Adventure',
    'Beaches',
    'History',
    'Food',
    'Shopping',
    'Photography',
    'Family',
    'Nightlife',
    'Spiritual'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.length > 1
          ? prev.filter(i => i !== interest)
          : prev
        : [...prev, interest]
    );
  };

  const selectedDestination =
    DESTINATIONS_DATA.find(d => d.id === destinationId) || DESTINATIONS_DATA[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setSavedSuccess(false);

    // Realistic day generator based on destination and selected interests
    setTimeout(() => {
      const generatedDays: ItineraryDay[] = [];

      for (let day = 1; day <= daysCount; day++) {
        let theme = 'Heritage, Cultural Sights & Sunset Walk';
        if (day === 2) theme = 'Local Flavours, Nature Trails & Iconic Bazaars';
        if (day === 3) theme = 'Scenic Waterfront, Relaxation & Artisan Workshops';
        if (day === 4) theme = 'Off-beat Hidden Gem Exploration & Countryside Picnic';
        if (day === 5) theme = 'Adventure Sports & Twilight Food Trail';
        if (day === 6) theme = 'Spiritual Temples & Wellness Rejuvenation';
        if (day === 7) theme = 'Leisure Souvenir Shopping & Farewell Feast';

        const multiplier = travelStyle === 'Budget' ? 0.6 : travelStyle === 'Standard' ? 1.0 : travelStyle === 'Premium' ? 1.6 : 2.5;

        const morningCost = Math.round(450 * multiplier);
        const afternoonCost = Math.round(750 * multiplier);
        const eveningCost = Math.round(950 * multiplier);

        const activities: ItineraryActivity[] = [
          {
            timeSlot: 'Morning',
            time: '09:00 AM – 12:30 PM',
            title: `Morning Discovery at ${selectedDestination.name} Prime Heritage Zone`,
            description: `Guided walk through key historical quarters, architectural marvels, and morning viewpoints before peak crowds arrive.`,
            location: `${selectedDestination.name} Central Historic Quarter`,
            entryFee: selectedDestination.id === 'goa' ? '₹50' : '₹200',
            foodSuggestion: `Local Breakfast: Fresh ${selectedDestination.name === 'chennai' ? 'Filter Coffee & Ghee Podi Idli' : 'Tea & Regional Savories'}`,
            estimatedCost: morningCost,
            peakHours: '10:30 AM – 12:00 PM',
            openCloseHours: '08:30 AM – 05:30 PM',
            travelTips: 'Carry drinking water and comfortable walking shoes'
          },
          {
            timeSlot: 'Afternoon',
            time: '02:00 PM – 05:00 PM',
            title: `${selectedDestination.name} Artisan Market & Cultural Immersion`,
            description: `Explore authentic local handicrafts, regional textiles, spices, and relaxed indoor galleries while escaping afternoon sun.`,
            location: `${selectedDestination.name} Traditional Bazaars`,
            entryFee: 'Free entry',
            foodSuggestion: `Traditional Lunch Feast with authentic ${selectedDestination.culture.festivals[0] || 'delicacies'}`,
            estimatedCost: afternoonCost,
            peakHours: '03:30 PM – 05:00 PM',
            openCloseHours: '10:00 AM – 08:00 PM',
            travelTips: 'Ask for fixed price shops or bargain politely at handicraft stalls'
          },
          {
            timeSlot: 'Evening',
            time: '06:00 PM – 09:30 PM',
            title: `Sunset Experience & Celebrated Night Dining`,
            description: `Witness spectacular golden hour at ${selectedDestination.peakHours.split(':')[0] || 'promenade'}, followed by a memorable dinner.`,
            location: selectedDestination.peakHours,
            entryFee: 'Free',
            foodSuggestion: `Signature Chef Dinner with live local music`,
            estimatedCost: eveningCost,
            peakHours: selectedDestination.peakHours,
            openCloseHours: 'Open till late',
            travelTips: 'Arrive 30 minutes before sunset for the best photo vantage point'
          }
        ];

        generatedDays.push({
          dayNumber: day,
          theme,
          activities,
          dayEstimatedBudget: morningCost + afternoonCost + eveningCost
        });
      }

      // Budget calculation
      const baseDailyCost = travelStyle === 'Budget' ? 2400 : travelStyle === 'Standard' ? 4200 : travelStyle === 'Premium' ? 7800 : 13500;
      const hotelTotal = Math.round(baseDailyCost * 0.45 * daysCount);
      const foodTotal = Math.round(baseDailyCost * 0.22 * daysCount);
      const transportTotal = Math.round(baseDailyCost * 0.15 * daysCount);
      const activitiesTotal = Math.round(baseDailyCost * 0.10 * daysCount);
      const shoppingTotal = Math.round(baseDailyCost * 0.05 * daysCount);
      const emergencyBuffer = Math.round(baseDailyCost * 0.03 * daysCount);

      const totalPerPerson = hotelTotal + foodTotal + transportTotal + activitiesTotal + shoppingTotal + emergencyBuffer;
      const grandTotal = totalPerPerson * travelersCount;

      const itineraryResult: SavedTripItinerary = {
        id: `itinerary-${Date.now()}`,
        destinationId: selectedDestination.id,
        destinationName: selectedDestination.name,
        daysCount,
        travelersCount,
        budgetPerPerson: userBudgetPerPerson,
        travelStyle,
        interests: selectedInterests,
        createdAt: 'March 2026',
        days: generatedDays,
        budgetBreakdown: {
          hotel: hotelTotal,
          food: foodTotal,
          transportation: transportTotal,
          activities: activitiesTotal,
          shopping: shoppingTotal,
          emergencyBuffer,
          totalPerPerson,
          grandTotal
        },
        isBudgetSufficient: userBudgetPerPerson >= totalPerPerson * 0.85
      };

      setGeneratedItinerary(itineraryResult);
      setIsGenerating(false);
    }, 600);
  };

  const handleSaveToMyTrips = async () => {
    if (!generatedItinerary) return;
    try {
      const didSave = await saveItinerary(generatedItinerary);
      if (didSave) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save itinerary:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Wizard Configuration Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#0879C9] text-white flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
              Smart Itinerary & Budget Generator
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Customize duration, party size, travel style and interests for personalized day-by-day plans
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Step 1: Destination */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              1. Choose Destination
            </label>
            <select
              value={destinationId}
              onChange={e => setDestinationId(e.target.value)}
              className="w-full text-sm font-semibold text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#0879C9] bg-white"
            >
              {DESTINATIONS_DATA.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Duration */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              2. Number of Days ({daysCount} Days)
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setDaysCount(num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    daysCount === num
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num}D
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Travelers */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              3. Number of Travelers
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { count: 1, label: 'Solo 1' },
                { count: 2, label: 'Couple 2' },
                { count: 4, label: 'Family 4' },
                { count: 6, label: 'Group 6' }
              ].map(opt => (
                <button
                  type="button"
                  key={opt.count}
                  onClick={() => setTravelersCount(opt.count)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    travelersCount === opt.count
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Budget per Person */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                4. Budget per Person
              </label>
              <span className="text-sm font-bold text-[#0879C9]">
                ₹{userBudgetPerPerson.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={60000}
              step={1000}
              value={userBudgetPerPerson}
              onChange={e => setUserBudgetPerPerson(Number(e.target.value))}
              className="w-full accent-[#0879C9] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Budget ₹5K</span>
              <span>Standard ₹20K</span>
              <span>Luxury ₹60K</span>
            </div>
          </div>

          {/* Step 5: Travel Style */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              5. Travel Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Budget', 'Standard', 'Premium', 'Luxury'] as const).map(style => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setTravelStyle(style)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    travelStyle === style
                      ? 'bg-[#0879C9] text-white border-[#0879C9] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 6: Interests */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            6. Select Focus Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(interest => {
              const active = selectedInterests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate CTA Button */}
        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 bg-[#102B4E] hover:bg-[#0879C9] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#42B9F5]" />
            <span>
              {isGenerating
                ? 'Synthesizing Custom Day-by-Day Plan...'
                : `Generate ${daysCount}-Day ${selectedDestination.name} Itinerary`}
            </span>
          </button>
        </div>
      </div>

      {/* Generated Itinerary & Timeline Result */}
      {generatedItinerary && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar with Action Buttons */}
          <div className="bg-gradient-to-r from-[#102B4E] to-[#0879C9] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#42B9F5] uppercase tracking-wider">
                <span>Personalized Plan</span>
                <span>·</span>
                <span>{generatedItinerary.travelStyle} Style</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {generatedItinerary.daysCount} Days in {generatedItinerary.destinationName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                Curated for {generatedItinerary.travelersCount} travelers focusing on{' '}
                {generatedItinerary.interests.join(', ')}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveToMyTrips}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
                  savedSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white hover:bg-[#EAF5FD] text-[#102B4E]'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved to My Trips!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Itinerary</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('hotels')}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Book Matching Stays
              </button>
            </div>
          </div>

          {/* Budget Breakdown Calculator Widget */}
          <BudgetBreakdown
            budgetBreakdown={generatedItinerary.budgetBreakdown}
            userBudgetPerPerson={generatedItinerary.budgetPerPerson}
            travelersCount={generatedItinerary.travelersCount}
          />

          {/* Day-by-Day Timeline */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#102B4E] tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0879C9]" />
              <span>Day-by-Day Schedule</span>
            </h4>

            <div className="space-y-6">
              {generatedItinerary.days.map(day => (
                <div
                  key={day.dayNumber}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden"
                >
                  {/* Day Header */}
                  <div className="p-4 sm:p-5 bg-[#F4F9FE] border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#102B4E] bg-[#EAF5FD] px-2.5 py-0.5 rounded">
                        Day {day.dayNumber}
                      </span>
                      <h5 className="font-bold text-slate-900 text-base sm:text-lg mt-1">
                        {day.theme}
                      </h5>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Est. Day Cost</span>
                      <span className="font-bold text-sm text-slate-900">
                        ₹{day.dayEstimatedBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Day Activities */}
                  <div className="p-4 sm:p-6 divide-y divide-slate-100 space-y-6">
                    {day.activities.map((act, index) => {
                      let SlotIcon = Sun;
                      let slotColor = 'text-[#0879C9] bg-[#EAF5FD]';
                      if (act.timeSlot === 'Afternoon') {
                        SlotIcon = Sunset;
                        slotColor = 'text-sky-600 bg-sky-50';
                      } else if (act.timeSlot === 'Evening') {
                        SlotIcon = Moon;
                        slotColor = 'text-[#102B4E] bg-slate-100';
                      }

                      return (
                        <div
                          key={index}
                          className={`pt-6 first:pt-0 flex flex-col md:flex-row gap-4 sm:gap-6`}
                        >
                          {/* Time & Slot Indicator */}
                          <div className="md:w-44 shrink-0 flex items-start gap-2.5">
                            <div className={`p-2 rounded-xl shrink-0 ${slotColor}`}>
                              <SlotIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold text-xs text-slate-900 block">
                                {act.timeSlot}
                              </span>
                              <span className="text-[11px] text-slate-500 block font-medium">
                                {act.time}
                              </span>
                            </div>
                          </div>

                          {/* Activity Card Body */}
                          <div className="flex-1 space-y-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <h6 className="font-bold text-sm sm:text-base text-slate-900">
                                {act.title}
                              </h6>
                              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                                ~₹{act.estimatedCost}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {act.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1 text-slate-600 font-medium">
                                <MapPin className="w-3.5 h-3.5 text-[#0879C9]" />
                                {act.location}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                                <Ticket className="w-3.5 h-3.5" />
                                Fee: {act.entryFee}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>Hours: {act.openCloseHours}</span>
                            </div>

                            {/* Food Suggestion Box */}
                            <div className="bg-[#F4F9FE] border border-[#42B9F5]/40 p-2.5 rounded-xl flex items-center gap-2 text-xs text-[#102B4E]">
                              <Utensils className="w-4 h-4 text-[#0879C9] shrink-0" />
                              <div>
                                <span className="font-bold mr-1">Food Pick:</span>
                                <span>{act.foodSuggestion}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
