import { useEffect, useState } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiSearch,
  FiShield,
  FiUser,
  FiX,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";

/* ─── Role badge ─── */
function RoleBadge({ role }) {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
        isAdmin
          ? "bg-gradient-to-r from-[#C7A765]/20 to-[#C7A765]/10 text-[#B08A40]"
          : "bg-[#EAF8EF] text-[#2E9B5F]"
      }`}
    >
      {isAdmin ? <FiShield className="text-[10px]" /> : <FiUser className="text-[10px]" />}
      {role}
    </span>
  );
}

/* ─── Input field ─── */
function FormInput({ label, name, type = "text", placeholder, value, onChange, icon, dark }) {
  return (
    <div>
      <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] ${dark ? "text-[#8B7E76]" : "text-[#7C6B5B]"}`}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] ${dark ? "text-[#6B5E50]" : "text-[#B0956B]"}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-[44px] w-full rounded-[13px] border text-[13px] outline-none transition ${icon ? "pl-10 pr-4" : "px-4"} ${
            dark
              ? "border-[rgba(199,167,101,0.15)] bg-[#1C1610] text-[#E8E0D5] placeholder:text-[#5C5249] focus:border-[#C7A765]"
              : "border-[#E7DDD2] bg-[#FAF8F5] text-[#2D2723] placeholder:text-[#C0B4A6] focus:border-[#C7A765]"
          } focus:ring-2 focus:ring-[#C7A765]/20`}
        />
      </div>
    </div>
  );
}

export default function Users() {
  const { dark } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

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
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        setUsers(data);
      } else {
        setUsers([
          { id: "usr-01", name: "Aurelia Admin", email: "admin@aurelia.com", phone: "0812-3456-7890", role: "admin", password: "••••••••" },
          { id: "usr-02", name: "Siti Rahma", email: "siti@aurelia.com", phone: "0819-8765-4321", role: "user", password: "••••••••" },
          { id: "usr-03", name: "Budi Santoso", email: "budi@aurelia.com", phone: "0821-2233-4455", role: "user", password: "••••••••" },
          { id: "usr-04", name: "Rina Wijaya", email: "rina@aurelia.com", phone: "0857-9988-7766", role: "user", password: "••••••••" },
        ]);
      }
    } catch (e) {
      console.error(e);
      setUsers([
        { id: "usr-01", name: "Aurelia Admin", email: "admin@aurelia.com", phone: "0812-3456-7890", role: "admin", password: "••••••••" },
        { id: "usr-02", name: "Siti Rahma", email: "siti@aurelia.com", phone: "0819-8765-4321", role: "user", password: "••••••••" },
        { id: "usr-03", name: "Budi Santoso", email: "budi@aurelia.com", phone: "0821-2233-4455", role: "user", password: "••••••••" },
        { id: "usr-04", name: "Rina Wijaya", email: "rina@aurelia.com", phone: "0857-9988-7766", role: "user", password: "••••••••" },
      ]);
    }
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) {
      alert("Semua field wajib diisi.");
      return;
    }
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from("users").update({
        name: form.name, email: form.email, phone: form.phone, password: form.password, role: form.role,
      }).eq("id", editingId);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from("users").insert([{
        name: form.name, email: form.email, phone: form.phone, password: form.password, role: form.role,
      }]);
      if (error) alert(error.message);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    resetForm();
    fetchUsers();
    setLoading(false);
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, phone: user.phone || "", password: user.password, role: user.role });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) alert(error.message);
    else {
      setDeleteConfirm(null);
      fetchUsers();
    }
  }

  function resetForm() {
    setEditingId(null);
    setForm({ name: "", email: "", phone: "", password: "", role: "user" });
  }

  const filtered = users.filter((u) =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  const card = dark ? "bg-[#1C1610] border-[rgba(199,167,101,0.12)]" : "bg-white border-[#E7E0D8]";
  const txt = dark ? "text-[#E8E0D5]" : "text-[#2D2723]";
  const txt2 = dark ? "text-[#8B7E76]" : "text-[#7C6B5B]";
  const bg = dark ? "bg-[#110E0B]" : "bg-[#F7F5F2]";

  return (
    <section className={`min-h-[calc(100vh-54px)] px-8 py-6 transition-colors duration-300 ${bg}`}>
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ─── HEADER ─── */}
        <div className="mb-7">
          <p className={`text-[10px] uppercase tracking-[0.22em] ${dark ? "text-[#C7A765]/70" : "text-[#A98467]"}`}>
            Admin Panel · Aurelia Boutique
          </p>
          <h1 className={`mt-1 text-[28px] font-bold leading-tight ${txt}`}>Manajemen User</h1>
          <p className={`mt-1 text-[13px] ${txt2}`}>
            Kelola akun admin dan user yang dapat mengakses sistem CRM Boutique.
          </p>
        </div>

        {/* ─── STAT CARDS ─── */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { icon: <FiUsers />, label: "Total User", value: users.length, color: "#C7A765", desc: "Semua akun terdaftar" },
            { icon: <FiShield />, label: "Admin", value: adminCount, color: "#6D5DF6", desc: "Akses penuh sistem" },
            { icon: <FiUser />, label: "User Biasa", value: userCount, color: "#2E9B5F", desc: "Akses terbatas" },
          ].map((s) => (
            <div
              key={s.label}
              className={`relative overflow-hidden rounded-[22px] border p-6 shadow-sm transition-all hover:-translate-y-1 ${card}`}
            >
              <div
                className="absolute -right-5 -top-5 h-[80px] w-[80px] rounded-full opacity-10"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex items-start justify-between">
                <div
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] text-[21px] text-white shadow-md"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </div>
              </div>
              <p className={`mt-5 text-[11px] uppercase tracking-[0.14em] ${txt2}`}>{s.label}</p>
              <h2 className={`mt-1.5 text-[34px] font-bold leading-none ${txt}`}>{s.value}</h2>
              <p className={`mt-1.5 text-[11px] ${dark ? "text-[#6B5E50]" : "text-[#A99B8E]"}`}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── FORM + TABLE ─── */}
        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">

          {/* FORM PANEL */}
          <div className={`h-fit rounded-[24px] border p-7 shadow-[0_12px_32px_rgba(45,39,35,0.08)] ${card}`}>
            {/* Form Header */}
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-[44px] w-[44px] items-center justify-center rounded-[15px] text-white shadow-md"
                style={{ background: editingId ? "linear-gradient(135deg,#2563EB,#1A4DB5)" : "linear-gradient(135deg,#C7A765,#8A6530)" }}
              >
                {editingId ? <FiEdit2 /> : <FiUserPlus />}
              </div>
              <div>
                <p className={`text-[10px] uppercase tracking-[0.15em] ${dark ? "text-[#C7A765]/70" : "text-[#A98467]"}`}>
                  {editingId ? "Edit User" : "Tambah Akun"}
                </p>
                <h2 className={`text-[18px] font-bold ${txt}`}>
                  {editingId ? "Perbarui Data User" : "Buat Akun Baru"}
                </h2>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput label="Nama Lengkap" name="name" placeholder="Nama user" value={form.name} onChange={handleChange} icon={<FiUser />} dark={dark} />
              <FormInput label="Email" name="email" type="email" placeholder="email@boutique.com" value={form.email} onChange={handleChange} icon={<FiMail />} dark={dark} />
              <FormInput label="Nomor Telepon" name="phone" placeholder="08xx-xxxx-xxxx" value={form.phone} onChange={handleChange} icon={<FiPhone />} dark={dark} />
              <FormInput label="Password" name="password" type="text" placeholder="Password akun" value={form.password} onChange={handleChange} dark={dark} />

              {/* Role Select */}
              <div>
                <label className={`mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] ${dark ? "text-[#8B7E76]" : "text-[#7C6B5B]"}`}>
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={`h-[44px] w-full rounded-[13px] border px-4 text-[13px] outline-none transition ${
                    dark
                      ? "border-[rgba(199,167,101,0.15)] bg-[#1C1610] text-[#E8E0D5] focus:border-[#C7A765]"
                      : "border-[#E7DDD2] bg-[#FAF8F5] text-[#2D2723] focus:border-[#C7A765]"
                  } focus:ring-2 focus:ring-[#C7A765]/20`}
                >
                  <option value="admin">Admin — Akses Penuh</option>
                  <option value="user">User — Akses Terbatas</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3 text-[13px] font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60 ${
                    saved ? "bg-gradient-to-r from-[#2E9B5F] to-[#1E7B49]" : "bg-gradient-to-r from-[#C7A765] to-[#8A6530]"
                  }`}
                >
                  {saved ? <><FiCheck /> Tersimpan!</> : loading ? "Menyimpan..." : editingId ? <><FiEdit2 /> Update User</> : <><FiUserPlus /> Tambah User</>}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`rounded-[14px] px-4 text-[13px] font-medium transition ${
                      dark
                        ? "border border-white/10 text-white/60 hover:bg-white/5"
                        : "border border-[#E7E0D8] text-[#7C7772] hover:bg-[#F4EFEA]"
                    }`}
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TABLE PANEL */}
          <div className={`overflow-hidden rounded-[24px] border shadow-[0_12px_32px_rgba(45,39,35,0.08)] ${card}`}>
            {/* Table Header */}
            <div className={`border-b p-6 ${dark ? "border-[rgba(199,167,101,0.12)]" : "border-[#EEE7DF]"}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className={`text-[10px] uppercase tracking-[0.2em] ${dark ? "text-[#C7A765]/70" : "text-[#A98467]"}`}>
                    User Management
                  </p>
                  <h3 className={`mt-1 text-[20px] font-bold ${txt}`}>
                    Daftar Pengguna
                    <span className={`ml-2 text-[14px] font-normal ${txt2}`}>({filtered.length})</span>
                  </h3>
                </div>
                {/* Search */}
                <div className="relative">
                  <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-[13px] ${dark ? "text-[#6B5E50]" : "text-[#A58E7B]"}`} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama, email, role..."
                    className={`h-[38px] w-[220px] rounded-[12px] border pl-9 pr-4 text-[12px] outline-none transition ${
                      dark
                        ? "border-[rgba(199,167,101,0.15)] bg-[#1A1410] text-[#E8E0D5] placeholder:text-[#5C5249] focus:border-[#C7A765]"
                        : "border-[#D8D0C8] bg-white text-[#2D2723] placeholder:text-[#B0A89C] focus:border-[#C7A765]"
                    } focus:ring-2 focus:ring-[#C7A765]/20`}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className={dark ? "bg-[#1A1410]" : "bg-gradient-to-r from-[#F4EFEA] to-[#EEE7DF]"}>
                    {["User", "Email", "Telepon", "Role", "Aksi"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] ${i < 4 ? "text-left" : "text-center"} ${dark ? "text-[#6B5E50]" : "text-[#5E5148]"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className={`text-[13px] ${dark ? "text-[#6B5E50]" : "text-[#A99B8E]"}`}>Memuat data...</div>
                      </td>
                    </tr>
                  )}

                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <FiUsers className={`text-[32px] ${dark ? "text-[#4A3828]" : "text-[#D0C8C0]"}`} />
                          <p className={`text-[13px] ${dark ? "text-[#6B5E50]" : "text-[#8B7E76]"}`}>
                            {search ? "Tidak ada user ditemukan" : "Belum ada data user."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading && filtered.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={`border-t transition-colors ${
                        dark
                          ? "border-[rgba(199,167,101,0.07)] hover:bg-[rgba(199,167,101,0.04)]"
                          : "border-[#EEE7DF] hover:bg-[#FBFAF8]"
                      } ${idx % 2 === 1 ? (dark ? "bg-[#191410]" : "bg-[#FDFCFB]") : ""}`}
                    >
                      {/* User column with avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[12px] text-[12px] font-bold text-white shadow-sm"
                            style={{ background: user.role === "admin" ? "linear-gradient(135deg,#C7A765,#8A6530)" : "linear-gradient(135deg,#2E9B5F,#1E7049)" }}
                          >
                            {(user.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className={`font-semibold ${txt}`}>{user.name}</p>
                            <p className={`text-[10px] ${dark ? "text-[#6B5E50]" : "text-[#A99B8E]"}`}>
                              #{user.id?.slice(0, 8) || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className={`flex items-center gap-2 ${dark ? "text-[#9A8E82]" : "text-[#4F4740]"}`}>
                          <FiMail className={`shrink-0 ${dark ? "text-[#6B5E50]" : "text-[#B07A52]"}`} />
                          {user.email}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className={`flex items-center gap-2 ${dark ? "text-[#9A8E82]" : "text-[#4F4740]"}`}>
                          <FiPhone className={`shrink-0 ${dark ? "text-[#6B5E50]" : "text-[#B07A52]"}`} />
                          {user.phone || "—"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <RoleBadge role={user.role} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-[#DCEAFF] text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
                          >
                            <FiEdit2 className="text-[13px]" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(user)}
                            className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-[#FFEDED] text-[#E05252] transition hover:bg-[#E05252] hover:text-white"
                          >
                            <FiTrash2 className="text-[13px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className={`border-t px-6 py-4 ${dark ? "border-[rgba(199,167,101,0.08)] bg-[#191410]" : "border-[#EEE7DF] bg-[#FAF9F7]"}`}>
              <p className={`text-[11px] ${dark ? "text-[#6B5E50]" : "text-[#8B7E76]"}`}>
                Menampilkan <span className={`font-semibold ${txt}`}>{filtered.length}</span> dari{" "}
                <span className={`font-semibold ${txt}`}>{users.length}</span> user terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── DELETE CONFIRM MODAL ─── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          <div
            className="relative w-[360px] overflow-hidden rounded-[24px] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
            style={{
              background: dark ? "#1C1610" : "#fff",
              border: dark ? "1px solid rgba(199,167,101,0.15)" : "1px solid #E7E0D8",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#FFEDED] text-[#E05252]">
              <FiAlertTriangle className="text-[28px]" />
            </div>
            <h3 className={`text-[20px] font-bold ${txt}`}>Hapus User?</h3>
            <p className={`mt-2 text-[13px] ${txt2}`}>
              Anda akan menghapus akun <strong className={txt}>{deleteConfirm.name}</strong>. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className={`flex-1 rounded-[13px] border py-3 text-[13px] font-medium transition ${
                  dark
                    ? "border-white/10 text-white/60 hover:bg-white/5"
                    : "border-[#E7E0D8] text-[#7C7772] hover:bg-[#F4EFEA]"
                }`}
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 rounded-[13px] bg-gradient-to-r from-[#E05252] to-[#B83838] py-3 text-[13px] font-semibold text-white shadow-md transition hover:shadow-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}