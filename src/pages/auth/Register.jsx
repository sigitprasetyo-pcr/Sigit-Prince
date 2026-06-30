import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCheck,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";
import { supabase } from "../../lib/supabase";

/* Password strength indicator */
function PasswordStrength({ password }) {
  const checks = [
    { label: "Min. 8 karakter", ok: password.length >= 8 },
    { label: "Huruf besar", ok: /[A-Z]/.test(password) },
    { label: "Angka", ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["#E7DDD2", "#E05252", "#E0A52A", "#2E9B5F"];
  const labels = ["", "Lemah", "Sedang", "Kuat"];

  return (
    <div className="mt-2.5">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-400"
            style={{ backgroundColor: i < score ? colors[score] : "#E7DDD2" }}
          />
        ))}
      </div>
      {password && (
        <p className="mt-1 text-[11px]" style={{ color: colors[score] }}>
          {labels[score]}
        </p>
      )}
      {password.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center gap-1 text-[10px]">
              <span className={c.ok ? "text-[#2E9B5F]" : "text-[#C0B4A6]"}>
                {c.ok ? "✓" : "○"}
              </span>
              <span className={c.ok ? "text-[#2E9B5F]" : "text-[#C0B4A6]"}>{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [step, setStep] = useState(1); // 2-step form
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMsg("");
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setErrorMsg("Mohon lengkapi semua kolom.");
      return;
    }
    setStep(2);
    setErrorMsg("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Password dan Konfirmasi Password harus sama.");
      return;
    }
    if (form.password.length < 6) {
      setErrorMsg("Password minimal 6 karakter.");
      return;
    }

    try {
      setLoading(true);

      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("*")
        .eq("email", form.email)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        setErrorMsg("Email sudah terdaftar. Gunakan email lain.");
        return;
      }

      const { error } = await supabase.from("users").insert([
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "user",
        },
      ]);

      if (error) throw error;

      setSuccessMsg("Akun berhasil dibuat! Mengarahkan ke halaman login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    background: focused === name ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.55)",
    border: focused === name ? "1px solid #7A2E3A" : "1px solid rgba(197, 164, 109, 0.3)",
    boxShadow: focused === name ? "0 0 0 4px rgba(122,46,58,0.08)" : "none",
    transition: "all 0.3s ease",
  });

  return (
    <div className="py-2">
      {/* Header */}
      <div className="mb-7">
        <div
          className="mb-4 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
          style={{
            background: "linear-gradient(135deg, rgba(122,46,58,0.1), rgba(122,46,58,0.03))",
            border: "1px solid rgba(122,46,58,0.2)",
          }}
        >
          <FiShoppingBag className="text-[#7A2E3A] text-[13px]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7A2E3A]">
            Bergabung Sekarang
          </span>
        </div>

        <h1 className="text-[34px] font-light font-serif leading-[1.1] text-[#1C1410]">
          Buat Akun
          <br />
          <span
            className="bg-clip-text text-transparent font-normal"
            style={{ backgroundImage: "linear-gradient(135deg, #7A2E3A 0%, #C5A46D 100%)" }}
          >
            Boutique ✨
          </span>
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-[#7C6B5B] font-light">
          Daftar dan nikmati pengalaman kelola fashion premium.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-7 flex items-center gap-3">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold transition-all duration-300"
              style={{
                background:
                  step > s
                    ? "linear-gradient(135deg, #2E9B5F, #1E7B49)"
                    : step === s
                    ? "linear-gradient(135deg, #7A2E3A, #521E26)"
                    : "#F0EBE3",
                color: step >= s ? "white" : "#B0A898",
              }}
            >
              {step > s ? <FiCheck className="text-[13px]" /> : s}
            </div>
            <span className="text-[11px] font-medium text-[#7C6B5B] font-light">
              {s === 1 ? "Data Diri" : "Keamanan"}
            </span>
            {s < 2 && (
              <div
                className="h-px w-10 transition-all duration-500"
                style={{ background: step > 1 ? "#7A2E3A" : "#E7DDD2" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Success */}
      {successMsg && (
        <div
          className="mb-5 flex items-center gap-3 rounded-[16px] px-4 py-3.5 text-[13px]"
          style={{
            background: "linear-gradient(135deg, rgba(46,155,95,0.1), rgba(46,155,95,0.05))",
            border: "1px solid rgba(46,155,95,0.3)",
          }}
        >
          <FiCheck className="text-[#2E9B5F] text-[16px] shrink-0" />
          <span className="text-[#2E9B5F]">{successMsg}</span>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div
          className="mb-5 flex items-center gap-3 rounded-[16px] px-4 py-3.5 text-[13px]"
          style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
        >
          <span className="text-[18px]">⚠️</span>
          <span className="text-red-600">{errorMsg}</span>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
              Nama Lengkap
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px]" style={{ color: focused === "name" ? "#7A2E3A" : "#B0956B" }} />
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                required
                className="h-[52px] w-full rounded-[16px] pl-12 pr-4 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
                style={inputStyle("name")}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px]" style={{ color: focused === "email" ? "#7A2E3A" : "#B0956B" }} />
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
                className="h-[52px] w-full rounded-[16px] pl-12 pr-4 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
                style={inputStyle("email")}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
              Nomor Telepon
            </label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px]" style={{ color: focused === "phone" ? "#7A2E3A" : "#B0956B" }} />
              <input
                type="text"
                name="phone"
                placeholder="+62 812-xxxx-xxxx"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused("")}
                required
                className="h-[52px] w-full rounded-[16px] pl-12 pr-4 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
                style={inputStyle("phone")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[16px] font-semibold text-white shadow-[0_16px_40px_rgba(122,46,58,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(122,46,58,0.3)]"
            style={{ background: "linear-gradient(135deg, #7A2E3A 0%, #521E26 100%)" }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <span className="relative flex items-center gap-2 text-[14px]">
              Lanjut ke Langkah 2
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px]" style={{ color: focused === "password" ? "#7A2E3A" : "#B0956B" }} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Buat password kuat"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
                className="h-[52px] w-full rounded-[16px] pl-12 pr-12 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
                style={inputStyle("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A99B8E] hover:text-[#7A2E3A] transition"
              >
                {showPassword ? <FiEyeOff className="text-[16px]" /> : <FiEye className="text-[16px]" />}
              </button>
            </div>
            {form.password && <PasswordStrength password={form.password} />}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F4740]">
              Konfirmasi Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px]" style={{ color: focused === "confirm" ? "#7A2E3A" : "#B0956B" }} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Ulangi password"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused("")}
                required
                className="h-[52px] w-full rounded-[16px] pl-12 pr-12 text-[13px] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
                style={{
                  ...inputStyle("confirm"),
                  color:
                    form.confirmPassword &&
                    form.confirmPassword !== form.password
                      ? "#E05252"
                      : "#2D2723",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A99B8E] hover:text-[#7A2E3A] transition"
              >
                {showConfirmPassword ? <FiEyeOff className="text-[16px]" /> : <FiEye className="text-[16px]" />}
              </button>
              {/* Match indicator */}
              {form.confirmPassword && form.password && (
                <div className="absolute right-11 top-1/2 -translate-y-1/2">
                  {form.confirmPassword === form.password ? (
                    <FiCheck className="text-[#2E9B5F] text-[15px]" />
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-[#7C6B5B]">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              required
              className="mt-0.5 h-[16px] w-[16px] accent-[#7A2E3A] rounded cursor-pointer"
            />
            <span>
              Saya menyetujui{" "}
              <span className="font-semibold text-[#7A2E3A] hover:text-[#C5A46D] transition">Syarat & Ketentuan</span>{" "}
              serta{" "}
              <span className="font-semibold text-[#7A2E3A] hover:text-[#C5A46D] transition">Kebijakan Privasi</span>{" "}
              Aurelia Boutique
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[16px] font-semibold text-[#7C6B5B] transition hover:bg-[#F0EBE3] hover:text-[#7A2E3A]"
              style={{ border: "1.5px solid #E7DDD2" }}
            >
              ←
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex h-[54px] flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-[16px] font-semibold text-white shadow-[0_16px_40px_rgba(122,46,58,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(122,46,58,0.3)] disabled:opacity-70 disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg, #7A2E3A 0%, #521E26 100%)" }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <span className="relative flex items-center gap-2 text-[14px]">
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Membuat Akun...
                  </>
                ) : (
                  <>
                    Buat Akun Sekarang
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      )}

      {/* Already have account */}
      <p className="mt-7 text-center text-[13px] text-[#7C6B5B]">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#7A2E3A] transition hover:text-[#C5A46D]"
        >
          Masuk sekarang →
        </Link>
      </p>
    </div>
  );
}