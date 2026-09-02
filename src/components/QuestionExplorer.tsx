import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { CHAPTERS } from '../data/chapters';
import { Question, QuizProgress, ChapterId, QuestionType } from '../types';

interface QuestionExplorerProps {
  progress: QuizProgress;
  onJumpToQuestion: (questionId: number) => void;
  onToggleBookmark: (questionId: number) => void;
  onOpenQuizBuilder?: () => void;
}

export const QuestionExplorer: React.FC<QuestionExplorerProps> = ({
  progress,
  onJumpToQuestion,
  onToggleBookmark,
  onOpenQuizBuilder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      // Chapter filter
      if (selectedChapter !== 'all' && q.chapter !== selectedChapter) {
        return false;
      }
      // Question Type filter
      if (selectedType !== 'all' && q.type !== selectedType) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
      // Status filter
      const answer = progress.answeredQuestions[q.id];
      const isBookmarked = progress.bookmarkedQuestions.includes(q.id);

      if (selectedStatus === 'correct' && (!answer || !answer.isCorrect)) return false;
      if (selectedStatus === 'incorrect' && (!answer || answer.isCorrect)) return false;
      if (selectedStatus === 'unanswered' && answer) return false;
      if (selectedStatus === 'bookmarked' && !isBookmarked) return false;

      // Text query
      if (searchQuery.trim()) {
        const qLower = searchQuery.toLowerCase();
        const matchText = 
          q.question.toLowerCase().includes(qLower) ||
          q.explanation.toLowerCase().includes(qLower) ||
          (q.codeSnippet && q.codeSnippet.toLowerCase().includes(qLower)) ||
          q.tags?.some(tag => tag.toLowerCase().includes(qLower));
        if (!matchText) return false;
      }

      return true;
    });
  }, [searchQuery, selectedChapter, selectedType, selectedDifficulty, selectedStatus, progress]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-500/30">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Comprehensive Curriculum Question Explorer
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 font-bold mt-1">
            Search, filter by chapter & question format, and study in-depth code analyses
          </p>
        </div>
        <div className="flex items-center gap-3">
          {onOpenQuizBuilder && (
            <button
              onClick={onOpenQuizBuilder}
              className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2.5 rounded-2xl shadow-sm transition-all flex items-center space-x-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Configure Custom Quiz</span>
            </button>
          )}
          <div className="text-xs font-black text-slate-900 bg-white px-4 py-2.5 rounded-2xl shadow-sm flex items-center space-x-2">
            <span className="font-extrabold text-indigo-600">{filteredQuestions.length}</span>
            <span>questions matching</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 text-slate-800 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="explorer-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, polymorphism, iterators, binary search, Big-O, Swing EDT, virtual threads, lambda closures..."
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200 px-2.5 py-1 rounded-xl"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Chapter Selector */}
          <div>
            <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5">
              Chapter
            </label>
            <select
              id="filter-chapter"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-600 focus:bg-white"
            >
              <option value="all">All 13 Chapters</option>
              {CHAPTERS.map(ch => (
                <option key={ch.id} value={ch.id}>Ch {ch.number}: {ch.title.split('—')[1] || ch.title}</option>
              ))}
            </select>
          </div>

          {/* Question Type Selector */}
          <div>
            <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5">
              Question Format
            </label>
            <select
              id="filter-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-600 focus:bg-white"
            >
              <option value="all">All Question Types</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="multiple-selection">Multiple Selection</option>
              <option value="true-false">True / False</option>
              <option value="subjective-code">Subjective / Code</option>
            </select>
          </div>

          {/* Difficulty Selector */}
          <div>
            <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5">
              Difficulty
            </label>
            <select
              id="filter-difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-600 focus:bg-white"
            >
              <option value="all">All Difficulties</option>
              <option value="fundamental">Fundamental</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
              <option value="master">Master</option>
            </select>
          </div>

          {/* Status Selector */}
          <div>
            <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1.5">
              Your Status
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-600 focus:bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="unanswered">Unanswered</option>
              <option value="correct">Answered Correct</option>
              <option value="incorrect">Answered Incorrect</option>
              <option value="bookmarked">Bookmarked / Saved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-indigo-100 shadow-xl">
            <Search className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Try adjusting your search query or reset chapter/type filters.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const answer = progress.answeredQuestions[q.id];
            const isBookmarked = progress.bookmarkedQuestions.includes(q.id);
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                id={`explorer-item-${q.id}`}
                className="bg-white border-2 border-slate-100 hover:border-indigo-300 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-md text-slate-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
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

                      {/* Status indicator */}
                      {answer && (
                        answer.isCorrect ? (
                          <span className="flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Incorrect</span>
                          </span>
                        )
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      title={isBookmarked ? "Saved" : "Save question"}
                      className={`p-2 rounded-2xl border transition-colors ${
                        isBookmarked 
                          ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm' 
                          : 'text-slate-400 hover:text-indigo-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-950" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                      title={isExpanded ? "Collapse" : "Expand full details & explanation"}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
                    {/* Code snippet */}
                    {q.codeSnippet && (
                      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-4 text-xs sm:text-sm font-mono text-amber-100 shadow-inner">
                        <code>{q.codeSnippet}</code>
                      </div>
                    )}

                    {/* Options / Solution rendering depending on question type */}
                    {q.type === 'subjective-code' ? (
                      <div className="space-y-2 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                        <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Model Analysis / Solution:</p>
                        <p className="text-xs sm:text-sm font-mono text-slate-800">{q.sampleSolution}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Answer Options:</p>
                        {q.options.map((opt, oIdx) => {
                          const isSingleCorrect = q.type === 'multiple-choice' && oIdx === q.correctAnswer;
                          const isTrueFalseCorrect = q.type === 'true-false' && oIdx === q.correctAnswer;
                          const isMultiCorrect = q.type === 'multiple-selection' && (q.correctAnswers || []).includes(oIdx);
                          const isAnyCorrect = isSingleCorrect || isTrueFalseCorrect || isMultiCorrect;

                          return (
                            <div 
                              key={oIdx}
                              className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm flex items-start space-x-3 ${
                                isAnyCorrect 
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                                  : 'bg-slate-50 border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                                isAnyCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                {['A', 'B', 'C', 'D'][oIdx]}
                              </span>
                              <span className="flex-1 leading-relaxed">{opt}</span>
                              {isAnyCorrect && (
                                <span className="text-xs font-black text-emerald-700 uppercase">
                                  [Correct]
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Deep Explanation */}
                    <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      <span className="font-black text-indigo-950 block mb-1.5 text-sm">
                        Deep Architectural Breakdown:
                      </span>
                      <p>{q.explanation}</p>
                    </div>

                    {/* Jump to interactive quiz button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => onJumpToQuestion(q.id)}
                        className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider shadow-[0px_4px_0px_0px_#b45309] active:translate-y-0.5 active:shadow-none transition-all"
                      >
                        <span>Open in Quiz Mode</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
