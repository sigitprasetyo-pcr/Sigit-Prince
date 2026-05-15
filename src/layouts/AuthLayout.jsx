import { Outlet, useLocation } from "react-router-dom";
import { FiMail, FiLock, FiClock, FiCheck } from "react-icons/fi";

export default function AuthLayout() {
  const { pathname } = useLocation();

  const isRegister = pathname.includes("register");
  const isForgot = pathname.includes("forgot");

  return (
    <main className="min-h-screen bg-white font-body text-[#2D2723] lg:grid lg:grid-cols-2">
      {/* LEFT SECTION */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#E5D7BD] px-12 py-12 lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_10px_10px,rgba(255,255,255,0.28)_1px,transparent_2px)] [background-size:72px_72px]" />

        {!isForgot && (
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#B49455] font-display text-[20px] text-white shadow-[0_12px_24px_rgba(45,39,35,0.16)]">
              H
            </div>

            <div>
              <h1 className="font-display text-[24px] leading-none text-[#2D2723]">
                Hejmana Boutique
              </h1>

              <p className="mt-1.5 text-[13px] text-[#856F4E]">
                Premium Fashion Collection
              </p>
            </div>
          </div>
        )}

        {isForgot ? (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-12 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#F7F1E8] text-[52px] text-[#C7A765] shadow-[0_14px_28px_rgba(45,39,35,0.1)]">
              <FiMail />
            </div>

            <h2 className="font-display text-[34px] leading-tight text-[#2D2723]">
              Lupa Password?
            </h2>

            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-[#4F4740]">
              Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan
              link untuk reset password Anda.
            </p>

            <div className="mt-12 w-full max-w-[430px] space-y-4 text-left">
              <div className="flex items-center gap-4 rounded-[14px] bg-white/55 p-4 shadow-[0_10px_22px_rgba(45,39,35,0.08)] backdrop-blur">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#B49455] text-[20px] text-white">
                  <FiLock />
                </div>

                <div>
                  <p className="text-[14px] text-[#2D2723]">Secure Process</p>
                  <p className="mt-1 text-[12px] text-[#856F4E]">
                    Proses aman & terenkripsi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-[14px] bg-white/55 p-4 shadow-[0_10px_22px_rgba(45,39,35,0.08)] backdrop-blur">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#B49455] text-[20px] text-white">
                  <FiClock />
                </div>

                <div>
                  <p className="text-[14px] text-[#2D2723]">Quick Recovery</p>
                  <p className="mt-1 text-[12px] text-[#856F4E]">
                    Akses kembali dalam hitungan menit
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : isRegister ? (
          <div className="relative z-10 mt-[150px] max-w-[560px]">
            <div className="mb-8 h-[3px] w-[58px] rounded-full bg-[#C7A765]" />

            <h2 className="font-display text-[36px] leading-tight text-[#2D2723]">
              Bergabung Bersama Kami
            </h2>

            <p className="mt-6 text-[17px] leading-[1.6] text-[#4F4740]">
              Daftar sekarang dan dapatkan akses eksklusif ke koleksi fashion
              premium kami. Nikmati pengalaman berbelanja yang personal dan
              istimewa.
            </p>

            <div className="mt-9 space-y-5">
              {[
                ["Koleksi Eksklusif", "Akses produk limited edition"],
                ["Member Rewards", "Dapatkan poin setiap pembelian"],
                ["Personal Stylist", "Konsultasi gratis dengan stylist"],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B49455] text-[15px] text-white">
                    <FiCheck />
                  </div>

                  <div>
                    <p className="text-[15px] text-black">{title}</p>
                    <p className="mt-1 text-[13px] text-[#856F4E]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative z-10 mt-[150px] max-w-[560px]">
            <div className="mb-8 h-[3px] w-[58px] rounded-full bg-[#C7A765]" />

            <h2 className="font-display text-[36px] leading-tight text-[#2D2723]">
              Selamat Datang Kembali
            </h2>

            <p className="mt-6 text-[17px] leading-[1.6] text-[#4F4740]">
              Kelola koleksi fashion premium Anda dengan mudah. Akses dashboard
              untuk melihat penjualan, produk, dan pelanggan Anda.
            </p>

            <div className="mt-10 grid max-w-[480px] grid-cols-3 gap-5">
              <div className="rounded-[12px] bg-white/55 p-4 shadow-[0_10px_22px_rgba(45,39,35,0.08)] backdrop-blur">
                <h3 className="text-[23px] text-[#2D2723]">500+</h3>
                <p className="mt-1 text-[12px] text-[#856F4E]">Products</p>
              </div>

              <div className="rounded-[12px] bg-white/55 p-4 shadow-[0_10px_22px_rgba(45,39,35,0.08)] backdrop-blur">
                <h3 className="text-[23px] text-[#2D2723]">2.5k</h3>
                <p className="mt-1 text-[12px] text-[#856F4E]">Customers</p>
              </div>

              <div className="rounded-[12px] bg-white/55 p-4 shadow-[0_10px_22px_rgba(45,39,35,0.08)] backdrop-blur">
                <h3 className="text-[23px] text-[#2D2723]">98%</h3>
                <p className="mt-1 text-[12px] text-[#856F4E]">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="relative z-10 mt-auto text-[12px] text-[#856F4E]">
          © 2026 Hejmana Boutique. All rights reserved.
        </p>
      </section>

      {/* RIGHT FORM SECTION */}
      <section className="flex min-h-screen items-center justify-center bg-white px-8 py-10">
        <div className="w-full max-w-[430px]">
          <Outlet />
        </div>
      </section>
    </main>
  );
}