import React, { useState, useEffect } from "react";
import { 
  FiStar, 
  FiCheck, 
  FiEyeOff, 
  FiTrash2, 
  FiMessageSquare, 
  FiAlertCircle, 
  FiPlus, 
  FiUser, 
  FiMapPin, 
  FiCheckCircle 
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import PageHeader from "../components/PageHeader";

export default function Reviews() {
  const { dark } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", review: "", rating: 5 });
  const [toast, setToast] = useState({ visible: false, message: "" });

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

  // Load reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("aurelia_testimonials");
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(defaultTestimonials);
      }
    } else {
      localStorage.setItem("aurelia_testimonials", JSON.stringify(defaultTestimonials));
      setReviews(defaultTestimonials);
    }
  }, []);

  const triggerToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const saveReviews = (updatedList) => {
    setReviews(updatedList);
    localStorage.setItem("aurelia_testimonials", JSON.stringify(updatedList));
  };

  // Actions
  const handleApprove = (id) => {
    const updated = reviews.map((r) => r.id === id ? { ...r, status: "Approved" } : r);
    saveReviews(updated);
    triggerToast("Ulasan berhasil disetujui & ditampilkan!");
  };

  const handleHide = (id) => {
    const updated = reviews.map((r) => r.id === id ? { ...r, status: "Pending" } : r);
    saveReviews(updated);
    triggerToast("Ulasan disembunyikan dari halaman utama.");
  };

  const handleDelete = (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    saveReviews(updated);
    triggerToast("Ulasan berhasil dihapus.");
  };

  // Add new from Admin
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.review.trim()) return;

    const words = form.name.trim().split(" ");
    const initials = words.slice(0, 2).map(w => w.charAt(0).toUpperCase()).join("");

    const newReview = {
      id: Date.now(),
      name: form.name,
      city: form.city,
      initials: initials || "A",
      review: form.review,
      rating: parseInt(form.rating),
      status: "Approved", // Admins reviews are auto-approved!
      date: new Date().toLocaleDateString("id-ID")
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);
    setShowAddForm(false);
    setForm({ name: "", city: "", review: "", rating: 5 });
    triggerToast("Ulasan baru berhasil ditambahkan!");
  };

  // Stats derivation
  const totalReviews = reviews.length;
  const approvedCount = reviews.filter(r => r.status === "Approved").length;
  const pendingCount = totalReviews - approvedCount;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  // Colors
  const bg = dark ? "bg-[#110E0B]" : "bg-[#F7F5F2]";
  const card = dark ? "bg-[#1C1610] border-[rgba(199,167,101,0.12)]" : "bg-white border-[#E7E0D8]";
  const txt = dark ? "text-[#E8E0D5]" : "text-[#2D2723]";
  const txt2 = dark ? "text-[#8B7E76]" : "text-[#7C7772]";

  return (
    <section className={`min-h-[calc(100vh-54px)] px-8 py-6 transition-colors duration-300 ${bg}`}>
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Toast Notification */}
        {toast.visible && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[16px] bg-[#1C1410] border border-[#C5A46D]/30 px-5 py-3.5 text-white shadow-xl animate-fade-in">
            <FiCheckCircle className="text-[#C5A46D] text-lg" />
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        )}

        {/* ─── PAGE HEADER ─── */}
        <PageHeader
          breadcrumb="Aurelia / Reviews"
          title="Ulasan Pelanggan"
          description="Moderasi, saring, dan kelola ulasan testimonial pelanggan yang masuk ke situs utama."
        >
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 rounded-[12px] bg-gradient-to-r from-[#7A2E3A] to-[#C5A46D] px-5 py-2.5 text-[12px] font-semibold text-white shadow-md hover:shadow-lg transition active:scale-95"
          >
            <FiPlus />
            {showAddForm ? "Tutup Form" : "Tambah Ulasan"}
          </button>
        </PageHeader>

        {/* ─── STATS GRID ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Ulasan", value: totalReviews, desc: "Semua ulasan masuk", color: "#C5A46D", icon: <FiMessageSquare /> },
            { label: "Rata-rata Rating", value: `${averageRating} ★`, desc: "Skala ulasan bintang", color: "#E29A42", icon: <FiStar /> },
            { label: "Ulasan Aktif", value: approvedCount, desc: "Tampil di landing page", color: "#2E9B5F", icon: <FiCheck /> },
            { label: "Menunggu Moderasi", value: pendingCount, desc: "Butuh persetujuan admin", color: "#7A2E3A", icon: <FiAlertCircle /> }
          ].map((s, idx) => (
            <div key={idx} className={`relative overflow-hidden rounded-[22px] border p-6 shadow-sm ${card}`}>
              <div 
                className="absolute -right-5 -top-5 h-[80px] w-[80px] rounded-full opacity-[0.08]"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex items-center justify-between">
                <div 
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] text-white text-[18px] shadow-sm"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </div>
              </div>
              <p className={`mt-5 text-[11px] uppercase tracking-[0.15em] ${txt2}`}>{s.label}</p>
              <h2 className={`mt-1 text-[28px] font-bold leading-none ${txt}`}>{s.value}</h2>
              <p className="mt-2 text-[10px] text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── FORM & REVIEWS GRID ─── */}
        <div className="grid gap-6 xl:grid-cols-12 items-start">
          
          {/* Add Review Form */}
          {showAddForm && (
            <div className={`xl:col-span-4 rounded-[24px] border p-6 shadow-md transition-colors ${card}`}>
              <h3 className={`font-serif text-[18px] font-medium leading-none mb-4 ${txt}`}>
                Tambah Ulasan Baru
              </h3>
              
              <form onSubmit={handleAddReview} className="space-y-4 text-left">
                {/* Rating */}
                <div>
                  <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${txt2}`}>
                    Bintang (1-5)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className={`h-[40px] w-full rounded-[10px] border px-3 text-[12px] outline-none transition ${
                      dark 
                        ? "border-[rgba(199,167,101,0.15)] bg-[#1A1410] text-[#E8E0D5] focus:border-[#C5A46D]" 
                        : "border-[#E7E0D8] bg-white text-[#2D2723] focus:border-[#C5A46D]"
                    }`}
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Bintang</option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${txt2}`}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama customer"
                    className={`h-[40px] w-full rounded-[10px] border px-3.5 text-[12px] outline-none transition ${
                      dark 
                        ? "border-[rgba(199,167,101,0.15)] bg-[#1A1410] text-[#E8E0D5] focus:border-[#C5A46D]" 
                        : "border-[#E7E0D8] bg-white text-[#2D2723] focus:border-[#C5A46D]"
                    }`}
                  />
                </div>

                {/* City */}
                <div>
                  <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${txt2}`}>
                    Kota Domisili
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Contoh: Jakarta"
                    className={`h-[40px] w-full rounded-[10px] border px-3.5 text-[12px] outline-none transition ${
                      dark 
                        ? "border-[rgba(199,167,101,0.15)] bg-[#1A1410] text-[#E8E0D5] focus:border-[#C5A46D]" 
                        : "border-[#E7E0D8] bg-white text-[#2D2723] focus:border-[#C5A46D]"
                    }`}
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${txt2}`}>
                    Pesan Ulasan
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    placeholder="Tulis ulasan produk..."
                    className={`w-full rounded-[10px] border p-3.5 text-[12px] outline-none transition resize-none ${
                      dark 
                        ? "border-[rgba(199,167,101,0.15)] bg-[#1A1410] text-[#E8E0D5] focus:border-[#C5A46D]" 
                        : "border-[#E7E0D8] bg-white text-[#2D2723] focus:border-[#C5A46D]"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[42px] rounded-[10px] bg-gradient-to-r from-[#7A2E3A] to-[#C5A46D] text-white font-semibold text-xs shadow-md transition active:scale-97"
                >
                  Kirim Ulasan
                </button>
              </form>
            </div>
          )}

          {/* Review Cards Grid List */}
          <div className={`${showAddForm ? "xl:col-span-8" : "xl:col-span-12"} space-y-4`}>
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className={`rounded-[22px] border p-5 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 text-left ${card}`}
              >
                <div className="flex items-start gap-4 flex-grow">
                  {/* Initials avatar */}
                  <div 
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white text-[13px] font-extrabold shadow-sm"
                    style={{ background: "linear-gradient(135deg, #C5A46D 0%, #7A2E3A 100%)" }}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h4 className={`text-sm font-semibold leading-none ${txt}`}>{rev.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        rev.status === "Approved" 
                          ? "bg-[#EAF8EF] text-[#2E9B5F]" 
                          : "bg-[#FFF0F0] text-[#C0392B]"
                      }`}>
                        {rev.status === "Approved" ? "Disetujui" : "Pending"}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted">
                      <span className="flex items-center gap-0.5">
                        <FiMapPin className="text-[#C5A46D]" /> {rev.city}
                      </span>
                      <span>•</span>
                      <span>{rev.date || "Baru"}</span>
                    </div>

                    {/* Review text */}
                    <p className={`mt-3 text-xs leading-relaxed ${dark ? "text-[#C0B4A6]" : "text-[#4F4740]"}`}>
                      "{rev.review}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {/* Rating Stars preview */}
                  <div className="flex items-center gap-0.5 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`text-xs ${i < rev.rating ? "fill-soft-gold text-soft-gold" : "text-soft-grey"}`} 
                      />
                    ))}
                  </div>

                  {rev.status !== "Approved" ? (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      title="Setujui & Tampilkan"
                      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-charcoal/10 hover:border-[#2E9B5F]/40 bg-white hover:bg-[#EAF8EF] text-[#2E9B5F] shadow-sm transition active:scale-95"
                    >
                      <FiCheck />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleHide(rev.id)}
                      title="Sembunyikan dari Halaman Utama"
                      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-charcoal/10 hover:border-[#7A2E3A]/40 bg-white hover:bg-[#FFF0F0] text-[#7A2E3A] shadow-sm transition active:scale-95"
                    >
                      <FiEyeOff />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(rev.id)}
                    title="Hapus Ulasan"
                    className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-charcoal/10 hover:border-red-500/40 bg-white hover:bg-red-50 text-red-500 shadow-sm transition active:scale-95"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className={`rounded-[24px] border p-12 text-center ${card}`}>
                <FiMessageSquare className="text-[40px] text-muted mx-auto mb-3" />
                <p className={`text-sm ${txt2}`}>Belum ada ulasan yang masuk dari pelanggan.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
