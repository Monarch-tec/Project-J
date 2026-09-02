import { Question } from '../../types';

export const functionalQuestions: Question[] = [
  {
    id: 321,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'How are Java Lambda expressions compiled and instantiated at runtime under the hood by `javac` and the HotSpot JVM?',
    options: [
      'They are compiled into anonymous inner classes (`.class` files) on disk for every lambda',
      'The compiler desugars the lambda body into a private synthetic method in the enclosing class and emits an `invokedynamic` instruction referencing `LambdaMetafactory.metafactory`, which generates an optimized dynamic call site and reuses singleton instances for stateless non-capturing lambdas',
      'They are interpreted as JavaScript scripts',
      'They are executed on the GPU'
    ],
    correctAnswer: 1,
    explanation: 'Unlike anonymous inner classes (which generate physical `.class` files and allocate new objects on every invocation), lambdas use `invokedynamic` and `LambdaMetafactory`. For stateless (non-capturing) lambdas, the JVM caches and reuses a single constant instance, resulting in zero allocation.',
    tags: ['Lambda Compilation', 'invokedynamic', 'LambdaMetafactory', 'Capturing Lambdas']
  },
  {
    id: 322,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'How do "Spliterators" coordinate parallel stream execution, and what is the role of `trySplit()`?',
    codeSnippet: `public interface Spliterator<T> {
    boolean tryAdvance(Consumer<? super T> action);
    Spliterator<T> trySplit();
    long estimateSize();
    int characteristics();
}`,
    options: [
      'trySplit() splits strings into character arrays',
      '`trySplit()` partitions the current spliterator data range into two: it returns a new Spliterator covering a prefix subset while the calling spliterator retains the remaining suffix, enabling recursive divide-and-conquer parallel execution in `ForkJoinPool`',
      'trySplit() closes the stream channel',
      'trySplit() creates a new thread on each invocation'
    ],
    correctAnswer: 1,
    explanation: '`Spliterator` (Splittable Iterator) is the backbone of Java Streams. `trySplit()` partitions the workload into approximately equal halves recursively. `ForkJoinPool` worker threads steal and process these split sub-tasks in parallel.',
    tags: ['Spliterator', 'trySplit', 'Parallel Streams', 'ForkJoinPool']
  },
  {
    id: 323,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What are the 5 components of a custom `Collector<T, A, R>` in `Collector.of(...)`?',
    codeSnippet: `Collector<T, A, R> collector = Collector.of(
    supplier,       // 1
    accumulator,    // 2
    combiner,       // 3
    finisher,       // 4
    characteristics // 5
);`,
    options: [
      'Thread, Socket, Buffer, Channel, Selector',
      '1) Supplier (creates mutable accumulator), 2) Accumulator (folds element into accumulator), 3) Combiner (merges two accumulators in parallel execution), 4) Finisher (transforms accumulator to final result), 5) Characteristics (IDENTITY_FINISH, CONCURRENT, UNORDERED)',
      'Reader, Writer, Stream, Pipe, Filter',
      'Init, Map, Reduce, Sort, Output'
    ],
    correctAnswer: 1,
    explanation: 'A `Collector` defines a reduction operation: `Supplier` allocates the container `A`, `Accumulator` folds item `T` into `A`, `Combiner` merges two containers `(A, A) -> A` during parallel processing, `Finisher` produces final type `R`, and `Characteristics` guide optimizations.',
    tags: ['Collector.of', 'Custom Collector', 'Accumulator', 'Combiner']
  },
  {
    id: 324,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'Why does `Stream.parallel()` cause performance degradation or thread starvation when performing blocking I/O inside stream operations?',
    options: [
      'Because parallel streams run in single-threaded mode',
      'Because by default all parallel streams in a JVM share the single common `ForkJoinPool.commonPool()`; blocking I/O calls block the shared pool worker threads, starving all other parallel streams and CPU-bound tasks throughout the entire JVM',
      'Because parallel streams throw an exception if I/O is detected',
      'Because parallel streams do not support lambdas'
    ],
    correctAnswer: 1,
    explanation: 'Parallel streams share the global `ForkJoinPool.commonPool()` (sized to `Runtime.getRuntime().availableProcessors() - 1`). Blocking worker threads on I/O exhausts the pool, paralyzing parallel processing across the entire application.',
    tags: ['ForkJoinPool.commonPool', 'Parallel Streams', 'Blocking I/O', 'Thread Starvation']
  },
  {
    id: 325,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is the performance advantage of using specialized primitive streams (`IntStream`, `LongStream`, `DoubleStream`) over `Stream<Integer>`?',
    options: [
      'Primitive streams can run without a JVM',
      'Primitive streams operate directly on raw unboxed primitive values in contiguous arrays, completely eliminating boxing/unboxing overhead, wrapper object heap allocations, and memory pointer indirection',
      'Primitive streams support multiline strings',
      'Primitive streams are encrypted'
    ],
    correctAnswer: 1,
    explanation: '`Stream<Integer>` boxes every `int` into an 16-24 byte `java.lang.Integer` heap object, causing severe memory footprint expansion and GC pressure. `IntStream` processes raw 4-byte `int` primitives directly in CPU registers/arrays with zero GC allocation.',
    tags: ['IntStream', 'Boxing Overhead', 'Primitive Streams', 'Performance']
  },
  {
    id: 326,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is the difference between "Stateless" and "Stateful" intermediate stream operations?',
    options: [
      'Stateless operations run on heap; stateful operations run on disk',
      'Stateless operations (e.g. `map()`, `filter()`) process each element independently without knowledge of previous elements; Stateful operations (e.g. `sorted()`, `distinct()`, `limit()`) require retaining state from previously seen elements, potentially buffering the entire stream before yielding results',
      'Stateful operations are deprecated in Java 17',
      'Stateless operations cannot use lambda expressions'
    ],
    correctAnswer: 1,
    explanation: 'Stateless operations allow 1-by-1 pipeline fusion and parallel streaming with zero synchronization. Stateful operations like `sorted()` or `distinct()` act as barriers: they must consume all upstream elements and maintain state before passing data downstream.',
    tags: ['Stateless vs Stateful', 'Stream Pipeline', 'sorted()', 'filter()']
  },
  {
    id: 327,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'Why is `Optional<T>` strongly discouraged from being used as a class field or method parameter in API design?',
    options: [
      'Because Optional is deprecated',
      'Because `Optional` is not `Serializable`, adds extra heap object allocation overhead (16-24 bytes) per field, and passing `Optional` as a parameter complicates client calling code compared to passing `null` or method overloading',
      'Because Optional cannot hold String objects',
      'Because Optional disables JIT compilation'
    ],
    correctAnswer: 1,
    explanation: '`Optional` was intentionally designed by Brian Goetz as a return type for library methods where "no result" is a normal possibility. Using it as a field wastes memory, breaks `Serializable` frameworks, and complicates parameter passing.',
    tags: ['Optional Anti-Patterns', 'API Design', 'Serializable', 'Memory Overhead']
  },
  {
    id: 328,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'How do Reactive Streams in `java.util.concurrent.Flow` model Asynchronous Non-blocking Backpressure?',
    codeSnippet: `public interface Subscription {
    public void request(long n); // Backpressure request!
    public void cancel();
}`,
    options: [
      'By dropping all incoming messages when queues reach 10 items',
      'The `Subscriber` requests a specific number of items `n` via `subscription.request(n)`; the `Publisher` is strictly forbidden from pushing more than `n` items until the Subscriber requests more, preventing buffer exhaustion on slow consumers',
      'By throwing an OutOfMemoryError when overloaded',
      'By executing publishers synchronously'
    ],
    correctAnswer: 1,
    explanation: 'In Java 9 `Flow` (Reactive Streams specification), demand is pull-driven: the subscriber signals capacity by calling `request(n)`. The publisher only emits elements up to the requested demand, preventing consumer overload.',
    tags: ['Flow API', 'Reactive Streams', 'Backpressure', 'Subscription']
  },
  {
    id: 329,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is "Pipeline Fusing" (Loop Fusion) in Java Streams execution?',
    codeSnippet: `list.stream()
    .filter(x -> x > 10)
    .map(x -> x * 2)
    .filter(x -> x < 100)
    .findFirst();`,
    options: [
      'Merging multiple CPU cores into a single thread',
      'The JVM Stream engine links multiple intermediate stateless operations into a single combined pipeline traversal pass per element, executing filter -> map -> filter -> findFirst on item 1 before ever touching item 2, with zero intermediate collection allocations',
      'Compressing stream bytecode into a single ZIP archive',
      'Converting stream lambdas into SQL queries'
    ],
    correctAnswer: 1,
    explanation: 'Streams do not create intermediate lists between operations. Instead, operations are fused into a single downstream consumer chain: each element flows through the entire pipeline until consumed, short-circuiting as early as possible.',
    tags: ['Pipeline Fusing', 'Lazy Evaluation', 'Stream Internals']
  },
  {
    id: 330,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the difference between `Stream.map()` and `Stream.flatMap()`?',
    options: [
      '`map()` applies a 1-to-1 transformation function returning a value `R`; `flatMap()` applies a 1-to-many function returning a `Stream<R>` and flattens the resulting streams of streams into a single composite stream',
      '`map()` is parallel; `flatMap()` is sequential',
      '`flatMap()` is only for Map collections',
      'There is no functional difference'
    ],
    correctAnswer: 0,
    explanation: '`map(T -> R)` produces one output item per input item. `flatMap(T -> Stream<R>)` unwraps each generated inner stream, concatenating all items into a single flattened output stream.',
    tags: ['map vs flatMap', 'Stream Transformation', 'Functional Programming']
  },
  {
    id: 331,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What does the `Characteristics.CONCURRENT` flag on a custom `Collector` communicate to the stream engine?',
    options: [
      'The collector must run on multiple computers',
      'The accumulator function can be invoked concurrently from multiple threads on the SAME accumulator container instance without external synchronization (requiring `Characteristics.UNORDERED` or an unordered stream)',
      'The collector creates a new thread pool',
      'The collector is deprecated'
    ],
    correctAnswer: 1,
    explanation: 'If a collector has `CONCURRENT`, parallel streams do not create separate accumulators per thread to combine later; instead, all parallel worker threads fold elements directly into a single concurrent shared accumulator (e.g. `ConcurrentHashMap`).',
    tags: ['Collector.Characteristics', 'CONCURRENT', 'Parallel Reduction']
  },
  {
    id: 332,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is the danger of "Capturing Lambdas" in high-frequency loops or stream pipelines?',
    codeSnippet: `for (int i = 0; i < 10_000_000; i++) {
    int factor = getFactor(i); // Local variable
    process((x) -> x * factor); // Captures 'factor'!
}`,
    options: [
      'Capturing lambdas cause infinite loops',
      'Because the lambda captures a non-constant local variable `factor`, `LambdaMetafactory` cannot reuse a singleton instance; it must allocate a new lambda instance on the heap on EVERY iteration, generating massive GC allocation pressure',
      'Capturing lambdas throw ClassCastException',
      'Capturing lambdas cannot access primitive types'
    ],
    correctAnswer: 1,
    explanation: 'A non-capturing lambda (stateless) is instantiated once and cached as a singleton. A capturing lambda (capturing `factor` or `this`) creates a new heap object every time it is evaluated, creating millions of short-lived objects in tight loops.',
    tags: ['Capturing Lambdas', 'Lambda Allocation', 'GC Pressure', 'Performance']
  },
  {
    id: 333,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the difference between `Stream.findFirst()` and `Stream.findAny()`?',
    options: [
      '`findFirst()` is for numbers; `findAny()` is for strings',
      '`findFirst()` strictly returns the first element in encounter order (costly in parallel streams); `findAny()` returns any element matching the predicate non-deterministically, offering maximum throughput in parallel streams',
      '`findAny()` returns a list of elements',
      'Both have identical performance in parallel streams'
    ],
    correctAnswer: 1,
    explanation: 'In parallel streams with ordered data sources, enforcing `findFirst()` requires coordinating threads to ensure the earliest element is returned. `findAny()` allows whichever thread finds a match first to return immediately.',
    tags: ['findFirst', 'findAny', 'Parallel Performance', 'Encounter Order']
  },
  {
    id: 334,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is the purpose of `Spliterator.SIZED` and `Spliterator.SUBSIZED` characteristics?',
    options: [
      'They indicate that the exact number of elements is known before traversal (`SIZED`), and that all sub-spliterators produced by `trySplit()` will also have exact known sizes (`SUBSIZED`), allowing pre-allocation of result arrays',
      'They indicate that stream elements are Strings',
      'They limit stream size to 1000 items',
      'They calculate disk file size'
    ],
    correctAnswer: 0,
    explanation: 'When a Spliterator is `SIZED` and `SUBSIZED` (like from an `ArrayList`), the stream engine knows the exact size of all chunks in advance. It can pre-allocate backing arrays for parallel operations without dynamic resizing overhead.',
    tags: ['Spliterator Characteristics', 'SIZED', 'SUBSIZED', 'Performance']
  },
  {
    id: 335,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'How do you execute a Parallel Stream on a custom `ForkJoinPool` instead of the global `commonPool()`?',
    codeSnippet: `ForkJoinPool customPool = new ForkJoinPool(4);
customPool.submit(() ->
    list.parallelStream().map(this::process).toList()
).get();`,
    options: [
      'By passing the pool to `list.parallelStream(customPool)`',
      'By submitting the parallel stream pipeline execution as a Callable inside `customPool.submit(...)`; the parallel stream detects the ambient worker thread and runs its split tasks on that specific pool',
      'Parallel streams cannot use custom pools under any circumstances',
      'By setting a JVM system property `-Dparallel.pool=custom`'
    ],
    correctAnswer: 1,
    explanation: 'While the Streams API lacks a direct pool parameter, invoking `.parallelStream()` inside a `customPool.submit()` task causes the stream runtime to bind to the current `ForkJoinPool` worker thread, isolating its workload.',
    tags: ['ForkJoinPool', 'Parallel Streams', 'Thread Isolation']
  },
  {
    id: 336,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the purpose of `DoubleSummaryStatistics` / `IntSummaryStatistics` in Stream reductions?',
    codeSnippet: `IntSummaryStatistics stats = list.stream()
    .mapToInt(Order::getAmount)
    .summaryStatistics();
System.out.println(stats.getAverage() + " " + stats.getMax() + " " + stats.getSum());`,
    options: [
      'To record statistics to a database',
      'It computes count, min, max, sum, and average simultaneously in a single iteration pass over primitive streams with zero boxing',
      'To display chart graphics in Swing',
      'To validate statistical normal distribution'
    ],
    correctAnswer: 1,
    explanation: '`summaryStatistics()` calculates count, sum, min, average, and max in one single $O(N)$ pass over primitive data without repeated traversals or multiple collector merges.',
    tags: ['summaryStatistics', 'IntStream', 'Reduction']
  },
  {
    id: 337,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'Why does modifying the source collection while a Stream is traversing it throw `ConcurrentModificationException` (Non-Interference Rule)?',
    options: [
      'Because streams convert collections to arrays',
      'Because the Streams API contract enforces Non-Interference: the data source of a stream must not be structurally modified during the execution of a stream pipeline (unless backed by a concurrent collection)',
      'Because streams lock all CPU threads',
      'Because stream operations run in separate JVM processes'
    ],
    correctAnswer: 1,
    explanation: 'Streams assume the underlying data source is not structurally modified between pipeline initialization and completion. Mutating the backing list causes standard fail-fast iterators to throw `ConcurrentModificationException`.',
    tags: ['Non-Interference', 'ConcurrentModificationException', 'Streams']
  },
  {
    id: 338,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is the difference between `Stream.reduce(identity, accumulator, combiner)` and `Stream.collect(...)`?',
    options: [
      '`reduce()` is functional and immutable (accumulates by returning a new value on each step `(acc, item) -> newAcc`); `collect()` performs mutable reduction (mutates an existing container in-place `(container, item) -> container.add(item)`), offering much higher throughput for collections',
      '`reduce()` is only for strings',
      '`collect()` cannot run in parallel',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: '`reduce()` is pure functional reduction—if reducing to a list, it would create a new list for every item ($O(N^2)$ copies). `collect()` is designed for mutable reduction: it mutates a single accumulator in-place ($O(N)$), combining chunk accumulators in parallel.',
    tags: ['reduce vs collect', 'Mutable Reduction', 'Functional Programming']
  },
  {
    id: 339,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the purpose of `@FunctionalInterface` annotation on a Java interface?',
    options: [
      'It is mandatory for all interfaces in Java 8+',
      'It acts as an informative compiler check ensuring that the interface declares exactly one abstract method (SAM - Single Abstract Method), producing a compile-time error if multiple abstract methods are declared',
      'It converts interface methods into static methods',
      'It makes the interface thread-safe'
    ],
    correctAnswer: 1,
    explanation: '`@FunctionalInterface` is optional but best practice. It instructs `javac` to verify that the interface qualifies as a SAM interface (ignoring `default`, `static`, or `Object` public methods), catching accidental addition of second abstract methods.',
    tags: ['@FunctionalInterface', 'SAM', 'Compile-Time Checks']
  },
  {
    id: 340,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'How do you compose functions using `Function.compose()` vs `Function.andThen()`?',
    codeSnippet: `Function<Integer, Integer> times2 = x -> x * 2;
Function<Integer, Integer> plus3  = x -> x + 3;
Function<Integer, Integer> f1 = times2.compose(plus3); // plus3 FIRST, then times2: (5 + 3) * 2 = 16
Function<Integer, Integer> f2 = times2.andThen(plus3); // times2 FIRST, then plus3: (5 * 2) + 3 = 13`,
    options: [
      'Both execute functions in the exact same order',
      '`f.compose(g)` computes $f(g(x))$ (applies `g` first, then `f`); `f.andThen(g)` computes $g(f(x))$ (applies `f` first, then `g`)',
      '`compose` is asynchronous; `andThen` is synchronous',
      '`compose` is deprecated in Java 17'
    ],
    correctAnswer: 1,
    explanation: '`compose` applies the parameter function *before* the caller function. `andThen` applies the caller function *first*, and feeds its result into the parameter function.',
    tags: ['Function.compose', 'Function.andThen', 'Function Composition']
  },
  {
    id: 341,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is the role of `BiConsumer<T, U>` in Java standard functional interfaces?',
    options: [
      'Accepts two input arguments and returns a boolean',
      'Accepts two input arguments of types `T` and `U`, performs side-effects (e.g. `(key, value) -> System.out.println(k + "=" + v)`), and returns no result (`void`)',
      'Accepts two arguments and returns a new object',
      'Converts two arguments to a Tuple'
    ],
    correctAnswer: 1,
    explanation: '`BiConsumer<T, U>` represents an operation that accepts two input arguments and returns nothing (`void`). It is commonly used in `Map.forEach((k, v) -> ...)` and custom collector accumulators.',
    tags: ['BiConsumer', 'Functional Interfaces', 'Map.forEach']
  },
  {
    id: 342,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the result of calling `Stream.of(null)` vs `Stream.ofNullable(null)` (Java 9)?',
    options: [
      'Both create an empty stream',
      '`Stream.of(null)` creates a single-element stream containing `null`; `Stream.ofNullable(null)` returns an empty stream with zero elements',
      '`Stream.ofNullable(null)` throws a NullPointerException',
      'Both throw NullPointerException'
    ],
    correctAnswer: 1,
    explanation: '`Stream.of(null)` produces a stream with one element whose value is `null`. `Stream.ofNullable(null)` safely returns an empty stream `Stream.empty()`, preventing downstream NPEs in pipelines.',
    tags: ['Stream.ofNullable', 'Null Safety', 'Java 9']
  },
  {
    id: 343,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is the purpose of `Collectors.groupingByConcurrent(...)` in parallel streams?',
    options: [
      'It groups stream elements into an array',
      'It collects elements into a shared `ConcurrentMap` concurrently from multiple threads without intermediate partition combining passes, maximizing parallel grouping throughput when ordering is not required',
      'It executes grouping in a separate Docker container',
      'It is identical to standard groupingBy'
    ],
    correctAnswer: 1,
    explanation: 'Standard `groupingBy` in parallel streams builds separate maps per thread and merges them hierarchically. `groupingByConcurrent` allows all parallel threads to insert into a single shared `ConcurrentHashMap` directly, eliminating map-merge overhead.',
    tags: ['groupingByConcurrent', 'ConcurrentMap', 'Parallel Streams', 'Performance']
  },
  {
    id: 344,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'Why is `Stream.peek()` intended purely for debugging and NOT for modifying application state?',
    codeSnippet: `// BAD PRACTICE
list.stream().peek(item -> item.setStatus("PROCESSED")).toList();`,
    options: [
      'peek() throws an exception in production JVMs',
      'Because `peek()` exists only to support debugging actions without altering element flow; stream optimizations (e.g. `count()` or `findFirst()`) may skip invoking `peek()` altogether due to lazy evaluation and compiler short-circuiting',
      'peek() deletes elements from the stream',
      'peek() encrypts stream items'
    ],
    correctAnswer: 1,
    explanation: '`Stream.peek(Consumer)` is designed for logging/debugging. In modern JDKs, queries like `stream.peek(...).count()` may optimize away intermediate operations entirely because element contents are not required to calculate count.',
    tags: ['Stream.peek', 'Lazy Evaluation', 'API Pitfalls']
  },
  {
    id: 345,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the difference between `UnaryOperator<T>` and `Function<T, T>`?',
    options: [
      '`UnaryOperator<T>` extends `Function<T, T>` where the input and output types are identical, providing specialized naming and primitive variants (`IntUnaryOperator`)',
      '`UnaryOperator` cannot be used in lambdas',
      '`UnaryOperator` accepts two parameters',
      'There is no inheritance relationship between them'
    ],
    correctAnswer: 0,
    explanation: '`UnaryOperator<T>` is a functional interface extending `Function<T, T>`. It represents an operation on a single operand that produces a result of the same type as its operand (e.g. `List.replaceAll(operator)`).',
    tags: ['UnaryOperator', 'Function', 'Functional Interfaces']
  },
  {
    id: 346,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is the purpose of `Spliterator.IMMUTABLE` and `Spliterator.CONCURRENT` characteristics?',
    options: [
      '`IMMUTABLE` indicates the source cannot be structurally modified; `CONCURRENT` indicates the source may be concurrently modified by other threads without throwing `ConcurrentModificationException`',
      '`IMMUTABLE` means the stream cannot be closed',
      '`CONCURRENT` creates a new thread pool',
      'They are legacy flags from Java 5'
    ],
    correctAnswer: 0,
    explanation: '`IMMUTABLE` guarantees the data source will never change during traversal. `CONCURRENT` (e.g. on `ConcurrentLinkedQueue`) signals that concurrent modifications are safe and will not corrupt stream traversal.',
    tags: ['Spliterator Characteristics', 'IMMUTABLE', 'CONCURRENT']
  },
  {
    id: 347,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'How do you create a custom lazy infinite Stream in Java with `StreamSupport.stream()` and a custom `Spliterator`?',
    codeSnippet: `Spliterator<Long> spliterator = new FibonacciSpliterator();
Stream<Long> fibStream = StreamSupport.stream(spliterator, false);`,
    options: [
      'By allocating an array of size Long.MAX_VALUE',
      'By passing a custom `Spliterator` implementation with characteristic `ORDERED` and `estimateSize() == Long.MAX_VALUE` to `StreamSupport.stream(spliterator, parallel)`, enabling on-demand computation in `tryAdvance()`',
      'By spawning a background thread that writes to a pipe',
      'Infinite streams are forbidden in Java'
    ],
    correctAnswer: 1,
    explanation: '`StreamSupport.stream(spliterator, false)` is the low-level engine to create streams. By implementing `tryAdvance()` to calculate the next element on demand, you achieve high-performance zero-allocation lazy streams.',
    tags: ['StreamSupport', 'Custom Spliterator', 'Infinite Stream']
  },
  {
    id: 348,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the output of `Stream.concat(Stream.of("A"), Stream.of("B")).toList()`?',
    options: [
      'An unmodifiable List containing `["A", "B"]`',
      '`["B", "A"]`',
      'Throws an IllegalArgumentException',
      'Creates a 2D stream'
    ],
    correctAnswer: 0,
    explanation: '`Stream.concat(a, b)` lazily concatenates two streams preserving encounter order: stream `a` is consumed first, followed by stream `b`.',
    tags: ['Stream.concat', 'Stream API']
  },
  {
    id: 349,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'How does `Collectors.mapping(...)` enable nested downstream transformations inside a `groupingBy` collector?',
    codeSnippet: `Map<Department, List<String>> namesByDept = employees.stream().collect(
    Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.mapping(Employee::getName, Collectors.toList())
    )
);`,
    options: [
      'It creates a SQL join table',
      'It adapts a collector accepting elements of type `U` (`String`) to one accepting elements of type `T` (`Employee`) by applying a mapping function before accumulation in the downstream collector',
      'It runs mapping in a separate background thread',
      'It is deprecated in favor of flatMap'
    ],
    correctAnswer: 1,
    explanation: '`Collectors.mapping(mapper, downstream)` applies the mapper function to each element before passing it to the downstream collector, enabling multi-level aggregation without intermediate stream passes.',
    tags: ['Collectors.mapping', 'Downstream Collectors', 'groupingBy']
  },
  {
    id: 350,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is the purpose of `DoublePredicate`, `IntConsumer`, and `LongFunction` in the `java.util.function` package?',
    options: [
      'They are primitive-specialized functional interfaces designed to eliminate autoboxing overhead when executing lambdas with primitive types',
      'They format numbers to strings',
      'They are interfaces for database indexing',
      'They provide multi-threading capabilities'
    ],
    correctAnswer: 0,
    explanation: 'Generic interfaces like `Predicate<Double>` require converting `double` to boxed `Double`. Primitive specializations (`DoublePredicate`, `IntConsumer`, etc.) accept and return unboxed primitives directly, maintaining peak CPU performance.',
    tags: ['Primitive Specialization', 'java.util.function', 'Performance']
  },
  {
    id: 351,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What does `Stream.dropWhile(predicate)` (Java 9+) do?',
    codeSnippet: `Stream.of(2, 4, 6, 7, 8, 10)
      .dropWhile(x -> x % 2 == 0)
      .forEach(System.out::print); // What is printed?`,
    options: [
      '`7810` (drops elements as long as predicate is true, then emits all remaining elements from the first failure onward)',
      '`7`',
      '`246`',
      '`810`'
    ],
    correctAnswer: 0,
    explanation: '`dropWhile` drops elements from the start of an ordered stream as long as the predicate holds true. As soon as the first element fails the predicate (here `7`), it stops dropping and emits that element and all subsequent elements.',
    tags: ['dropWhile', 'Stream API', 'Java 9']
  },
  {
    id: 352,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is the difference between `Collectors.partitioningBy(predicate)` and `Collectors.groupingBy(classifier)`?',
    options: [
      '`partitioningBy` partitions stream items into a `Map<Boolean, List<T>>` with exactly two keys (`true` and `false`), guaranteed to contain both keys even if one partition is empty; `groupingBy` partitions into arbitrary keys dynamically',
      '`partitioningBy` only works on parallel streams',
      '`groupingBy` can only return Strings',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: '`partitioningBy` is specialized for boolean predicates: it always produces a map with `Boolean.TRUE` and `Boolean.FALSE` keys. `groupingBy` is generalized for any classifier function.',
    tags: ['partitioningBy', 'groupingBy', 'Collectors']
  },
  {
    id: 353,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'How do you handle checked exceptions inside a Java Stream lambda cleanly?',
    codeSnippet: `// Can you write: list.stream().map(file -> Files.readString(file)).toList(); ?`,
    options: [
      'Java automatically catches checked exceptions in lambdas and ignores them',
      'Standard functional interfaces (`Function`) do not declare `throws Throwable`; developers must either wrap the call in a `try-catch` block inside the lambda, create a custom wrapper rethrowing as unchecked `RuntimeException`, or use library helpers (e.g. Vavr / sneakilyThrow)',
      'By adding `throws Exception` to the enclosing class declaration',
      'Checked exceptions are ignored by the JVM verifier'
    ],
    correctAnswer: 1,
    explanation: 'SAM interfaces in `java.util.function` do not declare checked exceptions in their method signatures. Any method throwing a checked exception must be caught and re-thrown as an unchecked exception or wrapped in a functional monad (like `Try` in Vavr).',
    tags: ['Checked Exceptions', 'Lambdas', 'Functional Error Handling']
  },
  {
    id: 354,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the behavior of `Stream.empty()`?',
    options: [
      'Returns an unmodifiable, sequential empty stream containing zero elements',
      'Deletes the calling object',
      'Throws a NoSuchElementException',
      'Allocates a null stream'
    ],
    correctAnswer: 0,
    explanation: '`Stream.empty()` returns a shared singleton empty stream that terminates immediately when any terminal operation is evaluated.',
    tags: ['Stream.empty', 'Stream API']
  },
  {
    id: 355,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is `java.util.function.BinaryOperator.maxBy(Comparator<T>)`?',
    options: [
      'Returns a BinaryOperator that returns the greater of its two elements according to the specified `Comparator`',
      'Finds the maximum value in a database table',
      'Sets the CPU clock rate to maximum',
      'Calculates array length'
    ],
    correctAnswer: 0,
    explanation: '`BinaryOperator.maxBy(comparator)` is a static combinator that returns a `(a, b) -> comparator.compare(a, b) >= 0 ? a : b` function, commonly used in stream reductions like `Collectors.reducing()`.',
    tags: ['BinaryOperator.maxBy', 'Comparator', 'Stream Reductions']
  },
  {
    id: 356,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'What is "Currying" in Java functional programming?',
    codeSnippet: `Function<Integer, Function<Integer, Integer>> add = x -> y -> x + y;
int result = add.apply(3).apply(5); // 8`,
    options: [
      'A culinary dish prepared by the JVM',
      'The technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of single-argument functions chained together',
      'Converting Java code to Kotlin',
      'Encrypting function parameters'
    ],
    correctAnswer: 1,
    explanation: 'Currying transforms an $N$-ary function $(A, B) \to C$ into a chain of unary functions $A \to (B \to C)$, enabling partial application where some arguments are supplied early and retained in closures.',
    tags: ['Currying', 'Higher-Order Functions', 'Functional Programming']
  },
  {
    id: 357,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What does `Collectors.joining(delimiter, prefix, suffix)` produce?',
    codeSnippet: `Stream.of("A", "B", "C").collect(Collectors.joining(", ", "[", "]"));`,
    options: [
      '`"[A, B, C]"`',
      '`"A, B, C"`',
      '`"[A][B][C]"`',
      'Throws an IllegalArgumentException'
    ],
    correctAnswer: 0,
    explanation: '`Collectors.joining(delimiter, prefix, suffix)` combines CharSequence elements into a single `String` joined by the delimiter and wrapped in prefix and suffix.',
    tags: ['Collectors.joining', 'String Joining']
  },
  {
    id: 358,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Expert',
    question: 'What is the purpose of `java.util.function.Supplier<T>`?',
    options: [
      'Accepts an argument of type T and returns void',
      'Represents a supplier of results that takes zero arguments and returns a value of type `T` (e.g. `() -> new ArrayList<>()`), widely used for lazy value generation and factory instantiation',
      'Stores suppliers in a supply-chain database',
      'Supplies network bandwidth'
    ],
    correctAnswer: 1,
    explanation: '`Supplier<T>` is a zero-argument functional interface `() -> T`. It enables deferred lazy evaluation, such as `Optional.orElseGet(Supplier)` which is only executed if the Optional is empty.',
    tags: ['Supplier', 'Lazy Evaluation', 'Factory']
  },
  {
    id: 359,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Master',
    question: 'How do you compose Predicates with `and()`, `or()`, and `negate()` in Java?',
    codeSnippet: `Predicate<String> nonNull = Objects::nonNull;
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> valid = nonNull.and(notEmpty).and(s -> s.length() < 10);`,
    options: [
      'By using bitwise operators `&` and `|`',
      'By invoking default methods on `java.util.function.Predicate`, chaining boolean expressions fluently into short-circuiting composite predicates',
      'Predicates cannot be composed in Java',
      'By compiling predicates to SQL'
    ],
    correctAnswer: 1,
    explanation: 'The `Predicate` interface provides default methods (`and`, `or`, `negate`) that combine individual predicates into rich boolean filter logic with short-circuit evaluation.',
    tags: ['Predicate Composition', 'and/or/negate', 'Functional Programming']
  },
  {
    id: 360,
    category: 'functional-streams',
    categoryTitle: 'Functional Programming & Streams In-Depth',
    difficulty: 'Advanced',
    question: 'What is the return type of `Stream.count()` and why?',
    options: [
      '`int` because streams cannot exceed 2 billion items',
      '`long` because streams represent potentially unbounded data sets that may contain more elements than the maximum `int` value ($2^{31}-1$)',
      '`BigInteger`',
      '`Double`'
    ],
    correctAnswer: 1,
    explanation: '`Stream.count()` returns `long` (64-bit integer) to accommodate large-scale data sets and infinite streams sliced with `.limit()`.',
    tags: ['Stream.count', 'long', 'Stream API']
  }
];
