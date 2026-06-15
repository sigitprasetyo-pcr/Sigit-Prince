import { useEffect, useState } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import { supabase } from "../lib/supabase";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setUsers(data);
    }

    setLoading(false);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    setLoading(true);

    if (editingId) {
      const { error } = await supabase
        .from("users")
        .update({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: form.role,
        })
        .eq("id", editingId);

      if (error) {
        alert(error.message);
      } else {
        alert("User berhasil diperbarui.");
      }
    } else {
      const { error } = await supabase
        .from("users")
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            role: form.role,
          },
        ]);

      if (error) {
        alert(error.message);
      } else {
        alert("User berhasil ditambahkan.");
      }
    }

    resetForm();

    fetchUsers();

    setLoading(false);
  }

  function handleEdit(user) {
    setEditingId(user.id);

    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      password: user.password,
      role: user.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus user ini?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("User berhasil dihapus.");
      fetchUsers();
    }
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
    });
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2723]">
            Manajemen User
          </h1>

          <p className="mt-1 text-sm text-[#8B735D]">
            Kelola seluruh akun pengguna boutique.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#F4E7CB] p-3 text-[#B49455]">
              <FiUsers size={24} />
            </div>

            <div>
              <p className="text-sm text-[#8B735D]">
                Total Users
              </p>

              <h3 className="text-2xl font-bold text-[#2D2723]">
                {users.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <FiUserPlus className="text-[#B49455]" />

          <h2 className="text-xl font-semibold text-[#2D2723]">
            {editingId ? "Edit User" : "Tambah User"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-[#E7E0D8] px-4 py-3 outline-none focus:border-[#B49455]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border border-[#E7E0D8] px-4 py-3 outline-none focus:border-[#B49455]"
          />

          <input
            type="text"
            name="phone"
            placeholder="Nomor Telepon"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl border border-[#E7E0D8] px-4 py-3 outline-none focus:border-[#B49455]"
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="rounded-xl border border-[#E7E0D8] px-4 py-3 outline-none focus:border-[#B49455]"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="rounded-xl border border-[#E7E0D8] px-4 py-3 outline-none focus:border-[#B49455]"
          >
            <option value="admin">Admin</option>

            <option value="user">User</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#C7A765] to-[#8F7650] px-4 py-3 font-medium text-white transition hover:opacity-90"
            >
              {loading
                ? "Menyimpan..."
                : editingId
                ? "Update User"
                : "Tambah User"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#E7E0D8] px-6"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAF7F3]">
              <tr>
                <th className="px-6 py-4 text-left">
                  Nama
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Phone
                </th>

                <th className="px-6 py-4 text-center">
                  Role
                </th>

                <th className="px-6 py-4 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#F3EEE9] hover:bg-[#FCFBFA]"
                >
                  <td className="px-6 py-5 font-medium">
                    {user.name}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <FiMail />

                      {user.email}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <FiPhone />

                      {user.phone}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="rounded-xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-[#8B735D]"
                  >
                    Belum ada data user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}