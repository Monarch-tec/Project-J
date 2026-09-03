import React, { useState, useMemo, useRef } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  Search,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  GraduationCap,
  Terminal,
  Bookmark,
  Hash
} from 'lucide-react';
import {
  JAVA_FULL_NOTE_METADATA,
  JAVA_FULL_NOTE_SECTIONS,
  FULL_NOTE_CATEGORIES,
  FullNoteSection
} from '../data/javaFullNote';
import { buildFullNotePdfDocument } from '../utils/notesPdfGenerator';
import { useSpeech } from '../hooks/useSpeech';

interface FullNotePageViewProps {}

export const FullNotePageView: React.FC<FullNotePageViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sections (1–111)');
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [fontSizeMode, setFontSizeMode] = useState<'normal' | 'large'>('normal');

  const { isSupported: speechSupported, isSpeaking, speak, stop: stopSpeaking } = useSpeech();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filtered sections based on category and search query
  const filteredSections = useMemo(() => {
    let list = JAVA_FULL_NOTE_SECTIONS;

    if (selectedCategory !== 'All Sections (1–111)') {
      list = list.filter((sec) => sec.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (sec) =>
          sec.title.toLowerCase().includes(q) ||
          sec.content.toLowerCase().includes(q) ||
          (sec.codeSnippet && sec.codeSnippet.toLowerCase().includes(q)) ||
          (sec.examNote && sec.examNote.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  const toggleSection = (sectionNumber: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionNumber]: prev[sectionNumber] === undefined ? false : !prev[sectionNumber]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    JAVA_FULL_NOTE_SECTIONS.forEach((s) => {
      allExpanded[s.sectionNumber] = true;
    });
    setExpandedSections(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedSections({});
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleVoiceReadout = (section: FullNoteSection) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let text = `${section.title}. ${section.content}. `;
      if (section.examNote) text += `Exam note: ${section.examNote}.`;
      speak(text);
    }
  };

  const handleDownloadPdf = () => {
    const doc = buildFullNotePdfDocument();
    doc.save('java_programming_full_note_1_111.pdf');
  };

  const scrollToSection = (sectionNumber: number) => {
    const el = document.getElementById(`full-note-sec-${sectionNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Ensure it's expanded
      setExpandedSections((prev) => ({ ...prev, [sectionNumber]: true }));
    }
  };

  return (
    <div id="full-note-page-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Master Note [1–111]</span>
            </span>
            <span className="text-xs text-amber-200/80 font-mono">
              COS 201.2 & Technical Interview Complete Guide
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Java Programming — Full Note
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 font-medium leading-relaxed">
            {JAVA_FULL_NOTE_METADATA.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200/70 pt-1">
            <span>• 111 Complete Sections</span>
            <span>• 10 Curriculum Parts</span>
            <span>• Verified Java Code Snippets</span>
            <span>• Core Exam Distinctions</span>
          </div>
        </div>

        {/* Hero Actions: Download PDF */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 shrink-0">
          <button
            id="full-note-download-pdf-btn"
            onClick={handleDownloadPdf}
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .PDF</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search, Category Filter, Jump to Section, Expand/Collapse */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              id="full-note-search-input"
              type="text"
              placeholder="Search across all 111 sections, keywords, definitions, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-200 hover:bg-slate-300 w-5 h-5 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>

          {/* Jump to section dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="jump-to-section-dropdown"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val) scrollToSection(val);
                }}
                defaultValue=""
                className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="" disabled>
                  Jump to Section (1–111)...
                </option>
                {JAVA_FULL_NOTE_SECTIONS.map((sec) => (
                  <option key={sec.sectionNumber} value={sec.sectionNumber}>
                    #{sec.sectionNumber}: {sec.title.slice(0, 32)}
                  </option>
                ))}
              </select>
            </div>

            {/* Expand / Collapse All */}
            <button
              onClick={handleExpandAll}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              title="Expand all cards"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              title="Collapse all cards"
            >
              Collapse
            </button>

            {/* Font size toggle */}
            <button
              onClick={() => setFontSizeMode((prev) => (prev === 'normal' ? 'large' : 'normal'))}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              title="Toggle reading font size"
            >
              {fontSizeMode === 'normal' ? 'A+' : 'A-'}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {FULL_NOTE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Results Counter */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
        <span>
          Showing {filteredSections.length} of {JAVA_FULL_NOTE_SECTIONS.length} sections
          {selectedCategory !== 'All Sections (1–111)' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span>Click any section header to expand/collapse</span>
      </div>

      {/* Sections Cards Grid */}
      <div className="space-y-4">
        {filteredSections.map((section) => {
          const isCollapsed = expandedSections[section.sectionNumber] === false;

          return (
            <div
              key={section.sectionNumber}
              id={`full-note-sec-${section.sectionNumber}`}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.sectionNumber)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/60 hover:bg-amber-50/40 border-b border-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0 pr-4">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center shrink-0 border border-amber-200">
                    #{section.sectionNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {section.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {section.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {speechSupported && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoiceReadout(section);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSpeaking ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Listen to section"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="text-slate-400">
                    {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Section Content (Collapsible) */}
              {!isCollapsed && (
                <div className="p-5 sm:p-6 space-y-5 animate-in fade-in duration-150">
                  {/* Text Content */}
                  <div
                    className={`text-slate-700 leading-relaxed whitespace-pre-line ${
                      fontSizeMode === 'large' ? 'text-base' : 'text-xs sm:text-sm'
                    }`}
                  >
                    {section.content}
                  </div>

                  {/* Diagram */}
                  {section.diagram && (
                    <div className="bg-slate-900 text-amber-200 font-mono text-xs p-4 rounded-xl overflow-x-auto border border-slate-800 shadow-inner whitespace-pre leading-relaxed">
                      {section.diagram}
                    </div>
                  )}

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
                      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 text-slate-300 font-mono">
                          <Terminal className="w-3.5 h-3.5 text-amber-400" />
                          <span>Java Implementation</span>
                        </div>
                        <button
                          onClick={() =>
                            handleCopyCode(section.codeSnippet!, `code-${section.sectionNumber}`)
                          }
                          className="flex items-center space-x-1 text-slate-400 hover:text-amber-300 transition-colors"
                          title="Copy Java code"
                        >
                          {copiedCodeId === `code-${section.sectionNumber}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 text-[11px] font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs sm:text-sm font-mono text-amber-200 overflow-x-auto leading-relaxed">
                        <code>{section.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Code Explanation */}
                  {section.codeExplanation && (
                    <div className="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-xl text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                      {section.codeExplanation}
                    </div>
                  )}

                  {/* Output */}
                  {section.output && (
                    <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs sm:text-sm font-mono text-emerald-950 flex items-start space-x-2">
                      <span className="font-bold shrink-0">Console Output:</span>
                      <span className="whitespace-pre-line">{section.output}</span>
                    </div>
                  )}

                  {/* Table */}
                  {section.table && (
                    <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs sm:text-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                            {section.table.headers.map((h, i) => (
                              <th key={i} className="p-2.5 sm:p-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/80">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5 sm:p-3 text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Exam Note */}
                  {section.examNote && (
                    <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs sm:text-sm text-amber-950 flex items-start space-x-2.5">
                      <Bookmark className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black text-amber-800">Critical Exam Takeaway: </span>
                        <span>{section.examNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
