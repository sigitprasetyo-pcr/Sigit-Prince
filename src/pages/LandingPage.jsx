import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiUsers,
  FiShoppingBag,
  FiAward,
  FiGift,
  FiMail,
  FiPhone,
  FiMapPin,
  FiStar,
  FiTrendingUp,
  FiCheckCircle,
  FiShield,
  FiZap,
  FiBarChart2,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

/* ============================================================
   COUNTER ANIMATION HOOK
============================================================ */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ============================================================
   STAT COUNTER CARD
============================================================ */
function StatCounter({ value, label, prefix = "", suffix = "", started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="text-center">
      <p className="text-[38px] font-bold text-white lg:text-[48px]">
        {prefix}{count.toLocaleString("id-ID")}{suffix}
      </p>
      <p className="mt-1 text-[13px] text-white/50 uppercase tracking-[0.16em]">{label}</p>
    </div>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */
function FeatureCard({ icon, title, desc, accent }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[#EEE7DF] bg-white p-8 shadow-[0_8px_30px_rgba(45,39,35,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(45,39,35,0.14)]">
      <div
        className="absolute -right-8 -top-8 h-[120px] w-[120px] rounded-full opacity-[0.06] transition-all duration-300 group-hover:opacity-[0.1]"
        style={{ backgroundColor: accent }}
      />
      <div
        className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] text-[24px] text-white shadow-lg"
        style={{ backgroundColor: accent }}
      >
        {icon}
      </div>
      <h3 className="mt-6 text-[18px] font-semibold text-[#2D2723]">{title}</h3>
      <p className="mt-3 text-[14px] leading-7 text-[#7C7772]">{desc}</p>
    </div>
  );
}

/* ============================================================
   TIER CARD
============================================================ */
const TIER_CFG = {
  Regular: { color: "#B8A99D", bg: "from-[#F3F0EC] to-[#EBE5DF]", icon: "👤", perks: ["Akses katalog", "Newsletter promo", "Diskon birthday 5%"] },
  Silver:  { color: "#94A3B8", bg: "from-[#EEF2F6] to-[#E0E7EF]", icon: "⭐", perks: ["Semua benefit Regular", "Diskon 10% setiap belanja", "Free ongkir 2x/bulan"] },
  Gold:    { color: "#D99A42", bg: "from-[#FFF3DE] to-[#FDECC8]", icon: "🏅", perks: ["Semua benefit Silver", "Diskon 15% setiap belanja", "Gift eksklusif & priority CS"] },
  Platinum:{ color: "#6D5DF6", bg: "from-[#EEE8FF] to-[#E2D9FF]", icon: "💎", perks: ["Semua benefit Gold", "Diskon 20% setiap belanja", "Personal stylist & VIP event"] },
};

function TierCard({ name, minSpend }) {
  const cfg = TIER_CFG[name];
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${cfg.bg} p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]`}>
      <div className="flex items-start justify-between">
        <span className="text-[38px]">{cfg.icon}</span>
        <span className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-semibold" style={{ color: cfg.color }}>
          {name}
        </span>
      </div>
      <h3 className="mt-4 text-[22px] font-bold text-[#2D2723]">{name} Member</h3>
      <p className="mt-1 text-[12px] text-[#8B7E76]">Min. belanja {minSpend}</p>
      <ul className="mt-5 space-y-2">
        {cfg.perks.map((p, i) => (
          <li key={i} className="flex items-center gap-2 text-[12px] text-[#4F4740]">
            <FiCheckCircle className="shrink-0" style={{ color: cfg.color }} />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/50">
        <div
          className="h-full rounded-full"
          style={{ width: name === "Regular" ? "25%" : name === "Silver" ? "50%" : name === "Gold" ? "75%" : "100%", backgroundColor: cfg.color }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT SHOWCASE CARD
============================================================ */
const PRODUCTS = [
  { name: "Silk Evening Gown", cat: "Dress", price: "Rp 1.250.000", icon: "👘", badge: "Best Seller" },
  { name: "Gold Mini Handbag", cat: "Bag", price: "Rp 750.000", icon: "👜", badge: "New Arrival" },
  { name: "Modern Linen Blazer", cat: "Blazer", price: "Rp 780.000", icon: "🧥", badge: null },
  { name: "Premium Velvet Dress", cat: "Dress", price: "Rp 1.100.000", icon: "👗", badge: "Trending" },
  { name: "Luxury Pleated Skirt", cat: "Skirt", price: "Rp 480.000", icon: "👗", badge: null },
  { name: "Mini Pearl Handbag", cat: "Bag", price: "Rp 810.000", icon: "👜", badge: "Eksklusif" },
];

function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-white shadow-[0_4px_20px_rgba(45,39,35,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(45,39,35,0.16)]">
      {/* Image area */}
      <div className="relative flex h-[200px] items-center justify-center bg-gradient-to-br from-[#F8F3EE] to-[#EDE4D8] text-[72px]">
        {product.icon}
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-[#2D2723] px-3 py-1 text-[10px] font-semibold text-white">
            {product.badge}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[#A98467]">{product.cat}</p>
        <h3 className="mt-1 text-[14px] font-semibold text-[#2D2723]">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[15px] font-bold text-[#C7A765]">{product.price}</span>
          <div className="flex items-center gap-0.5 text-[#C7A765] text-[12px]">
            <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TESTIMONIAL CARD
============================================================ */
const TESTIMONIALS = [
  { name: "Amanda Putri", tier: "Gold Member", text: "Hejmana Boutique punya koleksi yang selalu up to date. Setiap kali ke sini pasti ada yang baru dan kualitasnya tidak mengecewakan.", avatar: "AP" },
  { name: "Salsabila Rahma", tier: "Platinum Member", text: "Sebagai member Platinum, layanannya luar biasa. Personal stylist-nya sangat membantu, dan diskon 20% sangat terasa manfaatnya.", avatar: "SR" },
  { name: "Nabila Azzahra", tier: "Silver Member", text: "Program loyalitas Hejmana yang paling bikin saya terus balik. Poin bisa ditukar hadiah dan promonya selalu menarik.", avatar: "NA" },
];

function TestimonialCard({ t }) {
  return (
    <div className="rounded-[24px] border border-[#EEE7DF] bg-white p-7 shadow-[0_4px_20px_rgba(45,39,35,0.06)]">
      <div className="flex items-center gap-1 text-[#C7A765]">
        {[...Array(5)].map((_, i) => <FiStar key={i} />)}
      </div>
      <p className="mt-4 text-[14px] leading-7 text-[#4F4740]">"{t.text}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-to-br from-[#C7A765] to-[#8B6A3A] text-[13px] font-bold text-white shadow">
          {t.avatar}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#2D2723]">{t.name}</p>
          <p className="text-[11px] text-[#A98467]">{t.tier}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN LANDING PAGE
============================================================ */
export default function LandingPage() {
  const navigate = useNavigate();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C1410 0%, #2D1F14 40%, #1A1208 100%)" }}
      >
        {/* Decorative glow blobs */}
        <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #C7A765 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #6D5DF6 0%, transparent 65%)" }} />

        {/* Grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="relative mx-auto grid min-h-screen max-w-[1320px] items-center gap-16 px-6 py-32 lg:grid-cols-2">

          {/* LEFT TEXT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C7A765]/30 bg-[#C7A765]/10 px-5 py-2 text-[12px] font-medium text-[#C7A765] backdrop-blur">
              <FiZap className="text-[#C7A765]" />
              Premium Fashion CRM · Hejmana Boutique
            </div>

            <h1 className="mt-8 text-[48px] font-bold leading-[1.1] text-white lg:text-[64px]">
              Boutique
              <span className="block" style={{ WebkitTextStroke: "2px #C7A765", color: "transparent" }}>
                Premium
              </span>
              <span className="block text-[#C7A765]">Hejmana</span>
            </h1>

            <p className="mt-8 max-w-[520px] text-[16px] leading-8 text-white/60">
              Temukan koleksi fashion eksklusif dengan kualitas premium. Program loyalitas member kami memberikan pengalaman berbelanja yang mewah dan personal.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("koleksi")}
                className="flex items-center gap-2 rounded-[14px] px-8 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(199,167,101,0.4)]"
                style={{ background: "linear-gradient(135deg, #C7A765 0%, #A8834D 100%)" }}
              >
                Lihat Koleksi
                <FiArrowRight />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              {[
                { icon: <FiShield />, label: "Produk Original" },
                { icon: <FiTrendingUp />, label: "600+ Member Aktif" },
                { icon: <FiAward />, label: "4 Level Loyalitas" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-[12px] text-white/50">
                  <span className="text-[#C7A765]">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard Mockup */}
          <div className="relative">
            {/* Floating card 1 */}
            <div className="absolute -left-8 -top-6 z-10 rounded-[18px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">Revenue Bulan Ini</p>
              <p className="mt-1 text-[22px] font-bold text-white">Rp 24.6jt</p>
              <p className="text-[11px] text-[#2E9B5F]">↗ +18.4%</p>
            </div>

            {/* Main mockup */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {/* Window chrome */}
              <div className="mb-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 text-[11px] text-white/30">Dashboard Boutique</span>
              </div>

              {/* Mockup content */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Total Member", val: "600", color: "#C7A765" },
                  { label: "Total Pesanan", val: "30", color: "#6D5DF6" },
                  { label: "Produk Aktif", val: "30", color: "#2E9B5F" },
                  { label: "Terkirim", val: "12", color: "#2563EB" },
                ].map((m) => (
                  <div key={m.label} className="rounded-[16px] border border-white/10 bg-white/[0.08] p-4">
                    <p className="text-[10px] text-white/40">{m.label}</p>
                    <p className="mt-1 text-[22px] font-bold" style={{ color: m.color }}>{m.val}</p>
                  </div>
                ))}
              </div>

              {/* Mini chart bars */}
              <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-4">
                <p className="mb-3 text-[10px] text-white/40">Revenue Trend</p>
                <div className="flex items-end gap-1.5 h-[60px]">
                  {[30, 50, 40, 65, 80, 60, 75, 55, 90, 70, 95, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11
                          ? "linear-gradient(to top, #C7A765, #E8C98A)"
                          : "rgba(199,167,101,0.3)"
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-white/25">
                  <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Des</span>
                </div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute -bottom-5 -right-5 z-10 rounded-[18px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-[#C7A765] text-white text-[18px]">
                  💎
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white">Platinum Member</p>
                  <p className="text-[10px] text-white/50">200 pelanggan aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <button
          onClick={() => scrollTo("stats")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 transition hover:text-white/60"
        >
          <span className="text-[11px] tracking-[0.2em]">SCROLL</span>
          <span className="animate-bounce text-[20px]">↓</span>
        </button>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section
        id="stats"
        style={{ background: "linear-gradient(135deg, #2D2723 0%, #1C1410 100%)" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter value={600} suffix="+" label="Member Aktif" started={statsVisible} />
            <StatCounter value={30} suffix="+" label="Produk Premium" started={statsVisible} />
            <StatCounter value={800} suffix="+" label="Total Customer" started={statsVisible} />
            <StatCounter value={94} suffix="%" label="Kepuasan Pelanggan" started={statsVisible} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          KOLEKSI PRODUK
      ══════════════════════════════════════ */}
      <section id="koleksi" className="bg-[#F8F5F1] py-24">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#A98467]">Koleksi Terbaru</p>
            <h2 className="mt-3 text-[38px] font-bold leading-tight text-[#2D2723]">
              Produk Pilihan Boutique
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] leading-7 text-[#7C7772]">
              Setiap produk dipilih dengan cermat untuk memberikan kesan mewah dan elegan yang tahan lama.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-[13px] text-[#8B7E76]">
              Untuk melihat seluruh katalog, silakan login sebagai admin
            </p>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 rounded-[14px] border-2 border-[#2D2723] bg-[#2D2723] px-8 py-3.5 text-[13px] font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(45,39,35,0.25)]"
            >
              Register
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FITUR / ABOUT
      ══════════════════════════════════════ */}
      <section id="fitur" className="bg-white py-24">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#A98467]">Keunggulan</p>
            <h2 className="mt-3 text-[38px] font-bold text-[#2D2723]">Mengapa Hejmana?</h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] leading-7 text-[#7C7772]">
              Kami menghadirkan pengalaman belanja fashion premium yang personal, eksklusif, dan penuh manfaat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<FiUsers />}      title="Customer Management"  desc="Setiap pelanggan mendapatkan profil lengkap dengan histori pembelian dan preferensi personal."        accent="#C7A765" />
            <FeatureCard icon={<FiAward />}      title="Program Loyalitas"    desc="Sistem tier 4 level — Regular, Silver, Gold, Platinum — dengan reward dan privilege yang semakin menarik." accent="#D99A42" />
            <FeatureCard icon={<FiGift />}       title="Promo Eksklusif"      desc="Member aktif mendapatkan akses promo pertama, diskon khusus ulang tahun, dan penawaran flash sale." accent="#6D5DF6" />
            <FeatureCard icon={<FiShoppingBag />} title="Katalog Premium"     desc="30+ produk fashion pilihan dari berbagai kategori — dress, blazer, tas, aksesori, hingga sepatu eksklusif." accent="#2E9B5F" />
            <FeatureCard icon={<FiBarChart2 />}  title="Analitik Penjualan"   desc="Pantau performa boutique secara real-time dengan dashboard yang informatif dan visualisasi data modern." accent="#2563EB" />
            <FeatureCard icon={<FiShield />}     title="Keamanan Data"        desc="Data pelanggan dilindungi dengan sistem keamanan berlapis. Privasi Anda adalah prioritas kami."         accent="#E05252" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MEMBERSHIP TIER
      ══════════════════════════════════════ */}
      <section id="membership" className="py-24" style={{ background: "linear-gradient(180deg, #F8F5F1 0%, #EFEBE4 100%)" }}>
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#A98467]">Loyalitas</p>
            <h2 className="mt-3 text-[38px] font-bold text-[#2D2723]">Program Member</h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] leading-7 text-[#7C7772]">
              Daftarkan diri sebagai member dan nikmati privilege eksklusif yang semakin bertambah seiring loyalitas Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <TierCard name="Regular" minSpend="Rp 0" />
            <TierCard name="Silver"  minSpend="Rp 500K" />
            <TierCard name="Gold"    minSpend="Rp 2JT" />
            <TierCard name="Platinum" minSpend="Rp 5JT" />
          </div>

          {/* CTA */}
          <div className="mt-14 overflow-hidden rounded-[28px] p-12 text-center" style={{ background: "linear-gradient(135deg, #1C1410 0%, #2D1F14 100%)" }}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#C7A765]">Eksklusif</p>
            <h3 className="mt-3 text-[32px] font-bold text-white">Daftarkan Diri Anda Hari Ini</h3>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] leading-7 text-white/60">
              Jadilah bagian dari komunitas fashion eksklusif Hejmana Boutique. Hubungi admin kami untuk informasi pendaftaran member.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[14px] bg-[#C7A765] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(199,167,101,0.35)] transition hover:-translate-y-1"
              >
                Hubungi Admin
                <FiArrowRight />
              </a>
              <button
                onClick={() => scrollTo("kontak")}
                className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 bg-white/10 px-8 py-3.5 text-[14px] font-semibold text-white transition hover:bg-white/15"
              >
                Info Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#A98467]">Testimoni</p>
            <h2 className="mt-3 text-[38px] font-bold text-[#2D2723]">Kata Member Kami</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          KONTAK
      ══════════════════════════════════════ */}
      <section id="kontak" className="bg-[#F8F5F1] py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#A98467]">Kontak</p>
            <h2 className="mt-3 text-[38px] font-bold text-[#2D2723]">Hubungi Kami</h2>
            <p className="mx-auto mt-4 max-w-[440px] text-[14px] leading-7 text-[#7C7772]">
              Tim Hejmana Boutique siap membantu kebutuhan fashion dan informasi membership Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <FiMail />, title: "Email", value: "hello@hejmana.com", color: "#C7A765" },
              { icon: <FiPhone />, title: "WhatsApp", value: "+62 812 3456 7890", color: "#2E9B5F" },
              { icon: <FiMapPin />, title: "Lokasi", value: "Pekanbaru, Riau", color: "#6D5DF6" },
            ].map((c) => (
              <div key={c.title} className="rounded-[24px] border border-[#EEE7DF] bg-white p-8 text-center shadow-[0_4px_20px_rgba(45,39,35,0.06)] transition hover:-translate-y-1">
                <div
                  className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-[18px] text-[24px] text-white shadow-md"
                  style={{ backgroundColor: c.color }}
                >
                  {c.icon}
                </div>
                <h3 className="mt-5 text-[16px] font-semibold text-[#2D2723]">{c.title}</h3>
                <p className="mt-2 text-[14px] text-[#7C7772]">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Admin Login CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#D8C8A5] bg-white p-10 text-center">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] bg-[#2D2723] text-[24px] text-[#C7A765]">
              🔐
            </div>
            <h3 className="text-[20px] font-bold text-[#2D2723]">Akses Admin</h3>
            <p className="max-w-[380px] text-[13px] leading-6 text-[#7C7772]">
              Halaman ini hanya dapat diakses oleh administrator Hejmana Boutique. Guest tidak dapat mendaftar atau login.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="mt-2 inline-flex items-center gap-2 rounded-[14px] bg-[#2D2723] px-8 py-3.5 text-[13px] font-semibold text-white transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(45,39,35,0.3)]"
            >
              Register
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{ background: "linear-gradient(135deg, #1C1410 0%, #2D1F14 100%)" }}>
        <div className="mx-auto max-w-[1320px] px-6 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] text-[18px] font-bold text-white shadow-md" style={{ background: "linear-gradient(135deg, #C7A765, #A8834D)" }}>
                  H
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-white">Hejmana Boutique</h2>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#C7A765]">Premium Fashion</p>
                </div>
              </div>
              <p className="mt-5 max-w-[300px] text-[13px] leading-7 text-white/40">
                Boutique fashion premium dengan koleksi eksklusif dan program loyalitas terbaik di Pekanbaru.
              </p>
              <div className="mt-5 flex gap-3">
                {[<FiInstagram />, <FiTwitter />, <FiYoutube />].map((icon, i) => (
                  <button key={i} className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-white/10 text-white/50 transition hover:bg-[#C7A765]/20 hover:text-[#C7A765]">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">Navigasi</h3>
              <ul className="space-y-3">
                {["Home", "Koleksi", "Membership", "Kontak"].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => scrollTo(l.toLowerCase())}
                      className="text-[13px] text-white/50 transition hover:text-[#C7A765]"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin */}
            <div>
              <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">Member Area</h3>
              <p className="mb-4 text-[13px] text-white/40">Daftarkan diri Anda untuk menjadi bagian dari member boutique.</p>
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 rounded-[12px] bg-[#C7A765]/20 px-5 py-2.5 text-[12px] font-medium text-[#C7A765] transition hover:bg-[#C7A765]/30"
              >
                📝 Register
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-[12px] text-white/25 md:flex-row">
            <p>© 2026 Hejmana Boutique. All rights reserved.</p>
            <p>Dibuat dengan ❤️ untuk boutique premium Indonesia</p>
          </div>
        </div>
      </footer>

    </div>
  );
}