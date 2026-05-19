const products = [
  {
    icon: "👗",
    name: "Floral Summer Dress",
    sales: "145 sales",
    revenue: "Rp 18.5M",
  },
  {
    icon: "👜",
    name: "Designer Handbag",
    sales: "98 sales",
    revenue: "Rp 24.2M",
  },
  {
    icon: "👘",
    name: "Silk Evening Gown",
    sales: "76 sales",
    revenue: "Rp 15.8M",
  },
  {
    icon: "🧥",
    name: "Leather Jacket",
    sales: "64 sales",
    revenue: "Rp 12.3M",
  },
];

export default function TopProductList() {
  return (
    <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.05)]">
      <h2 className="font-display text-[20px] text-black">
        Top Products
      </h2>

      <div className="mt-6 space-y-5">
        {products.map((product) => (
          <div key={product.name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#EAD9B5] text-lg">
                {product.icon}
              </div>

              <div>
                <p className="font-display text-[14px] text-black">
                  {product.name}
                </p>

                <p className="mt-1 text-[11px] text-[#34485C]">
                  {product.sales}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#C7A765]">
              {product.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}