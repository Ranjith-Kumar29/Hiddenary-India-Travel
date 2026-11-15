import React, { useState } from 'react';
import {
  Calendar,
  Building,
  CheckCircle2,
  Trash2,
  XCircle,
  QrCode,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyTripsPage: React.FC = () => {
  const { userBookings, savedTrips, cancelBooking, deleteItinerary, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'bookings' | 'itineraries'>('bookings');
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);

  const toggleExpandTrip = (id: string) => {
    setExpandedTripId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          My Trips & Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your confirmed hotel reservations, generated trip itineraries, and travel vouchers.
        </p>
      </div>

      {/* Segmented Switcher */}
      <div className="flex border-b border-slate-200 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-slate-900 text-slate-900 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Hotel Bookings ({userBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('itineraries')}
          className={`pb-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'itineraries'
              ? 'border-[#0879C9] text-[#102B4E] font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#0879C9]" />
          <span>Custom Itineraries ({savedTrips.length})</span>
        </button>
      </div>

      {/* 1. HOTEL BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {userBookings.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Building className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <h3 className="font-bold text-slate-900 text-lg">No active bookings yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Discover exceptional heritage stays and book instant demo reservations without credit card hassles.
              </p>
              <button
                onClick={() => navigate('hotels')}
                className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Browse Hotels
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings.map(b => {
                const isConfirmed = b.status === 'Confirmed';
                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={b.hotelImage}
                        alt={b.hotelName}
                        className="w-24 h-24 rounded-xl object-cover shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#102B4E] bg-[#EAF5FD] px-2 py-0.5 rounded">
                            {b.bookingCode}
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isConfirmed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>

                        <h4 className="font-bold text-base text-slate-900">{b.hotelName}</h4>
                        <p className="text-xs text-slate-500">{b.roomName} · {b.destinationName}</p>

                        <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                          <span>Check-in: <strong className="text-slate-900">{b.checkInDate}</strong></span>
                          <span>·</span>
                          <span>Check-out: <strong className="text-slate-900">{b.checkOutDate}</strong></span>
                          <span>·</span>
                          <span>{b.guestsCount} Guests ({b.nightsCount} Nights)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-2">
                      <div className="text-left md:text-right">
                        <span className="text-[11px] text-slate-400 block">Total Amount</span>
                        <span className="text-lg font-bold text-slate-900">
                          ₹{b.totalAmount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-emerald-700 block">Demo Confirmed</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isConfirmed && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                          >
                            Cancel Stay
                          </button>
                        )}
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                        >
                          Print Voucher
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. SAVED ITINERARIES TAB */}
      {activeTab === 'itineraries' && (
        <div className="space-y-6">
          {savedTrips.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <h3 className="font-bold text-slate-900 text-lg">No saved itineraries</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Generate custom morning-to-night trip plans using our Smart Trip Planner and save them here.
              </p>
              <button
                onClick={() => navigate('trip-planner')}
                className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Plan a Trip
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {savedTrips.map(trip => {
                const isExpanded = expandedTripId === trip.id;
                return (
                  <div
                    key={trip.id}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden"
                  >
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-[#102B4E] bg-[#EAF5FD] px-2.5 py-0.5 rounded">
                            {trip.daysCount} Days
                          </span>
                          <span className="text-slate-500">·</span>
                          <span className="font-semibold text-slate-700">{trip.travelStyle} Style</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-500">{trip.travelersCount} Travelers</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mt-1">
                          {trip.destinationName} Travel Plan
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Focus: {trip.interests.join(', ')} · Created {trip.createdAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-medium">Estimated Budget</span>
                          <span className="font-bold text-base text-slate-900">
                            ₹{trip.budgetBreakdown.grandTotal.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleExpandTrip(trip.id)}
                          className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => deleteItinerary(trip.id)}
                          title="Delete Itinerary"
                          className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Day-by-Day View */}
                    {isExpanded && (
                      <div className="p-5 border-t border-slate-100 space-y-4">
                        {trip.days.map(d => (
                          <div key={d.dayNumber} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-xs font-bold text-[#0879C9] uppercase block mb-1">
                              Day {d.dayNumber}: {d.theme}
                            </span>
                            <div className="space-y-2 mt-2">
                              {d.activities.map((a, i) => (
                                <div key={i} className="flex items-start gap-3 text-xs">
                                  <span className="font-bold text-slate-700 w-16 shrink-0">{a.timeSlot}</span>
                                  <div className="flex-1">
                                    <span className="font-semibold text-slate-900">{a.title}</span>
                                    <p className="text-slate-500 mt-0.5">{a.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
