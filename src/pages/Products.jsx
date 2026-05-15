import { useState } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import PageHeader from "../components/PageHeader";
import products from "../data/Products";

const statusClass = {
  "In Stock": "bg-[#D8F8E8] text-[#008A50]",
  "Low Stock": "bg-[#FFF0C8] text-[#C96B00]",
  "Out of Stock": "bg-[#FFE0E0] text-[#C0392B]",
};

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(keyword) ||
      product.code.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword)
    );
  });

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / Product List"
        title="Products"
        description="Kelola koleksi produk boutique, stok, harga, dan kategori."
      >
        <div className="relative w-full md:w-[280px]">
          <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#A58E7B]" />

          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-[36px] w-full rounded-[10px] border border-[#E7E0D8] bg-white pl-9 pr-4 text-[12px] text-[#2D2723] outline-none placeholder:text-[#A58E7B] focus:border-[#C7A765]"
          />
        </div>
      </PageHeader>

      <div className="overflow-hidden rounded-[14px] border border-[#E7E0D8] bg-white shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-[#FAFBFC] text-[11px] text-[#7C7772]">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E7E0D8]">
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="text-[12px] transition hover:bg-[#FAF9F7]"
                >
                  <td className="px-6 py-4 text-[#7C7772]">{index + 1}</td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex items-center gap-3 text-[#2D2723] hover:text-[#C47A24]"
                    >
                      <span className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-[#E5D7BD] text-[19px]">
                        {product.icon}
                      </span>

                      <span>{product.title}</span>
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-[#7C7772]">{product.code}</td>
                  <td className="px-6 py-4 text-[#6F665F]">{product.category}</td>
                  <td className="px-6 py-4 text-[#6F665F]">{product.brand}</td>
                  <td className="px-6 py-4 text-[#2D2723]">{product.price}</td>
                  <td className="px-6 py-4 text-[#2D2723]">{product.stock}</td>

                  <td className="px-6 py-4 text-right">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] ${
                        statusClass[product.status] ||
                        "bg-[#F3F0EC] text-[#7C7772]"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-[12px] text-[#7C7772]"
                  >
                    Produk tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}