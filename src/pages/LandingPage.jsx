import React, { useState, useEffect } from "react";
import { X, Search as SearchIcon, ArrowRight, ShoppingBag, Star } from "lucide-react";

// Import custom Aurelia Boutique components
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BrandTrustStrip from "../components/BrandTrustStrip";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import BenefitsSection from "../components/BenefitsSection";
import PromoBanner from "../components/PromoBanner";
import AboutSection from "../components/AboutSection";
import TestimonialSection from "../components/TestimonialSection";
import InstagramSection from "../components/InstagramSection";
import FAQSection from "../components/FAQSection";
import FinalCTA from "../components/FinalCTA";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

// Import product data for search modal
import products from "../data/products";

export default function LandingPage() {
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle product addition to cart
  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    
    // Trigger toast notification
    setToast({
      visible: true,
      message: `${product.name} telah ditambahkan ke tas belanja Anda.`
    });
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Handle Search Input
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  // Clean query on modal close
  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSelectSearchedProduct = (categoryName) => {
    setActiveCategory(categoryName);
    handleCloseSearch();
    
    // Scroll to products
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
    <div className="bg-ivory min-h-screen relative font-body text-charcoal overflow-x-hidden select-none">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Navbar */}
      <Navbar 
        cartCount={cartCount} 
        onSearchClick={() => setSearchOpen(true)} 
      />

      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Brand Trust Strip */}
      <BrandTrustStrip />

      {/* 5. Category Section */}
      <CategorySection onSelectCategory={setActiveCategory} />

      {/* 6. Product Section */}
      <ProductSection 
        onAddToCart={handleAddToCart} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onProductClick={setSelectedProduct}
      />

      {/* 7. Benefits Section */}
      <BenefitsSection />

      {/* 8. Promotional Banner */}
      <PromoBanner />

      {/* 9. About Story Section */}
      <AboutSection />

      {/* 10. Testimonial Section */}
      <TestimonialSection />

      {/* 11. Instagram Section */}
      <InstagramSection />

      {/* 12. FAQ Section */}
      <FAQSection />

      {/* 13. Final CTA Section */}
      <FinalCTA />

      {/* 14. Newsletter Section */}
      <NewsletterSection />

      {/* 15. Footer Section */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* Custom Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
          toast.visible 
            ? "translate-y-0 opacity-100 scale-100" 
            : "translate-y-4 opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="bg-charcoal text-white px-6 py-4 rounded-[20px] shadow-2xl border border-white/10 flex items-center gap-3.5 max-w-sm sm:max-w-md">
          <div className="bg-burgundy p-1.5 rounded-full text-white">
            <ShoppingBag size={18} className="text-soft-gold" />
          </div>
          <div className="flex-grow pr-4">
            <span className="font-display text-xs font-bold text-soft-gold block uppercase tracking-wider mb-0.5">
              Berhasil Ditambahkan
            </span>
            <p className="font-body text-xs sm:text-sm text-white/95">
              {toast.message}
            </p>
          </div>
          <button 
            onClick={() => setToast({ visible: false, message: "" })} 
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden border border-soft-grey animate-scale-up">
            
            {/* Search Input Area */}
            <div className="p-6 border-b border-soft-grey flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-grow bg-soft-grey rounded-full px-5 py-3.5">
                <SearchIcon size={20} className="text-muted" />
                <input
                  type="text"
                  placeholder="Cari gaun, atasan, aksesoris..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-sm text-charcoal font-body placeholder-charcoal/40"
                  autoFocus
                />
              </div>
              <button
                onClick={handleCloseSearch}
                className="bg-soft-grey hover:bg-burgundy hover:text-white p-3 rounded-full text-charcoal transition-colors duration-200"
                aria-label="Tutup pencarian"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results Area */}
            <div className="p-6 max-h-[400px] overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-8 text-muted space-y-2">
                  <p className="font-display text-base font-bold text-charcoal">Cari Koleksi Aurelia</p>
                  <p className="font-body text-xs max-w-xs mx-auto">Ketikkan kata kunci di atas untuk mencari gaun, outerwear, atasan, atau aksesoris pilihan.</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-muted">
                  <p className="font-body text-sm">Tidak ditemukan produk untuk "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-display text-xs font-bold text-soft-gold uppercase tracking-wider">
                    Hasil Pencarian ({searchResults.length})
                  </p>
                  <div className="divide-y divide-soft-grey">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectSearchedProduct(product.category)}
                        className="py-3.5 flex items-center gap-4 cursor-pointer hover:bg-ivory/30 rounded-xl px-2 transition-colors duration-200"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-16 object-cover rounded-lg bg-soft-grey flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <span className="text-[10px] font-semibold text-soft-gold uppercase tracking-widest block">
                            {product.category}
                          </span>
                          <h4 className="font-display text-sm font-bold text-charcoal">
                            {product.name}
                          </h4>
                          <span className="font-body text-xs text-burgundy font-medium">
                            Rp {product.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="text-muted group-hover:text-burgundy">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal (Quick View) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
          <div className="bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden border border-soft-grey grid grid-cols-1 md:grid-cols-2 animate-scale-up relative max-h-[90vh] md:max-h-[85vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-burgundy hover:text-white p-2.5 rounded-full shadow-md text-charcoal transition-all duration-200"
              aria-label="Tutup detail produk"
            >
              <X size={20} />
            </button>

            {/* Left Column: Product Image */}
            <div className="relative h-64 md:h-full bg-soft-grey overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
              />
              {selectedProduct.badge && (
                <span className={`absolute top-6 left-6 text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider ${
                  selectedProduct.badge === "Sale" ? "bg-burgundy" : "bg-soft-gold"
                }`}>
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Right Column: Product Description and Details */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto h-full">
              <div className="space-y-4">
                
                {/* Category and Rating */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-bold text-soft-gold uppercase tracking-widest">
                    {selectedProduct.category}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={
                          star <= Math.round(selectedProduct.rating)
                            ? "fill-soft-gold text-soft-gold"
                            : "text-soft-grey fill-soft-grey"
                        }
                      />
                    ))}
                    <span className="text-[11px] font-semibold text-muted ml-1">
                      {selectedProduct.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  {selectedProduct.name}
                </h3>

                {/* Price block */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-display text-xl sm:text-2xl font-bold text-burgundy">
                    Rp {selectedProduct.price.toLocaleString("id-ID")}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-muted line-through font-body text-charcoal/40">
                      Rp {selectedProduct.originalPrice.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-soft-grey" />

                {/* Description */}
                <div className="space-y-2">
                  <p className="font-display text-xs font-bold text-charcoal uppercase tracking-wider">
                    Deskripsi Produk
                  </p>
                  <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Additional Info / Features */}
                <div className="pt-2 space-y-1.5 font-body text-xs text-muted">
                  <p>✔ <span className="font-semibold text-charcoal">Bahan:</span> Katun & Linen premium pilihan.</p>
                  <p>✔ <span className="font-semibold text-charcoal">Instruksi Perawatan:</span> Dry clean / cuci tangan dengan air dingin.</p>
                  <p>✔ <span className="font-semibold text-charcoal">Stok:</span> Terbatas (Eksklusif Aurelia Boutique).</p>
                </div>

              </div>

              {/* Add to Cart CTA */}
              <div className="pt-6 border-t border-soft-grey mt-6 flex items-center gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-grow bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingBag size={18} />
                  <span>Tambah ke Tas Belanja</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}