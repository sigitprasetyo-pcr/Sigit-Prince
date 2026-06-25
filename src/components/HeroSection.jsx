import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Truck } from "lucide-react";

export default function HeroSection() {
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <section id="home" className="relative overflow-hidden bg-ivory pt-8 pb-16 md:py-24 lg:py-32">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-dusty-rose/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-soft-gold/10 blur-3xl pointer-events-none" />
      
      {/* Thin elegant abstract line */}
      <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-gradient-to-r from-soft-gold/40 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in">
            {/* Pretitle */}
            <div className="inline-flex items-center gap-2 self-start bg-dusty-rose/15 text-burgundy text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
              <Sparkles size={14} className="text-soft-gold" />
              <span>New Season Collection 2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-tight">
              Gaya Elegan untuk <br />
              <span className="text-burgundy relative inline-block">
                Setiap Cerita
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-soft-gold/30 -z-10 rounded-full" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-body text-base md:text-lg text-muted max-w-xl leading-relaxed">
              Temukan koleksi fashion wanita pilihan yang dirancang untuk membuat setiap momen terasa lebih istimewa, nyaman, dan penuh percaya diri.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#products"
                onClick={(e) => handleScrollToSection(e, "products")}
                className="bg-burgundy text-white hover:bg-burgundy/95 text-center font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Belanja Sekarang
              </a>
              <a
                href="#categories"
                onClick={(e) => handleScrollToSection(e, "categories")}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white text-charcoal border border-charcoal/30 hover:border-burgundy font-medium px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight size={16} className="text-burgundy" />
              </a>
            </div>

            {/* Supporting Information Icons */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-charcoal/10 max-w-xl">
              <div className="flex flex-col items-start space-y-1">
                <div className="text-burgundy flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-soft-gold" />
                  <span className="font-display text-xs md:text-sm font-bold text-charcoal">Bahan Premium</span>
                </div>
                <span className="font-body text-[11px] text-muted leading-tight">Kurasi linen & katun terbaik</span>
              </div>
              
              <div className="flex flex-col items-start space-y-1">
                <div className="text-burgundy flex items-center gap-1.5">
                  <Heart size={16} className="text-soft-gold" />
                  <span className="font-display text-xs md:text-sm font-bold text-charcoal">Desain Eksklusif</span>
                </div>
                <span className="font-body text-[11px] text-muted leading-tight">Gaya terbatas & istimewa</span>
              </div>

              <div className="flex flex-col items-start space-y-1">
                <div className="text-burgundy flex items-center gap-1.5">
                  <Truck size={16} className="text-soft-gold" />
                  <span className="font-display text-xs md:text-sm font-bold text-charcoal">Kirim Nasional</span>
                </div>
                <span className="font-body text-[11px] text-muted leading-tight">Aman ke seluruh kota</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Hero Visual with Floating Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center animate-fade-in-delayed">
            {/* Elegant Background Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-soft-gold/20 to-dusty-rose/20 rounded-[32px] -rotate-3 scale-102 transform -z-10" />
            
            {/* Main Image Container */}
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white max-w-[420px] aspect-[3/4] w-full">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80"
                alt="Aurelia Boutique New Collection model"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>

            {/* Floating Glassmorphism Card */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white/85 backdrop-blur-md rounded-[20px] p-5 shadow-[0_15px_30px_rgba(122,46,58,0.12)] border border-white/60 max-w-[190px] animate-bounce-slow">
              <span className="text-[10px] font-bold text-burgundy uppercase tracking-widest block mb-1">
                New Arrival
              </span>
              <p className="font-display text-xl font-bold text-charcoal leading-tight">
                Koleksi Spesial 2026
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="bg-soft-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Up to 20% Off
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
