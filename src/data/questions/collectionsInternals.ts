import { Question } from '../../types';

export const collectionsQuestions: Question[] = [
  {
    id: 121,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'In Java 8+ `HashMap`, under what exact conditions is a linked list collision bucket converted ("treeified") into a Red-Black Tree (`TreeNode`)?',
    options: [
      'When the number of entries in the entire map exceeds the load factor',
      'When the number of nodes in a single bucket reaches `TREEIFY_THRESHOLD` (8) AND the total table array capacity is at least `MIN_TREEIFY_CAPACITY` (64)',
      'When any two keys have the exact same hash code value',
      'When the map is accessed concurrently by more than 2 threads'
    ],
    correctAnswer: 1,
    explanation: 'In Java 8 `HashMap`, when a collision bucket reaches 8 elements (`TREEIFY_THRESHOLD`), the map checks the total bucket array length. If the table capacity is less than 64 (`MIN_TREEIFY_CAPACITY`), it resizes the table instead of treeifying. Only if capacity is >= 64 does it convert the linked list into a balanced Red-Black tree (`TreeNode`), improving worst-case search from O(n) to O(log n).',
    tags: ['HashMap', 'Treeification', 'Red-Black Tree', 'Data Structures']
  },
  {
    id: 122,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'Why does `HashMap` require its bucket array capacity to always be a power of two (e.g. 16, 32, 64)?',
    options: [
      'Because the JVM memory manager only allocates powers of two',
      'To allow fast bitwise modulo indexing `index = (capacity - 1) & hash` instead of the expensive CPU integer division modulo operator `%`, and to simplify bit-partitioning during table resize',
      'To prevent hash collisions completely',
      'To ensure synchronization across CPU cores'
    ],
    correctAnswer: 1,
    explanation: 'When capacity is a power of 2 ($N = 2^k$), the modulo operation $hash \\pmod N$ is mathematically equivalent to $(N - 1) \\& hash$. Bitwise AND `&` executes in 1 CPU cycle, whereas integer division `%` takes dozens of cycles. Furthermore, on resizing (doubling capacity), an element either stays at the same index or shifts by the old capacity based on a single bit check.',
    tags: ['HashMap', 'Bitwise Indexing', 'Performance', 'Algorithms']
  },
  {
    id: 123,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `ConcurrentHashMap` in Java 8+ achieve synchronized insertion without locking the entire map or using the legacy Java 7 Segment locks?',
    options: [
      'By acquiring an OS-level mutex on the entire table array',
      'If the target bucket head is null, it uses a CAS (`compareAndSwapObject`) to insert the new Node lock-free; if the bucket is non-null, it synchronizes exclusively on the first Node (head) of that specific bin',
      'By using `CopyOnWrite` on every put operation',
      'By redirecting writes to an asynchronous worker thread pool'
    ],
    correctAnswer: 1,
    explanation: 'Java 8 `ConcurrentHashMap` discarded Segment-level locks. For empty buckets, it inserts the new `Node` using a lock-free CAS. If a bucket already contains elements, it locks only the first `Node` (head of list/tree) using `synchronized(f)`, allowing concurrent writes to different buckets simultaneously.',
    tags: ['ConcurrentHashMap', 'CAS', 'Bin Locking', 'Java 8']
  },
  {
    id: 124,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'How does `IdentityHashMap` determine key equality, and what internal data structure does it use?',
    options: [
      'It uses `key1.equals(key2)` and a linked list table',
      'It uses reference equality `key1 == key2` and `System.identityHashCode(key)`, and stores alternating keys and values in a single flat flat-array with linear probing',
      'It uses cryptographic SHA-256 hashes',
      'It uses a Red-Black tree ordered by ClassName'
    ],
    correctAnswer: 1,
    explanation: '`IdentityHashMap` deliberately violates the general `Map` contract by using reference equality (`k1 == k2`) instead of `.equals()`. It stores keys and values in a single flat `Object[] table` where key at `table[i]` is paired with value at `table[i+1]`, resolving collisions via linear probing without linked nodes.',
    tags: ['IdentityHashMap', 'Reference Equality', 'Linear Probing']
  },
  {
    id: 125,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'How does `EnumMap` achieve superior speed and memory efficiency compared to standard `HashMap`?',
    options: [
      'It compiles enum keys into native C++ structs',
      'It internally uses a compact flat array (`Object[] vals`) indexed directly by the enum constant\'s `ordinal()`, achieving O(1) array lookups with zero hash computation, zero collisions, and minimal memory',
      'It uses a lock-free skip list',
      'It stores entries in CPU registers'
    ],
    correctAnswer: 1,
    explanation: 'Because the universe of enum keys is fixed and numbered sequentially from 0 to N-1 (`ordinal()`), `EnumMap` maps key lookups directly to array index `vals[key.ordinal()]`. This eliminates hashing, collision resolution, node allocations, and pointer chasing, making it extremely fast.',
    tags: ['EnumMap', 'Ordinal Indexing', 'Optimization']
  },
  {
    id: 126,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `EnumSet` represent sets of enums with fewer than 64 constants in `RegularEnumSet`?',
    options: [
      'Using a 64-element ArrayList',
      'Using a single 64-bit primitive `long elements` bitmask, where each bit position represents the presence or absence of the enum constant at that ordinal, enabling ultra-fast bitwise CPU operations',
      'Using an off-heap DirectByteBuffer',
      'Using a compressed trie structure'
    ],
    correctAnswer: 1,
    explanation: 'For enum types with $\\le 64$ elements, `EnumSet.noneOf()` creates a `RegularEnumSet` backed by a single primitive `long elements` field. Set operations (union, intersection, contains) are executed as single-cycle bitwise CPU instructions (`|`, `&`, `~`), vastly outperforming hash sets in speed and memory.',
    tags: ['EnumSet', 'RegularEnumSet', 'Bitmask', 'Bitwise Operations']
  },
  {
    id: 127,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'How does `LinkedHashMap` maintain insertion or access order of its entries?',
    options: [
      'By sorting all keys in an array on every insertion',
      'By maintaining a doubly-linked list running through all of its `Entry` nodes across the entire hash table buckets',
      'By executing an asynchronous thread that reorders entries',
      'By storing timestamp strings in Metaspace'
    ],
    correctAnswer: 1,
    explanation: '`LinkedHashMap.Entry` extends `HashMap.Node` with `before` and `after` pointers, forming a global doubly-linked list that links all entries in either insertion order or LRU access order (when `accessOrder = true`).',
    tags: ['LinkedHashMap', 'Doubly Linked List', 'Access Order']
  },
  {
    id: 128,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'How can `LinkedHashMap` be configured to function as a fixed-capacity Least Recently Used (LRU) cache?',
    codeSnippet: `Map<K, V> lruCache = new LinkedHashMap<K, V>(16, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > MAX_CAPACITY;
    }
};`,
    options: [
      'By enabling accessOrder = true in the constructor and overriding `removeEldestEntry` to return true when size exceeds capacity',
      'By invoking `System.gc()` after every insertion',
      'By creating a custom Red-Black tree comparator',
      'By wrapping the map with `Collections.synchronizedMap()` only'
    ],
    correctAnswer: 0,
    explanation: 'Passing `true` for `accessOrder` ensures that calling `get()` or `put()` moves the accessed entry to the end of the doubly-linked list. Overriding `removeEldestEntry()` to return `size() > MAX_CAPACITY` causes `put()` to automatically evict the least recently used (head) entry whenever max capacity is exceeded.',
    tags: ['LRU Cache', 'LinkedHashMap', 'removeEldestEntry']
  },
  {
    id: 129,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'What is the purpose of the "Hash Spreading / Perturbation Function" `(h = key.hashCode()) ^ (h >>> 16)` in `HashMap`?',
    options: [
      'To encrypt key hashcodes against security attacks',
      'To fold the higher 16 bits of the hash code into the lower 16 bits using XOR, ensuring that high-order bits influence index calculation when table capacity is small (e.g. 16), dramatically reducing collisions',
      'To convert negative hashcodes to positive numbers',
      'To force hashcodes to be prime numbers'
    ],
    correctAnswer: 1,
    explanation: 'Because table index is computed as `(capacity - 1) & hash`, with small tables (e.g. 16), only the lowest 4 bits of the hash code are used. If keys differ only in high-order bits, all keys would collide in bucket 0. Spreading `h ^ (h >>> 16)` ensures high-order bit variations propagate into the lower bits.',
    tags: ['HashMap', 'Hash Spreading', 'Bitwise Operations']
  },
  {
    id: 130,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the difference between "Fail-Fast" and "Fail-Safe / Weakly Consistent" iterators in Java Collections?',
    options: [
      'Fail-fast iterators never throw exceptions; fail-safe iterators crash the JVM',
      'Fail-fast iterators (e.g. ArrayList, HashMap) check an internal `modCount` and throw `ConcurrentModificationException` immediately if modified structurally during iteration; weakly consistent iterators (e.g. ConcurrentHashMap, CopyOnWriteArrayList) tolerate concurrent modifications without CME',
      'Fail-fast iterators are thread-safe; fail-safe iterators are not',
      'Fail-safe iterators only work with primitive types'
    ],
    correctAnswer: 1,
    explanation: 'Fail-fast iterators detect structural changes via `modCount != expectedModCount` and throw `ConcurrentModificationException` immediately. Concurrent collection iterators (like `ConcurrentHashMap` or `CopyOnWriteArrayList`) are weakly consistent: they iterate over elements as they existed at creation or dynamically, never throwing CME.',
    tags: ['Fail-Fast', 'Fail-Safe', 'modCount', 'ConcurrentModificationException']
  },
  {
    id: 131,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `WeakHashMap` automatically reclaim memory for entries whose keys are no longer referenced by the application?',
    options: [
      'It deletes entries every 5 seconds using a timer task',
      'Its internal `Entry` class extends `WeakReference<K>` and registers with a `ReferenceQueue<K>`; during subsequent map operations (like `get()` or `put()`), it calls `expungeStaleEntries()` to poll the queue and remove entries whose keys were collected by GC',
      'It intercepts CPU memory writes via JNI',
      'It forces all values to be soft references'
    ],
    correctAnswer: 1,
    explanation: 'In `WeakHashMap`, each bucket node extends `WeakReference<K>`. When GC discovers a key is only weakly reachable, it enqueues the reference into an associated `ReferenceQueue`. On subsequent map calls, `expungeStaleEntries()` polls this queue and removes the corresponding value and entry from the table.',
    tags: ['WeakHashMap', 'WeakReference', 'ReferenceQueue', 'Memory Management']
  },
  {
    id: 132,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'How does `ArrayDeque` implement a resizable double-ended queue without linked node allocation overhead?',
    options: [
      'By using a circular array with `head` and `tail` pointer indices masked by bitwise operations `(head - 1) & (elements.length - 1)`',
      'By allocating a new array on every `push()` operation',
      'By storing elements in a binary search tree',
      'By compressing elements into byte arrays'
    ],
    correctAnswer: 0,
    explanation: '`ArrayDeque` is backed by an array whose size is always a power of 2. It tracks `head` and `tail` indices. Inserting at head or tail wraps around circularly using bitwise mask `(head - 1) & (length - 1)`. It has no node object allocation overhead, making it significantly faster than `LinkedList` as both a Queue and a Stack.',
    tags: ['ArrayDeque', 'Circular Buffer', 'Queue', 'Performance']
  },
  {
    id: 133,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `ConcurrentSkipListMap` provide lock-free sorted navigation (O(log N)) in high-concurrency environments?',
    options: [
      'By placing a global lock on a Red-Black Tree',
      'By implementing a probabilistic multi-level linked list (Skip List) where nodes at each level use atomic Compare-And-Set (CAS) references for inserting and marking deleted nodes',
      'By dividing the sorted array into 1024 fixed partitions',
      'By using disk-based B-Tree indexing'
    ],
    correctAnswer: 1,
    explanation: 'Standard balanced trees (AVL, Red-Black) are notoriously hard to balance lock-free due to complex rebalancing rotations. `ConcurrentSkipListMap` uses Skip Lists: multiple hierarchy levels of linked nodes where nodes are linked and unlinked using CAS and logical deletion markers, offering lock-free concurrent sorted maps with O(log N) operations.',
    tags: ['ConcurrentSkipListMap', 'SkipList', 'Lock-Free', 'SortedMap']
  },
  {
    id: 134,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the internal data structure and time complexity of `PriorityQueue` in Java?',
    options: [
      'A linked list with O(1) insertion and O(N) removal',
      'A resizable array representing a binary min-heap; peek() is O(1), offer() and poll() are O(log N)',
      'A Red-Black tree with O(1) operations',
      'A hash table with O(1) average time'
    ],
    correctAnswer: 1,
    explanation: '`PriorityQueue` is an unbounded priority queue based on a binary min-heap stored in an array `Object[] queue`. Node `k` has children at `2*k + 1` and `2*k + 2`. `peek()` is O(1), while `offer()` and `poll()` require sift-up and sift-down operations taking O(log N) time.',
    tags: ['PriorityQueue', 'Binary Heap', 'Time Complexity']
  },
  {
    id: 135,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'Why does `ConcurrentHashMap.size()` not lock the map, and how does it compute the element count accurately?',
    options: [
      'It reads an atomic integer that is locked during every put operation',
      'It uses a `baseCount` volatile field along with a striped `CounterCell[]` array (similar to LongAdder); `size()` computes the sum of `baseCount` and all cell values without blocking writers',
      'It iterates over all bins with synchronized locks on every call',
      'It estimates the size using Monte Carlo sampling'
    ],
    correctAnswer: 1,
    explanation: 'To prevent `size()` tracking from becoming a bottleneck under high write contention, `ConcurrentHashMap` uses `baseCount` for low contention and stripes updates across `CounterCell[]` (using `addCount()`). The `mappingCount()` or `size()` method simply sums these counters without holding any locks.',
    tags: ['ConcurrentHashMap', 'size()', 'CounterCell', 'LongAdder']
  },
  {
    id: 136,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'What is a "ForwardingNode" in Java 8+ `ConcurrentHashMap` and what role does it play during concurrent table resizing?',
    options: [
      'A proxy node that routes queries to a remote database cluster',
      'A special marker node with hash = -1 inserted into old table buckets that have already been migrated to the new table; reading threads reaching a ForwardingNode are redirected to the new table, and writing threads are recruited to assist in concurrent transfer (`helpTransfer()`)',
      'A node that forwards exceptions to the uncaught exception handler',
      'A node used exclusively for serialization'
    ],
    correctAnswer: 1,
    explanation: 'During resizing, `ConcurrentHashMap` migrates buckets in parallel chunks. When a bucket is migrated to `nextTable`, its head is replaced with a `ForwardingNode(nextTable)`. If a thread encounters this node, its read proceeds directly on `nextTable`, and if it wants to write, it joins other threads to accelerate table transfer.',
    tags: ['ConcurrentHashMap', 'ForwardingNode', 'Concurrent Resizing']
  },
  {
    id: 137,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the default initial capacity and default load factor for `java.util.HashMap`?',
    options: [
      'Capacity: 10, Load Factor: 0.5',
      'Capacity: 16, Load Factor: 0.75',
      'Capacity: 32, Load Factor: 0.8',
      'Capacity: 8, Load Factor: 1.0'
    ],
    correctAnswer: 1,
    explanation: 'By default, `HashMap` starts with an initial capacity of 16 (`DEFAULT_INITIAL_CAPACITY = 1 << 4`) and a load factor of 0.75 (`DEFAULT_LOAD_FACTOR = 0.75f`), providing an optimal balance between time and space cost before resizing threshold ($16 \\times 0.75 = 12$) is reached.',
    tags: ['HashMap', 'Default Capacity', 'Load Factor']
  },
  {
    id: 138,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'Why should mutable objects never be used as keys in a `HashMap` or `HashSet` if their fields that participate in `hashCode()` or `equals()` are modified after insertion?',
    options: [
      'Because modifying the object immediately throws an UnsupportedOperationException',
      'Because mutating fields changes the object\'s hash code, causing subsequent lookups (`get()`, `remove()`) to search in a different bucket and fail to find the existing entry, effectively creating a memory leak',
      'Because the JVM garbage collector will collect the modified object prematurely',
      'Because HashMap converts mutable keys into Strings'
    ],
    correctAnswer: 1,
    explanation: 'When an entry is placed in a `HashMap`, its bucket index is calculated from `key.hashCode()`. If key fields are subsequently modified, `key.hashCode()` returns a new value. When `map.get(key)` is later called, it looks in the new bucket index where the node does not exist, making the object unretrievable.',
    tags: ['HashMap Keys', 'Mutable Keys', 'hashCode Contract']
  },
  {
    id: 139,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'What happens to a `HashMap` bucket tree (`TreeNode`) when entries are removed and the count drops below `UNTREEIFY_THRESHOLD` (6)?',
    options: [
      'The map throws an IllegalStateException',
      'During resize or removal, if the tree node count drops to 6 or fewer, the Red-Black tree is converted back into a standard singly-linked list of `Node` elements to reduce memory footprint',
      'The entire map is cleared and rebuilt from scratch',
      'The nodes are moved to off-heap storage'
    ],
    correctAnswer: 1,
    explanation: 'To balance the memory overhead of `TreeNode` (which is roughly double the size of a standard `Node`) and prevent thrashing between tree and list structures around threshold 8, `HashMap` defines `UNTREEIFY_THRESHOLD = 6`. When a tree shrinks to $\\le 6$ nodes during resize/split, it untreeifies back to a linked list.',
    tags: ['HashMap', 'Untreeification', 'Data Structures']
  },
  {
    id: 140,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the difference between `ArrayList` and `LinkedList` in terms of memory locality and cache performance?',
    options: [
      'LinkedList has better cache locality because nodes are doubly linked',
      'ArrayList stores elements in a contiguous memory block with excellent CPU cache line prefetching, whereas LinkedList allocates individual Node objects scattered across the heap with poor cache locality and high pointer overhead',
      'Both have identical memory locality in modern HotSpot JVMs',
      'LinkedList uses zero heap memory'
    ],
    correctAnswer: 1,
    explanation: '`ArrayList` holds references in a contiguous array `Object[]`, allowing CPU cache prefetchers to load adjacent elements into L1/L2 cache efficiently. `LinkedList` allocates a separate `Node` object (24+ bytes each) per element scattered across the heap, resulting in pointer dereferencing and constant CPU cache misses.',
    tags: ['ArrayList', 'LinkedList', 'Cache Locality', 'Performance']
  },
  {
    id: 141,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'How does `Collections.synchronizedMap(map)` differ from `ConcurrentHashMap` in locking granularity?',
    options: [
      'SynchronizedMap locks the entire map on a single mutex (`this` or `mutex` object) for every single read and write, whereas ConcurrentHashMap allows concurrent lock-free reads and bucket-level concurrent writes',
      'SynchronizedMap is non-blocking while ConcurrentHashMap uses global locks',
      'SynchronizedMap is faster for multi-core processors',
      'There is no functional or concurrency difference'
    ],
    correctAnswer: 0,
    explanation: '`Collections.synchronizedMap` wraps every operation inside a `synchronized(mutex)` block on a single shared monitor, serializing all threads. `ConcurrentHashMap` uses lock-free reads, CAS operations, and striped bucket-level synchronization, enabling massive concurrent scalability.',
    tags: ['ConcurrentHashMap', 'SynchronizedMap', 'Lock Granularity']
  },
  {
    id: 142,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `BitSet` in Java store millions of boolean flags with minimal memory overhead?',
    options: [
      'By storing an array of `Boolean` objects',
      'By packing bits into an internal `long[] words` array, where each 64-bit `long` word stores 64 boolean flags, requiring only 1 bit per boolean and utilizing bitwise shifts (`wordIndex = bitIndex >> 6`)',
      'By compressing strings with zlib',
      'By using Metaspace storage'
    ],
    correctAnswer: 1,
    explanation: '`BitSet` allocates a primitive `long[] words`. To set or check bit `n`, it computes word index `n >> 6` and bit mask `1L << n`. Storing 1,000,000 booleans requires only ~122 KB of memory (compared to ~16 MB with `Boolean[]` or 1 MB with `boolean[]`).',
    tags: ['BitSet', 'Memory Efficiency', 'Bitwise Packing']
  },
  {
    id: 143,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the growth formula when `ArrayList` exceeds its current capacity in OpenJDK?',
    options: [
      '`newCapacity = oldCapacity * 2`',
      '`newCapacity = oldCapacity + (oldCapacity >> 1)` (grows by 50%)',
      '`newCapacity = oldCapacity + 10`',
      '`newCapacity = oldCapacity * oldCapacity`'
    ],
    correctAnswer: 1,
    explanation: 'In OpenJDK, `ArrayList.grow()` calculates new capacity as `oldCapacity + (oldCapacity >> 1)`, which increases the backing array size by approximately 50% (1.5x factor). This provides amortized O(1) insertion time while avoiding excessive memory allocation.',
    tags: ['ArrayList', 'Growth Factor', 'Amortized Analysis']
  },
  {
    id: 144,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'Why does `TreeSet` / `TreeMap` require elements to implement `Comparable` or provide a `Comparator`, even if they already implement `equals()` and `hashCode()`?',
    options: [
      'Because Red-Black tree insertion and search require a total order relationship via `compareTo()` / `compare()` (returning <0, 0, >0) to navigate left and right children, ignoring `equals()` and `hashCode()`',
      'Because equals() is disabled in Java 17',
      'Because TreeSet uses hash codes to balance trees',
      'Because Comparable is required for serialization'
    ],
    correctAnswer: 0,
    explanation: '`TreeMap` and `TreeSet` are structured as Red-Black binary search trees. Determining whether a node goes to the left or right child requires ordering comparison (`compare(k1, k2)`). Furthermore, two keys are considered identical if and only if `compare(k1, k2) == 0`.',
    tags: ['TreeSet', 'TreeMap', 'Comparable', 'Red-Black Tree']
  },
  {
    id: 145,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'What is the contract between `equals()` and `hashCode()` defined in `java.lang.Object`?',
    options: [
      'If two objects have the same hashCode, they must be equal according to equals()',
      'If two objects are equal according to equals(), they must produce the exact same integer hashCode; however, unequal objects may produce the same hashCode (hash collision)',
      'hashCode must return a random prime number on every invocation',
      'equals() must compare object memory addresses exclusively'
    ],
    correctAnswer: 1,
    explanation: 'The Object contract requires: If `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` MUST be true. The inverse is not required: two unequal objects may produce identical hash codes (a collision). Violating this contract breaks all hash-based collections (`HashMap`, `HashSet`).',
    tags: ['equals', 'hashCode', 'Object Contract']
  },
  {
    id: 146,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'How is `HashSet` implemented internally in Java?',
    options: [
      'As a linked list of unique elements',
      'As a wrapper around an internal `HashMap<E, Object>` where elements are stored as keys, and a dummy singleton `Object PRESENT` is used as the constant value for all entries',
      'As an array of prime numbers',
      'As a custom C++ native set'
    ],
    correctAnswer: 1,
    explanation: '`HashSet` is simply a facade over `HashMap`. Calling `hashSet.add(e)` invokes `map.put(e, PRESENT) == null`, and `hashSet.contains(e)` invokes `map.containsKey(e)`, delegating all hashing and treeification mechanics directly to `HashMap`.',
    tags: ['HashSet', 'HashMap Facade', 'Implementation']
  },
  {
    id: 147,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'What is the performance implication of `List.of(...)` (Java 9+) compared to `Arrays.asList(...)`?',
    options: [
      '`List.of(...)` returns fully immutable, space-efficient, null-hostile compact implementations (e.g. `List12`, `ListN`) without wrapping arrays for small sizes; `Arrays.asList(...)` returns a mutable-element fixed-size view backed by an array',
      '`Arrays.asList(...)` is always faster for all operations',
      '`List.of(...)` allows adding new elements',
      '`List.of(...)` permits null elements while `Arrays.asList` does not'
    ],
    correctAnswer: 0,
    explanation: '`List.of()` returns optimized unmodifiable instances (e.g. `List12` stores elements directly in fields without array allocation for 1 or 2 items), prohibits `null` elements (throws NPE), and disallows modifications. `Arrays.asList()` is a fixed-size array wrapper that allows element mutation (`set()`) and allows `null`.',
    tags: ['List.of', 'Arrays.asList', 'Immutability', 'Java 9']
  },
  {
    id: 148,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `SequencedCollection` (JEP 431) introduced in Java 21 unify ordered collections across the Java Collections Framework?',
    codeSnippet: `SequencedCollection<String> seq = new LinkedHashSet<>();
seq.addFirst("first");
seq.addLast("last");
String rev = seq.reversed().getFirst();`,
    options: [
      'It forces all collections to be synchronized',
      'It introduces a common interface with defined encounter order, providing standardized methods (`getFirst()`, `getLast()`, `addFirst()`, `addLast()`, `reversed()`) across Lists, Deques, LinkedHashSet, and SortedSets',
      'It stores collection items in sequence files on disk',
      'It deprecates the standard `Collection` interface'
    ],
    correctAnswer: 1,
    explanation: 'Prior to Java 21, getting the first or last element across `List`, `Deque`, `LinkedHashSet`, and `TreeSet` used inconsistent APIs. JEP 431 introduced `SequencedCollection`, `SequencedSet`, and `SequencedMap` with uniform first/last access and `.reversed()` view operations.',
    tags: ['SequencedCollection', 'JEP 431', 'Java 21', 'Encounter Order']
  },
  {
    id: 149,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What exception is thrown if you attempt to add an element to `Collections.emptyList()`?',
    options: [
      'NullPointerException',
      'UnsupportedOperationException',
      'IndexOutOfBoundsException',
      'IllegalStateException'
    ],
    correctAnswer: 1,
    explanation: '`Collections.emptyList()` returns an immutable singleton instance `EmptyList`. Any mutative method (`add`, `remove`, `set`, `clear`) throws `UnsupportedOperationException`.',
    tags: ['Immutable Collections', 'UnsupportedOperationException']
  },
  {
    id: 150,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'Why does `ConcurrentLinkedQueue` use the Michael-Scott non-blocking queue algorithm?',
    options: [
      'To provide transactional ACID guarantees',
      'To enable wait-free and lock-free concurrent FIFO enqueuing and dequeuing using atomic CAS operations on volatile `head` and `tail` Node pointers',
      'To compress queued messages',
      'To prioritize messages based on timestamps'
    ],
    correctAnswer: 1,
    explanation: '`ConcurrentLinkedQueue` is an unbounded thread-safe FIFO queue based on the Michael-Scott lock-free algorithm. Nodes are linked via volatile pointers and updated using CAS, ensuring high-throughput producer-consumer operations without thread blocking.',
    tags: ['ConcurrentLinkedQueue', 'Michael-Scott Algorithm', 'Lock-Free']
  },
  {
    id: 151,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'In `ConcurrentHashMap`, how is `computeIfAbsent()` optimized to avoid thread contention compared to manual `get()` and `put()` checking?',
    options: [
      'It locks the entire table for 1 second',
      'It synchronizes only on the target bucket bin head and computes the value atomically in-place, ensuring the mapping function is executed at most once per key without race conditions',
      'It creates a temporary clone of the map',
      'It executes the mapping function in a virtual thread'
    ],
    correctAnswer: 1,
    explanation: '`computeIfAbsent(key, mappingFunction)` locks only the specific bucket node and executes the compute function atomically. If another thread queries the same key, it waits on that bucket lock, ensuring that expensive value initialization (e.g. database query) runs exactly once without race conditions.',
    tags: ['ConcurrentHashMap', 'computeIfAbsent', 'Atomic Operations']
  },
  {
    id: 152,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the time complexity of `ArrayList.remove(0)` versus `LinkedList.removeFirst()`?',
    options: [
      'ArrayList is O(1); LinkedList is O(N)',
      'ArrayList is O(N) because all remaining elements must be shifted left via `System.arraycopy`; LinkedList is O(1) because it only adjusts head and next pointers',
      'Both are O(1)',
      'Both are O(N)'
    ],
    correctAnswer: 1,
    explanation: 'Removing index 0 from an `ArrayList` requires shifting all $N-1$ subsequent elements one slot left in the backing array ($O(N)$ operation). `LinkedList.removeFirst()` simply updates the head reference in $O(1)$ time.',
    tags: ['ArrayList', 'LinkedList', 'Time Complexity']
  },
  {
    id: 153,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'What is the function of `Map.merge(key, value, remappingFunction)` introduced in Java 8?',
    codeSnippet: `map.merge("apple", 1, Integer::sum);`,
    options: [
      'It merges two separate Map instances into a single Map',
      'If the key is not present (or null), it associates it with the given value; otherwise, it applies the remapping function with the old value and new value and replaces the entry (or removes it if result is null)',
      'It merges all map values into a database table',
      'It converts map keys to uppercase'
    ],
    correctAnswer: 1,
    explanation: '`Map.merge()` is a powerful atomic aggregation idiom. If key does not exist or maps to null, it puts `value`. If present, it executes `remappingFunction.apply(oldVal, newVal)`. If the function returns `null`, the key is removed.',
    tags: ['Map.merge', 'Java 8 Map Methods', 'Functional Idioms']
  },
  {
    id: 154,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `ConcurrentHashMap` handle hash collisions when two keys have identical hash codes but do NOT implement `Comparable`?',
    options: [
      'It throws a RuntimeException',
      'It places them in the tree using `System.identityHashCode(a)` or class name comparisons as tie-breakers via `tieBreakOrder()` to maintain consistent binary search tree ordering',
      'It refuses to insert the second key',
      'It converts the entire map back to a linked list permanently'
    ],
    correctAnswer: 1,
    explanation: 'When treeifying a bucket with keys that collide in hash and do not implement `Comparable<K>`, `ConcurrentHashMap` uses `tieBreakOrder(a, b)`: it compares class names, and if still tied, compares their `System.identityHashCode()` values to establish deterministic Red-Black tree placement.',
    tags: ['ConcurrentHashMap', 'tieBreakOrder', 'TreeNode']
  },
  {
    id: 155,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What is the purpose of `Collections.disjoint(c1, c2)`?',
    options: [
      'It combines two collections into a single set',
      'It returns true if the two specified collections have no elements in common',
      'It splits a collection into two equal halves',
      'It removes duplicate elements across two collections'
    ],
    correctAnswer: 1,
    explanation: '`Collections.disjoint(c1, c2)` returns `true` if $c1 \\cap c2 = \\emptyset$ (they share zero common elements). It optimizes iteration by iterating over the smaller collection and doing lookups in the larger collection if one is a `Set`.',
    tags: ['Collections Utility', 'disjoint', 'Set Theory']
  },
  {
    id: 156,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'What is the difference between `Vector` and `ArrayList`?',
    options: [
      '`Vector` is synchronized on every method call (legacy from Java 1.0) and doubles its capacity on resize; `ArrayList` is unsynchronized and grows by ~50%',
      '`Vector` stores elements on disk; `ArrayList` stores elements in memory',
      '`Vector` can only store primitive integers',
      '`ArrayList` is thread-safe while `Vector` is not'
    ],
    correctAnswer: 0,
    explanation: '`Vector` is a legacy collection where virtually every method is declared `synchronized`, introducing unnecessary lock overhead in single-threaded contexts. `ArrayList` is lightweight and non-synchronized, preferred in modern Java.',
    tags: ['Vector', 'ArrayList', 'Synchronization']
  },
  {
    id: 157,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'Why does `ConcurrentHashMap` forbid `null` keys and `null` values, whereas `HashMap` permits both?',
    options: [
      'Because null keys consume double heap memory',
      'To eliminate ambiguity in concurrent environments where `map.get(key) == null` cannot distinguish between "key is not mapped" vs "key is mapped to null", which would require a second non-atomic `containsKey()` check',
      'Because the JVM forbids null references in Java 21',
      'Because null references break Red-Black tree balance algorithms'
    ],
    correctAnswer: 1,
    explanation: 'Doug Lea specifically designed `ConcurrentHashMap` to disallow nulls. In non-concurrent maps, you can verify `get(k) == null` via `containsKey(k)`. In concurrent programs, the map state could change between the two calls, creating fatal race conditions. Thus, null keys and values are strictly prohibited.',
    tags: ['ConcurrentHashMap', 'null Handling', 'Concurrency Design']
  },
  {
    id: 158,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Advanced',
    question: 'What does `Arrays.sort()` use for sorting primitive arrays versus object reference arrays in Java 17+?',
    options: [
      'QuickSort for both',
      'Dual-Pivot Quicksort for primitive arrays (optimizing CPU cache performance without stable sort overhead); TimSort for object reference arrays (providing guaranteed stable O(N log N) performance)',
      'BubbleSort for primitive arrays; MergeSort for object arrays',
      'HeapSort for all types'
    ],
    correctAnswer: 1,
    explanation: 'Java uses Vladimir Yaroslavskiy\'s Dual-Pivot Quicksort for primitive arrays (where stability is irrelevant). For object arrays, `Arrays.sort()` uses TimSort (an adaptive, stable natural mergesort invented by Tim Peters), preserving relative order of equal elements with $O(N)$ best-case for partially sorted data.',
    tags: ['Dual-Pivot Quicksort', 'TimSort', 'Sorting Algorithms', 'Arrays.sort']
  },
  {
    id: 159,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Expert',
    question: 'What is the behavior of `subList(fromIndex, toIndex)` returned by `ArrayList`?',
    options: [
      'It creates a deep clone of the elements in a new independent ArrayList',
      'It returns a view backed by the original ArrayList; modifications to the subList modify the backing list, and structural modifications to the backing list invalidate the subList with ConcurrentModificationException',
      'It converts the list elements to an immutable array',
      'It stores the sublist in Metaspace'
    ],
    correctAnswer: 1,
    explanation: '`subList()` returns a lightweight view (`SubList`) into the parent list. Writing to `subList` updates the parent. However, if the parent list is structurally modified directly (elements added or removed outside the view), the `SubList`\'s cached `modCount` becomes stale, throwing CME on subsequent access.',
    tags: ['subList', 'Views', 'ConcurrentModificationException']
  },
  {
    id: 160,
    category: 'collections-internals',
    categoryTitle: 'Collections Framework Internals',
    difficulty: 'Master',
    question: 'How does `Spliterator.trySplit()` enable efficient parallel processing in Java Stream collections?',
    options: [
      'By spawning a new JVM process per split',
      'By partitioning the underlying data source into roughly equal halves with low overhead, allowing ForkJoin worker threads to process distinct chunks concurrently without shared data locks',
      'By serializing the list to JSON and splitting string lines',
      'By converting collections to database tables'
    ],
    correctAnswer: 1,
    explanation: '`Spliterator` (splitable iterator) is the engine behind Java 8 Streams. `trySplit()` returns a new `Spliterator` covering a prefix partition of the elements, while the original covers the remainder. In array-based collections, splitting is a simple $O(1)$ index arithmetic operation (`mid = (lo + hi) >>> 1`).',
    tags: ['Spliterator', 'trySplit', 'Parallel Streams', 'ForkJoin']
  }
];
