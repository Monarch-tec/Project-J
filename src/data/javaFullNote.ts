export interface FullNoteSection {
  sectionNumber: number;
  title: string;
  category: string;
  content: string;
  codeSnippet?: string;
  codeExplanation?: string;
  diagram?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  output?: string;
  examNote?: string;
}

export const JAVA_FULL_NOTE_METADATA = {
  id: 'java-full-note',
  title: 'JAVA PROGRAMMING — FULL NOTE [Sections 1–111]',
  courseCode: 'COS 201.2 / Java Master Curriculum',
  subtitle: 'Complete Theoretical Foundations, Syntax, OOP Pillars, Collections, Concurrency & Exam Takeaways',
  author: 'Sun Microsystems / James Gosling Standards • Java Study Curriculum',
  description: 'A comprehensive, 111-section master reference document spanning foundational syntax, memory models, object-oriented design, error handling, standard library collections, and exam preparation distinctions.',
  totalSections: 111
};

export const FULL_NOTE_CATEGORIES = [
  'All Sections (1–111)',
  'Part 1: Introduction & Features (1–5)',
  'Part 2: Syntax, Identifiers & Data Types (6–19)',
  'Part 3: Operators & User Input (20–28)',
  'Part 4: Control Flow & Loops (29–39)',
  'Part 5: Arrays & Methods (40–49)',
  'Part 6: Object-Oriented Programming (50–70)',
  'Part 7: Packages & Exception Handling (71–78)',
  'Part 8: Collections & Generics (79–86)',
  'Part 9: Files, Lambdas, Streams & Threads (87–96)',
  'Part 10: Memory, Comparisons & Exam Takeaways (97–111)'
];

export const JAVA_FULL_NOTE_SECTIONS: FullNoteSection[] = [
  // PART 1: INTRODUCTION & ENVIRONMENT (1-5)
  {
    sectionNumber: 1,
    title: '1. Introduction to Java',
    category: 'Part 1: Introduction & Features (1–5)',
    content: `What is Java?
Java is a high-level, object-oriented, general-purpose programming language developed by James Gosling and his team at Sun Microsystems.
Java was originally released in 1995.

Java is designed around the core philosophy:
"Write Once, Run Anywhere" (WORA)
This means Java programs can run on different operating systems as long as the appropriate Java Virtual Machine (JVM) is available.

Examples of Java applications:
Java is widely utilized across the software engineering landscape to develop:
• Desktop applications (Swing, JavaFX)
• Web applications (Spring Boot, Jakarta EE)
• Enterprise software (ERP, financial settlement backbones)
• Android applications (Android SDK, Android Runtime)
• Banking systems (high-throughput, resilient transactional engines)
• Games (e.g., Minecraft original core)
• Scientific applications (data processing and simulations)
• Cloud applications (microservices, containerized services)
• Server-side applications (REST APIs, GraphQL backends)
• Distributed systems (Apache Kafka, Apache Cassandra, Hadoop)`
  },
  {
    sectionNumber: 2,
    title: '2. Features of Java',
    category: 'Part 1: Introduction & Features (1–5)',
    content: `Important features of Java include:
1. Simple: Java has relatively clean and readable syntax compared with languages such as C++, eliminating confusing concepts like pointer arithmetic and operator overloading.
2. Object-Oriented: Everything in Java revolves around Classes and Objects, adhering to the 4 pillars: Inheritance, Encapsulation, Polymorphism, and Abstraction.
3. Platform Independent: Java source code compiles into intermediate bytecode (.class files), which execute seamlessly on any system equipped with a compatible JVM.
4. Secure: Java provides security through no direct memory pointer manipulation, classloader verification, a security manager, and runtime bytecode verification.
5. Robust: Strong type checking, explicit exception handling, and automatic memory deallocation via Garbage Collection minimize runtime crashes.
6. Multithreaded: Built-in language support for concurrent execution using the Thread class, Runnable, and java.util.concurrent utilities.
7. Portable: Identical byte-order and type sizes across all OS architectures ensure complete bytecode portability.
8. High Performance: Just-In-Time (JIT) compilers translate frequently executed bytecode into native machine code at runtime.
9. Distributed: Extensive built-in networking APIs (java.net, RMI, HTTP client) enable distributed application architecture.
10. Automatic Garbage Collection: The JVM automatically detects and reclaims heap memory from unreachable objects.`
  },
  {
    sectionNumber: 3,
    title: '3. Java Development Environment',
    category: 'Part 1: Introduction & Features (1–5)',
    content: `Three fundamental components make up the Java ecosystem:
• JDK (Java Development Kit): The complete development package used to write, compile, and debug Java code. Contains the compiler (javac), documentation tools (javadoc), archiver (jar), and the JRE.
• JRE (Java Runtime Environment): Provides the minimum environment needed to execute compiled Java programs. Contains class libraries and the JVM.
• JVM (Java Virtual Machine): The engine that loads, verifies, and executes Java bytecode on host hardware.`,
    diagram: `JDK (Java Development Kit)
│
├── Development Tools (javac, jar, javadoc, debugger)
│
└── JRE (Java Runtime Environment)
    │
    ├── Java Class Libraries & Core Packages (rt.jar / java.base)
    │
    └── JVM (Java Virtual Machine - Classloader, JIT, GC)`
  },
  {
    sectionNumber: 4,
    title: '4. How a Java Program Works',
    category: 'Part 1: Introduction & Features (1–5)',
    content: `When you author Java code:
1. You write source code in a file ending with .java (e.g., Hello.java).
2. The Java compiler (javac Hello.java) compiles human-readable code into intermediate bytecode (Hello.class).
3. The Java Virtual Machine (JVM) interprets and compiles bytecode using the JIT engine to produce native machine instructions executed by the host operating system.`,
    diagram: `Java Source Code (Hello.java)
       ↓
    Compiler (javac Hello.java)
       ↓
    Bytecode (Hello.class)
       ↓
    Classloader & Bytecode Verifier
       ↓
    Java Virtual Machine (JVM / JIT Compiler)
       ↓
    Operating System & Native Machine Execution
       ↓
    Program Output ("Hello World")`
  },
  {
    sectionNumber: 5,
    title: '5. First Java Program',
    category: 'Part 1: Introduction & Features (1–5)',
    content: `A standard entry-point Java program structure:`,
    codeSnippet: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    codeExplanation: `Explanation of components:
• public class Hello: Defines an accessible class named Hello. The filename MUST match the public class name (Hello.java).
• public static void main(String[] args): The standard runtime entry point method invoked by the JVM.
  - public: Accessible from outside the package by the JVM.
  - static: Can be executed without creating an instance of the class first.
  - void: Does not return any value back to the caller.
  - main: The exact method identifier looked up by the JVM launcher.
  - String[] args: Command-line arguments passed to the program as an array of strings.
• System.out.println(): Standard output stream method that prints the string to the console followed by a newline.`,
    output: `Hello World`
  },

  // PART 2: SYNTAX, IDENTIFIERS & DATA TYPES (6-19)
  {
    sectionNumber: 6,
    title: '6. Java Syntax',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Key syntax characteristics:
• Case Sensitivity: Java distinguishes uppercase and lowercase identifiers. int age; is completely different from int Age;.
• Statements: Every standalone executable statement in Java MUST terminate with a semicolon (;).
• Comments: Used to document code and prevent execution during debugging.`,
    codeSnippet: `// Single-line comment: ignored by compiler

/*
   Multi-line comment:
   Spans across several lines
*/

/**
 * Javadoc documentation comment
 * Used to generate API HTML docs
 */
int age = 20;
System.out.println(age);`
  },
  {
    sectionNumber: 7,
    title: '7. Java Identifiers',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `An identifier is a user-defined name given to a variable, method, class, interface, package, or constant.

Rules for Valid Identifiers:
1. Can contain letters (A-Z, a-z), digits (0-9), underscores (_), and dollar signs ($).
2. CANNOT begin with a digit (e.g., 1student is invalid; student1 is valid).
3. CANNOT be a Java reserved keyword (e.g., class, int, void are illegal).
4. Is strictly case-sensitive.
5. Has no maximum length limit, but should be meaningful and concise.`,
    codeSnippet: `// Valid Identifiers:
int age = 25;
String studentName = "Alice";
double total_price = 99.50;
int $count = 10;

// Invalid Identifiers:
// int 1student;  // ERROR: Cannot start with digit
// class class;    // ERROR: Cannot use reserved keyword
// double tax-rate; // ERROR: Hyphen is an arithmetic operator`
  },
  {
    sectionNumber: 8,
    title: '8. Java Keywords',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Keywords are reserved words that hold predefined, special semantic meanings in Java. They cannot be used as identifiers (variable names, class names, method names).

Important Java Keywords include:
• Control flow: if, else, switch, case, default, for, while, do, break, continue, return
• Modifiers & Declarations: class, interface, abstract, extends, implements, package, import
• Access Modifiers: public, private, protected
• Types: byte, short, int, long, float, double, char, boolean, void
• Object references: new, this, super, instanceof
• Exception Handling: try, catch, finally, throw, throws
• Concurrency & State: static, final, synchronized, volatile, transient, native, strictfp, assert, enum`,
    examNote: `Remember: 'const' and 'goto' are reserved keywords in Java, but they are unused. 'true', 'false', and 'null' are literals, not keywords, but they also cannot be used as identifiers.`
  },
  {
    sectionNumber: 9,
    title: '9. Variables',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `A variable is a named storage location in computer memory that holds data during program execution.

Stages of a variable:
1. Declaration: Specifies the data type and identifier name.
2. Assignment: Places a concrete value into the allocated variable.
3. Initialization: The first time a value is assigned to a variable.`,
    codeSnippet: `// 1. Declaration only
int age;

// 2. Assignment
age = 20;

// 3. Declaration and Initialization combined
int score = 95;
double gpa = 3.85;
String university = "University of Lagos";`
  },
  {
    sectionNumber: 10,
    title: '10. Constants',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `A constant is a variable whose value cannot be reassigned or modified once it has been initialized.
In Java, constants are declared using the 'final' modifier. By convention, constant names are written in UPPERCASE_WITH_UNDERSCORES.`,
    codeSnippet: `final double PI = 3.141592653589793;
final int MAX_ATTEMPTS = 3;

// The following line will produce a compilation error:
// PI = 3.14; // ERROR: cannot assign a value to final variable PI`
  },
  {
    sectionNumber: 11,
    title: '11. Data Types in Java',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Java is a statically typed language. Every variable must have a declared type before it is used.
Data types are divided into two primary categories:`,
    diagram: `Java Data Types
│
├── 1. Primitive Types (Built into the language; store actual raw binary values)
│   ├── Integer Types: byte, short, int, long
│   ├── Floating-Point Types: float, double
│   ├── Character Type: char
│   └── Logical Type: boolean
│
└── 2. Non-Primitive / Reference Types (Store memory references pointing to objects on the heap)
    ├── Classes (e.g., String, Scanner, Custom classes)
    ├── Interfaces (e.g., List, Map, Runnable)
    └── Arrays (e.g., int[], String[][])`
  },
  {
    sectionNumber: 12,
    title: '12. Primitive Data Types',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Java features exactly 8 primitive data types with standardized memory sizes regardless of the underlying operating system:`,
    table: {
      headers: ['Type', 'Size in Memory', 'Range / Value Format', 'Default Value', 'Example'],
      rows: [
        ['byte', '8 bits (1 byte)', '-128 to 127', '0', 'byte b = 10;'],
        ['short', '16 bits (2 bytes)', '-32,768 to 32,767', '0', 'short s = 1000;'],
        ['int', '32 bits (4 bytes)', '-2,147,483,648 to 2,147,483,647 (~2.14B)', '0', 'int count = 50000;'],
        ['long', '64 bits (8 bytes)', '-9,223,372,036,854,775,808 to 9.22 × 10¹⁸', '0L', 'long pop = 8000000000L;'],
        ['float', '32 bits (4 bytes)', 'Single-precision IEEE 754 (~6-7 decimal digits)', '0.0f', 'float f = 3.14f;'],
        ['double', '64 bits (8 bytes)', 'Double-precision IEEE 754 (~15-17 decimal digits)', '0.0d', 'double d = 3.14159;'],
        ['char', '16 bits (2 bytes)', '0 to 65,535 (Unicode character set)', "'\\u0000'", "char c = 'A';"],
        ['boolean', 'JVM-dependent (1 bit logic)', 'true or false', 'false', 'boolean active = true;']
      ]
    }
  },
  {
    sectionNumber: 13,
    title: '13. Integer Types',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `There are 4 integer types in Java:
• byte: 8-bit integer. Useful for conserving memory in large raw byte streams and low-level protocols.
• short: 16-bit integer. Rarely used today, but conserves memory in large numeric arrays.
• int: 32-bit integer. The default, most widely used data type for whole numbers.
• long: 64-bit integer. Used when numbers exceed the 2-billion range of int.
IMPORTANT: Literals intended for long variables MUST append an 'L' or 'l' suffix (e.g. 5000000000L); otherwise, the compiler treats the literal as a 32-bit int and throws an "integer number too large" error.`,
    codeSnippet: `byte age = 20;
short year = 2026;
int population = 1500000;
long globalDebt = 8000000000L; // Suffix 'L' is required!`
  },
  {
    sectionNumber: 14,
    title: '14. Floating-Point Types',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Floating-point numbers represent values with fractional components:
• float: 32-bit single-precision. Requires an 'f' or 'F' suffix (e.g., float price = 25.5f;).
• double: 64-bit double-precision. The default type for decimal numbers in Java. Provides ~15 decimal digits of precision, making it the industry standard for mathematical computations.`,
    codeSnippet: `float price = 25.5f;     // 'f' suffix tells Java it is a float
double accuratePrice = 25.50; // standard 64-bit double precision`
  },
  {
    sectionNumber: 15,
    title: '15. Character',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `The 'char' type stores a single 16-bit Unicode character.
Crucial Rule: Characters use SINGLE QUOTATION MARKS ('A'), whereas Strings use DOUBLE QUOTATION MARKS ("A").`,
    codeSnippet: `char grade = 'A';
char symbol = '$';
char unicodeChar = '\\u0041'; // 'A' in Unicode hex

// Valid:
char letter = 'A';

// Compilation ERROR:
// char letter = "A"; // ERROR: incompatible types: String cannot be converted to char`
  },
  {
    sectionNumber: 16,
    title: '16. Boolean',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `A boolean variable can store only one of two possible states:
• true
• false
In Java, booleans CANNOT be treated as integers (unlike C/C++, 1 and 0 are not interchangeable with true and false).`,
    codeSnippet: `boolean isStudent = true;
boolean hasGraduated = false;

if (isStudent) {
    System.out.println("Enrolled student");
}`
  },
  {
    sectionNumber: 17,
    title: '17. Strings',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `A String in Java is NOT a primitive data type—it is an immutable object representing a sequence of characters stored on the heap. Strings are enclosed in double quotes.

Core String Methods:
• length(): Returns the total number of characters.
• toUpperCase() / toLowerCase(): Converts string casing.
• charAt(index): Returns the character at the specified 0-based index.
• substring(beginIndex, endIndex): Extracts a portion of the string.
• equals(otherString): Compares text content (NEVER use == for content comparison).
• contains(sequence): Checks whether a substring exists.`,
    codeSnippet: `String name = "Java Programming";

System.out.println(name.length());            // 16
System.out.println(name.toUpperCase());       // "JAVA PROGRAMMING"
System.out.println(name.toLowerCase());       // "java programming"
System.out.println(name.charAt(0));           // 'J'
System.out.println(name.substring(0, 4));     // "Java"
System.out.println(name.contains("Prog"));    // true

String a = "Java";
String b = new String("Java");
System.out.println(a.equals(b));              // true (checks text value)
System.out.println(a == b);                   // false (compares memory address)`
  },
  {
    sectionNumber: 18,
    title: '18. String Concatenation',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Strings can be joined together using the '+' operator. When a String is combined with other data types (integers, doubles, booleans), Java converts the non-string operand to a string automatically.`,
    codeSnippet: `String firstName = "John";
String lastName = "Smith";

String fullName = firstName + " " + lastName;
System.out.println(fullName); // Output: John Smith

int age = 21;
System.out.println("Name: " + fullName + ", Age: " + age); // Output: Name: John Smith, Age: 21`,
    output: `John Smith
Name: John Smith, Age: 21`
  },
  {
    sectionNumber: 19,
    title: '19. Type Casting',
    category: 'Part 2: Syntax, Identifiers & Data Types (6–19)',
    content: `Type casting is the process of converting a variable from one data type into another.

Two Forms of Type Casting:
1. Widening Conversion (Implicit / Automatic Casting):
   - Occurs when converting a smaller type to a larger type.
   - Performed automatically by Java because no data loss can occur.
   - Direction: byte → short → int → long → float → double

2. Narrowing Conversion (Explicit Casting):
   - Occurs when converting a larger type to a smaller type.
   - Requires explicit programmer casting syntax using parentheses: (targetType) value.
   - Can cause data loss (e.g. decimal truncation or overflow).`,
    codeSnippet: `// Widening Conversion (Automatic)
int num = 10;
double val = num; // Automatically converted to 10.0

// Narrowing Conversion (Explicit)
double price = 10.75;
int truncatedPrice = (int) price; // Truncates decimal portion: result is 10
System.out.println(truncatedPrice); // 10`
  },

  // PART 3: OPERATORS & USER INPUT (20-28)
  {
    sectionNumber: 20,
    title: '20. Operators',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Operators are special symbols that instruct the Java compiler to perform specific mathematical, relational, or logical manipulations on operands.

Major Operator Categories:
1. Arithmetic Operators (+, -, *, /, %)
2. Assignment Operators (=, +=, -=, *=, /=, %=)
3. Relational / Comparison Operators (==, !=, >, <, >=, <=)
4. Logical Operators (&&, ||, !)
5. Increment & Decrement Operators (++, --)
6. Bitwise & Bit-shift Operators (&, |, ^, ~, <<, >>, >>>)
7. Conditional / Ternary Operator (? :)`
  },
  {
    sectionNumber: 21,
    title: '21. Arithmetic Operators',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Arithmetic operators perform mathematical calculations:
• + (Addition)
• - (Subtraction)
• * (Multiplication)
• / (Division - integer division truncates fractional remainder)
• % (Modulus - returns the remainder of division)`,
    codeSnippet: `int a = 10;
int b = 3;

System.out.println("Sum: " + (a + b));        // 13
System.out.println("Diff: " + (a - b));       // 7
System.out.println("Prod: " + (a * b));       // 30
System.out.println("Quotient: " + (a / b));   // 3 (integer division)
System.out.println("Modulus: " + (a % b));    // 1`,
    output: `Sum: 13\nDiff: 7\nProd: 30\nQuotient: 3\nModulus: 1`
  },
  {
    sectionNumber: 22,
    title: '22. Assignment Operators',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Assignment operators assign values to variables. Compound operators combine arithmetic with assignment for cleaner code:
• =   : Simple assignment
• +=  : Add and assign (x += 5 is x = x + 5)
• -=  : Subtract and assign (x -= 3 is x = x - 3)
• *=  : Multiply and assign
• /=  : Divide and assign
• %=  : Modulus and assign`,
    codeSnippet: `int x = 10;
x += 5;  // x becomes 15
x *= 2;  // x becomes 30
x -= 10; // x becomes 20
x /= 4;  // x becomes 5
x %= 3;  // x becomes 2`
  },
  {
    sectionNumber: 23,
    title: '23. Relational Operators',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Relational operators evaluate relationships between values and always return a boolean (true or false):
• ==  : Equal to
• !=  : Not equal to
• >   : Greater than
• <   : Less than
• >=  : Greater than or equal to
• <=  : Less than or equal to`,
    codeSnippet: `int age = 20;

System.out.println(age >= 18); // true
System.out.println(age == 20); // true
System.out.println(age != 20); // false
System.out.println(age < 15);  // false`
  },
  {
    sectionNumber: 24,
    title: '24. Logical Operators',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Logical operators evaluate multiple boolean expressions:
• && (Logical AND): Evaluates to true if and only if BOTH conditions are true. Short-circuits (if the first is false, the second is not evaluated).
• || (Logical OR): Evaluates to true if EITHER condition is true. Short-circuits (if the first is true, the second is not evaluated).
• !  (Logical NOT): Inverts the boolean truth value.`,
    codeSnippet: `int age = 20;
boolean isStudent = true;

if (age >= 18 && isStudent) {
    System.out.println("Eligible for student discount"); // Prints
}

if (age < 18 || isStudent) {
    System.out.println("Eligible");
}

System.out.println(!isStudent); // false`
  },
  {
    sectionNumber: 25,
    title: '25. Increment and Decrement Operators',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Increment (++) increases a variable by 1. Decrement (--) decreases a variable by 1.

Prefix vs. Postfix Distinction:
• Postfix (x++): Uses the current value of x in the surrounding expression first, then increments x afterwards.
• Prefix (++x): Increments x immediately first, then evaluates the updated value in the expression.`,
    codeSnippet: `int a = 5;
int b = a++; // b gets 5, then a becomes 6
System.out.println("a=" + a + ", b=" + b); // a=6, b=5

int x = 5;
int y = ++x; // x becomes 6 immediately, then y gets 6
System.out.println("x=" + x + ", y=" + y); // x=6, y=6`
  },
  {
    sectionNumber: 26,
    title: '26. Conditional / Ternary Operator',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `The ternary operator is a shorthand inline syntax for an if-else decision:
Syntax:
condition ? expressionIfTrue : expressionIfFalse;`,
    codeSnippet: `int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";

System.out.println(status); // Output: Adult

int a = 15, b = 25;
int max = (a > b) ? a : b; // max gets 25`
  },
  {
    sectionNumber: 27,
    title: '27. Input in Java (Scanner)',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `To read interactive keyboard input from the console, Java provides the java.util.Scanner class. It is instantiated by passing the standard input stream System.in to its constructor.`,
    codeSnippet: `import java.util.Scanner;

public class UserInputDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = input.nextLine();

        System.out.print("Enter your age: ");
        int age = input.nextInt();

        System.out.println("Hello " + name + ", you are " + age + " years old.");

        input.close(); // Clean up resource
    }
}`
  },
  {
    sectionNumber: 28,
    title: '28. Scanner Methods',
    category: 'Part 3: Operators & User Input (20–28)',
    content: `Commonly used methods of the Scanner class:
• nextLine(): Reads an entire line of text as a String, including spaces, up to the newline character.
• next(): Reads the next single whitespace-delimited token/word as a String.
• nextInt(): Reads the next integer value.
• nextDouble(): Reads the next double-precision floating-point value.
• nextFloat(): Reads the next float value.
• nextBoolean(): Reads true or false.

PRO-TIP: When calling nextLine() immediately after nextInt() or nextDouble(), always call a dummy input.nextLine() first to consume the leftover newline character in the input buffer!`,
    codeSnippet: `Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
sc.nextLine(); // Consume leftover newline character
String fullAddress = sc.nextLine();`
  },

  // PART 4: CONTROL FLOW & LOOPS (29-39)
  {
    sectionNumber: 29,
    title: '29. Decision Making',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `Decision statements control the flow of execution based on boolean conditions.
The primary conditional branching constructs in Java are:
1. if statement
2. if-else statement
3. else-if ladder
4. switch statement`
  },
  {
    sectionNumber: 30,
    title: '30. if Statement',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `Executes a block of code only if the specified boolean condition evaluates to true.`,
    codeSnippet: `int age = 20;

if (age >= 18) {
    System.out.println("Adult");
}`
  },
  {
    sectionNumber: 31,
    title: '31. if-else Statement',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `Provides an alternative block of code to execute if the condition evaluates to false.`,
    codeSnippet: `int age = 16;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`
  },
  {
    sectionNumber: 32,
    title: '32. else-if Ladder',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `Tests multiple sequential conditions. As soon as one condition evaluates to true, its block executes and the rest of the ladder is skipped.`,
    codeSnippet: `int score = 75;

if (score >= 70) {
    System.out.println("Grade: A (Distinction)");
} else if (score >= 60) {
    System.out.println("Grade: B (Credit)");
} else if (score >= 50) {
    System.out.println("Grade: C (Pass)");
} else {
    System.out.println("Grade: F (Fail)");
}`
  },
  {
    sectionNumber: 33,
    title: '33. switch Statement',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `The switch statement selects one of many code blocks to execute based on the equality value of an expression.
Permitted types in switch expressions: byte, short, char, int, String, and enum.
• break: Crucial to terminate the switch block and prevent fallthrough to subsequent cases.
• default: Executes if none of the explicit case values match.`,
    codeSnippet: `int day = 2;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Invalid day index");
}`
  },
  {
    sectionNumber: 34,
    title: '34. Loops',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `Loops repeat a block of instructions as long as a specified boolean condition remains true.
The three primary loop structures in Java are:
1. for loop: Best when the number of iterations is known beforehand.
2. while loop: Best when looping until an external condition changes.
3. do-while loop: Guaranteed to execute at least once before checking the condition.`
  },
  {
    sectionNumber: 35,
    title: '35. for Loop',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `Structure of a for loop:
for (initialization; condition; update) {
    // statements
}`,
    codeSnippet: `for (int i = 1; i <= 5; i++) {
    System.out.println("Iteration: " + i);
}`,
    output: `Iteration: 1\nIteration: 2\nIteration: 3\nIteration: 4\nIteration: 5`
  },
  {
    sectionNumber: 36,
    title: '36. while Loop',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `A pre-tested loop: the condition is verified before entering the loop body. If the condition is initially false, the loop body never runs.`,
    codeSnippet: `int i = 1;

while (i <= 5) {
    System.out.println(i);
    i++;
}`
  },
  {
    sectionNumber: 37,
    title: '37. do-while Loop',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `A post-tested loop: the condition is verified at the bottom of the loop. Consequently, the body of a do-while loop is GUARANTEED to execute at least once, even if the condition is false initially. Note the terminating semicolon after while(condition);!`,
    codeSnippet: `int i = 1;

do {
    System.out.println(i);
    i++;
} while (i <= 5);`
  },
  {
    sectionNumber: 38,
    title: '38. break Statement',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `The break statement immediately terminates the execution of the innermost enclosing loop or switch statement, transferring control to the statement following the loop.`,
    codeSnippet: `for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break; // Stops loop completely when i reaches 5
    }
    System.out.println(i);
}
// Outputs: 1, 2, 3, 4`
  },
  {
    sectionNumber: 39,
    title: '39. continue Statement',
    category: 'Part 4: Control Flow & Loops (29–39)',
    content: `The continue statement skips the remainder of the current iteration and jumps directly to the next iteration (updating the loop counter).`,
    codeSnippet: `for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue; // Skips printing 3
    }
    System.out.println(i);
}
// Outputs: 1, 2, 4, 5`
  },

  // PART 5: ARRAYS & METHODS (40-49)
  {
    sectionNumber: 40,
    title: '40. Arrays',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `An array is a fixed-size, contiguous collection of elements of the same data type.
Array indexing in Java is 0-based:
• The first element is at index 0.
• The last element is at index (length - 1).
Once an array is created, its capacity/size CANNOT be dynamically modified.`,
    codeSnippet: `// Array declaration and initialization
int[] numbers = {10, 20, 30, 40, 50};

// Indices:
// numbers[0] = 10
// numbers[1] = 20
// numbers[2] = 30
// numbers[3] = 40
// numbers[4] = 50`
  },
  {
    sectionNumber: 41,
    title: '41. Accessing Array Elements',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `Array elements are accessed and mutated using square brackets [index]. Attempting to access an index < 0 or >= length throws ArrayIndexOutOfBoundsException at runtime.`,
    codeSnippet: `int[] numbers = {10, 20, 30};

System.out.println(numbers[0]); // 10
numbers[1] = 99; // Mutate value
System.out.println(numbers[1]); // 99`
  },
  {
    sectionNumber: 42,
    title: '42. Array Length',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `In Java, the length of an array is accessed via its public immutable property '.length' (NOT a method, so no parentheses).
Notice the distinction:
• Array: array.length
• String: string.length()
• Collection (List/Set): collection.size()`,
    codeSnippet: `int[] numbers = {10, 20, 30};
System.out.println("Array capacity: " + numbers.length); // 3`
  },
  {
    sectionNumber: 43,
    title: '43. Looping Through an Array',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `Standard for loop indexing through array elements:`,
    codeSnippet: `int[] numbers = {10, 20, 30, 40};

for (int i = 0; i < numbers.length; i++) {
    System.out.println("Element at index " + i + " is " + numbers[i]);
}`
  },
  {
    sectionNumber: 44,
    title: '44. Enhanced for Loop (for-each)',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `Introduced in Java 5, the enhanced for loop provides clean, concise traversal through arrays and collections without needing manual index management.`,
    codeSnippet: `int[] numbers = {10, 20, 30};

for (int number : numbers) {
    System.out.println(number);
}`
  },
  {
    sectionNumber: 45,
    title: '45. Two-Dimensional Arrays',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `In Java, multidimensional arrays are implemented as "arrays of arrays". A 2D array represents a tabular matrix of rows and columns.`,
    codeSnippet: `int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};

// Access row 0, column 1
System.out.println(matrix[0][1]); // 2

// Nested traversal:
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();
}`
  },
  {
    sectionNumber: 46,
    title: '46. Methods',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `A method is a reusable block of code designed to perform a specific operation.
Benefits of methods:
• Code reusability (DRY - Don't Repeat Yourself)
• Modular code architecture and maintenance
• Encapsulation of complex algorithms`,
    codeSnippet: `public class MethodDemo {
    // Method definition
    static void greet() {
        System.out.println("Hello, welcome to Java!");
    }

    public static void main(String[] args) {
        greet(); // Method invocation
    }
}`
  },
  {
    sectionNumber: 47,
    title: '47. Method Parameters',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `Information can be passed to methods as parameters. In Java, all arguments are passed BY VALUE (for primitives, the raw value is copied; for objects, the reference memory address is copied).`,
    codeSnippet: `static void greet(String name) {
    System.out.println("Hello " + name);
}

public static void main(String[] args) {
    greet("John");
    greet("Reuben");
}`
  },
  {
    sectionNumber: 48,
    title: '48. Return Values',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `If a method computes a result, it specifies a return type instead of 'void' and uses the 'return' statement to pass the value back to the caller.`,
    codeSnippet: `static int add(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    int result = add(10, 20);
    System.out.println("Result: " + result); // 30
}`
  },
  {
    sectionNumber: 49,
    title: '49. Method Overloading',
    category: 'Part 5: Arrays & Methods (40–49)',
    content: `Method overloading occurs when multiple methods within the same class share the SAME name but have DIFFERENT parameter lists (differing in number of parameters, data types, or sequence).
This is an example of COMPILE-TIME (Static) POLYMORPHISM.
NOTE: Changing only the return type does NOT qualify as valid overloading and will cause a compilation error!`,
    codeSnippet: `static int add(int a, int b) {
    return a + b;
}

static int add(int a, int b, int c) {
    return a + b + c;
}

static double add(double a, double b) {
    return a + b;
}`
  },

  // PART 6: OBJECT-ORIENTED PROGRAMMING (50-70)
  {
    sectionNumber: 50,
    title: '50. Object-Oriented Programming (OOP)',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Java is fundamentally an Object-Oriented Programming language. Real-world systems are modeled as interacting entities called objects.
The core concepts of OOP are:
• Class: The blueprint or template.
• Object: Concrete instance of a class.
• The 4 Core Pillars:
  1. Encapsulation (data hiding & protection)
  2. Inheritance (code reuse & taxonomy)
  3. Polymorphism (one interface, many forms)
  4. Abstraction (hiding implementation details)`
  },
  {
    sectionNumber: 51,
    title: '51. Class',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `A class is a blueprint or prototype that defines the variables (state/attributes) and methods (behavior) common to all objects of that type.`,
    codeSnippet: `class Student {
    String name;
    int age;
}`
  },
  {
    sectionNumber: 52,
    title: '52. Object',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `An object is a tangible runtime instance of a class allocated on the heap memory using the 'new' operator:
Student student1 = new Student();
Breakdown:
• Student: Class data type.
• student1: Reference variable pointing to the object on the heap.
• new: Allocates memory for the object on the heap.
• Student(): Constructor call initializing the object.`,
    diagram: `Stack Memory                       Heap Memory
┌────────────────┐               ┌───────────────────────────────┐
│ student1 (ref) │ ────────────> │ Student Instance Object       │
└────────────────┘               │   name = "John"               │
                                 │   age  = 20                   │
                                 └───────────────────────────────┘`
  },
  {
    sectionNumber: 53,
    title: '53. Accessing Object Properties',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Fields and methods of an object are accessed using the dot operator (.).`,
    codeSnippet: `Student s1 = new Student();
s1.name = "John";
s1.age = 20;

System.out.println(s1.name); // John
System.out.println(s1.age);  // 20`
  },
  {
    sectionNumber: 54,
    title: '54. Constructors',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `A constructor is a special member method that executes automatically when an object is instantiated using 'new'.
Constructor Rules:
1. Must have the exact same name as the enclosing class.
2. Must NOT have any return type (not even void).
3. Used primarily to initialize instance fields.`,
    codeSnippet: `class Student {
    String name;
    int age;

    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Instantiation:
Student s1 = new Student("John", 20);`
  },
  {
    sectionNumber: 55,
    title: '55. Default Constructor',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `A constructor with no parameters is called a no-argument constructor.
If you do not write ANY constructor in a class, the Java compiler automatically generates an invisible default no-arg constructor. However, if you define ANY custom constructor (e.g. with parameters), Java will NOT create the default constructor automatically.`,
    codeSnippet: `class Student {
    Student() {
        System.out.println("Student instance created");
    }
}`
  },
  {
    sectionNumber: 56,
    title: '56. this Keyword',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `In Java, 'this' is a reference variable that refers to the CURRENT object instance whose method or constructor is being invoked.
Common uses:
1. Disambiguating instance variables from shadowing parameter names (this.name = name;).
2. Invoking another constructor in the same class (this(arg1, arg2);).
3. Passing the current instance as an argument to another method.`,
    codeSnippet: `class Student {
    String name;

    Student(String name) {
        this.name = name; // 'this.name' refers to field; 'name' refers to parameter
    }
}`
  },
  {
    sectionNumber: 57,
    title: '57. Encapsulation',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Encapsulation is the OOP pillar of bundling data (fields) and methods that operate on that data together inside a single unit, while restricting direct outside access to internal state.
How to achieve encapsulation in Java:
1. Declare class fields as 'private'.
2. Provide public getter and setter methods to inspect and modify fields with validation.`,
    codeSnippet: `class Student {
    private String name;

    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }

    public String getName() {
        return this.name;
    }
}`
  },
  {
    sectionNumber: 58,
    title: '58. Getters and Setters',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Getters return the value of a private field; Setters update or set the value of a private field with optional validation rules.`,
    codeSnippet: `Student s = new Student();
s.setName("John");
System.out.println(s.getName()); // Output: John`
  },
  {
    sectionNumber: 59,
    title: '59. Access Modifiers',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Java provides 4 levels of access control:`,
    table: {
      headers: ['Modifier', 'Same Class', 'Same Package', 'Subclass (diff pkg)', 'World (everywhere)'],
      rows: [
        ['public', 'Yes', 'Yes', 'Yes', 'Yes'],
        ['protected', 'Yes', 'Yes', 'Yes (via inheritance)', 'No'],
        ['default (no modifier)', 'Yes', 'Yes (package-private)', 'No', 'No'],
        ['private', 'Yes', 'No', 'No', 'No']
      ]
    }
  },
  {
    sectionNumber: 60,
    title: '60. Inheritance',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Inheritance is the mechanism by which one class (subclass/child) acquires all non-private fields and methods from another class (superclass/parent).
Benefits: Code reuse, logical taxonomy, and polymorphism.`,
    codeSnippet: `class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}

// Usage:
Dog d = new Dog();
d.eat();  // Inherited from Animal
d.bark(); // Defined in Dog`
  },
  {
    sectionNumber: 61,
    title: '61. The extends Keyword',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `The 'extends' keyword establishes an inheritance relationship between classes.
CRITICAL JAVA RULE: Java supports SINGLE CLASS INHERITANCE ONLY! A class can extend only one superclass (e.g. class Child extends Parent {}). Java prevents diamond-problem ambiguity by banning multiple class inheritance. Multiple inheritance of behavior is achieved via Interfaces!`,
    codeSnippet: `class Child extends Parent {
    // Valid single inheritance
}

// class Child extends ParentA, ParentB { } // COMPILE ERROR!`
  },
  {
    sectionNumber: 62,
    title: '62. Method Overriding',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.
Overriding Rules:
1. Method name, parameter list, and return type must be IDENTICAL.
2. The access modifier in the subclass cannot be more restrictive than in the superclass.
3. Use the optional but strongly recommended @Override annotation.`,
    codeSnippet: `class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}`
  },
  {
    sectionNumber: 63,
    title: '63. Polymorphism',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Polymorphism means "many forms"—the ability of a single interface or reference variable to invoke different behaviors depending on the underlying object instance.

Two Forms:
1. Compile-Time (Static) Polymorphism: Achieved via Method Overloading. Resolved by the compiler at compile-time.
2. Runtime (Dynamic) Polymorphism: Achieved via Method Overriding and Dynamic Method Dispatch. Resolved by the JVM at runtime based on the actual object on the heap.`,
    codeSnippet: `Animal a = new Dog(); // Superclass reference pointing to Subclass object
a.sound(); // Output: "Bark" (Dynamic dispatch calls Dog's overridden sound method!)`
  },
  {
    sectionNumber: 64,
    title: '64. Abstraction',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `Abstraction means hiding unnecessary internal implementation mechanics and exposing only essential functional interfaces to the outside world.
In Java, abstraction is achieved using:
1. Abstract Classes (partial abstraction, 0% to 100%)
2. Interfaces (complete abstraction of contract, with optional default/static methods)`
  },
  {
    sectionNumber: 65,
    title: '65. Abstract Class',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `An abstract class is declared with the 'abstract' keyword:
• Can contain both abstract methods (without body) and concrete methods (with body).
• CANNOT be instantiated directly using 'new' (e.g. Animal a = new Animal(); is illegal).
• Subclasses must implement all inherited abstract methods or be declared abstract themselves.`,
    codeSnippet: `abstract class Animal {
    abstract void sound(); // Abstract method (no body)

    void eat() { // Concrete method
        System.out.println("Eating food");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}`
  },
  {
    sectionNumber: 66,
    title: '66. Interface',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `An interface in Java is a blueprint of behavior that specifies WHAT a class must do, but not HOW it does it.
• By default, methods in an interface are public abstract (Java 8 added default and static methods).
• Variables in an interface are automatically public static final (constants).`,
    codeSnippet: `interface Animal {
    void sound(); // public abstract by default
}

class Dog implements Animal {
    @Override
    public void sound() {
        System.out.println("Bark");
    }
}`
  },
  {
    sectionNumber: 67,
    title: '67. The implements Keyword',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `The 'implements' keyword is used when a class signs an interface contract.
CRITICAL DISTINCTION: While Java classes cannot extend multiple classes, a class CAN implement MULTIPLE INTERFACES! This is how Java supports multiple behavioral inheritance.`,
    codeSnippet: `interface Animal { void eat(); }
interface Pet { void play(); }

class Dog implements Animal, Pet {
    @Override
    public void eat() { System.out.println("Dog eating"); }

    @Override
    public void play() { System.out.println("Dog playing"); }
}`
  },
  {
    sectionNumber: 68,
    title: '68. The super Keyword',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `In Java, 'super' is a reference variable used to refer directly to the immediate parent (superclass) object:
1. super(): Calls the parent class constructor (must be the first line in the child constructor).
2. super.method(): Invokes an overridden method in the superclass.
3. super.field: Accesses a shadowed field in the superclass.`,
    codeSnippet: `class Animal {
    Animal() { System.out.println("Animal constructor"); }
    void sound() { System.out.println("Generic sound"); }
}

class Dog extends Animal {
    Dog() {
        super(); // Invokes Animal() constructor
        System.out.println("Dog constructor");
    }

    @Override
    void sound() {
        super.sound(); // Calls Animal's sound()
        System.out.println("Bark");
    }
}`
  },
  {
    sectionNumber: 69,
    title: '69. The static Keyword',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `The 'static' keyword indicates that a member (variable or method) belongs to the CLASS ITSELF, rather than to any individual instance/object.
• Static variables: Stored in Metaspace/Class area; only one shared copy exists for all instances.
• Static methods: Can be called without creating an instance (ClassName.method()). Static methods cannot access 'this' or non-static instance fields directly!`,
    codeSnippet: `class Student {
    String name;                  // Instance variable (unique per student)
    static String university = "Unilag"; // Shared static class variable
}

// Access without instantiating:
System.out.println(Student.university);`
  },
  {
    sectionNumber: 70,
    title: '70. The final Keyword',
    category: 'Part 6: Object-Oriented Programming (50–70)',
    content: `The 'final' keyword restricts modification depending on context:
1. Final Variable: Value cannot be reassigned (acts as a constant).
2. Final Method: Method CANNOT be overridden by subclasses.
3. Final Class: Class CANNOT be extended or subclassed (e.g. java.lang.String is a final class).`,
    codeSnippet: `final int MAX = 100; // Constant

class Parent {
    final void secureMethod() { } // Cannot be overridden!
}

final class SecureClass { } // Cannot be extended!`
  },

  // PART 7: PACKAGES & EXCEPTION HANDLING (71-78)
  {
    sectionNumber: 71,
    title: '71. Packages',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `A package in Java is a directory namespace that groups related classes, interfaces, and sub-packages.
Benefits:
• Prevents naming collisions (e.g. com.company.util.Date vs java.sql.Date).
• Enables package-private access control.
• Simplifies software distribution and searchability.`,
    codeSnippet: `package com.university.academics;

public class Course {
    // Class implementation
}`
  },
  {
    sectionNumber: 72,
    title: '72. Import Statement',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `The 'import' statement allows classes defined in external packages to be referenced directly by their simple name instead of writing their fully qualified package path.`,
    codeSnippet: `import java.util.Scanner;
import java.util.ArrayList;

// Or import all classes in a package:
import java.util.*;`
  },
  {
    sectionNumber: 73,
    title: '73. Exception Handling',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `An exception is an abnormal event occurring during program execution that disrupts the normal sequential instruction flow.
Examples of runtime exceptions:
• ArithmeticException (e.g., division by zero)
• NullPointerException (attempting to access fields/methods of a null reference)
• ArrayIndexOutOfBoundsException (accessing an illegal array index)
• NumberFormatException (parsing invalid strings into numbers)`
  },
  {
    sectionNumber: 74,
    title: '74. try-catch Block',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `The 'try' block encloses code that may potentially throw an exception. If an exception occurs, normal execution halts and control jumps directly to the matching 'catch' block.`,
    codeSnippet: `try {
    int result = 10 / 0; // Throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
}`
  },
  {
    sectionNumber: 75,
    title: '75. finally Block',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `The 'finally' block is ALWAYS executed after the try/catch process, whether an exception occurred, was caught, or was not caught. It is typically used for critical resource cleanup (closing database connections, file handles, sockets).
NOTE: The finally block executes even if a 'return' statement is encountered inside try or catch!`,
    codeSnippet: `try {
    System.out.println("Executing try block");
} catch (Exception e) {
    System.out.println("Handling error");
} finally {
    System.out.println("Cleanup completed: Always runs!");
}`
  },
  {
    sectionNumber: 76,
    title: '76. The throw Keyword',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `The 'throw' keyword is used to explicitly instantiate and throw an exception from anywhere in your code.`,
    codeSnippet: `void checkAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be at least 18");
    }
}`
  },
  {
    sectionNumber: 77,
    title: '77. The throws Keyword',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `The 'throws' keyword is declared in a method signature to notify callers that this method may propagate checked exceptions, requiring the caller to handle or declare them.`,
    codeSnippet: `import java.io.IOException;

void readFile(String path) throws IOException {
    // Code that may fail with I/O error
}`
  },
  {
    sectionNumber: 78,
    title: '78. Checked vs. Unchecked Exceptions',
    category: 'Part 7: Packages & Exception Handling (71–78)',
    content: `Java divides exceptions into two distinct categories:
1. Checked Exceptions:
   - Subclasses of java.lang.Exception (excluding RuntimeException).
   - Checked at COMPILE TIME. The compiler forces you to either catch them (try-catch) or declare them (throws).
   - Examples: IOException, SQLException, ClassNotFoundException.

2. Unchecked Exceptions:
   - Subclasses of java.lang.RuntimeException and java.lang.Error.
   - Occur at RUNTIME due to programming logic mistakes.
   - Not forced by compiler to be declared.
   - Examples: NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException.`
  },

  // PART 8: COLLECTIONS & GENERICS (79-86)
  {
    sectionNumber: 79,
    title: '79. Collections Framework',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `The Java Collections Framework (java.util) provides standardized, high-performance data structures and algorithms to store and manipulate groups of objects dynamically.
Core Interfaces:
• List: Ordered sequence, allows duplicates, positional index access (ArrayList, LinkedList).
• Set: Unordered collection, NO duplicate elements permitted (HashSet, TreeSet).
• Queue: First-In-First-Out (FIFO) processing (PriorityQueue, ArrayDeque).
• Map: Key-Value pairs; unique keys mapping to values (HashMap, TreeMap).`
  },
  {
    sectionNumber: 80,
    title: '80. ArrayList',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `ArrayList is a resizable, dynamic array implementation of the List interface.
Unlike native Java arrays which have fixed capacity, ArrayList automatically expands its internal array by ~50% (newCapacity = oldCapacity + (oldCapacity >> 1)) when filled.`,
    codeSnippet: `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("John");
names.add("Mary");
names.add("Peter");

System.out.println(names.get(0)); // Output: John`
  },
  {
    sectionNumber: 81,
    title: '81. Common ArrayList Methods',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `Core methods of ArrayList:
• add(element): Appends an element to the end.
• get(index): Retrieves element at 0-based index in O(1) time.
• set(index, element): Replaces element at index.
• remove(index / object): Removes element.
• size(): Returns the number of elements.
• contains(object): Checks existence in O(n) time.
• clear(): Empties the list.`,
    codeSnippet: `names.remove("John");
System.out.println("Size: " + names.size());
System.out.println("Contains Mary: " + names.contains("Mary"));`
  },
  {
    sectionNumber: 82,
    title: '82. HashSet',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `HashSet is a collection that stores UNIQUE elements backed by a hashtable (internally a HashMap). It does not maintain insertion order and allows at most one null element. Attempting to add duplicate values is silently ignored.`,
    codeSnippet: `import java.util.HashSet;

HashSet<Integer> numbers = new HashSet<>();
numbers.add(10);
numbers.add(20);
numbers.add(10); // Duplicate ignored!

System.out.println(numbers.size()); // Output: 2`
  },
  {
    sectionNumber: 83,
    title: '83. HashMap',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `HashMap stores data in Key-Value pairs. Keys must be unique; values can be duplicated. Provides O(1) average time complexity for get() and put() lookups.`,
    codeSnippet: `import java.util.HashMap;

HashMap<String, Integer> studentAges = new HashMap<>();
studentAges.put("John", 20);
studentAges.put("Mary", 21);

System.out.println(studentAges.get("John")); // 20
System.out.println(studentAges.containsKey("Mary")); // true`
  },
  {
    sectionNumber: 84,
    title: '84. Generics',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `Generics allow classes, interfaces, and methods to operate on specified parameter types (<T>, <E>, <K, V>) while providing COMPILE-TIME TYPE SAFETY and eliminating explicit runtime type casting.`,
    codeSnippet: `// Without Generics (legacy, unsafe):
ArrayList rawList = new ArrayList();
rawList.add("Hello");
rawList.add(123); // Risky: accepts anything!

// With Generics (type safe):
ArrayList<String> safeList = new ArrayList<>();
safeList.add("Hello");
// safeList.add(123); // COMPILE ERROR: caught before runtime!`
  },
  {
    sectionNumber: 85,
    title: '85. Wrapper Classes',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `Java Collections only store OBJECT references, not primitives. Wrapper classes encapsulate primitive data types into reference objects.`,
    table: {
      headers: ['Primitive Type', 'Wrapper Class (java.lang)'],
      rows: [
        ['byte', 'Byte'],
        ['short', 'Short'],
        ['int', 'Integer'],
        ['long', 'Long'],
        ['float', 'Float'],
        ['double', 'Double'],
        ['char', 'Character'],
        ['boolean', 'Boolean']
      ]
    }
  },
  {
    sectionNumber: 86,
    title: '86. Autoboxing and Unboxing',
    category: 'Part 8: Collections & Generics (79–86)',
    content: `• Autoboxing: Automatic conversion of a primitive into its corresponding wrapper object by the Java compiler (e.g. int → Integer).
• Unboxing: Automatic conversion of a wrapper object back into its primitive type (e.g. Integer → int).`,
    codeSnippet: `// Autoboxing: primitive int converted to Integer object
Integer boxed = 100;

// Unboxing: Integer object converted back to primitive int
int unboxed = boxed;`
  },

  // PART 9: MODERN JAVA - FILES, LAMBDAS, STREAMS & THREADS (87-96)
  {
    sectionNumber: 87,
    title: '87. File Handling (NIO.2)',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `Modern Java file handling is centered around the java.nio.file APIs (Path and Files) introduced in Java 7, providing high-performance, concise file reading and writing.`,
    codeSnippet: `import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class FileDemo {
    public static void main(String[] args) throws IOException {
        Path file = Path.of("notes.txt");

        // Write string to file
        Files.writeString(file, "Hello Java NIO File Handling!");

        // Read string from file
        String content = Files.readString(file);
        System.out.println(content);
    }
}`
  },
  {
    sectionNumber: 88,
    title: '88. Lambda Expressions',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `Introduced in Java 8, lambda expressions provide a concise, functional syntax to pass behavior as arguments.
Syntax:
(parameters) -> { body }`,
    codeSnippet: `import java.util.List;

List<String> names = List.of("John", "Mary", "Peter");

// Using lambda with forEach:
names.forEach(name -> System.out.println(name));

// Or using method reference:
names.forEach(System.out::println);`
  },
  {
    sectionNumber: 89,
    title: '89. Functional Interfaces',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `A Functional Interface is an interface that contains EXACTLY ONE abstract method (SAM). It can be annotated with @FunctionalInterface. Lambdas and method references can only be assigned to functional interfaces.
Common built-in functional interfaces in java.util.function:
• Predicate<T>: test(T) -> boolean
• Consumer<T>: accept(T) -> void
• Function<T, R>: apply(T) -> R
• Supplier<T>: get() -> T`,
    codeSnippet: `@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println(add.calculate(5, 3));      // 8
        System.out.println(multiply.calculate(5, 3)); // 15
    }
}`
  },
  {
    sectionNumber: 90,
    title: '90. Stream API',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `The Java 8 Stream API provides a declarative, functional pipeline to filter, transform, and aggregate collections without mutating the underlying data source.
Stream Pipeline Structure:
Source → Intermediate Operations (lazy) → Terminal Operation (eager)`,
    codeSnippet: `import java.util.List;

List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

numbers.stream()
       .filter(n -> n % 2 == 0) // Keep even numbers
       .map(n -> n * 10)         // Multiply each by 10
       .forEach(System.out::println);
// Output: 20, 40, 60`
  },
  {
    sectionNumber: 91,
    title: '91. Multithreading (Thread Class)',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `A thread is a lightweight, independent execution path within a running program. Multithreading allows concurrent execution of multiple tasks.
Two Primary Ways to Create Threads:
1. Extending java.lang.Thread
2. Implementing java.lang.Runnable (Preferred because Java does not support multiple class inheritance)

CRITICAL DISTINCTION:
• start(): Creates a new OS thread and schedules it, executing run() asynchronously in the new thread.
• run(): Simply executes the method sequentially in the CURRENT thread like a standard method call!`,
    codeSnippet: `class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

// Start thread:
MyThread t = new MyThread();
t.start(); // Spawns new thread!`
  },
  {
    sectionNumber: 92,
    title: '92. Runnable Interface',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `Implementing the Runnable interface separates the task definition from the execution mechanism:`,
    codeSnippet: `class Task implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable task executing");
    }
}

// Executing with Thread:
Thread worker = new Thread(new Task());
worker.start();

// Or with lambda:
new Thread(() -> System.out.println("Lambda thread running")).start();`
  },
  {
    sectionNumber: 93,
    title: '93. Synchronization',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `When multiple threads access shared mutable data concurrently, race conditions can corrupt state.
The 'synchronized' keyword enforces mutual exclusion using the monitor lock of the object: only one thread can execute inside a synchronized block or method at any given moment.`,
    codeSnippet: `class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++; // Thread-safe atomic update
    }

    public synchronized int getCount() {
        return count;
    }
}`
  },
  {
    sectionNumber: 94,
    title: '94. JDBC (Java Database Connectivity)',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `JDBC is the standard Java API for connecting to relational databases, executing SQL statements, and processing result sets.
Standard JDBC Workflow:
1. Load JDBC Driver
2. Establish Connection: DriverManager.getConnection(url, user, pass)
3. Create PreparedStatement (prevents SQL injection)
4. Execute Query / Update: ps.executeQuery() / ps.executeUpdate()
5. Process ResultSet
6. Close Connection (using try-with-resources)`,
    diagram: `Java Application ──> JDBC API ──> JDBC Driver ──> Database Engine (PostgreSQL, MySQL, Oracle)`
  },
  {
    sectionNumber: 95,
    title: '95. Networking',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `Java provides built-in networking APIs in java.net and java.net.http:
• Socket & ServerSocket: Low-level TCP socket client-server connections.
• InetAddress: IP address resolution and hostname lookup.
• HttpClient: Modern HTTP/2 and HTTP/1.1 client for RESTful web API consumption.`,
    codeSnippet: `import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.github.com"))
        .GET()
        .build();`
  },
  {
    sectionNumber: 96,
    title: '96. GUI Programming',
    category: 'Part 9: Files, Lambdas, Streams & Threads (87–96)',
    content: `Java supports building graphical user interface (GUI) desktop applications:
• AWT (Abstract Window Toolkit): Original heavy-weight native OS peer widgets.
• Swing (javax.swing): Pure Java lightweight components (JFrame, JButton, JOptionPane).
• JavaFX: Modern UI framework supporting CSS styling, scene graphs, FXML, and 3D rendering.`,
    codeSnippet: `import javax.swing.JOptionPane;

public class GuiDemo {
    public static void main(String[] args) {
        JOptionPane.showMessageDialog(null, "Hello, Java GUI World!");
    }
}`
  },

  // PART 10: MEMORY, COMPARISONS & EXAM TAKEAWAYS (97-111)
  {
    sectionNumber: 97,
    title: '97. Memory Management',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Java manages memory automatically using the Java Virtual Machine. Developers do not manually allocate or free memory (unlike malloc/free in C or new/delete in C++).
Objects are created on the HEAP. When an object is no longer reachable from any live thread or root reference, the JVM Garbage Collector reclaims its memory.`
  },
  {
    sectionNumber: 98,
    title: '98. Stack vs. Heap Memory',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `The JVM separates memory into distinct physical regions:
1. Stack Memory:
   - Allocated per thread.
   - Stores method call frames, local primitive variables, and references to heap objects.
   - Fast LIFO allocation; automatically reclaimed when method execution finishes.

2. Heap Memory:
   - Shared across all threads.
   - Stores all object instances and arrays.
   - Managed automatically by the Garbage Collector.`,
    diagram: `Thread Stack Frame                           Shared JVM Heap
┌───────────────────────────────┐            ┌───────────────────────────────┐
│ main() frame                  │            │                               │
│  int age = 20                 │            │ Student Object                │
│  Student s ───────────────────┼──────────> │   name = "John"               │
│                               │            │   age = 20                    │
└───────────────────────────────┘            └───────────────────────────────┘`
  },
  {
    sectionNumber: 99,
    title: '99. Garbage Collection Mechanics',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Garbage collection identifies and frees memory used by objects that are no longer reachable from the "GC Roots" (thread local variables, static variables, JNI references).
An object becomes eligible for garbage collection when:
1. The reference is set to null (s = null;).
2. The reference is reassigned to another object.
3. The reference goes out of scope (e.g. at the end of a method).`,
    codeSnippet: `Student s = new Student("John", 20);

// Object is dereferenced:
s = null;
// The Student object on the heap is now unreferenced and eligible for GC!`
  },
  {
    sectionNumber: 100,
    title: '100. Java Naming Conventions',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Adhering to standard Java naming conventions ensures readability and consistency:
• Classes & Interfaces: PascalCase (e.g. Student, BankAccount, HashMap, Runnable).
• Variables & Methods: camelCase (e.g. studentAge, calculateTotal(), getBalance()).
• Constants: UPPER_CASE_WITH_UNDERSCORES (e.g. MAX_BUFFER_SIZE, PI, DEFAULT_TIMEOUT).
• Packages: all lowercase, reverse domain notation (e.g. com.google.devtools, java.util.concurrent).`
  },
  {
    sectionNumber: 101,
    title: '101. Complete Object-Oriented Java Example',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `A complete, self-contained Java program demonstrating Classes, Objects, Constructors, Encapsulation, private/public access, and 'this':`,
    codeSnippet: `class Student {
    private String name;
    private int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }

    public String getName() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student("John", 20);
        student.display();
        System.out.println("Retrieved via getter: " + student.getName());
    }
}`,
    output: `Name: John, Age: 20\nRetrieved via getter: John`
  },
  {
    sectionNumber: 102,
    title: '102. Important Java Concepts to Master',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Core checklist of mastery areas for academic exams (COS 201.2) and technical interviews:
1. Syntax & Types: Primitives, ranges, casting, operators, Scanner input.
2. Control Structures: if-else ladders, switch statements, for/while/do-while loops.
3. Data Structures: 1D & 2D Arrays, String immutability, ArrayList, HashSet, HashMap.
4. OOP Core: Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, Abstraction, Interfaces.
5. Error Handling: Checked vs unchecked exceptions, try-catch-finally, throw vs throws.
6. Modern Java: Generics, File I/O (NIO.2), Lambda expressions, Stream API pipelines.
7. Concurrency & Systems: Thread vs Runnable, Synchronization, JDBC basics, JVM Memory.`
  },
  {
    sectionNumber: 103,
    title: '103. Common Java Errors',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `The three major types of programming errors in Java:
1. Syntax Errors: Violations of Java grammatical rules; caught by compiler (e.g. missing semicolon, mismatched brackets).
2. Runtime Errors: Compiles cleanly, but crashes during execution (e.g. ArithmeticException on division by zero, NullPointerException).
3. Logical Errors: Compiles and runs to completion without crashing, but calculates or produces the incorrect answer due to flawed program logic.`,
    codeSnippet: `// 1. Syntax Error:
// System.out.println("Missing semicolon") // ERROR: ';' expected

// 2. Runtime Error:
int x = 10 / 0; // Compiles, but throws ArithmeticException

// 3. Logical Error:
int length = 10;
int width = 5;
int area = length + width; // Logic error: should be length * width!`
  },
  {
    sectionNumber: 104,
    title: '104. Java Program Structure',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Standard anatomical sequence of a Java source file:`,
    diagram: `1. Package Declaration (package com.myapp;)
       ↓
2. Import Statements (import java.util.Scanner;)
       ↓
3. Class Declaration (public class Main {})
       ↓
4. Class / Static Variables
       ↓
5. Main Entry Method (public static void main(String[] args))
       ↓
6. Local Variables & Executable Statements
       ↓
7. Output / Return`
  },
  {
    sectionNumber: 105,
    title: '105. Difference Between Java and C++',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Key architectural differences between Java and C++:`,
    table: {
      headers: ['Feature', 'Java', 'C++'],
      rows: [
        ['Paradigm', 'Primarily Object-Oriented', 'Multi-paradigm (Procedural & OOP)'],
        ['Execution Target', 'Compiled to JVM Bytecode (.class)', 'Compiled directly to Native Machine Code'],
        ['Memory Management', 'Automatic Garbage Collection', 'Manual (new / delete) & RAII pointers'],
        ['Pointer Arithmetic', 'No direct pointer arithmetic', 'Full pointer arithmetic supported'],
        ['Multiple Inheritance', 'Single class inheritance (interfaces for multi-behavior)', 'Multiple class inheritance supported'],
        ['Platform Independence', 'Platform-independent ("Write Once, Run Anywhere")', 'Platform-dependent (recompile per OS)'],
        ['Operator Overloading', 'Not supported (except string +)', 'Fully supported']
      ]
    }
  },
  {
    sectionNumber: 106,
    title: '106. Difference Between Java and Python',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Key differences between Java and Python:`,
    table: {
      headers: ['Feature', 'Java', 'Python'],
      rows: [
        ['Type System', 'Statically typed (types declared explicitly)', 'Dynamically typed (inferred at runtime)'],
        ['Code Blocks', 'Curly braces {} define blocks', 'Whitespace indentation defines blocks'],
        ['Execution Speed', 'High (JIT compiled bytecode)', 'Moderate (interpreted / bytecode runtime)'],
        ['Verbosity', 'Structured and verbose syntax', 'Concise, high-level expressive syntax'],
        ['Primary Domains', 'Enterprise backends, Android, Banking, Large Systems', 'AI/ML, Data Science, Scripting, Automation']
      ]
    }
  },
  {
    sectionNumber: 107,
    title: '107. Important Java Terminology (Glossary)',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Quick reference glossary of core Java terms:`,
    table: {
      headers: ['Term', 'Definition / Architectural Meaning'],
      rows: [
        ['JDK', 'Java Development Kit: complete compiler, tools, and runtime.'],
        ['JRE', 'Java Runtime Environment: libraries and JVM to run apps.'],
        ['JVM', 'Java Virtual Machine: software engine executing bytecode.'],
        ['Bytecode', 'Intermediate, architecture-neutral instruction set (.class).'],
        ['Class', 'Template/blueprint defining object attributes and methods.'],
        ['Object', 'Tangible instance of a class allocated on the heap.'],
        ['Constructor', 'Special member method invoked by new to initialize state.'],
        ['Method', 'Named block of executable code performing an operation.'],
        ['Variable', 'Named memory location holding a typed data value.'],
        ['Interface', 'Abstract contract specifying methods a class must implement.'],
        ['Garbage Collection', 'Automatic JVM reclamation of unreachable heap memory.'],
        ['Package', 'Namespace grouping related classes and preventing conflicts.']
      ]
    }
  },
  {
    sectionNumber: 108,
    title: '108. Simple Java Program to Calculate Two Numbers',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Interactive console calculator program in Java using Scanner:`,
    codeSnippet: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double a = input.nextDouble();

        System.out.print("Enter second number: ");
        double b = input.nextDouble();

        System.out.println("Sum        = " + (a + b));
        System.out.println("Difference = " + (a - b));
        System.out.println("Product    = " + (a * b));
        System.out.println("Quotient   = " + (a / b));

        input.close();
    }
}`
  },
  {
    sectionNumber: 109,
    title: '109. Example: Student Grade Program',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Grade classification program using else-if branching:`,
    codeSnippet: `import java.util.Scanner;

public class Grade {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter examination score: ");
        int score = input.nextInt();

        if (score >= 70) {
            System.out.println("Grade A (Excellent)");
        } else if (score >= 60) {
            System.out.println("Grade B (Very Good)");
        } else if (score >= 50) {
            System.out.println("Grade C (Credit)");
        } else if (score >= 45) {
            System.out.println("Grade D (Pass)");
        } else {
            System.out.println("Grade F (Fail)");
        }

        input.close();
    }
}`
  },
  {
    sectionNumber: 110,
    title: '110. Example: Object-Oriented Program',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Complete multi-object demonstration illustrating constructors and instance methods:`,
    codeSnippet: `class Car {
    String brand;
    int speed;

    Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
    }

    void display() {
        System.out.println("Brand: " + brand + ", Top Speed: " + speed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", 120);
        Car car2 = new Car("Honda", 140);

        car1.display();
        car2.display();
    }
}`,
    output: `Brand: Toyota, Top Speed: 120 km/h\nBrand: Honda, Top Speed: 140 km/h`
  },
  {
    sectionNumber: 111,
    title: '111. Recommended Learning Order & Exam Takeaways',
    category: 'Part 10: Memory, Comparisons & Exam Takeaways (97–111)',
    content: `Recommended Sequential Study Path:
1. Java introduction → 2. JDK, JRE & JVM → 3. Syntax → 4. Variables → 5. Data types → 6. Operators → 7. Input/Output → 8. if/else → 9. switch → 10. Loops → 11. Arrays → 12. Strings → 13. Methods → 14. Classes → 15. Objects → 16. Constructors → 17. Encapsulation → 18. Inheritance → 19. Polymorphism → 20. Abstraction → 21. Interfaces → 22. Exception handling → 23. Collections → 24. Generics → 25. File handling → 26. Lambdas → 27. Streams → 28. Multithreading → 29. JDBC → 30. Full Projects.

⭐ CRITICAL EXAM DISTINCTIONS TO REMEMBER (COS 201.2):
• Class       = The blueprint/template.
• Object      = Concrete runtime instance of a class.
• Constructor = Special member that initializes an object state.
• Method      = Named block of executable behavior.
• Variable    = Named storage for a value.
• Array       = Fixed-size sequential collection of values.

THE FOUR CORE PILLARS OF OOP:
1. ENCAPSULATION : Data hiding via private fields and public getters/setters.
2. INHERITANCE   : Code reuse and taxonomy using 'extends'.
3. POLYMORPHISM  : One interface, multiple runtime forms (Overloading & Overriding).
4. ABSTRACTION   : Exposing contract specifications and hiding internal implementation.`
  }
];
