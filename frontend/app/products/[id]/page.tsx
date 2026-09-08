"use client";

import { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import VariantSelector from "@/components/marketplace/VariantSelector";
import EmiPlansPanel from "@/components/marketplace/EmiPlansPanel";
import { formatPrice, discountPercent, calculateMonthlyAmount } from "@/lib/formatters";

type Variant = {
  id: string;
  name: string;
  storage?: string | null;
  color?: string | null;
  colorHex?: string | null;
  mrp: number;
  price: number;
  imageUrl?: string | null;
  isDefault?: boolean;
};

type EmiPlan = {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyAmount: number;
  cashbackAmount: number;
  isNoCost: boolean;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string | null;
  badgeText: string | null;
  variants: Variant[];
  emiPlans: EmiPlan[];
};

function ShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // TODO: In production, replace with a real order ID returned from the backend
  // after the pledge/order creation API call.
  const orderRefId = useMemo(
    () => `1FI-MF-${Math.floor(Math.random() * 90000) + 10000}`,
    []
  );

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error("Not found");
        setProduct(json.data);
        // Set defaults
        const defaultVar =
          json.data.variants.find((v: Variant) => v.isDefault) ??
          json.data.variants[0];
        setSelectedVariant(defaultVar);
        // Pre-select the lowest EMI
        const lowest = json.data.emiPlans.reduce(
          (min: EmiPlan, p: EmiPlan) =>
            p.monthlyAmount < min.monthlyAmount ? p : min,
          json.data.emiPlans[0]
        );
        if (lowest) setSelectedPlanId(lowest.id);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const selectedPlan = product?.emiPlans.find((p) => p.id === selectedPlanId);
  // Dynamically calculate monthly EMI based on selected variant price
  const dynamicMonthlyAmount =
    selectedPlan && selectedVariant
      ? calculateMonthlyAmount(
          selectedVariant.price,
          selectedPlan.tenureMonths,
          selectedPlan.interestRate
        )
      : 0;

  const discount = selectedVariant
    ? discountPercent(selectedVariant.mrp, selectedVariant.price)
    : 0;

  // ── Loading State ───────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pb-24">
        {/* Header skeleton */}
        <div className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
          <div className="w-8 h-8 rounded-full skeleton" />
          <div className="ml-3 h-5 w-32 skeleton rounded" />
          <div className="ml-auto w-8 h-8 rounded-full skeleton" />
        </div>
        {/* Image skeleton */}
        <div className="bg-white px-4 py-8">
          <div className="skeleton aspect-square rounded-2xl mx-4" />
        </div>
        <div className="px-4 space-y-3 mt-4">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-7 w-3/4 rounded" />
          <div className="skeleton h-5 w-1/2 rounded" />
          <div className="skeleton h-32 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  // ── Error State ─────────────────────────────────────
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center pb-24 text-center px-8">
        <div className="w-16 h-16 bg-[#F5F0FD] rounded-full flex items-center justify-center mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#712CDC"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="font-bold text-gray-900 mb-1">Product not found</p>
        <p className="text-sm text-gray-400 mb-6">
          This product may no longer be available.
        </p>
        <Link
          href="/shop"
          className="bg-[#712CDC] text-white px-6 py-3 rounded-full font-semibold text-sm"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  // ── Product Page ────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-32">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 flex items-center px-4 py-3.5">
        <Link
          href="/shop"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 mr-3 active:bg-gray-200 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#374151"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <h1 className="text-base font-bold text-gray-900 flex-1">
          1Fi Marketplace
        </h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200">
          <ShareIcon />
        </button>
      </div>

      {/* ── PRODUCT IMAGE ── */}
      <div className="bg-white px-6 py-8 relative">
        {/* Category + Badge row */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-[#712CDC] font-semibold uppercase tracking-wider">
            {product.brand}
          </span>
          {product.badgeText && (
            <span className="bg-[#712CDC] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide">
              {product.badgeText}
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
          {selectedVariant?.imageUrl ? (
            <Image
              src={selectedVariant.imageUrl}
              alt={product.name}
              fill
              unoptimized
              className="object-contain p-4"
              sizes="(max-width: 430px) 100vw"
              priority
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* ── PRODUCT INFO ── */}
      <div className="bg-white mt-2 px-5 py-4 border-t border-gray-50">
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-1">
          {product.name}
        </h2>
        {selectedVariant && (
          <p className="text-sm text-gray-500 mb-3">{selectedVariant.name}</p>
        )}

        {/* Price */}
        {selectedVariant && (
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(selectedVariant.price)}
            </span>
            {selectedVariant.mrp > selectedVariant.price && (
              <>
                <span className="text-sm text-gray-400 mrp-strike">
                  {formatPrice(selectedVariant.mrp)}
                </span>
                <span className="text-sm font-bold text-green-600">
                  {discount}% off
                </span>
              </>
            )}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-500 leading-relaxed mt-2">
            {product.description}
          </p>
        )}
      </div>

      {/* ── VARIANT SELECTOR ── */}
      {product.variants.length > 1 && selectedVariant && (
        <div className="bg-white mt-2 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Select Variant
          </h3>
          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant.id}
            onSelect={(v) => setSelectedVariant(v)}
          />
        </div>
      )}

      {/* ── EMI PLANS ── */}
      {product.emiPlans.length > 0 && selectedVariant && (
        <div className="mt-2 px-4">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[#712CDC] rounded-full" />
            <h3 className="text-sm font-bold text-gray-900">
              EMI Plans
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              · Backed by Mutual Funds
            </span>
          </div>

          <EmiPlansPanel
            plans={product.emiPlans}
            productPrice={selectedVariant.price}
            selectedPlanId={selectedPlanId}
            onSelectPlan={(plan) => setSelectedPlanId(plan.id)}
          />
        </div>
      )}

      {/* ── HOW TO USE ── */}
      <div className="bg-white mt-3 mx-4 rounded-2xl px-5 py-4 shadow-card">
        <h3 className="text-sm font-bold text-gray-900 mb-3">How to use</h3>
        <ol className="space-y-3">
          {[
            "Select your preferred EMI plan",
            "Link or pledge your Mutual Fund units as collateral",
            "Complete payment — the EMI amount is auto-debited monthly",
            "Your Mutual Funds continue to grow while you repay",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#F5F0FD] text-[#712CDC] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-600 leading-snug">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── TERMS ── */}
      <div className="px-4 mt-3 mb-4">
        <details className="bg-white rounded-2xl shadow-card">
          <summary className="px-5 py-4 text-sm font-bold text-gray-900 cursor-pointer select-none list-none flex items-center justify-between">
            Terms & Conditions
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="px-5 pb-4 text-xs text-gray-500 leading-relaxed space-y-2 border-t border-gray-100">
            <p>
              1Fi Marketplace products are fulfilled by verified sellers. EMI
              plans are powered by mutual fund pledging, not loans.
            </p>
            <p>
              No credit score check. No processing fees. Interest rates apply
              for tenures above 24 months.
            </p>
            <p>
              Cashback is credited to your 1Fi wallet within 7 business days of
              the first EMI payment.
            </p>
          </div>
        </details>
      </div>

      {/* ── STICKY BOTTOM CTA ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-40 pb-safe">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          disabled={!selectedPlanId}
          className={`w-full py-4 rounded-full font-bold text-base text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
            selectedPlanId
              ? "bg-[#712CDC] hover:bg-[#5c22a5]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {selectedPlan ? (
            <>
              Continue at{" "}
              <span className="font-extrabold">
                {formatPrice(dynamicMonthlyAmount)}/mo
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          ) : (
            "Select an EMI plan"
          )}
        </button>
      </div>

      {/* ── CHECKOUT / PLEDGE BOTTOM SHEET MODAL ── */}
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => {
            setIsCheckoutOpen(false);
            if (orderConfirmed) setOrderConfirmed(false);
          }}
        >
          <div
            className="w-full max-w-[430px] bg-white rounded-t-[32px] p-6 pb-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {orderConfirmed ? "Order Confirmed!" : "Review & Pledge MF"}
                </h3>
                <p className="text-xs text-gray-500">
                  {orderConfirmed
                    ? "Your mutual fund collateral has been secured"
                    : "1Fi Mutual Fund-backed EMI Plan"}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  if (orderConfirmed) setOrderConfirmed(false);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 active:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {!orderConfirmed ? (
              <div className="py-4 space-y-4">
                {/* Product Summary */}
                <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  {selectedVariant?.imageUrl && (
                    <div className="relative w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={selectedVariant.imageUrl}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedVariant?.name}
                    </p>
                    <p className="text-sm font-bold text-[#712CDC] mt-0.5">
                      {formatPrice(selectedVariant?.price ?? 0)}
                    </p>
                  </div>
                </div>

                {/* Plan Breakdown */}
                <div className="border border-gray-100 rounded-2xl p-4 space-y-3 bg-white shadow-sm">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Monthly EMI</span>
                    <span className="font-bold text-gray-900 text-base">
                      {formatPrice(dynamicMonthlyAmount)}/mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tenure</span>
                    <span className="font-semibold text-gray-800">
                      {selectedPlan?.tenureMonths} Months
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Annual Interest</span>
                    <span
                      className={`font-semibold ${
                        selectedPlan?.isNoCost
                          ? "text-green-600"
                          : "text-gray-800"
                      }`}
                    >
                      {selectedPlan?.interestRate === 0
                        ? "0% (No-Cost EMI)"
                        : `${selectedPlan?.interestRate}% p.a.`}
                    </span>
                  </div>
                  {selectedPlan && selectedPlan.cashbackAmount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Cashback</span>
                      <span className="font-bold text-green-600">
                        +{formatPrice(selectedPlan.cashbackAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
                    <span className="text-gray-500">Collateral Pledged</span>
                    <span className="font-semibold text-[#712CDC]">
                      Mutual Fund Portfolio
                    </span>
                  </div>
                </div>

                {/* MF Benefit Note */}
                <div className="flex items-start gap-2.5 bg-[#F5F0FD] p-3.5 rounded-2xl text-xs text-[#712CDC]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0 mt-0.5"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  <p className="leading-relaxed">
                    Your mutual fund units stay invested and continue earning
                    market returns while your monthly EMIs are auto-debited.
                  </p>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => setOrderConfirmed(true)}
                  className="w-full py-4 rounded-full font-bold text-base text-white bg-[#712CDC] hover:bg-[#5c22a5] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  Pledge & Confirm Plan
                </button>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Application Approved!
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Your {selectedPlan?.tenureMonths}-month EMI plan at{" "}
                    {formatPrice(dynamicMonthlyAmount)}/mo has been set up
                    against your mutual fund collateral.
                  </p>
                </div>

                <div className="w-full bg-gray-50 rounded-2xl p-4 text-xs text-gray-600 text-left space-y-1.5 border border-gray-100">
                  <div className="flex justify-between">
                    <span>Reference ID:</span>
                    <span className="font-mono font-bold text-gray-800">
                      {orderRefId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>First EMI Due:</span>
                    <span className="font-semibold text-gray-800">
                      1st of next month
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collateral Status:</span>
                    <span className="font-semibold text-green-600">
                      Pledged & Safe
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2 pt-2">
                  <Link
                    href="/emi-dues"
                    className="w-full py-3.5 rounded-full font-bold text-sm text-white bg-[#712CDC] hover:bg-[#5c22a5] flex items-center justify-center"
                  >
                    View in EMI Dues
                  </Link>
                  <Link
                    href="/shop"
                    className="w-full py-3.5 rounded-full font-semibold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    Back to Marketplace
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

