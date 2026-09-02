import { Question } from '../../types';

export const modernJavaQuestions: Question[] = [
  {
    id: 201,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'How do "Record Patterns" (JEP 440) in Java 21 enable nested deconstruction in `switch` expressions?',
    codeSnippet: `record Point(int x, int y) {}
record ColoredPoint(Point p, String color) {}

static void printLocation(ColoredPoint cp) {
    if (cp instanceof ColoredPoint(Point(int x, int y), String c)) {
        System.out.printf("X=%d, Y=%d, Color=%s%n", x, y, c);
    }
}`,
    options: [
      'They convert record classes to JSON strings automatically',
      'They decompose the record into its constituent components directly inside the pattern match, binding nested components (`x`, `y`, `c`) to local variables without manual accessor calls (`cp.p().x()`)',
      'They make record instances mutable during pattern evaluation',
      'They bypass the Java bytecode verifier'
    ],
    correctAnswer: 1,
    explanation: 'Record patterns (JEP 440) deconstruct record values into their typed components. By nesting `Point(int x, int y)` inside `ColoredPoint(...)`, the pattern extracts and binds `x`, `y`, and `c` in one declarative step with full compile-time type validation.',
    tags: ['Record Patterns', 'Deconstruction', 'Pattern Matching', 'Java 21']
  },
  {
    id: 202,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'In Java 17+, how does the compiler enforce "Exhaustiveness" in a `switch` expression when switching over a Sealed Hierarchy?',
    codeSnippet: `sealed interface Shape permits Circle, Rectangle, Triangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
record Triangle(double b, double h) implements Shape {}

double area(Shape s) {
    return switch (s) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
        case Triangle t -> 0.5 * t.b() * t.h();
        // Notice: No default branch!
    };
}`,
    options: [
      'The compiler requires a default branch in all switch statements regardless of hierarchy',
      'Because `Shape` is sealed and explicitly permits only Circle, Rectangle, and Triangle, the compiler statically verifies that all possible subtypes are covered; if all permitted classes are handled, no `default` branch is needed, and adding a new permitted class to Shape later triggers a compile error',
      'The compiler inserts a fallback to null at runtime',
      'The code throws an ExhaustionException at startup'
    ],
    correctAnswer: 1,
    explanation: 'Sealed classes allow the compiler to know the closed set of all possible direct subtypes. In a pattern matching `switch` expression, covering all permitted subtypes proves exhaustiveness at compile time, eliminating defensive `default` branches and providing compile-time alerts if the hierarchy expands.',
    tags: ['Sealed Classes', 'Exhaustiveness', 'Pattern Matching', 'Java 17']
  },
  {
    id: 203,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the purpose of the "Compact Constructor" in Java Record classes?',
    codeSnippet: `public record Person(String name, int age) {
    public Person {
        Objects.requireNonNull(name, "Name cannot be null");
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        // Notice: No this.name = name; or this.age = age;!
    }
}`,
    options: [
      'It creates an empty constructor with zero arguments',
      'It allows parameter validation and normalization without repeating the canonical constructor parameter list or explicit field assignment statements (`this.x = x`), which are synthesized automatically at the end of the constructor',
      'It restricts record instantiation to the same package',
      'It compresses the record fields into a single long value'
    ],
    correctAnswer: 1,
    explanation: 'A compact constructor (omitting parameter parenthesis `public Person { ... }`) allows validating and transforming constructor arguments (e.g. `name = name.trim();`). The compiler automatically assigns the parameters to their respective final fields at the end of the block.',
    tags: ['Records', 'Compact Constructor', 'Validation']
  },
  {
    id: 204,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What modifier must every direct subclass of a `sealed` class or interface specify?',
    options: [
      'It must be declared `transient` or `volatile`',
      'It must be explicitly declared as either `final`, `sealed` (further restricting its own subclasses), or `non-sealed` (re-opening the hierarchy for extension)',
      'It must be declared `abstract` and `public`',
      'It must implement `Cloneable`'
    ],
    correctAnswer: 1,
    explanation: 'To maintain the integrity of sealed type hierarchies, the JLS mandates that every permitted direct subclass must explicitly state how it continues or terminates the boundary: `final` (cannot be extended), `sealed` (extends hierarchy with its own permits list), or `non-sealed` (unrestricted extension).',
    tags: ['Sealed Classes', 'non-sealed', 'final', 'permits']
  },
  {
    id: 205,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'How do "Guarded Pattern Cases" using the `when` keyword work in Java 21 pattern matching switch?',
    codeSnippet: `static String categorize(Object obj) {
    return switch (obj) {
        case Integer i when i > 0 -> "Positive Integer";
        case Integer i when i < 0 -> "Negative Integer";
        case Integer i -> "Zero";
        case String s when !s.isBlank() -> "Non-empty string: " + s;
        default -> "Other";
    };
}`,
    options: [
      'The `when` clause executes asynchronously in a separate thread',
      'The pattern matches if both the type pattern matches AND the boolean expression following `when` evaluates to true; if false, switch evaluation continues to the next case',
      'The `when` clause is only valid in Java SQL expressions',
      'The `when` clause replaces `if-else` loops inside methods'
    ],
    correctAnswer: 1,
    explanation: 'Java 21 (JEP 441) standardized guarded patterns in switch using `when <boolean-expression>`. A case branch is taken only if the target object matches the type pattern and the guard expression evaluates to true.',
    tags: ['Pattern Matching', 'Guarded Patterns', 'when clause', 'Java 21']
  },
  {
    id: 206,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What are "Unnamed Variables and Patterns" (JEP 456) denoted by underscore (`_`) in Java 22+?',
    codeSnippet: `try {
    int val = Integer.parseInt(s);
} catch (NumberFormatException _) { // Unnamed variable!
    log.warn("Invalid number format");
}

if (obj instanceof Point(int x, _)) { // Unnamed pattern!
    System.out.println("X coordinate is " + x);
}`,
    options: [
      'They declare global global variables accessible across all classes',
      'They allow developers to intentionally declare unused variables (in catch blocks, try-with-resources, lambdas) or ignore unused components in pattern deconstruction without triggering compiler warnings or reserving identifier names',
      'They allocate uninitialized memory on the stack',
      'They are aliases for `null`'
    ],
    correctAnswer: 1,
    explanation: 'JEP 456 introduces `_` as the unnamed variable and pattern marker. When a variable name or pattern component is not needed, using `_` avoids unused-variable warnings and explicitly signals to human readers and compilers that the value is intentionally ignored.',
    tags: ['Unnamed Variables', 'JEP 456', 'Underscore Pattern', 'Java 22']
  },
  {
    id: 207,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'How are multi-line "Text Blocks" formatted in Java 15+, and how is accidental indentation stripped?',
    codeSnippet: `String html = """
              <html>
                  <body>
                      <p>Hello, World</p>
                  </body>
              </html>
              """;`,
    options: [
      'Text blocks preserve all leading whitespace from column 0 verbatim',
      'The compiler calculates the common white space prefix ("incidental whitespace") across all non-empty lines based on the position of the closing `"""` delimiter (or leftmost non-whitespace character) and automatically strips it',
      'Indentation must be manually stripped using `.trim()`',
      'Text blocks cannot contain HTML or XML characters'
    ],
    correctAnswer: 1,
    explanation: 'Text Blocks (`"""`) automatically distinguish incidental whitespace from essential whitespace. The compiler aligns lines relative to the leftmost non-whitespace character or the closing delimiter `"""`, removing common indentation while preserving line breaks.',
    tags: ['Text Blocks', 'Incidental Whitespace', 'Java 15']
  },
  {
    id: 208,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'How does `switch` handle `null` values in Java 21 compared to traditional pre-Java 17 switch statements?',
    codeSnippet: `switch (obj) {
    case null -> System.out.println("Object is null");
    case String s -> System.out.println("String: " + s);
    default -> System.out.println("Other object");
}`,
    options: [
      'Passing null to any switch statement always throws NullPointerException in all Java versions',
      'Modern pattern switch allows an explicit `case null` (or combined `case null, default`); if no `case null` is declared, passing a null selector still throws NullPointerException for backward compatibility',
      'Modern switch converts null to the empty string automatically',
      'null can only be handled in default cases'
    ],
    correctAnswer: 1,
    explanation: 'Historically, switching on `null` immediately threw `NullPointerException`. In Java 21, you can explicitly handle null via `case null -> ...` or `case null, String s -> ...`. If `case null` is omitted, the switch retains null-hostile behavior and throws NPE.',
    tags: ['switch on null', 'Pattern Matching', 'Null Handling', 'Java 21']
  },
  {
    id: 209,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the difference between a `Record` class and a standard `class` regarding field immutability and inheritance?',
    options: [
      'Records can extend any class and can have mutable public fields',
      'Records are implicitly `final` and cannot extend any class (they implicitly extend `java.lang.Record`); all declared components are private and final with automatically generated accessor methods, `equals()`, `hashCode()`, and `toString()`',
      'Records cannot implement any interfaces',
      'Records must have zero fields'
    ],
    correctAnswer: 1,
    explanation: 'Records are transparent carriers for immutable data. They are implicitly `final` and cannot extend any other class. All record components produce private final fields and public accessor methods (`name()`, not `getName()`). Records CAN implement interfaces.',
    tags: ['Records', 'Immutability', 'java.lang.Record']
  },
  {
    id: 210,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What is the return type of `String.strip()` (Java 11+) compared to `String.trim()` (Java 1.0)?',
    options: [
      'Both return identical results for all Unicode characters',
      '`strip()` uses Unicode whitespace standards (`Character.isWhitespace()`), correctly stripping exotic spaces (e.g. non-breaking space, em-space, thin-space), whereas `trim()` only removes ASCII characters with codepoints $\\le \\text{U+0020}$',
      '`strip()` modifies the string in-place; `trim()` returns a copy',
      '`strip()` converts all characters to lowercase'
    ],
    correctAnswer: 1,
    explanation: '`trim()` is a legacy method from Java 1.0 that only checks if char value $\\le$ 32 (ASCII space). Modern Unicode contains dozens of whitespace code points that `trim()` ignores. `strip()` uses Unicode whitespace detection, making it the proper modern standard.',
    tags: ['String.strip', 'Unicode Whitespace', 'Java 11']
  },
  {
    id: 211,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'What is the function of `Optional.orElseThrow()` with no arguments introduced in Java 10?',
    options: [
      'It throws an IllegalArgumentException if empty',
      'It is the preferred synonym for `Optional.get()`, throwing `NoSuchElementException` if the value is empty while making the potential exception explicit in code',
      'It retries the operation 3 times',
      'It logs a warning to stderr'
    ],
    correctAnswer: 1,
    explanation: '`Optional.get()` was widely criticized because its name misleadingly suggested it is always safe. Java 10 introduced `orElseThrow()` as the clear, idiomatic alternative to signal that calling it on an empty Optional throws `NoSuchElementException`.',
    tags: ['Optional', 'orElseThrow', 'API Design']
  },
  {
    id: 212,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the "Vector API" (JEP 448) incubated in modern Java versions designed to accomplish?',
    options: [
      'To provide dynamic resizing for ArrayList',
      'To express vector computations that reliably compile at runtime to optimal SIMD (Single Instruction Multiple Data) hardware vector instructions on supported CPU architectures (AVX, AVX-512, ARM Neon)',
      'To render 3D graphics inside Swing windows',
      'To perform vector database indexing in Metaspace'
    ],
    correctAnswer: 1,
    explanation: 'The Vector API allows developers to write data-parallel vector computations (e.g., matrix multiplications, audio/video signal processing, cryptographic hashing) in pure Java, which the C2 compiler translates directly into CPU SIMD vector instructions.',
    tags: ['Vector API', 'SIMD', 'Performance', 'Project Panama']
  },
  {
    id: 213,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `String.formatted(...)` provide in Java 15+?',
    codeSnippet: `String msg = "User %s has %d items".formatted(username, count);`,
    options: [
      'An instance method equivalent to `String.format(this, args)`, providing a fluent and readable syntax for formatted strings',
      'A method that validates JSON schemas',
      'A method that strips HTML tags from strings',
      'A compiler macro that formats source code indentation'
    ],
    correctAnswer: 0,
    explanation: '`String.formatted(Object... args)` is a convenient instance method on `java.lang.String` equivalent to `String.format(str, args)`. It allows chaining formatting operations cleanly without wrapping static utility calls.',
    tags: ['String.formatted', 'String API', 'Java 15']
  },
  {
    id: 214,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'What happens if a class attempts to implement or extend a `sealed` interface without being listed in the `permits` clause and not residing in the same compilation unit?',
    options: [
      'It compiles successfully with a warning',
      'Compilation fails with a compile-time error: class is not allowed to extend sealed class/interface',
      'It creates a dynamic proxy at runtime',
      'It throws a RuntimeException at class loading time'
    ],
    correctAnswer: 1,
    explanation: 'The Java compiler strictly enforces the sealed constraint. A subclass/subinterface must be explicitly named in the `permits` clause (or defined in the same source file if omitting `permits`), otherwise compilation fails.',
    tags: ['Sealed Classes', 'permits', 'Compilation Error']
  },
  {
    id: 215,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'How do "Scoped Values" (JEP 446 / Java 21+) prevent the accidental mutation and lifetime bugs common with `ThreadLocal`?',
    options: [
      'By encrypting values with private RSA keys',
      'Scoped Values are write-once / immutable within a dynamic execution scope; values cannot be modified once bound and are automatically unbound when the execution block terminates, preventing memory leaks and unbounded state leakage',
      'By storing values on external network servers',
      'By running only inside synchronized blocks'
    ],
    correctAnswer: 1,
    explanation: '`ScopedValue` allows binding a value to a dynamic scope (`ScopedValue.where(KEY, val).run(...)`). Unlike `ThreadLocal`, a ScopedValue cannot be mutated (`set()`) after binding, and it exists only during the synchronous execution of the block, making it safe and lightweight for millions of virtual threads.',
    tags: ['Scoped Values', 'ThreadLocal', 'Java 21']
  },
  {
    id: 216,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `Stream.toList()` (Java 16+) return compared to `Stream.collect(Collectors.toList())`?',
    options: [
      '`Stream.toList()` returns an unmodifiable / immutable `List`; `Collectors.toList()` returns a mutable `ArrayList` (implementation-dependent)',
      '`Stream.toList()` is asynchronous while `Collectors.toList()` is synchronous',
      '`Stream.toList()` sorts elements automatically',
      '`Collectors.toList()` is deprecated in Java 21'
    ],
    correctAnswer: 0,
    explanation: '`Stream.toList()` is a convenient terminal method that returns an unmodifiable list with minimal memory overhead (avoiding Collector allocations). In contrast, `collect(Collectors.toList())` returns a mutable `ArrayList`.',
    tags: ['Stream.toList', 'Collectors.toList', 'Immutability']
  },
  {
    id: 217,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'How does `Pattern Matching for instanceof` (Java 16+) simplify type checks and casting?',
    codeSnippet: `// Before Java 16
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Java 16+
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}`,
    options: [
      'It creates a new String on the heap',
      'It introduces a pattern variable `s` that is automatically cast and in-scope inside the branch where the predicate is true, eliminating redundant explicit casting',
      'It forces the object to be non-null at compile time',
      'It runs reflection checks'
    ],
    correctAnswer: 1,
    explanation: 'Pattern matching for `instanceof` (JEP 394) binds the target object to a scoped pattern variable (`String s`) if the type check succeeds. Flow scoping ensures `s` is visible only where the check is known to be true (including right-hand side of `&&`).',
    tags: ['Pattern Matching', 'instanceof', 'Flow Scoping']
  },
  {
    id: 218,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is "Flow Scoping" in Java pattern matching variable visibility?',
    codeSnippet: `if (!(obj instanceof String s)) {
    throw new IllegalArgumentException("Not a string");
}
// Is 's' in scope here?
System.out.println("Length is: " + s.length());`,
    options: [
      'Compile error: `s` is never accessible outside the `if` body',
      'The code compiles cleanly: because the `if` block terminates unconditionally with a throw, execution can only reach the subsequent lines if `obj` was indeed a `String`, so `s` remains in scope',
      's is converted to Object outside the if statement',
      'Flow scoping applies only to while loops'
    ],
    correctAnswer: 1,
    explanation: 'Java uses flow analysis to determine pattern variable scope. Because the `!(instanceof)` branch exits via `throw`, the only way execution can reach the subsequent line is if `obj instanceof String` evaluated to true. Therefore, `s` is safely in scope.',
    tags: ['Flow Scoping', 'Pattern Matching', 'JLS']
  },
  {
    id: 219,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What is the purpose of `Predicate.not(...)` introduced in Java 11?',
    codeSnippet: `lines.stream()
     .filter(Predicate.not(String::isBlank))
     .forEach(System.out::println);`,
    options: [
      'To invert boolean logic of a method reference without having to write verbose lambda syntax `s -> !s.isBlank()`',
      'To filter out null values only',
      'To convert predicates to consumers',
      'To execute predicates in parallel'
    ],
    correctAnswer: 0,
    explanation: '`Predicate.not(Predicate<T>)` is a static helper that negates a predicate. It enables using method references in stream filters (e.g. `Predicate.not(String::isBlank)`) instead of writing manual negation lambdas (`s -> !s.isBlank()`).',
    tags: ['Predicate.not', 'Functional Programming', 'Java 11']
  },
  {
    id: 220,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'How do "Switch Expressions" (Java 14+) differ from traditional "Switch Statements"?',
    options: [
      'Switch expressions must use strings only',
      'Switch expressions yield a value (using `->` or `yield`), enforce exhaustiveness checking by the compiler, and do not fall through between cases when using arrow syntax',
      'Switch statements are deprecated in Java 21',
      'Switch expressions cannot contain code blocks'
    ],
    correctAnswer: 1,
    explanation: 'Switch expressions can produce a value assigned to a variable. Using arrow syntax (`case X -> ...`) eliminates accidental fall-through bugs (no `break` needed). The compiler mandates exhaustiveness: all possible input domain values must be covered.',
    tags: ['Switch Expressions', 'yield', 'Java 14']
  },
  {
    id: 221,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the purpose of the `yield` statement in Java Switch Expressions?',
    codeSnippet: `int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY -> 7;
    case THURSDAY, SATURDAY -> 8;
    case WEDNESDAY -> {
        System.out.println("Midweek day");
        yield 9; // What does yield do?
    }
};`,
    options: [
      'It pauses the current thread like Thread.yield()',
      'It returns a value from a multi-statement block inside a switch expression case arm to become the value of the overall switch expression',
      'It generates an asynchronous iterator stream',
      'It releases the monitor lock on the object'
    ],
    correctAnswer: 1,
    explanation: 'Inside a multi-statement block in a switch expression, `yield <value>;` specifies the resulting value of that branch, differentiating returning a value from the switch expression vs returning from the enclosing method with `return`.',
    tags: ['yield', 'Switch Expressions', 'Java 14']
  },
  {
    id: 222,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `Objects.requireNonNullElse(obj, defaultObj)` (Java 9+) do?',
    options: [
      'Throws NullPointerException if either obj or defaultObj is null',
      'Returns `obj` if it is non-null; otherwise returns the non-null `defaultObj` (throwing NullPointerException if defaultObj is also null)',
      'Replaces null objects with empty strings',
      'Allocates a new object on the heap'
    ],
    correctAnswer: 1,
    explanation: '`Objects.requireNonNullElse(T obj, T defaultObj)` provides a clean null-coalescing utility. If `obj` is not null, it is returned. If `obj` is null, `defaultObj` is returned (and if `defaultObj` is null, an NPE is thrown).',
    tags: ['Objects Utility', 'Null Safety', 'Java 9']
  },
  {
    id: 223,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'How do "Sequenced Collections" (Java 21) handle reversing views of lists and sets via `.reversed()`?',
    codeSnippet: `List<String> list = new ArrayList<>(List.of("A", "B", "C"));
List<String> rev = list.reversed();
rev.add("D"); // What happens to the original list?`,
    options: [
      'rev is an independent deep copy array; list remains unchanged',
      'rev is a live reverse-order view of the original list; adding "D" to rev inserts "D" at index 0 (the beginning) of the original list',
      'Throws an UnsupportedOperationException because reversed views are immutable',
      'Throws a ConcurrentModificationException'
    ],
    correctAnswer: 1,
    explanation: '`.reversed()` returns a mutable reverse-ordered view backed by the original collection. Structural mutations on the reversed view are mirrored onto the parent collection at the opposite corresponding positions (e.g. adding to the end of `rev` adds to the start of `list`).',
    tags: ['SequencedCollection', 'reversed()', 'Views', 'Java 21']
  },
  {
    id: 224,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the role of `HttpClient` (Java 11+) over the legacy `HttpURLConnection`?',
    options: [
      'HttpClient only supports HTTP/1.0',
      'HttpClient provides modern, asynchronous (non-blocking CompletableFuture and Reactive Streams Flow), HTTP/2 and WebSocket support with connection pooling and SSL/TLS configuration',
      'HttpClient requires third-party Apache dependencies',
      'HttpClient can only be used on Android devices'
    ],
    correctAnswer: 1,
    explanation: '`java.net.http.HttpClient` (JEP 321) replaced the dated `HttpURLConnection`. It natively supports HTTP/2 multiplexing, WebSockets, synchronous and asynchronous non-blocking request pipelines via `CompletableFuture`, and reactive stream body handlers.',
    tags: ['HttpClient', 'HTTP/2', 'CompletableFuture', 'Reactive']
  },
  {
    id: 225,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `String.repeat(int count)` do in Java 11+?',
    codeSnippet: `String line = "-".repeat(10);`,
    options: [
      'Creates a string consisting of the original string repeated `count` times',
      'Prints the string to console `count` times',
      'Throws an exception if count > 5',
      'Splits the string into an array of size count'
    ],
    correctAnswer: 0,
    explanation: '`String.repeat(n)` returns a newly allocated String whose value is the concatenation of this string repeated `n` times. It is optimized at the bytecode/JVM level to copy bytes into a pre-sized backing array directly.',
    tags: ['String.repeat', 'String API', 'Java 11']
  },
  {
    id: 226,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'What is a "Local Class / Record" declared inside a method body in Java 16+?',
    codeSnippet: `public List<Summary> summarize(List<Order> orders) {
    record TempCalc(String category, double total) {}
    // TempCalc used only inside this method!
}`,
    options: [
      'Compile error: records cannot be declared inside methods',
      'A record declared locally inside a method body; it is implicitly static and cannot capture enclosing instance state, serving as a clean intermediate data carrier within method scope',
      'A record that is saved to local disk',
      'A record that can only be accessed by reflection'
    ],
    correctAnswer: 1,
    explanation: 'Java 16 allows local records, interfaces, and enums inside methods. Local records are implicitly static (they cannot capture outer instance fields), making them ideal for intermediate calculations in stream pipelines without polluting class namespaces.',
    tags: ['Local Records', 'Scoping', 'Java 16']
  },
  {
    id: 227,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'How do "String Templates" (JEP 430 / JEP 465) provide injection-safe string interpolation compared to naive string concatenation?',
    codeSnippet: `String name = "Alice'; DROP TABLE Users; --";
String query = DB."SELECT * FROM Users WHERE name = '\{name\}'";`,
    options: [
      'They compile queries to WebAssembly',
      'A Template Processor (like `DB` or custom processors) intercepts the template fragments and values before string assembly, allowing validation, parameterization (e.g. prepared statement binding), and sanitization to prevent injection vulnerabilities',
      'They encrypt strings in memory with SSL',
      'They convert all string templates into JSON objects'
    ],
    correctAnswer: 1,
    explanation: 'Unlike languages that perform raw string substitution (which risks SQL/HTML injection), Java String Templates process string literals and embedded expressions through a `StringTemplate.Processor`. Processors can validate types and construct safe domain objects (like `PreparedStatement`).',
    tags: ['String Templates', 'JEP 430', 'Security', 'Interpolation']
  },
  {
    id: 228,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `Files.readString(Path)` (Java 11+) do?',
    options: [
      'Reads the entire content of a file into a single `String` using UTF-8 (or specified Charset) in a single method call',
      'Reads only the first line of a file',
      'Parses the file as JSON',
      'Streams lines to stdout'
    ],
    correctAnswer: 0,
    explanation: '`Files.readString(path)` is a convenient NIO.2 utility method added in Java 11 that reads all bytes from a file into a `String` decoded with UTF-8, replacing boilerplate `BufferedReader`/`InputStreamReader` loops.',
    tags: ['Files.readString', 'NIO.2', 'Java 11']
  },
  {
    id: 229,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'What is the behavior of `Optional.stream()` introduced in Java 9?',
    options: [
      'It creates an infinite stream of empty optionals',
      'If the Optional contains a value, it returns a sequential Stream containing that single value; if empty, it returns an empty Stream, allowing seamless flat-mapping in stream pipelines (`stream.flatMap(Optional::stream)`)',
      'It converts the Optional to a byte stream for networking',
      'It throws an exception if the Optional is empty'
    ],
    correctAnswer: 1,
    explanation: '`Optional.stream()` bridges `Optional` and `Stream`. When processing a stream of Optionals, calling `.flatMap(Optional::stream)` cleanly filters out empty Optionals and unwraps the present values in a single functional step.',
    tags: ['Optional.stream', 'Streams', 'flatMap', 'Java 9']
  },
  {
    id: 230,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the effect of the `@Serial` annotation (Java 14+)?',
    options: [
      'It forces the class to be serialized as XML',
      'It instructs the compiler to verify that serialization-related fields (`serialVersionUID`, `serialPersistentFields`) and methods (`writeObject`, `readObject`, `readResolve`, `writeReplace`) match the exact signatures required by the serialization mechanism',
      'It makes the class thread-safe',
      'It assigns a serial number to the CPU'
    ],
    correctAnswer: 1,
    explanation: 'Similar to `@Override`, `@Serial` acts as a compiler lint check. If a developer accidentally misspells `readResolve()` or declares `serialVersionUID` with incorrect types/modifiers, `@Serial` triggers a compile warning or error.',
    tags: ['@Serial', 'Serialization', 'Compiler Checks', 'Java 14']
  },
  {
    id: 231,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What is the difference between `Stream.takeWhile(predicate)` and `Stream.filter(predicate)`?',
    options: [
      '`takeWhile` evaluates elements indefinitely; `filter` stops at 10',
      '`takeWhile` takes elements from an ordered stream as long as the predicate is true, and stops evaluating as soon as the first element fails the predicate (short-circuiting); `filter` evaluates every single element in the stream',
      'Both have identical behavior',
      '`takeWhile` can only be used on parallel streams'
    ],
    correctAnswer: 1,
    explanation: '`takeWhile` short-circuits: on a sorted stream, once it encounters an element that does not match the predicate, it terminates stream consumption immediately. `filter` tests all elements across the entire stream.',
    tags: ['takeWhile', 'filter', 'Short-Circuiting', 'Streams']
  },
  {
    id: 232,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'How does `Collectors.teeing(...)` (Java 12+) merge two downstream collectors in a single stream pass?',
    codeSnippet: `var result = Stream.of(1, 2, 3, 4, 5).collect(
    Collectors.teeing(
        Collectors.summingDouble(i -> i),
        Collectors.counting(),
        (sum, count) -> sum / count // Computes average!
    )
);`,
    options: [
      'It creates two separate threads to process the stream twice',
      'It passes every element through two distinct downstream collectors simultaneously in a single iteration pass, then combines their results using a bifunction merger',
      'It writes stream data to two files on disk',
      'It converts streams to teletype text'
    ],
    correctAnswer: 1,
    explanation: '`Collectors.teeing(c1, c2, merger)` acts like a "T-junction" in plumbing: each item in the stream is fed to both collector `c1` and collector `c2` in one pass, and their final outputs are merged by the given BiFunction.',
    tags: ['Collectors.teeing', 'Stream API', 'Java 12']
  },
  {
    id: 233,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'How does Java 21+ handle "Unnamed Classes and Instance Main Methods" (JEP 445 / JEP 463)?',
    codeSnippet: `// HelloWorld.java (No explicit class declaration!)
void main() {
    println("Hello, World!");
}`,
    options: [
      'It runs through an external Node.js interpreter',
      'The compiler synthesizes an implicit final top-level class enclosing the instance method, allowing beginners and scripting utilities to launch without boilerplate `public static void main(String[] args)` and `public class` wrappers',
      'It converts Java code to Bash scripts',
      'It disables type checking'
    ],
    correctAnswer: 1,
    explanation: 'JEP 445/463 streamlines onboarding and scripting: the compiler automatically wraps top-level methods into an unnamed class and supports instance `void main()` entry points without parameters.',
    tags: ['Unnamed Classes', 'Instance Main', 'JEP 463', 'Java 21']
  },
  {
    id: 234,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `String.indent(int n)` do in Java 12+?',
    options: [
      'Adjusts the indentation of each line in the string by `n` spaces (adding spaces if positive, stripping leading spaces if negative) and normalizes line endings',
      'Converts tabs to spaces in source files',
      'Inserts HTML `<pre>` tags',
      'Validates Python script indentation'
    ],
    correctAnswer: 0,
    explanation: '`String.indent(n)` adjusts leading whitespace across every line of a multi-line string by `n` spaces. Positive values prepend spaces; negative values remove up to `|n|` leading spaces, returning a normalized newline-terminated string.',
    tags: ['String.indent', 'Text Manipulation', 'Java 12']
  },
  {
    id: 235,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'What is the purpose of `Objects.checkIndex(int index, int length)` (Java 9+)?',
    options: [
      'It verifies that `index` is within bounds `0 <= index < length` and returns `index`, throwing `IndexOutOfBoundsException` if out of bounds, optimized by HotSpot JIT intrinsics',
      'It checks if a database index is fragmented',
      'It checks if an array is sorted',
      'It searches for an element in a binary tree'
    ],
    correctAnswer: 0,
    explanation: '`Objects.checkIndex` is a standardized bounds checker that HotSpot recognizes as an intrinsic instruction, generating optimized branch checks that assist loop bound optimizations and vectorization.',
    tags: ['Objects.checkIndex', 'Bounds Checking', 'JIT Intrinsics']
  },
  {
    id: 236,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'What is the "Foreign Linker" (`Linker.nativeLinker()`) in the Project Panama Foreign Function & Memory API?',
    codeSnippet: `Linker linker = Linker.nativeLinker();
MethodHandle strlen = linker.downcallHandle(
    linker.defaultLookup().find("strlen").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.JAVA_LONG, ValueLayout.ADDRESS)
);`,
    options: [
      'A replacement for the Java ClassLoader',
      'An API to create downcalls (calling C native library functions directly from Java MethodHandles) and upcalls (passing Java methods as C callbacks) without writing a single line of C/C++ JNI glue code',
      'A network socket proxy for foreign IP addresses',
      'A tool for compiling Java to native executables'
    ],
    correctAnswer: 1,
    explanation: '`Linker.nativeLinker()` provides high-speed native interop. By combining `downcallHandle` with `FunctionDescriptor`, Java code can invoke arbitrary C library functions (like POSIX `strlen` or OpenSSL) directly with JIT speed and without JNI headers or C wrapper libraries.',
    tags: ['Foreign Linker', 'Project Panama', 'JNI Replacement', 'FFM API']
  },
  {
    id: 237,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What does `Stream.iterate(seed, hasNextPredicate, nextFunction)` (Java 9+) accomplish?',
    codeSnippet: `Stream.iterate(1, x -> x <= 100, x -> x * 2).forEach(System.out::println);`,
    options: [
      'It replaces traditional `for` loops with finite, lazily-evaluated streams with explicit termination conditions',
      'It iterates over database tables',
      'It generates infinite random numbers',
      'It runs loops in parallel across all CPU cores'
    ],
    correctAnswer: 0,
    explanation: 'In Java 8, `Stream.iterate(seed, f)` produced infinite streams that required `.limit()`. Java 9 added the 3-argument version mirroring standard `for(init; condition; update)` loops, cleanly producing finite streams.',
    tags: ['Stream.iterate', 'Streams', 'Java 9']
  },
  {
    id: 238,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Expert',
    question: 'Why does Java disallow declaring mutable fields inside a `record` class?',
    options: [
      'Because the JVM forbids heap memory for records',
      'Because all record components are implicitly declared `private final`; introducing non-final instance fields would violate the record\'s core semantic contract of shallow immutability and transparent state',
      'Because records are converted into interfaces at compile time',
      'Because records cannot have constructors'
    ],
    correctAnswer: 1,
    explanation: 'Records are formal data carriers whose state is fully declared in the header. The compiler enforces that all component fields are `private final`. Declaring instance fields outside the header is prohibited to preserve immutable state transparency.',
    tags: ['Records', 'Immutability', 'JLS']
  },
  {
    id: 239,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Master',
    question: 'How does the "Class-File API" (JEP 457 / JEP 466 in Java 22+) replace third-party bytecode libraries like ASM and ByteBuddy for JDK internals?',
    options: [
      'It compiles Java source code directly into JavaScript files',
      'It provides a standard, evolving, first-party JDK API in `java.lang.classfile` to parse, generate, and transform Java class files aligned immediately with every new JVMS classfile version feature',
      'It removes bytecode from the JVM entirely',
      'It replaces the JVM JIT compiler'
    ],
    correctAnswer: 1,
    explanation: 'Historically, the JDK ecosystem relied on third-party ASM for bytecode manipulation, which lagged behind new JVM bytecode versions. The Class-File API provides a standard, high-performance JDK library (`java.lang.classfile`) that supports the latest class file formats natively.',
    tags: ['Class-File API', 'JEP 457', 'Bytecode Transformation', 'Java 22']
  },
  {
    id: 240,
    category: 'modern-java',
    categoryTitle: 'Modern Java Features (17 - 23+)',
    difficulty: 'Advanced',
    question: 'What is the difference between `List.of()` and `Set.of()` regarding duplicate elements at creation time?',
    options: [
      'Both allow duplicate elements silently',
      '`List.of()` allows duplicate elements; `Set.of()` throws an `IllegalArgumentException` at initialization if duplicate elements are passed',
      '`Set.of()` removes duplicate elements without throwing exceptions',
      '`List.of()` throws NullPointerException on duplicates'
    ],
    correctAnswer: 1,
    explanation: '`Set.of("A", "B", "A")` throws `IllegalArgumentException: duplicate element: A` immediately. This intentional design catches programming bugs early rather than silently swallowing duplicates.',
    tags: ['Set.of', 'List.of', 'Duplicate Elements', 'Collection Factories']
  }
];
