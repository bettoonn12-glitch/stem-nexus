export interface CharacterCustomization {
  baseStyle: 'cadet' | 'scout' | 'cyborg';
  headwear: string;
  shirt: string;
  pants: string;
  shoes: string;
  accessory: string;
  primaryColor: string;
  accentColor: string;
}

export interface CosmeticItem {
  id: string;
  name: string;
  nameId: string; // Indonesian name
  category: 'headwear' | 'shirt' | 'pants' | 'shoes' | 'accessory';
  icon: string;
  color: string;
  unlockedByDefault: boolean;
  requiredXp?: number;
}

export const COSMETICS_CATALOG: CosmeticItem[] = [
  // Headwear
  { id: 'head_none', name: 'Standard Hair', nameId: 'Rambut Standar', category: 'headwear', icon: '🧑‍🚀', color: '#38bdf8', unlockedByDefault: true },
  { id: 'head_helmet', name: 'Orbital Visor Helmet', nameId: 'Helm Visor Orbital', category: 'headwear', icon: '🪖', color: '#06b6d4', unlockedByDefault: true },
  { id: 'head_cap', name: 'Cadet Baseball Cap', nameId: 'Topi Kadet', category: 'headwear', icon: '🧢', color: '#f59e0b', unlockedByDefault: true },
  { id: 'head_goggles', name: 'Aviator Cyber Goggles', nameId: 'Kacamata Siber Aviator', category: 'headwear', icon: '🥽', color: '#10b981', unlockedByDefault: false, requiredXp: 500 },
  { id: 'head_crown', name: 'Quantum Master Crown', nameId: 'Mahkota Master Kuantum', category: 'headwear', icon: '👑', color: '#eab308', unlockedByDefault: false, requiredXp: 2000 },

  // Shirts & Jackets
  { id: 'shirt_cadet', name: 'Blue Nexus Jumpsuit', nameId: 'Baju Terusan Nexus Biru', category: 'shirt', icon: '🥋', color: '#2563eb', unlockedByDefault: true },
  { id: 'shirt_pilot', name: 'Crimson Flight Jacket', nameId: 'Jaket Terbang Merah', category: 'shirt', icon: '🧥', color: '#dc2626', unlockedByDefault: true },
  { id: 'shirt_lab', name: 'White Scientist Coat', nameId: 'Jas Laboratorium Putih', category: 'shirt', icon: '🥼', color: '#f8fafc', unlockedByDefault: true },
  { id: 'shirt_cyber', name: 'Neon Cyberpunk Vest', nameId: 'Rompi Siber Neon', category: 'shirt', icon: '🦺', color: '#8b5cf6', unlockedByDefault: false, requiredXp: 800 },

  // Pants
  { id: 'pants_navy', name: 'Fleet Tactical Pants', nameId: 'Celana Taktis Armada', category: 'pants', icon: '👖', color: '#1e3a8a', unlockedByDefault: true },
  { id: 'pants_cargo', name: 'Desert Cargo Khakis', nameId: 'Celana Kargo Khaki', category: 'pants', icon: '🩳', color: '#d97706', unlockedByDefault: true },
  { id: 'pants_dark', name: 'Stealth Black Slacks', nameId: 'Celana Hitam Siluman', category: 'pants', icon: '👖', color: '#0f172a', unlockedByDefault: true },

  // Shoes
  { id: 'shoes_boots', name: 'Magnetic Grip Boots', nameId: 'Sepatu Bot Cengkeram Magnetik', category: 'shoes', icon: '🥾', color: '#475569', unlockedByDefault: true },
  { id: 'shoes_runners', name: 'Zero-G Cyber Sneakers', nameId: 'Sepatu Kets Nol Gravitasi', category: 'shoes', icon: '👟', color: '#06b6d4', unlockedByDefault: true },
  { id: 'shoes_gold', name: 'Golden Velocity Cleats', nameId: 'Sepatu Emas Kecepatan', category: 'shoes', icon: '✨', color: '#eab308', unlockedByDefault: false, requiredXp: 1200 },

  // Accessories
  { id: 'acc_none', name: 'No Accessory', nameId: 'Tanpa Aksesori', category: 'accessory', icon: '➖', color: '#64748b', unlockedByDefault: true },
  { id: 'acc_cape', name: 'Plasma Energy Cape', nameId: 'Jubah Energi Plasma', category: 'accessory', icon: '🧣', color: '#ec4899', unlockedByDefault: true },
  { id: 'acc_drone', name: 'Companion Micro-Drone', nameId: 'Mikro Drone Pendamping', category: 'accessory', icon: '🛸', color: '#3b82f6', unlockedByDefault: false, requiredXp: 1000 },
  { id: 'acc_holobadge', name: 'Grand Scholar Insignia', nameId: 'Lencana Cendekiawan Agung', category: 'accessory', icon: '🎖️', color: '#f59e0b', unlockedByDefault: false, requiredXp: 1500 },
];

export interface CharacterSkin {
  id: string;
  name: string;
  nameId: string;
  avatarIcon: string;
  baseStyle: 'cadet' | 'scout' | 'cyborg';
  primaryColor: string;
  accentColor: string;
  priceCoins: number;
  priceGems: number;
  description: string;
  descriptionId: string;
}

export const CHARACTER_SKINS: CharacterSkin[] = [
  {
    id: 'skin_default',
    name: 'Blue Nexus Cadet',
    nameId: 'Kadet Nexus Biru',
    avatarIcon: '🧑‍🚀',
    baseStyle: 'cadet',
    primaryColor: '#3b82f6',
    accentColor: '#06b6d4',
    priceCoins: 0,
    priceGems: 0,
    description: 'Standard issue flight uniform for STEM cadets.',
    descriptionId: 'Seragam standar penerbangan resmi kadet STEM.',
  },
  {
    id: 'skin_scout',
    name: 'Solar Ranger Scout',
    nameId: 'Pramuka Penjelajah Surya',
    avatarIcon: '🧝',
    baseStyle: 'scout',
    primaryColor: '#10b981',
    accentColor: '#f59e0b',
    priceCoins: 400,
    priceGems: 50,
    description: 'Agile field explorer equipped for botanical & wilderness research.',
    descriptionId: 'Penjelajah lapangan lincah untuk riset botani dan alam liar.',
  },
  {
    id: 'skin_cyborg',
    name: 'Quantum Cyber Droid',
    nameId: 'Droid Siber Kuantum',
    avatarIcon: '🤖',
    baseStyle: 'cyborg',
    primaryColor: '#8b5cf6',
    accentColor: '#ec4899',
    priceCoins: 750,
    priceGems: 100,
    description: 'Advanced computation android powered by antimatter core.',
    descriptionId: 'Android komputasi canggih bertenaga inti antimateri.',
  },
  {
    id: 'skin_cosmic',
    name: 'Galaxy Astro Captain',
    nameId: 'Kapten Astro Galaksi',
    avatarIcon: '👨‍🚀',
    baseStyle: 'cadet',
    primaryColor: '#f59e0b',
    accentColor: '#ef4444',
    priceCoins: 1200,
    priceGems: 150,
    description: 'Elite starship pilot with deep space survival certifications.',
    descriptionId: 'Pilot kapal bintang elit dengan sertifikasi penjelajah luar angkasa.',
  },
  {
    id: 'skin_master',
    name: 'Golden Scholar Master',
    nameId: 'Master Cendekiawan Emas',
    avatarIcon: '👑',
    baseStyle: 'scout',
    primaryColor: '#eab308',
    accentColor: '#ffffff',
    priceCoins: 2000,
    priceGems: 250,
    description: 'Prestigious golden armor awarded to the top STEM students.',
    descriptionId: 'Zirah emas bergengsi untuk siswa berprestasi tertinggi di STEM.',
  },
];

export const DEFAULT_CHARACTER: CharacterCustomization = {
  baseStyle: 'cadet',
  headwear: 'head_none',
  shirt: 'shirt_cadet',
  pants: 'pants_navy',
  shoes: 'shoes_runners',
  accessory: 'acc_none',
  primaryColor: '#3b82f6',
  accentColor: '#06b6d4',
};

const CHARACTER_KEY = 'stem_nexus_custom_character';
const UNLOCKED_SKINS_KEY = 'stem_nexus_unlocked_skins_v1';

export function getSavedCharacter(): CharacterCustomization {
  try {
    const raw = localStorage.getItem(CHARACTER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return DEFAULT_CHARACTER;
}

export function saveCharacter(char: CharacterCustomization): void {
  try {
    localStorage.setItem(CHARACTER_KEY, JSON.stringify(char));
  } catch {
    // fallback
  }
}

export function getUnlockedSkinIds(): string[] {
  try {
    const raw = localStorage.getItem(UNLOCKED_SKINS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return ['skin_default'];
}

export function unlockSkinId(skinId: string): string[] {
  try {
    const current = getUnlockedSkinIds();
    if (!current.includes(skinId)) {
      const updated = [...current, skinId];
      localStorage.setItem(UNLOCKED_SKINS_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch {
    return ['skin_default'];
  }
}

