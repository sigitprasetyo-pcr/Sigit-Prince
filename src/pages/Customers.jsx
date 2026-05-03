import { useState } from "react";
import { MdSearch } from "react-icons/md";
import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

export default function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.tier.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="p-6 md:p-12">
      <PageHeader
        breadcrumb="Patrons"
        title="Data Pelanggan"
        description="Kelola profil pelanggan, loyalty tier, dan riwayat pembelian private atelier."
      >
        <div className="relative w-full md:w-72">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-xl pointer-events-none" />

          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-white border border-neutral-200 py-3 pl-12 pr-4 outline-none focus:border-primary text-sm text-on-surface placeholder:text-neutral-400"
          />
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-8 luxury-shadow border border-neutral-50"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-sm font-bold mb-6">
              {customer.name
                .split(" ")
                .map((item) => item[0])
                .join("")
                .slice(0, 2)}
            </div>

            <h3 className="font-display text-headline-sm text-primary">
              {customer.name}
            </h3>

            <p className="text-sm text-neutral-500 mt-1">{customer.email}</p>

            <div className="flex items-center justify-between mt-8">
              <span className="label-caps text-[10px] text-secondary border-b border-secondary-container pb-1">
                {customer.tier}
              </span>

              <span className="font-display text-lg">{customer.spend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}