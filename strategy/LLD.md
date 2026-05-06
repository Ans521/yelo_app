# Low-Level Design (LLD) — From Basics to Advanced

> Comprehensive LLD reference. Starts from "what is LLD" and walks through 6 designs of increasing complexity. By the end, you can confidently handle any LLD interview at Tier B (Visa, JPMC, Razorpay, PayPal, CRED, PhonePe) and Tier A (Atlassian, Adobe, Microsoft).

---

## Where this fits

| File | Status | Finish by |
|------|--------|-----------|
| OS.md | ✅ | — |
| DBMS.md | ✅ | — |
| CN.md | ✅ | — |
| OOP.md | ✅ | — |
| **LLD.md (this file)** | In progress | **End of November 2026** (Plan Month 6) |
| HLD.md | Pending | End of December 2026 |

**Strategy:** Don't try to read this end-to-end. Take ONE design per week starting July 2026. Implement it fully in Java, push to GitHub. By end of November, all 6 designs are done.

---

## How to use this doc

1. **Foundations first** (Parts 1–3) — read once before tackling any design.
2. **One design per week.** Read the full design, then implement it from scratch in Java without looking at the code section. Compare your implementation; identify gaps.
3. **Push every design to GitHub.** This becomes your portfolio.
4. **Re-implement after 30 days.** This is what makes patterns stick.

---

# PART 1: WHAT IS LLD?

## LLD vs HLD

| LLD (Low-Level Design) | HLD (High-Level Design) |
|------------------------|--------------------------|
| Code-level: classes, methods, interfaces | Architecture: services, databases, caches, queues |
| Object-oriented thinking | System-level thinking |
| Output: class diagram + Java code | Output: architecture diagram + scaling decisions |
| Examples: Parking Lot, LRU Cache, Chess game | Examples: URL Shortener, Twitter Feed, WhatsApp |
| OOP, SOLID, design patterns | Caching, sharding, load balancing, queues |
| 30–45 min interview round | 45–60 min interview round |

For SDE-1: LLD is the primary design round. HLD is mostly conceptual.
For SDE-2: Both LLD and HLD are tested in depth.

## Why LLD matters in interviews

Interviewers test:
- Can you take a vague problem ("design a parking lot") and ask the right clarifying questions?
- Can you identify entities and relationships?
- Can you apply OOP principles (encapsulation, polymorphism)?
- Can you apply SOLID and design patterns where appropriate?
- Can you write clean, extensible Java code?

It's not about getting the "right" design — there isn't one. It's about how you think.

## What an LLD interview looks like (40–45 min)

| Time | What you do |
|------|-------------|
| 0–5 min | Listen to problem. Ask clarifying questions. |
| 5–10 min | List functional + non-functional requirements. |
| 10–20 min | Identify core entities and relationships. Sketch class diagram. |
| 20–35 min | Write Java code on shared screen. Discuss design patterns used. |
| 35–45 min | Discuss extensions, edge cases, scaling considerations. |

**Most candidates fail at step 1 (rush to code without understanding the problem).** Don't skip clarifying questions.

---

# PART 2: UML BASICS (just enough)

UML = Unified Modeling Language. Visual notation for software design.

For LLD interviews, you only need:
- **Class diagrams** — most-used
- **Sequence diagrams** — occasional, for showing flow

Don't memorize the full UML spec. Just these.

## Class Diagram Notation

A class is drawn as a box with 3 sections:

```
+----------------------+
|     ClassName        |
+----------------------+
| - field1: int        |
| + field2: String     |
| # field3: double     |
+----------------------+
| + method1(): void    |
| - method2(int): bool |
+----------------------+
```

**Visibility modifiers:**
- `+` public
- `-` private
- `#` protected

## Relationships

| Relationship | Symbol | Meaning |
|--------------|--------|---------|
| **Inheritance** (extends) | `─────▷` (hollow triangle) | "Dog IS-A Animal" |
| **Implementation** (implements) | `─ ─ ─ ▷` (dashed + hollow triangle) | "Car IMPLEMENTS Drivable" |
| **Composition** | `◆────` (filled diamond) | "Car HAS Engine; Engine dies with Car" |
| **Aggregation** | `◇────` (hollow diamond) | "Department HAS Employees; Employees outlive Department" |
| **Association** | `─────` (plain line) | "Student knows Teacher" (loose) |
| **Dependency** | `─ ─ ─ ▷` (dashed arrow) | "uses temporarily" |

## Composition vs Aggregation (often confused)

- **Composition (strong):** Lifetime tied. If `Car` is destroyed, `Engine` is too. Engine doesn't exist without Car.
- **Aggregation (weak):** Lifetimes independent. `Department` has `Employee`s, but employees can exist independently.

In Java, both look like a field — but in design, the **lifecycle** distinguishes them.

## Sequence Diagram (briefly)

Shows interactions over time between objects. Mostly used to walk through a use case.

```
User       OrderService    Database
 |              |              |
 | placeOrder() |              |
 |------------->|              |
 |              | save(order)  |
 |              |------------->|
 |              |  ack         |
 |              |<-------------|
 |   success    |              |
 |<-------------|              |
```

You probably won't draw these in an interview, but understanding the format helps you reason about flow.

---

# PART 3: HOW TO APPROACH ANY LLD PROBLEM (THE 6-STEP FRAMEWORK)

This is the muscle memory you need. Apply it to every design.

## Step 1 — Clarifying Questions

Never start coding immediately. Ask:
- What are the main features needed?
- What's the scale? (1 user vs 1000 vs 1M)
- Are there any constraints we should worry about?
- What's NOT in scope?

Example for Parking Lot:
- Number of floors / spots?
- Types of vehicles (car, bike, truck)?
- Pricing logic?
- Multiple entry/exit points?
- Reservations?
- Payment methods?

## Step 2 — Functional Requirements

List what the system MUST do. Be concrete.

For Parking Lot:
- Park a vehicle
- Calculate fee on exit
- Find available spots by vehicle type
- Generate ticket
- Process payment

## Step 3 — Non-Functional Requirements (NFRs)

- Concurrency: multiple users simultaneously?
- Performance: O(1) spot lookup?
- Extensibility: easy to add new vehicle types or pricing strategies?
- Persistence: in-memory or DB-backed?

## Step 4 — Identify Entities (Classes)

Find the **nouns** in your requirements. Each becomes a candidate class.

For Parking Lot: `ParkingLot`, `ParkingSpot`, `Vehicle`, `Ticket`, `Payment`, `Floor`, `Gate`, ...

Then ask:
- What are their attributes?
- What are their methods?
- What inherits from what?
- What composes what?

## Step 5 — Apply SOLID + Design Patterns

- **Single Responsibility:** each class has one clear job.
- **Open/Closed:** extending a feature shouldn't require editing existing code.
- **Strategy pattern:** for swappable algorithms (e.g., pricing).
- **Factory:** for creating spots/vehicles by type.
- **Singleton:** for the parking lot itself (only one).
- **Observer:** for notifications (spot freed → notify queue).

## Step 6 — Write Code + Discuss Extensions

Write Java. Use interfaces where appropriate. Discuss:
- How would you handle 100x scale?
- How would you persist state?
- How would you handle concurrency?
- What if requirements change?

---

# DESIGN 1: PARKING LOT (Foundational)

**Difficulty:** ⭐ (Beginner-friendly. Master this first.)

## Problem
Design an OOP parking lot management system.

## Step 1: Clarifying Questions

Q: How many floors?
> Configurable. Default 5.

Q: Vehicle types?
> Car, Bike, Truck. Each takes different spot size.

Q: Pricing?
> Hourly. Different rate per vehicle type.

Q: Entry/exit?
> Multiple gates with ticket dispenser at entry, payment at exit.

Q: Reservations?
> Out of scope.

## Step 2: Functional Requirements

1. Park a vehicle → return a ticket
2. Find an available spot for a vehicle type
3. Compute fee on exit
4. Process payment
5. Free the spot
6. Show available spots

## Step 3: Non-Functional Requirements

- Concurrency: multiple gates work simultaneously → need thread-safety on spot allocation.
- Extensibility: easy to add electric vehicle, monthly pass.
- Performance: O(1) spot lookup.

## Step 4: Identify Entities

| Class | Purpose |
|-------|---------|
| `ParkingLot` | Top-level singleton. Orchestrates. |
| `Floor` | Has many `ParkingSpot`s. |
| `ParkingSpot` | Holds one vehicle. Knows its size. |
| `Vehicle` (abstract) | Base; subclasses Car, Bike, Truck. |
| `Ticket` | Issued at entry; used to compute fee at exit. |
| `EntryGate`, `ExitGate` | Entry: issue ticket. Exit: process payment. |
| `Payment` | Encapsulates payment processing. |
| `PricingStrategy` (interface) | Swappable rate logic. |

## Step 5: Class Design

```
                +------------------+
                |   ParkingLot     | <singleton>
                +------------------+
                | floors: List<Floor>|
                | entryGates: List   |
                | exitGates: List    |
                +------------------+
                | parkVehicle()      |
                | unparkVehicle()    |
                +------------------+
                          |
                          | composition
                          v
                +------------------+
                |     Floor        |
                +------------------+
                | spots: List<Spot> |
                +------------------+
                | findFreeSpot()    |
                +------------------+
                          |
                          v
                +------------------+
                |  ParkingSpot     |
                +------------------+
                | id, isFree, type |
                | vehicle: Vehicle |
                +------------------+
                | park(v), unpark()|
                +------------------+

   <abstract>
+--------+        +--------+
|Vehicle |<------|  Car   |
+--------+        +--------+
| number |        +--------+
| type   |
+--------+        +--------+
                  |  Bike  |
                  +--------+

+----------------------+
| <<interface>>        |
| PricingStrategy      |
+----------------------+
| calc(ticket): double |
+----------------------+
        ^
        |
+----------------------+    +-----------------------+
| HourlyPricing        |    | DailyPricing          |
+----------------------+    +-----------------------+
```

## Step 6: Java Code

```java
// ===== Vehicle =====
enum VehicleType { CAR, BIKE, TRUCK }

abstract class Vehicle {
    protected String licensePlate;
    protected VehicleType type;
    
    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }
    
    public VehicleType getType() { return type; }
    public String getLicensePlate() { return licensePlate; }
}

class Car extends Vehicle {
    public Car(String lp) { super(lp, VehicleType.CAR); }
}
class Bike extends Vehicle {
    public Bike(String lp) { super(lp, VehicleType.BIKE); }
}
class Truck extends Vehicle {
    public Truck(String lp) { super(lp, VehicleType.TRUCK); }
}

// ===== ParkingSpot =====
enum SpotType { COMPACT, REGULAR, LARGE }

class ParkingSpot {
    private String id;
    private SpotType type;
    private boolean isFree;
    private Vehicle vehicle;
    
    public ParkingSpot(String id, SpotType type) {
        this.id = id;
        this.type = type;
        this.isFree = true;
    }
    
    public synchronized boolean park(Vehicle v) {
        if (!isFree || !canFit(v)) return false;
        this.vehicle = v;
        this.isFree = false;
        return true;
    }
    
    public synchronized void unpark() {
        this.vehicle = null;
        this.isFree = true;
    }
    
    private boolean canFit(Vehicle v) {
        // Bikes fit in any spot; cars in REGULAR or LARGE; trucks in LARGE
        switch (v.getType()) {
            case BIKE: return true;
            case CAR:  return type != SpotType.COMPACT;
            case TRUCK: return type == SpotType.LARGE;
        }
        return false;
    }
    
    public boolean isFree() { return isFree; }
    public String getId() { return id; }
    public SpotType getType() { return type; }
}

// ===== Floor =====
class Floor {
    private int floorNumber;
    private List<ParkingSpot> spots;
    
    public Floor(int floorNumber, List<ParkingSpot> spots) {
        this.floorNumber = floorNumber;
        this.spots = spots;
    }
    
    public synchronized ParkingSpot findFreeSpot(Vehicle v) {
        for (ParkingSpot s : spots) {
            if (s.isFree() && s.park(v)) return s;
        }
        return null;
    }
    
    public int getFloorNumber() { return floorNumber; }
}

// ===== Pricing Strategy =====
interface PricingStrategy {
    double calculate(Ticket ticket);
}

class HourlyPricing implements PricingStrategy {
    @Override
    public double calculate(Ticket ticket) {
        long hours = Math.max(1, Duration.between(ticket.getEntryTime(),
                                                   Instant.now()).toHours());
        switch (ticket.getVehicleType()) {
            case BIKE:  return 10 * hours;
            case CAR:   return 30 * hours;
            case TRUCK: return 50 * hours;
        }
        return 0;
    }
}

// ===== Ticket =====
class Ticket {
    private String id;
    private String licensePlate;
    private VehicleType vehicleType;
    private Instant entryTime;
    private ParkingSpot spot;
    
    public Ticket(String licensePlate, VehicleType type, ParkingSpot spot) {
        this.id = UUID.randomUUID().toString();
        this.licensePlate = licensePlate;
        this.vehicleType = type;
        this.spot = spot;
        this.entryTime = Instant.now();
    }
    
    // getters
    public String getId() { return id; }
    public Instant getEntryTime() { return entryTime; }
    public VehicleType getVehicleType() { return vehicleType; }
    public ParkingSpot getSpot() { return spot; }
}

// ===== Payment =====
class Payment {
    public boolean process(double amount, String method) {
        // Stub: integrate with payment gateway
        return true;
    }
}

// ===== ParkingLot (Singleton) =====
class ParkingLot {
    private static ParkingLot instance;
    private List<Floor> floors;
    private PricingStrategy pricing;
    private Map<String, Ticket> activeTickets = new ConcurrentHashMap<>();
    
    private ParkingLot(List<Floor> floors, PricingStrategy p) {
        this.floors = floors;
        this.pricing = p;
    }
    
    public static synchronized ParkingLot init(List<Floor> floors, PricingStrategy p) {
        if (instance == null) instance = new ParkingLot(floors, p);
        return instance;
    }
    
    public static ParkingLot getInstance() { return instance; }
    
    public Ticket parkVehicle(Vehicle v) {
        for (Floor f : floors) {
            ParkingSpot spot = f.findFreeSpot(v);
            if (spot != null) {
                Ticket ticket = new Ticket(v.getLicensePlate(), v.getType(), spot);
                activeTickets.put(ticket.getId(), ticket);
                return ticket;
            }
        }
        return null;  // No spot available
    }
    
    public double unparkVehicle(String ticketId, String paymentMethod) {
        Ticket ticket = activeTickets.remove(ticketId);
        if (ticket == null) throw new IllegalArgumentException("Invalid ticket");
        
        double fee = pricing.calculate(ticket);
        new Payment().process(fee, paymentMethod);
        ticket.getSpot().unpark();
        return fee;
    }
}
```

## Step 7: Discussion

**Design patterns used:**
- **Singleton:** `ParkingLot.getInstance()` ensures one global instance.
- **Strategy:** `PricingStrategy` interface allows swapping `HourlyPricing` ↔ `DailyPricing` ↔ `MonthlyPass`.
- **Polymorphism:** `Vehicle` base + Car/Bike/Truck subtypes. New types added without changing existing code.

**SOLID adherence:**
- **Single Responsibility:** `Floor` finds spots; `Payment` processes payments; `Ticket` is data only.
- **Open/Closed:** Add new pricing → new class; add new vehicle → new subclass. No edits to existing.
- **Dependency Inversion:** `ParkingLot` depends on `PricingStrategy` interface, not concrete pricing.

**Concurrency:**
- `ParkingSpot.park()` and `Floor.findFreeSpot()` are `synchronized`.
- `activeTickets` uses `ConcurrentHashMap`.

## Step 8: Variations / Follow-ups

- **EV charging spots:** add `isEVCharger` to ParkingSpot; new method `findEVSpot()`.
- **Reservations:** add `Reservation` entity + booking time window.
- **Multiple entry/exit gates with congestion:** queue at gate; assign nearest free spot.
- **DB persistence:** introduce repositories (`ParkingSpotRepository`) instead of in-memory lists.

---

# DESIGN 2: LRU CACHE (Data Structure Design)

**Difficulty:** ⭐⭐ (Tests data structure thinking + OOP.)

## Problem
Design an LRU (Least Recently Used) cache with O(1) get and put.

## Step 1: Clarifying Questions

- Capacity fixed?
> Yes, set at construction.

- Thread-safe?
> Single-threaded for now; mention thread-safety as extension.

- Generic types?
> Yes, `LRUCache<K, V>`.

## Step 2: Functional Requirements

1. `get(K key)` → V or null. Move accessed item to "most recently used."
2. `put(K key, V value)` → if at capacity, evict least recently used; otherwise insert.

## Step 3: Why O(1)?

- We need O(1) for get → use **HashMap** for lookup.
- We need O(1) for tracking recency → use **doubly linked list** (move to head, evict from tail).
- HashMap value points to a node in the doubly linked list.

```
HashMap: key → Node
DLL:     [head] ← MRU ↔ ... ↔ LRU → [tail]
```

## Step 4: Class Design

```
+---------------------+
|  LRUCache<K, V>     |
+---------------------+
| capacity: int       |
| map: HashMap<K,Node>|
| head, tail: Node    |
+---------------------+
| get(K): V           |
| put(K, V): void     |
| - addFront(node)    |
| - remove(node)      |
+---------------------+
        |
        | uses
        v
+---------------------+
|       Node          |
+---------------------+
| key: K, value: V    |
| prev, next: Node    |
+---------------------+
```

## Step 5: Java Code

```java
class LRUCache<K, V> {
    
    private class Node {
        K key; V value; Node prev, next;
        Node(K k, V v) { key = k; value = v; }
    }
    
    private final int capacity;
    private final Map<K, Node> map;
    private final Node head, tail;  // dummy head/tail
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        head.next = tail;
        tail.prev = head;
    }
    
    public V get(K key) {
        Node node = map.get(key);
        if (node == null) return null;
        moveToFront(node);
        return node.value;
    }
    
    public void put(K key, V value) {
        Node existing = map.get(key);
        if (existing != null) {
            existing.value = value;
            moveToFront(existing);
            return;
        }
        if (map.size() == capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
        Node node = new Node(key, value);
        addFront(node);
        map.put(key, node);
    }
    
    private void addFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void moveToFront(Node node) {
        remove(node);
        addFront(node);
    }
}
```

## Step 7: Discussion

- **Why doubly linked list?** Removing the LRU (tail) and updating MRU (head) needs both prev and next pointers in O(1). Singly linked = O(N) to remove.
- **Why dummy head/tail?** Avoids null checks when adding/removing edge nodes.
- **Generic types:** any K, V.

## Step 8: Variations / Follow-ups

- **Thread-safe LRU:** wrap each method in `synchronized`, or use `ReentrantLock`. For high concurrency, consider segmented LRU.
- **TTL (Time-To-Live):** add expiry timestamp to Node; lazy-expire on access or have a background cleanup thread.
- **LFU instead of LRU:** evict least frequently used. Need frequency-keyed structure (HashMap of int frequency → DLL of nodes at that frequency).
- **Java's built-in:** `LinkedHashMap` with `accessOrder=true` gives LRU for free; override `removeEldestEntry()`.

---

# DESIGN 3: SPLITWISE (Multi-Entity with Relationships)

**Difficulty:** ⭐⭐⭐ (Real-world multi-entity modeling.)

## Problem
Design a system to track expenses among friends, where any user can pay for any group, and balances are computed per pair.

## Step 1: Clarifying Questions

- Group expenses or 1:1?
> Both — but group is harder; design for group.

- Splitting types?
> Equal, exact amount, percentage.

- Settle up?
> Yes — calculate who owes whom, simplify if possible.

- Currencies?
> Single currency for now.

## Step 2: Functional Requirements

1. Add user
2. Create group with users
3. Add expense to group with split type (equal/exact/percentage)
4. Show balance for a user (who owes them, whom they owe)
5. Settle a balance between two users

## Step 4: Identify Entities

| Class | Purpose |
|-------|---------|
| `User` | Identifies a person. |
| `Group` | Collection of users. |
| `Expense` | A single payment. Has payer + total amount + splits. |
| `Split` (abstract) | How an expense is divided per user. |
| `EqualSplit`, `ExactSplit`, `PercentSplit` | Strategy variants. |
| `BalanceSheet` | Tracks who owes whom (per pair). |
| `ExpenseManager` | Top-level service / Singleton-ish. |

## Step 5: Class Design

```
                                  +-------------------+
                                  |  ExpenseManager   |
                                  +-------------------+
                                  | users, groups,    |
                                  | balanceSheet      |
                                  +-------------------+
                                  | addExpense()      |
                                  | showBalance()     |
                                  | settleUp()        |
                                  +-------------------+
                                          |
                       +------------------+-----------------+
                       v                                    v
              +----------------+                   +-----------------+
              |     Group      |                   | BalanceSheet    |
              +----------------+                   +-----------------+
              | users, expenses|                   | balances:       |
              +----------------+                   |   Map<(u1,u2),  |
                       |                           |        amount>  |
                       v                           +-----------------+
              +----------------+
              |    Expense     |
              +----------------+
              | id, payer, amt |
              | splits: List   |
              +----------------+
                       |
                       v
              +----------------+
              |    Split       | <abstract>
              +----------------+
              | user, amount   |
              +----------------+
                  ^   ^   ^
                  |   |   |
        +--------+ +-----+ +----------+
        | Equal | |Exact|  | Percent |
        +-------+ +-----+  +---------+
```

## Step 6: Java Code

```java
class User {
    private String id, name, email;
    public User(String id, String name, String email) { this.id=id; this.name=name; this.email=email; }
    public String getId() { return id; }
}

abstract class Split {
    protected User user;
    protected double amount;
    public Split(User u) { this.user = u; }
    public User getUser() { return user; }
    public double getAmount() { return amount; }
    public void setAmount(double a) { this.amount = a; }
}

class EqualSplit extends Split {
    public EqualSplit(User u) { super(u); }
}

class ExactSplit extends Split {
    public ExactSplit(User u, double a) { super(u); this.amount = a; }
}

class PercentSplit extends Split {
    private double percent;
    public PercentSplit(User u, double percent) { super(u); this.percent = percent; }
    public double getPercent() { return percent; }
}

enum ExpenseType { EQUAL, EXACT, PERCENT }

class Expense {
    private String id;
    private User paidBy;
    private double totalAmount;
    private List<Split> splits;
    private ExpenseType type;
    
    public Expense(String id, User paidBy, double total, List<Split> splits, ExpenseType type) {
        this.id = id; this.paidBy = paidBy; this.totalAmount = total;
        this.splits = splits; this.type = type;
        validateAndComputeAmounts();
    }
    
    private void validateAndComputeAmounts() {
        switch (type) {
            case EQUAL:
                double per = totalAmount / splits.size();
                for (Split s : splits) s.setAmount(per);
                break;
            case EXACT:
                double sum = splits.stream().mapToDouble(Split::getAmount).sum();
                if (Math.abs(sum - totalAmount) > 0.01)
                    throw new IllegalArgumentException("Splits don't add up");
                break;
            case PERCENT:
                double pSum = splits.stream()
                    .mapToDouble(s -> ((PercentSplit) s).getPercent()).sum();
                if (Math.abs(pSum - 100) > 0.01)
                    throw new IllegalArgumentException("Percents don't sum to 100");
                for (Split s : splits) {
                    s.setAmount(totalAmount * ((PercentSplit) s).getPercent() / 100);
                }
                break;
        }
    }
    
    public User getPaidBy() { return paidBy; }
    public List<Split> getSplits() { return splits; }
    public double getTotalAmount() { return totalAmount; }
}

class BalanceSheet {
    // balances.get(A).get(B) = how much A owes B (positive) or B owes A (negative)
    private Map<String, Map<String, Double>> balances = new HashMap<>();
    
    public synchronized void recordExpense(Expense e) {
        User payer = e.getPaidBy();
        for (Split s : e.getSplits()) {
            User u = s.getUser();
            if (u.getId().equals(payer.getId())) continue;
            // u owes payer: amount
            update(u.getId(), payer.getId(), s.getAmount());
        }
    }
    
    private void update(String fromId, String toId, double amount) {
        // Increase fromId → toId by amount
        balances.computeIfAbsent(fromId, k -> new HashMap<>())
                .merge(toId, amount, Double::sum);
        // Decrease toId → fromId by amount (mirror)
        balances.computeIfAbsent(toId, k -> new HashMap<>())
                .merge(fromId, -amount, Double::sum);
    }
    
    public double getBalance(String userA, String userB) {
        return balances.getOrDefault(userA, Map.of()).getOrDefault(userB, 0.0);
    }
    
    public Map<String, Double> getAllBalances(String userId) {
        return balances.getOrDefault(userId, new HashMap<>());
    }
    
    public synchronized void settle(String fromId, String toId, double amount) {
        update(fromId, toId, -amount);  // fromId pays toId, reducing their debt
    }
}

class ExpenseManager {
    private Map<String, User> users = new HashMap<>();
    private BalanceSheet balanceSheet = new BalanceSheet();
    
    public void addUser(User u) { users.put(u.getId(), u); }
    
    public void addExpense(Expense e) {
        balanceSheet.recordExpense(e);
    }
    
    public void showBalance(String userId) {
        Map<String, Double> bal = balanceSheet.getAllBalances(userId);
        for (Map.Entry<String, Double> entry : bal.entrySet()) {
            if (entry.getValue() > 0)
                System.out.println(userId + " owes " + entry.getKey() + ": " + entry.getValue());
            else if (entry.getValue() < 0)
                System.out.println(entry.getKey() + " owes " + userId + ": " + (-entry.getValue()));
        }
    }
    
    public void settleUp(String fromId, String toId, double amount) {
        balanceSheet.settle(fromId, toId, amount);
    }
}
```

## Step 7: Discussion

**Design patterns used:**
- **Strategy:** `Split` hierarchy lets us swap split type. `Expense` doesn't know about specific splits.
- **Polymorphism:** `validateAndComputeAmounts()` switches on type (could be replaced by polymorphic `Split.compute()` for cleaner code).
- **Composition:** `Expense` has `Split`s; `BalanceSheet` aggregates pairs.

**SOLID:**
- **SRP:** `BalanceSheet` only tracks balances. `Expense` only represents a transaction.
- **OCP:** New split types → just add new `Split` subclass.

## Step 8: Variations / Follow-ups

- **Simplify debts:** if A→B owes 100, B→C owes 100 → simplify to A→C owes 100. Use graph algorithms.
- **Multiple currencies:** add `Currency` field to `Expense`; convert via FX rate at expense time.
- **Group splits:** add `Group` entity with members; expense belongs to a group.
- **Notifications:** Observer pattern — when an expense is added, notify all involved users.

---

# DESIGN 4: RATE LIMITER (Concurrency + Algorithms)

**Difficulty:** ⭐⭐⭐⭐ (Tests algorithm choice + thread-safety.)

## Problem
Design a rate limiter that allows N requests per user per minute.

## Step 1: Clarifying Questions

- Per user or global?
> Per user.

- Algorithms preferred?
> Show 3 (Token Bucket, Leaky Bucket, Sliding Window) and discuss trade-offs.

- Distributed?
> Single-machine for now; mention Redis-based as extension.

## Step 2: Functional Requirements

1. `allow(userId)` → bool. True if request allowed; false if rate-limited.

## Step 3: Algorithms

### Token Bucket
- Each user has a bucket with N tokens.
- Tokens refill at rate R per second.
- Each request consumes 1 token. If bucket empty → reject.
- **Pros:** Allows burst (up to bucket size). Smooth.
- **Used by:** AWS API Gateway, Stripe.

### Leaky Bucket
- Requests go into a queue (the bucket).
- Bucket "leaks" at constant rate R.
- If bucket full → reject.
- **Pros:** Smooth output rate (no bursts).
- **Cons:** No burst tolerance.

### Sliding Window Log
- Store timestamps of last requests.
- On new request, drop timestamps older than window; if count < limit, allow.
- **Pros:** Most accurate.
- **Cons:** Memory grows with request rate.

### Sliding Window Counter
- Approximate. Two counters: current minute + previous minute. Weighted.
- **Pros:** Fixed memory. Used widely.

## Step 5: Java Code (Token Bucket)

```java
class TokenBucket {
    private final int capacity;
    private final double refillRatePerSec;
    private double tokens;
    private long lastRefillTime;
    
    public TokenBucket(int capacity, double refillRatePerSec) {
        this.capacity = capacity;
        this.refillRatePerSec = refillRatePerSec;
        this.tokens = capacity;
        this.lastRefillTime = System.nanoTime();
    }
    
    public synchronized boolean allowRequest() {
        refill();
        if (tokens >= 1) {
            tokens -= 1;
            return true;
        }
        return false;
    }
    
    private void refill() {
        long now = System.nanoTime();
        double elapsedSec = (now - lastRefillTime) / 1_000_000_000.0;
        tokens = Math.min(capacity, tokens + elapsedSec * refillRatePerSec);
        lastRefillTime = now;
    }
}

class RateLimiter {
    private final ConcurrentMap<String, TokenBucket> userBuckets = new ConcurrentHashMap<>();
    private final int capacity;
    private final double refillRatePerSec;
    
    public RateLimiter(int capacity, double refillRatePerSec) {
        this.capacity = capacity;
        this.refillRatePerSec = refillRatePerSec;
    }
    
    public boolean allow(String userId) {
        TokenBucket bucket = userBuckets.computeIfAbsent(
            userId, k -> new TokenBucket(capacity, refillRatePerSec));
        return bucket.allowRequest();
    }
}
```

### Sliding Window Log

```java
class SlidingWindowLog {
    private final int limit;
    private final long windowMs;
    private final Map<String, Deque<Long>> userLogs = new ConcurrentHashMap<>();
    
    public SlidingWindowLog(int limit, long windowMs) {
        this.limit = limit; this.windowMs = windowMs;
    }
    
    public synchronized boolean allow(String userId) {
        Deque<Long> log = userLogs.computeIfAbsent(userId, k -> new ArrayDeque<>());
        long now = System.currentTimeMillis();
        while (!log.isEmpty() && log.peekFirst() <= now - windowMs) log.pollFirst();
        if (log.size() < limit) {
            log.offerLast(now);
            return true;
        }
        return false;
    }
}
```

## Step 7: Discussion

**Design patterns:**
- **Strategy** could let you swap `TokenBucket` ↔ `LeakyBucket` ↔ `SlidingWindow` behind a `RateLimitStrategy` interface.
- **Concurrency:** `ConcurrentHashMap` for per-user, `synchronized` inside each bucket.

**Trade-offs:**
- Token Bucket: best for APIs with burst tolerance.
- Leaky Bucket: best for steady-rate services (e.g., audio streaming).
- Sliding Window Log: most accurate; high memory.
- Sliding Window Counter: fixed memory; slight inaccuracy.

## Step 8: Variations / Follow-ups

- **Distributed rate limiter:** state in Redis. Use Lua script for atomic check-and-decrement (avoid race).
- **Per-endpoint limits:** separate bucket per (user, endpoint).
- **Burst + sustained:** combine token bucket (burst) + leaky bucket (sustained).
- **Cleanup:** background thread evicts inactive user buckets to prevent memory leak.

---

# DESIGN 5: SNAKE & LADDER (State + Rules)

**Difficulty:** ⭐⭐⭐ (Tests game state modeling.)

## Problem
Design Snake and Ladder for N players on a board with snakes and ladders.

## Step 1: Clarifying Questions

- Number of players?
> 2 to 4.

- Board size?
> Standard 100 cells (10x10).

- Snake/ladder positions?
> Configurable.

- Win condition?
> First to reach exactly 100. If overshoots, stays.

## Step 2: Functional Requirements

1. Initialize board with snakes and ladders.
2. Each turn: roll dice (1–6), move player, apply snakes/ladders.
3. Detect win.

## Step 4: Identify Entities

| Class | Purpose |
|-------|---------|
| `Game` | Orchestrates turns. |
| `Board` | Holds cells, snakes, ladders. |
| `Player` | Has position. |
| `Dice` | Random number generator. |
| `Snake`, `Ladder` (or unified `Jump`) | Has start, end. |

## Step 5: Java Code

```java
class Dice {
    private final int faces;
    private final Random random = new Random();
    public Dice(int faces) { this.faces = faces; }
    public int roll() { return random.nextInt(faces) + 1; }
}

class Player {
    private String name;
    private int position = 0;
    public Player(String name) { this.name = name; }
    public String getName() { return name; }
    public int getPosition() { return position; }
    public void setPosition(int p) { this.position = p; }
}

class Jump {
    private int start, end;
    public Jump(int start, int end) { this.start = start; this.end = end; }
    public int getStart() { return start; }
    public int getEnd() { return end; }
    public boolean isSnake() { return end < start; }
}

class Board {
    private final int size;
    private final Map<Integer, Jump> jumps = new HashMap<>();  // position -> destination
    
    public Board(int size, List<Jump> jumpList) {
        this.size = size;
        for (Jump j : jumpList) jumps.put(j.getStart(), j);
    }
    
    public int getNextPosition(int position) {
        Jump j = jumps.get(position);
        return j == null ? position : j.getEnd();
    }
    
    public int getSize() { return size; }
}

class Game {
    private final Board board;
    private final Dice dice;
    private final Deque<Player> playerQueue;
    private Player winner;
    
    public Game(Board board, Dice dice, List<Player> players) {
        this.board = board;
        this.dice = dice;
        this.playerQueue = new ArrayDeque<>(players);
    }
    
    public void start() {
        while (winner == null) {
            playTurn();
        }
        System.out.println("Winner: " + winner.getName());
    }
    
    private void playTurn() {
        Player current = playerQueue.pollFirst();
        int roll = dice.roll();
        int newPos = current.getPosition() + roll;
        
        if (newPos > board.getSize()) {
            // Stay (overshoot rule)
        } else {
            int afterJump = board.getNextPosition(newPos);
            current.setPosition(afterJump);
            System.out.println(current.getName() + " rolled " + roll + " → " + afterJump);
            if (afterJump == board.getSize()) {
                winner = current;
                return;
            }
        }
        playerQueue.offerLast(current);  // back of queue
    }
}
```

## Step 7: Discussion

**Design patterns:**
- **Composition:** Game has Board, Dice, Players.
- **Encapsulation:** Player.position is hidden behind getter/setter.

**Extension hooks:**
- **More dice rules:** roll again on 6, two dice, etc. → Add `DiceStrategy` interface.
- **Multiple boards / variants:** Board could be abstract; new boards implement `getNextPosition`.

## Step 8: Variations / Follow-ups

- **Multiple games concurrently:** wrap Game in a `GameManager`.
- **Persistence:** save game state to disk (serialize Game, Players, Board).
- **AI player:** subclass `Player` with auto-roll logic.
- **Online multiplayer:** add network layer; use Observer for state updates to clients.

---

# DESIGN 6: LIBRARY MANAGEMENT SYSTEM (Full System)

**Difficulty:** ⭐⭐⭐⭐ (Multi-actor, multi-entity, full workflow.)

## Problem
Design a library management system supporting members, librarians, books (multiple copies), search, borrow, return, fines.

## Step 1: Clarifying Questions

- Book copies? Multiple copies of the same book?
> Yes.

- Search by?
> Title, author, ISBN, category.

- Roles?
> Member, Librarian.

- Fine policy?
> Per day late.

## Step 2: Functional Requirements

1. Add/remove books (librarian).
2. Search books.
3. Borrow / return book (member).
4. Compute fine.
5. Track history.

## Step 4: Identify Entities

| Class | Purpose |
|-------|---------|
| `User` (abstract) | Base for Member, Librarian. |
| `Member` | Borrows books. |
| `Librarian` | Manages catalog. |
| `Book` | Title, author, ISBN, category. |
| `BookItem` | Physical copy of a Book. |
| `Library` | Top-level. |
| `Catalog` | Collection of books with search. |
| `Loan` | Records a borrow event. |
| `FineCalculator` | Strategy for fines. |

## Step 5: Java Code

```java
enum BookStatus { AVAILABLE, BORROWED, RESERVED, LOST }

class Book {
    private String isbn, title, author, category;
    public Book(String isbn, String title, String author, String category) {
        this.isbn = isbn; this.title = title; this.author = author; this.category = category;
    }
    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getCategory() { return category; }
}

class BookItem {
    private String barcode;
    private Book book;
    private BookStatus status;
    
    public BookItem(String barcode, Book book) {
        this.barcode = barcode; this.book = book;
        this.status = BookStatus.AVAILABLE;
    }
    
    public BookStatus getStatus() { return status; }
    public void setStatus(BookStatus s) { this.status = s; }
    public Book getBook() { return book; }
    public String getBarcode() { return barcode; }
}

abstract class User {
    protected String id, name, email;
    public User(String id, String name, String email) {
        this.id = id; this.name = name; this.email = email;
    }
    public String getId() { return id; }
}

class Member extends User {
    private List<Loan> currentLoans = new ArrayList<>();
    public Member(String id, String name, String email) { super(id, name, email); }
    public List<Loan> getLoans() { return currentLoans; }
    public void addLoan(Loan l) { currentLoans.add(l); }
    public void removeLoan(Loan l) { currentLoans.remove(l); }
}

class Librarian extends User {
    public Librarian(String id, String name, String email) { super(id, name, email); }
}

class Loan {
    private String id;
    private BookItem item;
    private Member member;
    private Instant borrowDate, dueDate, returnDate;
    
    public Loan(BookItem item, Member member, int loanDays) {
        this.id = UUID.randomUUID().toString();
        this.item = item; this.member = member;
        this.borrowDate = Instant.now();
        this.dueDate = borrowDate.plus(Duration.ofDays(loanDays));
    }
    
    public void markReturned() { this.returnDate = Instant.now(); }
    public Instant getDueDate() { return dueDate; }
    public Instant getReturnDate() { return returnDate; }
    public BookItem getItem() { return item; }
    public Member getMember() { return member; }
}

interface FineCalculator {
    double calculate(Loan loan);
}

class StandardFineCalculator implements FineCalculator {
    private static final double PER_DAY = 5.0;
    @Override
    public double calculate(Loan loan) {
        Instant returned = loan.getReturnDate() != null ? loan.getReturnDate() : Instant.now();
        long lateDays = Duration.between(loan.getDueDate(), returned).toDays();
        return Math.max(0, lateDays) * PER_DAY;
    }
}

class Catalog {
    private Map<String, List<BookItem>> isbnToItems = new HashMap<>();
    private Map<String, List<Book>> titleToBooks = new HashMap<>();
    private Map<String, List<Book>> authorToBooks = new HashMap<>();
    
    public void addBookItem(BookItem item) {
        Book b = item.getBook();
        isbnToItems.computeIfAbsent(b.getIsbn(), k -> new ArrayList<>()).add(item);
        titleToBooks.computeIfAbsent(b.getTitle().toLowerCase(), k -> new ArrayList<>()).add(b);
        authorToBooks.computeIfAbsent(b.getAuthor().toLowerCase(), k -> new ArrayList<>()).add(b);
    }
    
    public List<BookItem> findAvailable(String isbn) {
        return isbnToItems.getOrDefault(isbn, List.of()).stream()
            .filter(i -> i.getStatus() == BookStatus.AVAILABLE)
            .collect(Collectors.toList());
    }
    
    public List<Book> searchByTitle(String title) {
        return titleToBooks.getOrDefault(title.toLowerCase(), List.of());
    }
    
    public List<Book> searchByAuthor(String author) {
        return authorToBooks.getOrDefault(author.toLowerCase(), List.of());
    }
}

class Library {
    private Catalog catalog = new Catalog();
    private Map<String, Member> members = new HashMap<>();
    private Map<String, Loan> activeLoans = new ConcurrentHashMap<>();
    private FineCalculator fineCalc = new StandardFineCalculator();
    private static final int LOAN_DAYS = 14;
    
    public void registerMember(Member m) { members.put(m.getId(), m); }
    public void addBookItem(BookItem item) { catalog.addBookItem(item); }
    
    public synchronized Loan borrow(String memberId, String isbn) {
        Member m = members.get(memberId);
        if (m == null) throw new IllegalArgumentException("Unknown member");
        List<BookItem> available = catalog.findAvailable(isbn);
        if (available.isEmpty()) throw new IllegalStateException("No copies available");
        
        BookItem item = available.get(0);
        item.setStatus(BookStatus.BORROWED);
        Loan loan = new Loan(item, m, LOAN_DAYS);
        m.addLoan(loan);
        activeLoans.put(loan.getItem().getBarcode(), loan);
        return loan;
    }
    
    public synchronized double returnBook(String barcode) {
        Loan loan = activeLoans.remove(barcode);
        if (loan == null) throw new IllegalArgumentException("No active loan");
        loan.markReturned();
        loan.getItem().setStatus(BookStatus.AVAILABLE);
        loan.getMember().removeLoan(loan);
        return fineCalc.calculate(loan);
    }
}
```

## Step 7: Discussion

**Design patterns:**
- **Strategy:** `FineCalculator` interface — easily swap for `WeekendFineCalculator`, `LoyalCustomerCalculator`, etc.
- **Composition:** `Library` has `Catalog`, `Members`. `Loan` has `BookItem` + `Member`.
- **Inheritance:** `User` → `Member` / `Librarian`.

**SOLID:**
- **SRP:** Catalog handles search; Library handles workflow; FineCalculator handles fines.
- **OCP:** Add new fine policy → new class, no changes to Library.
- **DIP:** Library depends on `FineCalculator` interface, not concrete.

## Step 8: Variations / Follow-ups

- **Reservations:** members can reserve unavailable books; notified when returned.
- **Book recommendations:** based on borrow history (Strategy pattern for recommender).
- **Multi-branch libraries:** add `Branch` entity; books can transfer between.
- **Persistence:** introduce repositories backed by DB.
- **Notification system:** Observer pattern — overdue notifications via email/SMS.

---

# PART 4: GENERAL LLD INTERVIEW TIPS

## What interviewers want to see

1. **Don't jump to code.** Spend the first 10 minutes asking clarifying questions and listing requirements.
2. **Think aloud.** Even when sketching classes, narrate your reasoning.
3. **Apply SOLID by name.** "I'll make this a Strategy because..." gets bonus points.
4. **Mention design patterns explicitly.** "This is a Singleton because there's only one ParkingLot."
5. **Discuss extension.** "If we needed to add reservations, we'd extend by..."
6. **Acknowledge concurrency.** Even basic mention scores points: "I'd add `synchronized` here for thread safety."

## Common mistakes (avoid these)

- ❌ Jumping into code in minute 2.
- ❌ Drawing a giant class diagram with 20 classes (over-engineering).
- ❌ Using `public` fields everywhere (no encapsulation).
- ❌ Forgetting interfaces and abstractions (everything is concrete).
- ❌ Ignoring the Strategy pattern when there are interchangeable behaviors.
- ❌ Saying "I'd use a HashMap" without explaining why.

## Code style for interviews

- Use Java unless told otherwise.
- Use enums, not magic strings.
- Use interfaces for swappable behavior.
- Encapsulate fields — `private` + getters/setters.
- Use `final` where appropriate.
- Use generics where they help.
- Keep methods short — under 20 lines.

---

# PART 5: STUDY CHECKLIST (Plan Months 2–6)

| Month | Design |
|-------|--------|
| Plan Month 2 (Jul 2026) | Design 1 — Parking Lot |
| Plan Month 3 (Aug 2026) | Design 2 — LRU Cache |
| Plan Month 4 (Sept 2026) | Design 3 — Splitwise |
| Plan Month 5 (Oct 2026) | Design 4 — Rate Limiter |
| Plan Month 6 (Nov 2026) | Designs 5 + 6 — Snake & Ladder + Library |

For each design:
- [ ] Read the section
- [ ] Implement from scratch in Java without looking
- [ ] Push to GitHub with README explaining design choices
- [ ] Re-implement after 30 days
- [ ] Verbalize the design in interview style (record yourself)

---

# PART 6: COMMON LLD INTERVIEW QUESTIONS (BEYOND THESE 6)

After the 6 above, these may come up at SDE-2 interviews:

| Design | Difficulty | Key concepts |
|--------|------------|--------------|
| Tic Tac Toe | ⭐ | State + win check |
| Vending Machine | ⭐⭐ | State machine pattern |
| Elevator System | ⭐⭐⭐ | Strategy (scheduling), concurrency |
| Chess Game | ⭐⭐⭐ | Polymorphism (pieces), strategy |
| Movie Booking (BookMyShow) | ⭐⭐⭐⭐ | Concurrency on seat lock |
| Online Shopping (Amazon-lite) | ⭐⭐⭐⭐ | Multi-actor, payments, cart |
| ATM | ⭐⭐⭐ | State machine, transactions |
| Stack Overflow / Twitter | ⭐⭐⭐⭐ | Multi-entity, feeds, follower graph |
| Trading System | ⭐⭐⭐⭐⭐ | Order matching, concurrency |

Approach is identical to the 6 above. Apply the 6-step framework. Prioritize:
- **Vending Machine** (state machine pattern is reused everywhere)
- **Movie Booking** (frequently asked at Tier B)
- **Elevator** (real-world concurrency)

---

# RESOURCES (pick ONE)

1. **Concept && Coding** YouTube channel — Indian, Java-focused, LLD walkthroughs.
2. **Refactoring Guru (refactoring.guru)** — for design patterns details.
3. **GitHub: kanmaytacker/fundamentals** — clean Java LLD examples.
4. **System Design Interview Vol 2** by Alex Xu — has LLD chapters.

For each design above, watch one video, read this doc, then implement on your own.

---

*Doc last updated: May 2026. 6 designs covered in increasing complexity. By Plan Month 6 (November 2026), all 6 should be on GitHub, re-implemented at least once. This is your LLD interview portfolio.*
