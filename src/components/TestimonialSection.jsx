import React, { useState, useEffect } from "react";
import { Star, Quote, X, Check, PenTool } from "lucide-react";

export default function TestimonialSection() {
  const defaultTestimonials = [
    {
      id: 1,
      name: "Nadia Putri",
      city: "Yogyakarta",
      initials: "NP",
      review: "Bahannya sangat nyaman dan jahitannya rapi. Produknya terlihat jauh lebih cantik dan mewah saat dipakai secara langsung. Sangat merekomendasikan dress linen-nya!",
      rating: 5,
      status: "Approved",
      date: "28/06/2026"
    },
    {
      id: 2,
      name: "Rania Aulia",
      city: "Solo",
      initials: "RA",
      review: "Pelayanannya ramah sekali dan panduan ukuran yang direkomendasikan oleh tim customer service benar-benar sesuai dan pas di badan saya. Sangat membantu!",
      rating: 5,
      status: "Approved",
      date: "25/06/2026"
    },
    {
      id: 3,
      name: "Citra Maharani",
      city: "Semarang",
      initials: "CM",
      review: "Desainnya sangat elegan, tidak pasaran, dan mudah sekali dipadukan untuk acara semi-formal maupun kasual harian. Pengirimannya juga cepat sampai.",
      rating: 5,
      status: "Approved",
      date: "22/06/2026"
    }
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    review: "",
    rating: 5
  });

  useEffect(() => {
    const saved = localStorage.getItem("aurelia_testimonials");
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved));
      } catch (e) {
        setTestimonials(defaultTestimonials);
      }
    } else {
      localStorage.setItem("aurelia_testimonials", JSON.stringify(defaultTestimonials));
      setTestimonials(defaultTestimonials);
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rate) => {
    setForm({ ...form, rating: rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.review.trim()) return;

    const words = form.name.trim().split(" ");
    const initials = words.slice(0, 2).map(w => w.charAt(0).toUpperCase()).join("");

    const newReview = {
      id: Date.now(),
      name: form.name,
      city: form.city,
      initials: initials || "M",
      review: form.review,
      rating: form.rating,
      status: "Pending", // Admin will moderate this!
      date: new Date().toLocaleDateString("id-ID")
    };

    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem("aurelia_testimonials", JSON.stringify(updated));
    setSuccess(true);

    setTimeout(() => {
      setModalOpen(false);
      setSuccess(false);
      setForm({ name: "", city: "", review: "", rating: 5 });
    }, 2000);
  };

  // Only display approved testimonials on landing page
  const visibleTestimonials = testimonials.filter(t => t.status === "Approved");

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-ivory scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted mb-6">
            Kepercayaan dan kepuasan Anda adalah inspirasi utama kami untuk terus menyajikan koleksi terbaik.
          </p>

          {/* Write a Review Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-burgundy hover:bg-burgundy/95 text-white font-medium px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-103 active:scale-97 text-xs font-body"
          >
            <PenTool size={12} className="text-soft-gold" />
            <span>Kirim Ulasan Anda</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white p-8 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-soft-grey relative flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
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
                  {[...Array(5 - test.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-soft-grey" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-sm leading-relaxed text-[#4F4740] mb-6 italic text-left">
                  "{test.review}"
                </p>
              </div>

              {/* Profile info */}
              <div className="flex items-center gap-4 pt-4 border-t border-soft-grey">
                {/* Avatar Initials */}
                <div className="w-10 h-10 rounded-full bg-soft-gold flex items-center justify-center text-white font-display text-sm font-bold shadow-sm flex-shrink-0">
                  {test.initials}
                </div>
                
                <div className="flex flex-col text-left">
                  <span className="font-display text-sm font-bold text-charcoal leading-none mb-1">
                    {test.name}
                  </span>
                  <span className="font-body text-[11px] text-muted">
                    {test.city} · {test.date || "Baru"}
                  </span>
                </div>
              </div>

            </div>
          ))}

          {visibleTestimonials.length === 0 && (
            <div className="col-span-3 py-10 text-center">
              <p className="text-sm font-body text-muted">Belum ada ulasan yang disetujui untuk ditampilkan.</p>
            </div>
          )}
        </div>

      </div>

      {/* ─── TESTIMONIAL FORM MODAL ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setModalOpen(false)}
          />

          <div
            className="relative z-10 w-full max-w-[460px] rounded-[28px] border border-white/60 p-8 sm:p-10 shadow-[0_24px_60px_rgba(122,46,58,0.15)] overflow-hidden transition-all duration-300 animate-fade-in"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[4px]"
              style={{ background: "linear-gradient(90deg, #7A2E3A, #C5A46D, #7A2E3A)" }}
            />

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-charcoal/60 hover:text-burgundy transition-colors p-1.5 rounded-full hover:bg-charcoal/5"
            >
              <X size={16} />
            </button>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <h3 className="font-serif text-[24px] font-normal text-[#1C1410] leading-none mb-2">
                    Kirim Ulasan Anda ✍️
                  </h3>
                  <p className="text-[12px] text-[#7C6B5B] font-light leading-relaxed">
                    Ulasan Anda akan dimoderasi oleh admin sebelum ditampilkan secara publik di beranda Aurelia Boutique.
                  </p>
                </div>

                {/* Rating Input */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
                    Nilai Rating Anda
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => handleRatingClick(rate)}
                        onMouseEnter={() => setHoverRating(rate)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          size={28}
                          className={`transition-colors duration-200 ${
                            rate <= (hoverRating || form.rating)
                              ? "fill-soft-gold text-soft-gold"
                              : "text-soft-grey"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan nama lengkap"
                    className="h-[48px] w-full rounded-[14px] px-4 text-[13px] text-[#2D2723] outline-none transition-all duration-300 placeholder:text-[#C0B4A6] hover:border-[#C5A46D]/60 border border-charcoal/10"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
                    Kota Domisili
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Jakarta"
                    className="h-[48px] w-full rounded-[14px] px-4 text-[13px] text-[#2D2723] outline-none transition-all duration-300 placeholder:text-[#C0B4A6] hover:border-[#C5A46D]/60 border border-charcoal/10"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
                    Pesan Ulasan
                  </label>
                  <textarea
                    name="review"
                    value={form.review}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tulis ulasan Anda tentang kualitas bahan, jahitan, atau layanan kami..."
                    className="w-full rounded-[14px] p-4 text-[13px] text-[#2D2723] outline-none transition-all duration-300 placeholder:text-[#C0B4A6] hover:border-[#C5A46D]/60 border border-charcoal/10 resize-none"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[50px] bg-burgundy text-[#C5A46D] font-semibold rounded-[14px] flex items-center justify-center gap-2 shadow-lg hover:bg-burgundy/95 transition-all active:scale-97 text-sm"
                >
                  <span>Kirim Ulasan</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                <div
                  className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#2E9B5F] shadow-[0_12px_32px_rgba(46,155,95,0.35)]"
                >
                  <Check className="text-[38px] text-white" />
                </div>
                <h3 className="font-serif text-[22px] font-normal text-[#1C1410] leading-none mb-2">
                  Ulasan Dikirim! 🎉
                </h3>
                <p className="text-[13px] leading-relaxed text-[#7C6B5B] font-light max-w-[280px]">
                  Terima kasih. Ulasan Anda dikirim untuk dimoderasi oleh admin.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
