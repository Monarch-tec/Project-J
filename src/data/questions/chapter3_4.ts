import { Question } from '../../types';

export const chapter3Questions: Question[] = [
  {
    id: 21,
    chapter: 'chapter-3',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections Framework',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the default initial capacity and growth factor of a standard Java java.util.ArrayList when capacity is exceeded?',
    options: [
      'Initial capacity 16, grows by 100% (2x)',
      'Initial capacity 10, grows by ~50% (newCapacity = oldCapacity + (oldCapacity >> 1))',
      'Initial capacity 32, grows by fixed chunk of 10 elements',
      'Initial capacity 8, grows by 75%'
    ],
    correctAnswer: 1,
    explanation: 'ArrayList defaults to an initial capacity of 10 (when the first element is added to an empty list). When full, it grows by 50% via bitwise right-shift (newCapacity = oldCapacity + (oldCapacity >> 1)).',
    tags: ['ArrayList', 'Collections Framework', 'Capacity Growth']
  },
  {
    id: 22,
    chapter: 'chapter-3',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections Framework',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following differences between legacy java.util.Vector / Enumeration and modern ArrayList / Iterator are TRUE? (Select ALL that apply)',
    options: [
      'Vector methods are synchronized on the instance, adding synchronization overhead on single-threaded execution.',
      'Iterator supports safe element removal during iteration via iterator.remove(), while Enumeration does not have a removal method.',
      'Iterator method names are shorter and clearer (hasNext(), next()) compared to Enumeration (hasMoreElements(), nextElement()).',
      'Vector is fail-safe, whereas ArrayList throws ConcurrentModificationException.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'A, B, and C are true. Vector uses synchronized methods, while ArrayList is unsynchronized. Iterator has remove() whereas Enumeration is read-only. D is false: Vector\'s Iterator is also fail-fast.',
    tags: ['Vector', 'ArrayList', 'Enumeration', 'Iterator']
  },
  {
    id: 23,
    chapter: 'chapter-3',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections Framework',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: In Java, java.util.ArrayDeque is generally faster than java.util.Stack when used as a LIFO stack, and faster than java.util.LinkedList when used as a FIFO queue.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: ArrayDeque uses a contiguous circular array with no synchronization overhead (unlike Stack which extends Vector) and no per-node pointer memory overhead (unlike LinkedList). The Java API documentation explicitly recommends ArrayDeque over Stack and LinkedList for both stacks and queues.',
    tags: ['ArrayDeque', 'Stack', 'Queue', 'Performance']
  },
  {
    id: 24,
    chapter: 'chapter-3',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3 — Iterators, Enumerators, Lists/Stacks/Queues & Collections Framework',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'What exception is thrown by the following code snippet and at which line? Explain the exact underlying mechanism in the Collection.',
    codeSnippet: `List<String> items = new ArrayList<>(List.of("A", "B", "C", "D"));
for (String item : items) {
    if ("B".equals(item)) {
        items.remove(item);
    }
}`,
    sampleSolution: 'ConcurrentModificationException is thrown during the next loop iteration (when checking iterator.hasNext() / next()). The enhanced for-loop compiles down to an Iterator. ArrayList tracks a structural modification counter (modCount). When items.remove() is called directly on the List rather than iterator.remove(), modCount increments. On the subsequent iterator.next() call, the iterator compares its expectedModCount with modCount. Because they differ, it immediately throws ConcurrentModificationException.',
    options: [],
    explanation: 'Fail-fast iterators detect concurrent modifications by checking if modCount == expectedModCount at each iteration step.',
    tags: ['Collections', 'Fail-Fast', 'ConcurrentModificationException']
  }
];

export const chapter4Questions: Question[] = [
  {
    id: 31,
    chapter: 'chapter-4',
    chapterNumber: 4,
    chapterTitle: 'Chapter 4 — Iterator Pattern in Depth & Enumerator Interfaces',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What interface must a custom class implement so that instances can be traversed using the enhanced for-each loop ("for (T item : collection)")?',
    options: [
      'java.util.Iterator<T>',
      'java.lang.Iterable<T>',
      'java.util.Enumeration<T>',
      'java.util.Collection<T>'
    ],
    correctAnswer: 1,
    explanation: 'In Java, the enhanced for-each loop requires the target object to implement java.lang.Iterable<T>, which defines a single mandatory abstract method iterator() returning an Iterator<T>.',
    tags: ['Iterable', 'Iterator Pattern', 'For-Each']
  },
  {
    id: 32,
    chapter: 'chapter-4',
    chapterNumber: 4,
    chapterTitle: 'Chapter 4 — Iterator Pattern in Depth & Enumerator Interfaces',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following operations are supported by java.util.ListIterator that are NOT available on standard java.util.Iterator? (Select ALL that apply)',
    options: [
      'Bidirectional traversal using hasPrevious() and previous()',
      'Obtaining current index positions via nextIndex() and previousIndex()',
      'Replacing the last returned element via set(E e)',
      'Inserting an element at the current cursor position via add(E e)'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four capabilities are unique to ListIterator: backward iteration (hasPrevious/previous), element index queries (nextIndex/previousIndex), in-place modification (set), and element insertion (add).',
    tags: ['ListIterator', 'Iterator Pattern', 'List Traversal']
  },
  {
    id: 33,
    chapter: 'chapter-4',
    chapterNumber: 4,
    chapterTitle: 'Chapter 4 — Iterator Pattern in Depth & Enumerator Interfaces',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: Calling iterator.remove() multiple times consecutively without an intervening call to iterator.next() will succeed without throwing an exception.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 1,
    explanation: 'FALSE: The contract of iterator.remove() requires that next() must be called prior to each remove() invocation. Calling remove() twice in a row throws an IllegalStateException because the cursor has already removed the last returned element.',
    tags: ['Iterator', 'IllegalStateException', 'API Contract']
  }
];
