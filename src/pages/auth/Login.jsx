import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiArrowRight,
  FiShoppingBag,
  FiStar,
  FiHeart,
} from "react-icons/fi";
import { supabase } from "../../lib/supabase";

/* Floating particle */
function Particle({ style }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full opacity-20"
      style={style}
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const { data, error: supaErr } = await supabase
        .from("users")
        .select("*")
        .eq("email", form.email)
        .eq("password", form.password)
        .single();

      if (supaErr || !data) {
        setError("Email atau password salah. Silakan coba lagi.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "admin") {
        localStorage.setItem("adminUser", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        navigate("/member");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Brand Badge */}
      <div className="mb-8">
        <div
          className="mb-4 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
          style={{
            background: "linear-gradient(135deg, rgba(199,167,101,0.15), rgba(199,167,101,0.05))",
            border: "1px solid rgba(199,167,101,0.3)",
          }}
        >
          <FiShoppingBag className="text-[#C7A765] text-[13px]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C7A765]">
            Hejmana Boutique CRM
          </span>
        </div>

        <h1 className="mt-2 text-[36px] font-black leading-[1.1] text-[#1C1410]">
          Selamat Datang
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #C7A765 0%, #8A6530 100%)" }}
          >
            Kembali ✨
          </span>
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-[#7C6B5B]">
          Masuk untuk mengelola koleksi & pelanggan Boutique Anda.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-5 flex items-center gap-3 rounded-[16px] px-4 py-3.5 text-[13px]"
          style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
        >
          <span className="text-[18px]">⚠️</span>
          <span className="text-red-600">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#4F4740]">
            Alamat Email
          </label>
          <div className="relative">
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
              style={{ color: focused === "email" ? "#C7A765" : "#B0956B" }}
            >
              <FiMail className="text-[15px]" />
            </div>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              placeholder="admin@hejmana.com"
              className="h-[52px] w-full rounded-[16px] pl-12 pr-4 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
              style={{
                background: focused === "email" ? "#FFFDF8" : "#FAF8F5",
                border: focused === "email"
                  ? "1.5px solid #C7A765"
                  : "1.5px solid #E7DDD2",
                boxShadow: focused === "email"
                  ? "0 0 0 4px rgba(199,167,101,0.12)"
                  : "none",
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4F4740]">
              Password
            </label>
            <Link
              to="/forgot"
              className="text-[12px] font-semibold text-[#C7A765] transition hover:text-[#9C7A3F]"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
              style={{ color: focused === "password" ? "#C7A765" : "#B0956B" }}
            >
              <FiLock className="text-[15px]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              placeholder="••••••••"
              className="h-[52px] w-full rounded-[16px] pl-12 pr-12 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
              style={{
                background: focused === "password" ? "#FFFDF8" : "#FAF8F5",
                border: focused === "password"
                  ? "1.5px solid #C7A765"
                  : "1.5px solid #E7DDD2",
                boxShadow: focused === "password"
                  ? "0 0 0 4px rgba(199,167,101,0.12)"
                  : "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A99B8E] transition hover:text-[#C7A765]"
            >
              {showPassword ? <FiEyeOff className="text-[16px]" /> : <FiEye className="text-[16px]" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <label className="flex cursor-pointer items-center gap-3">
          <div className="relative">
            <input type="checkbox" className="sr-only" />
            <div
              className="h-[18px] w-[18px] rounded-[5px] border-2 transition"
              style={{ borderColor: "#E7DDD2", background: "#FAF8F5" }}
            />
          </div>
          <span className="text-[12px] text-[#7C6B5B]">Ingat saya di perangkat ini</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group relative flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[16px] font-bold text-white shadow-[0_16px_40px_rgba(199,167,101,0.4)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(199,167,101,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0"
          style={{ background: "linear-gradient(135deg, #C7A765 0%, #8A6530 100%)" }}
        >
          {/* Shimmer effect */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

          <span className="relative flex items-center gap-2.5 text-[14px]">
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Masuk...
              </>
            ) : (
              <>
                Masuk ke Dashboard
                <FiArrowRight className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #E7DDD2)" }} />
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#B0A898]">atau</p>
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #E7DDD2)" }} />
      </div>

      {/* Register link */}
      <p className="text-center text-[13px] text-[#7C6B5B]">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-bold text-[#C7A765] transition hover:text-[#9C7A3F]"
        >
          Daftar sekarang →
        </Link>
      </p>

      {/* Trust badges */}
      <div className="mt-7 flex items-center justify-center gap-5">
        {[
          { icon: <FiStar className="text-[11px]" />, text: "Fashion Premium" },
          { icon: <FiShoppingBag className="text-[11px]" />, text: "500+ Produk" },
          { icon: <FiHeart className="text-[11px]" />, text: "2.5k Pelanggan" },
        ].map((b) => (
          <div key={b.text} className="flex items-center gap-1.5 text-[11px] text-[#B0A898]">
            <span className="text-[#C7A765]">{b.icon}</span>
            <span>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}