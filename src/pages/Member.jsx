import { useState, useMemo, useEffect } from "react";
import {
  FiAward,
  FiCheckCircle,
  FiGift,
  FiSearch,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiFilter,
  FiX,
  FiClock,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import customersData from "../data/Customers";
import { supabase } from "../../lib/supabase";

/* ============================================================
   CONSTANTS
============================================================ */
const TIERS = ["Regular Member", "Silver Member", "Gold Member", "Platinum Member"];

const TIER_CONFIG = {
  "Regular Member": {
    icon: <FiUsers />,
    gradient: "linear-gradient(135deg, #B8A99D 0%, #D4C5BB 100%)",
    bg: "bg-[#F3F0EC]",
    text: "text-[#7C7772]",
    bar: "#B8A99D",
    barBg: "#EAE3D9",
    badge: "bg-[#F3F0EC] text-[#7C7772]",
    glow: "rgba(184,169,157,0.3)",
    desc: "Customer baru yang belum masuk program loyalitas utama.",
    perks: ["Akses katalog", "Newsletter promo", "Diskon ulang tahun 5%"],
    minSpend: "Rp 0",
    maxSpend: "Rp 500K",
  },
  "Silver Member": {
    icon: <FiStar />,
    gradient: "linear-gradient(135deg, #94A3B8 0%, #CBD5E1 100%)",
    bg: "bg-[#EEF2F6]",
    text: "text-[#667085]",
    bar: "#94A3B8",
    barBg: "#D1DCE8",
    badge: "bg-[#EEF2F6] text-[#667085]",
    glow: "rgba(148,163,184,0.3)",
    desc: "Customer aktif berbelanja, cocok menerima promo ringan.",
    perks: ["Semua benefit Regular", "Diskon 10% every purchase", "Early access sale", "Free ongkir 2x/bulan"],
    minSpend: "Rp 500K",
    maxSpend: "Rp 2JT",
  },
  "Gold Member": {
    icon: <FiAward />,
    gradient: "linear-gradient(135deg, #C47A24 0%, #E8B96A 100%)",
    bg: "bg-[#FFF3DE]",
    text: "text-[#C47A24]",
    bar: "#D99A42",
    barBg: "#F5E6CB",
    badge: "bg-[#FFF3DE] text-[#C47A24]",
    glow: "rgba(199,167,101,0.4)",
    desc: "Customer loyal dengan transaksi cukup sering.",
    perks: ["Semua benefit Silver", "Diskon 15% every purchase", "Gift eksklusif", "Priority CS", "Free ongkir unlimited"],
    minSpend: "Rp 2JT",
    maxSpend: "Rp 5JT",
  },
  "Platinum Member": {
    icon: <FiGift />,
    gradient: "linear-gradient(135deg, #6D3FD1 0%, #A78BFA 100%)",
    bg: "bg-[#EEE8FF]",
    text: "text-[#6D3FD1]",
    bar: "#6D5DF6",
    barBg: "#D9D0FA",
    badge: "bg-[#EEE8FF] text-[#6D3FD1]",
    glow: "rgba(109,93,246,0.4)",
    desc: "Customer prioritas dengan nilai transaksi sangat tinggi.",
    perks: ["Semua benefit Gold", "Diskon 20% every purchase", "Personal stylist", "VIP event invite", "Hadiah ulang tahun spesial"],
    minSpend: "Rp 5JT+",
    maxSpend: "Tak terbatas",
  },
};

const PAGE_SIZE = 15;

/* ============================================================
   DONUT CHART SVG
============================================================ */
function DonutChart({ data }) {
  const cx = 100;
  const cy = 100;
  const r = 72;
  const inner = 48;

  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -90;

  const slices = data.map((d) => {
    const pct = d.value / total;
    const sweep = pct * 360;
    const startAngle = angle;
    const endAngle = angle + sweep;
    angle += sweep;

    const toRad = (deg) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + inner * Math.cos(toRad(startAngle));
    const iy1 = cy + inner * Math.sin(toRad(startAngle));
    const ix2 = cx + inner * Math.cos(toRad(endAngle));
    const iy2 = cy + inner * Math.sin(toRad(endAngle));
    const large = sweep > 180 ? 1 : 0;

    const path = [
      `M ${x1} ${y1}`,
      `A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");

    return { path, color: d.color, label: d.label, value: d.value, pct: Math.round(pct * 100) };
  });

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative shrink-0">
        <svg viewBox="0 0 200 200" className="h-[190px] w-[190px]">
          <defs>
            {slices.map((s, i) => (
              <filter key={i} id={`shadow-${i}`}>
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={s.color} floodOpacity="0.4" />
              </filter>
            ))}
          </defs>
          {slices.map((s, i) => (
            <path
              key={i}
              d={s.path}
              fill={s.color}
              className="transition-all duration-200 hover:opacity-80"
              style={{ filter: `url(#shadow-${i})` }}
            />
          ))}
          <circle cx={cx} cy={cy} r={inner - 2} fill="white" />
          <text x={cx} y={cy - 6} textAnchor="middle" fill="#2D2723" fontSize="20" fontWeight="600" fontFamily="Manrope, sans-serif">
            {total}
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="#8B7E76" fontSize="9" fontFamily="Manrope, sans-serif">
            Total Member
          </text>
        </svg>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <div className="flex flex-1 items-center justify-between">
              <span className="text-[12px] text-[#4F4740]">{s.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-[80px] overflow-hidden rounded-full bg-[#F1ECE6]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                  />
                </div>
                <span className="w-[32px] text-right text-[11px] font-medium text-[#2D2723]">{s.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */
function StatCard({ icon, label, value, sub, accent = "#C7A765", badge }) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(45,39,35,0.12)]">
      <div
        className="absolute -right-8 -top-8 h-[100px] w-[100px] rounded-full opacity-[0.07] transition-all duration-300 group-hover:opacity-[0.12]"
        style={{ backgroundColor: accent }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] text-[22px] text-white shadow-md"
          style={{ backgroundColor: accent }}
        >
          {icon}
        </div>
        {badge && (
          <span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-[10px] font-medium text-[#2E9B5F]">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-[#8B7E76]">{label}</p>
      <h2 className="mt-1.5 text-[32px] font-semibold leading-none text-[#2D2723]">{value}</h2>
      {sub && <p className="mt-2 text-[11px] leading-5 text-[#A99B8E]">{sub}</p>}
    </div>
  );
}

/* ============================================================
   TIER CARD
============================================================ */
function TierCard({ level, config, total, percent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_10px_28px_rgba(45,39,35,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(45,39,35,0.14)]"
    >
      {/* Gradient top accent */}
      <div
        className="h-[5px] w-full transition-all duration-500"
        style={{ background: config.gradient }}
      />

      {/* Glow backdrop on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at top right, ${config.glow} 0%, transparent 65%)` }}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center rounded-[18px] text-[22px] shadow-sm transition-transform duration-300 group-hover:scale-110 ${config.bg} ${config.text}`}
          >
            {config.icon}
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#A98467]">Share</span>
            <p className="mt-0.5 text-[26px] font-semibold leading-none text-[#2D2723]">{percent}%</p>
          </div>
        </div>

        <h3 className="mt-5 text-[16px] font-medium text-[#2D2723]">{level}</h3>
        <p className="mt-1 text-[32px] font-bold leading-none text-[#2D2723]">{total}</p>
        <p className="mt-1 text-[11px] text-[#8B7E76]">member terdaftar</p>

        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: config.barBg }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${percent}%`, backgroundColor: config.bar }}
            />
          </div>
        </div>

        <p className="mt-4 text-[11px] leading-6 text-[#7C7772]">{config.desc}</p>

        {/* Perks list */}
        <div
          className={`mt-4 overflow-hidden transition-all duration-500 ${hovered ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <hr className="my-3 border-[#EEE7DF]" />
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#A98467]">Benefit</p>
          <ul className="space-y-1">
            {config.perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-[#4F4740]">
                <FiCheckCircle className="shrink-0 text-[#2E9B5F]" />
                {perk}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#FAF9F7] px-3 py-2">
            <span className="text-[10px] text-[#8B7E76]">Min. Spend</span>
            <span className="text-[11px] font-medium text-[#2D2723]">{config.minSpend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TIER BADGE
============================================================ */
function TierBadge({ tier }) {
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG["Regular Member"];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${cfg.badge}`}>
      <span className="text-[9px]">{cfg.icon}</span>
      {tier?.replace(" Member", "") || "-"}
    </span>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */
function StatusBadge({ value }) {
  const isActive = value === "Aktif";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
        isActive ? "bg-[#EAF8EF] text-[#2E9B5F]" : "bg-[#FFE0E0] text-[#C0392B]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#2E9B5F]" : "bg-[#C0392B]"}`} />
      {value}
    </span>
  );
}

/* ============================================================
   LOYALTY JOURNEY
============================================================ */
function LoyaltyJourney() {
  const steps = [
    { tier: "Regular Member", label: "Regular", color: "#B8A99D", spend: "Rp 0 – 500K" },
    { tier: "Silver Member", label: "Silver", color: "#94A3B8", spend: "Rp 500K – 2JT" },
    { tier: "Gold Member", label: "Gold", color: "#D99A42", spend: "Rp 2JT – 5JT" },
    { tier: "Platinum Member", label: "Platinum", color: "#6D5DF6", spend: "Rp 5JT+" },
  ];

  return (
    <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.06)]">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Loyalty Journey</p>
      <h3 className="mt-2 text-[18px] font-medium text-[#2D2723]">Perjalanan Tier Member</h3>
      <p className="mt-1 text-[12px] text-[#7C7772]">
        Customer naik tier berdasarkan total akumulasi belanja dalam satu tahun.
      </p>

      <div className="mt-6 flex items-center">
        {steps.map((step, i) => (
          <div key={step.tier} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center">
              {i > 0 && (
                <div
                  className="h-[3px] flex-1 rounded-l-full"
                  style={{ backgroundColor: steps[i - 1].color }}
                />
              )}
              <div
                className="relative z-10 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-white shadow-lg text-[18px]"
                style={{ backgroundColor: step.color }}
              >
                {TIER_CONFIG[step.tier].icon}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="h-[3px] flex-1 rounded-r-full opacity-30"
                  style={{ backgroundColor: step.color }}
                />
              )}
            </div>
            <p className="mt-3 text-[11px] font-semibold text-[#2D2723]">{step.label}</p>
            <p className="mt-0.5 text-center text-[10px] text-[#8B7E76]">{step.spend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */
export default function Member() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [supabaseUsers, setSupabaseUsers] = useState([]);

  useEffect(() => {
    async function fetchSupabaseUsers() {
      const { data, error } = await supabase.from("users").select("*");
      if (data && !error) {
        const mapped = data
          .filter((u) => u.role !== "admin")
          .map((u) => ({
            idCustomer: `SPB${String(u.id).padStart(3, "0")}`,
            namaLengkap: u.name || "Member Baru",
            email: u.email,
            tier: "Regular Member",
            tanggalDaftar: new Date(u.created_at || Date.now()).toLocaleDateString("id-ID"),
            referralCode: "-",
            metodePembayaran: "-",
            totalTransaksi: 0,
            statusAktif: "Aktif",
            statusMember: "Non Member",
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "M")}&background=C7A765&color=fff`,
          }));
        setSupabaseUsers(mapped);
      }
    }
    fetchSupabaseUsers();
  }, []);

  const customers = useMemo(() => [...supabaseUsers, ...customersData], [supabaseUsers]);

  /* -------- derived stats -------- */
  const memberList = useMemo(
    () => customers.filter((c) => c.statusMember === "Member"),
    [customers]
  );

  const totalMember = memberList.length;
  const activeMember = memberList.filter((c) => c.statusAktif === "Aktif").length;
  const inactiveMember = totalMember - activeMember;
  const referralActive = memberList.filter((c) => c.referralCode !== "-").length;

  const tierCounts = useMemo(() => {
    return TIERS.map((t) => ({
      label: t,
      value: customers.filter((c) => c.tier === t).length,
    }));
  }, [customers]);

  const donutData = [
    { label: "Regular", value: tierCounts[0].value, color: "#B8A99D" },
    { label: "Silver", value: tierCounts[1].value, color: "#94A3B8" },
    { label: "Gold", value: tierCounts[2].value, color: "#D99A42" },
    { label: "Platinum", value: tierCounts[3].value, color: "#6D5DF6" },
  ];

  /* -------- filtered table data -------- */
  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.namaLengkap.toLowerCase().includes(q) ||
        c.idCustomer.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.referralCode || "").toLowerCase().includes(q);
      const matchTier =
        filterTier === "Semua" || c.tier === filterTier;
      const matchStatus =
        filterStatus === "Semua" || c.statusAktif === filterStatus;
      return matchSearch && matchTier && matchStatus;
    });
  }, [search, filterTier, filterStatus, customers]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterTier = (tier) => {
    setFilterTier(tier);
    setPage(1);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setFilterTier("Semua");
    setFilterStatus("Semua");
    setPage(1);
  };

  const hasFilters = search || filterTier !== "Semua" || filterStatus !== "Semua";

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ── PAGE HEADER ── */}
        <PageHeader
          breadcrumb="DATA AKUN / MEMBER"
          title="Halaman Member Boutique"
          description="Kelola dan pantau seluruh member aktif boutique — tier loyalitas, referral, serta status keanggotaan secara menyeluruh."
        />

        {/* ── STAT CARDS ── */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<FiUsers />}
            label="Total Member"
            value={totalMember.toLocaleString("id-ID")}
            sub="Customer terdaftar sebagai member boutique"
            accent="#C7A765"
            badge="CRM"
          />
          <StatCard
            icon={<FiCheckCircle />}
            label="Member Aktif"
            value={activeMember.toLocaleString("id-ID")}
            sub={`${Math.round((activeMember / totalMember) * 100)}% dari total member`}
            accent="#2E9B5F"
          />
          <StatCard
            icon={<FiShield />}
            label="Member Tidak Aktif"
            value={inactiveMember.toLocaleString("id-ID")}
            sub="Perlu reaktivasi atau follow-up khusus"
            accent="#E05252"
          />
          <StatCard
            icon={<FiTrendingUp />}
            label="Referral Aktif"
            value={referralActive.toLocaleString("id-ID")}
            sub="Member dengan kode referral untuk promosi"
            accent="#6D5DF6"
          />
        </div>

        {/* ── TIER CARDS ── */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((level) => {
            const total = customers.filter((c) => c.tier === level).length;
            const percent = Math.round((total / customers.length) * 100);
            return (
              <TierCard
                key={level}
                level={level}
                config={TIER_CONFIG[level]}
                total={total}
                percent={percent}
              />
            );
          })}
        </div>

        {/* ── DISTRIBUTION + JOURNEY ── */}
        <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.1fr]">
          {/* Donut chart */}
          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.06)]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Distribusi Tier</p>
            <h3 className="mb-5 mt-2 text-[18px] font-medium text-[#2D2723]">
              Distribusi Member per Tier
            </h3>
            <DonutChart data={donutData} />
          </div>

          {/* Loyalty Journey */}
          <LoyaltyJourney />
        </div>

        {/* ── MEMBER TABLE ── */}
        <div className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_8px_24px_rgba(45,39,35,0.06)]">

          {/* Table Header */}
          <div className="border-b border-[#EEE7DF] bg-[#FFFDFC] p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">Member Data</p>
                <h3 className="mt-1 text-[18px] font-medium text-[#2D2723]">
                  Data Akun Member
                  <span className="ml-2 text-[13px] font-normal text-[#8B7E76]">
                    ({filtered.length.toLocaleString("id-ID")} hasil)
                  </span>
                </h3>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7E76] text-[13px]" />
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Cari nama, ID, email..."
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

                {/* Clear filters */}
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

            {/* Filter panel */}
            {showFilter && (
              <div className="mt-4 flex flex-wrap items-center gap-4 rounded-[14px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
                {/* Tier filter */}
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#A98467]">Tier</p>
                  <div className="flex flex-wrap gap-2">
                    {["Semua", ...TIERS].map((t) => (
                      <button
                        key={t}
                        onClick={() => handleFilterTier(t)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                          filterTier === t
                            ? "bg-[#2D2723] text-white"
                            : "bg-white border border-[#DDD5CC] text-[#4F4740] hover:border-[#C7A765]"
                        }`}
                      >
                        {t === "Semua" ? "Semua Tier" : t.replace(" Member", "")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status filter */}
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#A98467]">Status</p>
                  <div className="flex gap-2">
                    {["Semua", "Aktif", "Tidak Aktif"].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleFilterStatus(s)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                          filterStatus === s
                            ? "bg-[#2D2723] text-white"
                            : "bg-white border border-[#DDD5CC] text-[#4F4740] hover:border-[#C7A765]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1020px] table-fixed text-[12px]">
              <thead className="bg-[#F4EFEA] text-[#5E5148]">
                <tr>
                  <th className="w-[120px] px-5 py-4 text-left">ID</th>
                  <th className="w-[190px] px-5 py-4 text-left">Nama Member</th>
                  <th className="w-[130px] px-5 py-4 text-center">Tier</th>
                  <th className="w-[130px] px-5 py-4 text-center">Tanggal Daftar</th>
                  <th className="w-[140px] px-5 py-4 text-center">Referral Code</th>
                  <th className="w-[150px] px-5 py-4 text-left">Metode Bayar</th>
                  <th className="w-[120px] px-5 py-4 text-center">Total Order</th>
                  <th className="w-[120px] px-5 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-[#8B7E76]">
                      <div className="flex flex-col items-center gap-2">
                        <FiSearch className="text-[32px] text-[#D0C8C0]" />
                        <p className="text-[13px] font-medium">Tidak ada data ditemukan</p>
                        <p className="text-[11px] text-[#B0A89C]">Coba ubah kata kunci atau filter yang digunakan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((item) => (
                    <tr
                      key={item.idCustomer}
                      className="border-t border-[#EEE7DF] transition-colors hover:bg-[#FBFAF8]"
                    >
                      <td className="px-5 py-3.5 font-medium text-[#2D2723]">{item.idCustomer}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.namaLengkap}
                            className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-[#EEE7DF]"
                          />
                          <div>
                            <p className="font-medium text-[#2D2723]">{item.namaLengkap}</p>
                            <p className="text-[10px] text-[#8B7E76]">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <TierBadge tier={item.tier} />
                      </td>
                      <td className="px-5 py-3.5 text-center text-[#4F4740]">
                        {item.tanggalDaftar}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {item.referralCode !== "-" ? (
                          <span className="rounded-[8px] bg-[#EEE8FF] px-2.5 py-1 font-mono text-[10px] font-medium text-[#6D3FD1]">
                            {item.referralCode}
                          </span>
                        ) : (
                          <span className="text-[#C5BCB4]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-[#4F4740]">
                          <FiCreditCard className="shrink-0 text-[#8B7E76]" />
                          {item.metodePembayaran}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center font-semibold text-[#2D2723]">
                        {item.totalTransaksi}x
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <StatusBadge value={item.statusAktif} />
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
                <span className="font-medium text-[#2D2723]">
                  {filtered.length.toLocaleString("id-ID")}
                </span>{" "}
                member
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-[#D8D0C8] text-[12px] text-[#4F4740] transition hover:border-[#C7A765] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ‹
                </button>

                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let p;
                  if (totalPages <= 7) {
                    p = i + 1;
                  } else if (page <= 4) {
                    p = i + 1;
                    if (i === 6) p = totalPages;
                    if (i === 5) p = "...";
                  } else if (page >= totalPages - 3) {
                    p = totalPages - 6 + i;
                    if (i === 0) p = 1;
                    if (i === 1) p = "...";
                  } else {
                    const map = [1, "...", page - 1, page, page + 1, "...", totalPages];
                    p = map[i];
                  }

                  if (p === "...") {
                    return (
                      <span key={i} className="flex h-[34px] w-[34px] items-center justify-center text-[12px] text-[#A99B8E]">
                        …
                      </span>
                    );
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setPage(p)}
                      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] text-[12px] font-medium transition ${
                        page === p
                          ? "bg-[#2D2723] text-white shadow"
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

        {/* ── INFO TIPS ── */}
        <div className="mt-6 rounded-[18px] border border-[#EEE7DF] bg-[#FFFDF9] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[15px] bg-[#FFF3DE] text-[20px] text-[#C47A24]">
              <FiClock />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#2D2723]">Tips Manajemen Member</p>
              <p className="mt-1 text-[11px] leading-6 text-[#7C7772]">
                Member dengan tier <strong>Gold</strong> dan <strong>Platinum</strong> cocok mendapatkan promo eksklusif, akses produk baru lebih awal, serta rekomendasi produk personal.
                Member dengan status <strong>Tidak Aktif</strong> bisa dikirimkan notifikasi reaktivasi atau penawaran khusus untuk mendorong kembali berbelanja.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
