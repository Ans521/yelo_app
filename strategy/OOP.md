# Object-Oriented Programming — Tier B Interview-Ready

> Lean OOP reference for Tier B SDE-1/SDE-2 interviews (Visa, JPMC, Razorpay, PayPal, CRED, PhonePe). Java-focused. Covers exactly what's asked in OAs and tech rounds.

---

## Where this fits

| File | Status | Finish by |
|------|--------|-----------|
| OS.md | ✅ | — |
| DBMS.md | ✅ | — |
| CN.md | ✅ | — |
| **OOP.md (this file)** | In progress | **End of October 2026** (Plan Month 5) |
| LLD.md | Pending | End of November 2026 |
| HLD.md | Pending | End of December 2026 |

OOP is the bridge into LLD. Master OOP this month → LLD designs become natural next month.

---

## How to use this doc

Each topic: **What → Why → How → Interview Q&A.** Examples in Java (your work language).

Re-read schedule: Day +7 (full), Day +30 (Q&A only), monthly thereafter.

---

# PART 1: WHAT IS OOP?

## OOP in one sentence
A way of structuring code around **objects** (which combine data + behavior) instead of around **functions** (procedural).

## Why OOP?
- **Modularity:** code grouped into related units (classes)
- **Reusability:** inheritance, composition
- **Encapsulation:** hide internal state, expose only what's needed
- **Maintainability:** changes localized to one class
- **Real-world modeling:** code mirrors actual entities (User, Order, Car)

---

# PART 2: CLASS AND OBJECT

## Class
A **blueprint** that defines what attributes (data) and behaviors (methods) an object will have.

```java
class Car {
    String color;
    int speed;
    
    void accelerate() { speed += 10; }
}
```

## Object
A specific **instance** of a class with actual values.

```java
Car myCar = new Car();
myCar.color = "Red";
myCar.accelerate();
```

## Class vs Object (often asked)

| Class | Object |
|-------|--------|
| Blueprint / template | Actual instance |
| No memory until instantiated | Has its own memory |
| Defined once | Created many times |
| Logical | Physical (in memory) |

---

# PART 3: 4 PILLARS OF OOP

These four are **must-know cold**. Every interview asks at least one.

## 3.1 Encapsulation

**What:** Bundling data (fields) + methods that operate on them into a class, and **hiding internal state** behind controlled access.

**How:** Make fields `private`, expose `public` getters/setters.

```java
class BankAccount {
    private double balance;  // hidden
    
    public double getBalance() { return balance; }
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
}
```

**Why:** Prevents outside code from putting object in invalid state. Internal representation can change without breaking callers.

## 3.2 Inheritance

**What:** A class **extends** another, inheriting its fields and methods.

```java
class Animal {
    void eat() { ... }
}
class Dog extends Animal {
    void bark() { ... }
}
// Dog has eat() AND bark()
```

**Why:** Code reuse + IS-A relationship modeling.

**Types:**
- **Single:** A → B
- **Multilevel:** A → B → C
- **Hierarchical:** A → B and A → C
- **Multiple:** Java doesn't allow for classes (uses interfaces instead). C++ allows but causes the "diamond problem."

## 3.3 Polymorphism

**What:** Same interface, different behavior depending on the actual object type.

**Two types:**

### Compile-time (Method Overloading)
Same method name, different parameter lists in same class.
```java
class Calculator {
    int add(int a, int b) { return a+b; }
    double add(double a, double b) { return a+b; }
    int add(int a, int b, int c) { return a+b+c; }
}
```

### Runtime (Method Overriding)
Subclass provides its own implementation of a parent method.
```java
class Animal { void speak() { ... } }
class Dog extends Animal { 
    @Override void speak() { System.out.println("Bark"); }
}
class Cat extends Animal { 
    @Override void speak() { System.out.println("Meow"); }
}

Animal a = new Dog();
a.speak();  // "Bark" — decided at runtime based on actual type
```

## 3.4 Abstraction

**What:** Hiding implementation details, exposing only essentials.

**How (in Java):**
- **Abstract class:** can have abstract methods (no body) + concrete methods.
- **Interface:** pure abstraction (all methods abstract until Java 8 default methods).

```java
abstract class Shape {
    abstract double area();  // no body — subclass must implement
    void print() { System.out.println(area()); }  // concrete
}

class Circle extends Shape {
    double radius;
    @Override double area() { return Math.PI * radius * radius; }
}
```

**Why:** Caller doesn't need to know how `area()` is computed — just that every Shape has one.

## Encapsulation vs Abstraction (commonly confused)
- **Encapsulation:** Hides **state** (data) by wrapping it in a class with controlled access.
- **Abstraction:** Hides **complexity** of implementation; exposes only the necessary interface.

> Encapsulation: "I won't let you touch my internal data directly."
> Abstraction: "I won't show you how this works internally."

---

## Q&A — 4 Pillars

**Q: 4 pillars of OOP?**
> Encapsulation (data hiding), Inheritance (code reuse via IS-A), Polymorphism (one interface, many forms), Abstraction (hide implementation, show interface).

**Q: Encapsulation vs Abstraction?**
> Encapsulation hides data via private fields + getters/setters. Abstraction hides complexity via abstract classes / interfaces. Encapsulation is "how data is stored"; abstraction is "what behavior is exposed."

**Q: Method overloading vs overriding?**
> Overloading: same method name, different parameters, in same class — resolved at compile time. Overriding: subclass redefines a parent method with same signature — resolved at runtime based on actual object.

**Q: Why doesn't Java support multiple inheritance (with classes)?**
> Avoids the **diamond problem** — if class D extends B and C, both of which extend A, ambiguity in which version of A's methods D inherits. Java solves this by allowing multiple **interface** inheritance (but only single class inheritance).

---

# PART 4: ABSTRACT CLASS vs INTERFACE (high-frequency)

## Abstract Class
A class that **can't be instantiated**. Can have abstract methods (no body) + concrete methods.

```java
abstract class Vehicle {
    String name;             // can have state
    Vehicle(String n) { name = n; }  // can have constructor
    abstract void drive();   // abstract method
    void honk() { ... }      // concrete method
}
```

## Interface
A **pure contract**. Until Java 8, all methods abstract. From Java 8: can have `default` and `static` methods. From Java 9: can have private methods.

```java
interface Drivable {
    void drive();           // abstract by default
    default void start() {  // Java 8+
        System.out.println("Starting");
    }
}
```

## Abstract Class vs Interface

| Abstract Class | Interface |
|----------------|-----------|
| Can have state (fields) | Can only have constants (`public static final`) |
| Can have constructor | No constructor |
| Methods can be private/protected/public | Methods are public |
| Single inheritance only | Multiple inheritance allowed |
| Use for "IS-A with shared base" | Use for "CAN-DO" / capability |
| `extends` | `implements` |

## When to use which?
- **Abstract class:** when classes share both behavior AND some state (e.g., `Shape` with `name` field + abstract `area()`).
- **Interface:** when defining a capability that unrelated classes can implement (e.g., `Comparable`, `Iterable`, `Drivable` for both Car and Bike).

---

## Q&A — Abstract Class vs Interface

**Q: Abstract class vs interface?**
> Abstract class: can have state, constructor, single inheritance, used for IS-A. Interface: only constants and (since Java 8) default methods, no constructor, multiple inheritance, used for CAN-DO capability.

**Q: Can you instantiate an abstract class?**
> No. You instantiate a concrete subclass that implements all abstract methods.

**Q: Can an interface have method bodies?**
> Since Java 8: yes, `default` methods and `static` methods. Before Java 8: no.

**Q: When to choose interface over abstract class?**
> When unrelated classes need the same capability (e.g., both `File` and `Stream` are `Closeable`). When you'd benefit from multiple inheritance.

---

# PART 5: SOLID PRINCIPLES (must-know)

These are 5 design principles for writing maintainable OOP code.

## S — Single Responsibility Principle
A class should have **one reason to change** — i.e., one job.

❌ Bad:
```java
class User {
    void save() { ... }       // DB logic
    void sendEmail() { ... }  // email logic
    void render() { ... }     // UI logic
}
```

✅ Good: split into `User`, `UserRepository`, `EmailService`, `UserView`.

## O — Open/Closed Principle
Classes should be **open for extension, closed for modification**. Add new behavior by extending, not by editing existing code.

❌ Bad:
```java
class AreaCalculator {
    double area(Object shape) {
        if (shape instanceof Circle) ...
        else if (shape instanceof Square) ...
        // adding Triangle requires editing this method
    }
}
```

✅ Good: each shape implements `Shape.area()`; calculator just calls it.

## L — Liskov Substitution Principle
Subclasses must be substitutable for their base class without breaking behavior.

❌ Bad:
```java
class Bird { void fly() { ... } }
class Penguin extends Bird {
    void fly() { throw new RuntimeException("Can't fly!"); }
}
// Penguin breaks the contract — code expecting Bird now fails
```

✅ Good: split into `Bird` and `FlyingBird`. Penguin extends Bird only.

## I — Interface Segregation Principle
Don't force clients to depend on methods they don't use. Prefer many small interfaces over one fat interface.

❌ Bad:
```java
interface Worker { void work(); void eat(); }
class Robot implements Worker { 
    void eat() { /* robots don't eat */ }  // forced empty implementation
}
```

✅ Good: `Workable` and `Eatable` as separate interfaces.

## D — Dependency Inversion Principle
Depend on **abstractions** (interfaces), not on concrete implementations.

❌ Bad:
```java
class OrderService {
    private MySQLDatabase db = new MySQLDatabase();  // concrete
}
```

✅ Good:
```java
class OrderService {
    private Database db;  // interface
    OrderService(Database db) { this.db = db; }  // injected
}
```

Allows swapping MySQL for Postgres without changing OrderService.

---

## Q&A — SOLID

**Q: What does SOLID stand for?**
> Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Five principles for maintainable OOP code.

**Q: Explain Single Responsibility with an example.**
> A class should have one reason to change. E.g., a User class shouldn't handle saving to DB AND sending emails AND rendering UI — those are 3 reasons to change. Split into User, UserRepository, EmailService.

**Q: What does Liskov Substitution mean?**
> A subclass should be usable wherever the parent is expected, without breaking. Classic violation: Penguin extending Bird (which has fly()) — code that assumes "every Bird can fly" breaks for Penguin.

**Q: What is Dependency Inversion?**
> High-level code depends on abstractions (interfaces), not concrete implementations. Allows swapping implementations without changing the calling code. Foundational for unit testing.

---

# PART 6: COMPOSITION vs INHERITANCE

## Inheritance (IS-A)
`Dog` IS-A `Animal`. `Dog extends Animal`.

✅ Pros: code reuse, polymorphism.
❌ Cons: tight coupling, hard to change parent without breaking children, deep hierarchies.

## Composition (HAS-A)
`Car` HAS-A `Engine`. `Car` contains an `Engine` field.

```java
class Car {
    private Engine engine;  // composition
    Car(Engine e) { this.engine = e; }
    void start() { engine.start(); }
}
```

✅ Pros: flexible, swappable, no inheritance hierarchy issues.
❌ Cons: more boilerplate.

## Rule: "Favor composition over inheritance"
Modern OOP guidance. Use inheritance only when there's a true IS-A relationship and the parent is stable.

---

## Q&A — Composition vs Inheritance

**Q: Composition vs Inheritance?**
> Inheritance: IS-A relationship, child extends parent. Composition: HAS-A relationship, class contains another class. Composition is more flexible (you can swap implementations) — modern guidance: favor composition over inheritance.

**Q: When NOT to use inheritance?**
> When relationship isn't truly IS-A. When parent might change. When you need multiple types of behaviors (Java doesn't allow multiple class inheritance). When tight coupling causes maintenance pain.

---

# PART 7: DESIGN PATTERNS (must-know set of 6)

You don't need 23. Just these 6 cover ~80% of LLD interviews and design discussions.

## 7.1 Singleton

**Intent:** Only one instance of a class exists in the whole app.

**Use cases:** logging, config, DB connection pool.

```java
public class Logger {
    private static volatile Logger instance;
    private Logger() {}
    
    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) instance = new Logger();
            }
        }
        return instance;
    }
}
```

(Double-checked locking for thread safety.)

## 7.2 Factory

**Intent:** Encapsulate object creation logic; caller doesn't know which concrete class is created.

```java
interface Shape { void draw(); }
class Circle implements Shape { public void draw() { ... } }
class Square implements Shape { public void draw() { ... } }

class ShapeFactory {
    public static Shape create(String type) {
        switch (type) {
            case "circle": return new Circle();
            case "square": return new Square();
            default: throw new IllegalArgumentException();
        }
    }
}

Shape s = ShapeFactory.create("circle");
```

## 7.3 Observer

**Intent:** When one object changes, notify all dependents automatically.

**Use cases:** event listeners, pub-sub, UI updates.

```java
interface Observer { void update(String event); }

class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void subscribe(Observer o) { observers.add(o); }
    public void publish(String event) {
        for (Observer o : observers) o.update(event);
    }
}
```

## 7.4 Strategy

**Intent:** Encapsulate interchangeable algorithms behind a common interface.

```java
interface PaymentStrategy { void pay(double amount); }
class CreditCardPayment implements PaymentStrategy { ... }
class UPIPayment implements PaymentStrategy { ... }

class CheckoutService {
    private PaymentStrategy strategy;
    CheckoutService(PaymentStrategy s) { this.strategy = s; }
    void checkout(double amount) { strategy.pay(amount); }
}
```

Swap payment method without modifying CheckoutService.

## 7.5 Decorator

**Intent:** Add behavior to objects dynamically by wrapping them, without modifying the original class.

```java
interface Coffee { double cost(); }
class SimpleCoffee implements Coffee { public double cost() { return 5; } }

abstract class Decorator implements Coffee {
    protected Coffee wrapped;
    Decorator(Coffee c) { this.wrapped = c; }
}

class MilkDecorator extends Decorator {
    MilkDecorator(Coffee c) { super(c); }
    public double cost() { return wrapped.cost() + 1; }
}

Coffee c = new MilkDecorator(new SimpleCoffee());  // 5 + 1 = 6
```

## 7.6 Adapter

**Intent:** Make incompatible interfaces work together.

```java
// Existing class with weird interface
class OldPaymentSystem {
    public void makePayment(int rupees, int paise) { ... }
}

// New interface we want
interface PaymentService {
    void pay(double amount);
}

class PaymentAdapter implements PaymentService {
    private OldPaymentSystem old;
    public void pay(double amount) {
        int rupees = (int) amount;
        int paise = (int) ((amount - rupees) * 100);
        old.makePayment(rupees, paise);
    }
}
```

---

## Q&A — Design Patterns

**Q: What is a Singleton? When to use?**
> A class with only one instance globally. Used for shared resources: logger, config, DB connection pool. In Java, often implemented with double-checked locking for thread safety.

**Q: Factory pattern — when?**
> When the calling code shouldn't know the concrete class to create. E.g., `ShapeFactory.create("circle")` — caller doesn't deal with `new Circle()`.

**Q: Observer pattern — example?**
> Pub-sub. UI listening to model changes. Event bus. When one object changes, multiple dependents need to be notified.

**Q: Strategy vs Factory?**
> Factory creates an object once; Strategy swaps the object's *behavior* at runtime. Factory: "give me a payment method." Strategy: "checkout, but configurable on which payment to use."

**Q: Decorator vs Inheritance?**
> Inheritance adds behavior at compile-time, requires subclass per combination. Decorator wraps at runtime — flexible, composable. E.g., MilkDecorator(SugarDecorator(Coffee)) at runtime vs. needing MilkSugarCoffee class.

---

# PART 8: JAVA-SPECIFIC OOP CONCEPTS

## final keyword
- **final variable:** can't reassign.
- **final method:** can't be overridden.
- **final class:** can't be extended (e.g., `String`).

## static keyword
- **static variable:** belongs to class, not instance. Shared across all objects.
- **static method:** can be called without object (`Math.abs(...)`).
- **static block:** runs once when class is loaded.

## this and super
- **this:** reference to current object.
- **super:** reference to parent class (used to call parent method/constructor).

## Constructor
Special method that runs on object creation. Same name as class.
- **Default constructor:** parameterless; auto-generated if you don't define any.
- **Parameterized constructor:** takes args.
- **Constructor chaining:** `this(...)` calls another constructor in same class; `super(...)` calls parent's.

## Method Overloading vs Overriding (worth memorizing)

| Overloading | Overriding |
|-------------|-------------|
| Same method name, different parameters | Same name + same parameters |
| In same class | Subclass redefining parent's method |
| Compile-time (static binding) | Runtime (dynamic binding) |
| Doesn't need inheritance | Requires inheritance |
| Return type can differ | Return type must match (or covariant) |

## Generics (briefly)
Type parameters for classes/methods.

```java
class Box<T> {
    private T value;
    public T get() { return value; }
}
Box<String> box = new Box<>();
```

Type-safety at compile time, no casting needed.

## Exception Hierarchy

```
Throwable
  ├─ Error          (JVM problems — OutOfMemory, StackOverflow — usually unrecoverable)
  └─ Exception
       ├─ Checked   (must be caught or declared — IOException, SQLException)
       └─ RuntimeException (unchecked) (NullPointer, ArrayIndexOutOfBounds, IllegalArg)
```

**Checked vs Unchecked:**
- Checked: compiler forces you to handle (try-catch or `throws`).
- Unchecked: runtime exceptions, no compile enforcement.

## Common Object methods (override carefully)
- `equals(Object o)` — content equality
- `hashCode()` — must be consistent with equals
- `toString()` — string representation

**equals/hashCode contract:** if `a.equals(b)`, then `a.hashCode() == b.hashCode()`. If you override one, override both.

---

## Q&A — Java OOP

**Q: Difference between == and .equals()?**
> `==` compares references (memory addresses). `.equals()` compares content (if overridden). For `String`, `==` may be true for interned literals but `.equals()` is the safe content check.

**Q: Why override hashCode if you override equals?**
> Contract: equal objects must have equal hash codes. Hash-based collections (HashMap, HashSet) rely on this. Violating breaks lookups.

**Q: Checked vs unchecked exceptions?**
> Checked: must be caught or declared via `throws` (compile-enforced) — IOException, SQLException. Unchecked: runtime exceptions, no compile check — NullPointerException, IllegalArgumentException.

**Q: What is final / static / this / super?**
> final: can't reassign/override/extend. static: class-level (not per-instance). this: current object. super: parent class reference.

**Q: Method overloading vs overriding?**
> Overloading: same name, different params, same class — compile-time. Overriding: subclass redefines parent's method with same signature — runtime.

---

# PART 9: 20-QUESTION CONSOLIDATED Q&A BANK

## Class & Object
1. Class vs object? *(Part 2)*

## 4 Pillars
2. 4 pillars of OOP? *(Part 3)*
3. Encapsulation vs Abstraction? *(Part 3)*
4. Method overloading vs overriding? *(Part 8)*
5. Why no multiple inheritance in Java (classes)? *(Part 3)*

## Abstract Class & Interface
6. Abstract class vs interface? *(Part 4)*
7. When to use interface over abstract class? *(Part 4)*
8. Can interface have method bodies? *(Part 4)*

## SOLID
9. What does SOLID stand for? *(Part 5)*
10. Explain Single Responsibility with example. *(Part 5)*
11. Explain Liskov Substitution. *(Part 5)*
12. What is Dependency Inversion? *(Part 5)*

## Composition vs Inheritance
13. Composition vs Inheritance? *(Part 6)*

## Design Patterns
14. Singleton — when and how? *(Part 7)*
15. Factory pattern — when? *(Part 7)*
16. Observer pattern — example? *(Part 7)*
17. Strategy vs Factory? *(Part 7)*

## Java Specifics
18. final / static / this / super? *(Part 8)*
19. == vs .equals()? *(Part 8)*
20. Checked vs unchecked exceptions? *(Part 8)*

---

# STUDY CHECKLIST

By **end of October 2026 (Plan Month 5):**
- [ ] Read all parts (this doc is short — finishable in 4–5 days)
- [ ] Answer all 20 Q&A confidently
- [ ] 4 pillars + SOLID memorized cold
- [ ] Implement Singleton, Factory, Observer, Strategy in Java (push to GitHub — these are demo code for LLD designs next month)

By **end of January 2027 (Plan Month 8):**
- [ ] Final revision before applications
- [ ] All 20 Q&A verbal without notes
- [ ] All 6 design patterns explainable with code

---

# RESOURCES (pick ONE)

1. **Concept && Coding** YouTube — Indian channel, Java OOP + LLD focus. Best for Tier B.
2. **Striver OOP playlist** — quick coverage.
3. **Refactoring Guru (refactoring.guru)** — for design patterns specifically; visual + clean code examples.

For design patterns deep dive, **Refactoring Guru** is the gold standard. Use it as you build LLD designs in Plan Month 6.

---

# WHAT'S NOT HERE (for Tier S, return later)

- All 23 Gang-of-Four design patterns (you only need 6 for Tier B)
- Detailed UML diagrams (mention class/sequence diagrams briefly in LLD doc)
- Reflection API deep dive
- Java memory model, happens-before, synchronization internals
- Generics deep (wildcards, bounded types, type erasure details)
- Functional programming in Java (lambdas, streams beyond basics)
- Garbage collection internals
- ClassLoader hierarchy

These come up at FAANG senior interviews, not Tier B SDE-1/2.

---

*Doc last updated: May 2026. Re-read on Day +7, +30, monthly. ~20 Q&A + 6 design patterns implemented = the complete deliverable.*
