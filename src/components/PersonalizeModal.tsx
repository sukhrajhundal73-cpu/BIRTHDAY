import React, { useState } from 'react';
import { CardCustomization } from '../types';
import { CAKE_THEMES, BACKGROUND_GRADIENTS, PRESET_WISHES } from '../data/presets';
import { X, Check, Copy, Sparkles, Share2, Palette, Cake as CakeIcon, Heart } from 'lucide-react';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: CardCustomization;
  onUpdate: (updated: Partial<CardCustomization>) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  customization,
  onUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme'>('content');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyShareLink = () => {
    const params = new URLSearchParams();
    if (customization.recipientName) params.set('name', customization.recipientName);
    if (customization.senderName) params.set('from', customization.senderName);
    if (customization.age) params.set('age', customization.age);
    if (customization.message) params.set('msg', customization.message);
    if (customization.cakeThemeId) params.set('cake', customization.cakeThemeId);
    if (customization.bgThemeId) params.set('bg', customization.bgThemeId);
    if (customization.numCandles) params.set('candles', String(customization.numCandles));

    const shareUrl = `${window.location.origin}${window.location.pathname}#${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 text-white shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-500/20 text-pink-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Personalize Birthday Card</h2>
              <p className="text-xs text-slate-400">Customize the name, message, cake & theme</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Controls for Tabs */}
        <div className="flex gap-1 p-1 bg-slate-800/80 rounded-xl my-4 shrink-0">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Names & Wishes</span>
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'theme'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Cake & Visual Theme</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === 'content' ? (
            <>
              {/* Recipient Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Birthday Star Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah, Dad, My Bestie..."
                  value={customization.recipientName}
                  onChange={(e) => onUpdate({ recipientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-pink-500 focus:outline-hidden text-sm text-white placeholder-slate-500 transition-colors"
                />
              </div>

              {/* Age & Candles */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Age / Milestone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 21, 30, Sweet 16"
                    value={customization.age}
                    onChange={(e) => onUpdate({ age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-pink-500 focus:outline-hidden text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Number of Candles
                  </label>
                  <select
                    value={customization.numCandles}
                    onChange={(e) => onUpdate({ numCandles: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-pink-500 focus:outline-hidden text-sm text-white transition-colors"
                  >
                    <option value={1}>1 Candle (Classic)</option>
                    <option value={2}>2 Candles</option>
                    <option value={3}>3 Candles</option>
                    <option value={4}>4 Candles</option>
                    <option value={5}>5 Candles (Celebration)</option>
                  </select>
                </div>
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  From (Your Name / Signature)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex, Mom & Dad, The Whole Crew..."
                  value={customization.senderName}
                  onChange={(e) => onUpdate({ senderName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-pink-500 focus:outline-hidden text-sm text-white placeholder-slate-500 transition-colors"
                />
              </div>

              {/* Custom Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Birthday Greeting Message
                  </label>
                </div>
                <textarea
                  rows={3}
                  value={customization.message}
                  onChange={(e) => onUpdate({ message: e.target.value })}
                  placeholder="Write a personal wish..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-pink-500 focus:outline-hidden text-sm text-white placeholder-slate-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Quick Wish Templates */}
              <div>
                <span className="block text-xs font-medium text-slate-400 mb-2">
                  Quick Wish Ideas (Click to insert):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_WISHES.map((pw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onUpdate({ message: pw.message })}
                      className="text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-pink-500/40 transition-all text-xs group"
                    >
                      <div className="font-semibold text-pink-300 group-hover:text-pink-200">
                        {pw.title}
                      </div>
                      <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                        {pw.message}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Cake Flavor Picker */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Cake Flavor & Style
                </label>
                <div className="space-y-2">
                  {CAKE_THEMES.map((t) => {
                    const isSelected = customization.cakeThemeId === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => onUpdate({ cakeThemeId: t.id })}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-pink-500/15 border-pink-500 text-white'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-1.5 items-center">
                            <span
                              className="w-5 h-5 rounded-full border border-black/20 shadow-xs"
                              style={{ backgroundColor: t.layer1 }}
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-black/20 shadow-xs"
                              style={{ backgroundColor: t.layer2 }}
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-black/20 shadow-xs"
                              style={{ backgroundColor: t.dripColor }}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{t.name}</div>
                            <div className="text-[11px] text-slate-400">{t.description}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-pink-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Background Ambiance Picker */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Background Color Gradient
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BACKGROUND_GRADIENTS.map((bg) => {
                    const isSelected = customization.bgThemeId === bg.id;
                    return (
                      <div
                        key={bg.id}
                        onClick={() => onUpdate({ bgThemeId: bg.id })}
                        className={`p-2.5 rounded-xl cursor-pointer border flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'border-pink-400 bg-slate-800 shadow-md ring-1 ring-pink-400'
                            : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-lg shrink-0 border border-white/20 shadow-xs"
                          style={{ background: bg.css }}
                        />
                        <span className="text-xs font-medium text-slate-200 truncate">
                          {bg.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all border border-slate-700 active:scale-95"
            title="Create a unique URL with these details to send to your friend"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-pink-400" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-xs font-bold text-white transition-all shadow-md active:scale-95"
          >
            Apply & Celebrate
          </button>
        </div>
      </div>
    </div>
  );
};
