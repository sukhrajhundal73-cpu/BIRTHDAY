import React, { useState } from 'react';
import { CakeTheme } from '../types';
import { sound } from '../utils/audio';
import { fireWishSparkles } from '../utils/confetti';
import { Sparkles, Flame, Wind } from 'lucide-react';

interface CakeProps {
  theme: CakeTheme;
  isLit: boolean;
  onToggleCandle: () => void;
  recipientName?: string;
  age?: string;
  numCandles?: number;
}

export const Cake: React.FC<CakeProps> = ({
  theme,
  isLit,
  onToggleCandle,
  recipientName,
  age,
  numCandles = 1,
}) => {
  const [showSmoke, setShowSmoke] = useState(false);
  const [lastWishedAt, setLastWishedAt] = useState<number | null>(null);

  const handleCandleInteraction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLit) {
      sound.playBlowSound();
      setShowSmoke(true);
      setLastWishedAt(Date.now());
      fireWishSparkles();
      setTimeout(() => setShowSmoke(false), 2000);
      onToggleCandle();
    } else {
      sound.playLightSound();
      onToggleCandle();
    }
  };

  const candleList = Array.from({ length: Math.min(Math.max(numCandles, 1), 5) });

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none">
      {/* Wish banner hint */}
      <div className="mb-3 h-7 flex items-center justify-center">
        {isLit ? (
          <button
            onClick={handleCandleInteraction}
            className="group flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Click to blow out the candle and make a wish!"
          >
            <Wind className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>Click candle to blow out & make a wish!</span>
          </button>
        ) : (
          <button
            onClick={handleCandleInteraction}
            className="group flex items-center gap-1.5 px-3 py-1 bg-amber-500/30 hover:bg-amber-500/40 backdrop-blur-md rounded-full text-xs font-semibold text-amber-100 border border-amber-300/40 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Click to relight the candle!"
          >
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Wish made! Click to relight candle ✨</span>
          </button>
        )}
      </div>

      {/* Main Cake Assembly Container */}
      <div
        className="relative cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={handleCandleInteraction}
        title={isLit ? 'Click to blow out!' : 'Click to light!'}
      >
        {/* Candles Group */}
        <div className="relative flex justify-center items-end gap-3 z-30 mb-[-2px]">
          {candleList.map((_, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Flame or Smoke */}
              {isLit ? (
                <div className="relative -mb-1">
                  {/* Outer flame glow halo */}
                  <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-md animate-pulse pointer-events-none" />
                  {/* Flickering core flame */}
                  <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-flicker-flame shadow-[0_0_15px_#ffb703] border border-yellow-200/50" />
                  {/* Inner blue base */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400/80 rounded-full blur-[0.5px]" />
                </div>
              ) : showSmoke ? (
                <div className="relative -mb-1 w-4 h-6 flex justify-center items-center pointer-events-none">
                  <span className="w-2.5 h-2.5 bg-white/70 rounded-full blur-[1px] animate-smoke" />
                  <span className="w-2 h-2 bg-slate-300/60 rounded-full blur-[1px] animate-smoke [animation-delay:0.3s]" />
                </div>
              ) : (
                <div className="w-1 h-2 bg-neutral-800 rounded-t-sm" />
              )}

              {/* Candle Body */}
              <div
                className="w-3.5 h-11 rounded-t-sm relative shadow-inner overflow-hidden border border-white/40"
                style={{
                  background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #f43f5e 4px, #f43f5e 8px)',
                }}
              >
                {/* Candle wick */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Tier 2 (Top Layer) */}
        <div
          className="relative w-36 h-12 mx-auto rounded-t-xl z-20 shadow-md border-t border-white/50 overflow-hidden"
          style={{ backgroundColor: theme.layer2 }}
        >
          {/* Frosting drips on top tier */}
          <div
            className="absolute top-0 left-0 right-0 h-3 flex justify-between px-1"
            style={{ backgroundColor: theme.frosting }}
          >
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3 rounded-b-full shadow-xs"
                style={{ backgroundColor: theme.frosting }}
              />
            ))}
          </div>

          {/* Age tag or mini star if age is provided */}
          {age && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-2 py-0.5 text-xs font-black tracking-wider text-white drop-shadow-md rounded-full bg-black/20 backdrop-blur-xs">
                {age}
              </span>
            </div>
          )}

          {/* Decorative sugar sprinkles */}
          <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-white/80 shadow-xs" />
          <div className="absolute bottom-3 right-4 w-1.5 h-1.5 rounded-full bg-amber-300/90 shadow-xs" />
          <div className="absolute bottom-1 right-8 w-1 h-1 rounded-full bg-rose-400 shadow-xs" />
          <div className="absolute bottom-2 left-10 w-1 h-1 rounded-full bg-sky-400 shadow-xs" />
        </div>

        {/* Middle Frosting Ribbon / Cream Layer */}
        <div
          className="relative w-48 h-2.5 mx-auto rounded-sm z-20 -my-0.5 shadow-xs"
          style={{ backgroundColor: theme.frosting }}
        />

        {/* Cake Tier 1 (Bottom Layer) */}
        <div
          className="relative w-48 h-16 mx-auto rounded-t-lg rounded-b-md z-10 shadow-lg border-t border-white/40 overflow-hidden flex flex-col justify-end"
          style={{ backgroundColor: theme.layer1 }}
        >
          {/* Icing scalloped border */}
          <div
            className="absolute top-0 left-0 right-0 h-3.5 flex justify-between px-1.5"
            style={{ backgroundColor: theme.frosting }}
          >
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-3 rounded-b-full shadow-xs"
                style={{ backgroundColor: theme.frosting }}
              />
            ))}
          </div>

          {/* Recipient name ribbon on cake tier */}
          {recipientName && (
            <div className="z-10 mb-2 px-3 py-0.5 mx-auto max-w-[85%] text-center">
              <span
                className="text-xs font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md shadow-xs truncate block"
                style={{
                  backgroundColor: theme.frosting,
                  color: theme.layer1 === '#4a2810' ? '#ffffff' : '#334155',
                }}
              >
                {recipientName}
              </span>
            </div>
          )}

          {/* Bottom piping border */}
          <div className="w-full h-1.5 bg-white/30" />
        </div>

        {/* Cake Plate / Stand */}
        <div
          className="relative w-56 h-4 mx-auto rounded-full -mt-1 shadow-xl border border-white/60 z-0"
          style={{ backgroundColor: theme.plateColor }}
        >
          <div className="absolute inset-x-4 top-0.5 h-1 bg-white/70 rounded-full blur-[0.5px]" />
        </div>
      </div>

      {/* Little feedback on wishing */}
      {lastWishedAt && !isLit && (
        <p className="mt-2 text-xs font-medium text-amber-200 animate-pulse flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Wish recorded! May all your hopes come true this year!
        </p>
      )}
    </div>
  );
};
