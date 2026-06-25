import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar({ cartCount = 0, onSearchClick }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Koleksi", href: "#products" },
    { label: "Kategori", href: "#categories" },
    { label: "Tentang Kami", href: "#about" },
    { label: "Testimoni", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Offset for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-[38px] sm:top-[44px] md:top-[40px] lg:top-[44px] left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-soft-grey py-3"
            : "bg-transparent py-5"
        }`}
        style={{
          top: scrolled ? "0px" : undefined // When scrolled, snap to the absolute top of screen
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="flex flex-col select-none"
            >
              <span className="font-display text-2xl md:text-3xl font-bold tracking-wide text-burgundy leading-none">
                Aurelia
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-soft-gold font-semibold ml-0.5 mt-0.5">
                Boutique
              </span>
            </a>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href.substring(1))}
                  className="font-body text-sm font-medium text-charcoal hover:text-burgundy transition-colors duration-200 relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search Button */}
              <button
                onClick={onSearchClick}
                className="text-charcoal hover:text-burgundy transition-colors duration-200 p-1.5 rounded-full hover:bg-soft-grey"
                aria-label="Cari produk"
              >
                <Search size={20} />
              </button>

              {/* Shopping Bag */}
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="relative text-charcoal hover:text-burgundy transition-colors duration-200 p-1.5 rounded-full hover:bg-soft-grey"
                aria-label="Keranjang belanja"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-burgundy rounded-full transform translate-x-1 -translate-y-1">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Divider */}
              <div className="h-5 w-[1px] bg-charcoal/15 self-center" />

              {/* Login Button */}
              <button
                onClick={() => navigate("/login")}
                className="font-body text-sm font-medium text-charcoal hover:text-burgundy transition-colors duration-200"
              >
                Masuk
              </button>

              {/* Register Button */}
              <button
                onClick={() => navigate("/register")}
                className="font-body text-sm font-medium text-burgundy hover:bg-burgundy hover:text-white border border-burgundy/30 px-4.5 py-2 rounded-full transition-all duration-300 active:scale-95"
              >
                Daftar
              </button>

              {/* CTA Button */}
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="bg-burgundy text-white hover:bg-burgundy/90 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Belanja Sekarang
              </a>
            </div>

            {/* Mobile Actions and Hamburger */}
            <div className="flex items-center space-x-4 lg:hidden">
              {/* Search Button Mobile */}
              <button
                onClick={onSearchClick}
                className="text-charcoal hover:text-burgundy p-2 rounded-full hover:bg-soft-grey"
                aria-label="Cari produk"
              >
                <Search size={20} />
              </button>

              {/* Shopping Bag Mobile */}
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="relative text-charcoal hover:text-burgundy p-2 rounded-full hover:bg-soft-grey"
                aria-label="Keranjang belanja"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-burgundy rounded-full transform translate-x-1 -translate-y-1">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-charcoal hover:text-burgundy p-2 rounded-full hover:bg-soft-grey transition-colors"
                aria-label="Buka menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden fixed inset-x-0 bg-white border-b border-soft-grey shadow-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          style={{
            top: scrolled ? "57px" : "72px",
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto"
          }}
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
                className="block px-4 py-3 rounded-lg text-base font-medium text-charcoal hover:bg-ivory hover:text-burgundy transition-all"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 px-4 border-t border-soft-grey space-y-3">
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="block w-full text-center bg-burgundy text-white font-medium py-3 rounded-full transition-all active:scale-95"
              >
                Belanja Sekarang
              </a>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
                  className="w-full text-center border border-burgundy/30 text-burgundy font-medium py-2.5 rounded-full transition-all active:scale-95 text-sm"
                >
                  Masuk
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate("/register"); }}
                  className="w-full text-center bg-soft-gold text-charcoal font-semibold py-2.5 rounded-full transition-all active:scale-95 text-sm"
                >
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Adjust scroll padding for fixed navbar */}
      <div className="h-[72px] sm:h-[80px]" />
    </>
  );
}
