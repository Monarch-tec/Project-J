import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Code, 
  CheckCircle, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Bookmark,
  GraduationCap,
  ListChecks,
  Printer,
  Maximize2,
  Minimize2,
  FileText,
  Zap,
  ArrowRight,
  X,
  Filter,
  Layers,
  Sparkle
} from 'lucide-react';
import { CHAPTER_STUDY_NOTES, ChapterStudyGuide, StudyTopic } from '../data/studyNotes';
import { useSpeech } from '../hooks/useSpeech';
import jsPDF from 'jspdf';

interface StudyNotesViewProps {
  onStartChapterQuiz: (chapterId: string) => void;
}

const QUICK_TOPIC_PILLS = [
  'All',
  'OOP Pillars',
  'JPMS Modularity',
  'Collections',
  'Iterators',
  'Binary Search',
  'Sorting & Big-O',
  'Recursion',
  'EDT & Events',
  'Exceptions',
  'Swing & JavaFX',
  'Streams & Lambdas',
  'JDBC & Patterns'
];

export const StudyNotesView: React.FC<StudyNotesViewProps> = ({ onStartChapterQuiz }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CHAPTER_STUDY_NOTES[0].chapterId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string>('All');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'concepts' | 'checklist' | 'tips'>('concepts');
  const [fontSizeMode, setFontSizeMode] = useState<'normal' | 'large'>('normal');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isSupported: speechSupported, isSpeaking, speak, stop: stopSpeaking } = useSpeech();

  // Handle keyboard shortcut '/' to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && (e.target as HTMLElement)?.tagName !== 'INPUT' && (e.target as HTMLElement)?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time filtered chapters based on search query and quick topic filter
  const filteredChapters = useMemo(() => {
    let list = CHAPTER_STUDY_NOTES;

    // Apply quick pill filter if not "All"
    if (activeQuickFilter !== 'All') {
      const qf = activeQuickFilter.toLowerCase();
      list = list.filter(ch => {
        if (qf === 'oop pillars' && ch.chapterNumber === 1) return true;
        if (qf === 'jpms modularity' && ch.chapterNumber === 2) return true;
        if (qf === 'collections' && ch.chapterNumber === 3) return true;
        if (qf === 'iterators' && ch.chapterNumber === 4) return true;
        if (qf === 'binary search' && ch.chapterNumber === 5) return true;
        if (qf === 'sorting & big-o' && ch.chapterNumber === 6) return true;
        if (qf === 'recursion' && ch.chapterNumber === 7) return true;
        if (qf === 'edt & events' && ch.chapterNumber === 8) return true;
        if (qf === 'exceptions' && ch.chapterNumber === 9) return true;
        if (qf === 'swing & javafx' && (ch.chapterNumber === 10 || ch.chapterNumber === 11)) return true;
        if (qf === 'streams & lambdas' && ch.chapterNumber === 12) return true;
        if (qf === 'jdbc & patterns' && ch.chapterNumber === 13) return true;
        return (
          ch.title.toLowerCase().includes(qf) ||
          ch.subtitle.toLowerCase().includes(qf) ||
          ch.coreConcepts.some(c => c.title.toLowerCase().includes(qf) || c.summary.toLowerCase().includes(qf))
        );
      });
    }

    // Apply text search query
    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(ch => {
      const matchesTitle = ch.title.toLowerCase().includes(q) || ch.subtitle.toLowerCase().includes(q);
      const matchesOverview = ch.overview.toLowerCase().includes(q);
      const matchesConcepts = ch.coreConcepts.some(c => 
        c.title.toLowerCase().includes(q) || 
        c.summary.toLowerCase().includes(q) || 
        (c.codeExample && c.codeExample.toLowerCase().includes(q)) ||
        c.keyPoints.some(kp => kp.toLowerCase().includes(q)) ||
        (c.pitfalls && c.pitfalls.some(pf => pf.toLowerCase().includes(q)))
      );
      const matchesChecklist = ch.quickSummaryChecklist?.some(item => item.toLowerCase().includes(q));
      const matchesTips = ch.examTips?.some(tip => tip.toLowerCase().includes(q));
      return matchesTitle || matchesOverview || matchesConcepts || matchesChecklist || matchesTips;
    });
  }, [searchQuery, activeQuickFilter]);

  // Auto-adjust selected chapter if current selection is filtered out
  useEffect(() => {
    if (filteredChapters.length > 0) {
      const currentStillVisible = filteredChapters.some(c => c.chapterId === selectedChapterId);
      if (!currentStillVisible) {
        setSelectedChapterId(filteredChapters[0].chapterId);
      }
    }
  }, [filteredChapters, selectedChapterId]);

  const currentChapter = useMemo(() => {
    return (
      filteredChapters.find(c => c.chapterId === selectedChapterId) ||
      CHAPTER_STUDY_NOTES.find(c => c.chapterId === selectedChapterId) ||
      filteredChapters[0] ||
      CHAPTER_STUDY_NOTES[0]
    );
  }, [filteredChapters, selectedChapterId]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleVoiceReadout = (topic: StudyTopic) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let text = `${topic.title}. ${topic.summary}. Key Points: ${topic.keyPoints.join('. ')}. `;
      if (topic.pitfalls && topic.pitfalls.length > 0) {
        text += `Common Pitfalls: ${topic.pitfalls.join('. ')}`;
      }
      speak(text);
    }
  };

  const handleVoiceReadoutOverview = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const text = `${currentChapter.title}. ${currentChapter.overview}. Key Highlights: ${currentChapter.quickSummaryChecklist.join('. ')}`;
      speak(text);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveQuickFilter('All');
    searchInputRef.current?.focus();
  };

  // Helper to highlight matching keywords safely
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim() || !text) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-300 text-slate-950 font-black px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleExportNotesPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Advanced Java Comprehensive Study Guide & Notes', margin, 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Chapter ${currentChapter.chapterNumber}: ${currentChapter.title}`, margin, 20);

    let currentY = 38;

    // Overview
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Chapter Overview', margin, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    const splitOverview = doc.splitTextToSize(currentChapter.overview, pageWidth - (margin * 2));
    doc.text(splitOverview, margin, currentY);
    currentY += (splitOverview.length * 4.5) + 6;

    // Quick Summary Checklist
    if (currentChapter.quickSummaryChecklist && currentChapter.quickSummaryChecklist.length > 0) {
      doc.setFillColor(238, 242, 255);
      doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 6, 1.5, 1.5, 'F');
      doc.setTextColor(67, 56, 202);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('Key Summary Points', margin + 3, currentY + 4.5);
      currentY += 10;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      currentChapter.quickSummaryChecklist.forEach(item => {
        const itemText = `[x]  ${item}`;
        const splitItem = doc.splitTextToSize(itemText, pageWidth - (margin * 2) - 4);
        doc.text(splitItem, margin + 2, currentY);
        currentY += (splitItem.length * 4) + 1;
      });
      currentY += 4;
    }

    // Core concepts
    currentChapter.coreConcepts.forEach((concept) => {
      if (currentY > 255) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 7, 2, 2, 'F');
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(concept.title, margin + 3, currentY + 5);
      currentY += 11;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const splitSumm = doc.splitTextToSize(concept.summary, pageWidth - (margin * 2));
      doc.text(splitSumm, margin, currentY);
      currentY += (splitSumm.length * 4) + 4;

      concept.keyPoints.forEach(kp => {
        if (currentY > 265) {
          doc.addPage();
          currentY = 20;
        }
        const bulletText = `•  ${kp}`;
        const splitBullet = doc.splitTextToSize(bulletText, pageWidth - (margin * 2) - 4);
        doc.text(splitBullet, margin + 2, currentY);
        currentY += (splitBullet.length * 4) + 1;
      });

      if (concept.codeExample) {
        if (currentY > 235) {
          doc.addPage();
          currentY = 20;
        }
        doc.setFillColor(15, 23, 42);
        const splitCode = doc.splitTextToSize(concept.codeExample, pageWidth - (margin * 2) - 8);
        const codeHeight = (splitCode.length * 3.5) + 6;
        doc.roundedRect(margin, currentY, pageWidth - (margin * 2), codeHeight, 2, 2, 'F');
        doc.setTextColor(253, 230, 138);
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.5);
        doc.text(splitCode, margin + 4, currentY + 4.5);
        currentY += codeHeight + 5;
      }
      currentY += 4;
    });

    doc.save(`java_chapter_${currentChapter.chapterNumber}_study_notes.pdf`);
  };

  return (
    <div id="study-notes-view" className="w-full max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-black uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            <span>Curriculum Syllabus & Architectural Reference</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Java Study Notes & Real-Time Curriculum Search
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
            Search, filter, and master syntax, code architectures, pitfalls, and theoretical concepts across all 13 syllabus chapters in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            id="download-notes-pdf-btn"
            onClick={handleExportNotesPdf}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Chapter PDF</span>
          </button>

          <button
            id="start-chapter-quiz-from-notes-btn"
            onClick={() => onStartChapterQuiz(currentChapter.chapterId)}
            className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Practice Chapter {currentChapter.chapterNumber} Quiz</span>
          </button>
        </div>
      </div>

      {/* Prominent Global Real-Time Search Bar & Quick Topic Filters */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-indigo-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Filter Curriculum in Real-Time
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
            <span>
              Showing <strong className="text-indigo-600 font-black">{filteredChapters.length}</strong> of {CHAPTER_STUDY_NOTES.length} chapters
            </span>
            {(searchQuery.trim() || activeQuickFilter !== 'All') && (
              <button
                onClick={handleClearSearch}
                className="text-indigo-600 hover:text-indigo-800 underline ml-2 font-bold cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Real-time Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            id="curriculum-realtime-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to filter chapters, algorithms, keywords (e.g. 'Binary Search', 'Iterator', 'EDT', 'Stream', 'OOP', 'JDBC')..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-200 focus:border-indigo-600 rounded-2xl pl-12 pr-12 py-3.5 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
          />

          {searchQuery && (
            <button
              id="clear-search-query-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {!searchQuery && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center space-x-1 pointer-events-none">
              <kbd className="px-2 py-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-lg shadow-2xs">
                /
              </kbd>
              <span className="text-[10px] text-slate-400 font-medium">to search</span>
            </div>
          )}
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider shrink-0 flex items-center space-x-1 mr-1">
            <Filter className="w-3 h-3 text-indigo-500" />
            <span>Topics:</span>
          </span>
          {QUICK_TOPIC_PILLS.map((pill) => {
            const isActive = activeQuickFilter === pill;
            return (
              <button
                key={pill}
                onClick={() => setActiveQuickFilter(pill)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-black'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Left Sidebar Chapter Navigation + Right Full Note Viewer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chapters Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-indigo-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Curriculum Chapters ({filteredChapters.length})</span>
              </span>
              {searchQuery && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Filtered
                </span>
              )}
            </div>

            {/* Sidebar Chapter Buttons List */}
            <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredChapters.length === 0 ? (
                <div className="p-6 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-700">No chapters match "{searchQuery}"</p>
                    <p className="text-[11px] text-slate-400">Try searching a different concept or keyword.</p>
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                filteredChapters.map((ch) => {
                  const isSelected = ch.chapterId === currentChapter.chapterId;
                  return (
                    <button
                      key={ch.chapterId}
                      id={`chapter-select-btn-${ch.chapterNumber}`}
                      onClick={() => {
                        setSelectedChapterId(ch.chapterId);
                        stopSpeaking();
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md font-bold'
                          : 'bg-slate-50 hover:bg-indigo-50/80 text-slate-700 hover:text-indigo-950'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-indigo-500/80 text-white' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            Ch {ch.chapterNumber}
                          </span>
                          <span className="text-xs font-bold truncate max-w-[180px]">
                            {searchQuery ? highlightMatch(ch.title.split('—')[1] || ch.title, searchQuery) : (ch.title.split('—')[1] || ch.title)}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate max-w-[220px] ${
                          isSelected ? 'text-indigo-100' : 'text-slate-400'
                        }`}>
                          {searchQuery ? highlightMatch(ch.subtitle, searchQuery) : ch.subtitle}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:text-indigo-600'
                      }`} />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Study Notes Canvas / Note Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 border border-indigo-100 shadow-md space-y-6">
            {/* Note Viewer Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-indigo-600 text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Chapter {currentChapter.chapterNumber} Curriculum Notes</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {searchQuery ? highlightMatch(currentChapter.title, searchQuery) : currentChapter.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {searchQuery ? highlightMatch(currentChapter.subtitle, searchQuery) : currentChapter.subtitle}
                </p>
              </div>

              {/* Action Controls: Voice, Font Size */}
              <div className="flex items-center space-x-2 shrink-0">
                {speechSupported && (
                  <button
                    id="listen-overview-btn"
                    onClick={handleVoiceReadoutOverview}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                    }`}
                    title="Voice Readout Overview"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Stop Audio' : 'Listen Overview'}</span>
                  </button>
                )}

                <button
                  id="toggle-font-size-btn"
                  onClick={() => setFontSizeMode(prev => prev === 'normal' ? 'large' : 'normal')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  title="Toggle Larger Text"
                >
                  {fontSizeMode === 'normal' ? 'A+' : 'A-'}
                </button>
              </div>
            </div>

            {/* Note Viewer Navigation Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('concepts')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'concepts'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Core Concepts & Syntax ({currentChapter.coreConcepts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'checklist'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Quick Summary Checklist ({currentChapter.quickSummaryChecklist?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('tips')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'tips'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Exam Tips ({currentChapter.examTips.length})</span>
              </button>
            </div>

            {/* Chapter Overview Text */}
            <div className="p-5 rounded-3xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <div className="text-[11px] font-black text-indigo-900 uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Chapter Architectural Context</span>
              </div>
              <p className={`text-slate-700 font-medium leading-relaxed ${fontSizeMode === 'large' ? 'text-base' : 'text-xs sm:text-sm'}`}>
                {searchQuery ? highlightMatch(currentChapter.overview, searchQuery) : currentChapter.overview}
              </p>
            </div>

            {/* Tab 1: Core Concepts & Syntax */}
            {activeTab === 'concepts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>In-Depth Topics & Executable Code</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentChapter.coreConcepts.length} sub-topics
                  </span>
                </div>

                <div className="space-y-5">
                  {currentChapter.coreConcepts.map((concept) => {
                    const isMatchedInConcept = searchQuery.trim() && (
                      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      concept.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      concept.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      (concept.codeExample && concept.codeExample.toLowerCase().includes(searchQuery.toLowerCase()))
                    );

                    return (
                      <div 
                        key={concept.id}
                        className={`p-5 sm:p-6 rounded-3xl border space-y-4 transition-all ${
                          isMatchedInConcept
                            ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-200/50'
                            : 'bg-slate-50/80 border-slate-200/80 hover:border-indigo-200'
                        }`}
                      >
                        {/* Header + Speech */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base font-black text-slate-900">
                              {searchQuery ? highlightMatch(concept.title, searchQuery) : concept.title}
                            </h4>
                            {isMatchedInConcept && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                                Match
                              </span>
                            )}
                          </div>

                          {speechSupported && (
                            <button
                              onClick={() => handleVoiceReadout(concept)}
                              className={`p-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                                isSpeaking 
                                ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                                : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                              }`}
                              title="Voice Read Out Topic"
                            >
                              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                              <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
                            </button>
                          )}
                        </div>

                        <p className={`text-slate-700 font-medium leading-relaxed ${fontSizeMode === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                          {searchQuery ? highlightMatch(concept.summary, searchQuery) : concept.summary}
                        </p>

                        {/* Key points bullets */}
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">
                            Key Rules & Principles:
                          </div>
                          <ul className="space-y-1.5">
                            {concept.keyPoints.map((kp, idx) => (
                              <li key={idx} className={`flex items-start space-x-2 text-slate-600 font-medium ${fontSizeMode === 'large' ? 'text-sm' : 'text-xs'}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                <span>{searchQuery ? highlightMatch(kp, searchQuery) : kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Code Snippet */}
                        {concept.codeExample && (
                          <div className="space-y-1.5 pt-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                              <span className="flex items-center space-x-1">
                                <Code className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Java Code Example</span>
                              </span>
                              <button
                                onClick={() => handleCopyCode(concept.codeExample!, concept.id)}
                                className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer transition-colors"
                              >
                                {copiedCodeId === concept.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-600">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy Code</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-4 rounded-2xl bg-slate-900 text-amber-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                              {concept.codeExample}
                            </pre>
                          </div>
                        )}

                        {/* Pitfalls & Complexity */}
                        {concept.pitfalls && concept.pitfalls.length > 0 && (
                          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-black">Common Pitfall: </strong>
                              <span>{concept.pitfalls.join(' ')}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Quick Summary Checklist */}
            {activeTab === 'checklist' && (
              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200/80 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-900 text-xs font-black uppercase tracking-wider">
                    <ListChecks className="w-4 h-4 text-amber-600" />
                    <span>Essential Chapter Summary Points</span>
                  </div>
                  <p className="text-xs text-amber-800 font-medium">
                    Review and verify your understanding of every core takeaway for Chapter {currentChapter.chapterNumber}.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {currentChapter.quickSummaryChecklist?.map((point, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 transition-colors hover:bg-indigo-50/50 hover:border-indigo-200"
                    >
                      <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-slate-800 font-bold ${fontSizeMode === 'large' ? 'text-sm' : 'text-xs'}`}>
                        {searchQuery ? highlightMatch(point, searchQuery) : point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Exam & Interview Tips */}
            {activeTab === 'tips' && (
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-indigo-50/70 border border-indigo-100 space-y-3">
                  <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-indigo-700" />
                    <span>Chapter {currentChapter.chapterNumber} High-Yield Exam Takeaways</span>
                  </h3>
                  <ul className="space-y-3">
                    {currentChapter.examTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-indigo-900 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{searchQuery ? highlightMatch(tip, searchQuery) : tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom Footer Practice CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                Ready to test your mastery of Chapter {currentChapter.chapterNumber}?
              </div>
              <button
                onClick={() => onStartChapterQuiz(currentChapter.chapterId)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <span>Launch Chapter {currentChapter.chapterNumber} Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
