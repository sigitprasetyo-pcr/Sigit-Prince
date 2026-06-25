import React from "react";
import { Star, MapPin, Sparkles } from "lucide-react";

export default function AboutSection() {
  const stats = [
    {
      value: "50+",
      label: "Koleksi Pilihan",
      desc: "Busana kurasi desainer ternama",
      icon: <Sparkles className="text-soft-gold" size={18} />
    },
    {
      value: "1.000+",
      label: "Pelanggan",
      desc: "Wanita Indonesia yang percaya diri",
      icon: <Star className="text-soft-gold" size={18} />
    },
    {
      value: "20+",
      label: "Kota Tujuan",
      desc: "Pengiriman cepat dan terpercaya",
      icon: <MapPin className="text-soft-gold" size={18} />
    }
  ];

  const handleLearnMore = (e) => {
    e.preventDefault();
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
            {/* Soft gold backdrop frame */}
            <div className="absolute inset-0 bg-soft-gold/20 rounded-[32px] rotate-3 scale-102 transform -z-10" />
            
            {/* Image Container */}
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full max-w-[500px]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
                alt="Aurelia Boutique Interior"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            
            {/* Small floating badge */}
            <div className="absolute top-8 left-8 bg-burgundy text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
              Est. 2026
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 order-1 lg:order-2">
            
            {/* Section Tag */}
            <div className="inline-block text-xs font-bold text-burgundy uppercase tracking-widest bg-dusty-rose/15 px-4 py-1.5 rounded-full">
              Brand Story
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              Lebih dari Sekadar Pakaian
            </h2>

            {/* Description */}
            <p className="font-body text-sm md:text-base text-muted leading-relaxed">
              Aurelia Boutique hadir untuk membantu perempuan mengekspresikan karakter melalui gaya yang elegan, nyaman, dan relevan. Setiap koleksi dipilih dengan penuh perhatian agar mudah dipadukan dan dapat dikenakan dalam berbagai kesempatan. Kami percaya pakaian adalah media perayaan kepribadian Anda yang unik.
            </p>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-charcoal/10">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex items-center gap-1.5">
                    {stat.icon}
                    <span className="font-display text-2xl md:text-3xl font-bold text-burgundy">
                      {stat.value}
                    </span>
                  </div>
                  <span className="font-display text-sm font-bold text-charcoal">
                    {stat.label}
                  </span>
                  <span className="font-body text-[11px] text-muted leading-tight">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="#faq"
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center bg-burgundy hover:bg-burgundy/95 text-white font-medium px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Kenali Aurelia
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
