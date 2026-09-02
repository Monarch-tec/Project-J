import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Question, QuizProgress, ChapterMeta } from '../types';
import { CHAPTERS } from '../data/chapters';

export function exportQuizToPdf(options: {
  title: string;
  subtitle?: string;
  questions: Question[];
  includeAnswers?: boolean;
  includeExplanations?: boolean;
}) {
  const { title, subtitle, questions, includeAnswers = true, includeExplanations = true } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Header Banner
  doc.setFillColor(79, 70, 229); // Indigo 600
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Advanced Java Master Quiz', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(title + (subtitle ? ` • ${subtitle}` : ''), margin, 20);

  // Document metadata
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text(`Exported: ${new Date().toLocaleDateString()} • Total Questions: ${questions.length}`, margin, 35);

  let currentY = 42;

  questions.forEach((q, idx) => {
    // Check if we need a new page
    if (currentY > pageHeight - 45) {
      doc.addPage();
      currentY = 20;
    }

    // Question Number & Difficulty Badge
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 8, 2, 2, 'F');

    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Q${idx + 1}. [${q.difficulty}] Chapter: ${q.chapterTitle || q.chapter}`, margin + 3, currentY + 5.5);

    currentY += 12;

    // Question Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);

    const splitQuestion = doc.splitTextToSize(q.question, pageWidth - (margin * 2));
    doc.text(splitQuestion, margin, currentY);
    currentY += (splitQuestion.length * 5) + 3;

    // Code Snippet (if present)
    if (q.codeSnippet) {
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(15, 23, 42); // slate-900
      const splitCode = doc.splitTextToSize(q.codeSnippet, pageWidth - (margin * 2) - 8);
      const codeBlockHeight = (splitCode.length * 4) + 6;

      doc.roundedRect(margin, currentY, pageWidth - (margin * 2), codeBlockHeight, 2, 2, 'F');
      doc.setTextColor(253, 230, 138); // amber-200
      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.text(splitCode, margin + 4, currentY + 5);

      currentY += codeBlockHeight + 4;
    }

    // Options
    if (q.options && q.options.length > 0) {
      const letters = ['A', 'B', 'C', 'D', 'E'];
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      q.options.forEach((opt, optIdx) => {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }

        const isCorrect = includeAnswers && (
          (q.type === 'multiple-choice' && optIdx === q.correctAnswer) ||
          (q.type === 'true-false' && optIdx === q.correctAnswer) ||
          (q.type === 'multiple-selection' && (q.correctAnswers || []).includes(optIdx))
        );

        if (isCorrect) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(16, 185, 129); // Emerald
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(51, 65, 85);
        }

        const optPrefix = `${letters[optIdx] || optIdx + 1}) `;
        const optLines = doc.splitTextToSize(optPrefix + opt + (isCorrect ? '  [CORRECT]' : ''), pageWidth - (margin * 2) - 4);
        doc.text(optLines, margin + 4, currentY);
        currentY += (optLines.length * 4.5) + 1;
      });
      currentY += 2;
    }

    // Explanation
    if (includeExplanations && q.explanation) {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(238, 242, 255); // Indigo 50
      const splitExpl = doc.splitTextToSize(`Explanation: ${q.explanation}`, pageWidth - (margin * 2) - 8);
      const explHeight = (splitExpl.length * 4) + 6;

      doc.roundedRect(margin, currentY, pageWidth - (margin * 2), explHeight, 2, 2, 'F');
      doc.setTextColor(49, 46, 129); // Indigo 900
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.text(splitExpl, margin + 4, currentY + 4.5);

      currentY += explHeight + 6;
    } else {
      currentY += 4;
    }

    // Subtle divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 6;
  });

  // Footer page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${totalPages} • Advanced Java Master Quiz Study Guide`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  }

  const safeFilename = title.toLowerCase().replace(/[^a-z0-9]/g, '_');
  doc.save(`${safeFilename}_study_guide.pdf`);
}

export function exportPerformanceReportToPdf(progress: QuizProgress) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Header Banner
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Advanced Java Progress & Assessment Report', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()} • Official Study Performance Record`, margin, 24);

  const totalAnswered = Object.keys(progress.answeredQuestions || {}).length;
  const totalCorrect = Object.values(progress.answeredQuestions || {}).filter(a => a.isCorrect).length;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Summary Metrics Table
  autoTable(doc, {
    startY: 40,
    head: [['Metric', 'Value', 'Assessment']],
    body: [
      ['Total Questions Attempted', `${totalAnswered} / 400`, `${Math.round((totalAnswered / 400) * 100)}% Course Coverage`],
      ['Total Correct Answers', `${totalCorrect}`, 'Verified Valid Solutions'],
      ['Overall Accuracy Rate', `${accuracy}%`, accuracy >= 80 ? 'Mastery Level' : (accuracy >= 60 ? 'Competent' : 'Developing')],
      ['Active Daily Streak', `${progress.streak || 1} Days`, `Best Streak: ${progress.bestStreak || 1} Days`],
      ['Bookmarked for Review', `${(progress.bookmarkedQuestions || []).length} Questions`, 'Flagged Key Problems'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], fontStyle: 'bold' },
    styles: { fontSize: 9.5, cellPadding: 4 }
  });

  // Chapter Breakdown Table
  const chapterRows = CHAPTERS.map((ch) => {
    const stats = progress.categoryStats?.[ch.id] || { answered: 0, correct: 0 };
    const ans = stats.answered || 0;
    const cor = stats.correct || 0;
    const acc = ans > 0 ? `${Math.round((cor / ans) * 100)}%` : '0% (Unattempted)';
    const status = ans === 0 ? 'Not Started' : (cor / ans >= 0.8 ? 'Mastered' : (cor / ans >= 0.5 ? 'Good Progress' : 'Needs Review'));

    return [
      `Ch ${ch.number}`,
      ch.title,
      `${ans} / ${ch.totalQuestions}`,
      `${cor}`,
      acc,
      status
    ];
  });

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 12,
    head: [['Ch#', 'Chapter Title', 'Progress', 'Correct', 'Accuracy', 'Status']],
    body: chapterRows,
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 3.5 },
    columnStyles: {
      0: { cellWidth: 12, fontStyle: 'bold' },
      1: { cellWidth: 65 },
      4: { fontStyle: 'bold' }
    }
  });

  doc.save('java_master_quiz_progress_report.pdf');
}
