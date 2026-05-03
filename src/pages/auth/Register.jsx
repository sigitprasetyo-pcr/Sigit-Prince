import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLanguage } from "react-icons/md";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    role: "",
    password: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      <header className="h-20 w-full px-6 md:px-12 flex justify-between items-center z-40 bg-[#FFFDF5] border-b border-neutral-200/40">
        <Link
          to="/login"
          className="text-2xl font-display italic tracking-tighter text-[#121212]"
        >
          VelvetNova
        </Link>

        <div className="hidden md:flex gap-gutter">
          <span className="label-caps text-on-surface-variant cursor-pointer hover:text-primary transition">
            Bantuan
          </span>

          <Link
            to="/login"
            className="label-caps text-on-surface-variant cursor-pointer hover:text-primary transition"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-section-gap px-6 md:px-margin-edge">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-[1440px] mx-auto items-center">
          <div className="hidden lg:flex lg:col-span-5 flex-col space-y-stack-md pr-12">
            <span className="label-caps text-secondary tracking-[0.2em]">
              Akses Eksklusif
            </span>

            <h1 className="font-display text-headline-sm text-primary">
              Bergabunglah dengan Atelier Kami.
            </h1>

            <p className="text-body-lg text-on-surface-variant max-w-md">
              Mulailah perjalanan kurasi Anda dalam ekosistem VelvetNova.
              Kelola inventaris berharga dan bangun hubungan personal dengan
              pelanggan setia Anda dalam satu antarmuka yang tenang.
            </p>

            <div className="pt-stack-md">
              <img
                className="w-full h-80 object-cover rounded-lg luxury-shadow"
                src="/images/register-boutique.png"
                alt="Luxury boutique interior"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="bg-surface-container-lowest p-8 md:p-16 w-full max-w-2xl luxury-shadow rounded-lg">
              <div className="mb-stack-md text-center lg:text-left">
                <h2 className="font-display text-headline-md text-primary mb-2">
                  Registrasi Admin
                </h2>

                <p className="text-on-surface-variant text-body-sm">
                  Lengkapi detail untuk mendaftarkan profil butik Anda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-stack-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-2">
                    <label className="label-caps text-on-surface-variant">
                      Nama Lengkap
                    </label>

                    <input
                      className="boutique-input"
                      placeholder="Masukkan nama"
                      type="text"
                      name="fullname"
                      value={form.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="label-caps text-on-surface-variant">
                      Alamat Email
                    </label>

                    <input
                      className="boutique-input"
                      placeholder="email@velvetnova.com"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-on-surface-variant">
                    Peran di Butik
                  </label>

                  <select
                    className="boutique-input appearance-none"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Pilih peran Anda
                    </option>
                    <option value="curator">Lead Curator</option>
                    <option value="manager">Boutique Manager</option>
                    <option value="director">Creative Director</option>
                    <option value="inventory">Inventory Specialist</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-on-surface-variant">
                    Kata Sandi
                  </label>

                  <input
                    className="boutique-input"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                  <p className="text-[10px] text-on-surface-variant mt-1">
                    Minimal 8 karakter dengan kombinasi angka dan simbol.
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <input
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-0"
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    required
                  />

                  <label className="text-body-sm text-on-surface-variant" htmlFor="terms">
                    Saya setuju dengan{" "}
                    <a className="text-primary underline underline-offset-4">
                      Ketentuan Layanan
                    </a>{" "}
                    dan{" "}
                    <a className="text-primary underline underline-offset-4">
                      Kebijakan Privasi
                    </a>
                    .
                  </label>
                </div>

                <div className="pt-stack-md flex flex-col md:flex-row items-center gap-stack-md">
                  <button
                    className="w-full md:w-auto px-10 py-4 btn-black label-caps tracking-widest"
                    type="submit"
                  >
                    Daftar Akun
                  </button>

                  <p className="text-body-sm text-on-surface-variant">
                    Sudah punya akun?{" "}
                    <Link className="text-secondary font-bold" to="/login">
                      Masuk
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-stack-md border-t border-neutral-200/40 px-6 md:px-margin-edge">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center text-on-surface-variant">
          <p className="text-label-md">
            © 2024 VelvetNova Private Atelier. Seluruh Hak Cipta Dilindungi.
          </p>

          <div className="flex gap-stack-md mt-4 md:mt-0 items-center">
            <MdLanguage />
            <span className="text-label-md cursor-pointer hover:text-primary">
              INDONESIA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}