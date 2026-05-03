import { MdAutoAwesome, MdLock } from "react-icons/md";

export default function Loading() {
  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center bg-[#fbf9f8] px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(254,212,136,0.12)_0%,transparent_70%)]" />

      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        <MdAutoAwesome className="text-4xl mb-3 text-[#775a19]" />

        <h1 className="font-display text-5xl text-black italic tracking-tighter mb-2">
          VelvetNova
        </h1>

        <div className="h-[1px] w-12 bg-[#775a19]/40 mb-3" />

        <p className="text-[12px] uppercase tracking-[0.3em] text-[#444748] font-bold">
          Atelier Pribadi
        </p>

        <div className="mt-20 flex flex-col items-center">
          <div className="relative w-64 h-[2px] bg-[#e9e8e7] overflow-hidden mb-6">
            <div className="absolute inset-y-0 left-0 bg-black w-1/3 animate-pulse" />
          </div>

          <p className="font-display text-xl text-black">
            Menyiapkan Kurasi Anda
          </p>

          <p className="text-sm text-[#444748] italic mt-2">
            Keanggunan dalam setiap detail sedang diramu.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center">
        <p className="text-xs text-[#747878] flex items-center justify-center gap-2">
          <MdLock />
          Enkripsi Tingkat Tinggi Aktif
        </p>
      </div>
    </main>
  );
}