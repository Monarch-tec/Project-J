import { Question } from '../../types';

export const genericsQuestions: Question[] = [
  {
    id: 81,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'Why does the Java compiler generate synthetic "Bridge Methods" in bytecode when a generic subclass overrides a parameterized superclass method?',
    codeSnippet: `public class Node<T> {
    public void setData(T data) { ... }
}

public class MyNode extends Node<Integer> {
    @Override
    public void setData(Integer data) { ... }
}`,
    options: [
      'To enable remote method invocation over network sockets',
      'Because type erasure erases Node.setData(T) to setData(Object); the compiler generates a synthetic bridge method `setData(Object)` in MyNode that casts the argument to Integer and delegates to `setData(Integer)` to preserve polymorphism',
      'To prevent subclassing by unauthorized classloaders',
      'To convert Integer objects to primitive int values'
    ],
    correctAnswer: 1,
    explanation: 'Due to type erasure, `Node` has method `setData(Object)`. `MyNode` defines `setData(Integer)`. Because their signatures differ in bytecode, polymorphic dispatch (`Node n = new MyNode(); n.setData("foo")`) would fail to override without a bridge method. The compiler adds a synthetic method `public void setData(Object o) { setData((Integer) o); }`.',
    tags: ['Bridge Methods', 'Type Erasure', 'Polymorphism']
  },
  {
    id: 82,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What is the "PECS" principle (Producer Extends, Consumer Super) coined by Joshua Bloch in Effective Java?',
    options: [
      'Use `extends` when creating subclasses and `super` when invoking constructors',
      'If a parameterized type represents a producer that provides items to your code, use `<? extends T>`; if it represents a consumer that accepts items from your code, use `<? super T>`',
      'Use `extends` for interfaces and `super` for abstract classes',
      'Always use unbounded wildcards `<?>` for both producers and consumers'
    ],
    correctAnswer: 1,
    explanation: 'PECS stands for Producer Extends, Consumer Super. When a collection produces data (you read `T` from it), `<? extends T>` allows subclasses of T. When a collection consumes data (you write `T` into it), `<? super T>` allows superclasses of T, ensuring maximum API flexibility and compile-time type safety.',
    tags: ['PECS', 'Wildcards', 'Effective Java', 'Generics']
  },
  {
    id: 83,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'Why is generic array creation such as `new T[10]` or `new List<String>[10]` disallowed by the Java compiler?',
    options: [
      'Because arrays are allocated in Metaspace where generics are forbidden',
      'Because Java arrays are covariant and reified (they enforce component types at runtime), whereas generic types are invariant and erased; allowing generic array creation would cause unchecked ClassCastExceptions at runtime',
      'Because the JVM cannot allocate arrays larger than 10 elements for reference types',
      'Because array creation requires reflection in all cases'
    ],
    correctAnswer: 1,
    explanation: 'Arrays are reified: an array knows its element type at runtime and checks it on every write (`ArrayStoreException`). Generics are erased at compile time. If `new List<String>[10]` were legal, you could assign it to `Object[]` and store a `List<Integer>` into it without array store checks, breaking type safety when reading `List<String>`.',
    tags: ['Reification', 'Generic Arrays', 'Covariance', 'Type Erasure']
  },
  {
    id: 84,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'How do "Super Type Tokens" (Neal Gafter\'s TypeRef pattern used in Jackson/Gson `TypeReference<T>`) capture generic type information at runtime despite type erasure?',
    codeSnippet: `TypeReference<List<String>> token = new TypeReference<List<String>>() {};
Type type = token.getType(); // Returns ParameterizedType for List<String>`,
    options: [
      'They query the JVM JIT compiler native registers',
      'By creating an anonymous inner subclass, the compiler preserves the generic superclass signature in the class file metadata (`Signature` attribute), which can be retrieved at runtime via `getClass().getGenericSuperclass()`',
      'They decompile the `.class` file byte-by-byte at runtime using ASM',
      'They hook into the Bootstrap ClassLoader via JNI'
    ],
    correctAnswer: 1,
    explanation: 'While type information of variable instances is erased, class metadata (generic superclass signatures) is preserved in the `.class` constant pool. By creating an anonymous subclass (`new TypeReference<T>() {}`), the parameterized type `T` is stored in the subclass definition and can be inspected via `getGenericSuperclass()` returning `ParameterizedType`.',
    tags: ['Super Type Tokens', 'TypeReference', 'Reflection', 'Signature']
  },
  {
    id: 85,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What is "Heap Pollution" in Java, and when can it occur?',
    options: [
      'When the JVM heap memory becomes fragmented and unusable',
      'When a variable of a parameterized type refers to an object that is not of that parameterized type, usually caused by mixing raw types or unchecked varargs with generics',
      'When garbage collection sweeps old generation objects into Eden',
      'When off-heap memory leaks into the Java heap'
    ],
    correctAnswer: 1,
    explanation: 'Heap pollution occurs when a parameterized variable holds a reference to an incompatible type at runtime (e.g. assigning a raw `List` holding integers to a `List<String>`). The error typically remains hidden until a cast generated by the compiler at a read site throws a `ClassCastException`.',
    tags: ['Heap Pollution', 'Raw Types', 'Type Safety']
  },
  {
    id: 86,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the purpose of the `@SafeVarargs` annotation in Java?',
    options: [
      'It encrypts varargs parameters in memory',
      'It suppresses compiler warnings about unsafe varargs operations and promises that the method does not store into the varargs array or allow the array reference to escape, preventing heap pollution',
      'It converts variable arity arguments into fixed-size arrays at compile time',
      'It enforces that all varargs arguments are non-null'
    ],
    correctAnswer: 1,
    explanation: 'When a method takes generic varargs (`T... args`), Java creates a generic array (`T[]`), which triggers heap pollution warnings. Applying `@SafeVarargs` asserts that the method only reads from the array and does not publish or mutate it, safely suppressing the warning for callers.',
    tags: ['@SafeVarargs', 'Varargs', 'Generics']
  },
  {
    id: 87,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is "Wildcard Capture" and why is a private helper method often required to resolve wildcard capture compile errors?',
    codeSnippet: `public void reverse(List<?> list) {
    revHelper(list); // Why is this helper needed?
}
private <T> void revHelper(List<T> list) {
    List<T> tmp = new ArrayList<T>(list);
    for (int i = 0; i < list.size(); i++) {
        list.set(i, tmp.get(list.size() - i - 1));
    }
}`,
    options: [
      'Wildcards cannot be passed as arguments to any method',
      'The compiler cannot infer the exact type captured by `?`, preventing calls like `list.set(i, ...)` directly on `List<?>`; the private generic helper `<T>` captures the wildcard as a concrete named type variable T',
      'The helper method forces the list into Metaspace',
      'Wildcards cause stack overflow without helper encapsulation'
    ],
    correctAnswer: 1,
    explanation: 'When invoking `list.set(i, list.get(...))` on `List<?>`, the compiler captures the type as `capture#1-of ?`. It rejects `set()` because it cannot prove what type goes into `List<?>`. The generic helper `<T> revHelper(List<T>)` gives a concrete type name `T` to the captured wildcard, enabling safe element swaps.',
    tags: ['Wildcard Capture', 'Capture Conversion', 'Generic Helpers']
  },
  {
    id: 88,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What is the difference between `List<Object>` and `List<?>` in Java?',
    options: [
      '`List<Object>` and `List<?>` are completely identical and interchangeable',
      '`List<Object>` only accepts `List<Object>` (invariant); `List<?>` is an unbounded wildcard that can accept a `List` of any type (`List<String>`, `List<Integer>`, etc.), but you cannot add non-null elements into `List<?>`',
      '`List<?>` allows adding any object type, while `List<Object>` allows only strings',
      '`List<?>` is deprecated in Java 17+'
    ],
    correctAnswer: 1,
    explanation: 'Generics are invariant: `List<String>` is NOT a subtype of `List<Object>`. However, `List<String>` IS a subtype of `List<?>`. The trade-off with `List<?>` is read-only safety: you can retrieve elements as `Object`, but you cannot put any non-null element into `List<?>` because its specific element type is unknown.',
    tags: ['Unbounded Wildcard', 'Invariance', 'List<?> vs List<Object>']
  },
  {
    id: 89,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is a "Recursive Type Bound" in Java Generics, and how is it used in `java.lang.Comparable`?',
    codeSnippet: `public static <T extends Comparable<T>> T max(Collection<T> coll) { ... }`,
    options: [
      'A method that calls itself recursively until memory runs out',
      'A generic type parameter bounded by an expression containing the type parameter itself, ensuring that elements can be compared specifically to instances of their own type',
      'A recursive class loader definition',
      'A cyclic inheritance graph prohibited by the compiler'
    ],
    correctAnswer: 1,
    explanation: 'A recursive type bound `<T extends Comparable<T>>` means that `T` is bounded by a type that takes `T` as a type argument. This ensures that every element in the collection is mutually comparable to other elements of type `T` rather than just arbitrary objects.',
    tags: ['Recursive Type Bound', 'Comparable', 'Type Bounds']
  },
  {
    id: 90,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is an "Intersection Type" in Java Generics syntax, and what are its restrictions?',
    codeSnippet: `public <T extends Number & Comparable<T> & Serializable> void process(T val) { ... }`,
    options: [
      'A type that can be either Number OR String at runtime',
      'A type that must satisfy multiple bounds simultaneously; it may contain at most one class bound (which must appear first) followed by zero or more interface bounds separated by `&`',
      'A type that joins two database tables together using SQL joins',
      'An intersection type cannot be used in method declarations'
    ],
    correctAnswer: 1,
    explanation: 'Java supports multiple bounds on type parameters using `&`. By rule, only one class bound can be specified (since Java lacks multiple class inheritance) and it MUST be placed first, followed by any number of interfaces (e.g. `<T extends Number & Comparable<T> & Serializable>`).',
    tags: ['Intersection Types', 'Multiple Bounds', 'Java Type System']
  },
  {
    id: 91,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'Which of the following types is "Reifiable" in Java?',
    options: [
      'List<String>',
      'int[] and String[] (arrays)',
      'Map<String, Integer>',
      'Function<String, Boolean>'
    ],
    correctAnswer: 1,
    explanation: 'A reifiable type is one whose type information is fully available at runtime. Reifiable types include primitives (`int`, `double`), non-generic reference types (`String`, `Object`), unbounded wildcards (`List<?>`), and raw types (`List`), as well as arrays of reifiable types (`int[]`, `String[]`). Parameterized types like `List<String>` are non-reifiable.',
    tags: ['Reification', 'Reifiable Types', 'Type System']
  },
  {
    id: 92,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the compilation result and bytecode signature of the following overloaded methods?',
    codeSnippet: `public class Processor {
    public void handle(List<String> list) {}
    public void handle(List<Integer> list) {}
}`,
    options: [
      'Compiles cleanly and uses dynamic dispatch based on runtime list contents',
      'Compile error: "name clash: handle(List<String>) and handle(List<Integer>) have the same erasure handle(List)"',
      'Compiles into two methods with synthetic bridge names',
      'Throws an IllegalArgumentException at class loading time'
    ],
    correctAnswer: 1,
    explanation: 'After type erasure, both methods have the identical bytecode signature `handle(java.util.List)`. Because method overloading in Java bytecode requires unique signatures (name + erased parameter types), the compiler rejects this with a name clash compilation error.',
    tags: ['Type Erasure', 'Method Overloading', 'Name Clash']
  },
  {
    id: 93,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'In Java type variance, how do Arrays and Generics fundamentally differ?',
    options: [
      'Arrays are invariant and erased; Generics are covariant and reified',
      'Arrays are covariant (`String[]` is a subtype of `Object[]`) and reified; Generics are invariant (`List<String>` is NOT a subtype of `List<Object>`) and erased',
      'Arrays and Generics have identical subtyping variance rules',
      'Generics are contravariant by default'
    ],
    correctAnswer: 1,
    explanation: 'Arrays in Java are covariant: if `Sub` extends `Super`, then `Sub[]` is a subtype of `Super[]` (which can cause runtime `ArrayStoreException`). In contrast, Java generics are invariant: `List<Sub>` has no subtyping relationship with `List<Super>`, providing compile-time type safety. Use wildcards (`? extends` / `? super`) to achieve use-site variance.',
    tags: ['Covariance', 'Invariance', 'Variance', 'Subtyping']
  },
  {
    id: 94,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What can be safely added to a collection declared as `List<? super Integer>`?',
    options: [
      'Only Object and Number instances',
      'Integer instances, or subtypes of Integer (and null), because Integer is guaranteed to be assignable to whatever supertype of Integer the list holds',
      'Any double or float value',
      'Nothing; List<? super Integer> is strictly read-only'
    ],
    correctAnswer: 1,
    explanation: '`List<? super Integer>` represents a list of some unknown supertype of `Integer` (e.g. `List<Integer>`, `List<Number>`, or `List<Object>`). Since `Integer` is a subtype of all these possibilities, you can safely write any `Integer` (or null) into the list.',
    tags: ['PECS', 'Consumer Super', 'Wildcards']
  },
  {
    id: 95,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the return type of `list.get(0)` when `list` is declared as `List<? extends Number>`?',
    options: [
      'Integer',
      'Number',
      'Object only',
      'Void'
    ],
    correctAnswer: 1,
    explanation: 'Because `List<? extends Number>` holds elements of some type that extends `Number`, any element extracted from the list is guaranteed to be an instance of `Number` (or its subtypes). Thus, `get()` safely returns `Number`.',
    tags: ['Producer Extends', 'Wildcards', 'PECS']
  },
  {
    id: 96,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is "Target Type Inference" in modern Java (Java 8+) for generic method invocations and lambda expressions?',
    options: [
      'The compiler inspects database schema types to infer SQL query return types',
      'The compiler uses the context where an expression appears (e.g. assignment target, method argument, return type) to deduce type arguments for generic methods (`Collections.emptyList()`) and lambda parameters without explicit type witnessing',
      'The JVM infers types during JIT compilation only',
      'Type inference only works for primitive data types'
    ],
    correctAnswer: 1,
    explanation: 'Java 8 enhanced type inference (JEP 101) so that the type arguments of a generic method call are inferred not only from the arguments passed to it, but also from the target type expected at the call site (e.g. `List<String> list = Collections.emptyList();` requires no `<String>` prefix).',
    tags: ['Type Inference', 'Target Typing', 'JEP 101']
  },
  {
    id: 97,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'Why can static fields and static methods not reference type parameters declared on their enclosing generic class?',
    codeSnippet: `public class Box<T> {
    private static T item; // Compile error!
    public static T getItem() { return null; } // Compile error!
}`,
    options: [
      'Static members are executed in a separate JVM process',
      'Because static members are shared across all instances of the class, whereas type parameter `T` is specific to each object instance; the static context exists independently of any instantiated generic type',
      'Static fields can only hold primitive numbers',
      'Static methods cannot have return values'
    ],
    correctAnswer: 1,
    explanation: 'There is only one static copy of a class across all parameterized variants (`Box<String>` and `Box<Integer>` share the exact same `Box.class`). Hence, instance-level type parameter `T` has no meaning in a static context. (Static methods CAN, however, declare their own independent type parameters: `public static <E> E getItem()`).',
    tags: ['Static Context', 'Generics', 'Class Level Types']
  },
  {
    id: 98,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the effect of casting an object to a parameterized type (e.g. `(List<String>) obj`) at runtime?',
    options: [
      'It verifies that all elements inside the list are Strings at runtime',
      'It only checks that the object is a `List` (raw type check) and issues an "unchecked cast" compiler warning, because type erasure prevents the JVM from validating the generic element type at runtime',
      'It throws a fatal JVM linkage error',
      'It converts non-string elements to strings automatically'
    ],
    correctAnswer: 1,
    explanation: 'At runtime, `List<String>` and `List<Integer>` are both just `List`. Casting `(List<String>) obj` generates an `instanceof List` check in bytecode. It cannot check element types, issuing an "unchecked cast" warning. If the list contains integers, a `ClassCastException` will only be thrown later when an element is read.',
    tags: ['Unchecked Cast', 'Type Erasure', 'ClassCastException']
  },
  {
    id: 99,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'How does the "Self-Bounding" / "Curiously Recurring Template Pattern" (CRTP) generic pattern work in Java fluent builders?',
    codeSnippet: `abstract class BaseBuilder<T extends BaseBuilder<T>> {
    public T withName(String name) {
        // ...
        return self();
    }
    protected abstract T self();
}
class ConcreteBuilder extends BaseBuilder<ConcreteBuilder> {
    @Override
    protected ConcreteBuilder self() { return this; }
}`,
    options: [
      'It prevents classes from being instantiated more than once',
      'It allows method chaining in inheritance hierarchies to return the exact concrete subtype rather than the abstract base class type, avoiding type casting in fluent APIs',
      'It eliminates memory allocations for builders',
      'It generates builder bytecode automatically'
    ],
    correctAnswer: 1,
    explanation: 'CRTP (`<T extends BaseBuilder<T>>`) allows the base builder methods to return `T` instead of `BaseBuilder`. In subclasses, `T` is bound to the concrete subclass type. Consequently, chained fluent method calls retain the concrete subclass type signature without requiring manual casts.',
    tags: ['CRTP', 'Fluent Builders', 'Self-Bounding Generics']
  },
  {
    id: 100,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'Why is `instanceof List<String>` illegal in Java, but `instanceof List<?>` is permitted?',
    options: [
      'Because `List<String>` requires importing `java.lang.String`',
      'Because `List<String>` is non-reifiable (erased at runtime, so the JVM cannot distinguish `List<String>` from `List<Integer>`), whereas `List<?>` represents the reifiable raw structure without requiring element type checks',
      'Because wildcard types are allocated on the stack',
      'Because `List<?>` is an abstract class'
    ],
    correctAnswer: 1,
    explanation: 'The `instanceof` operator checks runtime types. Because generic type arguments are erased at compile time, the JVM has no way to verify whether a list contains `String`s. However, `List<?>` checks only that the object is a `List`, which IS verifiable at runtime.',
    tags: ['instanceof', 'Reifiable', 'Wildcards']
  },
  {
    id: 101,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the erasure of a type parameter with multiple bounds: `<T extends Number & Comparable<T>>`?',
    options: [
      'Object',
      'Number (the first bound specified in the declaration)',
      'Comparable',
      'NumberComparable'
    ],
    correctAnswer: 1,
    explanation: 'When a type parameter has multiple bounds, the compiler erases `T` to its FIRST bound (here, `Number`). If necessary, the compiler inserts explicit casts to `Comparable` at call sites where `Comparable` methods are invoked.',
    tags: ['Type Erasure', 'Multiple Bounds', 'Bytecode']
  },
  {
    id: 102,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is a "Typesafe Heterogeneous Container" pattern (Joshua Bloch) and how does it leverage `Class<T>` as a type token?',
    codeSnippet: `public class Container {
    private Map<Class<?>, Object> map = new HashMap<>();

    public <T> void put(Class<T> type, T instance) {
        map.put(type, type.cast(instance));
    }

    public <T> T get(Class<T> type) {
        return type.cast(map.get(type));
    }
}`,
    options: [
      'A container that serializes objects to different database vendors',
      'A design pattern where class literals (`Class<T>`) are used as parameterized keys in a map, allowing typesafe retrieval of arbitrarily diverse types from a single container without unchecked casts',
      'A multithreaded queue that stores mixed primitive types',
      'A container that prevents garbage collection of loaded classes'
    ],
    correctAnswer: 1,
    explanation: 'In a Typesafe Heterogeneous Container, the key itself is parameterized (`Class<T>`). When putting or getting elements, `type.cast()` guarantees dynamic type safety. Because the key determines the type of the value, different types can coexist safely in the same container.',
    tags: ['Typesafe Container', 'Class<T>', 'Type Tokens', 'Design Patterns']
  },
  {
    id: 103,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What happens if you create an instance of a generic class using a "Raw Type" (e.g. `List list = new ArrayList()`) in modern Java?',
    options: [
      'The code fails to compile with a fatal error',
      'It compiles, but compiler warnings (raw type usage) are generated, and all generic methods on the instance behave with erased signatures (accepting/returning Object), sacrificing type safety',
      'The JVM operates in 32-bit mode for that object',
      'The ArrayList is converted into a primitive array'
    ],
    correctAnswer: 1,
    explanation: 'Raw types exist solely for backward compatibility with pre-Java 5 code. Using raw types strips all generic parameter checking from the instance, meaning methods like `add(E)` accept `Object` and `get(int)` returns `Object`, disabling compile-time type validation.',
    tags: ['Raw Types', 'Backward Compatibility', 'Type Safety']
  },
  {
    id: 104,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the difference between `<T>` declared at the class level versus `<T>` declared on a method within that generic class?',
    codeSnippet: `public class Sample<T> {
    public <T> void print(T item) { ... } // Method T shadows Class T!
}`,
    options: [
      'The method T is a completely separate type parameter that shadows the class-level T for that method scope',
      'The code fails to compile because duplicate type parameter names are forbidden',
      'The method T must be an exact subclass of the class T',
      'The method T is converted to Object while class T is preserved'
    ],
    correctAnswer: 0,
    explanation: 'When a method introduces its own type parameter `<T>`, it shadows the class-level type parameter `T`. Inside that method, `T` refers to the method\'s parameter type, not the instance\'s type. This is usually a bug or bad practice (better to use `<E>`).',
    tags: ['Type Parameter Shadowing', 'Scoping', 'Generics']
  },
  {
    id: 105,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'Why can you NOT create a `new` instance of a generic type parameter `new T()` directly in Java?',
    options: [
      'Because `T` might be an interface or abstract class, and because `T` is erased to its bound (such as `Object`) at runtime, the compiler cannot know which constructor to invoke or whether `T` has an accessible zero-arg constructor',
      'Because memory allocation in Java only works with primitive types',
      'Because the new keyword is deprecated for generics',
      'Because the JVM forbids constructors on heap objects'
    ],
    correctAnswer: 0,
    explanation: 'Because `T` is erased, `new T()` has no concrete class at runtime. Furthermore, `T` might represent an interface, an abstract class, or a class without a no-arg constructor. The standard workaround is passing a factory or class literal `Class<T> clazz` and calling `clazz.getDeclaredConstructor().newInstance()`.',
    tags: ['Instantiation', 'Type Erasure', 'new T()']
  },
  {
    id: 106,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What is the difference between `Collections.unmodifiableList(list)` and `List.copyOf(list)` regarding immutability?',
    options: [
      'Both create mutable clones of the list',
      'Collections.unmodifiableList() creates an unmodifiable view wrapper around the original list (if the underlying list changes, the view reflects those mutations); List.copyOf() creates a true immutable snapshot copy',
      'List.copyOf() returns a synchronized list',
      'Collections.unmodifiableList() is stored in Metaspace'
    ],
    correctAnswer: 1,
    explanation: '`Collections.unmodifiableList` is merely a view: modifying the underlying backing list directly will be visible through the wrapper. `List.copyOf` (Java 10+) performs a defensive copy (or returns the instance if already an unmodifiable list), guaranteeing a truly immutable snapshot.',
    tags: ['Immutability', 'Unmodifiable View', 'List.copyOf']
  },
  {
    id: 107,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'How does generic type argument deduction behave with Java 10 `var` local variable type inference?',
    codeSnippet: `var list = new ArrayList<String>(); // What type is inferred?`,
    options: [
      'var is inferred as ArrayList<Object>',
      'var is inferred as ArrayList<String> (the exact concrete type and type parameters on the right-hand side)',
      'var is inferred as List<String>',
      'var compiles to a dynamically typed JavaScript object'
    ],
    correctAnswer: 1,
    explanation: '`var` performs local variable type inference based on the exact type of the initializer expression. `new ArrayList<String>()` has type `ArrayList<String>`, so `list` is statically typed as `ArrayList<String>` at compile time (not `List<String>`).',
    tags: ['var', 'Type Inference', 'Java 10']
  },
  {
    id: 108,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is the behavior of Generic Exception types in Java (`class MyException<T> extends Exception`)?',
    options: [
      'Generic exception classes are fully supported in Java 21',
      'Generic classes cannot directly or indirectly extend `java.lang.Throwable`; doing so causes a compile-time error because catching a generic exception (`catch (MyException<T> e)`) would require reified type checking at runtime',
      'Generic exceptions can only extend `RuntimeException`',
      'Generic exceptions must implement `Serializable`'
    ],
    correctAnswer: 1,
    explanation: 'The Java Language Specification explicitly forbids generic classes from extending `Throwable`. Because exception handling (`catch (MyException<String> e)`) is executed by the JVM at runtime, type erasure would make it impossible to distinguish between `catch (MyException<String>)` and `catch (MyException<Integer>)`.',
    tags: ['Exceptions', 'Generics Restrictions', 'JLS']
  },
  {
    id: 109,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What is the upper bound of an unbounded type parameter `<T>` in Java?',
    options: [
      '`void`',
      '`java.lang.Object`',
      '`java.lang.Class`',
      'There is no upper bound'
    ],
    correctAnswer: 1,
    explanation: 'When a type parameter `<T>` is declared without explicit bounds, its implicit upper bound is `java.lang.Object`. Therefore, after type erasure, all occurrences of `T` are replaced with `Object`.',
    tags: ['Type Bounds', 'Object', 'Generics']
  },
  {
    id: 110,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What does the compiler do when a method returns a generic type `T` and assigns it to a concrete type variable?',
    codeSnippet: `public <T> T getObject() { return (T) new String("hello"); }
String s = getObject();`,
    options: [
      'It performs no runtime checks whatsoever',
      'It inserts a synthetic cast `(String)` at the call site in the generated bytecode of the caller',
      'It converts String to Object permanently',
      'It throws a compile-time error'
    ],
    correctAnswer: 1,
    explanation: 'Because `getObject()` erases to return `Object`, the Java compiler automatically inserts a checkcast bytecode instruction `(checkcast java/lang/String)` at the caller site where the result is assigned to `String s`.',
    tags: ['Bytecode', 'checkcast', 'Type Erasure']
  },
  {
    id: 111,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'How do you define a generic method that accepts two lists and merges them into a third list maintaining full covariance and contravariance?',
    options: [
      '`public static <T> void merge(List<T> src1, List<T> src2, List<T> dest)`',
      '`public static <T> void merge(List<? extends T> src1, List<? extends T> src2, List<? super T> dest)`',
      '`public static <T> void merge(List<? super T> src1, List<? super T> src2, List<? extends T> dest)`',
      '`public static void merge(List<?> src1, List<?> src2, List<?> dest)`'
    ],
    correctAnswer: 1,
    explanation: 'Following the PECS rule: `src1` and `src2` produce items of type `T` (so they should be `List<? extends T>`), while `dest` consumes items of type `T` (so it should be `List<? super T>`). This allows maximum flexibility (e.g. copying from `List<Integer>` and `List<Double>` into `List<Number>`).',
    tags: ['PECS', 'API Design', 'Generics']
  },
  {
    id: 112,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'What is the diamond operator `<>` introduced in Java 7?',
    codeSnippet: `Map<String, List<Integer>> map = new HashMap<>();`,
    options: [
      'A pointer dereference operator',
      'A syntactic shortcut allowing the compiler to infer generic type arguments for constructor invocations from the target variable declaration context',
      'An operator for bitwise XOR operations',
      'A marker for thread-safe collections'
    ],
    correctAnswer: 1,
    explanation: 'The diamond operator `<>` allows omitting redundant type arguments when invoking a generic constructor. The compiler infers the constructor\'s type arguments from the assignment context.',
    tags: ['Diamond Operator', 'Java 7', 'Type Inference']
  },
  {
    id: 113,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'Why can you NOT create an array of a bounded wildcard type such as `new ArrayList<? extends Number>[10]`?',
    options: [
      'Because arrays are non-reifiable, creating an array of any parameterized type with wildcards or arguments is unsafe and rejected by the compiler to prevent heap pollution',
      'Because Number is an abstract class',
      'Because array length must be dynamic for wildcards',
      'Because wildcard arrays require C++ native headers'
    ],
    correctAnswer: 0,
    explanation: 'Parameterized types (except unbounded wildcards like `ArrayList<?>[]`) are non-reifiable. Creating arrays of non-reifiable types is prohibited by the Java compiler because array store checks cannot enforce erased type arguments at runtime.',
    tags: ['Generic Arrays', 'Wildcards', 'Compile Error']
  },
  {
    id: 114,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'How does the Reflection API (`java.lang.reflect.Type`) represent generic types at runtime?',
    options: [
      'Everything is converted to `java.lang.Class`',
      '`Type` is the top-level interface implemented by `Class<?>`, `ParameterizedType`, `GenericArrayType`, `TypeVariable<?>`, and `WildcardType`',
      '`Type` is an enum with 5 constant states',
      'Generic types cannot be reflected at all'
    ],
    correctAnswer: 1,
    explanation: 'The `java.lang.reflect` package provides a rich hierarchy: `ParameterizedType` (e.g. `List<String>`), `TypeVariable` (e.g. `T`), `WildcardType` (e.g. `? extends Number`), `GenericArrayType` (e.g. `T[]`), and `Class` (raw classes).',
    tags: ['Reflection', 'ParameterizedType', 'Type System']
  },
  {
    id: 115,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'Can you use primitive types (like `int`, `double`) directly as generic type arguments (e.g. `List<int>`) in Java up to version 21?',
    options: [
      'Yes, Java 21 fully supports primitive generic arguments',
      'No, generic type arguments must be reference types (subtypes of Object); primitives must be boxed into their wrapper types (e.g. `List<Integer>`) (Project Valhalla intends to address this with primitive specialization)',
      'Only int and long are supported',
      'Only if the class implements Serializable'
    ],
    correctAnswer: 1,
    explanation: 'Due to type erasure to `Object`, Java generics currently require all type arguments to be reference types. Primitive values must be boxed into wrapper objects (`Integer`, `Double`), which causes memory overhead and cache misses (targeted for improvement in Project Valhalla).',
    tags: ['Primitives', 'Boxed Types', 'Project Valhalla']
  },
  {
    id: 116,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the purpose of `java.lang.reflect.ParameterizedType.getActualTypeArguments()`?',
    options: [
      'Returns the array of runtime `Type` objects representing the actual generic type arguments (e.g. `[String.class]` for `List<String>`) if preserved in class signature metadata',
      'Returns the number of arguments passed to a constructor',
      'Returns the bytecode size of the generic class',
      'Returns the CPU cache line size'
    ],
    correctAnswer: 0,
    explanation: 'When inspecting generic metadata (such as a generic field or generic superclass), `ParameterizedType.getActualTypeArguments()` returns an array of `Type` objects representing the declared type arguments (e.g. `String.class`).',
    tags: ['ParameterizedType', 'Reflection', 'Metadata']
  },
  {
    id: 117,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is the difference between `<T extends Enum<T>>` and `<T extends Enum<?>>` when constraining an enum generic parameter?',
    options: [
      'There is no difference in type checking',
      '`<T extends Enum<T>>` is a recursive type bound ensuring that T is compared and matched strictly with its own concrete enum type, whereas `<T extends Enum<?>>` allows any enum type without self-type constraint',
      '`<T extends Enum<?>>` cannot be serialized',
      '`<T extends Enum<T>>` is prohibited by the compiler'
    ],
    correctAnswer: 1,
    explanation: 'The Java `Enum` class declaration is `public abstract class Enum<E extends Enum<E>>`. Bounding `<T extends Enum<T>>` matches the exact formal definition of the enum hierarchy, guaranteeing that `T` is its own enum type (used in `EnumSet` and `EnumMap`).',
    tags: ['Enum Generics', 'Recursive Bound', 'EnumSet']
  },
  {
    id: 118,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Advanced',
    question: 'Why does `List<String>` not compile when passed to a method expecting `List<Object>`?',
    options: [
      'Because String does not inherit from Object',
      'Because generics are invariant: if `List<String>` were accepted as `List<Object>`, the method could insert an `Integer` into the list, violating the caller\'s type safety',
      'Because String is a final class',
      'Because List is an interface'
    ],
    correctAnswer: 1,
    explanation: 'If `List<String>` were a subtype of `List<Object>`, you could write: `List<Object> objs = stringList; objs.add(Integer.valueOf(42)); String s = stringList.get(0);` which would throw a `ClassCastException`. Invariance prevents this at compile time.',
    tags: ['Invariance', 'Type Safety', 'Generics']
  },
  {
    id: 119,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Expert',
    question: 'What is the effect of the `@SuppressWarnings("unchecked")` annotation?',
    options: [
      'It disables all Java security managers permanently',
      'It instructs the compiler to suppress warnings about unchecked type operations (like raw type casts or unchecked conversions) for the annotated element scope',
      'It forces runtime type verification of generic lists',
      'It converts unchecked exceptions into checked exceptions'
    ],
    correctAnswer: 1,
    explanation: '`@SuppressWarnings("unchecked")` tells the compiler to silence warnings about operations where type safety cannot be guaranteed at compile time (e.g. casting from raw type or array allocation). It should always be applied to the smallest possible scope after manually verifying safety.',
    tags: ['@SuppressWarnings', 'Annotations', 'Compiler Warnings']
  },
  {
    id: 120,
    category: 'generics-type-system',
    categoryTitle: 'Generics & Java Type System',
    difficulty: 'Master',
    question: 'What is "Definite Assignment Analysis" in the Java Type System and compiler?',
    options: [
      'Assigning IP addresses to network interfaces at boot',
      'A formal conservative static analysis performed by the Java compiler ensuring that every local variable must have a definitely assigned value before any read access is attempted, preventing uninitialized memory reads',
      'Assigning thread priorities to OS threads',
      'Mapping database primary keys to JPA entities'
    ],
    correctAnswer: 1,
    explanation: 'Chapter 16 of the Java Language Specification (JLS) specifies Definite Assignment. The compiler analyzes all control flow paths (if, while, try-catch, loops). If any execution path allows a local variable to be read before being assigned a value, compilation fails with a "variable might not have been initialized" error.',
    tags: ['Definite Assignment', 'JLS', 'Static Analysis']
  }
];
