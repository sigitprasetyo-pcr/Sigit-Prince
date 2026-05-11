import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const metrics = [
  {
    title: "Total Revenue",
    value: "$48,574",
    trend: "+12.5%",
    description: "+$5,234 from last month",
    icon: <FiDollarSign />,
    iconClass: "bg-[#F3F0EC] text-[#C09B7D]",
    trendClass: "bg-[#E7F8EF] text-[#00A85A]",
  },
  {
    title: "Total Orders",
    value: "1,429",
    trend: "+8.2%",
    description: "+108 from last month",
    icon: <FiShoppingCart />,
    iconClass: "bg-[#F3E7DF] text-[#C09B7D]",
    trendClass: "bg-[#EEF5FF] text-[#2F6BFF]",
  },
  {
    title: "New Customers",
    value: "573",
    trend: "+23.1%",
    description: "+107 from last month",
    icon: <FiUsers />,
    iconClass: "bg-[#F3E7DF] text-[#C09B7D]",
    trendClass: "bg-[#FAEFFF] text-[#9B2DFF]",
  },
  {
    title: "Growth Rate",
    value: "32.8%",
    trend: "+15.3%",
    description: "+4.1% from last month",
    icon: <FiTrendingUp />,
    iconClass: "bg-[#F3E7DF] text-[#C09B7D]",
    trendClass: "bg-[#FFF7E8] text-[#FF7800]",
  },
];

const products = [
  {
    name: "Silk Evening Dress",
    category: "Dresses",
    price: "$289",
    status: "In Stock",
    statusClass: "bg-[#E7F8EF] text-[#00A85A]",
    icon: "🌸",
  },
  {
    name: "Leather Handbag",
    category: "Accessories",
    price: "$459",
    status: "In Stock",
    statusClass: "bg-[#E7F8EF] text-[#00A85A]",
    icon: "👜",
  },
  {
    name: "Pearl Necklace",
    category: "Jewelry",
    price: "$189",
    status: "Low Stock",
    statusClass: "bg-[#FFF7E8] text-[#FF7800]",
    icon: "📿",
  },
];

function MetricCard({ item }) {
  return (
    <div className="rounded-[14px] border border-[#E6DED6] bg-white p-[30px]">
      <div className="mb-7 flex items-start justify-between">
        <div
          className={`flex h-[58px] w-[58px] items-center justify-center rounded-[8px] text-[30px] ${item.iconClass}`}
        >
          {item.icon}
        </div>

        <span
          className={`rounded-full px-4 py-1.5 text-[15px] font-medium ${item.trendClass}`}
        >
          {item.trend}
        </span>
      </div>

      <p className="text-[18px] font-normal text-[#6F665F]">
        {item.title}
      </p>

      <h3 className="mt-2 font-display text-[31px] font-medium leading-none text-[#2D2723]">
        {item.value}
      </h3>

      <p className="mt-4 text-[16px] font-normal text-[#8C8782]">
        {item.description}
      </p>
    </div>
  );
}

function ProductCard({ item }) {
  return (
    <div>
      <div className="flex h-[455px] items-center justify-center rounded-[10px] bg-[#FCFBFA] text-[58px]">
        <span>{item.icon}</span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[24px] font-medium leading-tight text-[#2D2723]">
            {item.name}
          </h3>

          <p className="mt-2 text-[18px] font-normal text-[#7C7772]">
            {item.category}
          </p>

          <p className="mt-4 text-[23px] font-medium text-[#2D2723]">
            {item.price}
          </p>
        </div>

        <span
          className={`mt-1 shrink-0 rounded-full px-4 py-2 text-[15px] font-normal ${item.statusClass}`}
        >
          {item.status}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="min-h-[calc(100vh-90px)] bg-[#FBFAF8] px-10 py-11">
      <div className="mb-11">
        <h1 className="font-display text-[32px] font-medium leading-tight text-[#2D2723]">
          Dashboard Overview
        </h1>

        <p className="mt-3 text-[22px] font-normal text-[#7C7772]">
          Welcome back! Here&apos;s what&apos;s happening with your boutique
          today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <MetricCard key={item.title} item={item} />
        ))}
      </div>

      <div className="my-10 h-px w-full bg-[#E6DED6]" />

      <section className="rounded-[14px] border border-[#E6DED6] bg-white p-[30px]">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-display text-[32px] font-medium text-[#2D2723]">
            Featured Products
          </h2>

          <button className="text-[18px] font-normal text-[#C09B7D] transition hover:text-[#9C7354]">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {products.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      </section>
    </section>
  );
}