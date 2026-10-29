import React, { useEffect, useState, useCallback } from 'react';
import { sound } from '../utils/audio';
import { fireBalloonPopConfetti } from '../utils/confetti';

export interface Balloon {
  id: number;
  xPercent: number;
  hue: number;
  size: number; // width in px
  speedSeconds: number;
  swaySeconds: number;
  delaySeconds: number;
}

interface BalloonsProps {
  balloonCount?: number;
  onPopCountChange?: (count: number) => void;
}

export const Balloons: React.FC<BalloonsProps> = ({
  balloonCount = 20,
  onPopCountChange,
}) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);

  const createBalloon = useCallback((id: number, initialDelay = 0): Balloon => {
    return {
      id,
      xPercent: Math.random() * 92 + 4, // 4vw to 96vw
      hue: Math.floor(Math.random() * 360),
      size: Math.floor(Math.random() * 24 + 55), // 55px to 79px
      speedSeconds: Math.random() * 6 + 10, // 10s to 16s float
      swaySeconds: Math.random() * 2 + 3, // 3s to 5s horizontal sway
      delaySeconds: initialDelay,
    };
  }, []);

  useEffect(() => {
    // Generate initial set of staggered balloons
    const initialList: Balloon[] = [];
    for (let i = 0; i < balloonCount; i++) {
      // Stagger start delays so they don't all rise at once
      initialList.push(createBalloon(i, Math.random() * -12));
    }
    setBalloons(initialList);
  }, [balloonCount, createBalloon]);

  const handlePop = (e: React.MouseEvent, balloon: Balloon) => {
    e.stopPropagation();
    e.preventDefault();

    // Sound and visual burst
    sound.playBalloonPop();
    fireBalloonPopConfetti(e.clientX, e.clientY, balloon.hue);

    // Update count
    setPoppedCount((prev) => {
      const next = prev + 1;
      if (onPopCountChange) onPopCountChange(next);
      return next;
    });

    // Remove popped balloon and respawn at bottom after brief interval
    setBalloons((current) =>
      current.map((b) => {
        if (b.id === balloon.id) {
          // Re-create with new random attributes starting just below screen
          return {
            ...createBalloon(b.id, 0.5),
            xPercent: Math.random() * 90 + 5,
          };
        }
        return b;
      })
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute pointer-events-auto cursor-pointer group"
          style={{
            left: `${b.xPercent}vw`,
            bottom: '-120px',
            animation: `floatUp ${b.speedSeconds}s linear infinite, sway ${b.swaySeconds}s ease-in-out infinite alternate`,
            animationDelay: `${b.delaySeconds}s`,
            width: `${b.size}px`,
            height: `${b.size * 1.25}px`,
          }}
          onClick={(e) => handlePop(e, b)}
          title="Click to pop!"
        >
          {/* Balloon shape */}
          <div
            className="w-full h-full relative transition-transform duration-150 group-hover:scale-110 active:scale-90"
            style={{
              background: `radial-gradient(circle at 35% 30%, hsl(${b.hue}, 95%, 75%), hsl(${b.hue}, 90%, 50%), hsl(${b.hue}, 85%, 35%))`,
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              boxShadow: `inset -5px -8px 15px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.15)`,
            }}
          >
            {/* Top Gloss highlight */}
            <div
              className="absolute top-2 left-3 w-3 h-5 rounded-full bg-white/60 blur-[0.6px] -rotate-30 pointer-events-none"
            />

            {/* Balloon knot */}
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 rounded-xs"
              style={{
                backgroundColor: `hsl(${b.hue}, 85%, 35%)`,
              }}
            />

            {/* Dangling string */}
            <div className="absolute top-[98%] left-1/2 -translate-x-1/2 w-0.5 h-24 bg-white/70 origin-top shadow-xs">
              <svg
                className="w-4 h-24 -ml-1.5 overflow-visible stroke-white/80 fill-none"
                viewBox="0 0 16 96"
              >
                <path
                  d="M8,0 Q14,24 8,48 T8,96"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          5% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(calc(-100vh - 160px));
            opacity: 0;
          }
        }
        @keyframes sway {
          0% {
            margin-left: -15px;
            transform: rotate(-4deg);
          }
          100% {
            margin-left: 15px;
            transform: rotate(4deg);
          }
        }
      `}</style>
    </div>
  );
};
