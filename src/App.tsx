import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ALL_QUESTIONS, 
  getQuestionsByChapter, 
  filterQuestions,
  getQuestionById 
} from './data/questions';
import { CHAPTERS } from './data/chapters';
import { AppMode, Question, QuizProgress, UserAnswerState, ChapterId, QuestionType, CustomQuizConfig } from './types';
import { Navbar } from './components/Navbar';
import { CategoryGrid } from './components/CategoryGrid';
import { QuizBuilder } from './components/QuizBuilder';
import { QuizCard } from './components/QuizCard';
import { QuestionNav } from './components/QuestionNav';
import { QuestionExplorer } from './components/QuestionExplorer';
import { ExamMode } from './components/ExamMode';
import { BookmarksReview } from './components/BookmarksReview';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DataManagementModal } from './components/DataManagementModal';
import { StudyNotesView } from './components/StudyNotesView';
import { 
  ChevronLeft, 
  Sparkles, 
  SlidersHorizontal,
  Layers,
  BookOpen
} from 'lucide-react';

const STORAGE_KEY = 'javamaster400_progress_v2';

const initialProgress: QuizProgress = {
  answeredQuestions: {},
  bookmarkedQuestions: [],
  categoryStats: {},
  streak: 0,
  bestStreak: 0,
  lastPlayedTimestamp: Date.now()
};

export const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('categories');
  const [activeChapter, setActiveChapter] = useState<string>('all'); // 'all' or ChapterId
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [customQuestionsList, setCustomQuestionsList] = useState<Question[] | null>(null);
  const [customConfig, setCustomConfig] = useState<CustomQuizConfig | null>(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState<boolean>(false);
  
  // Persistent Progress state
  const [progress, setProgress] = useState<QuizProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return initialProgress;
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Current active questions list
  const currentQuestions = useMemo(() => {
    if (customQuestionsList && customQuestionsList.length > 0) {
      return customQuestionsList;
    }
    if (activeChapter === 'all') {
      return ALL_QUESTIONS;
    }
    return getQuestionsByChapter(activeChapter);
  }, [activeChapter, customQuestionsList]);

  // Safe active question
  const currentQuestion = currentQuestions[activeQuestionIndex] || currentQuestions[0] || ALL_QUESTIONS[0];

  // Handle single choice / True-False answer selection
  const handleSelectAnswer = useCallback((optionIndex: number) => {
    if (!currentQuestion) return;

    const qId = currentQuestion.id;
    if (progress.answeredQuestions[qId]) return;

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const catId = currentQuestion.chapter || 'chapter-1';

    setProgress(prev => {
      const newAnswer: UserAnswerState = {
        questionId: qId,
        selectedOption: optionIndex,
        isCorrect,
        answeredAt: Date.now()
      };

      const newAnswered = {
        ...prev.answeredQuestions,
        [qId]: newAnswer
      };

      const currentCatStats = prev.categoryStats[catId] || { answered: 0, correct: 0 };
      const newCatStats = {
        ...prev.categoryStats,
        [catId]: {
          answered: currentCatStats.answered + 1,
          correct: currentCatStats.correct + (isCorrect ? 1 : 0)
        }
      };

      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const bestStreak = Math.max(newStreak, prev.bestStreak);

      return {
        ...prev,
        answeredQuestions: newAnswered,
        categoryStats: newCatStats,
        streak: newStreak,
        bestStreak,
        lastPlayedTimestamp: Date.now()
      };
    });
  }, [currentQuestion, progress.answeredQuestions]);

  // Handle multiple selection submit
  const handleSelectMultipleAnswers = useCallback((selectedIndices: number[]) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    if (progress.answeredQuestions[qId]) return;

    const correct = currentQuestion.correctAnswers || [];
    // Check if sorted arrays match exactly
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedCorrect = [...correct].sort((a, b) => a - b);
    const isCorrect = sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, index) => val === sortedCorrect[index]);

    const catId = currentQuestion.chapter || 'chapter-1';

    setProgress(prev => {
      const newAnswer: UserAnswerState = {
        questionId: qId,
        selectedOptions: selectedIndices,
        isCorrect,
        answeredAt: Date.now()
      };

      const newAnswered = {
        ...prev.answeredQuestions,
        [qId]: newAnswer
      };

      const currentCatStats = prev.categoryStats[catId] || { answered: 0, correct: 0 };
      const newCatStats = {
        ...prev.categoryStats,
        [catId]: {
          answered: currentCatStats.answered + 1,
          correct: currentCatStats.correct + (isCorrect ? 1 : 0)
        }
      };

      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const bestStreak = Math.max(newStreak, prev.bestStreak);

      return {
        ...prev,
        answeredQuestions: newAnswered,
        categoryStats: newCatStats,
        streak: newStreak,
        bestStreak,
        lastPlayedTimestamp: Date.now()
      };
    });
  }, [currentQuestion, progress.answeredQuestions]);

  // Handle subjective self-grade submission
  const handleSubmitSubjectiveGrade = useCallback((isCorrect: boolean, responseText?: string) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    if (progress.answeredQuestions[qId]) return;

    const catId = currentQuestion.chapter || 'chapter-1';

    setProgress(prev => {
      const newAnswer: UserAnswerState = {
        questionId: qId,
        subjectiveResponse: responseText,
        isCorrect,
        answeredAt: Date.now()
      };

      const newAnswered = {
        ...prev.answeredQuestions,
        [qId]: newAnswer
      };

      const currentCatStats = prev.categoryStats[catId] || { answered: 0, correct: 0 };
      const newCatStats = {
        ...prev.categoryStats,
        [catId]: {
          answered: currentCatStats.answered + 1,
          correct: currentCatStats.correct + (isCorrect ? 1 : 0)
        }
      };

      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const bestStreak = Math.max(newStreak, prev.bestStreak);

      return {
        ...prev,
        answeredQuestions: newAnswered,
        categoryStats: newCatStats,
        streak: newStreak,
        bestStreak,
        lastPlayedTimestamp: Date.now()
      };
    });
  }, [currentQuestion, progress.answeredQuestions]);

  // Reset answer for current question to allow retry
  const handleResetCurrentQuestion = useCallback(() => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    const existing = progress.answeredQuestions[qId];
    if (!existing) return;

    const catId = currentQuestion.chapter || 'chapter-1';

    setProgress(prev => {
      const newAnswered = { ...prev.answeredQuestions };
      delete newAnswered[qId];

      const currentCatStats = prev.categoryStats[catId] || { answered: 1, correct: 0 };
      const newCatStats = {
        ...prev.categoryStats,
        [catId]: {
          answered: Math.max(0, currentCatStats.answered - 1),
          correct: Math.max(0, currentCatStats.correct - (existing.isCorrect ? 1 : 0))
        }
      };

      return {
        ...prev,
        answeredQuestions: newAnswered,
        categoryStats: newCatStats
      };
    });
  }, [currentQuestion, progress.answeredQuestions]);

  // Toggle Bookmark
  const handleToggleBookmark = useCallback((qId?: number) => {
    const targetId = qId || currentQuestion?.id;
    if (!targetId) return;

    setProgress(prev => {
      const isBookmarked = prev.bookmarkedQuestions.includes(targetId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedQuestions.filter(id => id !== targetId)
        : [...prev.bookmarkedQuestions, targetId];

      return {
        ...prev,
        bookmarkedQuestions: newBookmarks
      };
    });
  }, [currentQuestion]);

  // Reset all progress
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all quiz progress, answers, and streaks? Bookmarks will be preserved.')) {
      setProgress(prev => ({
        ...initialProgress,
        bookmarkedQuestions: prev.bookmarkedQuestions
      }));
    }
  };

  // Chapter selection handler
  const handleSelectChapter = (chapterId: ChapterId) => {
    setActiveChapter(chapterId);
    setCustomQuestionsList(null);
    setCustomConfig(null);
    setActiveQuestionIndex(0);
    setMode('quiz');
  };

  // Custom Quiz launcher from Builder
  const handleStartCustomQuiz = (config: CustomQuizConfig) => {
    const questions = filterQuestions(
      config.selectedChapters,
      config.selectedTypes,
      config.questionCount
    );
    setCustomQuestionsList(questions);
    setCustomConfig(config);
    setActiveChapter('custom');
    setActiveQuestionIndex(0);
    setMode('quiz');
  };

  // Marathon launcher
  const handleStartMarathon = () => {
    setActiveChapter('all');
    setCustomQuestionsList(null);
    setCustomConfig(null);
    setActiveQuestionIndex(0);
    setMode('quiz');
  };

  // Direct Question Type launcher (Multiple choice, Multiple selection, True/False, Subjective & codes)
  const handleSelectQuestionType = (type: QuestionType) => {
    const questions = ALL_QUESTIONS.filter(q => q.type === type);
    setCustomQuestionsList(questions);
    setCustomConfig({
      selectedChapters: CHAPTERS.map(c => c.id as ChapterId),
      selectedTypes: [type],
      questionCount: questions.length,
      timeLimitMinutes: 0,
      instantFeedback: true
    });
    setActiveChapter('custom');
    setActiveQuestionIndex(0);
    setMode('quiz');
  };

  // Jump to specific question from Explorer or Review
  const handleJumpToQuestion = (qId: number) => {
    setActiveChapter('all');
    setCustomQuestionsList(null);
    setCustomConfig(null);
    const index = ALL_QUESTIONS.findIndex(q => q.id === qId);
    if (index !== -1) {
      setActiveQuestionIndex(index);
    }
    setMode('quiz');
  };

  // Shuffle questions
  const handleShuffleCurrent = () => {
    const base = customQuestionsList || (activeChapter === 'all' ? ALL_QUESTIONS : getQuestionsByChapter(activeChapter));
    const shuffled = [...base].sort(() => 0.5 - Math.random());
    setCustomQuestionsList(shuffled);
    setActiveQuestionIndex(0);
  };

  // Keyboard Navigation (A, B, C, D, Left Arrow, Right Arrow)
  useEffect(() => {
    if (mode !== 'quiz') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'j') {
        if (activeQuestionIndex < currentQuestions.length - 1) {
          setActiveQuestionIndex(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        if (activeQuestionIndex > 0) {
          setActiveQuestionIndex(prev => prev - 1);
        }
      } else if (currentQuestion?.type === 'multiple-choice') {
        if (['1', 'a', 'A'].includes(e.key)) {
          handleSelectAnswer(0);
        } else if (['2', 'b', 'B'].includes(e.key)) {
          handleSelectAnswer(1);
        } else if (['3', 'c', 'C'].includes(e.key)) {
          handleSelectAnswer(2);
        } else if (['4', 'd', 'D'].includes(e.key)) {
          handleSelectAnswer(3);
        }
      } else if (currentQuestion?.type === 'true-false') {
        if (['t', 'T', '1'].includes(e.key)) {
          handleSelectAnswer(0);
        } else if (['f', 'F', '2'].includes(e.key)) {
          handleSelectAnswer(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, activeQuestionIndex, currentQuestions.length, currentQuestion, handleSelectAnswer]);

  return (
    <div className="min-h-screen bg-indigo-600 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-amber-950">
      {/* Top Sticky Navbar */}
      <Navbar
        currentMode={mode}
        setMode={setMode}
        progress={progress}
        totalQuestions={ALL_QUESTIONS.length}
        onResetProgress={handleResetProgress}
        bookmarkedCount={progress.bookmarkedQuestions.length}
        onOpenDataManagement={() => setIsDataModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* MODE 1: Categories / Chapters Overview */}
        {mode === 'categories' && (
          <CategoryGrid
            onSelectChapter={handleSelectChapter}
            onSelectType={handleSelectQuestionType}
            onOpenQuizBuilder={() => setMode('builder')}
            onStartMarathon={handleStartMarathon}
            onOpenStudyNotes={() => setMode('study-notes')}
            onOpenFullNote={() => {
              window.location.hash = '#notes/full-note';
              setMode('study-notes');
            }}
            progress={progress}
          />
        )}

        {/* MODE: Custom Quiz & Topic Builder */}
        {mode === 'builder' && (
          <QuizBuilder
            onStartCustomQuiz={handleStartCustomQuiz}
            onQuickMarathon={handleStartMarathon}
          />
        )}

        {/* MODE 2: Interactive Quiz Arena */}
        {mode === 'quiz' && (
          <div className="space-y-6">
            {/* Top Sub-header & Chapter Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMode('categories')}
                  className="p-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-indigo-200 hover:text-white border border-indigo-500/40 shadow-sm transition-colors"
                  title="Return to curriculum"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                    <span>
                      {activeChapter === 'custom' 
                        ? `Custom Practice Session (${currentQuestions.length} Questions)`
                        : activeChapter === 'all' 
                          ? 'Comprehensive Java Curriculum Marathon' 
                          : CHAPTERS.find(c => c.id === activeChapter)?.title || 'Quiz Arena'}
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-indigo-200 font-bold">
                    Keys A, B, C, D to answer • ← / → Arrow keys to navigate
                  </p>
                </div>
              </div>

              {/* Action Buttons: Builder & Chapter Selector */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMode('builder')}
                  className="px-3.5 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Configure Topics</span>
                </button>

                <select
                  value={activeChapter}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'custom') return;
                    setActiveChapter(val);
                    setCustomQuestionsList(null);
                    setCustomConfig(null);
                    setActiveQuestionIndex(0);
                  }}
                  className="bg-indigo-800 border-2 border-indigo-500/60 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-bold shadow-sm max-w-[200px] truncate"
                >
                  <option value="all">All 13 Chapters ({ALL_QUESTIONS.length} Qs)</option>
                  {CHAPTERS.map(c => (
                    <option key={c.id} value={c.id}>Ch {c.number}: {c.title.split('—')[1] || c.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quiz Body Grid (Card + Jump Grid Navigation) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Question Card (Left 8 cols on desktop) */}
              <div className="lg:col-span-8">
                {currentQuestion && (
                  <QuizCard
                    question={currentQuestion}
                    questionNumber={activeQuestionIndex + 1}
                    totalInView={currentQuestions.length}
                    userAnswer={progress.answeredQuestions[currentQuestion.id]}
                    onSelectAnswer={handleSelectAnswer}
                    onSelectMultipleAnswers={handleSelectMultipleAnswers}
                    onSubmitSubjectiveGrade={handleSubmitSubjectiveGrade}
                    onNextQuestion={() => {
                      if (activeQuestionIndex < currentQuestions.length - 1) {
                        setActiveQuestionIndex(prev => prev + 1);
                      }
                    }}
                    onPrevQuestion={() => {
                      if (activeQuestionIndex > 0) {
                        setActiveQuestionIndex(prev => prev - 1);
                      }
                    }}
                    hasNext={activeQuestionIndex < currentQuestions.length - 1}
                    hasPrev={activeQuestionIndex > 0}
                    isBookmarked={progress.bookmarkedQuestions.includes(currentQuestion.id)}
                    onToggleBookmark={() => handleToggleBookmark(currentQuestion.id)}
                    onResetQuestionAnswer={handleResetCurrentQuestion}
                  />
                )}
              </div>

              {/* Jump Navigation & Stats (Right 4 cols on desktop) */}
              <div className="lg:col-span-4 space-y-6">
                <QuestionNav
                  questions={currentQuestions}
                  currentIndex={activeQuestionIndex}
                  onSelectIndex={setActiveQuestionIndex}
                  progress={progress}
                  onShuffle={handleShuffleCurrent}
                />

                {/* Quick Info / Keyboard Shortcuts Card */}
                <div className="bg-indigo-800/80 border border-indigo-600/70 rounded-3xl p-5 text-xs text-indigo-100 space-y-3 shadow-lg">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant Feedback Engine</span>
                  </div>
                  <p className="leading-relaxed text-indigo-200">
                    Selecting your response immediately verifies the answer and provides deep architectural breakdowns, JVM bytecode mechanics, and model solutions.
                  </p>
                  <div className="pt-2.5 border-t border-indigo-700/80 grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div><span className="text-amber-300 font-bold">A/B/C/D</span>: Select</div>
                    <div><span className="text-amber-300 font-bold">← / →</span>: Nav</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: Timed Mock Exam */}
        {mode === 'exam' && (
          <ExamMode
            onBackToModules={() => setMode('categories')}
            onBookmarkQuestion={handleToggleBookmark}
            bookmarkedQuestions={progress.bookmarkedQuestions}
          />
        )}

        {/* MODE 4: Question Bank Explorer */}
        {mode === 'explorer' && (
          <QuestionExplorer
            progress={progress}
            onJumpToQuestion={handleJumpToQuestion}
            onToggleBookmark={handleToggleBookmark}
            onOpenQuizBuilder={() => setMode('builder')}
          />
        )}

        {/* MODE 5: Saved Bookmarks & Missed Mistakes Notebook */}
        {mode === 'review' && (
          <BookmarksReview
            progress={progress}
            onJumpToQuestion={handleJumpToQuestion}
            onRemoveBookmark={(id) => handleToggleBookmark(id)}
            onClearAllBookmarks={() => {
              if (window.confirm('Clear all saved bookmarks?')) {
                setProgress(prev => ({ ...prev, bookmarkedQuestions: [] }));
              }
            }}
            onResetIncorrect={() => {
              if (window.confirm('Reset all missed questions so you can re-practice them in quiz mode?')) {
                setProgress(prev => {
                  const newAnswered = { ...prev.answeredQuestions };
                  Object.keys(newAnswered).forEach(key => {
                    const id = Number(key);
                    if (newAnswered[id] && !newAnswered[id].isCorrect) {
                      delete newAnswered[id];
                    }
                  });
                  return { ...prev, answeredQuestions: newAnswered };
                });
              }
            }}
          />
        )}

        {/* MODE 6: Comprehensive Study Notes & Topic Syllabus Guides */}
        {mode === 'study-notes' && (
          <StudyNotesView
            onStartChapterQuiz={(chapterId) => {
              setActiveChapter(chapterId);
              setCustomQuestionsList(null);
              setCustomConfig(null);
              setActiveQuestionIndex(0);
              setMode('quiz');
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-700/80 bg-indigo-900/90 py-6 text-center text-xs font-bold text-indigo-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Java Mastery • Advanced Programming Concepts in Java</span>
          <span>13 Curriculum Chapters • 4 Question Types • Instant Feedback</span>
        </div>
      </footer>

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Data Management, Import/Export & PDF Modal */}
      <DataManagementModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        progress={progress}
        onImportProgress={(imported) => {
          setProgress(imported);
        }}
        onImportCustomQuestions={(customQs) => {
          setCustomQuestionsList(customQs);
          setActiveChapter('custom');
          setActiveQuestionIndex(0);
          setMode('quiz');
        }}
      />
    </div>
  );
};

export default App;
