export default function StatCard({
  icon,
  label,
  value,
  growth,
  color = "bg-[#00B67A]",
}) {
  return (
    <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_8px_24px_rgba(45,39,35,0.05)]">
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${color} text-xl text-white`}>
          {icon}
        </div>

        <span className="text-[11px] text-[#00A36D]">
          ↗ {growth}
        </span>
      </div>

      <p className="text-[12px] text-[#34485C]">
        {label}
      </p>

      <h3 className="mt-2 font-display text-[24px] text-black">
        {value}
      </h3>
    </div>
  );
}