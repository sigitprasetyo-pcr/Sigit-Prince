import { Outlet, useNavigate, Link } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import GuestFooter from "../components/GuestFooter";

export default function MemberLayout() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#2D2723]">
      <header className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: "rgba(28, 20, 16, 0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(199,167,101,0.15)",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6">
          {/* LOGO */}
          <Link to="/member" className="flex items-center gap-3">
            <div
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] text-[16px] font-bold text-white shadow-md"
              style={{ background: "linear-gradient(135deg, #C7A765 0%, #A8834D 100%)" }}
            >
              H
            </div>
            <div>
              <h1 className="text-[16px] font-bold leading-none tracking-wide text-white">
                Aurelia
              </h1>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-[#C7A765]">
                Member Area
              </p>
            </div>
          </Link>

          {/* USER NAV */}
          <div className="flex items-center gap-4">
             <div className="hidden items-center gap-3 md:flex border-r border-white/10 pr-4 mr-1">
               <div className="text-right">
                  <p className="text-[13px] font-semibold text-white/90">{user?.name || "Member"}</p>
                  <p className="text-[10px] text-[#C7A765] capitalize">{user?.role || "Member"}</p>
               </div>
               <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white/10 text-white/70">
                  <FiUser />
               </div>
             </div>
             
             <button
               type="button"
               onClick={handleLogout}
               className="flex h-[40px] items-center gap-2 rounded-[12px] px-4 text-[13px] font-semibold text-white transition hover:bg-white/10"
             >
               <FiLogOut />
               <span className="hidden sm:inline">Keluar</span>
             </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <GuestFooter />
    </div>
  );
}
