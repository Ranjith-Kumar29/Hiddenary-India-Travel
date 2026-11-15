import React from 'react';
import { SmartTripPlanner } from '../components/planner/SmartTripPlanner';
import { Sparkles, Calendar, DollarSign, Compass, ShieldCheck } from 'lucide-react';

export const TripPlannerPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Intro Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5FD] text-[#102B4E] border border-[#42B9F5]/50 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#0879C9]" />
          <span>Intelligent Travel Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Smart Day-by-Day Trip Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Create optimized morning, afternoon, and evening travel itineraries tailored to your budget, travel party, and passions. View itemized cost projections and save directly to My Trips.
        </p>
      </div>

      {/* Main Interactive Wizard */}
      <SmartTripPlanner />
    </div>
  );
};
