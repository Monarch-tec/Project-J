import { CategoryMeta } from '../types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'concurrency',
    title: 'Concurrency & Memory Model',
    description: 'JMM happens-before, Virtual Threads, AQS, VarHandle, ForkJoinPool, CAS & Memory Fences',
    iconName: 'Cpu',
    totalQuestions: 40,
    color: 'indigo'
  },
  {
    id: 'jvm-internals',
    title: 'JVM Internals & JIT Compilation',
    description: 'Class loading, Mark Word, Tiered Compilation (C1/C2), Safepoints, ZGC, G1 & Bytecode',
    iconName: 'Layers',
    totalQuestions: 40,
    color: 'amber'
  },
  {
    id: 'generics-type-system',
    title: 'Generics & Type System',
    description: 'Type erasure, PECS wildcards, Bridge methods, Type tokens, Array variance & Reifiable types',
    iconName: 'Code2',
    totalQuestions: 40,
    color: 'emerald'
  },
  {
    id: 'collections-internals',
    title: 'Collections Framework Internals',
    description: 'HashMap Red-Black treeification, ConcurrentHashMap striping, ArrayDeque & Sequenced Collections',
    iconName: 'Boxes',
    totalQuestions: 40,
    color: 'cyan'
  },
  {
    id: 'memory-management',
    title: 'Memory Management & Off-Heap',
    description: 'Phantom/Soft/Weak references, Cleaner API, DirectByteBuffer, Panama FFM & Object Layout',
    iconName: 'HardDrive',
    totalQuestions: 40,
    color: 'violet'
  },
  {
    id: 'modern-java',
    title: 'Modern Java Features (17 - 23+)',
    description: 'Record patterns, Sealed hierarchies, Pattern matching switch, Scoped values & Unnamed patterns',
    iconName: 'Sparkles',
    totalQuestions: 40,
    color: 'rose'
  },
  {
    id: 'nio-io',
    title: 'NIO & Asynchronous Networking',
    description: 'Epoll Selectors, Buffer mechanics, FileChannel zero-copy, WatchService & Netty event loops',
    iconName: 'Network',
    totalQuestions: 40,
    color: 'sky'
  },
  {
    id: 'reflection-bytecode',
    title: 'Reflection, Proxies & Bytecode',
    description: 'Dynamic proxies, MethodHandles, Java Agents, JPMS encapsulation, ASM & ClassFile API',
    iconName: 'Binary',
    totalQuestions: 40,
    color: 'orange'
  },
  {
    id: 'functional-streams',
    title: 'Functional & Streams In-Depth',
    description: 'LambdaMetafactory, Spliterators, Pipeline fusion, Custom collectors, Reactive streams & Flow',
    iconName: 'Workflow',
    totalQuestions: 40,
    color: 'teal'
  },
  {
    id: 'patterns-performance',
    title: 'Design Patterns & Performance',
    description: 'Double-checked locking, Bill Pugh, JMH microbenchmarks, Escape Analysis & Disruptor',
    iconName: 'Gauge',
    totalQuestions: 40,
    color: 'red'
  }
];
