import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "admin@hejmana.com",
    password: "password",
    remember: false,
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
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-medium leading-tight text-[#050505]">
          Sign In
        </h1>

        <p className="mt-2 text-[15px] text-[#34485C]">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-3 block text-[13px] text-[#142333]">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="h-[48px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 text-[15px] text-[#6F7B86] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
          />
        </div>

        <div>
          <label className="mb-3 block text-[13px] text-[#142333]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="h-[48px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 pr-12 text-[15px] text-[#6F7B86] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#6F7B86]"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-[#34485C]">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="h-[15px] w-[15px] rounded border-[#9BA5AF] accent-[#C7A765]"
            />
            Remember me
          </label>

          <Link
            to="/forgot"
            className="text-[13px] text-[#C7A765] hover:text-[#9C7A3F]"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="h-[48px] w-full rounded-[12px] bg-gradient-to-r from-[#C7A765] to-[#8F7650] text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(180,148,85,0.24)] transition hover:opacity-90"
        >
          Sign In
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#DDE1E6]" />
        <p className="text-[13px] text-[#6F7B86]">or continue with</p>
        <div className="h-px flex-1 bg-[#DDE1E6]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex h-[44px] items-center justify-center gap-2 rounded-[12px] border border-[#DDE1E6] bg-white text-[14px] text-[#111827] transition hover:bg-[#FAF9F7]"
        >
          <FcGoogle className="text-[20px]" />
          Google
        </button>

        <button
          type="button"
          className="flex h-[44px] items-center justify-center gap-2 rounded-[12px] border border-[#DDE1E6] bg-white text-[14px] text-[#111827] transition hover:bg-[#FAF9F7]"
        >
          <FaGithub className="text-[19px]" />
          GitHub
        </button>
      </div>

      <p className="mt-8 text-center text-[13px] text-[#34485C]">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-[#C7A765] hover:text-[#9C7A3F]">
          Sign up
        </Link>
      </p>
    </div>
  );
}