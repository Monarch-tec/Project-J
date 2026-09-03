import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Filter, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  Grid, 
  ChevronRight,
  Shuffle
} from 'lucide-react';
import { Question, QuizProgress } from '../types';

interface QuestionNavProps {
  questions: Question[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  progress: QuizProgress;
  onShuffle?: () => void;
}

export const QuestionNav: React.FC<QuestionNavProps> = ({
  questions,
  currentIndex,
  onSelectIndex,
  progress,
  onShuffle
}) => {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'incorrect' | 'bookmarked'>('all');

  const filteredQuestions = questions.map((q, idx) => ({ q, originalIndex: idx })).filter(({ q }) => {
    const answer = progress.answeredQuestions[q.id];
    const isBookmarked = progress.bookmarkedQuestions.includes(q.id);

    if (filter === 'unanswered') return !answer;
    if (filter === 'incorrect') return answer && !answer.isCorrect;
    if (filter === 'bookmarked') return isBookmarked;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 text-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-indigo-600" />
          <h3 className="font-black text-slate-900 text-base">
            Question Map ({questions.length})
          </h3>
        </div>

        {onShuffle && (
          <motion.button
            onClick={onShuffle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Shuffle questions order"
            className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors shadow-sm cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shuffle</span>
          </motion.button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 py-3.5 border-b border-slate-100 overflow-x-auto text-xs font-bold scrollbar-none">
        {(['all', 'unanswered', 'incorrect', 'bookmarked'] as const).map((mode) => {
          const labels: Record<string, string> = {
            all: `All (${questions.length})`,
            unanswered: 'Unanswered',
            incorrect: 'Incorrect',
            bookmarked: 'Saved'
          };
          const isActive = filter === mode;
          return (
            <motion.button
              key={mode}
              onClick={() => setFilter(mode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-amber-400 text-amber-950 font-black shadow-sm' 
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              {labels[mode]}
            </motion.button>
          );
        })}
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 mt-4 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
        {filteredQuestions.map(({ q, originalIndex }) => {
          const answer = progress.answeredQuestions[q.id];
          const isCurrent = originalIndex === currentIndex;
          const isBookmarked = progress.bookmarkedQuestions.includes(q.id);

          let cellClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-indigo-100 hover:text-indigo-900 font-bold';

          if (answer) {
            if (answer.isCorrect) {
              cellClass = 'bg-emerald-500 text-white font-black border-emerald-600 shadow-sm';
            } else {
              cellClass = 'bg-rose-500 text-white font-black border-rose-600 shadow-sm';
            }
          }

          if (isCurrent) {
            cellClass += ' ring-4 ring-indigo-600 font-black scale-105';
          }

          return (
            <motion.button
              key={q.id}
              id={`nav-grid-btn-${q.id}`}
              onClick={() => onSelectIndex(originalIndex)}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className={`h-9 rounded-xl border text-xs font-bold flex items-center justify-center relative transition-colors cursor-pointer ${cellClass}`}
            >
              <span>{originalIndex + 1}</span>
              {isBookmarked && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-white" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Grid Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs font-bold text-slate-500 pt-4 mt-4 border-t border-slate-100 gap-2">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Correct</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span>Incorrect</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-200" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Saved</span>
        </div>
      </div>
    </div>
  );
};
