import React from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { FiInstagram, FiFacebook, FiMessageCircle } from "react-icons/fi";

export default function Footer({ onSelectCategory }) {
  
  const handleCategoryClick = (e, categoryName) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
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

  const handleScrollToFAQ = (e) => {
    e.preventDefault();
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = faqSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToHome = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <a 
              href="#home" 
              onClick={handleScrollToHome} 
              className="flex flex-col select-none inline-block"
            >
              <span className="font-display text-2xl font-bold tracking-wide text-white leading-none">
                Aurelia
              </span>
              <span className="font-body text-[9px] uppercase tracking-[0.3em] text-soft-gold font-semibold ml-0.5 mt-0.5">
                Boutique
              </span>
            </a>
            <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
              Membantu setiap perempuan mengekspresikan karakter terbaiknya melalui koleksi pakaian wanita premium yang modern, feminin, dan elegan.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-burgundy hover:text-white flex items-center justify-center text-white/80 transition-all duration-300"
                aria-label="Instagram Aurelia Boutique"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-burgundy hover:text-white flex items-center justify-center text-white/80 transition-all duration-300"
                aria-label="Facebook Aurelia Boutique"
              >
                <FiFacebook size={18} />
              </a>
              {/* TikTok Custom SVG */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-burgundy hover:text-white flex items-center justify-center text-white/80 transition-all duration-300"
                aria-label="TikTok Aurelia Boutique"
              >
                <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.13 1.2 2.66 1.94 4.29 2.11v3.96c-1.89-.07-3.75-.76-5.26-1.92-.09-.07-.15-.17-.28-.32v5.82c.06 2.27-1 4.54-2.88 5.8a7.848 7.848 0 0 1-8.52.48c-2.31-1.39-3.72-4.04-3.55-6.75.12-3.13 2.51-5.83 5.61-6.19 1.16-.13 2.34.09 3.39.63v4.18c-.6-.41-1.32-.6-2.04-.53-1.44.11-2.65 1.25-2.9 2.67-.37 1.83.92 3.65 2.76 3.86 1.48.16 2.94-.78 3.31-2.22.12-.47.16-.96.15-1.44V0h-.01z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-burgundy hover:text-white flex items-center justify-center text-white/80 transition-all duration-300"
                aria-label="WhatsApp Aurelia Boutique"
              >
                <FiMessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Shopping Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-sm font-bold tracking-widest text-soft-gold uppercase">
              Belanja
            </h3>
            <ul className="space-y-2.5 font-body text-xs sm:text-sm text-white/60">
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Semua")} className="hover:text-white transition duration-200 block">
                  Koleksi Terbaru
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Dress")} className="hover:text-white transition duration-200 block">
                  Dress
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Tops")} className="hover:text-white transition duration-200 block">
                  Tops
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Outerwear")} className="hover:text-white transition duration-200 block">
                  Outerwear
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Accessories")} className="hover:text-white transition duration-200 block">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help / Assistance */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-sm font-bold tracking-widest text-soft-gold uppercase">
              Bantuan
            </h3>
            <ul className="space-y-2.5 font-body text-xs sm:text-sm text-white/60">
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Semua")} className="hover:text-white transition duration-200 block">
                  Panduan Ukuran
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Semua")} className="hover:text-white transition duration-200 block">
                  Cara Pemesanan
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Semua")} className="hover:text-white transition duration-200 block">
                  Pengiriman
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleCategoryClick(e, "Semua")} className="hover:text-white transition duration-200 block">
                  Penukaran Produk
                </a>
              </li>
              <li>
                <a href="#faq" onClick={handleScrollToFAQ} className="hover:text-white transition duration-200 block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-sm font-bold tracking-widest text-soft-gold uppercase">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 font-body text-xs sm:text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-soft-gold flex-shrink-0 mt-0.5" />
                <span>Yogyakarta, Indonesia</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="text-soft-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@aureliaboutique.id" className="hover:text-white transition">hello@aureliaboutique.id</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-soft-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+6281234567890" className="hover:text-white transition">+62 812-3456-7890</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-soft-gold flex-shrink-0 mt-0.5" />
                <span>Senin–Sabtu, 09.00–17.00 WIB</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Area */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40 text-center md:text-left">
            &copy; 2026 Aurelia Boutique. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 font-body text-xs text-white/40">
            <a href="#home" onClick={handleScrollToHome} className="hover:text-white transition">Kebijakan Privasi</a>
            <a href="#home" onClick={handleScrollToHome} className="hover:text-white transition">Syarat & Ketentuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
