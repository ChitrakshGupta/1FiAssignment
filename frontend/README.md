# 1Fi Marketplace

A full-stack e-commerce marketplace powered by mutual fund-backed EMIs, built as part of the **1Fi SDE Intern Assignment**.

## Overview

The 1Fi Marketplace adds a **"1Fi Marketplace"** tab to the existing Shop page of the 1Fi app, allowing users to browse and purchase products using no-cost EMI plans backed by their mutual fund investments.

### Features

- 🏪 **3-tab Shop page** — Top Brands | Nearby Stores | 1Fi Marketplace
- 📱 **Mobile-first design** — matches the 1Fi app's design system exactly
- 🛒 **Product listing** — 2-column grid with product images, price, and EMI teaser
- 📦 **Product detail page** — variant selection (color/storage) + full EMI plan table
- 💳 **EMI plans panel** — expandable, selectable EMI options (0% to 10.5% p.a.)
- ✅ **Sticky CTA** — "Continue at ₹X/mo →" matching 1Fi app button style
- 🔌 **REST APIs** — `/api/products` and `/api/products/:id`

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS v4 |
| **Font** | Geist (same as 1Fi app) |
| **ORM** | Prisma v5 |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **Language** | TypeScript |
| **Deployment** | Vercel |

---

## Project Structure

```
marketplace/
├── app/
│   ├── layout.tsx              # Root layout with Geist font
│   ├── page.tsx                # Redirect to /shop
│   ├── globals.css             # Global styles + 1Fi color tokens
│   ├── shop/
│   │   └── page.tsx            # Shop page — 3 tabs
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail page (/products/:slug)
│   ├── marketplace/
│   │   └── [slug]/
│   │       └── page.tsx        # Alias to /products/:slug
│   ├── dashboard/page.tsx      # Home (stub)
│   ├── emi-dues/page.tsx       # EMI Dues (stub)
│   ├── limit/page.tsx          # Limit (stub)
│   ├── profile/page.tsx        # Profile (stub)
│   └── api/
│       └── products/
│           ├── route.ts        # GET /api/products
│           └── [id]/
│               └── route.ts    # GET /api/products/:id
├── components/
│   ├── BottomNav.tsx           # 5-tab bottom navigation
│   ├── ShopBanner.tsx          # Purple hero banner
│   ├── TabSwitcher.tsx         # 3-tab pill switcher
│   └── marketplace/
│       ├── ProductCard.tsx     # Product grid card
│       ├── VariantSelector.tsx # Color/storage variant picker
│       └── EmiPlansPanel.tsx   # Expandable EMI plans table
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   └── formatters.ts           # Indian currency formatting
└── prisma/
    ├── schema.prisma           # Product, Variant, EmiPlan models
    └── seed.ts                 # 4 products with variants and EMI plans
```

---

## API Documentation

### `GET /api/products`

Returns all products with their default variant and lowest EMI plan.

**Query Parameters:**
- `?category=smartphones` — filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "category": "smartphones",
      "brand": "Apple",
      "badgeText": "NEW",
      "defaultVariant": {
        "mrp": 134900,
        "price": 127400,
        "color": "Natural Titanium",
        "colorHex": "#E3D4BD",
        "imageUrl": "..."
      },
      "lowestEmi": {
        "tenureMonths": 60,
        "monthlyAmount": 2842,
        "isNoCost": false
      }
    }
  ]
}
```

### `GET /api/products/:id`

Returns full product details with all variants and all EMI plans. Supports lookup by **slug** or **cuid**.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "variants": [
      {
        "id": "...",
        "name": "256GB · Natural Titanium",
        "storage": "256GB",
        "color": "Natural Titanium",
        "colorHex": "#E3D4BD",
        "mrp": 134900,
        "price": 127400,
        "isDefault": true
      }
    ],
    "emiPlans": [
      {
        "id": "...",
        "tenureMonths": 3,
        "interestRate": 0,
        "monthlyAmount": 44967,
        "cashbackAmount": 7500,
        "isNoCost": true
      },
      {
        "tenureMonths": 60,
        "interestRate": 10.5,
        "monthlyAmount": 2842,
        "cashbackAmount": 7500,
        "isNoCost": false
      }
    ]
  }
}
```

---

## Database Schema

```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  category    String    // "smartphones", "laptops", "audio"
  brand       String
  description String?
  badgeText   String?   // "NEW", "BESTSELLER", "TOP RATED"
  variants    Variant[]
  emiPlans    EmiPlan[]
}

model Variant {
  id        String  @id @default(cuid())
  productId String
  name      String  // "256GB · Natural Titanium"
  storage   String? // "256GB"
  color     String? // "Natural Titanium"
  colorHex  String? // "#E3D4BD"
  mrp       Int     // MRP in rupees
  price     Int     // Sale price in rupees
  imageUrl  String?
  isDefault Boolean @default(false)
}

model EmiPlan {
  id             String  @id @default(cuid())
  productId      String
  tenureMonths   Int
  interestRate   Float   // annual % (0.0 = no-cost)
  monthlyAmount  Int     // EMI amount in rupees
  cashbackAmount Int     @default(0)
  isNoCost       Boolean @default(false)
}
```

---

## Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone and install
git clone <repo-url>
cd marketplace
npm install

# Set up database (SQLite for local)
echo 'DATABASE_URL="file:./dev.db"' > .env

# Push schema + seed data
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production (PostgreSQL)

Change `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/marketplace"
```

Then run migrations:
```bash
npx prisma migrate deploy
npm run db:seed
```

---

## Seed Data

| Product | Brand | Variants | EMI Plans |
|---|---|---|---|
| iPhone 17 Pro | Apple | 4 (256GB/512GB × 3 colors) | 7 (3–60 months) |
| Samsung Galaxy S24 Ultra | Samsung | 4 (256GB/512GB × 2 colors) | 7 (3–60 months) |
| MacBook Air M4 | Apple | 4 (256GB/512GB × 3 colors) | 7 (3–60 months) |
| Sony WH-1000XM5 | Sony | 2 (Black, Silver) | 5 (3–36 months) |

EMI interest rates:
- 0–24 months: **0% p.a.** (No-cost EMI)
- 36–60 months: **10.5% p.a.** (with ₹7,500 cashback)

---

## Design System

This project replicates the 1Fi app's design language exactly:

| Token | Value |
|---|---|
| Primary purple | `#712CDC` |
| Purple dark | `#5c22a5` |
| Background | `#F5F5F7` |
| Card | white, `rounded-2xl`, `shadow-card` |
| Font | Geist (Vercel) |
| CTA | `bg-[#712CDC]`, `rounded-full`, full-width |
| Tab switcher | Pill-style, active = white bg + purple underline |
| EMI row format | `N months · X% p.a.` → `₹X,XXX /mo` |
