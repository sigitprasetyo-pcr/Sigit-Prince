export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFDFB] via-[#FCF8F2] to-[#F5EEE0]">
      {/* Decorative Orbs in background */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-[#7A2E3A]/5 to-[#C5A46D]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#C5A46D]/5 to-[#7A2E3A]/10 blur-3xl" />

      <div className="relative z-10 text-center">
        {/* Premium Brand Logo Mark */}
        <div className="relative mx-auto mb-8 flex h-[96px] w-[96px] items-center justify-center">
          {/* Rotating dashed gold outer ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#C5A46D]/50 animate-[spin_12s_linear_infinite]" />
          
          {/* Subtle gold outer circle */}
          <div className="absolute inset-1.5 rounded-full border border-[#C5A46D]/20" />
          
          {/* Static thin burgundy inner ring */}
          <div className="absolute inset-3.5 rounded-full border border-[#7A2E3A]/20" />

          {/* Central letter mark */}
          <div className="absolute inset-5 flex items-center justify-center rounded-full bg-[#7A2E3A] font-serif text-[38px] font-medium text-white shadow-[0_12px_28px_rgba(122,46,58,0.25)]">
            A
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-[32px] font-extralight uppercase tracking-[0.25em] text-[#7A2E3A]">
          Aurelia
          <span className="block mt-1 text-[14px] font-semibold tracking-[0.45em] text-[#C5A46D]">
            Boutique
          </span>
        </h1>

        <p className="mt-8 text-[12px] font-medium tracking-[0.2em] uppercase text-[#7C6B5B]/80">
          Premium Fashion Collection
        </p>

        {/* Elegantly styled loading statement */}
        <p className="mt-12 text-[14px] font-light tracking-wide text-[#7C6B5B]/90 italic">
          Mempersiapkan pengalaman terbaik untuk Anda...
        </p>

        {/* Shimmer progress bar */}
        <div className="mx-auto mt-6 w-[220px] overflow-hidden rounded-full bg-[#EAE3D5]/60 h-[3px] relative">
          <div className="loading-bar absolute left-0 top-0 h-full w-1/3 rounded-full bg-gradient-to-r from-[#C5A46D] to-[#7A2E3A]" />
        </div>

        {/* Elegant pulsing status dots */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7A2E3A]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C5A46D] [animation-delay:200ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7A2E3A] [animation-delay:400ms]" />
        </div>
      </div>
    </main>
  );
}