# DBMS — Tier B Interview-Ready

> Lean DBMS reference for Tier B SDE-1/SDE-2 interviews (Visa, JPMC, Razorpay, PayPal, CRED, PhonePe). Covers exactly what's asked in OAs, tech rounds, and SQL screens — nothing more.

---

## Where this fits in the timeline

| File | Status | Finish by |
|------|--------|-----------|
| OS.md | ✅ Done | — |
| **DBMS.md (this file)** | In progress | **End of August 2026** (Plan Month 3) |
| LLD.md | Pending | End of November 2026 |
| CN.md | Pending | End of September 2026 |
| OOP.md | Pending | End of October 2026 |
| HLD.md | Pending | End of December 2026 |

---

## How to use this doc

Each topic: **What → Why → How → Interview Q&A.** SQL section at the end has the 25 patterns you'll be tested on.

Re-read schedule: Day +7 (full), Day +30 (Q&A only), monthly thereafter.

---

# PART 1: BASICS

## What is a DBMS?
Software that stores, retrieves, and manages data in a **structured** way with consistency, security, and concurrent access.

Examples: MySQL, PostgreSQL, Oracle, MongoDB, SQL Server.

## DBMS vs File System (often asked)

| File System | DBMS |
|-------------|------|
| Plain files (.txt, .csv) | Structured database |
| No data integrity guarantees | ACID guarantees |
| No concurrent access control | Built-in concurrency control |
| Hard to query | SQL-based querying |
| Data redundancy common | Normalization reduces redundancy |
| No security model | User-level permissions |

## Types of databases
- **Relational (SQL):** MySQL, PostgreSQL, Oracle. Uses tables.
- **Non-relational (NoSQL):** MongoDB (document), Redis (key-value), Cassandra (columnar), Neo4j (graph).

For Tier B, focus on **relational + SQL.**

---

# PART 2: ER MODEL

## What is the ER (Entity-Relationship) Model?
A diagram showing entities (real-world objects), their attributes, and relationships between them.

## Entities
A real-world object — Student, Course, Order. Each row in a table is an entity instance.

## Attributes
Properties of an entity — Student has `id`, `name`, `email`.

**Types:**
- **Simple:** atomic (`age`)
- **Composite:** breaks into parts (`address` → street, city, zip)
- **Derived:** computed (`age` from `dob`)
- **Multi-valued:** can have many (`phone numbers`)

## Relationships
Connections between entities — Student *enrolls in* Course.

**Cardinality:**
- **1:1** — One Student has one Locker
- **1:N** — One Department has many Employees
- **M:N** — Students enroll in many Courses, Courses have many Students

---

# PART 3: KEYS (high-frequency interview topic)

## Primary Key
A column (or combination) that **uniquely identifies** each row. Cannot be NULL. Each table has exactly one.

Example: `student_id` in Student table.

## Candidate Key
Any column (or combination) that **could** serve as primary key — unique + non-null.
Example: both `student_id` and `email` could be primary keys → both are candidate keys, but only one is chosen.

## Super Key
Any set of columns that uniquely identifies a row (may include extra columns). Every primary key + any extra columns = super key.
Example: `{student_id}` is super key. `{student_id, name}` is also super key.

**Hierarchy:** Super Key ⊇ Candidate Key ⊇ Primary Key.

## Foreign Key
A column that **references the primary key of another table** — establishes link.
Example: `Order.customer_id` references `Customer.id`.

Enforces **referential integrity** — can't insert order with non-existent customer.

## Composite Key
A primary key made up of **2 or more columns** together.
Example: in `Enrollment(student_id, course_id, semester)`, primary key = (student_id, course_id, semester).

## Alternate Key
Candidate keys NOT chosen as primary key.

---

## Q&A — Keys

**Q: Primary vs Candidate vs Super key?**
> Super key: any set of columns that uniquely identifies a row. Candidate key: minimal super key (no redundant columns). Primary key: the candidate key chosen to uniquely identify rows.

**Q: What is a foreign key?**
> A column that references the primary key of another table to maintain referential integrity — prevents orphan records.

**Q: Can a primary key be NULL?**
> No. Primary key must be unique AND non-null.

**Q: Can a table have multiple primary keys?**
> No. One primary key per table. But that key can be **composite** (multiple columns together).

---

# PART 4: NORMALIZATION (very high-frequency)

## Why normalize?
To reduce **data redundancy** and **update anomalies** by splitting one big table into smaller related tables.

**Anomalies in unnormalized data:**
- **Insertion anomaly:** Can't add data without other unrelated data.
- **Update anomaly:** Updating one fact requires updating multiple rows.
- **Deletion anomaly:** Deleting one row loses unrelated data.

## 1NF — First Normal Form
**Rule:** Every column has atomic (indivisible) values. No multi-valued or composite columns.

❌ Not 1NF:
| id | name | phones |
|----|------|--------|
| 1 | Ansh | 9876, 8765 |

✅ 1NF:
| id | name | phone |
|----|------|-------|
| 1 | Ansh | 9876 |
| 1 | Ansh | 8765 |

## 2NF — Second Normal Form
**Rule:** 1NF + every non-key column depends on the **whole** primary key (no partial dependency).

Applies when primary key is composite.

❌ Not 2NF (composite PK = (student_id, course_id)):
| student_id | course_id | student_name | course_name |
|------------|-----------|--------------|-------------|
| 1 | C1 | Ansh | DBMS |

`student_name` depends only on `student_id`, not on the full key. Partial dependency.

✅ 2NF: split into Student(id, name), Course(id, name), Enrollment(student_id, course_id).

## 3NF — Third Normal Form
**Rule:** 2NF + no transitive dependency (non-key column shouldn't depend on another non-key column).

❌ Not 3NF:
| emp_id | dept_id | dept_name |
|--------|---------|-----------|

Here `dept_name` depends on `dept_id` (transitive: emp_id → dept_id → dept_name).

✅ 3NF: Employee(id, dept_id), Department(id, name).

## BCNF — Boyce-Codd Normal Form
**Rule:** Stricter 3NF. For every functional dependency X → Y, X must be a super key.

In simple terms: even candidate keys can't have partial dependencies on each other.

For Tier B, **knowing 1NF, 2NF, 3NF + the idea of BCNF is enough.**

## Denormalization
Intentional redundancy for **performance** — reduces JOINs at cost of update anomalies. Used in read-heavy systems (analytics, reporting).

---

## Q&A — Normalization

**Q: Why normalize?**
> Reduces data redundancy and prevents update/insert/delete anomalies.

**Q: What is 2NF vs 3NF?**
> 2NF: no partial dependency on a composite key. 3NF: no transitive dependency (non-key columns can't depend on other non-key columns).

**Q: When do you denormalize?**
> When read performance matters more than update efficiency — e.g., analytics, dashboards, search results. Trade-off: faster reads, slower/error-prone writes.

**Q: What is a functional dependency?**
> A relationship where one set of columns (X) determines another (Y) — i.e., if you know X, you know Y. Written as X → Y.

---

# PART 5: TRANSACTIONS & ACID

## What is a Transaction?
A unit of work — one or more SQL operations treated as a single logical action.

Example: bank transfer = (debit A, credit B). Both must happen or neither.

## ACID Properties (mandatory interview knowledge)

### A — Atomicity
All operations in a transaction succeed, OR all fail. No partial state.
- Implemented via **logging + rollback**.

### C — Consistency
Transaction takes DB from one valid state to another. Constraints (unique, FK, check) always hold.

### I — Isolation
Concurrent transactions don't see each other's intermediate state. As if they ran one-after-another.
- Implemented via **locking** or **MVCC** (Multi-Version Concurrency Control).

### D — Durability
Once committed, changes survive crashes/power loss.
- Implemented via **write-ahead logging (WAL)** + persistent storage.

## Transaction States
**Active → Partially Committed → Committed**
**Active → Failed → Aborted**

`COMMIT` saves changes. `ROLLBACK` undoes them.

---

## Q&A — Transactions

**Q: Explain ACID.**
> Atomicity (all-or-nothing), Consistency (valid → valid state), Isolation (concurrent txns don't interfere), Durability (committed survives crashes).

**Q: What is a transaction?**
> A logical unit of work — one or more SQL operations executed atomically. Either all commit or all roll back.

**Q: What's the difference between COMMIT and ROLLBACK?**
> COMMIT: persists changes permanently. ROLLBACK: undoes all changes since transaction started.

---

# PART 6: CONCURRENCY CONTROL & ISOLATION LEVELS

## Why?
When multiple transactions run concurrently, they can interfere — leading to dirty reads, lost updates, etc.

## Concurrency problems

### Dirty Read
Txn A reads data that Txn B has updated but not yet committed. If B rolls back, A read invalid data.

### Non-Repeatable Read
Txn A reads same row twice. Between reads, Txn B updates it. A gets different values.

### Phantom Read
Txn A runs same query (e.g., `WHERE age > 25`) twice. Between runs, Txn B inserts new matching row. A's second run includes a "phantom."

### Lost Update
Txn A and B both read X = 10, both compute X+1 = 11, both write 11. One update lost.

## Isolation Levels

| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|------------|----------------|---------|
| Read Uncommitted | ✅ Possible | ✅ | ✅ |
| Read Committed | ❌ | ✅ | ✅ |
| Repeatable Read | ❌ | ❌ | ✅ |
| Serializable | ❌ | ❌ | ❌ |

Higher isolation = more correctness, less concurrency (slower).

Default in MySQL InnoDB: **Repeatable Read**. Default in PostgreSQL: **Read Committed**.

## Locks
- **Shared (S) lock:** for reads. Multiple txns can hold simultaneously.
- **Exclusive (X) lock:** for writes. Only one at a time. Blocks all others.

**Two-Phase Locking (2PL):** Txn first acquires all locks (growing phase), then releases all (shrinking phase). Ensures serializability.

## Deadlock in DB
Same as OS deadlock — two txns waiting for each other's locks.
- DB detects via wait-for graph; aborts one txn (victim).

---

## Q&A — Concurrency

**Q: What is a dirty read?**
> When a transaction reads data written by another transaction that hasn't committed yet. If that transaction rolls back, the reader saw invalid data.

**Q: Compare isolation levels.**
> Read Uncommitted (allows everything bad), Read Committed (no dirty reads), Repeatable Read (no non-repeatable reads), Serializable (no phantom reads). Higher = more correct but slower.

**Q: What is 2PL?**
> Two-Phase Locking: a transaction acquires all needed locks (growing), then releases (shrinking). Guarantees serializability.

**Q: How are DB deadlocks resolved?**
> DB detects cycle in wait-for graph and aborts one transaction (victim) — the rest proceed. Aborted transaction can retry.

---

# PART 7: INDEXING (often asked)

## Why indexes?
Without index, finding a row = full table scan (O(N)). With index, lookup = O(log N).

Trade-off: indexes speed up reads but slow down writes (must update index on insert/update/delete).

## How indexes work
Most RDBMS use **B-tree** (or B+ tree) indexes:
- Balanced tree
- Each node has multiple keys
- Leaves are linked → enables range scans
- Lookup, insert, delete all O(log N)

## Types of Indexes

### Clustered Index
Determines **physical order** of rows in the table. Only one per table.
- In MySQL InnoDB: clustered index = primary key. Rows stored sorted by PK.
- Range queries on PK are fast.

### Non-Clustered Index (Secondary Index)
Separate structure pointing to row locations. Many per table.
- Contains indexed column + pointer to row in clustered index.

### Composite Index
Index on multiple columns: `INDEX(last_name, first_name)`.
- Useful when queries filter on left-prefix: `WHERE last_name = 'X'` ✅; `WHERE first_name = 'Y'` alone ❌ (can't use this index efficiently).

### Hash Index
For equality lookups only. O(1) lookup but no range queries. Used in memory tables (e.g., Redis).

### Bitmap Index
For columns with few distinct values (gender, status). Used in OLAP / data warehouses.

## When to use indexes
✅ Columns frequently used in `WHERE`, `JOIN`, `ORDER BY`.
❌ Tables with heavy writes (each write updates index).
❌ Columns with very low cardinality (e.g., boolean) — full scan often faster.

---

## Q&A — Indexing

**Q: How does a B-tree index work?**
> Balanced tree where each node holds multiple keys; lookup/insert/delete are O(log N). Leaves are linked, enabling fast range scans.

**Q: Clustered vs non-clustered index?**
> Clustered: determines physical order of table rows; only one per table. Non-clustered: separate structure pointing to row locations; many per table.

**Q: When NOT to add an index?**
> On heavily-written columns (write penalty), low-cardinality columns (boolean), or small tables (full scan is cheap).

**Q: Why is B-tree preferred over hash for indexes?**
> B-tree supports range queries (>, <, BETWEEN, ORDER BY) and prefix matches. Hash is O(1) for equality but useless for range.

**Q: What's a composite index? When is it used?**
> Index on multiple columns. Useful when queries filter on the leading columns — e.g., INDEX(a, b) helps `WHERE a = ?`, `WHERE a = ? AND b = ?`, but NOT `WHERE b = ?` alone.

---

# PART 8: SQL ESSENTIALS

## Joins (must know all 4)

### INNER JOIN
Returns rows with matches in both tables.
```sql
SELECT * FROM A
INNER JOIN B ON A.id = B.a_id;
```

### LEFT JOIN (LEFT OUTER)
All rows from left table + matched from right (NULLs where no match).
```sql
SELECT * FROM Customer C
LEFT JOIN Order O ON C.id = O.customer_id;
-- Includes customers with no orders
```

### RIGHT JOIN
All from right + matched from left.

### FULL OUTER JOIN
All from both tables, NULLs where no match. (MySQL doesn't support directly — emulate with UNION.)

### CROSS JOIN
Cartesian product — every row from A paired with every row from B.

## Aggregation
```sql
SELECT department, COUNT(*), AVG(salary), MAX(salary)
FROM Employee
GROUP BY department
HAVING COUNT(*) > 5;
```

`WHERE` filters rows before grouping; `HAVING` filters groups after.

## Subqueries
```sql
SELECT name FROM Employee
WHERE salary > (SELECT AVG(salary) FROM Employee);
```

**Correlated subquery:** subquery uses outer query's row.
```sql
SELECT e1.name FROM Employee e1
WHERE e1.salary > (SELECT AVG(e2.salary) FROM Employee e2 WHERE e2.dept = e1.dept);
```

## Window Functions (very high-frequency in interviews)

```sql
-- Rank salaries within each department
SELECT name, dept, salary,
       RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rk
FROM Employee;
```

**Common window functions:**
- `ROW_NUMBER()` — unique rank, no ties
- `RANK()` — same rank for ties, gaps after
- `DENSE_RANK()` — same rank for ties, no gaps
- `LAG()`, `LEAD()` — previous/next row's value
- `SUM() OVER (...)`, `AVG() OVER (...)` — running aggregates

## CTE (Common Table Expression)
```sql
WITH high_earners AS (
    SELECT * FROM Employee WHERE salary > 100000
)
SELECT department, COUNT(*) FROM high_earners GROUP BY department;
```

Cleaner than nested subqueries; supports recursion (`WITH RECURSIVE`).

## ACID-related SQL
- `BEGIN TRANSACTION` / `COMMIT` / `ROLLBACK`
- `SAVEPOINT name` / `ROLLBACK TO SAVEPOINT name`

---

## Q&A — SQL

**Q: Difference between WHERE and HAVING?**
> WHERE filters rows BEFORE grouping. HAVING filters groups AFTER aggregation.

**Q: INNER vs LEFT JOIN?**
> INNER: only matching rows from both tables. LEFT: all from left + matched from right (NULLs for unmatched).

**Q: Difference between RANK, DENSE_RANK, ROW_NUMBER?**
> ROW_NUMBER: unique sequential numbers. RANK: same rank for ties, then skips (1,1,3). DENSE_RANK: same rank for ties, no skip (1,1,2).

**Q: What is a correlated subquery?**
> A subquery that references columns from the outer query — runs once per outer row. Slower but more flexible than non-correlated.

**Q: When to use CTE vs subquery?**
> CTE for readability + reuse + recursion. Subquery for one-off inline filters. Functionally similar in most modern DBs.

---

# PART 9: 25 SQL PATTERNS YOU'LL BE TESTED ON

These are the patterns LeetCode's SQL questions and most Tier B SQL screens cover. Practice all 25 from LeetCode's Top 50 SQL list.

1. **Basic SELECT, WHERE, ORDER BY, LIMIT**
2. **GROUP BY + COUNT/SUM/AVG**
3. **HAVING after GROUP BY**
4. **INNER JOIN of 2 tables**
5. **LEFT JOIN to find missing entries**
6. **Self-join** (employee + manager in same table)
7. **Subquery in WHERE** (`WHERE x > (SELECT AVG ...)`)
8. **Subquery in FROM (derived table)**
9. **EXISTS / NOT EXISTS**
10. **IN / NOT IN**
11. **CASE WHEN for conditional column**
12. **COALESCE / IFNULL for default values**
13. **CONCAT, SUBSTRING, LIKE for string ops**
14. **DATE functions: DATE_ADD, DATEDIFF, YEAR(), MONTH()**
15. **Find Nth highest** (LIMIT N-1, 1 / DENSE_RANK)
16. **ROW_NUMBER() to dedupe**
17. **RANK() / DENSE_RANK() for ranking**
18. **LAG() / LEAD()** to compare adjacent rows
19. **Running total with SUM() OVER (...)**
20. **GROUP BY with multiple columns**
21. **Pivot using CASE WHEN + SUM**
22. **UNION vs UNION ALL**
23. **Handling NULLs (IS NULL, COALESCE, NOT IN gotcha)**
24. **CTE for clean multi-step queries**
25. **Recursive CTE** (WITH RECURSIVE — for hierarchies)

**Practice resource:** LeetCode → "SQL 50" / Top SQL Questions list. Solve all 50 in 30 days during Plan Month 3 (August 2026).

---

# PART 10: CONSOLIDATED Q&A BANK

The **20 must-know questions** for Tier B DBMS interviews:

## Basics
1. DBMS vs File System? *(Part 1)*

## Keys
2. Primary vs Candidate vs Super key? *(Part 3)*
3. What is a foreign key? *(Part 3)*
4. Composite key — what and when? *(Part 3)*

## Normalization
5. Why normalize? *(Part 4)*
6. 1NF, 2NF, 3NF — define each. *(Part 4)*
7. When do you denormalize? *(Part 4)*
8. What is a functional dependency? *(Part 4)*

## Transactions
9. Explain ACID. *(Part 5)*
10. What is a transaction? *(Part 5)*

## Concurrency
11. Dirty read, non-repeatable read, phantom read — define each. *(Part 6)*
12. Compare isolation levels. *(Part 6)*
13. What is 2PL? *(Part 6)*
14. How are DB deadlocks resolved? *(Part 6)*

## Indexing
15. Why indexes? Cost? *(Part 7)*
16. Clustered vs non-clustered? *(Part 7)*
17. Why B-tree over hash? *(Part 7)*
18. When NOT to add an index? *(Part 7)*

## SQL
19. WHERE vs HAVING? *(Part 8)*
20. RANK vs DENSE_RANK vs ROW_NUMBER? *(Part 8)*

---

# STUDY CHECKLIST

By **end of July 2026 (Plan Month 2):**
- [ ] Read Parts 1–4 (Basics, ER, Keys, Normalization)
- [ ] Answer Q1–8 confidently
- [ ] 1NF/2NF/3NF examples memorized

By **end of August 2026 (Plan Month 3):**
- [ ] Read Parts 5–8 (Transactions, Concurrency, Indexing, SQL)
- [ ] Answer Q9–20 confidently
- [ ] Solve all 50 LeetCode SQL problems (Top SQL list)
- [ ] Window functions fluent (RANK, ROW_NUMBER, LAG, running sum)

By **end of October 2026 (Plan Month 5):**
- [ ] Quick re-read (30 min)
- [ ] All 20 Q&A in <45 sec each
- [ ] Re-solve 10 hardest LC SQL problems

By **end of January 2027 (Plan Month 8):**
- [ ] Final revision before applications
- [ ] All 20 Q&A verbal + 50 SQL problems re-solved

---

# RESOURCES (pick ONE)

1. **Striver DBMS playlist** (YouTube) — Indian-context, interview-focused. Best for Tier B.
2. **LeetCode Top SQL 50** — for SQL practice. Non-negotiable.
3. **GeeksforGeeks DBMS** — quick reference for theory.

For SQL specifically, do LeetCode SQL 50. There's no substitute.

---

# WHAT'S NOT HERE (for Tier S, return later)

- Detailed BCNF / 4NF / 5NF examples
- Multi-version concurrency control (MVCC) deep details
- Query optimization (cost-based optimizer, execution plans)
- Lock granularity (row-level, page-level, table-level details)
- Distributed databases / consensus (Paxos, Raft) → goes in HLD doc
- CAP theorem deep → covered in HLD doc
- NoSQL deep dive (MongoDB, Cassandra internals)
- Replication strategies → HLD topic
- Sharding → HLD topic
- B+ tree vs B-tree differences (rare in Tier B)

These show up at FAANG senior interviews, not Tier B SDE-1/2.

---

*Doc last updated: May 2026. Re-read on Day +7, +30, monthly. The 20 Q&A + 50 SQL problems = the complete deliverable.*
