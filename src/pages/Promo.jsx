import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGift,
  FiInstagram,
  FiMail,
  FiMessageCircle,
  FiShare2,
  FiTag,
  FiArrowRight,
  FiStar,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";

import customers from "../data/Customers";

const CAMPAIGN_GRADIENTS = [
  { from: "#5B4CE6", to: "#9B8CFF", glow: "rgba(91,76,230,0.4)" },
  { from: "#B8700A", to: "#E8C070", glow: "rgba(199,167,101,0.5)" },
  { from: "#1A7A4C", to: "#6DCCA0", glow: "rgba(46,155,95,0.4)" },
  { from: "#92174E", to: "#E882B0", glow: "rgba(177,90,124,0.4)" },
  { from: "#1C1410", to: "#7B5B45", glow: "rgba(58,38,25,0.5)" },
];

const PROMO_CARDS = [
  {
    icon: "🎀",
    label: "New Arrival",
    title: "Koleksi Terbaru",
    desc: "Promosikan produk terbaru boutique ke semua customer aktif.",
    color: "#C7A765",
    bg: "linear-gradient(135deg, #FFF9EE 0%, #FFF0CF 100%)",
    border: "#F0D99A",
  },
  {
    icon: "👑",
    label: "Member Day",
    title: "Promo Member Loyal",
    desc: "Reward eksklusif untuk member Gold & Platinum setiap bulan.",
    color: "#6D5DF6",
    bg: "linear-gradient(135deg, #F0ECFF 0%, #DDD5FF 100%)",
    border: "#B5A8FA",
  },
  {
    icon: "⚡",
    label: "Flash Sale",
    title: "Promo Kilat",
    desc: "Diskon cepat untuk stok tertentu dalam waktu terbatas.",
    color: "#E05252",
    bg: "linear-gradient(135deg, #FFF0F0 0%, #FFD9D9 100%)",
    border: "#FFAAAA",
  },
  {
    icon: "🎊",
    label: "Promo Lebaran",
    title: "Festival Boutique",
    desc: "Campaign spesial musiman untuk meningkatkan penjualan.",
    color: "#2E9B5F",
    bg: "linear-gradient(135deg, #EDFFF6 0%, #C4F0D9 100%)",
    border: "#86DDB4",
  },
];

export default function Promo() {
  const navigate = useNavigate();
  const [activePromo, setActivePromo] = useState(null);

  const campaignList = [...new Set(customers.map((item) => item.campaignDiikuti))];
  const sourceList = [...new Set(customers.map((item) => item.sumberUser))];

  const claimedPromo = customers.filter((item) => item.statusPromo === "Sudah Klaim").length;
  const subscription = customers.filter((item) => item.emailSmsSubscription === "Ya").length;
  const giveaway = customers.filter((item) => item.giveawayParticipation === "Ikut").length;

  const totalCustomers = customers.length;
  const claimRate = Math.round((claimedPromo / totalCustomers) * 100);

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ─── HERO HEADER ─── */}
        <div className="mb-7 overflow-hidden rounded-[24px] bg-gradient-to-r from-[#1C1410] via-[#3A2619] to-[#5C3D28] p-8 text-white shadow-[0_16px_40px_rgba(45,39,35,0.28)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#C7A765]/80">Marketing & Engagement</p>
              <h1 className="mt-2 text-[30px] font-black leading-tight">
                Promo & Campaign Boutique
              </h1>
              <p className="mt-2 text-[13px] leading-7 text-white/65">
                Kelola sumber user, campaign, giveaway, email/SMS subscription, dan status promo boutique.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px]">
                  <FiTag className="text-[#C7A765]" />
                  <span>{claimedPromo} Promo Diklaim</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px]">
                  <FiMail className="text-[#C7A765]" />
                  <span>{subscription} Subscriber</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px]">
                  <FiGift className="text-[#C7A765]" />
                  <span>{giveaway} Giveaway</span>
                </div>
              </div>
            </div>

            {/* Claim Rate Meter */}
            <div className="flex flex-col items-center rounded-[20px] bg-white/10 px-8 py-6 backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Claim Rate</p>
              <p className="mt-2 text-[52px] font-black leading-none text-[#C7A765]">{claimRate}%</p>
              <p className="mt-1 text-[11px] text-white/50">dari total customer</p>
              <div className="mt-3 h-2 w-[100px] overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-[#C7A765]"
                  style={{ width: `${claimRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── SUMMARY CARDS ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <PromoSummaryCard
            icon={<FiTag />}
            title="Promo Diklaim"
            value={claimedPromo}
            desc="Customer yang sudah menggunakan promo boutique."
            color="#C7A765"
            bg="#FFF9EE"
          />
          <PromoSummaryCard
            icon={<FiMail />}
            title="Subscription"
            value={subscription}
            desc="Customer yang menerima email atau SMS promo."
            color="#6D5DF6"
            bg="#EEE8FF"
          />
          <PromoSummaryCard
            icon={<FiGift />}
            title="Giveaway"
            value={giveaway}
            desc="Customer yang mengikuti giveaway boutique."
            color="#2E9B5F"
            bg="#EAF8EF"
          />
        </div>

        {/* ─── CAMPAIGN CARDS (clickable → /promo) ─── */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Active Campaigns</p>
              <h2 className="mt-1 text-[20px] font-semibold text-[#2D2723]">Campaign yang Sedang Berjalan</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {campaignList.map((campaign, index) => {
              const total = customers.filter((item) => item.campaignDiikuti === campaign).length;
              const pct = Math.round((total / totalCustomers) * 100);
              const g = CAMPAIGN_GRADIENTS[index % CAMPAIGN_GRADIENTS.length];

              return (
                <button
                  key={campaign}
                  onClick={() => navigate("/promo")}
                  className="group relative overflow-hidden rounded-[22px] text-left shadow-[0_8px_24px_rgba(45,39,35,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(45,39,35,0.18)]"
                  style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)` }}
                >
                  {/* Glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at center, ${g.glow} 0%, transparent 65%)` }}
                  />

                  {/* Arrow indicator */}
                  <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <FiArrowRight className="text-white text-[12px]" />
                  </div>

                  <div className="relative p-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">Campaign</p>
                    <h3 className="mt-2 min-h-[44px] text-[15px] font-bold leading-tight">{campaign}</h3>
                    <p className="mt-4 text-[38px] font-black leading-none">{total}</p>
                    <p className="mt-1 text-[11px] text-white/70">customer mengikuti</p>

                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-[10px] text-white/60">
                        <span>Share</span>
                        <span className="font-bold text-white">{pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full rounded-full bg-white/80" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── SOURCE + STRATEGY ─── */}
        <div className="mb-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Source Chart */}
          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Customer Source</p>
              <h3 className="mt-1 text-[20px] font-semibold text-[#2D2723]">Sumber Customer</h3>
              <p className="mt-1 text-[12px] text-[#7C7772]">Menampilkan asal customer mengetahui boutique.</p>
            </div>

            <div className="space-y-4">
              {sourceList.map((source, idx) => {
                const total = customers.filter((item) => item.sumberUser === source).length;
                const percent = Math.round((total / customers.length) * 100);
                const COLORS = ["#C7A765", "#6D5DF6", "#2E9B5F", "#E05252", "#2563EB"];
                const c = COLORS[idx % COLORS.length];

                return (
                  <div key={source}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <SourceIcon source={source} color={c} />
                        <span className="text-[13px] font-medium text-[#2D2723]">{source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-[#8B7E76]">{total}</span>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: c }}
                        >
                          {percent}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#F1ECE6]">
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

          {/* Promo Strategy Cards */}
          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Promo Strategy</p>
              <h3 className="mt-1 text-[20px] font-semibold text-[#2D2723]">Strategi Promo Boutique</h3>
              <p className="mt-1 text-[12px] text-[#7C7772]">
                Pilih strategi promo yang tepat untuk meningkatkan engagement customer.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROMO_CARDS.map((promo, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActivePromo(activePromo === i ? null : i);
                    navigate("/promo");
                  }}
                  className="group relative overflow-hidden rounded-[18px] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: promo.bg, border: `1px solid ${promo.border}` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[28px]">{promo.icon}</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: promo.color }}>
                        {promo.label}
                      </p>
                      <p className="mt-1 text-[13px] font-semibold text-[#2D2723]">{promo.title}</p>
                      <p className="mt-1 text-[11px] leading-5 text-[#7C7772]">{promo.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-medium" style={{ color: promo.color }}>
                    <span>Lihat Detail</span>
                    <FiArrowRight className="text-[11px]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── MARKETING DATA TABLE ─── */}
        <div className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="border-b border-[#E7E0D8] bg-gradient-to-r from-[#FFFDFC] to-[#FAF9F7] p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Marketing Data</p>
            <h3 className="mt-1 text-[22px] font-semibold text-[#2D2723]">
              Data Marketing & Engagement
            </h3>
            <p className="mt-1 text-[12px] text-[#7C7772]">
              Data sumber user, campaign, giveaway, subscription, dan status promo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] table-fixed text-center text-[12px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#F4EFEA] to-[#EEE7DF]">
                  {["ID", "Nama", "Sumber User", "Campaign", "Giveaway", "Email/SMS", "Status Promo"].map((h) => (
                    <th key={h} className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5E5148]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {customers.slice(0, 30).map((customer, idx) => (
                  <tr
                    key={customer.idCustomer}
                    className={`border-t border-[#EEE7DF] transition hover:bg-[#FBFAF8] ${
                      idx % 2 === 1 ? "bg-[#FDFCFB]" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] font-semibold text-[#C7A765]">
                        {customer.idCustomer}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C7A765] to-[#A8834D] text-[10px] font-bold text-white">
                          {customer.namaLengkap?.charAt(0) || "?"}
                        </div>
                        <span className="font-medium text-[#2D2723]">{customer.namaLengkap}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <SourceIcon source={customer.sumberUser} />
                        <span className="text-[#4F4740]">{customer.sumberUser}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-[#F4EFEA] px-2.5 py-1 text-[10px] font-medium text-[#3A2619]">
                        {customer.campaignDiikuti}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          customer.giveawayParticipation === "Ikut"
                            ? "bg-[#EAF8EF] text-[#2E9B5F]"
                            : "bg-[#F3F0EC] text-[#7C7772]"
                        }`}
                      >
                        {customer.giveawayParticipation}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          customer.emailSmsSubscription === "Ya"
                            ? "bg-[#EEE8FF] text-[#6D5DF6]"
                            : "bg-[#F3F0EC] text-[#7C7772]"
                        }`}
                      >
                        {customer.emailSmsSubscription}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium ${
                          customer.statusPromo === "Sudah Klaim"
                            ? "bg-[#EAF8EF] text-[#2E9B5F]"
                            : customer.statusPromo === "Belum Klaim"
                            ? "bg-[#FFF3DE] text-[#C47A24]"
                            : "bg-[#F3F0EC] text-[#7C7772]"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                        {customer.statusPromo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Sub Components ─── */
function PromoSummaryCard({ icon, title, value, desc, color, bg }) {
  return (
    <div
      className="group relative overflow-hidden rounded-[22px] border p-6 shadow-[0_8px_24px_rgba(45,39,35,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(45,39,35,0.12)]"
      style={{ backgroundColor: bg, borderColor: `${color}30` }}
    >
      <div
        className="absolute -right-8 -top-8 h-[100px] w-[100px] rounded-full opacity-20"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div
          className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] text-[22px] text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-[#8B7E76]">{title}</p>
        <h2 className="mt-1.5 text-[36px] font-black leading-none text-[#2D2723]">{value}</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#8B7E76]">{desc}</p>
      </div>
    </div>
  );
}

function SourceIcon({ source, color }) {
  if (source === "Instagram") return <FiInstagram style={{ color: color || "#C13584" }} />;
  if (source === "WhatsApp") return <FiMessageCircle style={{ color: color || "#2E9B5F" }} />;
  if (source === "Referral") return <FiShare2 style={{ color: color || "#5B4CE6" }} />;
  return <FiTag style={{ color: color || "#C47A24" }} />;
}