import { MdSearch } from "react-icons/md";

export default function SearchBar({
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative w-full md:w-[280px]">
      <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#A58E7B]" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[36px] w-full rounded-[10px] border border-[#E7E0D8] bg-white pl-9 pr-4 text-[12px] text-[#2D2723] outline-none placeholder:text-[#A58E7B] focus:border-[#C7A765]"
      />
    </div>
  );
}