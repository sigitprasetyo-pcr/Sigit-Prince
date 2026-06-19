import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogIn, FiUserPlus } from "react-icons/fi";

const menus = [
  { label: "Home",       href: "#home" },
  { label: "Koleksi",    href: "#koleksi" },
  { label: "Fitur",      href: "#fitur" },
  { label: "Membership", href: "#membership" },
  { label: "Kontak",     href: "#kontak" },
];

export default function GuestNavbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Transparent → solid on scroll */
  if (typeof window !== "undefined") {
    window.onscroll = () => setScrolled(window.scrollY > 40);
  }

  const handleMenuClick = (href) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(28, 20, 16, 0.96)"
          : "rgba(28, 20, 16, 0.75)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(199,167,101,0.15)" : "1px solid rgba(255,255,255,0.05)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] text-[16px] font-bold text-white shadow-md"
            style={{ background: "linear-gradient(135deg, #C7A765 0%, #A8834D 100%)" }}
          >
            H
          </div>
          <div>
            <h1 className="text-[16px] font-bold leading-none tracking-wide text-white">
              Hejmana
            </h1>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-[#C7A765]">
              Boutique
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 lg:flex">
          {menus.map((menu) => (
            <button
              key={menu.label}
              type="button"
              onClick={() => handleMenuClick(menu.href)}
              className="text-[13px] font-medium text-white/60 transition hover:text-[#C7A765]"
            >
              {menu.label}
            </button>
          ))}
        </nav>

        {/* CTA — Login */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="flex h-[40px] items-center gap-2 rounded-[12px] border border-white/20 bg-white/10 px-5 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            <FiUserPlus />
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex h-[40px] items-center gap-2 rounded-[12px] px-5 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(199,167,101,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(199,167,101,0.35)]"
            style={{ background: "linear-gradient(135deg, #C7A765 0%, #A8834D 100%)" }}
          >
            <FiLogIn />
            Login
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[11px] border border-white/10 bg-white/10 text-[20px] text-white lg:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-white/10 bg-[#1C1410] px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-1">
            {menus.map((menu) => (
              <button
                key={menu.label}
                type="button"
                onClick={() => handleMenuClick(menu.href)}
                className="rounded-[10px] px-4 py-3 text-left text-[14px] font-medium text-white/60 transition hover:bg-white/[0.07] hover:text-[#C7A765]"
              >
                {menu.label}
              </button>
            ))}

            <div className="mt-3 h-px bg-white/[0.07]" />

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setOpen(false); navigate("/register"); }}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/5 text-[14px] font-semibold text-white transition hover:bg-white/10"
              >
                <FiUserPlus />
                Register
              </button>
              <button
                type="button"
                onClick={() => { setOpen(false); navigate("/login"); }}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[12px] text-[14px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #C7A765 0%, #A8834D 100%)" }}
              >
                <FiLogIn />
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}