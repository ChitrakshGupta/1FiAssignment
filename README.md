# 1Fi Marketplace — Assignment Submission

A clean full-stack web application adding the **1Fi Marketplace** to the 1Fi app experience, featuring mutual fund-backed EMI plans, variant selection, and authentic 1Fi mobile UI design.

---

## 📁 Repository Structure

```
1Fi/
├── backend/                  # Node.js + Express + Prisma REST API
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema (Product, Variant, EmiPlan)
│   │   └── seed.ts           # Database seed script (4 products, 14 variants, 26 EMI plans)
│   ├── src/
│   │   ├── controllers/
│   │   │   └── productController.ts  # Clean business logic
│   │   ├── routes/
│   │   │   └── productRoutes.ts      # Express routes (/api/products)
│   │   ├── db.ts             # Prisma client singleton
│   │   └── server.ts         # Express app entry (Port 5001)
│   ├── .env.example
│   └── package.json
│
├── frontend/                 # Next.js 16 + React 19 + Tailwind CSS
│   ├── app/
│   │   ├── shop/page.tsx     # 3-Tab Shop Page (Top Brands, Nearby Stores, 1Fi Marketplace)
│   │   ├── products/[slug]/page.tsx  # Dynamic Product Detail Page
│   │   ├── layout.tsx        # Geist font & meta
│   │   └── globals.css       # Tailwind styles & 1Fi design tokens
│   ├── components/
│   │   ├── BottomNav.tsx     # Exact 1Fi floating pill navbar
│   │   ├── ShopBanner.tsx    # Purple gradient hero banner
│   │   ├── TabSwitcher.tsx   # 1Fi lavender switcher with active white tab
│   │   └── marketplace/
│   │       ├── ProductCard.tsx       # 2-column product card
│   │       ├── VariantSelector.tsx   # Color & storage selector
│   │       └── EmiPlansPanel.tsx     # Expandable mutual fund EMI plans
│   ├── public/images/products/       # High-resolution vector product assets
│   ├── .env.example
│   ├── next.config.ts        # Transparent /api proxy to backend
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- npm

### 1. Start Backend (Port 5001)

```bash
cd backend

# Install dependencies
npm install

# Setup database & seed data (SQLite for local zero-config dev)
npm run setup

# Start development server
npm run dev
```
Backend will be live at: **http://localhost:5001**  
Test API: **http://localhost:5001/api/products**

---

### 2. Start Frontend (Port 3000)

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start Next.js frontend
npm run dev
```
Frontend will be live at: **http://localhost:3000/shop**

---

## 🔌 API Endpoints & Example Responses

### `GET /api/products`
Retrieves all marketplace products with their default variant and lowest available EMI plan.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cmtqpkb5r00008g26w2hzf5d7",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "category": "smartphones",
      "brand": "Apple",
      "badgeText": "NEW",
      "defaultVariant": {
        "id": "cmtqpkb5t00018g261ymqtnqr",
        "name": "256GB · Natural Titanium",
        "storage": "256GB",
        "color": "Natural Titanium",
        "colorHex": "#E3D4BD",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "/images/products/iphone-17-pro-natural.svg"
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

---

### `GET /api/products/:id`
Retrieves full details for a product by its **slug** (e.g., `iphone-17-pro`) or ID, including all color/storage variants and available EMI plans.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cmtqpkb5r00008g26w2hzf5d7",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "category": "smartphones",
    "brand": "Apple",
    "description": "The ultimate iPhone with titanium design, A19 Pro chip, and a pro camera system.",
    "variants": [
      {
        "id": "v1",
        "name": "256GB · Natural Titanium",
        "storage": "256GB",
        "color": "Natural Titanium",
        "colorHex": "#E3D4BD",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "/images/products/iphone-17-pro-natural.svg",
        "isDefault": true
      },
      {
        "id": "v2",
        "name": "256GB · Black Titanium",
        "storage": "256GB",
        "color": "Black Titanium",
        "colorHex": "#2D2D2D",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "/images/products/iphone-17-pro-black.svg",
        "isDefault": false
      }
    ],
    "emiPlans": [
      {
        "id": "e1",
        "tenureMonths": 3,
        "interestRate": 0,
        "monthlyAmount": 44967,
        "cashbackAmount": 7500,
        "isNoCost": true
      },
      {
        "id": "e2",
        "tenureMonths": 6,
        "interestRate": 0,
        "monthlyAmount": 22483,
        "cashbackAmount": 7500,
        "isNoCost": true
      },
      {
        "id": "e3",
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

## 🗄️ Database Schema (`backend/prisma/schema.prisma`)

```prisma
model Product {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  category    String
  brand       String
  description String?
  badgeText   String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  variants Variant[]
  emiPlans EmiPlan[]
}

model Variant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  name      String
  storage   String?
  color     String?
  colorHex  String?
  mrp       Int
  price     Int
  imageUrl  String?
  isDefault Boolean @default(false)
}

model EmiPlan {
  id             String  @id @default(cuid())
  productId      String
  product        Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  tenureMonths   Int
  interestRate   Float
  monthlyAmount  Int
  cashbackAmount Int     @default(0)
  isNoCost       Boolean @default(false)
}
```

### Seed Data Summary
- **iPhone 17 Pro** (Apple) — 4 variants, 7 EMI plans (3–60 months matching exact reference image figures)
- **Samsung Galaxy S24 Ultra** (Samsung) — 4 variants, 7 EMI plans
- **MacBook Air M4** (Apple) — 4 variants, 7 EMI plans
- **Sony WH-1000XM5** (Sony) — 2 variants, 5 EMI plans

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Next.js 16 (App Router), Tailwind CSS v4 |
| **Backend** | Node.js, Express 4, TypeScript |
| **Database & ORM** | Neon PostgreSQL (cloud database), Prisma ORM |
| **Typography** | Geist Sans & Geist Mono (Vercel) |
| **Design Tokens** | 1Fi Brand Purple (`#712CDC`), Neutral Gray (`#F5F5F7`), Lavender (`#F5F1FD`) |

---

## ✨ Key Features Implemented

1. **3-Tab Shop Page (`/shop`)**:
   - **Top Brands**: UI list matching 1Fi partner cards (Air India, Apple Premium Reseller, CaratLane, etc.)
   - **Nearby Stores**: Store distance listing with location dropdown
   - **1Fi Marketplace**: 2-column dynamic product grid with live search filter

2. **Dynamic Product Detail Page (`/products/:slug`)**:
   - Dynamic variant picker for color swatches & storage pills
   - Expandable mutual fund-backed EMI plans table (0% to 10.5% p.a.)
   - Sticky full-width CTA button displaying selected monthly amount (`Continue at ₹X/mo →`)

3. **Floating Navbar**:
   - Floating card design with rounded corners (`rounded-[32px]`), top purple indicator bar, and active icon radial glow matching the 1Fi mobile application.
