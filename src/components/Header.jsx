import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("adminUser"));

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const adminName = admin?.name || "Admin User";
  const adminRole = admin?.role || "Administrator";

  const avatar = adminName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex h-[54px] items-center justify-between border-b border-[#E7E0D8] bg-white px-6">
      {/* SEARCH */}
      <div className="relative w-[280px]">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#A58E7B]" />

        <input
          type="text"
          placeholder="Cari pesanan, stok, atau pelanggan..."
          className="h-[28px] w-full rounded-[9px] border border-transparent bg-[#F9F5F1] pl-9 pr-4 text-[11px] text-[#4F4740] outline-none placeholder:text-[#A58E7B] focus:border-[#C7A765]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* NOTIFICATION */}
        <button
          type="button"
          className="relative flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[14px] text-[#3A2619] transition hover:text-[#C7A765]"
        >
          <FiBell />

          <span className="absolute right-[4px] top-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
        </button>

        <div className="h-5 w-px bg-[#EEE7DF]" />

        {/* PROFILE */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-[10px] bg-white px-2 py-1 text-left transition hover:bg-[#FAF9F7]"
            >
              <div className="text-right leading-tight">
                <p className="text-[11px] text-[#2D2723]">
                  {adminName}
                </p>

                <p className="text-[8px] text-[#8B735D]">
                  {adminRole}
                </p>
              </div>

              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#3A2619] text-[10px] text-white">
                {avatar}
              </div>

              <FiChevronDown className="text-[12px] text-[#8B735D]" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[190px] rounded-[14px] border-[#E7E0D8] bg-white p-2 shadow-md"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-[12px] font-normal text-[#2D2723]">
                {adminName}
              </p>

              <p className="text-[10px] font-normal text-[#8B735D]">
                {adminRole}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-[#EEE7DF]" />

            <DropdownMenuItem className="cursor-pointer gap-2 rounded-[9px] text-[12px] text-[#4F4740]">
              <FiUser className="text-[13px]" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer gap-2 rounded-[9px] text-[12px] text-[#4F4740]">
              <FiSettings className="text-[13px]" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#EEE7DF]" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-2 rounded-[9px] text-[12px] text-red-600"
            >
              <FiLogOut className="text-[13px]" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}