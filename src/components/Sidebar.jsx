import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const menus = [
  { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
  { label: "Products", path: "/products", icon: <FiShoppingBag /> },
  { label: "Orders", path: "/orders", icon: <FiBox /> },
  { label: "Customers", path: "/customers", icon: <FiUsers /> },
  { label: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  { label: "Settings", path: "/settings", icon: <FiSettings /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-[10px] px-5 py-3 text-[12px] transition-all ${
      isActive
        ? "bg-[#3A2619] text-white shadow-[0_10px_24px_rgba(58,38,25,0.22)]"
        : "text-[#8B735D] hover:bg-[#F3E7DF] hover:text-[#3A2619]"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[180px] flex-col overflow-hidden border-r border-[#E7E0D8] bg-white">
      {/* BRAND */}
      <div className="shrink-0 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[#3A2619] font-display text-[13px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.16)]">
            H
          </div>

          <div>
            <h1 className="font-display text-[14px] leading-none text-[#2D2723]">
              Hejmana
            </h1>

            <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-[#C7A765]">
              Boutique
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-3 px-5 py-5">
        {menus.map((menu) => (
          <NavLink key={menu.label} to={menu.path} className={navClass}>
            <span className="text-[14px]">{menu.icon}</span>
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="shrink-0 border-t border-[#F1ECE6] px-5 py-5">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-[12px] text-[#F87171] transition hover:bg-[#FFF1F1]"
        >
          <FiLogOut className="text-[14px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}