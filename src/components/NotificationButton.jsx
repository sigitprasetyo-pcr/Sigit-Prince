import { FiBell } from "react-icons/fi";

export default function NotificationButton() {
  return (
    <button
      type="button"
      className="relative flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[14px] text-[#3A2619] transition hover:text-[#C7A765]"
    >
      <FiBell />
      <span className="absolute right-[4px] top-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
    </button>
  );
}