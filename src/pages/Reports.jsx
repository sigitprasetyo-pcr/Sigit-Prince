import {
  FiBarChart2,
  FiMessageCircle,
  FiPieChart,
  FiShoppingBag,
  FiTag,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

export default function Reports() {
  const totalTransaksi = customers.reduce(
    (total, item) => total + item.totalTransaksi,
    0
  );

  const totalKomplain = customers.filter(
    (item) => item.riwayatKomplain !== "Tidak ada komplain"
  ).length;

  const totalPromo = customers.filter(
    (item) => item.statusPromo === "Sudah Klaim"
  ).length;

  const totalMember = customers.filter(
    (item) => item.statusMember === "Member"
  ).length;

  const chartData = [28, 40, 34, 58, 52, 75, 66, 88, 62, 78, 85, 100];

  const campaignData = [
    ...new Set(customers.map((item) => item.campaignDiikuti)),
  ].map((campaign) => ({
    label: campaign,
    total: customers.filter((item) => item.campaignDiikuti === campaign).length,
  }));

  const deviceData = ["Android", "iPhone", "Laptop"].map((device) => ({
    label: device,
    total: customers.filter((item) => item.deviceDigunakan === device).length,
  }));

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="LAPORAN CRM"
        title="Laporan CRM Boutique"
        description="Ringkasan performa customer, membership, transaksi, interaksi, aktivitas user, dan marketing engagement."
      />

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <button className="rounded-[10px] border border-[#E7E0D8] bg-white px-4 py-3 text-[11px] text-[#4F4740]">
          Mingguan
        </button>

        <button className="rounded-[10px] bg-[#5B4CE6] px-4 py-3 text-[11px] text-white shadow-[0_8px_18px_rgba(91,76,230,0.24)]">
          Export
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiUsers />}
          title="Customer"
          value={customers.length}
          badge="+12%"
        />
        <StatCard
          icon={<FiShoppingBag />}
          title="Transaksi"
          value={totalTransaksi}
          badge="+18%"
        />
        <StatCard
          icon={<FiMessageCircle />}
          title="Komplain"
          value={totalKomplain}
          badge="-5%"
        />
        <StatCard
          icon={<FiTag />}
          title="Promo Klaim"
          value={totalPromo}
          badge="+9%"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
        <div className="rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-[18px] font-medium text-[#2D2723]">
                Tren Transaksi & Promo
              </h3>
              <p className="mt-1 text-[12px] text-[#7C7772]">
                Area service dibandingkan dengan engagement promo.
              </p>
            </div>

            <button className="rounded-[10px] border border-[#E7E0D8] px-4 py-2 text-[11px] text-[#4F4740]">
              Filter
            </button>
          </div>

          <div className="relative h-[270px] overflow-hidden rounded-[18px] border border-[#EEE7DF] bg-[#FAF9F7] p-5">
            <div className="absolute inset-x-5 top-8 space-y-9">
              {[1, 2, 3, 4, 5].map((line) => (
                <div key={line} className="border-t border-dashed border-[#D8CFC5]" />
              ))}
            </div>

            <div className="relative flex h-[210px] items-end gap-3">
              {chartData.map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full items-end justify-center">
                    <div
                      className="w-full rounded-t-[10px] bg-gradient-to-t from-[#DAD6FF] to-[#5B4CE6]"
                      style={{ height: `${height * 1.6}px` }}
                    />
                    <div
                      className="absolute bottom-0 h-[4px] w-full rounded-full bg-[#C47A24]"
                      style={{ transform: `translateY(-${height * 1.6}px)` }}
                    />
                  </div>

                  <span className="text-[10px] text-[#9A8C80]">
                    P{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#EEE8FF] px-3 py-1 text-[10px] text-[#5B4CE6]">
              Transaksi
            </span>
            <span className="rounded-full bg-[#FFF3DE] px-3 py-1 text-[10px] text-[#C47A24]">
              Promo
            </span>
            <span className="rounded-full bg-[#FAF9F7] px-3 py-1 text-[10px] text-[#7C7772]">
              Data customer CRM
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[18px] font-medium text-[#2D2723]">
                Komposisi CRM
              </h3>
              <FiPieChart className="text-[#5B4CE6]" />
            </div>

            <div className="flex items-center gap-5">
              <div
                className="flex h-[116px] w-[116px] items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#5B4CE6 0 48%, #2E9B5F 48% 75%, #C47A24 75% 90%, #E96464 90% 100%)",
                }}
              >
                <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white text-[20px] font-semibold text-[#2D2723]">
                  {customers.length}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <Legend color="bg-[#5B4CE6]" label="Member" value={totalMember} />
                <Legend color="bg-[#2E9B5F]" label="Promo" value={totalPromo} />
                <Legend color="bg-[#C47A24]" label="Komplain" value={totalKomplain} />
                <Legend color="bg-[#E96464]" label="Non Member" value={customers.length - totalMember} />
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <h3 className="text-[18px] font-medium text-[#2D2723]">
              Device Customer
            </h3>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {deviceData.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[14px] bg-[#EEE8FF] px-3 py-4 text-center"
                >
                  <p className="text-[18px] font-semibold text-[#5B4CE6]">
                    {item.total}
                  </p>
                  <p className="mt-1 text-[10px] text-[#7C7772]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[14px] bg-[#EEE8FF] text-[#5B4CE6]">
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

        <div className="grid gap-4 md:grid-cols-5">
          {campaignData.map((item) => {
            const percent = Math.round((item.total / customers.length) * 100);

            return (
              <div key={item.label} className="rounded-[14px] bg-[#FAF9F7] p-4">
                <p className="text-[12px] font-medium text-[#2D2723]">
                  {item.label}
                </p>

                <p className="mt-2 text-[24px] font-semibold text-[#3A2619]">
                  {item.total}
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E0D8]">
                  <div
                    className="h-full rounded-full bg-[#5B4CE6]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value, badge }) {
  return (
    <div className="rounded-[20px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
      <div className="flex items-start justify-between">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[#EEE8FF] text-[#5B4CE6]">
          {icon}
        </div>

        <span className="rounded-full bg-[#EAF8EF] px-3 py-1 text-[10px] text-[#2E9B5F]">
          {badge}
        </span>
      </div>

      <p className="mt-5 text-[12px] text-[#7C7772]">{title}</p>

      <h2 className="mt-2 text-[30px] font-semibold text-[#2D2723]">
        {value}
      </h2>
    </div>
  );
}

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[12px]">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-[#4F4740]">{label}</span>
      </div>

      <span className="font-medium text-[#2D2723]">{value}</span>
    </div>
  );
}