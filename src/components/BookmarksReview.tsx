import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkX, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  AlertTriangle
} from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { QuizProgress } from '../types';

interface BookmarksReviewProps {
  progress: QuizProgress;
  onJumpToQuestion: (id: number) => void;
  onRemoveBookmark: (id: number) => void;
  onClearAllBookmarks: () => void;
  onResetIncorrect: () => void;
}

export const BookmarksReview: React.FC<BookmarksReviewProps> = ({
  progress,
  onJumpToQuestion,
  onRemoveBookmark,
  onClearAllBookmarks,
  onResetIncorrect
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'missed'>('bookmarks');

  const bookmarkedQuestions = ALL_QUESTIONS.filter(q => 
    progress.bookmarkedQuestions.includes(q.id)
  );

  const missedQuestions = ALL_QUESTIONS.filter(q => {
    const answer = progress.answeredQuestions[q.id];
    return answer && !answer.isCorrect;
  });

  const activeList = activeTab === 'bookmarks' ? bookmarkedQuestions : missedQuestions;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-500/30">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Review Notebook & Saved Questions
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 font-bold mt-1">
            Revisit challenging questions, review misconceptions, and solidify deep Java knowledge
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1.5 bg-indigo-950/40 rounded-2xl border border-indigo-500/30 self-start sm:self-auto text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-400 text-amber-950 font-black shadow-sm'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Questions ({bookmarkedQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('missed')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'missed'
                ? 'bg-rose-500 text-white font-black shadow-sm'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Mistakes Notebook ({missedQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-indigo-100 uppercase tracking-wider">
          Showing {activeList.length} {activeTab === 'bookmarks' ? 'saved questions' : 'incorrect answers'}
        </div>

        {activeTab === 'bookmarks' && bookmarkedQuestions.length > 0 && (
          <button
            onClick={onClearAllBookmarks}
            className="text-xs font-bold text-rose-200 hover:text-white px-4 py-2 rounded-2xl bg-rose-500/30 hover:bg-rose-500/50 border border-rose-400/40 transition-colors"
          >
            Clear All Bookmarks
          </button>
        )}

        {activeTab === 'missed' && missedQuestions.length > 0 && (
          <button
            onClick={onResetIncorrect}
            className="flex items-center space-x-1.5 text-xs font-bold text-amber-950 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 shadow-[0px_3px_0px_0px_#b45309] active:translate-y-0.5 active:shadow-none transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Mistakes for Re-practice</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-4">
        {activeList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-indigo-100 shadow-xl text-slate-800">
            {activeTab === 'bookmarks' ? (
              <>
                <Bookmark className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">No saved questions yet</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Click the bookmark icon on any question card during your practice session to save it here for review.
                </p>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">Clean slate — No missed questions!</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Any questions you answer incorrectly will automatically appear here for targeted practice.
                </p>
              </>
            )}
          </div>
        ) : (
          activeList.map((q) => {
            return (
              <div
                key={q.id}
                className="bg-white border-2 border-slate-100 hover:border-indigo-300 rounded-3xl p-6 sm:p-8 shadow-xl text-slate-800 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                      #{q.id}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      {q.chapterTitle}
                    </span>
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      {q.type}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {activeTab === 'bookmarks' && (
                      <button
                        onClick={() => onRemoveBookmark(q.id)}
                        className="p-2 rounded-2xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove bookmark"
                      >
                        <BookmarkX className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => onJumpToQuestion(q.id)}
                      className="flex items-center space-x-1.5 px-5 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider shadow-[0px_3px_0px_0px_#b45309] active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <span>Practice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {q.question}
                </h3>

                {q.codeSnippet && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-amber-100 overflow-x-auto shadow-inner">
                    <code>{q.codeSnippet}</code>
                  </div>
                )}

                {/* Solution display */}
                {q.type === 'subjective-code' ? (
                  <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-xs sm:text-sm text-indigo-950 font-mono">
                    <span className="font-black text-indigo-900 mr-2 uppercase block mb-1">
                      Model Solution:
                    </span>
                    {q.sampleSolution}
                  </div>
                ) : q.type === 'multiple-selection' ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs sm:text-sm text-emerald-950 font-bold space-y-1">
                    <span className="font-black text-emerald-700 mr-2 uppercase block">
                      Correct Options:
                    </span>
                    {(q.correctAnswers || []).map(idx => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-700">✓</span>
                        <span>{q.options[idx]}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs sm:text-sm text-emerald-950 font-bold">
                    <span className="font-black text-emerald-700 mr-2 uppercase">
                      Correct Answer {q.type === 'multiple-choice' ? `[${['A', 'B', 'C', 'D'][q.correctAnswer || 0]}]:` : ':'}
                    </span>
                    {q.options[q.correctAnswer || 0]}
                  </div>
                )}

                {/* Explanation */}
                <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <span className="font-black text-indigo-950 block mb-1 text-sm">
                    Deep Architectural Breakdown:
                  </span>
                  <p>{q.explanation}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
