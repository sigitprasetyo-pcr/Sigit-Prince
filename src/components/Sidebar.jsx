import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiBox,
  FiHeart,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const menus = [
  { label: "Dashboard", path: "/", icon: <FiHome /> },
  { label: "Products", path: "/products", icon: <FiShoppingBag /> },
  { label: "Orders", path: "/orders", icon: <FiBox /> },
  { label: "Favorites", path: "/favorites", icon: <FiHeart /> },
  { label: "Settings", path: "/settings", icon: <FiSettings /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus data login kalau nanti kamu pakai auth/token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Arahkan ke halaman login
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-4 rounded-[8px] px-5 py-4 text-[20px] transition-all ${
      isActive
        ? "bg-[#C09B7D] text-white font-medium"
        : "text-white/90 font-normal hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[320px] flex-col bg-[#2D2723] text-white">
      <div className="flex h-[112px] items-center gap-4 border-b border-white/10 px-7">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-[#C09B7D] text-[27px] text-white">
          <FiShoppingBag />
        </div>

        <div>
          <h1 className="font-display text-[34px] font-medium leading-none text-white">
            Boutique
          </h1>

          <p className="mt-2 text-[15px] font-normal text-white/75">
            Elegant Collection
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-3 px-6 py-5">
        {menus.map((menu) => (
          <NavLink
            key={menu.label}
            to={menu.path}
            end={menu.path === "/"}
            className={navClass}
          >
            <span className="text-[24px]">{menu.icon}</span>
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* BAGIAN ADMIN USER JADI BISA DIKLIK UNTUK LOGOUT */}
      <div className="border-t border-white/10 p-7">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-[12px] p-2 text-left transition hover:bg-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#C09B7D] text-[25px] text-white">
              <FiUser />
            </div>

            <div>
              <p className="text-[17px] font-medium leading-tight text-white">
                Admin User
              </p>

              <p className="mt-1 text-[14px] font-normal text-white/75">
                admin@boutique.com
              </p>
            </div>
          </div>

          <FiLogOut className="text-[22px] text-white/65 transition group-hover:text-white" />
        </button>
      </div>
    </aside>
  );
}