import BottomNav from "@/components/BottomNav";
import Link from "next/link";

function EmptyIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill="#F5F0FD" />
      <rect x="20" y="22" width="40" height="36" rx="4" stroke="#712CDC" strokeWidth="2" fill="white" />
      <line x1="28" y1="34" x2="52" y2="34" stroke="#712CDC" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="42" x2="44" y2="42" stroke="#E0D0F8" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="50" x2="40" y2="50" stroke="#E0D0F8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="55" cy="27" r="8" fill="#712CDC" />
      <text x="51" y="31" fill="white" fontSize="11" fontWeight="bold">?</text>
    </svg>
  );
}

export default function EmiDuesPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <EmptyIllustration />
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mt-6 mb-2">
          NOTHING DUE YET
        </p>
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-6">
          Looks like you haven&apos;t
          <br />
          shopped yet with 1Fi
        </h2>
        <Link
          href="/shop"
          className="w-full bg-[#712CDC] text-white py-4 rounded-full font-bold text-sm"
        >
          Check eligibility
        </Link>
      </div>
      <BottomNav />
    </div>
  );
}
