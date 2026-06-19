import { useState, useMemo } from "react";
import {
  FiShoppingBag,
  FiTrendingUp,
  FiDollarSign,
  FiCreditCard,
  FiSearch,
  FiFilter,
  FiX,
  FiPrinter,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTruck,
} from "react-icons/fi";
import customers from "../data/Customers";

/* ─── Helpers ─── */
const PAY_COLORS = {
  "Transfer Bank": { bg: "#DCEAFF", text: "#2563EB" },
  "E-Wallet": { bg: "#EEE8FF", text: "#6D5DF6" },
  COD: { bg: "#EAF8EF", text: "#2E9B5F" },
  QRIS: { bg: "#FFF3DE", text: "#C47A24" },
};

const STATUS_STYLE = {
  Terkirim: { bg: "#EAF8EF", text: "#2E9B5F", icon: <FiCheckCircle /> },
  Diproses: { bg: "#DCEAFF", text: "#2563EB", icon: <FiClock /> },
  "Siap Kirim": { bg: "#FFF3DE", text: "#C47A24", icon: <FiTruck /> },
};

function PayBadge({ method }) {
  const s = PAY_COLORS[method] || { bg: "#F3F0EC", text: "#7C7772" };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {method}
    </span>
  );
}

const PAGE_SIZE = 20;

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);

  const totalTransaksi = customers.reduce((total, item) => total + item.totalTransaksi, 0);
  const allMethods = [...new Set(customers.map((c) => c.metodePembayaran))];

  const totalSpend = customers.reduce((s, c) => {
    const n = parseInt((c.spend || "").replace(/[^0-9]/g, ""), 10) || 0;
    return s + n;
  }, 0);

  const formatRpShort = (v) => {
    if (v >= 1_000_000_000) return `Rp ${(v / 1_000_000_000).toFixed(1)}M`;
    if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toFixed(1)}jt`;
    if (v >= 1_000) return `Rp ${(v / 1_000).toFixed(0)}rb`;
    return `Rp ${v}`;
  };

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.namaLengkap.toLowerCase().includes(q) ||
        c.idCustomer.toLowerCase().includes(q) ||
        (c.produkItemDibeli || "").toLowerCase().includes(q);
      const matchMethod = filterMethod === "Semua" || c.metodePembayaran === filterMethod;
      return matchSearch && matchMethod;
    });
  }, [search, filterMethod]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = search || filterMethod !== "Semua";

  const clearFilters = () => {
    setSearch("");
    setFilterMethod("Semua");
    setPage(1);
  };

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ─── HEADER ─── */}
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">Data Transaksi · Hejmana Boutique</p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight text-[#2D2723]">Pesanan & Transaksi</h1>
            <p className="mt-1 text-[13px] text-[#8B7E76]">
              Mengelola riwayat pembelian, metode pembayaran, produk yang dibeli, dan tanggal transaksi.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-[#3A2619] to-[#5C3D28] px-5 py-2.5 text-[12px] font-medium text-white shadow-[0_8px_18px_rgba(45,39,35,0.22)] transition hover:shadow-[0_12px_24px_rgba(45,39,35,0.3)]"
          >
            <FiPrinter />
            Cetak Laporan
          </button>
        </div>

        {/* ─── STAT CARDS ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: <FiShoppingBag />,
              label: "Total Customer",
              value: customers.length.toLocaleString("id-ID"),
              sub: "Customer terdaftar di sistem",
              color: "#C7A765",
              trend: "+12%",
              trendUp: true,
            },
            {
              icon: <FiTrendingUp />,
              label: "Total Transaksi",
              value: totalTransaksi.toLocaleString("id-ID"),
              sub: "Total jumlah transaksi keseluruhan",
              color: "#2563EB",
              trend: "+18%",
              trendUp: true,
            },
            {
              icon: <FiCreditCard />,
              label: "Metode Bayar",
              value: allMethods.length,
              sub: `${allMethods.join(", ")}`,
              color: "#6D5DF6",
              trend: null,
            },
            {
              icon: <FiDollarSign />,
              label: "Total Revenue",
              value: formatRpShort(totalSpend),
              sub: "Akumulasi total belanja customer",
              color: "#2E9B5F",
              trend: "+22%",
              trendUp: true,
            },
          ].map((s) => (
            <OrderStatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ─── ORDERS TABLE ─── */}
        <div className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)]">

          {/* Table Header */}
          <div className="border-b border-[#EEE7DF] bg-gradient-to-r from-[#FFFDFC] to-[#FAF9F7] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Order Management</p>
                <h2 className="mt-1 text-[20px] font-bold text-[#2D2723]">
                  Data Transaksi Customer
                  <span className="ml-2 text-[14px] font-normal text-[#8B7E76]">
                    ({filtered.length.toLocaleString("id-ID")} hasil)
                  </span>
                </h2>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7E76] text-[13px]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Cari nama, ID, produk..."
                    className="h-[38px] w-[220px] rounded-[12px] border border-[#D8D0C8] bg-white pl-9 pr-4 text-[12px] text-[#2D2723] placeholder:text-[#B0A89C] outline-none transition focus:border-[#C7A765] focus:ring-2 focus:ring-[#C7A765]/20"
                  />
                </div>

                {/* Filter toggle */}
                <button
                  onClick={() => setShowFilter((v) => !v)}
                  className={`flex h-[38px] items-center gap-2 rounded-[12px] border px-4 text-[12px] font-medium transition ${
                    showFilter
                      ? "border-[#C7A765] bg-[#C7A765] text-white"
                      : "border-[#D8D0C8] bg-white text-[#4F4740] hover:border-[#C7A765]"
                  }`}
                >
                  <FiFilter className="text-[13px]" />
                  Filter
                </button>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex h-[38px] items-center gap-2 rounded-[12px] border border-[#FFD0D0] bg-[#FFF5F5] px-3 text-[11px] text-[#C0392B] transition hover:bg-[#FFE8E8]"
                  >
                    <FiX className="text-[13px]" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Filter Panel */}
            {showFilter && (
              <div className="mt-4 flex flex-wrap items-center gap-4 rounded-[14px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#A98467]">Metode Bayar:</p>
                <div className="flex flex-wrap gap-2">
                  {["Semua", ...allMethods].map((m) => (
                    <button
                      key={m}
                      onClick={() => { setFilterMethod(m); setPage(1); }}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                        filterMethod === m
                          ? "bg-[#2D2723] text-white"
                          : "border border-[#DDD5CC] bg-white text-[#4F4740] hover:border-[#C7A765]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-[12px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#F4EFEA] to-[#EEE7DF]">
                  {["ID Customer", "Nama", "Riwayat Pembelian", "Total Transaksi", "Metode Pembayaran", "Produk Dibeli", "Transaksi Terakhir"].map((h) => (
                    <th key={h} className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <FiPackage className="text-[40px] text-[#D0C8C0]" />
                        <p className="text-[14px] font-medium text-[#8B7E76]">Tidak ada data ditemukan</p>
                        <p className="text-[12px] text-[#B0A89C]">Coba ubah kata kunci atau filter yang digunakan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((customer, idx) => (
                    <tr
                      key={customer.idCustomer}
                      className={`border-t border-[#EEE7DF] transition-colors hover:bg-[#FBFAF8] ${
                        idx % 2 === 1 ? "bg-[#FDFCFB]" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-[11px] font-semibold text-[#C7A765]">
                          {customer.idCustomer}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C7A765] to-[#A8834D] text-[11px] font-bold text-white shadow-sm">
                            {customer.namaLengkap?.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="font-medium text-[#2D2723]">{customer.namaLengkap}</p>
                            <p className="text-[10px] text-[#A99B8E]">{customer.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-[#4F4740]">
                        <span className="line-clamp-2">{customer.riwayatPembelian}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="rounded-full bg-[#F4EFEA] px-2.5 py-1 text-[11px] font-bold text-[#3A2619]">
                          {customer.totalTransaksi}x
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <PayBadge method={customer.metodePembayaran} />
                      </td>

                      <td className="px-4 py-3.5 text-[#4F4740]">
                        <span className="line-clamp-2">{customer.produkItemDibeli}</span>
                      </td>

                      <td className="px-4 py-3.5 text-[#4F4740]">
                        {customer.tanggalTransaksiTerakhir}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#EEE7DF] bg-[#FFFDFC] px-6 py-4">
              <p className="text-[11px] text-[#8B7E76]">
                Menampilkan{" "}
                <span className="font-medium text-[#2D2723]">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
                </span>{" "}
                dari{" "}
                <span className="font-medium text-[#2D2723]">{filtered.length}</span>{" "}
                data
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-[#D8D0C8] text-[12px] text-[#4F4740] transition hover:border-[#C7A765] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ‹
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] text-[12px] font-medium transition ${
                        page === p
                          ? "bg-gradient-to-br from-[#C7A765] to-[#A8834D] text-white shadow"
                          : "border border-[#D8D0C8] text-[#4F4740] hover:border-[#C7A765]"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-[#D8D0C8] text-[12px] text-[#4F4740] transition hover:border-[#C7A765] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

/* ─── Stat Card ─── */
function OrderStatCard({ icon, label, value, sub, color, trend, trendUp }) {
  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_6px_20px_rgba(45,39,35,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(45,39,35,0.14)]">
      <div
        className="absolute -right-6 -top-6 h-[90px] w-[90px] rounded-full opacity-[0.08] transition-all duration-300 group-hover:opacity-[0.16]"
        style={{ backgroundColor: color }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] text-[21px] text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
              trendUp ? "bg-[#EAF8EF] text-[#2E9B5F]" : "bg-[#FFEDED] text-[#E05252]"
            }`}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </div>
        )}
      </div>
      <p className="mt-5 text-[11px] uppercase tracking-[0.15em] text-[#8B7E76]">{label}</p>
      <h2 className="mt-1.5 text-[28px] font-bold leading-none text-[#2D2723]">{value}</h2>
      {sub && <p className="mt-2 line-clamp-1 text-[11px] text-[#A99B8E]">{sub}</p>}
    </div>
  );
}