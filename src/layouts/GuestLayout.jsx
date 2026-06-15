import { Outlet } from "react-router-dom";

import GuestNavbar from "../components/GuestNavbar";
import GuestFooter from "../components/GuestFooter";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#2D2723]">
      {/* Navbar Guest */}
      <GuestNavbar />

      {/* Content */}
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <GuestFooter />
    </div>
  );
}