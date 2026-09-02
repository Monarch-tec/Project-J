import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, Award, Zap, AlertCircle, BarChart3, CheckCircle2 } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { QuizProgress, ChapterStat } from '../types';

interface ChapterPerformanceChartProps {
  progress: QuizProgress;
}

export const ChapterPerformanceChart: React.FC<ChapterPerformanceChartProps> = ({ progress }) => {
  // Aggregate stats per chapter
  const data = CHAPTERS.map((chapter) => {
    // Look up either in categoryStats or progress answered questions
    const catStat = progress.categoryStats?.[chapter.id] || { answered: 0, correct: 0 };
    const answered = catStat.answered || 0;
    const correct = catStat.correct || 0;
    const percentage = answered > 0 ? Math.round((correct / answered) * 100) : 0;

    return {
      id: chapter.id,
      shortName: `Ch ${chapter.number}`,
      fullName: chapter.title,
      chapterNumber: chapter.number,
      answered,
      correct,
      incorrect: answered - correct,
      accuracy: percentage,
      hasAttempts: answered > 0,
    };
  });

  const attemptedChapters = data.filter(d => d.hasAttempts);
  const totalAnsweredAcross = data.reduce((acc, d) => acc + d.answered, 0);
  const totalCorrectAcross = data.reduce((acc, d) => acc + d.correct, 0);
  const avgAccuracy = totalAnsweredAcross > 0 ? Math.round((totalCorrectAcross / totalAnsweredAcross) * 100) : 0;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 text-xs font-sans max-w-xs">
          <div className="flex items-center space-x-2 font-bold text-amber-300 mb-1">
            <span>Chapter {d.chapterNumber}: {d.fullName}</span>
          </div>
          <div className="space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-black text-emerald-400">{d.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span>Correct Answers:</span>
              <span className="font-bold text-slate-100">{d.correct} / {d.answered}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Missed:</span>
              <span>{d.incorrect}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (accuracy: number, hasAttempts: boolean) => {
    if (!hasAttempts) return '#e2e8f0'; // slate-200
    if (accuracy >= 80) return '#10b981'; // emerald-500
    if (accuracy >= 50) return '#6366f1'; // indigo-500
    return '#f43f5e'; // rose-500
  };

  return (
    <div 
      id="chapter-performance-analytics-card"
      className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-indigo-100 p-6 sm:p-8 shadow-xl text-slate-800 space-y-6 animate-in fade-in duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Chapter Performance & Accuracy Trends
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Interactive Recharts analytics measuring proficiency across all 13 curriculum topics
            </p>
          </div>
        </div>

        {/* Global Summary Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-3.5 py-1.5 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black text-indigo-900">
              {avgAccuracy}% Avg Accuracy
            </span>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-3.5 py-1.5 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-black text-emerald-900">
              {totalCorrectAcross} / {totalAnsweredAcross} Answered
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Bar Graph */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="shortName" 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              interval={0}
            />
            <YAxis 
              domain={[0, 100]} 
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="accuracy" radius={[8, 8, 0, 0]} maxBarSize={38}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.accuracy, entry.hasAttempts)} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Guide */}
      <div className="flex flex-wrap items-center justify-between text-xs pt-4 border-t border-slate-100 gap-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 font-bold">≥ 80% Mastery</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            <span className="text-slate-600 font-bold">50–79% Competent</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="text-slate-600 font-bold">&lt; 50% Needs Practice</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-200"></span>
            <span className="text-slate-400 font-bold">Not Attempted</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-medium italic">
          Hover over bars for chapter details • Updates automatically with every answer
        </p>
      </div>
    </div>
  );
};
