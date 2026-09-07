"use client";

type Tab = "top-brands" | "nearby-stores" | "marketplace";

interface TabSwitcherProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="w-full">
      {/* Outer pill container matching 1Fi design */}
      <div className="flex bg-[#F5F1FD] border border-[#E5D7FA] rounded-full p-1.5 gap-1.5 shadow-[0_2px_8px_rgba(113,44,220,0.06)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 text-center py-2.5 px-2 rounded-full text-xs font-semibold
                transition-all duration-200 relative whitespace-nowrap flex flex-col items-center justify-center
                ${
                  isActive
                    ? "bg-white text-[#712CDC] shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <span>{tab.label}</span>
              {/* Active underline indicator */}
              {isActive ? (
                <span className="block mt-1 h-[2.5px] w-6 bg-[#712CDC] rounded-full" />
              ) : (
                <span className="block mt-1 h-[2.5px] w-6 bg-transparent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
