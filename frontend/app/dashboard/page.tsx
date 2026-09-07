import BottomNav from "@/components/BottomNav";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      {/* Hero */}
      <div className="hero-gradient px-5 py-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
          GET STARTED
        </p>
        <h1 className="text-2xl font-bold leading-tight mb-3">
          Shop on{" "}
          <span className="text-yellow-400">no-cost EMI</span>
        </h1>
        <p className="text-white/75 text-sm">
          Backed by your mutual funds, No credit pull,
          <br />
          No charges, &amp; quick approval.
        </p>
        <button className="mt-5 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-full text-sm flex items-center gap-2">
          Check eligibility →
        </button>
      </div>

      {/* Content placeholder */}
      <div className="px-4 py-5">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">
          OFFERS
        </p>
        <div className="bg-white rounded-2xl h-40 flex items-center justify-center shadow-card">
          <p className="text-gray-300 text-sm">Offer cards coming soon</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
