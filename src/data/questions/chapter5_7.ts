import { Question } from '../../types';

export const chapter5Questions: Question[] = [
  {
    id: 41,
    chapter: 'chapter-5',
    chapterNumber: 5,
    chapterTitle: 'Chapter 5 — Searching Algorithms',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Why does classic binary search calculation "int mid = (low + high) / 2;" have a famous potential bug in Java for very large arrays, and what is the standard fix?',
    codeSnippet: `int binarySearch(int[] arr, int key) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2; // Potential bug!
        if (arr[mid] < key) low = mid + 1;
        else if (arr[mid] > key) high = mid - 1;
        else return mid;
    }
    return -1;
}`,
    options: [
      'It causes floating point inaccuracy; use Math.floorDiv() instead.',
      'If low + high exceeds Integer.MAX_VALUE (2^31 - 1), it overflows into a negative integer, causing ArrayIndexOutOfBoundsException; fix with "low + ((high - low) / 2)" or "(low + high) >>> 1".',
      'It rounds towards zero, causing an infinite loop when low + high is odd.',
      'Java arrays cannot hold more than 65535 elements without 64-bit pointers.'
    ],
    correctAnswer: 1,
    explanation: 'When low + high exceeds 2,147,483,647 (Integer.MAX_VALUE), the 32-bit signed addition overflows into a negative value. Dividing by 2 yields a negative index, throwing an ArrayIndexOutOfBoundsException. Using "(low + high) >>> 1" (unsigned right shift) or "low + (high - low) / 2" avoids overflow.',
    tags: ['Binary Search', 'Integer Overflow', 'Algorithms']
  },
  {
    id: 42,
    chapter: 'chapter-5',
    chapterNumber: 5,
    chapterTitle: 'Chapter 5 — Searching Algorithms',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'What return value conventions are used by java.util.Arrays.binarySearch(int[] a, int key) when the search key is NOT present in the sorted array? (Select ALL that apply)',
    options: [
      'It returns a negative value: -(insertionPoint) - 1.',
      'The insertion point is defined as the index of the first element greater than the key (or a.length if all elements are less).',
      'This return convention guarantees that the return value will be >= 0 if and only if the key is found.',
      'It throws a NoSuchElementException at runtime.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'A, B, and C are correct according to the java.util.Arrays.binarySearch specification. If found, it returns index (>= 0). If not found, it returns (-(insertion point) - 1). This ensures 0 is reserved for when the element is found at index 0, and non-found items return negative integers.',
    tags: ['Arrays.binarySearch', 'Searching', 'API Specification']
  },
  {
    id: 43,
    chapter: 'chapter-5',
    chapterNumber: 5,
    chapterTitle: 'Chapter 5 — Searching Algorithms',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: Binary search can be effectively applied to a singly linked list in O(log N) time complexity.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 1,
    explanation: 'FALSE: While the comparison logic is O(log N), reaching the middle node of a singly linked list requires O(N) sequential pointer traversals. Consequently, binary search on a standard linked list degrades to O(N) overall time.',
    tags: ['Binary Search', 'LinkedList', 'Time Complexity']
  }
];

export const chapter6Questions: Question[] = [
  {
    id: 51,
    chapter: 'chapter-6',
    chapterNumber: 6,
    chapterTitle: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What sorting algorithm does java.util.Arrays.sort() use for arrays of objects (e.g. Object[] or Comparable[]) vs primitive types (e.g. int[]) in the standard OpenJDK HotSpot library?',
    options: [
      'TimSort (stable) for objects, and Dual-Pivot QuickSort (unstable) for primitives',
      'HeapSort for objects, and MergeSort for primitives',
      'BubbleSort for objects, and RadixSort for primitives',
      'QuickSort for objects, and TimSort for primitives'
    ],
    correctAnswer: 0,
    explanation: 'Java requires object sorting to be stable (preserving relative order of equal keys) and utilizes TimSort (hybrid MergeSort/InsertionSort). For primitive types, stability is irrelevant, so Dual-Pivot QuickSort is used for superior CPU cache locality and raw throughput.',
    tags: ['Sorting', 'TimSort', 'Dual-Pivot QuickSort', 'Big-O']
  },
  {
    id: 52,
    chapter: 'chapter-6',
    chapterNumber: 6,
    chapterTitle: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following sorting algorithms have a worst-case time complexity strictly guaranteed to be O(N log N)? (Select ALL that apply)',
    options: [
      'Merge Sort',
      'Heap Sort',
      'Standard QuickSort',
      'TimSort'
    ],
    correctAnswers: [0, 1, 3],
    explanation: 'Merge Sort, Heap Sort, and TimSort all guarantee O(N log N) in the worst case. Standard QuickSort has a worst-case time complexity of O(N^2) when poor pivots are chosen (e.g., sorted array with first/last element pivot).',
    tags: ['Sorting', 'Big-O', 'Worst-Case Complexity']
  },
  {
    id: 53,
    chapter: 'chapter-6',
    chapterNumber: 6,
    chapterTitle: 'Chapter 6 — Sorting Algorithms & Big-O Notation',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: An in-place sorting algorithm is defined as one that requires O(1) or O(log N) auxiliary memory space beyond the input array.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: An in-place sorting algorithm modifies the input array without allocating a copy of the input data structure, using at most O(1) or O(log N) call-stack auxiliary space (as in QuickSort).',
    tags: ['In-Place Sorting', 'Space Complexity', 'Big-O']
  }
];

export const chapter7Questions: Question[] = [
  {
    id: 61,
    chapter: 'chapter-7',
    chapterNumber: 7,
    chapterTitle: 'Chapter 7 — Recursion',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What runtime error is thrown when a recursive Java method lacks a valid base case or exceeds the JVM call stack memory threshold?',
    options: [
      'java.lang.OutOfMemoryError: Java heap space',
      'java.lang.StackOverflowError',
      'java.lang.RecursiveCallException',
      'java.lang.DeadlockException'
    ],
    correctAnswer: 1,
    explanation: 'Every recursive invocation pushes a new stack frame (parameters, local variables, return address) onto the current thread stack. If recursion continues without reaching a base case, the thread stack exhausts its allocated memory (configured via -Xss), causing the JVM to throw java.lang.StackOverflowError.',
    tags: ['Recursion', 'StackOverflowError', 'Call Stack']
  },
  {
    id: 62,
    chapter: 'chapter-7',
    chapterNumber: 7,
    chapterTitle: 'Chapter 7 — Recursion',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'Trace the output and state the time complexity of the following recursive function when called with countWays(4).',
    codeSnippet: `public static int countWays(int n) {
    if (n <= 1) return 1;
    return countWays(n - 1) + countWays(n - 2);
}`,
    sampleSolution: 'Output: 5. (This is the Fibonacci sequence: countWays(0)=1, countWays(1)=1, countWays(2)=2, countWays(3)=3, countWays(4)=5). The time complexity is exponential O(2^N) because each call branches into two sub-calls without memoization, generating a binary recursion tree of depth N.',
    options: [],
    explanation: 'Unmemoized recursive Fibonacci evaluates overlapping subproblems repeatedly, creating a recursion tree with 2^N leaf nodes.',
    tags: ['Recursion', 'Fibonacci', 'Time Complexity', 'Memoization']
  },
  {
    id: 63,
    chapter: 'chapter-7',
    chapterNumber: 7,
    chapterTitle: 'Chapter 7 — Recursion',
    type: 'true-false',
    difficulty: 'Advanced',
    question: 'True or False: As of standard Java 21, the HotSpot JVM automatically performs Tail Call Optimization (TCO) on all tail-recursive methods to prevent StackOverflowError.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 1,
    explanation: 'FALSE: The standard HotSpot JVM does NOT perform automatic Tail Call Optimization (TCO) for Java bytecodes due to security/stack-trace inspection requirements (SecurityManager and Throwable.getStackTrace()). Tail recursion in standard Java still allocates new stack frames.',
    tags: ['Tail Recursion', 'HotSpot JVM', 'TCO']
  }
];
