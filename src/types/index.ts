export type SubjectType = 'math' | 'science' | 'ict' | 'integrated';

export interface StepExplanation {
  step: string;
  detail: string;
  formula?: string;
}

export interface Challenge {
  id: string;
  subject: SubjectType;
  title: string;
  titleEn?: string;
  titleId?: string;
  subtitle: string;
  subtitleEn?: string;
  subtitleId?: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  points: number;
  scenario: string;
  scenarioEn?: string;
  scenarioId?: string;
  question: string;
  questionEn?: string;
  questionId?: string;
  inputType: 'number' | 'multiple-choice' | 'binary-bits' | 'logic-state';
  unit?: string;
  options?: { id: string; label: string; text: string }[];
  gradeLevel?: 'sd' | 'smp' | 'all';
  correctAnswer: number | string;
  tolerance?: number; // for numeric answers (e.g. +/- 0.5)
  hints: string[];
  explanation: {
    overview: string;
    steps: StepExplanation[];
    keyTakeaway: string;
    realWorldApplication: string;
  };
  interactiveWidgetType?: 
    | 'desalination-ratio'
    | 'battery-drain'
    | 'biomass-growth'
    | 'gear-ratio'
    | 'parallel-circuit'
    | 'ph-neutralization'
    | 'cardiac-oxygen'
    | 'gravity-drop'
    | 'binary-register'
    | 'logic-gates'
    | 'network-latency'
    | 'parity-check'
    | 'integrated-mission';
  metaImage?: string;
}

export interface UserAnswerRecord {
  challengeId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  scoreAwarded: number;
  submittedAt: number;
}

export interface SubjectScoreBreakdown {
  subject: SubjectType;
  label: string;
  current: number;
  max: number;
  percentage: number;
  completedCount: number;
  totalCount: number;
}
