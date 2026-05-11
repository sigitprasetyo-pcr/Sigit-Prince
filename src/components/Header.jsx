import { FiSearch, FiBell, FiHeart, FiShoppingBag } from "react-icons/fi";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-[90px] items-center justify-between border-b border-[#E6DED6] bg-white px-8">
      <div className="relative w-full max-w-[560px]">
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[24px] text-[#8C8782]" />

        <input
          type="text"
          placeholder="Search products..."
          className="h-[54px] w-full rounded-[8px] border-0 bg-[#F3F0EC] pl-14 pr-5 text-[22px] font-normal text-[#6F665F] outline-none placeholder:text-[#8C8782] focus:ring-2 focus:ring-[#C09B7D]/25"
        />
      </div>

      <div className="flex items-center gap-7 text-[25px] text-[#2D2723]">
        <button className="relative transition hover:text-[#C09B7D]">
          <FiBell />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#8B2333]" />
        </button>

        <button className="transition hover:text-[#C09B7D]">
          <FiHeart />
        </button>

        <button className="transition hover:text-[#C09B7D]">
          <FiShoppingBag />
        </button>
      </div>
    </header>
  );
}