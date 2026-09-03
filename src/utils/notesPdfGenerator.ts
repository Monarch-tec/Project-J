import jsPDF from 'jspdf';
import { JAVA_FULL_NOTE_METADATA, JAVA_FULL_NOTE_SECTIONS, FullNoteSection } from '../data/javaFullNote';
import { ChapterStudyGuide, StudyTopic } from '../types';
import { CHAPTER_STUDY_NOTES } from '../data/studyNotes';

// Helper to configure standard styling
function setupHeader(doc: jsPDF, title: string, subtitle: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Header Banner
  doc.setFillColor(79, 70, 229); // Indigo 600
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(title, margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(subtitle, margin, 20);
}

function addFooters(doc: jsPDF, docTitle: string) {
  const totalPages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${totalPages} • ${docTitle}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  }
}

/**
 * Generates the complete 111-section Java Master Full Note PDF
 */
export function buildFullNotePdfDocument(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  setupHeader(
    doc,
    'JAVA PROGRAMMING — FULL NOTE [1–111]',
    'Complete Syllabus, OOP Pillars, Collections, Concurrency & Exam Guide'
  );

  let currentY = 36;

  // Metadata block
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 16, 2, 2, 'F');
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Master Examination Reference Note (COS 201.2)', margin + 4, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Total Sections: 111 • Generated: ${new Date().toLocaleDateString()} • Format: Self-Contained Study Note`, margin + 4, currentY + 12);

  currentY += 22;

  let currentCategory = '';

  JAVA_FULL_NOTE_SECTIONS.forEach((sec) => {
    // Category Section Header if changed
    if (sec.category !== currentCategory) {
      currentCategory = sec.category;
      if (currentY > pageHeight - 35) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(238, 242, 255); // Indigo 50
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 8, 2, 2, 'F');
      doc.setTextColor(67, 56, 202); // Indigo 700
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(currentCategory, margin + 4, currentY + 5.5);
      currentY += 12;
    }

    // Check page overflow
    if (currentY > pageHeight - 30) {
      doc.addPage();
      currentY = 20;
    }

    // Section title pill
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1.5, 1.5, 'F');
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(sec.title, margin + 3, currentY + 4.8);
    currentY += 10;

    // Content body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    const splitContent = doc.splitTextToSize(sec.content, pageWidth - margin * 2);
    for (let i = 0; i < splitContent.length; i++) {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(splitContent[i], margin, currentY);
      currentY += 4.2;
    }
    currentY += 2;

    // Diagram if available
    if (sec.diagram) {
      const splitDiagram = doc.splitTextToSize(sec.diagram, pageWidth - margin * 2 - 8);
      const diagHeight = splitDiagram.length * 3.4 + 6;

      if (currentY + Math.min(diagHeight, 40) > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFillColor(15, 23, 42); // slate-900
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, diagHeight, 2, 2, 'F');
      doc.setTextColor(253, 230, 138); // amber-200
      doc.setFont('courier', 'normal');
      doc.setFontSize(7);
      doc.text(splitDiagram, margin + 4, currentY + 4.5);
      currentY += diagHeight + 4;
    }

    // Code snippet
    if (sec.codeSnippet) {
      const splitCode = doc.splitTextToSize(sec.codeSnippet, pageWidth - margin * 2 - 8);
      const codeHeight = splitCode.length * 3.5 + 6;

      if (currentY + Math.min(codeHeight, 40) > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }

      // If code fits on remainder of page
      if (currentY + codeHeight <= pageHeight - 15) {
        doc.setFillColor(15, 23, 42); // slate-900
        doc.roundedRect(margin, currentY, pageWidth - margin * 2, codeHeight, 2, 2, 'F');
        doc.setTextColor(253, 230, 138); // amber-200
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.5);
        doc.text(splitCode, margin + 4, currentY + 4.5);
        currentY += codeHeight + 4;
      } else {
        // Multi-page code snippet handling
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(253, 230, 138);

        let lineIdx = 0;
        while (lineIdx < splitCode.length) {
          if (currentY > pageHeight - 25) {
            doc.addPage();
            currentY = 20;
          }
          const availableLines = Math.max(1, Math.floor((pageHeight - 20 - currentY - 6) / 3.5));
          const chunkLines = splitCode.slice(lineIdx, lineIdx + availableLines);
          const chunkH = chunkLines.length * 3.5 + 6;

          doc.setFillColor(15, 23, 42);
          doc.roundedRect(margin, currentY, pageWidth - margin * 2, chunkH, 2, 2, 'F');
          doc.setTextColor(253, 230, 138);
          doc.text(chunkLines, margin + 4, currentY + 4.5);
          currentY += chunkH + 3;
          lineIdx += chunkLines.length;
        }
      }
    }

    // Code explanation
    if (sec.codeExplanation) {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      const splitExp = doc.splitTextToSize(sec.codeExplanation, pageWidth - margin * 2);
      for (let i = 0; i < splitExp.length; i++) {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(splitExp[i], margin, currentY);
        currentY += 3.8;
      }
      currentY += 2;
    }

    // Output
    if (sec.output) {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(16, 185, 129); // emerald-600
      const splitOut = doc.splitTextToSize(`Expected Output: ${sec.output.replace(/\\n/g, '  |  ')}`, pageWidth - margin * 2);
      for (let i = 0; i < splitOut.length; i++) {
        if (currentY > pageHeight - 20) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(splitOut[i], margin, currentY);
        currentY += 4;
      }
      currentY += 2;
    }

    // Table
    if (sec.table && sec.table.headers.length > 0 && sec.table.rows.length > 0) {
      if (currentY > pageHeight - 35) {
        doc.addPage();
        currentY = 20;
      }

      // Tabular layout with column width calculation
      const numCols = sec.table.headers.length;
      const colWidth = (pageWidth - margin * 2) / numCols;

      doc.setFillColor(226, 232, 240);
      doc.rect(margin, currentY, pageWidth - margin * 2, 5.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);

      sec.table.headers.forEach((h, hIdx) => {
        const splitH = doc.splitTextToSize(h, colWidth - 2);
        doc.text(splitH[0] || '', margin + hIdx * colWidth + 2, currentY + 4);
      });
      currentY += 6.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);

      sec.table.rows.forEach((r, rIdx) => {
        if (currentY > pageHeight - 18) {
          doc.addPage();
          currentY = 20;
        }
        // Background row alternating tint
        if (rIdx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, currentY, pageWidth - margin * 2, 5, 'F');
        }

        r.forEach((cell, cIdx) => {
          if (cIdx < numCols) {
            const splitCell = doc.splitTextToSize(String(cell || ''), colWidth - 3);
            doc.text(splitCell[0] || '', margin + cIdx * colWidth + 2, currentY + 3.5);
          }
        });
        currentY += 5;
      });
      currentY += 3;
    }

    // Exam note
    if (sec.examNote) {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFillColor(254, 243, 199); // amber-100
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1.5, 1.5, 'F');
      doc.setTextColor(146, 64, 14); // amber-800
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      const splitExam = doc.splitTextToSize(`Exam Note: ${sec.examNote}`, pageWidth - margin * 2 - 6);
      doc.text(splitExam, margin + 3, currentY + 4.5);
      currentY += splitExam.length * 4 + 4;
    }

    // Divider
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 4;
  });

  addFooters(doc, 'Java Full Note [1–111]');
  return doc;
}

/**
 * Generates an Individual Chapter Study Guide PDF
 */
export function buildChapterPdfDocument(chapter: ChapterStudyGuide): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  setupHeader(
    doc,
    `Java Chapter ${chapter.chapterNumber}: ${chapter.title}`,
    chapter.subtitle
  );

  let currentY = 36;

  // Overview
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Chapter Overview', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const splitOverview = doc.splitTextToSize(chapter.overview, pageWidth - margin * 2);
  doc.text(splitOverview, margin, currentY);
  currentY += splitOverview.length * 4.2 + 5;

  // Summary checklist
  if (chapter.quickSummaryChecklist && chapter.quickSummaryChecklist.length > 0) {
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 6, 1.5, 1.5, 'F');
    doc.setTextColor(67, 56, 202);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Key Summary Points', margin + 3, currentY + 4.2);
    currentY += 9;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    chapter.quickSummaryChecklist.forEach((item) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      const itemText = `[x]  ${item}`;
      const splitItem = doc.splitTextToSize(itemText, pageWidth - margin * 2 - 4);
      doc.text(splitItem, margin + 2, currentY);
      currentY += splitItem.length * 4 + 1;
    });
    currentY += 4;
  }

  // Core Concepts
  chapter.coreConcepts.forEach((concept) => {
    if (currentY > pageHeight - 35) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 2, 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(concept.title, margin + 3, currentY + 5);
    currentY += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const splitSumm = doc.splitTextToSize(concept.summary, pageWidth - margin * 2);
    doc.text(splitSumm, margin, currentY);
    currentY += splitSumm.length * 4 + 3;

    concept.keyPoints.forEach((kp) => {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      const bulletText = `•  ${kp}`;
      const splitBullet = doc.splitTextToSize(bulletText, pageWidth - margin * 2 - 4);
      doc.text(splitBullet, margin + 2, currentY);
      currentY += splitBullet.length * 3.8 + 1;
    });

    if (concept.codeExample) {
      if (currentY > pageHeight - 35) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFillColor(15, 23, 42);
      const splitCode = doc.splitTextToSize(concept.codeExample, pageWidth - margin * 2 - 8);
      const codeHeight = splitCode.length * 3.4 + 6;
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, codeHeight, 2, 2, 'F');
      doc.setTextColor(253, 230, 138);
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.text(splitCode, margin + 4, currentY + 4.5);
      currentY += codeHeight + 4;
    }

    if (concept.pitfalls && concept.pitfalls.length > 0) {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }
      doc.setTextColor(185, 28, 28); // red-700
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      concept.pitfalls.forEach((pit) => {
        const pitText = `Warning: ${pit}`;
        const splitPit = doc.splitTextToSize(pitText, pageWidth - margin * 2);
        doc.text(splitPit, margin, currentY);
        currentY += splitPit.length * 3.5 + 1;
      });
      currentY += 2;
    }

    currentY += 3;
  });

  addFooters(doc, `Chapter ${chapter.chapterNumber} Study Guide`);
  return doc;
}

/**
 * Generates an Individual Study Topic Note PDF
 */
export function buildTopicPdfDocument(topic: StudyTopic, chapterName: string): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  setupHeader(
    doc,
    topic.title,
    `${chapterName} • Detailed Topic Theory & Code Guide`
  );

  let currentY = 36;

  // Topic Summary
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 2, 2, 'F');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Concept Summary', margin + 3, currentY + 5);
  currentY += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const splitSumm = doc.splitTextToSize(topic.summary, pageWidth - margin * 2);
  doc.text(splitSumm, margin, currentY);
  currentY += splitSumm.length * 4.2 + 6;

  // Deep Dive Notes if available
  if (topic.deepDiveNotes && topic.deepDiveNotes.length > 0) {
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('In-Depth Theoretical Deep Dive', margin, currentY);
    currentY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const combinedNotes = Array.isArray(topic.deepDiveNotes) ? topic.deepDiveNotes.join('\n\n') : String(topic.deepDiveNotes);
    const splitDeep = doc.splitTextToSize(combinedNotes, pageWidth - margin * 2);
    for (let i = 0; i < splitDeep.length; i++) {
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(splitDeep[i], margin, currentY);
      currentY += 4;
    }
    currentY += 4;
  }

  // Key Architectural Points
  if (currentY > pageHeight - 30) {
    doc.addPage();
    currentY = 20;
  }
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Key Technical Points', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  topic.keyPoints.forEach((kp) => {
    if (currentY > pageHeight - 20) {
      doc.addPage();
      currentY = 20;
    }
    const bulletText = `•  ${kp}`;
    const splitBullet = doc.splitTextToSize(bulletText, pageWidth - margin * 2 - 4);
    doc.text(splitBullet, margin + 2, currentY);
    currentY += splitBullet.length * 4 + 1;
  });
  currentY += 4;

  // Code Example
  if (topic.codeExample) {
    if (currentY > pageHeight - 40) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFillColor(15, 23, 42);
    const splitCode = doc.splitTextToSize(topic.codeExample, pageWidth - margin * 2 - 8);
    const codeHeight = splitCode.length * 3.5 + 6;
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, codeHeight, 2, 2, 'F');
    doc.setTextColor(253, 230, 138);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.text(splitCode, margin + 4, currentY + 4.5);
    currentY += codeHeight + 5;
  }

  // Pitfalls
  if (topic.pitfalls && topic.pitfalls.length > 0) {
    if (currentY > pageHeight - 25) {
      doc.addPage();
      currentY = 20;
    }
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 6, 1.5, 1.5, 'F');
    doc.setTextColor(185, 28, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Common Pitfalls & Runtime Bugs', margin + 3, currentY + 4.2);
    currentY += 9;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(153, 27, 27);
    topic.pitfalls.forEach((pit) => {
      const pitText = `•  ${pit}`;
      const splitPit = doc.splitTextToSize(pitText, pageWidth - margin * 2 - 4);
      doc.text(splitPit, margin + 2, currentY);
      currentY += splitPit.length * 3.8 + 1;
    });
  }

  addFooters(doc, `${topic.title} Study Note`);
  return doc;
}

/**
 * Generates All Chapters Combined Master Study Guide PDF
 */
export function buildAllChaptersPdfDocument(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  setupHeader(
    doc,
    'Java Master Course — Full 14-Chapter Syllabus',
    'Curriculum Study Guide, Architectures & Concept Checklists'
  );

  let currentY = 36;

  CHAPTER_STUDY_NOTES.forEach((ch, idx) => {
    if (idx > 0) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFillColor(79, 70, 229);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Chapter ${ch.chapterNumber}: ${ch.title}`, margin + 4, currentY + 6.5);
    currentY += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const splitOver = doc.splitTextToSize(ch.overview, pageWidth - margin * 2);
    doc.text(splitOver, margin, currentY);
    currentY += splitOver.length * 4 + 4;

    ch.coreConcepts.forEach((concept) => {
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 6, 1.5, 1.5, 'F');
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(concept.title, margin + 3, currentY + 4.2);
      currentY += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const splitS = doc.splitTextToSize(concept.summary, pageWidth - margin * 2);
      doc.text(splitS, margin, currentY);
      currentY += splitS.length * 3.6 + 2;

      concept.keyPoints.slice(0, 3).forEach((kp) => {
        const bullet = `• ${kp}`;
        const splitB = doc.splitTextToSize(bullet, pageWidth - margin * 2);
        doc.text(splitB, margin + 2, currentY);
        currentY += splitB.length * 3.5 + 1;
      });
      currentY += 3;
    });
  });

  addFooters(doc, 'Java Master 14-Chapter Syllabus');
  return doc;
}
