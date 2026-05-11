import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2D2723]">
      <Sidebar />

      <div className="min-h-screen pl-[320px]">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}