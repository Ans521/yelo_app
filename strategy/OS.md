# Operating Systems — Tier B Interview-Ready

> Lean OS reference for Tier B SDE-1/SDE-2 interviews (Visa, JPMC, Razorpay, PayPal, CRED, PhonePe). Covers exactly what's asked in OAs and tech rounds — nothing more, nothing less.

---

## Timeline — All 6 Fundamentals Files

| # | File | Start | Finish by | Plan Month |
|---|------|-------|-----------|------------|
| 1 | **OS.md** (this file) | May 2026 | **End of July 2026** | Months 1–2 |
| 2 | **DBMS.md** | July 2026 | End of August 2026 | Months 2–3 |
| 3 | **LLD.md** | July 2026 | End of November 2026 | Months 2–6 |
| 4 | **CN.md** | September 2026 | End of September 2026 | Month 4 |
| 5 | **OOP.md** | October 2026 | End of October 2026 | Month 5 |
| 6 | **HLD.md** | November 2026 | End of December 2026 | Months 6–7 |

**Hard deadline: all 6 files done by Jan 2027 (Plan Month 8).** Applications start then.

---

## How to use this doc

Each topic: **What → Why → How → Interview Q&A.** Skip the academic depth — that's not asked at Tier B.

Re-read schedule: Day +7 (full re-read), Day +30 (Q&A only), monthly thereafter.

---

# PART 1: OS BASICS

## What is an OS?
A program that manages hardware (CPU, RAM, disk) and provides services to other programs. Examples: Windows, Linux, macOS, Android.

## Kernel vs User Mode
CPU has two privilege levels:
- **Kernel mode:** Full hardware access. OS runs here.
- **User mode:** Limited access. Apps run here.

Apps make **system calls** (`read`, `write`, `fork`) to switch into kernel mode for privileged ops.

**Why two modes?** Safety. A buggy app can't crash the OS or other apps.

---

# PART 2: PROCESSES

## What is a Process?
A running instance of a program. Program = file on disk. Process = program loaded in memory + executing.

One program → many processes (open Chrome 3 times = 3 processes).

## Process Memory Layout
```
+----------+  HIGH
|  Stack   |  ← function calls, local vars (grows down)
+----------+
|   ↓↑     |
+----------+
|  Heap    |  ← malloc/new (grows up)
+----------+
|  Data    |  ← global/static vars
+----------+
|  Text    |  ← program code (read-only)
+----------+  LOW
```

If stack and heap collide → stack overflow.

## Process States
**New → Ready → Running → Waiting (I/O) → Running → Terminated**

- **Ready:** in queue, waiting for CPU
- **Running:** on CPU
- **Waiting (Blocked):** waiting for I/O or event

## Process Control Block (PCB)
Struct OS keeps for every process:
- PID, state, program counter, CPU registers, memory limits, open files, priority, parent PID

OS uses PCB during context switch.

## Context Switch
Switching CPU from one process to another:
1. Save current process's CPU state into its PCB
2. Load next process's PCB into CPU
3. Resume execution

**Cost:** microseconds. Too many switches = wasted CPU.

## fork() vs exec()
- **fork():** creates a new process by copying current. After fork, parent + child both running.
- **exec():** replaces current process's memory with new program (PID stays same).
- **Common pattern:** parent calls `fork()` → child calls `exec("ls")` → parent waits.

## IPC (Inter-Process Communication)
Processes are isolated; can't read each other's memory. To share data:

| Method | Use case |
|--------|----------|
| **Pipe** | Parent-child stream |
| **Named pipe (FIFO)** | Unrelated processes, same machine |
| **Shared memory** | Fastest; needs sync (mutex) |
| **Message queue** | OS-managed discrete messages |
| **Socket** | Local or networked |
| **Signal** | Async notifications (SIGINT, SIGKILL) |

## Zombie & Orphan
- **Zombie:** child finished, parent hasn't called `wait()` to read exit status. PCB stays.
- **Orphan:** parent died first. OS adopts orphan to `init` (PID 1).

---

## Q&A — Processes

**Q: Process vs program?**
> Program = static file on disk. Process = running instance in memory. One program → many processes.

**Q: What's in a PCB?**
> PID, state, program counter, CPU registers, memory limits, open files, priority, parent PID. OS uses it for context switching.

**Q: What is context switching? Cost?**
> Saving current process's CPU state and loading another's so OS can run multiple processes on one CPU. Cost: microseconds. Frequent switches hurt throughput.

**Q: fork() vs exec()?**
> fork() duplicates current process (creates child). exec() replaces process's memory with new program. Common: fork() then child calls exec().

**Q: What is a zombie process?**
> A child that has terminated but its parent hasn't read its exit status with `wait()`. PCB stays around — wastes a PID.

**Q: List IPC methods.**
> Pipes, named pipes, shared memory, message queues, sockets, signals.

---

# PART 3: THREADS

## What is a Thread?
A unit of execution **within** a process. Multiple threads in same process **share memory** but each has its own:
- Stack
- Program counter
- CPU registers

Analogy: process = house; threads = people sharing the kitchen but with own beds.

## Why threads?
Do multiple things in one program: web browser (render + download + JS), web server (one thread per request).

## Process vs Thread (asked 90% of the time)

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Own memory space | Shares with siblings |
| Creation cost | Expensive | Cheap |
| Context switch cost | Expensive (TLB flush) | Cheap |
| Communication | Needs IPC | Direct memory access |
| Crash impact | Isolated | Can crash whole process |
| Use case | Isolation, security | Parallelism within one task |

## What's shared? What's per-thread?

**Shared by all threads:** code (text), heap, data segment, open files.
**Per-thread:** stack, registers, PC.

This is why threads can corrupt shared data → race conditions (Part 5).

## User vs Kernel Threads
- **Kernel-level:** OS schedules each thread. Real parallelism on multi-core. (Linux pthreads, Windows threads.)
- **User-level:** library schedules; OS sees one thread. No real parallelism if blocked.

Modern systems use kernel threads (1:1 model) or hybrid (M:N — Go goroutines).

---

## Q&A — Threads

**Q: Process vs thread?**
> Process has own memory; thread shares memory with siblings. Threads are cheaper to create and switch. Threads communicate via shared variables; processes need IPC.

**Q: What's per-thread vs shared?**
> Shared: code, heap, data, open files. Per-thread: stack, registers, PC.

**Q: If one thread crashes, does the process die?**
> Usually yes — uncaught exception in any thread typically terminates the whole process.

**Q: Why are threads cheaper than processes?**
> They share memory (no separate address space), so creation skips memory allocation, and context switch skips TLB flush + MMU change.

---

# PART 4: CPU SCHEDULING

## Why scheduling?
Multiple processes ready, limited CPU cores. Scheduler picks who runs next.

## Preemptive vs Non-preemptive
- **Non-preemptive:** Process keeps CPU until it finishes or blocks (FCFS, non-preemptive SJF).
- **Preemptive:** OS can forcibly take CPU (timer interrupt). Modern OSes are preemptive.

## Scheduling Metrics
- **CPU utilization** (high)
- **Throughput** (high) — processes/time
- **Turnaround time** (low) — arrival to completion
- **Waiting time** (low) — time in ready queue
- **Response time** (low) — arrival to first CPU burst

## Algorithms

### FCFS (First-Come First-Served)
Whoever arrives first runs first. Non-preemptive.
- ✅ Simple, fair in arrival order.
- ❌ **Convoy effect:** one long job at front blocks short jobs.

### SJF (Shortest Job First)
Pick shortest next CPU burst.
- ✅ Optimal average waiting time.
- ❌ Need to predict burst times. **Starvation** of long jobs.

### Round Robin
Each process gets a fixed **time quantum** (e.g., 10 ms), then preempted.
- ✅ Fair, good response time. Used in interactive systems.
- ❌ Quantum too small → too many context switches.

### Priority Scheduling
Highest priority runs. Preemptive or not.
- ❌ **Starvation** of low-priority. Fix: **aging** (gradually raise priority of waiting processes).

## Linux uses CFS
Completely Fair Scheduler — tracks "virtual runtime" per process; runs lowest. Effectively gives equal time over time. (Mention if asked.)

---

## Q&A — Scheduling

**Q: Compare FCFS, SJF, RR.**
> FCFS: simple, convoy effect. SJF: optimal avg wait but starvation possible, needs burst prediction. RR: fair, good response time, used in interactive systems.

**Q: What is starvation? How to prevent?**
> A process never gets CPU due to higher-priority arrivals. Prevent via **aging** — periodically raise priority of waiting processes.

**Q: Preemptive vs non-preemptive?**
> Non-preemptive: process holds CPU until finish/block. Preemptive: OS can take CPU back via timer interrupt. Modern OSes preemptive.

**Q: What's the convoy effect?**
> In FCFS, a long CPU-bound process at the head blocks short I/O-bound processes — wastes CPU and starves the fast ones.

**Q: How to choose time quantum in RR?**
> Too small → too many context switches (overhead). Too large → behaves like FCFS. Typical: 10–100 ms.

---

# PART 5: SYNCHRONIZATION

## Race Condition
When two threads access shared data and final result depends on timing.

```
counter = 0
Thread A: counter++   // reads 0, writes 1
Thread B: counter++   // reads 0, writes 1
Final: counter = 1 (should be 2)
```

## Critical Section
Code that accesses shared data. Must be protected so only one thread executes at a time.

## Mutex (Mutual Exclusion Lock)
Binary lock — only one thread holds at a time.
```
mutex.lock()
// critical section
mutex.unlock()
```

## Semaphore
Counter with two atomic ops:
- **wait()** (P): if counter > 0, decrement; else block.
- **signal()** (V): increment; wake one waiting thread.

**Binary semaphore** ≈ mutex. **Counting semaphore** allows up to N concurrent (e.g., resource pool).

## Mutex vs Semaphore (often asked)

| Mutex | Semaphore |
|-------|-----------|
| Binary | Counter (0 to N) |
| Has ownership (only locker can unlock) | No ownership |
| For mutual exclusion | For signaling + resource counting |

## Producer-Consumer (often asked)

Producer adds items to a bounded buffer. Consumer removes. Must handle full/empty.

**Solution:**
- **mutex** — for buffer access
- **empty** semaphore (init = N) — empty slots count
- **full** semaphore (init = 0) — filled slots count

```
Producer:
  empty.wait()
  mutex.lock()
  add item
  mutex.unlock()
  full.signal()

Consumer:
  full.wait()
  mutex.lock()
  remove item
  mutex.unlock()
  empty.signal()
```

## Java synchronized
```java
synchronized(obj) {
    // only one thread at a time
}
```
Implements a monitor. Internally uses a mutex on the object's lock.

---

## Q&A — Synchronization

**Q: What's a race condition?**
> Two or more threads access shared data, and the final result depends on timing. Causes inconsistency.

**Q: Mutex vs Semaphore?**
> Mutex: binary, has ownership, for mutual exclusion. Semaphore: counter, no ownership, for signaling and counting resources.

**Q: Explain Producer-Consumer.**
> Producer puts items into bounded buffer; Consumer takes them out. Solved with mutex (buffer access) + two counting semaphores: `empty` (slots free) and `full` (slots filled).

**Q: What is `synchronized` in Java?**
> Wraps a method or block in implicit mutex on object's monitor. Only one thread enters at a time.

---

# PART 6: DEADLOCK

## What is deadlock?
Two or more threads block forever, each waiting for a resource the other holds.

**Classic:** P1 holds A wants B. P2 holds B wants A.

## Coffman Conditions (all 4 must hold)
1. **Mutual Exclusion** — resource held in non-shareable mode.
2. **Hold and Wait** — process holds something while waiting for more.
3. **No Preemption** — resources can't be forcibly taken.
4. **Circular Wait** — cycle of processes each waiting for next.

Break any one → no deadlock.

## Prevention (most-asked: how to prevent)
Most common in practice: **enforce a global resource order**. All processes must request resources in the same order. Eliminates circular wait.

Other strategies (mention briefly):
- Acquire all resources upfront (no hold-and-wait)
- Allow preemption (take resources back)

## Deadlock vs Starvation vs Livelock
- **Deadlock:** cycle of waits, no one progresses.
- **Starvation:** one process never gets resources due to scheduling unfairness; others progress.
- **Livelock:** threads aren't blocked but state never advances (two people stepping aside in a corridor, repeatedly mirror each other).

---

## Q&A — Deadlock

**Q: 4 conditions for deadlock?**
> Mutual exclusion, hold-and-wait, no preemption, circular wait. All four must hold.

**Q: How to prevent deadlock?**
> Break one of the four conditions. Most common: enforce a global resource ordering — eliminates circular wait.

**Q: Deadlock vs starvation?**
> Deadlock: cycle of waits, no one progresses. Starvation: one process keeps losing scheduling, but others progress.

---

# PART 7: MEMORY MANAGEMENT

## Why memory management?
Many processes, limited RAM. OS must allocate, protect, and use efficiently.

## Logical vs Physical Address
- **Logical (virtual):** what your program sees. Generated by CPU.
- **Physical:** actual RAM location.
- **MMU** translates logical → physical at runtime.

Why? Each process gets its own address space starting at 0, even though they share RAM.

## Paging
Break physical RAM into fixed-size **frames** (e.g., 4 KB) and logical memory into same-size **pages**. OS maps pages → frames using a **page table** (per process).

```
Logical address = (Page number, Offset)
Physical address = (Frame number, Offset)
Page table: Page → Frame
```

✅ No external fragmentation.
❌ Internal fragmentation possible (last page might be partial).

## Segmentation
Divide logical memory into variable-size **segments** (code, data, stack, heap). Segment table maps segment → base + length.

✅ Matches programmer's logical view.
❌ External fragmentation.

## Paging vs Segmentation (often asked)

| Paging | Segmentation |
|--------|--------------|
| Fixed-size pages | Variable-size segments |
| No external fragmentation | External fragmentation |
| Internal fragmentation possible | No internal fragmentation |
| Programmer doesn't see structure | Logical structure preserved |

## Internal vs External Fragmentation
- **Internal:** allocated block has unused space inside (e.g., asked 100, got 128 → 28 wasted).
- **External:** free memory exists, but scattered in non-contiguous chunks.

## TLB (Translation Lookaside Buffer)
A small fast cache (~64–1024 entries) in MMU for recent page→frame translations.
- **Hit:** ~1 ns. **Miss:** ~100 ns (look up page table in RAM).
- Hit rate >95% due to locality.

Without TLB, every memory access = 2 RAM accesses.

---

## Q&A — Memory Management

**Q: Paging vs segmentation?**
> Paging: fixed-size, no external fragmentation, simple. Segmentation: variable-size, matches logical structure (code/data/stack), external fragmentation.

**Q: Internal vs external fragmentation?**
> Internal: unused space inside an allocated block. External: free memory exists but is non-contiguous (scattered gaps).

**Q: Role of TLB?**
> Fast cache for recent virtual→physical translations. Without it, each memory access needs 2 RAM accesses (one for page table, one for data).

**Q: Why does each process have its own page table?**
> Each process has its own virtual address space. Same virtual address in two processes maps to different physical frames — gives isolation.

---

# PART 8: VIRTUAL MEMORY

## What is Virtual Memory?
Lets processes use **more memory than physically available** by storing inactive pages on disk (swap space).

Each process sees a large contiguous virtual address space; only actively-used pages are in RAM.

## Why VM?
- Run programs larger than RAM
- Run more processes
- Memory protection (each process isolated)

## Demand Paging
Don't load entire program into RAM. Load pages **only when accessed**.

## Page Fault
When CPU accesses a page not in RAM:
1. MMU sees invalid page table entry → trap to OS.
2. OS finds page on disk.
3. OS picks a victim frame (page replacement).
4. If victim is dirty, write back to disk.
5. Load requested page into freed frame.
6. Update page table; resume instruction.

**Cost:** ~10 ms (disk I/O) — millions of times slower than RAM access.

## Page Replacement Algorithms

### FIFO
Evict oldest page. Simple but doesn't consider usage.

### LRU (Least Recently Used)
Evict page not used for longest time. **Approximates optimal well in practice.** Most systems try to approximate LRU.

### Optimal
Evict page used farthest in future. Theoretical lower bound; can't implement (needs future knowledge).

## Thrashing
System spends most time **paging** (swapping pages) instead of computing.

**Cause:** Too many processes, each gets too few frames → constant page faults → CPU idle waiting on disk.

**Fix:** reduce concurrent processes, or use **working set model** (give each process enough frames for its actively-used pages).

---

## Q&A — Virtual Memory

**Q: What is virtual memory and why?**
> Lets processes use more memory than RAM by keeping inactive pages on disk. Benefits: run large programs, run many processes, memory isolation.

**Q: What is a page fault?**
> CPU accesses a page not in RAM. OS handler loads it from disk, possibly evicting another page first. Costs ~10 ms.

**Q: Compare FIFO and LRU.**
> FIFO: evict oldest by arrival; simple. LRU: evict least recently used; approximates optimal; better hit rate; harder to implement perfectly.

**Q: What is thrashing?**
> System spends most time paging instead of executing. Caused by too many processes / too few frames per process. Fix: reduce process count or apply working set model.

---

# PART 9: CONSOLIDATED INTERVIEW QUESTION BANK

The **20 questions** that cover ~95% of OS asked at Tier B. If you can answer all confidently in 30–45 seconds each, you're done.

## Process & Thread
1. Process vs program? *(Part 2)*
2. Process vs thread? *(Part 3)*
3. What's per-thread vs shared in a process? *(Part 3)*
4. What is context switching and its cost? *(Part 2)*
5. fork() vs exec()? *(Part 2)*
6. List IPC methods. *(Part 2)*
7. What is a zombie process? *(Part 2)*

## Scheduling
8. Compare FCFS, SJF, RR. *(Part 4)*
9. What is starvation? How to prevent? *(Part 4)*
10. Preemptive vs non-preemptive? *(Part 4)*

## Synchronization
11. What is a race condition? *(Part 5)*
12. Mutex vs Semaphore? *(Part 5)*
13. Explain Producer-Consumer. *(Part 5)*
14. What is `synchronized` in Java? *(Part 5)*

## Deadlock
15. 4 conditions for deadlock? *(Part 6)*
16. How to prevent deadlock? *(Part 6)*

## Memory
17. Paging vs segmentation? *(Part 7)*
18. Internal vs external fragmentation? *(Part 7)*
19. What is a page fault? *(Part 8)*
20. What is thrashing? *(Part 8)*

---

# STUDY CHECKLIST

By **end of June 2026 (Plan Month 1):**
- [ ] Read Parts 1–4 (Basics, Process, Thread, Scheduling)
- [ ] Answer Q1–10 confidently
- [ ] Process-vs-thread comparison memorized

By **end of July 2026 (Plan Month 2):**
- [ ] Read Parts 5–8 (Sync, Deadlock, Memory, VM)
- [ ] Answer Q11–20 confidently
- [ ] Producer-Consumer pseudo-code from memory

By **end of October 2026 (Plan Month 5):**
- [ ] Quick re-read (30 min)
- [ ] All 20 Q&A in <45 sec each

By **end of January 2027 (Plan Month 8):**
- [ ] Final revision before applications
- [ ] Talk through all 20 verbally without notes

---

# RESOURCES (pick ONE, finish it)

1. **Striver OS playlist** (YouTube) — Indian-context, interview-focused. Best for Tier B.
2. **Love Babbar OS sheet** — quick GfG-linked questions
3. **GeeksforGeeks OS section** — quick reference

Don't read multiple. **Pick Striver, finish it. Use this doc as consolidated reference.**

---

# WHAT'S NOT HERE (and why)

These topics are **rarely asked at Tier B SDE-1/2** but ARE asked at Tier S (Google, Meta, Amazon higher levels). If you target Tier S later, return and learn:

- Banker's algorithm (deadlock avoidance)
- Peterson's algorithm (software mutual exclusion)
- Reader-Writer / Dining Philosophers detailed solutions
- Detailed disk scheduling (FCFS / SSTF / SCAN / C-SCAN)
- File system internals (inodes, allocation methods, journaling)
- Multi-level page tables, inverted page tables
- TLB hit-rate math, Belady's anomaly
- Working set model details
- Hardware sync primitives (Test-and-Set, Compare-and-Swap)
- LFU, Clock page replacement details

If you ever need these, the academic depth is in OSTEP (free online textbook) or Galvin's OS book. **For Tier B, this lean doc is sufficient.**

---

*Doc last updated: May 2026. Re-read on Day +7, +30, monthly. ~20 Q&A is the real interview-deep set; everything else here is supporting context.*
