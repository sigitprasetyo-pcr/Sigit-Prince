import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiSend,
  FiCheck,
  FiShield,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const handleResend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  };

  return (
    <div>
      {/* Back */}
      <Link
        to="/login"
        className="mb-8 inline-flex items-center gap-2 rounded-[12px] px-3 py-2 text-[13px] font-medium text-[#7C6B5B] transition hover:bg-[#F5F0EA] hover:text-[#C7A765]"
        style={{ border: "1px solid #E7DDD2" }}
      >
        <FiArrowLeft className="text-[14px]" />
        Kembali ke Login
      </Link>

      {!sent ? (
        /* ─── FORM STATE ─── */
        <div>
          {/* Header */}
          <div className="mb-8">
            {/* Icon */}
            <div
              className="mb-6 inline-flex h-[72px] w-[72px] items-center justify-center rounded-[24px]"
              style={{
                background: "linear-gradient(135deg, rgba(199,167,101,0.15), rgba(199,167,101,0.05))",
                border: "1.5px solid rgba(199,167,101,0.3)",
              }}
            >
              <FiMail className="text-[30px] text-[#C7A765]" />
            </div>

            <h1 className="text-[34px] font-black leading-[1.1] text-[#1C1410]">
              Lupa
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #C7A765 0%, #8A6530 100%)" }}
              >
                Password? 🔑
              </span>
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-[#7C6B5B]">
              Masukkan email Anda dan kami akan mengirimkan link reset password dalam hitungan menit.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#4F4740]">
                Alamat Email Terdaftar
              </label>
              <div className="relative">
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: focused ? "#C7A765" : "#B0956B" }}
                >
                  <FiMail className="text-[15px]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  placeholder="email@hejmana.com"
                  className="h-[52px] w-full rounded-[16px] pl-12 pr-4 text-[13px] text-[#2D2723] outline-none transition-all duration-200 placeholder:text-[#C0B4A6]"
                  style={{
                    background: focused ? "#FFFDF8" : "#FAF8F5",
                    border: focused ? "1.5px solid #C7A765" : "1.5px solid #E7DDD2",
                    boxShadow: focused ? "0 0 0 4px rgba(199,167,101,0.12)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Info box */}
            <div
              className="flex gap-3 rounded-[16px] p-4"
              style={{
                background: "linear-gradient(135deg, rgba(199,167,101,0.08), rgba(199,167,101,0.03))",
                border: "1px solid rgba(199,167,101,0.2)",
              }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-white"
                style={{ background: "linear-gradient(135deg, #C7A765, #8A6530)" }}
              >
                <FiShield className="text-[14px]" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#6B4E20]">Proses Aman & Terenkripsi</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#9C7A3F]">
                  Link reset berlaku selama <strong>1 jam</strong> dan hanya bisa digunakan sekali.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[16px] font-bold text-white shadow-[0_16px_40px_rgba(199,167,101,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(199,167,101,0.5)] disabled:opacity-70 disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg, #C7A765 0%, #8A6530 100%)" }}
            >
              {/* Shimmer */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

              <span className="relative flex items-center gap-2 text-[14px]">
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <FiSend className="text-[15px]" />
                    Kirim Link Reset
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Steps */}
          <div className="mt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B0A898]">
              Cara Reset Password
            </p>
            <div className="space-y-3">
              {[
                { step: "01", text: "Masukkan email yang terdaftar di atas" },
                { step: "02", text: "Cek inbox atau folder spam email Anda" },
                { step: "03", text: "Klik link reset dan buat password baru" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-black"
                    style={{
                      background: "linear-gradient(135deg, rgba(199,167,101,0.15), rgba(199,167,101,0.05))",
                      color: "#C7A765",
                      border: "1px solid rgba(199,167,101,0.25)",
                    }}
                  >
                    {item.step}
                  </div>
                  <p className="text-[12px] text-[#7C6B5B]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ─── SUCCESS STATE ─── */
        <div>
          {/* Success animation */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div
              className="mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full shadow-[0_16px_40px_rgba(46,155,95,0.35)]"
              style={{ background: "linear-gradient(135deg, #2E9B5F, #1A7A46)" }}
            >
              <FiCheck className="text-[42px] text-white" />
            </div>

            <h2 className="text-[28px] font-black text-[#1C1410]">
              Email Terkirim! 🎉
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#7C6B5B]">
              Kami telah mengirimkan link reset password ke
            </p>
            <div
              className="mt-3 rounded-[12px] px-5 py-2.5"
              style={{
                background: "linear-gradient(135deg, rgba(199,167,101,0.12), rgba(199,167,101,0.05))",
                border: "1px solid rgba(199,167,101,0.25)",
              }}
            >
              <p className="text-[14px] font-bold text-[#C7A765]">{email}</p>
            </div>
          </div>

          {/* Info cards */}
          <div className="mb-7 space-y-3">
            <div
              className="flex items-center gap-4 rounded-[16px] p-4"
              style={{
                background: "linear-gradient(135deg, rgba(46,155,95,0.07), rgba(46,155,95,0.03))",
                border: "1px solid rgba(46,155,95,0.2)",
              }}
            >
              <div
                className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[13px] text-white"
                style={{ background: "linear-gradient(135deg, #2E9B5F, #1A7A46)" }}
              >
                <FiClock className="text-[18px]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#2D2723]">Link Berlaku 1 Jam</p>
                <p className="text-[11px] text-[#7C6B5B]">Segera klik sebelum kedaluwarsa</p>
              </div>
            </div>

            <div
              className="flex items-center gap-4 rounded-[16px] p-4"
              style={{
                background: "linear-gradient(135deg, rgba(199,167,101,0.08), rgba(199,167,101,0.03))",
                border: "1px solid rgba(199,167,101,0.2)",
              }}
            >
              <div
                className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[13px] text-white"
                style={{ background: "linear-gradient(135deg, #C7A765, #8A6530)" }}
              >
                <FiMail className="text-[18px]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#2D2723]">Cek Folder Spam</p>
                <p className="text-[11px] text-[#7C6B5B]">Email mungkin masuk ke spam/junk</p>
              </div>
            </div>
          </div>

          {/* Resend */}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-[16px] py-4 text-[13px] font-semibold text-[#C7A765] transition hover:bg-[#F5F0EA] disabled:opacity-50"
            style={{ border: "1.5px solid rgba(199,167,101,0.35)" }}
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <FiRefreshCw className="text-[15px]" />
            )}
            {loading ? "Mengirim ulang..." : "Kirim Ulang Email"}
          </button>

          {/* Support */}
          <div
            className="mt-5 rounded-[18px] p-5 text-center"
            style={{ background: "#FAF8F5", border: "1px solid #F0EBE3" }}
          >
            <p className="text-[12px] text-[#7C6B5B]">Masih mengalami masalah?</p>
            <a
              href="mailto:support@hejmana.com"
              className="mt-1.5 inline-block text-[13px] font-semibold text-[#C7A765] transition hover:text-[#9C7A3F]"
            >
              Hubungi Customer Support →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}