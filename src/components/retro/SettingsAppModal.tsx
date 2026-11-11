import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Languages,
  User,
  Sun,
  Volume2,
  Clock,
  RotateCcw,
  Info,
  ShieldAlert,
  Coins,
  Gem,
  Check,
  CheckCircle2,
  Sliders,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  CharacterCustomization,
  CHARACTER_SKINS,
  CharacterSkin,
  getUnlockedSkinIds,
  unlockSkinId,
} from '../../types/character';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'id';
  onSetLang: (lang: 'en' | 'id') => void;
  coins: number;
  gems: number;
  onUpdateCurrency: (coinsDelta: number, gemsDelta: number) => void;
  brightness: number;
  onSetBrightness: (b: number) => void;
  uiScale: number;
  onSetUiScale: (s: number) => void;
  masterVolume: number;
  onSetMasterVolume: (v: number) => void;
  onResetAllData: () => void;
  activeSkinId?: string;
  onSelectSkin?: (skinId: string) => void;
  playerName?: string;
  onSetPlayerName?: (name: string) => void;
  character?: CharacterCustomization;
  onOpenCustomization?: () => void;
  initialTab?: 'profile' | 'general' | 'language' | 'skins' | 'audio' | 'datetime' | 'reset' | 'about';
}

export const SettingsAppModal: React.FC<Props> = ({
  isOpen,
  onClose,
  lang,
  onSetLang,
  coins,
  gems,
  onUpdateCurrency,
  brightness,
  onSetBrightness,
  uiScale,
  onSetUiScale,
  masterVolume,
  onSetMasterVolume,
  onResetAllData,
  activeSkinId = 'skin_default',
  onSelectSkin,
  playerName = 'Player_01',
  onSetPlayerName,
  character,
  onOpenCustomization,
  initialTab = 'profile',
}) => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'general' | 'language' | 'skins' | 'audio' | 'datetime' | 'reset' | 'about'
  >(initialTab);
  const [editingName, setEditingName] = useState<string>(playerName);
  const [nameSaved, setNameSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Reset confirmation state (requires two sequential confirmations)
  const [resetStep, setResetStep] = useState<0 | 1 | 2>(0);

  // Unlocked skins
  const [unlockedSkins, setUnlockedSkins] = useState<string[]>(() =>
    getUnlockedSkinIds()
  );
  const [currentSelectedSkin, setCurrentSelectedSkin] =
    useState<string>(activeSkinId);

  if (!isOpen) return null;

  const handleBuyOrEquipSkin = (skin: CharacterSkin) => {
    const isUnlocked = unlockedSkins.includes(skin.id);

    if (isUnlocked) {
      setCurrentSelectedSkin(skin.id);
      onSelectSkin?.(skin.id);
      sound.playSuccess();
    } else {
      // Need to purchase
      if (coins < skin.priceCoins || gems < skin.priceGems) {
        sound.playError();
        return;
      }

      onUpdateCurrency(-skin.priceCoins, -skin.priceGems);
      const updated = unlockSkinId(skin.id);
      setUnlockedSkins(updated);
      setCurrentSelectedSkin(skin.id);
      onSelectSkin?.(skin.id);
      sound.playLevelUp();
    }
  };

  const handleExecuteReset = () => {
    sound.playLaser();
    onResetAllData();
    setResetStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none">
      {/* Windows Aero Settings Window Frame */}
      <div className="w-full max-w-3xl bg-slate-100 rounded-t-xl rounded-b-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-400 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Title Bar (Classic Windows Aero Glass) */}
        <div className="h-9 bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 flex items-center justify-between px-3 text-white shadow-inner">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-wide drop-shadow">
              {lang === 'id'
                ? 'Pengaturan Sistem STEM Nexus'
                : 'STEM Nexus System Settings'}
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-6 h-6 rounded bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white font-black text-xs shadow hover:scale-105 active:scale-95 transition-all"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area: Sidebar Tabs + Tab Panel */}
        <div className="flex flex-1 overflow-hidden bg-slate-50 text-slate-800">
          {/* Navigation Sidebar */}
          <div className="w-48 sm:w-56 bg-gradient-to-b from-slate-200 to-slate-300 border-r border-slate-300 p-2 flex flex-col gap-1 overflow-y-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('profile');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{lang === 'id' ? 'Profil Kadet' : 'Cadet Profile'}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('general');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'general'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{lang === 'id' ? 'Kecerahan Layar' : 'Screen Brightness'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('language');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'language'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>{lang === 'id' ? 'Bahasa / Language' : 'Language'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('skins');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'skins'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{lang === 'id' ? 'Karakter & Skin' : 'Characters & Skins'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('audio');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'audio'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{lang === 'id' ? 'Volume & Audio' : 'Sound & Volume'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('datetime');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'datetime'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{lang === 'id' ? 'Waktu & Tanggal' : 'Date & Time'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('reset');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'reset'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'hover:bg-rose-100 text-rose-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'id' ? 'Reset Data' : 'Reset All Data'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('about');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-300/80 text-slate-700'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{lang === 'id' ? 'Tentang & Tim' : 'About & Team'}</span>
            </button>
          </div>

          {/* Main Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white">
            {/* 1. GENERAL / DISPLAY TAB */}
                        {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>{lang === 'id' ? 'Profil & Karakter Kadet' : 'Cadet Profile & Character'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Kelola nama kadet dan kostum avatar STEM Nexus.'
                      : 'Manage your cadet identity and STEM Nexus cosmetics.'}
                  </p>
                </div>

                {/* Avatar & Name Card */}
                <div className="bg-white border-2 border-blue-400/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-4xl shrink-0"
                    style={{ backgroundColor: character?.primaryColor || '#3b82f6' }}
                  >
                    {character?.baseStyle === 'scout' ? '🧝' : character?.baseStyle === 'cyborg' ? '🤖' : '🧑‍🚀'}
                  </div>

                  <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                    <label className="text-xs font-bold text-slate-700 block">
                      {lang === 'id' ? 'Nama Kadet STEM:' : 'Cadet Display Name:'}
                    </label>
                    <div className="flex gap-2 max-w-sm mx-auto sm:mx-0">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-50"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (onSetPlayerName && editingName.trim()) {
                            sound.playClick();
                            onSetPlayerName(editingName.trim());
                            setNameSaved(true);
                            setTimeout(() => setNameSaved(false), 2000);
                          }
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow cursor-pointer"
                      >
                        {nameSaved ? (lang === 'id' ? 'Tersimpan!' : 'Saved!') : (lang === 'id' ? 'Simpan' : 'Save')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Character Studio Launcher */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <div className="font-black text-sm flex items-center gap-1.5 text-yellow-300">
                      <Sparkles className="w-4 h-4" />
                      <span>{lang === 'id' ? 'Kustomisasi Kostum & Skin' : 'Cosmetics & Armor Studio'}</span>
                    </div>
                    <div className="text-xs text-blue-200 mt-1">
                      {lang === 'id' ? 'Ubah topi, jubah, sepatu, dan warna zirah kadet.' : 'Equip headwear, capes, boots, and armor colors.'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      if (onOpenCustomization) onOpenCustomization();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer"
                  >
                    {lang === 'id' ? 'Buka Studio' : 'Open Studio'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    <span>{lang === 'id' ? 'Kecerahan Layar' : 'Screen Brightness'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Sesuaikan tingkat kecerahan visual antarmuka STEM Nexus.'
                      : 'Customize visual brightness and ambient display comfort.'}
                  </p>
                </div>

                {/* Brightness Slider */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-800">
                      {lang === 'id' ? 'Kecerahan Layar' : 'Screen Brightness'}
                    </label>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {Math.round(brightness * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={brightness}
                    onChange={(e) => onSetBrightness(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>50% ({lang === 'id' ? 'Redup' : 'Dim'})</span>
                    <span>100% ({lang === 'id' ? 'Standar' : 'Standard'})</span>
                    <span>150% ({lang === 'id' ? 'Cerah' : 'Bright'})</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. LANGUAGE TAB */}
            {activeTab === 'language' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-blue-600" />
                    <span>{lang === 'id' ? 'Pilihan Bahasa' : 'Language Selection'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Pilih bahasa pengantar materi soal, petunjuk minigame, dan menu sistem.'
                      : 'Choose your preferred language for learning materials, games, and UI.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onSetLang('id');
                      sound.playClick();
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                      lang === 'id'
                        ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-300'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl">🇮🇩</span>
                    <div>
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>Bahasa Indonesia</span>
                        {lang === 'id' && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Soal kurikulum SD & SMP Indonesia, penjelasan berbahasa Indonesia lengkap.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSetLang('en');
                      sound.playClick();
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                      lang === 'en'
                        ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-300'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl">🇺🇸</span>
                    <div>
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>English (US)</span>
                        {lang === 'en' && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        International STEM standards, English questions and explanations.
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 3. CHARACTERS & SKINS STORE TAB */}
            {activeTab === 'skins' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-indigo-600" />
                      <span>{lang === 'id' ? 'Katalog Karakter & Skin Kadet' : 'Cadet Character & Skin Store'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'id'
                        ? 'Gunakan Koin dan Permata untuk membuka skin spesial baru!'
                        : 'Use earned Coins and Gems to unlock exciting character skins!'}
                    </p>
                  </div>

                  {/* Wallet Display */}
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono font-bold">
                    <div className="flex items-center gap-1 text-amber-600">
                      <Coins className="w-4 h-4" />
                      <span>{coins}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-1 text-purple-600">
                      <Gem className="w-4 h-4" />
                      <span>{gems}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {CHARACTER_SKINS.map((skin) => {
                    const isUnlocked = unlockedSkins.includes(skin.id);
                    const isEquipped = currentSelectedSkin === skin.id;
                    const canAfford = coins >= skin.priceCoins && gems >= skin.priceGems;

                    return (
                      <div
                        key={skin.id}
                        className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                          isEquipped
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-300'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-black/10"
                            style={{ backgroundColor: skin.primaryColor }}
                          >
                            {skin.avatarIcon}
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                              <span>{lang === 'id' ? skin.nameId : skin.name}</span>
                              {isEquipped && (
                                <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded font-bold">
                                  {lang === 'id' ? 'DIPAKAI' : 'EQUIPPED'}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                              {lang === 'id' ? skin.descriptionId : skin.description}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          {!isUnlocked ? (
                            <div className="flex items-center gap-2 text-xs font-mono font-bold">
                              {skin.priceCoins > 0 && (
                                <span className="flex items-center gap-0.5 text-amber-600">
                                  <Coins className="w-3.5 h-3.5" /> {skin.priceCoins}
                                </span>
                              )}
                              {skin.priceGems > 0 && (
                                <span className="flex items-center gap-0.5 text-purple-600">
                                  <Gem className="w-3.5 h-3.5" /> {skin.priceGems}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {lang === 'id' ? 'Terbuka' : 'Unlocked'}
                            </span>
                          )}

                          <button
                            onClick={() => handleBuyOrEquipSkin(skin)}
                            disabled={!isUnlocked && !canAfford}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                              isEquipped
                                ? 'bg-indigo-100 text-indigo-700 cursor-default'
                                : isUnlocked
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow active:scale-95'
                                : canAfford
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow active:scale-95'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {isEquipped
                              ? lang === 'id'
                                ? 'Aktif'
                                : 'Active'
                              : isUnlocked
                              ? lang === 'id'
                                ? 'Gunakan'
                                : 'Equip'
                              : lang === 'id'
                              ? 'Beli Skin'
                              : 'Buy Skin'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. SOUND & VOLUME TAB */}
            {activeTab === 'audio' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-teal-600" />
                    <span>{lang === 'id' ? 'Kontrol Volume & Efek Suara' : 'Master Volume & Sound Effects'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Atur tingkat volume utama suara antarmuka dan musik latar.'
                      : 'Configure system audio and test interactive sound synthesizer effects.'}
                  </p>
                </div>

                {/* Master Volume Slider */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-800">
                      {lang === 'id' ? 'Volume Utama (Master Volume)' : 'Master Volume'}
                    </label>
                    <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                      {Math.round(masterVolume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={masterVolume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      onSetMasterVolume(v);
                      sound.setMasterVolume(v);
                    }}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0% (Bisu)</span>
                    <span>50%</span>
                    <span>100% (Maksimal)</span>
                  </div>
                </div>

                {/* Sound Test Buttons */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-slate-800 mb-2">
                    {lang === 'id' ? 'Uji Efek Suara (Sound Test)' : 'Test Sound Effects'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => sound.playClick()}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 active:scale-95 shadow-xs"
                    >
                      Click
                    </button>
                    <button
                      onClick={() => sound.playCoin()}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-amber-600 hover:bg-slate-100 active:scale-95 shadow-xs"
                    >
                      Coin 🪙
                    </button>
                    <button
                      onClick={() => sound.playSuccess()}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-emerald-600 hover:bg-slate-100 active:scale-95 shadow-xs"
                    >
                      Success 🎵
                    </button>
                    <button
                      onClick={() => sound.playEngineRev()}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-blue-600 hover:bg-slate-100 active:scale-95 shadow-xs"
                    >
                      Race Car 🏎️
                    </button>
                    <button
                      onClick={() => sound.playJump()}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-purple-600 hover:bg-slate-100 active:scale-95 shadow-xs"
                    >
                      Jump 🍄
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. TIME & DATE TAB */}
            {activeTab === 'datetime' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-sky-600" />
                    <span>{lang === 'id' ? 'Waktu & Kalender Sistem' : 'Date & Time Synchronizer'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Sinkronisasi jam dan waktu harian misi kadet STEM Nexus.'
                      : 'Clock time and daily mission reset telemetry.'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {lang === 'id' ? 'Waktu Saat Ini' : 'Current System Time'}
                    </div>
                    <div className="text-2xl font-black font-mono text-blue-700 mt-1">
                      {new Date().toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US')}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-3xl">
                    ⏱️
                  </div>
                </div>
              </div>
            )}

            {/* 6. RESET ALL DATA TAB */}
            {activeTab === 'reset' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-rose-600 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span>{lang === 'id' ? 'Reset Semua Data Aplikasi' : 'Reset All Application Data'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Mengembalikan seluruh XP, koin, permata, level, dan progres kuis ke nilai awal.'
                      : 'Reset all quiz progress, XP, coins, and customizations back to factory defaults.'}
                  </p>
                </div>

                {resetStep === 0 && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-slate-700 space-y-3">
                    <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>{lang === 'id' ? 'Peringatan Pembersihan Data' : 'Data Reset Warning'}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {lang === 'id'
                        ? 'Apakah Anda yakin ingin mengatur ulang data aplikasi? Tindakan ini memerlukan dua kali konfirmasi untuk mencegah data terhapus secara tidak sengaja.'
                        : 'Are you sure you want to reset app data? This requires two sequential confirmations to prevent accidental data loss.'}
                    </p>
                    <button
                      onClick={() => {
                        sound.playError();
                        setResetStep(1);
                      }}
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow active:scale-95 transition-all"
                    >
                      {lang === 'id' ? 'Mulai Proses Reset (Langkah 1/2)' : 'Proceed with Reset (Step 1/2)'}
                    </button>
                  </div>
                )}

                {resetStep === 1 && (
                  <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 text-slate-800 space-y-3 animate-in zoom-in-95">
                    <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'id' ? 'KONFIRMASI TERAKHIR: YAKIN INGIN MENGHAPUS?' : 'FINAL WARNING: PROCEED TO WIPE?'}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700">
                      {lang === 'id'
                        ? 'PERINGATAN: Semua skor kuis, skin yang dibeli, dan level akan dikembalikan ke kondisi awal dan tidak dapat dipulihkan.'
                        : 'WARNING: All scores, purchased skins, and badges will be permanently reset to initial boot values.'}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={handleExecuteReset}
                        className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs font-black shadow-lg active:scale-95 transition-all"
                      >
                        {lang === 'id' ? 'YA, HAPUS DAN RESET SEMUA DATA' : 'YES, WIPE AND RESET EVERYTHING'}
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setResetStep(0);
                        }}
                        className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
                      >
                        {lang === 'id' ? 'Batalkan' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. ABOUT & DEVELOPMENT TEAM TAB */}
            {activeTab === 'about' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span>{lang === 'id' ? 'Tentang STEM Nexus' : 'About STEM Nexus'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'id'
                      ? 'Platform Kuis Edukasi Berbasis Gamifikasi Interaktif untuk Pelajar SD dan SMP.'
                      : 'Gamified Interactive STEM Quiz Platform for Elementary and Junior High Students.'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    <strong>STEM Nexus</strong> {lang === 'id'
                      ? 'adalah aplikasi kuis edukasi inovatif yang menggabungkan estetika retro Windows XP / Frutiger Aero dengan mekanika video game interaktif (balap 4-jalur, petualangan Mario 4-blok, basket, sepak bola, dan RPG) untuk membuat pembelajaran Sains, Teknologi, Rekayasa, dan Matematika menjadi sangat seru dan mudah dipahami oleh anak-anak.'
                      : 'is an innovative educational quiz platform fusing retro Windows XP / Frutiger Aero aesthetics with real playable mini-game genres (4-lane racing, 4-block Mario platformer, basketball, soccer, and RPG) to make STEM concepts delightfully accessible for young minds.'}
                  </p>
                </div>

                {/* STEM NEXUS Development Team */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-950 border border-blue-600 rounded-xl p-4 text-white shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-black uppercase tracking-wider text-amber-300">
                      STEM NEXUS Development Team
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-800/40 border border-amber-400/30">
                      <span className="text-amber-300 font-bold">⭐ Leader:</span>
                      <span className="font-extrabold text-white">Derren Oktoviano</span>
                      <span className="text-[10px] text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded font-mono">
                        Leader of the project
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-200">
                      <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/20 flex items-center gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>Muhammad Ahnaf Fayyan Satyawira</span>
                        <span className="text-[9px] text-slate-400">(Member)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/20 flex items-center gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>Khavendra Kenzie</span>
                        <span className="text-[9px] text-slate-400">(Member)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/20 flex items-center gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>Lleyton Firdaus .S</span>
                        <span className="text-[9px] text-slate-400">(Member)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/20 flex items-center gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>Athaya Pradipta Arsineo</span>
                        <span className="text-[9px] text-slate-400">(Member)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="h-10 bg-slate-200 border-t border-slate-300 flex items-center justify-between px-4 text-xs text-slate-600">
          <span className="font-mono text-[11px]">STEM Nexus OS v2.4 (Build 2026.XP)</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1 rounded bg-slate-100 hover:bg-slate-300 border border-slate-400 text-slate-800 font-bold active:scale-95 transition-all"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
