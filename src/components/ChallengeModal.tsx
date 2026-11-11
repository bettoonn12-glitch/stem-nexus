import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
  BookOpen,
  Calculator,
  ArrowRight,
  Gamepad2,
  FlaskConical,
  RotateCcw,
  Minimize2,
  Maximize2,
  Zap,
  Split,
  Clock,
  Shield,
} from 'lucide-react';
import { Challenge, UserAnswerRecord } from '../types';
import { GameResult, GameGenre } from '../types/game';
import { getGameQuestionForChallenge } from '../services/aiGameDirector';
import { ShooterGame } from './minigames/ShooterGame';
import { BasketballGame } from './minigames/BasketballGame';
import { SoccerGame } from './minigames/SoccerGame';
import { RpgGame } from './minigames/RpgGame';
import { AdventureGame } from './minigames/AdventureGame';
import { PuzzleGame } from './minigames/PuzzleGame';
import { RacingGame } from './minigames/RacingGame';
import { ClassicQuizGame } from './minigames/ClassicQuizGame';
import { DesalinationRatioTool } from './interactive/DesalinationRatioTool';
import { BatteryDrainTool } from './interactive/BatteryDrainTool';
import { BiomassGrowthTool } from './interactive/BiomassGrowthTool';
import { GearRatioTool } from './interactive/GearRatioTool';
import { ParallelCircuitTool } from './interactive/ParallelCircuitTool';
import { PhScaleTool } from './interactive/PhScaleTool';
import { CardiacOxygenTool } from './interactive/CardiacOxygenTool';
import { GravityDropTool } from './interactive/GravityDropTool';
import { BinaryRegisterTool } from './interactive/BinaryRegisterTool';
import { LogicGateTool } from './interactive/LogicGateTool';
import { NetworkPipelineTool } from './interactive/NetworkPipelineTool';
import { ParityCheckTool } from './interactive/ParityCheckTool';
import { IntegratedMissionTool } from './interactive/IntegratedMissionTool';
import { sound } from '../utils/audio';
import { PowerUpType, PowerUpInventory, getSavedPowerUps, savePowerUps } from '../types/powerups';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { getChallengeTitle, getChallengeSubtitle, getChallengeQuestion } from '../utils/languageHelpers';

interface Props {
  challenge: Challenge | null;
  onClose: () => void;
  onSubmitAnswer: (challengeId: string, answer: number | string) => void;
  existingRecord?: UserAnswerRecord;
  onNextChallenge?: () => void;
  hasNextChallenge?: boolean;
  lang?: Language;
  genreOverride?: GameGenre;
}

export const ChallengeModal: React.FC<Props> = ({
  challenge,
  onClose,
  onSubmitAnswer,
  existingRecord,
  onNextChallenge,
  hasNextChallenge,
  lang = 'en',
  genreOverride,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [activeMode, setActiveMode] = useState<'minigame' | 'lab'>('minigame');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(true);

  // Power-ups
  const [powerUps, setPowerUps] = useState<PowerUpInventory>(getSavedPowerUps());
  const [activePowerUp, setActivePowerUp] = useState<PowerUpType | null>(null);
  const [powerUpToast, setPowerUpToast] = useState<string | null>(null);

  useEffect(() => {
    if (existingRecord) {
      setInputValue(String(existingRecord.userAnswer));
    } else {
      setInputValue('');
    }
    setInputError(null);
    setActiveMode('minigame');
    setPowerUps(getSavedPowerUps());
    setActivePowerUp(null);
  }, [challenge, existingRecord]);

  if (!challenge) return null;

  const gameQuestion = getGameQuestionForChallenge(challenge.id);

  const handleMiniGameFinish = (result: GameResult) => {
    if (result.isCorrect) {
      onSubmitAnswer(challenge.id, challenge.correctAnswer);
    } else {
      onSubmitAnswer(challenge.id, 'INCORRECT');
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setInputError(lang === 'id' ? 'Silakan masukkan jawaban sebelum mengirim.' : 'Please enter an answer before submitting.');
      return;
    }

    const numericVal = parseFloat(inputValue);
    if (challenge.inputType === 'number' && isNaN(numericVal)) {
      setInputError(lang === 'id' ? 'Harap masukkan nilai numerik yang valid.' : 'Please enter a valid numeric value.');
      return;
    }

    setInputError(null);
    const finalAnswer = challenge.inputType === 'number' ? numericVal : inputValue.trim();
    onSubmitAnswer(challenge.id, finalAnswer);

    let isCorrect = false;
    if (challenge.inputType === 'number') {
      const target = Number(challenge.correctAnswer);
      const tol = challenge.tolerance ?? 0.05;
      isCorrect = Math.abs(numericVal - target) <= tol;
    } else {
      isCorrect = String(finalAnswer).toLowerCase() === String(challenge.correctAnswer).toLowerCase();
    }
    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const subjectLabel =
    challenge.subject === 'math'
      ? 'Mathematics'
      : challenge.subject === 'science'
      ? 'Science'
      : challenge.subject === 'ict'
      ? 'ICT'
      : 'Integrated Mission';

  const subjectBadgeColor =
    challenge.subject === 'math'
      ? 'text-purple-300'
      : challenge.subject === 'science'
      ? 'text-emerald-300'
      : challenge.subject === 'ict'
      ? 'text-cyan-300'
      : 'text-amber-300';

  const renderInteractiveWidget = () => {
    switch (challenge.interactiveWidgetType) {
      case 'desalination-ratio':
        return <DesalinationRatioTool />;
      case 'battery-drain':
        return <BatteryDrainTool />;
      case 'biomass-growth':
        return <BiomassGrowthTool />;
      case 'gear-ratio':
        return <GearRatioTool />;
      case 'parallel-circuit':
        return <ParallelCircuitTool />;
      case 'ph-neutralization':
        return <PhScaleTool />;
      case 'cardiac-oxygen':
        return <CardiacOxygenTool />;
      case 'gravity-drop':
        return <GravityDropTool />;
      case 'binary-register':
        return <BinaryRegisterTool />;
      case 'logic-gates':
        return <LogicGateTool />;
      case 'network-latency':
        return <NetworkPipelineTool />;
      case 'parity-check':
        return <ParityCheckTool />;
      case 'integrated-mission':
        return <IntegratedMissionTool challenge={challenge} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-2 bg-slate-950/90 backdrop-blur-md overflow-y-auto select-none">
      <div
        className={`w-full bg-[#103577] border-2 border-cyan-300 shadow-2xl flex flex-col overflow-hidden transition-all ${
          isFullscreen ? 'h-full rounded-none' : 'max-w-5xl max-h-[94vh] rounded-3xl'
        }`}
      >
        {/* Retro XP Aero Title Bar */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0 font-game">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 text-sm">✦</span>
            <div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className={`font-black ${subjectBadgeColor}`}>{subjectLabel}</span>
                <span className="text-blue-200">·</span>
                <span className="text-white">{challenge.difficulty}</span>
                <span className="text-blue-200">·</span>
                <span className="font-mono text-yellow-300 font-bold">{challenge.points} pts</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white drop-shadow leading-tight">
                {getChallengeTitle(challenge, lang)}
              </h3>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-white border border-white/30 cursor-pointer"
              title={isFullscreen ? 'Restore Window' : 'Maximize'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-500 border border-white text-white flex items-center justify-center text-xs font-bold shadow cursor-pointer active:scale-95"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Switcher Banner: Play Mini-Game vs Lab Simulator + Power-ups */}
        {gameQuestion && (
          <div className="bg-slate-950/95 border-b border-cyan-500/30 px-4 py-2 flex flex-wrap items-center justify-between gap-3 font-game shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveMode('minigame');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'minigame'
                    ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 shadow-md border border-white scale-102'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>🎮 {t.playAsMinigame}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveMode('lab');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'lab'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-blue-950 shadow-md border border-white scale-102'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>🧪 {t.labSimulator}</span>
              </button>
            </div>

            {/* Quizizz Power-ups in minigame mode */}
            {activeMode === 'minigame' && (
              <div className="flex items-center gap-2 bg-blue-950/70 border border-cyan-500/40 rounded-2xl px-3 py-1">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" /> {t.powerupsTitle}:
                </span>
                <button
                  onClick={() => handleUsePowerUp('fifty_fifty')}
                  disabled={powerUps.fifty_fifty <= 0 || activePowerUp === 'fifty_fifty'}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    activePowerUp === 'fifty_fifty'
                      ? 'bg-cyan-500 text-slate-950 border-white'
                      : powerUps.fifty_fifty > 0
                      ? 'bg-slate-900 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50'
                  }`}
                >
                  50:50 ({powerUps.fifty_fifty})
                </button>
                <button
                  onClick={() => handleUsePowerUp('second_chance')}
                  disabled={powerUps.second_chance <= 0 || activePowerUp === 'second_chance'}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    activePowerUp === 'second_chance'
                      ? 'bg-emerald-400 text-slate-950 border-white'
                      : powerUps.second_chance > 0
                      ? 'bg-slate-900 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50'
                  }`}
                >
                  2nd Chance ({powerUps.second_chance})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Power-up Toast */}
        {powerUpToast && (
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4 py-1.5 text-center text-xs font-black font-game shadow-md">
            ✨ {powerUpToast}
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#0e2d63] flex-1">
          {/* Prominent Question Header Banner at Top of Quiz */}
          <div className="w-full bg-gradient-to-r from-blue-950 via-[#133068] to-blue-950 border-2 border-amber-400 rounded-2xl p-4 sm:p-5 shadow-[0_4px_24px_rgba(251,191,36,0.3)] text-white font-game">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black uppercase text-[11px] shadow">
                  {challenge.subject.toUpperCase()} • {challenge.difficulty}
                </span>
                <span className="text-cyan-300 font-bold hidden sm:inline">
                  {getChallengeSubtitle(challenge, lang)}
                </span>
              </div>
              <div className="font-mono text-yellow-300 font-extrabold text-xs bg-black/40 px-2.5 py-0.5 rounded-lg border border-yellow-400/30">
                +{challenge.points} PTS
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                {lang === 'id' ? 'SOAL KUIS / TANTANGAN:' : 'CURRENT QUESTION:'}
              </span>
              <h2 className="text-base sm:text-xl font-black text-white drop-shadow leading-snug">
                {getChallengeQuestion(challenge, lang)}
              </h2>
            </div>
          </div>

          {/* MODE 1: Interactive Playable Mini-Game */}
          {activeMode === 'minigame' && gameQuestion ? (
            <div className="space-y-4">
              {/* Mounted Mini-Game (Selected Genre or Default) */}
              <div className="flex flex-col items-center">
                {(() => {
                  const activeGenre: GameGenre = genreOverride || gameQuestion.genre;
                  const unifiedQuestion = {
                    ...gameQuestion,
                    genre: activeGenre,
                    title: getChallengeTitle(challenge, 'en'),
                    titleId: getChallengeTitle(challenge, 'id'),
                    question: getChallengeQuestion(challenge, 'en'),
                    questionId: getChallengeQuestion(challenge, 'id'),
                  };

                  if (activeGenre === 'racing') {
                    return (
                      <RacingGame
                        key={`racing-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  if (activeGenre === 'adventure') {
                    return (
                      <AdventureGame
                        key={`adventure-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  if (activeGenre === 'rpg') {
                    return (
                      <RpgGame
                        key={`rpg-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  if (activeGenre === 'basketball') {
                    return (
                      <BasketballGame
                        key={`basketball-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  if (activeGenre === 'soccer') {
                    return (
                      <SoccerGame
                        key={`soccer-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  if (activeGenre === 'shooter') {
                    return (
                      <ShooterGame
                        key={`shooter-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  if (activeGenre === 'puzzle') {
                    return (
                      <PuzzleGame
                        key={`puzzle-${challenge.id}`}
                        question={unifiedQuestion}
                        onFinish={handleMiniGameFinish}
                        activePowerUp={activePowerUp}
                        onConsumePowerUp={handleConsumePowerUp}
                        lang={lang}
                      />
                    );
                  }
                  return (
                    <ClassicQuizGame
                      key={`classic-${challenge.id}`}
                      question={unifiedQuestion}
                      onFinish={handleMiniGameFinish}
                      activePowerUp={activePowerUp}
                      onConsumePowerUp={handleConsumePowerUp}
                      lang={lang}
                    />
                  );
                })()}
              </div>
            </div>
          ) : (
            /* MODE 2: Lab Simulator & Manual Input Form */
            <>
              {/* Visual Banner */}
              {challenge.metaImage && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 max-h-48 md:max-h-56">
                  <img
                    src={challenge.metaImage}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
                    <span className="text-xs font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                      Mission Scenario Reconnaissance
                    </span>
                  </div>
                </div>
              )}

              {/* Scenario Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Scenario Briefing
                </h4>
                <div className="text-sm md:text-base text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
                  {challenge.scenario}
                </div>
              </div>

              {/* Interactive Simulation / Exploration Tool */}
              {challenge.interactiveWidgetType && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-bold">
                      <Calculator className="w-4 h-4" />
                      Interactive Scenario Lab
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Manipulate parameters to explore system dynamics
                    </span>
                  </div>
                  {renderInteractiveWidget()}
                </div>
              )}

              {/* Problem Task Card */}
              <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-300">Your Objective:</span>
                  <p className="text-sm md:text-base font-medium text-slate-100">
                    {challenge.question}
                  </p>
                </div>

                {/* Answer Input or Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type={challenge.inputType === 'number' ? 'number' : 'text'}
                        step="any"
                        placeholder={
                          challenge.inputType === 'number'
                            ? `Enter numeric value (${challenge.unit || 'units'})...`
                            : 'Enter textual answer / formula...'
                        }
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                          if (inputError) setInputError(null);
                        }}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-hidden transition-colors"
                      />
                      {challenge.unit && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {challenge.unit}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
                    >
                      <span>{t.submitAnswer}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {inputError && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 p-2.5 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{inputError}</span>
                    </div>
                  )}
                </form>
              </div>
            </>
          )}

          {/* Educational Feedback Section */}
          {existingRecord && (
            <div
              className={`p-5 rounded-2xl border-2 transition-all duration-300 animate-in fade-in-50 ${
                existingRecord.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {existingRecord.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">
                      {existingRecord.isCorrect
                        ? t.challengeSolved
                        : lang === 'id'
                        ? 'Perhitungan Tidak Tepat'
                        : 'Incorrect Calculation Detected'}
                    </h4>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-black/40 border border-white/10">
                      Score: +{existingRecord.scoreAwarded} / {challenge.points}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Your submitted answer:{' '}
                    <strong className="font-mono text-white">{String(existingRecord.userAnswer)}</strong>
                    {challenge.unit && ` ${challenge.unit}`}. Correct reference:{' '}
                    <strong className="font-mono text-cyan-300">{String(challenge.correctAnswer)}</strong>
                    {challenge.unit && ` ${challenge.unit}`}.
                  </p>
                </div>
              </div>

              {/* Step-by-Step Educational Explanation */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                    {t.stepByStepExplanation}
                  </h5>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {challenge.explanation.overview}
                </p>

                {/* Steps */}
                <div className="space-y-3">
                  {challenge.explanation.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-cyan-300">
                        <span>{st.step}</span>
                        <span className="font-mono text-slate-500 text-[11px]">Step {idx + 1}</span>
                      </div>
                      <p className="text-xs text-slate-300">{st.detail}</p>
                      {st.formula && (
                        <div className="pt-1">
                          <code className="text-xs font-mono text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 block">
                            {st.formula}
                          </code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Takeaway & Real world application */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-semibold text-cyan-400 block">{t.corePrinciple}</span>
                    <p className="text-slate-300">{challenge.explanation.keyTakeaway}</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-semibold text-emerald-400 block">{t.realWorldApp}</span>
                    <p className="text-slate-300">{challenge.explanation.realWorldApplication}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex items-center justify-between shrink-0 bg-[#0d1733] font-game">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            {t.backToDashboard}
          </button>

          {hasNextChallenge && onNextChallenge && (
            <button
              type="button"
              onClick={onNextChallenge}
              className="px-5 py-2 text-xs font-bold text-cyan-200 hover:text-white bg-cyan-900/60 hover:bg-cyan-800/80 rounded-lg border border-cyan-700/50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>{t.nextChallenge}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
