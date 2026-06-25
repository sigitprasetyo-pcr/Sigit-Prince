import React from "react";
import { Users, Truck, Sparkles, ShieldCheck } from "lucide-react";

export default function BrandTrustStrip() {
  const points = [
    {
      icon: <Users className="text-soft-gold" size={24} />,
      title: "1.000+ Pelanggan Puas",
      desc: "Ulasan bintang 5 dari pelanggan setia kami"
    },
    {
      icon: <Truck className="text-soft-gold" size={24} />,
      title: "Kirim Seluruh Indonesia",
      desc: "Layanan pengiriman cepat dan berasuransi"
    },
    {
      icon: <Sparkles className="text-soft-gold" size={24} />,
      title: "Kurasi Kualitas Premium",
      desc: "Setiap helai kain diperiksa secara detail"
    },
    {
      icon: <ShieldCheck className="text-soft-gold" size={24} />,
      title: "Pembayaran 100% Aman",
      desc: "Dukungan transfer bank & e-wallet terpercaya"
    }
  ];

  return (
    <div className="bg-soft-grey border-y border-charcoal/5 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-charcoal/10">
          {points.map((point, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 px-2 ${
                index > 0 ? "pt-6 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              <div className="flex-shrink-0 bg-white p-3 rounded-2xl shadow-sm border border-charcoal/5">
                {point.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm md:text-base font-bold text-charcoal">
                  {point.title}
                </span>
                <span className="font-body text-xs text-muted mt-0.5">
                  {point.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
