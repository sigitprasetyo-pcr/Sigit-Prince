import { Outlet, useLocation, Link } from "react-router-dom";
import { FiCheck, FiStar, FiUsers, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

/* Floating orb decorations */
function Orb({ className, style }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={style}
    />
  );
}

/* Animated stat card */
function StatCard({ value, label, icon, delay = "0ms" }) {
  return (
    <div
      className="flex items-center gap-3.5 rounded-[18px] p-4 backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        animationDelay: delay,
      }}
    >
      <div
        className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] text-white shadow-lg"
        style={{ background: "linear-gradient(135deg, #7A2E3A, #C5A46D)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[22px] font-black text-white leading-none">{value}</p>
        <p className="mt-0.5 text-[11px] text-white/50">{label}</p>
      </div>
    </div>
  );
}

export default function AuthLayout() {
  const { pathname } = useLocation();

  const isRegister = pathname.includes("register");
  const isForgot = pathname.includes("forgot");

  return (
    <main
      className="min-h-screen font-body text-[#2D2723] lg:grid lg:grid-cols-2"
      style={{ background: "#FDFAF6" }}
    >
      {/* ══════════════════════════════════════
          LEFT SECTION — Boutique Showcase
      ══════════════════════════════════════ */}
      <section className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #1C0A0D 0%, #3D1217 35%, #591A23 65%, #1C0A0D 100%)",
          }}
        />

        {/* Decorative orbs */}
        <Orb
          style={{
            top: "-80px",
            right: "-80px",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(197,164,109,0.2) 0%, transparent 70%)",
          }}
        />
        <Orb
          style={{
            bottom: "-100px",
            left: "-60px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(122,46,58,0.25) 0%, transparent 70%)",
          }}
        />
        <Orb
          style={{
            top: "50%",
            right: "20%",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Dot grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(197,164,109,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col px-12 py-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div
              className="flex h-[50px] w-[50px] items-center justify-center rounded-[16px] font-serif text-[22px] font-bold text-white shadow-[0_8px_24px_rgba(122,46,58,0.3)] transition group-hover:shadow-[0_12px_32px_rgba(122,46,58,0.5)]"
              style={{ background: "linear-gradient(135deg, #C5A46D 0%, #7A2E3A 100%)" }}
            >
              A
            </div>
            <div>
              <p className="text-[18px] font-bold tracking-wide text-white leading-none">Aurelia Boutique</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C5A46D]/70">
                Premium Fashion CRM
              </p>
            </div>
          </Link>

          {/* Main content area */}
          <div className="flex flex-1 flex-col justify-center">
            {isForgot ? (
              /* Forgot State */
              <div className="max-w-[500px]">
                <div
                  className="mb-8 inline-flex h-[90px] w-[90px] items-center justify-center rounded-[28px] text-[40px]"
                  style={{
                    background: "rgba(197,164,109,0.12)",
                    border: "1px solid rgba(197,164,109,0.25)",
                  }}
                >
                  🔑
                </div>
                <h2 className="text-[42px] font-light tracking-wide leading-[1.1] text-white font-serif">
                  Reset
                  <br />
                  <span
                    className="bg-clip-text text-transparent font-normal"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #C5A46D, #E2C799)",
                    }}
                  >
                    Password
                  </span>
                </h2>
                <p className="mt-5 max-w-[380px] text-[15px] leading-[1.7] text-white/60 font-light">
                  Jangan khawatir! Kami akan membantu Anda mendapatkan akses kembali ke akun Boutique Anda.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    { icon: "🔒", text: "Proses aman & terenkripsi SSL" },
                    { icon: "⚡", text: "Link reset terkirim dalam 60 detik" },
                    { icon: "✅", text: "Didukung tim support 24/7" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] text-[18px]"
                        style={{
                          background: "rgba(197,164,109,0.12)",
                          border: "1px solid rgba(197,164,109,0.2)",
                        }}
                      >
                        {item.icon}
                      </div>
                      <p className="text-[13px] text-white/70 font-light">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : isRegister ? (
              /* Register State */
              <div className="max-w-[500px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A46D]/80">
                  Bergabung Bersama 2.5k+ Member
                </p>
                <h2 className="mt-4 text-[44px] font-light tracking-wide leading-[1.05] text-white font-serif">
                  Mulai Perjalanan
                  <br />
                  <span
                    className="bg-clip-text text-transparent font-normal"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #C5A46D, #E2C799)",
                    }}
                  >
                    Fashion Premium
                  </span>
                </h2>
                <p className="mt-5 max-w-[380px] text-[14px] leading-[1.7] text-white/60 font-light">
                  Daftar sekarang dan dapatkan akses ke sistem CRM boutique terlengkap untuk mengelola bisnis fashion Anda.
                </p>

                <div className="mt-9 space-y-3">
                  {[
                    ["Koleksi Eksklusif", "Akses 500+ produk limited edition", "👗"],
                    ["Member Rewards", "Poin reward setiap transaksi", "⭐"],
                    ["Analytics Lengkap", "Insight bisnis real-time", "📊"],
                    ["Personal Stylist", "Konsultasi gratis dengan stylist", "💎"],
                  ].map(([title, desc, emoji]) => (
                    <div key={title} className="flex items-center gap-4">
                      <div
                        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[13px] text-[18px]"
                        style={{
                          background: "rgba(197,164,109,0.1)",
                          border: "1px solid rgba(197,164,109,0.18)",
                        }}
                      >
                        {emoji}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-white">{title}</p>
                        <p className="text-[11px] text-white/45 font-light">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Login State */
              <div className="max-w-[500px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A46D]/80">
                  Sistem Admin
                </p>
                <h2 className="mt-4 text-[46px] font-light tracking-wide leading-[1.05] text-white font-serif">
                  Kelola Boutique
                  <br />
                  <span
                    className="bg-clip-text text-transparent font-normal"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #C5A46D, #E2C799)",
                    }}
                  >
                    Lebih Mudah
                  </span>
                </h2>
                <p className="mt-5 max-w-[380px] text-[14px] leading-[1.7] text-white/60 font-light">
                  Platform CRM all-in-one untuk mengelola produk, pelanggan, pesanan, dan laporan bisnis fashion Anda.
                </p>

                {/* Stats grid */}
                <div className="mt-10 grid grid-cols-2 gap-3">
                  <StatCard value="500+" label="Produk Fashion" icon={<FiShoppingBag />} />
                  <StatCard value="2.5k" label="Pelanggan Aktif" icon={<FiUsers />} delay="100ms" />
                  <StatCard value="98%" label="Kepuasan Member" icon={<FiStar />} delay="200ms" />
                  <StatCard value="12x" label="Pertumbuhan YoY" icon={<FiTrendingUp />} delay="300ms" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-white/30">
              © 2026 Aurelia Boutique. All rights reserved.
            </p>
            <div className="flex gap-4">
              {["Privasi", "Syarat", "Bantuan"].map((item) => (
                <span
                  key={item}
                  className="cursor-pointer text-[11px] text-white/30 transition hover:text-white/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RIGHT FORM SECTION
      ══════════════════════════════════════ */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-10"
        style={{
          background: "linear-gradient(135deg, #FFFDFB 0%, #FAF6EE 50%, #F5EEE0 100%)",
        }}
      >
        {/* Soft background luxury glows */}
        <div
          className="pointer-events-none absolute h-[320px] w-[320px] rounded-full opacity-[0.18] blur-3xl"
          style={{
            background: "radial-gradient(circle, #C5A46D 0%, transparent 70%)",
            top: "10%",
            right: "-80px",
          }}
        />
        <div
          className="pointer-events-none absolute h-[250px] w-[250px] rounded-full opacity-[0.15] blur-3xl"
          style={{
            background: "radial-gradient(circle, #7A2E3A 0%, transparent 70%)",
            bottom: "10%",
            left: "-80px",
          }}
        />

        {/* Mobile logo */}
        <div className="relative z-10 mb-8 flex items-center gap-3 lg:hidden">
          <div
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] font-serif text-[18px] font-bold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #C5A46D 0%, #7A2E3A 100%)" }}
          >
            A
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#1C1410] tracking-wide">Aurelia Boutique</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#C5A46D]/80">
              Fashion CRM
            </p>
          </div>
        </div>

        {/* Card wrapper */}
        <div
          className="relative z-10 w-full max-w-[460px] rounded-[28px] p-8 sm:p-10 shadow-[0_24px_60px_rgba(122,46,58,0.05),0_4px_16px_rgba(0,0,0,0.01)] border border-white/70 overflow-hidden transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Decorative top shimmer bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[4px]"
            style={{ background: "linear-gradient(90deg, #7A2E3A, #C5A46D, #7A2E3A)" }}
          />

          <Outlet />
        </div>

        {/* Bottom decoration */}
        <div className="relative z-10 mt-8 flex items-center gap-2.5">
          {["#7A2E3A", "#C5A46D", "#E2C799"].map((c, i) => {
            const activeIdx = isRegister ? 1 : isForgot ? 2 : 0;
            const isActive = i === activeIdx;
            return (
              <div
                key={i}
                className="rounded-full transition-all duration-500 ease-out"
                style={{
                  width: isActive ? "22px" : "8px",
                  height: "8px",
                  backgroundColor: c,
                  opacity: isActive ? 1 : 0.35,
                  boxShadow: isActive ? `0 0 10px ${c}` : "none",
                }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}