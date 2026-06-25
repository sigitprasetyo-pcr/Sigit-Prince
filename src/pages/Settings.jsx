import { useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiDatabase,
  FiGlobe,
  FiLock,
  FiMail,
  FiSave,
  FiSettings,
  FiShield,
  FiShoppingBag,
  FiSliders,
  FiTag,
  FiUser,
  FiStar,
  FiZap,
  FiKey,
  FiRefreshCw,
  FiToggleRight,
} from "react-icons/fi";

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(true);
  const [memberNotif, setMemberNotif] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">

        {/* ─── PAGE HEADER ─── */}
        <div className="mb-7">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">Sistem Admin · Aurelia Boutique</p>
          <h1 className="mt-1 text-[28px] font-bold leading-tight text-[#2D2723]">Pengaturan Boutique</h1>
          <p className="mt-1 text-[13px] text-[#8B7E76]">
            Mengatur identitas boutique, data CRM, notifikasi, keamanan, dan tampilan sistem admin.
          </p>
        </div>

        {/* ─── HERO BANNER ─── */}
        <div className="mb-6 overflow-hidden rounded-[26px] shadow-[0_16px_44px_rgba(45,39,35,0.18)]">
          {/* Gradient header */}
          <div className="relative bg-gradient-to-r from-[#1C1410] via-[#3A2619] to-[#C7A765] p-8 text-white">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[40%] opacity-10"
              style={{ background: "radial-gradient(ellipse at right center, #C7A765 0%, transparent 70%)" }}
            />
            <div className="absolute right-16 top-6 h-[100px] w-[100px] rounded-full bg-white/5 blur-sm" />
            <div className="absolute right-36 bottom-4 h-[60px] w-[60px] rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-white/15 text-[22px] backdrop-blur">
                    ✨
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Aurelia Boutique CRM</p>
                    <h2 className="mt-0.5 text-[26px] font-black">Sistem Admin Boutique</h2>
                  </div>
                </div>
                <p className="mt-4 max-w-[600px] text-[13px] leading-7 text-white/70">
                  Halaman ini digunakan untuk mengatur informasi brand, pengelolaan data customer, membership, promo, transaksi, dan keamanan sistem CRM Boutique.
                </p>
              </div>

              {/* Status badge */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-[18px] border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[13px] bg-white text-[#3A2619]">
                    <FiSettings />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60">Status Sistem</p>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#2E9B5F]" />
                      <p className="text-[15px] font-bold">Aktif & Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-[14px] border border-white/10 bg-white/8 px-4 py-2.5 text-center backdrop-blur">
                  <FiZap className="text-[#C7A765]" />
                  <p className="text-[11px] font-medium text-white/80">Version 2.0 · Fashion CRM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 border-t border-[#E7E0D8] bg-white md:grid-cols-4">
            {[
              { icon: <FiUser />, label: "Admin", value: "Boutique Admin", color: "#C7A765" },
              { icon: <FiDatabase />, label: "Data Customer", value: "800 Data", color: "#6D5DF6" },
              { icon: <FiTag />, label: "Promo Aktif", value: "5 Campaign", color: "#2E9B5F" },
              { icon: <FiShield />, label: "Keamanan", value: "Protected ✓", color: "#2563EB" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-3 p-5 ${i < 3 ? "border-b border-[#E7E0D8] md:border-b-0 md:border-r" : ""}`}
              >
                <div
                  className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[13px] text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] text-[#7C7772]">{s.label}</p>
                  <p className="text-[14px] font-semibold text-[#2D2723]">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BRAND INFO + THEME ─── */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">

          {/* Brand Profile */}
          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-7 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">Brand Profile</p>
                <h3 className="mt-1 text-[22px] font-bold text-[#2D2723]">Informasi Boutique</h3>
              </div>
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[15px] bg-gradient-to-br from-[#C7A765] to-[#A8834D] text-white shadow-md">
                <FiShoppingBag />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputBox label="Nama Boutique" value="Aurelia Boutique" icon="🏪" />
              <InputBox label="Jenis Sistem" value="Customer Relationship Management" icon="⚙️" />
              <InputBox label="Kategori Bisnis" value="Fashion & Boutique" icon="👗" />
              <InputBox label="Lokasi Utama" value="Pekanbaru, Riau" icon="📍" />
              <InputBox label="Email Admin" value="admin@aureliaboutique.id" icon="📧" />
              <InputBox label="Nomor WhatsApp" value="0812-3456-7890" icon="📱" />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className={`mt-6 inline-flex items-center gap-2 rounded-[14px] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(45,39,35,0.2)] transition-all duration-200 hover:shadow-[0_14px_30px_rgba(45,39,35,0.28)] ${
                saved
                  ? "bg-gradient-to-r from-[#2E9B5F] to-[#1E7B49]"
                  : "bg-gradient-to-r from-[#3A2619] to-[#5C3D28]"
              }`}
            >
              {saved ? <FiCheckCircle /> : <FiSave />}
              {saved ? "Tersimpan!" : "Simpan Pengaturan"}
            </button>
          </div>

          {/* Theme Preview */}
          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-7 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">Theme Preview</p>
              <h3 className="mt-1 text-[22px] font-bold text-[#2D2723]">Tampilan Tema Boutique</h3>
            </div>

            {/* Live Preview */}
            <div className="overflow-hidden rounded-[20px] border border-[#E7E0D8]">
              {/* Mini header */}
              <div className="bg-gradient-to-r from-[#1C1410] to-[#3A2619] px-4 py-3 flex items-center gap-2">
                <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-[#C7A765] text-[11px] font-black text-white">H</div>
                <span className="text-[11px] font-bold text-white">Aurelia Boutique</span>
                <span className="ml-1 rounded-full bg-[#C7A765]/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#C7A765]">Boutique</span>
              </div>

              {/* Color palette */}
              <div className="bg-[#FAF9F7] p-4">
                <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[#A98467]">Palet Warna Boutique</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Primary", color: "#1C1410", hex: "#1C1410" },
                    { label: "Gold", color: "#C7A765", hex: "#C7A765" },
                    { label: "Cream", color: "#F7F5F2", hex: "#F7F5F2", dark: true },
                    { label: "Accent", color: "#3A2619", hex: "#3A2619" },
                  ].map((c) => (
                    <div key={c.label} className="text-center">
                      <div
                        className="mx-auto h-[38px] w-full rounded-[10px] border border-white/20 shadow-sm"
                        style={{ backgroundColor: c.color }}
                      />
                      <p className="mt-1.5 text-[9px] font-medium text-[#7C7772]">{c.label}</p>
                      <p className="text-[8px] text-[#B0A89C]">{c.hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <SettingRow icon={<FiGlobe />} label="Bahasa Sistem" value="Indonesia" />
              <SettingRow icon={<FiSliders />} label="Mode Tampilan" value="Light Mode" />
              <SettingRow icon={<FiCheckCircle />} label="Status UI" value="Aktif" />
              <SettingRow icon={<FiRefreshCw />} label="Last Sync" value="Hari ini" />
            </div>
          </div>
        </div>

        {/* ─── INFO CARDS ─── */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <BoutiqueInfoCard
            icon={<FiDatabase />}
            title="Data CRM"
            desc="Mengelola data customer, kontak, membership, transaksi, interaksi, aktivitas user, dan promo boutique."
            items={["800 data customer", "Membership aktif", "Riwayat transaksi", "Marketing engagement"]}
            color="#6D5DF6"
          />
          <BoutiqueInfoCard
            icon={<FiShield />}
            title="Keamanan"
            desc="Mengatur keamanan akses admin dan perlindungan data customer boutique secara penuh."
            items={["Role admin", "Login protected", "Data customer aman", "Session aktif"]}
            color="#2E9B5F"
          />
          <BoutiqueInfoCard
            icon={<FiBell />}
            title="Notifikasi"
            desc="Mengatur pemberitahuan untuk transaksi, promo, membership, dan interaksi customer."
            items={["Email promo", "Update pesanan", "Member baru", "Komplain customer"]}
            color="#C7A765"
          />
        </div>

        {/* ─── NOTIFICATION + STATUS ─── */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">

          {/* Notification Control */}
          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-7 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">Notification Control</p>
              <h3 className="mt-1 text-[22px] font-bold text-[#2D2723]">Pengaturan Notifikasi</h3>
              <p className="mt-1 text-[12px] text-[#7C7772]">Atur notifikasi yang akan dikirimkan ke customer.</p>
            </div>

            <div className="space-y-4">
              <ToggleRow
                icon={<FiMail />}
                title="Email / SMS Subscription"
                desc="Kirim info promo dan campaign ke customer."
                active={emailNotif}
                onClick={() => setEmailNotif(!emailNotif)}
                color="#6D5DF6"
              />
              <ToggleRow
                icon={<FiTag />}
                title="Notifikasi Promo"
                desc="Aktifkan pemberitahuan untuk promo boutique."
                active={promoNotif}
                onClick={() => setPromoNotif(!promoNotif)}
                color="#C7A765"
              />
              <ToggleRow
                icon={<FiUser />}
                title="Notifikasi Membership"
                desc="Pemberitahuan jika ada perubahan level member."
                active={memberNotif}
                onClick={() => setMemberNotif(!memberNotif)}
                color="#2E9B5F"
              />
            </div>

            <div className="mt-5 rounded-[16px] bg-[#FAF9F7] p-4">
              <p className="text-[11px] font-medium text-[#2D2723]">Status Notifikasi</p>
              <p className="mt-1 text-[11px] text-[#7C7772]">
                {[emailNotif, promoNotif, memberNotif].filter(Boolean).length} dari 3 notifikasi aktif
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E7E0D8]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C7A765] to-[#2E9B5F] transition-all duration-500"
                  style={{ width: `${([emailNotif, promoNotif, memberNotif].filter(Boolean).length / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-7 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">System Status</p>
              <h3 className="mt-1 text-[22px] font-bold text-[#2D2723]">Status Data CRM Boutique</h3>
              <p className="mt-1 text-[12px] text-[#7C7772]">Monitor performa dan status sistem secara real-time.</p>
            </div>

            <div className="space-y-4">
              <ProgressRow label="Data Customer" value="800 Data" percent={100} color="#C7A765" />
              <ProgressRow label="Membership" value="Aktif" percent={85} color="#6D5DF6" />
              <ProgressRow label="Promo Campaign" value="5 Campaign" percent={75} color="#2E9B5F" />
              <ProgressRow label="Riwayat Transaksi" value="Tersimpan" percent={90} color="#2563EB" />
              <ProgressRow label="Keamanan Sistem" value="Protected" percent={95} color="#E05252" />
            </div>

            {/* System health badge */}
            <div className="mt-5 flex items-center justify-between rounded-[16px] bg-gradient-to-r from-[#EAF8EF] to-[#D0F5E3] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="h-3 w-3 rounded-full bg-[#2E9B5F] shadow-[0_0_8px_rgba(46,155,95,0.7)]" />
                <p className="text-[13px] font-semibold text-[#2E9B5F]">Semua Sistem Normal</p>
              </div>
              <span className="rounded-full bg-[#2E9B5F] px-3 py-1 text-[10px] font-bold text-white">
                ONLINE
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Sub Components ─── */
function InputBox({ label, value, icon }) {
  return (
    <div className="group rounded-[16px] border border-[#EEE7DF] bg-[#FAF9F7] p-4 transition hover:border-[#C7A765]/40">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#A98467]">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        {icon && <span className="text-[15px]">{icon}</span>}
        <p className="text-[13px] font-medium text-[#2D2723]">{value}</p>
      </div>
    </div>
  );
}

function SettingRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] border border-[#EEE7DF] bg-[#FAF9F7] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <span className="text-[#A98467]">{icon}</span>
        <p className="text-[12px] text-[#4F4740]">{label}</p>
      </div>
      <p className="text-[12px] font-semibold text-[#2D2723]">{value}</p>
    </div>
  );
}

function BoutiqueInfoCard({ icon, title, desc, items, color }) {
  return (
    <div className="group rounded-[24px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(45,39,35,0.12)]">
      <div
        className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-[17px] text-white shadow-md"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <h3 className="text-[18px] font-bold text-[#2D2723]">{title}</h3>
      <p className="mt-2 text-[12px] leading-6 text-[#7C7772]">{desc}</p>

      <div className="mt-5 space-y-2.5">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2.5 rounded-[12px] bg-[#FAF9F7] px-4 py-2.5">
            <FiCheckCircle style={{ color }} className="shrink-0" />
            <span className="text-[12px] text-[#4F4740]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ icon, title, desc, active, onClick, color }) {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] text-white transition-all duration-200"
          style={{ backgroundColor: active ? color : "#D8CFC5" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#2D2723]">{title}</p>
          <p className="mt-0.5 text-[11px] text-[#7C7772]">{desc}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`relative h-[28px] w-[52px] rounded-full transition-all duration-300 shadow-inner ${
          active ? "shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]" : ""
        }`}
        style={{ backgroundColor: active ? color : "#D8CFC5" }}
      >
        <span
          className={`absolute top-[4px] h-[20px] w-[20px] rounded-full bg-white shadow-md transition-all duration-300 ${
            active ? "left-[28px]" : "left-[4px]"
          }`}
        />
      </button>
    </div>
  );
}

function ProgressRow({ label, value, percent, color }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] font-medium text-[#4F4740]">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold text-[#2D2723]">{value}</p>
          <span className="text-[11px] font-bold" style={{ color }}>{percent}%</span>
        </div>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#F1ECE6]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}