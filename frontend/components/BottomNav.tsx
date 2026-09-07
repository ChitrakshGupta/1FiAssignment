"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons matching 1Fi app exactly as in media_1788757214025.png
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#712CDC" : "#8E95A5"}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 10.5L12 3.5L20 10.5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V10.5Z" />
    <path d="M10 21V13.5C10 12.7 10.7 12 11.5 12H12.5C13.3 12 14 12.7 14 13.5V21" />
  </svg>
);

const ShopIcon = ({ active }: { active: boolean }) => (
  <div className="relative flex items-center justify-center">
    {active && (
      <div className="absolute w-10 h-10 rounded-full bg-[#712CDC]/10 filter blur-[3px] pointer-events-none" />
    )}
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#712CDC" : "#8E95A5"}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative z-10"
    >
      <path d="M3.5 9L5 4H19L20.5 9C20.5 10.3 19.3 11.2 18 11.2C16.7 11.2 15.5 10.3 15.5 9C15.5 10.3 14.3 11.2 13 11.2C11.7 11.2 10.5 10.3 10.5 9C10.5 10.3 9.3 11.2 8 11.2C6.7 11.2 5.5 10.3 5.5 9C5.5 10.3 4.3 11.2 3 11.2L3.5 9Z" />
      <path d="M5 11.2V19.5C5 20.3 5.7 21 6.5 21H17.5C18.3 21 19 20.3 19 19.5V11.2" />
      <rect x="10" y="15" width="4" height="6" rx="0.5" />
    </svg>
  </div>
);

const EmiIcon = ({ active }: { active: boolean }) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#712CDC" : "#8E95A5"}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Receipt with serrated top and bottom */}
    <path d="M5.5 3.5L7.5 5L9.5 3.5L11.5 5L13.5 3.5L15.5 5L17.5 3.5L19.5 5V19L17.5 20.5L15.5 19L13.5 20.5L11.5 19L9.5 20.5L7.5 19L5.5 20.5V3.5Z" />
    {/* Rupee Symbol inside */}
    <path d="M9.5 8.5H14.5" />
    <path d="M9.5 10.5H14.5" />
    <path d="M9.5 8.5C11 8.5 12.2 9.2 12.2 10.5C12.2 11.8 11 12.5 9.5 12.5H9L13.5 16.5" />
  </svg>
);

const LimitIcon = ({ active }: { active: boolean }) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#712CDC" : "#8E95A5"}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14.5L8.5 10L12.5 13.5L19.5 6.5" />
    <polyline points="15 6.5 19.5 6.5 19.5 11" />
    <line x1="5.5" y1="18" x2="5.5" y2="21" />
    <line x1="9.5" y1="14" x2="9.5" y2="21" />
    <line x1="13.5" y1="17" x2="13.5" y2="21" />
    <line x1="17.5" y1="11" x2="17.5" y2="21" />
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#712CDC" : "#8E95A5"}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7.5" r="3.5" />
    <path d="M6 19.5C6 16.2 8.7 14 12 14C15.3 14 18 16.2 18 19.5" />
  </svg>
);

const navItems = [
  { href: "/dashboard", label: "Home", Icon: HomeIcon },
  { href: "/shop", label: "Shop", Icon: ShopIcon },
  { href: "/emi-dues", label: "EMI Dues", Icon: EmiIcon },
  { href: "/limit", label: "Limit", Icon: LimitIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/shop") {
      return (
        pathname.startsWith("/shop") ||
        pathname.startsWith("/marketplace") ||
        pathname.startsWith("/products")
      );
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="fixed bottom-3 inset-x-0 mx-auto w-[calc(100%-20px)] max-w-[416px] z-50 pointer-events-none">
      <nav className="pointer-events-auto bg-white rounded-[32px] shadow-[0_8px_32px_rgba(20,14,50,0.12),0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/80 px-2 pt-2.5 pb-2.5">
        <div className="flex items-center justify-around">
          {navItems.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="relative flex flex-col items-center flex-1 py-1 group select-none min-w-0"
              >
                {/* Purple top indicator bar - exactly positioned at top edge */}
                {active && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-[#712CDC]" />
                )}

                <div className="h-7 flex items-center justify-center">
                  <Icon active={active} />
                </div>

                <span
                  className={`text-[11px] mt-0.5 tracking-tight transition-colors ${
                    active
                      ? "text-[#712CDC] font-bold"
                      : "text-[#8E95A5] font-medium"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
