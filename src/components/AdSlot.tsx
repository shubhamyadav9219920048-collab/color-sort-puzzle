import React from 'react';
import { Sparkles } from 'lucide-react';

export interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = '1234567890',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}) => {
  return (
    <div
      className={`w-full my-6 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/40 p-3 text-center flex flex-col items-center justify-center relative min-h-[90px] ${className}`}
      data-ad-client="ca-pub-0000000000000000"
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1.5 flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-cyan-500/60" />
        {label}
      </span>

      {/* Ad content simulation / AdSense unit wrapper */}
      <div className="w-full h-full flex flex-col items-center justify-center py-2 text-slate-500 text-xs">
        <span className="font-mono text-[11px] text-slate-400 font-medium">Google AdSense Responsive Unit</span>
        <span className="text-[10px] text-slate-600">Supports Display, Fluid In-Article &amp; Native Formats</span>
      </div>
    </div>
  );
};
