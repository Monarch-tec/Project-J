import React from 'react';
import { 
  BookOpen, 
  Flame, 
  Bookmark, 
  RotateCcw, 
  Layers, 
  Search, 
  Award,
  SlidersHorizontal,
  FolderDown,
  FileDown,
  GraduationCap
} from 'lucide-react';
import { AppMode, QuizProgress, UserAnswerState } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  progress: QuizProgress;
  totalQuestions: number;
  onResetProgress: () => void;
  bookmarkedCount: number;
  onOpenDataManagement?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  setMode,
  progress,
  totalQuestions,
  onResetProgress,
  bookmarkedCount,
  onOpenDataManagement
}) => {
  const answeredCount = Object.keys(progress.answeredQuestions).length;
  const correctCount = (Object.values(progress.answeredQuestions) as UserAnswerState[]).filter(a => a.isCorrect).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-indigo-700/95 backdrop-blur-md border-b border-indigo-500/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Title */}
          <div 
            id="brand-logo"
            onClick={() => setMode('categories')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-200 text-xl">
              <span>☕</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase italic group-hover:text-amber-300 transition-colors">
                Java Mastery
              </h1>
              <p className="text-xs text-indigo-200 font-bold hidden sm:block tracking-wide">
                Advanced Concepts Curriculum • 13 Chapters
              </p>
            </div>
          </div>

          {/* Center Nav Modes */}
          <nav className="hidden md:flex items-center p-1.5 bg-indigo-800/90 rounded-2xl border border-indigo-600/60 text-sm font-bold shadow-inner">
            <button
              id="nav-categories"
              onClick={() => setMode('categories')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'categories'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Curriculum</span>
            </button>

            <button
              id="nav-builder"
              onClick={() => setMode('builder')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'builder'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Quiz Builder</span>
            </button>

            <button
              id="nav-quiz"
              onClick={() => setMode('quiz')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'quiz'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Quiz Arena</span>
            </button>

            <button
              id="nav-exam"
              onClick={() => setMode('exam')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'exam'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Mock Exam</span>
            </button>

            <button
              id="nav-explorer"
              onClick={() => setMode('explorer')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'explorer'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Bank Explorer</span>
            </button>

            <button
              id="nav-study-notes"
              onClick={() => setMode('study-notes')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'study-notes'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Study Notes</span>
            </button>

            <button
              id="nav-review"
              onClick={() => setMode('review')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'review'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({bookmarkedCount})</span>
            </button>
          </nav>

          {/* Right Stats & Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* In-App PWA Install */}
            <PWAInstallButton />

            {/* Score pill */}
            <div className="hidden lg:flex flex-col items-center bg-indigo-800 border border-indigo-600/80 rounded-2xl px-3.5 py-1.5 min-w-[85px] shadow-sm">
              <span className="text-[10px] uppercase font-black text-indigo-300 tracking-wider">Score</span>
              <span className="text-base font-black text-white">{correctCount}/{answeredCount}</span>
            </div>

            {/* Accuracy / Rank pill */}
            <div className="hidden sm:flex flex-col items-center bg-amber-400 rounded-2xl px-3.5 py-1.5 min-w-[80px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
              <span className="text-[10px] uppercase font-black text-amber-900 tracking-wider">Accuracy</span>
              <span className="text-base font-black text-amber-950">{accuracy}%</span>
            </div>

            {/* PDF & Data Management Button */}
            {onOpenDataManagement && (
              <button
                id="btn-open-data-modal"
                onClick={onOpenDataManagement}
                title="PDF Export, Import & Backups"
                className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-indigo-800/90 hover:bg-indigo-600 text-indigo-100 hover:text-white transition-colors border border-indigo-600/80 text-xs font-bold"
              >
                <FileDown className="w-4 h-4 text-amber-300" />
                <span className="hidden xl:inline">PDF & Data</span>
              </button>
            )}

            {/* Streak */}
            <div 
              title="Current Streak" 
              className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-indigo-800 border border-indigo-600 text-amber-300 text-xs font-bold"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-mono font-black text-sm">{progress.streak}</span>
            </div>

            {/* Reset Button */}
            <button
              id="btn-reset-stats"
              onClick={onResetProgress}
              title="Reset progress"
              className="p-2.5 rounded-xl bg-indigo-800/90 hover:bg-rose-600 hover:text-white text-indigo-200 transition-colors border border-indigo-600/80"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden py-2.5 gap-1.5 border-t border-indigo-600/60 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setMode('categories')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'categories' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setMode('builder')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'builder' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Builder
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'quiz' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Quiz Arena
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'exam' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Mock Exam
          </button>
          <button
            onClick={() => setMode('explorer')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'explorer' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Bank Explorer
          </button>
          <button
            onClick={() => setMode('study-notes')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'study-notes' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Study Notes
          </button>
          <button
            onClick={() => setMode('review')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap ${currentMode === 'review' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800'}`}
          >
            Saved ({bookmarkedCount})
          </button>
        </div>

      </div>
    </header>
  );
};
