import StatusBadge from "./StatusBadge";

const orders = [
  {
    id: "#ORD-001",
    customer: "Sarah Johnson",
    product: "Evening Dress",
    amount: "Rp 2.5M",
    status: "Completed",
  },
  {
    id: "#ORD-002",
    customer: "Michael Chen",
    product: "Blazer Set",
    amount: "Rp 3.2M",
    status: "Processing",
  },
  {
    id: "#ORD-003",
    customer: "Emma Wilson",
    product: "Silk Scarf",
    amount: "Rp 850K",
    status: "Completed",
  },
  {
    id: "#ORD-004",
    customer: "David Brown",
    product: "Leather Bag",
    amount: "Rp 4.1M",
    status: "Pending",
  },
];

export default function RecentOrdersTable() {
  return (
    <div className="rounded-[14px] border border-[#E7E0D8] bg-white shadow-[0_8px_24px_rgba(45,39,35,0.05)]">
      <div className="flex items-center justify-between p-6">
        <div>
          <h2 className="font-display text-[20px] text-black">
            Recent Orders
          </h2>

          <p className="mt-1 text-[12px] text-[#34485C]">
            Latest customer orders
          </p>
        </div>

        <button className="text-[12px] text-[#C7A765]">
          View All
        </button>
      </div>

      <table className="w-full text-left text-[12px]">
        <thead className="bg-[#FAFAFA] text-[#34485C]">
          <tr>
            <th className="px-6 py-4 font-normal">Order ID</th>
            <th className="px-6 py-4 font-normal">Customer</th>
            <th className="px-6 py-4 font-normal">Product</th>
            <th className="px-6 py-4 font-normal">Amount</th>
            <th className="px-6 py-4 font-normal">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-[#E7E0D8]">
              <td className="px-6 py-5">{order.id}</td>
              <td className="px-6 py-5">{order.customer}</td>
              <td className="px-6 py-5">{order.product}</td>
              <td className="px-6 py-5">{order.amount}</td>
              <td className="px-6 py-5">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}