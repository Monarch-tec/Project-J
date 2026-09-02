import { Question } from '../../types';

export const chapter1Questions: Question[] = [
  {
    id: 1,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-choice',
    difficulty: 'Fundamental',
    question: 'Which OOP principle is primarily achieved by declaring instance variables private and providing public getter/setter methods with validation logic?',
    codeSnippet: `public class BankAccount {
    private double balance;
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    public double getBalance() {
        return this.balance;
    }
}`,
    options: [
      'Inheritance',
      'Encapsulation',
      'Polymorphism',
      'Dynamic Dispatch'
    ],
    correctAnswer: 1,
    explanation: 'Encapsulation is the mechanism of wrapping the data (instance variables) and code acting on the data (methods) together as a single unit, hiding the internal representation and protecting object integrity through controlled access methods.',
    tags: ['OOP', 'Encapsulation', 'Data Hiding']
  },
  {
    id: 2,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-selection',
    difficulty: 'Intermediate',
    question: 'Which of the following statements are TRUE regarding Interfaces in modern Java (Java 8+)? (Select ALL that apply)',
    options: [
      'Interfaces can declare public static final constants.',
      'Interfaces can provide default method implementations using the "default" keyword.',
      'A class can implement multiple interfaces, allowing multiple inheritance of behavior.',
      'Interfaces can contain protected instance variables.'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'Statements A, B, and C are correct. All fields in an interface are implicitly public, static, and final. Since Java 8, interfaces can contain default and static methods with concrete implementations. Java supports multiple interface implementation. Option D is false because interfaces cannot have instance fields or protected fields.',
    tags: ['Interfaces', 'Java 8', 'Multiple Inheritance']
  },
  {
    id: 3,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'true-false',
    difficulty: 'Intermediate',
    question: 'True or False: In Java, an abstract class can contain constructors, even though abstract classes cannot be directly instantiated with the "new" operator.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'TRUE: Abstract classes can define constructors. These constructors are invoked during subclass instantiation via the super() constructor call to initialize fields defined within the abstract superclass.',
    tags: ['Abstract Classes', 'Constructors', 'Inheritance']
  },
  {
    id: 4,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What is the output of executing the following Java program demonstrating polymorphism and method overriding?',
    codeSnippet: `class SuperClass {
    void display() {
        System.out.print("Super ");
    }
}
class SubClass extends SuperClass {
    @Override
    void display() {
        System.out.print("Sub ");
    }
}
public class Test {
    public static void main(String[] args) {
        SuperClass obj = new SubClass();
        obj.display();
    }
}`,
    options: [
      'Super',
      'Sub',
      'Compilation Error: Cannot assign SubClass to SuperClass reference',
      'Super Sub'
    ],
    correctAnswer: 1,
    explanation: 'In Java, non-static method calls are bound dynamically at runtime (dynamic method dispatch / late binding) based on the actual object instance being referred to (SubClass), rather than the reference type (SuperClass). Therefore, SubClass.display() prints "Sub".',
    tags: ['Polymorphism', 'Dynamic Dispatch', 'Overriding']
  },
  {
    id: 5,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'subjective-code',
    difficulty: 'Advanced',
    question: 'Analyze the following code snippet. Why does the compiler allow method overloading here, but what will happen when calling calculate(10, 20)? Provide the exact compilation or runtime behavior.',
    codeSnippet: `public class OverloadDemo {
    public static void calculate(int a, long b) {
        System.out.println("int, long");
    }
    public static void calculate(long a, int b) {
        System.out.println("long, int");
    }
    public static void main(String[] args) {
        calculate(10, 20);
    }
}`,
    sampleSolution: 'Compilation Error: The call calculate(10, 20) is ambiguous. Both arguments are int literals (10 and 20). The compiler cannot determine whether to widen the first argument to long (matching calculate(long, int)) or the second argument to long (matching calculate(int, long)). Both methods are equally specific, causing a compile-time "reference to calculate is ambiguous" error.',
    options: [],
    explanation: 'Java method overloading resolves calls based on parameter types. When passing two primitive int literals (10, 20), Java compiler attempts widening conversions. Since widening (int, int) to (int, long) and (long, int) are equally valid without one being more specific than the other, the compiler throws an ambiguous method invocation error.',
    tags: ['Overloading', 'Type Widening', 'Compiler Ambiguity']
  },
  {
    id: 6,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-selection',
    difficulty: 'Advanced',
    question: 'Which of the following conditions must be met for a valid method override in Java? (Select ALL that apply)',
    options: [
      'The overriding method in the subclass must have the exact same method name and parameter list.',
      'The return type must be identical or a covariant subtype of the return type declared in the superclass.',
      'The overriding method cannot declare broader (more restrictive) checked exceptions than the superclass method.',
      'The access level cannot be more restrictive than the overridden method (e.g., protected cannot become private).'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: 'All four statements are mandatory rules for method overriding in Java: 1) Same signature, 2) Covariant return types permitted (Java 5+), 3) Cannot throw new or broader checked exceptions, 4) Cannot reduce visibility.',
    tags: ['Method Overriding', 'Covariant Returns', 'Exception Specification']
  },
  {
    id: 7,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'true-false',
    difficulty: 'Fundamental',
    question: 'True or False: In Java, static methods declared in a superclass can be overridden by a subclass using the @Override annotation.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 1,
    explanation: 'FALSE: Static methods belong to the class, not instances. When a subclass defines a static method with the identical signature as a superclass static method, it is termed "method hiding", NOT method overriding. Using @Override on a static method causes a compilation error.',
    tags: ['Static Methods', 'Method Hiding', 'Polymorphism']
  },
  {
    id: 8,
    chapter: 'chapter-1',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1 — Intro to OOP',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'What happens when an abstract class implements an interface in Java without providing implementations for all interface methods?',
    options: [
      'Compilation fails: all classes implementing an interface must define every method immediately.',
      'It compiles successfully; the abstract class passes the responsibility of implementing the remaining methods to its concrete subclasses.',
      'It compiles, but instantiating any subclass will throw an AbstractMethodError at runtime.',
      'The interface methods automatically become default no-op methods.'
    ],
    correctAnswer: 1,
    explanation: 'An abstract class is permitted to implement an interface without implementing any or all of its abstract methods. Any non-abstract (concrete) subclass that extends this abstract class is obligated to implement all unimplemented interface methods.',
    tags: ['Abstract Classes', 'Interfaces', 'Inheritance']
  }
];
