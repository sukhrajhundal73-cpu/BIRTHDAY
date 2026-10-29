import React, { useState, useEffect } from 'react';
import { Cake } from './components/Cake';
import { Balloons } from './components/Balloons';
import { GiftModal } from './components/GiftModal';
import { PersonalizeModal } from './components/PersonalizeModal';
import { CelebrationModal } from './components/CelebrationModal';
import { CAKE_THEMES, BACKGROUND_GRADIENTS } from './data/presets';
import { CardCustomization } from './types';
import { sound } from './utils/audio';
import { fireGrandCelebration } from './utils/confetti';
import {
  Sparkles,
  Gift,
  Volume2,
  VolumeX,
  Share2,
  Sliders,
  PartyPopper,
  Flame,
  Heart,
  RefreshCw,
} from 'lucide-react';

export default function App() {
  // Card customization state
  const [customization, setCustomization] = useState<CardCustomization>({
    recipientName: '',
    senderName: '',
    age: '',
    message:
      'May your birthday be filled with happiness, love, laughter and unforgettable memories! ❤️',
    cakeThemeId: 'strawberry',
    bgThemeId: 'cotton-candy',
    numCandles: 1,
  });

  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [poppedCount, setPoppedCount] = useState(0);

  // Modals state
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [balloonDensity, setBalloonDensity] = useState(22);

  // Parse URL hash on initial load for shareable cards
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        setCustomization((prev) => ({
          ...prev,
          recipientName: params.get('name') || prev.recipientName,
          senderName: params.get('from') || prev.senderName,
          age: params.get('age') || prev.age,
          message: params.get('msg') || prev.message,
          cakeThemeId: params.get('cake') || prev.cakeThemeId,
          bgThemeId: params.get('bg') || prev.bgThemeId,
          numCandles: params.get('candles') ? Number(params.get('candles')) : prev.numCandles,
        }));
      } catch {
        // Fallback to default
      }
    }

    sound.setMusicStateListener((playing) => {
      setIsMusicPlaying(playing);
    });
  }, []);

  const activeCakeTheme =
    CAKE_THEMES.find((t) => t.id === customization.cakeThemeId) || CAKE_THEMES[0];

  const activeBgTheme =
    BACKGROUND_GRADIENTS.find((bg) => bg.id === customization.bgThemeId) ||
    BACKGROUND_GRADIENTS[0];

  // Core celebration action from original user prompt
  const handleCelebrate = () => {
    sound.playPopperSound();
    fireGrandCelebration();

    if (!isMusicPlaying) {
      sound.playMusicBoxTune();
      setIsMusicPlaying(true);
    }

    setIsCelebrationOpen(true);
  };

  const handleToggleMusic = () => {
    sound.toggleMusic();
    setIsMusicPlaying(sound.getIsPlaying());
  };

  const handleUpdateCustomization = (updated: Partial<CardCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...updated }));
  };

  const handleReleaseMoreBalloons = () => {
    sound.playLightSound();
    setBalloonDensity((prev) => (prev >= 35 ? 18 : prev + 6));
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden transition-all duration-700 text-white select-none"
      style={{
        background: activeBgTheme.css,
      }}
    >
      {/* Floating Animated Balloons Layer */}
      <Balloons
        balloonCount={balloonDensity}
        onPopCountChange={(count) => setPoppedCount(count)}
      />

      {/* Top Bar following Top Bar Contract: Brand | Nav Links | Primary Action */}
      <header className="relative z-30 flex items-center justify-between gap-8 px-5 sm:px-8 py-4 backdrop-blur-md bg-black/15 border-b border-white/10">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md whitespace-nowrap">
            🎉 Birthday Sparkle
          </span>
        </div>

        {/* Zone 2: 4 single-line nav actions */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/90">
          <button
            onClick={() => setIsPersonalizeOpen(true)}
            className="hover:text-white transition-colors hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4 text-pink-300" />
            <span>Customize Card</span>
          </button>

          <button
            onClick={() => setIsGiftOpen(true)}
            className="hover:text-white transition-colors hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1.5"
          >
            <Gift className="w-4 h-4 text-amber-300" />
            <span>Surprise Gift</span>
          </button>

          <button
            onClick={handleReleaseMoreBalloons}
            className="hover:text-white transition-colors hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1.5"
            title="Add more balloons to the sky"
          >
            <span>Balloons ({balloonDensity})</span>
          </button>

          <button
            onClick={handleToggleMusic}
            className="hover:text-white transition-colors hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1.5"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>Music Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-white/70" />
                <span>Music Off</span>
              </>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCelebrate}
            className="px-5 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-500/35 border border-white/20 whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Celebrate 🎂</span>
          </button>
        </div>
      </header>

      {/* Main Celebratory Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-8 text-center max-w-4xl mx-auto w-full">
        {/* Recipient Badge if customized */}
        {customization.recipientName && (
          <div className="mb-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Special Celebration For {customization.recipientName}</span>
          </div>
        )}

        {/* Big Glowing Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight animate-glow-text"
          style={{
            textShadow: `0 0 20px ${activeBgTheme.glowColor}, 0 0 40px rgba(255, 64, 129, 0.5)`,
          }}
        >
          🎉 Happy Birthday 🎉
        </h1>

        {/* Recipient Big Name Callout */}
        {customization.recipientName && (
          <h2
            className="text-3xl sm:text-5xl font-black text-amber-200 mt-2 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
          >
            {customization.recipientName}
            {customization.age ? ` (${customization.age})` : ''}
          </h2>
        )}

        {/* Interactive Birthday Cake */}
        <div className="my-4">
          <Cake
            theme={activeCakeTheme}
            isLit={isCandleLit}
            onToggleCandle={() => setIsCandleLit(!isCandleLit)}
            recipientName={customization.recipientName}
            age={customization.age}
            numCandles={customization.numCandles}
          />
        </div>

        {/* Heartfelt Greeting Message */}
        <div className="max-w-xl mx-auto px-4">
          <p className="text-lg sm:text-2xl text-white font-medium drop-shadow-md leading-relaxed">
            {customization.message}
          </p>
          {customization.senderName && (
            <p className="mt-2 text-sm sm:text-base font-semibold text-pink-100 drop-shadow-xs">
              With love, {customization.senderName}
            </p>
          )}
        </div>

        {/* Interactive Buttons Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Main Celebrate Button (Faithful to user's button) */}
          <button
            onClick={handleCelebrate}
            className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-lg sm:text-xl font-bold bg-[#ff4081] hover:bg-[#ff0055] text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(255,64,129,0.5)] border border-white/30 flex items-center gap-2 cursor-pointer"
          >
            <PartyPopper className="w-6 h-6 animate-bounce" />
            <span>Celebrate 🎂</span>
          </button>

          {/* Surprise Gift Button */}
          <button
            onClick={() => setIsGiftOpen(true)}
            className="px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95 border border-white/30 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Gift className="w-5 h-5 text-amber-300" />
            <span>Unwrap Gift 🎁</span>
          </button>

          {/* Customize Card Button */}
          <button
            onClick={() => setIsPersonalizeOpen(true)}
            className="px-5 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95 border border-white/30 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Sliders className="w-5 h-5 text-pink-300" />
            <span>Personalize ✏️</span>
          </button>
        </div>

        {/* Gamified Popped Balloon Counter & Tips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/80 font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
            <span>🎈 Balloons Popped:</span>
            <span className="font-bold text-amber-300">{poppedCount}</span>
            <span className="text-white/60">(Tap balloons to pop!)</span>
          </div>

          <button
            onClick={handleToggleMusic}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Playing Birthday Melody</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/60" />
                <span>Click to Play Song</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 py-3 px-6 text-center text-xs text-white/70 backdrop-blur-xs border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>🎈 Click balloons to pop · Tap candle to make a wish</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPersonalizeOpen(true)}
            className="hover:text-white transition-colors underline cursor-pointer"
          >
            Share this card with a friend
          </button>
          <span>·</span>
          <span>Made with love & celebration joy</span>
        </div>
      </footer>

      {/* Modals */}
      <GiftModal
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
        recipientName={customization.recipientName}
      />

      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        customization={customization}
        onUpdate={handleUpdateCustomization}
      />

      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        customization={customization}
        cakeTheme={activeCakeTheme}
        isCandleLit={isCandleLit}
        onToggleCandle={() => setIsCandleLit(!isCandleLit)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
}
