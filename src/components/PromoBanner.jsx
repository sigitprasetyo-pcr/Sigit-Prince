import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const promoCode = "AURELIA20";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section id="promo" className="py-16 md:py-24 bg-ivory scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-burgundy shadow-2xl border border-white/10">
          
          {/* Subtle gold circles in background */}
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-soft-gold/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 right-1/2 w-80 h-80 rounded-full bg-dusty-rose/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Content Column */}
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 flex flex-col justify-center text-white relative z-10">
              
              {/* Promo Category */}
              <div className="inline-flex items-center gap-1.5 self-start bg-white/10 text-soft-gold text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
                <Sparkles size={12} />
                <span>Special Offer</span>
              </div>

              {/* Promo Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                Lengkapi Gayamu dengan Diskon hingga 20%
              </h2>

              {/* Promo Description */}
              <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed mb-8 max-w-lg">
                Nikmati penawaran khusus untuk koleksi pilihan selama periode promosi ini. Tingkatkan penampilan Anda dengan busana yang dirancang eksklusif.
              </p>

              {/* Coupon Code Area */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
                {/* Coupon Code display */}
                <div className="bg-white/10 border border-white/20 rounded-full px-6 py-4 flex items-center justify-between gap-8 backdrop-blur-sm">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">
                      KODE PROMO
                    </span>
                    <span className="font-display text-lg font-bold text-soft-gold tracking-widest leading-none">
                      {promoCode}
                    </span>
                  </div>
                  
                  {/* Clipboard status icon */}
                  <button 
                    onClick={handleCopyCode}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Salin kode kupon"
                  >
                    {copied ? <Check size={18} className="text-soft-gold" /> : <Copy size={18} />}
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleCopyCode}
                  className="bg-soft-gold hover:bg-soft-gold/90 text-charcoal font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      <span>Kode Disalin!</span>
                    </>
                  ) : (
                    <>
                      <span>Ambil Promonya</span>
                    </>
                  )}
                </button>
              </div>

              <span className="font-body text-xs text-white/50 italic">
                * Berlaku untuk item berlabel khusus dan pembelian pertama.
              </span>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-soft-grey">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80"
                alt="Boutique dress discount coupon model"
                className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />
              {/* Overlay inside the image block to smooth the transition */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-burgundy via-transparent to-transparent opacity-40 lg:opacity-60" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
