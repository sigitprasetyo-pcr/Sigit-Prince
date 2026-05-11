import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiMail, FiArrowLeft } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen w-full bg-[#FAF9F7] font-body text-[#2D2723] lg:grid lg:grid-cols-[1fr_1.15fr]">
      {/* LEFT SECTION */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#FAF9F7] px-[78px] py-[64px] lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(192,155,125,0.10),transparent_32%),radial-gradient(circle_at_72%_76%,rgba(192,155,125,0.08),transparent_38%)]" />

        <div className="relative z-10">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[12px] bg-[#C09B7D] text-[34px] text-white shadow-[0_14px_30px_rgba(45,39,35,0.16)]">
              <FiShoppingBag />
            </div>

            <div>
              <h1 className="font-display text-[38px] font-medium leading-none text-[#2D2723]">
                Boutique
              </h1>
              <p className="mt-2 text-[16px] font-normal text-[#7C7772]">
                Elegant Collection
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="mt-[76px] max-w-[650px]">
            <h2 className="font-display text-[46px] font-medium leading-tight text-[#2D2723]">
              Discover Timeless Elegance
            </h2>

            <p className="mt-8 max-w-[580px] text-[24px] font-normal leading-[1.45] text-[#7C7772]">
              Curated collections of luxury fashion and accessories that
              celebrate your unique style.
            </p>
          </div>

          {/* Benefit List */}
          <div className="mt-12 space-y-7">
            {[
              "Exclusive designer collections",
              "Personalized shopping experience",
              "Premium quality guarantee",
              "Worldwide shipping",
            ].map((item) => (
              <div key={item} className="flex items-center gap-5">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#F3E7DF] text-[22px] text-[#C09B7D]">
                  <MdAutoAwesome />
                </div>

                <p className="text-[20px] font-normal text-[#2D2723]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 mt-auto max-w-[560px] rounded-[18px] border border-[#E6DED6] bg-white/60 p-8 shadow-[0_12px_35px_rgba(80,50,30,0.05)] backdrop-blur-sm">
          <p className="text-[20px] font-normal leading-relaxed text-[#514B45]">
            "The most exquisite shopping experience. Every piece tells a story
            of elegance and sophistication."
          </p>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#EFE7DF] text-[16px] font-medium text-[#C09B7D]">
              SJ
            </div>

            <div>
              <p className="text-[17px] font-medium text-[#2D2723]">
                Sarah Johnson
              </p>
              <p className="mt-1 text-[15px] font-normal text-[#7C7772]">
                Fashion Enthusiast
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-white px-5 py-10">
        <div className="w-full max-w-[560px]">
          <div className="mb-11 text-center">
            <h2 className="font-display text-[40px] font-medium leading-tight text-[#2D2723]">
              Reset Password
            </h2>

            <p className="mt-4 text-[21px] font-normal text-[#7C7772]">
              We'll help you get back into your account
            </p>
          </div>

          <div className="rounded-[18px] border border-[#E6DED6] bg-white px-10 py-10 shadow-[0_10px_28px_rgba(45,39,35,0.08)]">
            <div className="mb-8 flex justify-center">
              <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#F3E7DF] text-[38px] text-[#C09B7D]">
                <FiMail />
              </div>
            </div>

            <p className="mx-auto mb-9 max-w-[390px] text-center text-[20px] font-normal leading-relaxed text-[#7C7772]">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>

            {sent && (
              <div className="mb-6 rounded-[10px] border border-[#C9F0D8] bg-[#E7F8EF] px-5 py-4 text-[15px] font-normal text-[#00A85A]">
                Reset instructions have been sent to{" "}
                <span className="font-medium">{email}</span>.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-[16px] font-medium text-[#2D2723]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-[60px] w-full rounded-[8px] border border-[#E6DED6] bg-white px-5 text-[19px] font-normal text-[#2D2723] outline-none placeholder:text-[#8C8782] focus:border-[#C09B7D] focus:ring-4 focus:ring-[#C09B7D]/15"
                />
              </div>

              <button
                type="submit"
                className="h-[64px] w-full rounded-[8px] bg-[#C09B7D] text-[20px] font-medium text-white shadow-[0_8px_18px_rgba(192,155,125,0.22)] transition hover:bg-[#AA8569]"
              >
                Send Reset Instructions
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-3 text-[18px] font-normal text-[#7C7772] transition hover:text-[#C09B7D]"
              >
                <FiArrowLeft />
                Back to login
              </Link>
            </div>

            <div className="my-8 h-px w-full bg-[#E6DED6]" />

            <p className="text-center text-[15px] font-normal leading-relaxed text-[#8C8782]">
              Having trouble? Contact our support team at
              <br />
              <a
                href="mailto:support@boutique.com"
                className="text-[#C09B7D] transition hover:text-[#9C7354]"
              >
                support@boutique.com
              </a>
            </p>
          </div>

          <footer className="mt-10 text-center">
            <p className="text-[16px] font-normal text-[#7C7772]">
              © 2026 Boutique. All rights reserved.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}