import Link from "next/link";
import Image from "next/image";
import { formatPrice, discountPercent } from "@/lib/formatters";

interface ProductCardProps {
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
}

export default function ProductCard({
  id,
  name,
  slug: _slug,
  brand,
  badgeText,
  defaultVariant,
  lowestEmi,
}: ProductCardProps) {
  const discount = defaultVariant
    ? discountPercent(defaultVariant.mrp, defaultVariant.price)
    : 0;

  return (
    <Link href={`/products/${id}`} className="block h-full">
      <div className="bg-white rounded-2xl shadow-card overflow-hidden active:scale-[0.98] transition-transform flex flex-col h-full">
        {/* Product Image - Fixed 1:1 Aspect Ratio */}
        <div className="relative bg-gray-50 w-full aspect-square flex items-center justify-center p-6 shrink-0">
          {/* Badge */}
          {badgeText && (
            <div className="absolute top-3 left-3 bg-[#712CDC] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide z-10">
              {badgeText}
            </div>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-green-50 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full z-10">
              {discount}% OFF
            </div>
          )}

          {defaultVariant?.imageUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={defaultVariant.imageUrl}
                alt={name}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 430px) 50vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ) : (
            // Placeholder when image fails
            <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info - Flex fill with fixed 2-line title height */}
        <div className="p-3 flex flex-col flex-1 justify-between">
          <div>
            {/* Brand label */}
            <p className="text-[10px] text-[#712CDC] font-semibold uppercase tracking-wide mb-0.5">
              {brand}
            </p>

            {/* Product name - Fixed 2-line height so 1-line and 2-line titles match perfectly */}
            <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem] flex items-center mb-1.5">
              {name}
            </h3>
          </div>

          <div>
            {/* Price row */}
            {defaultVariant && (
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(defaultVariant.price)}
                </span>
                {defaultVariant.mrp > defaultVariant.price && (
                  <span className="text-xs text-gray-400 mrp-strike">
                    {formatPrice(defaultVariant.mrp)}
                  </span>
                )}
              </div>
            )}

            {/* EMI teaser */}
            {lowestEmi && (
              <div className="flex items-center gap-1 bg-[#F5F0FD] rounded-lg px-2 py-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#712CDC"
                  strokeWidth="2"
                  className="flex-shrink-0"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-[11px] text-[#712CDC] font-semibold truncate">
                  {lowestEmi.isNoCost ? "No-cost " : ""}EMI from{" "}
                  {formatPrice(lowestEmi.monthlyAmount)}/mo
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
