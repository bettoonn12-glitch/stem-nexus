/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { CHALLENGES } from './data/challenges';
import { Challenge, SubjectScoreBreakdown, SubjectType, UserAnswerRecord } from './types';
import { DesktopBackground } from './components/retro/DesktopBackground';
import { RetroHeader } from './components/retro/RetroHeader';
import { RetroSidebar, NavTab } from './components/retro/RetroSidebar';
import { RetroDashboard } from './components/retro/RetroDashboard';
import { RetroRightSidebar } from './components/retro/RetroRightSidebar';
import { RetroTaskbar } from './components/retro/RetroTaskbar';
import { RetroStartMenu } from './components/retro/RetroStartMenu';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengeModal } from './components/ChallengeModal';
import { ResultsModal } from './components/ResultsModal';
import { ReferenceViewerModal } from './components/retro/ReferenceViewerModal';
import { NotificationsModal } from './components/retro/NotificationsModal';
import { PlayerProfileModal } from './components/retro/PlayerProfileModal';
import { AchievementsModal } from './components/retro/AchievementsModal';
import { LeaderboardModal } from './components/retro/LeaderboardModal';
import { LearningLibraryModal } from './components/retro/LearningLibraryModal';
import { ArcadeArenaModal } from './components/retro/ArcadeArenaModal';
import { BootScreen } from './components/retro/BootScreen';
import { LockScreen } from './components/retro/LockScreen';
import { CharacterCustomizationModal } from './components/retro/CharacterCustomizationModal';
import { CreditsModal } from './components/retro/CreditsModal';
import { SettingsAppModal } from './components/retro/SettingsAppModal';
import { QuizGenreSelectModal } from './components/retro/QuizGenreSelectModal';
import { GameGenre, GradeLevel } from './types/game';
import { sound } from './utils/audio';
import { Language, getInitialLanguage, saveLanguage, TRANSLATIONS } from './utils/i18n';
import { CharacterCustomization, getSavedCharacter, saveCharacter } from './types/character';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { CalculatorAppModal } from './components/apps/CalculatorAppModal';
import { MusicAppModal } from './components/apps/MusicAppModal';
import { NotepadAppModal } from './components/apps/NotepadAppModal';
import { ClockAppModal } from './components/apps/ClockAppModal';
import { PaintAppModal } from './components/apps/PaintAppModal';
import { PowerDialogModal } from './components/retro/PowerDialogModal';
import { quizSession, QuizSessionState } from './services/quizSession';
import { getCurriculumThemes, GRADE_LEVEL_NAMES } from './data/masterQuestionBank';
import { aiGameDirector } from './services/aiGameDirector';


const STORAGE_KEY = 'stem_nexus_user_records_v1';
const PROFILE_KEY = 'stem_nexus_player_profile_v1';
const GRADE_KEY = 'stem_nexus_grade_level_v1';

export default function App() {
  // OS Boot & Lock states: 'boot' | 'lock' | 'desktop'
  const [osState, setOsState] = useState<'boot' | 'lock' | 'desktop'>('boot');

  // Language state: 'en' | 'id'
  const [lang, setLang] = useState<Language>(getInitialLanguage());
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Grade level selection (SD 1-6 & SMP 1-3)
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>(() => {
    try {
      const saved = localStorage.getItem(GRADE_KEY);
      if (saved) return saved as GradeLevel;
    } catch {
      // fallback
    }
    return 'sd-5';
  });

  // Cadet Character Customization
  const [character, setCharacter] = useState<CharacterCustomization>(getSavedCharacter());
  const [activeSkinId, setActiveSkinId] = useState<string>('skin_default');
  const [isCharacterStudioOpen, setIsCharacterStudioOpen] = useState<boolean>(false);

  // System Settings: Brightness (0.5 to 1.5), UI Scale (0.8 to 1.2), Master Volume (0.0 to 1.0)
  const [brightness, setBrightness] = useState<number>(1.0);
  const [uiScale, setUiScale] = useState<number>(1.0);
  const [masterVolume, setMasterVolume] = useState<number>(0.8);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Pre-Quiz Genre Select Modal
  const [isGenreSelectOpen, setIsGenreSelectOpen] = useState<boolean>(false);
  const [selectedQuizGenre, setSelectedQuizGenre] = useState<GameGenre>('racing');
  const [pendingChallengeId, setPendingChallengeId] = useState<string | null>(null);

  const [records, setRecords] = useState<Record<string, UserAnswerRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const [playerName, setPlayerName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return saved;
    } catch {
      // fallback
    }
    return 'Player_01';
  });

  const [coins, setCoins] = useState<number>(7540);
  const [gems, setGems] = useState<number>(320);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectType | 'all'>('all');

  // Modals state
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [isResultsOpen, setIsResultsOpen] = useState<boolean>(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);
  const [isRefViewerOpen, setIsRefViewerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isLearnOpen, setIsLearnOpen] = useState<boolean>(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState<boolean>(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [arcadeInitialGenre, setArcadeInitialGenre] = useState<GameGenre | undefined>(undefined);
  // Mini-Apps and Power Dialog states
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isMusicOpen, setIsMusicOpen] = useState<boolean>(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);
  const [isClockOpen, setIsClockOpen] = useState<boolean>(false);
  const [isPaintOpen, setIsPaintOpen] = useState<boolean>(false);
  const [isPowerDialogOpen, setIsPowerDialogOpen] = useState<boolean>(false);
  const [customTimeOffsetMs, setCustomTimeOffsetMs] = useState<number>(0);
  const [settingsInitialTab, setSettingsInitialTab] = useState<
    'profile' | 'general' | 'language' | 'skins' | 'audio' | 'datetime' | 'reset' | 'about'
  >('profile');


  const [sessionState, setSessionState] = useState<QuizSessionState>(() => quizSession.getState());

  useEffect(() => {
    return quizSession.subscribe((newState) => {
      setSessionState(newState);
    });
  }, []);

  const handleRestartOS = () => {
    sound.playClick();
    setIsPowerDialogOpen(false);
    setOsState('boot');
  };

  const handleSetGradeLevel = (g: GradeLevel) => {
    setGradeLevel(g);
    aiGameDirector.setGradeLevel(g);
    try {
      localStorage.setItem(GRADE_KEY, g);
    } catch {
      // fallback
    }
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      localStorage.setItem(PROFILE_KEY, playerName);
    } catch {
      // ignore
    }
  }, [records, playerName]);

  const handleSetLanguage = (nextLang: Language) => {
    setLang(nextLang);
    saveLanguage(nextLang);
  };

  const handleUpdateCharacter = (newChar: CharacterCustomization) => {
    setCharacter(newChar);
    saveCharacter(newChar);
  };

  // Scores and breakdowns computation
  const { totalScore, maxScore, overallPercentage, breakdowns, completedCount } = useMemo(() => {
    let currentTotal = 0;
    let maximumTotal = 0;
    let completed = 0;

    const subjectStats: Record<SubjectType, { current: number; max: number; count: number; total: number }> = {
      math: { current: 0, max: 0, count: 0, total: 0 },
      science: { current: 0, max: 0, count: 0, total: 0 },
      ict: { current: 0, max: 0, count: 0, total: 0 },
      integrated: { current: 0, max: 0, count: 0, total: 0 },
    };

    CHALLENGES.forEach((c) => {
      maximumTotal += c.points;
      subjectStats[c.subject].max += c.points;
      subjectStats[c.subject].total += 1;

      const record = records[c.id];
      if (record) {
        completed += 1;
        currentTotal += record.scoreAwarded;
        subjectStats[c.subject].current += record.scoreAwarded;
        subjectStats[c.subject].count += 1;
      }
    });

    const breakdownList: SubjectScoreBreakdown[] = [
      {
        subject: 'math',
        label: 'Mathematics',
        current: subjectStats.math.current,
        max: subjectStats.math.max,
        percentage: subjectStats.math.max > 0 ? (subjectStats.math.current / subjectStats.math.max) * 100 : 0,
        completedCount: subjectStats.math.count,
        totalCount: subjectStats.math.total,
      },
      {
        subject: 'science',
        label: 'Science',
        current: subjectStats.science.current,
        max: subjectStats.science.max,
        percentage: subjectStats.science.max > 0 ? (subjectStats.science.current / subjectStats.science.max) * 100 : 0,
        completedCount: subjectStats.science.count,
        totalCount: subjectStats.science.total,
      },
      {
        subject: 'ict',
        label: 'Technology & ICT',
        current: subjectStats.ict.current,
        max: subjectStats.ict.max,
        percentage: subjectStats.ict.max > 0 ? (subjectStats.ict.current / subjectStats.ict.max) * 100 : 0,
        completedCount: subjectStats.ict.count,
        totalCount: subjectStats.ict.total,
      },
      {
        subject: 'integrated',
        label: 'Engineering & Quests',
        current: subjectStats.integrated.current,
        max: subjectStats.integrated.max,
        percentage: subjectStats.integrated.max > 0 ? (subjectStats.integrated.current / subjectStats.integrated.max) * 100 : 0,
        completedCount: subjectStats.integrated.count,
        totalCount: subjectStats.integrated.total,
      },
    ];

    const percentage = maximumTotal > 0 ? (currentTotal / maximumTotal) * 100 : 0;
    return {
      totalScore: currentTotal,
      maxScore: maximumTotal,
      overallPercentage: percentage,
      breakdowns: breakdownList,
      completedCount: completed,
    };
  }, [records]);

  // Grade-aware curriculum challenge themes from 1,440 question master bank
  const curriculumChallenges = useMemo(() => {
    const themes = getCurriculumThemes(gradeLevel, selectedSubjectFilter);
    return themes.map((th) => {
      return quizSession.toChallenge(th.sampleQuestion, 1, th.questionCount);
    });
  }, [gradeLevel, selectedSubjectFilter]);

  // Filtered challenges to display when on quiz/lab/projects tab
  const displayedChallenges = useMemo(() => {
    if (activeTab === 'lab') {
      return CHALLENGES.filter((c) => !!c.interactiveWidgetType);
    }
    if (activeTab === 'projects') {
      return curriculumChallenges.filter((c) => c.subject === 'integrated');
    }
    return curriculumChallenges;
  }, [activeTab, curriculumChallenges]);

  // Active challenge solver target (Single Source of Truth: quizSession)
  const activeChallenge = useMemo(() => {
    if (!selectedChallengeId) return null;
    if (sessionState.sessionStatus === 'active' && sessionState.currentQuestion) {
      return quizSession.toChallenge(
        sessionState.currentQuestion,
        sessionState.questionIndex + 1,
        sessionState.questionList.length
      );
    }
    return displayedChallenges.find((c) => c.id === selectedChallengeId) ||
      CHALLENGES.find((c) => c.id === selectedChallengeId) || null;
  }, [selectedChallengeId, sessionState, displayedChallenges]);

  // Handle challenge submission
  const handleSubmitAnswer = (challengeId: string, answer: number | string) => {
    const subResult = quizSession.submitAnswer(answer);
    const isCorrect = subResult.isCorrect;
    const scoreAwarded = subResult.pointsAwarded;

    const newRecord: UserAnswerRecord = {
      challengeId,
      userAnswer: answer,
      isCorrect,
      scoreAwarded,
      submittedAt: Date.now(),
    };

    setRecords((prev) => ({
      ...prev,
      [challengeId]: newRecord,
    }));

    if (isCorrect) {
      sound.playSuccess();
      setCoins((prev) => prev + scoreAwarded * 5);
      setGems((prev) => prev + 5);
    } else {
      sound.playError();
    }
  };

  const handleResetAll = () => {
    setRecords({});
    quizSession.resetSession();
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('stem_nexus_unlocked_skins_v1');
    } catch {
      // ignore
    }
  };

  // Launch challenge with genre prompt
  const handleLaunchChallenge = (chId: string) => {
    sound.playClick();
    setPendingChallengeId(chId);
    setIsGenreSelectOpen(true);
  };

  const handleSelectGenreAndStart = (genre: GameGenre) => {
    setSelectedQuizGenre(genre);
    setIsGenreSelectOpen(false);
    const targetId = pendingChallengeId || displayedChallenges[0]?.id || CHALLENGES[0].id;

    // Locate target challenge to resolve theme and subject
    const targetChallenge =
      displayedChallenges.find((c) => c.id === targetId) ||
      CHALLENGES.find((c) => c.id === targetId);

    // Extract theme name (strip any " (Q1/10)" suffix if present)
    const rawTitle = targetChallenge ? targetChallenge.title : 'The Solar System and Planets';
    const themeName = rawTitle.includes(' (Q') ? rawTitle.split(' (Q')[0] : rawTitle;
    const subject = targetChallenge ? targetChallenge.subject : 'science';

    // Start strict topic session: ALL questions will remain on this theme for the selected grade!
    const newSession = quizSession.startTopicSession({
      subject,
      theme: themeName,
      gradeLevel,
      gameGenre: genre,
    });

    const currentQId = newSession.currentQuestion?.id || targetId;
    setSelectedChallengeId(currentQId);
    setPendingChallengeId(null);
  };

  // Handle navigation tab selection
  const handleSelectNavTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'achievements') setIsAchievementsOpen(true);
    if (tab === 'leaderboard') setIsLeaderboardOpen(true);
    if (tab === 'learn') setIsLearnOpen(true);
    if (tab === 'characterStudio') setIsCharacterStudioOpen(true);
    if (tab === 'settings') setIsSettingsOpen(true);
    if (tab === 'quiz') setSelectedSubjectFilter('all');
    if (tab === 'lab') setSelectedSubjectFilter('science');
    if (tab === 'projects') setSelectedSubjectFilter('integrated');
  };

  const handleSelectCategory = (cat: SubjectType) => {
    setSelectedSubjectFilter(cat);
    setActiveTab('quiz');
  };

  // Advance strictly within current topic session
  const handleNextChallenge = () => {
    sound.playClick();
    const nextQ = quizSession.nextQuestion();
    if (nextQ) {
      setSelectedChallengeId(nextQ.id);
    } else {
      setSelectedChallengeId(null);
      setIsResultsOpen(true);
    }
  };

  const hasNextChallenge = useMemo(() => {
    return quizSession.hasMoreQuestions();
  }, [sessionState]);

  // Boot Screen
  if (osState === 'boot') {
    return <BootScreen onComplete={() => setOsState('lock')} />;
  }

  // Lock Screen
  if (osState === 'lock') {
    return (
      <LockScreen
        playerName={playerName}
        character={character}
        language={lang}
        gradeLevel={gradeLevel}
        onSelectGrade={handleSetGradeLevel}
        onSignIn={() => setOsState('desktop')}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 h-screen w-screen overflow-hidden flex flex-col font-game select-none"
      style={{
        filter: `brightness(${brightness})`,
      }}
    >
      {/* 1. Animated Bliss Sky, Clouds, Bubbles, Corgi & Penguin Mascots Background */}
      <DesktopBackground />

      {/* 2. Retro Anime OS Top Bar with Interactive Grade Picker */}
      <RetroHeader
        totalScore={totalScore}
        maxScore={maxScore}
        playerName={playerName}
        character={character}
        gradeLevel={gradeLevel}
        onSelectGrade={handleSetGradeLevel}
        lang={lang}
      />

      {/* 3. Main Dashboard Workspace Split */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-3 sm:px-6 py-2 w-full flex flex-col md:flex-row gap-3 sm:gap-4 items-start animate-in fade-in duration-300">
        {/* Left Glossy Sidebar Navigation (Home and Quiz only) */}
        <RetroSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectNavTab}
          lang={lang}
        />

        {/* Center / Right Content Panel */}
        {activeTab === 'home' ? (
          <div className="flex-1 w-full flex flex-col lg:flex-row gap-3.5 sm:gap-4 items-start">
            {/* Center Hero Banner, 4 Big Category Buttons, Continue Learning */}
            <RetroDashboard
              onSelectCategory={handleSelectCategory}
              onOpenQuickPlay={() => handleLaunchChallenge(displayedChallenges[0]?.id || CHALLENGES[0].id)}
              onOpenEvent={() => handleLaunchChallenge('int-1')}
              completedCount={completedCount}
              totalCount={displayedChallenges.length}
              lang={lang}
            />

            {/* Right Sidebar: Daily Missions & Progress */}
            <RetroRightSidebar
              totalScore={totalScore}
              maxScore={maxScore}
              overallPercentage={overallPercentage}
              onOpenScorecard={() => setIsResultsOpen(true)}
              onClaimDailyBonus={() => {
                setCoins((prev) => prev + 300);
                setGems((prev) => prev + 10);
              }}
            />
          </div>
        ) : (
          /* Sub-View: Quiz Challenge Grid */
          <div className="flex-1 w-full space-y-4">
            <div className="rounded-3xl aero-window border-2 border-[#6ec3ff] p-4 bg-[#143d83]/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('home');
                  }}
                  className="p-2 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-cyan-200 border border-blue-400/40 shadow transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.backToDashboard}</span>
                </button>

                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white drop-shadow">
                    STEM Challenge Arena
                  </h2>
                  <p className="text-xs text-blue-200">
                    {displayedChallenges.length} interactive questions available
                  </p>
                </div>
              </div>

              {/* Subject Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'science', 'ict', 'math', 'integrated'] as const).map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedSubjectFilter(sub);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-game text-xs font-bold transition-all cursor-pointer ${
                      selectedSubjectFilter === sub
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md border border-white'
                        : 'bg-blue-900/60 hover:bg-blue-800/80 text-cyan-100 border border-blue-400/30'
                    }`}
                  >
                    {sub === 'all'
                      ? 'All'
                      : sub === 'science'
                      ? 'Science'
                      : sub === 'ict'
                      ? 'Technology'
                      : sub === 'math'
                      ? 'Math'
                      : 'Quests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {displayedChallenges.map((c) => (
                <ChallengeCard
                  key={c.id}
                  challenge={c}
                  record={records[c.id]}
                  onOpen={() => handleLaunchChallenge(c.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 4. Windows XP Taskbar */}
      <RetroTaskbar
        onOpenStartMenu={() => setIsStartMenuOpen((prev) => !prev)}
        isStartMenuOpen={isStartMenuOpen}
        activeWindowName={activeChallenge ? activeChallenge.title : undefined}
        onRestoreWindow={() => activeChallenge && setSelectedChallengeId(activeChallenge.id)}
        lang={lang}
        masterVolume={masterVolume}
        onSetMasterVolume={(v) => {
          setMasterVolume(v);
          sound.setMasterVolume(v);
        }}
        onClaimDailyBonus={(c, g) => {
          setCoins((prev) => prev + c);
          setGems((prev) => prev + g);
        }}
        customTimeOffsetMs={customTimeOffsetMs}
        onOpenMusicApp={() => setIsMusicOpen(true)}
      />

      {/* 5. Retro Start Menu Popup (Matching StartMenu.png) */}
      <RetroStartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onSelectNav={handleSelectNavTab}
        onOpenSettings={() => {
          setSettingsInitialTab('profile');
          setIsSettingsOpen(true);
        }}
        onOpenPowerDialog={() => setIsPowerDialogOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenMusic={() => setIsMusicOpen(true)}
        onOpenNotepad={() => setIsNotepadOpen(true)}
        onOpenClock={() => setIsClockOpen(true)}
        onOpenPaint={() => setIsPaintOpen(true)}
        onOpenLibrary={() => setIsLearnOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenCredits={() => {
          setSettingsInitialTab('about');
          setIsSettingsOpen(true);
        }}
        playerName={playerName}
        character={character}
        lang={lang}
      />

      {/* 6. Pre-Quiz Gameplay Genre Selector Modal */}
      <QuizGenreSelectModal
        isOpen={isGenreSelectOpen}
        onClose={() => {
          setIsGenreSelectOpen(false);
          setPendingChallengeId(null);
        }}
        onSelectGenre={handleSelectGenreAndStart}
        lang={lang}
      />

      {/* 7. Interactive Challenge Solver Window (Fullscreen Modal) */}
      <ChallengeModal
        challenge={activeChallenge}
        onClose={() => {
          setSelectedChallengeId(null);
          quizSession.resetSession();
        }}
        onSubmitAnswer={handleSubmitAnswer}
        existingRecord={activeChallenge ? records[activeChallenge.id] : undefined}
        onNextChallenge={handleNextChallenge}
        hasNextChallenge={hasNextChallenge}
        lang={lang}
        genreOverride={selectedQuizGenre}
      />

      {/* 8. Full Aero Settings Application Window with Cadet Profile */}
      <SettingsAppModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        onSetLang={handleSetLanguage}
        coins={coins}
        gems={gems}
        onUpdateCurrency={(c, g) => {
          setCoins((prev) => prev + c);
          setGems((prev) => prev + g);
        }}
        brightness={brightness}
        onSetBrightness={setBrightness}
        uiScale={uiScale}
        onSetUiScale={setUiScale}
        masterVolume={masterVolume}
        onSetMasterVolume={(v) => {
          setMasterVolume(v);
          sound.setMasterVolume(v);
        }}
        onResetAllData={handleResetAll}
        activeSkinId={activeSkinId}
        onSelectSkin={setActiveSkinId}
        playerName={playerName}
        onSetPlayerName={setPlayerName}
        character={character}
        onOpenCustomization={() => setIsCharacterStudioOpen(true)}
        initialTab={settingsInitialTab}
      />

      {/* 9. Performance Scorecard & Review Modal */}
      <ResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        challenges={CHALLENGES}
        records={records}
        breakdowns={breakdowns}
        totalScore={totalScore}
        maxScore={maxScore}
        overallPercentage={overallPercentage}
        onResetAll={handleResetAll}
        onQuickDemo={() => {}}
        onSelectChallengeToReview={(c) => setSelectedChallengeId(c.id)}
      />

      {/* 10. Reference UI Design Inspector Modal */}
      <ReferenceViewerModal
        isOpen={isRefViewerOpen}
        onClose={() => setIsRefViewerOpen(false)}
      />

      {/* 11. Daily Rewards & Announcements Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClaimReward={() => {
          setCoins((prev) => prev + 150);
          setGems((prev) => prev + 50);
        }}
      />

      {/* 12. Cadet ID / Player Profile Modal */}
      <PlayerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        playerName={playerName}
        onUpdateName={setPlayerName}
        totalScore={totalScore}
        maxScore={maxScore}
        coins={coins}
        gems={gems}
      />

      {/* 13. Achievements & Badges Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        records={records}
      />

      {/* 14. Classroom Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        playerName={playerName}
        totalScore={totalScore}
      />

      {/* 15. Learning Library Modal */}
      <LearningLibraryModal
        isOpen={isLearnOpen}
        onClose={() => setIsLearnOpen(false)}
        onOpenLab={(widget) => {
          const match = CHALLENGES.find((c) => c.interactiveWidgetType === widget);
          if (match) setSelectedChallengeId(match.id);
        }}
      />

      {/* 16. STEM Nexus Multi-Genre AI Game Quiz Engine (Fullscreen Modal) */}
      <ArcadeArenaModal
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
        onAwardXp={(xp, earnedCoins) => {
          setCoins((prev) => prev + earnedCoins);
        }}
        initialGenre={arcadeInitialGenre}
        lang={lang}
      />

      {/* 17. Cadet Character Customization Studio Modal */}
      <CharacterCustomizationModal
        isOpen={isCharacterStudioOpen}
        onClose={() => setIsCharacterStudioOpen(false)}
        character={character}
        onUpdateCharacter={handleUpdateCharacter}
        playerXp={totalScore * 10 + 12430}
        language={lang}
      />

      {/* 18. Development Team Credits Modal */}
      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
        lang={lang}
      />
      {/* 19. Windows XP Calculator App */}
      <CalculatorAppModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* 20. Windows Media Player Music App */}
      <MusicAppModal
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
      />

      {/* 21. Notepad Cadet Notes App */}
      <NotepadAppModal
        isOpen={isNotepadOpen}
        onClose={() => setIsNotepadOpen(false)}
      />

      {/* 22. Clock, Stopwatch, Timer & Alarm App */}
      <ClockAppModal
        isOpen={isClockOpen}
        onClose={() => setIsClockOpen(false)}
        customTimeOffsetMs={customTimeOffsetMs}
        onUpdateOffset={setCustomTimeOffsetMs}
      />

      {/* 23. MS Paint Studio App */}
      <PaintAppModal
        isOpen={isPaintOpen}
        onClose={() => setIsPaintOpen(false)}
      />

      {/* 24. Authentic Windows XP Power Options Dialog */}
      <PowerDialogModal
        isOpen={isPowerDialogOpen}
        onClose={() => setIsPowerDialogOpen(false)}
        onRestart={handleRestartOS}
        onLogOff={() => {
          sound.playClick();
          setIsPowerDialogOpen(false);
          setOsState('lock');
        }}
        onSleep={() => {
          sound.playClick();
          setIsPowerDialogOpen(false);
          setOsState('lock');
        }}
        onShutdown={() => {
          sound.playClick();
          setIsPowerDialogOpen(false);
          setOsState('boot');
        }}
      />
    </div>
  );
}
