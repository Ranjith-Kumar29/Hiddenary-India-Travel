import React, { useState } from 'react';
import { X, Check, Calendar, Users, ShieldCheck, Sparkles, Building, CreditCard, CheckCircle2 } from 'lucide-react';
import { Hotel, RoomOption, Booking } from '../../types/travel';
import { useApp } from '../../context/AppContext';

interface Props {
  hotel: Hotel | null;
  onClose: () => void;
  selectedRoomId?: string;
}

export const HotelBookingModal: React.FC<Props> = ({ hotel, onClose, selectedRoomId }) => {
  const { createBooking, currentUser, navigate } = useApp();

  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(() => {
    if (hotel) {
      if (selectedRoomId) {
        const found = hotel.rooms.find(r => r.id === selectedRoomId);
        if (found) return found;
      }
      return hotel.rooms[0];
    }
    return {} as RoomOption;
  });

  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || '');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setGuestName(currentUser.name);
      if (currentUser.email) setGuestEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!hotel) return null;

  const basePrice = (selectedRoom?.pricePerNight || hotel.startingPrice) * nights;
  const taxes = Math.round(basePrice * 0.12);
  const totalAmount = basePrice + taxes;

  const handleDatesChange = (newIn: string, newOut: string) => {
    setCheckIn(newIn);
    setCheckOut(newOut);
    const d1 = new Date(newIn);
    const d2 = new Date(newOut);
    const diffDays = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
    setNights(diffDays);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    setSubmittingBooking(true);
    try {
      const newBooking = await createBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        destinationName: hotel.destinationName,
        roomName: selectedRoom.name,
        hotelImage: hotel.heroImage,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsCount: nights,
        guestsCount: guests,
        baseAmount: basePrice,
        taxesAmount: taxes,
        totalAmount: totalAmount,
        guestName: guestName,
        guestEmail: guestEmail,
        guestPhone: guestPhone
      });
      if (newBooking) {
        setConfirmedBooking(newBooking);
      }
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Unable to save booking. Please try again.');
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleFinishAndNavigate = () => {
    onClose();
    navigate('bookings');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight">
              {confirmedBooking ? 'Booking Confirmed!' : 'Reserve Your Stay'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{hotel.name} · {hotel.destinationName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          {confirmedBooking ? (
            /* Confirmation Receipt View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Congratulations, {guestName.split(' ')[0]}!
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Your reservation is confirmed. We have sent the confirmation voucher to{' '}
                  <span className="font-semibold text-slate-900">{guestEmail}</span>.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Booking ID:</span>
                  <span className="text-sm font-mono font-bold text-[#102B4E] bg-[#EAF5FD] px-2 py-0.5 rounded">
                    {confirmedBooking.bookingCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block">Check-in</span>
                    <span className="font-bold text-slate-800 text-sm">{confirmedBooking.checkInDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Check-out</span>
                    <span className="font-bold text-slate-800 text-sm">{confirmedBooking.checkOutDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block">Room Category</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.roomName}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">Total Paid (Demo):</span>
                  <span className="font-bold text-emerald-700 text-base">
                    ₹{confirmedBooking.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleFinishAndNavigate}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  View in My Trips / Bookings
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Room Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Select Room Type
                </label>
                <div className="space-y-2">
                  {hotel.rooms.map(room => {
                    const isSelected = selectedRoom.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0879C9] bg-[#EAF5FD]/70 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <h5 className="font-semibold text-sm text-slate-900">{room.name}</h5>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {room.capacity} · {room.bedType} · {room.sizeSqFt} sq ft
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-sm text-slate-900">
                            ₹{room.pricePerNight.toLocaleString()}
                          </div>
                          <span className="text-[10px] text-slate-400">/ night</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Guests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Dates & Guests
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Check-in</span>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={e => handleDatesChange(e.target.value, checkOut)}
                      className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Check-out</span>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={e => handleDatesChange(checkIn, e.target.value)}
                      className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Guests</span>
                    <select
                      value={guests}
                      onChange={e => setGuests(Number(e.target.value))}
                      className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9] bg-white"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  3. Primary Guest Information
                </label>
                <div className="space-y-3">
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Full Name</span>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={e => setGuestName(e.target.value)}
                      placeholder="e.g. Full Name"
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Email</span>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={e => setGuestEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                      />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Phone Number</span>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={e => setGuestPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary Breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Room rate (₹{selectedRoom?.pricePerNight?.toLocaleString()} × {nights} nights):</span>
                  <span className="font-semibold text-slate-900">₹{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Taxes & Service fees (GST 12%):</span>
                  <span className="font-semibold text-slate-900">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">Total Price:</span>
                  <span className="font-bold text-slate-900 text-base">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Demo mode: No real payment required. Your booking is instantly recorded.</span>
              </div>

              {bookingError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                  {bookingError}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingBooking}
                className="w-full py-3 bg-[#0879C9] hover:bg-[#0667AE] text-white font-semibold text-sm rounded-xl shadow-md transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submittingBooking ? 'Saving Private Booking...' : 'Confirm & Reserve Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
