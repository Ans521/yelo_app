# DSA Master Patterns Reference

> **Goal:** ~55 patterns, ~450 problems. If you genuinely complete 80%+ with proper re-implementation, your LC rating lands in the **1850–1950 range** — comfortably enough for Tier B (Visa, JPMC, Razorpay, PayPal, CRED, PhonePe). For 2100+, see the final section.

## How to read each pattern

- **Signal** — what triggers recognition
- **Picture** — the mental model (your real memory)
- **Invariant** — the truth that always holds
- **Approach** — the high-level idea, no code
- **Trade-offs** — why this, not alternatives
- **Failure cases** — where the pattern breaks
- **Verbalization** — interview script
- **Problems** — LC#, ordered Easy → Medium → Hard

**Code is what YOU write. The picture is what you memorize.**

---

## Re-implementation schedule (read once, follow always)

When you complete a pattern (typically over 3–4 days), re-implement on this schedule:

| Day after first solve | Action |
|------|------|
| Day 0 | First solve (no AI for first 45 min) |
| Day +1 | Editorial only if stuck. Re-implement same evening. Add 4-line notebook entry. |
| Day **+7** | Re-solve **2–3 hardest** problems from the pattern, from scratch (no peeking). |
| Day **+30** | Re-solve **1 problem** + read your notebook entry aloud. Verbalize approach in interview style. |
| Before each contest | 5-min pattern scan — read your Signal + Picture lines for this pattern. |
| Day +90 | Quick mental walkthrough. If you can't recall the picture, re-solve 1 problem. |

**This schedule is what separates 1500-rated grinders from 1900-rated thinkers.** Without spaced re-implementation, 70% of what you solve evaporates in 30 days.

---

# UNIVERSAL FRAMEWORK (Read First)

## Step 1 — Input → candidate patterns

| Input | First-think |
|-------|-------------|
| Array / String | Sliding Window, Two Pointers, Prefix Sum, Binary Search, Hashing |
| Sorted Array | Two Pointers, Binary Search |
| Linked List | Fast/Slow, Reversal |
| Tree | DFS, BFS |
| Graph | BFS, DFS, Topological Sort, Union-Find, Dijkstra |
| Grid / Matrix | BFS, DFS, DP, Multi-Source BFS |
| Stream / Online | Heap, Sliding Window |
| Prefix / Dictionary | Trie |
| Intervals | Sort + Sweep / Merge |

## Step 2 — Keyword → pattern

| Keyword | Pattern |
|---------|---------|
| contiguous subarray | Sliding Window |
| longest / shortest with condition | Sliding Window / DP |
| pair / triplet (sorted) | Two Pointers |
| range query | Prefix Sum / Segment Tree |
| all combinations | Backtracking |
| optimal / count ways | DP |
| dependency / prerequisite | Topological Sort |
| connected | DFS / BFS / Union-Find |
| cycle | DFS / Union-Find |
| K largest/smallest | Heap |
| min X such that... feasible | Binary Search on Answer |

## Step 3 — Constraints → complexity

| N | Acceptable |
|---|------------|
| ≤ 20 | Exponential / Bitmask |
| ≤ 100 | O(N³) |
| ≤ 1000 | O(N²) |
| ≤ 10⁵ | O(N log N) |
| ≤ 10⁶ | O(N) |
| ≤ 10⁹ | O(log N) |

## Step 4 — Verbalization template

> *"This is a [pattern] problem because [signal]. Picture: [analogy]. Invariant: [truth]. Approach: [steps]. Complexity: [T/S]. Edge cases: [...]. Alternatives: [X/Y] — chose this because [reason]."*

---

# PART I: ARRAY & STRING (10 patterns)

## 1. Fast & Slow Pointers (Floyd)

**Signal:** Cycle / middle / nth-from-end / palindrome on linked list or sequence.
**Picture:** Two runners — one at 1x, one at 2x. If a loop exists, they meet inside it.
**Invariant:** Fast moves 2× slow; relative speed = 1.

| Approach | Time | Space |
|---|---|---|
| Hash Set | O(N) | O(N) |
| Fast & Slow | O(N) | **O(1)** |

**Verbalization:** *"Two pointers at different speeds; cycle ⇒ meeting; meeting point + restart from head ⇒ cycle entry."*

**Problems (6):**
1. Linked List Cycle — **141**
2. Linked List Cycle II — **142**
3. Middle of the Linked List — **876**
4. Happy Number — **202**
5. Find the Duplicate Number — **287**
6. Palindrome Linked List — **234**

---

## 2. Sliding Window — Fixed Size

**Signal:** "Subarray of size exactly K — find max/min/sum/avg/anagram."
**Picture:** A window of K cells slides right by 1 — one in, one out, like a conveyor belt.
**Invariant:** Window holds exactly K elements.

**Failure:** Variable K, non-contiguous, sum windows with negatives need Prefix Sum.

**Problems (5):**
1. Maximum Average Subarray I — **643**
2. Find All Anagrams in a String — **438**
3. Permutation in String — **567**
4. Repeated DNA Sequences — **187**
5. Sliding Window Maximum — **239** (uses monotonic deque, see Pattern 16)

---

## 3. Sliding Window — Variable Size

**Signal:** "Longest/shortest substring/subarray satisfying a condition."
**Picture:** A rubber band stretching right; when it violates the condition, the left side is yanked in until valid again.
**Invariant:** [left, right] always satisfies the condition (or is being repaired).
**Approach:** Expand right. While invalid, shrink left. Update result when valid.

**Failure:** Sum windows with negatives → use Prefix Sum + HashMap.

**Problems (10):**
1. Longest Substring Without Repeating Characters — **3**
2. Minimum Size Subarray Sum — **209**
3. Longest Substring with At Most K Distinct — **340** (paid; or LC **159** for K=2)
4. Fruit Into Baskets — **904**
5. Max Consecutive Ones III — **1004**
6. Longest Repeating Character Replacement — **424**
7. Subarray Product Less Than K — **713**
8. Subarrays with K Different Integers — **992**
9. Count Number of Nice Subarrays — **1248**
10. Minimum Window Substring — **76**

---

## 4. Two Pointers (Opposite Ends + Same Direction)

**Signal:** Sorted array pair/triplet sums; in-place modification; partition.
**Picture (opposite):** Two hands closing in from both ends of a number line.
**Picture (same direction):** Two runners — slow writes "kept" elements, fast scans ahead.
**Invariant (sorted):** Moving the right pointer left or left pointer right prunes a half safely.

**Problems (10):**
1. Two Sum II — Input Array Is Sorted — **167**
2. 3Sum — **15**
3. 3Sum Closest — **16**
4. 4Sum — **18**
5. Container With Most Water — **11**
6. Trapping Rain Water — **42**
7. Sort Colors (Dutch Flag) — **75**
8. Remove Duplicates from Sorted Array — **26**
9. Move Zeroes — **283**
10. Valid Palindrome II — **680**

---

## 5. Prefix Sum (1D + HashMap)

**Signal:** Range sum queries; "subarray sum equals K" with negatives possible.
**Picture:** Running odometer. Distance between two points = subtraction. With HashMap: "have I seen `prefix − K` before?"
**Invariant:** `prefix[j] − prefix[i] = sum of (i, j]`.

**Failure:** Sliding Window assumes monotonicity; negatives break it. Use Prefix Sum + HashMap.

**Problems (8):**
1. Running Sum of 1d Array — **1480**
2. Find Pivot Index — **724**
3. Product of Array Except Self — **238**
4. Subarray Sum Equals K — **560**
5. Continuous Subarray Sum — **523**
6. Subarray Sums Divisible by K — **974**
7. Contiguous Array (equal 0s and 1s) — **525**
8. Path Sum III (tree variant) — **437**

---

## 6. 2D Prefix Sum / Difference Array

**Signal:** Submatrix sum queries; many range-update operations.
**Picture (2D Prefix):** Inclusion-exclusion of 4 corners gives any submatrix sum in O(1).
**Picture (Diff):** Mark only +1 at start and −1 after end. Final prefix sum reconstructs all values.

**Problems (5):**
1. Range Sum Query 2D — Immutable — **304**
2. Matrix Block Sum — **1314**
3. Number of Submatrices That Sum to Target — **1074**
4. Corporate Flight Bookings — **1109**
5. Car Pooling — **1094**

---

## 7. Cyclic Sort (Index = Value)

**Signal:** Array of N integers in range [1..N] or [0..N]; find missing/duplicate.
**Picture:** Each number wants to live in its own indexed house. Walk the array; if a number is in the wrong house, swap it home.
**Invariant:** After sorting, `arr[i] == i+1`. Mismatches reveal answers.

**Problems (5):**
1. Missing Number — **268**
2. Find All Numbers Disappeared in an Array — **448**
3. Find All Duplicates in an Array — **442**
4. First Missing Positive — **41**
5. Set Mismatch — **645**

---

## 8. Kadane's Algorithm

**Signal:** "Max sum/product subarray."
**Picture:** As you walk, ask: "extend my current trip or start fresh from here?"
**Invariant:** `current_max` ending at i = max(arr[i], current_max + arr[i]).

**Problems (5):**
1. Maximum Subarray — **53**
2. Maximum Sum Circular Subarray — **918**
3. Maximum Product Subarray — **152**
4. Maximum Absolute Sum of Any Subarray — **1749**
5. Best Time to Buy and Sell Stock — **121**

---

## 9. Hashing (Frequency / Set / Map)

**Signal:** "Count occurrences," anagrams, duplicates, two-sum-style lookups.
**Picture:** A tally chart; or a bouncer's guest list.

**Problems (10):**
1. Two Sum — **1**
2. Valid Anagram — **242**
3. Group Anagrams — **49**
4. Top K Frequent Elements — **347**
5. Sort Characters By Frequency — **451**
6. Longest Consecutive Sequence — **128**
7. First Unique Character in a String — **387**
8. Contains Duplicate — **217**
9. Isomorphic Strings — **205**
10. 4Sum II — **454**

---

## 10. Boyer-Moore Voting

**Signal:** Find majority element (>N/2 or >N/3).
**Picture:** Cancellation game — pair up different elements and remove both. Survivor is majority.
**Invariant:** Candidate count never below 0; majority survives.

**Problems (3):**
1. Majority Element — **169**
2. Majority Element II — **229**
3. Boats to Save People (greedy + 2-pointer kin) — **881**

---

# PART II: BINARY SEARCH (3 patterns)

## 11. Binary Search on Sorted Array

**Signal:** Sorted; find element/insertion point/boundary.
**Picture:** Phonebook — flip to middle, eliminate half each step.
**Invariant:** Answer always lies in [lo, hi].

**Problems (6):**
1. Binary Search — **704**
2. Search Insert Position — **35**
3. First and Last Position of Element — **34**
4. Single Element in a Sorted Array — **540**
5. Search a 2D Matrix — **74**
6. Find Smallest Letter Greater Than Target — **744**

---

## 12. Binary Search on Answer (Parametric)

**Signal:** "Min X such that condition" / "max X such that..." — feasibility is monotonic in X.
**Picture:** A dial. Turn it up — at some point it switches from "infeasible" to "feasible." Find that switch.
**Invariant:** If X feasible then X+1 also feasible (or vice versa).
**Approach:** Define `feasible(X)`. Binary search smallest/largest X where feasible.

**Verbalization:** *"Define feasibility on X; since it's monotonic in X, binary search finds the threshold in O(log range × N)."*

**Problems (8):**
1. Sqrt(x) — **69**
2. Koko Eating Bananas — **875**
3. Capacity to Ship Packages Within D Days — **1011**
4. Split Array Largest Sum — **410**
5. Find the Smallest Divisor Given a Threshold — **1283**
6. Minimum Number of Days to Make m Bouquets — **1482**
7. Magnetic Force Between Two Balls — **1552**
8. Minimum Time to Complete Trips — **2187**

---

## 13. Binary Search on Rotated / Modified Arrays

**Signal:** Sorted but rotated; or 2D matrix with row+col sorted.
**Picture:** A sorted necklace cut at one point. Each half is still sorted. At mid, decide which half is sorted, then check if target is in it.
**Invariant:** At least one half [lo, mid] or [mid, hi] is monotonic.

**Problems (7):**
1. Search in Rotated Sorted Array — **33**
2. Search in Rotated Sorted Array II (with duplicates) — **81**
3. Find Minimum in Rotated Sorted Array — **153**
4. Find Minimum in Rotated Sorted Array II — **154**
5. Find Peak Element — **162**
6. Search a 2D Matrix II — **240**
7. Median of Two Sorted Arrays — **4**

---

# PART III: STACK & QUEUE (3 patterns)

## 14. Stack — Matching / Expression

**Signal:** Parentheses, brackets, expression evaluation, decode strings.
**Picture:** A plate stack. Push on open, top must match on close.

**Problems (8):**
1. Valid Parentheses — **20**
2. Min Add to Make Parentheses Valid — **921**
3. Minimum Remove to Make Valid Parentheses — **1249**
4. Backspace String Compare — **844**
5. Evaluate Reverse Polish Notation — **150**
6. Basic Calculator II — **227**
7. Decode String — **394**
8. Longest Valid Parentheses — **32**

---

## 15. Monotonic Stack

**Signal:** "Next/previous greater/smaller element"; histogram problems.
**Picture:** Soldiers facing right; each sees the first taller soldier ahead. Maintain stack of those who haven't seen a taller one yet.
**Invariant:** Stack monotonic; each element pushed and popped at most once → O(N).

**Verbalization:** *"Monotonic stack — each element joins and leaves stack at most once, giving O(N)."*

**Problems (10):**
1. Next Greater Element I — **496**
2. Next Greater Element II — **503**
3. Daily Temperatures — **739**
4. Online Stock Span — **901**
5. Largest Rectangle in Histogram — **84**
6. Maximal Rectangle — **85**
7. Sum of Subarray Minimums — **907**
8. Maximum Width Ramp — **962**
9. Remove K Digits — **402**
10. 132 Pattern — **456**

---

## 16. Monotonic Deque (Sliding Window Min/Max)

**Signal:** Sliding window max/min in O(N).
**Picture:** Like a queue but you also evict from the back if a stronger candidate arrives. Front always holds current max.
**Invariant:** Deque stores indices with values monotonically decreasing (for max).

**Problems (5):**
1. Sliding Window Maximum — **239**
2. Constrained Subsequence Sum — **1425**
3. Shortest Subarray with Sum at Least K — **862**
4. Jump Game VI — **1696**
5. Continuous Subarrays — **2762**

---

# PART IV: LINKED LIST (2 patterns)

## 17. Linked List Reversal

**Signal:** Reverse whole list / sublist / k-group.
**Picture:** Walking forward but flipping each arrow backward as you pass.
**Invariant:** After step i, first i nodes are reversed.

**Problems (6):**
1. Reverse Linked List — **206**
2. Reverse Linked List II (sublist) — **92**
3. Reverse Nodes in k-Group — **25**
4. Swap Nodes in Pairs — **24**
5. Rotate List — **61**
6. Odd Even Linked List — **328**

---

## 18. Merge / Reorder

**Problems (7):**
1. Merge Two Sorted Lists — **21**
2. Add Two Numbers — **2**
3. Add Two Numbers II — **445**
4. Reorder List — **143**
5. Sort List (merge sort) — **148**
6. Copy List with Random Pointer — **138**
7. Merge K Sorted Lists — **23** (also Pattern 32)

---

# PART V: TREES (7 patterns)

## 19. DFS Traversals

**Signal:** Visit all nodes; collect path; recursive structure.
**Picture:** Maze walker — go deep, backtrack, go again.
**Invariant:** Each node visited exactly once.

**Problems (6):**
1. Binary Tree Inorder Traversal — **94**
2. Binary Tree Preorder Traversal — **144**
3. Binary Tree Postorder Traversal — **145**
4. Flatten Binary Tree to Linked List — **114**
5. Serialize and Deserialize Binary Tree — **297**
6. Binary Tree Cameras — **968**

---

## 20. BFS / Level Order

**Signal:** Process tree level by level; min depth.
**Picture:** Ripples spreading outward.
**Invariant:** Queue at start of each iteration holds exactly one full level.

**Problems (8):**
1. Binary Tree Level Order Traversal — **102**
2. Binary Tree Zigzag Level Order — **103**
3. Average of Levels in Binary Tree — **637**
4. Binary Tree Right Side View — **199**
5. Maximum Width of Binary Tree — **662**
6. All Nodes Distance K in Binary Tree — **863**
7. Even Odd Tree — **1609**
8. Find Largest Value in Each Tree Row — **515**

---

## 21. Height / Diameter / Path Sum

**Signal:** Compute global property requiring height/sum from subtrees; root-to-leaf.
**Picture:** Each node asks children "how tall are you?", combines, and reports up. For paths, walking down with a backpack.

**Problems (10):**
1. Maximum Depth of Binary Tree — **104**
2. Minimum Depth of Binary Tree — **111**
3. Balanced Binary Tree — **110**
4. Diameter of Binary Tree — **543**
5. Binary Tree Maximum Path Sum — **124**
6. Path Sum — **112**
7. Path Sum II — **113**
8. Sum Root to Leaf Numbers — **129**
9. Binary Tree Paths — **257**
10. Pseudo-Palindromic Paths in a Binary Tree — **1457**

---

## 22. Lowest Common Ancestor (LCA)

**Signal:** Find shared ancestor of two/more nodes.
**Picture:** Two streams flowing up — they meet at LCA.
**Invariant:** LCA is the deepest node where both targets exist in its subtree.

**Problems (5):**
1. Lowest Common Ancestor of Binary Tree — **236**
2. LCA of a Binary Search Tree — **235**
3. LCA of Deepest Leaves — **1123**
4. Maximum Difference Between Node and Ancestor — **1026**
5. Kth Ancestor of a Tree Node (binary lifting) — **1483**

---

## 23. Binary Search Tree (BST)

**Signal:** BST property; ordered traversal needs.
**Picture:** Sorted spine — inorder gives sorted sequence.

**Problems (8):**
1. Validate Binary Search Tree — **98**
2. Insert into a BST — **701**
3. Delete Node in a BST — **450**
4. Range Sum of BST — **938**
5. Kth Smallest Element in a BST — **230**
6. Convert BST to Greater Tree — **538**
7. Recover Binary Search Tree — **99**
8. Trim a Binary Search Tree — **669**

---

## 24. Tree Construction

**Problems (5):**
1. Construct Binary Tree from Preorder and Inorder — **105**
2. Construct Binary Tree from Postorder and Inorder — **106**
3. Construct Binary Tree from Preorder and Postorder — **889**
4. Maximum Binary Tree — **654**
5. Convert Sorted Array to BST — **108**

---

## 25. Tree DP / Re-rooting

**Signal:** Optimal answer at each node depends on subtree results.
**Picture:** Each node bargains with children — "give me your best — I'll combine with my decision."

**Problems (6):**
1. House Robber III — **337**
2. Binary Tree Maximum Path Sum — **124**
3. Diameter of Binary Tree — **543**
4. Distribute Coins in Binary Tree — **979**
5. Sum of Distances in Tree (re-rooting) — **834**
6. Minimum Time to Collect All Apples in a Tree — **1443**

---

# PART VI: TRIE (2 patterns)

## 26. Trie — Insert / Search / Prefix

**Signal:** Multiple strings to query; prefix queries; dictionary problems.
**Picture:** Branching letter tree — each path from root spells a word.
**Invariant:** Common prefixes share path nodes.

**Problems (6):**
1. Implement Trie (Prefix Tree) — **208**
2. Add and Search Word — **211**
3. Replace Words — **648**
4. Map Sum Pairs — **677**
5. Longest Word in Dictionary — **720**
6. Search Suggestions System — **1268**

---

## 27. Trie + Backtracking / XOR

**Picture (Backtrack):** DFS through grid; each step deeper into trie.
**Picture (XOR):** Binary trie; greedily flip bits opposite to current to maximize XOR.

**Problems (5):**
1. Word Search II — **212**
2. Concatenated Words — **472**
3. Palindrome Pairs — **336**
4. Maximum XOR of Two Numbers in an Array — **421**
5. Stream of Characters — **1032**

---

# PART VII: GRAPHS (10 patterns)

## 28. DFS — Connected Components

**Signal:** Count groups; flood-fill; islands.
**Picture:** Spilling paint on each unvisited cell — paint floods one entire region.
**Invariant:** Each cell visited exactly once.

**Problems (8):**
1. Number of Islands — **200**
2. Max Area of Island — **695**
3. Number of Provinces — **547**
4. Flood Fill — **733**
5. Number of Closed Islands — **1254**
6. Surrounded Regions (boundary-reverse) — **130**
7. Number of Enclaves (boundary-reverse) — **1020**
8. Pacific Atlantic Water Flow — **417**

---

## 29. BFS — Shortest Path on Unweighted Graph

**Signal:** "Min steps to reach X" on unweighted edges.
**Picture:** Concentric ripples expanding outward.
**Invariant:** First time you reach a node = shortest distance.

**Problems (7):**
1. Shortest Path in Binary Matrix — **1091**
2. Word Ladder — **127**
3. Open the Lock — **752**
4. Bus Routes — **815**
5. Snakes and Ladders — **909**
6. Shortest Bridge — **934**
7. Sliding Puzzle — **773**

---

## 30. Multi-Source BFS

**Signal:** "Distance from each cell to nearest source"; multiple starting points.
**Picture:** Multiple stones dropped in a pond at the same instant — ripples meet, defining nearest-source regions.
**Invariant:** All sources start at distance 0 and spread together.

**Problems (5):**
1. Rotting Oranges — **994**
2. 01 Matrix — **542**
3. As Far From Land as Possible — **1162**
4. Walls and Gates — **286** (paid)
5. Map of Highest Peak — **1765**

---

## 31. Cycle Detection (Undirected + Directed)

**Picture (Undirected):** Walking with breadcrumbs and remembering where you came from. Find someone else's breadcrumb (not parent's) → cycle.
**Picture (Directed):** Wet/dry footprints. While on a path, footprints are wet. After backtrack, dry. Step on a wet footprint = cycle right now.
**Invariant (Undirected):** Track parent. Visited non-parent = cycle.
**Invariant (Directed):** 3 colors — white (unvisited), gray (in path), black (done).

**Problems (6):**
1. Graph Valid Tree — **261** (paid)
2. Course Schedule (cycle in directed = topological order doesn't exist) — **207**
3. Find Eventual Safe States — **802**
4. Redundant Connection — **684**
5. Redundant Connection II — **685**
6. Detect Cycle in an Undirected Graph (GfG) — *no LC#*

---

## 32. Topological Sort

**Signal:** Dependencies; "complete X before Y"; ordering on DAG.
**Picture:** Stratifying a tower of dependencies — layer 0 has no deps, layer 1 depends only on 0, etc.
**Invariant:** No node appears before all its dependencies.

**Two algorithms:** Kahn's (BFS, repeatedly remove zero-indegree); DFS post-order reversed.

**Problems (8):**
1. Course Schedule — **207**
2. Course Schedule II — **210**
3. Course Schedule IV — **1462**
4. Alien Dictionary — **269** (paid)
5. Sort Items by Groups Respecting Dependencies — **1203**
6. Find All Possible Recipes from Given Supplies — **2115**
7. Minimum Height Trees (peeling leaves) — **310**
8. Strange Printer II — **1591**

---

## 33. Dijkstra's Algorithm

**Signal:** Shortest path in weighted graph (non-negative weights).
**Picture:** Greedy ripple — at each step, finalize the closest unfinished node.
**Invariant:** Once a node is popped from heap, its distance is final.

**Problems (7):**
1. Network Delay Time — **743**
2. Cheapest Flights Within K Stops — **787**
3. Path with Minimum Effort — **1631**
4. Swim in Rising Water — **778**
5. Path with Maximum Probability — **1514**
6. Number of Ways to Arrive at Destination — **1976**
7. Minimum Cost to Make at Least One Valid Path in a Grid (0-1 BFS variant) — **1368**

---

## 34. Bellman-Ford / Floyd-Warshall

**Bellman-Ford signal:** Negative weights allowed; detect negative cycles.
**Bellman-Ford picture:** Relax all edges V-1 times; if a V-th relaxation still updates, negative cycle exists.

**Floyd-Warshall signal:** All-pairs shortest paths; small V (≤ 400).
**Floyd-Warshall picture:** For each intermediate k, ask: is going through k better than direct?
**Floyd-Warshall invariant:** After processing k, dp[i][j] = shortest using nodes ≤ k as intermediates.

**Problems (4):**
1. Find the City With Smallest Number of Neighbors at Threshold Distance — **1334**
2. Cheapest Flights Within K Stops (Bellman variant) — **787**
3. Network Delay Time (alt solution) — **743**
4. Course Schedule IV (transitive closure via FW) — **1462**

---

## 35. MST — Kruskal + Prim

**Kruskal:** Sort edges by weight; greedily add cheapest that doesn't form cycle (uses Union-Find).
**Prim:** Tree grows from one source; each step add cheapest edge connecting tree to a new node.
**Invariant:** No cycles; always V-1 edges.

**Problems (4):**
1. Min Cost to Connect All Points — **1584**
2. Most Stones Removed with Same Row or Column — **947**
3. Connecting Cities With Minimum Cost — **1135** (paid)
4. Optimize Water Distribution in a Village — **1168** (paid)

---

## 36. Union-Find / DSU

**Signal:** Dynamic connectivity; group merging.
**Picture:** Forests of trees representing groups; finding root tells which group.
**Invariant:** Each set has unique representative (root).
**Optimizations:** Path compression + union by rank → O(α(N)) ≈ O(1).

**Problems (10):**
1. Number of Provinces — **547**
2. Redundant Connection — **684**
3. Accounts Merge — **721**
4. Number of Operations to Make Network Connected — **1319**
5. Most Stones Removed with Same Row or Column — **947**
6. Satisfiability of Equality Equations — **990**
7. Smallest String With Swaps — **1202**
8. Regions Cut By Slashes — **959**
9. Number of Islands II — **305** (paid)
10. Number of Good Paths — **2421**

---

## 37. Bipartite / Two-Coloring

**Signal:** Can graph be 2-colored such that no two adjacent same color?
**Picture:** Try painting each node red/blue; if a neighbor must be same color → not bipartite.

**Problems (4):**
1. Is Graph Bipartite? — **785**
2. Possible Bipartition — **886**
3. Flower Planting With No Adjacent — **1042**
4. Critical Connections in a Network (Tarjan bridges, advanced) — **1192**

---

# PART VIII: HEAP / PRIORITY QUEUE (3 patterns)

## 38. Top K (Heap of size K)

**Signal:** "Top K largest/smallest" / "K most frequent."
**Picture:** A leaderboard of fixed size K — kicks out worst when better arrives.
**Invariant:** Heap holds best K seen so far.

**Problems (8):**
1. Kth Largest Element in an Array — **215**
2. Kth Largest Element in a Stream — **703**
3. K Closest Points to Origin — **973**
4. Top K Frequent Elements — **347**
5. Top K Frequent Words — **692**
6. Reorganize String — **767**
7. Task Scheduler — **621**
8. Furthest Building You Can Reach — **1642**

---

## 39. K-Way Merge

**Signal:** Multiple sorted sources to merge; smallest range across K lists.
**Picture:** K sorted streams; always pick smallest head, advance that stream.

**Problems (6):**
1. Merge K Sorted Lists — **23**
2. Find K Pairs with Smallest Sums — **373**
3. Kth Smallest Element in a Sorted Matrix — **378**
4. Smallest Range Covering Elements from K Lists — **632**
5. Ugly Number II — **264**
6. Find K Closest Elements — **658**

---

## 40. Two Heaps (Median / Balanced Split)

**Signal:** Running median; balanced partition of stream.
**Picture:** Max-heap for lower half, min-heap for upper half. Tops give median.
**Invariant:** Sizes differ by ≤ 1.

**Problems (4):**
1. Find Median from Data Stream — **295**
2. Sliding Window Median — **480**
3. IPO — **502**
4. Maximum Performance of a Team — **1383**

---

# PART IX: GREEDY (2 patterns)

## 41. Greedy with Sorting

**Signal:** Optimal local choice → global optimum; sort first.
**Picture:** Lining things up by a key, then picking in order.

**Problems (8):**
1. Assign Cookies — **455**
2. Two City Scheduling — **1029**
3. Boats to Save People — **881**
4. Largest Number — **179**
5. Lemonade Change — **860**
6. Wiggle Subsequence — **376**
7. Queue Reconstruction by Height — **406**
8. Candy — **135**

---

## 42. Interval Scheduling / Reach Greedy

**Signal:** Pick max non-overlapping intervals; "minimum jumps to reach end"; gas stations.
**Picture:** Earliest-finishing event always wins — leaves most room.
**Invariant:** Greedy by end-time gives optimal count.

**Problems (8):**
1. Non-overlapping Intervals — **435**
2. Minimum Number of Arrows to Burst Balloons — **452**
3. Maximum Length of Pair Chain — **646**
4. Maximum Number of Events That Can Be Attended — **1353**
5. Jump Game — **55**
6. Jump Game II — **45**
7. Gas Station — **134**
8. Video Stitching — **1024**

---

# PART X: BACKTRACKING (2 patterns)

## 43. Subsets / Combinations / Permutations

**Signal:** Generate all subsets / combinations / permutations.
**Picture:** A decision tree — at each step, "include or exclude" or "pick next."
**Invariant:** Path so far is a valid partial answer.

**Problems (10):**
1. Subsets — **78**
2. Subsets II (with duplicates) — **90**
3. Permutations — **46**
4. Permutations II (with duplicates) — **47**
5. Combinations — **77**
6. Combination Sum — **39**
7. Combination Sum II — **40**
8. Letter Combinations of a Phone Number — **17**
9. Generate Parentheses — **22**
10. Restore IP Addresses — **93**

---

## 44. Constraint Satisfaction

**Signal:** Place items under constraints; abort branches that violate.
**Picture:** Tree of choices, prune branches early when constraint breaks.

**Problems (7):**
1. N-Queens — **51**
2. Sudoku Solver — **37**
3. Word Search — **79**
4. Palindrome Partitioning — **131**
5. Partition to K Equal Sum Subsets — **698**
6. Matchsticks to Square — **473**
7. Path with Maximum Gold — **1219**

---

# PART XI: BIT MANIPULATION (1 pattern)

## 45. Bitwise XOR & Masking

**Signal:** "Find single non-duplicate"; "missing number"; subset enumeration via bitmask.
**Picture:** XOR cancels duplicates — pairs annihilate.
**Invariant:** `a^a = 0; a^0 = a; XOR is associative + commutative`.

**Problems (10):**
1. Single Number — **136**
2. Single Number II — **137**
3. Single Number III — **260**
4. Missing Number — **268**
5. Number of 1 Bits — **191**
6. Counting Bits — **338**
7. Reverse Bits — **190**
8. Sum of Two Integers (without +) — **371**
9. Maximum Product of Word Lengths (bitmask) — **318**
10. XOR Queries of a Subarray — **1310**

---

# PART XII: DYNAMIC PROGRAMMING (8 patterns)

## 46. 1D DP — Linear Decision

**Signal:** "Min/max ending at i" or "ways to reach i."
**Picture:** Walking along a number line; each step is a small decision based on previous.
**Invariant:** dp[i] depends only on a constant number of previous states.

**Problems (10):**
1. Climbing Stairs — **70**
2. Min Cost Climbing Stairs — **746**
3. House Robber — **198**
4. House Robber II — **213**
5. Delete and Earn — **740**
6. Decode Ways — **91**
7. Maximum Subarray (Kadane) — **53**
8. Maximum Product Subarray — **152**
9. Domino and Tromino Tiling — **790**
10. New 21 Game — **837**

---

## 47. 0/1 Knapsack + Unbounded Knapsack

**Signal (0/1):** "Subset sum / partition" — include or exclude with capacity.
**Signal (Unbounded):** Infinite copies of each item; coin change.
**Picture (0/1):** A backpack; for each item decide include or skip.
**Picture (Unbounded):** Buffet — take as many of each item as you want.
**Invariant:** dp[i][w] = best value using first i items with capacity w.

**Problems (10):**
1. Partition Equal Subset Sum — **416**
2. Target Sum — **494**
3. Last Stone Weight II — **1049**
4. Ones and Zeroes — **474**
5. Coin Change — **322**
6. Coin Change II — **518**
7. Combination Sum IV — **377**
8. Perfect Squares — **279**
9. Word Break — **139**
10. Number of Dice Rolls With Target Sum — **1155**

---

## 48. Longest Increasing Subsequence (LIS)

**Signal:** Find longest subsequence satisfying monotone condition.
**Picture:** Building tallest stack of increasing cards.
**Approach:** O(N²) DP or O(N log N) with binary search + tails array.

**Problems (7):**
1. Longest Increasing Subsequence — **300**
2. Number of Longest Increasing Subsequence — **673**
3. Russian Doll Envelopes — **354**
4. Largest Divisible Subset — **368**
5. Maximum Length of Pair Chain — **646**
6. Longest String Chain — **1048**
7. Best Team With No Conflicts — **1626**

---

## 49. LCS / DP on Strings

**Signal:** Compare two sequences; common/edit measures.
**Picture:** 2D grid where (i, j) asks: best answer using first i of A and first j of B.

**Problems (10):**
1. Longest Common Subsequence — **1143**
2. Longest Common Substring (GfG) — *no LC#*
3. Edit Distance — **72**
4. Distinct Subsequences — **115**
5. Delete Operation for Two Strings — **583**
6. Minimum ASCII Delete Sum for Two Strings — **712**
7. Shortest Common Supersequence — **1092**
8. Interleaving String — **97**
9. Wildcard Matching — **44**
10. Regular Expression Matching — **10**

**Palindromic DP (sub-pattern, same family):**
1. Longest Palindromic Substring — **5**
2. Longest Palindromic Subsequence — **516**
3. Palindromic Substrings — **647**
4. Palindrome Partitioning II — **132**
5. Minimum Insertions to Make String Palindrome — **1312**

---

## 50. DP on Grids

**Signal:** Path / sum / count on a 2D grid.
**Picture:** Each cell answers: best path from start to me.

**Problems (8):**
1. Unique Paths — **62**
2. Unique Paths II — **63**
3. Minimum Path Sum — **64**
4. Triangle — **120**
5. Minimum Falling Path Sum — **931**
6. Maximal Square — **221**
7. Cherry Pickup — **741**
8. Dungeon Game — **174**

---

## 51. DP on Stocks (State Machine)

**Signal:** Buy/sell with constraints (cooldown, fee, K transactions).
**Picture:** A state machine — holding vs not holding; transitions on buy/sell.

**Problems (6):**
1. Best Time to Buy and Sell Stock — **121**
2. Best Time to Buy and Sell Stock II — **122**
3. Best Time to Buy and Sell Stock III — **123**
4. Best Time to Buy and Sell Stock IV — **188**
5. Best Time to Buy and Sell Stock with Cooldown — **309**
6. Best Time to Buy and Sell Stock with Transaction Fee — **714**

---

## 52. Partition DP / MCM

**Signal:** Partition array/string into segments; compute optimal cost.
**Picture:** Try every split point as the last operation; recurse on left and right halves.
**Invariant:** dp[i][j] = answer for subarray (i..j).

**Problems (7):**
1. Burst Balloons — **312**
2. Minimum Cost to Cut a Stick — **1547**
3. Partition Array for Maximum Sum — **1043**
4. Palindrome Partitioning II — **132**
5. Strange Printer — **664**
6. Minimum Score Triangulation of Polygon — **1039**
7. Stone Game V — **1563**

---

## 53. Bitmask DP

**Signal:** N ≤ 20; "visit all subsets" / "TSP-style" / "assignment problems."
**Picture:** State = (current node, visited set encoded as bitmask).
**Invariant:** dp[mask][i] = best with visited = mask and currently at i.

**Problems (5):**
1. Shortest Path Visiting All Nodes — **847**
2. Find the Shortest Superstring — **943**
3. Number of Ways to Wear Different Hats to Each Other — **1434**
4. Maximum Score From Performing Multiplication Operations — **1770**
5. Maximum Students Taking Exam — **1349**

---

# PART XIII: INTERVALS & MATRIX (2 patterns)

## 54. Intervals — Merge / Sweep Line

**Signal:** "Merge overlapping" / "find conflicts" / "free time" / event-based.
**Picture:** Sort intervals; sweep through. For events: +1 at start, −1 at end; track running sum.

**Problems (8):**
1. Merge Intervals — **56**
2. Insert Interval — **57**
3. Meeting Rooms II — **253** (paid)
4. Employee Free Time — **759** (paid)
5. Interval List Intersections — **986**
6. My Calendar I — **729**
7. Car Pooling — **1094**
8. Number of Flowers in Full Bloom — **2251**

---

## 55. Matrix Manipulation

**Problems (6):**
1. Rotate Image (90°) — **48**
2. Spiral Matrix — **54**
3. Spiral Matrix II — **59**
4. Set Matrix Zeroes — **73**
5. Game of Life — **289**
6. Diagonal Traverse — **498**

---

# PART XIV: DESIGN (1 pattern)

## 56. Design Data Structures

**Picture:** Combine HashMap + Doubly Linked List for O(1) operations on ordered access patterns.

**Problems (10):**
1. LRU Cache — **146**
2. LFU Cache — **460**
3. Min Stack — **155**
4. Design Twitter — **355**
5. Design Browser History — **1472**
6. Design Circular Deque — **641**
7. Snapshot Array — **1146**
8. Time Based Key-Value Store — **981**
9. Insert Delete GetRandom O(1) — **380**
10. Insert Delete GetRandom O(1) — Duplicates Allowed — **381**

---

# 12-MONTH STUDY MAP

| Month | Patterns | Problems target |
|-------|----------|------------------|
| 1 (Jun 2026) | 28–37 (Graphs) | 45 |
| 2 (Jul 2026) | 46–47 + 48 (DP basics, Knapsack, LIS) | 50 |
| 3 (Aug 2026) | 49–52 (LCS, Palindromic, Grids, Stocks, Partition) | 50 |
| 4 (Sept 2026) | 14–18 (Stack/Queue/LL) + 41–42 (Greedy) | 50 |
| 5 (Oct 2026) | 1–13 (Array/String/Hashing/BS) | 50 |
| 6 (Nov 2026) | 19–25 (Trees) + 26–27 (Trie) + 53 (Bitmask DP) | 55 |
| 7 (Dec 2026) | 38–40 (Heap) + 43–44 (Backtracking) + 45 (Bit) + 54–55 (Intervals/Matrix) | 55 |
| 8 (Jan 2027) | 56 (Design) + Mock contests + revisit weak | 50 |
| 9 (Feb 2027) | Company-tagged + composite review | 35 |
| 10–12 (Mar–May 2027) | Maintenance + interview-mode | 30/month |

**Cumulative target: ~470 problems by Month 9, ~560 by Month 12.**

---

# RATING PROJECTION

| Coverage | Realistic LC rating |
|----------|---------------------|
| 70% solved once, no re-impl | 1500–1650 |
| 90% with 7-day re-impl | 1700–1850 |
| 100% with full schedule + weekly contests | **1850–1950** |
| Above + advanced section + 60+ contests | 2000–2100 |
| Above + advanced + Codeforces | 2100+ |

---

# WHAT'S LEFT FOR 2100+

This 55-pattern doc reliably gets you to ~1900-1950. To push to 2100+, you need these **advanced topics** (not deeply taught here — mentioned for awareness):

### Advanced Data Structures
- **Segment Tree** (point update, range query) — Range Sum Query Mutable (**307**), Count of Smaller Numbers After Self (**315**), Reverse Pairs (**493**), The Skyline Problem (**218**), Range Frequency Queries (**2080**)
- **Segment Tree with Lazy Propagation** — Booking Concert Tickets in Groups (**2286**), Falling Squares (**699**), My Calendar III (**732**)
- **Fenwick Tree (BIT)** — same problems as segment tree, simpler implementation
- **Sparse Table** — Range Min Query, Find a Value of a Mysterious Function Closest to Target (**1521**)

### Advanced Strings
- **KMP / Failure Function** — Implement strStr (**28**), Repeated Substring Pattern (**459**), Shortest Palindrome (**214**), Longest Happy Prefix (**1392**)
- **Z-Algorithm** — Sum of Scores of Built Strings (**2223**)
- **Rolling Hash / Rabin-Karp** — Longest Duplicate Substring (**1044**), Distinct Echo Substrings (**1316**), Repeated DNA Sequences (**187**)
- **Manacher's Algorithm** — Longest Palindromic Substring in O(N) (**5**)

### Advanced Graphs
- **Tarjan's Bridges / Articulation Points** — Critical Connections in a Network (**1192**)
- **Strongly Connected Components (Kosaraju/Tarjan)** — template + variants
- **0-1 BFS** — Minimum Cost to Make at Least One Valid Path in a Grid (**1368**), Minimum Obstacle Removal to Reach Corner (**2290**)

### Advanced DP
- **Digit DP** — Count Numbers with Unique Digits (**357**), Numbers At Most N Given Digit Set (**902**), Number of Digit One (**233**), Numbers With Repeated Digits (**1012**), Find All Good Strings (**1397**)
- **DP on Subsequences with hard transitions** — Best Team With No Conflicts (**1626**), Stone Game family
- **DP optimizations** — Knuth optimization, Divide-and-Conquer DP (rare in interviews, common in CF)

### Math
- **Modular Inverse + Combinatorics with mod** — Count Good Numbers (**1922**), Count of Integers (**2719**)
- **Matrix Exponentiation** — Knight Dialer (**935**) for very large N
- **Number Theory** — Euler totient, Mobius, Inclusion-Exclusion (rare in interviews)

### Speed + Contest Practice
- **60+ contests in 12 months** with same-day upsolving
- **Codeforces practice** — LC alone caps at ~1950–2050. CF has tighter problem variance.
- Aim Q3 in 15 min, Q4 attempt in remaining time

### Time investment for 2100+
- Add ~250 problems on top of this 560 = ~810 total
- Add ~2 hr/day for 4 months on advanced topics
- Add Codeforces sessions weekly
- Total prep: 5+ hr/day vs current 3 hr/day plan

**Honest probability table:**

| Goal | With this doc only | With this doc + advanced section + 60+ contests + CF |
|------|---------------------|----------------------|
| 1850+ | 70% | 90% |
| 1950+ | 45% | 75% |
| 2100+ | 10–15% | 35–45% |

---

# FINAL NOTES

- **Don't memorize code.** Code is the byproduct of understanding the picture.
- **Track in YOUR notebook**, not on this doc. This is reference; notebook is real memory.
- **Re-implement on schedule.** Day +7, Day +30, Day +90. This is what makes patterns stick.
- **Stick to one sheet.** Don't switch from this to NeetCode mid-way.
- **Verbalize once a week.** Record yourself explaining a pattern. You'll find gaps fast.
- **Skip Composite as a separate study** — once you know each base pattern, composites click on their own.

---

*Total: 56 patterns, ~450 problems. Sufficient for 1850–1950 LC rating with full execution. Advanced section adds 250 problems for 2100+ stretch. Doc is the menu — your notebook is the meal.*
