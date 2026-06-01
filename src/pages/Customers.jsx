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

  const totalMember = customers.filter(
    (customer) => customer.statusMember === "Member"
  ).length;

  const totalAktif = customers.filter(
    (customer) => customer.statusAktif === "Aktif"
  ).length;

  const totalPromoKlaim = customers.filter(
    (customer) => customer.statusPromo === "Sudah Klaim"
  ).length;

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / Customers"
        title="Customers"
        description="Kelola data pelanggan boutique, membership, transaksi, interaksi, dan promosi customer."
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

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          <p className="text-[11px] text-[#7C7772]">Total Customer</p>
          <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
            {customers.length}
          </h2>
        </div>

        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          <p className="text-[11px] text-[#7C7772]">Total Member</p>
          <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
            {totalMember}
          </h2>
        </div>

        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          <p className="text-[11px] text-[#7C7772]">Customer Aktif</p>
          <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
            {totalAktif}
          </h2>
        </div>

        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          <p className="text-[11px] text-[#7C7772]">Promo Diklaim</p>
          <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
            {totalPromoKlaim}
          </h2>
        </div>
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