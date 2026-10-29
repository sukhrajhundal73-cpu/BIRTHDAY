import React, { useState } from 'react';
import { GiftSurprise } from '../types';
import { GIFT_SURPRISES } from '../data/presets';
import { sound } from '../utils/audio';
import { fireWishSparkles } from '../utils/confetti';
import { Gift, X, Sparkles, RefreshCw, Heart } from 'lucide-react';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

export const GiftModal: React.FC<GiftModalProps> = ({
  isOpen,
  onClose,
  recipientName,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentSurpriseIndex, setCurrentSurpriseIndex] = useState(0);

  if (!isOpen) return null;

  const surprise: GiftSurprise = GIFT_SURPRISES[currentSurpriseIndex % GIFT_SURPRISES.length];

  const handleOpenGift = () => {
    sound.playFanfare();
    fireWishSparkles();
    setIsOpened(true);
  };

  const handleNextSurprise = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSparkleSound?.();
    fireWishSparkles();
    setCurrentSurpriseIndex((prev) => (prev + 1) % GIFT_SURPRISES.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          /* Wrapped Gift Box State */
          <div className="flex flex-col items-center py-4">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
              A Special Surprise For {recipientName || 'You'}
            </span>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              You Have Received a Birthday Gift! 🎁
            </h2>

            {/* Clickable Gift Box */}
            <div
              onClick={handleOpenGift}
              className="relative cursor-pointer group my-4 p-4 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative w-40 h-40 bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 rounded-2xl shadow-xl flex items-center justify-center border-2 border-rose-300/40 animate-gift-bounce">
                {/* Horizontal & Vertical Gold Ribbons */}
                <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 shadow-md" />
                <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-300 shadow-md" />

                {/* Bow on Top */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-amber-300 bg-amber-400 shadow-md -mr-2 rotate-[-25deg]" />
                  <div className="w-8 h-8 rounded-full border-4 border-amber-300 bg-amber-400 shadow-md -ml-2 rotate-[25deg]" />
                  <div className="absolute w-4 h-4 rounded-full bg-amber-200 shadow-inner z-10" />
                </div>

                <div className="z-10 bg-white/20 p-2.5 rounded-full backdrop-blur-xs">
                  <Gift className="w-8 h-8 text-amber-200" />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-rose-200 group-hover:text-white transition-colors">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Tap the box to unwrap!</span>
              </div>
            </div>
          </div>
        ) : (
          /* Unwrapped Gift Content State */
          <div className="flex flex-col items-center py-2 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-4xl mb-4 shadow-inner">
              {surprise.emoji}
            </div>

            <span className="text-xs uppercase tracking-wider text-amber-300 font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-300/30 mb-2">
              {surprise.badge}
            </span>

            <h3 className="text-2xl font-black text-white mb-3">
              {surprise.title}
            </h3>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 mb-6 text-sm text-slate-200 leading-relaxed max-w-sm">
              "{surprise.message}"
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleNextSurprise}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all active:scale-95 border border-white/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Next Surprise</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-rose-500/25"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Thank You!</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
