import masterQuestionsData from './masterQuestions.json';
import { GradeLevel, GameGenre } from '../types/game';
import { SubjectType } from '../types';

export interface BankQuestion {
  id: string;
  questionId: string;
  gradeNum: number;
  gradeLevel: GradeLevel;
  category: SubjectType;
  subject: SubjectType;
  theme: string;
  themeId?: string;
  topic: string;
  subtopic: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  question: string;
  questionText: string;
  questionIdText?: string;
  options: string[];
  optionsId?: string[];
  correctIndex: number;
  answerLetter: 'A' | 'B' | 'C' | 'D';
  correctAnswer: string;
  correctAnswerId?: string;
  explanation: string;
  explanationId?: string;
  points?: number;
}

export const MASTER_QUESTION_BANK: BankQuestion[] = (masterQuestionsData as BankQuestion[]).map((q) => ({
  ...q,
  points: q.difficulty === 'Advanced' ? 150 : q.difficulty === 'Intermediate' ? 120 : 100,
}));

// Grade level normalization
export const GRADE_LEVEL_NAMES: Record<GradeLevel, string> = {
  all: 'All Grades (SD & SMP)',
  'sd-1': 'Grade 1 SD (Kelas 1 SD)',
  'sd-2': 'Grade 2 SD (Kelas 2 SD)',
  'sd-3': 'Grade 3 SD (Kelas 3 SD)',
  'sd-4': 'Grade 4 SD (Kelas 4 SD)',
  'sd-5': 'Grade 5 SD (Kelas 5 SD)',
  'sd-6': 'Grade 6 SD (Kelas 6 SD)',
  'smp-1': 'Grade 7 SMP (Kelas 7 SMP)',
  'smp-2': 'Grade 8 SMP (Kelas 8 SMP)',
  'smp-3': 'Grade 9 SMP (Kelas 9 SMP)',
};

export const GRADE_NUM_TO_LEVEL: Record<number, GradeLevel> = {
  1: 'sd-1',
  2: 'sd-2',
  3: 'sd-3',
  4: 'sd-4',
  5: 'sd-5',
  6: 'sd-6',
  7: 'smp-1',
  8: 'smp-2',
  9: 'smp-3',
};

export const GRADE_LEVEL_TO_NUM: Record<GradeLevel, number> = {
  'sd-1': 1,
  'sd-2': 2,
  'sd-3': 3,
  'sd-4': 4,
  'sd-5': 5,
  'sd-6': 6,
  'smp-1': 7,
  'smp-2': 8,
  'smp-3': 9,
  all: 5,
};

// Fast Index Maps
const QUESTIONS_BY_GRADE_SUBJECT_THEME = new Map<string, BankQuestion[]>();
const THEMES_BY_GRADE_SUBJECT = new Map<string, string[]>();

MASTER_QUESTION_BANK.forEach((q) => {
  const gstKey = `${q.gradeLevel}::${q.subject}::${q.theme.toLowerCase().trim()}`;
  if (!QUESTIONS_BY_GRADE_SUBJECT_THEME.has(gstKey)) {
    QUESTIONS_BY_GRADE_SUBJECT_THEME.set(gstKey, []);
  }
  QUESTIONS_BY_GRADE_SUBJECT_THEME.get(gstKey)!.push(q);

  const gsKey = `${q.gradeLevel}::${q.subject}`;
  if (!THEMES_BY_GRADE_SUBJECT.has(gsKey)) {
    THEMES_BY_GRADE_SUBJECT.set(gsKey, []);
  }
  const themesList = THEMES_BY_GRADE_SUBJECT.get(gsKey)!;
  if (!themesList.includes(q.theme)) {
    themesList.push(q.theme);
  }
});

/**
 * Get all available curriculum themes for a specific grade level and optional subject
 */
export function getCurriculumThemes(gradeLevel: GradeLevel, subject?: SubjectType | 'all'): Array<{ subject: SubjectType; theme: string; questionCount: number; sampleQuestion: BankQuestion }> {
  const activeGrade: GradeLevel = gradeLevel === 'all' ? 'sd-5' : gradeLevel;
  const subjectsToSearch: SubjectType[] = (!subject || subject === 'all')
    ? ['science', 'math', 'ict', 'integrated']
    : [subject];

  const results: Array<{ subject: SubjectType; theme: string; questionCount: number; sampleQuestion: BankQuestion }> = [];

  subjectsToSearch.forEach((sub) => {
    const key = `${activeGrade}::${sub}`;
    const themes = THEMES_BY_GRADE_SUBJECT.get(key) || [];
    themes.forEach((th) => {
      const qKey = `${activeGrade}::${sub}::${th.toLowerCase().trim()}`;
      const questions = QUESTIONS_BY_GRADE_SUBJECT_THEME.get(qKey) || [];
      if (questions.length > 0) {
        results.push({
          subject: sub,
          theme: th,
          questionCount: questions.length,
          sampleQuestion: questions[0],
        });
      }
    });
  });

  return results;
}

/**
 * Strict Question Validation
 * Validates metadata before displaying to prevent topic/grade mixing
 */
export function validateQuestion(
  q: BankQuestion | null | undefined,
  expectedTopic?: string,
  expectedGrade?: GradeLevel
): { isValid: boolean; reason?: string } {
  if (!q) {
    return { isValid: false, reason: 'Question is null or undefined' };
  }
  if (!q.id || !q.questionId) {
    return { isValid: false, reason: 'Missing question ID' };
  }
  if (!q.question || q.question.trim().length === 0) {
    return { isValid: false, reason: 'Empty question text' };
  }
  if (!Array.isArray(q.options) || q.options.length < 4) {
    return { isValid: false, reason: 'Must have at least 4 answer options' };
  }
  if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    return { isValid: false, reason: 'Invalid correctIndex bounds' };
  }
  if (!q.correctAnswer || q.correctAnswer.trim().length === 0) {
    return { isValid: false, reason: 'Missing correct answer text' };
  }
  if (!q.explanation || q.explanation.trim().length === 0) {
    return { isValid: false, reason: 'Missing explanation' };
  }

  // Strict Grade Check (if expectedGrade specified and not 'all')
  if (expectedGrade && expectedGrade !== 'all' && q.gradeLevel !== expectedGrade) {
    return {
      isValid: false,
      reason: `Grade level mismatch: expected ${expectedGrade}, got ${q.gradeLevel}`,
    };
  }

  // Strict Topic Check (if expectedTopic specified)
  if (expectedTopic && expectedTopic.trim().length > 0) {
    const normExpected = expectedTopic.toLowerCase().trim();
    const normTheme = q.theme.toLowerCase().trim();
    const normTopic = (q.topic || '').toLowerCase().trim();

    const matches =
      normTheme.includes(normExpected) ||
      normExpected.includes(normTheme) ||
      normTopic.includes(normExpected) ||
      normExpected.includes(normTopic);

    if (!matches) {
      return {
        isValid: false,
        reason: `Topic mismatch: expected "${expectedTopic}", got "${q.theme}"`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Retrieve questions strictly filtered by Grade and Theme
 */
export function getQuestionsForThemeAndGrade(
  themeName: string,
  gradeLevel: GradeLevel,
  subject?: SubjectType
): BankQuestion[] {
  const activeGrade: GradeLevel = gradeLevel === 'all' ? 'sd-5' : gradeLevel;
  const normTheme = themeName.toLowerCase().trim();

  // 1. Direct GST map lookup
  if (subject) {
    const directKey = `${activeGrade}::${subject}::${normTheme}`;
    const directMatch = QUESTIONS_BY_GRADE_SUBJECT_THEME.get(directKey);
    if (directMatch && directMatch.length > 0) {
      return [...directMatch];
    }
  }

  // 2. Fuzzy theme search within the specified grade level
  const matches = MASTER_QUESTION_BANK.filter((q) => {
    if (q.gradeLevel !== activeGrade) return false;
    if (subject && q.subject !== subject) return false;
    const qThemeNorm = q.theme.toLowerCase().trim();
    return qThemeNorm === normTheme || qThemeNorm.includes(normTheme) || normTheme.includes(qThemeNorm);
  });

  if (matches.length > 0) {
    return matches;
  }

  // 3. Fallback: search across all themes for this grade that match any word in the theme
  const words = normTheme.split(/\s+/).filter((w) => w.length > 3);
  if (words.length > 0) {
    const fallbackMatches = MASTER_QUESTION_BANK.filter((q) => {
      if (q.gradeLevel !== activeGrade) return false;
      if (subject && q.subject !== subject) return false;
      const qThemeNorm = q.theme.toLowerCase();
      return words.some((w) => qThemeNorm.includes(w));
    });
    if (fallbackMatches.length > 0) {
      return fallbackMatches;
    }
  }

  // 4. Default: Return the first available theme questions for this grade and subject
  const defaultSubject = subject || 'science';
  const defaultKey = `${activeGrade}::${defaultSubject}`;
  const themesForGrade = THEMES_BY_GRADE_SUBJECT.get(defaultKey) || [];
  if (themesForGrade.length > 0) {
    const firstTheme = themesForGrade[0];
    const qKey = `${activeGrade}::${defaultSubject}::${firstTheme.toLowerCase().trim()}`;
    return QUESTIONS_BY_GRADE_SUBJECT_THEME.get(qKey) || [];
  }

  return [];
}
