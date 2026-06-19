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
      { label: "Member", path: "/member", icon: <FiUserCheck />, badge: "600" },
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
      className={`group relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[12px] font-medium transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-[#C7A765]/20 to-[#C7A765]/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.15)]"
          : "text-white/55 hover:bg-white/[0.07] hover:text-white/90"
      }`}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-[65%] w-[3px] -translate-y-1/2 rounded-r-full bg-[#C7A765] shadow-[0_0_8px_rgba(199,167,101,0.8)]" />
      )}

      {/* Icon */}
      <span
        className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[9px] text-[14px] transition-all duration-200 ${
          isActive
            ? "bg-[#C7A765] text-white shadow-[0_4px_12px_rgba(199,167,101,0.5)]"
            : "bg-white/[0.07] text-white/55 group-hover:bg-white/[0.12] group-hover:text-white/90"
        }`}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span className="flex-1 leading-none">{item.label}</span>

      {/* Badge */}
      {item.badge && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            isActive
              ? "bg-[#C7A765] text-white"
              : "bg-white/[0.12] text-white/55"
          }`}
        >
          {item.badge}
        </span>
      )}

      {/* Arrow on hover */}
      {!item.badge && (
        <FiChevronRight
          className={`text-[11px] transition-all duration-200 ${
            isActive ? "translate-x-0.5 text-[#C7A765]" : "translate-x-0 text-transparent group-hover:text-white/30"
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
        background: "linear-gradient(170deg, #141008 0%, #1E1610 40%, #271C12 80%, #1A1108 100%)",
        borderRight: "1px solid rgba(199,167,101,0.12)",
      }}
    >
      {/* Top golden glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[160px] w-[240px] -translate-x-1/2 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #C7A765 0%, transparent 70%)" }}
      />

      {/* ── BRAND LOGO / BOUTIQUE HEADER ── */}
      <div className="relative shrink-0 px-5 pt-6 pb-4">
        <div className="flex items-center gap-3.5">
          {/* Logo mark */}
          <div
            className="relative flex h-[40px] w-[40px] items-center justify-center rounded-[13px] text-[17px] font-black text-white shadow-[0_6px_20px_rgba(199,167,101,0.45)]"
            style={{ background: "linear-gradient(135deg, #D4A862 0%, #9A6E35 100%)" }}
          >
            H
            <span
              className="absolute -bottom-0.5 -right-0.5 h-[10px] w-[10px] rounded-full border-2 border-[#1E1610] bg-[#2E9B5F]"
            />
          </div>

          <div>
            <h1 className="text-[16px] font-black leading-none tracking-wide text-white">
              Hejmana
            </h1>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em]"
                style={{ background: "linear-gradient(135deg, #C7A765, #A8834D)", color: "#fff" }}
              >
                Boutique
              </span>
              <span className="text-[8px] text-white/30">CRM</span>
            </div>
          </div>
        </div>

        {/* Divider with golden shimmer */}
        <div className="mt-4 h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(199,167,101,0.3), transparent)" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-2" style={{ scrollbarWidth: "none" }}>
        {menuGroups.map((group) => (
          <div key={group.group} className="mb-5">
            {/* Group label */}
            <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/20">
              {group.group}
            </p>

            {/* Items */}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarItem key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── DIVIDER ── */}
      <div className="mx-4 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(199,167,101,0.2), transparent)" }} />

      {/* ── BOUTIQUE BRAND FOOTER ── */}
      <div className="shrink-0 p-4">
        {/* Boutique brand mini badge */}
        <div
          className="mb-3 flex items-center justify-center gap-2 rounded-[12px] px-3 py-2"
          style={{ background: "rgba(199,167,101,0.08)", border: "1px solid rgba(199,167,101,0.18)" }}
        >
          <span className="text-[13px]">✨</span>
          <p className="text-[10px] font-medium tracking-wide text-[#C7A765]">
            Fashion & Lifestyle CRM
          </p>
        </div>

        {/* User Card */}
        <div
          className="mb-3 flex items-center gap-3 rounded-[14px] p-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Avatar */}
          <div
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white shadow-md"
            style={{ background: "linear-gradient(135deg, #C7A765 0%, #8B6A3A 100%)" }}
          >
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white">Admin Boutique</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E9B5F]" />
              <p className="text-[10px] text-white/40">Online</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-[12px] font-medium text-white/35 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[9px] bg-white/[0.05] text-[14px]">
            <FiLogOut />
          </span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}