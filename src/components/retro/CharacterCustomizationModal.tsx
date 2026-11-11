import React, { useState } from 'react';
import {
  CharacterCustomization,
  COSMETICS_CATALOG,
  CosmeticItem,
  saveCharacter,
} from '../../types/character';
import { Language, TRANSLATIONS } from '../../utils/i18n';
import { sound } from '../../utils/audio';
import { X, Check, Sparkles, User, Palette, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  character: CharacterCustomization;
  onUpdateCharacter: (newChar: CharacterCustomization) => void;
  playerXp: number;
  language: Language;
}

export const CharacterCustomizationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  character,
  onUpdateCharacter,
  playerXp,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'headwear' | 'shirt' | 'pants' | 'shoes' | 'accessory' | 'colors'>('headwear');
  const [tempChar, setTempChar] = useState<CharacterCustomization>(character);
  const [savedToast, setSavedToast] = useState<boolean>(false);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSelectCosmetic = (category: 'headwear' | 'shirt' | 'pants' | 'shoes' | 'accessory', itemId: string) => {
    sound.playClick();
    setTempChar((prev) => ({
      ...prev,
      [category]: itemId,
    }));
  };

  const handleSave = () => {
    sound.playSuccess();
    saveCharacter(tempChar);
    onUpdateCharacter(tempChar);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 800);
  };

  const activeCategoryItems = COSMETICS_CATALOG.filter((item) => item.category === activeTab);

  const colors = [
    '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#64748b'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-4xl bg-slate-900 border-3 border-[#38bdf8] rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.4)] overflow-hidden flex flex-col max-h-[92vh] font-game">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#0e3b8a] via-[#1d64d8] to-[#0284c7] px-5 py-3.5 flex items-center justify-between border-b-2 border-[#60a5fa] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/20 rounded-lg border border-white/40">
              <User className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wide drop-shadow">
                {t.customizeTitle}
              </h3>
              <p className="text-[11px] text-cyan-200">{t.customizeSub}</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white border border-rose-300 shadow cursor-pointer active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left: 2D Live Character Stage */}
          <div className="md:col-span-5 p-6 bg-gradient-to-b from-[#0a192f] to-[#102a5c] border-r border-blue-400/20 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 text-xs font-mono text-cyan-300 bg-blue-950/80 px-2.5 py-1 rounded-md border border-cyan-400/30">
              2D LIVE PREVIEW
            </div>

            {/* Stage Pedestal */}
            <div className="relative my-6 flex flex-col items-center">
              {/* Character Avatar Sprite Rendering */}
              <div
                className="w-40 h-40 rounded-3xl border-4 border-white shadow-[0_0_35px_rgba(56,189,248,0.6)] flex items-center justify-center text-7xl transition-all duration-300 relative overflow-hidden"
                style={{ backgroundColor: tempChar.primaryColor }}
              >
                {tempChar.baseStyle === 'scout' ? '🧝' : tempChar.baseStyle === 'cyborg' ? '🤖' : '🧑‍🚀'}

                {/* Accessory Overlay Badge */}
                {tempChar.accessory === 'acc_cape' && (
                  <div className="absolute top-2 right-2 text-2xl animate-pulse">🧣</div>
                )}
                {tempChar.accessory === 'acc_drone' && (
                  <div className="absolute top-2 right-2 text-2xl animate-bounce">🛸</div>
                )}
                {tempChar.accessory === 'acc_holobadge' && (
                  <div className="absolute bottom-2 left-2 text-2xl">🎖️</div>
                )}
              </div>

              {/* Glowing Floor Pedestal */}
              <div className="w-48 h-6 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full blur-xs mt-3" />
            </div>

            {/* Cadet Base Style Selector */}
            <div className="flex gap-2">
              {(['cadet', 'scout', 'cyborg'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTempChar((prev) => ({ ...prev, baseStyle: style }));
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    tempChar.baseStyle === style
                      ? 'bg-cyan-400 text-slate-950 shadow border border-white'
                      : 'bg-blue-950/80 text-blue-200 border border-blue-400/30'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Wardrobe Category Tabs & Catalog */}
          <div className="md:col-span-7 p-5 flex flex-col justify-between overflow-y-auto bg-slate-950">
            <div>
              {/* Category Nav Tabs */}
              <div className="flex items-center gap-1.5 pb-3 border-b border-slate-800 overflow-x-auto scrollbar-none mb-4">
                {[
                  { id: 'headwear' as const, label: t.headwear, icon: '🧢' },
                  { id: 'shirt' as const, label: t.shirts, icon: '🧥' },
                  { id: 'pants' as const, label: t.pants, icon: '👖' },
                  { id: 'shoes' as const, label: t.shoes, icon: '👟' },
                  { id: 'accessory' as const, label: t.accessories, icon: '✨' },
                  { id: 'colors' as const, label: 'Colors', icon: '🎨' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md border border-cyan-300'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              {activeTab === 'colors' ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block mb-2">
                      Primary Armor Suit Tint
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            sound.playClick();
                            setTempChar((prev) => ({ ...prev, primaryColor: c }));
                          }}
                          className={`w-10 h-10 rounded-xl border-2 transition-transform cursor-pointer ${
                            tempChar.primaryColor === c ? 'scale-110 border-white shadow-lg' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  {activeCategoryItems.map((item) => {
                    const isSelected = (tempChar as any)[item.category] === item.id;
                    const isLocked = !item.unlockedByDefault && (item.requiredXp || 0) > playerXp;

                    return (
                      <button
                        key={item.id}
                        disabled={isLocked}
                        onClick={() => handleSelectCosmetic(item.category, item.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : isLocked
                            ? 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                            : 'bg-slate-900 hover:bg-slate-800/90 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-white">
                              {language === 'id' ? item.nameId : item.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {isLocked ? `Locks at ${item.requiredXp} XP` : 'Unlocked'}
                            </div>
                          </div>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 font-mono">
                {savedToast ? (
                  <span className="text-emerald-400 font-bold">{t.characterSaved}</span>
                ) : (
                  'Changes apply to all minigames and profiles.'
                )}
              </span>

              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg border border-white cursor-pointer active:scale-95"
              >
                {t.saveAppearance}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
