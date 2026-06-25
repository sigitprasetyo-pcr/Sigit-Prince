import React from "react";

export default function AnnouncementBar() {
  const handleScrollToPromo = (e) => {
    e.preventDefault();
    const promoSection = document.getElementById("promo");
    if (promoSection) {
      promoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-burgundy text-white text-xs md:text-sm py-2.5 px-4 text-center font-medium transition-all duration-300 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span>Gratis ongkir untuk pembelian minimal Rp500.000 — Khusus pelanggan baru</span>
        <a 
          href="#promo" 
          onClick={handleScrollToPromo}
          className="text-soft-gold hover:text-white underline underline-offset-4 decoration-1 font-semibold transition duration-200"
        >
          Lihat Promo
        </a>
      </div>
    </div>
  );
}
