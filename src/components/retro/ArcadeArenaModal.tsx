import React, { useState, useEffect, useMemo } from 'react';
import { GameGenre, GameQuestion, GameResult, GradeLevel } from '../../types/game';
import { aiGameDirector } from '../../services/aiGameDirector';
import { getCurriculumThemes } from '../../data/masterQuestionBank';
import { sound } from '../../utils/audio';
import { ShooterGame } from '../minigames/ShooterGame';
import { BasketballGame } from '../minigames/BasketballGame';
import { SoccerGame } from '../minigames/SoccerGame';
import { RpgGame } from '../minigames/RpgGame';
import { AdventureGame } from '../minigames/AdventureGame';
import { PuzzleGame } from '../minigames/PuzzleGame';
import { RacingGame } from '../minigames/RacingGame';
import {
  Gamepad2,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Flame,
  RotateCcw,
  ChevronRight,
  BrainCircuit,
  Award,
  CheckCircle2,
  XCircle,
  Zap,
  Minimize2,
  Maximize2,
  Shield,
  Clock,
  Split,
  HelpCircle,
} from 'lucide-react';
import { PowerUpType, PowerUpInventory, getSavedPowerUps, savePowerUps } from '../../types/powerups';
import { Language, TRANSLATIONS } from '../../utils/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAwardXp?: (xp: number, coins: number) => void;
  initialGenre?: GameGenre;
  lang?: Language;
}

export const ArcadeArenaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAwardXp,
  initialGenre,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedGenreTab, setSelectedGenreTab] = useState<GameGenre | 'ai-director'>('ai-director');
  const [selectedGrade, setSelectedGrade] = useState<'sd' | 'smp' | 'all'>('all');
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [lastResult, setLastResult] = useState<GameResult | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(sound.isMuted());
  const [totalArcadeScore, setTotalArcadeScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);

  // Power-ups state
  const [powerUps, setPowerUps] = useState<PowerUpInventory>(getSavedPowerUps());
  const [activePowerUp, setActivePowerUp] = useState<PowerUpType | null>(null);
  const [powerUpToast, setPowerUpToast] = useState<string | null>(null);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(true);

  // 7 Playable Genres (rhythm & platformer removed as requested)
  const GENRES: { id: GameGenre | 'ai-director'; label: string; icon: string }[] = [
    { id: 'ai-director', label: 'AI Director', icon: '🤖' },
    { id: 'racing', label: t.racing, icon: '🏎️' },
    { id: 'adventure', label: t.adventure, icon: '🏃' },
    { id: 'rpg', label: t.rpg, icon: '⚔️' },
    { id: 'basketball', label: t.basketball, icon: '🏀' },
    { id: 'soccer', label: t.soccer, icon: '⚽' },
    { id: 'shooter', label: t.shooter, icon: '🎯' },
    { id: 'puzzle', label: t.puzzle, icon: '🧩' },
  ];

  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const availableThemes = useMemo(() => {
    const effectiveGrade: GradeLevel = selectedGrade === 'smp' ? 'smp-1' : selectedGrade === 'sd' ? 'sd-5' : 'sd-5';
    return getCurriculumThemes(effectiveGrade);
  }, [selectedGrade]);

  // Load next question with strict topic and grade filtering
  const loadQuestion = (
    genreMode: GameGenre | 'ai-director',
    gradeLevel?: 'sd' | 'smp' | 'all',
    topicOverride?: string
  ) => {
    setLastResult(null);
    setActivePowerUp(null);
    const activeGrade = gradeLevel || selectedGrade;
    const topicToUse = topicOverride !== undefined ? topicOverride : selectedTopic;
    const resolvedGenre = genreMode === 'ai-director' ? 'racing' : genreMode;
    const question = aiGameDirector.getQuestionForGenre(
      resolvedGenre,
      undefined,
      activeGrade,
      topicToUse || undefined
    );
    setCurrentQuestion(question);
  };

  const handleSelectGrade = (grade: 'sd' | 'smp' | 'all') => {
    sound.playClick();
    setSelectedGrade(grade);
    aiGameDirector.setGradeLevel(grade);
    setSelectedTopic('');
    loadQuestion(selectedGenreTab, grade, '');
  };

  const handleSelectTopic = (topic: string) => {
    sound.playClick();
    setSelectedTopic(topic);
    aiGameDirector.setActiveTopic(topic);
    loadQuestion(selectedGenreTab, selectedGrade, topic);
  };

  useEffect(() => {
    if (isOpen) {
      const mode = initialGenre || 'ai-director';
      setSelectedGenreTab(mode);
      loadQuestion(mode, selectedGrade, selectedTopic);
      setPowerUps(getSavedPowerUps());
    }
  }, [isOpen, initialGenre]);

  const handleSelectTab = (tabId: GameGenre | 'ai-director') => {
    sound.playClick();
    setSelectedGenreTab(tabId);
    loadQuestion(tabId, selectedGrade, selectedTopic);
  };

  const handleGameFinish = (result: GameResult) => {
    setLastResult(result);
    setGamesPlayed((prev) => prev + 1);

    aiGameDirector.recordPerformance(result.isCorrect, result.timeTakenSec);

    if (result.isCorrect) {
      setStreak((prev) => prev + 1);
      setTotalArcadeScore((prev) => prev + result.scoreAwarded);
      if (onAwardXp) {
        onAwardXp(result.scoreAwarded, Math.round(result.scoreAwarded * 0.4));
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextChallenge = () => {
    sound.playClick();
    // Maintain active topic and grade strictly!
    loadQuestion(selectedGenreTab, selectedGrade, selectedTopic);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
  };

  // Power-up activation
  const handleUsePowerUp = (type: PowerUpType) => {
    if (powerUps[type] <= 0 || activePowerUp === type) return;

    sound.playSuccess();
    const updated = { ...powerUps, [type]: powerUps[type] - 1 };
    setPowerUps(updated);
    savePowerUps(updated);
    setActivePowerUp(type);

    const label =
      type === 'fifty_fifty'
        ? t.powerupFiftyFifty
        : type === 'extra_time'
        ? t.powerupExtraTime
        : t.powerupSecondChance;

    setPowerUpToast(`${label} ${lang === 'id' ? 'Aktif!' : 'Activated!'}`);
    setTimeout(() => setPowerUpToast(null), 2500);
  };

  const handleConsumePowerUp = (type: PowerUpType) => {
    setActivePowerUp(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-2 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div
        className={`w-full bg-[#0a1636] border-2 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.4)] flex flex-col transition-all overflow-hidden ${
          isFullscreen ? 'h-full rounded-none' : 'max-w-6xl max-h-[94vh] rounded-3xl'
        }`}
      >
        {/* Retro Windows XP / Aero Glass Title Bar */}
        <div className="bg-gradient-to-r from-[#0d3b8f] via-[#1d60ce] to-[#0284c7] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#60a5fa] text-white shrink-0 font-game">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center shadow">
              <Gamepad2 className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="text-sm font-black tracking-wider flex items-center gap-2">
                <span>STEM NEXUS ARCADE ENGINE</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full shadow">
                  AI DIRECTOR ACTIVE
                </span>
              </div>
              <div className="text-[11px] text-cyan-200 flex items-center gap-2 font-mono">
                <span>Difficulty: <strong className="text-white uppercase">{aiGameDirector.getDifficulty()}</strong></span>
                <span>•</span>
                <span>Streak: <strong className="text-amber-300">{streak} 🔥</strong></span>
                <span>•</span>
                <span>Arcade XP: <strong className="text-emerald-300">+{totalArcadeScore}</strong></span>
              </div>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/20 cursor-pointer"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/20 cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
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
        </div>

        {/* Grade-Level Selector Bar (SD Grade 1-6 & SMP Grade 7-9) */}
        <div className="bg-[#0b1c44] border-b border-cyan-500/20 px-3 py-1.5 flex items-center justify-between gap-2 shrink-0 font-game text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-cyan-300 font-bold flex items-center gap-1">
              <span>🎓 {lang === 'id' ? 'Tingkat Sekolah:' : 'Grade Level:'}</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-xl border border-blue-400/30">
              <button
                type="button"
                onClick={() => handleSelectGrade('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedGrade === 'all'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lang === 'id' ? 'Semua (SD & SMP)' : 'All (SD & SMP)'}
              </button>
              <button
                type="button"
                onClick={() => handleSelectGrade('sd')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedGrade === 'sd'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                SD (Kelas 1 - 6)
              </button>
              <button
                type="button"
                onClick={() => handleSelectGrade('smp')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedGrade === 'smp'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                SMP (Kelas 7 - 9)
              </button>
            </div>
          </div>

        </div>

        {/* Topic / Theme Selection Strip */}
        <div className="bg-[#081533] border-b border-cyan-500/20 px-3 py-1.5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 font-game text-xs">
          <span className="text-[11px] text-amber-300 font-bold shrink-0">
            📌 {lang === 'id' ? 'Topik Kurikulum:' : 'Curriculum Topic:'}
          </span>
          <button
            type="button"
            onClick={() => handleSelectTopic('')}
            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedTopic === ''
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {lang === 'id' ? 'Semua Topik' : 'All Topics'}
          </button>
          {availableThemes.map((th) => (
            <button
              key={`${th.subject}-${th.theme}`}
              type="button"
              onClick={() => handleSelectTopic(th.theme)}
              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTopic === th.theme
                  ? 'bg-cyan-400 text-slate-950 font-black shadow'
                  : 'bg-slate-900/80 text-cyan-200/90 hover:text-white border border-cyan-800/40'
              }`}
            >
              {th.theme}
            </button>
          ))}
        </div>

        {/* Top Control Strip: Genre Selector & Quizizz Power-ups Dock */}
        <div className="bg-slate-950/95 border-b border-cyan-500/30 px-3 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Genre Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {GENRES.map((g) => {
              const isTabActive = selectedGenreTab === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => handleSelectTab(g.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black font-game flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isTabActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg border border-cyan-300 scale-102'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{g.icon}</span>
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quizizz-Inspired Power-Up Dock */}
          <div className="flex items-center gap-2 bg-blue-950/70 border border-cyan-500/40 rounded-2xl px-3 py-1 font-game">
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> {t.powerupsTitle}:
            </span>

            {/* 50:50 */}
            <button
              onClick={() => handleUsePowerUp('fifty_fifty')}
              disabled={powerUps.fifty_fifty <= 0 || activePowerUp === 'fifty_fifty'}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                activePowerUp === 'fifty_fifty'
                  ? 'bg-cyan-500 text-slate-950 border-white shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                  : powerUps.fifty_fifty > 0
                  ? 'bg-slate-900 hover:bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
              }`}
              title="Eliminate two incorrect answer choices"
            >
              <Split className="w-3.5 h-3.5" />
              <span>50:50</span>
              <span className="ml-0.5 px-1 bg-black/40 rounded text-[9px] font-mono">
                {powerUps.fifty_fifty}
              </span>
            </button>

            {/* Extra Time */}
            <button
              onClick={() => handleUsePowerUp('extra_time')}
              disabled={powerUps.extra_time <= 0 || activePowerUp === 'extra_time'}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                activePowerUp === 'extra_time'
                  ? 'bg-amber-400 text-slate-950 border-white shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                  : powerUps.extra_time > 0
                  ? 'bg-slate-900 hover:bg-amber-950/60 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
              }`}
              title="Add bonus time to solve"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>+30s</span>
              <span className="ml-0.5 px-1 bg-black/40 rounded text-[9px] font-mono">
                {powerUps.extra_time}
              </span>
            </button>

            {/* Second Chance */}
            <button
              onClick={() => handleUsePowerUp('second_chance')}
              disabled={powerUps.second_chance <= 0 || activePowerUp === 'second_chance'}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                activePowerUp === 'second_chance'
                  ? 'bg-emerald-400 text-slate-950 border-white shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                  : powerUps.second_chance > 0
                  ? 'bg-slate-900 hover:bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
              }`}
              title="Get a second chance if your first answer is wrong"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>2nd Chance</span>
              <span className="ml-0.5 px-1 bg-black/40 rounded text-[9px] font-mono">
                {powerUps.second_chance}
              </span>
            </button>
          </div>
        </div>

        {/* Power-up Activation Toast */}
        {powerUpToast && (
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4 py-1.5 text-center text-xs font-black font-game shadow-md animate-in slide-in-from-top duration-150">
            ✨ {powerUpToast}
          </div>
        )}

        {/* Main Game Stage Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gradient-to-b from-slate-950 via-[#0a1636] to-[#050b1f] flex flex-col items-center justify-center">
          {currentQuestion ? (
            <div className="w-full max-w-3xl flex flex-col items-center">
              {/* Question Statement Banner */}
              <div className="w-full bg-blue-950/70 border border-cyan-500/30 rounded-2xl p-4 mb-3 shadow-xl text-white font-game">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                  <span className="uppercase font-bold tracking-wider">
                    {currentQuestion.subject.toUpperCase()} • {currentQuestion.difficulty} LEVEL
                  </span>
                  <span className="text-amber-400 font-bold">REWARD: +{currentQuestion.points} XP</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-100 mb-1">
                  {currentQuestion.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">{currentQuestion.question}</p>
              </div>

              {/* Render Respective Mini-Game */}
              {currentQuestion.genre === 'racing' && (
                <RacingGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
              {currentQuestion.genre === 'adventure' && (
                <AdventureGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
              {currentQuestion.genre === 'rpg' && (
                <RpgGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
              {currentQuestion.genre === 'basketball' && (
                <BasketballGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
              {currentQuestion.genre === 'soccer' && (
                <SoccerGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
              {currentQuestion.genre === 'shooter' && (
                <ShooterGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
              {currentQuestion.genre === 'puzzle' && (
                <PuzzleGame
                  question={currentQuestion}
                  onFinish={handleGameFinish}
                  activePowerUp={activePowerUp}
                  onConsumePowerUp={handleConsumePowerUp}
                  lang={lang}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-mono">
              Loading AI Director Game Engine...
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="bg-slate-950 border-t border-cyan-500/30 px-5 py-3 flex items-center justify-between text-xs text-slate-400 shrink-0 font-game">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>AI Director: <strong>Adaptive Real-time Engine</strong></span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">
              {lang === 'id' ? 'Tantangan sesi ini: ' : 'Games cleared this session: '}
              <strong className="text-slate-200">{gamesPlayed}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNextChallenge}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg flex items-center gap-1.5 active:scale-95 cursor-pointer border border-blue-400/40"
            >
              <span>{t.nextChallenge}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
