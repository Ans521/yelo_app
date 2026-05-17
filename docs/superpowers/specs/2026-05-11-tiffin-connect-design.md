# 🍱 Tiffin Connect — Project Design Document

**Date:** 2026-05-11
**Status:** Brainstorm / Pitch Document
**Audience:** Founding team + 2 collaborating developers

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

### Later Phases:  Pending


##
---

1. **Network effect** — once 30+ providers in one area, customers come naturally.
2. **Massive TAM** — 60M+ working professionals + students eat tiffin daily.
