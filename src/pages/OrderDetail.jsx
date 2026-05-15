import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import orders from "../data/Orders";

const statusClass = {
  "Siap Kirim": "bg-[#FFF0C8] text-[#C96B00]",
  Terkirim: "bg-[#D8F8E8] text-[#008A50]",
  Diproses: "bg-[#DCEAFF] text-[#0067E8]",
};

function parseRupiah(value) {
  if (!value) return 0;
  return Number(String(value).replace(/[^\d]/g, ""));
}

function formatRupiah(value) {
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundOrder = orders.find((item) => String(item.id) === String(id));

    if (!foundOrder) {
      setError("Order tidak ditemukan");
      return;
    }

    setOrder(foundOrder);
  }, [id]);

  if (error) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-red-200 bg-white p-6 text-red-600 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          {error}
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 text-[13px] text-[#7C7772] shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          Loading...
        </div>
      </section>
    );
  }

  const quantity = Number(order.quantity || 1);
  const total = parseRupiah(order.price) * quantity;

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mb-6">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#8B735D]">
          Hejmana / Orders / Detail
        </p>

        <h1 className="text-[24px] font-medium text-[#2D2723]">
          Detail Pesanan
        </h1>
      </div>

      <div className="max-w-[650px] overflow-hidden rounded-[18px] border border-[#E7E0D8] bg-white shadow-[0_8px_22px_rgba(45,39,35,0.06)]">
        <div className="border-b border-[#E7E0D8] bg-[#FFFDFC] p-7">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-[16px] bg-[#E5D7BD] text-[34px] shadow-[0_8px_20px_rgba(45,39,35,0.1)]">
                🛍️
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.12em] ${
                    statusClass[order.status] ||
                    "bg-[#F3F0EC] text-[#7C7772]"
                  }`}
                >
                  {order.status}
                </span>

                <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
                  {order.code || `#ORD-${String(order.id).padStart(3, "0")}`}
                </h2>

                <p className="text-[12px] text-[#856F4E]">{order.product}</p>
              </div>
            </div>

            <div className="hidden rounded-[12px] bg-[#FAF9F7] px-4 py-3 text-right md:block">
              <p className="text-[11px] text-[#7C7772]">Total Harga</p>

              <p className="mt-1 text-[16px] font-medium text-[#2D2723]">
                {formatRupiah(total)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-7 md:grid-cols-2">
          <InfoItem label={`Produk: ${order.product}`} />
          <InfoItem label={`Kategori: ${order.category}`} />
          <InfoItem label={`Pelanggan: ${order.customer}`} />
          <InfoItem label={`Email: ${order.email}`} />
          <InfoItem label={`Tanggal: ${order.date}`} />
          <InfoItem label={`Pembayaran: ${order.payment}`} />
          <InfoItem label={`Status: ${order.status}`} />
          <InfoItem label={`Jumlah: ${quantity}`} />
          <InfoItem label={`Alamat: ${order.address}`} />

          <div className="rounded-[14px] border border-[#E7E0D8] bg-[#FAF9F7] p-5 md:col-span-2">
            <p className="text-[12px] text-[#7C7772]">Ringkasan Pesanan</p>

            <div className="mt-3 flex items-center justify-between text-[13px] text-[#4F4740]">
              <span>Harga Produk</span>
              <span>{order.price}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[13px] text-[#4F4740]">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>

            <div className="mt-4 border-t border-[#E7E0D8] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#7C7772]">Total</span>

                <span className="text-[18px] font-medium text-[#2D2723]">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-[10px] bg-[#3A2619] px-5 py-3 text-[12px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.14)] transition hover:bg-[#4A3020]"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label }) {
  return (
    <div className="flex items-center gap-3 text-[12px] text-[#4F4740]">
      <span className="text-[#C47A24]">•</span>
      <span>{label}</span>
    </div>
  );
}