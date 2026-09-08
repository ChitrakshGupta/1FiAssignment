import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// All image URLs verified directly from DummyJSON live API
// Pattern: https://cdn.dummyjson.com/product-images/{category}/{kebab-slug}/{n}.webp
// ─────────────────────────────────────────────────────────────────────────────
const CDN = "https://cdn.dummyjson.com/product-images";

async function main() {
  console.log("🌱 Seeding 1Fi Marketplace database…");

  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  console.log("🗑️  Cleared existing products");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 1: iPhone 13 Pro  (verified slug: iphone-13-pro)
  // ─────────────────────────────────────────────────────────────────────────
  const iphone13Pro = await prisma.product.create({
    data: {
      name: "iPhone 13 Pro",
      slug: "iphone-13-pro",
      category: "smartphones",
      brand: "Apple",
      description:
        "A17-class chip, ProMotion OLED, 12MP triple camera system with macro photography and Cinematic Mode.",
      badgeText: "BESTSELLER",
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: iphone13Pro.id, name: "128GB · Sierra Blue",    storage: "128GB", color: "Sierra Blue",    colorHex: "#A2B8CC", mrp: 119900, price: 109900, imageUrl: `${CDN}/smartphones/iphone-13-pro/1.webp`, isDefault: true  },
      { productId: iphone13Pro.id, name: "128GB · Graphite",       storage: "128GB", color: "Graphite",       colorHex: "#3C3C3C", mrp: 119900, price: 109900, imageUrl: `${CDN}/smartphones/iphone-13-pro/2.webp`, isDefault: false },
      { productId: iphone13Pro.id, name: "256GB · Sierra Blue",    storage: "256GB", color: "Sierra Blue",    colorHex: "#A2B8CC", mrp: 129900, price: 119900, imageUrl: `${CDN}/smartphones/iphone-13-pro/3.webp`, isDefault: false },
      { productId: iphone13Pro.id, name: "256GB · Alpine Green",   storage: "256GB", color: "Alpine Green",   colorHex: "#5A7760", mrp: 129900, price: 119900, imageUrl: `${CDN}/smartphones/iphone-13-pro/1.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: iphone13Pro.id, tenureMonths: 3,  interestRate: 0,    monthlyAmount: 36633, cashbackAmount: 3000, isNoCost: true  },
      { productId: iphone13Pro.id, tenureMonths: 6,  interestRate: 0,    monthlyAmount: 18317, cashbackAmount: 5000, isNoCost: true  },
      { productId: iphone13Pro.id, tenureMonths: 9,  interestRate: 0,    monthlyAmount: 12211, cashbackAmount: 0,    isNoCost: true  },
      { productId: iphone13Pro.id, tenureMonths: 12, interestRate: 0,    monthlyAmount: 9158,  cashbackAmount: 3000, isNoCost: true  },
      { productId: iphone13Pro.id, tenureMonths: 24, interestRate: 8.5,  monthlyAmount: 4990,  cashbackAmount: 0,    isNoCost: false },
      { productId: iphone13Pro.id, tenureMonths: 36, interestRate: 10.5, monthlyAmount: 3582,  cashbackAmount: 0,    isNoCost: false },
      { productId: iphone13Pro.id, tenureMonths: 60, interestRate: 12,   monthlyAmount: 2443,  cashbackAmount: 0,    isNoCost: false },
    ],
  });
  console.log("✅ iPhone 13 Pro");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 2: iPhone X  (verified slug: iphone-x)
  // ─────────────────────────────────────────────────────────────────────────
  const iphoneX = await prisma.product.create({
    data: {
      name: "iPhone X",
      slug: "iphone-x",
      category: "smartphones",
      brand: "Apple",
      description:
        "Super Retina OLED, Face ID, A11 Bionic chip, 12MP dual camera with Portrait mode and animoji.",
      badgeText: null,
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: iphoneX.id, name: "64GB · Space Grey", storage: "64GB",  color: "Space Grey", colorHex: "#3A3A3C", mrp: 79999, price: 72499, imageUrl: `${CDN}/smartphones/iphone-x/1.webp`, isDefault: true  },
      { productId: iphoneX.id, name: "64GB · Silver",     storage: "64GB",  color: "Silver",     colorHex: "#C8C8C8", mrp: 79999, price: 72499, imageUrl: `${CDN}/smartphones/iphone-x/2.webp`, isDefault: false },
      { productId: iphoneX.id, name: "256GB · Space Grey",storage: "256GB", color: "Space Grey", colorHex: "#3A3A3C", mrp: 89999, price: 81999, imageUrl: `${CDN}/smartphones/iphone-x/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: iphoneX.id, tenureMonths: 3,  interestRate: 0,    monthlyAmount: 24166, cashbackAmount: 1000, isNoCost: true  },
      { productId: iphoneX.id, tenureMonths: 6,  interestRate: 0,    monthlyAmount: 12083, cashbackAmount: 1500, isNoCost: true  },
      { productId: iphoneX.id, tenureMonths: 9,  interestRate: 0,    monthlyAmount: 8055,  cashbackAmount: 0,    isNoCost: true  },
      { productId: iphoneX.id, tenureMonths: 12, interestRate: 0,    monthlyAmount: 6041,  cashbackAmount: 1000, isNoCost: true  },
      { productId: iphoneX.id, tenureMonths: 24, interestRate: 8.5,  monthlyAmount: 3298,  cashbackAmount: 0,    isNoCost: false },
      { productId: iphoneX.id, tenureMonths: 36, interestRate: 10.5, monthlyAmount: 2367,  cashbackAmount: 0,    isNoCost: false },
    ],
  });
  console.log("✅ iPhone X");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 3: iPhone 6  (verified slug: iphone-6)
  // ─────────────────────────────────────────────────────────────────────────
  const iphone6 = await prisma.product.create({
    data: {
      name: "iPhone 6",
      slug: "iphone-6",
      category: "smartphones",
      brand: "Apple",
      description:
        "Elegant design with 4.7\" Retina display, Touch ID, 8MP iSight camera, and A8 chip.",
      badgeText: null,
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: iphone6.id, name: "64GB · Space Grey", storage: "64GB",  color: "Space Grey", colorHex: "#3A3A3C", mrp: 34999, price: 29999, imageUrl: `${CDN}/smartphones/iphone-6/1.webp`, isDefault: true  },
      { productId: iphone6.id, name: "64GB · Gold",       storage: "64GB",  color: "Gold",       colorHex: "#D4AF37", mrp: 34999, price: 29999, imageUrl: `${CDN}/smartphones/iphone-6/2.webp`, isDefault: false },
      { productId: iphone6.id, name: "128GB · Silver",    storage: "128GB", color: "Silver",     colorHex: "#C8C8C8", mrp: 39999, price: 34999, imageUrl: `${CDN}/smartphones/iphone-6/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: iphone6.id, tenureMonths: 3,  interestRate: 0,   monthlyAmount: 9999, cashbackAmount: 200, isNoCost: true  },
      { productId: iphone6.id, tenureMonths: 6,  interestRate: 0,   monthlyAmount: 4999, cashbackAmount: 300, isNoCost: true  },
      { productId: iphone6.id, tenureMonths: 9,  interestRate: 0,   monthlyAmount: 3333, cashbackAmount: 0,   isNoCost: true  },
      { productId: iphone6.id, tenureMonths: 12, interestRate: 0,   monthlyAmount: 2499, cashbackAmount: 200, isNoCost: true  },
      { productId: iphone6.id, tenureMonths: 24, interestRate: 8.5, monthlyAmount: 1368, cashbackAmount: 0,   isNoCost: false },
    ],
  });
  console.log("✅ iPhone 6");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 4: Oppo F19 Pro Plus  (verified slug: oppo-f19-pro-plus)
  // ─────────────────────────────────────────────────────────────────────────
  const oppoF19 = await prisma.product.create({
    data: {
      name: "Oppo F19 Pro+",
      slug: "oppo-f19-pro-plus",
      category: "smartphones",
      brand: "Oppo",
      description:
        "6.43\" Super AMOLED, 50MP quad camera, 65W SuperVOOC fast charge, Snapdragon 662.",
      badgeText: null,
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: oppoF19.id, name: "8GB+128GB · Fluid Black",  storage: "128GB", color: "Fluid Black",  colorHex: "#1A1A1A", mrp: 29999, price: 24999, imageUrl: `${CDN}/smartphones/oppo-f19-pro-plus/1.webp`, isDefault: true  },
      { productId: oppoF19.id, name: "8GB+128GB · Space Silver",  storage: "128GB", color: "Space Silver", colorHex: "#B8B8B8", mrp: 29999, price: 24999, imageUrl: `${CDN}/smartphones/oppo-f19-pro-plus/2.webp`, isDefault: false },
      { productId: oppoF19.id, name: "8GB+256GB · Fluid Black",  storage: "256GB", color: "Fluid Black",  colorHex: "#1A1A1A", mrp: 33999, price: 28999, imageUrl: `${CDN}/smartphones/oppo-f19-pro-plus/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: oppoF19.id, tenureMonths: 3,  interestRate: 0,   monthlyAmount: 8333, cashbackAmount: 300, isNoCost: true  },
      { productId: oppoF19.id, tenureMonths: 6,  interestRate: 0,   monthlyAmount: 4166, cashbackAmount: 500, isNoCost: true  },
      { productId: oppoF19.id, tenureMonths: 9,  interestRate: 0,   monthlyAmount: 2777, cashbackAmount: 0,   isNoCost: true  },
      { productId: oppoF19.id, tenureMonths: 12, interestRate: 0,   monthlyAmount: 2083, cashbackAmount: 300, isNoCost: true  },
      { productId: oppoF19.id, tenureMonths: 24, interestRate: 8.5, monthlyAmount: 1140, cashbackAmount: 0,   isNoCost: false },
    ],
  });
  console.log("✅ Oppo F19 Pro+");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 5: Realme X  (verified slug: realme-x)
  // ─────────────────────────────────────────────────────────────────────────
  const realmeX = await prisma.product.create({
    data: {
      name: "Realme X",
      slug: "realme-x",
      category: "smartphones",
      brand: "Realme",
      description:
        "6.53\" AMOLED, pop-up selfie camera, Snapdragon 710, 3765 mAh with VOOC 3.0 fast charging.",
      badgeText: null,
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: realmeX.id, name: "4GB+64GB · Polar White",  storage: "64GB",  color: "Polar White",  colorHex: "#F5F5F5", mrp: 19999, price: 17499, imageUrl: `${CDN}/smartphones/realme-x/1.webp`, isDefault: true  },
      { productId: realmeX.id, name: "4GB+64GB · Space Blue",   storage: "64GB",  color: "Space Blue",   colorHex: "#2B4E8C", mrp: 19999, price: 17499, imageUrl: `${CDN}/smartphones/realme-x/2.webp`, isDefault: false },
      { productId: realmeX.id, name: "8GB+128GB · Polar White", storage: "128GB", color: "Polar White",  colorHex: "#F5F5F5", mrp: 23999, price: 21499, imageUrl: `${CDN}/smartphones/realme-x/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: realmeX.id, tenureMonths: 3,  interestRate: 0,   monthlyAmount: 5833, cashbackAmount: 200, isNoCost: true  },
      { productId: realmeX.id, tenureMonths: 6,  interestRate: 0,   monthlyAmount: 2916, cashbackAmount: 300, isNoCost: true  },
      { productId: realmeX.id, tenureMonths: 9,  interestRate: 0,   monthlyAmount: 1944, cashbackAmount: 0,   isNoCost: true  },
      { productId: realmeX.id, tenureMonths: 12, interestRate: 0,   monthlyAmount: 1458, cashbackAmount: 200, isNoCost: true  },
      { productId: realmeX.id, tenureMonths: 24, interestRate: 8.5, monthlyAmount: 800,  cashbackAmount: 0,   isNoCost: false },
    ],
  });
  console.log("✅ Realme X");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 6: Oppo K1  (verified slug: oppo-k1)
  // ─────────────────────────────────────────────────────────────────────────
  const oppoK1 = await prisma.product.create({
    data: {
      name: "Oppo K1",
      slug: "oppo-k1",
      category: "smartphones",
      brand: "Oppo",
      description:
        "6.4\" AMOLED, in-display fingerprint sensor, 25MP selfie camera, Snapdragon 660.",
      badgeText: "POPULAR",
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: oppoK1.id, name: "4GB+64GB · Astral Blue",  storage: "64GB",  color: "Astral Blue",  colorHex: "#1D3A6E", mrp: 22999, price: 19999, imageUrl: `${CDN}/smartphones/oppo-k1/1.webp`, isDefault: true  },
      { productId: oppoK1.id, name: "4GB+64GB · Red",          storage: "64GB",  color: "Red",          colorHex: "#C0392B", mrp: 22999, price: 19999, imageUrl: `${CDN}/smartphones/oppo-k1/2.webp`, isDefault: false },
      { productId: oppoK1.id, name: "6GB+128GB · Astral Blue", storage: "128GB", color: "Astral Blue",  colorHex: "#1D3A6E", mrp: 25999, price: 22999, imageUrl: `${CDN}/smartphones/oppo-k1/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: oppoK1.id, tenureMonths: 3,  interestRate: 0,   monthlyAmount: 6666, cashbackAmount: 200, isNoCost: true  },
      { productId: oppoK1.id, tenureMonths: 6,  interestRate: 0,   monthlyAmount: 3333, cashbackAmount: 300, isNoCost: true  },
      { productId: oppoK1.id, tenureMonths: 9,  interestRate: 0,   monthlyAmount: 2222, cashbackAmount: 0,   isNoCost: true  },
      { productId: oppoK1.id, tenureMonths: 12, interestRate: 0,   monthlyAmount: 1666, cashbackAmount: 200, isNoCost: true  },
      { productId: oppoK1.id, tenureMonths: 24, interestRate: 8.5, monthlyAmount: 913,  cashbackAmount: 0,   isNoCost: false },
    ],
  });
  console.log("✅ Oppo K1");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 7: Apple MacBook Pro 14-inch  (verified slug: apple-macbook-pro-14-inch-space-grey)
  // ─────────────────────────────────────────────────────────────────────────
  const macbookPro = await prisma.product.create({
    data: {
      name: "MacBook Pro 14-inch",
      slug: "macbook-pro-14",
      category: "laptops",
      brand: "Apple",
      description:
        "Apple M1 Pro chip, Liquid Retina XDR display, up to 17 hours battery. Pro performance for pro users.",
      badgeText: "NEW",
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: macbookPro.id, name: "M1 Pro · 16GB · 512GB · Space Grey", storage: "512GB", color: "Space Grey", colorHex: "#58585A", mrp: 219900, price: 199900, imageUrl: `${CDN}/laptops/apple-macbook-pro-14-inch-space-grey/1.webp`, isDefault: true  },
      { productId: macbookPro.id, name: "M1 Pro · 32GB · 1TB · Space Grey",   storage: "1TB",   color: "Space Grey", colorHex: "#58585A", mrp: 259900, price: 239900, imageUrl: `${CDN}/laptops/apple-macbook-pro-14-inch-space-grey/2.webp`, isDefault: false },
      { productId: macbookPro.id, name: "M1 Max · 64GB · 1TB · Space Grey",   storage: "1TB",   color: "Space Grey", colorHex: "#58585A", mrp: 329900, price: 309900, imageUrl: `${CDN}/laptops/apple-macbook-pro-14-inch-space-grey/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: macbookPro.id, tenureMonths: 3,  interestRate: 0,    monthlyAmount: 66633, cashbackAmount: 5000, isNoCost: true  },
      { productId: macbookPro.id, tenureMonths: 6,  interestRate: 0,    monthlyAmount: 33317, cashbackAmount: 5000, isNoCost: true  },
      { productId: macbookPro.id, tenureMonths: 12, interestRate: 0,    monthlyAmount: 16658, cashbackAmount: 8000, isNoCost: true  },
      { productId: macbookPro.id, tenureMonths: 24, interestRate: 8.5,  monthlyAmount: 9055,  cashbackAmount: 0,    isNoCost: false },
      { productId: macbookPro.id, tenureMonths: 36, interestRate: 10.5, monthlyAmount: 6500,  cashbackAmount: 0,    isNoCost: false },
      { productId: macbookPro.id, tenureMonths: 48, interestRate: 11.5, monthlyAmount: 5244,  cashbackAmount: 0,    isNoCost: false },
      { productId: macbookPro.id, tenureMonths: 60, interestRate: 12,   monthlyAmount: 4445,  cashbackAmount: 0,    isNoCost: false },
    ],
  });
  console.log("✅ MacBook Pro 14-inch");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 8: Asus Zenbook Pro Dual Screen  (verified slug: asus-zenbook-pro-dual-screen-laptop)
  // ─────────────────────────────────────────────────────────────────────────
  const asusZenbook = await prisma.product.create({
    data: {
      name: "Asus Zenbook Pro Dual Screen",
      slug: "asus-zenbook-pro-dual-screen",
      category: "laptops",
      brand: "ASUS",
      description:
        "15.6\" OLED + 5.65\" ScreenPad+, Intel Core i9, RTX 3080, 32GB RAM. The dual-screen creative powerhouse.",
      badgeText: "GAMING",
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: asusZenbook.id, name: "i9 · 32GB · 1TB · Mineral Grey",  storage: "1TB", color: "Mineral Grey",  colorHex: "#2B2B2B", mrp: 219990, price: 189990, imageUrl: `${CDN}/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp`, isDefault: true  },
      { productId: asusZenbook.id, name: "i9 · 32GB · 2TB · Mineral Grey",  storage: "2TB", color: "Mineral Grey",  colorHex: "#2B2B2B", mrp: 249990, price: 219990, imageUrl: `${CDN}/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp`, isDefault: false },
      { productId: asusZenbook.id, name: "i9 · 64GB · 2TB · Ceramic White", storage: "2TB", color: "Ceramic White", colorHex: "#E8E8E8", mrp: 279990, price: 259990, imageUrl: `${CDN}/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: asusZenbook.id, tenureMonths: 3,  interestRate: 0,    monthlyAmount: 63330, cashbackAmount: 4000, isNoCost: true  },
      { productId: asusZenbook.id, tenureMonths: 6,  interestRate: 0,    monthlyAmount: 31665, cashbackAmount: 4000, isNoCost: true  },
      { productId: asusZenbook.id, tenureMonths: 12, interestRate: 0,    monthlyAmount: 15832, cashbackAmount: 6000, isNoCost: true  },
      { productId: asusZenbook.id, tenureMonths: 24, interestRate: 8.5,  monthlyAmount: 8645,  cashbackAmount: 0,    isNoCost: false },
      { productId: asusZenbook.id, tenureMonths: 36, interestRate: 10.5, monthlyAmount: 6203,  cashbackAmount: 0,    isNoCost: false },
      { productId: asusZenbook.id, tenureMonths: 48, interestRate: 11.5, monthlyAmount: 5002,  cashbackAmount: 0,    isNoCost: false },
      { productId: asusZenbook.id, tenureMonths: 60, interestRate: 12,   monthlyAmount: 4227,  cashbackAmount: 0,    isNoCost: false },
    ],
  });
  console.log("✅ Asus Zenbook Pro Dual Screen");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 9: Huawei Matebook X Pro  (verified slug: huawei-matebook-x-pro)
  // ─────────────────────────────────────────────────────────────────────────
  const huaweiMatebook = await prisma.product.create({
    data: {
      name: "Huawei Matebook X Pro",
      slug: "huawei-matebook-x-pro",
      category: "laptops",
      brand: "Huawei",
      description:
        "13.9\" 3K touchscreen, ultra-slim 14.6mm body, Intel Core i7, NVIDIA MX250, 56Wh battery.",
      badgeText: "PREMIUM",
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: huaweiMatebook.id, name: "i7 · 16GB · 1TB · Mystic Silver",  storage: "1TB", color: "Mystic Silver", colorHex: "#B8C0C8", mrp: 149990, price: 129990, imageUrl: `${CDN}/laptops/huawei-matebook-x-pro/1.webp`, isDefault: true  },
      { productId: huaweiMatebook.id, name: "i7 · 16GB · 1TB · Space Grey",     storage: "1TB", color: "Space Grey",    colorHex: "#58585A", mrp: 149990, price: 129990, imageUrl: `${CDN}/laptops/huawei-matebook-x-pro/2.webp`, isDefault: false },
      { productId: huaweiMatebook.id, name: "i7 · 16GB · 2TB · Mystic Silver",  storage: "2TB", color: "Mystic Silver", colorHex: "#B8C0C8", mrp: 179990, price: 159990, imageUrl: `${CDN}/laptops/huawei-matebook-x-pro/3.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: huaweiMatebook.id, tenureMonths: 3,  interestRate: 0,    monthlyAmount: 43330, cashbackAmount: 3000, isNoCost: true  },
      { productId: huaweiMatebook.id, tenureMonths: 6,  interestRate: 0,    monthlyAmount: 21665, cashbackAmount: 3000, isNoCost: true  },
      { productId: huaweiMatebook.id, tenureMonths: 12, interestRate: 0,    monthlyAmount: 10832, cashbackAmount: 5000, isNoCost: true  },
      { productId: huaweiMatebook.id, tenureMonths: 24, interestRate: 8.5,  monthlyAmount: 5912,  cashbackAmount: 0,    isNoCost: false },
      { productId: huaweiMatebook.id, tenureMonths: 36, interestRate: 10.5, monthlyAmount: 4243,  cashbackAmount: 0,    isNoCost: false },
      { productId: huaweiMatebook.id, tenureMonths: 48, interestRate: 11.5, monthlyAmount: 3422,  cashbackAmount: 0,    isNoCost: false },
      { productId: huaweiMatebook.id, tenureMonths: 60, interestRate: 12,   monthlyAmount: 2895,  cashbackAmount: 0,    isNoCost: false },
    ],
  });
  console.log("✅ Huawei Matebook X Pro");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 10: Apple AirPods  (verified slug: apple-airpods)
  // ─────────────────────────────────────────────────────────────────────────
  const airpods = await prisma.product.create({
    data: {
      name: "Apple AirPods",
      slug: "apple-airpods",
      category: "audio",
      brand: "Apple",
      description:
        "H1 chip, automatic ear detection, up to 24 hours with case, Siri integration, instant pairing.",
      badgeText: null,
    },
  });
  await prisma.variant.createMany({
    data: [
      { productId: airpods.id, name: "Lightning Charging Case",  color: "White · Lightning", colorHex: "#F0F0F0", mrp: 14900, price: 12900, imageUrl: `${CDN}/mobile-accessories/apple-airpods/1.webp`, isDefault: true  },
      { productId: airpods.id, name: "MagSafe Charging Case",    color: "White · MagSafe",   colorHex: "#FFFFFF", mrp: 16900, price: 14900, imageUrl: `${CDN}/mobile-accessories/apple-airpods/2.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: airpods.id, tenureMonths: 3,  interestRate: 0,   monthlyAmount: 4300, cashbackAmount: 200, isNoCost: true  },
      { productId: airpods.id, tenureMonths: 6,  interestRate: 0,   monthlyAmount: 2150, cashbackAmount: 300, isNoCost: true  },
      { productId: airpods.id, tenureMonths: 9,  interestRate: 0,   monthlyAmount: 1433, cashbackAmount: 0,   isNoCost: true  },
      { productId: airpods.id, tenureMonths: 12, interestRate: 0,   monthlyAmount: 1075, cashbackAmount: 200, isNoCost: true  },
    ],
  });
  console.log("✅ Apple AirPods");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 11: Apple AirPods Max Silver  (verified slug: apple-airpods-max-silver)
  // ─────────────────────────────────────────────────────────────────────────
  const airpodsMax = await prisma.product.create({
    data: {
      name: "Apple AirPods Max",
      slug: "apple-airpods-max",
      category: "audio",
      brand: "Apple",
      description:
        "Over-ear headphones with H1 chip, Active Noise Cancellation, Transparency mode, Spatial Audio, 20-hour battery.",
      badgeText: "PREMIUM",
    },
  });
  await prisma.variant.createMany({
    data: [
      // Only /1.webp is available for airpods-max-silver; use it for all colors
      { productId: airpodsMax.id, name: "Silver",     color: "Silver",     colorHex: "#C8C8C8", mrp: 59900, price: 54900, imageUrl: `${CDN}/mobile-accessories/apple-airpods-max-silver/1.webp`, isDefault: true  },
      { productId: airpodsMax.id, name: "Space Grey", color: "Space Grey", colorHex: "#3A3A3C", mrp: 59900, price: 54900, imageUrl: `${CDN}/mobile-accessories/apple-airpods-max-silver/1.webp`, isDefault: false },
      { productId: airpodsMax.id, name: "Sky Blue",   color: "Sky Blue",   colorHex: "#4A90D9", mrp: 59900, price: 54900, imageUrl: `${CDN}/mobile-accessories/apple-airpods-max-silver/1.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: airpodsMax.id, tenureMonths: 3,  interestRate: 0,    monthlyAmount: 18300, cashbackAmount: 500,  isNoCost: true  },
      { productId: airpodsMax.id, tenureMonths: 6,  interestRate: 0,    monthlyAmount: 9150,  cashbackAmount: 1000, isNoCost: true  },
      { productId: airpodsMax.id, tenureMonths: 9,  interestRate: 0,    monthlyAmount: 6100,  cashbackAmount: 0,    isNoCost: true  },
      { productId: airpodsMax.id, tenureMonths: 12, interestRate: 0,    monthlyAmount: 4575,  cashbackAmount: 500,  isNoCost: true  },
      { productId: airpodsMax.id, tenureMonths: 24, interestRate: 8.5,  monthlyAmount: 2497,  cashbackAmount: 0,    isNoCost: false },
      { productId: airpodsMax.id, tenureMonths: 36, interestRate: 10.5, monthlyAmount: 1792,  cashbackAmount: 0,    isNoCost: false },
    ],
  });
  console.log("✅ Apple AirPods Max");

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCT 12: Beats Flex Wireless Earphones  (verified slug: beats-flex-wireless-earphones)
  // ─────────────────────────────────────────────────────────────────────────
  const beatsFlex = await prisma.product.create({
    data: {
      name: "Beats Flex Wireless",
      slug: "beats-flex-wireless",
      category: "audio",
      brand: "Beats",
      description:
        "Auto-play/pause magnetic earbuds, 12-hour battery, Apple W1 chip, Lightning cable charging.",
      badgeText: null,
    },
  });
  await prisma.variant.createMany({
    data: [
      // Only /1.webp is available for beats-flex; use it for both color variants
      { productId: beatsFlex.id, name: "Beats Black", color: "Beats Black", colorHex: "#1C1C1C", mrp: 9999, price: 7999, imageUrl: `${CDN}/mobile-accessories/beats-flex-wireless-earphones/1.webp`, isDefault: true  },
      { productId: beatsFlex.id, name: "Flame Blue",  color: "Flame Blue",  colorHex: "#1E3A8A", mrp: 9999, price: 7999, imageUrl: `${CDN}/mobile-accessories/beats-flex-wireless-earphones/1.webp`, isDefault: false },
    ],
  });
  await prisma.emiPlan.createMany({
    data: [
      { productId: beatsFlex.id, tenureMonths: 3,  interestRate: 0,   monthlyAmount: 2666, cashbackAmount: 100, isNoCost: true  },
      { productId: beatsFlex.id, tenureMonths: 6,  interestRate: 0,   monthlyAmount: 1333, cashbackAmount: 200, isNoCost: true  },
      { productId: beatsFlex.id, tenureMonths: 9,  interestRate: 0,   monthlyAmount: 888,  cashbackAmount: 0,   isNoCost: true  },
    ],
  });
  console.log("✅ Beats Flex Wireless");

  console.log("\n🎉 Seeded 12 products successfully!");
  console.log("   • 6 Smartphones (iPhone 13 Pro, iPhone X, iPhone 6, Oppo F19 Pro+, Realme X, Oppo K1)");
  console.log("   • 3 Laptops (MacBook Pro 14, Asus Zenbook Pro, Huawei Matebook X Pro)");
  console.log("   • 3 Audio (Apple AirPods, AirPods Max, Beats Flex)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
