import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import customers from "../data/Customers";

const tierClass = {
  "Platinum Member": "bg-[#EEE8FF] text-[#6D3FD1]",
  "Gold Member": "bg-[#FFF3DE] text-[#C47A24]",
  "Silver Member": "bg-[#EEF2F6] text-[#667085]",
  "Regular Member": "bg-[#F3F0EC] text-[#7C7772]",
};

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundCustomer = customers.find((item) => String(item.id) === String(id));

    if (!foundCustomer) {
      setError("Customer tidak ditemukan");
      return;
    }

    setCustomer(foundCustomer);
  }, [id]);

  if (error) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-red-200 bg-white p-6 text-red-600">
          {error}
        </div>
      </section>
    );
  }

  if (!customer) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 text-[13px] text-[#7C7772]">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mb-6">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#8B735D]">
          Hejmana / Customers / Detail
        </p>

        <h1 className="text-[24px] font-medium text-[#2D2723]">
          Detail Pelanggan
        </h1>
      </div>

      <div className="max-w-[620px] overflow-hidden rounded-[18px] border border-[#E7E0D8] bg-white shadow-[0_8px_22px_rgba(45,39,35,0.06)]">
        <div className="flex items-center gap-5 border-b border-[#E7E0D8] bg-[#FFFDFC] p-7">
          <img
            src={customer.image}
            alt={customer.name}
            className="h-[78px] w-[78px] rounded-full border-4 border-white object-cover shadow-[0_8px_20px_rgba(45,39,35,0.14)]"
          />

          <div>
            <span
              className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.12em] ${
                tierClass[customer.tier] || "bg-[#F3F0EC] text-[#7C7772]"
              }`}
            >
              {customer.tier}
            </span>

            <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
              {customer.name}
            </h2>

            <p className="text-[12px] text-[#856F4E]">
              Customer ID: #{customer.id}
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-7 md:grid-cols-2">
          <InfoItem label={`Email: ${customer.email}`} />
          <InfoItem label={`No HP: ${customer.phone}`} />
          <InfoItem label={`Total Pesanan: ${customer.totalOrders}`} />
          <InfoItem label={`Produk Favorit: ${customer.favorite}`} />
          <InfoItem label={`Order Terakhir: ${customer.lastOrder}`} />
          <InfoItem label={`Alamat: ${customer.address}`} />

          <div className="rounded-[14px] border border-[#E7E0D8] bg-[#FAF9F7] p-5 md:col-span-2">
            <p className="text-[12px] text-[#7C7772]">Total Belanja</p>

            <p className="mt-1 text-[18px] font-medium text-[#2D2723]">
              {customer.spend}
            </p>
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