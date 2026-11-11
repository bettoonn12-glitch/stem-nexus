import { GameGenre, GameQuestion, GradeLevel } from '../types/game';
import { SubjectType } from '../types';
import {
  MASTER_QUESTION_BANK,
  BankQuestion,
  getQuestionsForThemeAndGrade,
  validateQuestion,
  GRADE_NUM_TO_LEVEL,
} from '../data/masterQuestionBank';
import { quizSession } from './quizSession';

class AIGameDirector {
  private playedIds: Set<string> = new Set();
  private currentDifficultyLevel: number = 2; // 1: Foundation, 2: Intermediate, 3: Advanced
  private selectedGradeLevel: GradeLevel = 'sd-5';
  private activeTopic: string = '';

  public setGradeLevel(grade: GradeLevel | 'sd' | 'smp' | 'all') {
    if (grade === 'all' || grade === 'sd') {
      this.selectedGradeLevel = 'sd-5';
    } else if (grade === 'smp') {
      this.selectedGradeLevel = 'smp-1';
    } else {
      this.selectedGradeLevel = grade;
    }
  }

  public getGradeLevel(): GradeLevel {
    return this.selectedGradeLevel;
  }

  public setActiveTopic(topic: string) {
    this.activeTopic = topic;
  }

  public getActiveTopic(): string {
    return this.activeTopic;
  }

  /**
   * Get a question strictly adhering to the requested topic and grade level
   */
  public getQuestionForTopic(
    topic: string,
    gradeLevel: GradeLevel = this.selectedGradeLevel,
    genre: GameGenre = 'racing',
    subject?: SubjectType
  ): GameQuestion {
    const questions = getQuestionsForThemeAndGrade(topic, gradeLevel, subject);
    let chosen: BankQuestion;

    if (questions.length > 0) {
      // Pick unplayed if possible
      const unplayed = questions.filter((q) => !this.playedIds.has(q.id));
      chosen = unplayed.length > 0 ? unplayed[0] : questions[0];
    } else {
      // Fallback within exact grade
      const gradeMatches = MASTER_QUESTION_BANK.filter((q) => q.gradeLevel === gradeLevel);
      chosen = gradeMatches[0] || MASTER_QUESTION_BANK[0];
    }

    this.playedIds.add(chosen.id);

    // Validate before returning
    const check = validateQuestion(chosen, topic, gradeLevel);
    if (!check.isValid) {
      console.warn(`[AIGameDirector] Question ${chosen.id} warning:`, check.reason);
    }

    return quizSession.toGameQuestion(chosen, genre);
  }

  /**
   * Get question for genre while strictly respecting active topic and grade level
   */
  public getQuestionForGenre(
    preferredGenre: GameGenre = 'racing',
    subject?: SubjectType | 'all',
    grade?: GradeLevel | 'sd' | 'smp' | 'all',
    topicFilter?: string
  ): GameQuestion {
    const activeGrade: GradeLevel =
      grade && grade !== 'all' && grade !== 'sd' && grade !== 'smp'
        ? grade
        : grade === 'smp'
        ? 'smp-1'
        : this.selectedGradeLevel;

    const topic = topicFilter || this.activeTopic;

    if (topic && topic.trim().length > 0) {
      return this.getQuestionForTopic(
        topic,
        activeGrade,
        preferredGenre,
        subject && subject !== 'all' ? subject : undefined
      );
    }

    // Filter strictly by activeGrade and subject
    let pool = MASTER_QUESTION_BANK.filter((q) => q.gradeLevel === activeGrade);

    if (subject && subject !== 'all') {
      const subPool = pool.filter((q) => q.subject === subject);
      if (subPool.length > 0) pool = subPool;
    }

    const unplayed = pool.filter((q) => !this.playedIds.has(q.id));
    const candidateList = unplayed.length > 0 ? unplayed : pool;

    const chosen = candidateList[Math.floor(Math.random() * candidateList.length)] || MASTER_QUESTION_BANK[0];
    this.playedIds.add(chosen.id);

    return quizSession.toGameQuestion(chosen, preferredGenre);
  }

  public recordPerformance(isCorrect: boolean, timeTakenSec: number) {
    if (isCorrect && timeTakenSec < 10) {
      this.currentDifficultyLevel = Math.min(3, this.currentDifficultyLevel + 1);
    } else if (!isCorrect) {
      this.currentDifficultyLevel = Math.max(1, this.currentDifficultyLevel - 1);
    }
  }

  public getDifficulty(): 'Foundation' | 'Intermediate' | 'Advanced' {
    if (this.currentDifficultyLevel === 1) return 'Foundation';
    if (this.currentDifficultyLevel === 3) return 'Advanced';
    return 'Intermediate';
  }

  public resetHistory() {
    this.playedIds.clear();
  }
}

export const aiGameDirector = new AIGameDirector();

/**
 * Resolves question for challenge ID
 * Strictly prioritizes active quiz session state
 */
export function getGameQuestionForChallenge(challengeId: string, genre: GameGenre = 'racing'): GameQuestion | null {
  // 1. If the active quiz session matches or has an active question, use it!
  const sessionState = quizSession.getState();
  if (sessionState.sessionStatus === 'active' && sessionState.currentQuestion) {
    if (
      sessionState.currentQuestion.id === challengeId ||
      challengeId.startsWith('session_') ||
      challengeId === 'quick_play'
    ) {
      return quizSession.toGameQuestion(sessionState.currentQuestion, genre);
    }
  }

  // 2. Direct search in 1,440 master question bank by ID
  const directMatch = MASTER_QUESTION_BANK.find((q) => q.id === challengeId);
  if (directMatch) {
    return quizSession.toGameQuestion(directMatch, genre);
  }

  // 3. Fallback for legacy IDs: map legacy static challenges to curriculum topics
  const legacyTopicMap: Record<string, { topic: string; subject: SubjectType }> = {
    'math-1': { topic: 'Area and Perimeter', subject: 'math' },
    'math-2': { topic: 'Percentages and Ratios', subject: 'math' },
    'math-3': { topic: 'Ratios and Financial Arithmetic', subject: 'math' },
    'math-4': { topic: 'Motion and Forces', subject: 'math' },
    'sci-1': { topic: 'Electric Circuits and Magnetism', subject: 'science' },
    'science-1': { topic: 'Electric Circuits and Magnetism', subject: 'science' },
    'sci-2': { topic: 'States and Changes of Matter', subject: 'science' },
    'science-2': { topic: 'States and Changes of Matter', subject: 'science' },
    'sci-3': { topic: 'The Solar System and Planets', subject: 'science' },
    'science-3': { topic: 'The Solar System and Planets', subject: 'science' },
    'sci-4': { topic: 'Water Cycle and the Environment', subject: 'science' },
    'science-4': { topic: 'Water Cycle and the Environment', subject: 'science' },
    'ict-1': { topic: 'Digital Data Representation', subject: 'ict' },
    'ict-2': { topic: 'Logic Gates and Circuits', subject: 'ict' },
    'ict-3': { topic: 'Computer Components and Operating Systems', subject: 'ict' },
    'ict-4': { topic: 'Digital Data Representation', subject: 'ict' },
    'int-1': { topic: 'The Engineering Design Process', subject: 'integrated' },
    'int-2': { topic: 'Ecosystems and Adaptations', subject: 'integrated' },
    'int-3': { topic: 'Basic Renewable Energy', subject: 'integrated' },
  };

  const mapped = legacyTopicMap[challengeId];
  if (mapped) {
    return aiGameDirector.getQuestionForTopic(
      mapped.topic,
      sessionState.gradeLevel || 'sd-5',
      genre,
      mapped.subject
    );
  }

  // 4. Default to current session or first bank question
  if (sessionState.currentQuestion) {
    return quizSession.toGameQuestion(sessionState.currentQuestion, genre);
  }

  return quizSession.toGameQuestion(MASTER_QUESTION_BANK[0], genre);
}
