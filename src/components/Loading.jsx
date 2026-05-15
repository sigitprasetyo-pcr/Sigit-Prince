export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7F1E8] via-white to-[#E5D7BD]">
      <div className="text-center">
        <div className="relative mx-auto mb-8 flex h-[76px] w-[76px] items-center justify-center rounded-[18px] bg-[#B49455] font-display text-[34px] text-white shadow-[0_20px_45px_rgba(45,39,35,0.18)]">
          <span className="absolute -top-7 h-[70px] w-[86px] rounded-full border-t-[6px] border-[#C7A765]" />
          H
        </div>

        <h1 className="font-display text-[42px] text-[#2D2723]">
          Hejmana Boutique
        </h1>

        <p className="mt-4 text-[16px] text-[#856F4E]">
          Premium Fashion Collection
        </p>

        <p className="mt-10 text-[22px] text-[#34485C]">
          Mempersiapkan pengalaman terbaik untuk Anda..
        </p>

        <div className="mx-auto mt-10 w-[315px] overflow-hidden rounded-full bg-[#E5D7BD]">
          <div className="loading-bar h-[7px] w-1/3 rounded-full bg-[#B49455]" />
        </div>

        <div className="mt-11 flex justify-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#C7A765]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#C7A765] [animation-delay:150ms]" />
        </div>
      </div>
    </main>
  );
}