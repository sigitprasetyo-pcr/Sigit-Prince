import { MdNotifications, MdSearch } from "react-icons/md";

export default function Header() {
  return (
    <header className="bg-[#FFFDF5] text-[#121212] border-b border-neutral-200/40 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex justify-between items-center h-20 w-full px-6 md:px-12 z-40 sticky top-0">
      <h2 className="text-2xl font-display italic tracking-tighter">
        VelvetNova
      </h2>

      <div className="hidden md:flex items-center space-x-8">
        <div className="relative flex items-center border-b border-neutral-200 focus-within:border-primary transition-colors py-1">
          <MdSearch className="text-neutral-400 text-xl" />
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-neutral-300 outline-none px-3"
            placeholder="Cari koleksi atau pesanan..."
            type="text"
          />
        </div>

        <div className="flex items-center space-x-6">
          <MdNotifications className="cursor-pointer hover:text-amber-700/80 transition-colors text-xl" />

          <div className="flex items-center space-x-3 cursor-pointer">
            <img
              alt="Lead Curator"
              className="w-8 h-8 rounded-full object-cover"
              src="/images/image.png"
            />
            <span className="label-caps text-[10px]">Lead Curator</span>
          </div>
        </div>
      </div>
    </header>
  );
}