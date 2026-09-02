import { Question } from '../../types';

export const reflectionQuestions: Question[] = [
  {
    id: 281,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do JDK Dynamic Proxies (`java.lang.reflect.Proxy`) differ fundamentally from bytecode-generated proxies (CGLIB / ByteBuddy) regarding class inheritance?',
    options: [
      'JDK Dynamic Proxies can only proxy interface types by generating a synthetic class that extends `java.lang.reflect.Proxy` and implements the target interfaces; CGLIB and ByteBuddy can proxy concrete classes by generating subclasses at runtime',
      'JDK Dynamic Proxies can proxy any final class directly',
      'CGLIB proxies cannot intercept method calls',
      'JDK Dynamic Proxies run in native C++ memory outside the JVM'
    ],
    correctAnswer: 0,
    explanation: 'Because Java does not support multiple class inheritance and all JDK dynamic proxies already inherit from `java.lang.reflect.Proxy`, standard JDK proxies can only implement interfaces. Class-based proxying (subclassing concrete classes) requires bytecode manipulation frameworks like ByteBuddy or CGLIB.',
    tags: ['JDK Dynamic Proxy', 'ByteBuddy', 'CGLIB', 'Proxy Pattern']
  },
  {
    id: 282,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'How does the JVM optimize repetitive reflective `Method.invoke()` calls through "Reflection Inflation"?',
    options: [
      'By converting methods to static fields',
      'Initially, reflective calls use a slow native JNI accessor; after being invoked a threshold number of times (default 15 via `-Dsun.reflect.inflationThreshold`), the JVM generates a dedicated Java bytecode class (`GeneratedMethodAccessor`) that calls the target method directly, enabling JIT inlining and peak performance',
      'By caching method results in Redis',
      'By turning all methods into lambdas'
    ],
    correctAnswer: 1,
    explanation: 'To balance startup time and steady-state speed, HotSpot initially executes `Method.invoke()` via native JNI code. Once a reflective call site becomes hot (crossing `inflationThreshold`), HotSpot dynamically generates a custom bytecode class calling the method directly, allowing C2 JIT inlining.',
    tags: ['Reflection Inflation', 'Method.invoke', 'JIT Inlining', 'Performance']
  },
  {
    id: 283,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do `MethodHandles` and `MethodHandles.Lookup` provide faster, safer method invocation compared to traditional `java.lang.reflect.Method`?',
    codeSnippet: `MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodType mt = MethodType.methodType(String.class, int.class);
MethodHandle mh = lookup.findVirtual(MyClass.class, "compute", mt);
String res = (String) mh.invokeExact(myInstance, 42);`,
    options: [
      'MethodHandles execute in a separate operating system process',
      'Access control checks are performed once at lookup creation time (rather than on every invocation), and `invokeExact` matches bytecode signatures directly with zero boxing/unboxing overhead, allowing the JIT compiler to inline calls directly as if they were plain bytecode calls',
      'MethodHandles bypass all JVM security policies',
      'MethodHandles only work with static methods'
    ],
    correctAnswer: 1,
    explanation: 'Standard reflection performs access/type checks on every single `invoke()` call and boxes primitives into `Object[]`. `MethodHandle.invokeExact()` compiles down to direct bytecode invocations with access checks done upfront at lookup time, allowing HotSpot JIT to treat handles as direct inlineable calls.',
    tags: ['MethodHandles', 'invokeExact', 'JSR 292', 'MethodType']
  },
  {
    id: 284,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the purpose of the Java Platform Module System (JPMS) `opens` and `exports` directives regarding reflection?',
    options: [
      '`opens` allows public compilation only; `exports` is for testing',
      '`exports` makes public types accessible for compile-time and runtime access to public members; `opens` permits deep reflection (accessing private/protected fields and methods via `setAccessible(true)`) to target modules at runtime',
      '`opens` opens internet firewall ports for the module',
      '`exports` compiles modules into .exe files'
    ],
    correctAnswer: 1,
    explanation: 'JPMS strongly encapsulates internal packages. `exports com.pkg;` exposes only public APIs for compile/run time. `opens com.pkg;` explicitly grants runtime deep reflection access (e.g. for Spring/Jackson serializers accessing private fields).',
    tags: ['JPMS', 'Jigsaw', 'opens vs exports', 'Deep Reflection']
  },
  {
    id: 285,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How does a Java Agent use the `java.lang.instrument.Instrumentation` API to dynamically redefine bytecode at runtime?',
    codeSnippet: `public static void premain(String agentArgs, Instrumentation inst) {
    inst.addTransformer(new ClassFileTransformer() {
        @Override
        public byte[] transform(ClassLoader loader, String className,
                                Class<?> classBeingRedefined,
                                ProtectionDomain pd, byte[] classfileBuffer) {
            // Modify bytecode using ASM/ByteBuddy here!
            return modifiedBytecode;
        }
    }, true);
}`,
    options: [
      'By rebooting the JVM on every class modification',
      'The agent registers a `ClassFileTransformer`; when classes are loaded (or when `retransformClasses()` is invoked), the JVM passes the raw bytecode bytes to the transformer, allowing APMs (NewRelic/Datadog) to inject metrics and tracing bytecode transparently',
      'By rewriting the Java source code files on disk',
      'By injecting native C++ assembly directly into the CPU instruction queue'
    ],
    correctAnswer: 1,
    explanation: 'Java Agents leverage the Instrumentation API via `premain()` (startup) or `agentmain()` (dynamic attach). ClassFileTransformers intercept class definitions and return instrumented bytecode, powering APM profiling tools, mocking frameworks, and hot-reload engines.',
    tags: ['Java Agent', 'Instrumentation', 'ClassFileTransformer', 'Bytecode Modification']
  },
  {
    id: 286,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What happens when code attempts deep reflection (`field.setAccessible(true)`) on an encapsulated internal JDK module package without `--add-opens` in Java 17+?',
    options: [
      'It logs a silent warning and proceeds',
      'It throws an `InaccessibleObjectException: Unable to make field accessible: module java.base does not "opens ..." to unnamed module`',
      'It compiles cleanly and modifies the field',
      'It converts the field to public static final'
    ],
    correctAnswer: 1,
    explanation: 'Java 17 (JEP 403) strongly encapsulated JDK internals by default ("Strong Encapsulation by Default"). Reflective access to non-public fields in JDK modules (`java.base`, etc.) throws `InaccessibleObjectException` unless explicitly permitted with `--add-opens <module>/<package>=<target-module>`.',
    tags: ['JEP 403', 'Strong Encapsulation', 'InaccessibleObjectException', 'JPMS']
  },
  {
    id: 287,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the retention lifetime of an annotation declared with `@Retention(RetentionPolicy.CLASS)`?',
    options: [
      'Recorded in the `.class` file by the compiler, but NOT retained in memory at runtime by the JVM (cannot be queried via `getAnnotation()`)',
      'Discarded by the compiler during source code parsing (never written to `.class` file)',
      'Retained in memory at runtime and accessible via reflection',
      'Retained only in unit test frameworks'
    ],
    correctAnswer: 0,
    explanation: '`RetentionPolicy.SOURCE` is discarded by compiler (e.g. `@Override`). `RetentionPolicy.CLASS` is preserved in the `.class` file for bytecode tools/linters but ignored by the runtime ClassLoader. `RetentionPolicy.RUNTIME` is loaded into JVM memory and accessible via reflection.',
    tags: ['RetentionPolicy', 'Annotations', 'Metadata']
  },
  {
    id: 288,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How does `MethodHandles.privateLookupIn(Class<?> targetClass, MethodHandles.Lookup lookup)` obtain private access in another class under JPMS rules?',
    options: [
      'By disabling the JVM security manager',
      'It checks whether the caller\'s module and the target class\'s module have granted access (i.e. target package is opened to caller module); if permitted, it returns a Lookup object with `PRIVATE` and `MODULE` access modes enabled',
      'It decrypts the target class bytecode',
      'It works unconditionally for any class without permission checks'
    ],
    correctAnswer: 1,
    explanation: '`privateLookupIn()` (Java 9+) is the secure, module-aware replacement for reflection tricks. It succeeds only if the target class\'s package is explicitly `opened` to the lookup module, granting full `Lookup.PRIVATE` access mode for creating high-speed MethodHandles.',
    tags: ['privateLookupIn', 'MethodHandles', 'JPMS Security']
  },
  {
    id: 289,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'Why do modern frameworks prefer `ByteBuddy` over legacy `CGLIB` and `Javassist` for runtime bytecode manipulation?',
    options: [
      'Because CGLIB is unmaintained, relies on deprecated Unsafe internals, and struggles with modern Java versions (17+ / JPMS), whereas ByteBuddy is actively maintained, fully supports modularity, records, sealed types, and generates clean, verified bytecode without boilerplate',
      'Because ByteBuddy converts Java into C++',
      'Because Javassist was removed from Maven Central',
      'Because ByteBuddy does not require a JVM'
    ],
    correctAnswer: 0,
    explanation: 'CGLIB was abandoned years ago and breaks under modern JDK module systems and new bytecode features. ByteBuddy has become the industry standard (used by Hibernate, Mockito, Spring) providing high-level type-safe DSLs that generate fully verified, module-compliant bytecode.',
    tags: ['ByteBuddy', 'CGLIB', 'Bytecode Engineering']
  },
  {
    id: 290,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the difference between `Class.forName(name)` and `ClassLoader.loadClass(name)` regarding static initialization?',
    options: [
      'Both initialize static blocks immediately',
      '`Class.forName(name)` (by default) loads, links, and runs the class\'s static initializer block (`<clinit>`); `ClassLoader.loadClass(name)` loads the class without running static initializers (initialization is deferred until first instance creation or static member access)',
      '`ClassLoader.loadClass` runs static initializers twice',
      '`Class.forName` only works on system classes'
    ],
    correctAnswer: 1,
    explanation: '`Class.forName("com.example.MyClass")` triggers class initialization (executing `static { ... }` blocks). `classLoader.loadClass("...")` only resolves and loads the class into memory without initializing it until the class is actively referenced.',
    tags: ['Class.forName', 'loadClass', 'Class Initialization', '<clinit>']
  },
  {
    id: 291,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'What is a "StackMapTable" verification error (`VerifyError`) in custom bytecode generation (e.g. ASM)?',
    options: [
      'A disk write failure during compilation',
      'An error generated by the JVM bytecode verifier when generated jump targets (branches, loops) contain mismatched or missing stack operand frames that do not match the precomputed StackMapTable frame definitions',
      'A network socket verification error',
      'An error thrown when stack memory exceeds 10MB'
    ],
    correctAnswer: 1,
    explanation: 'Since Java 7, the split verifier requires classfiles to contain `StackMapTable` attributes detailing local variables and operand stack types at all jump targets. Generating malformed bytecode branches without recalculating stack frames (e.g. `ClassWriter.COMPUTE_FRAMES` in ASM) triggers fatal `java.lang.VerifyError`.',
    tags: ['StackMapTable', 'VerifyError', 'ASM', 'Bytecode Verification']
  },
  {
    id: 292,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the difference between `Class.getMethod()` and `Class.getDeclaredMethod()`?',
    options: [
      '`getMethod()` returns only public methods (including those inherited from superclasses/interfaces); `getDeclaredMethod()` returns public, protected, package, and private methods declared explicitly in this class (excluding inherited methods)',
      '`getDeclaredMethod()` only returns abstract methods',
      '`getMethod()` returns private methods only',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: '`getMethod(name, types)` searches the public API including inherited methods. `getDeclaredMethod(name, types)` searches all methods (any visibility) declared directly inside the class, but does not traverse up the inheritance chain.',
    tags: ['Reflection API', 'getMethod', 'getDeclaredMethod']
  },
  {
    id: 293,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do Annotation Processors (`javax.annotation.processing.Processor`) generate code during compile-time without reflection overhead?',
    options: [
      'By running unit tests during compilation',
      'They plug into `javac` via JSR 269 (Pluggable Annotation Processing API), analyze Abstract Syntax Tree (AST) elements in multiple rounds, and write new `.java` source files via `Filer`, which the compiler then compiles into bytecode in subsequent rounds',
      'By executing JNI C++ code inside the compiler',
      'By modifying existing compiled `.class` files in-place'
    ],
    correctAnswer: 1,
    explanation: 'Compile-time annotation processors (e.g. Lombok, MapStruct, Dagger) run during `javac` compilation. In multiple rounds, they inspect AST elements (`TypeElement`, `VariableElement`) and generate fresh source files via `Filer`, providing zero runtime overhead.',
    tags: ['Annotation Processing', 'JSR 269', 'javac', 'Compile-Time Code Generation']
  },
  {
    id: 294,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the purpose of `java.lang.reflect.InvocationHandler` in JDK Dynamic Proxies?',
    codeSnippet: `public interface InvocationHandler {
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
}`,
    options: [
      'To handle uncaught thread exceptions',
      'It is the single callback interface that intercepts every method invocation dispatched to a dynamic proxy instance, allowing developers to implement cross-cutting concerns (logging, transactions, security) dynamically',
      'To serialize method arguments to JSON',
      'To compile methods to machine code'
    ],
    correctAnswer: 1,
    explanation: 'When a method is called on a JDK dynamic proxy instance, the call is routed to `InvocationHandler.invoke(proxy, method, args)`. The handler inspects the method, executes custom logic (e.g. `@Transactional` rollback/commit), and optionally delegates to a target object.',
    tags: ['InvocationHandler', 'Dynamic Proxy', 'AOP']
  },
  {
    id: 295,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the purpose of `MethodHandle.bindTo(Object receiver)`?',
    options: [
      'Binds a method to an IP address',
      'Curries the first argument of the MethodHandle (the `this` object receiver for virtual methods), returning a new bound MethodHandle that no longer requires the receiver to be passed explicitly on subsequent invocations',
      'Binds a database connection to the method',
      'Prevents the method from being called more than once'
    ],
    correctAnswer: 1,
    explanation: '`bindTo(x)` binds the first parameter (the target instance) to `x`. An unbound virtual method handle expecting `(MyClass, int) -> String` becomes a bound handle expecting `(int) -> String`, simplifying downstream functional composition.',
    tags: ['MethodHandle', 'bindTo', 'Currying', 'Functional Dispatch']
  },
  {
    id: 296,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'Why does ASM use the Visitor pattern (`ClassVisitor`, `MethodVisitor`) rather than an in-memory Document Object Model (DOM) tree for parsing classfiles?',
    options: [
      'Because the Visitor pattern streams bytecode sequentially event-by-event with near-zero memory allocation, enabling ultra-fast class analysis and transformation without loading huge syntax trees into heap',
      'Because DOM trees are illegal in Java',
      'Because Visitor pattern is required by the JVM bytecode verifier',
      'Because ASM only parses XML files'
    ],
    correctAnswer: 0,
    explanation: 'ASM was designed for extreme speed and low memory. Its event-driven Visitor architecture (`ClassReader` pushing events to `ClassVisitor` and `ClassWriter`) streams bytecode in a single pass without allocating heavy object models on heap.',
    tags: ['ASM', 'Visitor Pattern', 'Bytecode Engineering', 'Performance']
  },
  {
    id: 297,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the effect of invoking `Constructor.setAccessible(true)` on a `private` constructor of a singleton class in pre-Java 17 code?',
    options: [
      'It throws a compile-time error',
      'It suppresses Java language access control checks, allowing reflection to instantiate the private constructor and create multiple instances of the singleton (unless protected by enum singletons or constructor exception guards)',
      'It deletes the class constructor',
      'It converts the constructor into a public static method'
    ],
    correctAnswer: 1,
    explanation: 'Calling `setAccessible(true)` overrides accessibility checks, allowing external code to invoke private constructors. Effective Java recommends using single-element `enum` types to implement singletons because the JVM reflection API explicitly prohibits reflective instantiation of Enums.',
    tags: ['setAccessible', 'Singleton Reflection Attack', 'Enums']
  },
  {
    id: 298,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the role of `java.lang.invoke.CallSite` and its subclasses (`ConstantCallSite`, `MutableCallSite`, `VolatileCallSite`) in `invokedynamic` linkage?',
    options: [
      'To track HTTP web traffic sites',
      'A `CallSite` is a permanent holder for a `MethodHandle` target linked to an `invokedynamic` instruction; `ConstantCallSite` target never changes (inlined by JIT); `MutableCallSite` and `VolatileCallSite` allow dynamic runtime target relinking with appropriate memory synchronization',
      'To manage database connection strings',
      'To allocate heap memory for lambda expressions'
    ],
    correctAnswer: 1,
    explanation: 'An `invokedynamic` instruction delegates to a `CallSite`. `ConstantCallSite` targets are fixed and aggressively optimized/inlined by C2. `MutableCallSite` and `VolatileCallSite` allow dynamic language runtimes to mutate call targets on-the-fly when variable types change.',
    tags: ['CallSite', 'invokedynamic', 'ConstantCallSite', 'MethodHandle']
  },
  {
    id: 299,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'What are "Hidden Classes" (JEP 371) introduced in Java 15 to replace `Unsafe.defineAnonymousClass`?',
    options: [
      'Classes that are hidden from the file system by encryption',
      'Classes that cannot be used directly by the bytecode of other classes, are not discoverable by classloaders (via `Class.forName`), have independent lifecycles, and can be unloaded independently of their defining classloader, ideal for dynamic lambda/proxy generation',
      'Classes without method implementations',
      'Classes stored in the operating system swap space'
    ],
    correctAnswer: 1,
    explanation: 'Hidden Classes (created via `MethodHandles.Lookup.defineHiddenClass`) allow frameworks to generate dynamic runtime classes that cannot be discovered via reflection or linked by name. They can be garbage collected as soon as their MethodHandle is unreferenced, eliminating Metaspace leaks.',
    tags: ['Hidden Classes', 'JEP 371', 'defineHiddenClass', 'Metaspace']
  },
  {
    id: 300,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the difference between `Field.get(instance)` and `Field.getInt(instance)` in Java reflection?',
    options: [
      '`Field.get()` returns a boxed `java.lang.Object` (allocating an `Integer` object on heap for primitive ints); `Field.getInt()` returns the raw primitive `int` directly with zero boxing allocation',
      '`Field.getInt()` only works on String fields',
      '`Field.get()` is thread-safe while `Field.getInt()` is not',
      'There is no performance or return type difference'
    ],
    correctAnswer: 0,
    explanation: '`Field.get()` returns `Object`, forcing primitive values to be autoboxed into heap objects. Specialized primitive getters (`getInt()`, `getLong()`, `getDouble()`) return primitive types directly, avoiding garbage creation in high-performance loops.',
    tags: ['Reflection', 'Boxing', 'Field.getInt', 'Performance']
  },
  {
    id: 301,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the purpose of `MethodHandle.asType(MethodType newType)`?',
    options: [
      'Converts the MethodHandle to a String',
      'Adapts the MethodHandle to a new type signature by inserting automatic argument/return type conversions (such as boxing, unboxing, widening, or casting) as necessary',
      'Decompiles the method to Java source code',
      'Changes the method visibility to public'
    ],
    correctAnswer: 1,
    explanation: '`asType()` produces an adapted MethodHandle that converts incoming arguments and outgoing return types to match `newType`, applying conversions like primitive widening, reference casting, and boxing/unboxing.',
    tags: ['MethodHandle', 'asType', 'Type Adaptation']
  },
  {
    id: 302,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do you inspect the parameters of a method reflectively to get their actual source parameter names (`String username`) in Java 8+?',
    options: [
      'Parameter names are always preserved in all class files automatically',
      'The code must be compiled with the `-parameters` javac flag; then parameter names can be retrieved via `Method.getParameters()[i].getName()` (otherwise fallback names `arg0`, `arg1` are returned)',
      'Parameter names can only be retrieved by attaching a JDB debugger',
      'Parameter names are encrypted in the constant pool'
    ],
    correctAnswer: 1,
    explanation: 'By default, `javac` omits parameter names from classfiles to save bytecode size. Compiling with `javac -parameters` embeds parameter metadata in the `MethodParameters` attribute, accessible via `Parameter.getName()`.',
    tags: ['-parameters', 'Method.getParameters', 'Reflection', 'Metadata']
  },
  {
    id: 303,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the purpose of `java.lang.annotation.Inherited` on an annotation type?',
    options: [
      'It causes the annotation to be inherited by all implementing interfaces',
      'It indicates that an annotation on a class is automatically inherited by subclasses of that annotated class (does not apply to interfaces or implemented interface methods)',
      'It makes all class fields inherit the annotation',
      'It makes annotations mutable at runtime'
    ],
    correctAnswer: 1,
    explanation: '`@Inherited` causes class-level annotations to propagate down class inheritance hierarchies. If `Class A` is annotated with an `@Inherited` annotation, `Class B extends A` will also have the annotation when queried via `B.class.getAnnotation()`.',
    tags: ['@Inherited', 'Annotations', 'Inheritance']
  },
  {
    id: 304,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the difference between `Class.isInstance(obj)` and the `instanceof` operator?',
    options: [
      '`instanceof` is a static compile-time operator where the target type must be known at compile time; `Class.isInstance(obj)` is dynamic and allows checking against a `Class<?>` reference known only at runtime',
      '`isInstance` only works on primitive types',
      '`instanceof` throws ClassCastException on failure',
      'There is no functional difference'
    ],
    correctAnswer: 0,
    explanation: '`obj instanceof MyClass` requires `MyClass` to be a static type token at compile time. `clazz.isInstance(obj)` performs the identical type check dynamically when the `Class` object is held in a variable.',
    tags: ['isInstance', 'instanceof', 'Dynamic Typing']
  },
  {
    id: 305,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'What is the purpose of `java.lang.invoke.MethodHandles.filterArguments()`?',
    options: [
      'It filters spam network packets',
      'It transforms a MethodHandle by applying unary filter functions to one or more incoming arguments before passing the transformed values to the target MethodHandle',
      'It validates SQL query parameters against injection attacks',
      'It removes null arguments from method calls'
    ],
    correctAnswer: 1,
    explanation: '`MethodHandles.filterArguments(target, pos, filters...)` adapts a method handle by passing incoming arguments through pre-processing filter functions before invoking the target handle, enabling functional pipeline combinators.',
    tags: ['filterArguments', 'MethodHandles', 'Functional Combinators']
  },
  {
    id: 306,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What does `Modifier.isStatic(method.getModifiers())` check in Java reflection?',
    options: [
      'Checks if the method is executed in Metaspace',
      'Checks the bitwise access flags integer of the method for the presence of the `ACC_STATIC` (0x0008) bit flag',
      'Checks if the method variable cannot be modified',
      'Checks if the method has zero arguments'
    ],
    correctAnswer: 1,
    explanation: '`Method.getModifiers()` returns an integer bitmask of bytecode access flags (`ACC_PUBLIC`, `ACC_STATIC`, `ACC_FINAL`, etc.). `Modifier.isStatic()` performs a bitwise check `(modifiers & Modifier.STATIC) != 0`.',
    tags: ['Modifier', 'Access Flags', 'Reflection']
  },
  {
    id: 307,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the function of `java.lang.reflect.Array.newInstance(Class<?> componentType, int length)`?',
    options: [
      'Creates an ArrayList with the given size',
      'Dynamically creates a new array of the specified component type and length at runtime using native reflection routines',
      'Creates a 2D matrix in Metaspace',
      'Allocates an off-heap DirectByteBuffer'
    ],
    correctAnswer: 1,
    explanation: 'Because generic array instantiation `new T[n]` is forbidden due to type erasure, `Array.newInstance(componentType, length)` allows creating arrays of dynamic or parameterized component types at runtime.',
    tags: ['Array.newInstance', 'Generic Arrays', 'Reflection']
  },
  {
    id: 308,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'What is the role of `MethodHandles.exactInvoker(MethodType type)`?',
    options: [
      'Creates a direct MethodHandle that accepts a target MethodHandle as its first argument and invokes it with `invokeExact` matching the specified `MethodType`',
      'Creates a new thread to run methods',
      'Forces methods to run without JIT optimization',
      'Decompiles method handles to bytecode'
    ],
    correctAnswer: 0,
    explanation: '`exactInvoker(type)` returns a special invoker MethodHandle whose leading parameter is a `MethodHandle` itself, allowing high-performance indirect dispatch across varying method handles sharing the same type descriptor.',
    tags: ['exactInvoker', 'MethodHandles', 'Dynamic Dispatch']
  },
  {
    id: 309,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is a "Synthetic" method in Java reflection (`Method.isSynthetic()`)?',
    options: [
      'A method generated by artificial intelligence',
      'A method introduced into the bytecode by the Java compiler that does not appear in the original Java source code (such as bridge methods, lambda implementation methods, or default constructor)',
      'A method written in C++',
      'A deprecated method'
    ],
    correctAnswer: 1,
    explanation: 'Synthetic constructs (`isSynthetic() == true`) are generated by `javac` for internal mechanics (e.g. generic bridge methods, outer-class private access desugaring, or enum switch tables) that have no direct representation in source code.',
    tags: ['Synthetic Methods', 'Bytecode', 'javac']
  },
  {
    id: 310,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is `java.lang.reflect.Proxy.getInvocationHandler(Object proxy)` used for?',
    options: [
      'To delete the dynamic proxy from memory',
      'To extract and retrieve the underlying `InvocationHandler` instance associated with the specified dynamic proxy object',
      'To invoke the method asynchronously',
      'To convert the proxy to a CGLIB proxy'
    ],
    correctAnswer: 1,
    explanation: '`Proxy.getInvocationHandler(proxy)` verifies that the given object is a valid JDK dynamic proxy and returns the `InvocationHandler` bound to it, enabling inspection of proxy wrappers.',
    tags: ['Proxy.getInvocationHandler', 'Dynamic Proxy', 'Reflection']
  },
  {
    id: 311,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do "Bootstrap Methods" (BSM) in `invokedynamic` receive static and dynamic arguments from the constant pool?',
    codeSnippet: `public static CallSite bsm(MethodHandles.Lookup lookup, String name,
                               MethodType type, Object... staticArgs) { ... }`,
    options: [
      'Via HTTP POST requests',
      'The JVM passes three standard leading arguments (`Lookup`, method name `String`, method descriptor `MethodType`) followed by optional static arguments defined in the constant pool\'s `BootstrapMethods` attribute table',
      'Through environment variables',
      'Via standard input streams'
    ],
    correctAnswer: 1,
    explanation: 'The JVM specification requires BSMs to accept: 1) `Lookup` of caller class, 2) Method name, 3) `MethodType` call descriptor, followed by any static arguments (strings, method handles, classes) specified in the classfile\'s `BootstrapMethods` attribute.',
    tags: ['Bootstrap Method', 'BSM', 'invokedynamic', 'JVMS']
  },
  {
    id: 312,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is `Class.getComponentType()` in Java reflection?',
    options: [
      'Returns the component type of an array class (e.g. `String.class` for `String[]`), or `null` if the class is not an array',
      'Returns the parent GUI component in Swing',
      'Returns the Spring bean component annotation',
      'Returns the package name'
    ],
    correctAnswer: 0,
    explanation: 'If `Class<?>` represents an array type, `getComponentType()` returns the `Class` of the elements it holds. For non-array classes, it returns `null`.',
    tags: ['getComponentType', 'Arrays', 'Reflection']
  },
  {
    id: 313,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the purpose of `MethodHandles.constant(Class<?> type, Object value)`?',
    options: [
      'Creates a constant variable in memory',
      'Produces a MethodHandle that takes zero arguments and always returns the specified constant `value` upon invocation, heavily optimized by the JIT compiler as a constant fold',
      'Stores a value in the constant pool',
      'Freezes all fields of an object'
    ],
    correctAnswer: 1,
    explanation: '`MethodHandles.constant(type, value)` creates a canonical zero-argument method handle returning a constant value. HotSpot JIT treats this as a constant expression, inlining the result directly without method call overhead.',
    tags: ['MethodHandles.constant', 'Constant Folding', 'JIT Optimization']
  },
  {
    id: 314,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'What does `Instrumentation.isRetransformClassesSupported()` check in a Java Agent?',
    options: [
      'Checks if the agent can rewrite classes that are already loaded in the JVM without creating a new ClassLoader',
      'Checks if the JVM supports multi-threading',
      'Checks if the server has an active network connection',
      'Checks if the garbage collector is ZGC'
    ],
    correctAnswer: 0,
    explanation: 'Class retransformation (`retransformClasses`) allows modifying the bytecode of already-loaded classes without altering their schema (cannot add/remove fields or method signatures), essential for dynamic APM profilers attaching to live production servers.',
    tags: ['retransformClasses', 'Instrumentation', 'Java Agent', 'Hot-Swapping']
  },
  {
    id: 315,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What exception is thrown when `Class.forName("com.missing.Class")` cannot find the specified class file?',
    options: [
      'NullPointerException',
      'ClassNotFoundException',
      'NoClassDefFoundError',
      'NoSuchMethodException'
    ],
    correctAnswer: 1,
    explanation: '`Class.forName()` throws checked `ClassNotFoundException` if the class cannot be located by the ClassLoader. (In contrast, `NoClassDefFoundError` is an `Error` thrown when a class was available at compile time but missing at runtime during linkage).',
    tags: ['ClassNotFoundException', 'NoClassDefFoundError', 'Class Loading']
  },
  {
    id: 316,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the difference between `Field.set(instance, val)` and `VarHandle.set(instance, val)` in modern Java?',
    options: [
      '`Field.set()` is slower due to reflective security checks and boxing; `VarHandle.set()` is compiled to direct memory write machine instructions with zero reflection overhead and customizable memory ordering semantics',
      '`VarHandle` can only write boolean values',
      '`Field.set()` works only on final fields',
      'There is no performance difference'
    ],
    correctAnswer: 0,
    explanation: '`VarHandle` was introduced specifically to provide high-speed, direct field access without the performance penalties, boxing, and access check overhead of `java.lang.reflect.Field`.',
    tags: ['VarHandle', 'Field.set', 'Performance', 'Memory Access']
  },
  {
    id: 317,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do you invoke a `super` method implementation from an overridden method handle using `MethodHandles.Lookup.findSpecial()`?',
    codeSnippet: `lookup.findSpecial(SuperClass.class, "doWork",
                   MethodType.methodType(void.class), SubClass.class);`,
    options: [
      'By passing the superclass as both target and special caller class',
      'By specifying the superclass as `refc` (target class) and the current class as `specialCaller`, producing an `invokespecial` bytecode dispatch that bypasses dynamic virtual overriding',
      'findSpecial is only used for static methods',
      'findSpecial is forbidden in Java 17+'
    ],
    correctAnswer: 1,
    explanation: '`findSpecial` creates a method handle for an `invokespecial` instruction (equivalent to `super.doWork()`). The caller class must have access to the special method, and `specialCaller` must be the current class or a subclass.',
    tags: ['findSpecial', 'invokespecial', 'MethodHandles', 'Super Invocation']
  },
  {
    id: 318,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Advanced',
    question: 'What is the purpose of `Method.isAnnotationPresent(Class<? extends Annotation> annotationClass)`?',
    options: [
      'Checks whether the method is annotated with the specified annotation type (with RUNTIME retention policy)',
      'Removes annotations from the method',
      'Adds a new annotation to the method at runtime',
      'Converts the method to an interface'
    ],
    correctAnswer: 0,
    explanation: '`isAnnotationPresent()` returns `true` if the specified runtime annotation is present on the method, providing a fast boolean check before calling `getAnnotation()`.',
    tags: ['isAnnotationPresent', 'Reflection', 'Annotations']
  },
  {
    id: 319,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Expert',
    question: 'What is the effect of passing `--enable-native-access=ALL-UNNAMED` in modern Java (Java 22+)?',
    options: [
      'Disables the JVM garbage collector',
      'Grants permission to foreign functions (FFM API / Project Panama) and Unsafe memory access without triggering restricted method warnings or security errors at runtime',
      'Enables C++ compilation inside the JVM',
      'Allows root user access to the OS'
    ],
    correctAnswer: 1,
    explanation: 'Modern JDKs protect native memory access. Methods in the Foreign Function & Memory API (like `Linker.nativeLinker()` or `MemorySegment`) are classified as restricted. `--enable-native-access` grants explicit authorization to specific modules or unnamed modules to invoke them.',
    tags: ['--enable-native-access', 'FFM API', 'Restricted Methods', 'Java 22']
  },
  {
    id: 320,
    category: 'reflection-bytecode',
    categoryTitle: 'Reflection, Dynamic Proxies & Bytecode',
    difficulty: 'Master',
    question: 'How do you create a custom Dynamic Proxy that handles `default` interface methods in Java 8+ without throwing `UnsupportedOperationException`?',
    options: [
      'Default methods cannot be invoked through dynamic proxies',
      'By using `MethodHandles.Lookup` (or `InvocationHandler.invokeDefault()`) to resolve and invoke the interface default method using `findSpecial` on the interface class',
      'By deleting the default keyword from the interface',
      'By making the interface abstract'
    ],
    correctAnswer: 1,
    explanation: 'In Java 8/9, invoking default methods from an `InvocationHandler` required reflective lookup hacks. Java 16 standardized `InvocationHandler.invokeDefault(proxy, method, args)`, which dispatches default interface methods directly.',
    tags: ['Default Methods', 'Dynamic Proxy', 'invokeDefault', 'MethodHandles']
  }
];
