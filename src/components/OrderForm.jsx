export default function OrderForm() {
  return (
    <div className="bg-white px-8 py-8 shadow-[0_8px_24px_rgba(45,39,35,0.06)]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            Form Pesanan
          </p>

          <h1 className="font-display text-[26px] italic text-black">
            Buat Pesanan Baru
          </h1>

          <p className="mt-4 text-[14px] text-[#7C7772]">
            Isi data pesanan boutique yang ingin ditambahkan ke daftar orders VelvetNova.
          </p>
        </div>

        <button className="text-[14px] text-[#7C7772]">
          Tutup
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <label>
          <span className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            Nama Produk
          </span>

          <input
            placeholder="Contoh: Royal Satin Dress"
            className="h-[46px] w-full border border-[#E1DAD2] px-5 text-[14px] outline-none focus:border-[#C7A765]"
          />
        </label>

        <label>
          <span className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            Kategori
          </span>

          <input
            placeholder="Contoh: Evening Wear"
            className="h-[46px] w-full border border-[#E1DAD2] px-5 text-[14px] outline-none focus:border-[#C7A765]"
          />
        </label>

        <label>
          <span className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            Nama Pelanggan
          </span>

          <input
            placeholder="Contoh: Aulia Putri"
            className="h-[46px] w-full border border-[#E1DAD2] px-5 text-[14px] outline-none focus:border-[#C7A765]"
          />
        </label>

        <label>
          <span className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            Harga
          </span>

          <input
            placeholder="Contoh: 3500000 atau Rp 3.500.000"
            className="h-[46px] w-full border border-[#E1DAD2] px-5 text-[14px] outline-none focus:border-[#C7A765]"
          />
        </label>

        <label>
          <span className="mb-3 block text-[12px] uppercase tracking-[0.18em] text-[#9CA3AF]">
            Status
          </span>

          <select className="h-[46px] w-full border border-[#E1DAD2] px-5 text-[14px] outline-none focus:border-[#C7A765]">
            <option>Diproses</option>
            <option>Siap Kirim</option>
            <option>Terkirim</option>
          </select>
        </label>

        <div className="flex items-end gap-4">
          <button className="h-[42px] rounded-[10px] bg-[#2D2723] px-8 text-[12px] font-bold uppercase tracking-[0.12em] text-white">
            Simpan Pesanan
          </button>

          <button className="h-[42px] border border-[#E1DAD2] px-8 text-[12px] uppercase tracking-[0.12em] text-[#8B735D]">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}