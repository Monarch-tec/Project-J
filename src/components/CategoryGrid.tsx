import React from 'react';
import { motion } from 'motion/react';
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
  FileCode2,
  FileText,
  Download
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
  onOpenStudyNotes?: () => void;
  onOpenFullNote?: () => void;
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
  onOpenStudyNotes,
  onOpenFullNote,
  progress
}) => {
  const totalAnswered = Object.keys(progress.answeredQuestions).length;
  const totalCorrect = (Object.values(progress.answeredQuestions) as UserAnswerState[]).filter(a => a.isCorrect).length;
  const globalAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Hero Curriculum Banner */}
      <motion.div 
        id="curriculum-hero-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-white border border-indigo-100 p-8 sm:p-12 shadow-2xl text-slate-800"
      >
        {/* Dynamic floating ambient lights */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -15, 0],
            y: [0, 12, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-1/4 -mb-16 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Complete 13-Chapter Advanced Java Curriculum</span>
          </motion.div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Advanced Programming Concepts in Java
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Explore 13 structured curriculum chapters with 4 specialized question types: Multiple Choice, Multiple Selection, True/False, and Subjective & Codes with instant verification and deep architectural breakdowns.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              id="btn-open-quiz-builder"
              onClick={onOpenQuizBuilder}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-2.5 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-base uppercase tracking-wider shadow-[0px_5px_0px_0px_#b45309] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-950" />
              <span>Configure Custom Quiz / Exam</span>
            </motion.button>

            <motion.button
              id="btn-start-marathon"
              onClick={onStartMarathon}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-sm border border-indigo-200 transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-indigo-700" />
              <span>Practice All Questions ({ALL_QUESTIONS.length})</span>
            </motion.button>

            {onOpenFullNote && (
              <motion.button
                id="btn-open-full-note-hero"
                onClick={onOpenFullNote}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-md cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Full Note [1–111]</span>
              </motion.button>
            )}

            {onOpenStudyNotes && (
              <motion.button
                id="btn-open-study-notes"
                onClick={onOpenStudyNotes}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm transition-all shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>Chapter Notes</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

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
          {QUESTION_FORMATS.map((fmt, idx) => {
            const count = ALL_QUESTIONS.filter(q => q.type === fmt.id).length;
            return (
              <motion.div
                key={fmt.id}
                id={`card-type-${fmt.id}`}
                onClick={() => onSelectType && onSelectType(fmt.id)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group bg-white hover:bg-slate-50 border-4 border-slate-100 ${fmt.borderHover} rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xl flex flex-col justify-between text-slate-800`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
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
          <motion.button
            onClick={onOpenQuizBuilder}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize Question Types & Chapters</span>
          </motion.button>
        </div>
      </div>

      {/* 13 Chapters Grid with Dynamic Progress Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CHAPTERS.map((chapter, i) => {
          const chapterQuestions = ALL_QUESTIONS.filter(q => q.chapter === chapter.id);
          const totalQ = chapterQuestions.length || chapter.totalQuestions;

          // Compute answered count for this specific chapter
          const answeredInChapter = chapterQuestions.filter(q => progress.answeredQuestions[q.id]);
          const answeredCount = answeredInChapter.length;
          const correctInChapter = answeredInChapter.filter(q => progress.answeredQuestions[q.id]?.isCorrect).length;
          const chapterProgressPercent = totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;

          return (
            <motion.div
              key={chapter.id}
              id={`chapter-card-${chapter.id}`}
              onClick={() => onSelectChapter(chapter.id as ChapterId)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
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

              {/* Dynamic Chapter Progress Bar */}
              <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>{answeredCount > 0 ? `${answeredCount}/${totalQ} Answered` : 'Not Started'}</span>
                  {answeredCount > 0 && (
                    <span className="text-emerald-600 font-black">
                      {Math.round((correctInChapter / answeredCount) * 100)}% Acc
                    </span>
                  )}
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full transition-all ${
                      chapterProgressPercent === 100 
                        ? 'bg-emerald-500' 
                        : 'bg-gradient-to-r from-indigo-500 to-amber-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${chapterProgressPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                {/* Card Action Link */}
                <div className="pt-1 flex items-center justify-between text-xs font-black text-indigo-700 group-hover:text-indigo-900">
                  <span>Start Chapter {chapter.number}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
