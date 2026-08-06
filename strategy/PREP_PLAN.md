# 8-Month Prep Plan — v3 (Compressed, Aug 5, 2026)

> **v1** (May 2026): never started, assumed 31 hrs/week.
> **v2** (Aug 2026): 13-month runway, applications June 2027.
> **v3** (this doc): compressed to **8 months**. Applications open **Jan 2027**, offers **Mar–Apr 2027**.
>
> Built for an **average learner** — which means checkpoints every 15 days, an explicit
> buffer day, and a named scope cut instead of a hope that it all fits.

---

## The Core Idea

**Applying in January and being ready in January are different things. You only need the first.**

Application → offer takes 4–8 weeks per company. January applications produce February–March offers, and by then you'll have had two more months of prep. So:

- **Jan 2027** — apply to the **calibration tier**: companies you'd accept, but not your top 5. Real pressure, real feedback, no cooldown cost if you fail.
- **Feb–Mar 2027** — **top targets**, hit when you're actually at peak.

You get the January start. Your best companies still meet the better version of you.

---

## Snapshot

| | |
|---|---|
| **Plan start** | Aug 5, 2026 |
| **Prep window** | Aug 5 – Dec 31, 2026 (**21 weeks**) |
| **Applications open** | Jan 1, 2027 (calibration tier) |
| **Top targets** | Feb 1, 2027 |
| **Offer target** | Mar – Apr 2027 |
| **Join target** | May – Jun 2027 |
| Total experience at join | ~4 years |
| Current CTC | Under 6 LPA |
| **Target CTC** | **Floor 20 LPA · Target 26–32 LPA total** |
| Target level | **SDE-1 and SDE-2 — optimize for band, not title** |
| Starting point | ~158 LC, no rating, rusty after 3 idle months |

### Striver A2Z — actual state, Aug 2026

| Section | Done | Remaining | Where it's scheduled |
|---|---|---|---|
| Graphs | 22 / 53 | **31** | Phase 2 |
| BST | 0 / 16 | **16** | Phase 1 — **new learning, not revision** |
| DP | 0 / 55 | **55 → do 38** | Phase 3 (curated list inside) |
| Tries | 0 / 7 | **7** | Phase 3 |
| | | **~92 problems** | |

### Time budget — compressed

| | v2 | **v3** |
|---|---|---|
| Mon – Thu | 2.5 × 4 = 10 hrs | 2.5 × 4 = **10 hrs** |
| Fri | OFF | **FLEX BUFFER** (0 hrs default) |
| Sat + Sun | 6 × 2 = 12 hrs | **8 × 2 = 16 hrs** |
| **Weekly** | 22 hrs | **26 hrs** |
| Over 21 weeks | — | **546 hrs** |

**The Friday flex rule:** Friday is off by default. If you missed a weekday block or a checkpoint is slipping, Friday is where you make it up — up to 2.5 hrs. **Never bank it in advance.** It exists so that one bad week doesn't cascade into a missed phase deadline. If you find yourself using Friday three weeks running, you're behind — read the fall-behind protocol.

---

## Scope: what was cut to fit 21 weeks

Full scope needs ~610 hrs. You have 546. These cuts close the gap — **decided now, deliberately, rather than discovered in December.**

| Cut | Why it's safe |
|---|---|
| Segment tree, lazy propagation, Z-algorithm, Rabin-Karp | Not in `PATTERNS.md` — v1 extras. Rare below Tier A. |
| Bitmask DP (pattern 53) | Hardest DP pattern, lowest interview frequency. Optional stretch only. |
| 4 self-authored HLD designs | The 6 in `HLD.md` are kept. Authoring was a depth luxury. |
| LLD: Snake & Ladder, Library Mgmt | 4 designs cover the interview surface; 6 was insurance. |
| DDIA | Absorb the vocabulary from `HLD.md` instead. |
| SQL Top 50 → **Top 20** | Diminishing returns past the core patterns. |
| **Striver DP: 55 → 38 problems** | The sheet repeats recurrences across problems. The curated 38 (listed in Phase 3) cover every distinct one. Saves ~15 hrs. |

### NOT cut — non-negotiable even under compression

1. **Phase 1 rebuild.** Learning DP on a rusty base means learning it twice. Compressed 6.5 → 4.5 weeks, not removed.
2. **Spaced re-implementation** (`PATTERNS.md` Day +1 / +7 / +30). Skip this and you arrive in January having solved 430 problems and remembering 150.
3. **The HLD block.** It's already down to 4.5 weeks. Below that you aren't SDE-2-credible at all, and your level sets your salary.

---

## Contest Rating — trajectory and how to actually get there

**Target: 1800–1850 by Jan 31, 2027.** That is the top of the realistic band, not the middle. Plan for the band; aim at the top.

LeetCode seeds new contestants at **1500**, so you are not starting from zero — you're starting from average and climbing.

| Checkpoint | Expected | Stretch | What it means |
|---|---|---|---|
| ~Sept 20, 2026 | 1450–1520 | — | First 2 contests. Settling, likely a dip below 1500. Normal. |
| Oct 18, 2026 | 1520–1580 | 1600 | Graphs closed. Solving 2/4 reliably. |
| Nov 29, 2026 | 1600–1680 | 1720 | All `PATTERNS.md` patterns closed. 2/4 fast, 3rd sometimes. |
| Dec 31, 2026 | 1680–1780 | 1820 | Contest training compounding. 3/4 becoming normal. |
| **Jan 31, 2027** | **1720–1800** | **1850** | 3/4 consistently, 4th on easier sets. |

**1800 means solving 3 of 4 in a weekly contest consistently** — a medium-hard in ~35 min, cold, under time pressure. That is a *different skill* from knowing the pattern, and it's the skill this track builds.

### The contest-training track — start Nov 1

Pattern knowledge alone plateaus around 1600. These six things are what move a rating past it:

1. **Every contest. No exceptions.** Weekly + biweekly = ~28 by Jan 31. Skipping one costs more than the 90 minutes.
2. **Upsolve within 24 hrs** — every unsolved problem, no exceptions. The upsolve is worth more than the contest.
3. **Virtual contests: 1/week from Nov 1**, timed, past contests. **This is the single biggest lever.** Rating is a speed-under-pressure measurement, and this is the only way to train it directly.
4. **Build a template library** — pre-written, tested snippets for Dijkstra, DSU, sieve, binary search on answer, trie, monotonic stack. Saves 5–10 min per contest. That alone is worth ~50 rating.
5. **Contest strategy:** read all 4 problems in the first 3 minutes, then solve in *difficulty* order, not sequence order. Most people lose rating by grinding Q3 while an easier Q4 sits untouched.
6. **Q3 drills:** from December, 3 contest-Q3-difficulty problems/week on a 35-min timer. Q3 is exactly where the 1600→1800 gap lives.

### ⚠️ What this costs — read before committing

The contest track is **~2.5 hrs/week from Nov 1** (1.5 hr virtual contest + 1 hr upsolve). Under an 8-month compression there is no free space, so it comes from **Friday buffer**.

**That means: if you're already using Friday to recover slipped weekdays, you cannot also chase 1850. Pick one.** Recovering the schedule always wins — a 1650 rating with the plan on track beats 1850 with the design sprint gutted.

**And keep this in proportion:** most Tier B companies never look at contest rating. It is not a screening field. It's an excellent self-measurement tool and a poor target. **1700 with 6 HLD designs beats 1850 with 3.** If those ever compete for the same hour, HLD wins.

---

## 🔢 HOW MANY PROBLEMS — the first-5 rule

`PATTERNS.md` lists **394 problems** across its 56 patterns. **Doing all 394 in 21 weeks is not possible** — it needs ~330 hrs of DSA against ~319 available, which is break-even before anything goes wrong. Break-even plans break.

### The rule

> **Solve the first 5 problems listed under each pattern.**
> **If a pattern has 5 or fewer, do all of them.**

`PATTERNS.md` orders problems within each pattern from canonical to peripheral. The first few *are* the idea; the tail is reinforcement.

| Phase | Full list | **Curated** |
|---|---|---|
| Phase 1 — patterns 1–25 | 172 | **123** |
| Phase 2 — patterns 28–42 | 97 | **71** |
| Phase 3 — tries, backtracking, bits, intervals/matrix/design | 62 | **40** |
| Phase 3 — DP | 63 | **38** (Striver-curated, listed in Phase 3) |
| **Total** | **394** | **272** |

**~262 hrs needed against ~319 available — ~57 hrs of real slack.**

### The tail is a reserve, not a deletion

Problems 6–10 under each pattern aren't cut. They're held back for where you actually need them:

> **When a Day +7 re-solve fails on a pattern, pull the next problems from *that* pattern.**

This puts extra practice exactly where your recall broke, instead of spreading it evenly across patterns you already own. A pattern you nail on Day +7 needs nothing more; a pattern you blank on needs three more problems. The full list is how you find out which is which.

### On the LeetCode counter

Roughly 120 of the 272 are problems you've already solved, so the counter moves less than the work does. **Expect ~385 by Dec 31, not 430.** Ignore the number — it's a vanity metric. **Patterns closed and Day +7 recall are the real measures.**

---

## PHASE DEADLINES — the spine of this plan

| Phase | Deadline | Weeks | Focus |
|---|---|---|---|
| **1 — Rebuild** | **Sun Sept 6, 2026** | 4.5 | Patterns 1–25 back to fluent |
| **2 — Graphs + Core** | **Sun Oct 18, 2026** | 6 | Graphs (10), Heap (3), Greedy (2) |
| **3 — DP + Tries** | **Sun Nov 29, 2026** | 6 | DP (7), Tries (2), Backtracking (2), Bits (1) |
| **4 — Design Sprint** | **Thu Dec 31, 2026** | 4.5 | 6 HLD, 4 LLD, OOP, mocks |
| **5 — Calibration** | **Sun Jan 31, 2027** | 4.5 | Apply tier-3, interview reps |
| **6 — Peak** | **Wed Mar 31, 2027** | 8.5 | Top targets, offers, negotiate |

**A phase deadline is a commitment. A 15-day checkpoint is a warning light.** Miss a checkpoint and you have two weeks to recover inside the phase. Miss a phase deadline and the January date is at risk — go to the fall-behind protocol immediately, don't absorb it silently.

---

# PHASE 1 — REBUILD
## ▸ DEADLINE: Sunday, Sept 6, 2026 · 4.5 weeks · ~117 hrs

**Goal: fluent again on what you already knew — plus BST, which turns out to be new.**

Every instinct says skip this and go straight to Graphs, because Graphs is the visible gap. Don't. Phase 2 and 3 are built directly on these patterns — if arrays and trees are shaky, Graphs takes 8 weeks instead of 6 and the whole plan collapses in November.

> ⚠️ **BST is 0/16 on Striver — this is new learning inside a revision phase.**
> Budget **~14 hrs** for it, not the ~4 a re-solve would take. BST underpins tree
> problems in contests and shows up directly in LLD (`TreeMap`, ceiling/floor, ordered
> maps). It is the one part of Phase 1 you cannot skim.

### 15-day checkpoints

| By | Target |
|---|---|
| **Wed Aug 19** | Patterns **1–13** — Array & String (10) + Binary Search (3). **63 problems** (first-5 rule). `OS.md` Parts 1–3. |
| **Sun Aug 30** | Patterns **14–18** — Stack/Queue (3), Linked List (2). **25 problems**, mostly re-solve, should move fast. |
| **Sun Sept 6** | Patterns **19–25** — Trees (7). **35 problems + all 16 Striver BST as fresh work.** ~210 LC. `OS.md` complete. |

**Phase 1 total: ~123 curated problems + 16 BST.** At the full 172 this phase needs ~140 hrs against the 99 hrs of DSA time it has. Curated, it needs ~86. **That gap is the whole reason for the first-5 rule.**

### Weekend (8 hrs × 2)
- 5 hrs — new pattern from `PATTERNS.md`, then 4–5 problems on it
- 2 hrs — re-solve the 3 hardest from the previous weekend, cold
- 1 hr — notebook entries (the *pattern*, one line each)

### Weekday (2.5 hrs × Mon–Thu)
- 1.5 hrs — spaced re-implementation (Day +1 / +7) + 1 problem on the current pattern
- 1 hr — `OS.md`, active recall: close the doc, write the answer from memory

### Also this phase
- **Week 1 (by Aug 12):** full resume rewrite, every bullet quantified
- **Week 2 (by Aug 19):** post to r/EngineeringResumes, act on feedback
- **Week 3 (by Aug 26):** LinkedIn overhaul — headline, About, Experience
- **~Sept 1:** first rated contest. LeetCode seeds new contestants at **1500** — expect to settle **1450–1520** after your first two. Baseline, not verdict.
- **Sept 1:** 1-year mark at current job — tenure is clean for a move

### ✅ Phase 1 exit gate — Sept 6
- [ ] ~210 LC solved · **123 curated problems + 16 BST covered**
- [ ] Patterns 1–25 closed, notebook entry for each
- [ ] Medium on a known pattern in **under 30 min**
- [ ] `OS.md` — any section answerable from memory
- [ ] 1–2 rated contests done
- [ ] Resume rewritten and reviewed

**Miss this and you extend by 1 week — taken from Phase 4's design sprint, not from Phase 3.** DP is the one block with no slack in it.

---

# PHASE 2 — GRAPHS + CORE GAPS
## ▸ DEADLINE: Sunday, Oct 18, 2026 · 6 weeks · ~156 hrs

**Goal: close Graphs — your biggest single gap — plus the two cheapest remaining pattern families.**

Graphs before DP, deliberately: it's more self-contained, gives faster wins after a layoff, and DP needs a brain that's already rebuilt rather than one still rebuilding.

### 15-day checkpoints

| By | Target |
|---|---|
| **Sun Sept 20** | Patterns **28–32** — DFS components, BFS shortest path, multi-source BFS, cycle detection, topological sort. **25 problems.** |
| **Sun Oct 4** | Patterns **33–37** — Dijkstra, Bellman-Ford/Floyd-Warshall, MST (Kruskal/Prim), DSU, bipartite. **22 problems. Graphs closed.** ~250 LC. |
| **Sun Oct 18** | Patterns **38–42** — Heap/PQ (Top K, K-way merge, two heaps), Greedy (sorting, intervals). **24 problems.** ~275 LC. `DBMS.md` complete. |

**Phase 2 total: ~71 curated problems** (97 at full list). You're already 22/53 on Striver graphs, so the foundational DFS/BFS work is largely behind you — what's left is the algorithm-heavy half.

### Weekend (8 hrs × 2)
- 5 hrs — ~2 new patterns per weekend + 5–6 problems
- 2 hrs — Day +7 re-solves from prior weekends
- 1 hr — notebook + weekly contest upsolve

### Weekday (2.5 hrs × Mon–Thu)
- 1.5 hrs — spaced re-implementation + 1–2 problems on the current pattern
- 1 hr — `DBMS.md` (Sept–Oct) + **SQL Top 20**, 2 sessions/week from October

### Contests
**Weekly from Sept 20, no skipping.** Upsolve within 24 hrs — that upsolve is worth more than the contest itself.

### ✅ Phase 2 exit gate — Oct 18
- [ ] ~275 LC solved · **71 curated problems covered**
- [ ] Rating **1520–1580**
- [ ] Graphs closed — all 10 patterns, notebook entries written
- [ ] Heap + Greedy closed (5 patterns)
- [ ] `DBMS.md` done, SQL Top 20 done
- [ ] 4+ contests done

**Behind on Graphs at Oct 4? Take the extra week from Heap/Greedy** — those are weekday-recoverable. Graphs is not.

---

# PHASE 3 — DP + TRIES
## ▸ DEADLINE: Sunday, Nov 29, 2026 · 6 weeks · ~156 hrs

**Goal: DP. This is the hardest phase in the plan and the one most likely to slip.**

DP is where average learners lose three weeks without noticing. The failure mode is solving 40 DP problems by pattern-matching editorials and retaining none of it. **The test isn't how many you solve — it's whether you can re-derive the recurrence on Day +7 from a blank page.**

⚠️ **Diwali falls ~Nov 8, 2026 — inside this phase.** Plan for a lost weekend. Build it into the Nov 15 checkpoint now rather than discovering it in the moment.

### 15-day checkpoints

| By | Target |
|---|---|
| **Sun Nov 1** | DP blocks **1–3** — 1D (3), Grids (5), Subsequences (7) = **15 problems**. ~310 LC. |
| **Sun Nov 15** | DP blocks **4–6** — Strings (7), Stocks (4), LIS (4) = **15 problems**. ~330 LC. |
| **Sun Nov 22** | DP blocks **7–8** — MCM/Partition (6), Squares (2) = **8 problems. DP closed at 38.** |
| **Sun Nov 29** | Tries (7 Striver), Backtracking, Bits, Intervals/Matrix/Design = **40 curated problems**. **All `PATTERNS.md` patterns closed.** ~360 LC. `CN.md` complete. |

**Phase 3 total: 38 DP + 40 others = ~78 curated problems** (125 at full list).

---

## 📋 THE CURATED DP LIST — 38 of Striver's 55

**Why not all 55:** the sheet has real redundancy. The subsequence block alone has four problems that are one recurrence in different costumes. **These 38 cover every distinct recurrence in the section.** The 17 skipped are reinforcement, not new ideas — do them in January as maintenance if you want the completed badge.

**Rule for every skipped problem:** read the statement, say the recurrence out loud, confirm it's one you've already written. That takes 3 minutes and is the entire value of the problem. If you *can't* state the recurrence, it isn't redundant for you — solve it.

### Block 1 — 1D DP · do 3 of 5
| ✓ | Problem |
|---|---|
| ☐ | Climbing Stairs |
| ☐ | Frog Jump |
| ☐ | House Robber (max sum of non-adjacent) |

*Skip:* Frog Jump with k distances (same recurrence, one extra loop) · House Robber II (circular = run the linear version twice — read the trick)

### Block 2 — DP on Grids · do 5 of 7
| ✓ | Problem |
|---|---|
| ☐ | Ninja's Training |
| ☐ | Grid Unique Paths |
| ☐ | Grid Unique Paths II (obstacles) |
| ☐ | Minimum Path Sum in a Grid |
| ☐ | Ninja and His Friends (Cherry Pickup II) — **the only 3-state one, don't skip** |

*Skip:* Min path sum in triangular grid · Min/max falling path sum (both are min-path-sum with a variable-width row)

### Block 3 — DP on Subsequences · do 7 of 11
| ✓ | Problem |
|---|---|
| ☐ | Subset Sum equal to target |
| ☐ | Partition Equal Subset Sum |
| ☐ | Partition Set into 2 Subsets, min absolute diff |
| ☐ | 0/1 Knapsack |
| ☐ | Minimum Coins (Coin Change) |
| ☐ | Coin Change 2 (count ways) |
| ☐ | Rod Cutting — **this IS unbounded knapsack** |

*Skip:* Count Subsets with Sum K (subset sum, counting instead of boolean) · Count Partitions with Given Difference (derives from it) · Target Sum (identical to the above) · Unbounded Knapsack (= Rod Cutting)

### Block 4 — DP on Strings · do 7 of 10
| ✓ | Problem |
|---|---|
| ☐ | Longest Common Subsequence — **the parent of this whole block** |
| ☐ | Longest Common Substring |
| ☐ | Minimum Insertions to Make String Palindrome |
| ☐ | Shortest Common Supersequence |
| ☐ | Distinct Subsequences |
| ☐ | Edit Distance |
| ☐ | Wildcard Matching |

*Skip:* Print LCS (backtracking the table — read it once) · Longest Palindromic Subsequence (= LCS of s and reverse(s)) · Min insertions/deletions A→B (= n + m − 2·LCS, one line)

### Block 5 — DP on Stocks · do 4 of 6
| ✓ | Problem |
|---|---|
| ☐ | Best Time to Buy and Sell Stock |
| ☐ | Buy and Sell Stock II |
| ☐ | Buy and Sell Stock III |
| ☐ | Buy and Sell Stock with Cooldown |

*Skip:* Stock IV (= Stock III generalized to k — read the generalization) · Stock with Transaction Fee (= Stock II minus a constant)

**Do these four as one state machine**, not four problems. Draw the states once; every variant is an edge change.

### Block 6 — DP on LIS · do 4 of 7
| ✓ | Problem |
|---|---|
| ☐ | Longest Increasing Subsequence (DP) |
| ☐ | Longest Increasing Subsequence (binary search / patience) — **contest-critical** |
| ☐ | Longest String Chain |
| ☐ | Longest Bitonic Subsequence (LIS from both ends) |

*Skip:* Printing LIS (backtrack the table) · Largest Divisible Subset (LIS with a divisibility check) · Number of LIS (worth reading — LIS plus a count array)

### Block 7 — MCM / Partition DP · do 6 of 7
**Cut almost nothing here.** Hardest block, least redundant, and the one that separates 1600 from 1800.

| ✓ | Problem |
|---|---|
| ☐ | Matrix Chain Multiplication |
| ☐ | Minimum Cost to Cut the Stick |
| ☐ | Burst Balloons |
| ☐ | Evaluate Boolean Expression to True |
| ☐ | Palindrome Partitioning II |
| ☐ | Partition Array for Maximum Sum |

*Skip:* MCM bottom-up as a separate problem — instead **convert your own memoized MCM to tabulation yourself.** That conversion is the actual skill.

### Block 8 — DP on Squares · do 2 of 2
| ✓ | Problem |
|---|---|
| ☐ | Count Square Submatrices with All Ones |
| ☐ | Maximum Rectangle Area with all 1's — links back to monotonic stack (pattern 15) |

### Totals

| Block | Sheet | Curated |
|---|---|---|
| 1D | 5 | 3 |
| Grids | 7 | 5 |
| Subsequences | 11 | 7 |
| Strings | 10 | 7 |
| Stocks | 6 | 4 |
| LIS | 7 | 4 |
| MCM / Partition | 7 | 6 |
| Squares | 2 | 2 |
| **Total** | **55** | **38** |

**~40 hrs instead of ~55.** That recovered slack is what keeps Phase 3 from eating the design sprint.

### Weekend (8 hrs × 2)
- 5 hrs — new DP pattern + 5–6 problems. **Derive the recurrence on paper before writing code, every time.**
- 2 hrs — Day +7 DP re-solves. Non-negotiable in this phase specifically.
- 1 hr — notebook + contest upsolve

### Weekday (2.5 hrs × Mon–Thu)
- 1.5 hrs — spaced re-implementation + the lighter pattern families (Tries, backtracking, bits, intervals, matrix, design) — these are cheap enough for weekday blocks
- 1 hr — `CN.md` (Nov)

### Referral pipeline — starts Nov 1, not January
Needs 8 weeks of lead time to be warm by January. **This is why it lives here and not in Phase 5.**
- **By Nov 15:** target list of 30 people across 12 companies — alumni, ex-colleagues, people whose work you can actually speak to
- **By Nov 29:** engaged with 20 of them (substantive comments on their posts). **No ask yet.**

### ✅ Phase 3 exit gate — Nov 29
- [ ] ~360 LC solved
- [ ] Rating **1600–1680**
- [ ] **All 55 `PATTERNS.md` patterns closed** — every one with a notebook entry
- [ ] **38 curated DP problems done** — the recurrence re-derivable on Day +7, from blank paper
- [ ] Tries: all 7 Striver problems done
- [ ] `OS.md`, `DBMS.md`, `CN.md` complete
- [ ] 30-person referral list built, 20 engaged
- [ ] 9+ contests done

**This is the hard gate for the January date.** If DSA isn't closed by Nov 29, the design sprint gets eaten and you'll be applying without system design. Slip here → push applications to February and tell yourself the truth about it.

---

# PHASE 4 — DESIGN SPRINT
## ▸ DEADLINE: Thursday, Dec 31, 2026 · 4.5 weeks · ~117 hrs

**Goal: the phase that makes January applications real rather than aspirational.**

DSA gets you past the OA. **Design and delivery get you the offer and the level.** This phase is short, so it has zero tolerance for slippage from Phase 3.

### 15-day checkpoints

| By | Target |
|---|---|
| **Sun Dec 13** | `HLD.md` Parts 1–4 (7-step framework, building blocks, back-of-envelope) + **Designs 1–3** (URL Shortener, Twitter Feed, WhatsApp). **LLD 1–2 built** (Parking Lot, LRU Cache). `OOP.md` complete. 4 mocks done. |
| **Thu Dec 31** | **HLD Designs 4–6** (Rate Limiter at Scale, Notification System, Analytics TinyURL). **LLD 3–4 built** (Splitwise, Rate Limiter). 9+ mocks done. Resume + LinkedIn final. |

### Weekend (8 hrs × 2) — HLD
- 5 hrs — one design per weekend, **whiteboard-first**: full 7 steps from a blank page, *then* read `HLD.md` and diff against it
- 2 hrs — **verbalize it out loud, 15 min, no notes.** Record yourself. This is the actual interview skill.
- 1 hr — DSA maintenance: contest + upsolve

**Memorize the 7-step framework until it's automatic.** Under pressure, structure is what stops you freezing.

### Weekday (2.5 hrs × Mon–Thu)
- 1.5 hrs — LLD implementation in Java from scratch, then diff against `LLD.md`. Reading a design teaches nothing; the compile errors do.
- 1 hr — `OOP.md` (Dec 1–13), then mocks and DSA maintenance

### Mocks — start Dec 1
2/week through December → **9+ before your first real interview.** Pramp, interviewing.io, or a peer.

**Record every one and watch it back.** You'll hate it; it's the fastest improvement available. Watch for: going silent while thinking (narrate instead), coding before stating the approach, not asking clarifying questions.

### Behavioral — 8 STAR stories (trimmed from 12)
Leading a project · Conflict · A failure and what changed · Above and beyond · Tight deadline trade-off · Ambiguous requirements · A production incident · Why you're leaving.

Draw from real work — the React Native/Flutter app, the startup context, shipping under constraints. **Specific and true beats impressive and vague.**

### Final assets
- Resume: LLD/HLD repos added, work impact quantified
- LinkedIn: Featured pinned with the 4 LLD repos; `#OpenToWork` set to **recruiters-only** (invisible to your employer)
- 4 LLD repos public with READMEs — entities, patterns, trade-offs

### ✅ Phase 4 exit gate — Dec 31
- [ ] ~385 LC solved
- [ ] Rating **1680–1780**
- [ ] **6 HLD designs** — each verbalizable in 15 min from a blank page
- [ ] **4 LLD designs** — any one codeable in 40 min while narrating
- [ ] `OOP.md` complete — all 4 fundamentals docs done
- [ ] 9+ mocks recorded and reviewed
- [ ] 8 STAR stories written and rehearsed aloud
- [ ] Resume + LinkedIn final, 20 warm referral contacts

---

# PHASE 5 — CALIBRATION
## ▸ DEADLINE: Sunday, Jan 31, 2027 · 4.5 weeks

**Goal: real interview reps, on companies where failing is free.**

Your first five interviews are bad no matter how prepared you are. **Spend them where it doesn't cost you anything.**

### Application strategy
- **8–10 applications/week** — calibration tier only
- **Calibration tier:** companies you'd genuinely accept, but not your top 5. Mid-tier product companies, smaller band-payers, startups with real engineering.
- **Do NOT apply to your top 5 this month.** Failing there in January costs a 6–12 month cooldown at exactly the companies you want most.
- 60% referral / 40% direct

### After every single interview
Write down: what was asked · what you fumbled · what you didn't know existed. **Fix it within 48 hours.** This log is the highest-value document you'll produce all year.

### Continued prep (this doesn't stop)
- Mocks **3/week** — rotate DSA / LLD / HLD / behavioral
- Company-tagged problem sets for your top 5, 10–12 each
- Weekly contests continue
- HLD: re-verbalize all 6 designs, 15 min each
- ~40 new problems → **470 total**

### 15-day checkpoints

| By | Target |
|---|---|
| **Fri Jan 15** | 15+ applications out, 3+ interviews done, failure log started |
| **Sun Jan 31** | 35+ applications, 6+ interviews, **failure pattern identified and patched**, rating **1720–1800** |

### ✅ Phase 5 exit gate — Jan 31
- [ ] 6+ real interviews survived
- [ ] Failure log written and acted on
- [ ] The recurring weakness identified and fixed
- [ ] ~425 LC, rating **1720–1800** (stretch: 1850)
- [ ] 20+ total mocks + real interviews combined
- [ ] Ready to face the top 5

---

# PHASE 6 — PEAK
## ▸ DEADLINE: Wednesday, Mar 31, 2027 · 8.5 weeks

**Goal: top targets, multiple offers in parallel, real negotiating leverage.**

### February — the push
- **15–20 applications/week**, full target list, **both SDE-1 and SDE-2**
- **70% referral / 30% direct** — referrals bypass CTC screening filters
- **Batch onsites into the same 2-week window.** Multiple offers landing together *is* the negotiation strategy.
- Take every OA seriously, including from companies you don't love

### March — close
- Target: **2+ offers before negotiating seriously.** One offer is a request; two is a market price.
- **Never accept the first number.** Counter every time. Worst case, they hold firm.
- Resign with 45-day notice, negotiate to 30
- Don't burn bridges — thank the founder, offer transition support, get a recommendation letter

### 15-day checkpoints

| By | Target |
|---|---|
| **Sun Feb 14** | 30+ applications to top targets, 5+ in active pipeline |
| **Sun Feb 28** | 3+ onsites scheduled inside a 2-week window |
| **Mon Mar 15** | First offer in hand |
| **Wed Mar 31** | 2+ offers, negotiation underway |

### Timeline to join
Offer signed late Mar / early Apr 2027 → resign → notice ends mid-May → **join May–Jun 2027.**
Experience at join: ~4 years. Tenure at current job: ~21 months — clean.

---

## Compensation Strategy

**Your bottleneck is not DSA. It's a sub-6 LPA payslip against ~3 years of experience.** No amount of LeetCode fixes a recruiter computing "current + 40%".

**Band-payers** — pay by internal level band, largely indifferent to current CTC:
Amazon · Microsoft · Adobe · Salesforce · Walmart Global Tech · Intuit · Expedia · Booking · Agoda · Nutanix · Qualcomm · Cisco · Arcesium · DE Shaw · ThoughtSpot · Goldman Sachs · Morgan Stanley · JPMC · Wells Fargo · Visa · PayPal · Mastercard

**Anchor-prone** — ask for payslips early and price off them:
Most mid-tier Indian product companies, service→product transitions, staffing-mediated roles, and any process where a recruiter asks current CTC on the first call.

**Rule: 80% of applications go to band-payers.** A well-paid SDE-1 seat at Amazon beats an SDE-2 *title* at a company pricing you off a 6 LPA payslip. **Title is vanity. Band is money.**

### The CTC conversation — script it now
1. **Never volunteer current CTC.** Optional field → leave blank. Mandatory → enter your **expected** figure.
2. **If asked on a screening call:**
   > "I'd rather we establish role fit first. I'm targeting the band for this level, which I understand is roughly ₹X–Y — is that in range?"
3. **Never justify with a percentage hike.** "40% over current" hands them the anchor. Justify with the market band for your years and level.
4. **Two offers before negotiating seriously.** This is why Phase 6 batches onsites.
5. **Compare total comp:** fixed + variable + joining bonus + equity (vesting schedule, and whether it's liquid).

| Level | ~4 YoE, India, 2027 |
|---|---|
| SDE-1 at a band-payer | 18–26 LPA total |
| SDE-2 at Tier B | 24–36 LPA total |

Your stated 18 LPA is **below** what your experience should command. Anchor at 26.

---

## NON-NEGOTIABLE RULES

1. **Spaced re-implementation is mandatory** — `PATTERNS.md` Day +1 / +7 / +30. Under compression this is the first thing you'll want to skip and the one that destroys the plan. Without it, ~70% of what you solve evaporates in 30 days.
2. **Sleep 7 hrs minimum.** 26 hrs/week on 5 hrs of sleep produces less than 20 hrs on 7.
3. **Friday is buffer, not a study day.** Use it to recover a slipped week. Never bank it in advance.
4. **No AI, no editorial, for the first 45 minutes** on any problem. The struggle is the mechanism.
5. **Notebook entry for every problem** — the *pattern*, one line, not the solution.
6. **One sheet only.** `PATTERNS.md` is the curriculum. Don't add a second sheet.
7. **No contest skipping from Sept 20.** Upsolve within 24 hrs.
8. **No top-5 applications before Feb 1, 2027.** Premature failure = 6–12 month cooldown at exactly the companies you want.
9. **Never volunteer current CTC.** Worth more than 200 LeetCode problems.
10. **Derive DP recurrences on paper before coding.** Pattern-matching editorials in Phase 3 produces a November collapse.

---

## FALL-BEHIND PROTOCOL

The 8-month plan has almost no slack. **What you do when you slip matters more than whether you slip.**

| Situation | Action |
|---|---|
| **Missed a 15-day checkpoint** | Use Friday buffer for the next 2 weeks. Recover inside the phase. |
| **Missed a phase deadline by <1 week** | Absorb it in the next phase's weekends. Don't touch the following deadline. |
| **Missed a phase deadline by >1 week** | Push **all** subsequent deadlines by that amount. **Do not compress a later phase to catch up.** |
| **Phase 3 (DP) not done by Nov 29** | Push applications to **Feb 1**. Do not sacrifice the design sprint — applying without HLD costs more than a month's delay. |
| **Phase 4 not done by Dec 31** | Applications to Feb 1, top targets to Mar 1. Offers land Apr–May. Still a 9-month plan. |
| **2 bad months** | Rebuild from actual state. Target the Jul–Sept 2027 window. **A 3-month delay costs nothing. Applying unprepared costs 6–12 months of cooldown.** |

**Compression is how plans die.** Cutting spaced repetition to hit a date means arriving in January having solved 430 problems and remembering 150. **The date is not the goal. The offer is.**

---

## Honest Expectations

**What 546 hours realistically produces from a rusty 158-solved base, as an average learner:**
~425 LC by January · **272 curated `PATTERNS.md` problems, all 56 patterns closed** · rating **1720–1800** · all 4 fundamentals areas solid · 4 LLD implemented · 6 HLD verbalizable · 9+ mocks. **That profile is competitive for SDE-1 at every band-payer on the list, and credible for SDE-2 by February.**

**Pattern coverage is the deliverable, not problem count.** 272 problems across all 56 patterns beats 394 across 40 of them, and beats 500 you can't re-derive on Day +7.

**On the 1850 target — the honest breakdown:**

| Jan 31 outcome | Likelihood | Requires |
|---|---|---|
| 1650–1750 | **Likely** | Plan executed and contests attended, but the contest track skipped or partial |
| 1750–1800 | **Plausible** | Above, plus the full contest-training track held from Nov 1 |
| **1800–1850** | **~20–25%** | Above, plus no missed phase deadline and genuine speed under pressure |

1850 is a real ceiling to aim at, not a forecast to plan around. **Build the plan on 1750 and treat anything above it as upside.** The failure mode isn't missing 1850 — it's trading design hours to chase it and arriving in January with a great rating and a weak HLD round.

**What this compression costs you — know it going in:**
- **Tier A is closed this cycle** (Google, Atlassian, Uber) regardless of rating — those need the design depth that 4.5 weeks can't produce.
- **SDE-1-strong and SDE-2-borderline in January.** HLD gets 4.5 weeks instead of 13. By March you're SDE-2-credible — which is exactly why top targets go in February, not January.
- **Zero buffer.** One bad month and January becomes February. That's survivable; pretending otherwise isn't.

**The three most likely failure modes, in order:**
1. **Skipping spaced re-implementation** to hit checkpoint numbers. You'll reach January with the problem count and none of the recall.
2. **Letting Phase 3 eat Phase 4.** DP always runs long. Take those weeks from the design sprint and you'll apply in January as an SDE-1 candidate with 3 years of experience — and get priced accordingly.
3. **Chasing the rating past the point it pays.** Contest rating is not a screening field at most Tier B companies. Past ~1700 it buys you confidence, not interviews. HLD buys you interviews.

**The single highest-ROI hour in this plan** is not a LeetCode hour. It's the hour spent choosing band-paying companies and scripting the CTC conversation. You can solve 430 problems and still take a 9 LPA offer if you let someone price you off a 6 LPA payslip.

---

*v3 written Aug 5, 2026. Reread at every phase deadline. Adjust 5%, not 50%.*
*Curriculum lives in `PATTERNS.md`, `LLD.md`, `HLD.md`, `OS.md`, `DBMS.md`, `CN.md`, `OOP.md`. This document only schedules it.*
