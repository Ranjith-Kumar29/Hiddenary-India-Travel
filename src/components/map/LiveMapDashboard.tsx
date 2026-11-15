import React, { useState } from 'react';
import {
  MapPin,
  Hotel,
  Landmark,
  ShieldAlert,
  Building2,
  Bus,
  Activity,
  Layers,
  Phone,
  Navigation,
  Info
} from 'lucide-react';
import { Destination } from '../../types/travel';
import { DemoDataBadge } from '../common/DemoDataBadge';

interface Props {
  destination: Destination;
}

type MarkerCategory = 'all' | 'hotels' | 'attractions' | 'emergency' | 'transit';

interface MapPoint {
  id: string;
  name: string;
  category: 'hotel' | 'attraction' | 'emergency' | 'transit';
  x: number; // percentage on map
  y: number;
  info: string;
  status?: string;
  phone?: string;
}

export const LiveMapDashboard: React.FC<Props> = ({ destination }) => {
  const [activeCategory, setActiveCategory] = useState<MarkerCategory>('all');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  // Generate realistic coordinate points for this destination
  const POINTS: MapPoint[] = [
    {
      id: 'p-1',
      name: `${destination.name} Heritage Landmark`,
      category: 'attraction',
      x: 48,
      y: 35,
      info: 'Prime historical sight & photography spot',
      status: 'Open · Normal Queue'
    },
    {
      id: 'p-2',
      name: 'Luxury Beach & Heritage Stay',
      category: 'hotel',
      x: 32,
      y: 60,
      info: '5-Star Resort with private pool',
      phone: '+91 832 6683333',
      status: '3 Rooms Left'
    },
    {
      id: 'p-3',
      name: 'District Medical Super-Speciality Hospital',
      category: 'emergency',
      x: 65,
      y: 28,
      info: '24/7 Trauma, ICU & Pharmacy',
      phone: '+91 832 2458700',
      status: '24x7 Open'
    },
    {
      id: 'p-4',
      name: 'Central Tourist Police Assistance Booth',
      category: 'emergency',
      x: 52,
      y: 50,
      info: 'Multi-lingual safety helpdesk',
      phone: '112 / +91 832 2278294',
      status: 'Active Patrol'
    },
    {
      id: 'p-5',
      name: 'Central Inter-City Bus Terminal',
      category: 'transit',
      x: 75,
      y: 68,
      info: 'Airavat AC & KSRTC Deluxe expresses',
      status: 'Departures every 15 min'
    },
    {
      id: 'p-6',
      name: 'Boutique Garden Villa & Cafe',
      category: 'hotel',
      x: 25,
      y: 22,
      info: 'Authentic local cuisine & homestay',
      phone: '+91 832 2974411',
      status: 'Available'
    },
    {
      id: 'p-7',
      name: 'Sunset Promontory Point',
      category: 'attraction',
      x: 18,
      y: 78,
      info: 'Golden hour vantage point over water',
      status: 'Peak: 5:30 PM'
    }
  ];

  const filteredPoints = POINTS.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'hotels') return p.category === 'hotel';
    if (activeCategory === 'attractions') return p.category === 'attraction';
    if (activeCategory === 'emergency') return p.category === 'emergency';
    if (activeCategory === 'transit') return p.category === 'transit';
    return true;
  });

  const getTrafficColor = () => {
    switch (destination.trafficStatus) {
      case 'Low':
        return { label: 'Low Traffic (Fast Flow)', dot: 'bg-emerald-500', text: 'text-emerald-700' };
      case 'Moderate':
        return { label: 'Moderate Traffic', dot: 'bg-[#42B9F5]', text: 'text-[#0879C9]' };
      default:
        return { label: 'Heavy Traffic (Peak Hours)', dot: 'bg-rose-500', text: 'text-rose-700' };
    }
  };

  const traffic = getTrafficColor();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
      {/* Top Map Dashboard Control Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-lg">
              Live Location & Services Map
            </h3>
            <DemoDataBadge text="Simulated Map Data" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive overlay of stays, sights, transit and emergency health centers in {destination.name}
          </p>
        </div>

        {/* Live Traffic Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-semibold shrink-0">
          <span className={`w-2.5 h-2.5 rounded-full ${traffic.dot} animate-ping`} />
          <span className={traffic.text}>{traffic.label}</span>
        </div>
      </div>

      {/* Layer Filter Buttons */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-white flex items-center gap-2 overflow-x-auto text-xs">
        <span className="font-semibold text-slate-500 flex items-center gap-1 shrink-0">
          <Layers className="w-3.5 h-3.5" />
          Layers:
        </span>
        {[
          { id: 'all', label: 'All Services' },
          { id: 'hotels', label: 'Hotels & Stays' },
          { id: 'attractions', label: 'Attractions' },
          { id: 'emergency', label: 'Hospitals & Police' },
          { id: 'transit', label: 'Bus & Transit' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as MarkerCategory)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative w-full h-[400px] bg-slate-950 overflow-hidden select-none">
        {/* Subtle Map Graphic Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Stylized Coastal or Inland Topographic Curves */}
        <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none">
          <path
            d="M 0,280 Q 200,180 400,240 T 800,120 T 1200,220 L 1200,400 L 0,400 Z"
            fill="#0369a1"
          />
          <path
            d="M 0,320 Q 300,240 600,300 T 1200,280 L 1200,400 L 0,400 Z"
            fill="#0284c7"
          />
          {/* Main Highway Veins */}
          <path
            d="M 50,0 C 200,120 400,180 500,220 S 800,290 1000,400"
            stroke="#42B9F5"
            strokeWidth="3"
            strokeDasharray="6,4"
            fill="none"
          />
          <path
            d="M 600,0 C 550,150 480,260 300,400"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Destination Name Watermark */}
        <div className="absolute bottom-6 left-6 pointer-events-none">
          <span className="text-3xl font-extrabold tracking-widest uppercase text-white/10">
            {destination.name} MAP GRID
          </span>
        </div>

        {/* Map Markers */}
        {filteredPoints.map(point => {
          const isSelected = selectedPoint?.id === point.id;
          let markerColor = 'bg-[#0879C9] text-white';
          let Icon = Landmark;

          if (point.category === 'hotel') {
            markerColor = 'bg-indigo-500 text-white';
            Icon = Hotel;
          } else if (point.category === 'emergency') {
            markerColor = 'bg-rose-500 text-white';
            Icon = ShieldAlert;
          } else if (point.category === 'transit') {
            markerColor = 'bg-emerald-500 text-slate-950';
            Icon = Bus;
          }

          return (
            <div
              key={point.id}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onClick={() => setSelectedPoint(point)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              <div
                className={`p-2 rounded-xl shadow-lg transition-transform ${markerColor} ${
                  isSelected ? 'scale-125 ring-4 ring-white/50' : 'group-hover:scale-115'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/90 text-white whitespace-nowrap shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {point.name}
              </span>
            </div>
          );
        })}

        {/* Selected Marker Detail Card Popover */}
        {selectedPoint && (
          <div className="absolute bottom-4 right-4 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 z-30 animate-in fade-in duration-150">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                  {selectedPoint.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 leading-tight">
                  {selectedPoint.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-slate-400 hover:text-slate-700 text-xs p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              {selectedPoint.info}
            </p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="font-medium text-emerald-700">{selectedPoint.status}</span>
              {selectedPoint.phone && (
                <a
                  href={`tel:${selectedPoint.phone}`}
                  className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-[#0879C9]"
                >
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map Footer Note */}
      <div className="p-3 bg-slate-50 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Ready for Google Maps Platform / Mapbox SDK integration with custom pins.</span>
        </span>
        <span className="font-medium text-slate-600">
          Traffic Updated: 2 mins ago
        </span>
      </div>
    </div>
  );
};
