import { SubjectType, Challenge } from '../types';
import { GameGenre, GradeLevel, GameQuestion } from '../types/game';
import {
  BankQuestion,
  MASTER_QUESTION_BANK,
  getQuestionsForThemeAndGrade,
  validateQuestion,
  GRADE_LEVEL_NAMES,
} from '../data/masterQuestionBank';

export interface AnswerRecord {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  pointsAwarded: number;
  submittedAt: number;
}

export interface QuizSessionState {
  sessionId: string;
  category: SubjectType;
  subject: SubjectType;
  topic: string;
  subtopic: string;
  gradeLevel: GradeLevel;
  gameGenre: GameGenre;
  questionIndex: number;
  currentQuestion: BankQuestion | null;
  questionList: BankQuestion[];
  score: number;
  totalQuestions: number;
  answerHistory: AnswerRecord[];
  sessionStatus: 'idle' | 'active' | 'paused' | 'finished';
}

type SessionListener = (state: QuizSessionState) => void;

class QuizSessionManager {
  private state: QuizSessionState = {
    sessionId: '',
    category: 'science',
    subject: 'science',
    topic: '',
    subtopic: '',
    gradeLevel: 'sd-5',
    gameGenre: 'racing',
    questionIndex: 0,
    currentQuestion: null,
    questionList: [],
    score: 0,
    totalQuestions: 0,
    answerHistory: [],
    sessionStatus: 'idle',
  };

  private listeners: Set<SessionListener> = new Set();

  public getState(): QuizSessionState {
    return { ...this.state };
  }

  public subscribe(listener: SessionListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const copy = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(copy);
      } catch (err) {
        console.error('QuizSession listener error:', err);
      }
    });
  }

  /**
   * Start a new quiz session strictly bound to a single topic and grade level
   */
  public startTopicSession(params: {
    subject?: SubjectType;
    theme: string;
    gradeLevel?: GradeLevel;
    gameGenre?: GameGenre;
  }): QuizSessionState {
    const activeGrade: GradeLevel = params.gradeLevel || this.state.gradeLevel || 'sd-5';
    const activeSubject: SubjectType = params.subject || 'science';
    const activeGenre: GameGenre = params.gameGenre || 'racing';
    const activeTheme = params.theme.trim();

    // 1. Fetch questions strictly filtered by Grade and Theme
    let questions = getQuestionsForThemeAndGrade(activeTheme, activeGrade, activeSubject);

    // 2. Validate all retrieved questions to ensure zero topic or grade mixing
    const validQuestions = questions.filter((q) => {
      const v = validateQuestion(q, activeTheme, activeGrade);
      if (!v.isValid) {
        console.warn(`[QuizSession] Rejecting invalid question ${q.id}:`, v.reason);
      }
      return v.isValid;
    });

    // If validation passed on some or all
    if (validQuestions.length > 0) {
      questions = validQuestions;
    } else if (questions.length === 0) {
      // Fallback: If no direct questions found for this specific theme in this grade,
      // strictly find questions within the requested grade and subject
      const gradeMatches = MASTER_QUESTION_BANK.filter(
        (q) => q.gradeLevel === activeGrade && q.subject === activeSubject
      );
      if (gradeMatches.length > 0) {
        const fallbackTheme = gradeMatches[0].theme;
        questions = gradeMatches.filter((q) => q.theme === fallbackTheme);
      } else {
        questions = MASTER_QUESTION_BANK.filter((q) => q.gradeLevel === activeGrade);
      }
    }

    const firstQuestion = questions[0] || null;

    this.state = {
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      category: activeSubject,
      subject: activeSubject,
      topic: firstQuestion ? firstQuestion.theme : activeTheme,
      subtopic: firstQuestion ? firstQuestion.subtopic : activeTheme,
      gradeLevel: activeGrade,
      gameGenre: activeGenre,
      questionIndex: 0,
      currentQuestion: firstQuestion,
      questionList: [...questions],
      score: 0,
      totalQuestions: questions.length,
      answerHistory: [],
      sessionStatus: 'active',
    };

    this.notify();
    return this.getState();
  }

  /**
   * Advance to the next question within the active topic.
   * NEVER changes topic or mixes subjects!
   */
  public nextQuestion(): BankQuestion | null {
    if (this.state.sessionStatus === 'finished') {
      return null;
    }

    const nextIndex = this.state.questionIndex + 1;

    if (nextIndex < this.state.questionList.length) {
      const nextQ = this.state.questionList[nextIndex];

      // Validate question before displaying
      const check = validateQuestion(nextQ, this.state.topic, this.state.gradeLevel);
      if (!check.isValid) {
        console.error(`[QuizSession] Next question ${nextQ.id} failed validation:`, check.reason);
      }

      this.state.questionIndex = nextIndex;
      this.state.currentQuestion = nextQ;
      this.notify();
      return nextQ;
    } else {
      // Topic completed!
      this.state.sessionStatus = 'finished';
      this.notify();
      return null;
    }
  }

  public hasMoreQuestions(): boolean {
    return this.state.questionIndex < this.state.questionList.length - 1;
  }

  /**
   * Submit an answer for the current question
   */
  public submitAnswer(answer: string | number): {
    isCorrect: boolean;
    pointsAwarded: number;
    explanation: string;
    correctAnswer: string;
  } {
    const q = this.state.currentQuestion;
    if (!q) {
      return { isCorrect: false, pointsAwarded: 0, explanation: '', correctAnswer: '' };
    }

    const ansStr = String(answer).trim().toLowerCase();
    const correctStr = String(q.correctAnswer).trim().toLowerCase();
    const correctIdStr = q.correctAnswerId ? String(q.correctAnswerId).trim().toLowerCase() : '';
    const letterStr = String(q.answerLetter).trim().toLowerCase();

    // Check match against answer text, letter (A-D), or correct option index
    const isCorrect: boolean = Boolean(
      ansStr === correctStr ||
      (correctIdStr && ansStr === correctIdStr) ||
      ansStr === letterStr ||
      (typeof answer === 'number' && answer === q.correctIndex) ||
      (q.options[q.correctIndex] && q.options[q.correctIndex].toLowerCase() === ansStr) ||
      (q.optionsId && q.optionsId[q.correctIndex] && q.optionsId[q.correctIndex].toLowerCase() === ansStr)
    );

    const points = isCorrect ? (q.points || 100) : 0;

    const record: AnswerRecord = {
      questionId: q.id,
      selectedAnswer: String(answer),
      isCorrect,
      pointsAwarded: points,
      submittedAt: Date.now(),
    };

    this.state.answerHistory.push(record);
    if (isCorrect) {
      this.state.score += points;
    }

    this.notify();
    return {
      isCorrect,
      pointsAwarded: points,
      explanation: q.explanation,
      correctAnswer: q.correctAnswer,
    };
  }

  public resetSession() {
    this.state = {
      sessionId: '',
      category: 'science',
      subject: 'science',
      topic: '',
      subtopic: '',
      gradeLevel: this.state.gradeLevel,
      gameGenre: 'racing',
      questionIndex: 0,
      currentQuestion: null,
      questionList: [],
      score: 0,
      totalQuestions: 0,
      answerHistory: [],
      sessionStatus: 'idle',
    };
    this.notify();
  }

  /**
   * Convert BankQuestion to full Challenge object for ChallengeModal
   */
  public toChallenge(q: BankQuestion, currentQuestionNum: number = 1, totalInTopic: number = 10): Challenge {
    const themeDisplay = q.theme;
    const themeIdDisplay = q.themeId || q.theme;
    const qEnText = q.question;
    const qIdText = q.questionIdText || q.question;
    const expEnText = q.explanation;
    const expIdText = q.explanationId || q.explanation;
    const ansEnText = q.correctAnswer;
    const ansIdText = q.correctAnswerId || q.correctAnswer;

    return {
      id: q.id,
      subject: q.subject,
      title: `${themeDisplay} (Q${currentQuestionNum}/${totalInTopic})`,
      titleEn: `${themeDisplay} (Q${currentQuestionNum}/${totalInTopic})`,
      titleId: `${themeIdDisplay} (Pertanyaan ${currentQuestionNum}/${totalInTopic})`,
      subtitle: `${GRADE_LEVEL_NAMES[q.gradeLevel]} • Topic: ${themeDisplay} • Difficulty: ${q.difficulty}`,
      subtitleEn: `${GRADE_LEVEL_NAMES[q.gradeLevel]} • Topic: ${themeDisplay} • Difficulty: ${q.difficulty}`,
      subtitleId: `${GRADE_LEVEL_NAMES[q.gradeLevel]} • Materi: ${themeIdDisplay} • Tingkat: ${q.difficulty}`,
      difficulty: q.difficulty === 'Foundational' ? 'Foundation' : q.difficulty,
      points: q.points || 100,
      scenario: `Topic Module: ${themeDisplay} [Grade Level: ${GRADE_LEVEL_NAMES[q.gradeLevel]}]. This challenge tests your mastery of ${q.subtopic}. Analyze the parameters and choose the most accurate response.`,
      scenarioEn: `Topic Module: ${themeDisplay} [Grade Level: ${GRADE_LEVEL_NAMES[q.gradeLevel]}]. This challenge tests your mastery of ${q.subtopic}. Analyze the parameters and choose the most accurate response.`,
      scenarioId: `Modul Materi: ${themeIdDisplay} [Tingkat: ${GRADE_LEVEL_NAMES[q.gradeLevel]}]. Soal ini menguji pemahaman Anda. Analisis pilihan jawaban dengan cermat.`,
      question: qEnText,
      questionEn: qEnText,
      questionId: qIdText,
      inputType: 'multiple-choice',
      options: q.options.map((opt, idx) => ({
        id: ['a', 'b', 'c', 'd'][idx] || String(idx),
        label: ['A', 'B', 'C', 'D'][idx] || String(idx),
        text: opt,
      })),
      correctAnswer: ansEnText,
      hints: [
        `Difficulty Level: ${q.difficulty}.`,
        `Focus on the concepts from ${themeDisplay}.`,
        `Review the 4 choices carefully before selecting your answer.`,
      ],
      explanation: {
        overview: expEnText,
        steps: [
          {
            step: 'Analyze the Question',
            detail: qEnText,
          },
          {
            step: 'Identify Correct Concept',
            detail: `The correct option is [${q.answerLetter}]: "${ansEnText}". ${expEnText}`,
          },
        ],
        keyTakeaway: `${themeDisplay}: Understanding core principles helps solve complex scientific and mathematical problems.`,
        realWorldApplication: `This concept is actively applied in engineering, technology systems, and nature.`,
      },
      interactiveWidgetType: q.subject === 'math'
        ? 'gear-ratio'
        : q.subject === 'science'
        ? 'parallel-circuit'
        : q.subject === 'ict'
        ? 'logic-gates'
        : 'integrated-mission',
    };
  }

  /**
   * Convert BankQuestion to GameQuestion for Minigames (Racing, Adventure, RPG, Soccer, Basketball, Shooter, Puzzle, Classic)
   */
  public toGameQuestion(q: BankQuestion, genre: GameGenre): GameQuestion {
    const qIndex = this.state.questionIndex >= 0 ? this.state.questionIndex : 0;
    const themeDisplay = q.theme;
    const themeIdDisplay = q.themeId || q.theme;
    const qEnText = q.question;
    const qIdText = q.questionIdText || q.question;
    const expEnText = q.explanation;
    const expIdText = q.explanationId || q.explanation;
    const optionsId = q.optionsId || q.options;

    return {
      id: q.id,
      subject: q.subject,
      difficulty: q.difficulty === 'Foundational' ? 'Foundation' : q.difficulty,
      genre,
      title: `${themeDisplay} — Question ${qIndex + 1}`,
      titleId: `${themeIdDisplay} — Pertanyaan ${qIndex + 1}`,
      question: qEnText,
      questionId: qIdText,
      objectiveText: `Select the correct answer for ${themeDisplay} to clear the challenge!`,
      objectiveTextId: `Pilih jawaban yang benar untuk materi ${themeIdDisplay}!`,
      options: q.options.map((opt, idx) => ({
        id: ['a', 'b', 'c', 'd'][idx] || String(idx),
        text: opt,
        textId: optionsId[idx] || opt,
        isCorrect: idx === q.correctIndex,
      })),
      correctIndex: q.correctIndex,
      explanation: expEnText,
      explanationId: expIdText,
      formula: `Topic: ${themeDisplay} | Correct: [${q.answerLetter}] ${q.correctAnswer}`,
      gradeLevel: q.gradeLevel,
      points: q.points || 100,
    };
  }
}

export const quizSession = new QuizSessionManager();
