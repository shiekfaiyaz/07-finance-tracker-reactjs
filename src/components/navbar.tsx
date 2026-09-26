"use client";

import { Bell, User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* left side: month dropdown */}
      <div>
        <Select defaultValue="September">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* right side: bell + profile */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
            <Image
              src="/images/profile.png"
              width={36}
              height={36}
              alt="navbar profile"
              className="w-9 h-9 rounded-full object-cover"
            />
            <p className="text-sm font-medium">Shaik</p>
            <ChevronDown size={16} className="text-gray-500" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>
              <User size={16} className="mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={16} className="mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle size={16} className="mr-2" /> Help
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <LogOut size={16} className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}