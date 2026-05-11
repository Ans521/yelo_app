# 🍱 Tiffin Connect — Project Design Document

**Date:** 2026-05-11
**Status:** Brainstorm / Pitch Document
**Audience:** Founding team + 2 collaborating developers

---

## 1. The Problem

- Tiffin sector in India is **completely unorganized** — no central platform.
- Customers struggle to **discover** good providers nearby.
- Zomato / Swiggy = oily, expensive, unhealthy, and 30%+ commission kills small providers.
- Providers have **no tech tools** — they manage 150–200 customers daily via WhatsApp + notebook.
- No way for customers to **pause / skip / customize** subscriptions easily.

---

## 2. The Solution

A 3-sided platform — *Tiffin Connect* — that becomes the **operating system for the tiffin industry in India**.

- **Customer App** (React Native / Flutter)
- **Provider App** (mobile, for field operations) + **Provider Web Admin Panel** (for back-office)
- **Super Admin Panel** (Web — for the founding team)
- **(Future) Delivery Agent App** — gig workers for last-mile delivery

Providers do their own delivery in Phase 1. We are **not** a delivery company. We are the **platform**.

---

## 3. Core Features — Customer Side

### Discovery & Browsing
- Location-based provider listing (pincode / GPS).
- Filters: veg / non-veg, Jain, North Indian, South Indian, price range, rating.
- Provider profile: photos of food, weekly menu, pricing, reviews, delivery area.
- **"Follow" a provider** → push notifications for special menus and offers.

### Ordering (Two Modes)
- **One-time order** — order today's lunch / dinner from any provider.
- **Subscription** — weekly / monthly plan (1, 2, or 3 meals a day).

### Subscription Management *(Killer Feature)*
- Pause for a day / week / vacation.
- "Skip today" button → notifies provider before cutoff time.
- Change meal preference for tomorrow (e.g., "no onion today").
- Auto-renew or manual renew.
- Pay monthly / weekly / per-meal.

### Live Tiffin Tracking
- Real-time status: `Cooking → Packed → Out for Delivery → Delivered`.
- **Live map view** with provider / agent GPS location (like Zomato).
- ETA shown to the customer (e.g., "Arriving in 18 min").
- Push notification at each stage.
- Why it matters: tiffin delivery takes **25 min to 1.5 hrs** — live tracking = trust + fewer "where's my food?" calls to providers.

### Other Customer Features
- Rating + reviews after each meal.
- Refer & earn.
- Wallet + payment history.
- Push notifications for menu, delivery status, offers.

---

## 4. Core Features — Provider Side

Providers get **two interfaces** — phone for field, web for office.

### A. Provider Mobile App (Field / On-the-go)
- Mark orders delivered, scan QR at customer door.
- Quick broadcast notifications.
- Today's delivery list with map navigation.
- Order pickup / handoff to delivery agent (Phase 2+).

### B. Provider Web Admin Panel (Back-office)
- Full menu management (add / edit dishes, weekly rotation).
- Customer database with full history.
- Subscription analytics, revenue charts.
- Bulk operations (mark 50 tiffins out-for-delivery in one click).
- Staff accounts — cook, delivery person, owner have different access levels.
- Export reports (Excel / PDF) for GST and accounting.

### Onboarding
- Sign up → upload FSSAI license, address, photos.
- Set delivery area (pincodes / radius).
- Build weekly menu.
- Set pricing (per meal / monthly / weekly plans).

### Daily Operations Dashboard
- Today's order list — total tiffins to cook (auto-calculated from subscriptions + one-time orders − skips).
- Customer list with addresses for delivery.
- Mark orders: prepared → out for delivery → delivered.
- Cutoff time settings (e.g., orders close at 10 AM for lunch).

### Customer Communication
- Send push notification to **all followers** ("Today's special: Rajma Chawal 🍛").
- Broadcast pause notice ("Closed on Holi, 14th March").
- One-on-one chat (Phase 2).

### Business Tools
- Revenue dashboard (daily / weekly / monthly).
- Customer retention metrics.
- **Run in-app ads** to boost visibility in their area.
- Subscription analytics (active, paused, churned).

### Payouts
- Customer pays → escrow → provider payout weekly / daily.

---

## 5. Super Admin Panel (Founding Team)

The system has a **three-tier admin hierarchy**:

1. **Super Admin (us)** — full control: approve providers, resolve disputes, platform analytics, manage agents.
2. **Provider Admin** — controls their own kitchen, customers, menu, broadcasts, staff.
3. **Agent Admin (future)** — earnings dashboard, ride history, payout settings.

### Super Admin Capabilities
- Approve / reject provider applications (KYC verification).
- View all providers, customers, orders.
- Resolve disputes (refunds, complaints).
- Manage ads, banners, promotions.
- Revenue dashboard.
- Send platform-wide push notifications.

---

## 6. Revenue Model — 6-Stage Roadmap

**Stage 1 — Free (Month 0–6).** Onboard 50+ providers in 1 city. Zero charges. Goal: prove value.

**Stage 2 — Micro-transaction (after 10k daily orders).** ₹0.50 to ₹1 per order. Negligible for provider, massive for us at scale.

**Stage 3 — In-app Ads.** Providers pay to feature their tiffin on top of listings in their area. Like Zomato Sponsored.

**Stage 4 — Premium Subscriptions.**
- *For providers:* ₹499 / month → analytics, priority listing, broadcast tools.
- *For customers:* ₹99 / month → free delivery, priority support, exclusive providers.

**Stage 5 — B2B.** Supply tiffin to offices, gyms, hostels via the platform.

**Stage 6 — Agent Delivery Network 🚴 (Year 2).**

Today: provider delivers themselves.
Problem: past 200 customers, **delivery becomes the bottleneck**.

**Solution: Delivery Agent App** (the 3rd app in the ecosystem)
- Anyone with a bike (Swiggy / Zomato / Rapido riders in free hours, college students, retired uncles) signs up as an **agent**.
- During lunch (11 AM – 2 PM) and dinner (7 PM – 10 PM) rush, agents go online.
- Provider clicks "Need Delivery Help" → app pings nearby agents.
- First agent to accept picks up from kitchen → delivers.
- **Agent earns ₹25–₹40 per delivery.**
- Provider pays per delivery (way cheaper than full-time staff).
- We take ₹2–₹5 cut per delivery as platform fee.

**Why this is genius:**
1. Solves the **scaling problem** for providers (no full-time hiring).
2. Provides **side income** for existing gig workers in idle hours.
3. Becomes a **3rd revenue stream** for us.
4. Long-term: competes with Dunzo / Borzo in hyperlocal — but **food-focused only**.

**Tech for the agent app:**
- Real-time location matching (Uber-style nearest-driver algorithm).
- In-app earnings wallet + weekly payouts.
- Two-way rating (provider ↔ agent).

---

## 7. MVP Scope — Phased Build Plan

### Phase 1 (Months 1–3) — MVP
- Customer app: signup, browse providers, one-time order, subscribe monthly, pause/skip, pay, rate.
- Provider app: signup, menu setup, daily order list, mark delivered, broadcast notifications.
- Provider web admin panel: menu, customers, analytics (basic).
- Super admin: approve providers, view orders, basic analytics.
- Payment: Razorpay.
- Push notifications: Firebase.
- Self-delivery by provider.
- **Basic order tracking** (status updates only — no live map yet).

**NOT in MVP:** chat, wallet, referrals, ads, B2B, agent app, live GPS tracking.

### Phase 2 (Months 4–6)
- Live GPS tracking with map.
- Wallet + refer & earn.
- In-app ads for providers.
- Bulk operations and exports in provider panel.

### Phase 3 (Months 7–12)
- **Agent Delivery App** launch.
- Premium subscriptions (provider + customer).
- Expand to 2nd city.

### Phase 4 (Year 2)
- B2B (offices, gyms, hostels).
- Tiffin marketplace at scale.

---

## 8. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Mobile app | **React Native** | One codebase, both Android + iOS — faster for 2 devs |
| Backend | **Node.js + Express + PostgreSQL** | Standard, well-supported, easy hiring |
| Admin Panel | **React + Tailwind** | Fast UI, same language as mobile |
| Auth | **Firebase Auth** | OTP login out-of-the-box |
| Payments | **Razorpay** | India-first, easy KYC |
| Push notifications | **Firebase Cloud Messaging** | Free, reliable |
| Live tracking | **Google Maps API + Firebase Realtime DB** | 10-sec location updates |
| Hosting | **Vercel + Render** (free tier to start) → AWS later | Zero cost early |
| Storage (food images) | **Cloudinary** free tier | 25GB free |

**Total monthly infra cost in early stage: ₹0 – ₹500.**

---

## 9. Why This Will Work

1. **Real unmet need** — validated through direct conversations with actual providers.
2. **No competition** — Zomato ignores this segment; dedicated tiffin apps are weak.
3. **Low burn** — providers handle delivery; we just build the platform.
4. **Network effect** — once 30+ providers in one area, customers come naturally.
5. **Multiple revenue streams** — not dependent on commission alone.
6. **Massive TAM** — 60M+ working professionals + students eat tiffin daily in India.

---

## 10. Team Roles

- **Dev 1** — Mobile app (React Native — customer + provider screens).
- **Dev 2** — Backend + Admin panel (Node.js APIs + React admin).
- **You (Founder)** — Product, design, provider onboarding, business strategy.

**Cadence:** Weekly sync. 3-month MVP timeline. Free for devs in exchange for portfolio + equity conversation when revenue starts. (You guide for free too.)

---

## 11. Anticipated Q&A

**Q: "How will we get providers?"**
You've already spoken to some — start with those. Door-to-door in one locality. Free for 6 months.

**Q: "How will we get customers?"**
Each provider already has 100–200 customers on WhatsApp. They'll bring them to the app for better experience (pause/skip features).

**Q: "What if it fails?"**
Worst case = portfolio project + real product experience + full-stack mobile skills. No financial risk — no money is being spent.

**Q: "Why should we work for free?"**
Equity discussion when revenue starts. A launched product > 10 finished tutorials. Founder guides for free as well.

---

## 12. The Pitch Hook

> We're not just building an app. We're building **3 connected apps + 3 admin panels** that together become the **operating system for the entire tiffin industry in India**.
>
> **Year 1:** organize providers.
> **Year 2:** solve delivery.
> **Year 3:** own the category.

Massive vision — but executed in **small, doable phases**.
