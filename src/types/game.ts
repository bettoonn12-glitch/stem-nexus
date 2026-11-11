import { SubjectType } from './index';

export type GameGenre =
  | 'shooter'
  | 'basketball'
  | 'soccer'
  | 'rpg'
  | 'adventure'
  | 'puzzle'
  | 'racing'
  | 'classic';

export type GradeLevel =
  | 'all'
  | 'sd-1'
  | 'sd-2'
  | 'sd-3'
  | 'sd-4'
  | 'sd-5'
  | 'sd-6'
  | 'smp-1'
  | 'smp-2'
  | 'smp-3';

export interface GameOption {
  id: string;
  text: string;
  textId?: string;
  isCorrect: boolean;
}

export interface GameQuestion {
  id: string;
  subject: SubjectType;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  genre: GameGenre;
  title: string;
  titleId?: string; // Indonesian title
  question: string;
  questionId?: string; // Indonesian question
  objectiveText: string;
  objectiveTextId?: string;
  options: GameOption[];
  correctIndex: number;
  explanation: string;
  explanationId?: string;
  formula?: string;
  gradeLevel?: GradeLevel | 'sd' | 'smp' | 'all';
  points: number;
}

export interface GameResult {
  questionId: string;
  genre: GameGenre;
  isCorrect: boolean;
  scoreAwarded: number;
  accuracy: number; // percentage (0 - 100)
  timeTakenSec: number;
  combo: number;
}

