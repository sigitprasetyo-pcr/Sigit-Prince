import { useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => navigate("/")}
        title="Kembali ke halaman utama"
        className="group flex items-center gap-3 rounded-[18px] bg-[#3B2318] px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(59,35,24,0.45)]"
      >
        <div className="rounded-full bg-black/10 p-2 transition group-hover:bg-white/10">
          <FiUsers className="text-xl text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">Guest</div>
          <div className="text-sm">Boutique</div>
        </div>
      </button>
    </div>
  );
}
