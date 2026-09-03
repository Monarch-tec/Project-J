import { Question } from '../../types';

export const advancedConceptsQuestions: Question[] = [
  // 1. OOP & Inheritance Types
  {
    id: 1001,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Fundamental',
    question: 'What will be the exact console output of the following Java program demonstrating runtime polymorphism (dynamic method dispatch)?',
    codeSnippet: `class Animal {
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
        Animal a = new Dog();
        a.sound();
    }
}`,
    options: [
      'Dog barks',
      'Animal makes a sound',
      'Compilation Error: Cannot assign Dog to Animal reference',
      'Animal makes a sound followed by Dog barks'
    ],
    correctAnswer: 0,
    explanation: 'Output is "Dog barks". Even though reference variable `a` is of type `Animal`, the actual object in heap memory at runtime is `Dog`. Dynamic method dispatch (runtime polymorphism) invokes the overridden version in `Dog`.',
    tags: ['Polymorphism', 'Method Overriding', 'Dynamic Dispatch', 'OOP']
  },
  {
    id: 1002,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which type of inheritance occurs when class B inherits from class A, and class C inherits from class B in a continuous chain?',
    options: [
      'Multilevel Inheritance',
      'Hierarchical Inheritance',
      'Single Inheritance',
      'Hybrid Inheritance'
    ],
    correctAnswer: 0,
    explanation: 'Multilevel Inheritance refers to a chain of inheritance where a derived class inherits from another derived class (e.g. Class C extends Class B, and Class B extends Class A). In Hierarchical Inheritance, multiple child classes extend a single parent class directly.',
    tags: ['Inheritance', 'Multilevel Inheritance', 'OOP']
  },
  {
    id: 1003,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'How does Java support multiple inheritance without causing the ambiguity of the "Diamond Problem"?',
    options: [
      'By allowing a class to extend multiple abstract classes with the "extends" keyword',
      'By allowing a class to implement multiple interfaces with the "implements" keyword',
      'Through operator overloading in subclasses',
      'By using virtual inheritance pointers in the JVM'
    ],
    correctAnswer: 1,
    explanation: 'Java disallows multiple class inheritance (a class can only extend one class), avoiding state collision and the Diamond Problem. However, a class can implement multiple interfaces (e.g., `class C implements A, B`), inheriting behavioral contracts.',
    tags: ['Interfaces', 'Multiple Inheritance', 'Diamond Problem']
  },
  {
    id: 1004,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: Method overloading is an example of compile-time (static) polymorphism, while method overriding is an example of runtime (dynamic) polymorphism.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'TRUE: Method overloading is resolved by the compiler at compile time based on parameter signatures (static binding). Method overriding is resolved by the JVM at runtime based on the actual object instance (dynamic binding).',
    tags: ['Polymorphism', 'Overloading', 'Overriding']
  },
  {
    id: 1005,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following are valid statements regarding Abstract Classes and Interfaces in Java? (Select ALL that apply)',
    options: [
      'An abstract class can declare instance variables (state) and constructors.',
      'An interface can declare default and static methods with concrete bodies (Java 8+).',
      'An abstract class cannot be directly instantiated using the "new" keyword.',
      'A class can extend multiple abstract classes simultaneously.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'Abstract classes can hold instance variables, constructors, and concrete state. Interfaces (Java 8+) support default, static, and private methods. Abstract classes cannot be instantiated with new. Option D is false because Java only permits single class inheritance.',
    tags: ['Abstract Classes', 'Interfaces', 'OOP']
  },

  // 2. Exception Handling
  {
    id: 1006,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the key difference between the "throw" and "throws" keywords in Java exception handling?',
    options: [
      '"throw" explicitly instantiates and triggers an exception inside method code; "throws" declares that a method may pass a checked exception up to its caller in the method signature.',
      '"throws" is used inside try blocks; "throw" is used only in catch blocks.',
      '"throw" is used for checked exceptions; "throws" is used only for unchecked exceptions.',
      '"throw" terminates the JVM; "throws" logs a warning.'
    ],
    correctAnswer: 0,
    explanation: '`throw` is an imperative statement used to throw an explicit exception object (`throw new MyException("Error");`). `throws` is part of a method signature declaring that callers must handle or propagate specified checked exceptions (`public void readFile() throws IOException`).',
    tags: ['Exceptions', 'throw', 'throws']
  },
  {
    id: 1007,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'When creating a custom Checked exception in Java, which class should your custom exception class directly extend?',
    options: [
      'java.lang.Exception (excluding java.lang.RuntimeException)',
      'java.lang.RuntimeException',
      'java.lang.Error',
      'java.lang.Throwable directly'
    ],
    correctAnswer: 0,
    explanation: 'To create a custom Checked exception, extend `java.lang.Exception`. If you want a custom Unchecked exception, extend `java.lang.RuntimeException`. Applications should never extend `Error`.',
    tags: ['Custom Exceptions', 'Checked Exceptions']
  },
  {
    id: 1008,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    question: 'Under what specific condition will a "finally" block in a try-catch-finally construct NOT execute in Java?',
    options: [
      'When an uncaught RuntimeException occurs in the catch block',
      'When the try block contains an explicit "return" statement',
      'When System.exit(0) is invoked before or inside the try/catch block',
      'When an OutOfMemoryError is thrown'
    ],
    correctAnswer: 2,
    explanation: 'The finally block always executes—even if a return statement is executed inside try or catch. The only exceptions are if the JVM crashes, the host thread is killed abruptly, or `System.exit(...)` halts the JVM.',
    tags: ['finally', 'Exceptions', 'JVM']
  },

  // 3. Java Collections Framework & Iterators
  {
    id: 1009,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following descriptions accurately characterize the specified collection implementations? (Select ALL that apply)',
    options: [
      'HashSet: Stores unique elements with no guaranteed iteration order, backed by a HashMap.',
      'TreeSet: Stores unique elements in sorted order (natural or Comparator), backed by a Red-Black tree with O(log n) operations.',
      'HashMap: Allows one null key and multiple null values with O(1) average lookup time.',
      'TreeMap: Orders key-value pairs by key in sorted order with O(log n) get/put operations.'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four statements are correct definitions. HashSet and HashMap offer O(1) average time without ordering; TreeSet and TreeMap maintain elements in sorted tree order using Red-Black trees with O(log n) time complexity.',
    tags: ['Collections', 'HashSet', 'TreeSet', 'HashMap', 'TreeMap']
  },
  {
    id: 1010,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the proper way to safely remove elements from an ArrayList while iterating through it to avoid a ConcurrentModificationException?',
    options: [
      'Using list.remove(item) inside an enhanced for-each loop',
      'Using iterator.remove() while traversing with an explicit Iterator instance',
      'Using list.clear() inside a while loop',
      'Iterating backwards with a standard for loop without index bounds checks'
    ],
    correctAnswer: 1,
    explanation: '`iterator.remove()` is specifically designed to modify the underlying collection and synchronize the internal `expectedModCount` with `modCount`, preventing `ConcurrentModificationException`.',
    tags: ['Iterator', 'Fail-Fast', 'ConcurrentModificationException']
  },

  // 4. Generics & Type Safety
  {
    id: 1011,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the primary purpose of Java Generics and the concept of Type Erasure?',
    options: [
      'To provide compile-time type checking and eliminate explicit casting, while the compiler erases type parameters to Object or bounds in bytecode for backward compatibility.',
      'To enable multiple inheritance of primitive data types at runtime.',
      'To dynamically allocate extra memory for generic objects at runtime.',
      'To allow arrays of generic types to be instantiated directly with new T[10].'
    ],
    correctAnswer: 0,
    explanation: 'Generics enforce compile-time type safety, catching type mismatches before runtime. Java achieves this via "Type Erasure", replacing type parameters with their bound (or `Object`) in bytecode to remain compatible with pre-Java 5 JVMs.',
    tags: ['Generics', 'Type Erasure', 'Type Safety']
  },

  // 5. File Handling & I/O / Serialization
  {
    id: 1012,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Why is BufferedReader preferred over raw FileReader when reading large text files in Java?',
    options: [
      'BufferedReader reads from disk block-by-block into an in-memory buffer (default 8KB), drastically reducing disk I/O system calls and providing readLine().',
      'FileReader cannot read UTF-8 characters.',
      'BufferedReader automatically encrypts the file content.',
      'FileReader throws an unchecked exception if the file contains spaces.'
    ],
    correctAnswer: 0,
    explanation: '`FileReader` reads character-by-character, invoking an expensive native I/O syscall on every read. `BufferedReader` buffers chunks into an in-memory buffer, providing high throughput and convenient `readLine()` functionality.',
    tags: ['File I/O', 'BufferedReader', 'FileReader']
  },
  {
    id: 1013,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following are REQUIRED or standard practices when serializing a Java object to a byte stream? (Select ALL that apply)',
    options: [
      'The class must implement the marker interface java.io.Serializable.',
      'Fields marked with the "transient" modifier are skipped and NOT saved into the byte stream.',
      'Declaring a private static final long serialVersionUID is recommended to ensure version compatibility during deserialization.',
      'ObjectOutputStream is used to write the object state into an OutputStream.'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All statements are valid. Serialization requires `implements Serializable`. Fields marked `transient` are omitted. `serialVersionUID` prevents `InvalidClassException` across versions, and `ObjectOutputStream.writeObject()` writes the object graph.',
    tags: ['Serialization', 'transient', 'serialVersionUID', 'IO']
  },

  // 6. Multithreading & Concurrency Utilities
  {
    id: 1014,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Why is implementing the Runnable functional interface generally preferred over extending the Thread class in Java multithreading?',
    options: [
      'Java does not support multiple class inheritance; implementing Runnable keeps the class free to extend other classes and decouples the task from thread execution.',
      'Runnable threads execute twice as fast as Thread subclasses in the JVM.',
      'Extending Thread does not allow the run() method to be overridden.',
      'Runnable can only be used with single-threaded applications.'
    ],
    correctAnswer: 0,
    explanation: 'Because Java only allows single class inheritance, extending `Thread` prevents extending any other class. Implementing `Runnable` separates task logic from the execution mechanism and enables submission to `ExecutorService` thread pools.',
    tags: ['Multithreading', 'Runnable', 'Thread', 'Concurrency']
  },
  {
    id: 1015,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following concurrency utilities belong to the java.util.concurrent framework? (Select ALL that apply)',
    options: [
      'ExecutorService: Manages a pool of worker threads and queues tasks.',
      'Future: Represents the result of an asynchronous computation with get() and isDone().',
      'ReentrantLock: An explicit mutual exclusion lock providing fair-ordering policies and tryLock().',
      'ConcurrentHashMap: A highly scalable, lock-striped / CAS-based thread-safe Map.'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four components are fundamental pillars of `java.util.concurrent`. `ExecutorService` manages worker threads, `Future<V>` tracks async results, `ReentrantLock` allows explicit locking, and `ConcurrentHashMap` provides lock-free and segment-locked reads and writes.',
    tags: ['ExecutorService', 'Future', 'Locks', 'Concurrent Collections']
  },
  {
    id: 1016,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which method on an Object monitor must be called by a thread to release its lock and enter the waiting state until another thread signals it?',
    options: [
      'object.wait()',
      'object.notify()',
      'Thread.sleep()',
      'Thread.yield()'
    ],
    correctAnswer: 0,
    explanation: '`wait()` releases the monitor lock on the object and suspends the calling thread until another thread calls `notify()` or `notifyAll()` on that same monitor. `Thread.sleep()` pauses execution but DOES NOT release the acquired lock.',
    tags: ['Thread Communication', 'wait', 'notify', 'Synchronization']
  },

  // 7. Functional Interfaces & Lambdas
  {
    id: 1017,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Match the functional interface to its correct Single Abstract Method (SAM) signature in java.util.function:',
    options: [
      'Predicate<T>: boolean test(T t) | Function<T, R>: R apply(T t) | Consumer<T>: void accept(T t) | Supplier<T>: T get()',
      'Predicate<T>: void test(T t) | Function<T, R>: boolean apply(T t) | Consumer<T>: T accept() | Supplier<T>: void get(T t)',
      'Predicate<T>: T test() | Function<T, R>: R apply() | Consumer<T>: void accept(T t, R r) | Supplier<T>: T get(int x)',
      'Predicate<T>: boolean test(T t, T t2) | Function<T, R>: T apply(R r) | Consumer<T>: R accept(T t) | Supplier<T>: boolean get()'
    ],
    correctAnswer: 0,
    explanation: 'Predicate takes T and returns boolean (`test`). Function takes T and returns R (`apply`). Consumer takes T and returns void (`accept`). Supplier takes no argument and returns T (`get`).',
    tags: ['Functional Interfaces', 'Predicate', 'Consumer', 'Supplier', 'Function']
  },

  // 8. Stream API
  {
    id: 1018,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In the Java Stream API, which of the following is a TERMINAL operation that triggers execution of the lazy pipeline and folds elements into a single accumulated summary value?',
    options: [
      'reduce()',
      'filter()',
      'map()',
      'peek()'
    ],
    correctAnswer: 0,
    explanation: '`reduce()` is a terminal operation that aggregates elements using an associative binary operator into a single summary result (like sum, min, max, or product). `filter()` and `map()` are lazy intermediate operations.',
    tags: ['Streams', 'reduce', 'filter', 'map', 'collect']
  },

  // 9. JDBC
  {
    id: 1019,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following are core components of the standard Java Database Connectivity (JDBC) API? (Select ALL that apply)',
    options: [
      'Connection: Represents an active physical connection and transaction boundary to a database.',
      'PreparedStatement: Precompiles SQL statements and parameterizes inputs with "?" placeholders to prevent SQL Injection.',
      'ResultSet: A cursor-based tabular representation of database query results.',
      'DriverManager: Basic service for managing a set of JDBC drivers.'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four are fundamental JDBC building blocks. `DriverManager` establishes `Connection`, `PreparedStatement` precompiles parameterized queries, and `ResultSet` iterates through returned records.',
    tags: ['JDBC', 'PreparedStatement', 'ResultSet', 'Connection']
  },

  // 10. Networking (Sockets & TCP/IP)
  {
    id: 1020,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which Java networking class is instantiated by a server application to bind to a specific TCP port and wait for incoming client connection requests?',
    options: [
      'java.net.ServerSocket',
      'java.net.Socket',
      'java.net.DatagramPacket',
      'java.net.URL'
    ],
    correctAnswer: 0,
    explanation: '`ServerSocket` binds to a designated TCP port on the host machine and calls `.accept()` to block and listen for incoming client connection requests, returning a regular `Socket` when connected.',
    tags: ['Networking', 'Sockets', 'ServerSocket', 'TCP/IP']
  },

  // 11. GUI Programming (Swing & JavaFX)
  {
    id: 1021,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which statements regarding Swing and JavaFX GUI frameworks in Java are true? (Select ALL that apply)',
    options: [
      'Swing components are rendered on the Event Dispatch Thread (EDT).',
      'JavaFX models windows as a "Stage" containing a "Scene", which hosts a hierarchical tree of "Node" elements.',
      'JavaFX supports FXML for declarative XML UI layouts and CSS styling.',
      'Swing JFrame defaults to FlowLayout layout manager.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'Statements A, B, and C are correct. Option D is incorrect because `JFrame` defaults to `BorderLayout` (not FlowLayout; `JPanel` defaults to FlowLayout).',
    tags: ['Swing', 'JavaFX', 'GUI', 'Layout Managers']
  },

  // 12. Design Patterns (Singleton, Factory, Observer, MVC)
  {
    id: 1022,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which design pattern decouples the state of a subject object from its dependent observer objects by automatically notifying all registered listeners whenever a state mutation occurs?',
    options: [
      'Observer Pattern',
      'Factory Pattern',
      'Singleton Pattern',
      'Adapter Pattern'
    ],
    correctAnswer: 0,
    explanation: 'The Observer pattern defines a one-to-many dependency where when one subject changes state, all registered observers are notified and updated automatically (the foundation of event handling and MVC architecture).',
    tags: ['Design Patterns', 'Observer', 'MVC', 'Architecture']
  },

  // 13. Java Memory Management & Garbage Collection
  {
    id: 1023,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'In JVM memory management, what is stored in the Stack memory versus the Heap memory?',
    options: [
      'Stack stores primitive local variables and method call activation frames; Heap stores all instantiated objects and instance fields.',
      'Stack stores all objects created with new; Heap stores primitive integers only.',
      'Stack is shared globally across all threads; Heap is private to each thread.',
      'Stack memory is garbage collected by the G1 GC; Heap memory is cleared when a method returns.'
    ],
    correctAnswer: 0,
    explanation: 'Stack memory is private to each thread and stores primitive local variables, references, and method execution frames (cleared automatically upon method return). Heap memory is shared across all threads and stores all allocated objects and instance variables (managed by the Garbage Collector).',
    tags: ['Memory Management', 'Stack', 'Heap', 'Garbage Collection']
  },
  {
    id: 1024,
    chapter: 'chapter-14',
    chapterNumber: 14,
    chapterTitle: 'Chapter 14 — Major Advanced Programming Concepts',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'When does a Java object in heap memory become eligible for Garbage Collection (GC)?',
    options: [
      'When there are no reachable live references connecting the object from GC roots (thread stacks, static variables, JNI references).',
      'When its reference variable is explicitly set to null and no other reference points to it.',
      'When the variable pointing to it goes out of scope and the method stack frame pops.',
      'Only when System.gc() is manually called by the developer.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'An object becomes eligible for GC as soon as it becomes unreachable from the GC root reference graph. `System.gc()` is merely a hint to the JVM and does not guarantee immediate collection.',
    tags: ['Garbage Collection', 'Object Lifecycle', 'GC Roots']
  }
];
