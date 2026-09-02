export interface StudyTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  codeExample?: string;
  pitfalls?: string[];
  complexity?: string;
  deepDiveNotes?: string[];
}

export interface ChapterStudyGuide {
  chapterId: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  overview: string;
  coreConcepts: StudyTopic[];
  examTips: string[];
  quickSummaryChecklist: string[];
}

export const CHAPTER_STUDY_NOTES: ChapterStudyGuide[] = [
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
