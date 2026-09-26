"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";

const navLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={`bg-gray-900 text-white h-screen flex flex-col justify-between fixed left-0 top-0 transition-all duration-300 ${
        isOpen ? "w-[20%]" : "w-[70px]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/images/logo.png" width={32} height={32} alt="logo" className="w-8 h-8 shrink-0" />
            {isOpen && <h2 className="text-lg font-semibold whitespace-nowrap">FinanceTracker</h2>}
          </div>
          <button onClick={toggle}>
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 mt-4">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {isOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pb-6">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            pathname === "/settings" ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <Settings size={18} className="shrink-0" />
          {isOpen && "Settings"}
        </Link>
      </div>
    </aside>
  );
}