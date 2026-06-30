import React, { useState } from "react";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import products from "../data/Products";

export default function ProductSection({ 
  onAddToCart, 
  activeCategory, 
  setActiveCategory,
  onProductClick
}) {
  const [wishlist, setWishlist] = useState([]);
  
  const categories = ["Semua", "Dress", "Tops", "Outerwear", "Accessories"];

  const toggleWishlist = (productId) => {
    setWishlist((prev) => 
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter(p => p.category === activeCategory);

  const formatPrice = (price) => {
    if (typeof price === "string") {
      if (price.startsWith("Rp")) return price;
      return "Rp " + price;
    }
    return "Rp " + (price || 0).toLocaleString("id-ID");
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-ivory scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Koleksi Terbaru
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted">
            Pilihan terbaru yang dirancang untuk menyempurnakan penampilanmu.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm px-6 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-burgundy text-white shadow-md font-semibold"
                  : "bg-white text-charcoal hover:bg-soft-grey border border-charcoal/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_50px_rgba(122,46,58,0.08)] border border-soft-grey transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[3/4] overflow-hidden bg-soft-grey">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover for quick view style */}
                  <div 
                    onClick={() => onProductClick && onProductClick(product)}
                    className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer z-5"
                  >
                    <div className="bg-white/95 text-charcoal p-3 rounded-full shadow-md scale-90 group-hover:scale-100 transition-all duration-300">
                      <Eye size={20} className="text-burgundy" />
                    </div>
                    <span className="text-[11px] font-semibold text-white uppercase tracking-widest leading-none">
                      Lihat Detail
                    </span>
                  </div>

                  {/* Badges */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider ${
                        product.badge === "Sale" ? "bg-burgundy" : "bg-soft-gold"
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-charcoal hover:text-burgundy transition-all duration-300 hover:scale-110 active:scale-95 z-10"
                    aria-label="Tambah ke wishlist"
                  >
                    <Heart
                      size={18}
                      className={`transition-colors duration-300 ${
                        isWishlisted 
                          ? "fill-burgundy text-burgundy" 
                          : "text-charcoal/60 hover:text-burgundy"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-[11px] font-semibold text-soft-gold uppercase tracking-wider block">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 
                    onClick={() => onProductClick && onProductClick(product)}
                    className="font-display text-base font-bold text-charcoal group-hover:text-burgundy cursor-pointer transition-colors line-clamp-1 mb-2"
                  >
                    {product.name}
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={
                            star <= Math.round(product.rating)
                              ? "fill-soft-gold text-soft-gold"
                              : "text-soft-grey fill-soft-grey"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-muted">
                      {product.rating.toFixed(1)} ({product.reviews})
                    </span>
                  </div>

                  <p className="font-body text-xs text-muted line-clamp-2 leading-relaxed mb-4 flex-grow">
                    {product.description}
                  </p>

                  {/* Price and Add to Cart */}
                  <div className="pt-4 border-t border-soft-grey mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-xs text-muted line-through font-body">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="font-display text-base font-bold text-burgundy">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-burgundy text-white hover:bg-burgundy/90 p-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                      aria-label="Tambah ke keranjang"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => setActiveCategory("Semua")}
            className="inline-flex items-center justify-center bg-transparent border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-md active:scale-98"
          >
            Lihat Semua Koleksi
          </button>
        </div>

      </div>
    </section>
  );
}
