import { Question } from '../../types';
import { chapter1Questions } from './chapter1';
import { chapter2Questions } from './chapter2';
import { chapter3Questions, chapter4Questions } from './chapter3_4';
import { chapter5Questions, chapter6Questions, chapter7Questions } from './chapter5_7';
import { chapter8Questions, chapter9Questions, chapter10Questions } from './chapter8_10';
import { chapter11Questions, chapter12Questions, chapter13Questions } from './chapter11_13';

// Additional high-yield questions for each chapter
export const additionalCurriculumQuestions: Question[] = [
  // Chapter 1 additions
  {
    id: 9,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which of the following describes the fundamental distinction between method overloading and method overriding in Java?',
    options: [
      'Overloading is compile-time (static) polymorphism in the same class; overriding is runtime (dynamic) polymorphism in a subclass.',
      'Overloading requires inheritance; overriding does not.',
      'Overriding allows different parameter types; overloading requires exact same parameter types.',
      'Overloading requires the @Override annotation; overriding prohibits it.'
    ],
    correctAnswer: 0,
    explanation: 'Method overloading occurs within the same class hierarchy by changing parameter types or count, resolved statically at compile-time. Method overriding replaces superclass method implementations in a subclass with the exact same signature, resolved dynamically at runtime.',
    tags: ['Overloading', 'Overriding', 'Polymorphism']
  },
  {
    id: 10,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: In Java, an interface can extend multiple other interfaces using the "extends" keyword.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE: While Java classes can only extend a single class (single inheritance of state), Java interfaces can extend multiple interfaces simultaneously (e.g., interface C extends A, B).',
    tags: ['Interfaces', 'Multiple Inheritance', 'OOP']
  },

  // Chapter 2 additions
  {
    id: 16,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'If a class member has no access modifier specified (default / package-private), which classes can access that member?',
    options: [
      'Only the enclosing class',
      'Any class in the exact same package',
      'Any subclass in any package',
      'Any class in the JVM classpath'
    ],
    correctAnswer: 1,
    explanation: 'Default (package-private) access restricts visibility strictly to classes declared within the same package. Subclasses in different packages cannot access default members.',
    tags: ['Access Modifiers', 'Package-Private', 'Scoping']
  },
  {
    id: 17,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'true-false',
    difficulty: 'Advanced',
    question: 'True or False: In JPMS modularity, the "requires transitive <module>" directive means any module that depends on your module will automatically implicitly depend on <module> as well.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE: "requires transitive" creates an implied readability relationship. Downstream consumers of your module automatically gain read access to the transitive dependency without needing to declare it themselves in their module-info.java.',
    tags: ['JPMS', 'Requires Transitive', 'Modularity']
  },

  // Chapter 3 additions
  {
    id: 25,
    chapter: 'chapter-3',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections Framework',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which Java Collection implementation offers O(1) constant time insertion and deletion at BOTH the head and tail ends without node allocation overhead?',
    options: [
      'java.util.ArrayList',
      'java.util.ArrayDeque',
      'java.util.LinkedList',
      'java.util.PriorityQueue'
    ],
    correctAnswer: 1,
    explanation: 'ArrayDeque uses a resizable circular array buffer, supporting amortized O(1) head/tail insertions (offerFirst/offerLast) and removals (pollFirst/pollLast) without the per-node GC/pointer memory overhead of LinkedList.',
    tags: ['ArrayDeque', 'Deque', 'Queue', 'Performance']
  },
  {
    id: 26,
    chapter: 'chapter-3',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections Framework',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following collection classes are thread-safe out of the box in the Java standard library? (Select ALL that apply)',
    options: [
      'java.util.concurrent.ConcurrentLinkedQueue',
      'java.util.Vector',
      'java.util.ArrayList',
      'java.util.concurrent.CopyOnWriteArrayList'
    ],
    correctAnswers: [0, 1, 3],
    explanation: 'ConcurrentLinkedQueue (lock-free CAS queue), Vector (synchronized methods), and CopyOnWriteArrayList (copy-on-write snapshotting) are thread-safe. ArrayList is unsynchronized and NOT thread-safe.',
    tags: ['Collections', 'Thread Safety', 'Concurrency']
  },

  // Chapter 4 additions
  {
    id: 34,
    chapter: 'chapter-4',
    chapterNumber: 4,
    chapterTitle: 'Chapter 4 — Iterator Pattern in Depth & Enumerator Interfaces',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'Explain why iterating through a java.util.concurrent.CopyOnWriteArrayList NEVER throws ConcurrentModificationException, even when other threads modify the list during iteration.',
    sampleSolution: 'CopyOnWriteArrayList creates an immutable snapshot of its underlying array whenever an iterator is created (via iterator()). When write operations occur (such as add, set, or remove), the list makes a fresh copy of the backing array rather than modifying the existing array in place. The active iterator continues reading from its isolated snapshot array, so it never detects structural modification or throws ConcurrentModificationException.',
    options: [],
    explanation: 'CopyOnWriteArrayList iterators are snapshot-based and fail-safe, operating on the immutable array reference captured at iterator creation time.',
    tags: ['CopyOnWriteArrayList', 'Iterator Pattern', 'Fail-Safe', 'Snapshots']
  },

  // Chapter 5 additions
  {
    id: 44,
    chapter: 'chapter-5',
    chapterNumber: 5,
    chapterTitle: 'Chapter 5 — Searching Algorithms',
    type: 'multiple-choice',
    difficulty: 'Fundamental',
    question: 'What is the minimum requirement for an input dataset before performing Binary Search?',
    options: [
      'The elements must be unique with no duplicates.',
      'The dataset must be sorted in monotonic order (ascending or descending).',
      'The dataset must be stored in a linked list.',
      'The dataset length must be an exact power of 2.'
    ],
    correctAnswer: 1,
    explanation: 'Binary Search operates by halving the search space at each step based on order comparison, which strictly requires the collection to be sorted in monotonic order.',
    tags: ['Binary Search', 'Prerequisites', 'Sorting']
  },

  // Chapter 6 additions
  {
    id: 54,
    chapter: 'chapter-6',
    chapterNumber: 6,
    chapterTitle: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What does it mean for a sorting algorithm to be "STABLE"?',
    options: [
      'It never crashes or throws OutOfMemoryError.',
      'It preserves the relative original order of elements that have equal keys / values.',
      'Its best, average, and worst-case time complexities are identical.',
      'It runs without allocating any additional heap memory.'
    ],
    correctAnswer: 1,
    explanation: 'A sorting algorithm is stable if two elements with equal sorting keys appear in the sorted output in the exact same relative order as they were in the input collection.',
    tags: ['Sorting', 'Stability', 'Algorithms']
  },
  {
    id: 55,
    chapter: 'chapter-6',
    chapterNumber: 6,
    chapterTitle: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    type: 'subjective-code',
    difficulty: 'Intermediate',
    question: 'Compare the worst-case, average-case, and best-case time complexities of Merge Sort vs Quick Sort in Big-O notation.',
    sampleSolution: 'Merge Sort: Best = O(N log N), Average = O(N log N), Worst = O(N log N), Space = O(N). Quick Sort: Best = O(N log N), Average = O(N log N), Worst = O(N^2) (e.g. sorted array with poor pivot selection), Space = O(log N) auxiliary call stack.',
    options: [],
    explanation: 'Merge Sort provides guaranteed O(N log N) performance with O(N) memory overhead; QuickSort is faster in practice due to cache locality but degrades to O(N^2) worst-case without randomized or dual-pivot selection.',
    tags: ['Sorting', 'Big-O', 'MergeSort', 'QuickSort']
  },

  // Chapter 7 additions
  {
    id: 64,
    chapter: 'chapter-7',
    chapterNumber: 7,
    chapterTitle: 'Chapter 7 — Recursion',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the primary role of the "Base Case" in any recursive algorithm?',
    options: [
      'To allocate heap memory for intermediate calculations.',
      'To provide a terminating condition that returns a value directly without making further recursive calls, preventing infinite recursion.',
      'To optimize the method for JIT compiler inlining.',
      'To print debug logs to System.out.'
    ],
    correctAnswer: 1,
    explanation: 'The base case terminates the recursive loop by providing a direct result for the simplest input, unwinding the call stack and preventing infinite recursion and StackOverflowError.',
    tags: ['Recursion', 'Base Case', 'Call Stack']
  },

  // Chapter 8 additions
  {
    id: 74,
    chapter: 'chapter-8',
    chapterNumber: 8,
    chapterTitle: 'Chapter 8 — Event-Driven Programming Fundamentals',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In Java 8+, what is the most concise way to register an ActionListener on a JButton using lambda syntax?',
    options: [
      'button.addActionListener(e -> handleButtonClick(e));',
      'button.setListener("click", handleButtonClick);',
      'button.subscribe(new Observer());',
      'button.onEvent(ActionEvent.CLICK);'
    ],
    correctAnswer: 0,
    explanation: 'Because ActionListener is a Functional Interface with the single abstract method actionPerformed(ActionEvent e), it can be implemented concisely with a lambda: button.addActionListener(e -> handleButtonClick(e)) or method reference button.addActionListener(this::handleButtonClick).',
    tags: ['ActionListener', 'Lambdas', 'Event-Driven']
  },

  // Chapter 9 additions
  {
    id: 85,
    chapter: 'chapter-9',
    chapterNumber: 9,
    chapterTitle: 'Chapter 9 — Exception Handling & Robustness',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which exception is thrown when attempting to cast an object reference to a class type of which it is not an instance?',
    options: [
      'java.lang.IllegalArgumentException',
      'java.lang.ClassCastException',
      'java.lang.NullPointerException',
      'java.lang.IllegalStateException'
    ],
    correctAnswer: 1,
    explanation: 'ClassCastException is thrown by the JVM at runtime when code attempts to downcast an object reference to a subtype that does not match the actual runtime instance.',
    tags: ['ClassCastException', 'Type Casting', 'Runtime Exceptions']
  },

  // Chapter 10 additions
  {
    id: 94,
    chapter: 'chapter-10',
    chapterNumber: 10,
    chapterTitle: 'Chapter 10 — GUI Programming: Swing & JavaFX',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In Swing GUI development, what method must be used to safely initialize and display a JFrame on the Event Dispatch Thread?',
    options: [
      'Thread.start(new JFrame());',
      'SwingUtilities.invokeLater(() -> new MyFrame().setVisible(true));',
      'new MyFrame().showNow();',
      'Runtime.getRuntime().execGUI(new MyFrame());'
    ],
    correctAnswer: 1,
    explanation: 'Swing is not multi-thread safe; all component creation and manipulation must take place on the Event Dispatch Thread (EDT) using SwingUtilities.invokeLater() or java.awt.EventQueue.invokeLater().',
    tags: ['Swing', 'EDT', 'SwingUtilities', 'Thread Safety']
  },

  // Chapter 11 additions
  {
    id: 104,
    chapter: 'chapter-11',
    chapterNumber: 11,
    chapterTitle: 'Chapter 11 — Data Structures & GUI Frameworks (continued)',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'When customizing how specific data types (such as dates or boolean checkboxes) render in JTable columns, which interface must be implemented?',
    options: [
      'javax.swing.table.TableCellRenderer',
      'java.awt.GraphicsRenderer',
      'javax.swing.DataFormatter',
      'java.util.Observer'
    ],
    correctAnswer: 0,
    explanation: 'TableCellRenderer defines the method getTableCellRendererComponent() which returns a Component (e.g. JLabel, JCheckBox) configured to paint the cell value.',
    tags: ['JTable', 'TableCellRenderer', 'Swing', 'MVC']
  },

  // Chapter 12 additions
  {
    id: 115,
    chapter: 'chapter-12',
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which method reference syntax corresponds to calling the static method "Integer.parseInt(s)"?',
    options: [
      'Integer::parseInt',
      'Integer.class::parseInt',
      'Integer->parseInt',
      '::Integer.parseInt'
    ],
    correctAnswer: 0,
    explanation: 'In Java 8+, static method references use the syntax ClassName::staticMethodName (e.g., Integer::parseInt).',
    tags: ['Method References', 'Lambdas', 'Modern Java']
  },
  {
    id: 116,
    chapter: 'chapter-12',
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'What is the fundamental difference between standard Platform OS Threads and Virtual Threads in Java 21 when handling blocking I/O (e.g. HTTP socket read)?',
    sampleSolution: 'When an OS Platform Thread encounters blocking I/O, the underlying OS kernel thread goes to sleep and remains blocked, holding onto its allocated memory (~1MB stack) and kernel resources. In contrast, when a Java 21 Virtual Thread blocks on I/O, the JVM unmounts the virtual thread from its carrier OS thread (saving its continuation on the heap) and immediately reassigns the carrier thread to execute other virtual threads. Once I/O completes, the JVM schedules the virtual thread onto an available carrier thread, enabling massive scalability (100,000+ concurrent requests).',
    options: [],
    explanation: 'Virtual threads unmount from carrier threads on blocking I/O operations via continuations, eliminating OS-level thread blocking.',
    tags: ['Virtual Threads', 'Project Loom', 'Concurrency', 'JVM']
  },

  // Chapter 13 additions
  {
    id: 125,
    chapter: 'chapter-13',
    chapterNumber: 13,
    chapterTitle: 'Chapter 13 — Project Planning & Software Design',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In the Model-View-Controller (MVC) architectural pattern, what is the sole responsibility of the Controller?',
    options: [
      'Store and manage database persistence schemas.',
      'Render the pixels and UI components onto the screen.',
      'Accept user input/events, translate them into model updates, and select views to render.',
      'Compile bytecode during application startup.'
    ],
    correctAnswer: 2,
    explanation: 'The Controller acts as the intermediary coordinator: it receives user interactions from the View, commands the Model to update its state, and informs the View of required updates.',
    tags: ['MVC', 'Software Architecture', 'Design Patterns']
  }
];

export const ALL_CURRICULUM_QUESTIONS: Question[] = [
  ...chapter1Questions,
  ...chapter2Questions,
  ...chapter3Questions,
  ...chapter4Questions,
  ...chapter5Questions,
  ...chapter6Questions,
  ...chapter7Questions,
  ...chapter8Questions,
  ...chapter9Questions,
  ...chapter10Questions,
  ...chapter11Questions,
  ...chapter12Questions,
  ...chapter13Questions,
  ...additionalCurriculumQuestions
].sort((a, b) => a.id - b.id);
