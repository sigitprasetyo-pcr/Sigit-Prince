import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBarChart2,
  FiPrinter,
  FiShoppingBag,
  FiTag,
  FiTrendingUp,
  FiUsers,
  FiDownload,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";

import customers from "../data/Customers";

/* ─── helpers ─── */
const formatRp = (v) => {
  if (!v) return "Rp 0";
  return `Rp ${parseInt(v).toLocaleString("id-ID")}`;
};

export default function Reports() {
  const navigate = useNavigate();
  const transactionTableRef = useRef(null);
  const [searchQ, setSearchQ] = useState("");

  const totalTransaksi = customers.reduce((total, item) => total + item.totalTransaksi, 0);
  const totalPromo = customers.filter((item) => item.statusPromo === "Sudah Klaim").length;
  const totalCustomerAktif = customers.filter((item) => item.statusAktif === "Aktif").length;
  const totalKomplain = customers.filter((item) => item.riwayatKomplain !== "Tidak ada komplain").length;

  const campaignData = [...new Set(customers.map((item) => item.campaignDiikuti))].map((campaign) => ({
    label: campaign,
    total: customers.filter((item) => item.campaignDiikuti === campaign).length,
  }));

  const filteredTransactions = customers.filter((c) => {
    const q = searchQ.toLowerCase();
    return (
      !q ||
      c.namaLengkap.toLowerCase().includes(q) ||
      c.idCustomer.toLowerCase().includes(q) ||
      (c.metodePembayaran || "").toLowerCase().includes(q)
    );
  });

  const handlePrintTransaction = () => window.print();
  const handleScrollToTransaction = () => {
    transactionTableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const STAT_CONFIG = [
    {
      icon: <FiUsers />,
      title: "Customer Aktif",
      value: totalCustomerAktif,
      badge: "+12%",
      badgeUp: true,
      color: "#6D5DF6",
      bg: "#EEE8FF",
      desc: "Customer aktif terdaftar",
    },
    {
      icon: <FiShoppingBag />,
      title: "Total Transaksi",
      value: totalTransaksi,
      badge: "+18%",
      badgeUp: true,
      color: "#2563EB",
      bg: "#DCEAFF",
      desc: "Klik untuk melihat tabel transaksi",
      onClick: handleScrollToTransaction,
    },
    {
      icon: <FiTag />,
      title: "Promo Klaim",
      value: totalPromo,
      badge: "+9%",
      badgeUp: true,
      color: "#C7A765",
      bg: "#FFF9EE",
      desc: "Klik untuk masuk ke halaman Promo",
      onClick: () => navigate("/promo"),
    },
    {
      icon: <FiTrendingUp />,
      title: "Komplain",
      value: totalKomplain,
      badge: "-5%",
      badgeUp: false,
      color: "#E05252",
      bg: "#FFEDED",
      desc: "Komplain customer tercatat",
    },
  ];

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ─── HEADER ─── */}
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">Laporan CRM · Aurelia Boutique</p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight text-[#2D2723]">
              Laporan & Analitik Boutique
            </h1>
            <p className="mt-1 text-[13px] text-[#8B7E76]">
              Ringkasan performa customer, transaksi, promo, dan data lengkap boutique.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleScrollToTransaction}
              className="flex items-center gap-2 rounded-[12px] border border-[#E7E0D8] bg-white px-4 py-2.5 text-[12px] font-medium text-[#4F4740] shadow-sm transition hover:bg-[#FAF9F7] hover:border-[#C7A765]"
            >
              <FiSearch className="text-[13px]" />
              Lihat Transaksi
            </button>

            <button
              type="button"
              onClick={handlePrintTransaction}
              className="flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-[#3A2619] to-[#5C3D28] px-5 py-2.5 text-[12px] font-medium text-white shadow-[0_8px_18px_rgba(45,39,35,0.22)] transition hover:shadow-[0_12px_24px_rgba(45,39,35,0.3)]"
            >
              <FiPrinter />
              Cetak Laporan
            </button>
          </div>
        </div>

        {/* ─── STAT CARDS ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {STAT_CONFIG.map((s) => (
            <ReportStatCard key={s.title} {...s} />
          ))}
        </div>

        {/* ─── CHART + CAMPAIGN ─── */}
        <div className="mb-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">

          {/* Bar Chart (Performance) */}
          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Transaction Performance</p>
                <h3 className="mt-1 text-[20px] font-semibold text-[#2D2723]">
                  Ringkasan Performa Transaksi
                </h3>
                <p className="mt-1 text-[12px] text-[#7C7772]">
                  Gambaran transaksi dan performa customer CRM Boutique.
                </p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-[#C7A765] to-[#A8834D] px-3 py-1 text-[10px] font-medium text-white">
                Boutique Report
              </span>
            </div>

            {/* Custom Bar Chart */}
            <div className="relative h-[260px] overflow-hidden rounded-[18px] border border-[#EEE7DF] bg-[#FAF9F7] p-5">
              <div className="absolute inset-x-5 top-8 space-y-9">
                {[1, 2, 3, 4, 5].map((line) => (
                  <div key={line} className="border-t border-dashed border-[#D8CFC5]" />
                ))}
              </div>

              <div className="relative flex h-[210px] items-end gap-3">
                {[28, 40, 34, 58, 52, 75, 66, 88, 62, 78, 85, 100].map((height, index) => (
                  <div key={index} className="group flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex w-full items-end justify-center">
                      <div
                        className="w-full rounded-t-[8px] transition-all duration-300 group-hover:opacity-80"
                        style={{
                          height: `${height * 1.6}px`,
                          background: `linear-gradient(to top, #C7A765, #E8C98A)`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-[#9A8C80]">
                      {["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-[#FFF9EE] px-3 py-1 text-[10px] font-medium text-[#C47A24]">
                <span className="h-2 w-2 rounded-full bg-[#C7A765]" />
                Transaksi
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#EEE8FF] px-3 py-1 text-[10px] font-medium text-[#6D5DF6]">
                <span className="h-2 w-2 rounded-full bg-[#6D5DF6]" />
                Customer CRM
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#EAF8EF] px-3 py-1 text-[10px] font-medium text-[#2E9B5F]">
                <span className="h-2 w-2 rounded-full bg-[#2E9B5F]" />
                Promo
              </span>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#FFF3DE] to-[#FFE5B0] text-[#C47A24]">
                <FiBarChart2 />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#2D2723]">Campaign Performance</h3>
                <p className="text-[12px] text-[#7C7772]">
                  Ringkasan campaign yang diikuti customer boutique.
                </p>
              </div>
            </div>

            {/* Promo Click Banner */}
            <button
              onClick={() => navigate("/promo")}
              className="mb-5 flex w-full items-center justify-between rounded-[16px] bg-gradient-to-r from-[#3A2619] to-[#6B3F20] px-5 py-4 text-left transition hover:shadow-[0_8px_20px_rgba(45,39,35,0.25)]"
            >
              <div>
                <p className="text-[11px] text-white/60">Marketing Hub</p>
                <p className="mt-0.5 text-[14px] font-semibold text-white">Kelola Semua Promo →</p>
              </div>
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#C7A765]">
                <FiArrowRight className="text-white" />
              </div>
            </button>

            <div className="space-y-4">
              {campaignData.map((item, idx) => {
                const percent = Math.round((item.total / customers.length) * 100);
                const COLORS = ["#C7A765", "#6D5DF6", "#2E9B5F", "#E05252", "#2563EB"];
                const c = COLORS[idx % COLORS.length];
                return (
                  <div key={item.label} className="rounded-[14px] bg-[#FAF9F7] p-4">
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c }} />
                        <p className="text-[12px] font-medium text-[#2D2723]">{item.label}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#8B7E76]">{item.total} customer</span>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: c }}>
                          {percent}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#E7E0D8]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%`, backgroundColor: c }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── TRANSACTION TABLE ─── */}
        <div
          ref={transactionTableRef}
          className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)]"
        >
          <div className="border-b border-[#E7E0D8] bg-gradient-to-r from-[#FFFDFC] to-[#FAF9F7] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Transaction Report</p>
                <h3 className="mt-1 text-[22px] font-semibold text-[#2D2723]">
                  Tabel Transaksi Customer
                </h3>
                <p className="mt-1 text-[12px] text-[#7C7772]">
                  Data transaksi ini dapat digunakan sebagai laporan atau dicetak.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search bar */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7E76] text-[13px]" />
                  <input
                    type="text"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    placeholder="Cari nama atau ID..."
                    className="h-[38px] w-[200px] rounded-[12px] border border-[#D8D0C8] bg-white pl-9 pr-4 text-[12px] text-[#2D2723] placeholder:text-[#B0A89C] outline-none transition focus:border-[#C7A765] focus:ring-2 focus:ring-[#C7A765]/20"
                  />
                </div>

                <button
                  type="button"
                  onClick={handlePrintTransaction}
                  className="flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-[#3A2619] to-[#5C3D28] px-4 py-2.5 text-[12px] font-medium text-white shadow-[0_6px_14px_rgba(45,39,35,0.22)] transition hover:shadow-[0_10px_20px_rgba(45,39,35,0.3)]"
                >
                  <FiDownload />
                  Cetak
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] table-fixed text-left text-[12px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#F4EFEA] to-[#EEE7DF]">
                  <th className="w-[120px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">ID</th>
                  <th className="w-[190px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">Nama Customer</th>
                  <th className="w-[230px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">Produk Dibeli</th>
                  <th className="w-[130px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">Transaksi</th>
                  <th className="w-[160px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">Metode Bayar</th>
                  <th className="w-[170px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">Tanggal Terakhir</th>
                  <th className="w-[140px] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">Total Belanja</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((customer, idx) => (
                  <tr
                    key={customer.idCustomer}
                    className={`border-t border-[#EEE7DF] transition hover:bg-[#FBFAF8] ${
                      idx % 2 === 0 ? "" : "bg-[#FDFCFB]"
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] font-semibold text-[#C7A765]">
                        {customer.idCustomer}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C7A765] to-[#A8834D] text-[10px] font-bold text-white">
                          {customer.namaLengkap?.charAt(0) || "?"}
                        </div>
                        <span className="font-medium text-[#2D2723]">{customer.namaLengkap}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-[#4F4740]">{customer.produkItemDibeli}</td>

                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-[#F4EFEA] px-2.5 py-1 text-[11px] font-semibold text-[#3A2619]">
                        {customer.totalTransaksi}x
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <PayBadge method={customer.metodePembayaran} />
                    </td>

                    <td className="px-4 py-3.5 text-[#4F4740]">{customer.tanggalTransaksiTerakhir}</td>

                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-[#3A2619]">{customer.spend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between border-t border-[#EEE7DF] bg-[#FAF9F7] px-6 py-4">
            <p className="text-[11px] text-[#8B7E76]">
              Menampilkan <span className="font-semibold text-[#2D2723]">{filteredTransactions.length}</span> dari{" "}
              <span className="font-semibold text-[#2D2723]">{customers.length}</span> customer
            </p>
            <button
              onClick={handlePrintTransaction}
              className="flex items-center gap-1.5 text-[11px] font-medium text-[#C7A765] hover:underline"
            >
              <FiPrinter className="text-[12px]" />
              Cetak Semua
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── PayBadge ─── */
function PayBadge({ method }) {
  const map = {
    "Transfer Bank": { bg: "#DCEAFF", text: "#2563EB" },
    "E-Wallet": { bg: "#EEE8FF", text: "#6D5DF6" },
    COD: { bg: "#EAF8EF", text: "#2E9B5F" },
    QRIS: { bg: "#FFF3DE", text: "#C47A24" },
  };
  const s = map[method] || { bg: "#F3F0EC", text: "#7C7772" };
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {method}
    </span>
  );
}

/* ─── Report Stat Card ─── */
function ReportStatCard({ icon, title, value, badge, badgeUp, color, bg, desc, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`group relative overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white p-6 text-left shadow-[0_8px_24px_rgba(45,39,35,0.07)] transition-all duration-300 ${
        onClick
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(45,39,35,0.14)]"
          : "cursor-default"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-[100px] w-[100px] rounded-full opacity-[0.07] transition-all duration-300 group-hover:opacity-[0.14]"
        style={{ backgroundColor: color }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-[46px] w-[46px] items-center justify-center rounded-[15px] text-[20px] text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            badgeUp ? "bg-[#EAF8EF] text-[#2E9B5F]" : "bg-[#FFEDED] text-[#E05252]"
          }`}
        >
          {badge}
        </span>
      </div>

      <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-[#8B7E76]">{title}</p>
      <h2 className="mt-1.5 text-[32px] font-bold leading-none text-[#2D2723]">{value}</h2>
      {desc && (
        <p className="mt-2 text-[10px] text-[#A99B8E]">
          {onClick ? `${desc} →` : desc}
        </p>
      )}
    </button>
  );
}