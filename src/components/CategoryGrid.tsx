import React from 'react';
import { 
  Cpu, 
  Layers, 
  Code2, 
  Boxes, 
  HardDrive, 
  Sparkles, 
  Network, 
  Binary, 
  Workflow, 
  Gauge, 
  ArrowRight, 
  CheckCircle2, 
  Play,
  Zap,
  BookOpen,
  SlidersHorizontal,
  Search,
  Check,
  CheckSquare,
  Square,
  HelpCircle,
  Terminal,
  FileCode2
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { ALL_QUESTIONS } from '../data/questions';
import { QuizProgress, UserAnswerState, ChapterId, QuestionType } from '../types';
import { ChapterPerformanceChart } from './ChapterPerformanceChart';

interface CategoryGridProps {
  onSelectChapter: (chapterId: ChapterId) => void;
  onSelectType?: (type: QuestionType) => void;
  onOpenQuizBuilder: () => void;
  onStartMarathon: () => void;
  progress: QuizProgress;
}

const QUESTION_FORMATS: {
  id: QuestionType;
  title: string;
  badge: string;
  badgeBg: string;
  description: string;
  icon: React.ReactNode;
  borderHover: string;
}[] = [
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    badge: 'Single Selection',
    badgeBg: 'bg-indigo-100 text-indigo-800',
    description: 'Classic 4-option questions with immediate option validation and bytecode explanations.',
    icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
    borderHover: 'hover:border-indigo-500'
  },
  {
    id: 'multiple-selection',
    title: 'Multiple Selection',
    badge: 'Select All That Apply',
    badgeBg: 'bg-teal-100 text-teal-800',
    description: 'Checkboxes for multiple valid statements, edge cases, and JVM language rules.',
    icon: <CheckSquare className="w-5 h-5 text-teal-600" />,
    borderHover: 'hover:border-teal-500'
  },
  {
    id: 'true-false',
    title: 'True / False',
    badge: 'Binary Invariants',
    badgeBg: 'bg-violet-100 text-violet-800',
    description: 'Test conceptual invariants, memory model guarantees, and specification truths.',
    icon: <HelpCircle className="w-5 h-5 text-violet-600" />,
    borderHover: 'hover:border-violet-500'
  },
  {
    id: 'subjective-code',
    title: 'Subjective & Codes',
    badge: 'Code Tracing & Output',
    badgeBg: 'bg-rose-100 text-rose-800',
    description: 'Predict code outputs, diagnose race conditions, and compare with model answers.',
    icon: <Terminal className="w-5 h-5 text-rose-600" />,
    borderHover: 'hover:border-rose-500'
  }
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectChapter,
  onSelectType,
  onOpenQuizBuilder,
  onStartMarathon,
  progress
}) => {
  const totalAnswered = Object.keys(progress.answeredQuestions).length;
  const totalCorrect = (Object.values(progress.answeredQuestions) as UserAnswerState[]).filter(a => a.isCorrect).length;
  const globalAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Curriculum Banner */}
      <div 
        id="curriculum-hero-card"
        className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white border border-indigo-100 p-8 sm:p-12 shadow-2xl text-slate-800"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Complete 13-Chapter Advanced Java Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Advanced Programming Concepts in Java
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Explore 13 structured curriculum chapters with 4 specialized question types: Multiple Choice, Multiple Selection, True/False, and Subjective & Codes with instant verification and deep architectural breakdowns.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              id="btn-open-quiz-builder"
              onClick={onOpenQuizBuilder}
              className="flex items-center space-x-2.5 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-base uppercase tracking-wider shadow-[0px_5px_0px_0px_#b45309] active:translate-y-1 active:shadow-none transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-950" />
              <span>Configure Custom Quiz / Exam</span>
            </button>

            <button
              id="btn-start-marathon"
              onClick={onStartMarathon}
              className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-sm border border-indigo-200 transition-all shadow-sm"
            >
              <Play className="w-4 h-4 fill-indigo-700" />
              <span>Practice All Questions ({ALL_QUESTIONS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Performance Recharts Visualizer */}
      <ChapterPerformanceChart progress={progress} />

      {/* 4 QUESTION TYPES SECTION */}
      <section id="section-practice-by-type" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-black text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Question Format Modes</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Practice by Question Type
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium">
            Target specific assessment styles across all chapters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUESTION_FORMATS.map((fmt) => {
            const count = ALL_QUESTIONS.filter(q => q.type === fmt.id).length;
            return (
              <div
                key={fmt.id}
                id={`card-type-${fmt.id}`}
                onClick={() => onSelectType && onSelectType(fmt.id)}
                className={`group bg-white hover:bg-slate-50 border-4 border-slate-100 ${fmt.borderHover} rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xl flex flex-col justify-between text-slate-800`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                      {fmt.icon}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${fmt.badgeBg}`}>
                      {fmt.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {fmt.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                    {fmt.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-600 group-hover:text-indigo-800">
                  <span>{count} Questions Available</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chapters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-indigo-500/30">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Curriculum Chapters
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 font-bold mt-1">
            Choose any of the 13 chapters to practice all question types within that topic
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenQuizBuilder}
            className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize Question Types & Chapters</span>
          </button>
        </div>
      </div>

      {/* 13 Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CHAPTERS.map((chapter) => {
          const chapterQuestions = ALL_QUESTIONS.filter(q => q.chapter === chapter.id);
          const totalQ = chapterQuestions.length || chapter.totalQuestions;

          return (
            <div
              key={chapter.id}
              id={`chapter-card-${chapter.id}`}
              onClick={() => onSelectChapter(chapter.id as ChapterId)}
              className="group bg-white hover:bg-slate-50 border-4 border-slate-100 hover:border-indigo-400 rounded-3xl p-6 transition-all duration-200 cursor-pointer shadow-xl flex flex-col justify-between text-slate-800"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {chapter.number}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                    Chapter {chapter.number} • {totalQ} Qs
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug">
                  {chapter.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                  {chapter.subtitle}
                </p>

                {/* Topics preview tags */}
                {chapter.topics && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {chapter.topics.slice(0, 3).map((topic, tIdx) => (
                      <span 
                        key={tIdx}
                        className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                    {chapter.topics.length > 3 && (
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md">
                        +{chapter.topics.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-700 group-hover:text-indigo-900">
                <span>Start Chapter {chapter.number}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
