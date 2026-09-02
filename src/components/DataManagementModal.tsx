import React, { useRef, useState } from 'react';
import { 
  Download, 
  Upload, 
  FileText, 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  X,
  FileSpreadsheet,
  Database
} from 'lucide-react';
import { QuizProgress, Question } from '../types';
import { ALL_QUESTIONS } from '../data/questions';
import { CHAPTERS } from '../data/chapters';
import { downloadJsonFile, parseUploadedJsonFile } from '../utils/dataTransfer';
import { exportQuizToPdf, exportPerformanceReportToPdf } from '../utils/pdfExport';

interface DataManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: QuizProgress;
  onImportProgress: (importedProgress: QuizProgress) => void;
  onImportCustomQuestions?: (customQuestions: Question[]) => void;
}

export const DataManagementModal: React.FC<DataManagementModalProps> = ({
  isOpen,
  onClose,
  progress,
  onImportProgress,
  onImportCustomQuestions
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedPdfChapter, setSelectedPdfChapter] = useState<string>('all');
  const [includeExplanationsInPdf, setIncludeExplanationsInPdf] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleExportProgressJson = () => {
    downloadJsonFile(progress, `java_quiz_progress_backup_${new Date().toISOString().slice(0, 10)}.json`);
  };

  const handleExportCurriculumJson = () => {
    downloadJsonFile(ALL_QUESTIONS, 'advanced_java_400_curriculum_questions.json');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseUploadedJsonFile(file);
      
      // Check if it's progress backup or questions array
      if (data.answeredQuestions || data.categoryStats) {
        onImportProgress(data);
        setImportStatus({
          type: 'success',
          message: 'Progress & score state successfully restored from backup file!'
        });
      } else if (Array.isArray(data) && data.length > 0 && (data[0].question || data[0].difficulty)) {
        if (onImportCustomQuestions) {
          onImportCustomQuestions(data);
        }
        setImportStatus({
          type: 'success',
          message: `Successfully imported ${data.length} custom quiz questions!`
        });
      } else {
        setImportStatus({
          type: 'error',
          message: 'Unrecognized JSON structure. Expected a Progress Backup or Questions array.'
        });
      }
    } catch (err: any) {
      setImportStatus({
        type: 'error',
        message: err.message || 'Failed to parse JSON file'
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportPdfStudyGuide = () => {
    let questionsToExport = ALL_QUESTIONS;
    let title = 'Complete 13-Chapter Curriculum';
    let subtitle = `${ALL_QUESTIONS.length} Questions with Solutions & Architectural Explanations`;

    if (selectedPdfChapter !== 'all') {
      const ch = CHAPTERS.find(c => c.id === selectedPdfChapter);
      if (ch) {
        questionsToExport = ALL_QUESTIONS.filter(q => q.chapter === ch.id);
        title = `Chapter ${ch.number}: ${ch.title}`;
        subtitle = `${ch.subtitle} • ${questionsToExport.length} Questions`;
      }
    }

    exportQuizToPdf({
      title,
      subtitle,
      questions: questionsToExport,
      includeAnswers: true,
      includeExplanations: includeExplanationsInPdf,
    });
  };

  const handleExportPdfReport = () => {
    exportPerformanceReportToPdf(progress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800 border border-indigo-100 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Import, Export & PDF Documents
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Save your progress, export printable PDF study guides, or load question sets
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {importStatus && (
          <div className={`mt-4 p-4 rounded-2xl flex items-center space-x-3 text-xs font-bold ${
            importStatus.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
              : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}>
            {importStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {/* 1. PDF EXPORTS */}
          <div className="p-5 rounded-3xl bg-indigo-50/70 border border-indigo-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-indigo-700" />
                <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider">
                  Printable PDF Study Guides & Reports
                </h3>
              </div>
              <span className="text-[10px] font-black bg-indigo-200/70 text-indigo-800 px-2.5 py-0.5 rounded-full">
                jsPDF Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Topic / Chapter for PDF Guide:
                </label>
                <select
                  value={selectedPdfChapter}
                  onChange={(e) => setSelectedPdfChapter(e.target.value)}
                  className="w-full bg-white border border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="all">All 13 Chapters (Full 400 Questions Master Guide)</option>
                  {CHAPTERS.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      Ch {ch.number}: {ch.title}
                    </option>
                  ))}
                </select>

                <label className="flex items-center space-x-2 text-xs text-slate-600 font-medium cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={includeExplanationsInPdf}
                    onChange={(e) => setIncludeExplanationsInPdf(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Include in-depth architectural explanations</span>
                </label>

                <button
                  onClick={handleExportPdfStudyGuide}
                  className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Study Guide PDF</span>
                </button>
              </div>

              {/* Progress Report PDF */}
              <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    Official Progress & Accuracy Report
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Generate an official student report with comprehensive chapter accuracy tables, total score metrics, and streak achievements.
                  </p>
                </div>

                <button
                  onClick={handleExportPdfReport}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download Progress Report PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. JSON DATA IMPORT & EXPORT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export JSON */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                  <FileJson className="w-4 h-4 text-amber-600" />
                  <span>Export & Backup JSON</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Download a complete portable snapshot of your quiz answers, bookmarks, streaks, and performance scores.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleExportProgressJson}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Progress Backup</span>
                </button>

                <button
                  onClick={handleExportCurriculumJson}
                  className="w-full py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export All 400 Questions JSON</span>
                </button>
              </div>
            </div>

            {/* Import JSON */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>Import & Restore Data</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Upload previously exported progress backup files or custom question sets in JSON format to merge into your app.
                </p>
              </div>

              <div className="pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json,application/json"
                  className="hidden"
                  id="json-file-input"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select JSON File to Import</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
