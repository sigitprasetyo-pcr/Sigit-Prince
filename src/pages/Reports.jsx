import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBarChart2,
  FiPrinter,
  FiShoppingBag,
  FiTag,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

export default function Reports() {
  const navigate = useNavigate();
  const transactionTableRef = useRef(null);

  const totalTransaksi = customers.reduce(
    (total, item) => total + item.totalTransaksi,
    0
  );

  const totalPromo = customers.filter(
    (item) => item.statusPromo === "Sudah Klaim"
  ).length;

  const totalCustomerAktif = customers.filter(
    (item) => item.statusAktif === "Aktif"
  ).length;

  const totalKomplain = customers.filter(
    (item) => item.riwayatKomplain !== "Tidak ada komplain"
  ).length;

  const campaignData = [
    ...new Set(customers.map((item) => item.campaignDiikuti)),
  ].map((campaign) => ({
    label: campaign,
    total: customers.filter((item) => item.campaignDiikuti === campaign).length,
  }));

  const transactionData = customers.slice(0, 30);

  const handlePrintTransaction = () => {
    window.print();
  };

  const handleScrollToTransaction = () => {
    transactionTableRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="LAPORAN CRM"
        title="Laporan CRM Boutique"
        description="Ringkasan performa customer, transaksi, promo, dan data transaksi pelanggan boutique."
      />

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <button
          type="button"
          onClick={handleScrollToTransaction}
          className="rounded-[10px] border border-[#E7E0D8] bg-white px-4 py-3 text-[11px] text-[#4F4740] transition hover:bg-[#FAF9F7]"
        >
          Lihat Transaksi
        </button>

        <button
          type="button"
          onClick={handlePrintTransaction}
          className="flex items-center gap-2 rounded-[10px] bg-[#3A2619] px-4 py-3 text-[11px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.18)] transition hover:bg-[#4A3020]"
        >
          <FiPrinter />
          Cetak Transaksi
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiUsers />}
          title="Customer Aktif"
          value={totalCustomerAktif}
          badge="+12%"
        />

        <StatCard
          icon={<FiShoppingBag />}
          title="Total Transaksi"
          value={totalTransaksi}
          badge="+18%"
          onClick={handleScrollToTransaction}
          info="Klik untuk melihat tabel transaksi"
        />

        <StatCard
          icon={<FiTag />}
          title="Promo Klaim"
          value={totalPromo}
          badge="+9%"
          onClick={() => navigate("/promo")}
          info="Klik untuk masuk ke halaman Promo"
        />

        <StatCard
          icon={<FiTrendingUp />}
          title="Komplain"
          value={totalKomplain}
          badge="-5%"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-[18px] font-medium text-[#2D2723]">
                Ringkasan Performa Transaksi
              </h3>
              <p className="mt-1 text-[12px] text-[#7C7772]">
                Gambaran transaksi dan performa customer CRM Boutique.
              </p>
            </div>

            <div className="rounded-full bg-[#FFF3DE] px-3 py-1 text-[10px] text-[#C47A24]">
              Boutique Report
            </div>
          </div>

          <div className="relative h-[270px] overflow-hidden rounded-[18px] border border-[#EEE7DF] bg-[#FAF9F7] p-5">
            <div className="absolute inset-x-5 top-8 space-y-9">
              {[1, 2, 3, 4, 5].map((line) => (
                <div
                  key={line}
                  className="border-t border-dashed border-[#D8CFC5]"
                />
              ))}
            </div>

            <div className="relative flex h-[210px] items-end gap-3">
              {[28, 40, 34, 58, 52, 75, 66, 88, 62, 78, 85, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="relative flex w-full items-end justify-center">
                      <div
                        className="w-full rounded-t-[10px] bg-gradient-to-t from-[#E8D8C8] to-[#A98467]"
                        style={{ height: `${height * 1.6}px` }}
                      />

                      <div
                        className="absolute bottom-0 h-[4px] w-full rounded-full bg-[#3A2619]"
                        style={{
                          transform: `translateY(-${height * 1.6}px)`,
                        }}
                      />
                    </div>

                    <span className="text-[10px] text-[#9A8C80]">
                      P{index + 1}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#FFF3DE] px-3 py-1 text-[10px] text-[#C47A24]">
              Transaksi
            </span>
            <span className="rounded-full bg-[#F3F0EC] px-3 py-1 text-[10px] text-[#7C7772]">
              Customer CRM
            </span>
            <span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-[10px] text-[#2E9B5F]">
              Promo
            </span>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-[#FFF3DE] text-[#C47A24]">
              <FiBarChart2 />
            </div>

            <div>
              <h3 className="text-[18px] font-medium text-[#2D2723]">
                Campaign Performance
              </h3>
              <p className="text-[12px] text-[#7C7772]">
                Ringkasan campaign yang diikuti customer boutique.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {campaignData.map((item) => {
              const percent = Math.round((item.total / customers.length) * 100);

              return (
                <div
                  key={item.label}
                  className="rounded-[14px] bg-[#FAF9F7] p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[12px] font-medium text-[#2D2723]">
                      {item.label}
                    </p>

                    <p className="text-[12px] font-semibold text-[#3A2619]">
                      {item.total}
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#E7E0D8]">
                    <div
                      className="h-full rounded-full bg-[#C47A24]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={transactionTableRef}
        className="mt-6 rounded-[20px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)]"
      >
        <div className="flex flex-col gap-3 border-b border-[#E7E0D8] bg-[#FFFDFC] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
              Transaction Report
            </p>

            <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
              Tabel Transaksi Customer
            </h3>

            <p className="mt-2 text-[12px] text-[#7C7772]">
              Data transaksi ini dapat digunakan sebagai laporan atau dicetak.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrintTransaction}
            className="flex items-center justify-center gap-2 rounded-[10px] bg-[#3A2619] px-4 py-3 text-[11px] text-white transition hover:bg-[#4A3020]"
          >
            <FiPrinter />
            Cetak
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] table-fixed text-left text-[12px]">
            <thead className="bg-[#F4EFEA] text-[#5E5148]">
              <tr>
                <th className="w-[120px] px-4 py-4">ID</th>
                <th className="w-[190px] px-4 py-4">Nama Customer</th>
                <th className="w-[230px] px-4 py-4">Produk Dibeli</th>
                <th className="w-[140px] px-4 py-4">Total Transaksi</th>
                <th className="w-[170px] px-4 py-4">Metode Bayar</th>
                <th className="w-[180px] px-4 py-4">Tanggal Terakhir</th>
                <th className="w-[150px] px-4 py-4">Total Belanja</th>
              </tr>
            </thead>

            <tbody>
              {transactionData.map((customer) => (
                <tr
                  key={customer.idCustomer}
                  className="border-t border-[#EEE7DF] transition hover:bg-[#FBFAF8]"
                >
                  <td className="px-4 py-4 font-medium text-[#2D2723]">
                    {customer.idCustomer}
                  </td>

                  <td className="px-4 py-4 text-[#4F4740]">
                    {customer.namaLengkap}
                  </td>

                  <td className="px-4 py-4 text-[#4F4740]">
                    {customer.produkItemDibeli}
                  </td>

                  <td className="px-4 py-4 text-[#4F4740]">
                    {customer.totalTransaksi} transaksi
                  </td>

                  <td className="px-4 py-4 text-[#4F4740]">
                    {customer.metodePembayaran}
                  </td>

                  <td className="px-4 py-4 text-[#4F4740]">
                    {customer.tanggalTransaksiTerakhir}
                  </td>

                  <td className="px-4 py-4 font-medium text-[#3A2619]">
                    {customer.spend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value, badge, onClick, info }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`rounded-[20px] border border-[#E7E0D8] bg-white p-6 text-left shadow-[0_12px_30px_rgba(45,39,35,0.07)] transition ${
        onClick
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(45,39,35,0.12)]"
          : "cursor-default"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#FFF3DE] text-[#C47A24]">
          {icon}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[10px] ${
            badge?.includes("-")
              ? "bg-[#FFF1F1] text-[#C84C4C]"
              : "bg-[#EAF8EF] text-[#2E9B5F]"
          }`}
        >
          {badge}
        </span>
      </div>

      <p className="mt-5 text-[12px] text-[#7C7772]">{title}</p>

      <h2 className="mt-2 text-[30px] font-semibold text-[#2D2723]">
        {value}
      </h2>

      {info && <p className="mt-3 text-[10px] text-[#C47A24]">{info} →</p>}
    </button>
  );
}