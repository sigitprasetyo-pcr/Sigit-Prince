import PageHeader from "../components/PageHeader";
import orders from "../data/Orders";

export default function Orders({ mode = "orders" }) {
  const isInventory = mode === "inventory";

  const statusClass = {
    "Siap Kirim": "bg-amber-50 text-amber-700",
    Terkirim: "bg-green-50 text-green-700",
    Diproses: "bg-neutral-100 text-neutral-600",
  };

  return (
    <div className="p-6 md:p-12">
      <PageHeader
        breadcrumb={isInventory ? "Inventory" : "Curations"}
        title={isInventory ? "Manajemen Inventaris" : "Arsip Pesanan"}
        description={
          isInventory
            ? "Pantau stok, kategori, dan status koleksi VelvetNova."
            : "Kelola pesanan boutique dan transaksi pelanggan private atelier."
        }
      >
        <button className="btn-black px-6 py-3 text-[10px]">
          {isInventory ? "Tambah Produk" : "Buat Pesanan"}
        </button>
      </PageHeader>

      <div className="bg-white luxury-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400">
                  ID
                </th>

                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400">
                  Produk
                </th>

                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400">
                  Pelanggan
                </th>

                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400">
                  Harga
                </th>

                <th className="py-6 px-8 label-caps text-[10px] text-neutral-400 text-right">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-50">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-background/60 transition"
                >
                  <td className="py-6 px-8 font-mono text-sm text-neutral-500">
                    {order.id}
                  </td>

                  <td className="py-6 px-8">
                    <p className="font-medium italic text-on-surface">
                      {order.product}
                    </p>

                    <p className="text-[10px] text-neutral-400 uppercase mt-1 tracking-widest">
                      {order.category}
                    </p>
                  </td>

                  <td className="py-6 px-8 text-sm text-neutral-600">
                    {order.customer}
                  </td>

                  <td className="py-6 px-8 text-sm font-medium text-on-surface">
                    {order.price}
                  </td>

                  <td className="py-6 px-8 text-right">
                    <span
                      className={`text-[10px] label-caps px-3 py-1 ${
                        statusClass[order.status] ||
                        "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}