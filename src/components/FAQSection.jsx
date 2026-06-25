import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Apakah produk yang ditampilkan selalu tersedia?",
      a: "Ketersediaan produk dapat berubah sesuai jumlah stok. Informasi stok terbaru akan ditampilkan pada masing-masing produk."
    },
    {
      q: "Bagaimana cara menentukan ukuran?",
      a: "Gunakan panduan ukuran yang tersedia pada halaman produk. Pelanggan juga dapat menghubungi tim kami untuk memperoleh rekomendasi ukuran."
    },
    {
      q: "Apakah produk dapat ditukar?",
      a: "Produk dapat diajukan untuk penukaran maksimal tiga hari setelah diterima selama memenuhi ketentuan penukaran."
    },
    {
      q: "Berapa lama proses pengiriman?",
      a: "Pesanan diproses dalam satu sampai dua hari kerja. Durasi pengiriman bergantung pada lokasi tujuan dan layanan ekspedisi."
    },
    {
      q: "Metode pembayaran apa yang tersedia?",
      a: "Pembayaran dapat dilakukan melalui transfer bank, virtual account, dan dompet digital."
    },
    {
      q: "Bagaimana cara menghubungi customer service?",
      a: "Pelanggan dapat menghubungi kami melalui WhatsApp, email, atau media sosial selama jam operasional."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-ivory scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted">
            Butuh info lebih lanjut? Berikut jawaban untuk beberapa pertanyaan yang paling sering diajukan pelanggan.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-soft-grey overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:bg-ivory/30 transition-all duration-200"
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-charcoal pr-4">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 bg-soft-grey p-2 rounded-full text-burgundy transition-transform duration-300">
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Accordion Content Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-soft-grey/65" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="p-6 font-body text-xs sm:text-sm leading-relaxed text-muted bg-ivory/10">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
