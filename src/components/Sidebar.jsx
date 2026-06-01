import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiMessageCircle,
  FiBox,
  FiActivity,
  FiTag,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiGrid,
  FiLayers,
} from "react-icons/fi";

import BrandLogo from "./BrandLogo";
import MenuItem from "./MenuItem";

const menus = [
  { label: "Dashboard", path: "/dashboard", icon: <FiHome /> },
  { label: "Katalog Produk", path: "/products", icon: <FiShoppingBag /> },
  { label: "Pelanggan", path: "/customers", icon: <FiUsers /> },
  { label: "Membership", path: "/membership", icon: <FiGrid /> },
  { label: "Interaksi", path: "/interactions", icon: <FiMessageCircle /> },
  { label: "Pesanan", path: "/orders", icon: <FiBox /> },
  { label: "Aktivitas", path: "/activity", icon: <FiActivity /> },
  { label: "Promo", path: "/promo", icon: <FiTag /> },
  { label: "Laporan", path: "/reports", icon: <FiFileText /> },
  { label: "Komponen CRM", path: "/crm-breakdown", icon: <FiLayers /> },
  { label: "Pengaturan", path: "/settings", icon: <FiSettings /> },
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
      <div className="shrink-0 px-5 py-4">
        <div className="origin-left scale-[0.92]">
          <BrandLogo />
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-hidden px-4 py-2">
        {menus.map((menu) => (
          <MenuItem
            key={menu.label}
            label={menu.label}
            path={menu.path}
            icon={menu.icon}
          />
        ))}
      </nav>

      <div className="shrink-0 border-t border-[#F1ECE6] px-4 py-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-[36px] w-full items-center gap-2 rounded-[10px] px-3 text-[11px] text-[#F87171] transition hover:bg-[#FFF1F1]"
        >
          <FiLogOut className="shrink-0 text-[13px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}