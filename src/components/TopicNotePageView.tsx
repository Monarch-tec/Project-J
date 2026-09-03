import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Code, 
  Copy, 
  Check, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  Printer, 
  Share2, 
  HelpCircle,
  Briefcase,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Download
} from 'lucide-react';
import { ChapterStudyGuide, StudyTopic } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import jsPDF from 'jspdf';

interface TopicNotePageViewProps {
  chapter: ChapterStudyGuide;
  topic: StudyTopic;
  allTopics: StudyTopic[];
  onBackToChapter: () => void;
  onSelectTopic: (topicId: string) => void;
  onStartQuiz: (chapterId: string) => void;
}

export const TopicNotePageView: React.FC<TopicNotePageViewProps> = ({
  chapter,
  topic,
  allTopics,
  onBackToChapter,
  onSelectTopic,
  onStartQuiz
}) => {
  const [copiedCodePrimary, setCopiedCodePrimary] = useState(false);
  const [copiedCodeSecondary, setCopiedCodeSecondary] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [fontSizeMode, setFontSizeMode] = useState<'normal' | 'large'>('normal');
  const [isFocusMode, setIsFocusMode] = useState(false);

  const { isSupported: speechSupported, isSpeaking, speak, stop: stopSpeaking } = useSpeech();

  // Scroll to top whenever the topic changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    stopSpeaking();
  }, [topic.id]);

  const currentIndex = allTopics.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const handleCopyCode = (code: string, isSecondary = false) => {
    navigator.clipboard.writeText(code);
    if (isSecondary) {
      setCopiedCodeSecondary(true);
      setTimeout(() => setCopiedCodeSecondary(false), 2000);
    } else {
      setCopiedCodePrimary(true);
      setTimeout(() => setCopiedCodePrimary(false), 2000);
    }
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#notes/${chapter.chapterId}/${topic.id}`;
    navigator.clipboard.writeText(url);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      let speechText = `${topic.title}. ${topic.summary}. `;
      if (topic.deepDiveNotes && topic.deepDiveNotes.length > 0) {
        speechText += topic.deepDiveNotes.join(' ') + ' ';
      }
      speechText += `Key Principles: ${topic.keyPoints.join('. ')}. `;
      if (topic.pitfalls && topic.pitfalls.length > 0) {
        speechText += `Common Pitfalls: ${topic.pitfalls.join('. ')}. `;
      }
      if (topic.realWorldScenario) {
        speechText += `Real-world application: ${topic.realWorldScenario}`;
      }
      speak(speechText);
    }
  };

  const handleExportTopicPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    // Header banner
    doc.setFillColor(67, 56, 202);
    doc.rect(0, 0, pageWidth, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(`Chapter ${chapter.chapterNumber} — ${chapter.title}`, margin, 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Topic: ${topic.title}`, margin, 20);

    let currentY = 38;

    // Executive Summary
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Summary', margin, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    const splitSummary = doc.splitTextToSize(topic.summary, pageWidth - (margin * 2));
    doc.text(splitSummary, margin, currentY);
    currentY += (splitSummary.length * 5) + 6;

    // Deep Dive Notes if present
    if (topic.deepDiveNotes && topic.deepDiveNotes.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text('Theoretical Foundations & Architectural Rationale', margin, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      topic.deepDiveNotes.forEach(paragraph => {
        if (currentY > 260) {
          doc.addPage();
          currentY = 20;
        }
        const splitP = doc.splitTextToSize(paragraph, pageWidth - (margin * 2));
        doc.text(splitP, margin, currentY);
        currentY += (splitP.length * 4.5) + 3;
      });
      currentY += 4;
    }

    // Key Rules
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text('Key Rules & Execution Principles', margin, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    topic.keyPoints.forEach(kp => {
      if (currentY > 265) {
        doc.addPage();
        currentY = 20;
      }
      const bulletText = `•  ${kp}`;
      const splitBullet = doc.splitTextToSize(bulletText, pageWidth - (margin * 2) - 4);
      doc.text(splitBullet, margin + 2, currentY);
      currentY += (splitBullet.length * 4.5) + 2;
    });

    // Code Snippet
    if (topic.codeExample) {
      if (currentY > 230) {
        doc.addPage();
        currentY = 20;
      }
      currentY += 4;
      doc.setFillColor(15, 23, 42);
      const splitCode = doc.splitTextToSize(topic.codeExample, pageWidth - (margin * 2) - 8);
      const codeHeight = (splitCode.length * 3.5) + 8;
      doc.roundedRect(margin, currentY, pageWidth - (margin * 2), codeHeight, 2, 2, 'F');
      doc.setTextColor(253, 230, 138);
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.text(splitCode, margin + 4, currentY + 5.5);
      currentY += codeHeight + 8;
    }

    // Pitfalls
    if (topic.pitfalls && topic.pitfalls.length > 0) {
      if (currentY > 260) {
        doc.addPage();
        currentY = 20;
      }
      doc.setTextColor(185, 28, 28);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Common Pitfalls & Gotchas:', margin, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(127, 29, 29);
      const splitPitfall = doc.splitTextToSize(topic.pitfalls.join(' '), pageWidth - (margin * 2));
      doc.text(splitPitfall, margin, currentY);
      currentY += (splitPitfall.length * 4.5) + 6;
    }

    doc.save(`java_topic_${topic.id}.pdf`);
  };

  return (
    <div id="topic-note-page" className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-indigo-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Breadcrumbs & Back Button */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-1">
          <button
            id="back-to-chapter-btn"
            onClick={onBackToChapter}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 text-xs font-bold transition-colors cursor-pointer shrink-0"
            title="Return to Chapter Topics Directory"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chapter {chapter.chapterNumber} Topics</span>
            <span className="sm:hidden">Back</span>
          </button>

          <span className="text-slate-300">/</span>

          <span className="text-xs font-black text-indigo-700 px-2.5 py-1 rounded-full bg-indigo-50 shrink-0">
            Topic {currentIndex + 1} of {allTopics.length}
          </span>

          <span className="text-slate-300 hidden md:inline">/</span>

          <span className="text-xs font-bold text-slate-800 truncate max-w-[200px] lg:max-w-xs hidden md:inline">
            {topic.title}
          </span>
        </div>

        {/* Right: Quick Topic Selector & Utility Controls */}
        <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
          {/* Direct Dropdown to Switch Topic Pages */}
          <select
            id="topic-quick-select"
            value={topic.id}
            onChange={(e) => onSelectTopic(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer max-w-[180px] sm:max-w-[220px]"
          >
            {allTopics.map((t, idx) => (
              <option key={t.id} value={t.id}>
                {idx + 1}. {t.title.replace(/^\d+\.\s*/, '')}
              </option>
            ))}
          </select>

          {/* Voice Readout */}
          {speechSupported && (
            <button
              id="voice-readout-topic-btn"
              onClick={handleVoiceReadout}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
              }`}
              title="Voice Readout Topic Note"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          )}

          {/* Font Scaling */}
          <button
            onClick={() => setFontSizeMode(prev => prev === 'normal' ? 'large' : 'normal')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Toggle Text Size"
          >
            {fontSizeMode === 'normal' ? 'A+' : 'A-'}
          </button>

          {/* Share Link */}
          <button
            onClick={handleShareLink}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Copy Topic Link"
          >
            {shareToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {/* Export PDF */}
          <button
            id="topic-download-pdf-btn"
            onClick={handleExportTopicPdf}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
            title="Download PDF of this Topic"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Download</span>
          </button>
        </div>
      </div>

      {shareToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Topic page link copied to clipboard!</span>
        </div>
      )}

      {/* Main Topic Page Container */}
      <article className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-indigo-100 shadow-md space-y-8">
        {/* Header Hero Section */}
        <header className="space-y-4 pb-6 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
              Chapter {chapter.chapterNumber} • {chapter.title.split('—')[1] || chapter.title}
            </span>

            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Topic {currentIndex + 1} of {allTopics.length}
            </span>

            {topic.complexity && (
              <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                topic.complexity === 'Fundamental'
                  ? 'bg-emerald-100 text-emerald-800'
                  : topic.complexity === 'Intermediate'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {topic.complexity}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {topic.title}
          </h1>

          {/* Executive Summary Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-indigo-900 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Executive Concept Summary</span>
            </div>
            <p className={`text-slate-800 font-medium leading-relaxed ${fontSizeMode === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              {topic.summary}
            </p>
          </div>

          {/* Tags */}
          {topic.tags && topic.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {topic.tags.map((tag, idx) => (
                <span key={idx} className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Section 1: In-Depth Theoretical Foundations & Rationale */}
        {topic.deepDiveNotes && topic.deepDiveNotes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>1. Theoretical Foundations & Architectural Rationale</span>
            </h2>
            <div className={`space-y-3.5 text-slate-700 leading-relaxed font-medium ${fontSizeMode === 'large' ? 'text-base' : 'text-sm sm:text-base'}`}>
              {topic.deepDiveNotes.map((paragraph, idx) => (
                <p key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Key Mechanics & Execution Principles */}
        <section className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>2. Key Language Rules & Execution Invariants</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topic.keyPoints.map((kp, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 transition-colors hover:border-indigo-200"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                  {idx + 1}
                </div>
                <span className={`text-slate-800 font-bold ${fontSizeMode === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                  {kp}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Architecture & Execution Diagram */}
        {topic.architectureDiagram && (
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>3. Architectural Flow & Memory Diagram</span>
            </h2>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
              <pre className="leading-relaxed">
                {topic.architectureDiagram.trim()}
              </pre>
            </div>
          </section>
        )}

        {/* Section 4: Primary Java Implementation & Syntax */}
        {topic.codeExample && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <Code className="w-5 h-5 text-indigo-600" />
                <span>4. Primary Java Code Implementation</span>
              </h2>
              <button
                onClick={() => handleCopyCode(topic.codeExample!, false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-indigo-600 font-bold text-xs cursor-pointer transition-colors"
              >
                {copiedCodePrimary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-slate-900 text-amber-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
              {topic.codeExample}
            </pre>

            {topic.codeExplanation && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium">
                <strong className="font-black text-slate-900">Code Walkthrough: </strong>
                {topic.codeExplanation}
              </div>
            )}
          </section>
        )}

        {/* Section 5: Secondary / Advanced Implementation */}
        {topic.codeExample2 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <Code className="w-5 h-5 text-indigo-600" />
                <span>5. Advanced / Edge Case Implementation</span>
              </h2>
              <button
                onClick={() => handleCopyCode(topic.codeExample2!, true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-indigo-600 font-bold text-xs cursor-pointer transition-colors"
              >
                {copiedCodeSecondary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
              {topic.codeExample2}
            </pre>
          </section>
        )}

        {/* Section 6: Common Pitfalls & Antipatterns */}
        {topic.pitfalls && topic.pitfalls.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>6. Common Pitfalls, Bugs & Antipatterns</span>
            </h2>
            <div className="space-y-2.5">
              {topic.pitfalls.map((pitfall, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-black">Trap #{idx + 1}: </strong>
                    <span className="font-medium">{pitfall}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Real-World Industry Application & Case Study */}
        {topic.realWorldScenario && (
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>7. Real-World Production Industry Application</span>
            </h2>
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              {topic.realWorldScenario}
            </div>
          </section>
        )}

        {/* Section 8: High-Yield Interview Q&A */}
        {topic.interviewQnA && topic.interviewQnA.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>8. High-Yield Technical Interview Questions</span>
            </h2>
            <div className="space-y-3">
              {topic.interviewQnA.map((qa, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="flex items-start space-x-2 text-slate-900 font-black text-sm">
                    <span className="text-amber-700">Q{idx + 1}:</span>
                    <span>{qa.question}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-medium pl-6 border-l-2 border-amber-400 leading-relaxed">
                    <strong className="text-amber-900 font-black">Answer: </strong>
                    {qa.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Pager: Previous & Next Topic Navigation */}
        <footer className="pt-8 border-t border-slate-100 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Topic Button */}
            {prevTopic ? (
              <button
                id="prev-topic-btn"
                onClick={() => onSelectTopic(prevTopic.id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50 hover:bg-indigo-50/50 text-left transition-all flex items-center space-x-3 cursor-pointer group"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 block">
                    ← Previous Topic
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                    {prevTopic.title}
                  </span>
                </div>
              </button>
            ) : (
              <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center">
                First topic in Chapter {chapter.chapterNumber}
              </div>
            )}

            {/* Next Topic Button */}
            {nextTopic ? (
              <button
                id="next-topic-btn"
                onClick={() => onSelectTopic(nextTopic.id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50 hover:bg-indigo-50/50 text-right transition-all flex items-center justify-end space-x-3 cursor-pointer group sm:ml-auto w-full"
              >
                <div className="overflow-hidden">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 block">
                    Next Topic →
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                    {nextTopic.title}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ) : (
              <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold flex items-center justify-center">
                Last topic in Chapter {chapter.chapterNumber}
              </div>
            )}
          </div>

          {/* Chapter Directory & Practice CTA */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                Finished reading this topic note?
              </span>
              <p className="text-sm font-black text-white">
                Test your mastery with Chapter {chapter.chapterNumber} questions.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={onBackToChapter}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                All Chapter Topics
              </button>
              <button
                id="launch-quiz-from-topic-btn"
                onClick={() => onStartQuiz(chapter.chapterId)}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs shadow-lg transition-colors cursor-pointer"
              >
                <span>Launch Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};
