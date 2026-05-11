import { FiShoppingBag } from "react-icons/fi";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FBFAF8] px-6 font-body text-[#2D2723]">
      {/* Background soft seperti Figma */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(192,155,125,0.12),transparent_32%),radial-gradient(circle_at_72%_78%,rgba(192,155,125,0.10),transparent_40%)]" />

      <section className="relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-6 flex h-[78px] w-[78px] items-center justify-center rounded-[16px] bg-[#C09B7D] text-[40px] text-white shadow-[0_18px_38px_rgba(45,39,35,0.18)]">
          <FiShoppingBag />
        </div>

        {/* Brand */}
        <h1 className="font-display text-[44px] font-medium leading-none text-[#2D2723]">
          Boutique
        </h1>

        <p className="mt-3 text-[17px] font-normal text-[#7C7772]">
          Elegant Collection
        </p>

        {/* Loading bar */}
        <div className="mt-12 w-[260px] overflow-hidden rounded-full bg-[#EFE7DF]">
          <div className="loading-bar h-[6px] w-1/3 rounded-full bg-[#C09B7D]" />
        </div>

        <p className="mt-6 text-[18px] font-normal text-[#6F665F]">
          Preparing your boutique dashboard...
        </p>

        {/* Dots */}
        <div className="mt-8 flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-[#C09B7D]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-[#D8C0AC] [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-[#EAD8C9] [animation-delay:300ms]" />
        </div>
      </section>

      {/* Footer */}
      <p className="absolute bottom-10 left-1/2 w-full -translate-x-1/2 text-center text-[15px] font-normal text-[#7C7772]">
        © 2026 Boutique. All rights reserved.
      </p>
    </main>
  );
}