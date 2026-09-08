import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration via ALLOWED_ORIGIN env var
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 1Fi Marketplace Backend running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});

export default app;
