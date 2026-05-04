import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  MdAutoAwesome,
  MdCampaign,
  MdDashboard,
  MdGroups,
  MdHelpOutline,
  MdInventory2,
  MdLogout,
  MdSettings,
} from "react-icons/md";

const menus = [
  { label: "Dashboard", path: "/", icon: <MdDashboard /> },
  { label: "Inventory", path: "/inventory", icon: <MdInventory2 /> },
  { label: "Orders", path: "/orders", icon: <MdAutoAwesome /> },
  { label: "Customers", path: "/customers", icon: <MdGroups /> },
  { label: "Marketing", path: "/error/403", icon: <MdCampaign /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `group py-4 flex items-center pl-4 transition-all duration-300 ease-out ${
      isActive
        ? "text-[#121212] font-bold border-l border-[#121212]"
        : "text-neutral-400 hover:text-[#121212] hover:translate-x-1"
    }`;

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Anda berhasil logout.",
      showConfirmButton: false,
      timer: 1600,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <aside className="hidden lg:flex bg-[#FFFDF5] text-[#121212] h-screen w-72 border-r border-neutral-200/40 fixed left-0 top-0 flex-col py-10 px-8 z-50">
      <div className="mb-12">
        <h1 className="font-display italic text-xl tracking-tighter">
          VelvetNova
        </h1>

        <p className="font-display uppercase tracking-[0.2em] text-[10px] opacity-60 mt-1">
          Private Atelier
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.label}
            to={menu.path}
            end={menu.path === "/"}
            className={navClass}
          >
            <span className="mr-3 text-xl">{menu.icon}</span>

            <span className="font-display uppercase tracking-[0.2em] text-[10px]">
              {menu.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <button className="w-full bg-primary text-on-primary py-3 px-4 label-caps text-[10px] tracking-widest">
          New Collection
        </button>

        <div className="flex flex-col space-y-2 pt-6 border-t border-neutral-100">
          <div className="flex items-center text-neutral-400 text-[10px] uppercase tracking-widest cursor-pointer hover:text-primary">
            <MdSettings className="mr-3 text-sm" />
            Settings
          </div>

          <div className="flex items-center text-neutral-400 text-[10px] uppercase tracking-widest cursor-pointer hover:text-primary">
            <MdHelpOutline className="mr-3 text-sm" />
            Support
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center text-neutral-400 text-[10px] uppercase tracking-widest cursor-pointer hover:text-red-600 transition-colors text-left"
          >
            <MdLogout className="mr-3 text-sm" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}