import { Router } from "express";
import {
  getProducts,
  getProductByIdOrSlug,
} from "../controllers/productController";

const router = Router();

// GET /api/products - List all marketplace products
router.get("/", getProducts);

// GET /api/products/:id - Get single product by slug or id
router.get("/:id", getProductByIdOrSlug);

export default router;
