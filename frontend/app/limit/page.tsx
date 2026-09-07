import BottomNav from "@/components/BottomNav";

export default function LimitPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Lock illustration */}
        <div className="w-20 h-20 bg-[#F5F0FD] rounded-full flex items-center justify-center mb-5">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#712CDC" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          CHECK ELIGIBILITY
        </p>
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-6">
          Shop on 0% interest backed
          <br />
          by your Mutual Funds
        </h2>
        <button className="w-full bg-[#712CDC] text-white py-4 rounded-full font-bold text-sm">
          Fetch my portfolio
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
