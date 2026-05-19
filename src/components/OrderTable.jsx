import StatusBadge from "./StatusBadge";
import { orders } from "../data/Orders";

export default function OrderTable() {
  return (
    <div className="overflow-hidden bg-white shadow-[0_8px_24px_rgba(45,39,35,0.04)]">
      <table className="w-full text-left">
        <thead className="border-b border-[#E7E0D8] text-[12px] uppercase tracking-[0.18em] text-[#9CA3AF]">
          <tr>
            <th className="px-10 py-7 font-normal">ID</th>
            <th className="px-10 py-7 font-normal">Produk</th>
            <th className="px-10 py-7 font-normal">Pelanggan</th>
            <th className="px-10 py-7 font-normal">Harga</th>
            <th className="px-10 py-7 font-normal text-right">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-[#F1ECE6]">
              <td className="px-10 py-8 text-[14px] text-[#34485C]">
                {order.id}
              </td>

              <td className="px-10 py-8">
                <p className="text-[17px] italic text-black">
                  {order.product}
                </p>

                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                  {order.category}
                </p>
              </td>

              <td className="px-10 py-8 text-[14px] text-[#34485C]">
                {order.customer}
              </td>

              <td className="px-10 py-8 text-[14px] text-black">
                {order.price}
              </td>

              <td className="px-10 py-8 text-right">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}