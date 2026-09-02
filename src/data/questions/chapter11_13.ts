import { Question } from '../../types';

export const chapter11Questions: Question[] = [
  {
    id: 101,
    chapter: 'chapter-11',
    chapterNumber: 11,
    chapterTitle: 'Chapter 11 — Data Structures & GUI Frameworks (continued)',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In Swing\'s MVC architecture for complex components like JTable and JTree, what separates the underlying data structure from the visual presentation?',
    options: [
      'The TableModel / TreeModel holds the data structure, while CellRenderer handles custom visual painting.',
      'The JFrame stores all rows in an unmodifiable array.',
      'Data must be converted to raw HTML strings before rendering.',
      'JTable requires a SQL ResultSet directly to display cells.'
    ],
    correctAnswer: 0,
    explanation: 'Swing strictly adheres to the Model-View-Controller pattern: TableModel (e.g. AbstractTableModel, DefaultTableModel) manages the logical dataset, while TableCellRenderer (and TableCellEditor) handles UI rendering and interactive user editing independently.',
    tags: ['Swing', 'MVC', 'TableModel', 'JTable', 'Data Structures']
  },
  {
    id: 102,
    chapter: 'chapter-11',
    chapterNumber: 11,
    chapterTitle: 'Chapter 11 — Data Structures & GUI Frameworks (continued)',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following data structures in JavaFX provide automatic UI list updates when items are added or removed? (Select ALL that apply)',
    options: [
      'javafx.collections.ObservableList',
      'javafx.collections.FXCollections.observableArrayList()',
      'javafx.collections.FilteredList (for dynamic filtering)',
      'java.util.concurrent.CopyOnWriteArrayList'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'ObservableList, observableArrayList, and FilteredList fire ListChangeListeners that ListView and TableView listen to for automatic repainting and layout recalculations. CopyOnWriteArrayList is thread-safe for standard Java concurrency but does not fire JavaFX UI change events.',
    tags: ['JavaFX', 'ObservableList', 'Data Binding', 'Collections']
  },
  {
    id: 103,
    chapter: 'chapter-11',
    chapterNumber: 11,
    chapterTitle: 'Chapter 11 — Data Structures & GUI Frameworks (continued)',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: In JTree, TreeModel utilizes a TreeNode hierarchy where DefaultMutableTreeNode supports arbitrary user object payloads.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: DefaultMutableTreeNode stores a userObject reference (Object) alongside child/parent node references, allowing any domain model object to populate tree nodes with custom toString() display or TreeCellRenderers.',
    tags: ['JTree', 'TreeModel', 'Swing Components']
  }
];

export const chapter12Questions: Question[] = [
  {
    id: 111,
    chapter: 'chapter-12',
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which built-in Functional Interface in java.util.function accepts a single input argument of type T, performs a boolean test, and returns a boolean?',
    options: [
      'Function<T, R>',
      'Consumer<T>',
      'Predicate<T>',
      'Supplier<T>'
    ],
    correctAnswer: 2,
    explanation: 'Predicate<T> defines a single abstract method "boolean test(T t)" commonly used in Stream.filter() operations.',
    tags: ['Functional Interfaces', 'Predicate', 'Lambda Expressions']
  },
  {
    id: 112,
    chapter: 'chapter-12',
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'Analyze the following Stream pipeline. What is printed to the console, and why is "peek()" not called for the number 1?',
    codeSnippet: `List<Integer> numbers = List.of(1, 2, 3, 4, 5);
int result = numbers.stream()
    .filter(n -> n % 2 == 0)
    .peek(n -> System.out.print("P" + n + " "))
    .findFirst()
    .orElse(0);
System.out.println("Result: " + result);`,
    sampleSolution: 'Printed output: "P2 Result: 2". Explanation: Java Streams are lazily evaluated with vertical element-by-element pipeline execution (fused operations). The first element "1" is evaluated by filter(n -> n % 2 == 0), which returns false. Because it was filtered out, "1" never reaches the downstream peek() step. The next element "2" passes the filter, passes peek (printing "P2 "), satisfies findFirst(), which immediately short-circuits and terminates the pipeline without processing 3, 4, or 5.',
    options: [],
    explanation: 'Streams execute lazily per element and short-circuit at terminal operations like findFirst(). Filtered-out items bypass downstream intermediate operations.',
    tags: ['Streams', 'Lazy Evaluation', 'Short-Circuiting']
  },
  {
    id: 113,
    chapter: 'chapter-12',
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following statements about Java 21 Virtual Threads (Project Loom) are TRUE? (Select ALL that apply)',
    options: [
      'Virtual threads are lightweight threads managed by the JVM rather than the underlying OS kernel.',
      'Millions of virtual threads can be created concurrently with minimal memory overhead (hundreds of bytes vs ~1MB per OS thread).',
      'When a virtual thread blocks on I/O (e.g. Socket read), the JVM unmounts it from the carrier OS thread, freeing the carrier thread for other work.',
      'Virtual threads replace the Java memory model and eliminate the need for synchronization.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'A, B, and C are correct. Virtual threads enable high-throughput concurrent I/O. D is false: Virtual threads still follow standard Java memory model rules and require proper synchronization/locks when accessing shared mutable memory.',
    tags: ['Virtual Threads', 'Project Loom', 'Java 21', 'Concurrency']
  },
  {
    id: 114,
    chapter: 'chapter-12',
    chapterNumber: 12,
    chapterTitle: 'Chapter 12 — Modern Java: Lambdas, Functional Interfaces & Concurrency',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: Local variables referenced inside a Java lambda expression must be either explicitly declared "final" or be "effectively final" (never modified after assignment).',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: Java captures local variables by value into the lambda instance closure. To prevent data race and memory inconsistency between the stack frame and the lambda object on the heap, the variable must be final or effectively final.',
    tags: ['Lambdas', 'Effectively Final', 'Closures']
  }
];

export const chapter13Questions: Question[] = [
  {
    id: 121,
    chapter: 'chapter-13',
    chapterNumber: 13,
    chapterTitle: 'Chapter 13 — Project Planning & Software Design',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which SOLID design principle asserts that software entities (classes, modules, functions) should be open for extension, but closed for modification?',
    options: [
      'Single Responsibility Principle (SRP)',
      'Open-Closed Principle (OCP)',
      'Liskov Substitution Principle (LSP)',
      'Interface Segregation Principle (ISP)'
    ],
    correctAnswer: 1,
    explanation: 'The Open-Closed Principle (OCP) states that a class should allow its behavior to be extended (via polymorphism, interfaces, composition) without modifying its existing, tested source code.',
    tags: ['SOLID', 'Open-Closed Principle', 'Software Architecture']
  },
  {
    id: 122,
    chapter: 'chapter-13',
    chapterNumber: 13,
    chapterTitle: 'Chapter 13 — Project Planning & Software Design',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following Gang of Four (GoF) design patterns are classified as CREATIONAL patterns? (Select ALL that apply)',
    options: [
      'Singleton Pattern',
      'Factory Method / Abstract Factory Pattern',
      'Builder Pattern',
      'Observer Pattern'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'Singleton, Factory Method, and Builder are Creational patterns dealing with object creation mechanisms. Observer is a Behavioral pattern.',
    tags: ['Design Patterns', 'Creational Patterns', 'GoF']
  },
  {
    id: 123,
    chapter: 'chapter-13',
    chapterNumber: 13,
    chapterTitle: 'Chapter 13 — Project Planning & Software Design',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: In JUnit 5, methods annotated with @BeforeEach execute once before each individual test method in the test class.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: @BeforeEach signals that the annotated method should be executed before every @Test method in the current class, ensuring test isolation and clean setup state.',
    tags: ['JUnit 5', 'Unit Testing', 'Software Quality']
  },
  {
    id: 124,
    chapter: 'chapter-13',
    chapterNumber: 13,
    chapterTitle: 'Chapter 13 — Project Planning & Software Design',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'Explain the difference between Dependency Injection (DI) and hardcoded "new" instantiations inside a class constructor. How does DI improve testability with Mockito?',
    sampleSolution: 'Hardcoding object creation (e.g. this.service = new RealPaymentService()) tightly couples a class to concrete implementations. This prevents unit tests from substituting test doubles (mocks/stubs), forcing tests to depend on real databases or external networks. With Dependency Injection (e.g. passing PaymentService via constructor), tests can easily inject a mock (e.g. Mockito.mock(PaymentService.class)) to isolate and verify the unit under test deterministically without external side effects.',
    options: [],
    explanation: 'Dependency Injection adheres to the Dependency Inversion Principle (DIP), decoupling classes from concrete dependencies and enabling seamless mock substitution in unit testing.',
    tags: ['Dependency Injection', 'Testing', 'Mockito', 'SOLID']
  }
];
