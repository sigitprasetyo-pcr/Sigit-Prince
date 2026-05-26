import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import CustomerCard from "../components/CustomerCard";
import customers from "../data/Customers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const customerTiers = [...new Set(customers.map((customer) => customer.tier))];

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.phone.toLowerCase().includes(keyword) ||
      customer.tier.toLowerCase().includes(keyword);

    const matchTier = tierFilter === "all" || customer.tier === tierFilter;

    return matchSearch && matchTier;
  });

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / Customers"
        title="Customers"
        description="Kelola data pelanggan boutique, loyalty tier, dan riwayat pembelian."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="h-[34px] w-[170px] rounded-[10px] border-[#E7E0D8] bg-white text-[11px] text-[#4F4740]">
              <SelectValue placeholder="Filter tier" />
            </SelectTrigger>

            <SelectContent className="rounded-[12px] border-[#E7E0D8] bg-white">
              <SelectItem value="all" className="text-[12px]">
                Semua Tier
              </SelectItem>

              {customerTiers.map((tier) => (
                <SelectItem key={tier} value={tier} className="text-[12px]">
                  {tier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
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