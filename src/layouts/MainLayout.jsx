import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {
  const { dark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark ? "bg-[#110E0B] text-[#E8E0D5]" : "bg-[#F7F5F2] text-[#2D2723]"
      }`}
    >
      <Sidebar />

      <div className="ml-[220px] min-h-screen">
        <Header />

        <main className="min-h-[calc(100vh-54px)]">
          <Outlet />
        </main>
      </div>

      <FloatingButton />
    </div>
  );
}