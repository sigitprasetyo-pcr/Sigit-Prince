import React, { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Alamat email tidak boleh kosong.");
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format alamat email tidak valid.");
      return;
    }

    // Success state
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-ivory rounded-[32px] p-8 sm:p-12 md:p-16 border border-soft-gold/25 shadow-[0_15px_45px_rgba(197,164,109,0.06)] text-center relative overflow-hidden">
          
          {/* Subtle details */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-soft-gold/5 rounded-full blur-xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-burgundy/5 rounded-full blur-xl" />

          {success ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-4 animate-fade-in">
              <div className="bg-burgundy text-white p-4 rounded-full shadow-md">
                <CheckCircle size={32} className="text-soft-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-charcoal">
                Terima Kasih!
              </h3>
              <p className="font-body text-sm sm:text-base text-muted max-w-md">
                Kamu telah bergabung dengan Aurelia. Nantikan informasi mengenai koleksi terbaru dan penawaran eksklusif langsung di inbox-mu.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-xs font-semibold text-burgundy hover:text-burgundy/80 underline underline-offset-4"
              >
                Daftar dengan email lain
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  Dapatkan Kabar Terbaru dari Aurelia
                </h2>
                <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                  Jadilah yang pertama mengetahui koleksi baru, inspirasi gaya, dan penawaran khusus dari butik kami.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-3 sm:space-y-0 sm:flex items-stretch justify-center gap-2 max-w-md mx-auto">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Alamat email Anda"
                    className="block w-full pl-11 pr-4 py-3.5 border border-charcoal/20 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy text-sm text-charcoal font-body placeholder-charcoal/40"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-burgundy hover:bg-burgundy/95 text-white font-semibold px-6 py-3.5 rounded-full shadow-md transition-all active:scale-98 text-sm"
                >
                  Daftar Sekarang
                </button>
              </form>

              {/* Validation Error Message */}
              {error && (
                <p className="font-body text-xs text-burgundy font-semibold animate-shake">
                  {error}
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
