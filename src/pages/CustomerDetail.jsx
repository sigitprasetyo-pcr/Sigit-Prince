import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import customers from "../data/Customers";

const tierClass = {
  "Platinum Member": "bg-[#EEE8FF] text-[#6D3FD1]",
  "Gold Member": "bg-[#FFF3DE] text-[#C47A24]",
  "Silver Member": "bg-[#EEF2F6] text-[#667085]",
  "Regular Member": "bg-[#F3F0EC] text-[#7C7772]",
};

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundCustomer = customers.find(
      (item) => String(item.id) === String(id)
    );

    if (!foundCustomer) {
      setError("Customer tidak ditemukan");
      return;
    }

    setCustomer(foundCustomer);
  }, [id]);

  if (error) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-red-200 bg-white p-6 text-red-600">
          {error}
        </div>
      </section>
    );
  }

  if (!customer) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 text-[13px] text-[#7C7772]">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mb-6">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#8B735D]">
          Hejmana / Customers / Detail
        </p>

        <h1 className="text-[24px] font-medium text-[#2D2723]">
          Detail Pelanggan
        </h1>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-[#E7E0D8] bg-white shadow-[0_8px_22px_rgba(45,39,35,0.06)]">
        <div className="flex flex-col gap-5 border-b border-[#E7E0D8] bg-[#FFFDFC] p-7 md:flex-row md:items-center">
          <img
            src={customer.image}
            alt={customer.name}
            className="h-[78px] w-[78px] rounded-full border-4 border-white object-cover shadow-[0_8px_20px_rgba(45,39,35,0.14)]"
          />

          <div>
            <span
              className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.12em] ${
                tierClass[customer.tier] || "bg-[#F3F0EC] text-[#7C7772]"
              }`}
            >
              {customer.tier}
            </span>

            <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
              {customer.name}
            </h2>

            <p className="text-[12px] text-[#856F4E]">
              Customer ID: {customer.idCustomer}
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-7 lg:grid-cols-2">
          <SectionCard title="Data Identitas Customer">
            <InfoItem label="ID Customer" value={customer.idCustomer} />
            <InfoItem label="Nama Lengkap" value={customer.namaLengkap} />
            <InfoItem label="Username / Nickname" value={customer.username} />
            <InfoItem label="Jenis Kelamin" value={customer.jenisKelamin} />
            <InfoItem label="Tanggal Lahir" value={customer.tanggalLahir} />
          </SectionCard>

          <SectionCard title="Kontak">
            <InfoItem label="Nomor HP" value={customer.nomorHp} />
            <InfoItem label="Email" value={customer.email} />
            <InfoItem label="Alamat" value={customer.alamat} />
            <InfoItem label="Kota / Provinsi" value={customer.kotaProvinsi} />
            <InfoItem label="Media Sosial" value={customer.mediaSosial} />
          </SectionCard>

          <SectionCard title="Data Akun / Membership">
            <InfoItem label="Tanggal Daftar" value={customer.tanggalDaftar} />
            <InfoItem label="Status Member" value={customer.statusMember} />
            <InfoItem
              label="Level Membership"
              value={customer.levelMembership}
            />
            <InfoItem label="Referral Code" value={customer.referralCode} />
            <InfoItem label="Status Aktif" value={customer.statusAktif} />
          </SectionCard>

          <SectionCard title="Riwayat Interaksi">
            <InfoItem
              label="Chat / Customer Service"
              value={customer.chatCustomerService}
            />
            <InfoItem
              label="Riwayat Komplain"
              value={customer.riwayatKomplain}
            />
            <InfoItem
              label="Feedback / Review"
              value={customer.feedbackReview}
            />
            <InfoItem label="Catatan Admin" value={customer.catatanAdmin} />
          </SectionCard>

          <SectionCard title="Data Transaksi">
            <InfoItem
              label="Riwayat Pembelian"
              value={customer.riwayatPembelian}
            />
            <InfoItem
              label="Total Transaksi"
              value={`${customer.totalTransaksi} transaksi`}
            />
            <InfoItem
              label="Metode Pembayaran"
              value={customer.metodePembayaran}
            />
            <InfoItem
              label="Produk / Item yang Dibeli"
              value={customer.produkItemDibeli}
            />
            <InfoItem
              label="Tanggal Transaksi Terakhir"
              value={customer.tanggalTransaksiTerakhir}
            />
            <InfoItem label="Total Belanja" value={customer.spend} />
          </SectionCard>

          <SectionCard title="Aktivitas User">
            <InfoItem label="Login Terakhir" value={customer.loginTerakhir} />
            <InfoItem
              label="Device yang Digunakan"
              value={customer.deviceDigunakan}
            />
            <InfoItem
              label="Aktivitas dalam Aplikasi"
              value={customer.aktivitasDalamAplikasi}
            />
          </SectionCard>

          <SectionCard title="Marketing & Engagement">
            <InfoItem label="Sumber User" value={customer.sumberUser} />
            <InfoItem
              label="Campaign yang Diikuti"
              value={customer.campaignDiikuti}
            />
            <InfoItem
              label="Email/SMS Subscription"
              value={customer.emailSmsSubscription}
            />
            <InfoItem label="Status Promo" value={customer.statusPromo} />
          </SectionCard>

          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-[10px] bg-[#3A2619] px-5 py-3 text-[12px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.14)] transition hover:bg-[#4A3020]"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-[14px] border border-[#E7E0D8] bg-[#FAF9F7] p-5">
      <h3 className="mb-4 text-[14px] font-medium text-[#2D2723]">
        {title}
      </h3>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1 text-[12px] text-[#4F4740]">
      <span className="text-[10px] uppercase tracking-[0.14em] text-[#C47A24]">
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}