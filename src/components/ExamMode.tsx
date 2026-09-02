import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  BarChart2,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_QUESTIONS } from '../data/questions';
import { CHAPTERS } from '../data/chapters';
import { Question } from '../types';

interface ExamModeProps {
  onBackToModules: () => void;
  onBookmarkQuestion: (id: number) => void;
  bookmarkedQuestions: number[];
}

export const ExamMode: React.FC<ExamModeProps> = ({
  onBackToModules,
  onBookmarkQuestion,
  bookmarkedQuestions
}) => {
  const [examState, setExamState] = useState<'config' | 'active' | 'finished'>('config');
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // Active Exam state
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(1800);
  const [showInstantFeedback, setShowInstantFeedback] = useState<boolean>(true);

  // Timer countdown
  useEffect(() => {
    if (examState !== 'active') return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  const startExam = () => {
    let pool = selectedChapter === 'all' 
      ? [...ALL_QUESTIONS] 
      : ALL_QUESTIONS.filter(q => q.chapter === selectedChapter);
    
    if (selectedType !== 'all') {
      pool = pool.filter(q => q.type === selectedType);
    }
    
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setExamQuestions(selected);
    setCurrentIdx(0);
    setAnswers({});
    setSecondsRemaining(timeLimitMinutes * 60);
    setExamState('active');
  };

  const finishExam = () => {
    setExamState('finished');
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleSelectAnswer = (optionIdx: number) => {
    const qId = examQuestions[currentIdx].id;
    if (answers[qId] !== undefined) return; // Prevent changing in instant mode

    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate score
  const totalCorrect = examQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
  const answeredTotal = Object.keys(answers).length;
  const scorePercent = examQuestions.length > 0 ? Math.round((totalCorrect / examQuestions.length) * 100) : 0;

  const getRankTitle = (percent: number) => {
    if (percent >= 90) return { title: 'Principal / Staff Java Architect', color: 'text-amber-400' };
    if (percent >= 75) return { title: 'Senior Java Systems Engineer', color: 'text-emerald-400' };
    if (percent >= 60) return { title: 'Java Software Engineer II', color: 'text-blue-400' };
    return { title: 'Foundational Java Specialist', color: 'text-slate-400' };
  };

  // CONFIG SCREEN
  if (examState === 'config') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-indigo-100 text-slate-800">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Senior Java Mock Exam Simulator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Simulate real technical assessment conditions with timed question sets
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Scope / Chapter */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                Exam Domain / Curriculum
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >
                <option value="all">Full Comprehensive Exam (All 13 Chapters & 400 Topics)</option>
                {CHAPTERS.map(c => (
                  <option key={c.id} value={c.id}>Ch {c.number}: {c.title}</option>
                ))}
              </select>
            </div>

            {/* Question Format */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                Question Format
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >
                <option value="all">All Question Types (Mixed)</option>
                <option value="multiple-choice">Multiple Choice (Single Selection)</option>
                <option value="multiple-selection">Multiple Selection (Select All That Apply)</option>
                <option value="true-false">True / False (Invariants)</option>
                <option value="subjective-code">Subjective & Codes (Output Tracing & Analysis)</option>
              </select>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[15, 30, 40, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-3 rounded-2xl border-2 text-sm font-bold transition-all ${
                      questionCount === num
                        ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-[0px_3px_0px_0px_#b45309]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                Time Limit (Minutes)
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeLimitMinutes(mins)}
                    className={`py-3 rounded-2xl border-2 text-sm font-bold transition-all ${
                      timeLimitMinutes === mins
                        ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-[0px_3px_0px_0px_#b45309]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Answer Feedback Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
              <div>
                <span className="text-sm font-bold text-indigo-950 block">
                  Instant Feedback on Selection
                </span>
                <span className="text-xs text-indigo-700 font-medium">
                  Reveal correct answer & architectural explanation immediately after choosing
                </span>
              </div>
              <input
                type="checkbox"
                checked={showInstantFeedback}
                onChange={(e) => setShowInstantFeedback(e.target.checked)}
                className="w-5 h-5 rounded-lg border-indigo-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={startExam}
              className="flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-base uppercase tracking-wider shadow-[0px_5px_0px_0px_#b45309] active:translate-y-1 active:shadow-none transition-all"
            >
              <Play className="w-5 h-5 fill-amber-950" />
              <span>Launch Mock Exam</span>
            </button>

            <button
              onClick={onBackToModules}
              className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FINISHED SCREEN (SCORECARD)
  if (examState === 'finished') {
    const rank = getRankTitle(scorePercent);

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-center border border-indigo-100 text-slate-800">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Assessment Completed!
          </h2>
          <p className="text-xl font-black mt-1 text-indigo-700">
            {rank.title}
          </p>

          {/* Big Score Dial */}
          <div className="my-8 p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-100 max-w-xs mx-auto shadow-inner">
            <div className="text-6xl font-black text-slate-900">
              {scorePercent}%
            </div>
            <p className="text-xs font-bold text-indigo-700 mt-2 uppercase tracking-wider">
              {totalCorrect} of {examQuestions.length} Questions Correct
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setExamState('config')}
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm uppercase tracking-wider shadow-[0px_4px_0px_0px_#b45309] active:translate-y-1 active:shadow-none transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake New Exam</span>
            </button>

            <button
              onClick={onBackToModules}
              className="px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
            >
              Return to Curriculum
            </button>
          </div>
        </div>

        {/* Breakdown of Exam Questions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xl text-slate-800">
          <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span>Question Breakdown & Explanations</span>
          </h3>

          <div className="space-y-4">
            {examQuestions.map((q, idx) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.correctAnswer;
              const isBookmarked = bookmarkedQuestions.includes(q.id);

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-3xl border-2 text-left ${
                    isCorrect 
                      ? 'bg-emerald-50/70 border-emerald-300' 
                      : 'bg-rose-50/70 border-rose-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-700">
                        Q{idx + 1}.
                      </span>
                      <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-100">
                        {q.chapterTitle}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <span className="flex items-center space-x-1 text-xs text-emerald-800 font-black">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-xs text-rose-800 font-black">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Incorrect</span>
                        </span>
                      )}

                      <button
                        onClick={() => onBookmarkQuestion(q.id)}
                        className={`p-1.5 rounded-xl ${isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Save question"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-900 font-bold">
                    {q.question}
                  </p>

                  <div className="mt-3 text-xs space-y-1 bg-white p-3.5 rounded-2xl border border-slate-200 font-bold">
                    <p className="text-slate-600">
                      Your answer: <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {chosen !== undefined ? `[${['A','B','C','D'][chosen]}] ${q.options[chosen]}` : 'Unanswered'}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-700">
                        Correct answer: [${['A','B','C','D'][q.correctAnswer || 0]}] {q.options[q.correctAnswer || 0]}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    <span className="font-black text-slate-800">Explanation: </span>
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM RUNNER
  const currentQ = examQuestions[currentIdx];
  const chosenOption = answers[currentQ.id];
  const isQuestionAnswered = chosenOption !== undefined;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Exam Header Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-xl border border-indigo-100 text-slate-800">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 uppercase tracking-wider">
            Exam Question {currentIdx + 1} of {examQuestions.length}
          </span>
          <span className="text-xs text-slate-500 font-bold hidden sm:inline">
            Answered: {answeredTotal}/{examQuestions.length}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Live Timer */}
          <div className={`flex items-center space-x-1.5 text-sm font-black px-3.5 py-1.5 rounded-2xl border ${
            secondsRemaining < 300 
              ? 'bg-rose-100 border-rose-300 text-rose-800 animate-pulse' 
              : 'bg-amber-400 border-amber-400 text-amber-950 shadow-sm'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={finishExam}
            className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-600 text-xs font-black transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Question Card in Exam */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-indigo-100 text-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500 font-bold">
          <span className="text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">{currentQ.chapterTitle}</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">{currentQ.difficulty}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 my-6 leading-relaxed">
          {currentQ.question}
        </h2>

        {/* Code snippet if any */}
        {currentQ.codeSnippet && (
          <div className="my-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-amber-100 overflow-x-auto shadow-inner">
            <code>{currentQ.codeSnippet}</code>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 my-6">
          {currentQ.options.map((opt, oIdx) => {
            const isChosen = chosenOption === oIdx;
            const isCorrect = oIdx === currentQ.correctAnswer;
            
            let btnClass = 'bg-white hover:bg-slate-50 border-4 border-slate-100 hover:border-indigo-300 text-slate-700';
            
            if (isQuestionAnswered && showInstantFeedback) {
              if (isCorrect) {
                btnClass = 'bg-emerald-50 border-4 border-emerald-500 text-emerald-950 shadow-sm';
              } else if (isChosen && !isCorrect) {
                btnClass = 'bg-rose-50 border-4 border-rose-500 text-rose-950 shadow-sm';
              } else {
                btnClass = 'bg-slate-50 border-4 border-slate-100 text-slate-400 opacity-60';
              }
            } else if (isChosen) {
              btnClass = 'bg-amber-100 border-4 border-amber-400 text-amber-950';
            }

            return (
              <button
                key={oIdx}
                disabled={isQuestionAnswered && showInstantFeedback}
                onClick={() => handleSelectAnswer(oIdx)}
                className={`w-full text-left p-5 rounded-3xl border-2 text-sm sm:text-base font-bold flex items-start space-x-3.5 transition-all ${btnClass}`}
              >
                <span className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black flex-shrink-0">
                  {['A','B','C','D'][oIdx]}
                </span>
                <span className="flex-1 leading-relaxed pt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Instant Feedback if enabled */}
        {isQuestionAnswered && showInstantFeedback && (
          <div className="p-6 rounded-3xl bg-indigo-50/80 border-2 border-indigo-200 text-xs sm:text-sm text-slate-700 leading-relaxed mt-6 animate-in fade-in">
            <p className="font-black text-indigo-950 mb-1.5 text-sm">Deep Architectural Breakdown:</p>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        {/* Prev / Next controls */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-bold ${
              currentIdx > 0 ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentIdx === examQuestions.length - 1 ? (
            <button
              onClick={finishExam}
              className="flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
            >
              <span>Submit & Finish Exam</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider shadow-[0px_4px_0px_0px_#b45309] active:translate-y-0.5 active:shadow-none"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
