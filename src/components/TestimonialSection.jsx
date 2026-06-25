import React from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Nadia Putri",
      city: "Yogyakarta",
      initials: "NP",
      review: "Bahannya sangat nyaman dan jahitannya rapi. Produknya terlihat jauh lebih cantik dan mewah saat dipakai secara langsung. Sangat merekomendasikan dress linen-nya!",
      rating: 5
    },
    {
      id: 2,
      name: "Rania Aulia",
      city: "Solo",
      initials: "RA",
      review: "Pelayanannya ramah sekali dan panduan ukuran yang direkomendasikan oleh tim customer service benar-benar sesuai dan pas di badan saya. Sangat membantu!",
      rating: 5
    },
    {
      id: 3,
      name: "Citra Maharani",
      city: "Semarang",
      initials: "CM",
      review: "Desainnya sangat elegan, tidak pasaran, dan mudah sekali dipadukan untuk acara semi-formal maupun kasual harian. Pengirimannya juga cepat sampai.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-ivory scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted">
            Kepercayaan dan kepuasan Anda adalah inspirasi utama kami untuk terus menyajikan koleksi terbaik.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white p-8 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-soft-grey relative flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon overlay */}
              <div className="absolute top-6 right-8 text-soft-gold/20 pointer-events-none">
                <Quote size={40} className="fill-soft-gold/10" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-soft-gold text-soft-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-sm leading-relaxed text-charcoal/80 mb-6 italic">
                  "{test.review}"
                </p>
              </div>

              {/* Profile info */}
              <div className="flex items-center gap-4 pt-4 border-t border-soft-grey">
                {/* Avatar Initials */}
                <div className="w-12 h-12 rounded-full bg-soft-gold flex items-center justify-center text-white font-display text-base font-bold shadow-sm flex-shrink-0">
                  {test.initials}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-charcoal">
                    {test.name}
                  </span>
                  <span className="font-body text-xs text-muted">
                    {test.city}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
