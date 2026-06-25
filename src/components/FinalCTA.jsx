import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById("products");
    if (productsSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = productsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-burgundy">
      
      {/* Background Image with Dark Burgundy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
          alt="Curated elegant boutique fabrics background"
          className="w-full h-full object-cover object-center filter brightness-40 contrast-95"
        />
        {/* Subtle Burgundy radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-burgundy/90 to-burgundy/75 mix-blend-multiply" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center text-white space-y-6 md:space-y-8">
        
        {/* Decorative element */}
        <div className="w-12 h-1 bg-soft-gold mx-auto rounded-full" />

        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl mx-auto">
          Temukan Gaya yang Membuatmu Lebih Percaya Diri
        </h2>

        {/* Description */}
        <p className="font-body text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          Jelajahi koleksi Aurelia dan temukan fashion pilihan untuk melengkapi setiap momen berhargamu dengan kenyamanan ekstra.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#products"
            onClick={handleScrollToProducts}
            className="w-full sm:w-auto bg-soft-gold hover:bg-soft-gold/90 text-charcoal font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Belanja Koleksi</span>
            <ArrowRight size={16} />
          </a>
          
          <a
            href="https://wa.me/6281234567890?text=Halo%20Aurelia%20Boutique,%20saya%20ingin%20konsultasi%20mengenai%20ukuran%20dan%20koleksi%20terbaru."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} className="text-soft-gold" />
            <span>Konsultasi via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
