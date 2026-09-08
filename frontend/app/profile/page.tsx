"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const UserIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </svg>
);

const BoxIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.5L3.5 7.2v9.6L12 21.5l8.5-4.7V7.2L12 2.5z" />
    <path d="M12 12L3.5 7.2" />
    <path d="M12 12v9.5" />
    <path d="M12 12l8.5-4.8" />
  </svg>
);

const PiggyBankIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.7 3.5 1.8 4.7L6 20h3l1-2h4l1 2h3l-.7-3.3c1.6-1.4 2.7-3.4 2.7-5.7 0-.5-.1-1-.2-1.5 1.2-.5 2.2-1.6 2.2-3 0-.8-.3-1.5-.8-2-.4.3-.9.5-1.4.5z" />
    <path d="M2 9.5v.5a2 2 0 0 0 2 2h1" />
    <circle cx="16" cy="11" r="1" fill="#712CDC" />
    <path d="M11 7h4" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HelpIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
    <circle cx="12" cy="16.5" r="0.75" fill="#712CDC" stroke="#712CDC" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#712CDC"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94A3B8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EF4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MENU_ITEMS = [
  {
    Icon: UserIcon,
    title: "Profile details",
    subtitle: "Name, contact and KYC info",
  },
  {
    Icon: BoxIcon,
    title: "Purchases",
    subtitle: "Orders, invoices and loan status",
  },
  {
    Icon: PiggyBankIcon,
    title: "Pledge history",
    subtitle: "Funds you pledged or released",
  },
  {
    Icon: UsersIcon,
    title: "Invite friends",
    subtitle: "Share the app, earn rewards",
    badge: "EARN ₹500",
  },
  {
    Icon: HelpIcon,
    title: "Support & FAQs",
    subtitle: "Find answers or contact us",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Privacy policy",
    subtitle: "How we handle your data",
  },
  {
    Icon: DocumentIcon,
    title: "Terms & conditions",
    subtitle: "Rules governing your use",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-1.5">
        <h1 className="text-[26px] font-extrabold text-[#0F172A] tracking-tight leading-none">
          Profile
        </h1>
        <p className="text-[12.5px] text-[#64748B] mt-1 font-normal leading-snug">
          Manage your account settings and personal preferences.
        </p>
      </div>

      {/* User Information */}
      <div className="px-5 py-2 flex items-center gap-3">
        <div
          className="rounded-full bg-[#ECE6FF] flex items-center justify-center flex-shrink-0"
          style={{ width: "46px", height: "46px" }}
        >
          <span className="text-[#712CDC] font-bold text-lg tracking-tight">
            U
          </span>
        </div>
        <div>
          <p className="font-bold text-[#0F172A] text-[16px] leading-tight">User</p>
          <p className="text-[12.5px] text-[#64748B] font-medium mt-0.5">
            +91 9782291865
          </p>
        </div>
      </div>

      {/* Quick Actions Header */}
      <div className="px-5 pt-2 pb-1.5">
        <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#94A3B8]">
          QUICK ACTIONS
        </p>
      </div>

      {/* Action Cards List */}
      <div className="px-5 flex flex-col gap-2">
        {MENU_ITEMS.map((item) => {
          const ItemIcon = item.Icon;
          return (
            <button
              key={item.title}
              type="button"
              className="w-full bg-white rounded-2xl py-2.5 px-3.5 flex items-center gap-3 border border-[#F1F5F9] shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-[0.99] transition-transform text-left"
            >
              {/* Soft purple rounded icon box */}
              <div className="w-9 h-9 rounded-xl bg-[#F4F0FF] flex items-center justify-center flex-shrink-0">
                <ItemIcon />
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-[13.5px] font-bold text-[#0F172A] leading-tight">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5 font-normal whitespace-nowrap">
                  {item.subtitle}
                </p>
              </div>

              {/* Referral Badge if present */}
              {item.badge && (
                <span className="bg-[#ECE6FF] text-[#712CDC] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 mr-1 tracking-tight">
                  {item.badge}
                </span>
              )}

              {/* Chevron Right */}
              <div className="flex-shrink-0">
                <ChevronRight />
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Card */}
      <div className="px-5 mt-2.5">
        <Link
          href="/login"
          onClick={() => {
            try {
              localStorage.removeItem("1fi_logged_in");
              localStorage.removeItem("1fi_user_phone");
            } catch {}
          }}
          className="w-full py-2.5 bg-white border border-[#F1F5F9] rounded-2xl flex items-center justify-center gap-2 text-[#EF4444] font-bold text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:bg-red-50/50 transition-colors"
        >
          <LogoutIcon />
          <span>Log out</span>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}

