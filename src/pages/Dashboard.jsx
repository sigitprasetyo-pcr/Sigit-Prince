import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiArrowUpRight,
  FiArrowDownRight,
  FiClock,
  FiAlertCircle,
  FiStar,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiGift,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

import orders from "../data/Orders";
import products from "../data/Products";
import customers from "../data/Customers";

/* ============================================================
   HELPERS
============================================================ */
const parsePrice = (str) => parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
const formatRpShort = (val) => {
  if (val >= 1_000_000_000) return `Rp ${(val / 1_000_000_000).toFixed(1)}M`;
  if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(1)}jt`;
  if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)}rb`;
  return `Rp ${val}`;
};

/* ============================================================
   COMPUTED DATA
============================================================ */
const totalRevenue = orders.reduce(
  (s, o) => s + parsePrice(o.price) * o.quantity,
  0
);

const statusCount = orders.reduce((acc, o) => {
  acc[o.status] = (acc[o.status] || 0) + 1;
  return acc;
}, {});

const categoryRevenue = orders.reduce((acc, o) => {
  acc[o.category] = (acc[o.category] || 0) + parsePrice(o.price) * o.quantity;
  return acc;
}, {});

const topCategories = Object.entries(categoryRevenue)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 6);

const paymentCount = orders.reduce((acc, o) => {
  acc[o.payment] = (acc[o.payment] || 0) + 1;
  return acc;
}, {});

const lowStockProducts = products.filter((p) => p.status === "Low Stock");

const monthlyData = [
  { month: "Jan", revenue: 8200000, orders: 14 },
  { month: "Feb", revenue: 11500000, orders: 19 },
  { month: "Mar", revenue: 9800000, orders: 17 },
  { month: "Apr", revenue: 14200000, orders: 24 },
  { month: "Mei", revenue: 17600000, orders: 30 },
  { month: "Jun", revenue: 13400000, orders: 22 },
  { month: "Jul", revenue: 15800000, orders: 27 },
  { month: "Agt", revenue: 12100000, orders: 21 },
  { month: "Sep", revenue: 18900000, orders: 32 },
  { month: "Okt", revenue: 16400000, orders: 28 },
  { month: "Nov", revenue: 21200000, orders: 36 },
  { month: "Des", revenue: 24600000, orders: 41 },
];

const weeklyData = [
  { month: "Sen", revenue: 2100000, orders: 3 },
  { month: "Sel", revenue: 3400000, orders: 5 },
  { month: "Rab", revenue: 1800000, orders: 3 },
  { month: "Kam", revenue: 4200000, orders: 7 },
  { month: "Jum", revenue: 5100000, orders: 9 },
  { month: "Sab", revenue: 6300000, orders: 11 },
  { month: "Min", revenue: 3700000, orders: 6 },
];

/* ============================================================
   LIVE CLOCK WIB
============================================================ */
function useLiveClockWIB() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // WIB = UTC+7
  const wibOffset = 7 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utc + wibOffset * 60000);

  const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

  const hari = HARI[wib.getDay()];
  const tgl = wib.getDate();
  const bulan = BULAN[wib.getMonth()];
  const tahun = wib.getFullYear();
  const jam = String(wib.getHours()).padStart(2, "0");
  const menit = String(wib.getMinutes()).padStart(2, "0");
  const detik = String(wib.getSeconds()).padStart(2, "0");

  return { dateStr: `${hari}, ${tgl} ${bulan} ${tahun}`, timeStr: `${jam}:${menit}:${detik}` };
}

/* ============================================================
   AREA CHART SVG
============================================================ */
function AreaChart({ data, color = "#C7A765" }) {
  const W = 700;
  const H = 200;
  const PL = 52;
  const PR = 16;
  const PT = 16;
  const PB = 32;
  const cW = W - PL - PR;
  const cH = H - PT - PB;

  const maxY = Math.max(...data.map((d) => d.revenue)) * 1.18;
  const getX = (i) => PL + (i / (data.length - 1)) * cW;
  const getY = (v) => PT + cH - (v / maxY) * cH;

  const linePts = data.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(" ");
  const areaPath = [
    `M ${getX(0)},${getY(data[0].revenue)}`,
    ...data.map((d, i) => `L ${getX(i)},${getY(d.revenue)}`),
    `L ${getX(data.length - 1)},${PT + cH}`,
    `L ${PL},${PT + cH}`,
    "Z",
  ].join(" ");

  const gradId = `ag-${color.replace("#", "")}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
        <filter id="ls">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={color} floodOpacity="0.35" />
        </filter>
      </defs>

      {[0, 1, 2, 3, 4].map((i) => {
        const y = PT + (i / 4) * cH;
        const val = maxY * (1 - i / 4);
        return (
          <g key={i}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#EAE3DA" strokeWidth="1" strokeDasharray="4 3" />
            <text x={PL - 6} y={y + 4} textAnchor="end" fill="#A99B8E" fontSize="9" fontFamily="Manrope,sans-serif">
              {formatRpShort(val)}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill={`url(#${gradId})`} />
      <polyline
        points={linePts}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ls)"
      />
      {data.map((d, i) => (
        <circle key={i} cx={getX(i)} cy={getY(d.revenue)} r="4.5" fill="white" stroke={color} strokeWidth="2.5" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={getX(i)} y={H - 8} textAnchor="middle" fill="#A99B8E" fontSize="9.5" fontFamily="Manrope,sans-serif">
          {d.month}
        </text>
      ))}
    </svg>
  );
}

/* ============================================================
   BAR CHART SVG
============================================================ */
function BarChart({ data }) {
  const W = 380;
  const H = 200;
  const PL = 10;
  const PR = 10;
  const PT = 20;
  const PB = 30;
  const cW = W - PL - PR;
  const cH = H - PT - PB;
  const barW = (cW / data.length) * 0.55;
  const maxVal = Math.max(...data.map((d) => d[1]));

  const COLORS = ["#C7A765", "#94A3B8", "#D99A42", "#6D5DF6", "#2E9B5F", "#E05252"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        {COLORS.map((c, i) => (
          <linearGradient key={i} id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="1" />
            <stop offset="100%" stopColor={c} stopOpacity="0.5" />
          </linearGradient>
        ))}
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={PL} y1={PT + (i / 3) * cH} x2={W - PR} y2={PT + (i / 3) * cH} stroke="#EAE3DA" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {data.map(([cat, val], i) => {
        const bH = (val / maxVal) * cH;
        const x = PL + (i / data.length) * cW + (cW / data.length - barW) / 2;
        const y = PT + cH - bH;
        const label = cat.length > 8 ? cat.slice(0, 7) + "…" : cat;
        return (
          <g key={cat}>
            <rect x={x} y={y} width={barW} height={bH} rx="7" fill={`url(#bg${i})`} />
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fill="#5E5148" fontSize="8" fontFamily="Manrope,sans-serif">
              {formatRpShort(val)}
            </text>
            <text x={x + barW / 2} y={H - 9} textAnchor="middle" fill="#A99B8E" fontSize="8.5" fontFamily="Manrope,sans-serif">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   DONUT CHART SVG
============================================================ */
function DonutChart({ sliceData }) {
  const cx = 80;
  const cy = 80;
  const r = 66;
  const inner = 42;
  const total = sliceData.reduce((s, d) => s + d.value, 0);
  let angle = -90;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const slices = sliceData.map((d) => {
    const sweep = (d.value / total) * 360;
    const s = angle;
    const e = angle + sweep;
    angle += sweep;

    const x1 = cx + r * Math.cos(toRad(s));
    const y1 = cy + r * Math.sin(toRad(s));
    const x2 = cx + r * Math.cos(toRad(e));
    const y2 = cy + r * Math.sin(toRad(e));
    const ix1 = cx + inner * Math.cos(toRad(s));
    const iy1 = cy + inner * Math.sin(toRad(s));
    const ix2 = cx + inner * Math.cos(toRad(e));
    const iy2 = cy + inner * Math.sin(toRad(e));
    const large = sweep > 180 ? 1 : 0;

    const path = `M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2} L${ix2} ${iy2} A${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1}Z`;
    return { ...d, path, pct: Math.round((d.value / total) * 100) };
  });

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 160 160" className="h-[140px] w-[140px] shrink-0">
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} className="opacity-90 hover:opacity-100 transition-opacity" />
        ))}
        <circle cx={cx} cy={cy} r={inner - 2} fill="white" />
        <text x={cx} y={cy - 5} textAnchor="middle" fill="#2D2723" fontSize="17" fontWeight="700" fontFamily="Manrope,sans-serif">
          {total}
        </text>
        <text x={cx} y={cy + 11} textAnchor="middle" fill="#8B7E76" fontSize="8" fontFamily="Manrope,sans-serif">
          Pesanan
        </text>
      </svg>

      <div className="flex flex-col gap-3">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[12px] text-[#4F4740]">{s.label}</span>
            <span className="ml-auto pl-4 text-[12px] font-bold text-[#2D2723]">
              {s.value}
              <span className="ml-1 text-[10px] font-normal text-[#A99B8E]">({s.pct}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SPARKLINE
============================================================ */
function Sparkline({ data, color }) {
  const W = 80;
  const H = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / (max - min || 1)) * (H - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: W, height: H }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================================
   STAT CARD
============================================================ */
function StatCard({ icon, label, value, sub, trend, trendUp, color }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[#EAE3DA] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.04)] transition-all duration-350 hover:-translate-y-1.5 hover:border-[#C5A46D]/50 hover:shadow-[0_20px_45px_rgba(197,164,109,0.12)]">
      {/* Decorative top-right circle glow */}
      <div
        className="absolute -right-8 -top-8 h-[100px] w-[100px] rounded-full opacity-[0.06] blur-[2px] transition-all duration-350 group-hover:scale-125 group-hover:opacity-[0.14]"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />
      
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-[52px] w-[52px] items-center justify-center rounded-[18px] text-[22px] text-white shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-transform duration-350 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${color} 0%, #1C1410 100%)` }}
        >
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${
              trendUp ? "bg-[#EAF8EF] text-[#2E9B5F] shadow-sm" : "bg-[#FFEDED] text-[#E05252] shadow-sm"
            }`}
          >
            {trendUp ? <FiArrowUpRight className="stroke-[2.5]" /> : <FiArrowDownRight className="stroke-[2.5]" />}
            {trend}
          </div>
        )}
      </div>
      
      <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8B7E76]">{label}</p>
      <h2 className="mt-1.5 text-[32px] font-black leading-none text-[#2D2723] font-serif tracking-tight">{value}</h2>
      {sub && <p className="mt-2.5 text-[11.5px] font-medium text-[#A99B8E]">{sub}</p>}
    </div>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */
const STATUS_STYLE = {
  Terkirim: "bg-[#EAF8EF] text-[#2E9B5F]",
  Diproses: "bg-[#DCEAFF] text-[#2563EB]",
  "Siap Kirim": "bg-[#FFF3DE] text-[#C47A24]",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${STATUS_STYLE[status] || "bg-[#F3F0EC] text-[#7C7772]"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

/* ============================================================
   MEMBER TIER CARD (Dashboard)
============================================================ */
const TIER_STYLE = {
  Regular: {
    gradient: "linear-gradient(135deg, #1C1410 0%, #463730 100%)",
    icon: "👤",
    glow: "rgba(124,107,91,0.4)",
    badge: "Regular",
    number: "8820 · VIP · REGULAR",
  },
  Silver: {
    gradient: "linear-gradient(135deg, #3A4F6E 0%, #768AA4 100%)",
    icon: "⭐",
    glow: "rgba(118,138,164,0.4)",
    badge: "Silver",
    number: "8820 · VIP · SILVER",
  },
  Gold: {
    gradient: "linear-gradient(135deg, #705324 0%, #C5A46D 50%, #8C6A30 100%)",
    icon: "🏅",
    glow: "rgba(197,164,109,0.5)",
    badge: "Gold",
    number: "8820 · VIP · GOLD",
  },
  Platinum: {
    gradient: "linear-gradient(135deg, #180D29 0%, #53249D 50%, #7A42C9 100%)",
    icon: "💎",
    glow: "rgba(109,93,246,0.5)",
    badge: "Platinum",
    number: "8820 · VIP · PLATINUM",
  },
};

/* ============================================================
   MAIN DASHBOARD
============================================================ */
export default function Dashboard() {
  const [period, setPeriod] = useState("monthly");
  const chartData = period === "monthly" ? monthlyData : weeklyData;
  const { dateStr, timeStr } = useLiveClockWIB();
  const navigate = useNavigate();
  const { dark } = useTheme();

  const bg = dark ? "bg-[#110E0B]" : "bg-[#F7F5F2]";

  const memberCount = customers.filter((c) => c.statusMember === "Member").length;
  const activeMember = customers.filter(
    (c) => c.statusMember === "Member" && c.statusAktif === "Aktif"
  ).length;

  const donutData = [
    { label: "Terkirim", value: statusCount["Terkirim"] || 0, color: "#2E9B5F" },
    { label: "Diproses", value: statusCount["Diproses"] || 0, color: "#2563EB" },
    { label: "Siap Kirim", value: statusCount["Siap Kirim"] || 0, color: "#D99A42" },
  ];

  const payTotal = Object.values(paymentCount).reduce((s, v) => s + v, 0);
  const payColors = {
    "Transfer Bank": "#C7A765",
    "E-Wallet": "#6D5DF6",
    COD: "#2E9B5F",
    QRIS: "#E05252",
  };

  // Tier counts for dashboard member summary
  const tierSummary = [
    { tier: "Regular", full: "Regular Member", color: "#9A8C80", bg: "#F3F0EC", icon: "👤" },
    { tier: "Silver", full: "Silver Member", color: "#94A3B8", bg: "#EEF2F6", icon: "⭐" },
    { tier: "Gold", full: "Gold Member", color: "#D99A42", bg: "#FFF3DE", icon: "🏅" },
    { tier: "Platinum", full: "Platinum Member", color: "#6D5DF6", bg: "#EEE8FF", icon: "💎" },
  ];

  return (
    <section className={`min-h-[calc(100vh-72px)] px-8 py-8 transition-colors duration-300 ${bg}`}>
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ─── HEADER ─── */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C5A46D]/10 border border-[#C5A46D]/20 px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C5A46D] animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C5A46D]">Overview · Aurelia Boutique</p>
            </div>
            <h1 className="mt-2.5 font-serif text-[34px] font-light leading-none text-[#2D2723]">
              Dashboard <span className="font-normal italic text-[#7A2E3A]">Boutique</span>
            </h1>
            <p className="mt-2 text-[13px] font-light text-[#7C6B5B]">
              Selamat datang kembali, Admin! Berikut ringkasan aktivitas dan performa butik Anda hari ini.
            </p>
          </div>

          {/* Live Clock WIB (Swiss Chronometer style) */}
          <div className="flex flex-col items-end gap-1.5">
            <div 
              className="flex items-center gap-3 rounded-[20px] border border-[#C5A46D]/25 bg-white px-6 py-3.5 shadow-[0_8px_30px_rgba(197,164,109,0.06)] relative overflow-hidden"
            >
              {/* Subtle gold shine effect inside clock card */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-12 w-12 rounded-full bg-[#C5A46D]/5 blur-md" />
              
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7A2E3A]/8 text-[#7A2E3A] shadow-inner text-base">
                <FiClock />
              </div>
              <div className="text-right">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-[#A99B8E]">{dateStr} · WIB</p>
                <p className="mt-0.5 font-serif text-[24px] font-semibold tabular-nums leading-none text-[#7A2E3A] tracking-wide">
                  {timeStr}
                </p>
              </div>
            </div>
            <span className="text-[9.5px] font-medium text-[#B0A89C] tracking-wide">Waktu Indonesia Barat (UTC+7)</span>
          </div>
        </div>

        {/* ─── STAT CARDS ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<FiDollarSign />}
            label="Total Revenue"
            value={formatRpShort(totalRevenue)}
            sub={`Dari ${orders.length} transaksi tercatat`}
            trend="+18.4%"
            trendUp={true}
            color="#C7A765"
          />
          <StatCard
            icon={<FiShoppingBag />}
            label="Total Pesanan"
            value={orders.length}
            sub={`${statusCount["Terkirim"] || 0} terkirim · ${statusCount["Diproses"] || 0} diproses`}
            trend="+11.2%"
            trendUp={true}
            color="#2563EB"
          />
          <StatCard
            icon={<FiUsers />}
            label="Total Member"
            value={memberCount.toLocaleString("id-ID")}
            sub={`${activeMember.toLocaleString("id-ID")} member aktif`}
            trend="+9.7%"
            trendUp={true}
            color="#6D5DF6"
          />
          <StatCard
            icon={<FiPackage />}
            label="Total Produk"
            value={products.length}
            sub={`${lowStockProducts.length} produk stok menipis`}
            trend="-2 stok"
            trendUp={false}
            color="#E05252"
          />
        </div>

        {/* ─── SPARKLINE ROW ─── */}
        <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            { label: "Revenue Bulanan", data: [8.2, 11.5, 9.8, 14.2, 17.6, 13.4, 15.8, 12.1, 18.9, 16.4, 21.2, 24.6], unit: "jt", color: "#C5A46D" },
            { label: "Pesanan Bulanan", data: [14, 19, 17, 24, 30, 22, 27, 21, 32, 28, 36, 41], unit: "", color: "#2563EB" },
            { label: "Pelanggan Baru", data: [60, 72, 68, 85, 91, 78, 95, 88, 102, 97, 115, 128], unit: "", color: "#6D5DF6" },
            { label: "Stok Produk", data: [28, 30, 29, 31, 30, 32, 33, 31, 34, 35, 33, 30], unit: "", color: "#2E9B5F" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between rounded-[22px] border border-[#EAE3DA] bg-white px-5 py-4.5 shadow-[0_8px_24px_rgba(45,39,35,0.03)] hover:border-[#C5A46D]/45 hover:shadow-[0_12px_28px_rgba(197,164,109,0.08)] transition duration-300"
            >
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A99B8E]">{s.label}</p>
                <p className="mt-1.5 font-serif text-[22px] font-black leading-none text-[#2D2723] tracking-tight">
                  {s.data[s.data.length - 1]}
                  {s.unit}
                </p>
              </div>
              <Sparkline data={s.data} color={s.color} />
            </div>
          ))}
        </div>

        {/* ─── AREA CHART + DONUT ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_350px]">

          {/* Area Chart */}
          <div className="rounded-[24px] border border-[#EAE3DA] bg-white p-6 shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A98467]">Revenue Trend</p>
                <h2 className="mt-1 font-serif text-[20px] font-medium text-[#2D2723]">Tren Pendapatan Boutique</h2>
              </div>
              <div className="flex rounded-[14px] border border-[#EAE3DA] bg-[#FAF8F5] p-1 shadow-inner">
                {[
                  { key: "monthly", label: "Bulanan" },
                  { key: "weekly", label: "Mingguan" },
                ].map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPeriod(p.key)}
                    className={`rounded-[10px] px-4 py-1.5 text-[11px] font-bold transition-all duration-300 ${
                      period === p.key
                        ? "bg-[#7A2E3A] text-white shadow-[0_4px_12px_rgba(122,46,58,0.25)]"
                        : "text-[#7C7772] hover:text-[#7A2E3A]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4 border-b border-[#FAF6F0] pb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#C5A46D]" />
                <span className="text-[11.5px] font-semibold text-[#8B7E76] uppercase tracking-wide">Revenue</span>
              </div>
              <span className="font-serif text-[26px] font-black text-[#2D2723] tracking-tight">
                {formatRpShort(chartData.reduce((s, d) => s + d.revenue, 0))}
              </span>
              <span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-[10px] font-bold text-[#2E9B5F] shadow-sm">
                ↗ +18.4%
              </span>
            </div>

            <AreaChart data={chartData} color="#C5A46D" />
          </div>

          {/* Donut Chart */}
          <div className="rounded-[24px] border border-[#EAE3DA] bg-white p-6 shadow-[0_12px_32px_rgba(45,39,35,0.05)] flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A98467]">Order Status</p>
              <h2 className="mb-5 mt-1 font-serif text-[20px] font-medium text-[#2D2723]">Status Pesanan</h2>
            </div>
            
            <div className="flex justify-center py-2">
              <DonutChart sliceData={donutData} />
            </div>
            
            <div className="mt-5 grid grid-cols-3 gap-3">
              {donutData.map((d) => (
                <div key={d.label} className="rounded-[16px] bg-[#FAF8F5] border border-[#F0EBE3] p-3.5 text-center transition duration-200 hover:-translate-y-0.5">
                  <p className="font-serif text-[20px] font-bold text-[#2D2723]">{d.value}</p>
                  <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-wider text-[#8B7E76]">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── BAR CHART + PAYMENT ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_310px]">

          {/* Bar Chart */}
          <div className="rounded-[24px] border border-[#EAE3DA] bg-white p-6 shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A98467]">Kategori</p>
            <h2 className="mb-5 mt-1 font-serif text-[20px] font-medium text-[#2D2723]">Revenue per Kategori</h2>
            <BarChart data={topCategories} />
          </div>

          {/* Metode Pembayaran */}
          <div className="rounded-[24px] border border-[#EAE3DA] bg-white p-6 shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A98467]">Pembayaran</p>
            <h2 className="mb-5 mt-1 font-serif text-[20px] font-medium text-[#2D2723]">Metode Bayar</h2>

            <div className="flex flex-col gap-4">
              {Object.entries(paymentCount)
                .sort((a, b) => b[1] - a[1])
                .map(([name, val]) => {
                  const pct = Math.round((val / payTotal) * 100);
                  const c = payColors[name] || "#A99B8E";
                  return (
                    <div key={name}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
                          <span className="text-[12.5px] font-medium text-[#4F4740]">{name}</span>
                        </div>
                        <span className="text-[12.5px] font-bold text-[#2D2723]">{pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#F1ECE6]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: c }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-5 rounded-[14px] bg-[#FAF9F7] p-4">
              <p className="text-[11px] text-[#8B7E76]">Metode Terpopuler</p>
              <p className="mt-1 text-[15px] font-bold text-[#2D2723]">
                {Object.entries(paymentCount).sort((a, b) => b[1] - a[1])[0]?.[0]}
              </p>
              <p className="mt-0.5 text-[11px] text-[#A99B8E]">
                {Object.entries(paymentCount).sort((a, b) => b[1] - a[1])[0]?.[1]} transaksi
              </p>
            </div>
          </div>
        </div>

        {/* ─── ORDERS TABLE + SIDEBAR CARDS ─── */}
        <div className="mb-8 grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_340px]">

          {/* Tabel Pesanan Terbaru */}
          <div className="overflow-hidden rounded-[24px] border border-[#EAE3DA] bg-white shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
            <div className="flex items-center justify-between border-b border-[#EEE7DF] bg-[#FFFDFC] px-6 py-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A98467]">Transaksi</p>
                <h2 className="mt-1 font-serif text-[18px] font-medium text-[#2D2723]">Pesanan Terbaru</h2>
              </div>
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-1 text-[11px] font-bold text-[#C5A46D] hover:text-[#7A2E3A] transition duration-200"
              >
                Lihat Semua <FiArrowUpRight className="text-[13px]" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-[12.5px]">
                <thead className="bg-[#FAF8F5] text-[#7C6B5B] border-b border-[#EAE3DA] font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Kode</th>
                    <th className="px-6 py-4 text-left font-bold">Customer</th>
                    <th className="px-6 py-4 text-left font-bold">Produk</th>
                    <th className="px-6 py-4 text-right font-bold">Harga</th>
                    <th className="px-6 py-4 text-center font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3DA]">
                  {orders.map((o) => (
                    <tr key={o.id} className="transition-colors hover:bg-[#FAF9F7]/60">
                      <td className="px-6 py-4 font-mono font-bold text-[#C5A46D]">{o.code}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#2D2723]">{o.customer}</p>
                        <p className="text-[10px] font-medium text-[#A99B8E] mt-0.5">{o.date}</p>
                      </td>
                      <td className="px-6 py-4 text-[#4F4740] font-medium">{o.product}</td>
                      <td className="px-6 py-4 text-right font-bold text-[#2D2723]">{o.price}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* Kolom kanan */}
          <div className="flex flex-col gap-6">

            {/* Low Stock Alert */}
            <div className="rounded-[24px] border border-[#FFE0D0] bg-[#FFFDFC] p-5 shadow-[0_12px_32px_rgba(45,39,35,0.04)]">
              <div className="mb-4.5 flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#FFF3DE] text-[19px] text-[#C47A24] shadow-inner">
                  <FiAlertCircle />
                </div>
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#2D2723]">Stok Menipis</p>
                  <p className="text-[10.5px] font-medium text-[#A99B8E]">{lowStockProducts.length} produk perlu restock</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2.5">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-[16px] bg-[#FFF9F3] border border-[#FDEEE3] px-3.5 py-2.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(197,164,109,0.08)]">
                    <div className="flex items-center gap-3">
                      <span className="text-[20px]">{p.icon}</span>
                      <div>
                        <p className="text-[11.5px] font-bold leading-tight text-[#2D2723]">{p.title}</p>
                        <p className="text-[10px] font-semibold text-[#A99B8E] mt-0.5">{p.category}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#FFE0D0] px-2.5 py-0.5 text-[10px] font-extrabold text-[#C47A24]">
                      {p.stock} pcs
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Produk */}
            <div className="rounded-[24px] border border-[#EAE3DA] bg-white p-5 shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
              <div className="mb-4.5 flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#EEE8FF] text-[18px] text-[#6D5DF6] shadow-inner">
                  <FiStar />
                </div>
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#2D2723]">Produk Terlaris</p>
                  <p className="text-[10.5px] font-medium text-[#A99B8E]">Berdasarkan transaksi bulan ini</p>
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  { name: "Silk Evening Gown", cat: "Dress", rev: "Rp 1.25jt", icon: "👘" },
                  { name: "Premium Velvet Dress", cat: "Dress", rev: "Rp 1.1jt", icon: "👗" },
                  { name: "Mini Pearl Handbag", cat: "Bag", rev: "Rp 810rb", icon: "👜" },
                  { name: "Modern Linen Blazer", cat: "Blazer", rev: "Rp 780rb", icon: "🧥" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-[#FAF6F0] pb-3 last:border-0 last:pb-0 transition hover:translate-x-1 duration-200">
                    <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px] bg-[#FAF8F5] border border-[#F0EBE3] text-[18px]">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11.5px] font-semibold text-[#2D2723] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#A99B8E] mt-0.5">{item.cat}</p>
                    </div>
                    <span className="text-[12px] font-bold text-[#C5A46D]">{item.rev}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Akses Cepat */}
            <div className="rounded-[24px] border border-[#EAE3DA] bg-white p-5 shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
              <div className="mb-4.5 flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#EAF8EF] text-[18px] text-[#2E9B5F] shadow-inner">
                  <FiZap />
                </div>
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#2D2723]">Akses Cepat</p>
                  <p className="text-[10.5px] font-medium text-[#A99B8E]">Menu yang sering digunakan</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Tambah Produk", href: "/products", icon: "📦", color: "#C5A46D", bg: "#FFFDF9", border: "rgba(197,164,109,0.2)" },
                  { label: "Pesanan Baru", href: "/orders", icon: "🛍️", color: "#2563EB", bg: "#F8FAFC", border: "rgba(37,99,235,0.15)" },
                  { label: "Data Member", href: "/members", icon: "👥", color: "#6D5DF6", bg: "#FAF9FF", border: "rgba(109,93,246,0.15)" },
                  { label: "Laporan", href: "/reports", icon: "📊", color: "#2E9B5F", bg: "#F8FDF9", border: "rgba(46,155,95,0.15)" },
                  { label: "Promo", href: "/promo", icon: "🎁", color: "#E05252", bg: "#FFFDFD", border: "rgba(224,82,82,0.15)" },
                  { label: "Pelanggan", href: "/customers", icon: "👤", color: "#C47A24", bg: "#FFFDF6", border: "rgba(196,122,36,0.15)" },
                ].map((q) => (
                  <Link
                    key={q.label}
                    to={q.href}
                    className="flex flex-col items-center gap-2 rounded-[18px] p-3 text-center border border-transparent hover:border-[#C5A46D]/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ backgroundColor: q.bg, border: `1px solid ${q.border}` }}
                  >
                    <span className="text-[22px]">{q.icon}</span>
                    <span className="text-[10.5px] font-bold leading-tight" style={{ color: q.color }}>
                      {q.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ─── MEMBER TIER SUMMARY (VIVID VIP CARDS) ─── */}
        <div className="mb-8 rounded-[24px] border border-[#EAE3DA] bg-white p-6 shadow-[0_12px_32px_rgba(45,39,35,0.05)]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A98467]">CRM · Membership</p>
              <h2 className="mt-1 font-serif text-[20px] font-medium text-[#2D2723]">Distribusi Tier Member Boutique</h2>
            </div>
            <button
              onClick={() => navigate("/members")}
              className="flex items-center gap-1 text-[11px] font-bold text-[#C5A46D] hover:text-[#7A2E3A] transition duration-200"
            >
              Detail Member <FiArrowUpRight className="text-[13px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tierSummary.map(({ tier, full, color, bg, icon }) => {
              const count = customers.filter((c) => c.tier === full).length;
              const pct = Math.round((count / customers.length) * 100);
              const style = TIER_STYLE[tier];
              return (
                <div
                  key={tier}
                  className="group relative overflow-hidden rounded-[22px] p-5 text-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(0,0,0,0.28)]"
                  style={{ background: style.gradient }}
                >
                  {/* radial metal shine overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-350 group-hover:opacity-25"
                    style={{ background: `radial-gradient(circle at top right, ${style.glow} 0%, transparent 60%)` }}
                  />
                  
                  {/* Card signature line / chip graphic mock */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-6 w-8 rounded bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-mono opacity-60">
                      VIP
                    </div>
                    <div className="text-[26px] opacity-25 group-hover:opacity-50 transition-opacity duration-350">{icon}</div>
                  </div>

                  <div className="relative">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/70 font-mono">{style.number}</p>
                    <p className="mt-3 font-serif text-[38px] font-black leading-none tracking-tight">{count.toLocaleString("id-ID")}</p>
                    <p className="mt-1 text-[11px] font-medium text-white/70 italic">active members</p>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="mb-1.5 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white/60">Distribution Share</span>
                        <span className="font-bold text-white">{pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                        <div
                          className="h-full rounded-full bg-white/70 transition-all duration-700 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loyalty journey strip */}
          <div className="mt-7 flex flex-wrap items-center justify-between rounded-[20px] bg-[#FAF8F5] border border-[#F0EBE3] px-6 py-5 gap-y-4">
            {tierSummary.map((t, i) => (
              <div key={t.tier} className="flex flex-1 items-center min-w-[120px]">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-[19px] text-white shadow-md transition duration-300 hover:scale-110"
                    style={{ background: TIER_STYLE[t.tier].gradient }}
                  >
                    {t.icon}
                  </div>
                  <p className="mt-2 text-[11px] font-bold text-[#2D2723] uppercase tracking-wider">{t.tier}</p>
                </div>
                {i < tierSummary.length - 1 && (
                  <div className="mx-3 h-[2px] flex-1 rounded-full bg-gradient-to-r" style={{ background: `linear-gradient(to right, ${t.color}, ${tierSummary[i+1].color})`, opacity: 0.35 }} />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}