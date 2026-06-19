import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
  FiShield,
  FiMail,
  FiPhone,
  FiX,
  FiEdit3,
  FiSave,
  FiCamera,
  FiLock,
  FiGlobe,
  FiToggleLeft,
  FiToggleRight,
  FiBell as FiBellIcon,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

/* ─────────────────────────────
   EDIT PROFILE MODAL
───────────────────────────── */
function EditProfileModal({ admin, onClose, onSave }) {
  const [form, setForm] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    phone: admin?.phone || "",
    bio: admin?.bio || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    // Update localStorage
    const updated = { ...admin, ...form };
    localStorage.setItem("user", JSON.stringify(updated));
    localStorage.setItem("adminUser", JSON.stringify(updated));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      onSave?.(updated);
      onClose();
    }, 800);
  };

  const avatar = (form.name || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />

      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(170deg, #1E1812 0%, #2A2019 60%, #1A1410 100%)",
          border: "1px solid rgba(199,167,101,0.2)",
        }}
      >
        {/* Glow top */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-[160px] w-[260px] -translate-x-1/2 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #C7A765 0%, transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between px-7 pt-7 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C7A765]/70">
              Profil Saya
            </p>
            <h2 className="mt-1 text-[22px] font-bold text-white">Edit Profil</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
          >
            <FiX className="text-[16px]" />
          </button>
        </div>

        {/* Divider */}
        <div
          className="mx-7 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(199,167,101,0.3), transparent)",
          }}
        />

        {/* Avatar */}
        <div className="flex flex-col items-center pt-6 pb-5">
          <div className="relative">
            <div
              className="flex h-[90px] w-[90px] items-center justify-center rounded-[28px] text-[32px] font-black text-white shadow-[0_12px_32px_rgba(199,167,101,0.45)]"
              style={{ background: "linear-gradient(135deg, #C7A765 0%, #7A5A28 100%)" }}
            >
              {avatar}
            </div>
            <button className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#C7A765] text-white shadow-md hover:bg-[#D4B775] transition">
              <FiCamera className="text-[12px]" />
            </button>
          </div>
          <p className="mt-3 text-[11px] text-white/40">Klik ikon kamera untuk ganti foto</p>
        </div>

        {/* Form */}
        <div className="space-y-4 px-7 pb-7">
          {[
            { name: "name", label: "Nama Lengkap", type: "text", icon: <FiUser />, placeholder: "Masukkan nama lengkap" },
            { name: "email", label: "Alamat Email", type: "email", icon: <FiMail />, placeholder: "email@example.com" },
            { name: "phone", label: "Nomor Telepon", type: "text", icon: <FiPhone />, placeholder: "+62 812-xxxx-xxxx" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C7A765]/70 text-[14px]">
                  {field.icon}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="h-[48px] w-full rounded-[14px] pl-11 pr-4 text-[13px] text-white/90 outline-none transition placeholder:text-white/25 focus:ring-2 focus:ring-[#C7A765]/40"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(199,167,101,0.2)",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-2 flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[16px] font-bold text-white shadow-[0_12px_28px_rgba(199,167,101,0.35)] transition-all duration-300 disabled:opacity-70"
            style={{ background: saved ? "linear-gradient(135deg, #2E9B5F, #1E7B49)" : "linear-gradient(135deg, #C7A765 0%, #8A6530 100%)" }}
          >
            {saving ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Menyimpan...
              </>
            ) : saved ? (
              <>
                <FiCheck className="text-[16px]" />
                Tersimpan!
              </>
            ) : (
              <>
                <FiSave className="text-[16px]" />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────
   SETTINGS MODAL
───────────────────────────── */
function SettingsModal({ onClose }) {
  const { dark, toggle } = useTheme();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [lang, setLang] = useState("id");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />

      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(170deg, #1E1812 0%, #2A2019 60%, #1A1410 100%)",
          border: "1px solid rgba(199,167,101,0.2)",
        }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-[160px] w-[260px] -translate-x-1/2 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #C7A765 0%, transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between px-7 pt-7 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C7A765]/70">Sistem</p>
            <h2 className="mt-1 text-[22px] font-bold text-white">Pengaturan</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
          >
            <FiX className="text-[16px]" />
          </button>
        </div>

        <div
          className="mx-7 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(199,167,101,0.3), transparent)" }}
        />

        {/* Settings Groups */}
        <div className="space-y-1 px-7 py-5">

          {/* Tampilan */}
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#C7A765]/60">Tampilan</p>

          <SettingToggle
            icon={dark ? <FiMoon /> : <FiSun />}
            label="Mode Gelap"
            desc={dark ? "Aktif - Tampilan gelap" : "Nonaktif - Tampilan terang"}
            active={dark}
            onToggle={toggle}
            color="#C7A765"
          />

          {/* Bahasa */}
          <div className="mt-5 mb-3">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#C7A765]/60">Bahasa & Wilayah</p>
            <div
              className="flex items-center justify-between rounded-[16px] p-4"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(199,167,101,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-[#C7A765]/20 text-[#C7A765] text-[16px]">
                  <FiGlobe />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">Bahasa Sistem</p>
                  <p className="text-[11px] text-white/40">Pilih bahasa antarmuka</p>
                </div>
              </div>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="rounded-[10px] px-3 py-1.5 text-[12px] font-semibold text-white outline-none cursor-pointer"
                style={{ background: "rgba(199,167,101,0.2)", border: "1px solid rgba(199,167,101,0.3)" }}
              >
                <option value="id" style={{ background: "#2A2019" }}>🇮🇩 Indonesia</option>
                <option value="en" style={{ background: "#2A2019" }}>🇺🇸 English</option>
              </select>
            </div>
          </div>

          {/* Notifikasi */}
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#C7A765]/60">Notifikasi</p>

          <SettingToggle
            icon={<FiBellIcon />}
            label="Email Notifikasi"
            desc="Terima pembaruan melalui email"
            active={emailNotif}
            onToggle={() => setEmailNotif((v) => !v)}
            color="#6D5DF6"
          />

          <div className="mt-2">
            <SettingToggle
              icon={<FiAlertCircle />}
              label="Push Notifikasi"
              desc="Notifikasi real-time di browser"
              active={pushNotif}
              onToggle={() => setPushNotif((v) => !v)}
              color="#2E9B5F"
            />
          </div>

          {/* Keamanan */}
          <div className="mt-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#C7A765]/60">Keamanan</p>
            <div
              className="flex items-center gap-3 rounded-[16px] p-4 cursor-pointer transition hover:bg-white/5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(199,167,101,0.12)" }}
            >
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-red-500/20 text-red-400 text-[16px]">
                <FiLock />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-white">Ganti Password</p>
                <p className="text-[11px] text-white/40">Perbarui kata sandi akun</p>
              </div>
              <FiChevronDown className="rotate-[-90deg] text-white/30 text-[14px]" />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="px-7 pb-7">
          <button
            onClick={handleSave}
            className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[16px] font-bold text-white transition-all duration-300"
            style={{
              background: saved
                ? "linear-gradient(135deg, #2E9B5F, #1E7B49)"
                : "linear-gradient(135deg, #C7A765 0%, #8A6530 100%)",
              boxShadow: "0 12px 28px rgba(199,167,101,0.35)",
            }}
          >
            {saved ? (
              <>
                <FiCheck className="text-[16px]" />
                Pengaturan Tersimpan!
              </>
            ) : (
              <>
                <FiSave className="text-[16px]" />
                Simpan Pengaturan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ icon, label, desc, active, onToggle, color }) {
  return (
    <div
      className="flex items-center justify-between rounded-[16px] p-4"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(199,167,101,0.15)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] text-white text-[16px] transition-all duration-300"
          style={{ backgroundColor: active ? color : "rgba(255,255,255,0.1)" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">{label}</p>
          <p className="text-[11px] text-white/40">{desc}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="relative h-[28px] w-[52px] rounded-full transition-all duration-300"
        style={{ backgroundColor: active ? color : "rgba(255,255,255,0.15)" }}
      >
        <span
          className={`absolute top-[4px] h-[20px] w-[20px] rounded-full bg-white shadow-md transition-all duration-300 ${active ? "left-[28px]" : "left-[4px]"}`}
        />
      </button>
    </div>
  );
}

/* ─────────────────────────────
   PROFILE MODAL
───────────────────────────── */
function ProfileModal({ admin, onClose, onLogout, onEditProfile, onSettings }) {
  const avatar = (admin?.name || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className="relative m-4 mt-[60px] mr-4 w-[340px] overflow-hidden rounded-[24px] shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(170deg, #1E1812 0%, #2A2019 50%, #1A1410 100%)",
          border: "1px solid rgba(199,167,101,0.2)",
        }}
      >
        {/* Golden glow top */}
        <div
          className="pointer-events-none absolute -top-16 left-1/2 h-[120px] w-[200px] -translate-x-1/2 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C7A765 0%, transparent 70%)" }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
        >
          <FiX className="text-[13px]" />
        </button>

        {/* Avatar + Name */}
        <div className="relative flex flex-col items-center px-6 pt-8 pb-6">
          <div
            className="flex h-[80px] w-[80px] items-center justify-center rounded-[26px] text-[28px] font-black text-white shadow-[0_12px_32px_rgba(199,167,101,0.45)]"
            style={{ background: "linear-gradient(135deg, #C7A765 0%, #7A5A28 100%)" }}
          >
            {avatar}
          </div>

          <h2 className="mt-4 text-[20px] font-bold text-white">{admin?.name || "Admin User"}</h2>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
              style={{ background: "linear-gradient(135deg, #C7A765, #A8834D)" }}
            >
              {admin?.role || "Administrator"}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E9B5F]" />
              Online
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(199,167,101,0.3), transparent)" }} />

        {/* Info */}
        <div className="mx-5 my-4 space-y-2.5">
          <InfoRow icon={<FiMail />} label="Email" value={admin?.email || "admin@hejmana.com"} />
          <InfoRow icon={<FiPhone />} label="Telepon" value={admin?.phone || "+62 812-xxxx-xxxx"} />
          <InfoRow icon={<FiShield />} label="Akses" value={admin?.role === "admin" ? "Full Admin" : "User"} />
        </div>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(199,167,101,0.3), transparent)" }} />

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 p-5">
          <button
            onClick={() => { onClose(); onEditProfile(); }}
            className="flex items-center gap-2 rounded-[14px] bg-white/[0.07] px-4 py-3 text-[12px] font-medium text-white/70 hover:bg-[#C7A765]/20 hover:text-white transition cursor-pointer"
          >
            <FiEdit3 className="text-[#C7A765]" />
            Edit Profil
          </button>
          <button
            onClick={() => { onClose(); onSettings(); }}
            className="flex items-center gap-2 rounded-[14px] bg-white/[0.07] px-4 py-3 text-[12px] font-medium text-white/70 hover:bg-[#C7A765]/20 hover:text-white transition cursor-pointer"
          >
            <FiSettings className="text-[#C7A765]" />
            Pengaturan
          </button>
        </div>

        {/* Logout */}
        <div className="px-5 pb-5">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-red-500/10 py-3 text-[13px] font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <FiLogOut />
            Keluar dari Akun
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[12px] bg-white/[0.06] px-4 py-2.5">
      <div className="flex items-center gap-2 text-[11px] text-white/40">
        <span className="text-[#C7A765]">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-[11px] font-medium text-white/80">{value}</span>
    </div>
  );
}

/* ─────────────────────────────
   HEADER
───────────────────────────── */
export default function Header() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  /* Read user from localStorage — try both "user" and "adminUser" keys */
  const [admin, setAdmin] = useState(
    () => JSON.parse(localStorage.getItem("user") || localStorage.getItem("adminUser") || "null")
  );

  const adminName = admin?.name || "Admin User";
  const adminRole = admin?.role || "Administrator";

  const avatar = adminName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleProfileSaved = (updated) => {
    setAdmin(updated);
  };

  const headerBg = dark
    ? "bg-[#18120E] border-[rgba(199,167,101,0.12)]"
    : "bg-white border-[#E7E0D8]";

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex h-[54px] items-center justify-between border-b px-6 transition-colors duration-300 ${headerBg}`}
      >
        {/* SEARCH */}
        <div className="relative w-[280px]">
          <FiSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-[13px] ${dark ? "text-[#6B5E50]" : "text-[#A58E7B]"}`}
          />
          <input
            type="text"
            placeholder="Cari pesanan, stok, atau pelanggan..."
            className={`h-[28px] w-full rounded-[9px] border border-transparent pl-9 pr-4 text-[11px] outline-none placeholder:text-[#A58E7B] transition focus:border-[#C7A765] ${
              dark
                ? "bg-[#25191280] text-[#E0D5CC]"
                : "bg-[#F9F5F1] text-[#4F4740]"
            }`}
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* DARK MODE TOGGLE */}
          <button
            type="button"
            onClick={toggle}
            title={dark ? "Terang" : "Gelap"}
            className={`relative flex h-[30px] w-[54px] items-center rounded-full border transition-all duration-300 ${
              dark
                ? "border-[rgba(199,167,101,0.25)] bg-[#2A1F15]"
                : "border-[#E7E0D8] bg-[#F3EDE5]"
            }`}
          >
            <span
              className={`absolute flex h-[22px] w-[22px] items-center justify-center rounded-full shadow-md transition-all duration-300 ${
                dark
                  ? "left-[27px] bg-[#C7A765] text-white"
                  : "left-[3px] bg-white text-[#C7A765]"
              }`}
            >
              {dark ? <FiMoon className="text-[11px]" /> : <FiSun className="text-[11px]" />}
            </span>
          </button>

          {/* NOTIFICATION */}
          <button
            type="button"
            className={`relative flex h-[28px] w-[28px] items-center justify-center rounded-full text-[14px] transition ${
              dark ? "text-white/60 hover:text-[#C7A765]" : "text-[#3A2619] hover:text-[#C7A765]"
            }`}
          >
            <FiBell />
            <span className="absolute right-[4px] top-[4px] h-[6px] w-[6px] rounded-full bg-red-500" />
          </button>

          <div className={`h-5 w-px ${dark ? "bg-white/10" : "bg-[#EEE7DF]"}`} />

          {/* PROFILE TRIGGER */}
          <button
            type="button"
            onClick={() => setShowProfile(true)}
            className={`flex items-center gap-3 rounded-[10px] px-2 py-1 text-left transition hover:bg-[#C7A765]/10 ${
              dark ? "text-white/80" : ""
            }`}
          >
            <div className="text-right leading-tight">
              <p className={`text-[11px] font-semibold ${dark ? "text-white/90" : "text-[#2D2723]"}`}>
                {adminName}
              </p>
              <p className={`text-[9px] ${dark ? "text-[#C7A765]" : "text-[#8B735D]"}`}>
                {adminRole}
              </p>
            </div>

            <div
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-bold text-white shadow-md"
              style={{ background: "linear-gradient(135deg, #C7A765 0%, #7A5A28 100%)" }}
            >
              {avatar}
            </div>

            <FiChevronDown className={`text-[12px] ${dark ? "text-white/30" : "text-[#8B735D]"}`} />
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          admin={admin}
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
          onEditProfile={() => setShowEditProfile(true)}
          onSettings={() => setShowSettings(true)}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          admin={admin}
          onClose={() => setShowEditProfile(false)}
          onSave={handleProfileSaved}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}