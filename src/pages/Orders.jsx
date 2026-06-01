import PageHeader from "../components/PageHeader";
import customers from "../data/Customers";

export default function Orders() {
  const totalTransaksi = customers.reduce(
    (total, item) => total + item.totalTransaksi,
    0
  );

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="DATA TRANSAKSI"
        title="Pesanan Boutique"
        description="Mengelola riwayat pembelian, total transaksi, metode pembayaran, produk yang dibeli, dan tanggal transaksi terakhir."
      />

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard title="Total Customer" value={customers.length} />
        <StatCard title="Total Transaksi" value={totalTransaksi} />
        <StatCard
          title="Metode Bayar"
          value={[...new Set(customers.map((item) => item.metodePembayaran))].length}
        />
      </div>

      <div className="overflow-hidden rounded-[18px] border border-[#E7E0D8] bg-white shadow-[0_8px_22px_rgba(45,39,35,0.06)]">
        <div className="border-b border-[#E7E0D8] p-5">
          <h3 className="text-[18px] font-medium text-[#2D2723]">
            Data Transaksi Customer
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-[12px]">
            <thead className="bg-[#F4EFEA] text-[#5E5148]">
              <tr>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Nama</th>
                <th className="px-4 py-4">Riwayat Pembelian</th>
                <th className="px-4 py-4">Total Transaksi</th>
                <th className="px-4 py-4">Metode Pembayaran</th>
                <th className="px-4 py-4">Produk Dibeli</th>
                <th className="px-4 py-4">Transaksi Terakhir</th>
              </tr>
            </thead>

            <tbody>
              {customers.slice(0, 50).map((customer) => (
                <tr
                  key={customer.idCustomer}
                  className="border-t border-[#EEE7DF] hover:bg-[#FBFAF8]"
                >
                  <td className="px-4 py-4">{customer.idCustomer}</td>
                  <td className="px-4 py-4">{customer.namaLengkap}</td>
                  <td className="px-4 py-4">{customer.riwayatPembelian}</td>
                  <td className="px-4 py-4">{customer.totalTransaksi}</td>
                  <td className="px-4 py-4">{customer.metodePembayaran}</td>
                  <td className="px-4 py-4">{customer.produkItemDibeli}</td>
                  <td className="px-4 py-4">
                    {customer.tanggalTransaksiTerakhir}
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

function StatCard({ title, value }) {
  return (
    <div className="rounded-[18px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_22px_rgba(45,39,35,0.06)]">
      <p className="text-[11px] text-[#7C7772]">{title}</p>
      <h2 className="mt-2 text-[30px] font-semibold text-[#2D2723]">{value}</h2>
    </div>
  );
}