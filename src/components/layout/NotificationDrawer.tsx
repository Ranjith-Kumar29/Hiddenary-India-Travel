import React from 'react';
import { X, CheckCheck, Bell, CloudRain, AlertCircle, Bookmark, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigate } = useApp();

  if (!isOpen) return null;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.linkAction) {
      if (notif.linkAction.page === 'destination' && notif.linkAction.itemId) {
        navigate('destination', { destinationId: notif.linkAction.itemId });
      } else if (notif.linkAction.page === 'hotel' && notif.linkAction.itemId) {
        navigate('hotels', { hotelId: notif.linkAction.itemId });
      } else if (notif.linkAction.page === 'blogs') {
        navigate('blogs');
      } else if (notif.linkAction.page === 'my-trips') {
        navigate('my-trips');
      } else if (notif.linkAction.page === 'bookings') {
        navigate('bookings');
      }
    }
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <CloudRain className="w-4 h-4 text-sky-600" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-[#0879C9]" />;
      case 'booking':
        return <Bookmark className="w-4 h-4 text-emerald-600" />;
      default:
        return <Compass className="w-4 h-4 text-indigo-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 border-l border-slate-100"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#0879C9]" />
              )}
            </div>
            <h3 className="font-semibold text-[#102B4E] text-base">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs bg-[#EAF5FD] text-[#102B4E] font-medium px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                title="Mark all as read"
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 text-xs flex items-center gap-1 font-medium transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Read all</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Bell className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                  notif.read ? 'hover:bg-slate-50 opacity-80' : 'bg-slate-50/70 hover:bg-slate-100/80 font-medium'
                }`}
              >
                <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-sm text-slate-900 truncate ${!notif.read ? 'font-semibold' : 'font-medium'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[11px] text-slate-400 shrink-0">{notif.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-[#0879C9] shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Real-time travel updates, price alerts & itinerary reminders
          </p>
        </div>
      </div>
    </div>
  );
};
