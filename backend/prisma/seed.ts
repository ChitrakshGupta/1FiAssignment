import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding 1Fi Marketplace database...");

  // Clean up existing data
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // ─────────────────────────────────────────────────────
  // PRODUCT 1: iPhone 17 Pro
  // ─────────────────────────────────────────────────────
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 17 Pro",
      slug: "iphone-17-pro",
      category: "smartphones",
      brand: "Apple",
      description:
        "The ultimate iPhone with titanium design, A19 Pro chip, and a pro camera system with 5x Tetraprism zoom.",
      badgeText: "NEW",
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: iphone.id,
        name: "256GB · Natural Titanium",
        storage: "256GB",
        color: "Natural Titanium",
        colorHex: "#E3D4BD",
        mrp: 134900,
        price: 127400,
        imageUrl: "/images/products/iphone-17-pro-natural.svg",
        isDefault: true,
      },
      {
        productId: iphone.id,
        name: "256GB · Black Titanium",
        storage: "256GB",
        color: "Black Titanium",
        colorHex: "#2D2D2D",
        mrp: 134900,
        price: 127400,
        imageUrl: "/images/products/iphone-17-pro-black.svg",
        isDefault: false,
      },
      {
        productId: iphone.id,
        name: "256GB · Desert Titanium",
        storage: "256GB",
        color: "Desert Titanium",
        colorHex: "#B08D6D",
        mrp: 134900,
        price: 127400,
        imageUrl: "/images/products/iphone-17-pro-desert.svg",
        isDefault: false,
      },
      {
        productId: iphone.id,
        name: "512GB · Natural Titanium",
        storage: "512GB",
        color: "Natural Titanium",
        colorHex: "#E3D4BD",
        mrp: 154900,
        price: 144900,
        imageUrl: "/images/products/iphone-17-pro-natural.svg",
        isDefault: false,
      },
    ],
  });

  // EMI Plans for iPhone 17 Pro (based on reference image ₹1,27,400)
  await prisma.emiPlan.createMany({
    data: [
      {
        productId: iphone.id,
        tenureMonths: 3,
        interestRate: 0,
        monthlyAmount: 44967,
        cashbackAmount: 7500,
        isNoCost: true,
      },
      {
        productId: iphone.id,
        tenureMonths: 6,
        interestRate: 0,
        monthlyAmount: 22483,
        cashbackAmount: 7500,
        isNoCost: true,
      },
      {
        productId: iphone.id,
        tenureMonths: 12,
        interestRate: 0,
        monthlyAmount: 11242,
        cashbackAmount: 7500,
        isNoCost: true,
      },
      {
        productId: iphone.id,
        tenureMonths: 24,
        interestRate: 0,
        monthlyAmount: 5621,
        cashbackAmount: 7500,
        isNoCost: true,
      },
      {
        productId: iphone.id,
        tenureMonths: 36,
        interestRate: 10.5,
        monthlyAmount: 4297,
        cashbackAmount: 7500,
        isNoCost: false,
      },
      {
        productId: iphone.id,
        tenureMonths: 48,
        interestRate: 10.5,
        monthlyAmount: 3385,
        cashbackAmount: 7500,
        isNoCost: false,
      },
      {
        productId: iphone.id,
        tenureMonths: 60,
        interestRate: 10.5,
        monthlyAmount: 2842,
        cashbackAmount: 7500,
        isNoCost: false,
      },
    ],
  });

  // ─────────────────────────────────────────────────────
  // PRODUCT 2: Samsung Galaxy S24 Ultra
  // ─────────────────────────────────────────────────────
  const samsung = await prisma.product.create({
    data: {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra",
      category: "smartphones",
      brand: "Samsung",
      description:
        "Galaxy AI is here. The S24 Ultra with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3.",
      badgeText: "BESTSELLER",
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: samsung.id,
        name: "256GB · Titanium Black",
        storage: "256GB",
        color: "Titanium Black",
        colorHex: "#2B2B2B",
        mrp: 129999,
        price: 119999,
        imageUrl: "/images/products/samsung-s24-black.svg",
        isDefault: true,
      },
      {
        productId: samsung.id,
        name: "256GB · Titanium Gray",
        storage: "256GB",
        color: "Titanium Gray",
        colorHex: "#8E8E8E",
        mrp: 129999,
        price: 119999,
        imageUrl: "/images/products/samsung-s24-gray.svg",
        isDefault: false,
      },
      {
        productId: samsung.id,
        name: "512GB · Titanium Black",
        storage: "512GB",
        color: "Titanium Black",
        colorHex: "#2B2B2B",
        mrp: 149999,
        price: 137999,
        imageUrl: "/images/products/samsung-s24-black.svg",
        isDefault: false,
      },
      {
        productId: samsung.id,
        name: "512GB · Titanium Violet",
        storage: "512GB",
        color: "Titanium Violet",
        colorHex: "#7B6B8F",
        mrp: 149999,
        price: 137999,
        imageUrl: "/images/products/samsung-s24-violet.svg",
        isDefault: false,
      },
    ],
  });

  await prisma.emiPlan.createMany({
    data: [
      {
        productId: samsung.id,
        tenureMonths: 3,
        interestRate: 0,
        monthlyAmount: 40000,
        cashbackAmount: 5000,
        isNoCost: true,
      },
      {
        productId: samsung.id,
        tenureMonths: 6,
        interestRate: 0,
        monthlyAmount: 20000,
        cashbackAmount: 5000,
        isNoCost: true,
      },
      {
        productId: samsung.id,
        tenureMonths: 12,
        interestRate: 0,
        monthlyAmount: 10000,
        cashbackAmount: 5000,
        isNoCost: true,
      },
      {
        productId: samsung.id,
        tenureMonths: 24,
        interestRate: 0,
        monthlyAmount: 5000,
        cashbackAmount: 5000,
        isNoCost: true,
      },
      {
        productId: samsung.id,
        tenureMonths: 36,
        interestRate: 10.5,
        monthlyAmount: 3884,
        cashbackAmount: 5000,
        isNoCost: false,
      },
      {
        productId: samsung.id,
        tenureMonths: 48,
        interestRate: 10.5,
        monthlyAmount: 3060,
        cashbackAmount: 5000,
        isNoCost: false,
      },
      {
        productId: samsung.id,
        tenureMonths: 60,
        interestRate: 10.5,
        monthlyAmount: 2569,
        cashbackAmount: 5000,
        isNoCost: false,
      },
    ],
  });

  // ─────────────────────────────────────────────────────
  // PRODUCT 3: MacBook Air M4
  // ─────────────────────────────────────────────────────
  const macbook = await prisma.product.create({
    data: {
      name: "MacBook Air M4",
      slug: "macbook-air-m4",
      category: "laptops",
      brand: "Apple",
      description:
        "Supercharged by M4. Up to 38-hour battery life, thin 11.5mm design, and Apple Intelligence built in.",
      badgeText: "NEW",
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: macbook.id,
        name: "16GB · 256GB · Midnight",
        storage: "256GB",
        color: "Midnight",
        colorHex: "#1D2433",
        mrp: 109900,
        price: 99900,
        imageUrl: "/images/products/macbook-air-midnight.svg",
        isDefault: true,
      },
      {
        productId: macbook.id,
        name: "16GB · 256GB · Starlight",
        storage: "256GB",
        color: "Starlight",
        colorHex: "#E3DDD8",
        mrp: 109900,
        price: 99900,
        imageUrl: "/images/products/macbook-air-starlight.svg",
        isDefault: false,
      },
      {
        productId: macbook.id,
        name: "16GB · 256GB · Silver",
        storage: "256GB",
        color: "Silver",
        colorHex: "#D4D4D2",
        mrp: 109900,
        price: 99900,
        imageUrl: "/images/products/macbook-air-silver.svg",
        isDefault: false,
      },
      {
        productId: macbook.id,
        name: "16GB · 512GB · Midnight",
        storage: "512GB",
        color: "Midnight",
        colorHex: "#1D2433",
        mrp: 129900,
        price: 119900,
        imageUrl: "/images/products/macbook-air-midnight.svg",
        isDefault: false,
      },
    ],
  });

  await prisma.emiPlan.createMany({
    data: [
      {
        productId: macbook.id,
        tenureMonths: 3,
        interestRate: 0,
        monthlyAmount: 33300,
        cashbackAmount: 3000,
        isNoCost: true,
      },
      {
        productId: macbook.id,
        tenureMonths: 6,
        interestRate: 0,
        monthlyAmount: 16650,
        cashbackAmount: 3000,
        isNoCost: true,
      },
      {
        productId: macbook.id,
        tenureMonths: 12,
        interestRate: 0,
        monthlyAmount: 8325,
        cashbackAmount: 3000,
        isNoCost: true,
      },
      {
        productId: macbook.id,
        tenureMonths: 24,
        interestRate: 0,
        monthlyAmount: 4163,
        cashbackAmount: 3000,
        isNoCost: true,
      },
      {
        productId: macbook.id,
        tenureMonths: 36,
        interestRate: 10.5,
        monthlyAmount: 3238,
        cashbackAmount: 3000,
        isNoCost: false,
      },
      {
        productId: macbook.id,
        tenureMonths: 48,
        interestRate: 10.5,
        monthlyAmount: 2551,
        cashbackAmount: 3000,
        isNoCost: false,
      },
      {
        productId: macbook.id,
        tenureMonths: 60,
        interestRate: 10.5,
        monthlyAmount: 2142,
        cashbackAmount: 3000,
        isNoCost: false,
      },
    ],
  });

  // ─────────────────────────────────────────────────────
  // PRODUCT 4: Sony WH-1000XM5
  // ─────────────────────────────────────────────────────
  const sony = await prisma.product.create({
    data: {
      name: "Sony WH-1000XM5",
      slug: "sony-wh-1000xm5",
      category: "audio",
      brand: "Sony",
      description:
        "Industry-leading noise cancellation with 8 microphones, 30hr battery, and crystal clear hands-free calling.",
      badgeText: "TOP RATED",
    },
  });

  await prisma.variant.createMany({
    data: [
      {
        productId: sony.id,
        name: "Black",
        storage: null,
        color: "Black",
        colorHex: "#1A1A1A",
        mrp: 34990,
        price: 26990,
        imageUrl: "/images/products/sony-wh1000xm5-black.svg",
        isDefault: true,
      },
      {
        productId: sony.id,
        name: "Platinum Silver",
        storage: null,
        color: "Platinum Silver",
        colorHex: "#C8C8C8",
        mrp: 34990,
        price: 26990,
        imageUrl: "/images/products/sony-wh1000xm5-silver.svg",
        isDefault: false,
      },
    ],
  });

  await prisma.emiPlan.createMany({
    data: [
      {
        productId: sony.id,
        tenureMonths: 3,
        interestRate: 0,
        monthlyAmount: 8997,
        cashbackAmount: 1000,
        isNoCost: true,
      },
      {
        productId: sony.id,
        tenureMonths: 6,
        interestRate: 0,
        monthlyAmount: 4498,
        cashbackAmount: 1000,
        isNoCost: true,
      },
      {
        productId: sony.id,
        tenureMonths: 12,
        interestRate: 0,
        monthlyAmount: 2249,
        cashbackAmount: 1000,
        isNoCost: true,
      },
      {
        productId: sony.id,
        tenureMonths: 24,
        interestRate: 7.49,
        monthlyAmount: 1210,
        cashbackAmount: 0,
        isNoCost: false,
      },
      {
        productId: sony.id,
        tenureMonths: 36,
        interestRate: 7.49,
        monthlyAmount: 840,
        cashbackAmount: 0,
        isNoCost: false,
      },
    ],
  });

  console.log("✅ Seeded successfully!");
  console.log(
    `   • ${await prisma.product.count()} products`
  );
  console.log(
    `   • ${await prisma.variant.count()} variants`
  );
  console.log(
    `   • ${await prisma.emiPlan.count()} EMI plans`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
