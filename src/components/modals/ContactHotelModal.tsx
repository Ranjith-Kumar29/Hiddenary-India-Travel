import React, { useState } from 'react';
import { X, Phone, Mail, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Hotel } from '../../types/travel';
import { DemoDataBadge } from '../common/DemoDataBadge';

interface Props {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactHotelModal: React.FC<Props> = ({ hotel, isOpen, onClose }) => {
  const [messageSent, setMessageSent] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen || !hotel) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-lg">Contact Hotel</h3>
              <DemoDataBadge text="Simulated" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate">{hotel.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {messageSent ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Inquiry Dispatched!</h4>
              <p className="text-xs text-slate-500">
                The front desk at {hotel.name} will reply within 30 minutes.
              </p>
            </div>
          ) : (
            <>
              {/* Direct Call / Contact Cards */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="block font-semibold text-slate-900">{hotel.contact.phone}</span>
                      <span className="text-[11px] text-slate-400">{hotel.contact.receptionHours}</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${hotel.contact.phone}`}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    Call
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-semibold text-slate-900 truncate">{hotel.contact.email}</span>
                  </div>
                  <a
                    href={`mailto:${hotel.contact.email}`}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-xs transition-colors shrink-0"
                  >
                    Email
                  </a>
                </div>
              </div>

              {/* Send Quick Message Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Send Direct Inquiry
                </span>

                <input
                  type="text"
                  required
                  value={callerName}
                  onChange={e => setCallerName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#0879C9]"
                />

                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ask about airport transfer, early check-in, special dietary requests..."
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 outline-none focus:border-[#0879C9] resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0879C9] hover:bg-[#0667AE] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Front Desk</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
