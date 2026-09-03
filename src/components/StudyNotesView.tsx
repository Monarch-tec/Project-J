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
import { TopicNotePageView } from './TopicNotePageView';
import { FullNotePageView } from './FullNotePageView';
import { buildFullNotePdfDocument, buildChapterPdfDocument } from '../utils/notesPdfGenerator';
import { useSpeech } from '../hooks/useSpeech';
import jsPDF from 'jspdf';

interface StudyNotesViewProps {
  onStartChapterQuiz: (chapterId: string) => void;
}

const QUICK_TOPIC_PILLS = [
  'All',
  'Major Advanced Concepts',
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
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
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

  // Hash route synchronization (#notes/:chapterId/:topicId)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#notes/')) {
        const parts = hash.replace('#notes/', '').split('/');
        const chId = parts[0];
        const tId = parts[1];
        if (chId === 'full-note') {
          setSelectedChapterId('full-note');
          setSelectedTopicId(null);
          return;
        }
        if (chId) {
          const foundCh = CHAPTER_STUDY_NOTES.find(c => c.chapterId === chId);
          if (foundCh) {
            setSelectedChapterId(chId);
            if (tId) {
              const foundTopic = foundCh.coreConcepts.find(t => t.id === tId);
              if (foundTopic) {
                setSelectedTopicId(tId);
              }
            } else {
              setSelectedTopicId(null);
            }
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Real-time filtered chapters based on search query and quick topic filter
  const filteredChapters = useMemo(() => {
    let list = CHAPTER_STUDY_NOTES;

    // Apply quick pill filter if not "All"
    if (activeQuickFilter !== 'All') {
      const qf = activeQuickFilter.toLowerCase();
      list = list.filter(ch => {
        if (qf === 'major advanced concepts' && ch.chapterNumber === 14) return true;
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
    if (selectedChapterId === 'full-note') return;
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

  const selectedTopic = useMemo(() => {
    if (!selectedTopicId) return null;
    return currentChapter.coreConcepts.find(t => t.id === selectedTopicId) || null;
  }, [selectedTopicId, currentChapter]);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    window.location.hash = `#notes/${selectedChapterId}/${topicId}`;
    stopSpeaking();
  };

  const handleBackToChapter = () => {
    setSelectedTopicId(null);
    window.location.hash = `#notes/${selectedChapterId}`;
    stopSpeaking();
  };

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
    if (selectedChapterId === 'full-note') {
      const doc = buildFullNotePdfDocument();
      doc.save('java_programming_full_note_1_111.pdf');
    } else {
      const doc = buildChapterPdfDocument(currentChapter);
      doc.save(`java_chapter_${currentChapter.chapterNumber}_study_notes.pdf`);
    }
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
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
            title="Download PDF directly to device"
          >
            <Download className="w-4 h-4" />
            <span>{selectedChapterId === 'full-note' ? 'Download Full Note (.pdf)' : 'Download Chapter (.pdf)'}</span>
          </button>

          <button
            id="start-chapter-quiz-from-notes-btn"
            onClick={() => onStartChapterQuiz(selectedChapterId === 'full-note' ? CHAPTER_STUDY_NOTES[0].chapterId : currentChapter.chapterId)}
            className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{selectedChapterId === 'full-note' ? 'Practice Comprehensive Exam Quiz' : `Practice Chapter ${currentChapter.chapterNumber} Quiz`}</span>
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
              {/* Pinned Card: Separate Full Note [1-111] */}
              <div className="mb-2">
                <button
                  id="select-full-note-sidebar-btn"
                  onClick={() => {
                    setSelectedChapterId('full-note');
                    setSelectedTopicId(null);
                    window.location.hash = '#notes/full-note';
                    stopSpeaking();
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between group cursor-pointer ${
                    selectedChapterId === 'full-note'
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold border-amber-300 ring-2 ring-amber-400/40'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50/60 hover:bg-amber-100/90 text-slate-900 border-amber-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        selectedChapterId === 'full-note' ? 'bg-slate-950 text-amber-300' : 'bg-amber-200 text-amber-900'
                      }`}>
                        ⭐ SEPARATE NOTE
                      </span>
                      <span className="text-xs font-black truncate">
                        Full Note [1–111]
                      </span>
                    </div>
                    <p className={`text-[11px] truncate max-w-[220px] font-medium ${
                      selectedChapterId === 'full-note' ? 'text-slate-950' : 'text-slate-600'
                    }`}>
                      Complete 111-Section Master Syllabus
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    selectedChapterId === 'full-note' ? 'text-slate-950 translate-x-0.5' : 'text-amber-700 group-hover:translate-x-0.5'
                  }`} />
                </button>
              </div>

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
                    <div key={ch.chapterId} className="space-y-1">
                      <button
                        id={`chapter-select-btn-${ch.chapterNumber}`}
                        onClick={() => {
                          setSelectedChapterId(ch.chapterId);
                          setSelectedTopicId(null);
                          window.location.hash = `#notes/${ch.chapterId}`;
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

                      {/* Accordion List of Chapter Topics */}
                      {isSelected && (
                        <div className="pt-1 pb-2 pl-3 pr-1 space-y-1 bg-indigo-50/50 rounded-2xl border border-indigo-100/80">
                          <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-800 flex items-center justify-between">
                            <span>Topics ({ch.coreConcepts.length})</span>
                            <span className="text-[9px] font-bold text-indigo-500">Click to open page</span>
                          </div>
                          <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                            {ch.coreConcepts.map((topic, tIdx) => {
                              const isTopicActive = selectedTopicId === topic.id;
                              return (
                                <button
                                  key={topic.id}
                                  id={`sidebar-topic-link-${topic.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectTopic(topic.id);
                                  }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                                    isTopicActive
                                      ? 'bg-indigo-600 text-white font-black shadow-sm'
                                      : 'text-slate-700 hover:bg-white hover:text-indigo-900 font-medium'
                                  }`}
                                  title={topic.title}
                                >
                                  <span className="truncate pr-1">
                                    {tIdx + 1}. {topic.title.replace(/^\d+\.\s*/, '')}
                                  </span>
                                  <ChevronRight className={`w-3 h-3 shrink-0 ${isTopicActive ? 'text-white' : 'text-slate-400'}`} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Study Notes Canvas / Note Viewer */}
        <div className="lg:col-span-8 space-y-6">
          {selectedChapterId === 'full-note' ? (
            <FullNotePageView />
          ) : selectedTopic ? (
            <TopicNotePageView
              chapter={currentChapter}
              topic={selectedTopic}
              allTopics={currentChapter.coreConcepts}
              onBackToChapter={handleBackToChapter}
              onSelectTopic={handleSelectTopic}
              onStartQuiz={onStartChapterQuiz}
            />
          ) : (
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

                        {/* Bottom Topic Page Action Bar */}
                        <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {concept.deepDiveNotes && concept.deepDiveNotes.length > 0 && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-100/90 text-indigo-900 flex items-center space-x-1">
                                <BookOpen className="w-3 h-3 text-indigo-600" />
                                <span>Deep Dive</span>
                              </span>
                            )}
                            {concept.architectureDiagram && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 flex items-center space-x-1">
                                <FileText className="w-3 h-3 text-slate-600" />
                                <span>Architecture Diagram</span>
                              </span>
                            )}
                            {concept.interviewQnA && concept.interviewQnA.length > 0 && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 flex items-center space-x-1">
                                <GraduationCap className="w-3 h-3 text-amber-700" />
                                <span>{concept.interviewQnA.length} Interview Q&As</span>
                              </span>
                            )}
                            {concept.complexity && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                {concept.complexity}
                              </span>
                            )}
                          </div>

                          <button
                            id={`open-topic-page-btn-${concept.id}`}
                            onClick={() => handleSelectTopic(concept.id)}
                            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer hover:shadow hover:-translate-y-0.5"
                          >
                            <span>Open Full Topic Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
          )}
        </div>
      </div>
    </div>
  );
};
