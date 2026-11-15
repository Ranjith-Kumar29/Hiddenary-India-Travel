import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  text?: string;
  className?: string;
}

export const DemoDataBadge: React.FC<Props> = ({ text = 'Demo & Sample Data', className = '' }) => {
  return (
    <span
      title="This section uses realistic simulated data for fast demonstration."
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium tracking-wide text-slate-500 bg-slate-100/90 rounded border border-slate-200/60 ${className}`}
    >
      <Info className="w-3 h-3 text-slate-400" />
      <span>{text}</span>
    </span>
  );
};
