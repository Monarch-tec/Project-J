import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ListFilter,
  Check
} from 'lucide-react';
import { ChapterId, QuestionType, CustomQuizConfig } from '../types';
import { CHAPTERS } from '../data/chapters';
import { ALL_QUESTIONS } from '../data/questions';

interface QuizBuilderProps {
  onStartCustomQuiz: (config: CustomQuizConfig) => void;
  onQuickMarathon: () => void;
}

const QUESTION_TYPES: { id: QuestionType; label: string; description: string }[] = [
  { 
    id: 'multiple-choice', 
    label: 'Multiple choice', 
    description: 'Single correct answer from 4 options with instant analysis' 
  },
  { 
    id: 'multiple-selection', 
    label: 'Multiple selection', 
    description: 'Select all valid statements and conditions with checkmark validation' 
  },
  { 
    id: 'true-false', 
    label: 'True / False', 
    description: 'Conceptual invariants, language rules, and JVM behavior assertions' 
  },
  { 
    id: 'subjective-code', 
    label: 'Subjective / code', 
    description: 'Code output tracing, bug spotting, and architectural reasoning' 
  }
];

export const QuizBuilder: React.FC<QuizBuilderProps> = ({
  onStartCustomQuiz,
  onQuickMarathon
}) => {
  // State for Chapter selections
  const [selectedChapters, setSelectedChapters] = useState<ChapterId[]>(
    CHAPTERS.map(c => c.id as ChapterId)
  );

  // State for Question Types
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([
    'multiple-choice',
    'multiple-selection',
    'true-false',
    'subjective-code'
  ]);

  // State for Length & Timer
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30); // 0 = untimed
  const [instantFeedback, setInstantFeedback] = useState<boolean>(true);

  // Select all / clear chapters
  const handleSelectAllChapters = () => {
    setSelectedChapters(CHAPTERS.map(c => c.id as ChapterId));
  };

  const handleClearChapters = () => {
    setSelectedChapters([]);
  };

  const toggleChapter = (chapterId: ChapterId) => {
    if (selectedChapters.includes(chapterId)) {
      setSelectedChapters(selectedChapters.filter(id => id !== chapterId));
    } else {
      setSelectedChapters([...selectedChapters, chapterId]);
    }
  };

  const toggleType = (typeId: QuestionType) => {
    if (selectedTypes.includes(typeId)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter(t => t !== typeId));
      }
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  // Compute available pool count based on selected chapters and types
  const availablePoolCount = ALL_QUESTIONS.filter(q => 
    (selectedChapters.length === 0 || selectedChapters.includes(q.chapter as ChapterId)) &&
    (selectedTypes.length === 0 || (q.type && selectedTypes.includes(q.type)))
  ).length;

  const handleLaunch = () => {
    if (selectedChapters.length === 0) {
      alert('Please select at least one chapter.');
      return;
    }
    if (selectedTypes.length === 0) {
      alert('Please select at least one question type.');
      return;
    }
    onStartCustomQuiz({
      selectedChapters,
      selectedTypes,
      questionCount: Math.min(questionCount, availablePoolCount > 0 ? availablePoolCount : questionCount),
      timeLimitMinutes,
      instantFeedback
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero / Header Card */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-indigo-100 text-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Custom Curriculum Practice</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Curriculum Quiz Builder
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
              Target specific chapters and question formats from your syllabus. Practice with immediate bytecode breakdowns and model answers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="btn-quick-marathon"
              onClick={onQuickMarathon}
              className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>All 400 Questions</span>
            </button>

            <button
              id="btn-launch-custom-quiz"
              onClick={handleLaunch}
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm uppercase tracking-wider shadow-[0px_4px_0px_0px_#b45309] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-amber-950" />
              <span>Launch Quiz ({availablePoolCount} Qs)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chapters & Question Types Selection (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. TOPICS / CHAPTERS SECTION */}
          <section id="section-curriculum-topics" className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 text-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                  1
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Select Curriculum Topics / Chapters
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedChapters.length} of {CHAPTERS.length} chapters selected
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={handleSelectAllChapters}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearChapters}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* 13 Chapters Checkboxes List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {CHAPTERS.map((chapter) => {
                const isSelected = selectedChapters.includes(chapter.id as ChapterId);
                return (
                  <div
                    key={chapter.id}
                    onClick={() => toggleChapter(chapter.id as ChapterId)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3.5 select-none ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 opacity-75'
                    }`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-300'
                    }`}>
                      {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-indigo-950 font-black' : 'text-slate-700'}`}>
                        {chapter.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-medium">
                        {chapter.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2. QUESTION TYPES SECTION */}
          <section id="section-question-types" className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 text-slate-800 space-y-4">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-2xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                2
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Question Format & Types
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Choose which question types to include in your session
                </p>
              </div>
            </div>

            {/* 4 Question Types Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {QUESTION_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type.id);
                return (
                  <div
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3.5 select-none ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-400 text-amber-950 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 opacity-75'
                    }`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-amber-400 text-amber-950 font-black' : 'bg-white text-slate-400 border border-slate-300'
                    }`}>
                      {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    </div>

                    <div className="flex-1">
                      <p className={`text-sm font-bold ${isSelected ? 'text-amber-950 font-black' : 'text-slate-800'}`}>
                        {type.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        {type.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Column: Session Settings & Launch Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 text-slate-800 space-y-6">
            <div className="flex items-center space-x-2 text-indigo-700 font-black text-sm uppercase tracking-wider pb-3 border-b border-slate-100">
              <ListFilter className="w-4 h-4" />
              <span>Session Parameters</span>
            </div>

            {/* Question Count Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-2.5 rounded-xl border-2 text-xs font-black transition-all ${
                      questionCount === num
                        ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Pacing / Time Limit
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 0, label: 'Untimed' },
                  { val: 20, label: '20 mins' },
                  { val: 40, label: '40 mins' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setTimeLimitMinutes(item.val)}
                    className={`py-2.5 rounded-xl border-2 text-xs font-black transition-all ${
                      timeLimitMinutes === item.val
                        ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Answer Feedback Toggle */}
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-950">
                  Instant Feedback Engine
                </span>
                <input
                  type="checkbox"
                  checked={instantFeedback}
                  onChange={(e) => setInstantFeedback(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <p className="text-[11px] text-indigo-700 font-medium">
                Reveals correct answers, JMM invariants, and model code solutions immediately.
              </p>
            </div>

            {/* Launch CTA */}
            <button
              onClick={handleLaunch}
              disabled={selectedChapters.length === 0 || selectedTypes.length === 0}
              className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-amber-950 font-black text-sm uppercase tracking-wider shadow-[0px_4px_0px_0px_#b45309] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-amber-950" />
              <span>Start Custom Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
