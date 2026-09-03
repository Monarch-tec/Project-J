export type ChapterId =
  | 'chapter-1'
  | 'chapter-2'
  | 'chapter-3'
  | 'chapter-4'
  | 'chapter-5'
  | 'chapter-6'
  | 'chapter-7'
  | 'chapter-8'
  | 'chapter-9'
  | 'chapter-10'
  | 'chapter-11'
  | 'chapter-12'
  | 'chapter-13'
  | 'chapter-14';

export type QuestionType = 
  | 'multiple-choice' 
  | 'multiple-selection' 
  | 'true-false' 
  | 'subjective-code';

export type DifficultyLevel = 
  | 'Fundamental' 
  | 'Intermediate' 
  | 'Advanced' 
  | 'Master' 
  | 'Expert' 
  | 'Senior' 
  | 'Staff';

export interface Question {
  id: number;
  chapter?: ChapterId | string;
  chapterNumber?: number;
  chapterTitle?: string;
  category?: string;
  categoryTitle?: string;
  type?: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options: string[]; // Options for single, multiple selection, or True/False
  correctAnswer?: number; // 0-indexed for single choice & True/False
  correctAnswers?: number[]; // Array of indices for multiple selection
  sampleSolution?: string; // For subjective / code analysis questions
  explanation: string;
  tags?: string[];
}

export interface ChapterMeta {
  id: ChapterId | string;
  number?: number;
  chapterNumber?: number;
  title: string;
  subtitle?: string;
  description: string;
  iconName?: string;
  icon?: string;
  totalQuestions: number;
  color?: string;
  topics?: string[];
}

export type CategoryMeta = ChapterMeta;

export interface UserAnswerState {
  questionId: number;
  selectedOption?: number;
  selectedOptions?: number[];
  subjectiveResponse?: string;
  isCorrect: boolean;
  answeredAt: number;
}

export interface ChapterStat {
  answered: number;
  correct: number;
}

export interface QuizProgress {
  answeredQuestions: Record<number, UserAnswerState>;
  bookmarkedQuestions: number[];
  chapterStats?: Record<string, ChapterStat>;
  categoryStats: Record<string, ChapterStat>;
  streak: number;
  bestStreak: number;
  lastPlayedTimestamp: number;
}

export type AppMode = 'builder' | 'categories' | 'chapters' | 'quiz' | 'exam' | 'explorer' | 'review' | 'study-notes';

export interface CustomQuizConfig {
  selectedChapters: ChapterId[];
  selectedTypes: QuestionType[];
  questionCount: number;
  timeLimitMinutes: number; // 0 = untimed
  instantFeedback: boolean;
}

export interface TopicInterviewQA {
  question: string;
  answer: string;
}

export interface StudyTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  codeExample?: string;
  codeExample2?: string;
  codeExplanation?: string;
  pitfalls?: string[];
  complexity?: string;
  deepDiveNotes?: string[];
  architectureDiagram?: string;
  realWorldScenario?: string;
  interviewQnA?: TopicInterviewQA[];
  tags?: string[];
}

export interface ChapterStudyGuide {
  chapterId: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  overview: string;
  coreConcepts: StudyTopic[];
  examTips: string[];
  quickSummaryChecklist: string[];
}
