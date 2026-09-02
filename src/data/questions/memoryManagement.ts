import { Question } from '../../types';

export const memoryQuestions: Question[] = [
  {
    id: 161,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How do `PhantomReference` objects differ from `WeakReference` and `SoftReference` regarding when they are enqueued and how `get()` behaves?',
    options: [
      'PhantomReference objects are enqueued before object allocation',
      'PhantomReference.get() always returns null, and the phantom reference is enqueued into its ReferenceQueue ONLY AFTER the object has been finalized/ready for reclamation, allowing precise post-mortem native resource cleanup without object resurrection',
      'PhantomReference keeps objects alive in old generation permanently',
      'PhantomReference is only used for primitive types'
    ],
    correctAnswer: 1,
    explanation: '`SoftReference` is cleared when memory is low. `WeakReference` is cleared during the next GC cycle. `PhantomReference.get()` always returns `null` to prevent object resurrection. It is enqueued only after the object is completely unreachable and finalized, providing a robust mechanism to free associated off-heap/native memory.',
    tags: ['PhantomReference', 'ReferenceQueue', 'Object Resurrection', 'Memory Management']
  },
  {
    id: 162,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'Why was `Object.finalize()` deprecated in Java 9 and marked for removal in Java 18 (JEP 421), and what standard API replaced it?',
    options: [
      'Because finalize() consumed too much disk space; replaced by System.exit()',
      'Because finalizers have unpredictable execution timing, degrade GC throughput, risk deadlocks and object resurrection, and ignore uncaught exceptions; replaced by `java.lang.ref.Cleaner` and `AutoCloseable` with try-with-resources',
      'Because finalize() was restricted to 32-bit platforms',
      'Because finalizers caused compile-time errors in Java 11'
    ],
    correctAnswer: 1,
    explanation: 'Finalizers caused severe issues: slow GC pause times (finalizable objects must survive at least two GC cycles), security vulnerabilities (subclasses resurrecting objects during exception in constructor), and arbitrary execution order. The modern approach is `java.lang.ref.Cleaner` paired with `AutoCloseable`.',
    tags: ['finalize()', 'Cleaner API', 'JEP 421', 'Resource Management']
  },
  {
    id: 163,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How does the Foreign Function & Memory (FFM) API (JEP 454 in Java 22+) revolutionize off-heap memory management compared to legacy `sun.misc.Unsafe`?',
    codeSnippet: `try (Arena arena = Arena.ofConfined()) {
    MemorySegment segment = arena.allocate(1024, 8);
    segment.set(ValueLayout.JAVA_INT, 0, 42);
    int value = segment.get(ValueLayout.JAVA_INT, 0);
}`,
    options: [
      'It moves all Java heap allocations into MySQL databases',
      'It provides safe, deterministic off-heap allocation via `Arena` lifecycles (Confined, Shared, Global) with spatial, temporal, and thread-confinement safety bounds, eliminating JVM crashes (segfaults) without sacrificing C-level performance',
      'It requires running Java in WebAssembly mode',
      'It disables Garbage Collection globally'
    ],
    correctAnswer: 1,
    explanation: '`sun.misc.Unsafe` has no bounds checks or lifecycle guarantees—freeing memory twice or accessing stale memory crashes the entire JVM with a segmentation fault. The FFM API introduces `MemorySegment` and `Arena`: arenas guarantee that all allocated off-heap memory is freed deterministically upon scope exit while enforcing strict spatial bounds and temporal safety.',
    tags: ['FFM API', 'Arena', 'MemorySegment', 'Project Panama', 'Java 22']
  },
  {
    id: 164,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'How does a memory leak typically occur when using `ThreadLocal` in application servers with thread pools (e.g. Tomcat or ExecutorService)?',
    options: [
      'ThreadLocal variables are automatically saved to disk',
      'Because pool worker threads do not terminate, the thread\'s `ThreadLocalMap` retains strong references to values via WeakReference keys; if the ClassLoader or large object in the value is not explicitly removed via `remove()`, it cannot be garbage collected, causing Metaspace or Heap leaks',
      'ThreadLocal clears all CPU registers upon method exit',
      'ThreadLocal allocations bypass heap limits'
    ],
    correctAnswer: 1,
    explanation: 'In thread pools, threads live for the lifetime of the application. Even though `ThreadLocalMap` entries use `WeakReference` for the keys, the *value* is strongly referenced. If a web application is redeployed without calling `threadLocal.remove()`, the value (and its WebAppClassLoader) remains permanently pinned, causing major OOM leaks.',
    tags: ['ThreadLocal Leaks', 'ThreadLocalMap', 'ClassLoader Leaks', 'Memory Leaks']
  },
  {
    id: 165,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'What is Native Memory Tracking (NMT) and how is it used to diagnose off-heap memory leaks in the JVM?',
    codeSnippet: `# Command line
-XX:NativeMemoryTracking=detail
# Diagnostic jcmd
jcmd <pid> VM.native_memory baseline
jcmd <pid> VM.native_memory detail.diff`,
    options: [
      'An antivirus tool for scanning Java jar files',
      'A JVM diagnostic feature that tracks native OS memory allocations by category (Java Heap, Class metadata, Thread stacks, GC structures, Code Cache, Direct Buffers) and computes diffs over time via `jcmd`',
      'A compiler flag that enables C++ compilation',
      'A hardware monitor for motherboard RAM voltage'
    ],
    correctAnswer: 1,
    explanation: 'NMT tracks all internal native memory allocated by the HotSpot JVM. By establishing a `baseline` and later taking a `detail.diff` using `jcmd`, engineers can see exactly which subsystem (e.g., direct buffers, thread stacks, or symbol tables) is leaking native memory outside the Java heap.',
    tags: ['NMT', 'Native Memory Tracking', 'jcmd', 'Diagnostics']
  },
  {
    id: 166,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How does `ByteBuffer.allocateDirect()` allocate memory, and how is it reclaimed if not explicitly freed via Cleaner?',
    options: [
      'It allocates memory on the Java Eden heap and is collected in Minor GC',
      'It invokes `malloc()` in native OS memory outside the Java Heap; it holds a `sun.misc.Cleaner` (PhantomReference) that invokes `free()` when the direct buffer object becomes unreachable during a GC cycle (or triggers emergency `System.gc()` if MaxDirectMemorySize is reached)',
      'It stores byte buffers on an external network cache',
      'It allocates memory in Metaspace'
    ],
    correctAnswer: 1,
    explanation: '`allocateDirect()` allocates off-heap memory using `Unsafe.allocateMemory`. The `DirectByteBuffer` object on the Java heap contains a `Cleaner` referencing the native memory address. When the heap object is GC\'d, the cleaner frees the native memory. If native memory fills up before a heap GC runs, `Bits.reserveMemory` forces a `System.gc()`.',
    tags: ['DirectByteBuffer', 'Off-Heap', 'Cleaner', 'MaxDirectMemorySize']
  },
  {
    id: 167,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What is the memory overhead of an empty `java.lang.String` object in Java 17 on a 64-bit JVM with Compressed OOPs enabled?',
    options: [
      '0 bytes',
      '24 bytes (12 bytes object header + 4 bytes byte[] reference + 4 bytes int hash + 1 byte coder + 3 bytes padding) plus an empty byte array object (16 bytes) = ~40 bytes total',
      '128 bytes',
      '8 bytes'
    ],
    correctAnswer: 1,
    explanation: 'In Java 9+ (Compact Strings), `String` has: 12-byte header, 4-byte `byte[] value` reference, 4-byte `int hash`, 1-byte `byte coder`, 1-byte `boolean hashIsZero` + padding = 24 bytes. The empty `byte[]` array adds 16 bytes (12 header + 4 length + 0 data), resulting in ~40 bytes for a single empty string.',
    tags: ['Compact Strings', 'Memory Layout', 'Object Size']
  },
  {
    id: 168,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'How does `SoftReference` differ from `WeakReference` in garbage collection prioritization?',
    options: [
      'SoftReference is only for strings, WeakReference is for numbers',
      'WeakReference is cleared as soon as no strong references exist during the very next GC cycle; SoftReference is cleared ONLY when the JVM experiences critical memory pressure and is about to throw `OutOfMemoryError`, making it suitable for memory-sensitive caches',
      'SoftReference is never garbage collected',
      'WeakReference keeps objects alive for at least 1 hour'
    ],
    correctAnswer: 1,
    explanation: '`SoftReference` is designed for memory-sensitive caches: the GC will retain softly reachable objects as long as heap is sufficient, clearing them before throwing an OOM (tuned via `-XX:SoftRefLRUPolicyMSPerMB`). `WeakReference` is aggressively cleared on the very next GC cycle, ideal for canonicalizing mappings.',
    tags: ['SoftReference', 'WeakReference', 'GC Eviction', 'Caching']
  },
  {
    id: 169,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How do you calculate the exact memory footprint of a Java class using the Java Object Layout (JOL) tool?',
    codeSnippet: `System.out.println(ClassLayout.parseClass(MyClass.class).toPrintable());`,
    options: [
      'JOL connects to a remote server to download memory specifications',
      'JOL parses JVM internal field offsets, header size, compressed references, and alignment padding to display the exact byte-by-byte memory layout and field packing in stdout',
      'JOL executes C++ code in a separate container',
      'JOL only works for Android Dalvik VM'
    ],
    correctAnswer: 1,
    explanation: 'Java Object Layout (JOL) is the OpenJDK tool for analyzing object layout. It queries `Unsafe.objectFieldOffset` to show exact header sizes, field reordering for alignment (e.g. packing primitives before references), and 8-byte boundary padding.',
    tags: ['JOL', 'Memory Layout', 'OpenJDK', 'Field Alignment']
  },
  {
    id: 170,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What happens when a direct buffer exceeds `-XX:MaxDirectMemorySize`?',
    options: [
      'The JVM automatically expands the physical RAM of the host machine',
      'The JVM throws `java.lang.OutOfMemoryError: Direct buffer memory`',
      'The buffer is converted into a Java heap array',
      'The buffer data is written to a swap file on disk'
    ],
    correctAnswer: 1,
    explanation: 'Direct memory allocation is bounded by `-XX:MaxDirectMemorySize` (which defaults to `-Xmx` if unspecified). When direct buffer allocations exceed this limit, the JVM attempts a full GC to trigger cleaners; if space is still unavailable, it throws `OutOfMemoryError: Direct buffer memory`.',
    tags: ['MaxDirectMemorySize', 'DirectByteBuffer', 'OutOfMemoryError']
  },
  {
    id: 171,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'Why does improper use of `String.intern()` in high-volume applications cause performance degradation or memory pressure?',
    options: [
      'Because interned strings are stored in the JVM String Table (native hash table); if hundreds of thousands of unique strings are interned into a default small table (`-XX:StringTableSize`), hash bucket collisions degrade `intern()` lookups from O(1) to O(N)',
      'Because String.intern() deletes all other strings from the heap',
      'Because String.intern() converts strings into integers',
      'Because String.intern() is deprecated in Java 17'
    ],
    correctAnswer: 0,
    explanation: 'The JVM String Table is a fixed-size native hash map. In older JVMs, it resided in PermGen. In modern JVMs, it resides in native memory, but inserting millions of distinct strings without increasing `-XX:StringTableSize` causes extreme bucket collisions, turning every `intern()` call into a slow O(N) linked-list traversal.',
    tags: ['String.intern', 'String Table', 'Performance', 'Hash Collision']
  },
  {
    id: 172,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'What is the 8-byte Alignment Rule (Object Alignment) in 64-bit HotSpot JVM and why does it exist?',
    options: [
      'To ensure that object sizes in bytes are always multiples of 8, allowing the 3 lowest bits of object addresses to be zeros (enabling Compressed OOPs) and matching CPU 64-bit bus data alignment for optimal memory bandwidth',
      'To limit arrays to 8 elements maximum',
      'To prevent threads from reading memory concurrently',
      'To encrypt object pointers in memory'
    ],
    correctAnswer: 0,
    explanation: 'CPUs read memory most efficiently across aligned word boundaries (64 bits = 8 bytes). HotSpot pads all objects to multiples of 8 bytes. This guarantees the lowest 3 bits of every valid object address are `000`, allowing Compressed OOPs to store 35-bit addresses in 32-bit pointers.',
    tags: ['Object Alignment', 'Compressed OOPs', 'CPU Memory Bus']
  },
  {
    id: 173,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'How do you detect a memory leak using a JVM Heap Dump analyzer like Eclipse Memory Analyzer (MAT)?',
    options: [
      'By looking for syntax errors in Java source code',
      'By inspecting the "Dominator Tree" and "Leak Suspects" report to identify objects that retain large amounts of Retained Heap and tracing their GC Root paths (Shortest Path to GC Roots)',
      'By counting the number of threads created by the OS',
      'By checking the CPU temperature logs'
    ],
    correctAnswer: 1,
    explanation: 'In Eclipse MAT, the Dominator Tree calculates the "Retained Heap" (the memory that would be freed if an object were collected). Walking the reference path from the retained object back to its GC Root (e.g. static variable or active thread) reveals what is preventing it from being garbage collected.',
    tags: ['Eclipse MAT', 'Dominator Tree', 'GC Roots', 'Retained Heap']
  },
  {
    id: 174,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'What constitutes a "GC Root" in Java garbage collection reachability analysis?',
    options: [
      'Any file located on the root filesystem `/`',
      'Active local variables and parameters in thread stack frames, JNI global and local native references, active Thread objects, loaded system classes (static fields), and objects held by JVM synchronization monitors',
      'Only objects allocated in the Eden space',
      'Only instances of java.lang.Class'
    ],
    correctAnswer: 1,
    explanation: 'GC Roots are the entry points for reachability graphs. They include: 1) Local variables and operand stack references in active Java thread stacks, 2) JNI local and global references, 3) Static variables of loaded classes, 4) Active Thread instances, 5) System classes loaded by bootstrap loader.',
    tags: ['GC Roots', 'Reachability Analysis', 'Garbage Collection']
  },
  {
    id: 175,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How does the Java 21+ `SegmentAllocator` in the Foreign Function & Memory API provide high-performance arena-based sub-allocations?',
    codeSnippet: `try (Arena arena = Arena.ofConfined()) {
    SegmentAllocator allocator = SegmentAllocator.slicingAllocator(arena.allocate(1024 * 1024));
    MemorySegment seg1 = allocator.allocate(ValueLayout.JAVA_INT, 100);
    MemorySegment seg2 = allocator.allocate(ValueLayout.JAVA_LONG, 200);
}`,
    options: [
      'It invokes OS `malloc()` on every single integer allocated',
      'It pre-allocates a large contiguous memory segment and slices smaller sub-segments using lock-free pointer bumps with zero individual free() overhead, reclaiming the entire block at once when the parent Arena closes',
      'It transfers segments across network sockets using SSL',
      'It encrypts memory segments with AES-256'
    ],
    correctAnswer: 1,
    explanation: '`SegmentAllocator.slicingAllocator` acts like an off-heap bump allocator / TLAB. Instead of issuing costly OS `malloc()` system calls for every tiny allocation, it slices from a pre-allocated `MemorySegment`, offering near-zero allocation cost and bulk deallocation upon Arena scope exit.',
    tags: ['SegmentAllocator', 'FFM API', 'Memory Slicing', 'Project Panama']
  },
  {
    id: 176,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What is the difference between "Shallow Size" and "Retained Size" of an object in Java memory profiling?',
    options: [
      'Shallow size is the size on disk; retained size is the size in RAM',
      'Shallow size is the memory consumed by the object itself (header + fields); Retained size is the shallow size plus the memory of all objects that are reachable exclusively from this object (and would be freed if it were collected)',
      'Shallow size is for primitive types; retained size is for reference types',
      'Both terms refer to the exact same metric'
    ],
    correctAnswer: 1,
    explanation: 'Shallow size is the bytes occupied by the object\'s own fields and header. Retained size is the sum of shallow sizes of the object and all other objects that are transitively reachable *only* through this object (i.e. the total memory that GC could reclaim if this object were discarded).',
    tags: ['Shallow Size', 'Retained Size', 'Profiling', 'Heap Dump']
  },
  {
    id: 177,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'Why does appending to a static `List` or `Map` without eviction bounds always lead to a memory leak in long-running services?',
    options: [
      'Because static fields are reachable from GC Roots (the loaded Class object) for the entire lifetime of the JVM, preventing any accumulated element from ever being garbage collected',
      'Because static collections are stored in CPU L1 cache',
      'Because static lists are converted to immutable arrays',
      'Because the JVM forbids more than 1000 items in static fields'
    ],
    correctAnswer: 0,
    explanation: 'Static variables are rooted in their defining `Class` object, which is referenced by its `ClassLoader`. Because GC Roots are never collected while the application runs, unbounded static collections permanently retain every appended object, eventually causing `OutOfMemoryError: Java heap space`.',
    tags: ['Static Memory Leaks', 'GC Roots', 'Heap Space']
  },
  {
    id: 178,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How does the JVM handle "Unaligned Memory Access" in the Foreign Memory API and ByteBuffers across CPU architectures (x86 vs ARM)?',
    options: [
      'ARM CPUs crash with a hardware bus error if memory is unaligned; the FFM API enforces explicit alignment constraints in ValueLayout descriptors (`ValueLayout.JAVA_INT.withByteAlignment(4)`) to ensure cross-platform safety',
      'All CPUs execute unaligned memory access with zero performance penalty',
      'Java converts all memory accesses into string operations',
      'The JVM reboots if unaligned memory is accessed'
    ],
    correctAnswer: 0,
    explanation: 'While x86 hardware handles unaligned memory reads with only minor latency penalties, architectures like ARM or SPARC can suffer major penalties or trigger hardware fault exceptions (`SIGBUS`). The FFM API enforces byte alignment constraints on `ValueLayout` by default, catching misalignments early at runtime.',
    tags: ['Memory Alignment', 'FFM API', 'ValueLayout', 'Hardware Architecture']
  },
  {
    id: 179,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What is the purpose of the `-XX:SoftRefLRUPolicyMSPerMB` JVM tuning flag?',
    options: [
      'It sets the maximum number of threads in the JVM',
      'It controls the survival duration of softly reachable (`SoftReference`) objects in milliseconds per megabyte of free heap space before the GC reclaims them',
      'It configures socket connection timeouts',
      'It sets the logging level for Garbage Collection'
    ],
    correctAnswer: 1,
    explanation: 'HotSpot calculates `SoftReference` lifetime as `(free_heap_mb) * SoftRefLRUPolicyMSPerMB`. The default is 1000 ms per MB of free space. Increasing this flag preserves cached soft references longer; decreasing it reclaims soft references more aggressively to keep heap free.',
    tags: ['SoftReference', 'JVM Tuning', 'SoftRefLRUPolicyMSPerMB']
  },
  {
    id: 180,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'What is "False Retention" in Java lambda closures and inner classes causing hidden memory leaks?',
    codeSnippet: `public class HeavyReportGenerator {
    private byte[] hugeData = new byte[100 * 1024 * 1024]; // 100MB

    public Runnable getAction() {
        return () -> System.out.println("Processing report ID: " + getReportId());
    }
    private int getReportId() { return 1; }
}`,
    options: [
      'The lambda creates a static method in Metaspace',
      'The lambda captures instance method `getReportId()` which implicitly captures the enclosing `this` reference (`HeavyReportGenerator`), keeping the entire 100MB instance pinned in memory even if the caller only wanted the lightweight runnable',
      'The lambda compiles to an infinite loop',
      'The bytecode verifier deletes the hugeData array'
    ],
    correctAnswer: 1,
    explanation: 'Non-static inner classes and lambdas that access instance methods or fields hold an implicit strong reference to the outer enclosing class (`this`). If the lambda or listener is long-lived, the entire outer class (and its large internal state) cannot be garbage collected, creating a subtle memory leak.',
    tags: ['Lambda Capture', 'Memory Leaks', 'Implicit Reference', 'Enclosing Class']
  },
  {
    id: 181,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'Why does unclosed `InputStream`, `OutputStream`, or `Connection` resources cause resource leaks even with GC?',
    options: [
      'Because the Garbage Collector only manages Java heap memory; underlying OS file descriptors, sockets, and native handles remain allocated in OS kernel space until explicitly closed',
      'Because unclosed streams cause immediate CPU overheating',
      'Because the JVM automatically shuts down when 10 streams are open',
      'Because streams are allocated on the OS swap partition'
    ],
    correctAnswer: 0,
    explanation: 'The JVM Garbage Collector reclaims Java heap objects, but operating system file descriptors, socket handles, and database connections are native kernel resources. Exhausting OS file descriptors leads to `IOException: Too many open files`. Always use `try-with-resources`.',
    tags: ['Resource Leaks', 'File Descriptors', 'try-with-resources']
  },
  {
    id: 182,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'How do you prevent classloader memory leaks when developing modular plug-in architectures in Java?',
    options: [
      'By using `System.exit(0)` after loading each plugin',
      'By ensuring that plugins unregister all event listeners, deregister JDBC drivers (`DriverManager.deregisterDriver`), clean ThreadLocals, and stop active threads before unloading the plugin\'s `URLClassLoader`',
      'By compiling all plugins with Java 6',
      'By storing plugins in the root classpath'
    ],
    correctAnswer: 1,
    explanation: 'A `ClassLoader` cannot be unloaded if any single class or instance loaded by it is still referenced anywhere in the JVM. Lingering JDBC drivers, static registries, or running background threads will pin the entire ClassLoader and all its loaded class metadata in Metaspace.',
    tags: ['ClassLoader Leaks', 'Metaspace', 'Plugin Architecture']
  },
  {
    id: 183,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'What is the function of `ReferenceQueue<? super T>` when monitoring weak and phantom references?',
    options: [
      'It sorts objects in heap by memory size',
      'It acts as a notification queue where the garbage collector enqueues reference objects (`WeakReference`, `PhantomReference`) after their referents change reachability, allowing cleanup threads to poll the queue without polling the entire heap',
      'It pauses the garbage collector during reference registration',
      'It serializes references to disk'
    ],
    correctAnswer: 1,
    explanation: 'When creating a `Reference(referent, queue)`, the JVM automatically appends the reference wrapper to the `ReferenceQueue` once the referent is collected. Background cleanup threads call `queue.poll()` or `queue.remove()` to clean associated native handles efficiently.',
    tags: ['ReferenceQueue', 'PhantomReference', 'Garbage Collection']
  },
  {
    id: 184,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What does `-XX:+ExplicitGCInvokesConcurrent` do when application code calls `System.gc()`?',
    options: [
      'It ignores System.gc() completely',
      'It transforms the synchronous Stop-The-World full GC caused by System.gc() into a concurrent background collection cycle (in G1 or CMS/ZGC), preventing catastrophic application freezes',
      'It reboots the JVM in background mode',
      'It dumps thread stacks to stdout'
    ],
    correctAnswer: 1,
    explanation: 'By default, `System.gc()` triggers a synchronous Stop-The-World Full GC that halts all threads. Enabling `-XX:+ExplicitGCInvokesConcurrent` instructs the JVM to initiate a concurrent GC cycle instead, greatly reducing pause times if third-party libraries call `System.gc()`.',
    tags: ['System.gc()', 'ExplicitGCInvokesConcurrent', 'JVM Tuning']
  },
  {
    id: 185,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'How does the HotSpot JVM reorder fields inside an object to minimize padding waste?',
    options: [
      'It orders fields alphabetically by field name',
      'It groups fields by size: doubles and longs (8 bytes), then ints and floats (4 bytes), then shorts and chars (2 bytes), then booleans and bytes (1 byte), and finally object references, packing them tightly to maximize alignment and eliminate internal padding gaps',
      'It keeps fields strictly in the exact order declared in source code',
      'It places all reference fields before primitives'
    ],
    correctAnswer: 1,
    explanation: 'To satisfy alignment rules with minimal internal padding, HotSpot reorders fields in memory: 8-byte primitives first, followed by 4-byte, 2-byte, 1-byte primitives, and finally references. This packing optimization minimizes wasted alignment padding.',
    tags: ['Field Reordering', 'Memory Packing', 'Object Layout']
  },
  {
    id: 186,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How does `sun.misc.Unsafe.getInt(Object base, long offset)` bypass Java language type safety checks?',
    options: [
      'It converts Java source code into Python scripts',
      'It reads raw memory directly at pointer address `base + offset` via native CPU load instructions, bypassing all JVM access control, bounds checking, and type checks, which can crash the JVM if the offset is invalid',
      'It executes reflection checks via SecurityManager',
      'It compiles the method with GraalVM'
    ],
    correctAnswer: 1,
    explanation: '`Unsafe` provides raw hardware memory access. `getInt(base, offset)` calculates the exact native memory address and issues a direct CPU memory read without checking array bounds, object types, or access modifiers.',
    tags: ['sun.misc.Unsafe', 'Memory Offsets', 'Raw Memory']
  },
  {
    id: 187,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What is a "Dangling Pointer" or "Use-After-Free" bug and how does Java\'s managed heap prevent it?',
    options: [
      'A pointer to an IP address that went offline',
      'A memory safety violation in unmanaged languages (C/C++) where memory is freed while pointers still reference it; Java prevents this by having the Garbage Collector automatically reclaim memory only when an object is proven completely unreachable from all GC Roots',
      'A pointer stored in CPU registers',
      'A syntax error in Java class files'
    ],
    correctAnswer: 1,
    explanation: 'In C/C++, manual `free()` can leave dangling pointers that cause use-after-free corruption and security exploits. Java\'s GC guarantees memory safety: memory cannot be reclaimed as long as any live reference to it exists.',
    tags: ['Memory Safety', 'Use-After-Free', 'Garbage Collection']
  },
  {
    id: 188,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'What is the purpose of `java.lang.ref.Cleaner.Cleanable.clean()`?',
    options: [
      'It clears the console output in IDEs',
      'It explicitly triggers the registered cleanup action (freeing native resources) and unregisters the cleanable so it will not run again when the object is collected',
      'It forces a Full GC immediately',
      'It deletes compiled class files from the target directory'
    ],
    correctAnswer: 1,
    explanation: 'When using `Cleaner`, calling `clean()` explicitly runs the cleanup action (e.g. freeing off-heap memory or closing a native handle) and deregisters the `Cleanable`, ensuring idempotent execution whether closed manually or triggered by GC.',
    tags: ['Cleaner API', 'Cleanable', 'Idempotent Cleanup']
  },
  {
    id: 189,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How do Memory Mapped Files (`FileChannel.map()`) allow reading gigabyte-sized files with minimal Java heap usage?',
    options: [
      'By reading all bytes into a byte array in Young Gen',
      'By mapping a region of the file directly into process virtual address space (`mmap`), allowing the OS kernel page cache to handle demand-paging of file pages directly into physical memory without copying data into Java heap memory',
      'By compressing the file using Brotli compression',
      'By streaming file contents over localhost HTTP sockets'
    ],
    correctAnswer: 1,
    explanation: '`FileChannel.map(MapMode.READ_ONLY, 0, size)` creates a `MappedByteBuffer` mapped via the OS `mmap()` system call. The OS pages file data in and out of physical memory on-demand directly into the buffer\'s virtual address space, requiring zero Java heap allocation.',
    tags: ['mmap', 'Memory Mapped Files', 'FileChannel', 'MappedByteBuffer']
  },
  {
    id: 190,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What happens when `java.lang.OutOfMemoryError: Metaspace` is thrown?',
    options: [
      'The CPU run out of registers',
      'The memory allocated for class metadata, method structures, and runtime constant pools has exceeded `-XX:MaxMetaspaceSize` (often caused by dynamic proxy or bytecode generation without class unloading)',
      'The thread stack depth exceeded limits',
      'The disk space on the server is 100% full'
    ],
    correctAnswer: 1,
    explanation: '`OutOfMemoryError: Metaspace` indicates that class metadata storage in native memory is exhausted. Common causes include dynamic class generation (CGLIB, Spring, ByteBuddy) where generated classes are loaded into leaking custom classloaders that are never collected.',
    tags: ['Metaspace', 'OutOfMemoryError', 'Class Metadata']
  },
  {
    id: 191,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'What is the impact of "Object Allocation Rate" on JVM garbage collection pauses?',
    options: [
      'Allocation rate has zero impact on GC performance',
      'A high allocation rate fills the Eden space rapidly, triggering frequent Minor GCs and potentially causing premature promotion of short-lived objects into the Old Generation, resulting in frequent Full GCs and throughput degradation',
      'High allocation rate automatically increases CPU clock speed',
      'High allocation rate disables Tiered Compilation'
    ],
    correctAnswer: 1,
    explanation: 'Allocating objects at high rates (e.g. gigabytes per second) forces frequent Young GCs. If objects cannot fit in Survivor spaces before the next collection, they are prematurely promoted to Old Gen, causing fragmentation and triggering expensive Major/Full GC cycles.',
    tags: ['Allocation Rate', 'Premature Promotion', 'Eden Space', 'GC Tuning']
  },
  {
    id: 192,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'What is the "Survivor Space Overflow / Premature Tenuring" problem in Generational GCs?',
    options: [
      'When survivor spaces fill up during a young GC, surviving objects that exceed the survivor space capacity bypass the tenuring threshold and are promoted immediately to the Old Generation, increasing old gen fragmentation',
      'When objects in survivor space are deleted by the operating system',
      'When survivor spaces are converted into Metaspace',
      'When JVM threads cannot access survivor space'
    ],
    correctAnswer: 0,
    explanation: 'If the total size of surviving objects during a Minor GC exceeds the capacity of the target Survivor space (`To Space`), the JVM immediately promotes the excess objects directly to Tenured/Old generation regardless of their `age` count, polluting Old Gen with short-lived objects.',
    tags: ['Survivor Space', 'Premature Tenuring', 'Generational GC']
  },
  {
    id: 193,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What does `-XX:MaxTenuringThreshold` configure in the JVM garbage collector?',
    options: [
      'The maximum number of threads in the thread pool',
      'The maximum number of Minor GC cycles an object can survive in Survivor spaces before being promoted to the Old Generation (default up to 15 in HotSpot)',
      'The maximum memory size of a single object in bytes',
      'The maximum timeout for synchronized blocks'
    ],
    correctAnswer: 1,
    explanation: 'HotSpot tracks the age of young objects in their 4-bit Mark Word header (0 to 15). Each time an object survives a Minor GC, its age increments. When age exceeds `MaxTenuringThreshold` (or adaptive dynamic age threshold), it is promoted to the Old Gen.',
    tags: ['MaxTenuringThreshold', 'Tenuring Age', 'GC Promotion']
  },
  {
    id: 194,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'How do you monitor JVM memory metrics programmatically in Java code?',
    options: [
      'By reading `java.lang.management.ManagementFactory.getMemoryMXBean()` and `ManagementFactory.getGarbageCollectorMXBeans()`',
      'By executing `System.getProperty("jvm.memory")`',
      'By querying the Windows Registry',
      'By parsing `/etc/hosts`'
    ],
    correctAnswer: 0,
    explanation: 'Java provides JMX management beans in `java.lang.management`: `MemoryMXBean.getHeapMemoryUsage()` returns used/committed/max heap bytes, and `GarbageCollectorMXBean` provides GC cycle counts and cumulative pause times.',
    tags: ['JMX', 'MemoryMXBean', 'GarbageCollectorMXBean', 'Monitoring']
  },
  {
    id: 195,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'What is the role of `java.lang.ref.Reference.reachabilityFence(Object ref)` introduced in Java 9?',
    codeSnippet: `public void process() {
    long handle = this.nativeHandle;
    NativeBridge.doWork(handle);
    Reference.reachabilityFence(this); // Why is this here?
}`,
    options: [
      'It builds a cryptographic barrier around the object',
      'It ensures that the object referenced by `ref` remains strongly reachable from the start of the method until the fence instruction, preventing the JIT/GC from aggressively collecting `this` and running cleaners while its native handle is still in use',
      'It forces the object to be copied to off-heap memory',
      'It prevents other threads from reading object fields'
    ],
    correctAnswer: 1,
    explanation: 'HotSpot JIT compilers can determine that `this` is no longer dereferenced after reading `this.nativeHandle`. In long-running native methods, GC could run and execute a `Cleaner` that frees `nativeHandle` *while* `NativeBridge.doWork(handle)` is actively executing. `reachabilityFence(this)` keeps `this` reachable until that exact line.',
    tags: ['reachabilityFence', 'JEP 193', 'Cleaner Safety', 'JIT Optimization']
  },
  {
    id: 196,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What is the difference between "Committed Memory" and "Used Memory" in Java Heap metrics?',
    options: [
      'Committed is the amount of virtual memory guaranteed for use by the OS to the JVM; Used is the actual amount of memory currently occupied by live and dead Java objects inside that committed space',
      'Committed is memory on disk; Used is memory in RAM',
      'Used is always larger than Committed',
      'Committed refers to Metaspace only'
    ],
    correctAnswer: 0,
    explanation: '`Committed` memory is the amount of physical/virtual address space the OS has allocated to the JVM heap. `Used` memory is the actual bytes currently holding objects. `Used <= Committed <= Max`.',
    tags: ['Committed Memory', 'Used Memory', 'JMX Metrics']
  },
  {
    id: 197,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Expert',
    question: 'What is "Compaction" in garbage collection and why is it necessary?',
    options: [
      'Compressing `.class` files into `.jar` archives',
      'Relocating live objects to one contiguous end of the heap memory and updating all references, eliminating fragmented memory gaps so large new objects can be allocated contiguously',
      'Encrypting memory pages',
      'Reducing thread priority of idle threads'
    ],
    correctAnswer: 1,
    explanation: 'After non-compacting collectors (like Mark-Sweep) reclaim dead objects, the heap becomes fragmented with scattered free slots. If a large object or array cannot find a contiguous block, allocation fails with OOM even if total free space is large. Compaction slides live objects together to create contiguous free space.',
    tags: ['Compaction', 'Memory Fragmentation', 'Garbage Collection']
  },
  {
    id: 198,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How does the JVM allocate memory for 128-bit and 256-bit SIMD registers when executing Vector API (JEP 448) operations?',
    options: [
      'By allocating vectors on the Java heap as Float[] arrays',
      'By mapping vector operations directly to CPU hardware vector registers (AVX-512, ARM SVE) without heap allocations, executing parallel SIMD lane arithmetic with zero memory bandwidth overhead',
      'By delegating computations to an external GPU server',
      'By storing vectors in Metaspace'
    ],
    correctAnswer: 1,
    explanation: 'The Vector API provides an expressive interface that the C2 JIT compiler translates directly into native SIMD machine instructions (x86 AVX/AVX2/AVX-512, ARM Neon/SVE). Vector values are held in CPU hardware vector registers with zero heap allocation.',
    tags: ['Vector API', 'SIMD', 'AVX', 'JIT Intrinsics']
  },
  {
    id: 199,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Advanced',
    question: 'What is the risk of using `sun.misc.Unsafe.freeMemory(long address)` directly?',
    options: [
      'It slows down compile times',
      'If called with an invalid address, called twice on the same pointer (double free), or if memory is read after freeing, it immediately corrupts OS process memory and crashes the JVM with a fatal segmentation fault (SIGSEGV)',
      'It throws a checked ClassNotFoundException',
      'It requires internet connectivity'
    ],
    correctAnswer: 1,
    explanation: '`Unsafe.freeMemory` directly invokes native `free()`. There are zero safety guards: double frees or dangling pointer dereferences cause immediate OS crashes (`SIGSEGV` / `EXCEPTION_ACCESS_VIOLATION`), terminating the JVM instantly.',
    tags: ['Unsafe', 'freeMemory', 'Segmentation Fault']
  },
  {
    id: 200,
    category: 'memory-management',
    categoryTitle: 'Memory Management & Off-Heap',
    difficulty: 'Master',
    question: 'How do "Zero-Copy" network transfers work in Java using `FileChannel.transferTo()`?',
    options: [
      'By copying data from kernel space to user space, then to socket buffer, then back to kernel',
      'By issuing the OS `sendfile()` system call, allowing the network interface controller (NIC) DMA engine to read data directly from OS page cache and transfer it over the network socket without copying bytes into Java user-space memory',
      'By compressing files before sending',
      'By converting files to UDP packets'
    ],
    correctAnswer: 1,
    explanation: 'Standard file-to-socket transfers involve 4 context switches and 4 data copies (Disk -> Kernel -> User -> Socket -> NIC). `FileChannel.transferTo()` utilizes the OS `sendfile` / zero-copy DMA pipeline, transferring bytes directly from Kernel Page Cache to the NIC, bypassing Java heap entirely.',
    tags: ['Zero-Copy', 'FileChannel.transferTo', 'DMA', 'sendfile']
  }
];
