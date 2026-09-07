/**
 * ShopBanner
 * Replicates the purple hero banner from the 1Fi Shop page:
 * - "NO-COST EMIs" pill tag
 * - "Shop today, Pay later using Mutual funds."
 * - Subtitle: "No credit score required. No interest. Backed by your investments."
 */
export default function ShopBanner() {
  return (
    <div className="relative w-full overflow-hidden hero-gradient min-h-[220px] flex items-center">
      {/* Background decorative circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
      <div className="absolute -bottom-8 right-16 w-32 h-32 bg-white/5 rounded-full" />

      <div className="relative z-10 px-5 pt-7 pb-10 flex-1">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="white"
            className="flex-shrink-0"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="text-white text-[11px] font-semibold tracking-wide">
            NO-COST EMIs
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-white font-bold leading-tight mb-2">
          <span className="text-2xl block">Shop today,</span>
          <span className="text-2xl italic block">Pay later using</span>
          <span className="text-3xl block">Mutual funds.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/75 text-sm mt-2 leading-snug">
          No credit score required. No interest.
          <br />
          Backed by your investments.
        </p>
      </div>

      {/* Decorative product icons - right side */}
      <div className="absolute right-0 bottom-0 top-0 w-40 flex items-end justify-end pointer-events-none select-none">
        {/* Simplified product silhouettes */}
        <div className="relative w-40 h-40 mb-2 mr-1">
          {/* Phone */}
          <div className="absolute bottom-0 right-4 w-14 h-24 bg-white/20 rounded-xl border border-white/30" />
          {/* Laptop */}
          <div className="absolute bottom-6 right-14 w-20 h-14 bg-white/15 rounded-lg border border-white/25" />
          {/* Bag */}
          <div className="absolute bottom-0 right-20 w-12 h-12 bg-yellow-400/80 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
