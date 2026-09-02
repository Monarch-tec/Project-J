import { Question } from '../../types';

export const concurrencyQuestions: Question[] = [
  {
    id: 1,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'In the Java Memory Model (JMM), what constitutes a "happens-before" relationship between two thread actions regarding a volatile variable?',
    codeSnippet: `class VolatileExample {
    private volatile boolean flag = false;
    private int data = 0;

    public void writer() {
        data = 42;          // (1)
        flag = true;        // (2)
    }

    public void reader() {
        if (flag) {         // (3)
            int val = data; // (4)
        }
    }
}`,
    options: [
      'A write to a volatile field happens-before every subsequent read of that same field',
      'A read of a volatile field happens-before any subsequent write to any field',
      'Volatile only guarantees atomicity for 64-bit primitive operations',
      'Volatile prevents instruction reordering only within the same thread, not across threads'
    ],
    correctAnswer: 0,
    explanation: 'According to JSR-133 (JMM), a write to a volatile variable happens-before every subsequent read of that same volatile variable by any thread. Furthermore, via the transitivity rule of happens-before, action (1) happens-before (2), and (2) happens-before (3), so (1) happens-before (4), guaranteeing that the reader sees data = 42 without caching or reordering anomalies.',
    tags: ['JMM', 'Volatile', 'Happens-Before']
  },
  {
    id: 2,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'Why is the classic double-checked locking idiom broken without the volatile keyword on the singleton instance field?',
    codeSnippet: `public class Singleton {
    private static Singleton instance; // Missing volatile!

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton(); // Issue here
                }
            }
        }
        return instance;
    }
}`,
    options: [
      'The JVM will throw a NullPointerException during synchronization',
      'Instruction reordering may publish the object reference before constructor execution completes',
      'Classloaders will create multiple instances of Singleton in memory',
      'The synchronized block cannot be entered by more than one thread in the class lifecycle'
    ],
    correctAnswer: 1,
    explanation: 'Creating an object `instance = new Singleton()` involves three bytecode steps: 1) allocate memory, 2) execute constructor, 3) assign memory address to `instance`. Without `volatile`, the compiler or CPU can reorder steps 2 and 3. Another thread checking `instance == null` might observe a non-null reference to an incompletely constructed object, leading to erratic behavior.',
    tags: ['Double-Checked Locking', 'Instruction Reordering', 'Singleton']
  },
  {
    id: 3,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'How does StampedLock provide optimistic reading, and what is required before consuming data read under an optimistic stamp?',
    codeSnippet: `StampedLock sl = new StampedLock();
long stamp = sl.tryOptimisticRead();
int currentX = x, currentY = y;
if (!sl.validate(stamp)) {
    stamp = sl.readLock();
    try {
        currentX = x;
        currentY = y;
    } finally {
        sl.unlockRead(stamp);
    }
}`,
    options: [
      'Optimistic read acquires an implicit spinlock; validate() releases it',
      'tryOptimisticRead() acquires no lock; validate(stamp) checks if an exclusive write lock was acquired since the stamp was issued',
      'validate() automatically promotes the optimistic stamp to an exclusive write lock if validation fails',
      'StampedLock re-reads the CPU L1 cache line and invalidates dirty memory across cores'
    ],
    correctAnswer: 1,
    explanation: '`StampedLock.tryOptimisticRead()` returns a non-zero stamp if no write lock is currently held, but it does NOT acquire any lock or CAS counter. The thread reads fields optimistically without blocking. Afterward, calling `sl.validate(stamp)` checks if a write lock was issued in between. If invalid, the thread falls back to a standard pessimistic readLock.',
    tags: ['StampedLock', 'Optimistic Locking', 'java.util.concurrent.locks']
  },
  {
    id: 4,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What is the primary difference in thread scheduling and stack allocation between Virtual Threads (Project Loom) and Platform Threads in Java 21+?',
    options: [
      'Virtual threads run directly on kernel rings with hardware-assisted memory paging',
      'Virtual threads are managed by the JVM, mounted on carrier platform threads, with stacks stored on the Java heap that resize dynamically',
      'Virtual threads bypass the garbage collector and are allocated exclusively in Metaspace',
      'Virtual threads can only execute purely asynchronous I/O and cannot run synchronous blocking calls'
    ],
    correctAnswer: 1,
    explanation: 'Virtual threads (JEP 444) are lightweight user-mode threads managed by the JVM runtime rather than the OS kernel. When a virtual thread blocks on I/O or a lock (like ReentrantLock), the JVM unmounts it from its carrier thread (ForkJoinPool worker) and stores its execution frame on the heap, allowing millions of concurrent virtual threads with minimal memory overhead.',
    tags: ['Virtual Threads', 'Project Loom', 'Java 21']
  },
  {
    id: 5,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What causes "Virtual Thread Pinning" in Java 21, and how does it affect the underlying carrier thread pool?',
    options: [
      'Calling Thread.sleep() pins the virtual thread permanently until OS signal wake',
      'Entering a synchronized block/method or invoking a native/JNI method prevents unmounting from the carrier thread',
      'Executing a parallel stream inside a virtual thread corrupts the ForkJoin common pool',
      'Using volatile variables forces hardware barrier pinning on x86 architectures'
    ],
    correctAnswer: 1,
    explanation: 'A virtual thread is "pinned" to its carrier thread when it blocks inside a `synchronized` block/method or while executing native code (JNI). When pinned, the carrier thread cannot be released to execute other virtual threads during blocking operations. In Java 21+, replacing `synchronized` with `ReentrantLock` avoids carrier thread pinning.',
    tags: ['Virtual Threads', 'Pinning', 'Synchronized']
  },
  {
    id: 6,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'How does VarHandle in Java 9+ compare to sun.misc.Unsafe and AtomicFieldUpdaters in terms of memory fence control and performance?',
    codeSnippet: `class Node {
    private volatile Node next;
    private static final VarHandle NEXT_HANDLE;
    static {
        try {
            NEXT_HANDLE = MethodHandles.lookup()
                .findVarHandle(Node.class, "next", Node.class);
        } catch (ReflectiveOperationException e) {
            throw new Error(e);
        }
    }
}`,
    options: [
      'VarHandle is strictly slower than AtomicFieldUpdater because of reflective security checks on every invocation',
      'VarHandle provides fine-grained access modes (Plain, Opaque, Acquire/Release, Volatile) without Unsafe risks and with JVM JIT intrinsic optimizations',
      'VarHandle can only manipulate static fields and cannot perform Compare-And-Set (CAS) operations',
      'VarHandle requires -XX:+UnlockDiagnosticVMOptions to execute in production'
    ],
    correctAnswer: 1,
    explanation: '`VarHandle` (JEP 193) is the standard, type-safe replacement for `sun.misc.Unsafe` field operations. It supports variable access modes corresponding to C++11 memory orders: Plain (no fences), Opaque (coherence, no reordering of same variable), Acquire/Release (one-way barriers), and Volatile (sequential consistency), and JIT compiles them into intrinsic CPU instructions with zero reflection overhead.',
    tags: ['VarHandle', 'Memory Ordering', 'Acquire-Release']
  },
  {
    id: 7,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the ABA problem in lock-free concurrent programming, and how does Java provide a solution in java.util.concurrent.atomic?',
    options: [
      'A deadlock scenario where threads A and B wait for each other; solved by DeadlockDetector',
      'A value changes from A to B and back to A, tricking a standard CAS into succeeding despite intervening modifications; solved by AtomicStampedReference',
      'An asynchronous byte array allocation failure; solved by AtomicBuffer',
      'A race condition in thread group initialization; solved by AtomicBoolean'
    ],
    correctAnswer: 1,
    explanation: 'The ABA problem occurs when thread 1 reads value A, thread 2 changes A to B and back to A, and thread 1 performs CAS(expected: A, new: C). The CAS succeeds because the value is A, but hidden state (like a reused pointer in a free list) was altered. `AtomicStampedReference` pairs the reference with an integer version stamp (stamp, ref) that increments on update to detect ABA.',
    tags: ['CAS', 'ABA Problem', 'AtomicStampedReference']
  },
  {
    id: 8,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'In CompletableFuture, what is the critical behavioral difference between `thenApply` and `thenApplyAsync` when no custom Executor is supplied?',
    codeSnippet: `CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> cf1 = cf.thenApply(s -> s + " World");
CompletableFuture<String> cf2 = cf.thenApplyAsync(s -> s + " Async");`,
    options: [
      'thenApply always spawns a new OS kernel thread, while thenApplyAsync uses a cached thread',
      'thenApply executes synchronously in the thread completing the stage (or calling thread if already done), while thenApplyAsync schedules execution in ForkJoinPool.commonPool()',
      'thenApply is blocking and waits for Future.get(), whereas thenApplyAsync returns a Promise',
      'thenApply is deprecated in favor of thenApplyAsync in Java 17+'
    ],
    correctAnswer: 1,
    explanation: '`thenApply` runs synchronously on whichever thread completes the upstream stage (or the caller thread if the previous stage is already complete at invocation time). `thenApplyAsync` always submits the callback task asynchronously to `ForkJoinPool.commonPool()` (or the explicitly passed `Executor`), decoupling callback execution from the completing thread.',
    tags: ['CompletableFuture', 'Asynchronous', 'ForkJoinPool']
  },
  {
    id: 9,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'How does ForkJoinPool achieve high throughput using work-stealing, and why are work queues implemented as double-ended queues (deques)?',
    options: [
      'All worker threads pop tasks from the head of a single shared global ConcurrentLinkedQueue',
      'Each worker thread pushes and pops its own subtasks LIFO from the top of its private deque, while idle worker threads steal tasks FIFO from the bottom (tail) of other workers\' deques to reduce contention',
      'ForkJoinPool assigns fixed static partitions of array indices to worker threads at JVM startup',
      'Work-stealing relies on hardware interrupts to preempt busy threads'
    ],
    correctAnswer: 1,
    explanation: 'In `ForkJoinPool`, each worker thread maintains a private double-ended queue (`WorkQueue`). The owning worker pushes and pops subtasks in LIFO order from the top/head (maximizing cache locality for recursive divide-and-conquer). When an idle worker steals, it takes from the bottom/tail in FIFO order using atomic operations, drastically minimizing lock contention between owner and thief.',
    tags: ['ForkJoinPool', 'Work-Stealing', 'Deques']
  },
  {
    id: 10,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the purpose of `Phaser` compared to `CountDownLatch` and `CyclicBarrier` in java.util.concurrent?',
    options: [
      'Phaser can only be used with Virtual Threads in Java 21',
      'Phaser supports dynamic registration and deregistration of parties across multiple reusable phases, whereas CyclicBarrier has a fixed party count and CountDownLatch cannot be reset',
      'Phaser provides hardware-level CPU barrier instructions for SIMD registers',
      'Phaser is designed solely to coordinate inter-process communication across separate JVM processes'
    ],
    correctAnswer: 1,
    explanation: '`CountDownLatch` is a one-shot countdown counter that cannot be reset. `CyclicBarrier` is reusable but requires a fixed number of parties defined at instantiation. `Phaser` is far more flexible: it supports reusable phases, dynamic registration/deregistration of arriving parties (`register()`, `arriveAndDeregister()`), and hierarchical tree structures for reduced contention.',
    tags: ['Phaser', 'CyclicBarrier', 'CountDownLatch']
  },
  {
    id: 11,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What happens when a thread calls `LockSupport.park()` and `LockSupport.unpark(thread)` is called prior to the park call?',
    options: [
      'The park call throws an IllegalThreadStateException',
      'The permit is already consumed; the thread blocks indefinitely until another unpark call is made',
      'LockSupport maintains a single binary permit; the prior unpark makes the permit available, so the subsequent park() consumes the permit and returns immediately without blocking',
      'The JVM escalates the thread priority to REALTIME_PRIORITY'
    ],
    correctAnswer: 2,
    explanation: '`LockSupport` operates on a binary permit concept (at most 1 permit per thread). If `unpark(t)` is called before `t` calls `park()`, the permit becomes available. When `t` subsequently invokes `park()`, it immediately consumes the permit and continues execution without suspending.',
    tags: ['LockSupport', 'Park-Unpark', 'AQS']
  },
  {
    id: 12,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'How does AbstractQueuedSynchronizer (AQS) implement thread queuing for ReentrantLock and Semaphore without busy-waiting?',
    options: [
      'By allocating an OS-level POSIX mutex handle per queued thread',
      'By maintaining an atomic state variable and a FIFO CLH-variant linked list of Node objects where waiting threads are parked via LockSupport.park()',
      'By spinning continuously on a volatile boolean flag in a while(true) loop',
      'By redirecting thread dispatch through the JVM Garbage Collector root set'
    ],
    correctAnswer: 1,
    explanation: 'AQS manages synchronization state via a single 32-bit volatile `state` integer manipulated via CAS (`compareAndSetState`). Threads that fail acquisition are enqueued as nodes in a FIFO wait queue (a variant of CLH lock queues) and suspended using `LockSupport.park()`. When the holder releases the lock, it unparks the head successor node.',
    tags: ['AQS', 'ReentrantLock', 'CLH Queue']
  },
  {
    id: 13,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the effect of the `@Contended` annotation (JEP 142) on class fields in the OpenJDK HotSpot JVM?',
    options: [
      'It forces the JIT compiler to inline all methods accessing the annotated fields',
      'It introduces memory padding around the annotated field/class to prevent false sharing across CPU cache lines (typically 64 or 128 bytes)',
      'It converts standard field read/writes into atomic hardware bus-locked transactions',
      'It disables thread preemption while accessing the annotated fields'
    ],
    correctAnswer: 1,
    explanation: 'False sharing occurs when two independent variables accessed by different CPU cores reside on the same 64-byte L1/L2 cache line, forcing cache invalidation ping-pong. `@Contended` inserts JVM-controlled padding bytes around fields to ensure they occupy separate cache lines, drastically improving multithreaded throughput (used in `LongAdder`, `ConcurrentHashMap`).',
    tags: ['False Sharing', '@Contended', 'Cache Lines']
  },
  {
    id: 14,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'Why does `LongAdder` scale significantly better than `AtomicLong` under heavy multithreaded contention?',
    options: [
      'LongAdder uses 128-bit SIMD registers instead of 64-bit ALU registers',
      'LongAdder maintains an internal dynamically sized array of Cell objects padded against false sharing, allowing threads to update distinct cells via hash codes rather than contending on a single volatile CAS variable',
      'LongAdder delegates arithmetic operations to the GPU via OpenCL',
      'LongAdder uses pessimistic read-write locks rather than CAS operations'
    ],
    correctAnswer: 1,
    explanation: 'Under high thread contention, `AtomicLong.incrementAndGet()` suffers severe CAS retry loops on a single memory location. `LongAdder` (extending `Striped64`) splits the counter across a `Cell[]` table. Each thread updates a cell based on its probe hash. When reading the total sum via `sum()`, it aggregates the base and all cell values.',
    tags: ['LongAdder', 'AtomicLong', 'Striped64']
  },
  {
    id: 15,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'What is a "safe publication" idiom in Java, and which of the following guarantees safe publication of an immutable object without volatile or locks?',
    options: [
      'Assigning the object reference to a public non-volatile static field after constructor completion',
      'Initializing all fields inside the constructor as `final`, relying on JMM final field freeze semantics',
      'Calling System.gc() immediately after object instantiation',
      'Wrapping the object inside a java.util.ArrayList instance'
    ],
    correctAnswer: 1,
    explanation: 'Under JSR-133, the JMM provides a special "freeze" guarantee for `final` fields. When an object with final fields is constructed, the values written to those final fields are frozen at constructor exit, and any thread that subsequently observes a reference to that object is guaranteed to see the properly initialized final fields without synchronization or volatile barriers.',
    tags: ['Safe Publication', 'Final Fields', 'JMM Freeze']
  },
  {
    id: 16,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the difference between `Thread.interrupted()` and `Thread.currentThread().isInterrupted()` in Java?',
    options: [
      'Thread.interrupted() checks and clears the interruption status of the current thread, whereas isInterrupted() only queries the status without modifying the interrupt flag',
      'Thread.interrupted() stops the thread immediately; isInterrupted() throws InterruptedException',
      'Thread.interrupted() is an instance method; isInterrupted() is a static method',
      'There is no difference; they are aliases introduced in Java 1.2'
    ],
    correctAnswer: 0,
    explanation: '`Thread.interrupted()` is a static method that tests whether the current thread has been interrupted and **clears** the interrupted status flag. In contrast, the instance method `isInterrupted()` tests the interruption status of the target thread **without** altering the flag.',
    tags: ['Thread Interruption', 'Concurrency API']
  },
  {
    id: 17,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'In `StructuredTaskScope` (Preview in Java 21+), what is the guarantee provided by `scope.join()` and `ShutdownOnFailure`?',
    codeSnippet: `try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Supplier<User> userSub = scope.fork(() -> fetchUser(id));
    Supplier<Order> orderSub = scope.fork(() -> fetchOrder(id));

    scope.join();           // (1)
    scope.throwIfFailed();  // (2)
    return new Dashboard(userSub.get(), orderSub.get());
}`,
    options: [
      'Subtasks run sequentially on the calling thread to prevent deadlocks',
      'The parent scope blocks at join() until all forked subtasks complete or one fails; if any subtask fails, it cancels remaining siblings and propagates the failure at throwIfFailed()',
      'It creates an OS process boundary for every forked lambda',
      'It bypasses ThreadLocal inheritance restrictions automatically'
    ],
    correctAnswer: 1,
    explanation: 'Structured Concurrency (JEP 453) treats concurrent subtasks executed in separate threads as a single unit of work. `ShutdownOnFailure` shuts down the scope upon the first subtask failure, cancelling in-flight sibling tasks and ensuring no orphaned background threads outlive the enclosing block.',
    tags: ['Structured Concurrency', 'StructuredTaskScope', 'Java 21']
  },
  {
    id: 18,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'What is the precise role of memory barriers (StoreStore, LoadStore, LoadLoad, StoreLoad) emitted for a volatile write on x86 architectures?',
    options: [
      'x86 requires StoreStore and LoadLoad barriers because it has a Weak Memory Ordering model',
      'Because x86 has Total Store Order (TSO) hardware guarantees, only a StoreLoad barrier (such as `lock addl` or `mfence`) is required after a volatile write to prevent subsequent loads from reordering before the store',
      'No barriers are ever generated on any x86 JIT compilation because volatile is ignored by the CPU',
      'x86 emits a full CPU bus lock on every single field read'
    ],
    correctAnswer: 1,
    explanation: 'x86/x64 hardware enforces Total Store Order (TSO), which naturally guarantees LoadLoad, StoreStore, and LoadStore orders. The only reordering allowed in x86 hardware is StoreLoad (a store followed by an independent load may reorder due to the store buffer). Thus, HotSpot JIT only needs to emit a StoreLoad barrier (typically `lock addl [rsp], 0` or `mfence`) after a volatile store.',
    tags: ['Memory Barriers', 'x86 TSO', 'StoreLoad']
  },
  {
    id: 19,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'How does `ConcurrentHashMap` achieve thread-safe reads in `get(key)` without acquiring locks?',
    options: [
      'Reads take an optimistic StampedLock on the segment table',
      'Table array bins and Node `val` and `next` pointers are declared `volatile`, allowing concurrent reads to traverse lists without locking',
      'Reads make a deep snapshot clone of the entire hash table bucket on every call',
      'Reads suspend all active writer threads using JVM safepoints'
    ],
    correctAnswer: 1,
    explanation: 'In `ConcurrentHashMap`, the internal bucket table array elements (`Node<K,V>[]`) are accessed using volatile semantics (`tabAt` with `Unsafe`/`VarHandle`), and the `val` and `next` references of each `Node` are `volatile`. Consequently, reader threads can navigate the hash bins lock-free and always observe the most recently committed writes.',
    tags: ['ConcurrentHashMap', 'Volatile Reads', 'Lock-Free']
  },
  {
    id: 20,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What is the behavior of `ThreadPoolExecutor.CallerRunsPolicy` when the work queue is saturated and maximum pool size is reached?',
    options: [
      'It discards the oldest task in the queue and retries task submission',
      'It executes the rejected task directly in the caller thread that called `execute()`, providing an automatic backpressure throttling mechanism',
      'It throws a RejectedExecutionException immediately',
      'It shuts down the thread pool gracefully'
    ],
    correctAnswer: 1,
    explanation: '`ThreadPoolExecutor.CallerRunsPolicy` is a built-in rejection handler. When both the queue and maximum thread capacity are full, the task is executed directly in the calling thread that submitted it. Because the producer thread is busy running the task itself, it slows down task generation, creating an effective backpressure mechanism.',
    tags: ['ThreadPoolExecutor', 'CallerRunsPolicy', 'Backpressure']
  },
  {
    id: 21,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'In the Disruptor pattern (LMAX), why is a circular RingBuffer significantly faster than a traditional `ArrayBlockingQueue`?',
    options: [
      'It compresses objects into protobuf binary format before writing',
      'It uses pre-allocated memory slots, power-of-two bitwise indexing, sequence numbers without locks, and cache line padding to eliminate garbage collection and lock contention',
      'It runs exclusively inside the kernel space via eBPF probes',
      'It replaces volatile memory with disk-mapped direct byte buffers'
    ],
    correctAnswer: 1,
    explanation: 'LMAX Disruptor achieves millions of operations per second by using a pre-allocated circular `RingBuffer` with power-of-two size (allowing fast bitwise `index = seq & (size - 1)`), sequence tracking via atomic CAS/volatile counters padded to prevent false sharing, and zero object allocation during runtime, completely avoiding lock and GC overhead.',
    tags: ['Disruptor', 'RingBuffer', 'Lock-Free']
  },
  {
    id: 22,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the key advantage of `ReentrantReadWriteLock` over standard `ReentrantLock`?',
    options: [
      'It allows multiple concurrent readers when no write lock is held, improving throughput for read-heavy workloads',
      'It completely prevents thread starvation in non-fair mode',
      'It allows promoting a read lock to a write lock without releasing the read lock',
      'It works with primitive types without autoboxing'
    ],
    correctAnswer: 0,
    explanation: '`ReentrantReadWriteLock` separates access into a shared read lock and an exclusive write lock. Multiple reader threads can hold the read lock concurrently as long as no writer holds the write lock. Note: lock upgrading (read lock -> write lock) is NOT supported and causes deadlock if attempted.',
    tags: ['ReentrantReadWriteLock', 'Read-Write Locks']
  },
  {
    id: 23,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What happens if a thread holding a `ReentrantLock` encounters an unhandled exception before reaching the `unlock()` call in a finally block?',
    options: [
      'The JVM automatically unlocks the lock upon unwinding the call stack',
      'The lock remains permanently locked by the dead/interrupted thread, causing subsequent acquiring threads to deadlock indefinitely',
      'The lock is converted into a ReadLock',
      'An IllegalMonitorStateException is thrown at JVM exit'
    ],
    correctAnswer: 1,
    explanation: 'Unlike Java monitors (`synchronized`) where the JVM automatically releases the monitor when exiting the bytecode frame (even on exception), explicit `Lock` objects require explicit `lock.unlock()` inside a `try-finally` block. Failing to unlock in `finally` permanently leaves the lock held, blocking other threads.',
    tags: ['ReentrantLock', 'Try-Finally', 'Deadlock']
  },
  {
    id: 24,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'What is "Sequential Consistency" (SC) and why does the Java Memory Model (JMM) allow non-SC executions for data-race-containing programs?',
    options: [
      'SC requires all processors to run at the exact same clock frequency',
      'SC mandates that all operations appear to execute in some global sequential order consistent with program order; JMM relaxes this for racy programs to enable hardware store-buffers, registers, and JIT optimizations',
      'SC is only defined for single-threaded programs',
      'JMM enforces SC strictly on all programs regardless of data races'
    ],
    correctAnswer: 1,
    explanation: 'Sequential Consistency requires total program order across all threads. Enforcing SC universally would prohibit modern hardware features (store buffers, out-of-order execution) and compiler optimizations (register allocation, dead-code elimination). The JMM provides the "SC-DRF" (Sequential Consistency for Data-Race-Free) guarantee: correctly synchronized programs behave sequentially consistently.',
    tags: ['JMM', 'Sequential Consistency', 'Data Races']
  },
  {
    id: 25,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is a "livelock" in concurrent computing, and how does it differ from a "deadlock"?',
    options: [
      'In a deadlock, threads are blocked and idle; in a livelock, threads actively change their state in response to each other but make no forward progress',
      'Livelock occurs only when using Virtual Threads, while deadlock occurs on Platform Threads',
      'Livelock is detected automatically by ThreadMXBean; deadlock is not',
      'Livelock occurs when the CPU utilization drops to 0%'
    ],
    correctAnswer: 0,
    explanation: 'In a deadlock, threads are suspended waiting for resources held by each other (0% CPU progress). In a livelock, threads remain in active execution (spinning or responding to each other\'s actions, e.g., both backing off and retrying in unison), consuming CPU cycles without making actual algorithmic progress.',
    tags: ['Livelock', 'Deadlock', 'Concurrency Concepts']
  },
  {
    id: 26,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'In `CompletableFuture`, what does `allOf(cf1, cf2, cf3)` return upon completion?',
    options: [
      'CompletableFuture<List<Object>> containing all results',
      'CompletableFuture<Void> that completes when all the given CompletableFutures complete',
      'CompletableFuture<Tuple3<T1, T2, T3>>',
      'CompletableFuture<Boolean> indicating if any future failed'
    ],
    correctAnswer: 1,
    explanation: '`CompletableFuture.allOf(...)` returns `CompletableFuture<Void>`. It completes normally when all input futures complete, or exceptionally if any completes exceptionally. To extract results, developers must individually invoke `.join()` on each completed future.',
    tags: ['CompletableFuture', 'allOf', 'Asynchronous']
  },
  {
    id: 27,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'What is the purpose of `ThreadLocalRandom` over `java.util.Random` in multithreaded applications?',
    options: [
      'ThreadLocalRandom uses cryptographic quantum entropy seeds',
      'java.util.Random uses an internal AtomicLong seed contending across threads with CAS; ThreadLocalRandom maintains thread-isolated seed state with zero synchronization overhead',
      'ThreadLocalRandom generates random numbers in Metaspace',
      'java.util.Random cannot generate Gaussian distributions'
    ],
    correctAnswer: 1,
    explanation: '`java.util.Random` shares a single internal `AtomicLong seed` across all calling threads, resulting in severe CAS contention in concurrent applications. `ThreadLocalRandom` maintains independent seed fields directly in the calling `Thread` object, delivering completely contention-free pseudo-random generation.',
    tags: ['ThreadLocalRandom', 'Random', 'Contention']
  },
  {
    id: 28,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the effect of calling `notifyAll()` versus `notify()` on a Java monitor object?',
    options: [
      'notify() wakes up all threads, while notifyAll() wakes up only the highest priority thread',
      'notify() wakes up an arbitrary single thread waiting on the object monitor; notifyAll() wakes up all threads waiting on that monitor, moving them to the blocked lock set',
      'notifyAll() releases the lock immediately, whereas notify() retains the lock',
      'notifyAll() interrupts waiting threads with InterruptedException'
    ],
    correctAnswer: 1,
    explanation: '`notify()` wakes up a single non-deterministic thread from the wait set. If that thread cannot proceed (e.g. its condition predicate is false), a signal loss/deadlock may occur. `notifyAll()` wakes all waiting threads; they compete to reacquire the monitor and test their respective loop predicates.',
    tags: ['Object.wait', 'notifyAll', 'Monitors']
  },
  {
    id: 29,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What is the difference between `CopyOnWriteArrayList` and `Collections.synchronizedList(new ArrayList<>())` during iteration?',
    options: [
      'CopyOnWriteArrayList iterator throws ConcurrentModificationException if modified; SynchronizedList iterator never throws',
      'CopyOnWriteArrayList provides a snapshot iterator that traverses the array state at iterator creation without locking or CME; SynchronizedList requires external manual synchronization during iteration',
      'CopyOnWriteArrayList allocates memory exclusively in off-heap direct memory',
      'SynchronizedList creates a copy of the backing array on every write'
    ],
    correctAnswer: 1,
    explanation: '`CopyOnWriteArrayList` creates a fresh copy of its underlying array on any mutation (add, set, remove). Its iterator references the immutable snapshot array created at iterator instantiation time, never throwing `ConcurrentModificationException`. `Collections.synchronizedList` only synchronizes individual method calls; iterating over it requires explicit external `synchronized(list)` block.',
    tags: ['CopyOnWriteArrayList', 'SynchronizedList', 'Iterators']
  },
  {
    id: 30,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'How do "Scoped Values" (JEP 446 / Java 21+) improve upon `ThreadLocal` when used with millions of Virtual Threads?',
    codeSnippet: `private static final ScopedValue<SecurityContext> CONTEXT = ScopedValue.newInstance();

ScopedValue.where(CONTEXT, new SecurityContext("admin"))
           .run(() -> processRequest());`,
    options: [
      'Scoped Values store data in database records rather than JVM memory',
      'Scoped Values are immutable, bound to a specific execution scope, and can be shared efficiently down call trees without unbounded memory retention or expensive deep-copy inheritance across millions of virtual threads',
      'Scoped Values can only store primitive integers',
      'Scoped Values replace the Java Garbage Collector for referenced objects'
    ],
    correctAnswer: 1,
    explanation: '`ThreadLocal` has high memory footprint per thread and mutable life cycles that risk memory leaks in thread pools or high thread counts. `ScopedValue` provides bounded, immutable context values that are strictly scoped to a code execution block and easily shared across child virtual threads without data copying.',
    tags: ['Scoped Values', 'ThreadLocal', 'Java 21']
  },
  {
    id: 31,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the purpose of `Semaphore(int permits, boolean fair)` in Java?',
    options: [
      'To enforce that exactly two threads execute concurrently at all times',
      'To control access to a bounded resource pool by managing a set of permits; acquiring blocks when no permits remain until released',
      'To verify the cryptographic digital signature of bytecode classes',
      'To signal JVM thread dumps to disk'
    ],
    correctAnswer: 1,
    explanation: 'A `Semaphore` maintains a count of available permits. Threads call `acquire()` to take a permit (blocking if none available) and `release()` to return a permit. Setting `fair = true` guarantees FIFO ordering among waiting threads via AQS.',
    tags: ['Semaphore', 'Rate Limiting', 'JUC']
  },
  {
    id: 32,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What causes a `Deadlock` in a program utilizing multiple `ReentrantLock` instances?',
    codeSnippet: `// Thread 1
lockA.lock();
lockB.lock();

// Thread 2
lockB.lock();
lockA.lock();`,
    options: [
      'Using reentrant locks instead of synchronized blocks',
      'Circular lock acquisition order where Thread 1 holds lockA waiting for lockB, while Thread 2 holds lockB waiting for lockA',
      'Allocating more locks than CPU hardware threads',
      'Forgetting to specify fairness on lock creation'
    ],
    correctAnswer: 1,
    explanation: 'Deadlocks occur when four Coffman conditions hold: mutual exclusion, hold and wait, no preemption, and circular wait. Acquiring locks in inconsistent orders across multiple threads creates a circular wait dependency. Enforcing a strict global lock ordering prevents deadlocks.',
    tags: ['Deadlock', 'Coffman Conditions', 'Lock Ordering']
  },
  {
    id: 33,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'What is the difference between `Opaque` and `Volatile` access modes in `VarHandle`?',
    options: [
      'Opaque access allows reads and writes to be eliminated by dead code analysis; Volatile does not',
      'Opaque access guarantees coherence (a total order per variable and no out-of-thin-air values) but does NOT establish cross-variable happens-before order with other memory locations, unlike Volatile',
      'Opaque access requires synchronized blocks around every access',
      'Opaque access is only available on ARM CPUs'
    ],
    correctAnswer: 1,
    explanation: '`VarHandle.setOpaque()` and `getOpaque()` guarantee basic coherence (progress, bitwise atomicity, and a single modification order for that specific variable) without emitting cross-variable memory fences (Acquire/Release or StoreLoad), making them cheaper than Volatile on architectures with weaker memory models.',
    tags: ['VarHandle', 'Opaque Access', 'Memory Ordering']
  },
  {
    id: 34,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'Why must `Object.wait()` always be invoked inside a `while` loop rather than an `if` statement?',
    codeSnippet: `synchronized (lock) {
    while (!condition) { // Why while and not if?
        lock.wait();
    }
    // Proceed with action
}`,
    options: [
      'The compiler rejects if statements inside synchronized blocks',
      'To guard against spurious wakeups and state changes caused by other threads that acquired the monitor before the awakened thread',
      'wait() automatically resets loop counters',
      'Because wait() throws an exception if called inside an if block'
    ],
    correctAnswer: 1,
    explanation: 'Threads can wake up from `wait()` without an explicit notification ("spurious wakeup"). Furthermore, when `notifyAll()` wakes multiple threads, another thread may acquire the lock first and invalidate the condition predicate. Re-evaluating the condition in a `while` loop ensures safety.',
    tags: ['Spurious Wakeup', 'Object.wait', 'Condition Predicates']
  },
  {
    id: 35,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'What is the difference between `ExecutorService.shutdown()` and `ExecutorService.shutdownNow()`?',
    options: [
      'shutdown() pauses tasks; shutdownNow() deletes the thread pool class definition',
      'shutdown() allows previously submitted tasks to complete without accepting new tasks; shutdownNow() attempts to cancel actively executing tasks (via Thread.interrupt()) and drains pending tasks from the queue',
      'shutdownNow() blocks until all threads terminate, while shutdown() does not',
      'There is no difference in Java 17+'
    ],
    correctAnswer: 1,
    explanation: '`shutdown()` initiates a graceful shutdown: no new tasks are accepted, but all already-submitted and queued tasks are executed. `shutdownNow()` halts task processing, attempts to stop actively running tasks by interrupting their threads, and returns a `List<Runnable>` of tasks that were waiting in the queue.',
    tags: ['ExecutorService', 'Shutdown', 'Thread Lifecycle']
  },
  {
    id: 36,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'How does `ForkJoinPool.ManagedBlocker` prevent thread pool starvation when a task executed inside a ForkJoinPool must perform a blocking operation?',
    options: [
      'It creates an OS sub-process to run the blocking call',
      'It signals the ForkJoinPool to temporarily activate or spawn a spare carrier thread to maintain target parallelism while the current worker is blocked',
      'It converts synchronous blocking socket calls into non-blocking epoll calls automatically',
      'It terminates the blocked task after 100 milliseconds'
    ],
    correctAnswer: 1,
    explanation: 'When worker threads in a `ForkJoinPool` block on I/O or synchronizers, the pool\'s active parallelism drops. Implementing `ForkJoinPool.ManagedBlocker` allows the pool to compensate by allocating a spare worker thread during the block, preserving overall system throughput.',
    tags: ['ManagedBlocker', 'ForkJoinPool', 'Parallelism']
  },
  {
    id: 37,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'What is the key difference between `CountDownLatch` and `CyclicBarrier` regarding reset capability?',
    options: [
      'CountDownLatch can be reset by calling reset(); CyclicBarrier cannot',
      'CyclicBarrier can be reset and reused across multiple iterative cycles using reset(); CountDownLatch is a one-time gate that cannot be reset once counted down to 0',
      'Both can be reset indefinitely in Java 21',
      'Neither can be reset once instantiated'
    ],
    correctAnswer: 1,
    explanation: '`CountDownLatch` is an irrevocable one-shot gate: once its count reaches zero, `await()` calls pass through forever. `CyclicBarrier` is cyclic: once all parties arrive at the barrier, the barrier trips, an optional barrier action runs, and the barrier resets for the next round.',
    tags: ['CountDownLatch', 'CyclicBarrier', 'Synchronization']
  },
  {
    id: 38,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Expert',
    question: 'How does `AtomicReferenceArray` achieve element-level thread safety?',
    options: [
      'It synchronizes on the array instance on every read and write',
      'It uses Unsafe/VarHandle volatile array element addressing (`arrayBaseOffset` + `arrayIndexScale`) to execute volatile and CAS operations on individual indices',
      'It clones the entire array on every write operation',
      'It stores array elements on separate JVM heap regions'
    ],
    correctAnswer: 1,
    explanation: 'Java arrays cannot declare individual elements as `volatile`. `AtomicReferenceArray` overcomes this by calculating memory byte offsets for index `i` (`baseOffset + (i << shift)`) and using low-level volatile CAS instructions via `VarHandle`/`Unsafe` to read/write specific elements atomically.',
    tags: ['AtomicReferenceArray', 'Volatile Arrays', 'VarHandle']
  },
  {
    id: 39,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Master',
    question: 'What is the "Out-of-Thin-Air" (OOTA) safety guarantee in the Java Memory Model?',
    options: [
      'A guarantee that the JVM will not run out of heap memory during thread allocation',
      'A formal safety requirement prohibiting circular data dependencies from producing non-zero values spontaneously from speculative writes without justification from program execution',
      'A mechanism that detects memory leaks in native C/C++ libraries',
      'A rule preventing threads from allocating objects in young generation'
    ],
    correctAnswer: 1,
    explanation: 'In relaxed memory architectures, causal loops (e.g. Thread 1 writes y=42 if x==42; Thread 2 writes x=42 if y==42) could speculatively conjure value 42 "out of thin air". The JMM specification explicitly mandates OOTA safety: values read by variables must be traceable to a real write action in program execution history.',
    tags: ['JMM', 'OOTA', 'Causality']
  },
  {
    id: 40,
    category: 'concurrency',
    categoryTitle: 'Java Concurrency & Memory Model',
    difficulty: 'Advanced',
    question: 'Which `BlockingQueue` implementation in `java.util.concurrent` has no internal capacity and transfers elements directly between producers and consumers?',
    options: [
      'LinkedBlockingQueue',
      'ArrayBlockingQueue',
      'SynchronousQueue',
      'PriorityBlockingQueue'
    ],
    correctAnswer: 2,
    explanation: '`SynchronousQueue` is a zero-capacity blocking queue. Each `put` operation must wait for a corresponding `take` operation by another thread (rendezvous handoff). It is famously used by `Executors.newCachedThreadPool()` to immediately hand off tasks to idle threads or create new ones.',
    tags: ['SynchronousQueue', 'BlockingQueue', 'CachedThreadPool']
  }
];
