import {
  MdCheckCircle,
  MdInventory2,
  MdLocalShipping,
} from "react-icons/md";

const metrics = [
  {
    title: "Total Pendapatan",
    value: "Rp 1.428.000.000",
    note: "+12.4% vs Bulan Lalu",
    tone: "text-green-600",
  },
  {
    title: "Total Pesanan",
    value: "842",
    note: "+5.2% vs Bulan Lalu",
    tone: "text-green-600",
  },
  {
    title: "Rata-rata Pesanan (AOV)",
    value: "Rp 1.695.000",
    note: "Stabil",
    tone: "text-neutral-400",
  },
  {
    title: "Tingkat Konversi",
    value: "3.82%",
    note: "-0.4% Perhatian Diperlukan",
    tone: "text-amber-700",
  },
];

const chartData = [
  { day: "SEN", product: 40, service: 10 },
  { day: "SEL", product: 60, service: 15 },
  { day: "RAB", product: 55, service: 20 },
  { day: "KAM", product: 85, service: 5 },
  { day: "JUM", product: 70, service: 12 },
  { day: "SAB", product: 95, service: 3 },
  { day: "MIN", product: 45, service: 10 },
];

const inventory = [
  {
    name: "Ethereal Silk Gown",
    category: "Evening Wear",
    stock: 12,
    status: "Tersedia",
    statusClass: "bg-green-50 text-green-700",
    image: "/images/register-boutique.png",
  },
  {
    name: "Midnight Velvet Clutch",
    category: "Accessories",
    stock: 3,
    status: "Stok Rendah",
    statusClass: "bg-amber-50 text-amber-700",
    image: "/images/login-boutique.png",
  },
  {
    name: "Aurora Signature Scent",
    category: "Fragrance",
    stock: 45,
    status: "Best Seller",
    statusClass: "bg-green-50 text-green-700",
    image: "/images/image.png",
  },
];

function MetricCard({ item }) {
  return (
    <div className="bg-white p-8 luxury-shadow flex flex-col justify-between h-48 border border-neutral-50">
      <span className="label-caps text-[10px] text-neutral-400">
        {item.title}
      </span>

      <div className="mt-4">
        <h4 className="font-display text-headline-md text-primary">
          {item.value}
        </h4>

        <p className={`text-[10px] label-caps mt-2 ${item.tone}`}>
          {item.note}
        </p>
      </div>
    </div>
  );
}

function WeeklyChart() {
  return (
    <div className="bg-white p-8 md:p-10 luxury-shadow border border-neutral-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h4 className="font-display text-headline-sm">
          Tren Penjualan Mingguan
        </h4>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary" />
            <span className="text-[10px] label-caps text-neutral-400">
              Produk Fisik
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary-container" />
            <span className="text-[10px] label-caps text-neutral-400">
              Layanan Private
            </span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between px-2 md:px-4 space-x-3 md:space-x-4">
        {chartData.map((item) => (
          <div
            key={item.day}
            className="w-full h-full bg-surface-container-low relative overflow-hidden"
          >
            <div
              className="absolute bottom-0 left-0 w-full bg-primary transition-all duration-300"
              style={{ height: `${item.product}%` }}
            />

            <div
              className="absolute left-0 w-full bg-secondary-container transition-all duration-300"
              style={{
                bottom: `${item.product}%`,
                height: `${item.service}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between px-2 md:px-4 space-x-3 md:space-x-4">
        {chartData.map((item) => (
          <div key={item.day} className="w-full text-center">
            <span className="text-[9px] label-caps text-neutral-400">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryTable() {
  return (
    <section className="col-span-12 lg:col-span-8 space-y-gutter">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-headline-sm">
          Manajemen Inventaris
        </h3>

        <span className="text-label-caps text-amber-700 border-b border-amber-200 pb-1">
          4 item stok rendah
        </span>
      </div>

      <div className="bg-white luxury-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400">
                  Produk
                </th>
                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400">
                  Kategori
                </th>
                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400 text-right">
                  Stok
                </th>
                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400 text-right">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-50">
              {inventory.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-background/50 transition"
                >
                  <td className="py-6 px-8 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-surface-container overflow-hidden">
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover"
                        src={item.image}
                      />
                    </div>

                    <span className="font-medium italic">{item.name}</span>
                  </td>

                  <td className="py-6 px-8 text-sm text-neutral-500 uppercase tracking-tighter">
                    {item.category}
                  </td>

                  <td className="py-6 px-8 text-right font-medium">
                    {item.stock}
                  </td>

                  <td className="py-6 px-8 text-right">
                    <span
                      className={`text-[10px] label-caps px-2 py-1 ${item.statusClass}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-neutral-50 text-center">
          <button className="label-caps text-[10px] text-neutral-400 hover:text-primary transition">
            Lihat Semua Inventaris
          </button>
        </div>
      </div>
    </section>
  );
}

function CustomerInsight() {
  return (
    <section className="col-span-12 lg:col-span-4 space-y-gutter">
      <h3 className="font-display text-headline-sm">Data Pelanggan</h3>

      <div className="bg-white p-8 md:p-10 luxury-shadow border border-neutral-50 h-full flex flex-col">
        <div className="space-y-8 flex-1">
          <div>
            <span className="label-caps text-[10px] text-neutral-400 mb-4 block">
              Distribusi Pelanggan
            </span>

            <div className="relative h-48 w-48 mx-auto">
              <div className="absolute inset-0 rounded-full border-[12px] border-surface-container-low" />
              <div className="absolute inset-0 rounded-full border-[12px] border-primary border-r-transparent border-b-transparent rotate-45" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-display">72%</span>
                <span className="text-[8px] label-caps">Returning</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              ["AD", "Anindya Dewanto", "Loyalty Member: Gold", "Rp 4.2M"],
              ["RP", "Raka Putra", "Pesanan Terakhir: 2 jam lalu", "Rp 1.8M"],
            ].map(([initial, name, desc, spend]) => (
              <div
                key={name}
                className="flex justify-between items-center py-3 border-b border-neutral-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-surface-container rounded-full flex items-center justify-center text-[10px]">
                    {initial}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-[10px] text-neutral-400">{desc}</p>
                  </div>
                </div>

                <span className="text-[10px] label-caps">{spend}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-8 w-full border border-neutral-100 py-3 label-caps text-[10px] hover:bg-background transition-colors">
          Manajemen CRM
        </button>
      </div>
    </section>
  );
}

function LogisticsPanel() {
  return (
    <section className="col-span-12 lg:col-span-7 space-y-gutter">
      <h3 className="font-display text-headline-sm">
        Operasional & Logistik
      </h3>

      <div className="bg-white luxury-shadow border border-neutral-50 p-8">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <p className="text-2xl font-display">14</p>
            <p className="text-[10px] label-caps text-neutral-400 mt-1">
              Siap Kirim
            </p>
          </div>

          <div className="text-center border-x border-neutral-100">
            <p className="text-2xl font-display">32</p>
            <p className="text-[10px] label-caps text-neutral-400 mt-1">
              Dalam Transit
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-display">2</p>
            <p className="text-[10px] label-caps text-amber-700 mt-1">
              Retur Pending
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-container-low">
            <div className="flex items-center space-x-4">
              <MdLocalShipping className="text-neutral-400 text-xl" />

              <div>
                <p className="text-sm font-medium">Order #VN-8829</p>
                <p className="text-[10px] text-neutral-400 uppercase">
                  Menunggu Kurir - Boutique Jakarta
                </p>
              </div>
            </div>

            <button className="bg-primary text-white text-[9px] label-caps px-4 py-2">
              Update
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-low opacity-60">
            <div className="flex items-center space-x-4">
              <MdInventory2 className="text-neutral-400 text-xl" />

              <div>
                <p className="text-sm font-medium">Order #VN-8828</p>
                <p className="text-[10px] text-neutral-400 uppercase">
                  Terkirim ke Bandung - 14:20
                </p>
              </div>
            </div>

            <MdCheckCircle className="text-green-600 text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketingPanel() {
  return (
    <section className="col-span-12 lg:col-span-5 space-y-gutter">
      <h3 className="font-display text-headline-sm">
        Pemasaran & Promosi
      </h3>

      <div className="bg-primary text-on-primary p-8 luxury-shadow flex flex-col justify-between h-[340px]">
        <div>
          <span className="text-[10px] label-caps opacity-60">
            Campaign Aktif
          </span>

          <h4 className="font-display text-headline-md mt-4 italic">
            Spring Renaissance 2024
          </h4>

          <p className="text-sm opacity-80 mt-4 font-light leading-relaxed">
            Peningkatan engagement sebesar 22% pada kategori Evening Wear
            melalui promo code "RENAISSANCE".
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[10px] label-caps">Pencapaian Target</span>
            <span className="text-xl font-display">88%</span>
          </div>

          <div className="w-full bg-neutral-800 h-1">
            <div className="bg-white h-full w-[88%]" />
          </div>

          <div className="flex space-x-2 pt-2">
            <span className="bg-neutral-800 px-3 py-1 text-[8px] label-caps tracking-tighter">
              Insta-Ads: 12.4k Clicks
            </span>

            <span className="bg-neutral-800 px-3 py-1 text-[8px] label-caps tracking-tighter">
              Email Open: 42%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 md:p-12 space-y-section-gap">
      <section className="space-y-gutter">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5">
          <div>
            <span className="label-caps text-secondary tracking-[0.2em] block mb-2 underline decoration-secondary-container underline-offset-4">
              Performance Insights
            </span>

            <h1 className="font-display text-display-lg">
              Ikhtisar Penjualan
            </h1>
          </div>

          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-neutral-200 label-caps text-[10px] hover:border-primary transition">
              Bulan Ini
            </button>

            <button className="px-4 py-2 border border-neutral-200 label-caps text-[10px] hover:border-primary transition">
              Laporan Cetak
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {metrics.map((item) => (
            <MetricCard key={item.title} item={item} />
          ))}
        </div>

        <WeeklyChart />
      </section>

      <div className="grid grid-cols-12 gap-gutter">
        <InventoryTable />
        <CustomerInsight />
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        <LogisticsPanel />
        <MarketingPanel />
      </div>
    </div>
  );
}