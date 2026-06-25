import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CategorySection({ onSelectCategory }) {
  const categories = [
    {
      id: "dress",
      name: "Dress",
      count: "12 Koleksi",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80",
      filterName: "Dress"
    },
    {
      id: "outerwear",
      name: "Outerwear",
      count: "8 Koleksi",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&auto=format&fit=crop&q=80",
      filterName: "Outerwear"
    },
    {
      id: "tops",
      name: "Tops",
      count: "15 Koleksi",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
      filterName: "Tops"
    },
    {
      id: "accessories",
      name: "Accessories",
      count: "10 Koleksi",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80",
      filterName: "Accessories"
    }
  ];

  const handleCategoryClick = (e, filterName) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(filterName);
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

  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Temukan Gaya Favoritmu
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted">
            Jelajahi koleksi yang telah kami pilih untuk menemani berbagai suasana dan kesempatan.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={(e) => handleCategoryClick(e, cat.filterName)}
              className="group relative cursor-pointer overflow-hidden rounded-[24px] aspect-[4/5] bg-soft-grey shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

              {/* Category Details */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-soft-gold uppercase tracking-[0.2em] mb-1">
                  {cat.count}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-wide mb-3">
                  {cat.name}
                </h3>
                
                {/* Action Link */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-white transition-colors duration-200 self-start pb-0.5 border-b border-white/20 group-hover:border-white">
                  <span>Lihat Koleksi</span>
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
