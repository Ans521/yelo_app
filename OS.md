# Operating Systems — From Scratch to Interview-Ready

> Tier B interview-grade OS notes. Starts from "what is a thread / process" and goes deep enough for JPMC, Visa, PayPal, Razorpay, Goldman, MS interviews.

---

## Timeline — All 6 Fundamentals Files

This is the schedule for completing **all 6 reference files** as per `PREP_PLAN.md`:

| # | File | Start (calendar) | Finish by | Plan Month |
|---|------|------------------|-----------|------------|
| 1 | **OS.md** | May 2026 | **End of July 2026** | Months 1–2 |
| 2 | **DBMS.md** | July 2026 | **End of August 2026** | Months 2–3 |
| 3 | **LLD.md** (one design per month) | July 2026 | **End of November 2026** | Months 2–6 |
| 4 | **CN.md** | September 2026 | **End of September 2026** | Month 4 |
| 5 | **OOP.md** | October 2026 | **End of October 2026** | Month 5 |
| 6 | **HLD.md** | November 2026 | **End of December 2026** | Months 6–7 |

**Hard deadline: all 6 files completed and revised by Jan 2027 (Plan Month 8).** This is when applications begin, and you must have all fundamentals at 7/10+ for OAs/interviews.

**OS specifically:** Plan Month 1 covers Part 1–4 of this doc. Plan Month 2 covers Part 5–9. By end of July 2026, all of OS.md should be solid.

---

## How to use this doc

Each topic has 5 layers:
1. **What is it?** (plain English, 1 line)
2. **Why does it exist?** (problem it solves)
3. **How does it work?** (mechanism)
4. **Interview-grade detail** (what they quiz)
5. **Common interview Q&A** (memorize these)

**Reading strategy:** Don't try to memorize. Read once, then re-read 7 days later, then re-read 30 days later. Spaced repetition wins.

**Interview prep strategy:** After finishing this doc, do mock OS interviews — get a friend to ask 10 questions from the Q&A bank, answer aloud. You'll find what you don't really understand fast.

---

# PART 1: WHAT IS AN OPERATING SYSTEM

## 1.1 What is an OS?

An OS is a **program that manages computer hardware and provides services to other programs**. It sits between your apps (Chrome, VSCode, Spotify) and the actual hardware (CPU, RAM, disk).

When you double-click an icon, you don't talk to the CPU directly — you ask the OS, and the OS talks to the CPU.

**Examples:** Windows, macOS, Linux, Android, iOS.

## 1.2 Why does the OS exist?

Without an OS:
- Every program would have to know how to talk to every brand of CPU, every disk type, every keyboard.
- Two programs couldn't run at the same time without conflicting over RAM or CPU.
- Security would be impossible — any program could read any other program's memory.

The OS solves these by being a **middleman + manager + bouncer**.

## 1.3 Core jobs of an OS

| Job | What it means |
|-----|----------------|
| **Process management** | Runs programs, switches between them, tracks them |
| **Memory management** | Decides which program gets which RAM, prevents conflicts |
| **File management** | Reads/writes files, manages folders, tracks free space |
| **Device management** | Talks to printer, mouse, network card, etc. |
| **Security** | Permissions, user accounts, isolation |

## 1.4 Kernel vs User Mode

The CPU has two privilege levels:
- **Kernel mode** (a.k.a. supervisor mode, ring 0): Full hardware access. Only the OS kernel runs here.
- **User mode** (ring 3): Limited access. Your apps run here.

Why two modes? **Safety.** A buggy app in user mode can crash itself but can't crash the OS or other apps. To do anything privileged (read a file, send network packet), the app makes a **system call** that switches CPU into kernel mode, OS does the work, switches back.

## 1.5 System Calls

A **system call** is the API the OS exposes to user programs. Examples:
- `read()`, `write()` — file I/O
- `fork()`, `exec()` — create new process
- `socket()`, `connect()` — networking
- `mmap()` — memory mapping

When you call `printf("hi")` in C, it eventually calls `write()`, which is a system call → CPU switches to kernel mode → OS writes to terminal → returns.

**Interview Q:** *"What happens when a system call is made?"*
> CPU switches from user mode to kernel mode via a software interrupt (trap), saves user context, executes kernel code for the requested operation, returns to user mode, restores context, and resumes user program.

---

# PART 2: PROCESSES

## 2.1 What is a process?

A **process is a running instance of a program**.

- A program is a file on disk (e.g., `chrome.exe`).
- A process is that program loaded into memory and being executed.
- You can have **multiple processes from the same program** — open Chrome 3 times, you have 3 Chrome processes.

## 2.2 Process vs Program

| Program | Process |
|---------|---------|
| Static (file on disk) | Active (running in memory) |
| Passive | Dynamic |
| One file | Can have many instances |

## 2.3 Process Memory Layout

A process's memory is divided into segments:

```
+-------------------+  HIGH addresses
|      Stack        |  (grows down) — function calls, local variables
+-------------------+
|       ↓           |
|                   |
|       ↑           |
+-------------------+
|       Heap        |  (grows up) — dynamic memory (malloc, new)
+-------------------+
|       Data        |  (BSS + initialized data) — global/static variables
+-------------------+
|       Text        |  (code segment) — the actual program instructions
+-------------------+  LOW addresses
```

- **Text segment** — read-only, the compiled machine code
- **Data segment** — initialized globals, BSS holds zero-initialized
- **Heap** — runtime-allocated memory (`malloc`, `new`); grows upward
- **Stack** — function calls, local variables; grows downward

When stack and heap collide → stack overflow / out of memory.

## 2.4 Process States

A process during its lifetime moves through states:

```
   +------+   admit    +-------+   schedule   +---------+
   | New  | ---------> | Ready | -----------> | Running |
   +------+            +-------+              +---------+
                         ^   ^                   |  |
                         |   | I/O completes     |  |
                         |   |                   |  |
                    +----+   +----+ I/O wait     |  |
                    |             |              v  |
                    |        +----------+        +-----------+
                    |        | Waiting  |<-------|  Running  |
                    |        +----------+        +-----------+
                    |                                |
                    |          terminate             |
                    +--------+ Terminated <----------+
```

- **New** — being created
- **Ready** — waiting in queue for CPU
- **Running** — currently executing on CPU
- **Waiting** (a.k.a. Blocked) — waiting for I/O or event
- **Terminated** — finished

## 2.5 Process Control Block (PCB)

For every process, OS maintains a **PCB** — a struct containing:
- Process ID (PID)
- Process state (running, ready, etc.)
- Program counter (next instruction to execute)
- CPU registers (saved when context-switched out)
- Memory limits (text, data, stack pointers)
- Open file list
- I/O status
- Priority
- Parent PID

When OS context-switches, it saves current CPU state into PCB, loads next process's PCB into CPU.

## 2.6 Context Switch

A **context switch** is when the OS suspends one process and resumes another.

Steps:
1. Save current process's CPU registers + PC into its PCB
2. Update its state (running → ready/waiting)
3. Pick next process from ready queue
4. Load its PCB into CPU registers
5. Resume execution

**Cost:** Context switches are expensive (microseconds). Too many = wasted CPU. Modern OSes minimize them.

## 2.7 Process Creation: fork() and exec()

In Unix/Linux:
- **fork()** creates a new process by **copying the current one**. After `fork()`, you have parent + child, both running.
- **exec()** replaces the current process's memory with a new program (without changing PID).

**Pattern:** parent calls `fork()` → child calls `exec("ls")` → parent waits → child runs `ls`, exits → parent continues.

## 2.8 Inter-Process Communication (IPC)

Processes are **isolated by design** — Process A can't read Process B's memory directly. To share data, OS provides:

| IPC method | What | When to use |
|------------|------|-------------|
| **Pipe** | One-way byte stream | Parent-child communication |
| **Named pipe (FIFO)** | Pipe with a name | Unrelated processes on same machine |
| **Shared memory** | Mapped region both can access | Fastest, but needs sync |
| **Message queue** | OS-managed queue of messages | Discrete messages |
| **Socket** | Network-style connection | Local or networked |
| **Signal** | Async notification (SIGINT, etc.) | Event signaling |

## 2.9 Zombie and Orphan Processes

- **Zombie:** Child finished, but parent hasn't called `wait()` to read exit status. PCB still in OS table.
- **Orphan:** Parent died before child. OS adopts orphan to `init` (PID 1).

---

## Interview Q&A — Processes

**Q1: Difference between a program and a process?**
> Program = static file on disk. Process = running instance of program in memory. One program → many processes.

**Q2: What's stored in a PCB?**
> PID, state, program counter, CPU registers, memory limits, open files, I/O status, priority, parent PID. OS uses it to context-switch.

**Q3: What happens during a context switch?**
> Save current process's CPU state into its PCB → pick next process from ready queue → load its PCB into CPU → resume. Cost: microseconds, so frequent switches hurt performance.

**Q4: What are the process states?**
> New, Ready, Running, Waiting (blocked), Terminated. Ready ↔ Running via scheduler. Running → Waiting on I/O.

**Q5: Difference between fork() and exec()?**
> fork() duplicates current process (creates child). exec() replaces current process's memory with a new program. Common pattern: fork() → child calls exec().

**Q6: What is a zombie process?**
> A process that has finished execution but its parent hasn't read its exit status with wait(). PCB stays around — wastes a PID.

---

# PART 3: THREADS

## 3.1 What is a thread?

A **thread is a unit of execution within a process**. Multiple threads in the same process **share memory** but each has its own:
- Program counter
- Stack
- CPU registers

Think of a process as a house, threads as people in that house — they share the kitchen and living room (heap, code, data) but each has their own bed and notebook (stack, registers).

## 3.2 Why do threads exist?

**To do multiple things in one program.**

Examples:
- A web browser: one thread renders the page, another downloads images, another runs JavaScript.
- A web server: one thread per incoming HTTP request.

Without threads, you'd need separate processes for each task. Threads are cheaper because they share memory.

## 3.3 Process vs Thread (THE most common interview question)

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Has its own memory space | Shares memory with siblings in same process |
| Creation cost | Expensive (new memory, new PCB) | Cheap (just a stack + registers) |
| Context switch cost | Expensive (TLB flush, MMU change) | Cheap |
| Communication | Needs IPC (pipe, shm, etc.) | Direct memory access (just shared variables) |
| Crash impact | Crash isolates to one process | Crash one thread → can crash whole process |
| Use case | Isolation, security | Parallelism within one task |

## 3.4 User-level vs Kernel-level Threads

**Kernel-level threads:** OS knows about each thread. OS schedules each thread independently. Real parallelism on multi-core. Examples: Linux pthreads, Windows threads.

**User-level threads:** Implemented by a library at user level. OS sees only one thread. Cheap to create/switch but no real parallelism if blocked. Examples: green threads, fibers.

**Hybrid (M:N model):** Many user threads mapped to fewer kernel threads. Used in Go (goroutines), Erlang.

## 3.5 Multithreading Models

| Model | Mapping | Example |
|-------|---------|---------|
| 1:1 | One user thread = one kernel thread | Linux, Windows |
| M:1 | Many user threads = 1 kernel thread | Old Java green threads |
| M:N | Many user threads to many kernel threads | Go (goroutines), Erlang |

## 3.6 Why threads share memory

In a process:
- **Code segment** — shared (everyone runs same instructions)
- **Heap** — shared (one shared malloc area)
- **Data segment** — shared (one set of globals)
- **Stack** — **NOT shared** (each thread has its own)
- **Registers + PC** — **NOT shared** (each thread has its own)

This is why threads can pass data via shared variables, but it also creates **race conditions** (Part 5).

## 3.7 When to use threads vs processes

| Use threads when | Use processes when |
|-------------------|---------------------|
| Tasks need to share data heavily | Tasks are independent |
| Need cheap concurrency | Need isolation |
| One-app concurrency (web server) | Crash should not kill siblings |
| Multi-core CPU usage | Security boundary needed |

---

## Interview Q&A — Threads

**Q1: Difference between process and thread?**
> Process has its own memory space; thread shares memory with siblings in same process. Threads are cheaper to create and context-switch. Threads communicate via shared variables; processes need IPC.

**Q2: Can threads have their own memory?**
> Each thread has its own stack and registers (and PC). Heap, code, data segments are shared with siblings.

**Q3: What is a kernel thread vs user thread?**
> Kernel thread is managed by OS — OS schedules it. User thread is managed by a user-level library — OS sees only the parent process. Kernel threads support real parallelism on multi-core; pure user threads don't.

**Q4: If one thread crashes, does the process die?**
> Usually yes — uncaught exception in any thread typically terminates the whole process (depends on language/runtime). This is why crash isolation needs separate processes.

**Q5: What is multithreading?**
> Running multiple threads concurrently within a single process to do tasks in parallel — improves throughput, responsiveness, and resource utilization.

**Q6: What's the cost of context switching for threads vs processes?**
> Threads: cheap (only stack + registers swap). Processes: expensive (also flush TLB, change MMU mappings, possibly cache flush).

---

# PART 4: CPU SCHEDULING

## 4.1 Why scheduling exists

Multiple processes / threads are ready, but CPU has a fixed number of cores. The **scheduler** picks which process runs next on each core. Goal: be fair, fast, and responsive.

## 4.2 Preemptive vs Non-preemptive

- **Non-preemptive:** Once a process gets CPU, it keeps it until it voluntarily releases (finishes or blocks on I/O). E.g., FCFS, non-preemptive SJF.
- **Preemptive:** OS can forcibly take CPU away (e.g., timer interrupt). E.g., Round Robin, preemptive SJF.

Modern OSes use preemptive scheduling (otherwise one bad process could hog the CPU).

## 4.3 Scheduling Criteria

| Metric | Goal | What it measures |
|--------|------|------------------|
| **CPU utilization** | High (~100%) | Fraction of time CPU is busy |
| **Throughput** | High | Processes completed per unit time |
| **Turnaround time** | Low | Total time from arrival to completion |
| **Waiting time** | Low | Time in ready queue (not running, not waiting on I/O) |
| **Response time** | Low | Time from arrival to first CPU burst (matters for interactive systems) |

Different workloads optimize different metrics.

## 4.4 Scheduling Algorithms

### 4.4.1 First-Come, First-Served (FCFS)

**How:** Whoever arrives first runs first. Non-preemptive.

**Pros:** Simple, fair in arrival order.
**Cons:** **Convoy effect** — one long job at front blocks all short jobs. Poor average waiting time.

**Example:**
| Process | Arrival | Burst |
|---------|---------|-------|
| P1 | 0 | 24 |
| P2 | 1 | 3 |
| P3 | 2 | 3 |

Order: P1 (0–24), P2 (24–27), P3 (27–30). Avg wait = (0 + 23 + 25) / 3 = 16.

### 4.4.2 Shortest Job First (SJF)

**How:** Pick the process with the shortest next CPU burst. Can be preemptive or not.

**Pros:** Provably optimal for average waiting time.
**Cons:** Need to know burst times (predicted via exponential averaging in practice). **Starvation** of long jobs.

### 4.4.3 Priority Scheduling

**How:** Each process has priority; highest priority runs first. Can be preemptive or not.

**Cons:** **Starvation** of low-priority processes.
**Solution:** **Aging** — gradually increase priority of waiting processes.

### 4.4.4 Round Robin (RR)

**How:** Each process gets a fixed **time quantum** (e.g., 10 ms). After quantum expires, it's preempted, sent to back of ready queue. Cycle repeats.

**Pros:** Fair, good response time. Used in interactive systems.
**Cons:** Quantum too small → too many context switches. Quantum too large → behaves like FCFS.

### 4.4.5 Multilevel Queue

**How:** Multiple ready queues (e.g., system, interactive, batch). Each queue has its own algorithm. Higher-priority queues run first.

**Cons:** Inflexible — process is permanently assigned to a queue.

### 4.4.6 Multilevel Feedback Queue (MLFQ)

**How:** Multiple queues; processes can move between queues based on behavior.
- New process starts in highest-priority queue.
- If it uses full quantum (CPU-bound), demote to lower queue.
- If it gives up CPU early (I/O-bound), keep/promote.

**Pros:** Adapts dynamically. **Used in real systems** (Linux CFS uses a similar idea).
**Cons:** Complex to tune.

## 4.5 Convoy Effect

When short processes are stuck behind one long process. FCFS is the classic example. Solutions: SJF, RR, priority scheduling.

## 4.6 Starvation and Aging

**Starvation:** A process never gets CPU because higher-priority processes keep arriving.
**Aging:** Periodically increase priority of waiting processes — eventually they become high enough to run.

---

## Interview Q&A — Scheduling

**Q1: Compare FCFS, SJF, Round Robin.**
> FCFS: simple, fair, but convoy effect. SJF: optimal avg wait, but needs predicted burst, and starvation possible. RR: fair, good response time, used interactively.

**Q2: What is starvation? How to prevent?**
> A process never gets CPU due to higher-priority processes. Prevent via **aging** — gradually raise priority of waiting processes.

**Q3: Difference between preemptive and non-preemptive scheduling?**
> Non-preemptive: process holds CPU until it finishes or blocks. Preemptive: OS can forcibly take CPU back (typically on timer interrupt or higher-priority arrival). Modern OSes are preemptive.

**Q4: What is the convoy effect?**
> In FCFS, when a long CPU-bound process is at the head, all short I/O-bound processes wait — wasting CPU on the slow one and starving fast ones.

**Q5: What is the time quantum and how do we pick it?**
> Time quantum is the max time a process runs before being preempted in RR. Too small → too many context switches (overhead). Too large → behaves like FCFS. Typical: 10–100 ms.

**Q6: How does Linux scheduler work? (advanced)**
> Linux uses **CFS (Completely Fair Scheduler)**, a variant of MLFQ. Tracks "virtual runtime" per process; always runs the one with lowest vruntime. Effectively gives each process an equal time slice over time.

---

# PART 5: PROCESS SYNCHRONIZATION

## 5.1 Why synchronization is needed

When multiple threads share data, they can corrupt it if updates aren't synchronized.

**Example (race condition):**
```
counter = 0
Thread A: counter = counter + 1  →  reads 0, computes 1, writes 1
Thread B: counter = counter + 1  →  reads 0, computes 1, writes 1
```

If both reads happen before either write, final counter = 1 (not 2). This is a **race condition**.

## 5.2 Critical Section

A **critical section** is the part of code that accesses shared data.

Solution requirements:
1. **Mutual exclusion** — only one thread in critical section at a time.
2. **Progress** — if no one is in CS, threads waiting can enter without indefinite delay.
3. **Bounded waiting** — there's a limit on how many times others can enter before you do.

## 5.3 Mutex (Mutual Exclusion Lock)

A **mutex** is a binary lock — only one thread can hold it at a time.

```
mutex.lock()
// critical section
mutex.unlock()
```

If another thread tries `lock()` while held, it blocks until released.

## 5.4 Semaphore

A **semaphore** is a counter with two atomic operations:
- `wait()` (or P, `acquire`): if counter > 0, decrement and proceed; else block.
- `signal()` (or V, `release`): increment counter; if any thread waiting, wake one.

**Binary semaphore (counter ∈ {0, 1})** ≈ mutex.
**Counting semaphore** allows up to N concurrent accesses (e.g., resource pool of N items).

## 5.5 Mutex vs Semaphore

| Mutex | Semaphore |
|-------|-----------|
| Binary (locked/unlocked) | Counter (0 to N) |
| Has ownership (only locker can unlock) | No ownership (any thread can signal) |
| For mutual exclusion | For signaling and counting resources |

## 5.6 Monitor

A **monitor** is a high-level construct: an object with methods that automatically enforce mutual exclusion. Used in Java (`synchronized`), C# (`lock`).

```java
synchronized(obj) {
    // only one thread here at a time
}
```

Internally uses a mutex.

## 5.7 Classic Synchronization Problems

### 5.7.1 Producer-Consumer (Bounded Buffer)

**Problem:** Producer produces items into a fixed-size buffer; Consumer takes items out. Must handle empty/full buffer.

**Solution:**
- Mutex for buffer access
- Counting semaphore `empty` (initial = N) — count of empty slots
- Counting semaphore `full` (initial = 0) — count of filled slots

```
Producer:
  empty.wait()       // wait for an empty slot
  mutex.lock()
  add item to buffer
  mutex.unlock()
  full.signal()      // notify consumer

Consumer:
  full.wait()        // wait for a filled slot
  mutex.lock()
  remove item
  mutex.unlock()
  empty.signal()     // notify producer
```

### 5.7.2 Readers-Writers

**Problem:** Multiple readers can read simultaneously, but writers need exclusive access.

**First R-W (readers preference):** No reader waits unless a writer is already writing. Writers may starve.
**Second R-W (writers preference):** Once a writer is waiting, no new readers can start. Readers may starve.
**Fair R-W:** Use queueing.

### 5.7.3 Dining Philosophers

5 philosophers sit at a round table with 5 forks. Each needs 2 forks (left + right) to eat. Naive solution → deadlock (everyone picks up left fork, waits forever for right).

**Solutions:**
- Allow at most 4 to try at once
- Pick up both forks atomically
- Asymmetric: odd philosophers pick left first, even pick right first

## 5.8 Peterson's Algorithm (Software Solution)

For 2-thread mutual exclusion without hardware support:

```
flag[2] = {false, false}
turn = 0

Thread i (i = 0 or 1):
    flag[i] = true
    turn = 1 - i
    while (flag[1-i] && turn == 1-i) {}  // busy wait
    // critical section
    flag[i] = false
```

Satisfies mutual exclusion + progress + bounded waiting. Mostly historical interest now (modern hardware provides atomic instructions).

## 5.9 Hardware Synchronization Primitives

- **Test-and-Set (TAS):** Atomically read a memory location and set to 1.
- **Compare-and-Swap (CAS):** Atomically: if memory == expected, set to new. Returns success.

These are the building blocks of all modern locks.

---

## Interview Q&A — Synchronization

**Q1: What is a race condition?**
> When two or more threads access shared data and the result depends on the timing of their execution. Causes data corruption / inconsistency.

**Q2: Difference between mutex and semaphore?**
> Mutex: binary, has ownership (only locker can unlock), used for mutual exclusion. Semaphore: counter, no ownership, used for signaling and counting resources. Binary semaphore can act like mutex but lacks ownership.

**Q3: What is a deadlock? (Detailed in Part 6.)**
> When two or more threads block forever, each waiting for a resource the other holds.

**Q4: Explain Producer-Consumer problem.**
> Producer produces items, consumer consumes; shared bounded buffer. Solved with two counting semaphores (empty + full) and a mutex for the buffer.

**Q5: What is `synchronized` in Java? How does it work?**
> Implements a monitor — wraps a method or block in implicit mutex on the object's monitor lock. Only one thread can hold the lock at a time. Uses Java's intrinsic locks, backed by OS mutex underneath.

**Q6: What is a spinlock?**
> A lock where threads "spin" (busy-wait) instead of blocking. Useful when contention is brief and context-switch cost is higher than spin time. Bad for long waits — wastes CPU.

---

# PART 6: DEADLOCK

## 6.1 What is a deadlock?

Two or more processes block forever, each waiting for a resource held by another.

**Classic example:** P1 holds A, wants B. P2 holds B, wants A. Neither can proceed.

## 6.2 Coffman Conditions (all 4 must hold for deadlock)

1. **Mutual Exclusion:** At least one resource held in non-shareable mode.
2. **Hold and Wait:** Process holds at least one resource and is waiting for another.
3. **No Preemption:** Resources can't be forcibly taken away — must be released voluntarily.
4. **Circular Wait:** A cycle of processes each waiting for the next.

If you break any one → no deadlock.

## 6.3 Deadlock Handling Strategies

### 6.3.1 Prevention

Break one of the Coffman conditions:
- **Eliminate mutual exclusion:** Make resources shareable (often impossible — printer can't be shared mid-print).
- **Eliminate hold-and-wait:** Require process to request all resources upfront. Wasteful (locks resources too long).
- **Allow preemption:** Take resources back. Hard for some resources.
- **Eliminate circular wait:** Order resources globally; require requests in order. Common in practice.

### 6.3.2 Avoidance

Use info about future requests; only grant if doesn't lead to unsafe state.

**Banker's Algorithm:** Process declares max resources it'll need. OS only grants if remaining resources can satisfy *some* sequence of all processes' max needs. Otherwise wait.

Conservative (refuses safe-but-suboptimal allocations); rarely used in practice due to overhead.

### 6.3.3 Detection + Recovery

Let deadlock happen, then detect and break it.

**Detection:** Build resource-allocation graph; check for cycles.
**Recovery:**
- Kill one or more deadlocked processes
- Roll back to a safe checkpoint (if available)
- Preempt a resource

### 6.3.4 Ostrich Algorithm

Pretend deadlock doesn't happen. Used by most general-purpose OSes (Linux, Windows). Most apps recover via restart anyway.

## 6.4 Deadlock vs Starvation vs Livelock

| Concept | Definition |
|---------|------------|
| **Deadlock** | Threads blocked forever, each holding resources others need |
| **Starvation** | Thread keeps getting deprioritized; never makes progress |
| **Livelock** | Threads aren't blocked — they're actively responding to each other but no progress (e.g., two people stepping aside in a corridor) |

---

## Interview Q&A — Deadlock

**Q1: What are the 4 Coffman conditions?**
> Mutual exclusion, hold-and-wait, no preemption, circular wait. All four must hold for deadlock.

**Q2: How to prevent deadlock?**
> Break one of the four conditions. Most common in practice: enforce a global resource ordering (eliminates circular wait).

**Q3: What's the Banker's algorithm?**
> Deadlock avoidance — each process declares max resources needed. OS grants a request only if remaining resources can satisfy at least one valid completion order for all processes. Conservative; rarely used due to overhead.

**Q4: Difference between deadlock and starvation?**
> Deadlock: cycle of waits, no one progresses. Starvation: a single process never gets resources due to scheduling unfairness, but others are progressing.

**Q5: Difference between deadlock and livelock?**
> Deadlock: threads blocked. Livelock: threads aren't blocked, they're actively reacting, but state never advances (analogous to two people in a corridor repeatedly stepping the same direction to avoid each other).

---

# PART 7: MEMORY MANAGEMENT

## 7.1 Why memory management?

Multiple processes share limited RAM. OS must:
- Allocate memory to processes
- Protect process memory from each other
- Use RAM efficiently
- Support more processes than RAM can fit (via virtual memory)

## 7.2 Logical vs Physical Address

- **Logical (virtual) address:** What your program sees. Generated by CPU.
- **Physical address:** Actual location in RAM.
- **Memory Management Unit (MMU):** Hardware that translates logical → physical at runtime.

Why this separation? Each process can have its own address space starting at 0, even though they all share one physical RAM.

## 7.3 Contiguous Memory Allocation

Each process is allocated one contiguous block of RAM.

**Allocation strategies:**
- **First-fit:** Use first hole big enough.
- **Best-fit:** Use smallest hole that fits.
- **Worst-fit:** Use largest hole.

**Problems:**
- **External fragmentation:** Free memory exists but not contiguous.
- **Internal fragmentation:** Allocated block has unused space inside.

**Solution:** Compaction (move processes to consolidate free space). Expensive.

## 7.4 Paging

Break physical memory into fixed-size **frames** (e.g., 4 KB) and logical memory into same-size **pages**. Map pages → frames via a **page table** (per process).

```
Logical address = (Page number, Offset)
Physical address = (Frame number, Offset)
Page table maps: Page number → Frame number
```

**Advantages:**
- No external fragmentation
- Simple allocation

**Disadvantages:**
- Internal fragmentation (last page might be partial)
- Page table overhead (especially for large address spaces)

## 7.5 Page Table Structure

For 32-bit address space with 4 KB pages: 2³² / 2¹² = 2²⁰ = 1M page table entries per process. With 4 bytes each = 4 MB page table per process. Too much.

**Solutions:**
- **Multi-level paging:** Page table is itself paged (2 or 3 levels).
- **Inverted page table:** One global table indexed by frame, not page (with hash for lookup).
- **Hashed page table:** For 64-bit, scales better.

## 7.6 TLB (Translation Lookaside Buffer)

Page table is in RAM → every memory access requires 2 RAM accesses (1 for translation, 1 for actual data). Slow.

**TLB:** Small fast cache (typically 64–1024 entries) inside MMU storing recent page→frame translations.

- **TLB hit:** Translation in TLB → fast (~1 ns).
- **TLB miss:** Look up page table in RAM → update TLB → slow (~100 ns).

TLB hit rate is usually >95% due to locality.

## 7.7 Segmentation

Divides logical memory into variable-size **segments** (code, data, stack, heap), each starting at a different base address. Each segment has its own length and protection.

Segment table maps: (segment number, offset) → base + offset.

**Advantages:** Logical separation matches programmer's view.
**Disadvantages:** External fragmentation (variable-size segments).

## 7.8 Segmented Paging

Combines both: segments divided into pages. Used historically (x86); modern OSes mostly use flat paging with virtual memory regions.

---

## Interview Q&A — Memory Management

**Q1: Difference between paging and segmentation?**
> Paging: fixed-size blocks (pages/frames), no external fragmentation, simple, but loses logical structure. Segmentation: variable-size, matches logical structure (code, data, stack), but external fragmentation. Real systems combine via segmented paging or just use paging with virtual memory regions.

**Q2: What is internal vs external fragmentation?**
> Internal: allocated block has unused space inside (e.g., asking for 100 bytes, getting 128-byte chunk). External: free memory exists but is not contiguous (small gaps between allocated blocks).

**Q3: What is the role of TLB?**
> A small high-speed cache for recent virtual→physical address translations. Without TLB, every memory access would be 2 RAM accesses. With ~95% hit rate, effective access time is near 1 RAM access.

**Q4: What happens on a page fault?**
> CPU tries to access a page not currently in RAM (page table entry marked invalid). Trap to OS. OS finds the page on disk, picks a victim frame (using replacement algorithm), evicts it (writes if dirty), loads requested page, updates page table, restarts instruction.

**Q5: Why do we have a page table per process?**
> Each process has its own virtual address space. Same virtual address in two processes maps to different physical frames. This gives isolation and simplicity.

---

# PART 8: VIRTUAL MEMORY

## 8.1 What is Virtual Memory?

A technique that lets processes use **more memory than physically available**, by storing parts on disk and loading on demand.

Each process sees a large contiguous virtual address space; OS maps only the actively-used pages to physical frames; rest stays on disk in **swap space** (or pagefile).

## 8.2 Why VM exists

- Run programs larger than RAM
- Run more processes simultaneously
- Memory protection (each process isolated)
- Sparse address spaces (e.g., huge stack range, but only top is used)

## 8.3 Demand Paging

Don't load entire program into RAM. Load pages **only when accessed**.

When a page is accessed:
- If in RAM → fast.
- If not → **page fault** → OS loads from disk → maps → resumes.

Most programs don't use all their memory at once → only the "working set" is in RAM.

## 8.4 Page Fault Handling

1. CPU accesses virtual address.
2. MMU checks page table → entry marked "invalid" (not in RAM).
3. **Page fault** triggered → OS interrupt handler runs.
4. OS finds page location on disk.
5. OS picks a victim frame in RAM (page replacement algorithm).
6. If victim is **dirty** (modified), write back to disk.
7. Load requested page from disk into freed frame.
8. Update page table.
9. Resume the instruction that faulted.

Page fault costs ~10 ms (disk I/O) — millions of times slower than a memory access.

## 8.5 Page Replacement Algorithms

When RAM is full and we need to bring in a new page, which page do we evict?

### 8.5.1 FIFO

Evict the oldest page. Simple but doesn't consider usage. Suffers from **Belady's anomaly** (more frames can cause more page faults).

### 8.5.2 Optimal (Belady's algorithm)

Evict the page that will be used farthest in the future. **Theoretical lower bound**, can't implement (needs future knowledge). Used as benchmark.

### 8.5.3 LRU (Least Recently Used)

Evict the page not used for the longest time. Approximates Optimal well in practice.

**Implementation:**
- Counter per page (record last-use time): O(1) update, O(N) eviction.
- Stack (move to top on use): O(1) on doubly linked list + hashmap.

LRU is what most real systems try to approximate (true LRU is expensive in hardware).

### 8.5.4 LFU (Least Frequently Used)

Evict the page used least often. Doesn't adapt to changing access patterns (a hot page from long ago stays hot).

### 8.5.5 Clock (Second Chance)

LRU is expensive — need exact ordering. **Clock algorithm:** approximation.

- Each page has a "reference bit" (set on access).
- Pointer cycles through frames.
- On eviction: if reference bit = 0, evict. If 1, clear bit and move on.

## 8.6 Belady's Anomaly

In FIFO, **adding more frames can sometimes increase page faults**. Counterintuitive.

LRU and Optimal don't suffer from this (they're stack algorithms).

## 8.7 Thrashing

When the system spends most of its time **paging (swapping pages in and out)** instead of doing real work.

**Cause:** Too many processes → each has too few frames → constant page faults → CPU mostly idle waiting for disk → OS thinks "low CPU usage, add more processes" → makes it worse (positive feedback loop).

**Solutions:**
- **Working Set Model:** Track the set of pages each process is actively using; ensure each process has enough frames for its working set.
- **Page-Fault Frequency (PFF):** Monitor PFF; if too high, give process more frames; if too low, take some away.

## 8.8 Working Set

The set of pages a process has accessed in the last Δ time units. If working set fits in RAM → low page faults. If sum of working sets > total frames → thrashing.

---

## Interview Q&A — Virtual Memory

**Q1: What is virtual memory and why use it?**
> A technique that lets processes use more memory than physically available by storing inactive pages on disk. Benefits: run large programs, run many processes, memory isolation, sparse address spaces.

**Q2: What's a page fault?**
> When a process accesses a page not in RAM. OS handler loads it from disk, possibly evicting another page to make room. Costs ~10 ms — million times slower than RAM.

**Q3: Compare FIFO, LRU, Optimal page replacement.**
> FIFO: simple, but suffers Belady's anomaly. LRU: approximates Optimal, evicts least recently used; expensive to implement perfectly. Optimal: theoretical best (evicts page used farthest in future), but requires future knowledge — used only for benchmarking.

**Q4: What is thrashing? How to detect/fix?**
> System spends most time paging instead of computing. Detect via high page-fault rate / low CPU utilization combined with high disk activity. Fix: reduce concurrent processes or apply working set model.

**Q5: What is the working set model?**
> Track the set of pages each process accessed in the last Δ time. Allocate enough frames for each process's working set. If total exceeds RAM, suspend some processes to avoid thrashing.

**Q6: Why is LRU hard to implement perfectly?**
> Requires tracking exact access order on every memory access. Real systems use approximations like Clock (second-chance) algorithm.

---

# PART 9: FILE SYSTEMS

## 9.1 What is a File System?

The OS subsystem that organizes data on storage (disk, SSD) into named files and directories.

## 9.2 File Concepts

**Attributes:** name, type, size, location, owner, permissions, timestamps.
**Operations:** create, read, write, seek, delete, truncate, open, close.
**Open file table:** OS keeps per-process and system-wide tables of open files.

## 9.3 Directory Structures

| Structure | Description |
|-----------|-------------|
| Single-level | All files in one directory (simple, but conflicts) |
| Two-level | One directory per user |
| Tree-structured | Hierarchical (modern Unix/Windows) |
| Acyclic graph | Allows shared subdirectories (links) |
| General graph | Allows cycles (cycle detection needed for delete) |

## 9.4 File Allocation Methods

### 9.4.1 Contiguous

Each file = one contiguous block range.

**Pros:** Fast sequential read.
**Cons:** External fragmentation; hard to grow files.

### 9.4.2 Linked

Each file = linked list of blocks (each block has pointer to next).

**Pros:** No fragmentation, easy growth.
**Cons:** Sequential access only (slow random access); pointers waste space.

### 9.4.3 Indexed (used by Unix-like FS)

Each file has an **inode** containing pointers to data blocks. Direct, indirect, double-indirect, triple-indirect pointers handle small to huge files.

**Pros:** Random access fast; no fragmentation; supports large files.
**Cons:** Inode overhead per file.

## 9.5 Inode (Unix concept)

An **inode** stores metadata for a file:
- Permissions, owner, size
- Timestamps (created, modified, accessed)
- Pointers to data blocks
- (NOT the file name — name is in directory entries)

Directories are special files mapping names → inode numbers.

## 9.6 Free Space Management

How to track free blocks on disk:
- **Bitmap:** 1 bit per block. Easy, compact for finding contiguous free.
- **Linked list:** Free blocks in a list. Simple but slow scan.
- **Grouping:** First free block stores addresses of N other free blocks.

## 9.7 Journaling

A **journal** records pending operations before applying them. After crash, replay journal → consistent state.

Examples: ext3/ext4, NTFS, HFS+ are journaling.

---

## Interview Q&A — File Systems

**Q1: What is an inode?**
> A data structure storing file metadata: permissions, owner, size, timestamps, and pointers to data blocks. The file name is NOT in the inode — it's in the directory entry that maps name → inode.

**Q2: How does Unix support large files in indexed allocation?**
> The inode has direct pointers (e.g., 12), an indirect pointer (block of pointers), a double-indirect, and a triple-indirect. This gives capacity for files much larger than just direct pointers allow.

**Q3: Why is journaling useful?**
> Records pending operations in a log before applying. After crash, replay journal to recover to consistent state. Prevents partial-write corruption.

**Q4: What's the difference between hard link and symbolic link?**
> Hard link: another directory entry pointing to the same inode. File is deleted only when all hard links go away. Symbolic link: a separate file containing a path string. If target deleted, symlink dangles.

---

# PART 10: I/O AND DISK SCHEDULING (Brief — Less Common in Tier B Interviews)

## 10.1 Disk Structure

Spinning disks: platters, tracks, sectors. Modern SSDs: no moving parts, but OS still uses similar abstractions.

## 10.2 Disk Scheduling Algorithms

| Algorithm | How |
|-----------|-----|
| **FCFS** | Serve in arrival order. Fair, slow. |
| **SSTF** (Shortest Seek Time First) | Pick request closest to current head position. Starvation possible. |
| **SCAN** (Elevator) | Head sweeps in one direction, serving all requests in order, then reverses. |
| **C-SCAN** | Like SCAN but only serves in one direction; head jumps back to start without serving. More uniform wait. |
| **LOOK / C-LOOK** | Variants that don't go all the way to the end — turn around at last request. |

For SSDs, these matter much less (no seek time), but still used to some extent.

---

# PART 11: CONSOLIDATED INTERVIEW QUESTION BANK

These are the **30 most-asked OS questions** at Tier B+ companies. If you can answer these confidently, you'll clear the OS portion of any OA / interview.

## Process & Thread

1. Difference between process and thread? (See 3.3)
2. Process states? (See 2.4)
3. What's in a PCB? (See 2.5)
4. What is context switching? Cost? (See 2.6)
5. Process vs program? (See 2.2)
6. fork() vs exec()? (See 2.7)
7. What is a zombie process? An orphan? (See 2.9)
8. IPC mechanisms? (See 2.8)

## Scheduling

9. Compare FCFS, SJF, RR. (See 4.4)
10. What is starvation? Aging? (See 4.6)
11. Preemptive vs non-preemptive? (See 4.2)
12. What's the convoy effect? (See 4.5)
13. How does Linux scheduler work (CFS)? (See 4.6 Q6)
14. How to choose a time quantum in RR? (See 4.4.4)

## Synchronization

15. What's a race condition? (See 5.1)
16. Mutex vs Semaphore? (See 5.5)
17. Producer-Consumer problem? (See 5.7.1)
18. Readers-Writers problem? (See 5.7.2)
19. Dining Philosophers? (See 5.7.3)
20. What is `synchronized` in Java? (See 5.6, 5.9)

## Deadlock

21. Coffman conditions? (See 6.2)
22. How to prevent deadlock? (See 6.3.1)
23. Banker's algorithm? (See 6.3.2)
24. Deadlock vs starvation vs livelock? (See 6.4)

## Memory

25. Paging vs segmentation? (See 7.7)
26. Internal vs external fragmentation? (See 7.3)
27. What's TLB? Why? (See 7.6)
28. What's a page fault? Steps? (See 8.4)
29. Compare FIFO, LRU, Optimal page replacement. (See 8.5)
30. What is thrashing? Working set model? (See 8.7, 8.8)

---

# STUDY CHECKLIST (Months 1–2)

By **end of June 2026 (Plan Month 1):**
- [ ] Read Parts 1–4 (OS basics, Process, Thread, Scheduling)
- [ ] Answer Q1–14 from question bank confidently
- [ ] Create flashcards for terms: PCB, context switch, mutex, semaphore, scheduler

By **end of July 2026 (Plan Month 2):**
- [ ] Read Parts 5–10 (Sync, Deadlock, Memory, VM, FS, I/O)
- [ ] Answer Q15–30 confidently
- [ ] Re-do Producer-Consumer pseudo-code from memory
- [ ] Re-implement Banker's algorithm logic from memory
- [ ] Practice 5 OS-themed mock interview questions verbally

By **end of October 2026 (Plan Month 5):**
- [ ] Quick re-read (1 hour) of full doc
- [ ] Answer all 30 questions in <30 sec each (interview pace)

By **end of January 2027 (Plan Month 8):**
- [ ] Final revision before applications begin
- [ ] All 30 Q&A internalized; no notes needed

---

# RESOURCES (in order of value)

1. **Striver OS playlist** (YouTube) — Indian-context, interview-focused
2. **Operating Systems: Three Easy Pieces** (free book) — gold standard
3. **Galvin's OS textbook** — university classic; chapters 1–10 cover this doc
4. **GeeksforGeeks OS section** — quick reference

Don't read all of these. **Pick one (Striver) and finish it. Use this doc as the consolidated reference.**

---

*Doc last updated: May 2026. Re-read schedule: Day +7 (full re-read), Day +30 (Q&A only), monthly thereafter.*
