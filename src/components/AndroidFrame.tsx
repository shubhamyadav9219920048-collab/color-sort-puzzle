import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface AndroidFrameProps {
  isFrameActive: boolean;
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ isFrameActive, children }) => {
  const [timeString, setTimeString] = useState('10:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setTimeString(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  if (!isFrameActive) {
    return <div className="w-full h-full flex flex-col overflow-hidden">{children}</div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-slate-950 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
      {/* Android Device Outer Body Chassis */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[96vh] bg-slate-900 border-[8px] sm:border-[12px] border-slate-800 rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden ring-1 ring-slate-700/50">
        
        {/* Android Punch Hole Camera Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border border-slate-800 z-50 pointer-events-none flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
        </div>

        {/* Android Top Status Bar */}
        <div className="w-full h-9 bg-slate-950/90 text-slate-300 px-6 pt-1 flex items-center justify-between text-[11px] font-bold z-40 select-none shrink-0">
          <span>{timeString}</span>
          <div className="flex items-center gap-2 text-slate-400">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Android Screen Display Area */}
        <div className="flex-1 w-full relative overflow-hidden flex flex-col bg-slate-950">
          {children}
        </div>

        {/* Android Bottom Gesture Bar */}
        <div className="w-full h-6 bg-slate-950/90 flex items-center justify-center z-40 shrink-0">
          <div className="w-32 h-1 rounded-full bg-slate-600/60" />
        </div>
      </div>
    </div>
  );
};
