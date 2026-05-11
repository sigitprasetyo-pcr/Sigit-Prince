import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/Orders";

export default function Orders({ mode = "orders" }) {
  const isInventory = mode === "inventory";

  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    category: "",
    customer: "",
    price: "",
    status: "Diproses",
  });

  const statusClass = {
    "Siap Kirim": "bg-amber-50 text-amber-700",
    Terkirim: "bg-green-50 text-green-700",
    Diproses: "bg-neutral-100 text-neutral-600",
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      product: "",
      category: "",
      customer: "",
      price: "",
      status: "Diproses",
    });
  };

  const formatRupiah = (value) => {
    if (value.toLowerCase().includes("rp")) {
      return value;
    }

    const numberOnly = value.replace(/\D/g, "");

    if (!numberOnly) {
      return value;
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(numberOnly));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.product.trim() === "" ||
      formData.category.trim() === "" ||
      formData.customer.trim() === "" ||
      formData.price.trim() === ""
    ) {
      alert("Semua data pesanan wajib diisi.");
      return;
    }

    const newId =
      orders.length > 0 ? Math.max(...orders.map((order) => order.id)) + 1 : 1;

    const newOrder = {
      id: newId,
      product: formData.product,
      category: formData.category,
      customer: formData.customer,
      price: formatRupiah(formData.price),
      status: formData.status,
    };

    setOrders([newOrder, ...orders]);
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="p-6 md:p-12">
      <PageHeader
        breadcrumb={isInventory ? "Inventory" : "Orders"}
        title={isInventory ? "Manajemen Inventaris" : "Orders"}
        description={
          isInventory
            ? "Pantau stok, kategori, dan status koleksi VelvetNova."
            : "Kelola pesanan boutique dan transaksi pelanggan private atelier."
        }
      >
        <button
          type="button"
          onClick={handleOpenForm}
          className="btn-black px-6 py-3 text-[10px]"
        >
          {isInventory ? "Tambah Produk" : "Buat Pesanan"}
        </button>
      </PageHeader>

      {showForm && (
        <div className="mb-8 bg-white luxury-shadow p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <p className="label-caps text-[10px] text-neutral-400 mb-2">
                Form Pesanan
              </p>

              <h2 className="font-serif italic text-2xl text-on-surface">
                Buat Pesanan Baru
              </h2>

              <p className="text-sm text-neutral-500 mt-2">
                Isi data pesanan boutique yang ingin ditambahkan ke daftar
                orders VelvetNova.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseForm}
              className="text-sm text-neutral-500 hover:text-black transition text-left md:text-right"
            >
              Tutup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="label-caps text-[10px] text-neutral-400">
                Nama Produk
              </label>

              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Contoh: Royal Satin Dress"
                className="w-full mt-2 border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="label-caps text-[10px] text-neutral-400">
                Kategori
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Contoh: Evening Wear"
                className="w-full mt-2 border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="label-caps text-[10px] text-neutral-400">
                Nama Pelanggan
              </label>

              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Contoh: Aulia Putri"
                className="w-full mt-2 border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="label-caps text-[10px] text-neutral-400">
                Harga
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Contoh: 3500000 atau Rp 3.500.000"
                className="w-full mt-2 border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="label-caps text-[10px] text-neutral-400">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-2 border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black bg-white"
              >
                <option value="Diproses">Diproses</option>
                <option value="Siap Kirim">Siap Kirim</option>
                <option value="Terkirim">Terkirim</option>
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button type="submit" className="btn-black px-6 py-3 text-[10px]">
                Simpan Pesanan
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 text-[10px] label-caps border border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}

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

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 px-8 text-center text-sm text-neutral-400"
                  >
                    Belum ada data pesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}