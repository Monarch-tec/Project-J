import { Question } from '../../types';

export const patternsPerformanceQuestions: Question[] = [
  {
    id: 361,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'Why must the singleton instance field in the Double-Checked Locking pattern be declared `volatile` in Java?',
    codeSnippet: `public class Singleton {
    private static volatile Singleton instance; // Why volatile?

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`,
    options: [
      'To prevent the singleton class from being garbage collected',
      'Because `new Singleton()` is a 3-step operation (1: allocate memory, 2: initialize constructor, 3: assign reference to `instance`). Without `volatile`, CPU/compiler instruction reordering can perform step 3 before step 2, exposing a partially-initialized object to other threads checking the outer `instance == null` without entering the lock',
      'To make the singleton instance immutable',
      'Because volatile encrypts the memory pointer'
    ],
    correctAnswer: 1,
    explanation: 'Instruction reordering allows the write to `instance` to occur before constructor execution finishes. A concurrent thread reading `instance` without synchronization would see a non-null reference to an incompletely initialized object. Declaring `instance` as `volatile` inserts a StoreStore/Release barrier preventing this reordering.',
    tags: ['Double-Checked Locking', 'volatile', 'Instruction Reordering', 'Memory Model']
  },
  {
    id: 362,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'How does the "Bill Pugh Initialization-on-Demand Holder" idiom achieve lazy, thread-safe singleton initialization with zero synchronization overhead?',
    codeSnippet: `public class BillPughSingleton {
    private BillPughSingleton() {}

    private static class InstanceHolder {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return InstanceHolder.INSTANCE;
    }
}`,
    options: [
      'By delegating initialization to the operating system kernel',
      'By exploiting the JVM ClassLoader initialization guarantees (JLS 12.4.2): the inner class `InstanceHolder` is not loaded into memory until `getInstance()` is called; the JVM\'s internal class initialization locks guarantee thread-safe, race-free single-threaded instantiation with zero runtime `synchronized` overhead',
      'By compiling the singleton into static machine assembly at startup',
      'By running the constructor inside a virtual thread'
    ],
    correctAnswer: 1,
    explanation: 'The JVM specification guarantees that a class is initialized only when first actively referenced. `InstanceHolder` is not loaded until `getInstance()` is called. The class loading lock inside the JVM ensures thread safety, creating the singleton lazily and efficiently without explicit synchronization.',
    tags: ['Bill Pugh Singleton', 'Class Initialization', 'JLS', 'Design Patterns']
  },
  {
    id: 363,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'How do you prevent "Dead Code Elimination" and "Constant Folding" when writing microbenchmarks in Java Microbenchmark Harness (JMH)?',
    codeSnippet: `@Benchmark
public void testComputation(Blackhole bh) {
    int x = computeExpensiveValue(42);
    bh.consume(x); // Why is Blackhole used?
}`,
    options: [
      'By turning off the JIT compiler with -Xint',
      'By passing computed values into JMH `Blackhole.consume(x)` (or returning the value from the `@Benchmark` method), preventing the C2 JIT compiler from realizing the result is unused and optimizing away the entire computation as dead code',
      'By writing results to a physical file on disk',
      'By sleeping for 1 millisecond at the end of each benchmark'
    ],
    correctAnswer: 1,
    explanation: 'The C2 JIT compiler aggressively eliminates calculations whose outputs are never read ("Dead Code Elimination") or replaces expressions with static literals ("Constant Folding"). Passing results to JMH `Blackhole.consume()` ensures the JVM treats the output as observable, measuring true runtime execution.',
    tags: ['JMH', 'Blackhole', 'Dead Code Elimination', 'Microbenchmarking']
  },
  {
    id: 364,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is "Lock Coarsening" and "Lock Elision" performed by the HotSpot C2 JIT compiler?',
    options: [
      'Lock Coarsening converts locks to semaphore permits; Lock Elision turns off encryption',
      'Lock Elision removes `synchronized` monitor locks entirely when Escape Analysis proves the object never escapes the thread; Lock Coarsening combines adjacent synchronized blocks on the same monitor into a single larger block, reducing lock acquisition overhead',
      'They are operating system scheduler algorithms',
      'They are manual refactorings required by developers'
    ],
    correctAnswer: 1,
    explanation: 'If Escape Analysis confirms an object (like `new StringBuffer()`) is purely thread-local, Lock Elision strips all monitor bytecodes. Lock Coarsening detects repeated acquisitions of the same lock in sequence (e.g. inside a loop) and merges them into one single monitor enter/exit.',
    tags: ['Lock Elision', 'Lock Coarsening', 'JIT Optimization', 'Escape Analysis']
  },
  {
    id: 365,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'How does the LMAX Disruptor architecture achieve millions of ops/sec with sub-microsecond latency compared to standard `ArrayBlockingQueue`?',
    options: [
      'By storing data in MySQL memory tables',
      'By using a pre-allocated circular RingBuffer with power-of-two size (bitwise masking for indexing), lock-free atomic `Sequence` counters (CAS), cache-line padding to eliminate False Sharing, and single-writer principles with zero GC allocation',
      'By bypassing the Java virtual machine and writing directly to GPU registers',
      'By compressing messages with gzip'
    ],
    correctAnswer: 1,
    explanation: 'LMAX Disruptor uses "Mechanical Sympathy": a fixed-size contiguous RingBuffer pre-allocated at startup (zero GC), power-of-two modulo masking (`seq & (size - 1)`), cache-line padded sequence counters preventing false sharing, and lock-free CAS sequencing.',
    tags: ['LMAX Disruptor', 'RingBuffer', 'Mechanical Sympathy', 'Lock-Free']
  },
  {
    id: 366,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is "False Sharing" on modern multi-core CPU architectures and how does `@jdk.internal.vm.annotation.Contended` / padding prevent it?',
    options: [
      'Sharing passwords across network sockets',
      'When independent variables used by different CPU cores reside on the same 64-byte L1/L2 CPU Cache Line; when Core 1 writes to Var A, the hardware cache coherence protocol (MESI) invalidates the entire cache line on Core 2 running Var B, degrading performance; `@Contended` pads variables with 128 bytes of padding to isolate them onto separate cache lines',
      'When two threads access the same local stack variable',
      'When virtual threads run on the same carrier thread'
    ],
    correctAnswer: 1,
    explanation: 'CPUs manage cache in 64-byte lines. If Thread 1 writes to `varA` and Thread 2 writes to `varB` located within the same 64-byte boundary, the cores constantly ping-pong cache line invalidations. Padding fields or using `@Contended` isolates fields onto their own cache lines.',
    tags: ['False Sharing', 'Cache Lines', '@Contended', 'MESI Protocol']
  },
  {
    id: 367,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Parent Delegation Model" in Java ClassLoaders and why is it essential for security?',
    options: [
      'A model where child classloaders delete parent class files',
      'When a ClassLoader receives a load request, it delegates the search to its parent ClassLoader first before attempting to load it itself; this ensures core system classes (like `java.lang.Object` or `java.lang.String`) are always loaded by the Bootstrap ClassLoader and cannot be hijacked by malicious custom classes',
      'A model where classes are compiled on parent servers',
      'A thread scheduling policy in ExecutorService'
    ],
    correctAnswer: 1,
    explanation: 'Parent Delegation ensures core Java platform integrity. When loading `java.lang.String`, the request bubbles up: AppClassLoader -> PlatformClassLoader -> BootstrapClassLoader. The Bootstrap loader loads the trusted core class, preventing untrusted code from replacing core JVM classes.',
    tags: ['Parent Delegation Model', 'ClassLoader', 'JVM Security']
  },
  {
    id: 368,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'How do Java Insecure Deserialization vulnerabilities ("Gadget Chains") work during `ObjectInputStream.readObject()`?',
    options: [
      'By overflowing the TCP socket buffer',
      'When `readObject()` deserializes an untrusted stream, it automatically invokes `readObject()` / `readResolve()` / `hashCode()` hooks on classes present in the application classpath; attackers craft a graph of serialized objects ("gadget chain" e.g. Apache Commons Collections / Spring) that trigger arbitrary code execution (RCE) during graph reconstruction before type checking occurs',
      'By decrypting bytecode with brute force',
      'By bypassing SQL injection filters'
    ],
    correctAnswer: 1,
    explanation: '`ObjectInputStream.readObject()` instantiates objects and invokes their internal deserialization callbacks automatically. By chaining existing classpath classes ("gadgets") whose `readObject()` or `equals()` methods invoke dynamic invocations (e.g. `InvokerTransformer`), attackers execute arbitrary shell commands.',
    tags: ['Deserialization Vulnerability', 'Gadget Chains', 'Security', 'ObjectInputStream']
  },
  {
    id: 369,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'How does JEP 290 / JEP 415 "Serialization Filtering" defend against Java deserialization attacks?',
    options: [
      'By disabling all networking on the server',
      'By configuring process-wide and stream-specific filters (`ObjectInputFilter`) that inspect class names, array lengths, graph depth, and object counts BEFORE `ObjectInputStream` attempts to resolve and instantiate the serialized class, rejecting disallowed classes immediately',
      'By encrypting serialized objects with AES',
      'By converting serialized objects to JSON'
    ],
    correctAnswer: 1,
    explanation: '`ObjectInputFilter` allows developers to define allow-lists / deny-lists (e.g. `jdk.serialFilter=maxdepth=5;!org.apache.commons.collections.**;*`). The JVM validates every class in the stream against the filter *before* instantiating it, neutralizing gadget chain exploits.',
    tags: ['Serialization Filtering', 'JEP 290', 'ObjectInputFilter', 'Security']
  },
  {
    id: 370,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is "Branch Prediction" and how does Branchless Programming improve throughput in high-frequency Java loops?',
    codeSnippet: `// Branching:
if (val > threshold) count++;

// Branchless:
count += (val - threshold) >>> 31 ^ 1; // Or bitwise arithmetic`,
    options: [
      'Branch prediction is a Git version control feature',
      'CPUs use speculative execution pipelines to predict if-else branches; branch mispredictions flush the entire CPU pipeline (costing 15-20 clock cycles); branchless code uses bitwise arithmetic or conditional moves (`CMOV`) to maintain a continuous, un-stalled instruction pipeline',
      'Branch prediction is only used in Python scripts',
      'Branchless code increases memory usage by 10x'
    ],
    correctAnswer: 1,
    explanation: 'Modern CPUs pipeline instructions speculatively. If branch predictor guesses incorrectly on random data, the CPU must abort and flush 15-20 stages of pipeline execution. Branchless algorithms avoid conditional branches, eliminating misprediction penalties entirely.',
    tags: ['Branch Prediction', 'Branchless', 'CPU Pipeline', 'Performance']
  },
  {
    id: 371,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Flyweight Pattern" in Java and how is it implemented in standard wrappers like `Integer.valueOf(int)`?',
    options: [
      'A pattern for flying drones with Java code',
      'A pattern that minimizes memory usage by sharing immutable object instances across the application; `Integer.valueOf()` caches and reuses pre-allocated `Integer` instances for values between -128 and +127 (via `IntegerCache`), avoiding redundant heap allocations',
      'A pattern that compresses Java bytecode',
      'A pattern for multi-threaded thread pools'
    ],
    correctAnswer: 1,
    explanation: 'The Flyweight pattern shares immutable state to avoid object creation. `Integer.valueOf(n)` checks `IntegerCache` (-128 to 127). If within range, it returns the cached singleton reference rather than allocating a new object.',
    tags: ['Flyweight Pattern', 'IntegerCache', 'valueOf', 'Design Patterns']
  },
  {
    id: 372,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is "Loop Unrolling" performed by the HotSpot JIT compiler?',
    options: [
      'Deleting infinite loops from bytecode',
      'Transforming a loop by duplicating the loop body multiple times to execute several iterations per loop cycle, reducing loop counter increment and branch jump instruction overhead while enabling SIMD vectorization',
      'Converting for-loops to while-loops',
      'Executing loops in separate threads'
    ],
    correctAnswer: 1,
    explanation: 'Loop unrolling replicates loop statements (e.g. 4 or 8 iterations per step). This reduces the percentage of CPU time spent evaluating loop conditions and jumping, increases instruction-level parallelism, and allows SIMD vector registers to process multiple items at once.',
    tags: ['Loop Unrolling', 'JIT Optimization', 'C2 Compiler', 'Performance']
  },
  {
    id: 373,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'How does the "Thread-Specific Context ClassLoader" (`Thread.currentThread().getContextClassLoader()`) resolve the ClassLoader Inversion problem in SPI frameworks (like JDBC or JAXB)?',
    options: [
      'By bypassing class loading completely',
      'Core JDK classes loaded by the Bootstrap ClassLoader cannot normally see classes in the application classpath (AppClassLoader); the Context ClassLoader provides a thread-bound pointer allowing core system libraries (like `DriverManager`) to locate and instantiate vendor driver classes (like PostgreSQL driver) in child classloaders',
      'By compiling drivers to native DLLs',
      'By running drivers inside the Linux kernel'
    ],
    correctAnswer: 1,
    explanation: 'Under strict parent delegation, `java.sql.DriverManager` (in `java.base` loaded by Bootstrap loader) cannot see `org.postgresql.Driver` loaded by `AppClassLoader`. The Context ClassLoader breaks this barrier by allowing JDK classes to instantiate user-level classes through `ServiceLoader`.',
    tags: ['ContextClassLoader', 'SPI', 'ServiceLoader', 'ClassLoader Inversion']
  },
  {
    id: 374,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What does `-XX:MaxInlineLevel` and `-XX:FreqInlineSize` control in HotSpot C2 JIT optimization?',
    options: [
      'The maximum number of methods in a class',
      '`MaxInlineLevel` sets the maximum call-tree depth for inlining nested method calls (default 9); `FreqInlineSize` sets the maximum bytecode size of a frequently called (hot) method eligible for inline expansion into caller code',
      'The maximum RAM in megabytes for JIT compilation',
      'The number of CPU threads dedicated to compilation'
    ],
    correctAnswer: 1,
    explanation: 'Method inlining is the most critical JIT optimization (enabling further optimizations like scalar replacement and constant folding). `MaxInlineLevel` limits the inlining recursion depth, and `FreqInlineSize` limits the bytecode size of hot methods to prevent Code Cache bloat.',
    tags: ['Method Inlining', 'C2 Compiler', 'MaxInlineLevel', 'FreqInlineSize']
  },
  {
    id: 375,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'Why is Object Pooling often an ANTI-PATTERN in modern Java, except for expensive native resources (like DB connections or off-heap Netty buffers)?',
    options: [
      'Because object pools throw exceptions in Java 17',
      'Because modern JVM Garbage Collectors allocate short-lived heap objects in Eden via TLAB bump pointers in ~10 nanoseconds and collect them nearly for free; pooling lightweight Java objects adds synchronization contention, cache pollution, memory retention, and keeps objects alive into Old Gen, degrading GC performance',
      'Because object pools require root permissions',
      'Because pools can only store 10 objects'
    ],
    correctAnswer: 1,
    explanation: 'Allocating a simple object in JVM Eden space is faster than acquiring a lock or checking out an item from a pool. Object pooling keeps objects alive long enough to be promoted to Old Gen, causing fragmentation and triggering expensive Major GCs.',
    tags: ['Object Pooling', 'Anti-Pattern', 'TLAB', 'GC Efficiency']
  },
  {
    id: 376,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What is the purpose of `writeReplace()` and `readResolve()` in Java Custom Serialization?',
    options: [
      'To rename variables in `.class` files',
      '`writeReplace()` allows an object to designate a substitute replacement object to be serialized in its place (Serialization Proxy pattern); `readResolve()` allows an object to replace the deserialized object with an existing canonical singleton instance upon completion of deserialization',
      'To convert serialized objects to XML',
      'To delete fields during serialization'
    ],
    correctAnswer: 1,
    explanation: '`readResolve()` is essential for preserving singleton guarantees after deserialization, replacing the newly created object with `INSTANCE`. `writeReplace()` is the foundation for the secure Serialization Proxy pattern.',
    tags: ['readResolve', 'writeReplace', 'Serialization Proxy', 'Singleton']
  },
  {
    id: 377,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'How does the "Visitor Pattern" achieve Double Dispatch in Java, and how does modern Pattern Matching for switch provide a cleaner alternative?',
    options: [
      'Visitor pattern executes methods on two remote servers simultaneously',
      'Visitor achieves double dispatch (dispatching on both the receiver type and the visitor type) via two virtual method calls (`element.accept(visitor)` -> `visitor.visit(this)`); Modern pattern matching over sealed hierarchies allows declarative, exhaustive matching directly in a switch expression without polluting domain model classes with `accept()` methods',
      'Pattern matching switch is slower than Visitor pattern',
      'Visitor pattern is mandatory in all compiler implementations'
    ],
    correctAnswer: 1,
    explanation: 'Traditional Visitor pattern requires intrusive `accept(Visitor v)` boilerplate in all hierarchy classes to simulate double dispatch. Sealed classes paired with pattern matching `switch` allow adding new operations externally with full compile-time exhaustiveness checking without touching data classes.',
    tags: ['Visitor Pattern', 'Double Dispatch', 'Pattern Matching', 'Sealed Classes']
  },
  {
    id: 378,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the purpose of JMH `@Warmup` iterations before recording `@Measurement` iterations?',
    options: [
      'To heat up the physical CPU processor chip',
      'To allow the HotSpot JVM Tiered Compilation system (C1/C2 JIT) to profile execution, trigger method inlining, optimize hot loops, and settle into steady-state native machine code before benchmark measurements begin',
      'To download dependencies from Maven',
      'To clear the disk swap memory'
    ],
    correctAnswer: 1,
    explanation: 'Java is an interpreted and dynamically compiled language. Measuring code during initial runs records slow interpreter and C1 profiling performance. `@Warmup` runs discard initial data until C2 JIT compiles optimized steady-state machine code.',
    tags: ['JMH', '@Warmup', 'Tiered Compilation', 'Steady State']
  },
  {
    id: 379,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What is the "Serialization Proxy Pattern" described in Effective Java Item 90?',
    codeSnippet: `private Object writeReplace() {
    return new SerializationProxy(this);
}
private void readObject(ObjectInputStream stream) throws InvalidObjectException {
    throw new InvalidObjectException("Proxy required");
}`,
    options: [
      'A network proxy that routes serialization over HTTPS',
      'A pattern where a class writes a private static nested `SerializationProxy` record/class representing its logical state instead of serializing the enclosing class directly; the proxy\'s `readResolve()` reconstructs the real class using its public constructor, enforcing all invariants and eliminating deserialization security attack vectors',
      'A proxy that converts Java objects to protobuf format',
      'A pattern that disables class serialization'
    ],
    correctAnswer: 1,
    explanation: 'The Serialization Proxy pattern replaces fragile default serialization with a dedicated proxy object. Deserialization calls the canonical constructor via `proxy.readResolve()`, guaranteeing that all constructor validations and immutability invariants are strictly enforced.',
    tags: ['Serialization Proxy', 'Effective Java', 'Security', 'Immutability']
  },
  {
    id: 380,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is "Mechanical Sympathy" in high-performance Java systems engineering?',
    options: [
      'Being kind to computer hardware technicians',
      'Designing software algorithms and data structures in harmony with the underlying computer hardware architecture (CPU L1/L2/L3 caches, cache lines, RAM prefetchers, memory bus alignment, branch predictors, SIMD pipelines) to maximize hardware efficiency',
      'Automating server maintenance using robots',
      'Writing Java code that runs only on mechanical disk drives'
    ],
    correctAnswer: 1,
    explanation: 'Coined by Martin Thompson (LMAX), Mechanical Sympathy means understanding how the underlying hardware actually executes code (CPU cache lines, branch prediction, store buffers) and structuring Java data access patterns to align with hardware capabilities for maximum throughput.',
    tags: ['Mechanical Sympathy', 'Hardware Architecture', 'LMAX', 'Low-Latency']
  },
  {
    id: 381,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the role of `serialPersistentFields` in custom Java serialization?',
    codeSnippet: `private static final ObjectStreamField[] serialPersistentFields = {
    new ObjectStreamField("name", String.class),
    new ObjectStreamField("age", int.class)
};`,
    options: [
      'It stores fields in a persistent SQL database',
      'It explicitly defines which fields are serialized into the stream, decoupling the external serialized format from internal private field names and declarations',
      'It prevents fields from being modified by reflection',
      'It encrypts persistent fields'
    ],
    correctAnswer: 1,
    explanation: '`serialPersistentFields` explicitly overrides default serialization field discovery. It allows developers to maintain backward wire compatibility even if internal private field names are refactored or removed.',
    tags: ['serialPersistentFields', 'Serialization', 'Wire Compatibility']
  },
  {
    id: 382,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What is the "Null Object Pattern" and how does Java\'s `Optional` provide a typed alternative?',
    options: [
      'A pattern that sets all fields to null to free memory',
      'A design pattern where a concrete class implementing an interface provides default "do-nothing" behavior instead of passing `null` references; `Optional<T>` provides a type-safe container that makes the absence of a value explicit in method signatures',
      'A pattern that catches NullPointerExceptions automatically',
      'A pattern used only for database queries'
    ],
    correctAnswer: 1,
    explanation: 'The Null Object pattern replaces `null` checks with an object providing neutral/no-op behavior. `Optional<T>` offers a functional type-level mechanism to convey the potential absence of a value without returning ambiguous nulls.',
    tags: ['Null Object Pattern', 'Optional', 'Design Patterns', 'API Design']
  },
  {
    id: 383,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'How do you benchmark multithreaded concurrent code with JMH using `@Threads` and `@Group` annotations?',
    codeSnippet: `@State(Scope.Group)
public class ConcurrentMapBenchmark {
    @Benchmark
    @Group("rw")
    @GroupThreads(4)
    public String read(BenchmarkState state) { ... }

    @Benchmark
    @Group("rw")
    @GroupThreads(1)
    public void write(BenchmarkState state) { ... }
}`,
    options: [
      'By starting threads manually inside the benchmark method',
      '`@Group` binds multiple benchmark methods into a unified execution team, and `@GroupThreads` allocates dedicated threads per method (e.g. 4 readers + 1 writer) sharing a `@State(Scope.Group)` instance to measure realistic contention ratios',
      'By running JMH across multiple physical servers',
      'JMH cannot benchmark multithreaded code'
    ],
    correctAnswer: 1,
    explanation: 'JMH supports asymmetric multithreaded microbenchmarking. `@Group` groups heterogeneous methods (like readers and writers) into a shared contention test, precisely simulating real-world read/write concurrency ratios.',
    tags: ['JMH', '@Group', '@GroupThreads', 'Concurrency Benchmarking']
  },
  {
    id: 384,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Chain of Responsibility" pattern and how is it used in servlet filter pipelines and Netty ChannelPipelines?',
    options: [
      'A pattern where multiple handler objects are chained sequentially; an incoming request traverses the chain where each handler can either process the request, transform it, pass it to the next handler (`chain.doFilter()`), or terminate the flow',
      'A database foreign key constraint pattern',
      'A pattern that chains thread execution together',
      'A pattern for blockchain smart contracts'
    ],
    correctAnswer: 0,
    explanation: 'The Chain of Responsibility pattern decouples request senders from receivers by passing requests through a chain of handler objects. Servlet filters, Spring interceptors, and Netty `ChannelPipeline` are canonical implementations.',
    tags: ['Chain of Responsibility', 'Servlet Filters', 'Netty Pipeline', 'Design Patterns']
  },
  {
    id: 385,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'Why does accessing an array of objects (`Point[]`) exhibit worse cache locality than accessing primitive arrays (`int[]` x, `int[]` y)?',
    options: [
      'Because Point[] array elements are stored on disk',
      'An `int[]` array stores raw integer values sequentially in contiguous physical memory, allowing the CPU hardware prefetcher to load whole cache lines at once; `Point[]` stores an array of memory pointers, where each pointer dereferences to a separate object scattered across the heap (Pointer Chasing / Cache Misses)',
      'Because Point[] requires synchronized access',
      'Because primitive arrays are compressed'
    ],
    correctAnswer: 1,
    explanation: 'In Java, an array of objects is an array of references. Iterating over `Point[]` causes pointer chasing: each object is located at an arbitrary heap address, leading to frequent CPU L1/L2 cache misses. Project Valhalla (Value Objects) is designed to solve this with flat, flattened in-memory layouts.',
    tags: ['Cache Locality', 'Pointer Chasing', 'Project Valhalla', 'Memory Architecture']
  },
  {
    id: 386,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is the "Decorator Pattern" and how is it illustrated in Java I/O Streams (`new BufferedReader(new InputStreamReader(new FileInputStream(file)))`)?',
    options: [
      'A pattern for styling Swing GUI windows',
      'A pattern that dynamically attaches additional responsibilities to an object by wrapping it inside another object sharing the same abstract interface, composing features (buffering, character decoding, file reading) without class inheritance explosion',
      'A pattern that compiles Java code into C++',
      'A pattern for decorating HTTP headers'
    ],
    correctAnswer: 1,
    explanation: '`java.io` is the quintessential Decorator pattern: `FileInputStream` (leaf component) is wrapped in `BufferedInputStream` (buffering decorator), which can be wrapped in `GZIPInputStream` (decompression decorator), providing flexible behavioral composition.',
    tags: ['Decorator Pattern', 'java.io', 'Streams', 'Design Patterns']
  },
  {
    id: 387,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Observer Pattern" and how is it implemented via `PropertyChangeListener` or Reactive Streams?',
    options: [
      'A pattern where an object (Subject) maintains a list of dependents (Observers) and notifies them automatically of state changes by calling one of their callback methods',
      'A pattern for monitoring CPU temperature in the JVM',
      'A pattern that encrypts object updates',
      'A pattern for inspecting private fields reflectively'
    ],
    correctAnswer: 0,
    explanation: 'The Observer pattern defines a 1-to-many dependency between objects. When the subject\'s state changes, all registered observers are notified, forming the foundation for event-driven architectures and reactive programming.',
    tags: ['Observer Pattern', 'Event-Driven', 'Design Patterns']
  },
  {
    id: 388,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What does JMH `@Fork` do and why is multi-fork execution essential for reliable microbenchmarking?',
    codeSnippet: `@Fork(value = 3, warmups = 1)`,
    options: [
      'It creates 3 Git branches for testing',
      'It launches completely fresh, isolated JVM operating system processes for each benchmark run, eliminating profile contamination, classloading artifacts, and JIT compilation state leftover from prior runs',
      'It forks threads inside the same JVM',
      'It duplicates the benchmark dataset across 3 files'
    ],
    correctAnswer: 1,
    explanation: 'Running all microbenchmarks in a single JVM causes cross-contamination: earlier tests compile code and pollute JIT branch profiles and code caches. `@Fork(3)` launches separate clean JVM processes for each test run to guarantee accurate variance metrics.',
    tags: ['JMH', '@Fork', 'JVM Isolation', 'Benchmarking']
  },
  {
    id: 389,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is the "Builder Pattern" with fluent API chaining and how do modern Java Records simplify simple immutable data structures?',
    options: [
      'Builder pattern builds Docker containers for Java apps',
      'Builder pattern separates the construction of a complex object with many optional parameters from its representation, providing readable chained methods (`.withName().withAge().build()`); For simple immutable carriers with mandatory components, Java `record` classes eliminate builder boilerplate via concise canonical constructors and compact constructors',
      'Builder pattern is deprecated in Java 21',
      'Records cannot be instantiated using new'
    ],
    correctAnswer: 1,
    explanation: 'The Builder pattern avoids telescoping constructors for complex configurations. For simple immutable data holders, Java Records provide built-in immutability, accessors, and pattern deconstruction without hundreds of lines of builder boilerplate.',
    tags: ['Builder Pattern', 'Records', 'Effective Java', 'Design Patterns']
  },
  {
    id: 390,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the purpose of `java.util.ServiceLoader` (SPI - Service Provider Interface)?',
    options: [
      'To load dynamic plugins and service implementations defined in `META-INF/services/` (or `provides ... with ...` in module-info.java) at runtime without hardcoding vendor implementation classes in source code',
      'To load web pages over HTTP',
      'To manage database transactions in Spring',
      'To start system daemon services'
    ],
    correctAnswer: 0,
    explanation: '`ServiceLoader` is Java\'s standard SPI mechanism. It discovers and dynamically instantiates interface implementations declared by third-party JARs, powering pluggable architectures like JDBC drivers, JSON parsers, and logging frameworks.',
    tags: ['ServiceLoader', 'SPI', 'Plugin Architecture']
  },
  {
    id: 391,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What is "Loop Invariant Code Motion" (Hoisting) in HotSpot JIT compiler optimizations?',
    codeSnippet: `for (int i = 0; i < list.size(); i++) {
    int factor = calculateConstantMultiplier(); // Invariant!
    total += list.get(i) * factor;
}`,
    options: [
      'Moving the loop to a different CPU thread',
      'The JIT compiler detects expressions inside a loop whose results never change across iterations, and hoists (moves) the computation outside the loop body so it is evaluated only once before entering the loop',
      'Deleting the loop when i reaches 100',
      'Converting the loop into a recursive function'
    ],
    correctAnswer: 1,
    explanation: 'Loop Invariant Code Motion (LICM) is a standard compiler optimization that identifies expressions independent of loop iterations and moves them before the loop pre-header, saving repetitive computations.',
    tags: ['Loop Invariant', 'Hoisting', 'JIT Optimization', 'C2 Compiler']
  },
  {
    id: 392,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'How do you implement the "Type-Safe Heterogeneous Container" pattern in Java (Effective Java Item 33)?',
    codeSnippet: `public class Container {
    private Map<Class<?>, Object> map = new HashMap<>();

    public <T> void put(Class<T> type, T instance) {
        map.put(Objects.requireNonNull(type), type.cast(instance));
    }
    public <T> T get(Class<T> type) {
        return type.cast(map.get(type));
    }
}`,
    options: [
      'By storing all objects as String values',
      'By using parameterized `Class<T>` type tokens as keys in the container map, allowing different types to be stored safely and retrieved with dynamic casting (`type.cast()`) with complete compile-time type safety',
      'By converting objects to byte arrays',
      'By disabling the Java generics compiler'
    ],
    correctAnswer: 1,
    explanation: 'A Type-Safe Heterogeneous Container uses `Class<T>` as the map key. Because the key is parameterized, `container.get(String.class)` returns a typed `String` without unsafe casting, powering DI frameworks and application contexts.',
    tags: ['Type-Safe Container', 'Type Tokens', 'Effective Java', 'Generics']
  },
  {
    id: 393,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Adapter Pattern" in Java and how does `Arrays.asList(T...)` demonstrate it?',
    options: [
      'A pattern for charging laptop batteries',
      'A pattern that converts the interface of an existing class (array `T[]`) into another interface expected by clients (`List<T>`), adapting the array to the Collection interface without copying data',
      'A pattern that converts Java bytecode to Python',
      'A pattern for network socket translation'
    ],
    correctAnswer: 1,
    explanation: 'The Adapter pattern wraps an incompatible interface. `Arrays.asList()` adapts a raw Java array into a `List` interface view, mapping `list.get(i)` and `list.set(i, val)` directly to the underlying array.',
    tags: ['Adapter Pattern', 'Arrays.asList', 'Design Patterns']
  },
  {
    id: 394,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What is the purpose of JMH `@State(Scope.Benchmark)` vs `@State(Scope.Thread)`?',
    options: [
      '`Scope.Benchmark` shares a single state instance across all benchmark worker threads (measuring shared mutable contention); `Scope.Thread` creates an independent, isolated state instance per thread (measuring thread-local performance)',
      '`Scope.Benchmark` is for unit tests; `Scope.Thread` is for integration tests',
      '`Scope.Thread` disables multithreading',
      'There is no functional difference'
    ],
    correctAnswer: 0,
    explanation: 'JMH state scopes manage lifecycle: `Scope.Benchmark` creates one singleton state object shared by all threads (requires thread-safety). `Scope.Thread` provisions dedicated state per worker thread, isolating microbenchmarks from cross-thread contention.',
    tags: ['JMH', '@State', 'Scope.Benchmark', 'Scope.Thread']
  },
  {
    id: 395,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is the "Command Pattern" in Java and how do Lambda expressions simplify its implementation?',
    options: [
      'A pattern for executing Linux bash commands in Java',
      'A behavioral pattern that encapsulates all information needed to perform an action (receiver, method, arguments) into a stand-alone object; Modern Java allows replacing verbose Command classes with standard functional interfaces (`Runnable`, `Consumer`, `Supplier`) or method references (`this::execute`)',
      'A pattern that formats database queries',
      'A pattern for routing network traffic'
    ],
    correctAnswer: 1,
    explanation: 'The Command pattern decouples the object invoking an operation from the one that knows how to perform it. In modern Java, any zero-argument or single-argument lambda or method reference (`Runnable` / `Action`) acts as a first-class lightweight command.',
    tags: ['Command Pattern', 'Lambdas', 'Functional Programming', 'Design Patterns']
  },
  {
    id: 396,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Factory Method Pattern" and how does `List.of()` or `Map.of()` illustrate it in modern Java?',
    options: [
      'A pattern where an interface/static method defines an abstract creation interface, letting the runtime decide the exact concrete internal class to instantiate (e.g. `ListN`, `List12`, or `ImmutableCollections`) based on arguments',
      'A pattern that manufactures physical hardware components',
      'A pattern that creates database tables automatically',
      'A pattern for compiling class files'
    ],
    correctAnswer: 0,
    explanation: '`List.of()` is a static factory method. Depending on the number of arguments (0, 1, 2, or $N$), the factory returns specialized internal immutable classes (`List0`, `List12`, `ListN`) optimized for minimal memory footprint.',
    tags: ['Factory Method', 'Static Factory', 'List.of', 'Design Patterns']
  },
  {
    id: 397,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Expert',
    question: 'What is the role of `sun.misc.Unsafe.arrayBaseOffset` and `arrayIndexScale` in building high-speed off-heap array structures?',
    codeSnippet: `long baseOffset = unsafe.arrayBaseOffset(byte[].class);
long indexScale = unsafe.arrayIndexScale(byte[].class);
long address = baseOffset + (index * indexScale);`,
    options: [
      'To calculate the geometric surface area of arrays',
      'They provide the exact memory byte offset to the first array element (`arrayBaseOffset`) and the byte distance between successive elements (`arrayIndexScale`), enabling ultra-fast raw memory arithmetic and atomic CAS operations on array elements without bounds checks',
      'To resize arrays dynamically',
      'To encrypt array contents'
    ],
    correctAnswer: 1,
    explanation: '`arrayBaseOffset` and `arrayIndexScale` allow computing the exact memory address of array elements for raw `Unsafe` or `VarHandle` atomic memory operations (like `AtomicReferenceArray`), bypassing Java array bounds checking overhead in low-latency systems.',
    tags: ['arrayBaseOffset', 'arrayIndexScale', 'Unsafe', 'Low-Latency']
  },
  {
    id: 398,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'How do you prevent ClassLoader memory leaks when using dynamic Thread Context ClassLoaders in Java EE/Jakarta application servers?',
    options: [
      'By rebooting the server machine every hour',
      'Always save the previous context classloader in a local variable before overriding it, and restore it in a `finally` block (`Thread.currentThread().setContextClassLoader(originalLoader)`), ensuring thread pool threads do not permanently pin application classloaders upon returning to the pool',
      'By compiling classes with Java 1.4',
      'By running all servlets on the Bootstrap classloader'
    ],
    correctAnswer: 1,
    explanation: 'If a thread pool worker thread sets its Context ClassLoader to a web app\'s `WebAppClassLoader` and returns to the pool without resetting it, the thread retains a strong reference to the classloader forever, preventing the entire web app and its classes from being unloaded.',
    tags: ['ClassLoader Leaks', 'ContextClassLoader', 'Thread Pools', 'Best Practices']
  },
  {
    id: 399,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Advanced',
    question: 'What is the "Template Method Pattern" and how does `AbstractList` / `AbstractQueuedSynchronizer` (AQS) implement it?',
    options: [
      'A pattern that defines the skeleton of an algorithm in a base class method, deferring some specific steps (`tryAcquire()`, `tryRelease()`, `get()`) to subclasses without altering the overall algorithm structure',
      'A pattern for sending email templates',
      'A pattern for generating HTML files',
      'A pattern that compiles C++ templates'
    ],
    correctAnswer: 0,
    explanation: 'The Template Method pattern defines an algorithm\'s invariant skeleton in a superclass (e.g. `AQS.acquire()` coordinating queue synchronization) while invoking abstract/protected primitive hooks (`tryAcquire()`) that concrete subclasses implement.',
    tags: ['Template Method', 'AQS', 'AbstractList', 'Design Patterns']
  },
  {
    id: 400,
    category: 'patterns-performance',
    categoryTitle: 'Design Patterns & Performance Engineering',
    difficulty: 'Master',
    question: 'What is "Escape Analysis" and how does the HotSpot C2 compiler use "Scalar Replacement" to eliminate object allocation entirely?',
    codeSnippet: `public int calculateDistance(int x, int y) {
    Point p = new Point(x, y); // Does this object get allocated on the heap?
    return p.x * p.x + p.y * p.y;
}`,
    options: [
      'The object is serialized to disk',
      'Escape Analysis proves that the `Point` object never escapes the `calculateDistance` method scope (not returned, passed to external methods, or stored in fields); the C2 compiler dismantles the object into its scalar primitive components (`p.x` and `p.y`) and maps them directly to CPU hardware registers or stack locations with ZERO heap allocation or garbage collection overhead',
      'The object is allocated in Metaspace',
      'Escape Analysis is only available when running with -Xint'
    ],
    correctAnswer: 1,
    explanation: 'Scalar Replacement is one of the most potent optimizations in the JVM. When Escape Analysis determines an object does not escape the current method or thread, HotSpot decomposes the object into its individual scalar fields, storing them in CPU registers instead of allocating heap memory, completely eliminating GC overhead.',
    tags: ['Escape Analysis', 'Scalar Replacement', 'C2 Compiler', 'Zero-Allocation', 'Performance']
  }
];
