import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiShoppingBag, FiMapPin, FiArrowRight, FiStar } from "react-icons/fi";

/* ─── Tier config ─── */
const TIER_CONFIG = {
  "Regular Member": {
    gradient: "linear-gradient(135deg, #6B6057 0%, #9A8C80 100%)",
    glow: "rgba(154,140,128,0.4)",
    icon: "👤",
    badge: "Regular",
    ring: "#9A8C80",
    bg: "#F8F6F3",
    textDark: "#5E5148",
    accentLight: "#EAE4DD",
  },
  "Silver Member": {
    gradient: "linear-gradient(135deg, #3A5070 0%, #94A3B8 100%)",
    glow: "rgba(148,163,184,0.4)",
    icon: "⭐",
    badge: "Silver",
    ring: "#94A3B8",
    bg: "#EEF2F8",
    textDark: "#3A5070",
    accentLight: "#D4DCE8",
  },
  "Gold Member": {
    gradient: "linear-gradient(135deg, #8A5A10 0%, #E8C070 100%)",
    glow: "rgba(199,167,101,0.6)",
    icon: "🏅",
    badge: "Gold",
    ring: "#C7A765",
    bg: "#FFF9EE",
    textDark: "#8A5A10",
    accentLight: "#F5DCA0",
  },
  "Platinum Member": {
    gradient: "linear-gradient(135deg, #4B1FA0 0%, #A78BFA 100%)",
    glow: "rgba(109,93,246,0.5)",
    icon: "💎",
    badge: "Platinum",
    ring: "#7C5DF6",
    bg: "#F0ECFF",
    textDark: "#4B1FA0",
    accentLight: "#C9BAFF",
  },
};

export default function CustomerCard({ customer }) {
  const tier = TIER_CONFIG[customer.tier] || TIER_CONFIG["Regular Member"];

  const initials = (customer.namaLengkap || customer.name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="group relative overflow-hidden rounded-[22px] border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(45,39,35,0.14)]"
      style={{
        borderColor: `${tier.ring}40`,
        boxShadow: `0 8px 24px rgba(45,39,35,0.07)`,
        backgroundColor: "#fff",
      }}
    >
      {/* ── Membership color header banner ── */}
      <div
        className="relative overflow-hidden p-5 pb-0"
        style={{ background: tier.bg }}
      >
        {/* Decorative glow blob */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
          style={{ backgroundColor: tier.ring }}
        />

        {/* Top row: avatar + tier badge */}
        <div className="relative flex items-start justify-between">
          {/* Avatar */}
          <div className="relative">
            <div
              className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] text-[20px] font-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              style={{
                background: tier.gradient,
                boxShadow: `0 8px 24px ${tier.glow}`,
              }}
            >
              {customer.image ? (
                <img
                  src={customer.image}
                  alt=""
                  className="h-full w-full rounded-[18px] object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {/* Online dot */}
            {customer.statusAktif === "Aktif" && (
              <span
                className="absolute -bottom-1 -right-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-white"
              >
                <span className="h-[9px] w-[9px] rounded-full bg-[#2E9B5F] shadow-[0_0_6px_rgba(46,155,95,0.8)]" />
              </span>
            )}
          </div>

          {/* Tier badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-md"
            style={{
              background: tier.gradient,
              boxShadow: `0 4px 12px ${tier.glow}`,
            }}
          >
            <span className="text-[11px]">{tier.icon}</span>
            {tier.badge}
          </div>
        </div>

        {/* Name */}
        <div className="relative mt-4 pb-4">
          <Link
            to={`/customers/${customer.id}`}
            className="block text-[17px] font-bold leading-tight text-[#2D2723] transition hover:text-[#C7A765]"
          >
            {customer.namaLengkap || customer.name}
          </Link>
          <p className="mt-1 text-[11px]" style={{ color: tier.textDark }}>
            {customer.username || customer.idCustomer}
          </p>
        </div>

        {/* Bottom wavy divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(to right, transparent, ${tier.ring}60, transparent)` }}
        />
      </div>

      {/* ── Card body ── */}
      <div className="bg-white px-5 pb-5">
        {/* Contact info */}
        <div className="mt-4 space-y-2.5 text-[12px]">
          <div className="flex items-center gap-2.5 text-[#6B5E50]">
            <FiMail className="shrink-0" style={{ color: tier.textDark }} />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-[#6B5E50]">
            <FiPhone className="shrink-0" style={{ color: tier.textDark }} />
            <span>{customer.nomorHp || customer.phone}</span>
          </div>
          {customer.kotaProvinsi && (
            <div className="flex items-center gap-2.5 text-[#6B5E50]">
              <FiMapPin className="shrink-0" style={{ color: tier.textDark }} />
              <span className="truncate">{customer.kotaProvinsi}</span>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div
          className="mt-4 grid grid-cols-2 divide-x rounded-[14px]"
          style={{ backgroundColor: tier.bg, borderColor: `${tier.ring}30` }}
        >
          <div className="py-3 text-center">
            <p className="text-[18px] font-bold" style={{ color: tier.textDark }}>
              {customer.totalTransaksi ?? customer.totalOrders ?? 0}
            </p>
            <p className="text-[10px] text-[#8B7E76]">Transaksi</p>
          </div>
          <div className="py-3 text-center">
            <p className="truncate px-2 text-[11px] font-semibold" style={{ color: tier.textDark }}>
              {customer.statusAktif || (customer.status === "active" ? "Aktif" : "Non-Aktif")}
            </p>
            <p className="text-[10px] text-[#8B7E76]">Status</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: `${tier.ring}20` }}>
          <div className="flex items-center gap-2">
            <FiShoppingBag className="text-[13px]" style={{ color: tier.textDark }} />
            <span className="text-[11px] font-medium" style={{ color: tier.textDark }}>
              {customer.produkItemDibeli
                ? customer.produkItemDibeli.split(",")[0].trim()
                : "—"}
            </span>
          </div>

          <Link
            to={`/customers/${customer.id}`}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white transition hover:shadow-md"
            style={{
              background: tier.gradient,
              boxShadow: `0 4px 12px ${tier.glow}`,
            }}
          >
            Detail
            <FiArrowRight className="text-[11px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}