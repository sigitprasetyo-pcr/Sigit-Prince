export default function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[#3A2619] font-display text-[13px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.16)]">
        H
      </div>

      <div>
        <h1 className="font-display text-[14px] leading-none text-[#2D2723]">
          Hejmana
        </h1>

        <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-[#C7A765]">
          Boutique
        </p>
      </div>
    </div>
  );
}