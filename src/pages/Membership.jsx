import {
  FiAward,
  FiCheckCircle,
  FiGift,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

const tierStyle = {
  "Regular Member": {
    icon: <FiUsers />,
    color: "bg-[#F3F0EC] text-[#7C7772]",
    bar: "bg-[#B8A99D]",
    desc: "Customer baru atau non member yang belum masuk program loyalitas utama.",
  },
  "Silver Member": {
    icon: <FiStar />,
    color: "bg-[#EEF2F6] text-[#667085]",
    bar: "bg-[#94A3B8]",
    desc: "Customer yang mulai aktif berbelanja dan cocok menerima promo ringan.",
  },
  "Gold Member": {
    icon: <FiAward />,
    color: "bg-[#FFF3DE] text-[#C47A24]",
    bar: "bg-[#D99A42]",
    desc: "Customer loyal dengan transaksi cukup sering dan cocok diberi diskon khusus.",
  },
  "Platinum Member": {
    icon: <FiGift />,
    color: "bg-[#EEE8FF] text-[#6D3FD1]",
    bar: "bg-[#6D5DF6]",
    desc: "Customer prioritas dengan nilai transaksi tinggi dan pelayanan khusus.",
  },
};

export default function Membership() {
  const levels = [
    "Regular Member",
    "Silver Member",
    "Gold Member",
    "Platinum Member",
  ];

  const totalMember = customers.filter(
    (item) => item.statusMember === "Member"
  ).length;

  const activeMember = customers.filter(
    (item) => item.statusMember === "Member" && item.statusAktif === "Aktif"
  ).length;

  const referralUsed = customers.filter(
    (item) => item.referralCode !== "-"
  ).length;

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">
        <PageHeader
          breadcrumb="DATA AKUN / MEMBERSHIP"
          title="Membership Boutique"
          description="Mengelola status member, level membership, referral code, dan loyalitas customer boutique."
        />

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <SummaryCard
            icon={<FiUsers />}
            label="Total Member"
            value={totalMember}
            desc="Customer yang sudah terdaftar sebagai member boutique."
          />

          <SummaryCard
            icon={<FiCheckCircle />}
            label="Member Aktif"
            value={activeMember}
            desc="Member yang masih aktif menggunakan layanan boutique."
          />

          <SummaryCard
            icon={<FiTrendingUp />}
            label="Referral Aktif"
            value={referralUsed}
            desc="Customer yang memiliki kode referral untuk promosi."
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {levels.map((level) => {
            const total = customers.filter((item) => item.tier === level).length;
            const percent = Math.round((total / customers.length) * 100);
            const style = tierStyle[level];

            return (
              <div
                key={level}
                className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(45,39,35,0.1)]"
              >
                <div className="border-b border-[#EEE7DF] bg-[#FFFDFC] p-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-[46px] w-[46px] items-center justify-center rounded-[15px] text-[19px] ${style.color}`}
                    >
                      {style.icon}
                    </div>

                    <span className="rounded-full bg-[#FAF9F7] px-3 py-1 text-[10px] text-[#8B735D]">
                      {percent}%
                    </span>
                  </div>

                  <h2 className="mt-5 text-[20px] font-medium text-[#2D2723]">
                    {level}
                  </h2>

                  <p className="mt-2 text-[38px] font-semibold text-[#2D2723]">
                    {total}
                  </p>
                </div>

                <div className="p-6">
                  <div className="h-2 overflow-hidden rounded-full bg-[#F1ECE6]">
                    <div
                      className={`h-full rounded-full ${style.bar}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <p className="mt-4 text-[12px] leading-6 text-[#7C7772]">
                    {style.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
                Loyalty Strategy
              </p>

              <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
                Strategi Membership Boutique
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-[#6F6258]">
                Data membership digunakan untuk melihat loyalitas customer
                boutique. Customer dengan level Gold dan Platinum bisa diberikan
                promo khusus, akses produk baru lebih awal, atau rekomendasi
                produk sesuai riwayat pembelian.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
              <MiniInfo
                label="Regular"
                value="Customer baru atau belum aktif bertransaksi."
              />

              <MiniInfo
                label="Silver"
                value="Customer mulai aktif dan cocok diberi promo ringan."
              />

              <MiniInfo
                label="Gold"
                value="Customer loyal yang sering melakukan transaksi."
              />

              <MiniInfo
                label="Platinum"
                value="Customer prioritas dengan pelayanan khusus."
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="border-b border-[#E7E0D8] bg-[#FFFDFC] p-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
              Membership Data
            </p>

            <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
              Data Akun dan Membership
            </h3>

            <p className="mt-2 text-[12px] text-[#7C7772]">
              Data diambil dari kolom tanggal daftar, status member, level
              membership, referral code, dan status aktif.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] table-fixed text-center text-[12px]">
              <thead className="bg-[#F4EFEA] text-[#5E5148]">
                <tr>
                  <th className="w-[130px] px-4 py-4 text-center">
                    ID Customer
                  </th>
                  <th className="w-[180px] px-4 py-4 text-center">Nama</th>
                  <th className="w-[150px] px-4 py-4 text-center">
                    Tanggal Daftar
                  </th>
                  <th className="w-[150px] px-4 py-4 text-center">
                    Status Member
                  </th>
                  <th className="w-[130px] px-4 py-4 text-center">Level</th>
                  <th className="w-[140px] px-4 py-4 text-center">
                    Referral
                  </th>
                  <th className="w-[140px] px-4 py-4 text-center">
                    Status Aktif
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.slice(0, 30).map((item) => (
                  <tr
                    key={item.idCustomer}
                    className="border-t border-[#EEE7DF] transition hover:bg-[#FBFAF8]"
                  >
                    <td className="px-4 py-4 text-center font-medium text-[#2D2723]">
                      {item.idCustomer}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {item.namaLengkap}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {item.tanggalDaftar}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {item.statusMember}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {item.levelMembership}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {item.referralCode}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex justify-center rounded-full px-3 py-1 text-[10px] ${
                          item.statusAktif === "Aktif"
                            ? "bg-[#EAF8EF] text-[#2E9B5F]"
                            : "bg-[#FFE0E0] text-[#C0392B]"
                        }`}
                      >
                        {item.statusAktif}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ icon, label, value, desc }) {
  return (
    <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
      <div className="flex items-start justify-between">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[15px] bg-[#EEE8FF] text-[#5B4CE6]">
          {icon}
        </div>

        <span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-[10px] text-[#2E9B5F]">
          CRM
        </span>
      </div>

      <p className="mt-5 text-[12px] text-[#7C7772]">{label}</p>

      <h2 className="mt-2 text-[34px] font-semibold text-[#2D2723]">
        {value}
      </h2>

      <p className="mt-2 text-[11px] leading-5 text-[#9A8C80]">{desc}</p>
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="rounded-[16px] border border-[#EEE7DF] bg-[#FAF9F7] p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#A98467]">
        {label}
      </p>

      <p className="mt-1 text-[12px] leading-6 text-[#4F4740]">{value}</p>
    </div>
  );
}