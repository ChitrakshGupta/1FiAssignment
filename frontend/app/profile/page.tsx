import BottomNav from "@/components/BottomNav";

const MENU_ITEMS = [
  {
    icon: "👤",
    title: "Profile details",
    subtitle: "Name, phone, email",
  },
  {
    icon: "📦",
    title: "Purchases",
    subtitle: "Orders, invoices and loan status",
  },
  {
    icon: "📋",
    title: "Pledge history",
    subtitle: "All pledged fund transactions",
  },
  {
    icon: "🎁",
    title: "Invite friends",
    subtitle: "Earn ₹500 per referral",
    badge: "EARN ₹500",
  },
  {
    icon: "💬",
    title: "Support & FAQs",
    subtitle: "Get help, read guides",
  },
  {
    icon: "🔒",
    title: "Privacy policy",
    subtitle: "How we handle your data",
  },
  {
    icon: "📜",
    title: "Terms & conditions",
    subtitle: "Legal information",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-5 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900 mb-0.5">Profile</h1>
        <p className="text-xs text-gray-400">Manage your account settings</p>
      </div>

      {/* User Avatar */}
      <div className="bg-white flex items-center gap-4 px-5 py-4 border-b border-gray-100">
        <div className="w-14 h-14 rounded-full bg-[#712CDC] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">U</span>
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">User Name</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-3 bg-white mx-4 rounded-2xl shadow-card overflow-hidden">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-5 pt-4 pb-2">
          QUICK ACTIONS
        </p>
        <div className="divide-y divide-gray-50">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.title}
              className="w-full flex items-center px-5 py-3.5 text-left active:bg-gray-50 transition-colors"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
              </div>
              {item.badge && (
                <span className="bg-[#712CDC] text-white text-[9px] font-bold px-2 py-0.5 rounded-full mr-2">
                  {item.badge}
                </span>
              )}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4">
        <button className="w-full py-4 rounded-2xl border-2 border-red-200 text-red-500 font-bold text-sm bg-white active:bg-red-50 transition-colors">
          Log out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
