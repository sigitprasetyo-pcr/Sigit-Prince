import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiShoppingBag } from "react-icons/fi";
import { MdSearch } from "react-icons/md";
import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

const tierClass = {
  "Platinum Member": "bg-[#EEE8FF] text-[#7A3FE0]",
  "Gold Member": "bg-[#FFF0D8] text-[#C56B2C]",
  "Silver Member": "bg-[#EEF2F6] text-[#667085]",
  "Regular Member": "bg-[#F3F0EC] text-[#7C7772]",
};

export default function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.phone.toLowerCase().includes(keyword) ||
      customer.tier.toLowerCase().includes(keyword)
    );
  });

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / Customers"
        title="Customers"
        description="Kelola data pelanggan boutique, loyalty tier, dan riwayat pembelian."
      >
        <div className="relative w-full md:w-[280px]">
          <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#A58E7B]" />

          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-[36px] w-full rounded-[10px] border border-[#E7E0D8] bg-white pl-9 pr-4 text-[12px] text-[#2D2723] outline-none placeholder:text-[#A58E7B] focus:border-[#C7A765]"
          />
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-[18px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(45,39,35,0.08)]"
          >
            <div className="flex items-start gap-4">
              <img
                src={customer.image}
                alt={customer.name}
                className="h-[58px] w-[58px] shrink-0 rounded-full border-2 border-white object-cover shadow-[0_8px_16px_rgba(45,39,35,0.14)]"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/customers/${customer.id}`}
                    className="truncate text-[15px] font-medium text-[#2D2723] underline decoration-[#2D2723]/40 underline-offset-2 hover:text-[#C47A24]"
                  >
                    {customer.name}
                  </Link>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.1em] ${
                      tierClass[customer.tier] || "bg-[#F3F0EC] text-[#7C7772]"
                    }`}
                  >
                    {customer.tier}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-[12px] text-[#7C6B5B]">
              <p className="flex items-center gap-3">
                <FiMail className="text-[#B07A52]" />
                {customer.email}
              </p>

              <p className="flex items-center gap-3">
                <FiPhone className="text-[#B07A52]" />
                {customer.phone}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#F0E8DF] pt-4">
              <div className="flex items-center gap-2 text-[12px] font-medium text-[#B0572B]">
                <FiShoppingBag />
                <span>{customer.totalOrders} Pesanan</span>
              </div>

              <Link
                to={`/customers/${customer.id}`}
                className="text-[12px] font-medium text-[#3A2619] underline decoration-[#3A2619]/40 underline-offset-2 hover:text-[#C47A24]"
              >
                Riwayat
              </Link>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="col-span-full rounded-[14px] border border-[#E7E0D8] bg-white p-8 text-center text-[13px] text-[#7C7772]">
            Data pelanggan tidak ditemukan.
          </div>
        )}
      </div>
    </section>
  );
}