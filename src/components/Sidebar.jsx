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
} from "react-icons/fi";

/* ============================================================
   MENU STRUCTURE dengan grup
============================================================ */
const menuGroups = [
  {
    group: "Main",
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
      { label: "Laporan", path: "/reports", icon: <FiFileText />, badge: null },
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
          ? "bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.15)]"
          : "text-white/60 hover:bg-white/[0.07] hover:text-white/90"
      }`}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-r-full bg-[#C7A765]" />
      )}

      {/* Icon */}
      <span
        className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[9px] text-[14px] transition-all duration-200 ${
          isActive
            ? "bg-[#C7A765] text-white shadow-[0_4px_10px_rgba(199,167,101,0.4)]"
            : "bg-white/[0.08] text-white/60 group-hover:bg-white/[0.12] group-hover:text-white/90"
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
              : "bg-white/[0.12] text-white/60"
          }`}
        >
          {item.badge}
        </span>
      )}

      {/* Arrow on hover */}
      {!item.badge && (
        <FiChevronRight
          className={`text-[11px] transition-all duration-200 ${
            isActive ? "translate-x-0.5 text-white/70" : "translate-x-0 text-transparent group-hover:text-white/30"
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
      className="fixed left-0 top-0 z-50 flex h-screen w-[210px] flex-col overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1C1410 0%, #2A1D14 50%, #1C1410 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Subtle glow top */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-[120px] w-[200px] -translate-x-1/2 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #C7A765 0%, transparent 70%)" }}
      />

      {/* ── BRAND LOGO ── */}
      <div className="relative shrink-0 px-5 py-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] text-[16px] font-bold text-white shadow-[0_4px_16px_rgba(199,167,101,0.4)]"
            style={{ background: "linear-gradient(135deg, #C7A765 0%, #A8834D 100%)" }}
          >
            H
          </div>
          <div>
            <h1 className="text-[15px] font-bold leading-none tracking-wide text-white">
              Hejmana
            </h1>
            <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-[#C7A765]">
              Boutique
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-4 h-px w-full bg-white/[0.07]" />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-2" style={{ scrollbarWidth: "none" }}>
        {menuGroups.map((group) => (
          <div key={group.group} className="mb-4">
            {/* Group label */}
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
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
      <div className="mx-4 h-px bg-white/[0.07]" />

      {/* ── USER FOOTER ── */}
      <div className="shrink-0 p-4">
        {/* User Card */}
        <div
          className="mb-3 flex items-center gap-3 rounded-[14px] p-3"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Avatar */}
          <div
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold text-white shadow-md"
            style={{ background: "linear-gradient(135deg, #C7A765 0%, #8B6A3A 100%)" }}
          >
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white">Admin User</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E9B5F]" />
              <p className="text-[10px] text-white/45">Online</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-[12px] font-medium text-white/40 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[9px] bg-white/[0.06] text-[14px]">
            <FiLogOut />
          </span>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}