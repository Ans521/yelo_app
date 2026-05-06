# High-Level Design (HLD) — System Design for Tier B + Tier A

> Comprehensive HLD reference for Tier B SDE-1/SDE-2 interviews (Visa, JPMC, Razorpay, PayPal) + Tier A (Atlassian, Adobe, Microsoft). Covers core building blocks and 6 classic system designs.

---

## Where this fits

| File | Status | Finish by |
|------|--------|-----------|
| OS.md | ✅ | — |
| DBMS.md | ✅ | — |
| CN.md | ✅ | — |
| OOP.md | ✅ | — |
| LLD.md | ✅ | — |
| **HLD.md (this file)** | In progress | **End of December 2026** (Plan Month 7) |

**Final fundamentals file. After this, you have everything needed for Tier B + most of Tier A.**

---

## How to use this doc

1. **Foundations + Building Blocks (Parts 1–3) first.** Read once before tackling system designs.
2. **One design per week** starting Plan Month 6 (Nov 2026). Two designs in Month 7.
3. **For each design:** read the section, then design from scratch on a whiteboard or paper without looking. Compare. Identify gaps.
4. **Verbalize.** HLD is heavily verbal in interviews — practice talking through the design.

---

# PART 1: WHAT IS HLD?

## HLD in one sentence
Designing the **architecture** of a system — how components (services, databases, caches, queues) connect — to handle scale, reliability, and performance.

## HLD vs LLD (recap)

| HLD | LLD |
|-----|-----|
| Architecture-level | Code-level |
| Services, DBs, queues | Classes, methods |
| Box-and-arrow diagrams | UML class diagrams |
| Scale, latency, availability | OOP, design patterns |
| 45–60 min interviews | 30–45 min interviews |

## Why HLD matters in interviews

Interviewers test:
- Can you take a vague problem ("design Twitter") and break it into manageable pieces?
- Do you understand fundamental tradeoffs (CAP, latency vs throughput, SQL vs NoSQL)?
- Can you estimate scale (QPS, storage)?
- Can you justify your choices?
- Do you know when to apply caching, sharding, queues, etc.?

For Tier B SDE-1: 1 round of basic HLD (45 min).
For SDE-2: 1–2 deeper rounds.
For Tier S: 2–3 rounds, deeper edge cases.

## HLD interview structure (45–60 min)

| Time | What you do |
|------|-------------|
| 0–5 min | Listen + ask clarifying questions |
| 5–10 min | Functional + non-functional requirements |
| 10–15 min | Capacity / scale estimation (QPS, storage) |
| 15–25 min | High-level architecture diagram |
| 25–40 min | Deep dive on key components |
| 40–55 min | Data model + APIs |
| 55–60 min | Bottlenecks, extensions, monitoring |

**Most candidates fail by:**
1. Jumping into architecture without understanding requirements.
2. Over-engineering ("let's use Kafka for everything").
3. Not justifying tradeoffs.

---

# PART 2: HLD APPROACH FRAMEWORK (THE 7-STEP)

Apply this to every system design problem.

## Step 1 — Clarifying Questions
- What features are in scope? Out of scope?
- Read-heavy or write-heavy?
- Scale: how many users? QPS?
- Latency requirements?
- Consistency requirements?

## Step 2 — Functional Requirements
List what the system MUST do. Be specific.

## Step 3 — Non-Functional Requirements
- Scalability (handle X users)
- Availability (99.9%? 99.99%?)
- Latency (e.g., <200ms)
- Consistency (strong vs eventual)
- Durability

## Step 4 — Capacity Estimation
- Daily Active Users (DAU)
- Read QPS, Write QPS
- Storage per record × records → total storage
- Bandwidth

Quick math:
- 1M users × 10 actions/day = 10M actions/day = ~115 actions/sec average
- Peak factor 2–10x → 230–1150 QPS peak
- 10 years of data: storage estimate

## Step 5 — High-Level Architecture
Draw boxes and arrows:
- Client → Load Balancer → API Gateway → Services → Databases (+ Cache + Queue + CDN as needed)

## Step 6 — Deep Dive
For each major component, discuss:
- Why this choice?
- Alternatives considered?
- Tradeoffs?

## Step 7 — Bottlenecks + Extensions
- Where will it break under load?
- How would you mitigate?
- What if 10x scale?
- Monitoring + alerting?

---

# PART 3: CORE BUILDING BLOCKS

These are the Lego pieces of every HLD answer. Master each.

## 3.1 Load Balancer

**What:** Distributes incoming requests across multiple backend servers.

**Why:**
- Horizontal scaling
- Fault tolerance (route around dead servers)
- Better resource utilization

**Algorithms:**
- **Round Robin** — rotate through servers
- **Least Connections** — pick server with fewest active connections
- **IP Hash** — sticky session by client IP
- **Weighted Round Robin** — bigger servers get more traffic

**Layer 4 vs Layer 7:**

| L4 (TCP) | L7 (HTTP) |
|----------|-----------|
| Routes by IP + port | Routes by HTTP details (URL, headers, cookies) |
| Fast, blind to content | Slower, content-aware |
| Used for raw traffic | Used for HTTP — supports path-based routing |
| Examples: AWS NLB | AWS ALB, NGINX, HAProxy |

**Examples in the wild:** AWS ALB/NLB, NGINX, HAProxy, Cloudflare.

## 3.2 Caching

**What:** Store frequently accessed data in fast memory (RAM) to avoid hitting slow backend (DB, API).

**Why:** Reduces latency (1 ms vs 100 ms) and DB load.

**Where to cache:**

| Level | Examples | Use |
|-------|----------|-----|
| Client (browser) | localStorage | Static assets |
| CDN | Cloudflare, Akamai | Images, videos |
| App server (in-memory) | Local HashMap | Hot data per server |
| Distributed cache | Redis, Memcached | Shared cache across servers |
| DB query cache | MySQL query cache | Repeated SQL queries |

**Cache patterns:**

### Cache-Aside (most common)
- App reads cache first.
- On miss, reads DB and populates cache.
- App writes to DB; invalidates or updates cache.

### Read-Through
- Cache itself loads from DB on miss. App only talks to cache.

### Write-Through
- App writes to cache; cache writes to DB synchronously.
- ✅ Cache always consistent. ❌ Slow writes.

### Write-Behind (Write-Back)
- App writes to cache; cache writes to DB asynchronously.
- ✅ Fast writes. ❌ Risk of data loss if cache crashes.

### Cache Eviction Policies
- **LRU** (Least Recently Used) — most common
- **LFU** (Least Frequently Used) — for stable hot keys
- **TTL** (Time-To-Live) — time-based

**Cache challenges:**
- **Cache invalidation** — keeping cache fresh when DB changes
- **Cache stampede** — many requests miss cache simultaneously, all hit DB
- **Hot keys** — single key gets all the traffic

## 3.3 Databases — SQL vs NoSQL

| SQL | NoSQL |
|-----|-------|
| Relational, structured schema | Flexible schema |
| ACID transactions | BASE (eventually consistent) |
| Vertical scaling primarily | Horizontal scaling natively |
| Joins natively | Denormalized, no joins |
| MySQL, PostgreSQL, Oracle | MongoDB, Cassandra, DynamoDB |

**When to use SQL:**
- Structured data with relationships
- Transactional integrity needed (banking, e-commerce)
- Complex queries (joins, aggregates)
- Mature tooling needed

**When to use NoSQL:**
- Massive scale (millions of writes/sec)
- Schema evolves rapidly
- High availability over consistency
- Specific access patterns (key-value, document, graph)

**NoSQL types:**

| Type | Example | Use case |
|------|---------|----------|
| Key-Value | Redis, DynamoDB | Cache, sessions, leaderboards |
| Document | MongoDB | Catalogs, user profiles |
| Columnar | Cassandra | Time-series, logs, analytics |
| Graph | Neo4j | Social networks, recommendations |

## 3.4 Database Sharding

**What:** Split a database horizontally — different rows go to different machines.

**Why:** Scale beyond what one machine can hold.

**Sharding strategies:**

### Range-based
Shard by ranges (e.g., user IDs 1–1M on shard 1, 1M–2M on shard 2).
- ✅ Simple, supports range queries.
- ❌ Hot shards if data is skewed.

### Hash-based
Hash the shard key (e.g., user ID), modulo number of shards.
- ✅ Even distribution.
- ❌ Adding shards requires rehashing → use **consistent hashing**.

### Geographic
Shard by location (US users on US shard, EU users on EU shard).
- ✅ Data locality, latency.
- ❌ Hard to query across regions.

### Consistent Hashing
A circular hash space where each shard owns a range. Adding/removing a shard moves only ~1/N keys.

**Problems sharding creates:**
- Cross-shard queries are expensive
- Joins across shards = manual work
- Re-sharding is painful
- Choosing a bad shard key (e.g., timestamp) creates hotspots

## 3.5 Database Replication

**What:** Maintain multiple copies of the data for availability and read scaling.

**Master-Slave (Primary-Replica):**
- Writes go to master.
- Reads can go to replicas.
- Async replication → replicas may lag (eventual consistency on read).

**Master-Master (Multi-Primary):**
- Writes can go to any master.
- Conflicts on concurrent writes need resolution.
- Hard to get right.

**Sync vs Async:**
- **Sync:** master waits for replica to ack. Strong consistency, slower writes.
- **Async:** master commits immediately, replica catches up. Fast writes, possible lag.

## 3.6 Message Queues / Pub-Sub

**What:** Asynchronous communication — producers add messages to a queue; consumers pull (or subscribe).

**Why:**
- **Decoupling** — producer doesn't wait for consumer
- **Load smoothing** — handle traffic spikes by buffering
- **Reliability** — messages persisted; consumer can crash and retry

**Examples:**
- **Kafka** — distributed log; high throughput; pull-based; good for event streaming
- **RabbitMQ** — traditional queue; push-based; supports complex routing
- **AWS SQS** — managed queue, simple
- **Redis Pub/Sub** — lightweight, in-memory

**Queue vs Pub/Sub:**
- **Queue:** one message → one consumer (work distribution).
- **Pub/Sub:** one message → many subscribers (broadcasting).

**Use cases:**
- Email/SMS sending (don't block user)
- Image processing pipelines
- Event sourcing
- Async writes to DB

## 3.7 CDN (Content Delivery Network)

**What:** Geographically distributed servers caching static content close to users.

**Why:** Latency (50ms instead of 500ms), bandwidth, server offload.

**What to put on CDN:**
- ✅ Images, videos, JS, CSS, fonts
- ✅ Public assets that don't change often
- ❌ User-specific dynamic data
- ❌ Sensitive data

**Examples:** Cloudflare, AWS CloudFront, Akamai.

## 3.8 CAP Theorem (must-know)

**Statement:** In a distributed system, you can have at most 2 of 3:
- **C — Consistency:** every read sees the latest write
- **A — Availability:** every request gets a response
- **P — Partition Tolerance:** system works despite network failures between nodes

In practice, network partitions WILL happen, so you must choose **C vs A** during partition.

**CP systems** (Consistency + Partition Tolerance):
- Reject requests during partition to maintain consistency
- Examples: HBase, MongoDB (default), Zookeeper

**AP systems** (Availability + Partition Tolerance):
- Serve possibly stale data during partition
- Examples: Cassandra, DynamoDB, CouchDB

**CA systems** (rarely real):
- Single-machine systems pretend to be CA, but real distributed systems must choose CP or AP.

## 3.9 Consistency Models

- **Strong consistency:** every read sees latest write. Slow but simple.
- **Eventual consistency:** reads may be stale, but converge eventually. Fast, scalable.
- **Read-your-writes:** you see your own writes immediately.
- **Causal consistency:** if A happens before B, all observers see A before B.

**Examples:**
- DynamoDB: tunable consistency (eventual by default; strong on request).
- Cassandra: tunable per query (`ONE`, `QUORUM`, `ALL`).
- MySQL: strong consistency on a single primary.

## 3.10 API Gateway

**What:** A single entry point for all client requests; routes to backend services.

**Why:**
- Authentication / Authorization
- Rate limiting
- Request routing
- Logging / monitoring
- SSL termination

**Examples:** AWS API Gateway, Kong, Apigee.

In microservices, the API Gateway sits between clients and services.

## 3.11 Microservices vs Monolith (briefly)

**Monolith:** one codebase, one deployment.
- ✅ Simple, easy to start, fast within-app calls.
- ❌ Hard to scale parts independently. Slow build/deploy at scale.

**Microservices:** many small services, each owning a piece.
- ✅ Independent scaling, deployment, tech choice.
- ❌ Operational complexity. Network calls (slow + can fail).

**When to use which:**
- Start monolithic. Move to microservices when team/scale demands it.

## 3.12 WebSockets vs Long Polling vs SSE

For real-time updates (chat, notifications, live scores):

| Method | How |
|--------|-----|
| **Polling** | Client asks every X sec |
| **Long Polling** | Client request held until server has data |
| **SSE** (Server-Sent Events) | Server pushes via persistent HTTP (one-way) |
| **WebSockets** | Full-duplex persistent connection |

**Use:**
- WebSockets for chat, multiplayer games (bidirectional).
- SSE for live notifications, stock tickers (server → client only).
- Long polling as fallback if WebSockets blocked.

---

# PART 4: BACK-OF-ENVELOPE NUMBERS

Memorize these for capacity estimation.

## Latency
- L1 cache: ~1 ns
- L2 cache: ~5 ns
- RAM: ~100 ns
- SSD random read: ~100 μs
- HDD seek: ~10 ms
- Network round-trip same datacenter: ~0.5 ms
- Network round-trip cross-country: ~50 ms
- Network round-trip cross-continent: ~150 ms

## Throughput
- One server: ~10K QPS for a simple API (rough)
- Redis: ~100K ops/sec on one node
- MySQL: ~5K writes/sec on one node
- Cassandra: ~50K writes/sec per node

## Scale conversions
- 1 million users × 10 actions/day = ~115 actions/sec average
- 1 byte × 1 billion users = 1 GB
- 1 KB × 100 M users = 100 GB
- 86,400 sec/day; 3.6M sec/month

---

# DESIGN 1: URL SHORTENER (TinyURL / Bit.ly)

**Difficulty:** ⭐⭐ (Foundational HLD problem.)

## Step 1: Clarifying Questions

- Length of short URL? → 7 chars OK
- Custom URLs allowed? → Yes
- Expiry? → Optional TTL
- Analytics (click count)? → Yes, basic
- Scale? → 100M URLs created over years; 100:1 read:write ratio

## Step 2: Functional Requirements

1. Shorten a long URL → short URL
2. Redirect short URL → long URL
3. Optional custom alias
4. Optional expiry
5. Track click count

## Step 3: Non-Functional Requirements

- High availability (URL must always redirect)
- Low latency on redirect (< 100 ms)
- URLs must be unpredictable (security)
- 99.9% availability

## Step 4: Capacity Estimation

- 100M URLs created over 10 years → ~30/sec avg, ~300/sec peak (write)
- 100:1 read ratio → 3000/sec avg redirect, 30K/sec peak
- Storage: each URL ~500 bytes → 100M × 500 = 50 GB

## Step 5: High-Level Architecture

```
              +---------+
              | Client  |
              +---------+
                   |
                   v
            +-------------+
            |  Load Bal.  |
            +-------------+
                   |
                   v
            +-------------+
            | API Gateway |   (auth, rate limit)
            +-------------+
                   |
       +-----------+-----------+
       v                       v
+--------------+        +-----------------+
| Shorten Svc  |        |  Redirect Svc   |
+--------------+        +-----------------+
       |                       |
       |                       v
       |              +-----------------+
       |              |   Redis Cache   |   (hot URLs)
       |              +-----------------+
       |                       |
       v                       v
            +----------------------+
            |  Database (sharded)  |
            |  short_url → long_url|
            +----------------------+
```

## Step 6: Generation Strategy (key design decision)

### Approach A: Hash-based (e.g., MD5 truncated)
- Hash long URL, take first 7 chars.
- ❌ Collisions possible (must check)
- ❌ Two same long URLs get same short URL (bad if user wants different)

### Approach B: Counter-based (auto-increment) + base62 encode
- Counter generates 1, 2, 3, ...
- Encode as base62 (a–z, A–Z, 0–9) → 7 chars covers 62⁷ = 3.5 trillion URLs
- ✅ No collisions
- ❌ URLs predictable → security issue
- ❌ Counter is a bottleneck

### Approach C: Pre-generated keys (recommended)
- Background service pre-generates batches of unique 7-char keys.
- Stores in a "available keys" table.
- On shorten, pop a key.
- ✅ No collisions, fast lookup, randomizable.

### Approach D: ID generator service (Twitter Snowflake-ish)
- Distributed unique ID generator → base62 encode.
- ✅ Scales well; no central bottleneck.

## Step 7: Data Model

```sql
URL_MAP
  short_key    VARCHAR(7) PRIMARY KEY
  long_url     TEXT
  created_at   TIMESTAMP
  expires_at   TIMESTAMP NULLABLE
  user_id      BIGINT NULLABLE
  click_count  BIGINT DEFAULT 0
```

For 100M URLs at 500 bytes = 50 GB. Single MySQL handles. For >1B, shard by `short_key` hash.

## Step 8: API Design

```
POST /shorten
  body: { "long_url": "...", "alias": "...", "expires_at": "..." }
  response: { "short_url": "https://tinyurl.com/abc1234" }

GET /:short_key
  → 302 redirect to long_url
  → increment click_count (async)
```

## Step 9: Caching Strategy

- **Redis for hot URLs:** 80/20 rule — 20% of URLs get 80% of traffic. Cache them.
- **Cache-aside on GET:** check Redis, fall through to DB.
- **TTL:** 24 hours; LRU eviction.

## Step 10: Click Count Tracking

- Don't write to DB on every click (too many writes).
- **Async update:** increment counter in Redis, periodically flush to DB.
- Or: write click events to Kafka, batch-process to update counts.

## Step 11: Bottlenecks & Extensions

- **DB write bottleneck:** shard by `short_key` hash.
- **Hot key in cache:** rare for URL shortener (no single super-popular key usually); but if it happens, replicate cache or use multiple keys per URL.
- **Analytics:** add a separate analytics pipeline (Kafka → ClickHouse) for granular tracking (geography, referrers, devices).
- **Custom domains:** support `mycompany.tiny.ly/xxx` with domain mapping.
- **Spam/abuse:** detect malicious URLs; integrate Google Safe Browsing.

---

# DESIGN 2: TWITTER FEED / NEWS FEED

**Difficulty:** ⭐⭐⭐⭐ (Tests fanout, caching, rankers.)

## Step 1: Clarifying Questions

- Feed type? Reverse-chronological or ranked?
> Both, but start chronological.

- Read-heavy or write-heavy?
> Heavy read (feed views >> tweet posts).

- Scale?
> 300M DAU; avg user follows 200.

## Step 2: Functional Requirements

1. Post tweet (max 280 chars)
2. Follow / unfollow user
3. View home feed (tweets from people you follow)
4. View user profile (their tweets)

## Step 3: Capacity

- 300M DAU × 2 tweets/user/day = 600M tweets/day = ~7K writes/sec avg, ~70K peak
- 300M DAU × 50 feed-loads/day = 15B feed reads/day = ~175K/sec avg, 1.75M peak
- Feed reads dominate by ~100x → optimize for read

## Step 4: Architecture

```
        +---------+
        | Client  |
        +---------+
             |
        +---------+
        | API Gtw |
        +---------+
        |    |    |
        v    v    v
   Tweet  User   Feed
   Svc   Svc    Svc
        |        |
        v        v
    Tweet DB   Cache (Redis)
   (sharded)   ↑    ↑
               |    |
       Fan-out Worker (Kafka consumer)
               ↑
       Tweet Posted Event (Kafka)
```

## Step 5: Two Approaches to Feed Generation

### Approach A: Pull (Fan-in) — read-time
- When user requests feed, fetch latest tweets from each followee → merge → sort.
- ✅ No write amplification. Storage efficient.
- ❌ Slow for users with many follows. Slow under read load.

### Approach B: Push (Fan-out) — write-time
- When user posts a tweet, push it into each follower's feed cache.
- ✅ Fast reads (just look up your feed cache).
- ❌ Write amplification: 1 tweet × 1000 followers = 1000 writes.
- ❌ Bad for celebrities (millions of followers).

### Hybrid (recommended)
- Push for normal users.
- Pull for celebrities (fan-out only when user opens feed and merges in real-time).

## Step 6: Data Model

```sql
TWEET
  id          BIGINT PRIMARY KEY
  user_id     BIGINT
  content     TEXT
  created_at  TIMESTAMP

FOLLOW
  follower_id BIGINT
  followee_id BIGINT
  PRIMARY KEY (follower_id, followee_id)

USER_FEED  (Redis sorted set, key: user_id)
  tweet_id   sorted by created_at desc
  (capped at last ~1000 tweets)
```

## Step 7: API Design

```
POST /tweets       { content }
GET  /tweets/:id
GET  /users/:id/feed?limit=20&cursor=...
POST /follow       { followee_id }
```

## Step 8: Push Fan-out Flow

1. User A posts tweet T.
2. Tweet Service writes T to Tweet DB.
3. Tweet Service publishes "TweetCreated" event to Kafka.
4. Fan-out worker subscribes to Kafka.
5. For each follower of A, push T into their Redis feed (sorted set).

## Step 9: Bottlenecks

- **Celebrity fan-out:** 100M followers × 1 tweet = 100M Redis writes. Use hybrid (pull for celebs).
- **Hot tweet:** viral tweet → many reads on tweet record. Use cache.
- **DB write:** shard tweets by `user_id` or `tweet_id`.

## Step 10: Extensions

- **Ranking algorithm:** ML model scores tweets based on engagement, recency, relationship.
- **Notifications:** when someone you follow tweets, push notification.
- **Search:** ElasticSearch index on tweets.
- **Trending:** count hashtags in last hour; top N.

---

# DESIGN 3: WHATSAPP / CHAT APP

**Difficulty:** ⭐⭐⭐⭐ (Real-time, WebSockets, presence.)

## Step 1: Clarifying Questions

- 1:1 only or group chats?
> Both.

- Media support?
> Yes (images, videos).

- Read receipts? Online presence?
> Yes.

- Scale?
> 500M DAU; 100B messages/day.

## Step 2: Functional Requirements

1. Send/receive 1:1 messages
2. Group messages
3. Online presence
4. Read receipts (sent / delivered / read)
5. Media upload

## Step 3: Capacity

- 500M DAU × 200 messages = 100B messages/day = ~1.2M msg/sec avg, ~10M peak
- 100 bytes/msg → 10 TB/day → 3.6 PB/year

## Step 4: Architecture

```
   Client (mobile/web)
        |
        | WebSocket
        v
   +---------+
   |  Edge   |   (handles WebSocket connection)
   +---------+
        |
        v
   +-------------+
   | Chat Server |  (in-memory: user_id → connection)
   +-------------+
        |
   +----+----+
   |         |
   v         v
 Kafka    Cache (Redis)
   |         |
   v         v
+---------+  Storage
| Worker  |    |
+---------+    v
   |        Cassandra (messages)
   v
Notification (offline users)
```

## Step 5: Send Message Flow

1. User A sends "hi" to user B via WebSocket.
2. Chat Server receives. Generates message_id. Stores in Cassandra.
3. Looks up B's connection in Redis (`user_id → server_id`).
4. If B online → forward via WebSocket.
5. If B offline → push notification (FCM/APNS).

## Step 6: Connection Management

- Each chat server holds many WebSocket connections (~100K each).
- Redis stores `user_id → server_id` mapping.
- When user goes online, update Redis.

## Step 7: Group Chat (challenge)

Group of 100 users → A sends → fan out to 99 others.

- Store messages in `chat_id` keyed table (not `user_id`).
- On send: notify all online members; queue for offline.

## Step 8: Data Model

```
MESSAGE  (Cassandra, partition key: chat_id, clustering: timestamp DESC)
  message_id   UUID
  chat_id      UUID
  sender_id    BIGINT
  content      TEXT
  timestamp    TIMESTAMP
  status       ENUM(sent, delivered, read)
  
CHAT
  chat_id      UUID PK
  is_group     BOOL
  participants LIST<user_id>
```

Why Cassandra? High write throughput; clustered by timestamp = fast "last N messages" queries.

## Step 9: Read Receipts

- When B opens chat: send "read" event to A.
- A's client updates UI.
- Server updates message status in DB.

## Step 10: Online Presence

- On connect, server publishes "user X online" event.
- Online status cached in Redis (`user_id → online + last_seen`).
- Friends subscribe to presence via pub-sub or polling.

## Step 11: End-to-End Encryption

- Each user has key pair.
- Sender encrypts with receiver's public key. Receiver decrypts with private.
- Server stores ciphertext only.
- Protocol: Signal Protocol (used by WhatsApp).

## Step 12: Bottlenecks & Extensions

- **Connection scaling:** sticky sessions to chat servers; fast reconnect on failure.
- **Group fanout:** for 1000-member group, queueing recommended.
- **Media:** upload to S3/object store; send only URL in message.
- **Cross-device sync:** message stored server-side; client pulls on each device.

---

# DESIGN 4: RATE LIMITER AT SCALE

**Difficulty:** ⭐⭐⭐ (Distributed concurrency.)

(Algorithm details covered in LLD Design 4. HLD focuses on **distributed** rate limiting.)

## Single-machine vs distributed

Single-machine = easy (in-memory token bucket). Distributed = need shared state.

## Approach A: Sticky load balancing
- Same client always hits same server.
- Each server runs local rate limiter.
- ✅ Simple; no shared state.
- ❌ If server goes down, state lost. Imbalanced if hash-based.

## Approach B: Centralized cache (Redis)
- All servers consult shared Redis.
- Use atomic Lua script for check-and-decrement.

```lua
-- Atomic increment + check
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return count
```

- ✅ Accurate, single source of truth.
- ❌ Redis is a bottleneck and SPOF.

## Approach C: Sliding window in Redis
Store request timestamps in Redis sorted set per user. Drop old; check count.

```
ZADD user:123 <now> <request_id>
ZREMRANGEBYSCORE user:123 -inf <now - window>
ZCARD user:123  // current count
```

## Approach D: Local + sync (eventual consistency)
- Each server has local counter.
- Sync to Redis every 1 sec.
- ✅ Fast; ❌ small inaccuracy across servers.

## Architecture

```
   Client → LB → API Gateway → [Rate Limiter Layer] → Service
                                       ↓
                                     Redis
```

## Bottlenecks

- Redis throughput: 100K ops/sec/node. Shard Redis by user_id hash for >1M req/sec.
- Latency added: rate limiter check should be < 1 ms.

---

# DESIGN 5: NOTIFICATION SYSTEM (Email / SMS / Push)

**Difficulty:** ⭐⭐⭐ (Pub-sub, retries, deduplication.)

## Step 1: Functional Requirements

1. Send email, SMS, push notifications
2. Schedule notifications
3. Templates with variables
4. Track delivery status
5. Retry on failure

## Step 2: Architecture

```
   Producers (services)
          |
          v
        Kafka  (NotificationRequested topic)
          |
          v
   +---------------+
   | Notif Service |  (consumer: dispatch by type)
   +---------------+
   |       |       |
   v       v       v
 Email   SMS    Push
 Sender  Sender Sender
   |       |       |
   v       v       v
 SendGrid Twilio FCM/APNS
   |       |       |
   v       v       v
        Status DB
```

## Step 3: Why a queue?
- Decouples producers from senders.
- Buffers traffic spikes.
- Retries on failure (worker crashes don't lose messages).

## Step 4: Idempotency

If a service sends "order confirmed" twice, you don't want 2 emails.

- Each notification has `idempotency_key`.
- Notification Service checks: have I sent this key before?
- Use Redis (`SET key value NX EX 86400` — set if not exists with TTL).

## Step 5: Retries

- On send failure (3rd-party down), retry with exponential backoff.
- After N failures, move to dead-letter queue (DLQ) for manual investigation.

## Step 6: Templates

```sql
TEMPLATE
  id          UUID
  name        TEXT  -- 'order_confirmation'
  channel     ENUM
  subject     TEXT  -- "Your order #{order_id}"
  body        TEXT  -- "Hi {name}, ..."
```

Notification request includes template_id + variables. Service renders and sends.

## Step 7: Tracking

```sql
NOTIFICATION_LOG
  id          UUID
  user_id     BIGINT
  channel     ENUM
  status      ENUM(queued, sent, delivered, failed, bounced)
  sent_at     TIMESTAMP
  error       TEXT
```

For email: webhook from SendGrid updates status (delivered/bounced/opened).

## Step 8: Bottlenecks & Extensions

- **Throughput:** Kafka partitioning; horizontal scale on consumers.
- **User preferences:** per-user opt-out for marketing emails.
- **Quiet hours:** don't send push at 3 AM (use timezone).
- **Rate limit per user:** 10 emails/day max.

---

# DESIGN 6: ANALYTICS-INSTRUMENTED URL SHORTENER (TinyURL with Analytics)

**Difficulty:** ⭐⭐⭐⭐ (Real-time + batch analytics.)

Builds on Design 1. Now you must support:
- Click counts in real-time
- Geography breakdown
- Referrer analysis
- Time-series (clicks per hour for last 30 days)

## Step 1: Architecture

```
   Click on short URL
         |
         v
   +-------------+
   | Redirect Svc|
   +-------------+
       |     |
       |     +---> 302 redirect (immediate, fast)
       v
   Kafka (clicks topic)  -- async; doesn't block redirect
       |
       v
   +--------+--------------+
   |                       |
   v                       v
 Real-time              Batch
 Pipeline               Pipeline
 (Flink/Spark)          (Spark)
   |                       |
   v                       v
 Redis (live counters)  ClickHouse / S3 + Athena
                        (analytical queries)
```

## Step 2: Click Event Schema

```json
{
  "event_id": "uuid",
  "short_key": "abc1234",
  "timestamp": 1717000000,
  "ip_address": "1.2.3.4",
  "user_agent": "...",
  "referrer": "https://twitter.com",
  "country": "IN",
  "device_type": "mobile"
}
```

## Step 3: Real-Time Counters

- Flink job reads Kafka, increments Redis counters per `short_key`.
- Live dashboard reads from Redis.

## Step 4: Aggregated Analytics

- Batch job (hourly): aggregate clicks per (short_key, hour) → write to OLAP store.
- Queries like "clicks per day for the last 30 days" hit OLAP.

## Step 5: Why separate from main DB?

- High write rate of click events would slow down primary URL DB.
- OLAP (columnar) is optimized for aggregations, not point lookups.
- Decoupling lets analytics scale independently.

## Step 6: API for Analytics

```
GET /analytics/:short_key
  response: {
    "total_clicks": 50000,
    "today_clicks": 1200,
    "country_breakdown": { "IN": 30000, "US": 10000, ... },
    "hourly_last_30_days": [...]
  }
```

## Step 7: Storage Estimate

- 50M clicks/day × 200 bytes = 10 GB/day = 3.6 TB/year of raw events.
- Hot data (last 30 days) in fast OLAP store; older in S3 (cheap cold storage).

---

# PART 7: GENERAL HLD INTERVIEW TIPS

## What interviewers want to see

1. **Don't memorize one design.** Show that you can apply the framework to any problem.
2. **Justify every choice.** "I chose Cassandra because X" beats "I chose Cassandra."
3. **Identify tradeoffs explicitly.** "If we chose strong consistency here, we'd lose availability during partitions."
4. **Estimate before designing.** A QPS estimate informs whether to use cache, queue, or shard.
5. **Discuss what NOT to build.** "I'd skip ML ranking initially; ship reverse-chronological first."

## Common mistakes

- ❌ Drawing a giant diagram with 30 components in 5 min.
- ❌ Saying "I'd use Kafka" without explaining why over RabbitMQ or SQS.
- ❌ Forgetting capacity estimation entirely.
- ❌ Ignoring concurrency and consistency.
- ❌ Not discussing failures (what if DB goes down?).

## Verbal phrases that score points

- "Let me clarify the requirements first..."
- "Given the read-heavy nature, I'll lean toward caching aggressively."
- "There's a tradeoff between consistency and availability here..."
- "If scale grows 10x, the bottleneck will be X — we'd address it by Y."
- "I'd start with a simple monolith and migrate to microservices when..."

---

# PART 8: STUDY CHECKLIST (Plan Months 6–7)

| Plan Month | Designs to complete |
|------------|----------------------|
| Plan Month 6 (Nov 2026) | Read Parts 1–4 (foundations + building blocks). Design 1: URL Shortener |
| Plan Month 7 (Dec 2026) | Designs 2–6 (Twitter, WhatsApp, Rate Limiter, Notifications, Analytics) |

For each design:
- [ ] Read the section
- [ ] Re-design from scratch on whiteboard / paper without looking
- [ ] Verbalize the design out loud (record yourself if possible)
- [ ] Identify 3 alternatives + tradeoffs at each major component

By **end of Plan Month 8 (Jan 2027 — applications begin):**
- [ ] All 6 designs revisable in 30 min each
- [ ] Capacity numbers (latency, throughput) memorized
- [ ] CAP theorem internalized

---

# PART 9: 20-QUESTION CONSOLIDATED Q&A BANK

## Building Blocks
1. CAP theorem — what does it mean? *(Part 3.8)*
2. SQL vs NoSQL — when to use which? *(Part 3.3)*
3. Cache patterns — Cache-aside vs Write-through vs Write-back? *(Part 3.2)*
4. What is a CDN? When to use? *(Part 3.7)*
5. Sharding strategies — range vs hash vs consistent hashing? *(Part 3.4)*
6. Master-slave vs Master-master replication? *(Part 3.5)*
7. Kafka vs RabbitMQ — when which? *(Part 3.6)*
8. L4 vs L7 load balancer? *(Part 3.1)*
9. Strong vs eventual consistency? *(Part 3.9)*
10. WebSockets vs Long Polling vs SSE? *(Part 3.12)*

## Designs
11. Walk through URL Shortener. Key challenges? *(Design 1)*
12. How do you generate short keys? Tradeoffs? *(Design 1)*
13. Twitter feed — push vs pull vs hybrid? *(Design 2)*
14. How do you handle celebrity fanout? *(Design 2)*
15. WhatsApp — how do you handle 1B online users? *(Design 3)*
16. How does presence work in chat? *(Design 3)*
17. Distributed rate limiter — Redis approach? *(Design 4)*
18. Why use a queue for notifications? *(Design 5)*
19. How do you make notifications idempotent? *(Design 5)*
20. Analytics pipeline — why separate from main DB? *(Design 6)*

---

# RESOURCES (pick ONE primary, ONE practice)

**Primary:**
1. **System Design Interview Vol 1 + Vol 2** by Alex Xu — gold standard.
2. **Gaurav Sen** YouTube — Indian, accessible, design walkthroughs.
3. **ByteByteGo** YouTube + newsletter — visual explanations.

**Practice:**
1. **Educative.io System Design course** — interactive.
2. **High Scalability blog** — real-world architectures.
3. **github.com/donnemartin/system-design-primer** — comprehensive, free.

For each design above: watch one Gaurav Sen / ByteByteGo video, then re-design on your own.

---

# WHAT'S NOT HERE (for Tier S, return later)

- **Distributed transactions** — 2PC, Saga pattern (Tier S deep-dive)
- **Consensus algorithms** — Paxos, Raft (rarely tested at Tier B)
- **Vector clocks, gossip protocol** — distributed timing concepts
- **Microservice patterns** — Circuit Breaker, Bulkhead, Service Mesh details
- **CRDT** (Conflict-free Replicated Data Types)
- **Specific DB internals** — LSM trees in Cassandra, B-trees in Postgres deep
- **Designs:** Uber, Instagram, YouTube, Dropbox, Netflix, Google Maps, Stock Trading System
  - These come up at Tier S; same framework applies. Practice 2-3 of these in Plan Month 9 if time allows.

---

*Doc last updated: May 2026. 6 designs covered. By Plan Month 7 (December 2026), all 6 should be redesigned from scratch + verbalized. By Plan Month 8 (January 2027 — applications start), this doc is your interview-ready HLD foundation.*
