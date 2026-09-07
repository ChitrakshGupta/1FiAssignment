import { Request, Response } from "express";
import { prisma } from "../db";

/**
 * GET /api/products
 * Fetch all products with default variant & lowest EMI plan
 * Optional query: ?category=smartphones
 */
export async function getProducts(req: Request, res: Response) {
  try {
    const { category } = req.query;
    const where = category ? { category: String(category) } : {};

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: {
          where: { isDefault: true },
          take: 1,
        },
        emiPlans: {
          orderBy: { monthlyAmount: "asc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = products.map((product) => {
      const defaultVariant = product.variants[0] || null;
      const lowestEmi = product.emiPlans[0] || null;

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        brand: product.brand,
        description: product.description,
        badgeText: product.badgeText,
        defaultVariant: defaultVariant
          ? {
              id: defaultVariant.id,
              name: defaultVariant.name,
              storage: defaultVariant.storage,
              color: defaultVariant.color,
              colorHex: defaultVariant.colorHex,
              mrp: defaultVariant.mrp,
              price: defaultVariant.price,
              imageUrl: defaultVariant.imageUrl,
            }
          : null,
        lowestEmi: lowestEmi
          ? {
              tenureMonths: lowestEmi.tenureMonths,
              monthlyAmount: lowestEmi.monthlyAmount,
              isNoCost: lowestEmi.isNoCost,
            }
          : null,
      };
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error("[getProducts error]:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
}

/**
 * GET /api/products/:id
 * Fetch product details by slug (e.g. iphone-17-pro) or cuid ID,
 * including all color/storage variants and available EMI plans.
 */
export async function getProductByIdOrSlug(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: id }, { id }],
      },
      include: {
        variants: {
          orderBy: [{ isDefault: "desc" }, { storage: "asc" }],
        },
        emiPlans: {
          orderBy: { tenureMonths: "asc" },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    console.error("[getProductByIdOrSlug error]:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch product details",
    });
  }
}
