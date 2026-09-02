import { Question } from '../../types';

export const jvmInternalsQuestions: Question[] = [
  {
    id: 41,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'How does the Z Garbage Collector (ZGC) achieve sub-millisecond maximum Stop-The-World (STW) pause times even on multi-terabyte heaps?',
    options: [
      'By freezing object allocation and paging memory to NVMe SSD storage',
      'By utilizing colored pointers (metadata bits stored directly in the 64-bit reference address) and load barriers executed during reference reads to perform concurrent marking, relocation, and remapping',
      'By running the garbage collector on a dedicated coprocessor outside the CPU cache',
      'By turning all Java objects into primitive structs at compile time'
    ],
    correctAnswer: 1,
    explanation: 'ZGC achieves ultra-low latency (<1ms pause) by performing almost all GC phases concurrently with application threads. It embeds GC metadata (Finalizable, Remapped, Marked0, Marked1) into the upper bits of 64-bit object pointers ("colored pointers") and uses JIT-injected load barriers: whenever an application thread dereferences a pointer to an un-relocated object, the load barrier self-heals the reference on the fly.',
    tags: ['ZGC', 'Colored Pointers', 'Load Barriers', 'Low Latency GC']
  },
  {
    id: 42,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the exact distinction between the bytecode instructions `invokevirtual`, `invokespecial`, `invokestatic`, and `invokeinterface`?',
    options: [
      'invokestatic calls private methods; invokespecial calls static methods; invokevirtual calls interfaces',
      'invokestatic is for static methods; invokespecial is for private methods, constructors (<init>), and super calls (non-virtual); invokevirtual is for public/protected instance methods via vtable; invokeinterface is for interface methods via itable',
      'invokevirtual is only for abstract classes; invokeinterface is for records and enums',
      'All four instructions are replaced by invokedynamic in Java 17'
    ],
    correctAnswer: 1,
    explanation: '`invokestatic` invokes static methods without an object receiver. `invokespecial` resolves methods without dynamic dispatch (constructors, private methods, `super.` calls). `invokevirtual` performs polymorphic dispatch on class hierarchies via Virtual Method Tables (vtables). `invokeinterface` handles interface method calls via Interface Tables (itables) or inline caching.',
    tags: ['Bytecode', 'Method Invocation', 'vtable', 'itable']
  },
  {
    id: 43,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'How does Escape Analysis in the HotSpot C2 compiler enable "Scalar Replacement" and "Lock Elision"?',
    options: [
      'It moves long-lived objects directly to the PermGen space',
      'If an object allocated in a method does not escape the method scope or current thread, C2 can eliminate the heap allocation by replacing the object with primitive scalar variables on the stack/registers, and remove synchronization locks that are never contended',
      'It converts recursive calls into iterative loops using Tail Call Optimization',
      'It encrypts method frames to prevent stack buffer overflows'
    ],
    correctAnswer: 1,
    explanation: 'HotSpot C2 determines if an object\'s lifecycle escapes the allocating method (`NoEscape`, `ArgEscape`, `GlobalEscape`). If `NoEscape`, Scalar Replacement disassembles the object into local primitive fields placed in registers/stack, bypassing heap allocation and GC pressure. If the object does not escape the thread, Lock Elision removes synchronization overhead completely.',
    tags: ['Escape Analysis', 'Scalar Replacement', 'Lock Elision', 'C2 Compiler']
  },
  {
    id: 44,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What is a Thread-Local Allocation Buffer (TLAB) in the JVM and what performance problem does it solve?',
    options: [
      'A buffer for storing serialized socket payloads in NIO channels',
      'A dedicated sub-region of the Eden space assigned exclusively to a specific thread, allowing lock-free bump-the-pointer object allocations without global heap lock contention',
      'A thread-safe cache for database connection pooling',
      'A temporary stack frame allocated for recursive lambda functions'
    ],
    correctAnswer: 1,
    explanation: 'Because memory allocation in a shared Eden space would require global synchronization (CAS/locks) among concurrent threads, the JVM assigns each thread a private chunk of Eden called a TLAB. The thread allocates objects inside its TLAB using a simple pointer bump with zero synchronization overhead until the TLAB is exhausted.',
    tags: ['TLAB', 'Memory Allocation', 'Eden Space']
  },
  {
    id: 45,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'How does the JVM ClassLoader Parent Delegation Model work, and when is it intentionally violated?',
    options: [
      'Child classloaders always load classes first; parents are only consulted if the child fails',
      'A classloader delegates loading requests to its parent before attempting to load the class itself; it is intentionally bypassed in frameworks (e.g. SPI with Thread Context ClassLoader, OSGi bundle loaders, Web app containers)',
      'Parent delegation is enforced by hardware CPU rings and cannot be bypassed in Java',
      'Delegation applies only to interface definitions, not concrete classes'
    ],
    correctAnswer: 1,
    explanation: 'In the standard parent delegation model (`ClassLoader.loadClass()`), a classloader asks its parent (Bootstrap -> Platform -> App) first before looking in its own classpath. This ensures core Java classes (`java.lang.Object`) cannot be hijacked. It is bypassed in servlet containers (child-first loading) and SPI mechanisms (`ServiceLoader` using `Thread.currentThread().getContextClassLoader()`).',
    tags: ['ClassLoaders', 'Parent Delegation', 'SPI']
  },
  {
    id: 46,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is the purpose and mechanics of `invokedynamic` (indy) introduced in Java 7 and heavily utilized by lambdas and string concatenation?',
    options: [
      'To enable dynamic typing by executing JavaScript inside the JVM',
      'To decouple bytecode from static type-checking at compile time, deferring method linkage to runtime via a bootstrap method (BSM) that returns a CallSite linked to a MethodHandle',
      'To load class files dynamically from remote HTTP URLs',
      'To bypass JVM bytecode verification at startup'
    ],
    correctAnswer: 1,
    explanation: '`invokedynamic` allows dynamic call sites. On first execution, the JVM calls a Bootstrap Method (`BSM`, e.g., `LambdaMetafactory.metafactory`), which generates and returns a `CallSite` target holding a `MethodHandle`. Subsequent invocations execute the linked target directly with JIT inlining speed, avoiding synthetic anonymous class generation overhead at compile time.',
    tags: ['invokedynamic', 'LambdaMetafactory', 'MethodHandle', 'Bytecode']
  },
  {
    id: 47,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the difference between PermGen (Java 7 and earlier) and Metaspace (Java 8+)?',
    options: [
      'PermGen was stored in off-heap native memory; Metaspace is stored on the Java heap',
      'PermGen had a fixed maximum contiguous size on the Java heap causing frequent java.lang.OutOfMemoryError: PermGen space; Metaspace is allocated in native process memory and resizes automatically by default (bounded by -XX:MaxMetaspaceSize)',
      'Metaspace stores compiled JIT native code while PermGen stored class metadata',
      'Metaspace was removed in Java 17 in favor of ZGC Compact Storage'
    ],
    correctAnswer: 1,
    explanation: 'Java 8 eliminated PermGen (Permanent Generation) from the Java Heap and replaced it with Metaspace. Metaspace stores class metadata, method definitions, and constant pools in native OS memory. It expands dynamically up to available system memory unless constrained with `-XX:MaxMetaspaceSize`.',
    tags: ['Metaspace', 'PermGen', 'JVM Memory Layout']
  },
  {
    id: 48,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is a "JVM Safepoint", and what occurs when the JVM initiates a Global Safepoint (Stop-The-World)?',
    options: [
      'A database checkpoint saving heap state to disk',
      'A designated point in bytecode where a thread\'s execution state is known and consistent; the JVM requests all application threads to pause at safepoints to perform operations like GC root scanning, thread dumps, deoptimization, and biased locking revocation',
      'An encrypted breakpoint used only by the remote debugging protocol',
      'A CPU hardware interrupt that kills runaway threads'
    ],
    correctAnswer: 1,
    explanation: 'A Safepoint is a state where all thread register maps and stack references are strictly known. The JIT compiler inserts safepoint polls (e.g. in loop headers, method returns). During a global safepoint, the JVM invalidates the poll page, forcing all running threads to halt so GC root scanning, class redefinition, or deoptimization can proceed safely.',
    tags: ['Safepoints', 'Stop-The-World', 'HotSpot Internals']
  },
  {
    id: 49,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'How do "Compressed Ordinary Object Pointers" (Compressed OOPs, `-XX:+UseCompressedOops`) work on 64-bit JVM architectures?',
    options: [
      'They compress strings using GZIP algorithms in memory',
      'They exploit 8-byte object memory alignment by shifting 32-bit reference pointers 3 bits to the left, allowing a 32-bit pointer to address up to 32 GB of 64-bit heap space',
      'They reduce JVM stack frames from 64 bits to 16 bits',
      'They allow storing 64-bit long values inside 32-bit int registers'
    ],
    correctAnswer: 1,
    explanation: 'Because Java objects are aligned to 8-byte boundaries (addresses always end in `000` in binary), the lowest 3 bits are always zero. Compressed OOPs store only the upper bits in 32-bit pointers. At runtime, the JVM shifts the pointer left by 3 bits (`address << 3`), enabling 32-bit references to address up to `2^32 * 8 = 32 GB` of heap while saving 50% pointer memory.',
    tags: ['Compressed OOPs', 'Memory Alignment', 'JVM Optimization']
  },
  {
    id: 50,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'In the HotSpot JVM Tiered Compilation model, what are the roles of Tier 1-3 (C1) and Tier 4 (C2) compilers?',
    options: [
      'Tier 1 interprets bytecode; Tier 4 runs GraalVM native images',
      'Tier 1-3 use the C1 Client compiler with increasing levels of profiling instrumentation for ultra-fast startup; Tier 4 uses the C2 Server compiler for aggressive long-term profile-guided optimizations (inlining, loop unrolling, vectorization)',
      'Tier 1 compiles UI components; Tier 4 compiles network sockets',
      'Tiered compilation has been disabled by default since Java 9'
    ],
    correctAnswer: 1,
    explanation: 'HotSpot Tiered Compilation combines fast startup with maximum peak performance. Methods start in interpreter mode (Tier 0), quickly advance to C1 compiler (Tiers 1-3) which compiles fast native code and gathers execution profiles (MDOs - MethodDataObjects), and heavily called "hot" methods are compiled by C2 (Tier 4) with deep optimizations.',
    tags: ['Tiered Compilation', 'C1 Compiler', 'C2 Compiler', 'JIT']
  },
  {
    id: 51,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is "Deoptimization" (Deopt) in the HotSpot JIT compiler?',
    options: [
      'The process of shutting down the JVM garbage collector during peak load',
      'The transition of optimized native machine code back to interpreted mode or C1 when an optimistic speculative assumption (e.g. class hierarchy, null check, loop invariant) is invalidated by newly loaded classes or rare branches',
      'The compression of bytecode to fit into L1 CPU cache',
      'A command line flag that downgrades Java 21 features to Java 8 compatibility'
    ],
    correctAnswer: 1,
    explanation: 'C2 JIT makes aggressive speculative optimizations (e.g. devirtualizing a polymorphic method call assuming only one class implements an interface). If a newly loaded class violates this assumption (class hierarchy change), the JVM invalidates the native code ("uncommon trap"), reconstructs the interpreted stack frame, and falls back to interpreter/C1.',
    tags: ['Deoptimization', 'Uncommon Traps', 'JIT Profiling']
  },
  {
    id: 52,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is the structure of a standard HotSpot Java Object Header on a 64-bit architecture with Compressed OOPs enabled?',
    options: [
      '4 bytes mark word + 4 bytes class pointer = 8 bytes total',
      '8 bytes Mark Word (hashcode, GC age, lock state, biased lock bits) + 4 bytes compressed Klass Word (pointer to instance metadata) = 12 bytes total (padded to 16 bytes alignment)',
      '16 bytes cryptographic hash + 16 bytes pointer = 32 bytes total',
      '4 bytes length + 8 bytes reference = 12 bytes total'
    ],
    correctAnswer: 1,
    explanation: 'A standard HotSpot Java object header consists of: 1) Mark Word (64-bit / 8 bytes: stores identity hash code, generational GC age (4 bits), lock status tags, and biased lock flags), and 2) Klass Word (4 bytes with compressed class pointers pointing to metadata in Metaspace). Array objects have an additional 4-byte array length field.',
    tags: ['Object Header', 'Mark Word', 'Klass Word', 'Memory Layout']
  },
  {
    id: 53,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What does the G1 (Garbage-First) GC use "Remembered Sets" (R-Sets) and "Card Tables" for?',
    options: [
      'To track which database tables were accessed by Hibernate',
      'To track inter-region references so that a region can be collected independently during mixed/young collections without scanning the entire heap',
      'To store compiled JIT machine instructions for method caching',
      'To manage thread priority queues in the OS kernel'
    ],
    correctAnswer: 1,
    explanation: 'G1 divides the heap into equal-sized regions (1MB–32MB). To collect young or mixed regions without scanning the whole old generation, G1 uses Card Tables (dividing heap into 512-byte cards) and Remembered Sets (R-Sets) to track which old-generation cards contain pointers into each target region.',
    tags: ['G1 GC', 'Remembered Sets', 'Card Tables']
  },
  {
    id: 54,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'How does the `Shenandoah` GC differ from `ZGC` in its concurrency mechanism for object evacuation?',
    options: [
      'Shenandoah pauses the entire JVM for the entire evacuation phase',
      'Shenandoah historically uses Brooks Pointers / Load-Reference Barriers (LRB) at the object level rather than reference-level colored pointer bits, supporting concurrent compaction and evacuation across generations',
      'Shenandoah only runs on 32-bit ARM microcontrollers',
      'Shenandoah cannot reclaim Metaspace memory'
    ],
    correctAnswer: 1,
    explanation: 'While ZGC uses Colored Pointers (bit manipulation on 64-bit references) requiring hardware/OS support for virtual memory mapping, Shenandoah employs Load-Reference Barriers (LRB) and forwarded pointers embedded directly in object headers, enabling concurrent evacuation on a wider variety of platforms without multi-mapped address spaces.',
    tags: ['Shenandoah GC', 'ZGC', 'Load-Reference Barrier']
  },
  {
    id: 55,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What happens during JVM class verification when the Type Checker validates StackMapTable attributes in Java 7+ bytecode?',
    options: [
      'It executes every bytecode instruction in a sandboxed simulator',
      'It statically proves type safety and stack frame consistency in linear time (O(n)) using precomputed StackMapTable attributes rather than expensive full abstract interpretation',
      'It uploads bytecode hashes to a centralized security authority',
      'It converts class bytecode into C++ source files'
    ],
    correctAnswer: 1,
    explanation: 'Prior to Java 6, class verification used quadratic-time abstract interpretation. Starting with Java 7 (Split Verifier / JSR 202), `javac` generates `StackMapTable` attributes in class files specifying types of local variables and operand stack entries at jump targets. The JVM verifier checks type consistency in a fast single linear pass.',
    tags: ['Bytecode Verification', 'StackMapTable', 'JVMS']
  },
  {
    id: 56,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the purpose of JVM Class Data Sharing (CDS) and Application CDS (AppCDS)?',
    options: [
      'To share static variable values across multiple physical computers over network sockets',
      'To dump parsed class metadata into an optimized memory-mapped archive file (.jsa), enabling multiple JVM instances to share read-only memory and drastically reducing startup time and memory footprint',
      'To combine multiple .jar files into a single zip file on disk',
      'To automatically translate Java classes into JavaScript modules'
    ],
    correctAnswer: 1,
    explanation: 'CDS/AppCDS dumps pre-processed class metadata from JDK and application jars into a shared archive file (`.jsa`). At JVM startup, this archive is `mmap`\'ed directly into memory, skipping expensive class parsing and verification, cutting startup time by up to 50% and enabling cross-JVM memory sharing.',
    tags: ['CDS', 'AppCDS', 'JVM Startup']
  },
  {
    id: 57,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'Why was "Biased Locking" deprecated and removed in modern HotSpot versions (JEP 374)?',
    options: [
      'It introduced cryptographic vulnerabilities into SSL connections',
      'The complex cost of revoking biased locks (which required global Stop-The-World safepoints) outweighed the throughput gains on modern atomic CAS hardware and complex multithreaded workloads',
      'It was incompatible with 64-bit integer arithmetic',
      'It conflicted with Java garbage collectors in Metaspace'
    ],
    correctAnswer: 1,
    explanation: 'Biased locking assumed single-threaded monitor reuse by biasing object headers to the first thread. However, revoking a bias when another thread requested the lock required costly global STW safepoints. Modern CPU atomic instructions (CAS) have become so fast that biased locking became a net performance liability.',
    tags: ['Biased Locking', 'JEP 374', 'Lock Revocation']
  },
  {
    id: 58,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is "Loop Unrolling" in HotSpot C2 compiler optimizations?',
    options: [
      'Replacing iterative loops with recursive functions',
      'Replicating the loop body multiple times and reducing loop condition checks/branch instructions per iteration, enabling vectorization (SIMD) and instruction-level parallelism',
      'Converting for-each loops into parallel streams',
      'Moving loop variables into Metaspace'
    ],
    correctAnswer: 1,
    explanation: 'Loop unrolling duplicates the loop body across iterations (e.g. stepping 4 or 8 elements at a time). This reduces loop branching/counter overhead, enhances CPU instruction pipeline saturation, and exposes opportunities for superword vectorization (AVX/NEON SIMD registers).',
    tags: ['Loop Unrolling', 'JIT Optimization', 'Vectorization']
  },
  {
    id: 59,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What information does the `javap -c -v` command reveal about a compiled `.class` file?',
    options: [
      'Only the Java source code with comments preserved',
      'The constant pool, method bytecode instructions, stack sizes, local variable tables, line number mappings, and JVM class flags',
      'The runtime CPU temperature during compilation',
      'The git commit hash of the original repository'
    ],
    correctAnswer: 1,
    explanation: '`javap -c -v` is the standard Java class file disassembler. `-c` disassembles the bytecode instructions for all methods, and `-v` (verbose) prints the complete Constant Pool table, max stack depth, max locals, flags, line number tables, and type signatures.',
    tags: ['javap', 'Bytecode', 'Constant Pool']
  },
  {
    id: 60,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'In Java bytecode, how does the JVM handle exception handling via the "Exception Table"?',
    options: [
      'By inserting hidden if-else condition jumps after every single bytecode instruction',
      'By maintaining an Exception Table per method with [from, to, target, type] ranges; if an exception occurs between \'from\' and \'to\', the PC jumps to \'target\' handler with zero runtime overhead when no exception is thrown ("zero-cost exceptions")',
      'By allocating an OS signal handler for each try block',
      'By calling dynamic proxies whenever a catch block is reached'
    ],
    correctAnswer: 1,
    explanation: 'Java uses an Exception Table in bytecode rather than runtime instruction wrappers. The table specifies `from_pc`, `to_pc`, `handler_pc`, and `catch_type`. If execution proceeds normally, there is zero overhead. When an exception is thrown, the JVM walks the table to find the matching entry and sets the program counter to `handler_pc`.',
    tags: ['Exception Table', 'Bytecode', 'Zero-Cost Exceptions']
  },
  {
    id: 61,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the purpose of the JVM flag `-XX:+UseStringDeduplication` available with G1 and Shenandoah/ZGC?',
    options: [
      'It removes duplicate string variables in Java source code at compile time',
      'It scans heap string objects during GC and replaces duplicate `byte[]` / `char[]` backing arrays with shared array references, reducing heap consumption for repeated strings with zero application code changes',
      'It converts all Strings to StringBuilder instances automatically',
      'It forces all Strings to be interned into the native Constant Pool'
    ],
    correctAnswer: 1,
    explanation: '`-XX:+UseStringDeduplication` identifies `java.lang.String` objects on the heap with identical character contents during garbage collection and modifies them to point to a single shared backing `byte[]` array, significantly reclaiming heap without the performance pitfalls of manual `String.intern()`.',
    tags: ['String Deduplication', 'G1 GC', 'Memory Optimization']
  },
  {
    id: 62,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the difference between `-Xms` and `-Xmx` JVM flags?',
    options: [
      '-Xms sets thread stack size; -Xmx sets Metaspace maximum',
      '-Xms sets initial heap memory size; -Xmx sets maximum allowable heap memory allocation',
      '-Xms controls socket buffer size; -Xmx controls direct memory buffer size',
      '-Xms sets Young generation size; -Xmx sets Old generation size'
    ],
    correctAnswer: 1,
    explanation: '`-Xms` specifies the initial memory allocation pool size for the Java Heap at startup, while `-Xmx` sets the maximum memory allocation limit the heap can grow to before throwing `OutOfMemoryError: Java heap space`. In production, setting `-Xms` equal to `-Xmx` prevents runtime heap resizing pauses.',
    tags: ['JVM Flags', '-Xms', '-Xmx', 'Heap Size']
  },
  {
    id: 63,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'How does the JVM execute `monitorenter` and `monitorexit` bytecode instructions?',
    options: [
      'By modifying the CPU interrupt vector table',
      'By acquiring the object\'s monitor (updating lock bits in Mark Word or inflating to an ObjectMonitor structure with wait/entry lists); monitorexit decrements recursion count and releases the monitor',
      'By invoking a REST API call to an authentication daemon',
      'By allocating a new thread for every synchronized block'
    ],
    correctAnswer: 1,
    explanation: '`monitorenter` attempts to lock the object\'s monitor. If lock-free or held by the current thread, it increments the lock counter. Under contention, it inflates the lock to a heavyweight `ObjectMonitor` containing `_EntryList` and `_WaitSet`. `monitorexit` decrements the counter and releases ownership when reaching zero.',
    tags: ['monitorenter', 'monitorexit', 'ObjectMonitor', 'Bytecode']
  },
  {
    id: 64,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the "Epsilon GC" (`-XX:+UseEpsilonGC`) and what is its primary use case?',
    options: [
      'A real-time GC for avionics embedded devices',
      'A no-op garbage collector that handles memory allocation without ever reclaiming memory, designed for performance benchmarking, short-lived serverless functions, and memory pressure testing',
      'A high-throughput GC optimized for Cassandra clusters',
      'A GC algorithm that compresses memory using quantum algorithms'
    ],
    correctAnswer: 1,
    explanation: 'Epsilon GC (JEP 318) allocates memory as requested (via TLABs) but never runs any garbage collection cycles. When heap runs out, it simply terminates with `OutOfMemoryError`. It is ideal for ultra-precise JMH benchmarking (isolating GC interference) and short-lived tasks (AWS Lambda/CLI tools) that complete before filling heap.',
    tags: ['Epsilon GC', 'JEP 318', 'Benchmarking']
  },
  {
    id: 65,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What does the JVM bytecode instruction `aload_0` do inside an instance method?',
    options: [
      'Loads the integer constant 0 onto the operand stack',
      'Pushes the local variable at index 0 (which corresponds to the `this` reference in instance methods) onto the operand stack',
      'Allocates an array of size 0 on the heap',
      'Returns null from the current method frame'
    ],
    correctAnswer: 1,
    explanation: 'In instance methods, local variable slot 0 always stores the reference to the current object instance (`this`). The `aload_0` opcode loads this object reference from local variable slot 0 onto the top of the operand stack.',
    tags: ['Bytecode', 'aload_0', 'this pointer']
  },
  {
    id: 66,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is "Polymorphic Inline Caching" (PIC) in HotSpot JIT dispatch optimization?',
    options: [
      'Caching HTTP responses for polymorphic REST endpoints',
      'An optimization for dynamic method calls where the JIT generates direct conditional branches for the most frequent receiver types (Monomorphic -> Megamorphic), bypassing costly virtual table lookups for 1 or 2 dominant classes',
      'Storing polymorphic objects in CPU L3 cache',
      'A garbage collector cache for polymorphic records'
    ],
    correctAnswer: 1,
    explanation: 'When compiling `invokevirtual`, C2 monitors receiver types. If monomorphic (1 type observed), it emits a direct call with a guard check (capable of inlining). If bimorphic (2 types), it emits an `if-else` branch table. If megamorphic (>2 types), it falls back to full vtable/itable lookup.',
    tags: ['Inline Caching', 'JIT Optimization', 'Devirtualization']
  },
  {
    id: 67,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the role of the Java Flight Recorder (JFR) and JDK Mission Control (JMC)?',
    options: [
      'An automated backup tool for Java database tables',
      'A low-overhead (<1% performance impact) continuous event-tracing framework built directly into the JVM kernel for production diagnostic profiling and analysis',
      'A source code control system for Java classes',
      'An IDE plugin for debugging unit tests in Eclipse'
    ],
    correctAnswer: 1,
    explanation: 'JFR is an event-recording engine integrated deeply into the HotSpot JVM kernel. It records CPU usage, lock contention, GC pauses, allocation rates, and custom application events with negligible performance overhead (<1%), making it safe for continuous 24/7 production profiling analyzed in JDK Mission Control.',
    tags: ['JFR', 'JMC', 'Profiling', 'Diagnostics']
  },
  {
    id: 68,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What happens when a Java application encounters `java.lang.StackOverflowError`?',
    options: [
      'The JVM heap memory is exhausted',
      'The call stack depth exceeds the allocated thread stack size (configured via `-Xss`) due to infinite or excessively deep recursion',
      'Metaspace cannot load any more class files',
      'A direct byte buffer exceeds OS virtual memory limits'
    ],
    correctAnswer: 1,
    explanation: '`StackOverflowError` occurs when a thread creates more stack frames (via method invocations) than can fit in the memory allocated for that thread\'s stack (`-Xss`). This is typically caused by infinite recursion or excessively deep nested calls.',
    tags: ['StackOverflowError', '-Xss', 'Thread Stack']
  },
  {
    id: 69,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is the "Card Marking" mechanism used by Generational GCs (Parallel, CMS, G1) during heap write operations?',
    options: [
      'Encrypting memory cards with RSA keys',
      'A post-write barrier emitted by the JIT compiler whenever an object field reference is updated, marking the corresponding byte in the Card Table as "dirty" to notify the GC of old-to-young pointer creations',
      'Marking unused threads for termination',
      'Validating credit card numbers in Java payment APIs'
    ],
    correctAnswer: 1,
    explanation: 'When an old-generation object is modified to point to a young-generation object, the GC must know this pointer without scanning the entire old generation. The JIT emits a tiny post-write barrier `card_table[addr >> 9] = DIRTY`. During minor GC, only dirty cards are scanned as roots.',
    tags: ['Card Marking', 'Write Barrier', 'Generational GC']
  },
  {
    id: 70,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the "Code Cache" in the JVM, and what occurs when `-XX:ReservedCodeCacheSize` is exhausted?',
    options: [
      'A cache for `.java` source code files; it clears unused source files on disk',
      'A native memory area where the JIT compiler stores compiled machine code; when exhausted, the JIT stops compiling methods, falling back to interpreted mode with massive performance degradation',
      'A database query cache in JDBC drivers',
      'An internal JVM table storing regex patterns'
    ],
    correctAnswer: 1,
    explanation: 'The Code Cache holds native machine code generated by C1/C2 compilers, native adapters, and runtime stubs. If the Code Cache fills up, the JVM shuts down the JIT compiler, prints a warning, and executes all subsequent code in slow interpreted mode.',
    tags: ['Code Cache', 'JIT', 'HotSpot Internals']
  },
  {
    id: 71,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'How does the JVM handle primitive type arrays (e.g. `int[]`, `byte[]`) versus object arrays (`Object[]`) in bytecode?',
    options: [
      'Primitive arrays are allocated via `newarray`, while object reference arrays are allocated via `anewarray` or `multianewarray`',
      'Primitive arrays are stored in Metaspace; object arrays are stored in Heap',
      'Primitive arrays cannot exceed 256 elements in size',
      'Both use the identical bytecode instruction `alloc_array`'
    ],
    correctAnswer: 0,
    explanation: 'The JVM distinguishes array creation in bytecode: `newarray` takes a type operand (e.g., `T_INT`, `T_BYTE`) for primitive arrays, while `anewarray` creates an array of object references referencing a class type in the constant pool.',
    tags: ['Bytecode', 'newarray', 'anewarray']
  },
  {
    id: 72,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is the purpose of the HotSpot JVM "Constant Dynamic" (`condy`, JEP 309) feature introduced in Java 11?',
    options: [
      'To make all static final fields mutable at runtime',
      'To extend the constant pool with dynamically computed constants (`CONSTANT_Dynamic`), mirroring `invokedynamic` for bytecode operands with lazy bootstrap resolution',
      'To allow dynamic modification of class constants via HTTP requests',
      'To eliminate all constant pool entries from compiled classes'
    ],
    correctAnswer: 1,
    explanation: '`condy` (Constant Dynamic) brings the bootstrap method mechanism of `invokedynamic` to constant data. It allows class files to define constant pool entries whose values are computed lazily at runtime by invoking a Bootstrap Method once and caching the result permanently.',
    tags: ['condy', 'JEP 309', 'Constant Dynamic', 'Bytecode']
  },
  {
    id: 73,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the distinction between "Minor GC", "Major GC", and "Full GC" in traditional generational HotSpot collectors?',
    options: [
      'Minor GC collects Metaspace; Major GC collects Stack; Full GC reboots the OS',
      'Minor GC collects only the Young Generation (Eden and Survivor); Major GC collects the Old Generation (Tenured); Full GC collects the entire heap (Young, Old, and Metaspace) with STW compaction',
      'Minor GC runs on weekends; Major GC runs at midnight; Full GC runs on demand',
      'All three terms are completely synonymous in modern JVMs'
    ],
    correctAnswer: 1,
    explanation: 'Minor GC cleans only Young Gen when Eden fills up. Major GC cleans the Old Generation (often concurrent in G1/CMS). Full GC is a global collection that stops all threads to sweep and compact the entire Young Gen, Old Gen, and Metaspace, typically triggered by allocation failures or `System.gc()`.',
    tags: ['Minor GC', 'Major GC', 'Full GC', 'Generational GC']
  },
  {
    id: 74,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the JVM "Operand Stack" in an execution stack frame?',
    options: [
      'A hardware disk cache for memory swapping',
      'A LIFO stack structure within each method stack frame where intermediate bytecode values, parameters for method invocations, and operation results are pushed and popped during instruction execution',
      'A global queue of active thread references',
      'A table storing Java package names'
    ],
    correctAnswer: 1,
    explanation: 'The JVM is a stack-based abstract machine (unlike register-based CPU architectures). Each method frame contains an Operand Stack with a maximum depth computed at compile time. Instructions like `iadd`, `ldc`, `invokevirtual` push/pop operands directly onto this stack.',
    tags: ['Operand Stack', 'Stack Frame', 'JVM Architecture']
  },
  {
    id: 75,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is "OSR" (On-Stack Replacement) in HotSpot JIT compilation?',
    options: [
      'Replacing physical RAM sticks while the server is running',
      'The ability of the JIT compiler to replace an interpreted or lower-tier compiled method frame with freshly compiled Tier-4 native code in the middle of executing a long-running hot loop without waiting for the method to return',
      'Moving stack variables to off-heap memory',
      'Swapping thread stacks between carrier threads in Project Loom'
    ],
    correctAnswer: 1,
    explanation: 'When a method contains a long-running hot loop, the method invocation counter might be low while the loop backedge counter is high. OSR allows the JIT to compile the loop into native code and migrate the active stack frame to the native code while the loop is actively iterating.',
    tags: ['OSR', 'On-Stack Replacement', 'JIT Compilation']
  },
  {
    id: 76,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the function of the JVM flag `-XX:+PrintFlagsFinal`?',
    options: [
      'Prints all final variables declared in user code',
      'Dumps the complete list of all active JVM configuration flags, ergonomics defaults, and tuning parameters along with their effective runtime values to stdout upon startup',
      'Forces all classes to be declared final',
      'Outputs the final compilation speed of the C2 compiler'
    ],
    correctAnswer: 1,
    explanation: '`-XX:+PrintFlagsFinal` prints all ~1000+ JVM internal diagnostic, tuning, and ergonomic flags with their active runtime values and categories (e.g. `uintx InitialHeapSize = 268435456 {product}`), which is invaluable for production JVM tuning.',
    tags: ['PrintFlagsFinal', 'JVM Diagnostics', 'Tuning']
  },
  {
    id: 77,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'How are `boolean` types represented inside the JVM bytecode instruction set?',
    options: [
      'As 1-bit hardware quantum states',
      'As 32-bit `int` values (0 for false, 1 for true) on the operand stack, and 8-bit `byte` values inside boolean arrays (`boolean[]`)',
      'As explicit `bload` and `bstore` instructions with a dedicated 1-bit register',
      'As string literals "true" and "false"'
    ],
    correctAnswer: 1,
    explanation: 'The JVM instruction set lacks dedicated instructions for boolean arithmetic. At the bytecode level, boolean local variables and expressions operate as 32-bit integers (`iconst_0`, `iconst_1`, `ireturn`). In arrays (`boolean[]`), elements are encoded as 1-byte values (same as `byte[]`).',
    tags: ['Bytecode', 'Boolean Representation', 'JVM Types']
  },
  {
    id: 78,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Master',
    question: 'What is "Class Unloading" in the JVM and when does it occur?',
    options: [
      'Classes are unloaded whenever all instances of the class are garbage collected, regardless of classloader state',
      'A class can only be unloaded if and only if its defining ClassLoader instance is completely unreachable and garbage collected along with all of its loaded classes and instances',
      'Bootstrap classes are unloaded every 10 minutes to conserve memory',
      'Classes are never unloaded under any circumstances in HotSpot'
    ],
    correctAnswer: 1,
    explanation: 'Classes are strongly referenced by their defining `ClassLoader`. As long as the ClassLoader is reachable, all its loaded classes remain pinned in Metaspace. Class unloading happens during Full GC / Metaspace GC only when a custom ClassLoader itself becomes unreachable and collected.',
    tags: ['Class Unloading', 'ClassLoaders', 'Metaspace']
  },
  {
    id: 79,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Expert',
    question: 'What is the purpose of the JVM "Method Inlining" optimization in C2 compiler?',
    options: [
      'Formatting Java source code methods to sit on one line',
      'Replacing a method call site directly with the body of the called method, eliminating method call overhead (stack frame creation, parameter passing, return jumps) and unlocking subsequent optimizations like constant folding and dead code elimination',
      'Compressing method bytecode into ZIP archives',
      'Inlining CSS styles into HTML views'
    ],
    correctAnswer: 1,
    explanation: 'Method inlining is the foundational JIT optimization. By substituting the callee\'s bytecode directly into the caller, it eliminates call overhead and expands the optimization scope, allowing C2 to perform cross-method escape analysis, loop vectorization, and constant propagation.',
    tags: ['Method Inlining', 'C2 Optimizer', 'JIT Optimization']
  },
  {
    id: 80,
    category: 'jvm-internals',
    categoryTitle: 'JVM Internals & Bytecode',
    difficulty: 'Advanced',
    question: 'What happens when `-XX:+HeapDumpOnOutOfMemoryError` is set and the JVM runs out of heap memory?',
    options: [
      'The JVM reboots the operating system automatically',
      'The JVM writes a snapshot of all heap objects and references to an HPROF binary file on disk before shutting down or throwing OOM, enabling post-mortem root-cause leak analysis',
      'The JVM deletes all temporary files in /tmp',
      'The JVM allocates emergency virtual memory from swap space'
    ],
    correctAnswer: 1,
    explanation: 'When an `OutOfMemoryError` occurs, `-XX:+HeapDumpOnOutOfMemoryError` automatically dumps the entire live heap into an `.hprof` binary file (configured via `-XX:HeapDumpPath=...`). This dump can be analyzed in tools like Eclipse MAT or JProfiler to pinpoint memory leaks.',
    tags: ['HeapDump', 'OOM', 'Diagnostics', 'HPROF']
  }
];
