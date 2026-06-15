import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (form.password !== form.confirmPassword) {
      alert("Password dan Confirm Password harus sama.");
      return;
    }

    try {
      setLoading(true);

      /* cek email */
      const { data: existingUser, error: checkError } =
        await supabase
          .from("users")
          .select("*")
          .eq("email", form.email)
          .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingUser) {
        alert("Email sudah terdaftar.");
        return;
      }

      /* simpan user */
      const { error } = await supabase
        .from("users")
        .insert([
          {
            name: form.name,
            email: form.email,
            password: form.password,
            role: "user",
          },
        ]);

      if (error) {
        throw error;
      }

      alert("Registrasi berhasil. Silakan login.");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.message || "Terjadi kesalahan saat registrasi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-3">
      <div className="mb-7">
        <h1 className="text-[30px] font-medium leading-tight text-[#050505]">
          Create Account
        </h1>

        <p className="mt-2 text-[15px] text-[#34485C]">
          Join us and start your premium fashion journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* NAME */}
        <div>
          <label className="mb-2.5 block text-[13px] text-[#142333]">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="h-[46px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 text-[14px] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2.5 block text-[13px] text-[#142333]">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="h-[46px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 text-[14px] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="mb-2.5 block text-[13px] text-[#142333]">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            placeholder="+62 812 3456 7890"
            value={form.phone}
            onChange={handleChange}
            required
            className="h-[46px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 text-[14px] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2.5 block text-[13px] text-[#142333]">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
              className="h-[46px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 pr-11 text-[14px] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#6F7B86]"
            >
              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2.5 block text-[13px] text-[#142333]">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="h-[46px] w-full rounded-[12px] border border-[#DDE1E6] bg-[#FAFBFC] px-4 pr-11 text-[14px] outline-none focus:border-[#C7A765] focus:ring-4 focus:ring-[#C7A765]/15"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (current) => !current
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#6F7B86]"
            >
              {showConfirmPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>
          </div>
        </div>

        {/* TERMS */}
        <label className="flex items-start gap-3 text-[13px] leading-relaxed text-[#34485C]">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            required
            className="mt-0.5 h-[15px] w-[15px] accent-[#C7A765]"
          />

          <span>
            I agree to the{" "}
            <span className="text-[#C7A765]">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-[#C7A765]">
              Privacy Policy
            </span>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-[48px] w-full rounded-[12px] bg-gradient-to-r from-[#C7A765] to-[#8F7650] text-[15px] font-medium text-white shadow-[0_12px_24px_rgba(180,148,85,0.24)] transition hover:opacity-90 disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#DDE1E6]" />

        <p className="text-[13px] text-[#6F7B86]">
          or sign up with
        </p>

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

      <p className="mt-7 text-center text-[13px] text-[#34485C]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#C7A765] hover:text-[#9C7A3F]"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}