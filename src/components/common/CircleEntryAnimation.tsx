import React, { useState, useEffect } from 'react';
import logo from '../../assets/nextgen-kisan.png';
import { Sprout } from 'lucide-react';

interface CircleEntryAnimationProps {
  onComplete: () => void;
  duration?: number; // total duration before finishing
}

const CircleEntryAnimation: React.FC<CircleEntryAnimationProps> = ({
  onComplete,
  duration = 2400
}) => {
  // Animation phases: 'circle' -> 'green-expand' -> 'fade-out'
  const [phase, setPhase] = useState<'circle' | 'green-expand' | 'fade-out'>('circle');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Stage 1: Circle pops in and pulses (0ms to 1250ms)
    const expandTimer = setTimeout(() => {
      setPhase('green-expand');
    }, 1250);

    // Stage 2: Green circular wave expands and washes screen (1250ms to 2050ms)
    const fadeTimer = setTimeout(() => {
      setPhase('fade-out');
    }, 2050);

    // Stage 3: Animation finishes and reveals main page (2400ms)
    const completeTimer = setTimeout(() => {
      setIsDismissed(true);
      onComplete();
    }, duration);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  const handleSkip = () => {
    setIsDismissed(true);
    onComplete();
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        phase === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #063116 0%, #031d0d 45%, #010d05 100%)',
      }}
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-green-400/15 blur-[80px] pointer-events-none" />

      {/* Subtle particle grid dots */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 z-50 text-emerald-200/70 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1 active:scale-95"
      >
        <span>Skip</span>
        <span>→</span>
      </button>

      {/* Main Center Animation Wrapper */}
      <div className="relative flex flex-col items-center justify-center select-none z-10 px-4">
        
        {/* Pulsing Aura Rings */}
        <div className="relative flex items-center justify-center">
          
          {/* Ring 1 - Deep outer pulse */}
          <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-emerald-400/20 animate-pulse-rings pointer-events-none" />
          
          {/* Ring 2 - Rotating dashed SVG ring */}
          <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full pointer-events-none animate-rotate-orbit">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#greenGrad)"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                opacity="0.75"
              />
              <defs>
                <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Ring 3 - Counter rotating thin accent */}
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full pointer-events-none animate-rotate-orbit-reverse">
            <div className="w-full h-full rounded-full border border-emerald-400/30 border-t-emerald-300 border-r-transparent" />
          </div>

          {/* Core Circle Container with main logo */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2.5 sm:p-3 bg-gradient-to-br from-emerald-500/20 via-green-600/30 to-emerald-900/60 backdrop-blur-xl border-2 border-emerald-400/60 shadow-[0_0_50px_rgba(34,197,94,0.45)] flex items-center justify-center animate-circle-pop">
            
            {/* Inner disc */}
            <div className="w-full h-full rounded-full bg-white/95 p-3 sm:p-4 shadow-inner flex items-center justify-center overflow-hidden border border-emerald-200">
              <img
                src={logo}
                alt="NextGen Kisan"
                className="w-full h-full object-contain filter drop-shadow-md transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Glowing Corner Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px]">
              <Sprout className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>

        {/* Brand Text below Circle */}
        <div className="mt-6 text-center transform transition-all duration-700 ease-out">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2">
            <span>सशक्त किसान • समृद्ध भारत</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-400">
              NextGen
            </span>
            <span className="text-white">Kisan</span>
          </h1>

          <p className="text-xs text-emerald-200/80 mt-1 max-w-xs font-medium">
            डिजिटल कृषि क्रांति • Smart Agricultural Ecosystem
          </p>

          {/* Loading progress bar */}
          <div className="w-40 sm:w-48 h-1.5 bg-white/10 rounded-full mx-auto mt-4 overflow-hidden border border-white/15">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: phase === 'circle' ? '70%' : '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* THE GREEN COLOR EXPANSION WAVE (Entry Animation for Main Page) */}
      {/* ================================================================= */}
      {phase !== 'circle' && (
        <div
          className="absolute z-40 rounded-full pointer-events-none animate-green-wave"
          style={{
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, #22c55e 0%, #16a34a 45%, #15803d 75%, #052e16 100%)',
            boxShadow: '0 0 100px rgba(34, 197, 94, 0.9)',
          }}
        />
      )}
    </div>
  );
};

export default CircleEntryAnimation;
