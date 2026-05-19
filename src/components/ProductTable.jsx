import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function ProductTable({ products }) {
  return (
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
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="text-[12px] transition hover:bg-[#FAF9F7]"
              >
                <td className="px-6 py-4 text-[#7C7772]">
                  {index + 1}
                </td>

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

                <td className="px-6 py-4 text-[#7C7772]">
                  {product.code}
                </td>

                <td className="px-6 py-4 text-[#6F665F]">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-[#6F665F]">
                  {product.brand}
                </td>

                <td className="px-6 py-4 text-[#2D2723]">
                  {product.price}
                </td>

                <td className="px-6 py-4 text-[#2D2723]">
                  {product.stock}
                </td>

                <td className="px-6 py-4 text-right">
                  <StatusBadge status={product.status} />
                </td>
              </tr>
            ))}

            {products.length === 0 && (
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
  );
}