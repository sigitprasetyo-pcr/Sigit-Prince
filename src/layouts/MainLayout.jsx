import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const whatsappNumber = "6282284828136";
  const whatsappMessage =
    "Halo, saya ingin bertanya mengenai VelvetNova Private Atelier.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

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

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 w-16 h-16 bg-green-500 text-white shadow-2xl flex items-center justify-center hover:scale-105 hover:bg-green-600 transition-all duration-300 rounded-full z-50"
        aria-label="Chat WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}