import { useState } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const metrics = [
  {
    title: "Total Revenue",
    value: "Rp 45.2M",
    growth: "+12.5%",
    icon: <FiDollarSign />,
    color: "bg-[#00A86B]",
  },
  {
    title: "Total Orders",
    value: "1,234",
    growth: "+8.3%",
    icon: <FiShoppingBag />,
    color: "bg-[#2563EB]",
  },
  {
    title: "New Customers",
    value: "856",
    growth: "+15.2%",
    icon: <FiUsers />,
    color: "bg-[#A833E8]",
  },
  {
    title: "Growth Rate",
    value: "23.4%",
    growth: "+4.1%",
    icon: <FiTrendingUp />,
    color: "bg-[#B49455]",
  },
];

const chartData = {
  "Last 6 months": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    revenue: [42, 56, 68, 74, 52, 64],
    orders: [120, 155, 190, 210, 165, 185],
  },
  "Last 12 months": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    revenue: [38, 47, 54, 62, 58, 69, 73, 67, 76, 82, 88, 94],
    orders: [95, 118, 132, 150, 142, 168, 182, 174, 196, 205, 224, 238],
  },
  "This year": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    revenue: [45, 52, 61, 70, 66, 74, 81, 78, 86, 91, 97, 104],
    orders: [110, 128, 145, 168, 158, 176, 194, 188, 205, 219, 238, 252],
  },
};

const topProducts = [
  { icon: "👗", name: "Floral Summer Dress", sales: "145 sales", revenue: "Rp 18.5M" },
  { icon: "👜", name: "Designer Handbag", sales: "98 sales", revenue: "Rp 24.2M" },
  { icon: "👘", name: "Silk Evening Gown", sales: "76 sales", revenue: "Rp 15.8M" },
  { icon: "🧥", name: "Leather Jacket", sales: "64 sales", revenue: "Rp 12.3M" },
];

const orders = [
  { id: "#ORD-001", customer: "Sarah Johnson", product: "Evening Dress", amount: "Rp 2.5M", status: "Completed" },
  { id: "#ORD-002", customer: "Michael Chen", product: "Blazer Set", amount: "Rp 3.2M", status: "Processing" },
  { id: "#ORD-003", customer: "Emma Wilson", product: "Silk Scarf", amount: "Rp 850K", status: "Completed" },
  { id: "#ORD-004", customer: "David Brown", product: "Leather Bag", amount: "Rp 4.1M", status: "Pending" },
];

const statusClass = {
  Completed: "bg-[#D8F8E8] text-[#008A50]",
  Processing: "bg-[#DCEAFF] text-[#0067E8]",
  Pending: "bg-[#FFF0C8] text-[#C96B00]",
};

function MetricCard({ item }) {
  return (
    <div className="rounded-[12px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
      <div className="mb-5 flex items-start justify-between">
        <div
          className={`flex h-[38px] w-[38px] items-center justify-center rounded-[9px] text-[20px] text-white ${item.color}`}
        >
          {item.icon}
        </div>

        <span className="text-[11px] text-[#009E67]">↗ {item.growth}</span>
      </div>

      <p className="text-[12px] text-[#34485C]">{item.title}</p>

      <h3 className="mt-2 text-[22px] font-medium leading-none text-black">
        {item.value}
      </h3>
    </div>
  );
}

function RevenueChart({ data }) {
  const width = 720;
  const height = 230;
  const paddingTop = 18;
  const paddingRight = 22;
  const paddingBottom = 34;
  const paddingLeft = 38;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxRevenue = Math.max(...data.revenue) + 15;
  const maxOrders = Math.max(...data.orders) + 40;

  const getX = (index) =>
    paddingLeft + (index * chartWidth) / (data.labels.length - 1);

  const getRevenueY = (value) =>
    paddingTop + chartHeight - (value / maxRevenue) * chartHeight;

  const getOrderY = (value) =>
    paddingTop + chartHeight - (value / maxOrders) * chartHeight;

  const linePoints = data.orders
    .map((value, index) => `${getX(index)},${getOrderY(value)}`)
    .join(" ");

  const barWidth = data.labels.length > 8 ? 20 : 34;

  return (
    <div className="mt-4 w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[230px] w-full">
        {[0, 1, 2, 3].map((line) => {
          const y = paddingTop + (line * chartHeight) / 3;

          return (
            <line
              key={line}
              x1={paddingLeft}
              y1={y}
              x2={width - paddingRight}
              y2={y}
              stroke="#EAE3DA"
              strokeWidth="1"
            />
          );
        })}

        {data.revenue.map((value, index) => {
          const x = getX(index) - barWidth / 2;
          const y = getRevenueY(value);
          const barHeight = height - paddingBottom - y;

          return (
            <rect
              key={data.labels[index]}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="7"
              fill="url(#barGradient)"
            />
          );
        })}

        <polyline
          points={linePoints}
          fill="none"
          stroke="#C7A765"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.orders.map((value, index) => (
          <circle
            key={`dot-${data.labels[index]}`}
            cx={getX(index)}
            cy={getOrderY(value)}
            r="4"
            fill="#FFFFFF"
            stroke="#C7A765"
            strokeWidth="2"
          />
        ))}

        {data.labels.map((label, index) => (
          <text
            key={label}
            x={getX(index)}
            y={height - 10}
            textAnchor="middle"
            fill="#34485C"
            fontSize="10"
            fontFamily="Manrope, sans-serif"
          >
            {label}
          </text>
        ))}

        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9C28E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E9DCC4" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState("This year");

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mb-7">
        <h1 className="text-[24px] font-medium leading-tight text-black">
          Dashboard
        </h1>

        <p className="mt-2 text-[13px] text-[#34485C]">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <MetricCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          <div className="mb-3 flex items-start justify-between gap-5">
            <div>
              <h2 className="text-[18px] font-medium text-black">
                Revenue Overview
              </h2>

              <p className="mt-2 text-[13px] text-[#34485C]">
                Monthly revenue performance
              </p>
            </div>

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="h-[38px] min-w-[135px] rounded-[10px] border border-[#C7A765] bg-white px-3 text-[12px] text-black outline-none focus:ring-4 focus:ring-[#C7A765]/15"
            >
              <option value="Last 6 months">Last 6 months</option>
              <option value="Last 12 months">Last 12 months</option>
              <option value="This year">This year</option>
            </select>
          </div>

          <RevenueChart data={chartData[period]} />
        </div>

        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
          <h2 className="mb-5 text-[18px] font-medium text-black">
            Top Products
          </h2>

          <div className="space-y-4">
            {topProducts.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#E5D7BD] text-[21px]">
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-[13px] text-black">{item.name}</h3>

                  <p className="mt-1 text-[11px] text-[#34485C]">
                    {item.sales}
                  </p>
                </div>

                <p className="text-[12px] text-[#C7A765]">{item.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[14px] border border-[#E7E0D8] bg-white shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-[18px] font-medium text-black">
              Recent Orders
            </h2>

            <p className="mt-1 text-[12px] text-[#34485C]">
              Latest customer orders
            </p>
          </div>

          <button className="text-[12px] text-[#C7A765]">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-[#FAFBFC] text-[11px] text-[#34485C]">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E7E0D8]">
              {orders.map((order) => (
                <tr key={order.id} className="text-[12px]">
                  <td className="px-6 py-4 text-black">{order.id}</td>
                  <td className="px-6 py-4 text-[#2D2723]">{order.customer}</td>
                  <td className="px-6 py-4 text-[#34485C]">{order.product}</td>
                  <td className="px-6 py-4 text-[#2D2723]">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] ${statusClass[order.status]}`}
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
    </section>
  );
}