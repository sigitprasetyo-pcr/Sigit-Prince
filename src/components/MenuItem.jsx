import { NavLink } from "react-router-dom";

export default function MenuItem({ label, path, icon }) {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-[10px] px-5 py-3 text-[12px] transition-all ${
      isActive
        ? "bg-[#3A2619] text-white shadow-[0_10px_24px_rgba(58,38,25,0.22)]"
        : "text-[#8B735D] hover:bg-[#F3E7DF] hover:text-[#3A2619]"
    }`;

  return (
    <NavLink to={path} className={navClass}>
      <span className="text-[14px]">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}