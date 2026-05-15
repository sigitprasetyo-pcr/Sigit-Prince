import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#2D2723]">
      <Sidebar />

      <div className="min-h-screen pl-[180px]">
        <Header />

        <main className="min-h-[calc(100vh-54px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}