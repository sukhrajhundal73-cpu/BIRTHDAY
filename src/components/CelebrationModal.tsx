import React from 'react';
import { CardCustomization } from '../types';
import { CakeTheme } from '../types';
import { Cake } from './Cake';
import { fireGrandCelebration } from '../utils/confetti';
import { sound } from '../utils/audio';
import { X, Sparkles, Heart, Share2, Volume2, VolumeX, Cake as CakeIcon } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: CardCustomization;
  cakeTheme: CakeTheme;
  isCandleLit: boolean;
  onToggleCandle: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  customization,
  cakeTheme,
  isCandleLit,
  onToggleCandle,
  isMusicPlaying,
  onToggleMusic,
}) => {
  if (!isOpen) return null;

  const handleMoreConfetti = () => {
    sound.playPopperSound();
    fireGrandCelebration();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-pink-950/60 to-slate-900 border border-pink-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-[0_0_60px_rgba(255,64,129,0.35)] text-center max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Close card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Birthday Celebration Card</span>
        </div>

        {/* Greeting Headline */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 drop-shadow-sm mb-1">
          Happy Birthday
        </h2>
        {customization.recipientName && (
          <h3 className="text-2xl sm:text-3xl font-black text-pink-400 drop-shadow-md mb-2">
            {customization.recipientName}! 🎉
          </h3>
        )}

        {/* Cake in Celebration View */}
        <div className="my-1 scale-90 sm:scale-100 origin-center">
          <Cake
            theme={cakeTheme}
            isLit={isCandleLit}
            onToggleCandle={onToggleCandle}
            recipientName={customization.recipientName}
            age={customization.age}
            numCandles={customization.numCandles}
          />
        </div>

        {/* Personal Message Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 my-4 text-left shadow-inner">
          <p className="text-sm sm:text-base text-pink-50 leading-relaxed italic">
            "{customization.message}"
          </p>
          {customization.senderName && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-pink-200/80">With all our heart</span>
              <span className="font-bold text-pink-300">
                — {customization.senderName}
              </span>
            </div>
          )}
        </div>

        {/* Celebration Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-5">
          <button
            onClick={handleMoreConfetti}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>More Confetti! 🎊</span>
          </button>

          <button
            onClick={onToggleMusic}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 active:scale-95 flex items-center justify-center gap-2 shrink-0"
            title={isMusicPlaying ? 'Pause Melody' : 'Play Birthday Tune'}
          >
            {isMusicPlaying ? (
              <>
                <VolumeX className="w-4 h-4 text-pink-300" />
                <span>Pause Tune</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>Play Tune 🎵</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
