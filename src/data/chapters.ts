import { ChapterMeta, ChapterId } from '../types';

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'chapter-1',
    number: 1,
    chapterNumber: 1,
    title: 'Chapter 1 — Intro to OOP',
    subtitle: 'Encapsulation, Inheritance, Polymorphism, Abstraction, Interfaces',
    description: 'Object-oriented fundamentals, data hiding, dynamic dispatch, abstract classes vs interfaces, method overriding vs overloading.',
    iconName: 'Boxes',
    totalQuestions: 25,
    color: 'indigo',
    topics: ['Encapsulation & Data Hiding', 'Dynamic Dispatch & Polymorphism', 'Abstract Classes vs Interfaces', 'Method Overriding vs Overloading', 'Constructors & super() chains']
  },
  {
    id: 'chapter-2',
    number: 2,
    chapterNumber: 2,
    title: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    subtitle: 'Access modifiers, package scoping, classloaders, JPMS modularity',
    description: 'Package structures, public/protected/package-private/private scoping, inheritance trees, module-info.java, exports vs opens.',
    iconName: 'Layers',
    totalQuestions: 25,
    color: 'blue',
    topics: ['Package scoping & access rules', 'Protected access in sub-packages', 'Classloader delegation hierarchy', 'JPMS module-info.java declarations', 'Exports vs Opens directives']
  },
  {
    id: 'chapter-3',
    number: 3,
    chapterNumber: 3,
    title: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections',
    subtitle: 'Collections Framework, ArrayList, LinkedList, Stack, Queue, Deque',
    description: 'Core collection interfaces, ArrayList resizing, LinkedList pointer mechanics, Queue/Deque implementations, legacy Enumeration.',
    iconName: 'ListOrdered',
    totalQuestions: 25,
    color: 'emerald',
    topics: ['ArrayList growth & amortized cost', 'LinkedList doubly-linked nodes', 'ArrayDeque vs Stack for LIFO/FIFO', 'PriorityQueue heap mechanics', 'Enumeration vs Iterator']
  },
  {
    id: 'chapter-4',
    number: 4,
    chapterNumber: 4,
    title: 'Chapter 4 — Iterator Pattern in Depth & Enumerator Interfaces',
    subtitle: 'Fail-fast vs fail-safe, ConcurrentModificationException, custom Iterators',
    description: 'Iterator contract, next()/hasNext()/remove() semantics, modCount tracking, ListIterator bidirectional traversal, custom Iterable implementations.',
    iconName: 'Repeat',
    totalQuestions: 25,
    color: 'teal',
    topics: ['Fail-fast & modCount validation', 'ConcurrentModificationException causes', 'ListIterator bidirectional cursors', 'Custom Iterator implementation', 'Spliterator & parallel splitting']
  },
  {
    id: 'chapter-5',
    number: 5,
    chapterNumber: 5,
    title: 'Chapter 5 — Searching Algorithms',
    subtitle: 'Linear & Binary Search, Interpolation Search, search complexities',
    description: 'Linear search mechanics, binary search on sorted sequences, edge cases with integer overflow (low + high >>> 1), Arrays.binarySearch semantics.',
    iconName: 'Search',
    totalQuestions: 25,
    color: 'cyan',
    topics: ['Linear search vs Binary search', 'Binary search midpoint overflow prevention', 'Arrays.binarySearch insertion point formula', 'Interpolation search bounds', 'Exponential search']
  },
  {
    id: 'chapter-6',
    number: 6,
    chapterNumber: 6,
    title: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    subtitle: 'Bubble, Insertion, Selection, Merge, QuickSort, TimSort, Time/Space Complexity',
    description: 'Algorithm efficiency, Big-O worst/average/best case analysis, stable vs unstable sorts, Dual-Pivot QuickSort, TimSort in Java Arrays.sort().',
    iconName: 'BarChart3',
    totalQuestions: 25,
    color: 'amber',
    topics: ['Time complexity Big-O classification', 'Bubble, Insertion & Selection sorting', 'MergeSort vs Dual-Pivot QuickSort', 'TimSort galloping and run detection', 'Stability in comparator sorting']
  },
  {
    id: 'chapter-7',
    number: 7,
    chapterNumber: 7,
    title: 'Chapter 7 — Recursion',
    subtitle: 'Base cases, call stack mechanics, recursion tree, StackOverflowError, memoization',
    description: 'Recursive thinking, tail recursion, divide-and-conquer paradigms, recursive backtracking (N-Queens, Maze), recursion depth limits.',
    iconName: 'GitFork',
    totalQuestions: 25,
    color: 'orange',
    topics: ['Base case termination & invariants', 'Call stack frames & StackOverflowError', 'Tail call optimization considerations in JVM', 'Recursive backtracking algorithms', 'Memoization & dynamic programming top-down']
  },
  {
    id: 'chapter-8',
    number: 8,
    chapterNumber: 8,
    title: 'Chapter 8 — Event-Driven Programming Fundamentals',
    subtitle: 'Event sources, Event listeners, Observer pattern, ActionEvent, MouseEvent',
    description: 'Event delegation model, listener interfaces, adapter classes, anonymous inner classes, event dispatching thread (EDT).',
    iconName: 'Zap',
    totalQuestions: 25,
    color: 'yellow',
    topics: ['Event delegation architecture', 'Listener interfaces & EventObject', 'Adapter classes for partial handlers', 'Anonymous inner classes & Lambdas in events', 'Event dispatch thread (EDT) model']
  },
  {
    id: 'chapter-9',
    number: 9,
    chapterNumber: 9,
    title: 'Chapter 9 — Exception Handling & Robustness',
    subtitle: 'Checked vs Unchecked, try-catch-finally, try-with-resources, AutoCloseable',
    description: 'Throwable hierarchy, custom exceptions, rethrowing, suppressed exceptions, try-with-resources bytecode, clean resource management.',
    iconName: 'ShieldAlert',
    totalQuestions: 25,
    color: 'rose',
    topics: ['Throwable, Exception vs Error', 'Checked vs Unchecked semantics', 'try-with-resources & AutoCloseable', 'Suppressed exceptions mechanism', 'Custom business exception design']
  },
  {
    id: 'chapter-10',
    number: 10,
    chapterNumber: 10,
    title: 'Chapter 10 — GUI Programming: Swing & JavaFX',
    subtitle: 'JFrame, JPanel, Layout Managers, JavaFX Stage/Scene, FXML, CSS',
    description: 'Swing components (BorderLayout, GridBagLayout), Event Dispatch Thread safety, JavaFX Application lifecycle, ObservableList, Property bindings.',
    iconName: 'Layout',
    totalQuestions: 25,
    color: 'purple',
    topics: ['Swing JFrame & JPanel hierarchies', 'Layout managers (BorderLayout, GridBagLayout)', 'SwingUtilities.invokeLater concurrency', 'JavaFX Stage, Scene & FXML', 'ObservableList & Property bindings']
  },
  {
    id: 'chapter-11',
    number: 11,
    chapterNumber: 11,
    title: 'Chapter 11 — Data Structures & GUI Frameworks (continued)',
    subtitle: 'Tree models (JTree, TreeView), Table models (JTable, TableView), custom renderers',
    description: 'Data models for UI components, DefaultTableModel, TreeModel, custom CellRenderers and CellEditors, virtualized lists in JavaFX.',
    iconName: 'Database',
    totalQuestions: 25,
    color: 'violet',
    topics: ['JTable & DefaultTableModel architectures', 'Custom TableCellRenderer & TableCellEditor', 'JTree & TreeModel node structures', 'JavaFX TableView & CellValueFactory', 'Virtualized UI rendering performance']
  },
  {
    id: 'chapter-12',
    number: 12,
    chapterNumber: 12,
    title: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    subtitle: 'Lambda expressions, method references, Stream API, CompletableFuture, Virtual Threads',
    description: 'Functional interfaces (Function, Predicate, Consumer, Supplier), Stream pipelines, parallelStreams, java.util.concurrent, ExecutorService, Virtual Threads (Project Loom).',
    iconName: 'Sparkles',
    totalQuestions: 25,
    color: 'sky',
    topics: ['@FunctionalInterface & SAM types', 'Method references (ClassName::method)', 'Stream pipelines & intermediate/terminal ops', 'CompletableFuture async chaining', 'Virtual Threads & structured concurrency']
  },
  {
    id: 'chapter-13',
    number: 13,
    chapterNumber: 13,
    title: 'Chapter 13 — Project Planning & Software Design',
    subtitle: 'SOLID principles, Design Patterns, UML diagrams, MVC/MVVM architecture, Unit testing',
    description: 'Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion, Factory/Singleton/Strategy patterns, JUnit 5 assertions & mocking.',
    iconName: 'FileCode2',
    totalQuestions: 25,
    color: 'emerald',
    topics: ['SOLID design principles', 'Creational, Structural & Behavioral patterns', 'UML class diagrams & associations', 'MVC vs MVVM architectural models', 'JUnit 5 assertions, lifecycle & Mockito']
  },
  {
    id: 'chapter-14',
    number: 14,
    chapterNumber: 14,
    title: 'Chapter 14 — Major Advanced Programming Concepts',
    subtitle: 'OOP, Collections, Concurrency, I/O, JDBC, Sockets, Patterns & Memory',
    description: 'Comprehensive mastery of Java core & advanced pillars: Encapsulation, Polymorphism, Inheritance types, Interfaces, Exceptions, Generics, File I/O, Serialization, Multithreading, Streams, JDBC, Sockets, GUI, Patterns, and JVM Memory Management.',
    iconName: 'GraduationCap',
    totalQuestions: 24,
    color: 'amber',
    topics: [
      'OOP 4 Pillars & Inheritance Types',
      'Runtime vs Compile-time Polymorphism',
      'Abstract Classes & Interfaces',
      'Exception Handling & Custom Exceptions',
      'Collections Framework & Iterators',
      'Generics & Type Safety',
      'File Handling, Streams & Serialization',
      'Multithreading, Concurrency & Utilities',
      'Functional Interfaces & Stream API',
      'JDBC, Sockets & Networking',
      'GUI Programming (Swing & JavaFX)',
      'Design Patterns (Singleton, Factory, Observer, MVC)',
      'Java Memory Management (Stack, Heap, GC)'
    ]
  }
];

export const CATEGORIES = CHAPTERS;
