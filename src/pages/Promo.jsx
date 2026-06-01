import {
  FiGift,
  FiInstagram,
  FiMail,
  FiMessageCircle,
  FiShare2,
  FiTag,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

const campaignColors = [
  "from-[#5B4CE6] to-[#9B8CFF]",
  "from-[#C47A24] to-[#F2C078]",
  "from-[#2E9B5F] to-[#8BD8A8]",
  "from-[#B15A7C] to-[#E8A8C2]",
  "from-[#3A2619] to-[#A98467]",
];

export default function Promo() {
  const campaignList = [
    ...new Set(customers.map((item) => item.campaignDiikuti)),
  ];

  const sourceList = [...new Set(customers.map((item) => item.sumberUser))];

  const claimedPromo = customers.filter(
    (item) => item.statusPromo === "Sudah Klaim"
  ).length;

  const subscription = customers.filter(
    (item) => item.emailSmsSubscription === "Ya"
  ).length;

  const giveaway = customers.filter(
    (item) => item.giveawayParticipation === "Ikut"
  ).length;

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">
        <PageHeader
          breadcrumb="MARKETING & ENGAGEMENT"
          title="Promo Boutique"
          description="Mengelola sumber user, campaign, giveaway participation, email/SMS subscription, dan status promo."
        />

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <SummaryCard
            icon={<FiTag />}
            title="Promo Diklaim"
            value={claimedPromo}
            desc="Customer yang sudah menggunakan promo boutique."
          />

          <SummaryCard
            icon={<FiMail />}
            title="Subscription"
            value={subscription}
            desc="Customer yang menerima email atau SMS promo."
          />

          <SummaryCard
            icon={<FiGift />}
            title="Giveaway"
            value={giveaway}
            desc="Customer yang mengikuti giveaway boutique."
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {campaignList.map((campaign, index) => {
            const total = customers.filter(
              (item) => item.campaignDiikuti === campaign
            ).length;

            return (
              <div
                key={campaign}
                className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(45,39,35,0.1)]"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${
                    campaignColors[index % campaignColors.length]
                  }`}
                />

                <div className="p-6 text-center">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#A98467]">
                    Campaign
                  </p>

                  <h3 className="mt-2 flex min-h-[44px] items-center justify-center text-[18px] font-medium text-[#2D2723]">
                    {campaign}
                  </h3>

                  <p className="mt-4 text-[34px] font-semibold text-[#2D2723]">
                    {total}
                  </p>

                  <p className="mt-2 text-[11px] text-[#7C7772]">
                    Customer mengikuti campaign ini.
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
              Customer Source
            </p>

            <h3 className="mt-2 text-center text-[22px] font-medium text-[#2D2723]">
              Sumber Customer
            </h3>

            <p className="mt-2 text-center text-[12px] text-[#7C7772]">
              Menampilkan asal customer mengetahui boutique.
            </p>

            <div className="mt-6 space-y-5">
              {sourceList.map((source) => {
                const total = customers.filter(
                  (item) => item.sumberUser === source
                ).length;

                const percent = Math.round((total / customers.length) * 100);

                return (
                  <div key={source}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SourceIcon source={source} />

                        <span className="text-[12px] text-[#4F4740]">
                          {source}
                        </span>
                      </div>

                      <span className="text-[12px] font-medium text-[#2D2723]">
                        {total}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#F1ECE6]">
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

          <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
              Promo Strategy
            </p>

            <h3 className="mt-2 text-center text-[22px] font-medium text-[#2D2723]">
              Strategi Promo Boutique
            </h3>

            <p className="mx-auto mt-3 max-w-[720px] text-center text-[13px] leading-7 text-[#6F6258]">
              Data promo digunakan untuk melihat campaign yang paling banyak
              diikuti customer. Boutique dapat menggunakan data ini untuk
              menentukan promo yang cocok, seperti New Arrival, Member Day,
              Promo Lebaran, atau Flash Sale Boutique.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniPromo label="New Arrival" value="Promosi produk terbaru." />
              <MiniPromo label="Member Day" value="Promo khusus member loyal." />
              <MiniPromo label="Flash Sale" value="Promo cepat untuk stok tertentu." />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="border-b border-[#E7E0D8] bg-[#FFFDFC] p-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A98467]">
              Marketing Data
            </p>

            <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
              Data Marketing dan Engagement
            </h3>

            <p className="mt-2 text-[12px] text-[#7C7772]">
              Data ini berasal dari kolom sumber user, campaign, giveaway,
              subscription, dan status promo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] table-fixed text-center text-[12px]">
              <thead className="bg-[#F4EFEA] text-[#5E5148]">
                <tr>
                  <th className="w-[120px] px-4 py-4 text-center">ID</th>
                  <th className="w-[180px] px-4 py-4 text-center">Nama</th>
                  <th className="w-[150px] px-4 py-4 text-center">
                    Sumber User
                  </th>
                  <th className="w-[190px] px-4 py-4 text-center">
                    Campaign
                  </th>
                  <th className="w-[140px] px-4 py-4 text-center">
                    Giveaway
                  </th>
                  <th className="w-[140px] px-4 py-4 text-center">
                    Email/SMS
                  </th>
                  <th className="w-[160px] px-4 py-4 text-center">
                    Status Promo
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.slice(0, 30).map((customer) => (
                  <tr
                    key={customer.idCustomer}
                    className="border-t border-[#EEE7DF] transition hover:bg-[#FBFAF8]"
                  >
                    <td className="px-4 py-4 text-center font-medium text-[#2D2723]">
                      {customer.idCustomer}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {customer.namaLengkap}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {customer.sumberUser}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {customer.campaignDiikuti}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {customer.giveawayParticipation}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {customer.emailSmsSubscription}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex justify-center rounded-full px-3 py-1 text-[10px] ${
                          customer.statusPromo === "Sudah Klaim"
                            ? "bg-[#EAF8EF] text-[#2E9B5F]"
                            : customer.statusPromo === "Belum Klaim"
                            ? "bg-[#FFF3DE] text-[#C47A24]"
                            : "bg-[#F3F0EC] text-[#7C7772]"
                        }`}
                      >
                        {customer.statusPromo}
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

function SummaryCard({ icon, title, value, desc }) {
  return (
    <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 text-center shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
      <div className="mx-auto flex h-[44px] w-[44px] items-center justify-center rounded-[15px] bg-[#EEE8FF] text-[#5B4CE6]">
        {icon}
      </div>

      <p className="mt-5 text-[12px] text-[#7C7772]">{title}</p>

      <h2 className="mt-2 text-[34px] font-semibold text-[#2D2723]">
        {value}
      </h2>

      <p className="mt-2 text-[11px] leading-5 text-[#9A8C80]">{desc}</p>
    </div>
  );
}

function MiniPromo({ label, value }) {
  return (
    <div className="rounded-[16px] border border-[#EEE7DF] bg-[#FAF9F7] p-4 text-center">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#A98467]">
        {label}
      </p>

      <p className="mt-1 text-[12px] leading-6 text-[#4F4740]">{value}</p>
    </div>
  );
}

function SourceIcon({ source }) {
  if (source === "Instagram") {
    return <FiInstagram className="text-[#C13584]" />;
  }

  if (source === "WhatsApp") {
    return <FiMessageCircle className="text-[#2E9B5F]" />;
  }

  if (source === "Referral") {
    return <FiShare2 className="text-[#5B4CE6]" />;
  }

  return <FiTag className="text-[#C47A24]" />;
}