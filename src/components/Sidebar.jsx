import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";

import BrandLogo from "./BrandLogo";
import MenuItem from "./MenuItem";

const menus = [
  { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
  { label: "Products", path: "/products", icon: <FiShoppingBag /> },
  { label: "Orders", path: "/orders", icon: <FiBox /> },
  { label: "Customers", path: "/customers", icon: <FiUsers /> },
  { label: "Breakdown", path: "/crm-breakdown", icon: <FiGrid /> },
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

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[180px] flex-col overflow-hidden border-r border-[#E7E0D8] bg-white">
      <div className="shrink-0 px-6 py-5">
        <BrandLogo />
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {menus.map((menu) => (
          <MenuItem
            key={menu.label}
            label={menu.label}
            path={menu.path}
            icon={menu.icon}
          />
        ))}
      </nav>

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