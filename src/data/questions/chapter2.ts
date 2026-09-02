import { Question } from '../../types';

export const chapter2Questions: Question[] = [
  {
    id: 11,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Which access modifier grants visibility to members only within the same package and to subclasses located in different packages?',
    options: [
      'public',
      'protected',
      'package-private (default / no modifier)',
      'private'
    ],
    correctAnswer: 1,
    explanation: 'The protected modifier allows member access to: 1) any class in the same package, and 2) any subclass extending the class, even if that subclass resides in a completely different package.',
    tags: ['Access Modifiers', 'Protected', 'Packages']
  },
  {
    id: 12,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'In the Java Platform Module System (JPMS, Java 9+), which directives can be specified in a module-info.java descriptor? (Select ALL that apply)',
    options: [
      'requires <module-name>; (Declares compile and runtime dependence on another module)',
      'exports <package-name>; (Exposes public types of the package to consuming modules)',
      'opens <package-name>; (Permits deep reflection on package types at runtime)',
      'provides <service-interface> with <implementation-class>; (Declares a service provider)'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four directives are core JPMS module-info.java syntax: "requires" defines dependencies, "exports" makes public APIs accessible, "opens" allows deep reflection (e.g. for Spring/Hibernate), and "provides...with" registers ServiceLoader implementations.',
    tags: ['JPMS', 'Java 9 Modularity', 'Module-Info']
  },
  {
    id: 13,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: If a package statement is omitted in a Java source file, its classes are placed into the "unnamed package" (default package), from which named modules cannot access them directly in JPMS.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: Classes with no package statement belong to the unnamed package. In modern modular Java (JPMS), named modules cannot export or require the unnamed package, enforcing strict modular encapsulation.',
    tags: ['Packages', 'JPMS', 'Unnamed Package']
  },
  {
    id: 14,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'Given the class hierarchy below, explain why Super.getInstance().doWork() compiles, but Sub.getInstance().doWork() produces a compilation error without an explicit cast.',
    codeSnippet: `class Super {
    public static Super getInstance() { return new Super(); }
    public void doWork() {}
}
class Sub extends Super {
    public static Super getInstance() { return new Sub(); }
    public void specializedWork() {}
}`,
    sampleSolution: 'In Java, static method hiding occurs when Sub re-declares getInstance(). The return type of Sub.getInstance() is declared as Super (the superclass type). Therefore, calling Sub.getInstance() evaluates to a reference of type Super at compile-time. If code attempts to invoke specializedWork(), it fails to compile because Super does not declare specializedWork(), requiring an explicit downcast ((Sub) Sub.getInstance()).specializedWork().',
    options: [],
    explanation: 'Static methods do not participate in polymorphic dispatch. Sub.getInstance() returns the declared return type Super. The compiler checks method existence against the static return type at compile-time.',
    tags: ['Class Hierarchies', 'Static Methods', 'Type Checking']
  },
  {
    id: 15,
    chapter: 'chapter-2',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2 — Class Hierarchies, Packages & Modularity',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the delegation order followed by standard Java ClassLoaders (Bootstrap -> Extension/Platform -> Application/System)?',
    options: [
      'Child classloader checks its own cache first, loads if present, then delegates upwards.',
      'Parent-first delegation: A classloader delegates the load request to its parent before attempting to find the class itself.',
      'Sibling classloaders share classes directly before delegating upwards.',
      'System classloader always loads all core classes first regardless of parent state.'
    ],
    correctAnswer: 1,
    explanation: 'Java uses the Parent-Delegation Model for ClassLoaders. When a classloader is requested to load a class, it delegates the search to its parent classloader first. Only if the parent hierarchy fails to find the class does the child classloader attempt to load it from its own repository.',
    tags: ['Classloaders', 'Parent Delegation', 'JVM Internals']
  }
];
