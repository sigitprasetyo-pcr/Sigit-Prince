import React from "react";
import { Feather, Gem, Zap, HeartHandshake } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Feather className="text-burgundy" size={28} />,
      title: "Material Pilihan",
      desc: "Setiap produk dipilih dengan memperhatikan kenyamanan dan kualitas bahan premium."
    },
    {
      icon: <Gem className="text-burgundy" size={28} />,
      title: "Desain Terbatas",
      desc: "Koleksi dibuat dalam jumlah terbatas agar setiap gaya terasa lebih eksklusif dan istimewa."
    },
    {
      icon: <Zap className="text-burgundy" size={28} />,
      title: "Pengiriman Cepat",
      desc: "Pesanan diproses secara instan dan dikirim dengan aman ke seluruh wilayah Indonesia."
    },
    {
      icon: <HeartHandshake className="text-burgundy" size={28} />,
      title: "Layanan Personal",
      desc: "Tim kami siap membantu Anda memilih produk, panduan ukuran, dan gaya yang paling sesuai."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Mengapa Memilih Aurelia?
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted">
            Kami percaya bahwa pengalaman berbelanja yang baik dimulai dari kualitas, perhatian, dan rasa percaya.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white border border-[#EEE7DF] p-8 rounded-[24px] shadow-[0_8px_30px_rgba(45,39,35,0.02)] hover:shadow-[0_24px_50px_rgba(122,46,58,0.07)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-[20px] bg-ivory border border-soft-gold/30 shadow-inner group-hover:bg-burgundy group-hover:border-burgundy group-hover:scale-110 transition-all duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
              </div>

              {/* Text Details */}
              <h3 className="font-display text-lg font-bold text-charcoal mb-3 group-hover:text-burgundy transition-colors duration-200">
                {benefit.title}
              </h3>
              
              <p className="font-body text-xs md:text-sm text-muted leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
