"use client";

import { useState, useEffect, useCallback } from "react";
import ShopBanner from "@/components/ShopBanner";
import TabSwitcher from "@/components/TabSwitcher";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/marketplace/ProductCard";

type Tab = "top-brands" | "nearby-stores" | "marketplace";

// Brand list (Top Brands tab) — UI only, no implementation needed
const TOP_BRANDS = [
  { name: "Air India", emi: "18", logo: "AI" },
  { name: "Apple Premium Reseller", emi: "24", logo: "AP" },
  { name: "CaratLane", emi: "6", logo: "CL" },
  { name: "CGH Earth", emi: "24", logo: "CE" },
  { name: "Croma", emi: "6", logo: "CR" },
  { name: "EaseMyTrip", emi: "24", logo: "ET" },
  { name: "Vijay Sales", emi: "12", logo: "VS" },
  { name: "Reliance Digital", emi: "24", logo: "RD" },
];

// Nearby stores (Nearby Stores tab) — UI only
const NEARBY_STORES = [
  { name: "Croma - Sector 14, Gurugram", distance: "0.8 KM", logo: "CR" },
  { name: "Reliance Digital - DLF Phase 2", distance: "1.2 KM", logo: "RD" },
  { name: "Vijay Sales - Sector 18", distance: "2.1 KM", logo: "VS" },
  { name: "Apple Authorised Reseller", distance: "2.8 KM", logo: "AP" },
];

type ProductListItem = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  badgeText?: string | null;
  defaultVariant: {
    mrp: number;
    price: number;
    color?: string | null;
    colorHex?: string | null;
    imageUrl?: string | null;
  } | null;
  lowestEmi: {
    tenureMonths: number;
    monthlyAmount: number;
    isNoCost: boolean;
  } | null;
};

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("marketplace");
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "marketplace") fetchProducts();
  }, [activeTab, fetchProducts]);

  // Filter products by search query
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      {/* Hero Banner */}
      <ShopBanner />

      {/* Tab Switcher & Search Bar */}
      <div className="relative z-20 -mt-6 px-4 flex flex-col gap-3">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Search Bar */}
        <div className="relative flex items-center bg-white border border-gray-200/80 rounded-full px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            className="mr-3 flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder={
              activeTab === "marketplace"
                ? "Search products..."
                : activeTab === "nearby-stores"
                ? "Search stores..."
                : "Search online stores..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none flex-1"
          />
        </div>
      </div>

      {/* ── TOP BRANDS TAB ───────────────────────────── */}
      {activeTab === "top-brands" && (
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Top Brands</h2>
          <div className="space-y-3">
            {TOP_BRANDS.filter((b) =>
              b.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((brand) => (
              <div
                key={brand.name}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-card"
              >
                {/* Brand logo placeholder */}
                <div className="w-14 h-14 rounded-xl bg-[#F5F0FD] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#712CDC]">
                    {brand.logo}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {brand.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    No-cost EMIs upto {brand.emi} months
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NEARBY STORES TAB ────────────────────────── */}
      {activeTab === "nearby-stores" && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Nearby Stores</h2>
            <button className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
              Gurugram
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {NEARBY_STORES.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((store) => (
              <div
                key={store.name}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-gray-500">
                    {store.logo}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1">
                    {store.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pay directly · Up to 60 months EMIs
                  </p>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">
                  {store.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 1FI MARKETPLACE TAB ──────────────────────── */}
      {activeTab === "marketplace" && (
        <div className="px-4 py-4">
          {/* Section header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                1Fi Marketplace
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Buy with mutual fund-backed EMIs
              </p>
            </div>
            {/* Category filter chips */}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="skeleton aspect-square" />
                  <div className="bg-white p-3 space-y-2">
                    <div className="skeleton h-3 w-16 rounded" />
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-3 w-24 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-[#F5F0FD] rounded-full flex items-center justify-center mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#712CDC"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-gray-900 font-semibold mb-1">
                No products found
              </p>
              <p className="text-sm text-gray-400">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
