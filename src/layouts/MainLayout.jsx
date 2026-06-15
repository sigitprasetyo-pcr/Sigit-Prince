import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#2D2723]">
      <Sidebar />

      <div className="ml-[210px] min-h-screen">
        <Header />

        <main className="min-h-[calc(100vh-54px)]">
          <Outlet />
        </main>
      </div>

      <FloatingButton />
    </div>
  );
}