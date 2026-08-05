# 13-Month Prep Plan — v2 (Rewritten Aug 5, 2026)

> **v1 was written May 5, 2026 and assumed a May start at 31 hrs/week.**
> That start didn't happen. This is a rebuild from the actual state on Aug 5, 2026,
> at the actual hour budget of 22 hrs/week. Nothing here is aspirational.

---

## Snapshot — Aug 5, 2026

| | |
|---|---|
| **Plan start** | Aug 5, 2026 |
| **Applications open** | Jun 1, 2027 |
| **Offer target** | Aug – Sept 2027 |
| **Join target** | Oct – Nov 2027 |
| Current job started | Sept 1, 2025 (job month 12) |
| Total professional experience | ~2.5–3 yrs today → **~4 yrs at join** |
| Current CTC | Under 6 LPA |
| **Target CTC** | **Floor 22 LPA · Target 28–35 LPA total** |
| Target level | **SDE-1 and SDE-2 — both. Optimize for band, not title.** |
| Notice period | 45 days (negotiate to 30) |
| Tenure at exit | ~26 months — clean, no hopper flag |
| LeetCode today | ~158 solved, no contest rating, **rusty** (3 months idle) |

**Time budget:**

| | |
|---|---|
| Mon – Thu | 2.5 hrs × 4 = **10 hrs** |
| Fri | **OFF — non-negotiable** |
| Sat + Sun | 6 hrs × 2 = **12 hrs** |
| **Weekly total** | **22 hrs** |
| Over the runway | ~950 usable hours |

---

## What changed from v1, and why

| v1 said | v2 says | Why |
|---|---|---|
| 31 hrs/week (3 hr weekdays, 8 hr weekends) | 22 hrs/week (2.5 hr weekdays, 6 hr weekends) | The real number. v1's budget was ~30% inflated; every downstream target inherited that lie. |
| Rating 1900 by Feb 2027 | **1700–1800 by May 2027** | 158-solved-and-rusty → 1900 in 9 months while working full-time is a top-decile outcome, not a plan. 1700 clears every company on the target list. Chasing 1900 costs the HLD hours that actually decide an SDE-2 loop. |
| HLD = 1 month (Month 7) | **HLD = a weekend block for all of Phase 2 (3 months)** | v1 was SDE-1 prep. At ~4 YoE you'll face a standalone, separately-scored system design round. It is the single most common reason experienced candidates get down-levelled. |
| DP before Graphs | **Graphs before DP** | Graphs is more self-contained and gives faster wins after a 3-month layoff. DP needs a working brain, not a rebuilding one. |
| Referral outreach starts Month 9, same month as applications | **Referral warm-up starts Phase 3, ~8 weeks before applying** | Cold-DMing a stranger for a referral the week you apply doesn't work. It needs lead time. |
| Weekly LinkedIn content calendar (48 posts) | **~1 post/month, technical only** | 48 posts is a second job. It was the most time-expensive and least load-bearing part of v1. Referrals come from DMs and engagement, not from your posting streak. |
| No strategy for compensation | **A whole section on it** | See below. This is the biggest gap in v1. |
| Curriculum written into the plan itself | **Plan schedules; `PATTERNS.md` / `LLD.md` / `HLD.md` teach** | Those 7 docs already exist and are good. Duplicating them here creates two sources of truth that drift. |

---

## STRATEGIC REALITY — read this before any topic list

### Your bottleneck is not DSA. It's the CTC anchor.

You have ~3 years of experience earning under 6 LPA. Getting to 28 LPA is a ~5x jump. No amount of LeetCode fixes a recruiter who computes your offer as "current + 40%".

**The single highest-leverage decision in this entire plan is which companies you apply to.**

**Band-payers** — pay by internal level band, largely indifferent to your current CTC:
Amazon · Microsoft · Google · Adobe · Atlassian · Salesforce · Walmart Global Tech · Uber · Intuit · Expedia · Booking · Agoda · Nutanix · Qualcomm · Cisco · Arcesium · DE Shaw · Rubrik · Databricks · Confluent · ThoughtSpot · Goldman Sachs · Morgan Stanley · JPMC · Wells Fargo · Visa · PayPal · Mastercard

**Anchor-prone** — will ask for payslips early and price off them:
Most mid-tier Indian product companies, service→product transitions, staffing-mediated roles, and any process where a recruiter asks your current CTC in the first call.

**Rule: 80% of applications go to band-payers.** A well-paid SDE-1 seat at Amazon or Adobe beats an SDE-2 *title* at a company that prices you off a 6 LPA payslip. **Title is vanity. Band is money.**

### Level strategy: apply to both, prep to the higher bar

SDE-2 prep fully contains SDE-1 prep, so there is zero wasted work in aiming high.

| Level | ~4 YoE, India, 2027 | Loop |
|---|---|---|
| SDE-1 at a band-payer | 18–28 LPA total | 2–3 DSA + 1 LLD + behavioral |
| SDE-2 at Tier B | 26–40 LPA total | 2 DSA + 1 LLD + **1 HLD** + behavioral/bar-raiser |
| SDE-2 at Tier A | 45–65 LPA total | Same, higher bar |

Apply SDE-2 where your years qualify; take SDE-1 at a band-payer without ego. Both clear your 18 LPA goal — and your stated 18 is **below** what your experience should command. Anchor yourself at 28.

### The CTC conversation — script it now, not in the moment

1. **Never volunteer current CTC.** If an application form makes it optional, leave it blank. If mandatory, enter your **expected** figure.
2. **If asked in a screening call:**
   > "I'd rather we establish role fit first. I'm targeting the band for this level, which I understand is roughly ₹X–Y — is that in range for the role?"
3. **Never justify with a percentage hike.** "40% over current" hands them the anchor. Justify with the market band for your years and level.
4. **Get to two offers before you negotiate seriously.** One offer is a request. Two offers is a market price. This is why Phase 4 runs applications in parallel batches rather than one at a time.
5. **Referrals bypass CTC screening filters.** A referred profile reaches a hiring manager; a portal profile reaches a filter that may auto-reject on current CTC.
6. **Compare total comp, not fixed:** fixed + variable + joining bonus + RSU/ESOP (with vesting schedule and whether the ESOP is liquid).

---

## Weekly Rhythm — the engine of the whole plan

Your constraint drives the structure: **weekends get contiguous hours, so weekends learn new hard things. Weekdays are fragmented, so weekdays consolidate.**

### Weekend (6 hrs/day × 2)

| Block | Sat | Sun |
|---|---|---|
| 3 hrs | **New pattern** — read the `PATTERNS.md` entry, then solve 3–4 problems on it | **Contest** (LC weekly/biweekly, timed, no exceptions) |
| 1.5 hrs | 2 more problems on the new pattern | **Upsolve the contest** — every unsolved problem, same day |
| 1.5 hrs | Design block (LLD Phase 1 · HLD Phase 2) | Design block continued + write the week's notebook entries |

### Weekday (2.5 hrs × Mon–Thu)

| Block | Content |
|---|---|
| 1.5 hrs | **DSA:** spaced re-implementation per `PATTERNS.md` (Day +1 / +7 / +30) + 1–2 new problems on the current weekend pattern |
| 1 hr | **Fundamentals:** one `strategy/` doc on rotation (OS → DBMS → CN → OOP), active recall — close the doc and write the answer, don't reread |

### Friday — OFF

No DSA. No fundamentals. This is what makes 13 months survivable rather than a 3-month sprint followed by collapse. **Protect it.**

### The notebook rule (carried from v1 — it's the best rule in the doc)

Every problem solved gets one line: **the pattern, not the solution.** Reread monthly. This is what `PATTERNS.md`'s Day +30 step operates on.

---

## Metrics that actually matter

Replace v1's rating obsession with these. Check monthly.

| Metric | Why it matters more than rating |
|---|---|
| **Cold-solve rate on Day +7** | Can you re-solve a problem a week later with no hints? Below 60% means you're pattern-matching solutions, not learning. |
| **Medium-in-25-minutes** | The actual interview bar. Rating measures speed under contest pressure; this measures readiness. |
| **Verbalization** | Can you narrate the approach out loud before coding? Untested until mocks, which is why mocks start in Phase 3 and not Phase 4. |
| **Patterns closed** | Out of 56 in `PATTERNS.md`. Concrete, honest, and the actual unit of progress. |
| Contest rating | A lagging indicator. Useful signal, terrible target. |

---

# PHASE 0 — REBUILD
### Aug 5 – Sept 20, 2026 · 6.5 weeks · ~140 hrs

**Goal: get fluent again on what you already knew. Zero new hard topics.**

The instinct after a layoff is to jump to the pending topics because they feel like the gap. Resist it. Learning Graphs on a rusty foundation means re-learning both later. Six weeks feels slow. It buys back three months.

### Coverage — `PATTERNS.md` patterns 1–25

| Weeks | Patterns | Focus |
|---|---|---|
| 1–2 (Aug 5–16) | 1–10 — Array & String | Two pointers, sliding window (fixed + variable), prefix sum, Kadane, cyclic sort, hashing |
| 3 (Aug 17–23) | 11–13 — Binary Search | Especially **binary search on answer** — the highest-yield pattern in the doc |
| 4 (Aug 24–30) | 14–18 — Stack, Queue, Linked List | Monotonic stack, monotonic deque, LL reversal |
| 5–6 (Aug 31–Sept 13) | 19–25 — Trees | DFS/BFS, LCA, BST, construction, tree DP |
| 6.5 (Sept 14–20) | Consolidation | Re-solve the 15 hardest from the phase, cold. **No new problems.** |

### Weekday fundamentals track
`OS.md` cover to cover — 1 hr/day, active recall. Process/thread, scheduling, synchronization, deadlock, memory, paging. It's ~600 lines; six weeks is comfortable for real retention.

### Also this phase
- **Week 1:** Full resume rewrite. Quantify every bullet. This is a Phase 0 task specifically because it's the one deliverable that's useful even if everything else slips.
- **Week 2:** Post the resume to r/EngineeringResumes for review. Act on the feedback.
- **Week 3:** LinkedIn overhaul — headline, About, Featured, Experience.
- **Mid-Sept:** **First rated contest.** Expect 1300–1450. It will feel bad. It's a baseline measurement, not a verdict.
- **Sept 1:** 1-year mark at current job. Tenure is now clean for a move.

### Exit gate — Sept 20, 2026
- [ ] ~240 LC solved
- [ ] Patterns 1–25 closed, each with a notebook entry
- [ ] Medium on a known pattern in **under 25 min**
- [ ] `OS.md` — can answer any section from memory
- [ ] 2 rated contests done
- [ ] Resume reviewed and rewritten

**If not hit by Sept 20: extend Phase 0 by 2 weeks. Do not proceed on a weak base.** Every later phase compounds off this one.

---

# PHASE 1 — FILL THE HOLES
### Sept 21 – Dec 31, 2026 · 14.5 weeks · ~320 hrs

**Goal: close Graphs, DP, and Tries — the three genuinely missing areas — while holding Phase 0 gains with spaced repetition.**

This is the phase you asked for explicitly: **new hard topics on weekends, revision + new questions on weekdays.**

### Weekend track — the 20 missing patterns

| Weeks | Dates | Patterns | Notes |
|---|---|---|---|
| 1–5 | Sept 21 – Oct 25 | **28–37 — Graphs** (10) | DFS/BFS, multi-source BFS, cycle detection, topo sort, Dijkstra, Bellman-Ford/Floyd-Warshall, MST, DSU, bipartite. ~2 patterns/weekend. |
| 6–12 | Oct 26 – Dec 13 | **46–53 — DP** (8) | 1D, knapsack, LIS, LCS/strings, grids, stocks, partition/MCM, bitmask. **Slowest block in the plan — 7 weeks is correct, don't compress it.** |
| 13–14 | Dec 14 – Dec 27 | **26–27 — Tries** (2) | Insert/search/prefix, Trie + backtracking/XOR. Small block; a good confidence close to the year. |
| 14.5 | Dec 28 – Dec 31 | Consolidation | Cold re-solve across all three areas. |

### Weekday track — the 11 semi-known patterns + revision

1.5 hrs/day, split: spaced re-implementation of Phase 0 patterns (Day +7 / +30) **plus** new problems on these, ~1 pattern per week:

- 38–40 — Heap / Priority Queue (Top K, K-way merge, two heaps)
- 41–42 — Greedy (sorting, interval scheduling)
- 43–44 — Backtracking (subsets/permutations, constraint satisfaction)
- 45 — Bit manipulation (XOR & masking)
- 54–55 — Intervals & Matrix (merge/sweep line, matrix manipulation)
- 56 — Design data structures

### Weekday fundamentals track (1 hr/day)
`DBMS.md` (Oct–Nov) → `CN.md` (Dec). Plus **LC Top 50 SQL**, 3 sessions/week through November — window functions, joins, CTEs. SQL shows up in more Tier B loops than people expect, and it's cheap to prepare.

### Design track — LLD begins (1.5 hrs/weekend from November)

Implement in Java from scratch, then diff against `LLD.md`. Reading a design teaches you nothing; the compile errors do.

- **Nov:** Design 1 — Parking Lot · Design 2 — LRU Cache
- **Dec:** Design 3 — Splitwise

Push each to a public GitHub repo with a README covering entities, patterns used, and trade-offs. These become LinkedIn Featured items and referral conversation-starters.

### Contests
Weekly from Oct 1, no skipping. Upsolve within 24 hrs.

### Exit gate — Dec 31, 2026
- [ ] ~390 LC solved
- [ ] Rating **1500–1550**
- [ ] Graphs, DP, Tries closed — all 20 patterns, notebook entries written
- [ ] `OS.md`, `DBMS.md`, `CN.md` done
- [ ] LC Top 50 SQL complete
- [ ] 3 LLD designs implemented and pushed
- [ ] ~13 contests done

**Behind by more than 30%? Extend by 3 weeks and compress Phase 2's advanced-DSA block — not the HLD block.** HLD is the differentiator; segment trees are not.

---

# PHASE 2 — SDE-2 DEPTH
### Jan 1 – Mar 31, 2027 · 13 weeks · ~285 hrs

**Goal: system design becomes a first-class workstream. This is the phase that decides your level and therefore your salary.**

Everything before this makes you a competent SDE-1. This phase is what gets you the SDE-2 offer — and it's exactly what v1 under-resourced.

### Weekend split — 3 hrs DSA / 3 hrs design

**DSA (3 hrs/weekend):** advanced topics + hard-problem volume.
- Segment tree (build, query, update; lazy propagation only if time allows)
- String algorithms: KMP, Rabin-Karp, Z-algorithm
- Advanced DSU applications
- LC Top 100 Liked
- Increasing share of **Hard** problems — by March, 1 in 3

**Design (3 hrs/weekend):** the HLD block.

| Weeks | Dates | Work |
|---|---|---|
| 1–2 | Jan 1–17 | `HLD.md` Parts 1–4: the 7-step framework, core building blocks, back-of-envelope numbers. **Memorize the 7-step until it's automatic** — under pressure, structure is what saves you. |
| 3–8 | Jan 18 – Feb 28 | The 6 existing designs, one per week, **whiteboard-first**: URL Shortener → Twitter Feed → WhatsApp → Rate Limiter at Scale → Notification System → Analytics TinyURL. Do the full 7 steps from a blank page, *then* read the doc and diff. |
| 9–12 | Mar 1–28 | **Write 4 new designs into `HLD.md` yourself.** Suggested: Payment System (idempotency, exactly-once) · File Storage / Drive (chunking, dedup) · Search Autocomplete (trie at scale — ties to Phase 1) · Ride Hailing (geospatial indexing). Writing the doc *is* the learning. |
| 13 | Mar 29–31 | Consolidation — verbalize all 10 designs out loud, 15 min each, no notes. |

**Alongside, 30 min/weekend:** DDIA chapters 1–6 (reliability/scalability, data models, storage engines, encoding, replication, partitioning). Selective — you need vocabulary and judgment, not completeness.

### Weekday track
- **1.5 hrs DSA:** spaced re-implementation across all 56 patterns + hard-problem practice
- **1 hr:** `OOP.md` (Jan) — 4 pillars, SOLID, design patterns → then **LLD implementation** (Feb–Mar)

### Design track — LLD completion
- **Jan:** Design 4 — Rate Limiter (concurrency)
- **Feb:** Design 5 — Snake & Ladder
- **Mar:** Design 6 — Library Management
- **Stretch:** add a 7th of your own — Elevator System or Notification Service

All 6 in Java, on GitHub, with READMEs. **Target: any of the 6 coded from scratch in 40 minutes while narrating.** That's the LLD round.

### Contests
Weekly. Add 1 timed virtual past contest per week from March.

### Exit gate — Mar 31, 2027
- [ ] ~500 LC solved (Hard ≥ 60)
- [ ] Rating **1650–1750**
- [ ] All 56 patterns closed
- [ ] `OOP.md` done — all 4 fundamentals docs complete
- [ ] **6 LLD designs** implemented, any one reproducible in 40 min
- [ ] **10 HLD designs** — 6 studied, 4 authored — each verbalizable in 15 min from blank page
- [ ] DDIA ch. 1–6
- [ ] The 7-step HLD framework is automatic

**This is the hard checkpoint. If HLD is incomplete, delay applications rather than skipping it.** Applying without system design at ~4 YoE means being down-levelled to SDE-1 at best, or rejected with a 6–12 month cooldown at your best companies.

---

# PHASE 3 — INTERVIEW MODE
### Apr 1 – May 31, 2027 · 8.5 weeks · ~190 hrs

**Goal: convert knowledge into interview performance, and build the referral pipeline before you need it.**

Knowing an answer and delivering it in 45 minutes to a stranger who is judging you are different skills. This phase trains the second one.

### Mocks — the core activity

| Weeks | Cadence |
|---|---|
| 1–4 | 2/week — Pramp, interviewing.io, or a peer |
| 5–8.5 | 3/week — rotate DSA / LLD / HLD / behavioral |

**Record every one. Watch it back.** You will hate it, and it is the fastest improvement available to you. Watch for: silence while thinking (narrate instead), jumping to code before stating the approach, and not asking clarifying questions.

**Target: 20+ mocks before your first real interview.** Your first five interviews are bad no matter how prepared you are. Spend them on mocks, not on Amazon.

### DSA maintenance
- Company-tagged sets, last 6 months: Amazon, Microsoft, Adobe, Atlassian, Walmart, Visa, PayPal, JPMC, Goldman, Salesforce — 10–12 problems each
- 2 timed virtual contests/week
- Weekly rated contests continue
- ~60 new problems → **560 total**

### Behavioral prep — 12 STAR stories

Write them out. Rehearse aloud. At SDE-2 the behavioral round carries real weight — ownership, scope, and influence are what separate the levels.

Leading a project · Conflict with a colleague · A failure and what changed after · Above and beyond · Tight deadline trade-off · Simplifying complex code · Disagreeing with a manager · Mentoring someone · Handling ambiguous requirements · A production incident · A decision you'd make differently · Why you're leaving

Draw from real work — the Flutter/React Native app, the startup context, shipping under constraints. **Specific and true beats impressive and vague**, every time.

### Referral pipeline — start Week 1, not Week 8

This needs 8 weeks of lead time, which is exactly why it lives here.

| Weeks | Action |
|---|---|
| 1–2 | Build a target list: 40 people across 15 companies. Prioritize alumni, ex-colleagues, and people whose work you can speak to. |
| 3–6 | **Engage before asking.** Comment substantively on their posts. Share their work. No ask yet. |
| 7–8.5 | Warm DMs: short, specific, shared context, easy to say no to. Target **20 people willing to refer** by May 31. |

### Final asset polish
- Resume: add the LLD/HLD repos, the contest rating if it's ≥1700, quantified work impact
- LinkedIn: Featured section pinned with the 6 LLD repos; `#OpenToWork` set to **recruiters-only** (invisible to your current employer)
- LeetCode profile linked only if rating ≥1700

### Exit gate — May 31, 2027
- [ ] ~560 LC solved
- [ ] Rating **1700–1800** (floor for applying: **1650**)
- [ ] 20+ mocks recorded and reviewed
- [ ] 12 STAR stories written and rehearsed
- [ ] 20 warm referral contacts
- [ ] Resume + LinkedIn final
- [ ] Can deliver a 45-min HLD round end to end without freezing

---

# PHASE 4 — APPLY & CLOSE
### Jun 1 – Sept 30, 2027

**Goal: parallel pipelines, multiple offers, real negotiating leverage.**

Timed deliberately: **Jul–Sept is the strongest hiring window in India.** Applications open in June so that onsites land inside it.

### June — calibration (job month 22)

- **5–8 applications/week**, deliberately to **non-priority companies**
- Purpose: real interview reps under real pressure. Nothing rehearses like the real thing.
- **Do not apply to your top 5 yet.** Failing there in June costs you a 6–12 month cooldown; failing at a company you don't want costs nothing.
- After every interview: write down what was asked and what you fumbled. **Fix it within 48 hours.**

### July–August — peak window

- **15–20 applications/week**, full target list, both levels
- **70% via referral, 30% direct** — referrals bypass the CTC filter
- Apply SDE-2 where your years qualify; SDE-1 at band-payers without hesitation
- **Batch your onsites into the same 2-week window.** Multiple offers landing together is the entire negotiation strategy.
- Take every OA seriously, including from companies you don't want

**Tracking spreadsheet:** Company · Level · Band-payer? · Date · Referrer · Stage · Outcome · What was asked · What to fix

### September — close

- Target: **2+ offers in hand** before negotiating seriously
- Evaluate on: total comp (fixed + variable + joining + equity & vesting) · tech stack and team · manager quality (research them — most underrated factor) · brand value for the *next* jump · WLB
- **Never accept the first number.** Counter every time. The worst outcome is they hold firm.
- Resign with 45-day notice, negotiate to 30
- Don't burn bridges — thank the founder genuinely, offer transition support, get a recommendation letter

### Timeline to join
Offer signed ~early Sept 2027 → resign mid-Sept → notice ends Oct 15 (30-day) or Oct 31 (45-day) → **join late Oct / early Nov 2027.**

Experience at join: **~4 years.** Tenure at current job: ~26 months.

---

## Master Calendar

| Phase | Dates | Weeks | Weekend focus | Weekday focus | LC | Rating |
|---|---|---|---|---|---|---|
| **0 — Rebuild** | Aug 5 – Sept 20, 2026 | 6.5 | Patterns 1–25 re-solve | Re-implementation + `OS.md` | 240 | first contest ~1350 |
| **1 — Fill holes** | Sept 21 – Dec 31, 2026 | 14.5 | Graphs → DP → Tries (20 patterns) | Revision + 11 semi-known patterns + `DBMS.md`/`CN.md`/SQL | 390 | 1500–1550 |
| **2 — SDE-2 depth** | Jan 1 – Mar 31, 2027 | 13 | Advanced DSA + **HLD block** | Revision + `OOP.md` → LLD builds | 500 | 1650–1750 |
| **3 — Interview mode** | Apr 1 – May 31, 2027 | 8.5 | Company-tagged, timed contests | Mocks, STAR, referral warm-up | 560 | 1700–1800 |
| **4 — Apply & close** | Jun 1 – Sept 30, 2027 | 17 | Interviews | Recovery + targeted patching | 600 | maintain |

### Design deliverables

| | Phase 1 | Phase 2 | Total |
|---|---|---|---|
| **LLD** (Java + GitHub) | Parking Lot, LRU, Splitwise | Rate Limiter, Snake & Ladder, Library | **6** |
| **HLD** (whiteboard + written) | — | 6 studied + 4 authored | **10** |

---

## NON-NEGOTIABLE RULES

1. **Friday is off.** No DSA, no fundamentals. This is a load-bearing rule, not a reward.
2. **Sleep 7 hrs minimum.** Below this, retention drops sharply and you are working for nothing.
3. **No AI, no editorial, for the first 45 minutes** on any problem. The struggle is the mechanism.
4. **Spaced re-implementation is mandatory.** Follow `PATTERNS.md`'s Day +1 / +7 / +30 schedule. Without it, ~70% of what you solve evaporates in a month.
5. **One sheet only.** `PATTERNS.md` is the curriculum. Don't switch, don't add a second sheet, don't start Neetcode-in-parallel.
6. **Notebook entry for every problem** — the *pattern*, one line, not the solution. Reread monthly.
7. **No contest skipping from Oct 2026.** Upsolve within 24 hrs.
8. **No applications to priority companies before June 2027.** Premature failure = 6–12 month cooldown at exactly the companies you want.
9. **Never volunteer current CTC.** See the strategy section. This rule is worth more than 200 LeetCode problems.
10. **No comparison-scrolling.** LinkedIn is for referral outreach and ~1 technical post/month. Nothing else.

---

## REVIEW CHECKPOINTS

| Date | Check | If behind |
|---|---|---|
| **Sept 20, 2026** | 240 LC, patterns 1–25 closed, `OS.md` done, resume rewritten | Extend Phase 0 by 2 weeks. Never build on a weak base. |
| **Oct 25, 2026** | Graphs closed (10 patterns) | Add 1 week; take it from the Tries block, not DP |
| **Dec 31, 2026** | 390 LC, 1500+, Graphs/DP/Tries closed, 3 LLD, 3 fundamentals docs | 30%+ behind → extend 3 weeks, compress advanced DSA in Phase 2. **Never compress HLD.** |
| **Feb 28, 2027** | 6 HLD designs studied, 5 LLD implemented | Cut segment tree and Z-algorithm. They're rare; HLD isn't. |
| **Mar 31, 2027** | **HARD GATE** — 500 LC, 1650+, 6 LLD, 10 HLD | HLD incomplete → push applications to July. Better late than down-levelled. |
| **May 31, 2027** | 560 LC, 1700+, 20 mocks, 20 referral contacts | Rating under 1650 → delay 1 month. Mocks under 15 → delay 3 weeks; mocks matter more than rating here. |
| **Jul 31, 2027** | 5+ companies in active pipeline | Fewer than 3 → the problem is the resume or the referrals, not your prep. Audit the funnel, don't add LeetCode. |

---

## WHEN YOU FALL BEHIND

- **1 bad week** — ignore it. Continue.
- **2 bad weeks** — audit the root cause. Sleep? Work crunch? Illness? Fix the cause, not the schedule.
- **1 bad month** — extend the timeline by 2 weeks. **Do not compress the remaining phases.** Compression is how plans die: you skip the spaced repetition, retention collapses, and you arrive at June 2027 with 600 problems solved and 200 remembered.
- **2 bad months** — rebuild the plan from your actual state. Shift applications to Sept–Oct 2027 and target the Jan–Mar 2028 window. **A 3-month delay costs nothing. Applying unprepared costs 6–12 months of cooldown at your best companies.**

**Falling behind is not failure. Quitting because you fell behind is.**

---

## Honest expectations

**What's realistic on 22 hrs/week from a rusty base:**
600 problems · 1700–1800 rating · 4 fundamentals areas solid · 6 LLD implemented · 10 HLD verbalizable · 20+ mocks. That profile clears the SDE-1/SDE-2 bar at every band-payer on the target list.

**What's not realistic, and don't chase it:**
1900+ rating · Tier S (Google/Meta) SDE-2 in this cycle · applying meaningfully earlier than June 2027.

**The two things most likely to break this plan, in order:**
1. **Skipping the Phase 0 rebuild** because pending topics feel more urgent. Learning DP on a rusty foundation means learning it twice.
2. **Under-investing in HLD** because DSA gives faster, more visible feedback. At ~4 YoE, system design is what sets your level — and your level is what sets your salary.

**The single highest-ROI hour in this plan** is not a LeetCode hour. It's the hour spent choosing band-paying companies and scripting the CTC conversation. You can solve 600 problems and still get a 9 LPA offer if you let someone price you off a 6 LPA payslip.

---

*v2 written Aug 5, 2026. Reread monthly. Adjust 5%, not 50%.*
*Curriculum lives in `PATTERNS.md`, `LLD.md`, `HLD.md`, `OS.md`, `DBMS.md`, `CN.md`, `OOP.md`. This document only schedules it.*
