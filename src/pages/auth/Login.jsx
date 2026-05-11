import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiEye, FiEyeOff } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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
      navigate("/");
    }, 700);
  };

  return (
    <main className="min-h-screen w-full bg-[#FAF9F7] font-body text-[#2D2723] lg:grid lg:grid-cols-[1fr_1.15fr]">
      {/* LEFT SECTION */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#FAF9F7] px-[78px] py-[98px] lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(192,155,125,0.10),transparent_32%),radial-gradient(circle_at_70%_75%,rgba(192,155,125,0.08),transparent_38%)]" />

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
          <div className="mt-[90px] max-w-[650px]">
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
        <div className="w-full max-w-[610px]">
          <div className="mb-10 text-center">
            <h2 className="font-display text-[38px] font-medium leading-tight text-[#2D2723]">
              Welcome Back
            </h2>

            <p className="mt-3 text-[20px] font-normal text-[#7C7772]">
              Sign in to continue to your boutique dashboard
            </p>
          </div>

          <div className="rounded-[18px] border border-[#E6DED6] bg-white px-10 py-11 shadow-[0_10px_28px_rgba(45,39,35,0.08)]">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email */}
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
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-[60px] w-full rounded-[8px] border border-[#E6DED6] bg-white px-5 text-[19px] font-normal text-[#2D2723] outline-none placeholder:text-[#8C8782] focus:border-[#C09B7D] focus:ring-4 focus:ring-[#C09B7D]/15"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-[16px] font-medium text-[#2D2723]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot"
                    className="text-[16px] font-medium text-[#C09B7D] transition hover:text-[#9C7354]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="h-[60px] w-full rounded-[8px] border border-[#E6DED6] bg-white px-5 pr-14 text-[19px] font-normal text-[#2D2723] outline-none placeholder:text-[#8C8782] focus:border-[#C09B7D] focus:ring-4 focus:ring-[#C09B7D]/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[22px] text-[#8C8782] transition hover:text-[#2D2723]"
                    aria-label="Show password"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="h-[19px] w-[19px] rounded border-[#B8AEA5] accent-[#C09B7D]"
                />

                <span className="text-[17px] font-normal text-[#2D2723]">
                  Remember me for 30 days
                </span>
              </label>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="h-[62px] w-full rounded-[8px] bg-[#C09B7D] text-[20px] font-medium text-white shadow-[0_8px_18px_rgba(192,155,125,0.22)] transition hover:bg-[#AA8569] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-9 flex items-center gap-5">
              <div className="h-px flex-1 bg-[#E6DED6]" />
              <p className="text-[16px] font-normal text-[#7C7772]">
                or continue with
              </p>
              <div className="h-px flex-1 bg-[#E6DED6]" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex h-[54px] items-center justify-center gap-3 rounded-[8px] border border-[#E6DED6] bg-white text-[17px] font-medium text-[#2D2723] transition hover:bg-[#FAF9F7]"
              >
                <FcGoogle className="text-[24px]" />
                Google
              </button>

              <button
                type="button"
                className="flex h-[54px] items-center justify-center gap-3 rounded-[8px] border border-[#E6DED6] bg-white text-[17px] font-medium text-[#2D2723] transition hover:bg-[#FAF9F7]"
              >
                <FaGithub className="text-[22px]" />
                GitHub
              </button>
            </div>

            {/* Links */}
            <div className="mt-8 space-y-6 text-center">
              <p className="text-[16px] font-normal text-[#7C7772]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[#C09B7D] transition hover:text-[#9C7354]"
                >
                  Sign up
                </Link>
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-[17px] font-normal text-[#7C7772] transition hover:text-[#C09B7D]"
              >
                View Main Dashboard Layout →
              </button>
            </div>
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