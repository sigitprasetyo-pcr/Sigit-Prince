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
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(true);
  const [memberNotif, setMemberNotif] = useState(false);

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">
        <PageHeader
          breadcrumb="PENGATURAN SISTEM"
          title="Pengaturan Boutique"
          description="Mengatur identitas boutique, data CRM, notifikasi, keamanan, dan tampilan sistem admin."
        />

        <div className="mb-6 overflow-hidden rounded-[24px] border border-[#E7E0D8] bg-white shadow-[0_14px_34px_rgba(45,39,35,0.08)]">
          <div className="relative bg-gradient-to-r from-[#3A2619] via-[#7B5B45] to-[#C7A765] p-7 text-white">
            <div className="absolute right-8 top-8 hidden h-[120px] w-[120px] rounded-full bg-white/10 blur-sm md:block" />
            <div className="absolute right-24 bottom-4 hidden h-[70px] w-[70px] rounded-full bg-white/10 md:block" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                  Hejmana Boutique CRM
                </p>

                <h2 className="mt-2 text-[28px] font-medium">
                  Sistem Admin Boutique
                </h2>

                <p className="mt-3 max-w-[650px] text-[13px] leading-7 text-white/75">
                  Halaman ini digunakan untuk mengatur informasi brand,
                  pengelolaan data customer, membership, promo, transaksi, dan
                  keamanan sistem CRM Boutique.
                </p>
              </div>

              <div className="rounded-[20px] border border-white/20 bg-white/15 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[16px] bg-white text-[#3A2619]">
                    <FiSettings />
                  </div>

                  <div>
                    <p className="text-[11px] text-white/70">Status Sistem</p>
                    <p className="text-[16px] font-medium">Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-[#E7E0D8] md:grid-cols-4">
            <HeroStat icon={<FiUser />} label="Admin" value="Boutique Admin" />
            <HeroStat icon={<FiDatabase />} label="Data Customer" value="800 Data" />
            <HeroStat icon={<FiTag />} label="Promo" value="Aktif" />
            <HeroStat icon={<FiShield />} label="Keamanan" value="Protected" />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">
                  Brand Profile
                </p>

                <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
                  Informasi Boutique
                </h3>
              </div>

              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[15px] bg-[#EEE8FF] text-[#5B4CE6]">
                <FiShoppingBag />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputBox label="Nama Boutique" value="Hejmana Boutique" />
              <InputBox label="Jenis Sistem" value="Customer Relationship Management" />
              <InputBox label="Kategori Bisnis" value="Fashion & Boutique" />
              <InputBox label="Lokasi Utama" value="Pekanbaru, Riau" />
              <InputBox label="Email Admin" value="admin@hejmana-boutique.com" />
              <InputBox label="Nomor WhatsApp" value="0812-3456-7890" />
            </div>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-[#3A2619] px-5 py-3 text-[12px] text-white shadow-[0_10px_22px_rgba(45,39,35,0.18)] transition hover:bg-[#4A3020]"
            >
              <FiSave />
              Simpan Pengaturan
            </button>
          </div>

          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">
                Theme Preview
              </p>

              <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
                Tampilan Tema Boutique
              </h3>
            </div>

            <div className="rounded-[22px] border border-[#E7E0D8] bg-[#FAF9F7] p-5">
              <div className="rounded-[18px] bg-white p-5 shadow-[0_8px_20px_rgba(45,39,35,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#E5D7BD] text-[#3A2619]">
                    <FiShoppingBag />
                  </div>

                  <div>
                    <p className="text-[15px] font-medium text-[#2D2723]">
                      Boutique CRM
                    </p>
                    <p className="text-[11px] text-[#7C7772]">
                      Elegant brown, cream, and soft beige
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <ColorBox label="Primary" color="bg-[#3A2619]" />
                  <ColorBox label="Accent" color="bg-[#C7A765]" />
                  <ColorBox label="Soft" color="bg-[#F4EFEA]" />
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <SettingRow icon={<FiGlobe />} label="Bahasa Sistem" value="Indonesia" />
              <SettingRow icon={<FiSliders />} label="Mode Tampilan" value="Light Mode" />
              <SettingRow icon={<FiCheckCircle />} label="Status UI" value="Aktif" />
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <InfoCard
            icon={<FiDatabase />}
            title="Data CRM"
            desc="Mengelola data customer, kontak, membership, transaksi, interaksi, aktivitas user, dan promo."
            items={["800 data customer", "Membership aktif", "Riwayat transaksi", "Marketing engagement"]}
          />

          <InfoCard
            icon={<FiShield />}
            title="Keamanan"
            desc="Mengatur keamanan akses admin dan perlindungan data customer boutique."
            items={["Role admin", "Login protected", "Data customer aman", "Session aktif"]}
          />

          <InfoCard
            icon={<FiBell />}
            title="Notifikasi"
            desc="Mengatur pemberitahuan untuk transaksi, promo, membership, dan interaksi customer."
            items={["Email promo", "Update pesanan", "Member baru", "Komplain customer"]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">
                Notification Control
              </p>

              <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
                Pengaturan Notifikasi
              </h3>
            </div>

            <div className="space-y-4">
              <ToggleRow
                icon={<FiMail />}
                title="Email / SMS Subscription"
                desc="Kirim info promo dan campaign ke customer."
                active={emailNotif}
                onClick={() => setEmailNotif(!emailNotif)}
              />

              <ToggleRow
                icon={<FiTag />}
                title="Notifikasi Promo"
                desc="Aktifkan pemberitahuan untuk promo boutique."
                active={promoNotif}
                onClick={() => setPromoNotif(!promoNotif)}
              />

              <ToggleRow
                icon={<FiUser />}
                title="Notifikasi Membership"
                desc="Pemberitahuan jika ada perubahan level member."
                active={memberNotif}
                onClick={() => setMemberNotif(!memberNotif)}
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">
                System Status
              </p>

              <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
                Status Data CRM Boutique
              </h3>
            </div>

            <div className="space-y-4">
              <ProgressRow label="Data Customer" value="800 Data" percent={100} />
              <ProgressRow label="Membership" value="Aktif" percent={85} />
              <ProgressRow label="Promo Campaign" value="5 Campaign" percent={75} />
              <ProgressRow label="Riwayat Transaksi" value="Tersimpan" percent={90} />
              <ProgressRow label="Keamanan Sistem" value="Protected" percent={95} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon, label, value }) {
  return (
    <div className="border-b border-[#E7E0D8] p-5 md:border-b-0 md:border-r last:md:border-r-0">
      <div className="flex items-center gap-3">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[13px] bg-[#F4EFEA] text-[#A98467]">
          {icon}
        </div>

        <div>
          <p className="text-[11px] text-[#7C7772]">{label}</p>
          <p className="text-[14px] font-medium text-[#2D2723]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function InputBox({ label, value }) {
  return (
    <div className="rounded-[16px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#A98467]">
        {label}
      </p>

      <p className="mt-2 text-[13px] text-[#2D2723]">{value}</p>
    </div>
  );
}

function ColorBox({ label, color }) {
  return (
    <div className="rounded-[14px] border border-[#EEE7DF] bg-[#FAF9F7] p-3 text-center">
      <div className={`mx-auto h-[34px] w-[34px] rounded-full ${color}`} />
      <p className="mt-2 text-[10px] text-[#7C7772]">{label}</p>
    </div>
  );
}

function SettingRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[16px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
      <div className="flex items-center gap-3">
        <span className="text-[#A98467]">{icon}</span>
        <p className="text-[12px] text-[#4F4740]">{label}</p>
      </div>

      <p className="text-[12px] font-medium text-[#2D2723]">{value}</p>
    </div>
  );
}

function InfoCard({ icon, title, desc, items }) {
  return (
    <div className="rounded-[24px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(45,39,35,0.1)]">
      <div className="mb-5 flex h-[46px] w-[46px] items-center justify-center rounded-[15px] bg-[#EEE8FF] text-[#5B4CE6]">
        {icon}
      </div>

      <h3 className="text-[18px] font-medium text-[#2D2723]">{title}</h3>

      <p className="mt-3 text-[12px] leading-6 text-[#7C7772]">{desc}</p>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-[14px] bg-[#FAF9F7] px-4 py-3"
          >
            <FiCheckCircle className="text-[#2E9B5F]" />
            <span className="text-[12px] text-[#4F4740]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ icon, title, desc, active, onClick }) {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-white text-[#A98467]">
          {icon}
        </div>

        <div>
          <p className="text-[13px] font-medium text-[#2D2723]">{title}</p>
          <p className="mt-1 text-[11px] text-[#7C7772]">{desc}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`relative h-[26px] w-[48px] rounded-full transition ${
          active ? "bg-[#5B4CE6]" : "bg-[#D8CFC5]"
        }`}
      >
        <span
          className={`absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white transition ${
            active ? "left-[25px]" : "left-[3px]"
          }`}
        />
      </button>
    </div>
  );
}

function ProgressRow({ label, value, percent }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] text-[#4F4740]">{label}</p>
        <p className="text-[12px] font-medium text-[#2D2723]">{value}</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#F1ECE6]">
        <div
          className="h-full rounded-full bg-[#5B4CE6]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}