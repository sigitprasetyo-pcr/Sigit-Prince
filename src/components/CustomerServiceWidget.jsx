import React, { useState } from "react";
import { MessageCircle, X, Send, PhoneCall } from "lucide-react";

export default function CustomerServiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const presetMessages = [
    {
      label: "📏 Tanya Ukuran & Fitting",
      text: "Halo Aurelia Boutique, saya ingin bertanya tentang panduan ukuran dan fitting produk.",
    },
    {
      label: "👗 Tanya Ketersediaan Stok",
      text: "Halo Aurelia Boutique, saya ingin menanyakan ketersediaan stok untuk koleksi terbaru.",
    },
    {
      label: "🚚 Lacak Pengiriman Paket",
      text: "Halo Aurelia Boutique, boleh bantu saya melacak pengiriman pesanan saya?",
    },
  ];

  const handleSendPreset = (text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, "_blank");
  };

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, "_blank");
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-body">
      {/* ─── CHAT BUBBLE TRIGGER ─── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-white shadow-[0_12px_40px_rgba(122,46,58,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Hubungi Customer Service"
        >
          {/* Pulse ring decoration */}
          <span className="absolute inset-0 animate-ping rounded-full bg-burgundy/40 opacity-75" />
          <MessageCircle size={26} className="relative z-10 transition-transform group-hover:rotate-6 text-[#C5A46D]" />
        </button>
      )}

      {/* ─── CHAT WINDOW ─── */}
      {isOpen && (
        <div
          className="w-[340px] rounded-[24px] bg-white shadow-[0_20px_50px_rgba(122,46,58,0.18)] border border-soft-grey overflow-hidden transition-all duration-300 animate-fade-in"
          style={{
            transformOrigin: "bottom left",
          }}
        >
          {/* Header */}
          <div className="bg-burgundy p-4 flex items-center justify-between border-b border-[#C5A46D]/20">
            <div className="flex items-center gap-3">
              {/* Avatar with gold outline */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-[#C5A46D] bg-[#2D2723] flex items-center justify-center text-white font-serif text-sm font-bold shadow-inner">
                  A
                </div>
                {/* Active indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#2E9B5F] border-2 border-burgundy shadow-sm" />
              </div>
              <div className="text-left">
                <h4 className="font-display text-sm font-bold text-white tracking-wide">
                  Aurelia Concierge
                </h4>
                <p className="text-[10px] text-soft-gold/80 font-medium tracking-wider uppercase">
                  Customer Service · Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
              aria-label="Tutup Chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 max-h-[300px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {/* Welcome msg */}
            <div className="bg-ivory/50 border border-soft-grey rounded-[18px] p-3.5 text-xs text-charcoal/80 leading-relaxed text-left">
              👋 Selamat datang di <strong>Aurelia Boutique</strong>. 
              <p className="mt-1">
                Ada yang bisa asisten concierge kami bantu? Silakan pilih menu cepat di bawah untuk berkonsultasi secara instan:
              </p>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-soft-gold uppercase tracking-widest text-left">
                Pilih Topik Pertanyaan
              </p>
              {presetMessages.map((msg) => (
                <button
                  key={msg.label}
                  onClick={() => handleSendPreset(msg.text)}
                  className="w-full text-left bg-white hover:bg-ivory/60 border border-charcoal/10 rounded-[14px] px-3.5 py-2.5 text-xs text-charcoal font-medium shadow-sm transition-all hover:border-[#C5A46D]/60 flex items-center justify-between group"
                >
                  <span>{msg.label}</span>
                  <PhoneCall size={12} className="text-soft-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input Footer */}
          <form onSubmit={handleSendCustom} className="p-3 border-t border-soft-grey bg-ivory/30 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan kustom..."
              className="flex-grow h-10 px-4 rounded-full border border-charcoal/10 text-xs outline-none bg-white focus:border-[#C5A46D] transition-colors placeholder:text-muted"
            />
            <button
              type="submit"
              className="h-10 w-10 rounded-full bg-burgundy text-[#C5A46D] flex items-center justify-center shadow-md hover:bg-burgundy/90 transition-all active:scale-95 flex-shrink-0"
              aria-label="Kirim Pesan"
            >
              <Send size={14} className="translate-x-[1px]" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
