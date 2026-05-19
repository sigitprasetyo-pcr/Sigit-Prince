const months = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 60 },
  { month: "May", value: 56 },
  { month: "Jun", value: 63 },
  { month: "Jul", value: 70 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 86 },
  { month: "Dec", value: 91 },
];

export default function RevenueChart() {
  return (
    <div className="mt-8 h-[210px]">
      <div className="flex h-full items-end gap-7 px-20">
        {months.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center justify-end">
            <div
              className="w-5 rounded-t-full bg-gradient-to-b from-[#C7A765] to-[#EAD9B5]"
              style={{ height: `${item.value}%` }}
            />

            <span className="mt-3 text-[9px] text-[#34485C]">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}