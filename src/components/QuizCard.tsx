import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Check, 
  RotateCcw, 
  Terminal, 
  Zap, 
  HelpCircle, 
  Eye, 
  CheckSquare, 
  Square, 
  Sparkles, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Play, 
  Square as StopSquare 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, UserAnswerState } from '../types';
import { useSpeech } from '../hooks/useSpeech';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalInView: number;
  userAnswer?: UserAnswerState;
  onSelectAnswer: (optionIndex: number) => void;
  onSelectMultipleAnswers?: (selectedIndices: number[]) => void;
  onSubmitSubjectiveGrade?: (isCorrect: boolean, responseText?: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onResetQuestionAnswer: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalInView,
  userAnswer,
  onSelectAnswer,
  onSelectMultipleAnswers,
  onSubmitSubjectiveGrade,
  onNextQuestion,
  onPrevQuestion,
  hasNext,
  hasPrev,
  isBookmarked,
  onToggleBookmark,
  onResetQuestionAnswer
}) => {
  const [copied, setCopied] = useState(false);
  const [localMultiSelections, setLocalMultiSelections] = useState<number[]>([]);
  const [subjectiveInput, setSubjectiveInput] = useState<string>('');
  const [showSubjectiveSolution, setShowSubjectiveSolution] = useState<boolean>(false);

  const isAnswered = userAnswer !== undefined;
  const selectedIndex = userAnswer?.selectedOption;
  const selectedIndices = userAnswer?.selectedOptions || [];
  const isCorrect = userAnswer?.isCorrect;

  const { isSupported: speechSupported, isSpeaking, speak, stop: stopSpeaking } = useSpeech();

  // Stop speech when changing question
  useEffect(() => {
    stopSpeaking();
  }, [question.id]);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let speechText = `Question ${questionNumber}. ${question.question}. `;
      if (question.type === 'multiple-choice' || question.type === 'multiple-selection') {
        const letters = ['A', 'B', 'C', 'D'];
        speechText += 'Options are: ' + question.options.map((opt, i) => `Option ${letters[i]}: ${opt}`).join('. ') + '. ';
      }
      if (isAnswered && question.explanation) {
        speechText += `Explanation: ${question.explanation}`;
      }
      speak(speechText);
    }
  };

  // Reset local interactive inputs when question changes
  useEffect(() => {
    if (userAnswer?.selectedOptions) {
      setLocalMultiSelections(userAnswer.selectedOptions);
    } else {
      setLocalMultiSelections([]);
    }

    if (userAnswer?.subjectiveResponse) {
      setSubjectiveInput(userAnswer.subjectiveResponse);
      setShowSubjectiveSolution(true);
    } else {
      setSubjectiveInput('');
      setShowSubjectiveSolution(isAnswered);
    }
  }, [question.id, userAnswer, isAnswered]);

  // Trigger celebratory confetti on correct answer
  useEffect(() => {
    if (isAnswered && isCorrect) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6']
      });
    }
  }, [isAnswered, isCorrect, question.id]);

  const handleCopyCode = () => {
    if (question.codeSnippet) {
      navigator.clipboard.writeText(question.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Master':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Expert':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Fundamental':
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'multiple-selection':
        return { label: 'Multiple Selection', bg: 'bg-teal-100 text-teal-800' };
      case 'true-false':
        return { label: 'True / False', bg: 'bg-violet-100 text-violet-800' };
      case 'subjective-code':
        return { label: 'Subjective / Code Analysis', bg: 'bg-rose-100 text-rose-800' };
      case 'multiple-choice':
      default:
        return { label: 'Multiple Choice', bg: 'bg-indigo-100 text-indigo-800' };
    }
  };

  const progressPercentage = totalInView > 0 ? Math.round((questionNumber / totalInView) * 100) : 0;
  const typeBadge = getTypeBadge(question.type);

  // Multi-selection toggle helper
  const handleToggleMultiOption = (idx: number) => {
    if (isAnswered) return;
    if (localMultiSelections.includes(idx)) {
      setLocalMultiSelections(localMultiSelections.filter(i => i !== idx));
    } else {
      setLocalMultiSelections([...localMultiSelections, idx]);
    }
  };

  const handleSubmitMultiAnswer = () => {
    if (onSelectMultipleAnswers) {
      onSelectMultipleAnswers(localMultiSelections);
    }
  };

  return (
    <div 
      id={`quiz-card-${question.id}`}
      className="bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-10 relative overflow-hidden text-slate-800 border border-indigo-100 transition-all duration-300"
    >
      {/* Top Progress bar */}
      <div className="absolute top-0 left-0 w-full h-2.5 bg-slate-100">
        <div 
          className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Top Banner & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 pt-2 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide">
            Question {questionNumber} of {totalInView}
          </span>
          <span className="text-slate-400 font-mono text-xs font-bold">ID #{question.id}</span>
          
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeBadge.bg}`}>
            {typeBadge.label}
          </span>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Chapter Tag */}
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
            {question.chapterTitle}
          </span>

          {/* Voice Read Out Button */}
          {speechSupported && (
            <button
              id={`btn-voice-readout-${question.id}`}
              onClick={handleToggleSpeech}
              title={isSpeaking ? "Stop Voice Readout" : "Voice Read Out Question & Options"}
              className={`p-2 rounded-2xl border transition-all flex items-center space-x-1.5 ${
                isSpeaking 
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md animate-pulse' 
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border-indigo-200 shadow-sm'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase">Read Out</span>
                </>
              )}
            </button>
          )}

          {/* Bookmark Button */}
          <button
            id={`btn-bookmark-${question.id}`}
            onClick={onToggleBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
            className={`p-2 rounded-2xl border transition-all ${
              isBookmarked 
                ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm' 
                : 'bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-slate-200 border-slate-200'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-950" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Question Text */}
      <div className="my-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight mb-6">
          {question.question}
        </h2>

        {/* Code Snippet Box (if applicable) */}
        {question.codeSnippet && (
          <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 mb-6 font-mono text-sm sm:text-base leading-relaxed shadow-inner border border-slate-800 text-slate-100 relative group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-bold uppercase tracking-wider text-slate-300">Java Source Snippet</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-xl transition-colors font-sans font-bold"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-amber-100/90 leading-relaxed scrollbar-thin">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. MULTIPLE CHOICE QUESTION RENDERER */}
      {/* ========================================================================= */}
      {question.type === 'multiple-choice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 pt-2">
          {question.options.map((option, idx) => {
            const isThisSelected = isAnswered && selectedIndex === idx;
            const isThisCorrect = idx === question.correctAnswer;
            
            let cardStyles = 'bg-white border-4 border-slate-100 hover:border-indigo-400 text-slate-700';
            let letterBadgeStyles = 'bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white';

            if (isAnswered) {
              if (isThisCorrect) {
                cardStyles = 'bg-emerald-50 border-4 border-emerald-500 text-emerald-900 shadow-md';
                letterBadgeStyles = 'bg-emerald-500 text-white shadow-lg';
              } else if (isThisSelected && !isThisCorrect) {
                cardStyles = 'bg-rose-50 border-4 border-rose-500 text-rose-800 shadow-md';
                letterBadgeStyles = 'bg-rose-500 text-white shadow-lg';
              } else {
                cardStyles = 'bg-slate-50/70 border-4 border-slate-100 text-slate-400 opacity-60';
                letterBadgeStyles = 'bg-slate-100 text-slate-400';
              }
            }

            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <motion.button
                key={idx}
                id={`question-${question.id}-option-${idx}`}
                disabled={isAnswered}
                onClick={() => onSelectAnswer(idx)}
                whileHover={!isAnswered ? { scale: 1.015, y: -2 } : {}}
                whileTap={!isAnswered ? { scale: 0.985 } : {}}
                animate={
                  isAnswered && isThisSelected && !isThisCorrect
                    ? { x: [0, -6, 6, -4, 4, 0] }
                    : isAnswered && isThisCorrect
                    ? { scale: [1, 1.02, 1] }
                    : {}
                }
                transition={{ duration: 0.3 }}
                className={`group relative p-6 rounded-3xl text-left shadow-sm flex flex-col justify-between cursor-pointer ${cardStyles}`}
              >
                <span className={`absolute -top-4 -left-4 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base transition-all ${letterBadgeStyles}`}>
                  {optionLetters[idx]}
                </span>

                <p className="text-base sm:text-lg font-bold leading-relaxed pt-1">
                  {option}
                </p>

                {isAnswered && isThisCorrect && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-700 font-black text-sm italic">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Correct Answer</span>
                  </div>
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <div className="mt-3 flex items-center gap-2 text-rose-700 font-black text-sm italic">
                    <XCircle className="w-4 h-4" />
                    <span>Incorrect choice</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MULTIPLE SELECTION QUESTION RENDERER ("Select All That Apply") */}
      {/* ========================================================================= */}
      {question.type === 'multiple-selection' && (
        <div className="space-y-4 my-8">
          <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-900 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Multiple Selection: Check all statements that apply, then click Submit.</span>
          </div>

          <div className="space-y-3.5">
            {question.options.map((option, idx) => {
              const isChecked = isAnswered 
                ? selectedIndices.includes(idx)
                : localMultiSelections.includes(idx);
              const isShouldBeChecked = (question.correctAnswers || []).includes(idx);

              let boxStyle = 'bg-white border-2 border-slate-200 hover:border-indigo-400';
              if (isAnswered) {
                if (isShouldBeChecked && isChecked) {
                  boxStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold';
                } else if (!isShouldBeChecked && isChecked) {
                  boxStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 font-bold';
                } else if (isShouldBeChecked && !isChecked) {
                  boxStyle = 'bg-amber-50 border-2 border-amber-400 text-amber-950 font-bold';
                } else {
                  boxStyle = 'bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-60';
                }
              } else if (isChecked) {
                boxStyle = 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-bold';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleToggleMultiOption(idx)}
                  className={`p-5 rounded-2xl transition-all cursor-pointer flex items-start space-x-3.5 select-none ${boxStyle}`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isChecked 
                      ? (isAnswered ? (isShouldBeChecked ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-indigo-600 text-white')
                      : (isAnswered && isShouldBeChecked ? 'bg-amber-500 text-amber-950 font-bold' : 'bg-slate-100 text-slate-400 border border-slate-300')
                  }`}>
                    {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : (isAnswered && isShouldBeChecked ? <AlertCircle className="w-4 h-4" /> : null)}
                  </div>

                  <div className="flex-1">
                    <p className="text-base font-semibold leading-relaxed">
                      {option}
                    </p>
                    {isAnswered && (
                      <p className="text-xs font-bold mt-1">
                        {isShouldBeChecked && isChecked && <span className="text-emerald-700">✓ Correctly Selected</span>}
                        {!isShouldBeChecked && isChecked && <span className="text-rose-700">✗ Incorrectly Selected</span>}
                        {isShouldBeChecked && !isChecked && <span className="text-amber-700">⚠ Correct Option (Missed)</span>}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!isAnswered && (
            <div className="pt-3 flex justify-end">
              <motion.button
                onClick={handleSubmitMultiAnswer}
                disabled={localMultiSelections.length === 0}
                whileHover={localMultiSelections.length > 0 ? { scale: 1.03, y: -2 } : {}}
                whileTap={localMultiSelections.length > 0 ? { scale: 0.97 } : {}}
                className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm uppercase tracking-wider shadow-[0px_4px_0px_0px_#b45309] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Submit Multiple Selection ({localMultiSelections.length} Selected)
              </motion.button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TRUE / FALSE QUESTION RENDERER */}
      {/* ========================================================================= */}
      {question.type === 'true-false' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          {[
            { label: 'TRUE', val: 0, color: 'emerald' },
            { label: 'FALSE', val: 1, color: 'rose' }
          ].map((tf) => {
            const isThisSelected = isAnswered && selectedIndex === tf.val;
            const isThisCorrect = tf.val === question.correctAnswer;

            let tfStyle = 'bg-white border-4 border-slate-100 hover:border-indigo-500 text-slate-800';
            if (isAnswered) {
              if (isThisCorrect) {
                tfStyle = 'bg-emerald-50 border-4 border-emerald-500 text-emerald-950 font-black shadow-lg';
              } else if (isThisSelected && !isThisCorrect) {
                tfStyle = 'bg-rose-50 border-4 border-rose-500 text-rose-950 font-black shadow-lg';
              } else {
                tfStyle = 'bg-slate-50 border-4 border-slate-100 text-slate-400 opacity-50';
              }
            }

            return (
              <motion.button
                key={tf.val}
                disabled={isAnswered}
                onClick={() => onSelectAnswer(tf.val)}
                whileHover={!isAnswered ? { scale: 1.03, y: -3 } : {}}
                whileTap={!isAnswered ? { scale: 0.97 } : {}}
                animate={
                  isAnswered && isThisSelected && !isThisCorrect
                    ? { x: [0, -6, 6, -4, 4, 0] }
                    : isAnswered && isThisCorrect
                    ? { scale: [1, 1.02, 1] }
                    : {}
                }
                transition={{ duration: 0.3 }}
                className={`p-8 rounded-3xl text-center font-black text-2xl uppercase tracking-wider shadow-md cursor-pointer ${tfStyle}`}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span>{tf.label}</span>
                  {isAnswered && isThisCorrect && (
                    <span className="text-xs font-bold text-emerald-700 uppercase flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct Statement</span>
                    </span>
                  )}
                  {isAnswered && isThisSelected && !isThisCorrect && (
                    <span className="text-xs font-bold text-rose-700 uppercase flex items-center space-x-1">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect Choice</span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUBJECTIVE / CODE ANALYSIS RENDERER */}
      {/* ========================================================================= */}
      {question.type === 'subjective-code' && (
        <div className="space-y-6 my-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
              Your Reasoning / Code Tracing Scratchpad:
            </label>
            <textarea
              value={subjectiveInput}
              onChange={(e) => setSubjectiveInput(e.target.value)}
              disabled={isAnswered}
              placeholder="Type your output tracing, bug diagnosis, or architectural analysis here before revealing the model solution..."
              rows={4}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          {!showSubjectiveSolution && !isAnswered && (
            <button
              onClick={() => setShowSubjectiveSolution(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Reveal Model Solution & Self-Grade</span>
            </button>
          )}

          {/* Model Solution Box & Self Grading */}
          {showSubjectiveSolution && (
            <div className="bg-indigo-50/90 border-2 border-indigo-200 rounded-3xl p-6 sm:p-7 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-indigo-950 font-black text-base uppercase tracking-wide">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Model Answer & Deep Solution</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-mono bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                {question.sampleSolution || question.explanation}
              </p>

              {!isAnswered && onSubmitSubjectiveGrade && (
                <div className="pt-3 border-t border-indigo-200 space-y-2">
                  <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Self-Evaluation: Did your analysis match the model answer?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => onSubmitSubjectiveGrade(true, subjectiveInput)}
                      className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      ✓ I Analyzed It Correctly
                    </button>
                    <button
                      onClick={() => onSubmitSubjectiveGrade(false, subjectiveInput)}
                      className="px-6 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      ✗ Need Further Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Immediate Explanation Box (Revealed when answered) */}
      {isAnswered && (
        <motion.div 
          id={`explanation-box-${question.id}`}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-6 sm:p-7 rounded-3xl border-2 mt-8 shadow-sm ${
            isCorrect 
              ? 'bg-emerald-50 border-emerald-400/80 text-emerald-950' 
              : 'bg-indigo-50/80 border-indigo-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-indigo-100">
            <div className="flex items-center space-x-2.5">
              {isCorrect ? (
                <>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-8 h-8 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                  <span className="font-black text-emerald-800 text-base tracking-wide uppercase">
                    CORRECT! Excellent Analysis
                  </span>
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-8 h-8 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-sm"
                  >
                    <XCircle className="w-5 h-5" />
                  </motion.div>
                  <span className="font-black text-rose-800 text-base tracking-wide uppercase">
                    {question.type === 'multiple-choice' 
                      ? `INCORRECT — CORRECT ANSWER IS OPTION ${['A', 'B', 'C', 'D'][question.correctAnswer || 0]}`
                      : 'REVIEW ARCHITECTURAL ANALYSIS BELOW'}
                  </span>
                </>
              )}
            </div>

            {/* Try Again / Reset button */}
            <motion.button
              onClick={onResetQuestionAnswer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-100 transition-colors border border-indigo-200 shadow-sm cursor-pointer"
              title="Reset answer and try again"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </motion.button>
          </div>

          <div className="text-sm sm:text-base leading-relaxed">
            <p className="font-black text-indigo-950 mb-1.5 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Deep Architectural Breakdown:</span>
            </p>
            <p className="text-slate-700 leading-relaxed font-sans">
              {question.explanation}
            </p>
          </div>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-indigo-100">
              {question.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white text-indigo-700 border border-indigo-200 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Navigation Controls Footer */}
      <footer className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <motion.button
          id="btn-prev-question"
          disabled={!hasPrev}
          onClick={onPrevQuestion}
          whileHover={hasPrev ? { scale: 1.03, x: -2 } : {}}
          whileTap={hasPrev ? { scale: 0.97 } : {}}
          className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all ${
            hasPrev
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm cursor-pointer'
              : 'bg-slate-50 text-slate-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </motion.button>

        {/* Status prompt */}
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          {!isAnswered ? 'Select your answer to reveal analysis' : 'Response validated'}
        </div>

        <motion.button
          id="btn-next-question"
          disabled={!hasNext}
          onClick={onNextQuestion}
          whileHover={hasNext ? { scale: 1.03, x: 2 } : {}}
          whileTap={hasNext ? { scale: 0.97 } : {}}
          className={`flex items-center space-x-2 px-8 sm:px-12 py-4 rounded-2xl text-base uppercase font-black tracking-wider transition-all ${
            hasNext
              ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-[0px_6px_0px_0px_#b45309] cursor-pointer'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <span>Next Question</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </footer>
    </div>
  );
};
