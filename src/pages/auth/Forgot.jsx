import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiInfo } from "react-icons/fi";

export default function Forgot() {
  const [email, setEmail] = useState("admin@hejmana.com");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <Link
        to="/login"
        className="mb-8 inline-flex items-center gap-2 text-[13px] text-[#34485C] hover:text-[#C7A765]"
      >
        <FiArrowLeft />
        Kembali ke Login
      </Link>

      <div className="mb-7">
        <h1 className="text-[30px] font-medium leading-tight text-black">
          Reset Password
        </h1>

        <p className="mt-3 text-[15px] leading-relaxed text-[#34485C]">
          Masukkan email yang terdaftar dan kami akan mengirimkan instruksi
          reset password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-3 block text-[13px] text-[#142333]">
            Email Address
          </label>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#94A0AE]" />

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="h-[50px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] pl-12 pr-4 text-[15px] text-[#6F7B86] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
            />
          </div>
        </div>

        <div className="rounded-[13px] border border-[#C8DFFF] bg-[#EEF6FF] px-4 py-4">
          <div className="flex gap-3">
            <FiInfo className="mt-0.5 text-[18px] text-[#1F7AFF]" />

            <div>
              <p className="text-[13px] text-[#0B3FA8]">
                Link reset password akan dikirim ke email Anda.
              </p>

              <p className="mt-1.5 text-[12px] text-[#1F5EFF]">
                Link berlaku selama 1 jam.
              </p>
            </div>
          </div>
        </div>

        {sent && (
          <div className="rounded-[12px] border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
            Link reset berhasil dikirim ke <span>{email}</span>.
          </div>
        )}

        <button
          type="submit"
          className="h-[48px] w-full rounded-[12px] bg-gradient-to-r from-[#C7A765] to-[#8F7650] text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(180,148,85,0.24)] transition hover:opacity-90"
        >
          Kirim Link Reset
        </button>
      </form>

      <div className="mt-8 rounded-[13px] bg-[#FAFAFA] px-5 py-5 text-center">
        <p className="text-[13px] text-[#34485C]">
          Masih mengalami masalah?
        </p>

        <a
          href="mailto:support@hejmana.com"
          className="mt-2 inline-block text-[13px] text-[#C7A765]"
        >
          Hubungi Customer Support
        </a>
      </div>
    </div>
  );
}