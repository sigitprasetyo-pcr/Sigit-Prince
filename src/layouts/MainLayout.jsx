import { Outlet } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />

      <main className="lg:ml-72 min-h-screen">
        <Header />

        <Outlet />

        <footer className="p-8 md:p-12 border-t border-neutral-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="text-[10px] label-caps text-neutral-400 tracking-[0.2em]">
            © 2024 VelvetNova Private Atelier. All Rights Reserved.
          </p>

          <div className="flex space-x-8">
            <a className="text-[10px] label-caps text-neutral-400 hover:text-primary transition">
              Kebijakan Privasi
            </a>
            <a className="text-[10px] label-caps text-neutral-400 hover:text-primary transition">
              Bantuan Teknis
            </a>
          </div>
        </footer>
      </main>

      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
        <MdAdd className="text-2xl" />
      </button>
    </div>
  );
}