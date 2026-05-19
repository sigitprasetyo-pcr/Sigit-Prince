import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import CustomerCard from "../components/CustomerCard";
import customers from "../data/Customers";

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
        <SearchBar
          placeholder="Cari pelanggan..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
          />
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