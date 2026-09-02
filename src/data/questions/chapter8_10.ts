import { Question } from '../../types';

export const chapter8Questions: Question[] = [
  {
    id: 71,
    chapter: 'chapter-8',
    chapterNumber: 8,
    chapterTitle: 'Chapter 8 — Event-Driven Programming Fundamentals',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In Java\'s Event Delegation Model, which role does a JButton act as when user clicks trigger an ActionEvent sent to registered ActionListeners?',
    options: [
      'Event Handler',
      'Event Source',
      'Event Dispatcher Thread',
      'Event Object Payload'
    ],
    correctAnswer: 1,
    explanation: 'In the Event Delegation Model: The GUI component (e.g., JButton) is the Event Source that generates events. It maintains a list of registered Event Listeners (Observer pattern) and notifies them when user actions occur.',
    tags: ['Event-Driven', 'Observer Pattern', 'Event Source', 'Delegation Model']
  },
  {
    id: 72,
    chapter: 'chapter-8',
    chapterNumber: 8,
    chapterTitle: 'Chapter 8 — Event-Driven Programming Fundamentals',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Why are Listener Adapter classes (such as MouseAdapter or WindowAdapter) provided in java.awt.event? (Select ALL that apply)',
    options: [
      'They provide empty default implementations for all methods in the corresponding listener interface.',
      'They allow developers to override only the specific event handler methods they need, without implementing every single interface method.',
      'They prevent compilation errors when only 1 or 2 event callbacks out of 5+ are required.',
      'They replace the need for an Event Dispatch Thread entirely.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'A, B, and C are true. MouseListener has 5 methods. MouseAdapter implements MouseListener with empty body methods, enabling clean subclassing without boilerplate.',
    tags: ['Adapters', 'Event Listeners', 'AWT Events']
  },
  {
    id: 73,
    chapter: 'chapter-8',
    chapterNumber: 8,
    chapterTitle: 'Chapter 8 — Event-Driven Programming Fundamentals',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: In Java Swing, long-running computational tasks should be executed directly inside the ActionListener.actionPerformed() method on the Event Dispatch Thread (EDT) to keep the UI in sync.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 1,
    explanation: 'FALSE: Executing long-running work on the EDT blocks the thread from repainting the UI or processing new OS events, causing the GUI application to freeze ("Not Responding"). Long operations must be delegated to background threads or SwingWorker.',
    tags: ['Swing', 'EDT', 'Concurrency', 'UI Thread']
  }
];

export const chapter9Questions: Question[] = [
  {
    id: 81,
    chapter: 'chapter-9',
    chapterNumber: 9,
    chapterTitle: 'Chapter 9 — Exception Handling & Robustness',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which of the following classes is a CHECKED exception in the standard Java class hierarchy?',
    options: [
      'java.lang.NullPointerException',
      'java.lang.IllegalArgumentException',
      'java.io.IOException',
      'java.lang.IndexOutOfBoundsException'
    ],
    correctAnswer: 2,
    explanation: 'In Java, subclasses of java.lang.Exception that do NOT inherit from java.lang.RuntimeException are CHECKED exceptions (e.g., IOException, SQLException, ClassNotFoundException), requiring explicit try-catch or throws clauses.',
    tags: ['Checked Exceptions', 'IOException', 'Throwable Hierarchy']
  },
  {
    id: 82,
    chapter: 'chapter-9',
    chapterNumber: 9,
    chapterTitle: 'Chapter 9 — Exception Handling & Robustness',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'What is printed to System.out when executing testFinally()? Explain why.',
    codeSnippet: `public static int testFinally() {
    try {
        int x = 10 / 0;
        return 1;
    } catch (ArithmeticException e) {
        return 2;
    } finally {
        return 3;
    }
}`,
    sampleSolution: 'The method returns 3. In Java, the finally block ALWAYS executes before a method returns. If the finally block contains a return statement, it overrides and discards any pending return value or unhandled exception originating from the try or catch blocks. (Note: using return inside finally is considered an anti-pattern for this reason).',
    options: [],
    explanation: 'A return statement inside a finally block preempts previous return values and suppresses pending exceptions.',
    tags: ['Exceptions', 'Try-Catch-Finally', 'Control Flow']
  },
  {
    id: 83,
    chapter: 'chapter-9',
    chapterNumber: 9,
    chapterTitle: 'Chapter 9 — Exception Handling & Robustness',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following statements are TRUE regarding Java\'s try-with-resources statement (Java 7+)? (Select ALL that apply)',
    options: [
      'Resources declared inside the try(...) header must implement java.lang.AutoCloseable or java.io.Closeable.',
      'Resources are closed in the REVERSE order of their declaration.',
      'Resource closing occurs before any explicit catch or finally blocks are executed.',
      'If an exception is thrown in the try block and during auto-close, the close exception is added as a "suppressed exception" accessible via Throwable.getSuppressed().'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four statements describe the exact bytecode and runtime specification of Java try-with-resources: AutoCloseable requirement, reverse-order closing, pre-catch closure, and suppressed exception preservation.',
    tags: ['Try-With-Resources', 'AutoCloseable', 'Suppressed Exceptions']
  },
  {
    id: 84,
    chapter: 'chapter-9',
    chapterNumber: 9,
    chapterTitle: 'Chapter 9 — Exception Handling & Robustness',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: In a multi-catch block (catch (IOException | SQLException e)), the caught exception variable "e" is implicitly final and cannot be reassigned.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: In Java 7+ multi-catch syntax, the exception parameter is implicitly final. Attempting to assign a new value to "e" results in a compile-time error.',
    tags: ['Multi-Catch', 'Implicitly Final', 'Exception Syntax']
  }
];

export const chapter10Questions: Question[] = [
  {
    id: 91,
    chapter: 'chapter-10',
    chapterNumber: 10,
    chapterTitle: 'Chapter 10 — GUI Programming: Swing & JavaFX',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which Swing layout manager divides a container into five distinct regions: NORTH, SOUTH, EAST, WEST, and CENTER, where the CENTER region expands to consume all remaining space?',
    options: [
      'FlowLayout',
      'BorderLayout',
      'GridLayout',
      'CardLayout'
    ],
    correctAnswer: 1,
    explanation: 'BorderLayout is the default layout manager for JFrame content panes. It arranges components into 5 regions (North, South, East, West, Center).',
    tags: ['Swing', 'BorderLayout', 'Layout Managers', 'GUI']
  },
  {
    id: 92,
    chapter: 'chapter-10',
    chapterNumber: 10,
    chapterTitle: 'Chapter 10 — GUI Programming: Swing & JavaFX',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following concepts are foundational to JavaFX modern desktop architecture? (Select ALL that apply)',
    options: [
      'Stage (the top-level window container) and Scene (the container for the visual scene graph)',
      'FXML (XML-based declarative UI markup language paired with Controller classes)',
      'Observable properties and automatic bidirectional data binding (e.g. StringProperty, IntegerProperty)',
      'Styling UI nodes with CSS stylesheets'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four are fundamental pillars of JavaFX: Stage/Scene graph hierarchy, FXML declarative layouts, Observable properties with reactive bindings, and CSS styling.',
    tags: ['JavaFX', 'FXML', 'Scene Graph', 'Data Binding']
  },
  {
    id: 93,
    chapter: 'chapter-10',
    chapterNumber: 10,
    chapterTitle: 'Chapter 10 — GUI Programming: Swing & JavaFX',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: In JavaFX, background threads can directly modify UI scene nodes (such as setting label text) without using Platform.runLater().',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 1,
    explanation: 'FALSE: JavaFX UI nodes are not thread-safe and must only be modified from the JavaFX Application Thread. Any background thread attempting to update UI state must wrap the update inside Platform.runLater(() -> { ... }). Failing to do so throws IllegalStateException.',
    tags: ['JavaFX', 'Platform.runLater', 'Thread Safety']
  }
];
