# Computer Networks — Tier B Interview-Ready

> Lean CN reference for Tier B SDE-1/SDE-2 interviews (Visa, JPMC, Razorpay, PayPal, CRED, PhonePe). Covers exactly what's asked in OAs and tech rounds — nothing more.

---

## Where this fits

| File | Status | Finish by |
|------|--------|-----------|
| OS.md | ✅ Done | — |
| DBMS.md | ✅ Done | — |
| **CN.md (this file)** | In progress | **End of September 2026** (Plan Month 4) |
| LLD.md | Pending | End of November 2026 |
| OOP.md | Pending | End of October 2026 |
| HLD.md | Pending | End of December 2026 |

---

## How to use this doc

Each topic: **What → Why → How → Interview Q&A.** Skip the academic depth; CN gets less time in interviews than OS or DBMS.

Re-read schedule: Day +7 (full), Day +30 (Q&A only), monthly thereafter.

---

# PART 1: NETWORK MODELS

## What is a network model?
A layered framework describing how data flows from one machine to another over a network. Layers separate concerns (each layer does one job).

## OSI Model (7 layers)
Theoretical reference — used to explain concepts, not implemented as-is.

| # | Layer | Purpose | Example |
|---|-------|---------|---------|
| 7 | **Application** | User-facing protocols | HTTP, FTP, SMTP, DNS |
| 6 | **Presentation** | Encoding, encryption | SSL/TLS, JSON, base64 |
| 5 | **Session** | Sessions / dialogs | NetBIOS, RPC |
| 4 | **Transport** | End-to-end delivery, reliability | TCP, UDP |
| 3 | **Network** | Routing between networks | IP, ICMP |
| 2 | **Data Link** | Frame delivery on same network | Ethernet, MAC |
| 1 | **Physical** | Bits over wire/wireless | Cables, signals |

## TCP/IP Model (4 layers — practical)

| Layer | Maps to OSI | Examples |
|-------|-------------|----------|
| **Application** | 5+6+7 | HTTP, DNS, FTP, SSH |
| **Transport** | 4 | TCP, UDP |
| **Internet** | 3 | IP, ICMP |
| **Network Access** | 1+2 | Ethernet, Wi-Fi |

## OSI vs TCP/IP

| OSI | TCP/IP |
|-----|--------|
| 7 layers | 4 layers |
| Theoretical / reference model | Practical / actual model used |
| Strict separation | Layers somewhat blurred |

---

## Q&A — Models

**Q: OSI vs TCP/IP — which is used?**
> TCP/IP is what's actually used. OSI is a teaching/reference model. TCP/IP has 4 layers (Application, Transport, Internet, Network Access); OSI has 7.

**Q: At which layer does TCP/UDP work?**
> Transport layer (Layer 4 in OSI, Transport in TCP/IP).

**Q: At which layer does HTTP work?**
> Application layer.

---

# PART 2: TCP vs UDP (most-asked CN topic)

## TCP (Transmission Control Protocol)
Connection-oriented, reliable, ordered byte stream.

**Features:**
- 3-way handshake before data
- Acknowledgements + retransmission for reliability
- In-order delivery (sequence numbers)
- Flow control (don't overwhelm receiver)
- Congestion control (don't overwhelm network)

## UDP (User Datagram Protocol)
Connectionless, unreliable, datagram-based.

**Features:**
- No handshake — fire and forget
- No retransmission
- No order guarantee
- Lower latency, lower overhead

## TCP vs UDP (memorize this table)

| TCP | UDP |
|-----|-----|
| Connection-oriented (handshake) | Connectionless |
| Reliable (acks, retransmits) | Unreliable |
| In-order delivery | No order guarantee |
| Higher overhead (header ~20+ bytes) | Lower overhead (header 8 bytes) |
| Slower | Faster |
| HTTP, HTTPS, SSH, FTP, SMTP | DNS, DHCP, video streaming, online games, VoIP |

## When to use which?

**TCP:** When correctness matters more than speed (web pages, file downloads, banking).
**UDP:** When speed matters more than perfect delivery (live video, gaming, DNS lookups).

---

## Q&A — TCP/UDP

**Q: TCP vs UDP?**
> TCP: connection-oriented, reliable, in-order, slower. UDP: connectionless, unreliable, faster, lower overhead. TCP for web/files/banking; UDP for video/gaming/DNS.

**Q: Why is TCP reliable?**
> Sequence numbers + acknowledgements + retransmission on timeout + flow control + congestion control.

**Q: Why is UDP faster?**
> No handshake, no acks, no retransmission, smaller header. Trades reliability for speed.

---

# PART 3: TCP 3-WAY HANDSHAKE

## Why?
Before sending data, both sides must agree to communicate and synchronize their sequence numbers.

## The 3 steps

```
Client                          Server
  |                               |
  | --- SYN (seq=x) ----------->  |   1. Client says "let's talk"
  |                               |
  |  <-- SYN-ACK (seq=y, ack=x+1) |   2. Server says "ok, let's talk"
  |                               |
  | --- ACK (ack=y+1) --------->  |   3. Client confirms
  |                               |
  | <======== DATA ============>  |   Now data flows
```

1. **SYN:** Client → Server. "I want to connect." Includes initial seq=x.
2. **SYN-ACK:** Server → Client. "OK, and I want to connect too." Acks x+1, sends own seq=y.
3. **ACK:** Client → Server. "Confirmed." Acks y+1.

After this, both sides know each other's sequence numbers and can transfer data reliably.

## TCP Connection Termination — 4-way handshake

```
Client                     Server
  | --- FIN ---------->     |   I'm done sending
  | <-- ACK -----------     |   Got it
  | <-- FIN -----------     |   I'm also done
  | --- ACK ---------->     |   Got it
```

Why 4 steps and not 3? Either side can finish sending before the other — close is half-duplex.

---

## Q&A — Handshake

**Q: Explain TCP 3-way handshake.**
> 1) Client sends SYN with seq=x. 2) Server replies SYN-ACK (acks x+1, sends own seq=y). 3) Client sends ACK (acks y+1). After this, both sides have synchronized sequence numbers and data flows.

**Q: Why does TCP use 3 steps and not 2?**
> Two would prove only one direction works. Three confirms both directions are alive and sequence numbers are agreed in both directions.

**Q: Why is TCP termination 4-way?**
> Close is half-duplex — each side closes its sending direction independently. So we need FIN+ACK in each direction = 4 messages.

---

# PART 4: HTTP & HTTPS

## What is HTTP?
HyperText Transfer Protocol. Application-layer protocol for transferring data on the web. Stateless request-response.

## HTTP Methods

| Method | Purpose | Idempotent? | Safe? |
|--------|---------|-------------|-------|
| **GET** | Retrieve resource | Yes | Yes |
| **POST** | Create / submit | No | No |
| **PUT** | Update / replace entire resource | Yes | No |
| **PATCH** | Partial update | No (typically) | No |
| **DELETE** | Remove resource | Yes | No |
| **HEAD** | Like GET but no body | Yes | Yes |
| **OPTIONS** | Discover allowed methods | Yes | Yes |

**Idempotent:** same request multiple times = same effect.
**Safe:** doesn't modify server state.

## HTTP Status Codes

| Range | Meaning |
|-------|---------|
| 1xx | Informational (rare) |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client error |
| 5xx | Server error |

**Memorize these specifically:**
- **200** OK
- **201** Created
- **204** No Content
- **301** Moved Permanently
- **302** Found (temporary redirect)
- **304** Not Modified (cache hit)
- **400** Bad Request
- **401** Unauthorized (auth needed)
- **403** Forbidden (auth not enough)
- **404** Not Found
- **409** Conflict
- **429** Too Many Requests (rate limit)
- **500** Internal Server Error
- **502** Bad Gateway
- **503** Service Unavailable
- **504** Gateway Timeout

## HTTPS = HTTP + TLS
HTTP runs over TCP. HTTPS runs over TCP + TLS, encrypting traffic.

## TLS Handshake (simplified)
```
1. Client → Server: "Hello, here's my supported ciphers"
2. Server → Client: "Hello, picked cipher X. Here's my certificate."
3. Client verifies cert against CA. Generates session key.
4. Client → Server: encrypted session key (using server's public key)
5. Both sides switch to symmetric encryption with session key.
```

**Why hybrid (asymmetric + symmetric)?**
- Asymmetric (RSA, ECDH) is secure but slow.
- Symmetric (AES) is fast but needs shared key.
- Use asymmetric **once** to exchange a symmetric key, then symmetric for all data.

## HTTP/1.1 vs HTTP/2 vs HTTP/3 (briefly)

| Version | Key features |
|---------|--------------|
| HTTP/1.1 | Persistent connections, but one request at a time per connection |
| HTTP/2 | Multiplexing (multiple requests on one connection), header compression, server push |
| HTTP/3 | Built on QUIC (UDP-based), faster connection setup, better mobile performance |

---

## Q&A — HTTP

**Q: GET vs POST?**
> GET: retrieves data, idempotent and safe, parameters in URL. POST: submits data, not idempotent or safe, body carries data. GETs can be cached and bookmarked; POSTs typically can't.

**Q: What does idempotent mean?**
> Sending the same request multiple times has the same effect as sending it once. GET, PUT, DELETE are idempotent. POST is not.

**Q: Difference between 401 and 403?**
> 401 Unauthorized: you haven't proven who you are (need to log in). 403 Forbidden: you've authenticated but aren't allowed to access this resource.

**Q: How does HTTPS work?**
> HTTPS = HTTP over TLS. TLS handshake exchanges a symmetric session key using asymmetric encryption + server certificate. Subsequent traffic is encrypted with that symmetric key.

**Q: What is a 301 vs 302?**
> 301: permanent redirect — browsers/CDNs cache it. 302: temporary — don't cache, hit the original URL next time.

---

# PART 5: DNS

## What is DNS?
Domain Name System — translates human-readable names (`google.com`) into IP addresses (`142.250.182.46`).

## How a DNS lookup works

When you type `google.com`:

1. **Browser cache** — recently looked up?
2. **OS cache** — system-level cache?
3. **Resolver** (your ISP's DNS server) — asks recursively if not cached
4. **Root servers** (`.`) — direct to TLD server
5. **TLD servers** (`.com`) — direct to authoritative server
6. **Authoritative server** — for `google.com` — returns IP
7. Resolver returns IP to OS → browser → connect

Result is cached at multiple levels for speed.

## DNS Record Types

| Type | Purpose |
|------|---------|
| **A** | IPv4 address |
| **AAAA** | IPv6 address |
| **CNAME** | Alias (one name → another name) |
| **MX** | Mail server |
| **TXT** | Text records (SPF, verification) |
| **NS** | Nameserver for the domain |

## DNS uses UDP (mostly)
DNS uses UDP for speed (small queries, low overhead). Falls back to TCP for large responses (>512 bytes) or zone transfers.

---

## Q&A — DNS

**Q: What is DNS?**
> Translates domain names (google.com) into IP addresses. Hierarchical distributed system: root → TLD → authoritative → record. Heavy caching at multiple levels.

**Q: Why does DNS use UDP?**
> Speed and low overhead. DNS queries are small and need to be fast. TCP's handshake is too expensive. Falls back to TCP for large responses.

**Q: What is a CNAME record?**
> An alias — `www.example.com` CNAME to `example.com`. Resolver follows the chain until finding an A record.

---

# PART 6: IP, ROUTERS, AND BASIC NETWORKING

## IPv4 vs IPv6

| IPv4 | IPv6 |
|------|------|
| 32-bit address (~4.3 billion) | 128-bit (~340 undecillion) |
| Format: 192.168.1.1 | Format: 2001:0db8:85a3::1 |
| Running out | Replacement, slowly adopted |

## Public vs Private IP
- **Public:** routable on internet, unique globally.
- **Private:** for internal networks (10.x.x.x, 172.16.x.x–172.31.x.x, 192.168.x.x). Not routable on internet — uses NAT.

## NAT (Network Address Translation)
Lets many devices share one public IP. Router maps internal (private IP, port) ↔ (public IP, port).

## Hub vs Switch vs Router

| Device | Layer | Job |
|--------|-------|-----|
| **Hub** | Physical | Broadcasts to all ports (dumb, obsolete) |
| **Switch** | Data Link | Forwards based on MAC address (within network) |
| **Router** | Network | Forwards between networks based on IP |

## MAC vs IP
- **MAC:** unique hardware address (48-bit), assigned to each NIC at manufacture. For local network delivery.
- **IP:** logical address, can change. For routing across networks.

## Subnetting (briefly)
Split a network into smaller subnetworks using a subnet mask. e.g., `192.168.1.0/24` = network `192.168.1.0`, hosts `1–254`.

For Tier B, knowing the concept is enough. Deep subnetting math is rarely tested.

---

## Q&A — IP & Networking

**Q: Public vs private IP?**
> Public: globally unique, routable on internet. Private: for internal networks (10.x, 172.16-31.x, 192.168.x), not routable, mapped via NAT.

**Q: Hub vs switch vs router?**
> Hub: broadcasts to all ports (obsolete). Switch: layer-2, forwards by MAC within a network. Router: layer-3, forwards by IP between networks.

**Q: What is NAT?**
> Network Address Translation — lets many devices share one public IP. Router rewrites packet headers, mapping (internal IP, port) to (public IP, port).

**Q: MAC vs IP?**
> MAC: physical hardware address (per NIC), used for local delivery. IP: logical address, used for routing across networks.

---

# PART 7: APIS & WEB CONCEPTS

## REST
Representational State Transfer — architectural style for web APIs.

**Principles:**
- Stateless (each request independent)
- Resource-based URLs (`/users/123`)
- Standard HTTP methods (GET/POST/PUT/DELETE)
- JSON or XML payloads
- Cacheable

## REST vs GraphQL vs gRPC

| | REST | GraphQL | gRPC |
|---|------|---------|------|
| Format | JSON | JSON | Protocol Buffers |
| Transport | HTTP | HTTP | HTTP/2 |
| Schema | Optional | Required (SDL) | Required (.proto) |
| Over-fetching | Common | Solves it (client picks fields) | N/A |
| Speed | Moderate | Moderate | Fast (binary) |
| Use case | Public APIs | Frontend-driven APIs | Microservices |

## Cookies vs Sessions vs Tokens

- **Cookie:** key-value stored in browser, sent with every request to that domain. Used for session ID, preferences.
- **Session:** server-side state identified by session ID (often stored in cookie).
- **Token (JWT):** self-contained, signed payload — server verifies signature without needing to look up state.

## CORS (Cross-Origin Resource Sharing)
Browser security: by default, `https://a.com` can't call `https://b.com` via JavaScript. CORS = server's headers say "I trust this origin," letting the browser allow it.

## Load Balancers (briefly)
Distribute incoming requests across multiple backend servers.

**Algorithms:**
- Round Robin (rotate)
- Least Connections (fewest active)
- IP Hash (sticky by client IP)

**Layer 4 (TCP)** vs **Layer 7 (HTTP)** — L7 understands content, can route by URL/header.

(Deeper LB topics live in HLD.md.)

---

## Q&A — APIs

**Q: REST vs GraphQL?**
> REST: resource-based, fixed endpoints, can over-fetch or under-fetch. GraphQL: client specifies exactly what fields it wants in one query, no over-fetching, but more complex server.

**Q: What is CORS?**
> Cross-Origin Resource Sharing — browser security mechanism. By default, JS can't make requests to a different origin. Server's CORS headers tell browser which origins are allowed.

**Q: What's a JWT?**
> JSON Web Token — a signed, self-contained token containing user identity and claims. Server can verify signature without database lookup. Used for stateless auth.

**Q: Layer 4 vs Layer 7 load balancer?**
> L4: routes by IP/port (TCP-level). Fast but blind to content. L7: routes by HTTP details (URL, headers, cookies). Slower but smarter (e.g., send `/api/*` to API servers, `/img/*` to CDN).

---

# PART 8: COMMON CN INTERVIEW SCENARIOS

These are scenarios interviewers walk you through:

## "What happens when you type google.com in the browser?"
Classic question. Walk through:

1. **Browser checks cache** for the URL.
2. **DNS resolution** — find IP for google.com (browser cache → OS cache → resolver → root → TLD → authoritative).
3. **TCP 3-way handshake** with Google's IP on port 443.
4. **TLS handshake** — exchange certificate, agree on session key.
5. **HTTP request** sent over encrypted connection.
6. **Server responds** with HTML.
7. Browser parses HTML, makes more requests (CSS, JS, images).
8. Renders page.
9. Connection closed (4-way termination).

If you can narrate this, you've nailed CN basics.

## "Why does HTTP use TCP?"
> HTTP needs reliable, in-order delivery (web pages can't have missing pieces). TCP provides that. UDP would lose data and be useless for HTML.

## "How does HTTPS protect data?"
> Encrypts all HTTP traffic via TLS — using asymmetric crypto for initial key exchange, symmetric for bulk data. Also authenticates the server via certificates (signed by trusted CAs).

---

# PART 9: 20-QUESTION CONSOLIDATED Q&A BANK

## Models & Layers
1. OSI vs TCP/IP — which is used? *(Part 1)*
2. At which layer does TCP work? HTTP? *(Part 1)*

## TCP/UDP
3. TCP vs UDP? *(Part 2)*
4. Why is TCP reliable? *(Part 2)*

## Handshake
5. Explain TCP 3-way handshake. *(Part 3)*
6. Why TCP termination is 4-way? *(Part 3)*

## HTTP / HTTPS
7. GET vs POST? *(Part 4)*
8. What does idempotent mean? Examples? *(Part 4)*
9. Difference between 401 and 403? *(Part 4)*
10. What's a 301 vs 302 redirect? *(Part 4)*
11. How does HTTPS work? *(Part 4)*

## DNS
12. What is DNS? How does lookup work? *(Part 5)*
13. Why does DNS use UDP? *(Part 5)*

## IP & Networking
14. Public vs private IP? *(Part 6)*
15. Hub vs switch vs router? *(Part 6)*
16. What is NAT? *(Part 6)*

## APIs
17. REST vs GraphQL? *(Part 7)*
18. What is CORS? *(Part 7)*
19. L4 vs L7 load balancer? *(Part 7)*

## Walkthrough
20. What happens when you type google.com? *(Part 8)*

---

# STUDY CHECKLIST

By **end of September 2026 (Plan Month 4):**
- [ ] Read all parts (this doc is shorter than OS/DBMS — finishable in a week)
- [ ] Answer all 20 Q&A confidently
- [ ] Walk through "type google.com" verbally without notes
- [ ] TCP vs UDP table memorized
- [ ] TLS handshake steps memorized

By **end of October 2026 (Plan Month 5):**
- [ ] Quick re-read (20 min)
- [ ] All 20 Q&A in <45 sec each

By **end of January 2027 (Plan Month 8):**
- [ ] Final revision before applications
- [ ] All 20 Q&A verbal without notes

---

# RESOURCES (pick ONE)

1. **Striver CN playlist** (YouTube) — Indian-context, Tier B-level depth.
2. **Love Babbar / Apna College CN** — quick GfG-linked.
3. **GeeksforGeeks Computer Networks** — quick reference.

CN is the lightest of the 4 fundamentals at Tier B. Don't over-invest. **One week, then move on.**

---

# WHAT'S NOT HERE (for Tier S, return later)

- Detailed routing protocols (RIP, OSPF, BGP)
- Detailed TCP congestion control (Reno, BBR, Cubic)
- Subnetting math problems (CIDR calculations)
- Wireless protocols (802.11 family details)
- VPN internals (IPSec details)
- Frame structure deep (Ethernet header bytes)
- Detailed application protocols (FTP, SMTP, IMAP commands)
- Network security (firewalls, IDS/IPS)
- Quality of Service (QoS)
- Multicast / broadcast deep
- IPv6 transition mechanisms

For Tier S (Google/Meta), some of this comes up. For Tier B SDE-1/2, you don't need it.

---

*Doc last updated: May 2026. Re-read on Day +7, +30, monthly. ~20 Q&A is the complete deliverable for Tier B.*
