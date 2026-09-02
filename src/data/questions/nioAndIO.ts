import { Question } from '../../types';

export const nioQuestions: Question[] = [
  {
    id: 241,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'What is the exact transition of `position`, `limit`, and `capacity` when calling `buffer.flip()` on a `ByteBuffer`?',
    codeSnippet: `ByteBuffer buf = ByteBuffer.allocate(1024);
buf.put((byte) 'H');
buf.put((byte) 'i');
buf.flip(); // What happens to position and limit?`,
    options: [
      'position becomes 0, limit is set to the old position (2), capacity remains unchanged (1024), preparing the buffer for reading',
      'position is set to 1024, limit is set to 0',
      'The buffer contents are inverted in reverse byte order',
      'position remains 2, limit becomes 1024'
    ],
    correctAnswer: 0,
    explanation: '`flip()` transitions a buffer from writing mode to reading mode. It sets `limit = position`, resets `position = 0`, and discards any marked position. This ensures subsequent `get()` operations read only the bytes that were just written.',
    tags: ['ByteBuffer', 'flip()', 'Buffer Mechanics', 'NIO']
  },
  {
    id: 242,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'How does Java NIO `Selector` multiplex I/O across thousands of `SocketChannel` connections on Linux under the hood?',
    options: [
      'It creates one OS thread per connection running a while-true polling loop',
      'It uses the Linux kernel `epoll` subsystem (`epoll_create`, `epoll_ctl`, `epoll_wait`), which registers file descriptors with the kernel and wakes up the Java thread only when I/O readiness events occur (O(1) complexity relative to idle connections)',
      'It reads socket buffers directly using DMA interrupts without kernel involvement',
      'It compiles sockets into shared memory segments'
    ],
    correctAnswer: 1,
    explanation: 'On Linux, HotSpot `Selector` implementation (`EPollSelectorImpl`) leverages the OS `epoll` system call. Rather than scanning thousands of file descriptors linearly ($O(N)$ like legacy `select`/`poll`), `epoll_wait` returns only the ready file descriptors in $O(1)$ time, allowing massive C10K scalability.',
    tags: ['Selector', 'epoll', 'I/O Multiplexing', 'Linux Kernel']
  },
  {
    id: 243,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'Why is `SelectionKey.OP_WRITE` rarely left registered continuously on a `Selector`?',
    options: [
      'Because writing sockets is forbidden in non-blocking mode',
      'Because TCP socket send buffers are almost always non-empty and ready for writing; continuously registering `OP_WRITE` causes `selector.select()` to return immediately with 100% CPU utilization in a busy loop',
      'Because OP_WRITE deletes data from the channel',
      'Because OP_WRITE cancels the SelectionKey'
    ],
    correctAnswer: 1,
    explanation: 'Under normal network conditions, the OS TCP output buffer has free space. If `OP_WRITE` remains registered, `selector.select()` will fire constantly. The standard pattern is to write directly first; if `channel.write()` returns fewer bytes than requested (buffer full), only then register `OP_WRITE` until remaining bytes are flushed, then unregister it.',
    tags: ['OP_WRITE', 'Selector', 'SelectionKey', 'Busy Loop']
  },
  {
    id: 244,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the purpose of `buffer.compact()` in Java NIO?',
    options: [
      'It compresses data using gzip algorithms',
      'It copies remaining unread bytes (between `position` and `limit`) to the beginning of the buffer (`index 0`), sets `position` after the last copied byte, and sets `limit = capacity`, preparing the buffer to accept new incoming writes without losing unread data',
      'It releases buffer memory back to the operating system',
      'It clears the entire buffer and resets all bytes to 0'
    ],
    correctAnswer: 1,
    explanation: 'When only part of a buffer is consumed, calling `compact()` shifts unread bytes to the beginning of the buffer, freeing the remainder of the buffer for subsequent channel `read()` calls without discarding partial messages.',
    tags: ['ByteBuffer', 'compact()', 'NIO']
  },
  {
    id: 245,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What is "Scattering Read" and "Gathering Write" in Java NIO channels?',
    codeSnippet: `ByteBuffer header = ByteBuffer.allocate(128);
ByteBuffer body   = ByteBuffer.allocate(1024);
ByteBuffer[] bufs = { header, body };
channel.read(bufs);  // Scattering read
channel.write(bufs); // Gathering write`,
    options: [
      'Reading and writing across multiple remote machines in parallel',
      'A scattering read reads bytes from a single channel into multiple buffers sequentially in an array; a gathering write writes bytes from multiple buffers into a single channel in one system call, avoiding data copying/stitching',
      'Scattering encrypts data; gathering decrypts data',
      'They are legacy methods replaced by streams'
    ],
    correctAnswer: 1,
    explanation: 'Scattering/Gathering allows transferring multiple buffers into/from a channel in a single vectorized kernel call (e.g. `readv`/`writev`). This separates protocol headers from payload bodies cleanly without manual concatenation overhead.',
    tags: ['Scattering Read', 'Gathering Write', 'Vectorized I/O']
  },
  {
    id: 246,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'How does `AsynchronousSocketChannel` in Java 7+ NIO.2 handle completion notifications?',
    options: [
      'By polling the socket in an infinite loop',
      'Either by returning a `Future<Integer>` representing the pending result, or by accepting a `CompletionHandler<Integer, Attachment>` callback invoked on a designated `AsynchronousChannelGroup` thread pool upon completion',
      'By sending an OS signal to the JVM process',
      'By converting socket data to HTTP/2'
    ],
    correctAnswer: 1,
    explanation: 'NIO.2 asynchronous channels use a proactive (Proactor) event model. When invoking `channel.read(buf, attachment, handler)`, the method returns immediately, and the OS/JVM schedules the `CompletionHandler.completed()` or `failed()` callback on an `AsynchronousChannelGroup` worker thread.',
    tags: ['AsynchronousSocketChannel', 'CompletionHandler', 'NIO.2', 'Proactor']
  },
  {
    id: 247,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the purpose of `java.nio.file.WatchService`?',
    options: [
      'To monitor JVM garbage collector pause times',
      'To register directories with the operating system file change notification service (e.g. inotify on Linux, kqueue on macOS) and receive events when files are created, modified, or deleted',
      'To verify antivirus definitions on downloaded files',
      'To track memory leaks in NIO channels'
    ],
    correctAnswer: 1,
    explanation: '`WatchService` is an NIO.2 file system event notification API. It hooks into native OS notification mechanisms (like Linux `inotify`) to watch directory paths for `ENTRY_CREATE`, `ENTRY_MODIFY`, and `ENTRY_DELETE` events efficiently without polling.',
    tags: ['WatchService', 'File Events', 'NIO.2', 'inotify']
  },
  {
    id: 248,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What is the difference between `channel.lock()` and `channel.tryLock()` in `FileChannel`?',
    options: [
      '`channel.lock()` locks the file in memory; `channel.tryLock()` locks it on disk',
      '`channel.lock()` blocks the calling thread until the file region lock is acquired; `channel.tryLock()` attempts acquisition non-blockingly, returning a `FileLock` if acquired or `null` if the lock is held by another process',
      '`tryLock()` is deprecated in Java 17',
      'Both throw an exception if the file exists'
    ],
    correctAnswer: 1,
    explanation: '`FileChannel.lock()` is a blocking call that waits until the OS grants the lock. `FileChannel.tryLock()` is non-blocking: it immediately returns the `FileLock` object or `null` if another process holds an overlapping lock.',
    tags: ['FileChannel', 'FileLock', 'Process Locking']
  },
  {
    id: 249,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'What is the infamous "NIO Epoll CPU 100% Bug" historically encountered in raw Java NIO, and how did frameworks like Netty work around it?',
    options: [
      'A bug where epoll allocates infinite heap memory',
      'A Linux kernel/JVM issue where an unexpected socket disconnect causes `epoll_wait` to return `Selector.select() == 0` immediately in an infinite loop without blocking; Netty works around it by counting consecutive zero-selects and rebuilding a fresh `Selector` while migrating keys',
      'A bug where CPU frequency drops to zero',
      'A bug that corrupts TCP sequence numbers'
    ],
    correctAnswer: 1,
    explanation: 'The epoll CPU 100% bug occurs when an unhandled event state causes `Selector.select()` to wake up repeatedly with 0 selected keys, spinning the thread at 100% CPU. Netty monitors select loop cycles: if hundreds of consecutive zero-returns occur, Netty automatically instantiates a new `Selector`, registers all existing channels, and closes the corrupted selector.',
    tags: ['Epoll Bug', 'Netty', 'Selector Rebuild', 'NIO Bug']
  },
  {
    id: 250,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'Why does `SocketChannel.configureBlocking(false)` need to be called before registering with a `Selector`?',
    options: [
      'To enable SSL encryption',
      'Because `Selector` registration requires channels to be in non-blocking mode; attempting to register a blocking channel throws an `IllegalBlockingModeException`',
      'To assign an IP address to the socket',
      'To increase network bandwidth'
    ],
    correctAnswer: 1,
    explanation: '`SelectableChannel.register()` explicitly enforces non-blocking behavior. Registering a channel that is still in default blocking mode immediately throws `java.nio.channels.IllegalBlockingModeException`.',
    tags: ['SocketChannel', 'Non-blocking', 'IllegalBlockingModeException']
  },
  {
    id: 251,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'How does `ByteBuffer.order(ByteOrder.LITTLE_ENDIAN)` affect multi-byte reads and writes (like `getInt()` or `putLong()`)?',
    options: [
      'It formats numbers as strings',
      'It configures byte layout: Big-Endian (default in Java, network order) stores the most significant byte at the lowest address; Little-Endian stores the least significant byte first, matching standard x86 CPU register layout',
      'It inverts the bits of every byte',
      'It encrypts integer fields'
    ],
    correctAnswer: 1,
    explanation: 'Java\'s native default byte order is Big-Endian (MSB first, network byte order). On Little-Endian CPU hardware (like x86/ARM), setting `buf.order(ByteOrder.LITTLE_ENDIAN)` allows reading binary protocols directly into multi-byte types without manual byte-swapping.',
    tags: ['ByteOrder', 'Endianness', 'ByteBuffer', 'Network Protocols']
  },
  {
    id: 252,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'What is the purpose of `FileChannel.force(boolean metadata)` in Java NIO?',
    options: [
      'It closes the file channel unconditionally',
      'It forces any updates written to the file (cached in the operating system page cache) to be flushed directly to physical persistent storage (similar to the POSIX `fsync()` system call)',
      'It deletes corrupted file sectors on disk',
      'It overrides read-only file permissions'
    ],
    correctAnswer: 1,
    explanation: '`force(boolean metaData)` ensures durability. By default, OS writes are buffered in OS kernel page caches. Calling `force(true)` issues an `fsync()` system call that flushes all buffered file contents and metadata (modification timestamps) to physical disk blocks.',
    tags: ['FileChannel.force', 'fsync', 'Durability', 'Page Cache']
  },
  {
    id: 253,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What does `DirectoryStream<Path>` offer over `File.listFiles()` in NIO.2?',
    options: [
      'DirectoryStream parses XML files inside directories',
      'DirectoryStream lazily iterates over directory contents as a stream without loading all child file objects into memory at once, preventing OutOfMemoryError when scanning directories containing millions of files',
      'DirectoryStream is faster because it encrypts paths',
      'DirectoryStream is restricted to 10 files maximum'
    ],
    correctAnswer: 1,
    explanation: 'Legacy `File.listFiles()` reads all file names into a single contiguous array on heap. For directories containing hundreds of thousands of files, this causes massive allocation spikes or OOM. `DirectoryStream` (and `Files.newDirectoryStream`) streams entries iteratively with constant memory.',
    tags: ['DirectoryStream', 'Files.newDirectoryStream', 'NIO.2']
  },
  {
    id: 254,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'How do you cleanly cancel and remove a `SelectionKey` from a `Selector`?',
    options: [
      'By calling `selectionKey.cancel()` which adds the key to the selector\'s cancelled-key set; the key is deregistered from the channel and removed from the selector during the next `select()` operation',
      'By throwing an IOException inside the select loop',
      'By setting the socket timeout to 0',
      'By deleting the Selector object'
    ],
    correctAnswer: 0,
    explanation: 'Invoking `key.cancel()` invalidates the key and puts it into the selector\'s cancelled-key set. During the subsequent `select()` operation, the selector purges all cancelled keys, closing channel registrations.',
    tags: ['SelectionKey', 'cancel()', 'Selector Lifecycle']
  },
  {
    id: 255,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'In Netty, what is the role of `ByteBuf` compared to Java standard `java.nio.ByteBuffer`?',
    options: [
      'ByteBuf is identical to ByteBuffer in every aspect',
      'ByteBuf separates reading and writing state into two independent indices (`readerIndex` and `writerIndex`), eliminating the error-prone need to call `flip()`, while supporting reference counting, buffer pooling (`PooledByteBufAllocator`), and zero-copy slicing/composite buffers',
      'ByteBuf only stores UTF-8 strings',
      'ByteBuf can only be used on 32-bit systems'
    ],
    correctAnswer: 1,
    explanation: 'Java\'s `ByteBuffer` uses a single index (`position`) requiring frequent `flip()`, `clear()`, `compact()` calls. Netty\'s `ByteBuf` provides separate `readerIndex` and `writerIndex`, reference counting (`retain()` / `release()`), memory pooling to eliminate GC, and `CompositeByteBuf` for zero-copy header/payload composition.',
    tags: ['Netty', 'ByteBuf', 'readerIndex', 'writerIndex', 'Buffer Pooling']
  },
  {
    id: 256,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the purpose of `StandardOpenOption.CREATE_NEW` when opening a file with NIO.2 `FileChannel` or `Files.newByteChannel`?',
    options: [
      'It creates a new file, and if the file already exists, it fails and throws a `FileAlreadyExistsException`, guaranteeing atomic creation',
      'It overwrites existing files silently',
      'It creates a temporary file in /tmp',
      'It creates an encrypted file'
    ],
    correctAnswer: 0,
    explanation: '`CREATE_NEW` ensures atomic file creation. If the target file already exists, it fails with `FileAlreadyExistsException` without altering the existing file, preventing race conditions in lock file creation.',
    tags: ['StandardOpenOption', 'CREATE_NEW', 'Atomic File Creation']
  },
  {
    id: 257,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What is `Pipe` in Java NIO (`java.nio.channels.Pipe`)?',
    options: [
      'A command line shell operator `|`',
      'A one-way point-to-point in-memory data channel consisting of a `Pipe.SinkChannel` (writable) and a `Pipe.SourceChannel` (readable), allowing thread-safe non-blocking byte transfers between threads in the same JVM',
      'A pipe to communicate across separate physical servers',
      'An audio streaming channel'
    ],
    correctAnswer: 1,
    explanation: '`java.nio.channels.Pipe` is an NIO construct that provides a unidirectional byte conduit within a single JVM. Data written to the `Pipe.SinkChannel` can be read from the `Pipe.SourceChannel` using standard non-blocking Selectors.',
    tags: ['Pipe', 'SinkChannel', 'SourceChannel', 'Inter-Thread Communication']
  },
  {
    id: 258,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'How does Netty\'s `ChannelPipeline` implement the Intercepting Filter pattern for handling inbound and outbound network events?',
    options: [
      'By executing all handlers in a single monolithic switch statement',
      'As a doubly-linked list of `ChannelHandlerContext` nodes where inbound events flow forward from `head` to `tail` (e.g. Decoder -> BusinessLogic), and outbound events flow backward from `tail` to `head` (e.g. BusinessLogic -> Encoder -> Socket write)',
      'By compiling handlers into native C++ shared objects',
      'By executing handlers in random order'
    ],
    correctAnswer: 1,
    explanation: '`ChannelPipeline` is a doubly-linked list of handlers. Inbound data (read from socket) traverses from Head -> Tail through `ChannelInboundHandler`s (decoding, business logic). Outbound requests (writing to socket) traverse from Tail -> Head through `ChannelOutboundHandler`s (encoding, packet flushing).',
    tags: ['Netty', 'ChannelPipeline', 'Inbound-Outbound', 'Architecture']
  },
  {
    id: 259,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What does `Path.resolve(String other)` do in the NIO.2 Path API?',
    codeSnippet: `Path base = Path.of("/var/log");
Path p1 = base.resolve("app.log");      // /var/log/app.log
Path p2 = base.resolve("/etc/passwd");  // /etc/passwd`,
    options: [
      'It deletes the target file',
      'If `other` is relative, it joins `other` against the base path; if `other` is absolute, it returns `other` directly, following standard path resolution semantics',
      'It converts paths to URL format',
      'It checks if the path exists on disk'
    ],
    correctAnswer: 1,
    explanation: '`Path.resolve()` resolves a path against another. If given a relative path, it appends it to `this`. If given an absolute path, it returns the absolute path directly.',
    tags: ['Path.resolve', 'NIO.2', 'Path Manipulation']
  },
  {
    id: 260,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'Why must you iterate and remove elements from `selector.selectedKeys().iterator()` using `iterator.remove()` during a select loop?',
    codeSnippet: `Set<SelectionKey> keys = selector.selectedKeys();
Iterator<SelectionKey> it = keys.iterator();
while (it.hasNext()) {
    SelectionKey key = it.next();
    it.remove(); // Why is this remove() mandatory?
    if (key.isReadable()) { ... }
}`,
    options: [
      'To prevent the JVM from running out of memory',
      'Because `selectedKeys()` only adds ready keys and does NOT automatically remove them; if not removed, the stale key remains in the set on the next loop iteration, causing repeated processing of already-handled events',
      'To close the underlying socket channel',
      'Because iterator.remove() flushes socket buffers'
    ],
    correctAnswer: 1,
    explanation: 'The `Selector` populates the `selectedKeys()` set with keys that became ready. The selector framework will never remove keys from this set automatically. If you do not call `it.remove()`, the key remains present in subsequent iterations, leading to phantom event processing.',
    tags: ['selectedKeys', 'iterator.remove', 'Selector Loop']
  },
  {
    id: 261,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'How does Netty achieve "Zero-Copy" using `CompositeByteBuf` and `ByteBuf.slice()`?',
    options: [
      'By reading data into Java Strings',
      'By providing virtual wrapper views over multiple existing ByteBufs (composite) or sub-sections (slice) without performing heap memory allocation or byte array copying in memory',
      'By disabling SSL encryption',
      'By executing sockets inside kernel space'
    ],
    correctAnswer: 1,
    explanation: '`CompositeByteBuf` merges multiple physical buffers (e.g. HTTP header + payload) into a single logical buffer view without allocating a contiguous array or copying bytes. `ByteBuf.slice()` shares the same underlying buffer with independent reader/writer indices.',
    tags: ['Netty', 'Zero-Copy', 'CompositeByteBuf', 'slice()']
  },
  {
    id: 262,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the difference between `DatagramChannel` and `SocketChannel` in Java NIO?',
    options: [
      '`DatagramChannel` is for UDP (connectionless, packet-oriented); `SocketChannel` is for TCP (connection-oriented, reliable stream)',
      '`DatagramChannel` is for files; `SocketChannel` is for databases',
      '`DatagramChannel` cannot be non-blocking',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: '`DatagramChannel` communicates over UDP using discrete datagram packets (`send()`, `receive()`). `SocketChannel` communicates over TCP with stream-oriented reliability and connection handshakes.',
    tags: ['DatagramChannel', 'SocketChannel', 'UDP vs TCP', 'NIO']
  },
  {
    id: 263,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What does `Files.walkFileTree(Path, FileVisitor)` provide in NIO.2?',
    options: [
      'It displays a 3D visualization of file directories',
      'A recursive directory traversal engine implementing the Visitor pattern (`preVisitDirectory`, `visitFile`, `visitFileFailed`, `postVisitDirectory`) with cycle detection and symbolic link options',
      'A tool for searching files in Git repositories',
      'A method to compress folders to ZIP archives'
    ],
    correctAnswer: 1,
    explanation: '`Files.walkFileTree()` performs depth-first recursive traversal of directory structures. Implementing `FileVisitor<Path>` allows fine-grained control to skip subtrees, delete files during traversal, or follow symbolic links.',
    tags: ['walkFileTree', 'FileVisitor', 'NIO.2', 'Directory Traversal']
  },
  {
    id: 264,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'What is the purpose of `AsynchronousChannelGroup` in Java NIO.2?',
    options: [
      'To group multiple socket addresses into a multicast cluster',
      'To encapsulate thread pool resources and OS event dispatcher bindings shared across multiple asynchronous channels (`AsynchronousSocketChannel`, `AsynchronousFileChannel`)',
      'To manage database transactions',
      'To encrypt group network messages'
    ],
    correctAnswer: 1,
    explanation: 'An `AsynchronousChannelGroup` binds an `ExecutorService` thread pool to handle I/O event completions. Creating a custom group allows dedicating specific thread counts or naming conventions to asynchronous I/O completion handlers.',
    tags: ['AsynchronousChannelGroup', 'NIO.2', 'Thread Pooling']
  },
  {
    id: 265,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What happens if a thread calls `buffer.mark()` followed later by `buffer.reset()` on a `ByteBuffer`?',
    options: [
      'All bytes in the buffer are deleted',
      '`buffer.reset()` sets the buffer\'s `position` back to the previously marked index recorded by `mark()`',
      'The buffer capacity is doubled',
      'The buffer is closed'
    ],
    correctAnswer: 1,
    explanation: '`mark()` records the current `position` index. Calling `reset()` restores `position` back to the marked position (or throws `InvalidMarkException` if no mark was set), enabling backtracking during stream parsing.',
    tags: ['ByteBuffer', 'mark()', 'reset()', 'NIO']
  },
  {
    id: 266,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'How do you configure a `SocketChannel` with TCP Keep-Alive and No-Delay (Nagle\'s algorithm disabled) using Java NIO standard socket options?',
    codeSnippet: `channel.setOption(StandardSocketOptions.TCP_NODELAY, true);
channel.setOption(StandardSocketOptions.SO_KEEPALIVE, true);`,
    options: [
      'By passing flags to the JVM compiler',
      'By calling `channel.setOption(...)` with `StandardSocketOptions.TCP_NODELAY` to disable Nagle\'s algorithm (minimizing packet latency for small messages) and `SO_KEEPALIVE` to probe idle connections',
      'By setting OS environment variables',
      'By modifying the /etc/sysctl.conf file'
    ],
    correctAnswer: 1,
    explanation: 'Java 7 standardized socket options via `StandardSocketOptions`. Setting `TCP_NODELAY = true` disables Nagle\'s algorithm buffering, sending packets immediately to minimize latency in real-time gaming or financial trading.',
    tags: ['StandardSocketOptions', 'TCP_NODELAY', 'Nagle Algorithm']
  },
  {
    id: 267,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'How does Netty\'s `EventLoopGroup` map to carrier platform threads and virtual threads in high-throughput network architectures?',
    options: [
      'Netty creates 10,000 threads per second',
      'Each `EventLoop` in Netty is a single-threaded executor assigned to handle I/O and pipeline callbacks for a dedicated slice of channels, eliminating cross-thread synchronization inside handlers; the number of event loops typically defaults to `2 * CPU cores`',
      'Netty executes all event loops in Metaspace',
      'Netty does not use threads'
    ],
    correctAnswer: 1,
    explanation: 'Netty uses the Reactor pattern: an `EventLoopGroup` contains N single-threaded `EventLoop`s. Each connected `Channel` is registered to exactly one `EventLoop` for its entire lifetime, guaranteeing that all channel handlers execute sequentially on that thread with zero locking.',
    tags: ['Netty', 'EventLoop', 'EventLoopGroup', 'Reactor Pattern']
  },
  {
    id: 268,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the return value of `channel.read(byteBuffer)` when the remote end of a `SocketChannel` has cleanly closed the connection (TCP FIN packet received)?',
    options: [
      '0',
      '-1',
      'Throws a SocketException immediately',
      'Returns the buffer capacity'
    ],
    correctAnswer: 1,
    explanation: 'When the remote peer closes the TCP socket cleanly, `channel.read()` returns `-1` (end of stream). Applications must check `if (bytesRead == -1)` and close their local channel cleanly.',
    tags: ['SocketChannel', 'End of Stream', 'TCP FIN', 'NIO']
  },
  {
    id: 269,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What is the difference between `Files.lines(Path)` and `Files.readAllLines(Path)`?',
    options: [
      '`Files.lines()` returns a lazy `Stream<String>` that reads lines on-demand (must be closed in try-with-resources); `Files.readAllLines()` reads all lines into an in-memory `List<String>` at once, risking OOM for large files',
      '`Files.lines()` is for binary files; `Files.readAllLines()` is for text files',
      '`Files.readAllLines()` is asynchronous',
      'Both have identical memory footprints'
    ],
    correctAnswer: 0,
    explanation: '`Files.lines(path)` creates a lazy `Stream<String>` backed by an underlying file channel, reading lines on-the-fly with minimal memory. `Files.readAllLines()` loads the entire file into a `List<String>` on heap, which can cause `OutOfMemoryError` on large logs.',
    tags: ['Files.lines', 'Files.readAllLines', 'Stream I/O', 'Memory Efficiency']
  },
  {
    id: 270,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'How do you wake up a `Selector` that is currently blocked inside a `selector.select()` call from another thread?',
    options: [
      'By sending a POSIX SIGKILL signal to the JVM',
      'By invoking `selector.wakeup()`, which writes a byte to an internal loopback pipe, unblocking the select call immediately',
      'By calling `Thread.stop()`',
      'By closing the operating system network adapter'
    ],
    correctAnswer: 1,
    explanation: '`selector.wakeup()` causes the first selection operation that has not yet returned to return immediately. Under the hood, HotSpot writes a byte to a self-pipe or eventfd descriptor monitored by the selector, waking the polling loop.',
    tags: ['Selector.wakeup', 'Non-blocking I/O', 'Concurrency']
  },
  {
    id: 271,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the purpose of `ByteBuffer.asReadOnlyBuffer()`?',
    options: [
      'It converts a buffer into a String',
      'It creates a new read-only `ByteBuffer` sharing the same backing data and capacity, but whose mutative methods (`put()`, `compact()`) throw `ReadOnlyBufferException`',
      'It encrypts the buffer content',
      'It deletes the buffer from memory'
    ],
    correctAnswer: 1,
    explanation: '`asReadOnlyBuffer()` returns a view of the original buffer with independent position/limit pointers. Any attempt to modify the buffer content through this view throws `ReadOnlyBufferException`, protecting data integrity across API boundaries.',
    tags: ['ByteBuffer', 'asReadOnlyBuffer', 'Immutability']
  },
  {
    id: 272,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What is the function of `FileChannel.truncate(long size)`?',
    options: [
      'Deletes the file permanently',
      'Truncates the underlying file to the specified size in bytes, discarding any content beyond `size`',
      'Splits the file into smaller chunks',
      'Compresses the file size'
    ],
    correctAnswer: 1,
    explanation: '`FileChannel.truncate(size)` shrinks the file to the given size. If the given size is smaller than current file length, all bytes past `size` are discarded by the OS filesystem.',
    tags: ['FileChannel.truncate', 'NIO', 'File Operations']
  },
  {
    id: 273,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'How does Netty\'s `PooledByteBufAllocator` prevent memory fragmentation using jemalloc-inspired allocation algorithms?',
    options: [
      'By allocating buffers exclusively on the Java heap',
      'By organizing memory into Arenas, ChunkLists, Chunks (typically 16MB), Pages (8KB), and Sub-pages (PoolSubpage), allocating and reusing memory blocks via bitmasks and binary trees without OS malloc/free churn',
      'By delegating memory allocation to Redis',
      'By running a custom garbage collector thread'
    ],
    correctAnswer: 1,
    explanation: 'Netty\'s pooled allocator adopts the `jemalloc` architecture: memory is partitioned into thread-local Arenas, Chunks, and Pages. Tiny and Small allocations are serviced from pre-allocated sub-page pools, delivering sub-microsecond buffer acquisition and zero GC overhead.',
    tags: ['Netty', 'PooledByteBufAllocator', 'jemalloc', 'Memory Pooling']
  },
  {
    id: 274,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the default initial value of `position` and `limit` in a freshly allocated `ByteBuffer.allocate(100)`?',
    options: [
      'position = 0, limit = 100, capacity = 100',
      'position = 100, limit = 100, capacity = 100',
      'position = 0, limit = 0, capacity = 100',
      'position = 0, limit = 50, capacity = 100'
    ],
    correctAnswer: 0,
    explanation: 'A newly allocated buffer starts in write mode with `position = 0`, `limit = capacity` (100 in this case), allowing bytes to be written up to the full buffer capacity.',
    tags: ['ByteBuffer', 'Buffer State', 'NIO']
  },
  {
    id: 275,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'What is `java.nio.charset.CharsetEncoder` and `CodingErrorAction` in NIO character decoding/encoding?',
    options: [
      'An encryption library for SSL certificates',
      'An engine that transforms Unicode characters into bytes, allowing explicit configuration for handling malformed or unmappable characters via `onMalformedInput(CodingErrorAction.REPLACE | IGNORE | REPORT)`',
      'A parser for JSON tokens',
      'A bytecode compiler'
    ],
    correctAnswer: 1,
    explanation: '`CharsetEncoder` provides fine-grained control when converting char sequences to byte buffers. `CodingErrorAction` dictates whether unmappable characters trigger an exception (`REPORT`), are skipped (`IGNORE`), or replaced with a fallback replacement string (`REPLACE`).',
    tags: ['CharsetEncoder', 'CodingErrorAction', 'Unicode', 'NIO']
  },
  {
    id: 276,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'What is "Backpressure" in reactive network streams and how is it managed across TCP sockets in Java NIO?',
    options: [
      'Applying high air pressure to server cooling fans',
      'A mechanism where a slow consumer signals the producer to slow down; at the TCP level, if the receiver stops reading from `SocketChannel`, the OS TCP Receive Window (RWIN) shrinks to zero, forcing the sender\'s TCP stack and `channel.write()` to block/pause',
      'Encrypting socket packets with back-propagation algorithms',
      'Dropping packets randomly when CPU utilization exceeds 90%'
    ],
    correctAnswer: 1,
    explanation: 'Backpressure ensures fast producers do not overwhelm slow consumers. At the transport level, when a Java consumer stops calling `channel.read()`, the OS TCP receive window fills and advertises window size 0 (Zero Window), causing the sender\'s TCP stack to halt data transmission naturally.',
    tags: ['Backpressure', 'TCP Flow Control', 'Reactive Streams', 'NIO']
  },
  {
    id: 277,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the purpose of `Path.relativize(Path other)` in NIO.2?',
    codeSnippet: `Path p1 = Path.of("/a/b");
Path p2 = Path.of("/a/b/c/d.txt");
Path rel = p1.relativize(p2); // What is rel?`,
    options: [
      '`c/d.txt` (the relative path from p1 to p2)',
      '`/a/b/c/d.txt`',
      '`../../c/d.txt`',
      '`d.txt`'
    ],
    correctAnswer: 0,
    explanation: '`p1.relativize(p2)` computes the relative path that, when resolved against `p1`, yields `p2`. In this example, navigating from `/a/b` to `/a/b/c/d.txt` produces `c/d.txt`.',
    tags: ['Path.relativize', 'NIO.2', 'Path Operations']
  },
  {
    id: 278,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Expert',
    question: 'Why does `Files.copy(source, target, StandardCopyOption.ATOMIC_MOVE)` fail if source and target reside on different physical disk mounts/filesystems?',
    options: [
      'Because atomic moves are restricted to text files',
      'Because an atomic rename/move is implemented via the OS `rename()` system call (updating directory inode pointers); across different filesystem mount points, data must be copied byte-by-byte which cannot be guaranteed atomic by the kernel',
      'Because Java requires root privileges for cross-disk copies',
      'Because ATOMIC_MOVE requires network connectivity'
    ],
    correctAnswer: 1,
    explanation: '`ATOMIC_MOVE` relies on filesystem metadata pointer updates (`rename()` syscall). Moving files across separate disk partitions requires physical data copying and deletion, which is non-atomic and throws `AtomicMoveNotSupportedException`.',
    tags: ['ATOMIC_MOVE', 'Files.copy', 'Filesystem Inodes', 'NIO.2']
  },
  {
    id: 279,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Master',
    question: 'What is a "Memory Barrier" requirement when sharing a DirectByteBuffer across multiple worker threads in off-heap network pipelines?',
    options: [
      'Memory barriers are not required for DirectByteBuffers because native memory is outside the JVM',
      'Because direct memory writes are not automatically tracked by JMM variable barriers, synchronization, volatile fences, or VarHandle release/acquire operations are necessary to ensure CPU store buffers flush writes to shared off-heap addresses before other threads read them',
      'Memory barriers are only needed on 32-bit JVMs',
      'Direct buffers must be locked with OS mutexes on every single byte read'
    ],
    correctAnswer: 1,
    explanation: 'Native memory modifications via DirectByteBuffers bypass standard Java heap field write barriers. To ensure another thread on a different CPU core observes modified off-heap bytes, an explicit memory fence (`VarHandle.releaseFence()` or volatile flag publication) is required.',
    tags: ['DirectByteBuffer', 'Memory Ordering', 'Concurrency', 'Off-Heap']
  },
  {
    id: 280,
    category: 'nio-io',
    categoryTitle: 'NIO & Asynchronous Networking',
    difficulty: 'Advanced',
    question: 'What is the purpose of `ByteBuffer.rewind()` in Java NIO?',
    options: [
      'It deletes the buffer contents',
      'It sets `position = 0` while leaving `limit` unchanged, allowing the buffer to be re-read from the beginning',
      'It inverts the byte endianness',
      'It allocates a new buffer'
    ],
    correctAnswer: 1,
    explanation: '`rewind()` sets `position = 0` and discards the mark without modifying `limit`. This is useful when you want to re-read or re-write the exact same buffer data (e.g. re-transmitting a packet).',
    tags: ['ByteBuffer', 'rewind()', 'NIO']
  }
];
