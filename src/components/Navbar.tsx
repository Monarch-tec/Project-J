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
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
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
  const completionPercent = totalQuestions > 0 ? Math.min(100, Math.round((answeredCount / totalQuestions) * 100)) : 0;

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-indigo-700/95 backdrop-blur-md border-b border-indigo-500/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Title */}
          <motion.div 
            id="brand-logo"
            onClick={() => setMode('categories')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <motion.div 
              whileHover={{ rotate: [0, -8, 8, -4, 4, 0] }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] text-xl relative overflow-hidden"
            >
              <span>☕</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 2 }}
              />
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase italic group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <span>Java Mastery</span>
                {completionPercent === 100 && (
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                )}
              </h1>
              <p className="text-xs text-indigo-200 font-bold hidden sm:block tracking-wide">
                Advanced Concepts Curriculum • 13 Chapters
              </p>
            </div>
          </motion.div>

          {/* Center Nav Modes */}
          <nav className="hidden md:flex items-center p-1.5 bg-indigo-800/90 rounded-2xl border border-indigo-600/60 text-sm font-bold shadow-inner">
            <motion.button
              id="nav-categories"
              onClick={() => setMode('categories')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'categories'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Curriculum</span>
            </motion.button>

            <motion.button
              id="nav-builder"
              onClick={() => setMode('builder')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'builder'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Quiz Builder</span>
            </motion.button>

            <motion.button
              id="nav-quiz"
              onClick={() => setMode('quiz')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'quiz'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Quiz Arena</span>
            </motion.button>

            <motion.button
              id="nav-exam"
              onClick={() => setMode('exam')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'exam'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Mock Exam</span>
            </motion.button>

            <motion.button
              id="nav-explorer"
              onClick={() => setMode('explorer')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'explorer'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Bank Explorer</span>
            </motion.button>

            <motion.button
              id="nav-study-notes"
              onClick={() => setMode('study-notes')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'study-notes'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Study Notes</span>
            </motion.button>

            <motion.button
              id="nav-review"
              onClick={() => setMode('review')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all ${
                currentMode === 'review'
                  ? 'bg-amber-400 text-amber-950 font-black shadow-[0px_3px_0px_0px_#b45309]'
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-700/60'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({bookmarkedCount})</span>
            </motion.button>
          </nav>

          {/* Right Stats & Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* In-App PWA Install */}
            <PWAInstallButton />

            {/* Score pill */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden lg:flex flex-col items-center bg-indigo-800 border border-indigo-600/80 rounded-2xl px-3.5 py-1.5 min-w-[85px] shadow-sm"
            >
              <span className="text-[10px] uppercase font-black text-indigo-300 tracking-wider">Score</span>
              <span className="text-base font-black text-white">{correctCount}/{answeredCount}</span>
            </motion.div>

            {/* Accuracy / Rank pill */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex flex-col items-center bg-amber-400 rounded-2xl px-3.5 py-1.5 min-w-[80px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
            >
              <span className="text-[10px] uppercase font-black text-amber-900 tracking-wider">Accuracy</span>
              <span className="text-base font-black text-amber-950">{accuracy}%</span>
            </motion.div>

            {/* PDF & Data Management Button */}
            {onOpenDataManagement && (
              <motion.button
                id="btn-open-data-modal"
                onClick={onOpenDataManagement}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="PDF Export, Import & Backups"
                className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-indigo-800/90 hover:bg-indigo-600 text-indigo-100 hover:text-white transition-colors border border-indigo-600/80 text-xs font-bold"
              >
                <FileDown className="w-4 h-4 text-amber-300" />
                <span className="hidden xl:inline">Data Sync</span>
              </motion.button>
            )}

            {/* Streak */}
            <motion.div 
              title="Current Streak" 
              animate={progress.streak > 0 ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl border text-xs font-bold transition-colors ${
                progress.streak >= 3 
                  ? 'bg-amber-400 border-amber-300 text-amber-950 shadow-[0_0_12px_rgba(251,191,36,0.6)]' 
                  : 'bg-indigo-800 border-indigo-600 text-amber-300'
              }`}
            >
              <Flame className={`w-4 h-4 ${progress.streak >= 3 ? 'fill-amber-950 text-amber-950 animate-bounce' : 'fill-amber-400 text-amber-400'}`} />
              <span className="font-mono font-black text-sm">{progress.streak}</span>
            </motion.div>

            {/* Reset Button */}
            <motion.button
              id="btn-reset-stats"
              onClick={onResetProgress}
              whileHover={{ scale: 1.08, rotate: -45 }}
              whileTap={{ scale: 0.92 }}
              title="Reset progress"
              className="p-2.5 rounded-xl bg-indigo-800/90 hover:bg-rose-600 hover:text-white text-indigo-200 transition-colors border border-indigo-600/80 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden py-2.5 gap-1.5 border-t border-indigo-600/60 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setMode('categories')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'categories' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setMode('builder')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'builder' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Builder
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'quiz' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Quiz Arena
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'exam' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Mock Exam
          </button>
          <button
            onClick={() => setMode('explorer')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'explorer' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Bank Explorer
          </button>
          <button
            onClick={() => setMode('study-notes')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'study-notes' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Study Notes
          </button>
          <button
            onClick={() => setMode('review')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${currentMode === 'review' ? 'bg-amber-400 text-amber-950 font-black shadow-sm' : 'text-indigo-200 bg-indigo-800 active:scale-95'}`}
          >
            Saved ({bookmarkedCount})
          </button>
        </div>

      </div>

      {/* Global Animated Curriculum Completion Bar */}
      <div className="h-1.5 w-full bg-indigo-900/60 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercent}%` }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        />
      </div>
    </header>
  );
};
