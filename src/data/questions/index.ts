import { Question, ChapterId, QuestionType } from '../../types';
import { ALL_CURRICULUM_QUESTIONS } from './curriculumQuestions';
import { advancedConceptsQuestions } from './advancedConceptsQuestions';
import { concurrencyQuestions } from './concurrency';
import { jvmInternalsQuestions } from './jvmInternals';
import { genericsQuestions } from './genericsTypeSystem';
import { collectionsQuestions } from './collectionsInternals';
import { memoryQuestions } from './memoryManagement';
import { modernJavaQuestions } from './modernJavaFeatures';
import { nioQuestions } from './nioAndIO';
import { reflectionQuestions } from './reflectionBytecode';
import { functionalQuestions } from './functionalStreams';
import { patternsPerformanceQuestions } from './patternsAndPerformance';

// Map legacy bank questions into our 13-chapter taxonomy so the total bank has hundreds of questions
const legacyMappedQuestions: Question[] = [
  ...concurrencyQuestions.map((q, idx) => ({
    ...q,
    id: 200 + idx,
    chapter: 'chapter-12' as ChapterId,
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Concurrency', 'Threads']
  })),
  ...jvmInternalsQuestions.map((q, idx) => ({
    ...q,
    id: 250 + idx,
    chapter: 'chapter-2' as ChapterId,
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['JVM', 'Classloader']
  })),
  ...genericsQuestions.map((q, idx) => ({
    ...q,
    id: 300 + idx,
    chapter: 'chapter-1' as ChapterId,
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Generics', 'Type System']
  })),
  ...collectionsQuestions.map((q, idx) => ({
    ...q,
    id: 350 + idx,
    chapter: 'chapter-3' as ChapterId,
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Collections', 'Data Structures']
  })),
  ...memoryQuestions.map((q, idx) => ({
    ...q,
    id: 400 + idx,
    chapter: 'chapter-9' as ChapterId,
    chapterNumber: 9,
    chapterTitle: 'Chapter 9 — Exception Handling & Robustness',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Memory', 'Garbage Collection']
  })),
  ...modernJavaQuestions.map((q, idx) => ({
    ...q,
    id: 450 + idx,
    chapter: 'chapter-12' as ChapterId,
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Modern Java', 'Pattern Matching']
  })),
  ...nioQuestions.map((q, idx) => ({
    ...q,
    id: 500 + idx,
    chapter: 'chapter-8' as ChapterId,
    chapterNumber: 8,
    chapterTitle: 'Chapter 8 — Event-Driven Programming Fundamentals',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['NIO', 'Event Loops']
  })),
  ...reflectionQuestions.map((q, idx) => ({
    ...q,
    id: 550 + idx,
    chapter: 'chapter-2' as ChapterId,
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Reflection', 'Modularity']
  })),
  ...functionalQuestions.map((q, idx) => ({
    ...q,
    id: 600 + idx,
    chapter: 'chapter-12' as ChapterId,
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Functional', 'Streams']
  })),
  ...patternsPerformanceQuestions.map((q, idx) => ({
    ...q,
    id: 650 + idx,
    chapter: 'chapter-13' as ChapterId,
    chapterNumber: 13,
    chapterTitle: 'Chapter 13 — Project Planning & Software Design',
    type: 'multiple-choice' as QuestionType,
    tags: q.tags || ['Design Patterns', 'Architecture']
  }))
];

export const ALL_QUESTIONS: Question[] = [
  ...ALL_CURRICULUM_QUESTIONS,
  ...advancedConceptsQuestions,
  ...legacyMappedQuestions
];

export function getQuestionsByChapter(chapterId: string): Question[] {
  if (chapterId === 'all') {
    return ALL_QUESTIONS;
  }
  return ALL_QUESTIONS.filter(q => q.chapter === chapterId);
}

// Backward compatibility alias
export const getQuestionsByCategory = getQuestionsByChapter;

export function getQuestionsByType(type: QuestionType): Question[] {
  return ALL_QUESTIONS.filter(q => q.type === type);
}

export function filterQuestions(
  chapterIds: ChapterId[],
  types: QuestionType[],
  limit?: number
): Question[] {
  let list = ALL_QUESTIONS.filter(q => 
    (chapterIds.length === 0 || chapterIds.includes(q.chapter as ChapterId)) &&
    (types.length === 0 || (q.type && types.includes(q.type)))
  );

  if (limit && limit > 0 && limit < list.length) {
    // Shuffle and pick limit
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  return list;
}

export function getQuestionById(id: number): Question | undefined {
  return ALL_QUESTIONS.find(q => q.id === id);
}

export function searchQuestions(
  query: string, 
  chapterId?: string, 
  type?: string,
  difficulty?: string
): Question[] {
  let list = chapterId && chapterId !== 'all' ? getQuestionsByChapter(chapterId) : ALL_QUESTIONS;
  
  if (type && type !== 'all') {
    list = list.filter(q => q.type === type);
  }

  if (difficulty && difficulty !== 'all') {
    list = list.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  if (!query.trim()) {
    return list;
  }

  const qLower = query.toLowerCase();
  return list.filter(q => 
    q.question.toLowerCase().includes(qLower) ||
    q.explanation.toLowerCase().includes(qLower) ||
    (q.codeSnippet && q.codeSnippet.toLowerCase().includes(qLower)) ||
    q.tags?.some(tag => tag.toLowerCase().includes(qLower))
  );
}
