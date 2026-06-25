import React from "react";
import { FiInstagram } from "react-icons/fi";

export default function InstagramSection() {
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80",
      link: "https://instagram.com"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=80",
      link: "https://instagram.com"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=80",
      link: "https://instagram.com"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&auto=format&fit=crop&q=80",
      link: "https://instagram.com"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500&auto=format&fit=crop&q=80",
      link: "https://instagram.com"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&auto=format&fit=crop&q=80",
      link: "https://instagram.com"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Inspirasi dari Aurelia
          </h2>
          <div className="w-12 h-1 bg-burgundy mx-auto mb-4 rounded-full" />
          <p className="font-body text-sm md:text-base text-muted">
            Ikuti <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-burgundy font-semibold hover:underline">@aureliaboutique</a> untuk melihat koleksi, inspirasi gaya, dan kabar terbaru.
          </p>
        </div>

        {/* Instagram 6-Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-[20px] bg-soft-grey shadow-sm"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt={`Instagram lookbook ${post.id}`}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiInstagram className="text-white" size={24} />
                <span className="font-body text-xs font-semibold text-white uppercase tracking-wider">
                  Lihat Postingan
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-burgundy text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-md"
          >
            <FiInstagram size={18} />
            <span>Ikuti di Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
}
