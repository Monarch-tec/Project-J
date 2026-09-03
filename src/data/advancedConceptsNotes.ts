import { ChapterStudyGuide, StudyTopic } from '../types';

export const CHAPTER_14_STUDY_GUIDE: ChapterStudyGuide = {
  chapterId: 'chapter-14',
  chapterNumber: 14,
  title: 'Chapter 14 — Major Advanced Programming Concepts',
  subtitle: 'OOP Pillars, Collections, Concurrency, I/O, JDBC, Sockets, Patterns & Memory Management',
  overview: 'A comprehensive, master-level reference manual and architectural syllabus for advanced Java programming. This curriculum provides deep technical definitions, execution models, bytecode and memory behaviors, common pitfalls, and real-world industrial implementations for every major advanced Java paradigm.',
  quickSummaryChecklist: [
    'OOP 4 Pillars: Encapsulation (state guarding), Inheritance (subclass derivation), Polymorphism (dynamic dispatch), Abstraction (contract definition).',
    'Inheritance: Single, Multilevel, and Hierarchical supported; Multiple class inheritance disallowed to prevent Diamond Ambiguity.',
    'Polymorphism: Static method overloading resolved at compile time; Dynamic method overriding resolved at runtime via heap object vtable dispatch.',
    'Abstract Classes vs Interfaces: Abstract classes maintain state & constructors; Interfaces represent pure behavioral contracts with default & static methods.',
    'Exception Handling: try-catch-finally (finally executes unconditionally even across returns), throw vs throws declaration, checked vs unchecked exceptions.',
    'Java Collections Framework: ArrayList (contiguous O(1) random access), LinkedList (node pointer links), HashSet (hash bucket uniqueness), TreeSet (Red-Black tree ordering), HashMap (amortized O(1) KV lookup), TreeMap (O(log n) sorted map).',
    'Generics & Type Erasure: Compile-time type verification replaced by Object/bounds at bytecode level with auto-inserted casts.',
    'Java I/O & Serialization: BufferedReader minimizes expensive native kernel syscalls; ObjectOutputStream persists object graphs with serialVersionUID and transient guards.',
    'Multithreading: Thread creation via Runnable or Thread class; synchronization utilizes intrinsic object monitor locks; wait/notify coordinates inter-thread signaling.',
    'java.util.concurrent: ExecutorService manages worker thread pools, Future handles asynchronous yields, ReentrantLock provides explicit locking, ConcurrentHashMap delivers lock-striped concurrency.',
    'Functional Interfaces & Lambdas: Single Abstract Method (SAM) specifications: Predicate (test), Consumer (accept), Supplier (get), Function (apply).',
    'Stream API Pipelines: Lazy intermediate transformations (filter, map, sorted) executed in a single pass upon invoking an eager terminal operation (collect, reduce, forEach).',
    'JDBC Database Connectivity: DriverManager, Connection, PreparedStatement (server-side parameterized query compilation preventing SQL injection), and ResultSet cursor iteration.',
    'Network Socket Programming: ServerSocket binds to a TCP port listening for inbound handshakes; client Socket establishes full-duplex TCP stream pipes.',
    'GUI Architecture: Swing mandates single-threaded UI rendering on the Event Dispatch Thread (EDT) via SwingUtilities.invokeLater; JavaFX utilizes a hierarchical Stage -> Scene -> Node graph.',
    'Design Patterns: Singleton (thread-safe double-checked locking), Factory (object instantiation decoupling), Observer (event pub/sub), MVC (separation of concerns).',
    'Java Memory Model & GC: Thread-isolated Stack (primitive variables, frame operands, heap reference pointers) vs Global Shared Heap (objects, instance fields); GC cleans unreferenced objects via GC Root reachability.'
  ],
  examTips: [
    'Remember: In runtime polymorphism, only instance methods are dynamically dispatched. Instance variables and static methods are bound at compile time based on the reference type!',
    'The finally block will execute even if return or break occurs inside try/catch (the only exception is System.exit(0) or JVM fatal crashes).',
    'Iterating over a collection while modifying it directly causes ConcurrentModificationException; always use Iterator.remove() or concurrent data structures.',
    'PreparedStatement compiles the SQL execution plan before binding parameters, completely neutralizing SQL injection risks.',
    'In multithreading, always check condition loops using while(condition) instead of if(condition) when calling wait() to avoid spurious wakeups.'
  ],
  coreConcepts: [
    {
      id: 'c14-oop-pillars',
      title: '1. Object-Oriented Programming (OOP) & The 4 Pillars',
      summary: 'The foundational architectural paradigm of Java that structures enterprise software into modular, encapsulated, polymorphic, and abstract objects.',
      tags: ['OOP', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'Core Architecture'],
      complexity: 'Fundamental',
      deepDiveNotes: [
        'Object-Oriented Programming in Java is not merely a syntax convention; it is a design philosophy engineered for maintainability, encapsulation, and large-scale enterprise system design. At its core are four foundational pillars:',
        '1. Encapsulation: The bundling of state (fields) and behavior (methods) into a cohesive unit while restricting direct external access to mutable state. By marking fields private and providing controlled accessor and mutator methods, classes establish strict class invariants. For mutable fields (such as java.util.Date or arrays), defensive copying must be practiced to avoid leaking internal state.',
        '2. Inheritance: The mechanism enabling a subclass to derive structure and behavior from an existing superclass via the "extends" keyword. Inheritance establishes an "IS-A" semantic relationship and promotes systematic code reuse. In Java, all reference types implicitly extend java.lang.Object.',
        '3. Polymorphism: The capacity of code to operate uniformly on objects of different underlying types. Java provides both compile-time polymorphism (method overloading) and runtime polymorphism (method overriding via dynamic method dispatch).',
        '4. Abstraction: The deliberate concealment of internal implementation complexities while presenting a clean, stable public contract. Java achieves abstraction through abstract classes (which can provide partial implementations and state) and interfaces (which declare behavioral contracts).'
      ],
      keyPoints: [
        'Encapsulation maintains class invariants and enables safe validation logic inside setter methods.',
        'Always implement defensive copying in getters when returning references to mutable internal objects.',
        'Inheritance creates a tight coupling between parent and child; favor composition over inheritance when IS-A is not strictly valid.',
        'All Java classes have java.lang.Object at the root of their hierarchy, inheriting methods like toString(), equals(), hashCode(), and getClass().',
        'Abstraction decouples client code from implementation volatility, allowing backend engines to change without breaking consuming callers.'
      ],
      architectureDiagram: `
+-------------------------------------------------------------+
|                     OOP 4 PILLARS IN JAVA                  |
+-------------------------------------------------------------+
|  [Encapsulation]          |  [Inheritance]                  |
|  - Private state          |  - Superclass -> Subclass       |
|  - Public Getters/Setters |  - "IS-A" hierarchy             |
|  - Defensive copying      |  - Code reuse & extension       |
|---------------------------+---------------------------------|
|  [Polymorphism]           |  [Abstraction]                  |
|  - Multiple forms         |  - Expose "What", hide "How"    |
|  - Static Overloading     |  - Interfaces (pure contracts)  |
|  - Dynamic Overriding     |  - Abstract classes (templates) |
+-------------------------------------------------------------+
      `,
      codeExample: `// Encapsulation: Private state guarded by validation and defensive copying
import java.util.Date;

public class EmployeeAccount {
    private final String employeeId;
    private double salary;
    private Date joinDate;

    public EmployeeAccount(String employeeId, double initialSalary, Date joinDate) {
        if (employeeId == null || employeeId.isBlank()) {
            throw new IllegalArgumentException("Employee ID cannot be empty");
        }
        if (initialSalary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        this.employeeId = employeeId;
        this.salary = initialSalary;
        // Defensive copy of mutable Date object
        this.joinDate = new Date(joinDate.getTime());
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public double getSalary() {
        return salary;
    }

    public synchronized void adjustSalary(double delta) {
        if (this.salary + delta < 0) {
            throw new IllegalStateException("Salary adjustment results in negative balance");
        }
        this.salary += delta;
    }

    public Date getJoinDate() {
        // Defensive copy on getter to prevent external tampering
        return new Date(joinDate.getTime());
    }
}`,
      codeExplanation: 'The EmployeeAccount demonstrates robust encapsulation: the fields are marked private, constructor arguments are rigorously validated, and mutable Date instances are defensively cloned both on ingestion and retrieval to prevent external reference leaks.',
      pitfalls: [
        'Exposing raw mutable object references (e.g. returning an internal List or Date directly) allows external callers to bypass setters and mutate internal state directly.',
        'Creating deep, brittle inheritance hierarchies rather than composing smaller, testable collaborating components.'
      ],
      realWorldScenario: 'In banking and financial trading engines, accounts, ledgers, and transaction records strictly use encapsulation to prevent rogue microservices from modifying account balances without ledger journal entries.',
      interviewQnA: [
        {
          question: 'What is the primary difference between Abstraction and Encapsulation?',
          answer: 'Encapsulation is about data hiding and wrapping state with behavior into a secure boundary (controlling HOW data is accessed). Abstraction is about hiding internal implementation details and exposing only the essential public interface to consumers (focusing on WHAT the system does rather than how).'
        },
        {
          question: 'Why does Joshua Bloch advise to "favor composition over inheritance" in Effective Java?',
          answer: 'Inheritance violates encapsulation if the superclass changes internal implementation details in future releases, potentially breaking subclasses. Composition avoids this by holding a private reference to the collaborator, providing flexibility, testability, and decoupled behavior.'
        }
      ]
    },
    {
      id: 'c14-inheritance-types',
      title: '2. Inheritance Types & Method Overriding',
      summary: 'A taxonomy of inheritance structures in the JVM, the rules of single vs multiple inheritance, and method overriding constraints.',
      tags: ['Inheritance', 'Method Overriding', 'Extends', 'Diamond Problem', 'Polymorphism'],
      complexity: 'Fundamental',
      deepDiveNotes: [
        'Inheritance allows a subclass to acquire all non-private fields and methods from a superclass. Java classifies inheritance into distinct structural models:',
        '1. Single Inheritance: A subclass inherits directly from exactly one superclass (class B extends A). This is the standard, safest form of inheritance.',
        '2. Multilevel Inheritance: A class inherits from a subclass, forming an inheritance chain (class C extends B, where B extends A). C inherits properties of both B and A.',
        '3. Hierarchical Inheritance: Multiple subclasses inherit from a common parent class (class Dog extends Animal and class Cat extends Animal). Both subclasses share parent capabilities.',
        '4. Multiple Class Inheritance (Disallowed): Java does NOT permit a class to extend multiple classes (e.g., class C extends A, B is invalid). This restriction prevents the "Diamond Problem" (ambiguity arising when two parents implement conflicting versions of the same method signature). Instead, multiple inheritance is safely enabled through interfaces.',
        'Method Overriding occurs when a child class provides a specific implementation of a method declared in its parent class. The overriding method MUST have: identical method name, identical parameter types and ordering, a compatible return type (covariant returns are allowed), and an access modifier equal to or more accessible than the parent method. It cannot throw broader checked exceptions than the parent method.'
      ],
      keyPoints: [
        'Java supports single class inheritance and multiple interface inheritance.',
        'Constructors are NOT inherited by subclasses. A subclass constructor always calls super() as its first statement (implicitly or explicitly).',
        'The @Override annotation is a compiler safeguard that confirms the method accurately overrides a superclass method signature.',
        'Private, static, and final methods CANNOT be overridden.',
        'Covariant return types allow an overriding method to return a subtype of the return type declared in the parent method.'
      ],
      architectureDiagram: `
SINGLE:         MULTILEVEL:        HIERARCHICAL:      DIAMOND PROBLEM (BANNED):
+--------+       +--------+          +--------+           +--------+
| Animal |       | Animal |          | Animal |           |   A    |
+--------+       +--------+          +--------+          /          \\
    |                |                 /      \\      +----+        +----+
    v                v                v        v     | B  |        | C  |
+--------+       +--------+       +-----+   +-----+   \\          /
|  Dog   |       | Mammal |       | Dog |   | Cat |     +--------+
+--------+       +--------+       +-----+   +-----+     |   D    | (Ambiguous!)
                     |                                  +--------+
                     v
                 +--------+
                 |  Dog   |
                 +--------+
      `,
      codeExample: `// Taxonomy of Inheritance and Method Overriding
class Vehicle {
    protected String brand = "Generic";

    public void startEngine() {
        System.out.println("Vehicle engine starts with basic ignition.");
    }

    public Vehicle clonePrototype() {
        return new Vehicle();
    }
}

// Single Inheritance + Method Overriding with Covariant Return Type
class ElectricCar extends Vehicle {
    private int batteryPercentage = 100;

    @Override
    public void startEngine() {
        // Accessing parent behavior via super
        super.startEngine();
        System.out.println("Electric motor engaged silently. Battery: " + batteryPercentage + "%");
    }

    // Covariant Return: Returns ElectricCar instead of Vehicle
    @Override
    public ElectricCar clonePrototype() {
        return new ElectricCar();
    }
}

// Multilevel Inheritance: TeslaModelS -> ElectricCar -> Vehicle
class TeslaModelS extends ElectricCar {
    public void activateAutopilot() {
        System.out.println("Tesla Autopilot engaged.");
    }
}`,
      codeExplanation: 'ElectricCar extends Vehicle, overriding startEngine() while invoking super.startEngine(). It also demonstrates covariant returns by returning ElectricCar from clonePrototype(). TeslaModelS extends ElectricCar, establishing a 3-tier multilevel hierarchy.',
      pitfalls: [
        'Attempting to weaken access privileges when overriding (e.g. overriding a public parent method with protected or default) produces a compiler error.',
        'Forgetting that static methods cannot be overridden; declaring a static method with the same signature in a subclass only hides (shadows) the parent method.'
      ],
      realWorldScenario: 'GUI frameworks like Java Swing (JFrame -> Frame -> Window -> Container -> Component) rely heavily on multilevel and hierarchical inheritance for event handling and rendering hierarchies.',
      interviewQnA: [
        {
          question: 'Can you override a method with a different return type in Java?',
          answer: 'Only if the return type is a covariant return type (i.e. a subclass of the original return type, introduced in Java 5). If the return type is primitive or an unrelated class, changing the return type results in a compilation error.'
        },
        {
          question: 'Why does Java disallow multiple inheritance for classes but permit it for interfaces?',
          answer: 'Classes contain mutable state (instance fields) and method implementations. Multiple class inheritance causes the Diamond Problem, creating ambiguity over which state and constructor to initialize. Interfaces historically contained no state, and with Java 8 default methods, conflicts must be resolved explicitly by the implementer.'
        }
      ]
    },
    {
      id: 'c14-polymorphism',
      title: '3. Polymorphism: Compile-Time vs Runtime (Dynamic Method Dispatch)',
      summary: 'Comprehensive analysis of method overloading vs overriding, dynamic method dispatch, virtual method tables (vtables), and runtime type resolution.',
      tags: ['Polymorphism', 'Dynamic Dispatch', 'Overloading', 'Overriding', 'Virtual Methods', 'vtable'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Polymorphism, derived from the Greek "many forms", is the capability of an object or operation to behave differently depending on the context. In Java, polymorphism manifests in two distinct mechanisms:',
        '1. Compile-Time Polymorphism (Static Binding / Method Overloading): Occurs when multiple methods in the same class share the exact same identifier but maintain distinct parameter signatures (differing in argument count, argument types, or argument order). The compiler analyzes parameter types at compile time using static type analysis and embeds the exact method symbol directly into the class bytecode (invokestatic / invokevirtual). Return type differences alone are NOT sufficient for overloading.',
        '2. Runtime Polymorphism (Dynamic Binding / Method Overriding / Dynamic Method Dispatch): Occurs when a subclass overrides an instance method of its superclass. When the method is invoked on a parent reference (e.g., Animal a = new Dog()), the compiler emits the invokevirtual bytecode instruction. At runtime, the JVM inspects the actual object on the heap and consults the object\'s Virtual Method Table (vtable). It resolves and executes the subclass\'s overridden method rather than the parent method.',
        'CRITICAL RULE: Dynamic Method Dispatch applies ONLY to non-static instance methods. Fields (variables) and static methods do NOT exhibit polymorphic dispatch; they are statically bound at compile time based solely on the declared reference type.'
      ],
      keyPoints: [
        'Method Overloading = Compile-time polymorphism (static binding based on reference type & argument types).',
        'Method Overriding = Runtime polymorphism (dynamic binding via vtable based on heap object type).',
        'Invoking a method via Animal a = new Dog(); a.sound(); prints "Dog barks" because Dog is the actual heap object.',
        'Instance variables are resolved at compile time: Animal a = new Dog(); System.out.println(a.name); accesses Animal.name!',
        'Final methods cannot be overridden, enabling the JIT compiler to perform method inlining optimizations.'
      ],
      architectureDiagram: `
COMPILE-TIME: Parent Reference Type
Animal a = new Dog();
   |
   +--> Compiler validates: Does Animal have sound()? YES (Validates signature)
        Generates: invokevirtual Animal.sound()

RUNTIME EXECUTION: Heap Object Inspection (Dynamic Dispatch)
Stack: [ Reference 'a' ] -------> Heap: [ Dog Object Instance ]
                                            |
                                            v (Reads class pointer / vtable)
                                        [ Dog.class vtable ]
                                            sound() -> Dog.sound() [EXECUTES!]
      `,
      codeExample: `// Classic Dynamic Method Dispatch & Variable Binding Demonstration
class Animal {
    String species = "Generic Animal";

    void sound() {
        System.out.println("Animal makes a sound");
    }

    static void describe() {
        System.out.println("Static Animal Description");
    }
}

class Dog extends Animal {
    String species = "Canine Dog"; // Shadows parent field

    @Override
    void sound() {
        System.out.println("Dog barks");
    }

    // Static method hiding (NOT overriding)
    static void describe() {
        System.out.println("Static Dog Description");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal a = new Dog();

        // 1. Dynamic Method Dispatch (Runtime Polymorphism)
        a.sound(); // Prints: "Dog barks"

        // 2. Field Access (Static Binding based on reference type)
        System.out.println(a.species); // Prints: "Generic Animal" (NOT "Canine Dog"!)

        // 3. Static Method (Static Binding based on reference type)
        a.describe(); // Prints: "Static Animal Description"
    }
}`,
      codeExplanation: 'When a.sound() is called, dynamic method dispatch invokes Dog.sound(). However, when a.species or a.describe() is accessed, Java binds statically to Animal because field access and static method invocations do not use vtable dispatch.',
      pitfalls: [
        'Expecting instance variables or static methods to be polymorphic. They are resolved statically according to the variable\'s declared reference type.',
        'Calling an overridable method inside a constructor. The subclass constructor has not yet initialized its fields, resulting in null pointers or uninitialized state bugs.'
      ],
      realWorldScenario: 'Plugin architectures and JDBC driver managers use dynamic method dispatch so client applications can call Connection conn = DriverManager.getConnection() and invoke conn.prepareStatement() without knowing whether Postgres, MySQL, or Oracle is running underneath.',
      interviewQnA: [
        {
          question: 'What is Dynamic Method Dispatch and how does the JVM implement it?',
          answer: 'Dynamic Method Dispatch is the runtime resolution of an overridden method call. The JVM implements it using a Virtual Method Table (vtable) associated with each class. At runtime, the invokevirtual instruction looks up the offset in the vtable of the actual heap object and executes the corresponding bytecode address.'
        },
        {
          question: 'Why can static methods not be overridden in Java?',
          answer: 'Static methods belong to the class itself, not to an object instance on the heap. Because there is no object instance or vtable involved, the compiler binds the method call statically at compile time using the invokestatic instruction based solely on the reference type.'
        }
      ]
    },
    {
      id: 'c14-abstract-interfaces',
      title: '4. Abstract Classes and Interfaces',
      summary: 'Architectural contracts and incomplete templates: contrasting abstract classes with modern Java 8/9/17 interfaces.',
      tags: ['Abstract Class', 'Interface', 'Default Methods', 'Multiple Inheritance', 'API Design'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Abstraction provides the architectural blueprints for Java enterprise applications. Java provides two primary mechanisms to define abstractions:',
        '1. Abstract Classes: Classes declared with the "abstract" keyword that cannot be instantiated directly via "new". They represent incomplete conceptual templates that subclasses must finish. An abstract class can have instance variables (mutable state), constructors (invoked by subclass constructors via super()), concrete methods with implementations, and abstract methods that subclasses must implement. An abstract class is suitable when classes share significant common state and internal code.',
        '2. Interfaces: Pure behavioral contracts declared with the "interface" keyword. A class can implement any number of interfaces (implements A, B, C), providing clean multiple inheritance of behavior. All fields in an interface are implicitly "public static final" constants.',
        'Evolution of Interfaces in Modern Java:',
        '- Java 8 introduced "default" methods (concrete instance methods with bodies, allowing interface evolution without breaking existing implementers) and "static" helper methods.',
        '- Java 9 introduced "private" and "private static" methods inside interfaces for internal code sharing between default methods.',
        '- Java 17 sealed interfaces permit explicit restriction on which classes can implement the interface.'
      ],
      keyPoints: [
        'Abstract classes can hold state (instance fields) and have constructors; interfaces cannot hold instance state or constructors.',
        'A class can extend only ONE abstract class, but can implement UNLIMITED interfaces.',
        'Default methods in interfaces allow backward-compatible library upgrades without breaking existing implementations.',
        'If a class implements two interfaces with identical default method signatures, the class must override the method to resolve the ambiguity.',
        'Interfaces are ideal for defining cross-cutting capabilities (e.g. Comparable, Serializable, AutoCloseable).'
      ],
      architectureDiagram: `
+------------------------------------+------------------------------------+
|          ABSTRACT CLASS            |             INTERFACE              |
+------------------------------------+------------------------------------+
| - Single inheritance (extends)     | - Multiple implementation (implements)
| - Can have instance state (fields) | - Only public static final constants
| - Has constructors (super())       | - NO constructors allowed          |
| - Partial implementation base      | - Pure behavioral contract         |
| - Access modifiers: any            | - Methods implicitly public        |
+------------------------------------+------------------------------------+
      `,
      codeExample: `// Interface Contract with Modern Default and Static Methods
interface PaymentProcessor {
    void processPayment(double amount); // Abstract contract

    default void logTransaction(String txId, double amount) {
        System.out.println("Tx [" + txId + "] processed: $" + amount);
        notifyAuditService(txId);
    }

    private void notifyAuditService(String txId) { // Java 9 private helper
        System.out.println("Audit trail recorded for: " + txId);
    }

    static boolean isCurrencySupported(String currency) { // Static method
        return "USD".equalsIgnoreCase(currency) || "EUR".equalsIgnoreCase(currency);
    }
}

// Abstract Template Class Holding State & Common Logic
abstract class AbstractPaymentService implements PaymentProcessor {
    protected final String merchantId; // State

    public AbstractPaymentService(String merchantId) {
        this.merchantId = merchantId;
    }

    public abstract void validateCredentials();
}

// Concrete Implementer
class StripeProcessor extends AbstractPaymentService {
    public StripeProcessor(String merchantId) {
        super(merchantId);
    }

    @Override
    public void validateCredentials() {
        System.out.println("Validating Stripe API key for: " + merchantId);
    }

    @Override
    public void processPayment(double amount) {
        validateCredentials();
        System.out.println("Stripe charged $" + amount);
        logTransaction("ST-9988", amount);
    }
}`,
      codeExplanation: 'PaymentProcessor demonstrates modern interface capabilities (default, private, static methods). AbstractPaymentService provides shared merchantId state and constructor logic, and StripeProcessor completes the concrete implementation.',
      pitfalls: [
        'Using an abstract class when an interface would suffice, unnecessarily consuming the class\'s single inheritance slot.',
        'Assuming interface fields can be modified; interface fields are implicitly public, static, and final.'
      ],
      realWorldScenario: 'In Spring Data and Java Collections, interfaces (List, Set, Map) define the behavioral contract, while abstract classes (AbstractList, AbstractMap) provide common skeletal implementations to reduce boilerplate.',
      interviewQnA: [
        {
          question: 'When should you choose an Abstract Class over an Interface in Java?',
          answer: 'Choose an abstract class when you need to share mutable state (instance fields), declare non-public methods (e.g., protected helper methods), or require constructor logic. Choose an interface when defining a contract that can be implemented by unrelated classes across the codebase.'
        },
        {
          question: 'How does Java resolve conflicts if a class implements two interfaces with the exact same default method?',
          answer: 'The Java compiler flags a compilation error due to ambiguity. The implementing class must explicitly override the conflicting method and specify which interface to delegate to (e.g., InterfaceA.super.methodName()) or provide its own logic.'
        }
      ]
    },
    {
      id: 'c14-exception-handling',
      title: '5. Exception Handling Architecture & Custom Exceptions',
      summary: 'The JVM exception hierarchy, try-catch-finally mechanics, try-with-resources, throw vs throws, and custom exception design.',
      tags: ['Exceptions', 'Try-Catch', 'Finally', 'Checked vs Unchecked', 'Try-With-Resources', 'Custom Exceptions'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Robust applications must gracefully detect, report, and recover from exceptional conditions without terminating the JVM. In Java, all exceptions and errors inherit from java.lang.Throwable:',
        '1. Error: Serious environmental problems (e.g. OutOfMemoryError, StackOverflowError) that ordinary applications should not attempt to catch.',
        '2. Exception: Conditions that a reasonable application might want to catch. Subdivided into:',
        '   - Checked Exceptions: Subclasses of Exception (excluding RuntimeException). Verified at compile time. Methods must declare them via "throws" or handle them in "try-catch". Examples: IOException, SQLException.',
        '   - Unchecked Exceptions (Runtime): Subclasses of RuntimeException. Represent programming defects (e.g. NullPointerException, IllegalArgumentException, IndexOutOfBoundsException). Not verified at compile time.',
        'Language Mechanics:',
        '- "try": Encloses code that might throw an exception.',
        '- "catch": Pattern-matches and handles specific exception types. More specific subclasses must precede broader superclasses.',
        '- "finally": Guarantees execution regardless of whether an exception was thrown, caught, or bypassed via a return statement. The only exceptions are System.exit(0) or sudden JVM termination.',
        '- "throw": Explicitly dispatches an exception instance into the execution stack.',
        '- "throws": Clause in a method signature declaring checked exceptions callers must handle.',
        '- "try-with-resources": Automatically closes any resource implementing AutoCloseable (introduced in Java 7).'
      ],
      keyPoints: [
        'The finally block ALWAYS executes, even if return statements exist inside the try or catch blocks.',
        'try-with-resources automatically suppresses secondary exceptions and ensures deterministically closed resources.',
        'Never catch Throwable or generic Exception unless building a top-level global error dispatcher.',
        'Custom exceptions should extend RuntimeException for business logic errors, or Exception for recoverable checked scenarios.',
        'Always pass the causing exception as a root cause (Exception chaining: new MyException("Error", cause)).'
      ],
      architectureDiagram: `
                         +-------------------+
                         |     Throwable     |
                         +-------------------+
                               /       \\
                              v         v
                     +-----------+   +---------------+
                     |   Error   |   |   Exception   |
                     +-----------+   +---------------+
                     (Fatal JVM)      /             \\
                                     v               v
                         +--------------------+  +----------------------+
                         |  RuntimeException  |  |  Checked Exceptions  |
                         +--------------------+  +----------------------+
                         (Unchecked / Bugs)      (Compiler Enforced)
                         - NullPointer           - IOException
                         - Arithmetic            - SQLException
                         - IllegalArgument       - ClassNotFoundException
      `,
      codeExample: `// Custom Domain Exception & Try-With-Resources Execution
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

// Custom Domain Exception
class InsufficientFundsException extends Exception {
    private final double deficit;

    public InsufficientFundsException(String message, double deficit) {
        super(message);
        this.deficit = deficit;
    }

    public double getDeficit() { return deficit; }
}

public class ExceptionHandlingDemo {
    // Declares checked exception with throws clause
    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            // Explicitly raises exception with throw
            throw new InsufficientFundsException("Account overdrawn", amount - balance);
        }
        System.out.println("Withdrawal approved: $" + amount);
    }

    // Try-with-resources automatically closes AutoCloseable resource
    public static String readFirstLine(String path) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            return br.readLine();
        } // br.close() called automatically here even on error!
    }

    public static void main(String[] args) {
        try {
            withdraw(100.0, 150.0);
        } catch (InsufficientFundsException e) {
            System.err.println("Transaction Blocked: " + e.getMessage() + " (Deficit: $" + e.getDeficit() + ")");
        } finally {
            System.out.println("Audit checkpoint complete.");
        }
    }
}`,
      codeExplanation: 'Demonstrates checked custom exceptions extending Exception, the throws signature contract, the throw instance invocation, try-with-resources automatic resource closure, and unconditional finally execution.',
      pitfalls: [
        'Swallowing exceptions with an empty catch block: catch (Exception e) {} - this completely conceals system failures and makes debugging impossible.',
        'Returning a value from inside a finally block: this will overwrite and suppress any exception thrown in the try block!'
      ],
      realWorldScenario: 'In microservices and REST APIs, Spring @ControllerAdvice catches custom domain exceptions and translates them into structured HTTP 400 or 409 responses.',
      interviewQnA: [
        {
          question: 'What happens if a return statement is present in both the try block and the finally block?',
          answer: 'The finally block will execute and its return value will overwrite the return value of the try block. If an exception was thrown in the try block, the finally block\'s return will silence and discard the exception completely.'
        },
        {
          question: 'What is the difference between final, finally, and finalize in Java?',
          answer: 'final is a keyword creating constants, non-overridable methods, or non-extensible classes. finally is a block that guarantees execution after try-catch. finalize() is a deprecated method on Object once called prior to garbage collection.'
        }
      ]
    },
    {
      id: 'c14-collections-framework',
      title: '6. Java Collections Framework & Iterators',
      summary: 'Data structures, algorithm complexities, fail-fast vs fail-safe iterators, and trade-offs between Lists, Sets, and Maps.',
      tags: ['Collections', 'ArrayList', 'LinkedList', 'HashSet', 'TreeSet', 'HashMap', 'TreeMap', 'Iterator', 'Big-O'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'The Java Collections Framework (JCF) provides standardized, high-performance data structures in java.util. Root interfaces include Collection (List, Set, Queue) and Map (Key-Value associations):',
        '1. List Implementations (Ordered, allows duplicates):',
        '   - ArrayList: Dynamic array. O(1) random access by index via direct memory offset. O(1) amortized append. O(n) insertion/deletion due to System.arraycopy element shifts.',
        '   - LinkedList: Doubly linked list. O(1) insertion/deletion at head/tail. O(n) random access by traversing node pointers. Higher memory overhead per node.',
        '2. Set Implementations (Unique elements):',
        '   - HashSet: Backed by a HashMap. O(1) average add, remove, and contains operations. Requires correct equals() and hashCode() contracts.',
        '   - TreeSet: Backed by a Red-Black balanced binary search tree. Elements are sorted by natural order (Comparable) or Comparator. O(log n) performance.',
        '3. Map Implementations (Key-Value associations, unique keys):',
        '   - HashMap: Hash table with buckets. Initial capacity 16, load factor 0.75. Java 8 converts linked collision buckets to Red-Black trees when bucket length exceeds 8 (TREEIFY_THRESHOLD), reducing worst-case collisions from O(n) to O(log n).',
        '   - TreeMap: Red-Black tree sorted by key. O(log n) guarantees for get, put, remove.',
        '4. Iterators: The Iterator interface provides safe traversal (hasNext, next, remove). Standard collection iterators are "fail-fast": if the underlying collection is structurally modified during traversal by any means other than Iterator.remove(), a ConcurrentModificationException is thrown immediately via modCount tracking.'
      ],
      keyPoints: [
        'ArrayList provides O(1) random access; LinkedList provides O(1) insertion if you already have the node reference.',
        'HashSet and HashMap provide O(1) amortized operations; TreeSet and TreeMap provide O(log n) sorted operations.',
        'Violating the equals() and hashCode() contract breaks HashSet and HashMap key lookups.',
        'Modifying a collection during enhanced for-loop iteration triggers ConcurrentModificationException; use Iterator.remove() instead.',
        'HashMap is NOT thread-safe; use ConcurrentHashMap in multithreaded environments.'
      ],
      architectureDiagram: `
                       COLLECTIONS ARCHITECTURE
       +------------------------------------------------------+
       |                    Collection<E>                     |
       +------------------------------------------------------+
             /                  |                  \\
            v                   v                   v
      +-----------+       +-----------+       +-----------+
      |  List<E>  |       |  Set<E>   |       | Queue<E>  |
      +-----------+       +-----------+       +-----------+
       /        \\          /        \\               |
      v          v        v          v              v
  ArrayList  LinkedList HashSet   TreeSet      ArrayDeque
  [O(1) idx] [Pointers] [O(1)Hash] [O(logn)]

       +------------------------------------------------------+
       |                       Map<K,V>                       |
       +------------------------------------------------------+
             /                                      \\
            v                                        v
      +---------------+                      +---------------+
      |  HashMap<K,V> |                      |  TreeMap<K,V> |
      +---------------+                      +---------------+
      [O(1) Amortized]                       [O(log n) Sorted]
      (Buckets -> Red-Black Tree)            (Red-Black Tree)
      `,
      codeExample: `// Safe Collection Traversal & Map Treeification Mechanics
import java.util.*;

public class CollectionsMastery {
    public static void main(String[] args) {
        // 1. ArrayList Traversal and Safe Removal via Iterator
        List<String> logs = new ArrayList<>(Arrays.asList("DEBUG", "INFO", "WARN", "DEBUG", "ERROR"));
        
        Iterator<String> it = logs.iterator();
        while (it.hasNext()) {
            String entry = it.next();
            if ("DEBUG".equals(entry)) {
                it.remove(); // SAFE removal without ConcurrentModificationException!
            }
        }
        System.out.println("Sanitized Logs: " + logs);

        // 2. HashMap Custom Key Contract (equals + hashCode)
        record EmployeeId(int id, String department) {} // Record auto-generates equals/hashCode
        
        Map<EmployeeId, Double> salaryMap = new HashMap<>();
        salaryMap.put(new EmployeeId(101, "Engineering"), 145000.0);
        salaryMap.put(new EmployeeId(102, "Design"), 115000.0);

        // O(1) retrieval
        Double salary = salaryMap.get(new EmployeeId(101, "Engineering"));
        System.out.println("Retrieved Salary: $" + salary);

        // 3. TreeSet Sorted by Custom Comparator
        Set<Integer> scores = new TreeSet<>(Comparator.reverseOrder());
        scores.addAll(List.of(88, 95, 72, 99, 91));
        System.out.println("Top Scores (Descending): " + scores);
    }
}`,
      codeExplanation: 'Demonstrates safe element deletion using Iterator.remove(), shows how record types satisfy the equals/hashCode contract for HashMap keys, and showcases a TreeSet sorted descending via Comparator.reverseOrder().',
      pitfalls: [
        'Mutating an object after inserting it as a key in a HashMap or HashSet. If its hashCode changes, it can no longer be found in the map.',
        'Using Hashtable or Vector in modern code; they are legacy synchronized structures that cause unnecessary lock contention.'
      ],
      realWorldScenario: 'High-throughput caches use ConcurrentHashMap with WeakReference or custom LRU linked maps to ensure thread-safe, sub-millisecond key lookups across hundreds of concurrent threads.',
      interviewQnA: [
        {
          question: 'How does HashMap handle hash collisions in Java 8 and later?',
          answer: 'In Java 8, when elements in a single bucket reach TREEIFY_THRESHOLD (8 items) and table capacity is at least 64, the linked list is converted to a Red-Black Tree. This changes the worst-case lookup from O(n) to O(log n), guarding against collision-based Denial of Service attacks.'
        },
        {
          question: 'What is the contract between equals() and hashCode() in Java?',
          answer: 'If two objects are equal according to equals(), they MUST have the same hashCode(). However, if two objects have the same hashCode(), they are not necessarily equal (a hash collision). Failing to fulfill this breaks hash-based collections.'
        }
      ]
    },
    {
      id: 'c14-generics',
      title: '7. Generics & Type Safety (Type Erasure & Wildcards)',
      summary: 'Compile-time type checking, generic classes and methods, bounded wildcards (PECS), and JVM type erasure mechanics.',
      tags: ['Generics', 'Type Erasure', 'Wildcards', 'PECS', 'Type Safety'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'Java Generics (introduced in Java 5) enable parameterized types, providing compile-time type safety and eliminating redundant manual casts. Key components include:',
        '1. Generic Classes & Methods: Classes or methods parameterized with placeholder types (e.g. <T>, <K, V>). Enables reusable algorithms that enforce type consistency.',
        '2. Bounded Type Parameters: Constraining types using upper bounds (e.g., <T extends Number>) ensures that T provides specific methods (like doubleValue()).',
        '3. Wildcards & The PECS Principle (Producer Extends, Consumer Super):',
        '   - Upper-Bounded Wildcard (<? extends T>): Use when you only READ elements from a generic collection (it produces items). You cannot add new items (except null) because the exact subtype is unknown.',
        '   - Lower-Bounded Wildcard (<? super T>): Use when you only WRITE elements to a generic collection (it consumes items).',
        '4. Type Erasure: The JVM does NOT preserve generic type arguments at runtime. The compiler validates generic rules at compile time and then "erases" the types, replacing type parameters with their bounding class (or Object if unbounded) and inserting explicit casts. This maintains binary backward compatibility with pre-Java 5 bytecode.',
        'Consequences of Type Erasure: You cannot create new T(), cannot create generic arrays (new T[10]), and cannot use instanceof with generic arguments (instanceof List<String> is forbidden; use List<?>).'
      ],
      keyPoints: [
        'Generics exist purely at compile-time; bytecodes contain raw types with synthetic casts (Type Erasure).',
        'PECS: Producer Extends, Consumer Super. Use <? extends T> when reading, <? super T> when writing.',
        'List<Integer> is NOT a subclass of List<Number>, even though Integer extends Number (Generics are invariant).',
        'Arrays are covariant (String[] is an Object[]), which can cause ArrayStoreException at runtime; generic collections are invariant, catching mismatches at compile time.',
        'Primitive types cannot be used directly as generic arguments (use Integer instead of int).'
      ],
      architectureDiagram: `
                     TYPE ERASURE AT COMPILE TIME
    Source Code (Compile-Time)         Bytecode (Runtime)
    -------------------------         -------------------
    List<String> list = new ArrayList<>();   ==>   List list = new ArrayList();
    list.add("Hello");                       ==>   list.add((Object)"Hello");
    String s = list.get(0);                  ==>   String s = (String) list.get(0);
                                                   (Compiler inserts casts)
      `,
      codeExample: `// Generic Repository, Bounded Wildcards, and the PECS Principle
import java.util.ArrayList;
import java.util.List;

public class GenericsMastery {
    // Generic Class with Type Parameter
    public static class Box<T> {
        private T value;
        public void set(T value) { this.value = value; }
        public T get() { return value; }
    }

    // PECS: Producer Extends (Reading from source)
    public static double sumNumbers(List<? extends Number> producerList) {
        double sum = 0.0;
        for (Number num : producerList) {
            sum += num.doubleValue(); // Reading is safe!
        }
        // producerList.add(10); // COMPILE ERROR: Cannot add to ? extends Number
        return sum;
    }

    // PECS: Consumer Super (Writing to destination)
    public static void addIntegers(List<? super Integer> consumerList) {
        consumerList.add(10); // Writing is safe!
        consumerList.add(20);
    }

    public static void main(String[] args) {
        List<Double> doubleList = List.of(1.5, 2.5, 3.0);
        System.out.println("Sum: " + sumNumbers(doubleList)); // Works via ? extends Number

        List<Number> numList = new ArrayList<>();
        addIntegers(numList); // Works via ? super Integer
        System.out.println("Consumer list size: " + numList.size());
    }
}`,
      codeExplanation: 'Demonstrates a generic container class, the PECS rule with <? extends Number> for safely reading numeric values, and <? super Integer> for inserting integers into a general numeric sink collection.',
      pitfalls: [
        'Attempting to instantiate a generic type directly: new T() is forbidden due to type erasure.',
        'Trying to create a generic array: new List<String>[10] generates a compile-time generic array creation error.'
      ],
      realWorldScenario: 'Frameworks like Hibernate and Spring Data declare generic repositories (e.g. JpaRepository<User, Long>) to automatically generate CRUD operations without writing repetitive boilerplate code.',
      interviewQnA: [
        {
          question: 'What is Type Erasure in Java Generics and why was it implemented this way?',
          answer: 'Type Erasure is the compile-time removal of generic type metadata, replacing type variables with their bounds or Object. It was implemented to guarantee 100% backward binary compatibility with legacy code and pre-Java 5 JVMs.'
        },
        {
          question: 'Explain the PECS guideline with an example.',
          answer: 'PECS stands for Producer Extends, Consumer Super. If a method reads from a collection, declare it as <? extends T> (it produces T). If a method adds to a collection, declare it as <? super T> (it consumes T). Collections.copy(List<? super T> dest, List<? extends T> src) is the classic example.'
        }
      ]
    },
    {
      id: 'c14-file-handling',
      title: '8. File Handling, Java I/O Streams & Serialization',
      summary: 'Byte streams vs character streams, buffered I/O, try-with-resources, Object Serialization, transient keywords, and serialVersionUID.',
      tags: ['File I/O', 'Streams', 'BufferedReader', 'Serialization', 'Transient', 'serialVersionUID'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Java I/O is built on stream abstractions representing sequences of data flowing from a source to a destination. The framework divides into two distinct hierarchies:',
        '1. Byte Streams (InputStream / OutputStream): Read and write raw 8-bit binary bytes. Essential for images, video, network packets, and compiled bytecode. Examples: FileInputStream, FileOutputStream.',
        '2. Character Streams (Reader / Writer): Read and write 16-bit Unicode characters, handling character encoding (e.g., UTF-8) automatically. Examples: FileReader, FileWriter.',
        '3. Buffered Streams: Direct unbuffered I/O triggers expensive operating system kernel syscalls for every byte or character. BufferedReader and BufferedWriter maintain an internal memory buffer (default 8KB), drastically cutting disk/network overhead.',
        '4. Object Serialization: The mechanism of transforming an in-memory object graph into a binary byte stream via ObjectOutputStream, allowing it to be saved to disk or transmitted across networks, and reconstructed via ObjectInputStream. Requirements:',
        '- Class must implement the java.io.Serializable marker interface.',
        '- Fields marked with the "transient" modifier are skipped during serialization and initialized to default values (e.g., passwords, transient caches).',
        '- Classes should declare an explicit "private static final long serialVersionUID" to prevent InvalidClassException during class schema evolution.'
      ],
      keyPoints: [
        'Byte streams (InputStream/OutputStream) handle binary data; Character streams (Reader/Writer) handle text and encoding.',
        'Always wrap FileReader with BufferedReader to minimize expensive operating system disk syscalls.',
        'The transient keyword prevents sensitive or temporary fields from being serialized into the output stream.',
        'serialVersionUID acts as a version fingerprint for serialized objects, preventing version mismatches during deserialization.',
        'Always use try-with-resources to guarantee that underlying file descriptors and OS handles are released.'
      ],
      architectureDiagram: `
                            JAVA I/O HIERARCHY
                +-------------------+-------------------+
                |                                       |
          [Byte Streams]                        [Character Streams]
         (Raw 8-bit Binary)                      (16-bit Unicode)
        /                  \\                    /                 \\
  [InputStream]      [OutputStream]         [Reader]           [Writer]
  - FileInputStream  - FileOutputStream     - FileReader       - FileWriter
  - BufferedInput    - BufferedOutput       - BufferedReader   - BufferedWriter
  - ObjectInputStream- ObjectOutputStream
      `,
      codeExample: `// Buffered File I/O and Serializable Class with Transient Fields
import java.io.*;

// Serializable domain class
class UserSession implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L; // Version fingerprint

    private String username;
    private transient String rawPasswordHash; // Will NOT be written to disk!

    public UserSession(String username, String rawPasswordHash) {
        this.username = username;
        this.rawPasswordHash = rawPasswordHash;
    }

    @Override
    public String toString() {
        return "UserSession[username=" + username + ", password=" + rawPasswordHash + "]";
    }
}

public class SerializationMastery {
    public static void main(String[] args) {
        File file = new File("session.ser");

        // 1. Serialization
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
            UserSession session = new UserSession("admin_reuben", "superSecretPass123");
            oos.writeObject(session);
            System.out.println("Session serialized successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 2. Deserialization
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            UserSession restored = (UserSession) ois.readObject();
            // rawPasswordHash will be null because it was marked transient!
            System.out.println("Restored: " + restored);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            if (file.exists()) file.delete(); // Cleanup
        }
    }
}`,
      codeExplanation: 'Demonstrates implementing Serializable, declaring serialVersionUID, marking sensitive credentials as transient so they remain excluded from the byte stream, and using try-with-resources for stream management.',
      pitfalls: [
        'Failing to declare serialVersionUID: if you modify the class later, the JVM auto-generates a different UID, causing InvalidClassException when loading old serialized data.',
        'Attempting to serialize a class whose fields do not implement Serializable: throws NotSerializableException.'
      ],
      realWorldScenario: 'Distributed caching systems like Hazelcast, Redis session replicators, and Apache Spark serialize data structures across cluster worker nodes over TCP/IP sockets.',
      interviewQnA: [
        {
          question: 'What is the purpose of serialVersionUID in Java Serialization?',
          answer: 'serialVersionUID is a unique universal version identifier for a Serializable class. During deserialization, the JVM verifies that the sender and receiver of a serialized object have loaded classes that are compatible with respect to serialization.'
        },
        {
          question: 'Why should you wrap a FileReader inside a BufferedReader?',
          answer: 'FileReader reads characters one at a time directly from the underlying disk or file system, triggering thousands of costly kernel system calls. BufferedReader reads a large chunk of data (default 8KB) into memory at once, serving subsequent requests from RAM.'
        }
      ]
    },
    {
      id: 'c14-multithreading',
      title: '9. Multithreading & Thread Synchronization',
      summary: 'Thread lifecycles, Runnable vs Thread, race conditions, intrinsic monitors with synchronized, and inter-thread signaling with wait/notify.',
      tags: ['Multithreading', 'Concurrency', 'Synchronized', 'Thread Lifecycle', 'Wait/Notify', 'Monitors'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'Multithreading allows concurrent execution of two or more threads to maximize CPU utilization. In Java, threads are managed by the operating system kernel via JVM thread mappings:',
        '1. Thread Creation:',
        '   - Extending Thread: Directly inherits from java.lang.Thread. Restricts the class from extending any other class.',
        '   - Implementing Runnable: Preferred approach. Decouples the executable task from the Thread execution mechanism, supporting clean composition.',
        '2. Thread Lifecycle States (java.lang.Thread.State):',
        '   - NEW: Thread created, not yet started.',
        '   - RUNNABLE: Executing in the JVM or waiting for OS CPU quantum.',
        '   - BLOCKED: Waiting to acquire an intrinsic monitor lock held by another thread.',
        '   - WAITING: Waiting indefinitely for another thread to perform a specific action (via wait() or join()).',
        '   - TIMED_WAITING: Waiting for a specified time period (via sleep(ms) or wait(ms)).',
        '   - TERMINATED: run() execution completed or uncaught exception thrown.',
        '3. Synchronization & Race Conditions: When multiple threads access shared mutable state without coordination, interleaved memory operations cause data corruption (race conditions). The "synchronized" keyword uses the target object\'s internal monitor lock to guarantee mutual exclusion and establish a "happens-before" memory visibility guarantee.',
        '4. Inter-Thread Communication (wait, notify, notifyAll): Defined on java.lang.Object (not Thread) because locks are attached to object headers. Must ALWAYS be called from within a synchronized context on that object.'
      ],
      keyPoints: [
        'Prefer implementing Runnable over extending Thread to maintain clean decoupling and allow subclassing.',
        'Every Java object possesses an internal intrinsic lock (monitor). The synchronized keyword acquires this monitor.',
        'Always invoke wait() inside a while loop (while (!condition) { wait(); }), never inside an if statement, to prevent spurious wakeups.',
        'wait() releases the monitor lock while sleeping; Thread.sleep() keeps the monitor locked.',
        'volatile ensures variable read/write visibility directly from main memory, but does NOT guarantee atomicity for compound operations (e.g. count++).'
      ],
      architectureDiagram: `
                           THREAD LIFECYCLE IN JVM
                +---------------------------------------+
                |                  NEW                  |
                +---------------------------------------+
                                   | start()
                                   v
             +-------------> [ RUNNABLE ] <-------------+
             |                 /   |   \\                 |
             |       acquire  /    |    \\  sleep(t)     |
             |       lock    /     |     \\ wait(t)      |
             |              v      |      v             |
      +-------------+   +--------+ |  +---------------+ |
      |   BLOCKED   |   | WAITING| |  | TIMED_WAITING | |
      +-------------+   +--------+ |  +---------------+ |
             |              |      |          |         |
             +--------------+------+----------+---------+
                                   | run() finishes
                                   v
                        +--------------------+
                        |     TERMINATED     |
                        +--------------------+
      `,
      codeExample: `// Thread-Safe Producer-Consumer Queue using wait() and notifyAll()
import java.util.LinkedList;
import java.util.Queue;

public class BoundedBlockingQueue<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;

    public BoundedBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    // Producer method
    public synchronized void put(T item) throws InterruptedException {
        // ALWAYS check condition in while loop to prevent spurious wakeups!
        while (queue.size() == capacity) {
            wait(); // Releases intrinsic lock and sleeps
        }
        queue.add(item);
        System.out.println("Produced: " + item);
        notifyAll(); // Wakes up consumers waiting for items
    }

    // Consumer method
    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait(); // Releases lock until producer adds an item
        }
        T item = queue.poll();
        System.out.println("Consumed: " + item);
        notifyAll(); // Wakes up producers waiting for free space
        return item;
    }

    public static void main(String[] args) {
        BoundedBlockingQueue<Integer> bbw = new BoundedBlockingQueue<>(3);

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    bbw.put(i);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    bbw.take();
                    Thread.sleep(250);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });

        producer.start();
        consumer.start();
    }
}`,
      codeExplanation: 'Illustrates proper thread synchronization with intrinsic locks, guarding queue size within while loops, and coordinating producer and consumer threads using wait() and notifyAll().',
      pitfalls: [
        'Calling wait() or notify() outside of a synchronized block throws IllegalMonitorStateException at runtime.',
        'Testing wait conditions with if rather than while, leaving the thread vulnerable to spurious wakeups and corrupt state.'
      ],
      realWorldScenario: 'Enterprise message brokers like Apache Kafka and JMS queues use thread signaling and concurrent locks to manage high-throughput event processing pipelines.',
      interviewQnA: [
        {
          question: 'Why are wait(), notify(), and notifyAll() defined on Object instead of Thread?',
          answer: 'In Java, locks are attached to object headers in heap memory, not to threads. Since any object can serve as a monitor lock, methods that manage lock acquisition and waiting queues must be available on all reference types.'
        },
        {
          question: 'What is a race condition and how does synchronized prevent it?',
          answer: 'A race condition occurs when multiple threads concurrently read and write shared data, and the final outcome depends on thread scheduling order. synchronized enforces mutual exclusion so only one thread can execute the protected critical section at a time.'
        }
      ]
    },
    {
      id: 'c14-concurrency-utilities',
      title: '10. Concurrency Utilities (java.util.concurrent)',
      summary: 'ExecutorService, thread pools, Callable, Future, explicit locks with ReentrantLock, and ConcurrentHashMap.',
      tags: ['Concurrency', 'ExecutorService', 'Future', 'Callable', 'ReentrantLock', 'ConcurrentHashMap'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'Directly instantiating new Thread() for every asynchronous task is an antipattern: thread creation consumes significant memory (default 1MB stack per thread) and incurs heavy OS context-switching overhead. The java.util.concurrent package (introduced in Java 5 by Doug Lea) provides industrial concurrency utilities:',
        '1. Executor Framework & Thread Pools (ExecutorService): Decouples task submission from execution. Reuses a managed pool of worker threads. Implementations include FixedThreadPool, CachedThreadPool, and ScheduledThreadPool.',
        '2. Callable<V> vs Runnable: Unlike Runnable.run() which returns void and cannot throw checked exceptions, Callable.call() returns a parameterized value V and can throw checked exceptions.',
        '3. Future<V>: Represents the pending result of an asynchronous computation. Methods: get() (blocks until completion), isDone(), cancel().',
        '4. Explicit Locks (ReentrantLock): Provides advanced capabilities beyond synchronized: tryLock() (non-blocking lock acquisition with timeout), lockInterruptibly(), and fair lock scheduling.',
        '5. Concurrent Collections: ConcurrentHashMap utilizes lock-striping and non-blocking CAS (Compare-And-Swap) operations to allow concurrent readers without locking and fine-grained partition locking for writes.'
      ],
      keyPoints: [
        'Always shut down an ExecutorService (shutdown() / shutdownNow()) to prevent orphan worker threads from keeping the JVM alive.',
        'Future.get() is a blocking call; use timeouts (future.get(2, TimeUnit.SECONDS)) to prevent indefinite thread hangs.',
        'ReentrantLock MUST always be unlocked in a finally block (lock.lock(); try { ... } finally { lock.unlock(); }).',
        'ConcurrentHashMap never locks the entire table for reads, delivering vastly superior throughput compared to Collections.synchronizedMap.'
      ],
      architectureDiagram: `
                    EXECUTOR SERVICE WORKER POOL
  Tasks Submitted         Task Queue                Worker Threads
  +-------------+       +-------------+       +-------------------------+
  | Callable #1 | ----> | [Task Queue]| ----> | Worker Thread 1 (Busy)  |
  | Callable #2 |       |             | ----> | Worker Thread 2 (Idle)  |
  | Callable #3 |       |  FIFO Wait  | ----> | Worker Thread 3 (Busy)  |
  +-------------+       +-------------+       +-------------------------+
         |                                                 |
         v Returns                                         v Yields
  +-------------+                                   +-------------+
  |  Future<V>  | <================================ |  Result V   |
  +-------------+   (future.get() retrieves value) +-------------+
      `,
      codeExample: `// Multi-Worker Execution with ThreadPool, Callable, and ReentrantLock
import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantLock;

public class ConcurrencyUtilitiesMastery {
    private static final ReentrantLock explicitLock = new ReentrantLock();
    private static int protectedCounter = 0;

    public static void safeIncrement() {
        explicitLock.lock(); // Explicit acquisition
        try {
            protectedCounter++;
        } finally {
            explicitLock.unlock(); // Always release in finally block!
        }
    }

    public static void main(String[] args) throws Exception {
        // 1. Thread pool with 3 fixed worker threads
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 2. Submitting Callable returning a value
        Callable<String> workerTask = () -> {
            safeIncrement();
            Thread.sleep(150);
            return "Task completed by " + Thread.currentThread().getName();
        };

        Future<String> future = executor.submit(workerTask);

        // Do other concurrent work...
        System.out.println("Asynchronous task dispatched, waiting for yield...");

        // Retrieve result with 1-second timeout
        String result = future.get(1, TimeUnit.SECONDS);
        System.out.println("Result received: " + result);

        // Clean shutdown
        executor.shutdown();
        if (!executor.awaitTermination(500, TimeUnit.MILLISECONDS)) {
            executor.shutdownNow();
        }
    }
}`,
      codeExplanation: 'Demonstrates a fixed thread pool executing a Callable task, asynchronous result retrieval via Future.get() with timeouts, explicit ReentrantLock synchronization with finally cleanup, and safe executor shutdown.',
      pitfalls: [
        'Forgetting to call executor.shutdown(), which leaves background pool threads alive and prevents the JVM process from exiting.',
        'Calling Future.get() without a timeout on an external network call, causing the calling thread to block indefinitely.'
      ],
      realWorldScenario: 'Tomcat, Netty, and cloud HTTP microservices use thread pools to process tens of thousands of simultaneous HTTP requests without crashing from thread starvation.',
      interviewQnA: [
        {
          question: 'What is the advantage of ReentrantLock over the synchronized keyword?',
          answer: 'ReentrantLock provides features unavailable with synchronized: tryLock() allows attempting lock acquisition without blocking indefinitely, fair locking ensures FIFO access, and lockInterruptibly() allows interrupting a thread waiting for a lock.'
        },
        {
          question: 'How does ConcurrentHashMap achieve thread safety without locking the entire table?',
          answer: 'In Java 8, ConcurrentHashMap uses fine-grained synchronization: reads are completely lock-free using volatile reads, and writes synchronize only on the individual bucket node head using Compare-And-Swap (CAS) and localized synchronized blocks.'
        }
      ]
    },
    {
      id: 'c14-functional-interfaces',
      title: '11. Functional Interfaces & Lambda Expressions',
      summary: 'Single Abstract Method (SAM) contracts, @FunctionalInterface, core java.util.function types, and method references.',
      tags: ['Lambdas', 'Functional Interfaces', 'Predicate', 'Consumer', 'Supplier', 'Function', 'Method References'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Java 8 introduced functional programming capabilities, enabling developers to treat executable behaviors as first-class citizens. At the core is the Functional Interface:',
        '1. Functional Interface: An interface declaring EXACTLY ONE abstract method (Single Abstract Method or SAM). Marked with @FunctionalInterface to enforce this constraint at compile time. It can contain any number of default or static methods.',
        '2. Lambda Expressions: Compact syntactic shorthand for implementing SAM interfaces without verbose anonymous inner class boilerplate: (parameters) -> { body }.',
        '3. Core Built-In Functional Interfaces (java.util.function):',
        '   - Predicate<T>: Evaluates a condition. boolean test(T t). Used in filtering.',
        '   - Consumer<T>: Accepts an argument and executes side effects. void accept(T t). Used in logging, printing.',
        '   - Supplier<T>: Takes no parameters and returns a value. T get(). Used in lazy evaluation and factories.',
        '   - Function<T, R>: Transforms an argument of type T into a result of type R. R apply(T t). Used in mapping transformations.',
        '   - BiFunction<T, U, R>, BiPredicate<T, U>, UnaryOperator<T>, BinaryOperator<T>.',
        '4. Method References: Syntactic sugar for lambdas that directly call an existing method: ClassName::staticMethod, instance::methodName, ClassName::instanceMethod, or ClassName::new (constructor reference).'
      ],
      keyPoints: [
        'A functional interface must contain exactly one abstract method (SAM).',
        'Variables captured inside a lambda must be final or effectively final (never modified after initialization).',
        'Predicate<T> = boolean test(T t); Consumer<T> = void accept(T t); Supplier<T> = T get(); Function<T,R> = R apply(T t).',
        'Method references (e.g. String::toUpperCase) provide clean alternatives to verbose lambdas (s -> s.toUpperCase()).'
      ],
      architectureDiagram: `
                    CORE FUNCTIONAL INTERFACES
  +------------------+------------------+---------------------+
  |    Interface     |  Method Signature|     Primary Use     |
  +------------------+------------------+---------------------+
  | Predicate<T>     | boolean test(T)  | Filtering / Checks  |
  | Consumer<T>      | void accept(T)   | Side-effects / Sink |
  | Supplier<T>      | T get()          | Factory / Lazy Gen  |
  | Function<T, R>   | R apply(T)       | Transformation / Map|
  +------------------+------------------+---------------------+
      `,
      codeExample: `// The 4 Core Functional Interfaces and Method References
import java.util.function.*;

public class FunctionalMastery {
    public static void main(String[] args) {
        // 1. Predicate: Tests a condition
        Predicate<Integer> isAdult = age -> age >= 18;
        System.out.println("Age 21 is adult? " + isAdult.test(21));

        // 2. Consumer: Consumes data for side-effects
        Consumer<String> logger = msg -> System.out.println("[AUDIT]: " + msg);
        logger.accept("Security token generated");

        // 3. Supplier: Produces a value lazily
        Supplier<Double> randomValue = Math::random; // Method reference
        System.out.println("Supplied: " + randomValue.get());

        // 4. Function: Transforms type T -> type R
        Function<String, Integer> stringLength = String::length;
        System.out.println("Word length: " + stringLength.apply("Antigravity"));
    }
}`,
      codeExplanation: 'Demonstrates the 4 foundational functional interfaces with lambda expressions and method references (Math::random, String::length).',
      pitfalls: [
        'Attempting to reassign a local variable inside a lambda body: triggers a compile error because captured variables must be effectively final.',
        'Over-complicating lambdas with multiple statements, loops, and nested logic; extract complex logic into named private methods.'
      ],
      realWorldScenario: 'Modern Spring Boot and Java Streams rely extensively on functional interfaces for request routing, validation filters, and asynchronous reactive event pipelines.',
      interviewQnA: [
        {
          question: 'What is a Functional Interface and what role does @FunctionalInterface play?',
          answer: 'A functional interface is any interface with exactly one abstract method (SAM). The @FunctionalInterface annotation informs the compiler to enforce this rule, triggering a compilation error if more than one abstract method is declared.'
        },
        {
          question: 'Why must variables referenced in a lambda expression be final or effectively final?',
          answer: 'Java lambdas capture values, not variable references. If local variables on the stack were mutable, thread race conditions and stack frame deallocations would create synchronization and memory inconsistencies.'
        }
      ]
    },
    {
      id: 'c14-stream-api',
      title: '12. Java Stream API Pipelines',
      summary: 'Declarative data pipelines, lazy intermediate operations, eager terminal operations, reduction, and collector transformations.',
      tags: ['Streams', 'Filter', 'Map', 'Reduce', 'Collect', 'Pipelines', 'Lazy Evaluation'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'Introduced in Java 8, the Stream API (java.util.stream) allows declarative, functional-style data processing over sequences of elements. A stream is NOT a data structure—it does not store elements; it carries values from a source through a pipeline of computational operations:',
        '1. Stream Pipeline Structure: A stream pipeline consists of three phases:',
        '   - Stream Source: e.g. collection.stream(), Arrays.stream(arr), Stream.of(...).',
        '   - Intermediate Operations: Lazy transformations that return a new Stream (e.g. filter, map, flatMap, sorted, distinct, limit). They do NOT process data until a terminal operation is invoked.',
        '   - Terminal Operation: An eager operation that consumes the stream and produces a result or side effect (e.g. collect, reduce, count, forEach, findFirst). Once a terminal operation runs, the stream is closed and cannot be reused.',
        '2. Lazy Evaluation: Intermediate operations are evaluated on-demand in a single pass. For example, in filter().map().findFirst(), processing terminates as soon as the first matching element is discovered (short-circuiting), rather than filtering the entire dataset first.',
        '3. Parallel Streams: Invoking .parallelStream() leverages the ForkJoinPool.commonPool() to divide work across multiple CPU cores automatically.'
      ],
      keyPoints: [
        'Streams are lazy: intermediate operations never execute until a terminal operation is called.',
        'A stream cannot be reused once a terminal operation has run; attempting to do so throws IllegalStateException.',
        'filter(Predicate) eliminates elements; map(Function) transforms elements 1-to-1; flatMap flattens nested streams.',
        'reduce() combines elements into a single aggregate result; collect() gathers elements into a collection or map.',
        'Avoid parallel streams for small collections or I/O-bound tasks due to thread pool management overhead.'
      ],
      architectureDiagram: `
                         STREAM PIPELINE FLOW
  [Source Collection] ---> [filter (Lazy)] ---> [map (Lazy)] ---> [collect (Eager)]
      [1, 2, 3, 4]              |                    |                    |
                                v                    v                    v
                            Keep even            Double it            Gather list
                             [2, 4]               [4, 8]              List: [4, 8]
  (Execution happens in ONE single pass when the terminal operation is called!)
      `,
      codeExample: `// Stream Pipeline: Filter, Map, FlatMap, Reduce, and Grouping
import java.util.*;
import java.util.stream.Collectors;

record Transaction(String id, String category, double amount) {}

public class StreamMastery {
    public static void main(String[] args) {
        List<Transaction> transactions = List.of(
            new Transaction("TX1", "Cloud", 150.0),
            new Transaction("TX2", "Hardware", 2400.0),
            new Transaction("TX3", "Cloud", 320.0),
            new Transaction("TX4", "Travel", 450.0),
            new Transaction("TX5", "Hardware", 850.0)
        );

        // 1. Pipeline: Filter expensive transactions, extract amount, and sum via reduce
        double totalLargeTxs = transactions.stream()
            .filter(t -> t.amount() >= 300.0) // Intermediate (Lazy)
            .map(Transaction::amount)          // Intermediate (Lazy)
            .reduce(0.0, Double::sum);         // Terminal (Eager)
        System.out.println("Total large transactions: $" + totalLargeTxs);

        // 2. GroupingBy Collector: Total spending by category
        Map<String, Double> spendByCategory = transactions.stream()
            .collect(Collectors.groupingBy(
                Transaction::category,
                Collectors.summingDouble(Transaction::amount)
            ));
        System.out.println("Category Spend: " + spendByCategory);
    }
}`,
      codeExplanation: 'Shows a complete stream pipeline with filter and map operations aggregated via reduce(), along with grouping transactions by category using Collectors.groupingBy.',
      pitfalls: [
        'Attempting to operate on a stream after invoking a terminal operation throws IllegalStateException: stream has already been operated upon or closed.',
        'Using parallelStream() with stateful or non-thread-safe accumulators, producing non-deterministic results.'
      ],
      realWorldScenario: 'Big data processing frameworks, financial reporting engines, and search filters use stream pipelines to process datasets declaratively with minimal memory footprint.',
      interviewQnA: [
        {
          question: 'What is the difference between intermediate and terminal operations in the Stream API?',
          answer: 'Intermediate operations return a new Stream and are lazily evaluated (they do no work until a terminal operation is called). Terminal operations trigger the execution of the pipeline, traverse the elements, and produce a non-stream result or side effect.'
        },
        {
          question: 'What is the difference between map() and flatMap()?',
          answer: 'map() takes a Function<T, R> and maps each element to exactly one element. flatMap() takes a Function<T, Stream<R>> and flattens nested streams (e.g. Stream<List<String>>) into a single un-nested Stream<String>.'
        }
      ]
    },
    {
      id: 'c14-jdbc',
      title: '13. Java Database Connectivity (JDBC)',
      summary: 'Connecting to relational databases, Connection, PreparedStatement, SQL injection prevention, and ResultSet iteration.',
      tags: ['JDBC', 'PreparedStatement', 'SQL Injection', 'Connection', 'ResultSet', 'Transactions'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Java Database Connectivity (JDBC) is the core Java API specification (java.sql) for connecting and executing queries against relational databases (PostgreSQL, MySQL, Oracle):',
        '1. Architecture & Components:',
        '   - Driver & DriverManager: Loads the vendor-specific database driver and creates database connection sessions via JDBC URLs (e.g. jdbc:postgresql://localhost:5432/mydb).',
        '   - Connection: Represents the active physical network session with the database. Manages transactions (commit, rollback, setAutoCommit).',
        '   - Statement: Executes raw static SQL strings. Highly vulnerable to SQL Injection attacks if string concatenation is used.',
        '   - PreparedStatement: Precompiles the SQL query template on the database server. Parameters are substituted safely via typed placeholders (?). Prevents SQL injection and allows cached execution plans.',
        '   - ResultSet: A cursor pointing to the current row of data returned by a query. Provides typed accessors (getString, getInt, getDouble) to read column values.',
        '2. Transaction Management: By default, JDBC connections operate in auto-commit mode (every statement commits immediately). Enterprise workflows disable this (conn.setAutoCommit(false)) to group multiple operations into an atomic unit, rolling back on error.'
      ],
      keyPoints: [
        'ALWAYS use PreparedStatement instead of Statement for queries with user parameters to eliminate SQL injection.',
        'PreparedStatement precompiles the query on the database engine, improving performance for repeated executions.',
        'ResultSet cursors start BEFORE the first row; you must call rs.next() before accessing column values.',
        'Always close Connection, Statement, and ResultSet in reverse order of opening using try-with-resources.',
        'Disable auto-commit (setAutoCommit(false)) to manage atomic multi-step transactions with commit() and rollback().'
      ],
      architectureDiagram: `
                           JDBC ARCHITECTURE
  +-------------+       +-------------------+       +--------------------+
  | Application | ----> |   DriverManager   | ----> | PostgreSQL Driver  |
  +-------------+       +-------------------+       +--------------------+
         |                                                     |
         v                                                     v
  [PreparedStatement] =================================> [Database Engine]
   "SELECT * FROM users WHERE id = ?" (Precompiled)
         |
         v Cursor
  [  ResultSet  ] (rs.next() -> reads rows from network buffer)
      `,
      codeExample: `// Secure PreparedStatement Execution and Transaction Management
import java.sql.*;

public class JdbcMastery {
    private static final String DB_URL = "jdbc:postgresql://localhost:5432/app_db";
    private static final String USER = "postgres";
    private static final String PASS = "secret";

    public static void transferFunds(int fromAccount, int toAccount, double amount) {
        String debitSql = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        String creditSql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";

        // Try-with-resources manages connection lifecycle cleanly
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            // 1. Begin atomic transaction
            conn.setAutoCommit(false);

            try (PreparedStatement debitStmt = conn.prepareStatement(debitSql);
                 PreparedStatement creditStmt = conn.prepareStatement(creditSql)) {
                
                // Debit from sender (Parameterized to prevent SQL injection)
                debitStmt.setDouble(1, amount);
                debitStmt.setInt(2, fromAccount);
                debitStmt.executeUpdate();

                // Credit to receiver
                creditStmt.setDouble(1, amount);
                creditStmt.setInt(2, toAccount);
                creditStmt.executeUpdate();

                // Commit transaction atomically
                conn.commit();
                System.out.println("Funds transferred successfully: $" + amount);
            } catch (SQLException e) {
                conn.rollback(); // Revert changes on failure
                System.err.println("Transaction rolled back: " + e.getMessage());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}`,
      codeExplanation: 'Demonstrates secure parameterized PreparedStatement execution, preventing SQL injection, disabling auto-commit, and rolling back transactions on failure.',
      pitfalls: [
        'Concatenating user input into SQL strings: "SELECT * FROM users WHERE user = \'" + input + "\'" - allows catastrophic SQL injection attacks.',
        'Failing to close database connections: causes connection pool exhaustion, leading to application hangs.'
      ],
      realWorldScenario: 'Production ORMs (Hibernate, MyBatis) and connection pools (HikariCP) wrap standard JDBC drivers to provide connection pooling and object-relational mapping.',
      interviewQnA: [
        {
          question: 'How does PreparedStatement prevent SQL injection attacks?',
          answer: 'PreparedStatement compiles the SQL query structure into an execution plan on the database server BEFORE parameter values are bound. User inputs are sent separately as raw data values, preventing them from altering the query structure.'
        },
        {
          question: 'What is connection pooling and why is it necessary in enterprise JDBC applications?',
          answer: 'Establishing a physical database connection requires TCP handshakes, authentication, and resource allocation. A connection pool (like HikariCP) pre-allocates a pool of open connections, loaning them to threads and reusing them to minimize latency.'
        }
      ]
    },
    {
      id: 'c14-networking-sockets',
      title: '14. Java Networking (Sockets & TCP/IP Communication)',
      summary: 'Client-server architecture, ServerSocket connection acceptance, full-duplex TCP streams, and multi-client threading.',
      tags: ['Networking', 'Sockets', 'ServerSocket', 'TCP/IP', 'Client-Server'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'Java provides networking primitives in java.net to build distributed client-server applications over the TCP/IP stack. Key concepts include:',
        '1. TCP Sockets: Transmission Control Protocol (TCP) provides reliable, ordered, and error-checked byte-stream delivery between two network endpoints:',
        '   - ServerSocket: Binds to a specific port on the host machine and listens for incoming connection requests. The serverSocket.accept() method blocks until a client connects, returning a new Socket dedicated to that client session.',
        '   - Socket: Represents the client-side communication endpoint. Connects to the server IP and port.',
        '2. Full-Duplex Stream Communication: Once connected, each Socket provides two streams: socket.getInputStream() for receiving data and socket.getOutputStream() for sending data.',
        '3. Concurrency in Network Servers: Because accept() and read() are blocking operations, a single-threaded server can only handle one client at a time. Production servers dispatch each accepted Socket connection to a worker thread from an ExecutorService pool to handle multiple concurrent clients.'
      ],
      keyPoints: [
        'ServerSocket.accept() blocks until an incoming client TCP connection is established.',
        'Every accepted socket provides independent InputStream and OutputStream pipes for full-duplex data transfer.',
        'Always run client socket handlers in separate threads (or use NIO non-blocking selectors) to support multiple simultaneous clients.',
        'Always flush network output streams (writer.flush()) to ensure buffered packets are transmitted over the network immediately.'
      ],
      architectureDiagram: `
                     TCP SOCKET CLIENT-SERVER ARCHITECTURE
     [Client Socket]                                [Server Host]
     new Socket("host", 8080)                     ServerSocket(8080)
            |                                             |
            | === 3-Way TCP Handshake ===>                |
            |                                      server.accept()
            |                                             |
            |                                 Spawns new Socket session
            |                                             |
            +------------ Full Duplex Stream -------------+
              OutputStream ----> (Network) ----> InputStream
              InputStream  <---- (Network) <---- OutputStream
      `,
      codeExample: `// Multi-Threaded TCP Echo Server
import java.io.*;
import java.net.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class NetworkServerMastery {
    private static final int PORT = 8080;

    public static void main(String[] args) {
        ExecutorService clientPool = Executors.newFixedThreadPool(10);

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server listening on port: " + PORT);

            while (!serverSocket.isClosed()) {
                // Blocks until a client connects
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket.getRemoteSocketAddress());

                // Dispatch client to worker thread
                clientPool.submit(() -> handleClient(clientSocket));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void handleClient(Socket socket) {
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true) // Auto-flush enabled
        ) {
            String message;
            while ((message = in.readLine()) != null) {
                if ("QUIT".equalsIgnoreCase(message)) break;
                out.println("ECHO: " + message);
            }
        } catch (IOException e) {
            System.err.println("Client handler error: " + e.getMessage());
        } finally {
            try { socket.close(); } catch (IOException ignored) {}
        }
    }
}`,
      codeExplanation: 'Demonstrates a multi-threaded TCP server using ServerSocket, accept() blocking, thread-pool dispatch for each connection, and streaming text I/O with auto-flushing.',
      pitfalls: [
        'Handling client I/O on the main server accept loop: blocks all subsequent incoming client connections while serving the current client.',
        'Forgetting to flush network buffers: data remains sitting in local memory rather than being sent over the network.'
      ],
      realWorldScenario: 'Underlying web servers (like Tomcat and Jetty), Redis client connectors (Jedis), and microservice RPC protocols (gRPC) communicate over TCP socket streams.',
      interviewQnA: [
        {
          question: 'What is the role of ServerSocket vs Socket in Java networking?',
          answer: 'ServerSocket runs on the server, binds to a local port, and listens for incoming connections via the blocking accept() method. Once a connection is accepted, it returns a standard Socket object representing the bidirectional connection pipe to that client.'
        },
        {
          question: 'What happens if a client closes its socket unexpectedly while the server is reading?',
          answer: 'The server\'s BufferedReader.readLine() returns null, indicating End-Of-File (EOF). If the server attempts to write to a closed client socket, the operating system raises an IOException (Broken pipe).'
        }
      ]
    },
    {
      id: 'c14-gui-programming',
      title: '15. Java GUI Programming (Swing & JavaFX Architecture)',
      summary: 'The Event Dispatch Thread (EDT), SwingUtilities.invokeLater, event listeners, and JavaFX Scene Graph hierarchy.',
      tags: ['GUI', 'Swing', 'JavaFX', 'EDT', 'Event Handling', 'Scene Graph'],
      complexity: 'Intermediate',
      deepDiveNotes: [
        'Java provides two primary toolkits for developing desktop graphical user interfaces: Swing and JavaFX:',
        '1. Java Swing & The Event Dispatch Thread (EDT):',
        '   - Swing components (JFrame, JButton, JPanel) are NOT thread-safe.',
        '   - All UI rendering and event processing occurs exclusively on a single dedicated background thread called the Event Dispatch Thread (EDT).',
        '   - The Golden Rule of Swing: Any code that creates, reads, or modifies Swing components MUST execute on the EDT via SwingUtilities.invokeLater(Runnable). Long-running background operations (e.g. database queries, network requests) must run on worker threads (e.g. SwingWorker) to avoid freezing the UI.',
        '2. JavaFX & The Scene Graph:',
        '   - The modern successor to Swing, JavaFX utilizes a hierarchical tree structure called the Scene Graph.',
        '   - Hierarchy: Stage (the primary window) contains a Scene (the canvas container), which contains a tree of Nodes (layouts, buttons, shapes, text).',
        '   - Supports declarative FXML layout files and CSS styling, separating UI design from controller logic.'
      ],
      keyPoints: [
        'Swing is single-threaded; all UI component updates MUST occur on the Event Dispatch Thread (EDT).',
        'Never run long-running or blocking tasks on the EDT; this freezes UI rendering and event handling.',
        'Use SwingUtilities.invokeLater(Runnable) to safely queue GUI updates to the EDT from external threads.',
        'JavaFX organizes components into a hierarchical Scene Graph: Stage -> Scene -> Root Node -> Child Nodes.'
      ],
      architectureDiagram: `
                           SWING & EDT ARCHITECTURE
  [User Action: Click] ----> [OS Event Queue] ----> [Event Dispatch Thread (EDT)]
                                                            |
                                               Executes ActionListener
                                                            |
                                             +--------------+--------------+
                                             |                             |
                                       [Fast UI Update]           [Long Task: DB / Net]
                                      (Valid on EDT!)            (FREEZES UI IF ON EDT!)
                                                                           |
                                                                           v
                                                                 Use SwingWorker / Thread!
      `,
      codeExample: `// Thread-Safe Swing GUI Initialization
import javax.swing.*;
import java.awt.*;

public class GuiMastery {
    public static void main(String[] args) {
        // Enforce execution on the Event Dispatch Thread (EDT)
        SwingUtilities.invokeLater(() -> createAndShowGUI());
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("Advanced Java GUI Console");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 250);
        frame.setLayout(new BorderLayout(10, 10));

        JLabel statusLabel = new JLabel("Status: Ready", SwingConstants.CENTER);
        JButton triggerButton = new JButton("Run Background Computation");

        // Event Listener decoupled via Lambda
        triggerButton.addActionListener(e -> {
            statusLabel.setText("Computing in background thread...");
            triggerButton.setEnabled(false);

            // Execute long-running work on a worker thread to keep EDT responsive
            new Thread(() -> {
                try {
                    Thread.sleep(1500); // Simulate network or DB delay
                } catch (InterruptedException ignored) {}

                // Send UI update back to the EDT
                SwingUtilities.invokeLater(() -> {
                    statusLabel.setText("Computation Complete: Result 42");
                    triggerButton.setEnabled(true);
                });
            }).start();
        });

        frame.add(statusLabel, BorderLayout.CENTER);
        frame.add(triggerButton, BorderLayout.SOUTH);
        frame.setLocationRelativeTo(null); // Center on screen
        frame.setVisible(true);
    }
}`,
      codeExplanation: 'Illustrates the Swing thread safety model: boots the GUI safely via SwingUtilities.invokeLater, handles button clicks, offloads long-running tasks to a background thread, and safely updates the UI on the EDT.',
      pitfalls: [
        'Executing heavy I/O, database queries, or thread sleeps on the EDT: causes the desktop window to display "Not Responding" and freeze.',
        'Updating Swing components from arbitrary background threads without using SwingUtilities.invokeLater.'
      ],
      realWorldScenario: 'IDE developer tools (such as IntelliJ IDEA and Eclipse) are built on Java desktop UI frameworks, using worker threads and EDT scheduling to provide responsive code editors.',
      interviewQnA: [
        {
          question: 'What is the Event Dispatch Thread (EDT) and why is it important in Swing?',
          answer: 'The EDT is the single thread responsible for handling all GUI events (mouse clicks, keystrokes) and rendering components in Swing. Because Swing components are not thread-safe, modifying them from multiple threads causes race conditions and UI corruption.'
        },
        {
          question: 'How does JavaFX improve upon the architecture of Swing?',
          answer: 'JavaFX introduces a unified Scene Graph architecture, hardware-accelerated rendering via Prism, declarative UI definitions using FXML, separation of presentation using CSS, and built-in property binding and animations.'
        }
      ]
    },
    {
      id: 'c14-design-patterns',
      title: '16. Software Design Patterns in Java (GoF & Enterprise)',
      summary: 'Creational, Structural, and Behavioral design patterns: Singleton, Factory, Observer, and Model-View-Controller (MVC).',
      tags: ['Design Patterns', 'Singleton', 'Factory', 'Observer', 'MVC', 'Architecture'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'Design patterns are proven, reusable solutions to recurring software architectural problems. Key patterns in Java enterprise development include:',
        '1. Singleton Pattern (Creational): Ensures a class has only one instance and provides a global access point to it. The thread-safe Double-Checked Locking implementation utilizes volatile memory ordering to prevent instruction reordering bugs during instantiation.',
        '2. Factory Pattern (Creational): Defines an interface or method for creating objects, letting subclasses or factory methods decide which concrete class to instantiate. Decouples client code from concrete implementations.',
        '3. Observer Pattern (Behavioral): Defines a one-to-many dependency where when one subject object changes state, all registered observers are automatically notified and updated. Forms the backbone of event listeners and reactive frameworks.',
        '4. Model-View-Controller (MVC Architectural Pattern): Divides application responsibilities into three decoupled layers: Model (data state and business logic), View (UI rendering), and Controller (handles user input and coordinates updates).'
      ],
      keyPoints: [
        'Singleton with Double-Checked Locking requires the instance field to be declared volatile to prevent instruction reordering.',
        'Factory methods eliminate direct "new ConcreteClass()" invocations, promoting loose coupling.',
        'Observer pattern establishes decoupled publish-subscribe relationships between subjects and listeners.',
        'MVC separates business logic (Model) from presentation (View) and coordination (Controller).'
      ],
      architectureDiagram: `
                     DOUBLE-CHECKED LOCKING SINGLETON
     Thread A & B enter getInstance()
            |
            v
     [instance == null?] (1st check without lock)
            | YES
            v
     synchronized (Singleton.class)
            |
            v
     [instance == null?] (2nd check WITH lock)
            | YES
            v
     instance = new Singleton(); (volatile prevents reordering!)
      `,
      codeExample: `// Thread-Safe Singleton & Observer Pattern Implementations
import java.util.ArrayList;
import java.util.List;

// 1. Thread-Safe Double-Checked Locking Singleton
class ConfigurationManager {
    // volatile guarantees memory visibility across threads
    private static volatile ConfigurationManager instance;
    private String environment = "Production";

    private ConfigurationManager() {} // Private constructor prevents new

    public static ConfigurationManager getInstance() {
        if (instance == null) { // First check (no lock)
            synchronized (ConfigurationManager.class) {
                if (instance == null) { // Second check (with lock)
                    instance = new ConfigurationManager();
                }
            }
        }
        return instance;
    }

    public String getEnvironment() { return environment; }
}

// 2. Observer Pattern: Subject & Listener
interface OrderObserver {
    void onOrderPlaced(String orderId);
}

class OrderSubject {
    private final List<OrderObserver> observers = new ArrayList<>();

    public void attach(OrderObserver observer) {
        observers.add(observer);
    }

    public void placeOrder(String orderId) {
        System.out.println("Order [" + orderId + "] successfully created.");
        // Notify all registered observers
        for (OrderObserver obs : observers) {
            obs.onOrderPlaced(orderId);
        }
    }
}`,
      codeExplanation: 'Demonstrates thread-safe Singleton using double-checked locking with volatile memory visibility, along with a clean publish-subscribe Observer pattern.',
      pitfalls: [
        'Omitting the volatile keyword in Double-Checked Locking: the JVM may reorder object construction instructions, exposing a partially initialized instance to another thread.',
        'Overusing Singletons to store global state, which creates hidden dependencies and makes unit testing difficult.'
      ],
      realWorldScenario: 'Spring Framework\'s ApplicationContext is a Singleton container, and Spring Bean creation uses the Factory pattern to instantiate and inject application dependencies.',
      interviewQnA: [
        {
          question: 'Why is the volatile keyword mandatory in Double-Checked Locking for Singletons?',
          answer: 'Without volatile, the JVM JIT compiler or CPU can reorder instructions during object creation: allocating memory, assigning the reference to the instance variable, and then invoking the constructor. A second thread could see the instance as non-null and use it before constructor initialization finishes.'
        },
        {
          question: 'What is the difference between the Factory Method pattern and the Abstract Factory pattern?',
          answer: 'Factory Method uses inheritance and relies on a method to create a single product. Abstract Factory uses composition to provide an interface for creating entire families of related or dependent objects without specifying their concrete classes.'
        }
      ]
    },
    {
      id: 'c14-memory-management',
      title: '17. Java Memory Management & Garbage Collection',
      summary: 'Stack vs Heap memory, JVM memory regions, GC roots, Generational Garbage Collection, and memory leak patterns.',
      tags: ['JVM', 'Memory Management', 'Stack vs Heap', 'Garbage Collection', 'GC Roots', 'Memory Leaks'],
      complexity: 'Advanced',
      deepDiveNotes: [
        'The Java Virtual Machine (JVM) automates memory allocation and deallocation, freeing developers from manual pointer arithmetic (free/malloc):',
        '1. Stack Memory (Thread-Private):',
        '   - Allocated per thread. Stores stack frames containing local primitive variables, execution operands, and reference pointers to objects.',
        '   - Allocation and deallocation occur automatically as methods are called and returned in LIFO order.',
        '   - Fixed size: deep or infinite recursion causes java.lang.StackOverflowError.',
        '2. Heap Memory (Global Shared Space):',
        '   - Shared across all threads in the JVM. Stores all object instances and their instance variables.',
        '   - Sized via -Xms (initial heap) and -Xmx (maximum heap). Exceeding available heap causes java.lang.OutOfMemoryError: Java heap space.',
        '3. Generational Garbage Collection Hypothesis: Most objects die young. The heap is divided into:',
        '   - Young Generation: Eden space and two Survivor spaces (S0, S1). Minor GC collects short-lived objects quickly.',
        '   - Old (Tenured) Generation: Objects surviving multiple GC cycles are promoted here. Major/Full GC cleans this region.',
        '   - Metaspace (Native memory): Stores class metadata, bytecode, and method structures (replaced PermGen in Java 8).',
        '4. Reachability & GC Roots: An object is eligible for garbage collection when it can no longer be reached by a chain of references starting from a GC Root (active thread stacks, static fields, JNI references).'
      ],
      keyPoints: [
        'Stack memory stores thread-local execution frames and primitives; Heap memory stores all objects.',
        'Objects become eligible for GC when they are no longer reachable from any GC Root.',
        'Memory leaks in Java occur when unused objects remain referenced by long-lived collections, static fields, or unclosed listeners.',
        'System.gc() is only a suggestion to the JVM; the garbage collector is never guaranteed to run immediately.'
      ],
      architectureDiagram: `
                           JVM MEMORY ARCHITECTURE
    [Thread 1 Stack]     [Thread 2 Stack]              [Global Shared Heap]
    +--------------+     +--------------+     +-----------------------------------+
    | Frame: foo() |     | Frame: bar() |     | [Eden Space] -> [Survivor S0/S1]  |
    | - local ints |     | - local ints |     | (Young Generation / Minor GC)     |
    | - Object ref |     | - Object ref |     +-----------------------------------+
    +-------|------+     +-------|------+     | [Tenured / Old Generation]        |
            |                    |            | (Long-lived objects / Major GC)   |
            +--------------------+            +-----------------------------------+
                     |                                         |
                     v Pointers                                v
    +-----------------------------------------------------------------------------+
    | [Metaspace (Native Memory)]: Class Metadata, Method Bytecode, Static Vars   |
    +-----------------------------------------------------------------------------+
      `,
      codeExample: `// Stack vs Heap Execution Model and Common Memory Leak Pattern
import java.util.ArrayList;
import java.util.List;

public class MemoryManagementMastery {
    // ANTI-PATTERN: Static collection creates an accidental Memory Leak!
    // Objects added here stay referenced by a GC Root for the life of the JVM
    private static final List<byte[]> memoryLeakList = new ArrayList<>();

    public static void demonstrateAllocation() {
        int localPrimitive = 42; // Allocated on the THREAD STACK frame

        // 'objRef' pointer is stored on the STACK
        // The actual String instance is allocated on the shared HEAP
        String objRef = new String("Allocated on Heap");

        System.out.println("Stack primitive: " + localPrimitive + ", Heap object: " + objRef);
    } // When method returns, 'localPrimitive' and 'objRef' are popped off the Stack!

    public static void simulateLeak() {
        for (int i = 0; i < 5; i++) {
            // Allocates 1MB byte array and attaches it to static root
            memoryLeakList.add(new byte[1024 * 1024]);
        }
        System.out.println("Allocated 5MB retained by static GC Root.");
    }

    public static void main(String[] args) {
        demonstrateAllocation();
        simulateLeak();
        memoryLeakList.clear(); // Removing reference makes byte arrays eligible for GC!
    }
}`,
      codeExplanation: 'Contrasts stack variable deallocation upon method return with heap objects, and shows how static collections can cause memory leaks by maintaining unintended references to GC roots.',
      pitfalls: [
        'Unbounded static caches: holding object references in static fields prevents garbage collection, eventually causing OutOfMemoryError.',
        'Failing to remove event listeners: registered observers remain referenced by the subject, preventing memory recovery (the "lapsed listener" problem).'
      ],
      realWorldScenario: 'High-frequency trading and ultra-low-latency financial systems tune JVM garbage collection flags (-XX:+UseZGC or Shenandoah) to achieve sub-millisecond GC pause times.',
      interviewQnA: [
        {
          question: 'What is a GC Root in Java and what types of references qualify as GC Roots?',
          answer: 'A GC Root is an anchor point from which the garbage collector begins reachability tracing. Objects reachable from a GC Root cannot be collected. Types include: local variables in active thread stack frames, static variables of loaded classes, active Thread objects, and JNI global/local references.'
        },
        {
          question: 'Can a memory leak occur in a garbage-collected language like Java?',
          answer: 'Yes. A memory leak in Java occurs when an application maintains references to objects that are no longer needed. Because an active reference path from a GC Root still exists, the garbage collector cannot reclaim that memory, eventually causing OutOfMemoryError.'
        }
      ]
    }
  ]
};
