import RevenueChart from "./RevenueChart";

export default function RevenueOverview() {
  return (
    <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.05)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-display text-[20px] text-black">
            Revenue Overview
          </h2>

          <p className="mt-2 text-[12px] text-[#34485C]">
            Monthly revenue performance
          </p>
        </div>

        <select className="rounded-[10px] border border-[#C7A765] bg-white px-5 py-3 text-[12px] outline-none">
          <option>This year</option>
          <option>This month</option>
        </select>
      </div>

      <RevenueChart />
    </div>
  );
}