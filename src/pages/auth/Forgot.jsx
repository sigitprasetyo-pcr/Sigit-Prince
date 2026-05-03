import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack, MdAutoAwesome, MdHelpOutline } from "react-icons/md";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-hidden">
      <main className="min-h-screen flex items-center justify-center px-6 md:px-margin-edge py-section-gap overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low opacity-40 -z-10 translate-x-1/4 skew-x-12" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-outline-variant/20 rounded-full -translate-x-32 translate-y-32 -z-10" />

        <section className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-12 items-center gap-gutter">
          <div className="md:col-span-5 flex flex-col items-start space-y-stack-md">
            <div className="mb-12">
              <h1 className="font-display text-display-xl italic tracking-tighter text-primary">
                VelvetNova
              </h1>

              <p className="label-caps text-secondary mt-2">
                Private Atelier Admin
              </p>
            </div>

            <h2 className="font-display text-headline-md text-on-surface leading-tight max-w-sm">
              Pulihkan Akses ke Portofolio Kurasi Anda.
            </h2>

            <p className="text-on-surface-variant text-body-md max-w-xs leading-relaxed">
              Privasi dan keamanan adalah fondasi dari VelvetNova. Masukkan
              email terdaftar Anda untuk memulai proses pemulihan kata sandi.
            </p>

            <div className="pt-8 border-t border-outline-variant/30 w-32">
              <Link
                className="group flex items-center gap-2 label-caps text-on-surface hover:text-secondary transition-colors"
                to="/login"
              >
                <MdArrowBack className="text-lg" />
                Kembali ke Login
              </Link>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-6 bg-surface-container-lowest luxury-shadow p-8 md:p-16 border border-white/40">
            <div className="space-y-10">
              <div>
                <span className="label-caps text-secondary block mb-4">
                  Instruksi Pemulihan
                </span>

                <h3 className="font-display text-headline-sm text-on-surface">
                  Lupa Kata Sandi?
                </h3>
              </div>

              {sent && (
                <div className="bg-green-50 text-green-700 text-sm p-4 border border-green-100">
                  Tautan pemulihan sudah dikirim ke{" "}
                  <strong>{email}</strong>.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="group relative">
                  <label
                    className="label-caps text-on-surface-variant mb-3 block transition-colors group-focus-within:text-primary"
                    htmlFor="email"
                  >
                    Alamat Email Profesional
                  </label>

                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary placeholder:text-neutral-300 text-body-md transition-all outline-none"
                    id="email"
                    name="email"
                    placeholder="nama@velvetnova.com"
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />

                  <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-focus-within:w-full" />
                </div>

                <div className="pt-4 flex flex-col gap-6">
                  <button
                    className="w-full btn-black label-caps py-6 px-8 tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    type="submit"
                  >
                    Kirim Tautan Pemulihan
                  </button>

                  <p className="text-center text-body-sm text-on-surface-variant italic">
                    Kami akan mengirimkan instruksi ke email Anda dalam hitungan
                    menit.
                  </p>
                </div>
              </form>

              <div className="flex justify-center items-center gap-4 pt-4">
                <div className="h-[1px] flex-1 bg-outline-variant/30" />
                <MdAutoAwesome className="text-outline-variant text-sm" />
                <div className="h-[1px] flex-1 bg-outline-variant/30" />
              </div>
            </div>
          </div>
        </section>

        <div className="hidden lg:block absolute -right-20 top-20 w-64 h-96 -rotate-6 luxury-shadow overflow-hidden opacity-80 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            src="/images/boutique-cowok.png"
            alt="VelvetNova detail"
          />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full px-6 md:px-margin-edge py-8 hidden md:flex justify-between items-center bg-transparent pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto">
          <a className="label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors tracking-widest">
            Syarat & Ketentuan
          </a>

          <a className="label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors tracking-widest">
            Kebijakan Privasi
          </a>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <MdHelpOutline className="text-secondary" />
          <span className="label-caps text-[10px] text-on-surface-variant tracking-widest">
            Butuh Bantuan? Hubungi Concierge
          </span>
        </div>
      </footer>
    </div>
  );
}