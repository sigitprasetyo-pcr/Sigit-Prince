import { FiChevronDown } from "react-icons/fi";

export default function UserDropdown() {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-[10px] bg-white px-2 py-1 text-left transition hover:bg-[#FAF9F7]"
    >
      <div className="text-right leading-tight">
        <p className="text-[11px] text-[#2D2723]">Admin User</p>
        <p className="text-[8px] text-[#8B735D]">Admin</p>
      </div>

      <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#3A2619] text-[10px] text-white">
        AR
      </div>

      <FiChevronDown className="text-[12px] text-[#8B735D]" />
    </button>
  );
}