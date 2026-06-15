import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", form.email)
        .eq("password", form.password)
        .single();

      if (error || !data) {
        alert("Email atau password salah.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[30px] font-medium">
          Sign In
        </h1>

        <p className="mt-2 text-[15px] text-[#34485C]">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="h-[48px] w-full rounded-[12px] border px-4"
          />
        </div>

        <div>
          <label>Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="h-[48px] w-full rounded-[12px] border px-4 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-[48px] w-full rounded-[12px] bg-[#C7A765] text-white"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-300" />
        <p>or continue with</p>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex h-[44px] items-center justify-center gap-2 rounded-[12px] border"
        >
          <FcGoogle />
          Google
        </button>

        <button
          type="button"
          className="flex h-[44px] items-center justify-center gap-2 rounded-[12px] border"
        >
          <FaGithub />
          GitHub
        </button>
      </div>

      <p className="mt-8 text-center">
        Don't have an account?{" "}
        <Link to="/register">
          Sign up
        </Link>
      </p>
    </div>
  );
}