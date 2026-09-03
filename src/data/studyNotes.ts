export type { TopicInterviewQA, StudyTopic, ChapterStudyGuide } from '../types';
import { ChapterStudyGuide } from '../types';
import { CHAPTER_14_STUDY_GUIDE } from './advancedConceptsNotes';

const BASE_CHAPTER_STUDY_NOTES: ChapterStudyGuide[] = [
  {
    chapterId: 'chapter-1',
    chapterNumber: 1,
    title: 'Chapter 1 — Intro to OOP',
    subtitle: 'Encapsulation, Inheritance, Polymorphism, Abstraction, Interfaces',
    overview: 'Object-Oriented Programming (OOP) in Java models real-world software components into modular, reusable, and secure objects. It is governed by four core pillars: Encapsulation (data hiding), Inheritance (code reuse and subclassing), Polymorphism (dynamic dispatch and flexibility), and Abstraction (contract definition via abstract classes and interfaces).',
    quickSummaryChecklist: [
      'Encapsulation bundles fields + methods with private access and defensive copying.',
      'Java supports single class inheritance and multiple interface inheritance.',
      'Dynamic method dispatch resolves overridden instance methods at runtime based on the actual object.',
      'Constructors are never inherited; super() or this() must be the first constructor statement.',
      'Abstract classes can store state; interfaces define behavior contracts (with default & static methods).'
    ],
    coreConcepts: [
      {
        id: 'c1-encapsulation',
        title: '1. Encapsulation & Data Hiding',
        summary: 'Encapsulation combines state (variables) and behavior (methods) into an isolated entity while guarding internal integrity through access control modifiers and validation methods.',
        keyPoints: [
          'Declare fields with private visibility to enforce invariants and prevent uncontrolled external mutation.',
          'Provide public getters and setters to encapsulate business logic, value validation, and defensive copying.',
          'Defensive copying is crucial when returning mutable references (e.g., java.util.Date or arrays) to prevent external tampering.',
          'Enhances maintainability by allowing internal implementations to change without breaking external consumers.'
        ],
        codeExample: `public class BankAccount {
    private double balance; // private field
    private final String accountNumber;

    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative.");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public synchronized void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be strictly positive.");
        }
        this.balance += amount;
    }
}`,
        pitfalls: [
          'Exposing mutable fields directly via public modifiers violates encapsulation.',
          'Returning mutable internal objects directly without cloning allows external code to modify internal state silently.'
        ]
      },
      {
        id: 'c1-inheritance',
        title: '2. Inheritance & The `super` Keyword',
        summary: 'Enables a subclass to inherit attributes and methods from a superclass using the `extends` keyword, establishing an "IS-A" semantic relationship.',
        keyPoints: [
          'All Java classes implicitly extend java.lang.Object as the root class of the class hierarchy.',
          'Subclass constructors always call super() as their first statement if no explicit call to super() or this() is provided.',
          'Constructors, private members, and static initializers are not inherited.',
          'Java forbids multiple class inheritance to avoid the "Diamond Problem", but permits multiple interface implementation.'
        ],
        codeExample: `public class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    public void startEngine() {
        System.out.println("Engine started for " + brand);
    }
}

public class ElectricCar extends Vehicle {
    private int batteryCapacityKWh;

    public ElectricCar(String brand, int batteryCapacityKWh) {
        super(brand); // Must be first statement in constructor
        this.batteryCapacityKWh = batteryCapacityKWh;
    }
}`
      },
      {
        id: 'c1-polymorphism',
        title: '3. Polymorphism & Dynamic Method Dispatch',
        summary: 'Polymorphism allows objects of different classes to be treated through a unified superclass or interface reference. Dynamic method dispatch binds method calls to the actual runtime instance.',
        keyPoints: [
          'Compile-Time Polymorphism (Static Binding): Method overloading based on parameter count, order, or types.',
          'Runtime Polymorphism (Dynamic Binding): Method overriding where the JVM invokes the actual object\'s implementation at runtime.',
          'The @Override annotation enforces compile-time signature verification.',
          'Private, static, and final methods cannot be overridden and use static early binding.'
        ],
        codeExample: `abstract class Shape {
    abstract double calculateArea();
}

class Circle extends Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
    @Override double calculateArea() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    private final double width, height;
    public Rectangle(double w, double h) { this.width = w; this.height = h; }
    @Override double calculateArea() { return width * height; }
}

// Dynamic Dispatch in Action:
Shape myShape = new Circle(5.0); // Reference is Shape, Object is Circle
System.out.println(myShape.calculateArea()); // Invokes Circle.calculateArea() at runtime`
      },
      {
        id: 'c1-abstraction',
        title: '4. Abstraction: Abstract Classes vs. Interfaces',
        summary: 'Abstraction focuses on what an object does rather than how it does it. Java provides Abstract Classes and Interfaces for architectural contracts.',
        keyPoints: [
          'Abstract classes can define instance variables, non-public methods, constructors, and concrete method implementations.',
          'Interfaces (Java 8+) support default methods, static methods, and private helper methods (Java 9+).',
          'A class can implement multiple interfaces, enabling flexible trait-like compositions.',
          'Use abstract classes for strong code sharing across closely related classes; use interfaces to define contracts across disparate types.'
        ],
        codeExample: `public interface Printable {
    void print(); // Abstract method

    // Default method (Java 8+)
    default void printWithTimestamp() {
        System.out.println("[" + System.currentTimeMillis() + "] " );
        print();
    }

    // Static utility method
    static void printHeader(String title) {
        System.out.println("=== " + title + " ===");
    }
}`
      }
    ],
    examTips: [
      'Constructors are NEVER inherited by subclasses in Java.',
      'super() or this() must be the absolute first statement inside any constructor.',
      'Covariant return types are permitted in overridden methods (subclass can return a subtype of the superclass method return type).'
    ]
  },
  {
    chapterId: 'chapter-2',
    chapterNumber: 2,
    title: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    subtitle: 'Access modifiers, package scoping, classloaders, JPMS modularity',
    overview: 'Manages namespaces, encapsulation boundaries, and compilation units. The Java Platform Module System (JPMS, introduced in Java 9) enforces strong encapsulation and explicit dependencies via module-info.java.',
    quickSummaryChecklist: [
      'Four visibility tiers: public, protected, package-private (default), and private.',
      'Protected grants visibility within package and to subclasses in different packages.',
      'Classloader delegation hierarchy: Bootstrap -> Platform/Extension -> Application/System.',
      'JPMS uses module-info.java with requires, requires transitive, exports, and opens directives.'
    ],
    coreConcepts: [
      {
        id: 'c2-access-modifiers',
        title: '1. Access Modifiers & Visibility Matrix',
        summary: 'Java provides four visibility levels to restrict accessibility to classes, constructors, methods, and variables.',
        keyPoints: [
          'public: Accessible anywhere across packages and modules (if exported).',
          'protected: Accessible within the same package AND by subclasses in other packages.',
          'default (package-private): Accessible strictly within the same package.',
          'private: Accessible strictly within the defining enclosing top-level class.'
        ]
      },
      {
        id: 'c2-jpms',
        title: '2. Java Platform Module System (JPMS)',
        summary: 'Enforces strong encapsulation and explicit module graphs via module-info.java at compile time and runtime.',
        keyPoints: [
          'requires <module>: Expresses direct compile and runtime dependency.',
          'requires transitive <module>: Implies that any module reading this module also reads the transitive dependency.',
          'exports <package>: Exposes public types in the package to external consumer modules.',
          'opens <package>: Permits runtime deep reflection access without compile-time visibility (ideal for frameworks like Spring / Jackson).'
        ],
        codeExample: `module com.university.academic {
    requires java.sql;
    requires transitive java.logging;
    exports com.university.academic.api;
    opens com.university.academic.model to com.fasterxml.jackson.databind;
}`
      }
    ],
    examTips: [
      'A non-public class cannot be accessed outside its package even if its inner methods are public.',
      'Protected members accessed in external packages must be invoked through subclass instances, not raw superclass references.'
    ]
  },
  {
    chapterId: 'chapter-3',
    chapterNumber: 3,
    title: 'Chapter 3 — Iterators, Lists, Stacks, Queues & Collections',
    subtitle: 'Collections Framework, ArrayList, LinkedList, Stack, Queue, Deque',
    overview: 'The Java Collections Framework (JCF) provides standardized, high-performance data structures and algorithms under the java.util hierarchy.',
    quickSummaryChecklist: [
      'ArrayList: dynamic array with O(1) random access and O(n) middle insertions.',
      'LinkedList: doubly-linked nodes with O(1) head/tail insertions and O(n) index lookups.',
      'ArrayDeque is faster and more memory-efficient than LinkedList and legacy Stack.',
      'PriorityQueue maintains a min-heap structure based on natural ordering or a Comparator.'
    ],
    coreConcepts: [
      {
        id: 'c3-arraylist-vs-linkedlist',
        title: '1. ArrayList vs. LinkedList Performance Characteristics',
        summary: 'ArrayList utilizes contiguous memory with geometric resizing; LinkedList uses node heap allocations connected by next/prev pointers.',
        keyPoints: [
          'ArrayList random access get(i) is O(1) time complexity due to index math.',
          'ArrayList resizing allocates 50% extra capacity (newCapacity = oldCapacity + (oldCapacity >> 1)) with System.arraycopy.',
          'LinkedList eliminates array copy resizing costs but requires 24+ bytes of pointer overhead per node.',
          'ArrayDeque is the recommended modern implementation for FIFO queues and LIFO stacks.'
        ],
        complexity: 'ArrayList get: O(1), append: amortized O(1), insert: O(n). LinkedList get: O(n), insert at ends: O(1).'
      },
      {
        id: 'c3-queue-deque',
        title: '2. Queue & Deque (Double-Ended Queue)',
        summary: 'Standard contracts for FIFO queuing and double-ended operations.',
        keyPoints: [
          'Queue examine methods: element() (throws NoSuchElementException) vs peek() (returns null if empty).',
          'Queue insert methods: add() (throws IllegalStateException if full) vs offer() (returns false).',
          'Queue remove methods: remove() (throws NoSuchElementException) vs poll() (returns null).',
          'PriorityQueue ordering only guarantees the root node is the minimum/highest priority element.'
        ],
        codeExample: `Deque<String> stack = new ArrayDeque<>();
stack.push("First");
stack.push("Second");
System.out.println(stack.pop()); // Outputs "Second" (LIFO)

Queue<Integer> queue = new ArrayDeque<>();
queue.offer(10);
queue.offer(20);
System.out.println(queue.poll()); // Outputs 10 (FIFO)`
      }
    ],
    examTips: [
      'Never use java.util.Stack in production; use ArrayDeque instead for lock-free single-threaded stack operations.',
      'Iterating through PriorityQueue does NOT output elements in sorted order; only poll() guarantees sorted priority extraction.'
    ]
  },
  {
    chapterId: 'chapter-4',
    chapterNumber: 4,
    title: 'Chapter 4 — Iterator Pattern & Fail-Fast Mechanics',
    subtitle: 'Fail-fast vs fail-safe, ConcurrentModificationException, custom Iterators',
    overview: 'The Iterator design pattern standardizes traversal over aggregate objects while enforcing structural concurrency invariants through modification counters.',
    quickSummaryChecklist: [
      'Iterator interface methods: hasNext(), next(), and remove().',
      'Fail-fast iterators throw ConcurrentModificationException if modCount != expectedModCount.',
      'Only iterator.remove() safely deletes items during active traversal.',
      'Enhanced for-loops compile down to Iterator calls.'
    ],
    coreConcepts: [
      {
        id: 'c4-failfast',
        title: '1. Fail-Fast Iterators & modCount Validation',
        summary: 'Standard collections (ArrayList, HashSet, HashMap) track structural modifications via an internal modCount field to detect illegal concurrent modifications.',
        keyPoints: [
          'When an Iterator is instantiated, it records expectedModCount = modCount.',
          'Calling collection.add() or collection.remove() increments modCount, causing a mismatch.',
          'iterator.remove() is safe because it synchronizes expectedModCount = modCount internally.',
          'Fail-safe / weakly consistent collections (e.g., CopyOnWriteArrayList) operate on array clones and never throw ConcurrentModificationException.'
        ],
        codeExample: `List<String> items = new ArrayList<>(List.of("A", "B", "C", "D"));
Iterator<String> it = items.iterator();
while (it.hasNext()) {
    String val = it.next();
    if ("B".equals(val)) {
        it.remove(); // SAFE: updates expectedModCount
        // items.remove("B"); // UNSAFE: throws ConcurrentModificationException!
    }
}`
      }
    ],
    examTips: [
      'The enhanced for-loop for(T item : list) uses an implicit Iterator. Modifying the list inside the loop throws ConcurrentModificationException.'
    ]
  },
  {
    chapterId: 'chapter-5',
    chapterNumber: 5,
    title: 'Chapter 5 — Searching Algorithms',
    subtitle: 'Linear & Binary Search, Interpolation Search, search complexities',
    overview: 'Searching algorithms locate target items in memory structures. Binary search provides logarithmic efficiency on sorted sequences.',
    quickSummaryChecklist: [
      'Linear search: O(n) on unsorted collections.',
      'Binary search: O(log n) on sorted collections.',
      'Midpoint calculation bug: (low + high) / 2 can overflow int. Use low + (high - low) / 2.',
      'Arrays.binarySearch returns -(insertion_point) - 1 when element is not present.'
    ],
    coreConcepts: [
      {
        id: 'c5-binary-search',
        title: '1. Binary Search Mechanics & Midpoint Overflow',
        summary: 'Divides the search interval in half on each step. Requires pre-sorted collections.',
        keyPoints: [
          'Time Complexity: Worst O(log n), Best O(1), Space O(1).',
          'Integer overflow bug: low + high can exceed Integer.MAX_VALUE (2^31 - 1). Safe fix: mid = low + (high - low) / 2 or mid = (low + high) >>> 1.',
          'Arrays.binarySearch formula for absent target: insertion_index = -(return_value + 1).'
        ],
        codeExample: `public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents integer overflow
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // Not found
}`
      }
    ],
    examTips: [
      'If Arrays.binarySearch returns -4, the element belongs at index 3 (-( -4 + 1 ) = 3).'
    ]
  },
  {
    chapterId: 'chapter-6',
    chapterNumber: 6,
    title: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    subtitle: 'Bubble, Insertion, Selection, Merge, QuickSort, TimSort, Time/Space Complexity',
    overview: 'Asymptotic analysis and implementation tradeoffs of comparison sorting algorithms.',
    quickSummaryChecklist: [
      'Bubble / Insertion / Selection: O(n²) worst-case time.',
      'Insertion Sort: O(n) best-case time for nearly sorted arrays; Stable.',
      'Merge Sort: O(n log n) guaranteed time, O(n) extra memory; Stable.',
      'QuickSort: O(n log n) average, O(n²) worst; In-place, Unstable.',
      'TimSort: Hybrid Merge + Insertion Sort. Java standard for Object sorting.'
    ],
    coreConcepts: [
      {
        id: 'c6-big-o',
        title: '1. Comprehensive Sorting Matrix',
        summary: 'Comparison of standard sorting algorithms across time, space, and stability metrics.',
        keyPoints: [
          'Bubble Sort: Best O(n), Avg O(n²), Worst O(n²), Space O(1), Stable.',
          'Insertion Sort: Best O(n), Avg O(n²), Worst O(n²), Space O(1), Stable.',
          'Selection Sort: Best/Avg/Worst O(n²), Space O(1), Unstable.',
          'Merge Sort: Best/Avg/Worst O(n log n), Space O(n), Stable.',
          'Dual-Pivot QuickSort: Best/Avg O(n log n), Worst O(n²), Space O(log n), Unstable.',
          'TimSort (Java Object default): Best O(n), Worst O(n log n), Space O(n), Stable.'
        ]
      }
    ],
    examTips: [
      'Arrays.sort(primitive[]) uses Dual-Pivot QuickSort (unstable, high cache locality).',
      'Arrays.sort(Object[]) and Collections.sort() use TimSort (stable, preserves relative order of equal items).'
    ]
  },
  {
    chapterId: 'chapter-7',
    chapterNumber: 7,
    title: 'Chapter 7 — Recursion & Divide-and-Conquer',
    subtitle: 'Base cases, call stack mechanics, recursion tree, StackOverflowError, memoization',
    overview: 'Methods calling themselves on smaller sub-problems until reaching a base condition.',
    quickSummaryChecklist: [
      'Every recursive function requires at least one reachable base case.',
      'Each recursion call consumes a stack frame; deep recursion leads to StackOverflowError.',
      'Divide-and-Conquer breaks problems into sub-problems, solves recursively, and merges solutions.',
      'Memoization caches intermediate subproblem solutions to reduce O(2ⁿ) to O(n).'
    ],
    coreConcepts: [
      {
        id: 'c7-stack-mechanics',
        title: '1. Call Stack Activation Frames & Memoization',
        summary: 'Stack frames store local variables, arguments, and return addresses for each active invocation.',
        keyPoints: [
          'StackOverflowError occurs when the JVM call stack memory limit is exceeded by unbounded recursion.',
          'Tail call optimization (TCO) is not guaranteed in standard HotSpot JVM implementations.',
          'Memoization replaces exponential recursive branch evaluations with O(1) hash map lookups.'
        ],
        codeExample: `// Fibonacci with Memoization
public static long fibonacci(int n, Map<Integer, Long> memo) {
    if (n <= 1) return n; // Base cases
    if (memo.containsKey(n)) return memo.get(n);

    long result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    memo.put(n, result);
    return result;
}`
      }
    ],
    examTips: [
      'Ensure the recursion state progresses toward the base case with every call to avoid infinite recursion.'
    ]
  },
  {
    chapterId: 'chapter-8',
    chapterNumber: 8,
    title: 'Chapter 8 — Event-Driven Programming Fundamentals',
    subtitle: 'Event sources, Event listeners, Observer pattern, ActionEvent, MouseEvent',
    overview: 'Decouples UI interaction signals from event consumer handlers using the Observer design pattern.',
    quickSummaryChecklist: [
      'Event Source: component that generates an EventObject.',
      'Event Listener: interface with callback methods to handle events.',
      'Event Dispatch Thread (EDT) processes all UI drawing and events.',
      'SwingUtilities.invokeLater() defers UI tasks safely to the EDT.'
    ],
    coreConcepts: [
      {
        id: 'c8-event-delegation',
        title: '1. Event Delegation Model & Event Dispatch Thread',
        summary: 'The event source delegates event handling to registered listener objects without direct coupling.',
        keyPoints: [
          'Event Source: Component generating the event (e.g., JButton, JTextField).',
          'Event Object: Encapsulates metadata about what occurred (e.g., ActionEvent, MouseEvent).',
          'Event Listener: Functional interface containing callback handler methods (e.g., ActionListener).',
          'All Swing GUI interactions must run on the single Event Dispatch Thread (EDT).'
        ],
        codeExample: `JButton submitBtn = new JButton("Submit");
// Modern Lambda expression for ActionListener
submitBtn.addActionListener(e -> {
    System.out.println("Action fired: " + e.getActionCommand());
});

// EDT thread-safe execution
SwingUtilities.invokeLater(() -> {
    JFrame frame = new JFrame("App Window");
    frame.setVisible(true);
});`
      }
    ],
    examTips: [
      'Long-running operations on the EDT will freeze the user interface; use SwingWorker for background tasks.'
    ]
  },
  {
    chapterId: 'chapter-9',
    chapterNumber: 9,
    title: 'Chapter 9 — Exception Handling & Robustness',
    subtitle: 'Checked vs Unchecked, try-catch-finally, try-with-resources, AutoCloseable',
    overview: 'Java splits runtime errors into recoverable Exceptions and unrecoverable Errors under java.lang.Throwable.',
    quickSummaryChecklist: [
      'Throwable is the root class for Exception and Error.',
      'Checked Exceptions (subclasses of Exception excluding RuntimeException) require try-catch or throws.',
      'Unchecked Exceptions (subclasses of RuntimeException) indicate programmer errors.',
      'try-with-resources automatically closes AutoCloseable resources in reverse order.'
    ],
    coreConcepts: [
      {
        id: 'c9-throwable-hierarchy',
        title: '1. Checked vs. Unchecked Exceptions',
        summary: 'Checked exceptions are enforced at compile time; unchecked exceptions occur at runtime due to logical defects.',
        keyPoints: [
          'Checked: Subclasses of Exception (e.g., IOException, SQLException). Must be caught or declared in throws clause.',
          'Unchecked: Subclasses of RuntimeException (e.g., NullPointerException, IllegalArgumentException).',
          'Errors: JVM-level fatal failures (e.g., OutOfMemoryError, StackOverflowError); applications should not attempt to catch them.'
        ]
      },
      {
        id: 'c9-try-with-resources',
        title: '2. Try-With-Resources & AutoCloseable',
        summary: 'Guarantees resource teardown without verbose finally blocks.',
        keyPoints: [
          'Resources must implement java.lang.AutoCloseable or java.io.Closeable.',
          'Multiple resources can be declared separated by semicolons within try(...) parentheses.',
          'Resources are closed in reverse order of declaration before any catch/finally blocks execute.',
          'Suppressed exceptions are preserved and accessible via e.getSuppressed().'
        ],
        codeExample: `try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
     BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line);
        writer.newLine();
    }
} catch (IOException e) {
    System.err.println("File I/O error: " + e.getMessage());
}`
      }
    ],
    examTips: [
      'The finally block always executes even if try or catch returns, unless System.exit(0) is called.'
    ]
  },
  {
    chapterId: 'chapter-10',
    chapterNumber: 10,
    title: 'Chapter 10 — GUI Programming: Swing & JavaFX',
    subtitle: 'JFrame, JPanel, Layout Managers, JavaFX Stage/Scene, FXML, CSS',
    overview: 'Building desktop GUI applications using Swing (lightweight AWT components) and JavaFX (modern hardware-accelerated scene graph).',
    quickSummaryChecklist: [
      'Swing Layouts: BorderLayout (default for JFrame), FlowLayout (default for JPanel), GridLayout, GridBagLayout.',
      'JavaFX hierarchy: Stage (window) -> Scene (graph container) -> Parent/Node graph.',
      'JavaFX supports FXML declarative UI layout and CSS styling.',
      'Properties and ObservableList provide automated reactive UI synchronization.'
    ],
    coreConcepts: [
      {
        id: 'c10-layout-managers',
        title: '1. Swing Layout Managers & Responsive Layouts',
        summary: 'Controls the sizing and positioning of child components inside Swing containers.',
        keyPoints: [
          'BorderLayout divides container into 5 zones: North, South, East, West, and Center.',
          'FlowLayout places components in a row, wrapping to the next line when filled.',
          'GridLayout arranges components in uniform rectangular cells of identical dimension.',
          'GridBagLayout provides dynamic grid alignment using GridBagConstraints.'
        ]
      },
      {
        id: 'c10-javafx-architecture',
        title: '2. JavaFX Application Lifecycle & Scene Graph',
        summary: 'The primary architecture of modern JavaFX desktop applications.',
        keyPoints: [
          'Lifecycle: Application.launch() -> init() -> start(Stage primaryStage) -> stop().',
          'Scene graph is a tree of Node elements (Panes, Controls, Shapes).',
          'FXML files separate layout structure from controller business logic.'
        ]
      }
    ],
    examTips: [
      'Never update JavaFX UI elements from a background thread; use Platform.runLater() for thread-safe UI updates.'
    ]
  },
  {
    chapterId: 'chapter-11',
    chapterNumber: 11,
    title: 'Chapter 11 — Data Structures in GUI: Trees & Tables',
    subtitle: 'Tree models (JTree, TreeView), Table models (JTable, TableView), custom renderers',
    overview: 'Model-View-Controller (MVC) architectural separation in rich tabular and hierarchical UI components.',
    quickSummaryChecklist: [
      'JTable utilizes TableModel (DefaultTableModel) to decouple data from rendering.',
      'TableCellRenderer controls custom painting; TableCellEditor controls inline editing.',
      'JTree relies on TreeModel and DefaultMutableTreeNode for hierarchical data.',
      'JavaFX TableView<T> pairs with TableColumn and PropertyValueFactory for type-safe rendering.'
    ],
    coreConcepts: [
      {
        id: 'c11-mvc-ui',
        title: '1. MVC Architecture in Swing & JavaFX Components',
        summary: 'Separating data storage (Model) from visual drawing (View) and interaction handling (Controller).',
        keyPoints: [
          'DefaultTableModel fires events (e.g., fireTableDataChanged()) when the backing dataset is modified.',
          'TableCellRenderer returns a Component configured to render a cell without keeping persistent component instances for every row.',
          'JavaFX TableView uses virtualized cell rendering to support thousands of rows with zero frame lag.'
        ]
      }
    ],
    examTips: [
      'Always notify TableModel listeners via fireTableDataChanged() when updating table data to trigger visual repaints.'
    ]
  },
  {
    chapterId: 'chapter-12',
    chapterNumber: 12,
    title: 'Chapter 12 — Modern Java: Lambdas, Streams & Concurrency',
    subtitle: 'Lambda expressions, method references, Stream API, CompletableFuture, Virtual Threads',
    overview: 'Functional programming, declarative stream pipelines, and high-throughput concurrency models.',
    quickSummaryChecklist: [
      'Functional Interfaces have exactly one abstract method (Single Abstract Method - SAM).',
      'Core interfaces: Predicate (T -> boolean), Function (T -> R), Consumer (T -> void), Supplier (() -> T).',
      'Streams: Intermediate (lazy) vs. Terminal (eager). Streams cannot be reused after terminal consumption.',
      'Virtual Threads (Project Loom) provide lightweight, JVM-managed threads for concurrent I/O.'
    ],
    coreConcepts: [
      {
        id: 'c12-functional-interfaces',
        title: '1. Core Functional Interfaces (java.util.function)',
        summary: 'Standard Single Abstract Method (SAM) interfaces supporting lambda expressions.',
        keyPoints: [
          'Predicate<T>: Evaluates condition: boolean test(T t)',
          'Function<T, R>: Transforms input: R apply(T t)',
          'Consumer<T>: Performs action with side effect: void accept(T t)',
          'Supplier<T>: Generates value on demand: T get()',
          'UnaryOperator<T> and BinaryOperator<T>: Specializations of Function for identical types.'
        ]
      },
      {
        id: 'c12-streams',
        title: '2. Stream API Pipeline Architecture',
        summary: 'Declarative, lazy evaluation pipeline for collection data processing.',
        keyPoints: [
          'Intermediate Operations (Lazy): filter(), map(), flatMap(), sorted(), distinct().',
          'Terminal Operations (Eager): collect(), forEach(), reduce(), count(), anyMatch().',
          'Short-Circuiting Operations: findFirst(), findAny(), limit(), anyMatch().',
          'Streams do not mutate underlying source collections.'
        ],
        codeExample: `List<String> results = employees.stream()
    .filter(e -> e.getSalary() > 75000)
    .map(Employee::getName)
    .sorted()
    .collect(Collectors.toList());`
      }
    ],
    examTips: [
      'Attempting to reuse a Stream after calling a terminal operation throws IllegalStateException: stream has already been operated upon or closed.'
    ]
  },
  {
    chapterId: 'chapter-13',
    chapterNumber: 13,
    title: 'Chapter 13 — Enterprise Java, JDBC & Design Patterns',
    subtitle: 'Creational, Structural, Behavioral Design Patterns, JDBC database connectivity, transactions',
    overview: 'Enterprise architectural patterns, clean SOLID design principles, and relational database persistence with JDBC.',
    quickSummaryChecklist: [
      'SOLID principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
      'GoF Patterns: Singleton, Factory, Builder, Adapter, Decorator, Facade, Observer, Strategy.',
      'JDBC: DriverManager, Connection, PreparedStatement (prevents SQL injection), ResultSet.',
      'Transactions: setAutoCommit(false), commit(), and rollback() in catch blocks.'
    ],
    coreConcepts: [
      {
        id: 'c13-design-patterns',
        title: '1. Gang of Four (GoF) Design Patterns in Java',
        summary: 'Standard reusable design templates categorized into Creational, Structural, and Behavioral.',
        keyPoints: [
          'Creational: Singleton (single instance with double-checked locking), Factory Method (object creation abstraction), Builder (fluent object assembly).',
          'Structural: Adapter (interface translation), Decorator (dynamic feature wrapping without subclassing), Facade (simplified top-level API).',
          'Behavioral: Observer (event subscription model), Strategy (interchangeable algorithm families), Command (request encapsulation).'
        ]
      },
      {
        id: 'c13-jdbc',
        title: '2. JDBC Architecture & Transaction Management',
        summary: 'Standardized relational database connectivity and query execution API in Java.',
        keyPoints: [
          'PreparedStatement precompiles SQL statements and parameterizes inputs to prevent SQL Injection attacks.',
          'Execute queries with executeQuery() (for SELECT queries returning ResultSet) and executeUpdate() (for INSERT/UPDATE/DELETE).',
          'Transaction Management: Disable auto-commit with conn.setAutoCommit(false), call conn.commit() on success, and conn.rollback() in catch blocks.'
        ],
        codeExample: `String sql = "UPDATE accounts SET balance = balance - ? WHERE account_id = ?";
try (Connection conn = dataSource.getConnection();
     PreparedStatement stmt = conn.prepareStatement(sql)) {
    conn.setAutoCommit(false); // Begin transaction
    
    stmt.setDouble(1, transferAmount);
    stmt.setString(2, sourceAccountId);
    int affected = stmt.executeUpdate();
    
    conn.commit(); // Commit transaction
} catch (SQLException e) {
    // Rollback would be invoked here on failure
    System.err.println("Transaction failed: " + e.getMessage());
}`
      }
    ],
    examTips: [
      'Always use PreparedStatement instead of Statement when passing user parameters to prevent SQL injection vulnerabilities.'
    ]
  }
];

export const CHAPTER_STUDY_NOTES: ChapterStudyGuide[] = [
  ...BASE_CHAPTER_STUDY_NOTES,
  CHAPTER_14_STUDY_GUIDE
];

const _LEGACY_CHAPTER_14: ChapterStudyGuide = {
  chapterId: 'chapter-14',
    chapterNumber: 14,
    title: 'Chapter 14 — Major Advanced Programming Concepts',
    subtitle: 'OOP Pillars, Collections, Concurrency, I/O, JDBC, Sockets, Patterns & Memory Management',
    overview: 'A master reference manual and study guide defining every major advanced programming concept in Java with formal definitions, principles, syntax, pitfalls, and runtime execution models.',
    quickSummaryChecklist: [
      'OOP Pillars: Encapsulation (data hiding), Inheritance (reuse), Polymorphism (many forms), Abstraction (contract definition).',
      'Inheritance Types: Single (A->B), Multilevel (A->B->C), Hierarchical (A->B, A->C). No multiple class inheritance.',
      'Polymorphism: Compile-time (Method Overloading) vs Runtime (Method Overriding & Dynamic Method Dispatch).',
      'Abstract classes can store state and constructors; Interfaces define behavioral contracts with default & static methods.',
      'Exception keywords: try, catch, finally (always runs), throw (explicit instance), throws (method signature).',
      'Collections: ArrayList (O(1) access), LinkedList (O(1) node insert), HashSet (O(1) unique), TreeSet (O(log n) sorted), HashMap (O(1) KV), TreeMap (O(log n) sorted KV).',
      'File I/O & Streams: BufferedReader reduces native disk syscalls; Serialization writes object graphs with transient & serialVersionUID.',
      'Multithreading: Runnable decouples task from Thread execution; synchronization guards intrinsic monitors; wait/notify coordinates threads.',
      'Concurrency Utilities: ExecutorService thread pools, Future async handles, ReentrantLock, ConcurrentHashMap.',
      'Functional Interfaces: Predicate<T> (test), Consumer<T> (accept), Supplier<T> (get), Function<T,R> (apply).',
      'Stream API: filter (predicate), map (transform), reduce (accumulate), collect (gather), forEach (consume).',
      'JDBC: DriverManager, Connection, PreparedStatement (prevents SQL injection), ResultSet.',
      'Networking: ServerSocket listens on a port; Socket connects endpoints for TCP/IP streams.',
      'GUI: Swing runs on EDT; JavaFX uses Stage -> Scene -> Node graph.',
      'Design Patterns: Singleton (one instance), Factory (creation abstraction), Observer (publish-subscribe), MVC (separation of concerns).',
      'Memory Management: Stack (thread-private frames & locals) vs Heap (shared objects & GC), GC roots determine object eligibility.'
    ],
    coreConcepts: [
      {
        id: 'c14-oop-pillars',
        title: '1. Object-Oriented Programming (OOP) & The 4 Pillars',
        summary: 'The foundational architectural paradigm of Java that structures software into modular, data-encapsulating, and polymorphic objects.',
        keyPoints: [
          'Encapsulation: The practice of keeping fields private and providing public getters and setters to protect internal state and validate data.',
          'Inheritance: Mechanism allowing a subclass to derive properties and methods from a superclass using the "extends" keyword, promoting code reuse.',
          'Polymorphism: The capability of a method or object to take on multiple forms—resolved at compile time (overloading) or runtime (overriding).',
          'Abstraction: The technique of hiding internal implementation mechanics and exposing only high-level operations via abstract classes and interfaces.'
        ],
        codeExample: `// Encapsulation: Private state guarded by public methods
public class BankAccount {
    private double balance; // Data hiding
    
    public double getBalance() { return balance; }
    
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        this.balance += amount;
    }
}`,
        pitfalls: [
          'Leaving fields public or package-private compromises encapsulation and data integrity.',
          'Overusing inheritance over composition ("favor composition over inheritance" is a key best practice).'
        ]
      },
      {
        id: 'c14-inheritance-types',
        title: '2. Inheritance Types & Method Overriding',
        summary: 'Detailed taxonomy of inheritance models supported in Java and the rules governing method overriding.',
        keyPoints: [
          'Single Inheritance: A subclass inherits from exactly one direct parent class (e.g., class B extends A).',
          'Multilevel Inheritance: An inheritance chain where a child class inherits from a parent that is itself a child (e.g., class C extends B, and class B extends A).',
          'Hierarchical Inheritance: Multiple child classes inherit directly from a single parent class (e.g., class Dog extends Animal and class Cat extends Animal).',
          'Multiple Inheritance (Classes): NOT permitted for classes in Java to prevent ambiguity and the Diamond Problem.',
          'Method Overriding: A subclass provides its own specialized implementation of a method declared in its superclass with identical name, parameter types, and compatible return type.'
        ],
        codeExample: `// Single & Hierarchical Inheritance
class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal { // Single inheritance (Dog IS-A Animal)
    void bark() { System.out.println("Barking..."); }
}

class Cat extends Animal { // Hierarchical inheritance (Cat & Dog both extend Animal)
    void meow() { System.out.println("Meowing..."); }
}

class Puppy extends Dog { // Multilevel inheritance (Puppy -> Dog -> Animal)
    void weep() { System.out.println("Weeping..."); }
}`,
        pitfalls: [
          'Attempting multiple class inheritance (class C extends A, B) produces a compile-time syntax error.',
          'Reducing access visibility during method overriding (e.g., overriding a public method with protected) is forbidden.'
        ]
      },
      {
        id: 'c14-polymorphism',
        title: '3. Polymorphism: Compile-Time vs Runtime (Dynamic Method Dispatch)',
        summary: 'Dual facets of polymorphism in Java: static resolution by parameter signature vs dynamic dispatch based on actual runtime object type.',
        keyPoints: [
          'Compile-time Polymorphism (Method Overloading): Multiple methods in the same class share the same name but differ in argument count, types, or order. Resolved at compile time (static binding).',
          'Runtime Polymorphism (Method Overriding): An overridden instance method is resolved at runtime based on the actual object in heap memory, regardless of the reference type.',
          'Dynamic Method Dispatch: The JVM inspects the runtime object\'s vtable at execution time to invoke the overridden subclass method.',
          'Static methods, private methods, and final methods cannot be overridden and therefore do not exhibit runtime polymorphism.'
        ],
        codeExample: `// Simple Example of an Advanced Concept: Runtime Polymorphism
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog(); // Parent reference to child object
        a.sound(); // Output: Dog barks (Dynamic Method Dispatch)
    }
}`,
        pitfalls: [
          'Variables (fields) in Java do NOT exhibit polymorphism; field access is bound at compile time based on the reference type, not the object type.'
        ]
      },
      {
        id: 'c14-abstract-interfaces',
        title: '4. Abstract Classes and Interfaces',
        summary: 'Designing contracts and incomplete templates: abstract classes vs interface implementations and multiple inheritance.',
        keyPoints: [
          'Abstract Classes: Declared with the "abstract" keyword. Cannot be instantiated with "new". May contain abstract methods (no body), concrete methods, constructors, and instance variables.',
          'Interfaces: Defined with the "interface" keyword. Classes fulfill interface contracts using "implements".',
          'Multiple Inheritance via Interfaces: A class can implement any number of interfaces (implements A, B, C), achieving multiple inheritance of behavior safely.',
          'Interface Evolution: Java 8+ supports default methods (with body) and static methods; Java 9+ supports private helper methods inside interfaces.'
        ],
        codeExample: `interface Swimmable {
    void swim(); // Abstract method
    default void dive() { System.out.println("Diving deep..."); } // Default method
}

interface Flyable {
    void fly();
}

// Multiple inheritance through interfaces
public class Duck implements Swimmable, Flyable {
    @Override
    public void swim() { System.out.println("Duck swimming"); }

    @Override
    public void fly() { System.out.println("Duck flying"); }
}`,
        pitfalls: [
          'If two implemented interfaces provide conflicting default methods with the same signature, the implementing class MUST explicitly override and resolve the conflict.'
        ]
      },
      {
        id: 'c14-exceptions',
        title: '5. Exception Handling: try, catch, finally, throw, throws & Custom Exceptions',
        summary: 'The structured exception handling system in Java for robust error detection, propagation, and resource safety.',
        keyPoints: [
          'try: Encloses statements that may throw exceptional conditions.',
          'catch: Captures and handles specific exceptions thrown by the try block.',
          'finally: Executes unconditionally after try/catch, whether an exception occurred, was caught, or bypassed by return.',
          'throw: Imperatively throws an instantiated exception object (e.g., throw new InvalidAgeException(...)).',
          'throws: Declares in a method signature that the method may propagate checked exceptions to its caller.',
          'Custom Exceptions: Created by extending Exception (checked) or RuntimeException (unchecked).'
        ],
        codeExample: `// Custom Checked Exception
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class AccountService {
    public void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Cannot withdraw " + amount + ", balance is " + balance);
        }
    }
    
    public void process() {
        try {
            withdraw(100.0, 150.0);
        } catch (InsufficientFundsException e) {
            System.err.println("Handled: " + e.getMessage());
        } finally {
            System.out.println("Transaction audit log completed."); // Always executes
        }
    }
}`,
        pitfalls: [
          'Swallowing exceptions with an empty catch block hides root causes and makes debugging impossible.',
          'The finally block will only fail to run if System.exit(0) is called or the host JVM crashes abruptly.'
        ]
      },
      {
        id: 'c14-collections',
        title: '6. Java Collections Framework & Iterators',
        summary: 'Standardized data structure implementations for lists, sets, maps, and universal cursor iteration.',
        keyPoints: [
          'ArrayList: Dynamic resizable array offering fast O(1) random index access and amortized O(1) insertion.',
          'LinkedList: Doubly-linked list with O(1) pointer-based insertion/deletion at both ends; implements List and Deque.',
          'HashSet: Unordered set of unique elements backed by HashMap; average O(1) operations for add, contains, remove.',
          'TreeSet: Sorted set backed by Red-Black Tree; guarantees elements in sorted order with O(log n) operations.',
          'HashMap: Key-value associative array allowing one null key; average O(1) lookup and insertion.',
          'TreeMap: Sorted key-value map backed by Red-Black Tree; keys ordered by natural order or custom Comparator; O(log n).',
          'Iterators: Universal cursor interface (hasNext(), next(), remove()) supporting fail-fast traversal across all collections.'
        ],
        codeExample: `List<String> list = new ArrayList<>(List.of("Alpha", "Beta", "Gamma"));

// Safe removal using Iterator to avoid ConcurrentModificationException
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (item.startsWith("B")) {
        it.remove(); // Safely removes "Beta"
    }
}`,
        pitfalls: [
          'Mutating a collection directly via list.remove(...) during an enhanced for-each loop throws ConcurrentModificationException.'
        ]
      },
      {
        id: 'c14-generics',
        title: '7. Generics & Type Safety',
        summary: 'Parameterized types providing strong compile-time type safety and eliminating runtime ClassCastExceptions.',
        keyPoints: [
          'Generic Classes: Classes with formal type parameters (e.g., class Box<T> { private T val; }).',
          'Generic Methods: Methods declaring their own type parameters (e.g., public static <E> void print(E[] array)).',
          'Type Safety: The compiler validates that only objects of the declared type parameter are placed into containers.',
          'Type Erasure: The Java compiler replaces type parameters with Object or their upper bound in bytecode, maintaining binary compatibility with older Java versions.'
        ],
        codeExample: `public class GenericPair<K, V> {
    private final K key;
    private final V value;

    public GenericPair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
    
    // Generic Method
    public static <T> void printElement(T element) {
        System.out.println("Element: " + element);
    }
}`,
        pitfalls: [
          'Cannot instantiate generic arrays directly (new T[10]) or use primitive types as type arguments (use Integer, not int).'
        ]
      },
      {
        id: 'c14-file-io',
        title: '8. File Handling, I/O Streams & Serialization',
        summary: 'Mechanics of filesystem interaction, character vs buffered byte streams, and object persistence across JVM runs.',
        keyPoints: [
          'File: Abstract representation of file and directory pathnames.',
          'FileReader & FileWriter: Character-stream readers/writers that read and write directly to/from disk files.',
          'Buffered Streams (BufferedReader, BufferedWriter): In-memory buffer wrappers that batch disk reads/writes, reducing costly OS syscalls and enabling readLine().',
          'Serialization: Converting an object graph into a byte stream via ObjectOutputStream (requires implements Serializable).',
          'transient: Keyword marking fields to be excluded from serialization.',
          'serialVersionUID: Unique 64-bit identifier used during deserialization to verify class version compatibility.'
        ],
        codeExample: `// Writing and Reading with Buffered Streams
File file = new File("example.txt");

try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
    bw.write("Hello Java I/O");
    bw.newLine();
}

try (BufferedReader br = new BufferedReader(new FileReader(file))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println("Read: " + line);
    }
}`,
        pitfalls: [
          'Failing to close I/O streams leaks file descriptors; always use try-with-resources.',
          'Attempting to serialize a class that does not implement java.io.Serializable throws NotSerializableException.'
        ]
      },
      {
        id: 'c14-multithreading',
        title: '9. Multithreading & Thread Synchronization',
        summary: 'Concurrent execution, thread creation paradigms, mutual exclusion with synchronized, and inter-thread coordination.',
        keyPoints: [
          'Creating Threads: Either by subclassing java.lang.Thread and overriding run(), or implementing the java.lang.Runnable interface.',
          'Runnable vs Thread: Implementing Runnable is preferred because it separates the task from the thread and avoids consuming the single inheritance slot.',
          'Synchronization: The synchronized keyword acquires an object\'s intrinsic monitor lock, guarding critical sections against race conditions.',
          'Thread Communication: Methods wait(), notify(), and notifyAll() on Object instances allow threads to coordinate and signal state changes.',
          'Concurrency: Multiple tasks executing in overlapping time intervals, utilizing multi-core processor parallelism.'
        ],
        codeExample: `class Counter {
    private int count = 0;
    
    public synchronized void increment() { // Synchronized method locks 'this'
        count++;
    }
    
    public synchronized int getCount() { return count; }
}

Runnable task = () -> {
    for (int i = 0; i < 1000; i++) counter.increment();
};
Thread t1 = new Thread(task);
Thread t2 = new Thread(task);
t1.start(); t2.start();`,
        pitfalls: [
          'Calling run() directly instead of start() executes the code synchronously on the current thread, NOT in a separate thread.'
        ]
      },
      {
        id: 'c14-lambdas-functional',
        title: '10. Lambda Expressions & Functional Interfaces',
        summary: 'Functional programming paradigm introduced in Java 8, enabling anonymous functions and the core java.util.function interfaces.',
        keyPoints: [
          'Lambda Expressions: Anonymous functions using the arrow operator (parameters) -> expression/block.',
          'Functional Interface: An interface declaring exactly one abstract method (Single Abstract Method - SAM), optionally marked @FunctionalInterface.',
          'Predicate<T>: boolean test(T t) — tests a condition.',
          'Consumer<T>: void accept(T t) — consumes an input and performs a side-effect.',
          'Supplier<T>: T get() — produces/supplies an instance without inputs.',
          'Function<T, R>: R apply(T t) — transforms an input of type T into a result of type R.'
        ],
        codeExample: `import java.util.function.*;

Predicate<Integer> isEven = n -> n % 2 == 0;
Consumer<String> printer = s -> System.out.println("Output: " + s);
Supplier<Double> randomVal = () -> Math.random();
Function<String, Integer> lengthMapper = String::length;

System.out.println(isEven.test(4)); // true
printer.accept("Hello Lambdas");    // Output: Hello Lambdas`,
        pitfalls: [
          'Variables referenced inside lambda expressions must be final or effectively final (cannot be modified afterwards).'
        ]
      },
      {
        id: 'c14-stream-api',
        title: '11. Stream API (filter, map, reduce, collect, forEach)',
        summary: 'Declarative, composable pipelines for querying and transforming data collections with lazy evaluation.',
        keyPoints: [
          'Stream Pipeline: Composed of a Source (collection/array), 0+ Intermediate Operations (lazy), and 1 Terminal Operation (eager).',
          'filter(): Intermediate operation that discards elements not matching a Predicate.',
          'map(): Intermediate operation that transforms each element using a Function.',
          'reduce(): Terminal operation that combines elements into a single accumulated value using a BinaryOperator.',
          'collect(): Terminal operation that repackages elements into Collections, Strings, or Maps via Collectors.',
          'forEach(): Terminal operation that passes each element to a Consumer.'
        ],
        codeExample: `List<String> names = List.of("Alice", "Bob", "Charlie", "David", "Amanda");

List<String> result = names.stream()
    .filter(name -> name.startsWith("A"))    // filter()
    .map(String::toUpperCase)                // map()
    .collect(Collectors.toList());           // collect()
// Result: ["ALICE", "AMANDA"]

int totalLength = names.stream()
    .map(String::length)
    .reduce(0, (sum, len) -> sum + len);     // reduce()`,
        pitfalls: [
          'Streams cannot be reused once a terminal operation has been called; attempting to do so throws IllegalStateException.'
        ]
      },
      {
        id: 'c14-jdbc',
        title: '12. JDBC (Java Database Connectivity)',
        summary: 'Connecting Java applications to relational databases and executing SQL queries securely.',
        keyPoints: [
          'Connecting to Databases: DriverManager.getConnection(url, username, password) establishes the physical session.',
          'Connection: Represents the active connection and controls transaction commit/rollback behavior.',
          'PreparedStatement: Precompiles SQL statements and parameterizes user inputs with "?" placeholders, preventing SQL Injection.',
          'ResultSet: A cursor-based tabular representation of data returned from executing a SELECT query.',
          'Resource Management: Connection, PreparedStatement, and ResultSet implement AutoCloseable and should always be opened within try-with-resources.'
        ],
        codeExample: `String sql = "SELECT name, balance FROM accounts WHERE user_id = ?";
try (Connection conn = DriverManager.getConnection(dbUrl, user, pass);
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    
    pstmt.setInt(1, 42); // Parameterized input
    try (ResultSet rs = pstmt.executeQuery()) {
        while (rs.next()) {
            String name = rs.getString("name");
            double balance = rs.getDouble("balance");
            System.out.println(name + " has $" + balance);
        }
    }
}`,
        pitfalls: [
          'Never concatenate user input directly into SQL strings using Statement; this creates catastrophic SQL Injection vulnerabilities.'
        ]
      },
      {
        id: 'c14-networking',
        title: '13. Networking: Sockets, Client-Server & TCP/IP',
        summary: 'Inter-process network communication over TCP/IP using Java standard socket APIs.',
        keyPoints: [
          'Sockets: Endpoints for two-way communication links between two programs running on the network.',
          'Client-Server Architecture: Server listens on a well-known port, and clients connect dynamically.',
          'ServerSocket: Used by server applications to bind to a port and listen for incoming connection requests via serverSocket.accept().',
          'Socket: Used by client applications to connect to a host and port, providing InputStream and OutputStream for data exchange.',
          'TCP/IP: Connection-oriented, reliable, ordered protocol guaranteeing packet delivery and integrity.'
        ],
        codeExample: `// Server:
try (ServerSocket server = new ServerSocket(8080);
     Socket client = server.accept(); // Blocks until client connects
     BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
     PrintWriter out = new PrintWriter(client.getOutputStream(), true)) {
    String message = in.readLine();
    out.println("Echo: " + message);
}

// Client:
try (Socket socket = new Socket("localhost", 8080);
     PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
     BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
    out.println("Hello Server");
    System.out.println("Server responded: " + in.readLine());
}`,
        pitfalls: [
          'ServerSocket.accept() is a blocking operation; production servers spawn worker threads or use NIO to handle concurrent client connections.'
        ]
      },
      {
        id: 'c14-gui',
        title: '14. GUI Programming: Swing & JavaFX',
        summary: 'Desktop graphical user interface frameworks in Java and event-driven architecture.',
        keyPoints: [
          'Swing: Classic lightweight toolkit running atop AWT; top-level containers include JFrame, JDialog; atomic widgets include JButton, JLabel.',
          'Event Dispatch Thread (EDT): All Swing UI updates and rendering must strictly take place on this single thread using SwingUtilities.invokeLater().',
          'JavaFX: Modern UI toolkit utilizing a Scene Graph architecture (Stage -> Scene -> Node hierarchy), CSS styling, and FXML layout files.',
          'Event Handling: Listener/observer pattern where user actions trigger Event objects dispatched to ActionListeners or EventHandlers.'
        ],
        codeExample: `// Swing Event Handling on EDT
SwingUtilities.invokeLater(() -> {
    JFrame frame = new JFrame("Demo App");
    JButton btn = new JButton("Click Me");
    
    // Event handling
    btn.addActionListener(e -> JOptionPane.showMessageDialog(frame, "Button clicked!"));
    
    frame.setLayout(new FlowLayout());
    frame.add(btn);
    frame.setSize(300, 200);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
});`,
        pitfalls: [
          'Performing long-running computations on the Event Dispatch Thread (EDT) freezes the entire UI; use SwingWorker instead.'
        ]
      },
      {
        id: 'c14-design-patterns',
        title: '15. Design Patterns: Singleton, Factory, Observer & MVC',
        summary: 'Battle-tested architectural and structural templates solving common software engineering challenges.',
        keyPoints: [
          'Singleton: Guarantees that a class has only one instance and provides a global access point (private constructor, static instance).',
          'Factory: Defines an interface or method for creating an object, but lets subclasses or helper methods decide which class to instantiate.',
          'Observer: Defines a one-to-many dependency where when a subject changes state, all registered observers are notified automatically.',
          'MVC (Model-View-Controller): Separates data model (business logic), user presentation (view), and user interaction routing (controller).'
        ],
        codeExample: `// Thread-Safe Double-Checked Locking Singleton
public class DatabasePool {
    private static volatile DatabasePool instance;
    
    private DatabasePool() { /* private constructor */ }
    
    public static DatabasePool getInstance() {
        if (instance == null) {
            synchronized (DatabasePool.class) {
                if (instance == null) {
                    instance = new DatabasePool();
                }
            }
        }
        return instance;
    }
}`,
        pitfalls: [
          'Without the "volatile" keyword, double-checked locking in Singleton can fail due to instruction reordering in multithreaded environments.'
        ]
      },
      {
        id: 'c14-memory-management',
        title: '16. Java Memory Management: Stack, Heap & Garbage Collection',
        summary: 'Internal runtime memory allocation, stack execution frames, heap allocation, and garbage collection lifecycles.',
        keyPoints: [
          'Stack Memory: Private to each thread. Stores primitive local variables, object reference pointers, and method activation call frames. Cleared automatically upon method return.',
          'Heap Memory: Shared across all threads. Stores all allocated object instances and class instance variables. Managed automatically by the Garbage Collector.',
          'Garbage Collection (GC): Automated JVM background process identifying and reclaiming memory occupied by objects unreachable from GC roots (thread stacks, static references).',
          'Object Lifecycle: 1. Created (via new) -> 2. In-Use (reachable) -> 3. Unreachable (eligible for GC) -> 4. Collected/Reclaimed.'
        ],
        codeExample: `public void process() {
    int count = 10;                // Stored on the Stack (primitive)
    String text = new String("Hi"); // 'text' reference on Stack, "Hi" Object on Heap
} // When process() returns, stack frame pops; the "Hi" object becomes eligible for GC`,
        pitfalls: [
          'Memory Leaks in Java: Unintentional object retention occurs when dead objects remain referenced in static collections or unclosed listeners, preventing GC reclamation.'
        ]
      },
      {
        id: 'c14-concurrency-utilities',
        title: '17. Multithreading and Concurrency Utilities',
        summary: 'High-level synchronization primitives and concurrency frameworks in java.util.concurrent.',
        keyPoints: [
          'ExecutorService: Manages a pool of reusable worker threads and handles task scheduling (Executors.newFixedThreadPool(10)).',
          'Future<V>: Represents the eventual result of an asynchronous computation, with methods isDone(), cancel(), and blocking get().',
          'Locks (ReentrantLock): Explicit mutual exclusion locks providing advanced features like fairness policies, tryLock(), and interruptible locking.',
          'Concurrent Collections: Thread-safe, lock-optimized collections such as ConcurrentHashMap, CopyOnWriteArrayList, and BlockingQueue.'
        ],
        codeExample: `ExecutorService executor = Executors.newFixedThreadPool(4);

Callable<Integer> calculationTask = () -> {
    Thread.sleep(100);
    return 42;
};

Future<Integer> future = executor.submit(calculationTask);

try {
    Integer result = future.get(); // Waits for completion and returns 42
    System.out.println("Result: " + result);
} finally {
    executor.shutdown();
}`,
        pitfalls: [
          'Forgetting to call executor.shutdown() leaves worker threads alive, preventing the JVM from terminating cleanly.'
        ]
      }
    ],
    examTips: [
      'Remember that dynamic method dispatch (runtime polymorphism) applies to instance methods, NOT to static methods or instance variables.',
      'Always distinguish throw (statement inside code) from throws (clause in method signature).',
      'The finally block executes even when a return statement is encountered in try or catch.',
      'HashSet and HashMap offer O(1) average lookup, while TreeSet and TreeMap offer O(log n) sorted operations.'
    ]
  };
