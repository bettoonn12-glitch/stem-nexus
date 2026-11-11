export type Language = 'en' | 'id';

export interface Translations {
  // System & Boot
  startingWindows: string;
  stemNexusOs: string;
  lockScreenTime: string;
  signIn: string;
  signingIn: string;
  welcomeBack: string;
  powerOff: string;
  restart: string;

  // Navigation
  home: string;
  quiz: string;
  learn: string;
  lab: string;
  projects: string;
  achievements: string;
  leaderboard: string;
  settings: string;
  characterStudio: string;

  // Header & Profile
  level: string;
  rank: string;
  xp: string;
  coins: string;
  gems: string;
  dailyMissions: string;
  yourProgress: string;
  totalXp: string;
  language: string;

  // Dashboard & CTA
  welcomeTitle: string;
  welcomeTagline: string;
  welcomeSub: string;
  startChallenge: string;
  aiArcadeMode: string;
  playableGenres: string;
  tapToPlay: string;
  openFullArcade: string;
  continueLearning: string;
  currentEvent: string;
  standardChallenges: string;

  // Minigame Genres
  shooter: string;
  basketball: string;
  soccer: string;
  rpg: string;
  adventure: string;
  puzzle: string;
  racing: string;

  // Power-Ups
  powerupsTitle: string;
  powerupFiftyFifty: string;
  powerupExtraTime: string;
  powerupSecondChance: string;
  powerupRemaining: string;

  // Gameplay actions
  submitAnswer: string;
  nextChallenge: string;
  backToDashboard: string;
  playAsMinigame: string;
  labSimulator: string;
  challengeSolved: string;
  stepByStepExplanation: string;
  corePrinciple: string;
  realWorldApp: string;
  howToPlay: string;
  dragToShootHint: string;
  tapAnswerHint: string;
  fullStopHint: string;
  jumpBlockHint: string;
  creatureBattleHint: string;

  // Customization
  customizeTitle: string;
  customizeSub: string;
  headwear: string;
  shirts: string;
  pants: string;
  shoes: string;
  accessories: string;
  saveAppearance: string;
  characterSaved: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    startingWindows: 'Starting STEM Nexus Windows...',
    stemNexusOs: 'STEM Nexus Arcade Edition',
    lockScreenTime: 'Sunday, November 10',
    signIn: 'Sign In',
    signingIn: 'Starting Desktop...',
    welcomeBack: 'Welcome back, Cadet!',
    powerOff: 'Shut Down',
    restart: 'Restart',

    home: 'Home',
    quiz: 'Quiz',
    learn: 'Learn',
    lab: 'Lab',
    projects: 'Projects',
    achievements: 'Achievements',
    leaderboard: 'Leaderboard',
    settings: 'Settings',
    characterStudio: 'Character Studio',

    level: 'Lv.',
    rank: 'STEM Rank',
    xp: 'XP',
    coins: 'Coins',
    gems: 'Gems',
    dailyMissions: 'Daily Missions',
    yourProgress: 'Your Progress',
    totalXp: 'Total XP',
    language: 'Language',

    welcomeTitle: 'Welcome to STEM Nexus!',
    welcomeTagline: 'Learn · Quiz · Build · Discover',
    welcomeSub: 'Interactive real-world challenges combining Math calculations, Science laws & ICT logic.',
    startChallenge: 'Start Challenge',
    aiArcadeMode: 'AI Game Arcade',
    playableGenres: 'PLAYABLE MINI-GAME GENRES',
    tapToPlay: '(Tap any genre to play immediately!)',
    openFullArcade: 'Open Full Arcade',
    continueLearning: 'Continue Learning',
    currentEvent: 'Current Event',
    standardChallenges: 'Standard Challenges',

    shooter: 'Shooter',
    basketball: 'Basketball',
    soccer: 'Soccer',
    rpg: 'RPG Battle',
    adventure: 'Platformer',
    puzzle: 'Puzzle',
    racing: 'Turbo Racing',

    powerupsTitle: 'QUIZ POWER-UPS',
    powerupFiftyFifty: '50:50 Split',
    powerupExtraTime: '+30s Extra Time',
    powerupSecondChance: 'Second Chance',
    powerupRemaining: 'Remaining',

    submitAnswer: 'Submit Answer',
    nextChallenge: 'Next Challenge',
    backToDashboard: 'Back to Dashboard',
    playAsMinigame: 'Play as Interactive Mini-Game',
    labSimulator: 'Lab Simulator & Calculation',
    challengeSolved: 'Challenge Solved! Correct Solution Verified.',
    stepByStepExplanation: 'Step-by-Step Derivation & Explanation:',
    corePrinciple: 'Core Principle Takeaway',
    realWorldApp: 'Real-World Application',
    howToPlay: 'HOW TO PLAY',
    dragToShootHint: 'Click or touch and drag backwards to aim, then release to shoot toward the target!',
    tapAnswerHint: 'Select the correct answer to accelerate!',
    fullStopHint: 'Braking complete. Answer to restart your engine with Nitro Boost!',
    jumpBlockHint: 'Run and jump beneath floating [?] Question Blocks to reveal questions & release coins!',
    creatureBattleHint: 'Select the formula attack to damage the enemy creature!',

    customizeTitle: 'Cadet Character Customization Studio',
    customizeSub: 'Personalize your in-game pixel avatar, outfits, accessories and battle stance.',
    headwear: 'Headwear',
    shirts: 'Shirts & Jackets',
    pants: 'Pants',
    shoes: 'Shoes',
    accessories: 'Accessories',
    saveAppearance: 'Save Appearance',
    characterSaved: 'Appearance updated successfully!',
  },
  id: {
    startingWindows: 'Memulai STEM Nexus Windows...',
    stemNexusOs: 'STEM Nexus Edisi Arcade',
    lockScreenTime: 'Minggu, 10 November',
    signIn: 'Masuk (Sign In)',
    signingIn: 'Membuka Desktop...',
    welcomeBack: 'Selamat datang kembali, Kadet!',
    powerOff: 'Matikan',
    restart: 'Mulai Ulang',

    home: 'Beranda',
    quiz: 'Kuis',
    learn: 'Belajar',
    lab: 'Laboratorium',
    projects: 'Proyek',
    achievements: 'Prestasi',
    leaderboard: 'Peringkat',
    settings: 'Pengaturan',
    characterStudio: 'Studio Karakter',

    level: 'Lvl.',
    rank: 'Peringkat STEM',
    xp: 'XP',
    coins: 'Koin',
    gems: 'Permata',
    dailyMissions: 'Misi Harian',
    yourProgress: 'Kemajuan Anda',
    totalXp: 'Total XP',
    language: 'Bahasa',

    welcomeTitle: 'Selamat Datang di STEM Nexus!',
    welcomeTagline: 'Belajar · Kuis · Bangun · Jelajahi',
    welcomeSub: 'Tantangan nyata interaktif menggabungkan perhitungan Matematika, hukum Sains & logika TIK.',
    startChallenge: 'Mulai Tantangan',
    aiArcadeMode: 'Arcade Game AI',
    playableGenres: 'GENRE MINI-GAME INTERAKTIF',
    tapToPlay: '(Ketuk genre apa saja untuk langsung bermain!)',
    openFullArcade: 'Buka Semua Arcade',
    continueLearning: 'Lanjutkan Belajar',
    currentEvent: 'Acara Terkini',
    standardChallenges: 'Tantangan Standar',

    shooter: 'Penembak',
    basketball: 'Bola Basket',
    soccer: 'Sepak Bola',
    rpg: 'Pertarungan RPG',
    adventure: 'Petualangan Platformer',
    puzzle: 'Teka-Teki Logika',
    racing: 'Balapan Turbo',

    powerupsTitle: 'POWER-UP KUIS',
    powerupFiftyFifty: 'Pilihan 50:50',
    powerupExtraTime: '+30d Waktu Tambahan',
    powerupSecondChance: 'Kesempatan Kedua',
    powerupRemaining: 'Tersisa',

    submitAnswer: 'Kirim Jawaban',
    nextChallenge: 'Tantangan Berikutnya',
    backToDashboard: 'Kembali ke Beranda',
    playAsMinigame: 'Mainkan sebagai Mini-Game Interaktif',
    labSimulator: 'Simulator Lab & Perhitungan',
    challengeSolved: 'Tantangan Selesai! Solusi Benar Terverifikasi.',
    stepByStepExplanation: 'Penjelasan & Penurunan Langkah Demi Langkah:',
    corePrinciple: 'Prinsip Inti Sains',
    realWorldApp: 'Penerapan di Dunia Nyata',
    howToPlay: 'CARA BERMAIN',
    dragToShootHint: 'Klik atau sentuh lalu tarik ke belakang untuk mengarahkan, lalu lepas untuk menembak!',
    tapAnswerHint: 'Pilih jawaban yang benar untuk berakselerasi!',
    fullStopHint: 'Pengereman selesai. Jawab pertanyaan untuk menyalakan mesin dengan Dorongan Nitro!',
    jumpBlockHint: 'Lari dan lompat di bawah Balok [?] untuk memunculkan soal dan koin emas!',
    creatureBattleHint: 'Pilih serangan rumus untuk menyerang monster lawan!',

    customizeTitle: 'Studio Kustomisasi Karakter Kadet',
    customizeSub: 'Sesuaikan avatar piksel, pakaian, aksesori, dan gaya tempur karakter Anda.',
    headwear: 'Topi & Helm',
    shirts: 'Baju & Jaket',
    pants: 'Celana',
    shoes: 'Sepatu',
    accessories: 'Aksesori',
    saveAppearance: 'Simpan Penampilan',
    characterSaved: 'Penampilan berhasil diperbarui!',
  },
};

const LANG_STORAGE_KEY = 'stem_nexus_language';

export function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // fallback
  }
  return 'en';
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // fallback
  }
}
