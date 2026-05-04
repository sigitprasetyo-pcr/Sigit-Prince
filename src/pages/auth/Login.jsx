import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { MdHelpOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Anda berhasil login.",
        showConfirmButton: false,
        timer: 1600,
      }).then(() => {
        navigate("/");
      });
    }, 700);
  };

  return (
    <main className="bg-background text-on-background min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row h-screen items-stretch overflow-hidden">
        <section className="hidden md:flex w-7/12 relative items-center justify-center bg-surface-container-lowest">
          <div className="absolute inset-0 overflow-hidden">
            <img
              className="w-full h-full object-cover opacity-90"
              src="/images/login-boutique.png"
              alt="VelvetNova private atelier"
            />
          </div>

          <div className="absolute inset-0 bg-black/5" />
        </section>

        <section className="flex-1 flex flex-col items-center justify-center px-8 md:px-margin-edge bg-background">
          <div className="w-full max-w-sm flex flex-col items-center translate-y-8 md:translate-y-10">
            <div className="mb-section-gap text-center md:hidden">
              <h1 className="font-display text-display-lg text-on-surface italic tracking-tighter">
                VelvetNova
              </h1>

              <p className="label-caps uppercase tracking-[0.2em] text-on-surface-variant mt-2">
                Private Atelier
              </p>
            </div>

            <div className="w-full mb-stack-md text-left">
              <h2 className="font-display text-headline-md text-primary mb-2">
                Selamat Datang
              </h2>

              <p className="text-body-sm text-on-surface-variant">
                Silakan masuk ke akun kurator Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-stack-md">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="label-caps text-on-surface-variant"
                >
                  Email
                </label>

                <input
                  className="boutique-input"
                  id="email"
                  name="email"
                  placeholder="nama@velvetnova.com"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="label-caps text-on-surface-variant"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    className="boutique-input pr-10"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-0 cursor-pointer"
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />

                  <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition">
                    Ingat Saya
                  </span>
                </label>

                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary underline underline-offset-4 decoration-outline-variant transition"
                  to="/forgot"
                >
                  Lupa Password?
                </Link>
              </div>

              <button
                className="w-full btn-black py-4 mt-stack-md luxury-shadow"
                type="submit"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk Dashboard"}
              </button>
            </form>

            <div className="mt-section-gap w-full flex flex-col items-center space-y-6">
              <div className="w-full flex items-center space-x-4">
                <div className="h-[1px] flex-1 bg-outline-variant/30" />

                <span className="label-caps text-outline-variant text-[10px]">
                  Atau
                </span>

                <div className="h-[1px] flex-1 bg-outline-variant/30" />
              </div>

              <button className="w-full border border-outline-variant/50 py-3 flex items-center justify-center space-x-3 hover:border-on-surface transition-colors duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>

                <span className="label-caps text-[11px] uppercase tracking-wider">
                  Sign-In
                </span>
              </button>

              <p className="text-body-sm text-on-surface-variant">
                Belum punya akun?{" "}
                <Link to="/register" className="text-secondary font-bold">
                  Daftar
                </Link>
              </p>
            </div>
          </div>

          <footer className="mt-auto py-stack-md">
            <p className="text-[11px] text-outline-variant text-center tracking-widest uppercase">
              © 2024 VelvetNova Private Atelier
            </p>
          </footer>
        </section>
      </div>

      <div className="fixed bottom-margin-edge right-margin-edge hidden md:block">
        <button className="w-12 h-12 bg-surface-container-lowest text-on-surface border border-outline-variant/30 flex items-center justify-center luxury-shadow hover:border-secondary transition-all group">
          <MdHelpOutline className="text-xl group-hover:text-secondary" />
        </button>
      </div>
    </main>
  );
}