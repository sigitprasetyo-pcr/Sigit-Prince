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

const tierStyles = {
  "Regular Member": "bg-[#F3F0EC] text-[#7C5F46] border-[#E7E0D8]",
  "Silver Member": "bg-[#EEF2F6] text-[#667085] border-[#D7DEE8]",
  "Gold Member": "bg-[#FFF3DE] text-[#C47A24] border-[#F2D4A7]",
  "Platinum Member": "bg-[#EEE8FF] text-[#6D3FD1] border-[#D9CCFF]",
};

export default function Customers() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const customerTiers = [...new Set(customers.map((customer) => customer.tier))];

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      customer.idCustomer.toLowerCase().includes(keyword) ||
      customer.namaLengkap.toLowerCase().includes(keyword) ||
      customer.username.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.nomorHp.toLowerCase().includes(keyword) ||
      customer.kotaProvinsi.toLowerCase().includes(keyword) ||
      customer.tier.toLowerCase().includes(keyword) ||
      customer.produkItemDibeli.toLowerCase().includes(keyword) ||
      customer.campaignDiikuti.toLowerCase().includes(keyword);

    const matchTier = tierFilter === "all" || customer.tier === tierFilter;

    return matchSearch && matchTier;
  });

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / Customers"
        title="Customers"
        description="Kelola data pelanggan boutique, detail kontak, transaksi, dan status membership customer."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="h-[34px] w-[180px] rounded-[10px] border-[#E7E0D8] bg-white text-[11px] text-[#4F4740]">
              <SelectValue placeholder="Filter membership" />
            </SelectTrigger>

            <SelectContent className="rounded-[12px] border-[#E7E0D8] bg-white">
              <SelectItem value="all" className="text-[12px]">
                Semua Membership
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

      <div className="mb-6 rounded-[18px] border border-[#E7E0D8] bg-white p-5 shadow-[0_8px_20px_rgba(45,39,35,0.05)]">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
            Membership Color Guide
          </p>
          <h2 className="mt-1 text-[18px] font-medium text-[#2D2723]">
            Warna Level Member
          </h2>
          <p className="mt-1 text-[12px] text-[#7C7772]">
            Warna ini digunakan untuk membedakan level customer pada CRM
            Boutique.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {["Regular Member", "Silver Member", "Gold Member", "Platinum Member"].map(
            (tier) => (
              <span
                key={tier}
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.12em] ${
                  tierStyles[tier] || "bg-[#F3F0EC] text-[#7C7772]"
                }`}
              >
                {tier}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-[12px] text-[#7C7772]">
          Menampilkan{" "}
          <span className="font-medium text-[#2D2723]">
            {filteredCustomers.length}
          </span>{" "}
          data pelanggan
        </p>

        <p className="text-[11px] text-[#A98467]">
          Tema: Hejmana Boutique CRM
        </p>
      </div>

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