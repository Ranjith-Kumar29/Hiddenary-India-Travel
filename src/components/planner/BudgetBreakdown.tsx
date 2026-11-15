import React from 'react';
import { PieChart, AlertTriangle, CheckCircle, Wallet, Hotel, Utensils, Bus, Ticket, ShoppingBag, ShieldAlert } from 'lucide-react';

interface Props {
  budgetBreakdown: {
    hotel: number;
    food: number;
    transportation: number;
    activities: number;
    shopping: number;
    emergencyBuffer: number;
    totalPerPerson: number;
    grandTotal: number;
  };
  userBudgetPerPerson: number;
  travelersCount: number;
}

export const BudgetBreakdown: React.FC<Props> = ({
  budgetBreakdown,
  userBudgetPerPerson,
  travelersCount
}) => {
  const isSufficient = userBudgetPerPerson >= budgetBreakdown.totalPerPerson * 0.85;
  const grandUserTotal = userBudgetPerPerson * travelersCount;

  const ITEMS = [
    { label: 'Stays & Hotels', amount: budgetBreakdown.hotel, icon: Hotel, color: 'bg-indigo-500', bar: 'bg-indigo-500' },
    { label: 'Food & Dining', amount: budgetBreakdown.food, icon: Utensils, color: 'bg-[#0879C9]', bar: 'bg-[#0879C9]' },
    { label: 'Transportation', amount: budgetBreakdown.transportation, icon: Bus, color: 'bg-emerald-500', bar: 'bg-emerald-500' },
    { label: 'Activities & Entry Fees', amount: budgetBreakdown.activities, icon: Ticket, color: 'bg-rose-500', bar: 'bg-rose-500' },
    { label: 'Shopping & Souvenirs', amount: budgetBreakdown.shopping, icon: ShoppingBag, color: 'bg-sky-500', bar: 'bg-sky-500' },
    { label: 'Emergency Buffer', amount: budgetBreakdown.emergencyBuffer, icon: ShieldAlert, color: 'bg-purple-500', bar: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Smart Budget Analysis</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent cost projection for {travelersCount} {travelersCount === 1 ? 'traveler' : 'travelers'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block font-medium">Estimated Grand Total</span>
          <span className="text-xl font-bold text-slate-900">
            ₹{budgetBreakdown.grandTotal.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 block">
            (₹{budgetBreakdown.totalPerPerson.toLocaleString()} / person)
          </span>
        </div>
      </div>

      {/* Warning or Success Banner */}
      {!isSufficient ? (
        <div className="p-3.5 rounded-xl bg-[#EAF5FD] border border-[#42B9F5]/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#0879C9] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#102B4E] block text-sm">
              Your selected budget (₹{userBudgetPerPerson.toLocaleString()}/person) may be tight
            </span>
            <p className="text-slate-700 mt-0.5 leading-relaxed">
              We suggest either choosing standard homestays over luxury resorts, taking public KSRTC/train options, or increasing your budget to around ₹{budgetBreakdown.totalPerPerson.toLocaleString()} for a comfortable experience.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-800">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Healthy Budget: Your selected allocation of ₹{userBudgetPerPerson.toLocaleString()} comfortably covers all activities, food, and private stays!
          </span>
        </div>
      )}

      {/* Visual Percentage Progress Stack Bar */}
      <div>
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100">
          {ITEMS.map(item => {
            const pct = Math.round((item.amount / budgetBreakdown.totalPerPerson) * 100);
            return (
              <div
                key={item.label}
                style={{ width: `${pct}%` }}
                title={`${item.label}: ${pct}%`}
                className={`${item.bar} h-full transition-all`}
              />
            );
          })}
        </div>
      </div>

      {/* Breakdown Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ITEMS.map(item => {
          const Icon = item.icon;
          const pct = Math.round((item.amount / budgetBreakdown.totalPerPerson) * 100);
          return (
            <div
              key={item.label}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg text-white ${item.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">{item.label}</span>
                  <span className="text-[10px] text-slate-400">{pct}% of plan</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">
                  ₹{(item.amount * travelersCount).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  ₹{item.amount.toLocaleString()} / person
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
