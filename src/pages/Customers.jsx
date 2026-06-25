import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import CustomerCard from "../components/CustomerCard";
import customers from "../data/Customers";
import { useTheme } from "../context/ThemeContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const TIER_DISPLAY = [
  {
    key: "Regular Member",
    icon: "👤",
    gradient: "linear-gradient(135deg, #6B6057, #9A8C80)",
    glow: "rgba(154,140,128,0.35)",
    desc: "Customer baru bergabung",
  },
  {
    key: "Silver Member",
    icon: "⭐",
    gradient: "linear-gradient(135deg, #3A5070, #94A3B8)",
    glow: "rgba(148,163,184,0.35)",
    desc: "Belanja rutin & loyal",
  },
  {
    key: "Gold Member",
    icon: "🏅",
    gradient: "linear-gradient(135deg, #8A5A10, #E8C070)",
    glow: "rgba(199,167,101,0.5)",
    desc: "Pelanggan setia emas",
  },
  {
    key: "Platinum Member",
    icon: "💎",
    gradient: "linear-gradient(135deg, #4B1FA0, #A78BFA)",
    glow: "rgba(109,93,246,0.5)",
    desc: "VIP eksklusif boutique",
  },
];

export default function Customers() {
  const { dark } = useTheme();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const customerTiers = [...new Set(customers.map((c) => c.tier))];

  const filteredCustomers = customers.filter((c) => {
    const keyword = search.toLowerCase();
    const matchSearch =
      c.idCustomer.toLowerCase().includes(keyword) ||
      c.namaLengkap.toLowerCase().includes(keyword) ||
      c.username.toLowerCase().includes(keyword) ||
      c.email.toLowerCase().includes(keyword) ||
      c.nomorHp.toLowerCase().includes(keyword) ||
      c.kotaProvinsi.toLowerCase().includes(keyword) ||
      c.tier.toLowerCase().includes(keyword) ||
      c.produkItemDibeli.toLowerCase().includes(keyword) ||
      c.campaignDiikuti.toLowerCase().includes(keyword);
    const matchTier = tierFilter === "all" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const bg = dark ? "bg-[#110E0B]" : "bg-[#F7F5F2]";
  const card = dark ? "bg-[#1C1610] border-[rgba(199,167,101,0.12)]" : "bg-white border-[#E7E0D8]";
  const txt = dark ? "text-[#E8E0D5]" : "text-[#2D2723]";
  const txt2 = dark ? "text-[#8B7E76]" : "text-[#7C7772]";

  return (
    <section className={`min-h-[calc(100vh-54px)] px-8 py-6 transition-colors duration-300 ${bg}`}>
      <PageHeader
        breadcrumb="Aurelia / Customers"
        title="Customers"
        description="Kelola data pelanggan boutique, detail kontak, transaksi, dan status membership customer."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="h-[34px] w-[180px] rounded-[10px] border-[#E7E0D8] bg-white text-[11px] text-[#4F4740]">
              <SelectValue placeholder="Filter membership" />
            </SelectTrigger>
            <SelectContent className="rounded-[12px] border-[#E7E0D8] bg-white">
              <SelectItem value="all" className="text-[12px]">Semua Membership</SelectItem>
              {customerTiers.map((tier) => (
                <SelectItem key={tier} value={tier} className="text-[12px]">{tier}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      {/* ─── TIER GUIDE CARDS ─── */}
      <div className={`mb-6 rounded-[22px] border p-6 shadow-sm transition-colors ${card}`}>
        <div className="mb-5">
          <p className={`text-[10px] uppercase tracking-[0.2em] ${dark ? "text-[#C7A765]/70" : "text-[#A98467]"}`}>
            Membership Color Guide
          </p>
          <h2 className={`mt-1 text-[20px] font-semibold ${txt}`}>Level Member Boutique</h2>
          <p className={`mt-1 text-[12px] ${txt2}`}>
            Warna dan ikon ini digunakan untuk membedakan level customer pada CRM Boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TIER_DISPLAY.map((tier) => {
            const count = customers.filter((c) => c.tier === tier.key).length;
            const pct = Math.round((count / customers.length) * 100);
            const isActive = tierFilter === tier.key;

            return (
              <button
                key={tier.key}
                onClick={() => setTierFilter(isActive ? "all" : tier.key)}
                className={`group relative overflow-hidden rounded-[18px] p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                  isActive
                    ? "ring-2 ring-offset-1 shadow-lg"
                    : "hover:shadow-md"
                }`}
                style={{
                  background: tier.gradient,
                  ringColor: "rgba(199,167,101,0.6)",
                  boxShadow: isActive ? `0 12px 32px ${tier.glow}` : `0 4px 16px rgba(0,0,0,0.08)`,
                }}
              >
                {/* Glow */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-[80px] w-[80px] rounded-full opacity-25 blur-xl"
                  style={{ backgroundColor: "#fff" }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[32px]">{tier.icon}</span>
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white">
                      {count} customer
                    </span>
                  </div>

                  <h3 className="mt-3 text-[15px] font-bold text-white">
                    {tier.key.replace(" Member", "")} Member
                  </h3>
                  <p className="mt-1 text-[11px] text-white/70">{tier.desc}</p>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] text-white/60">
                      <span>Distribusi</span>
                      <span className="font-bold text-white">{pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white/80"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── RESULTS HEADER ─── */}
      <div className="mb-4 flex items-center justify-between">
        <p className={`text-[12px] ${txt2}`}>
          Menampilkan{" "}
          <span className={`font-semibold ${txt}`}>{filteredCustomers.length}</span>{" "}
          data pelanggan
          {tierFilter !== "all" && (
            <span className={`ml-1.5 ${dark ? "text-[#C7A765]/80" : "text-[#C7A765]"}`}>
              · {tierFilter}
            </span>
          )}
        </p>
        <p className={`text-[11px] ${dark ? "text-[#6B5E50]" : "text-[#A98467]"}`}>
          Total: {customers.length} customer
        </p>
      </div>

      {/* ─── CUSTOMER GRID ─── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id || customer.idCustomer} customer={customer} />
        ))}

        {filteredCustomers.length === 0 && (
          <div
            className={`col-span-full rounded-[18px] border p-10 text-center ${card}`}
          >
            <p className="text-[32px]">🔍</p>
            <p className={`mt-3 text-[15px] font-medium ${txt}`}>Tidak ada pelanggan ditemukan</p>
            <p className={`mt-1 text-[12px] ${txt2}`}>Coba ubah kata kunci atau filter tier yang digunakan.</p>
          </div>
        )}
      </div>
    </section>
  );
}