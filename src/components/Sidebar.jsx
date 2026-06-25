import { useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiTag,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiLayers,
  FiUserCheck,
  FiChevronRight,
  FiBarChart2,
} from "react-icons/fi";

/* ============================================================
   MENU STRUCTURE dengan grup — disesuaikan tema BOUTIQUE
============================================================ */
const menuGroups = [
  {
    group: "Utama",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: <FiHome />, badge: null },
    ],
  },
  {
    group: "Manajemen",
    items: [
      { label: "Manajemen User", path: "/users", icon: <FiUsers />, badge: null },
      { label: "Katalog Produk", path: "/products", icon: <FiShoppingBag />, badge: null },
      { label: "Pelanggan", path: "/customers", icon: <FiUsers />, badge: null },
      { label: "Member", path: "/members", icon: <FiUserCheck />, badge: "600" },
      { label: "Pesanan", path: "/orders", icon: <FiBox />, badge: "30" },
    ],
  },
  {
    group: "Marketing",
    items: [
      { label: "Promo", path: "/promo", icon: <FiTag />, badge: null },
      { label: "Laporan", path: "/reports", icon: <FiBarChart2 />, badge: null },
    ],
  },
  {
    group: "Developer",
    items: [
      { label: "Komponen CRM", path: "/crm-breakdown", icon: <FiLayers />, badge: null },
      { label: "React Hooks", path: "/react-hooks-boutique", icon: <FiLayers />, badge: null },
    ],
  },
  {
    group: "Sistem",
    items: [
      { label: "Pengaturan", path: "/settings", icon: <FiSettings />, badge: null },
    ],
  },
];

/* ============================================================
   MENU ITEM COMPONENT
============================================================ */
function SidebarItem({ item }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <NavLink
      to={item.path}
      className={`group relative flex items-center gap-3.5 rounded-[14px] px-3.5 py-2.5 text-[12px] font-medium transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-[#C5A46D]/22 to-[#C5A46D]/4 text-[#F3E7DF] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.25)]"
          : "text-white/50 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-r-full bg-[#C5A46D] shadow-[0_0_12px_#C5A46D]" />
      )}

      {/* Icon */}
      <span
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] text-[15px] transition-all duration-300 ${
          isActive
            ? "bg-[#C5A46D] text-white shadow-[0_4px_14px_rgba(197,164,109,0.45)]"
            : "bg-white/[0.06] text-white/50 group-hover:bg-white/[0.12] group-hover:text-white/90"
        }`}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span className="flex-1 leading-none tracking-wide">{item.label}</span>

      {/* Badge */}
      {item.badge && (
        <span
          className={`rounded-full px-2 py-0.5 text-[8.5px] font-extrabold tracking-wider ${
            isActive
              ? "bg-[#C5A46D] text-white"
              : "bg-white/[0.12] text-white/50"
          }`}
        >
          {item.badge}
        </span>
      )}

      {/* Arrow on hover */}
      {!item.badge && (
        <FiChevronRight
          className={`text-[12px] transition-all duration-300 ${
            isActive ? "translate-x-0.5 text-[#C5A46D]" : "translate-x-0 text-transparent group-hover:text-white/40"
          }`}
        />
      )}
    </NavLink>
  );
}

/* ============================================================
   MAIN SIDEBAR
============================================================ */
export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="fixed left-0 top-0 z-50 flex h-screen w-[220px] flex-col overflow-hidden"
      style={{
        background: "linear-gradient(175deg, #160709 0%, #230B0F 50%, #0F0405 100%)",
        borderRight: "1px solid rgba(197,164,109,0.14)",
      }}
    >
      {/* Top golden glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[180px] w-[260px] -translate-x-1/2 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #C5A46D 0%, transparent 70%)" }}
      />

      {/* ── BRAND LOGO / BOUTIQUE HEADER ── */}
      <div className="relative shrink-0 px-6 pt-7 pb-5">
        <div className="flex items-center gap-3.5">
          {/* Logo mark */}
          <div
            className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[14px] text-[18px] font-black text-white shadow-[0_6px_20px_rgba(197,164,109,0.4)]"
            style={{ background: "linear-gradient(135deg, #C5A46D 0%, #7A2E3A 100%)" }}
          >
            A
            <span
              className="absolute -bottom-0.5 -right-0.5 h-[11px] w-[11px] rounded-full border-2 border-[#1E1610] bg-[#2E9B5F]"
            />
          </div>

          <div>
            <h1 className="text-[17px] font-black leading-none tracking-wide text-white font-serif">
              Aurelia
            </h1>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em]"
                style={{ background: "linear-gradient(135deg, #C5A46D, #A8834D)", color: "#fff" }}
              >
                Boutique
              </span>
              <span className="text-[8px] text-white/35">CRM</span>
            </div>
          </div>
        </div>

        {/* Divider with golden shimmer */}
        <div className="mt-5 h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(197,164,109,0.22), transparent)" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="flex-1 overflow-y-auto px-3.5 pb-2" style={{ scrollbarWidth: "none" }}>
        {menuGroups.map((group) => (
          <div key={group.group} className="mb-5">
            {/* Group label */}
            <p className="mb-2.5 px-3 text-[9px] font-extrabold uppercase tracking-[0.28em] text-white/25">
              {group.group}
            </p>

            {/* Items */}
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── DIVIDER ── */}
      <div className="mx-4 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(197,164,109,0.15), transparent)" }} />

      {/* ── BOUTIQUE BRAND FOOTER ── */}
      <div className="shrink-0 p-4">
        {/* Boutique brand mini badge */}
        <div
          className="mb-3 flex items-center justify-center gap-2 rounded-[12px] px-3 py-2"
          style={{ background: "rgba(197,164,109,0.06)", border: "1px solid rgba(197,164,109,0.15)" }}
        >
          <span className="text-[12px]">✨</span>
          <p className="text-[9.5px] font-semibold tracking-wider text-[#C5A46D] uppercase">
            Fashion & Lifestyle CRM
          </p>
        </div>

        {/* User Card */}
        <div
          className="mb-3 flex items-center gap-3 rounded-[16px] p-3"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(197,164,109,0.12)" }}
        >
          {/* Avatar */}
          <div
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[12px] text-[13px] font-extrabold text-white shadow-md border border-[#C5A46D]/30"
            style={{ background: "linear-gradient(135deg, #C5A46D 0%, #7A2E3A 100%)" }}
          >
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white/95">Admin Boutique</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E9B5F] shadow-[0_0_8px_#2E9B5F]" />
              <p className="text-[10px] text-white/45">Online</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[12px] px-3.5 py-2.5 text-[12px] font-medium text-white/35 transition-all duration-300 hover:bg-[#7A2E3A]/15 hover:text-white"
        >
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[10px] bg-white/[0.04] text-[14px] group-hover:bg-[#7A2E3A]/30">
            <FiLogOut />
          </span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}