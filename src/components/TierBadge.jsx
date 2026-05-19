const tierClass = {
  "Platinum Member": "bg-[#EEE8FF] text-[#7A3FE0]",
  "Gold Member": "bg-[#FFF0D8] text-[#C56B2C]",
  "Silver Member": "bg-[#EEF2F6] text-[#667085]",
  "Regular Member": "bg-[#F3F0EC] text-[#7C7772]",
};

export default function TierBadge({ tier }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.1em] ${
        tierClass[tier] || "bg-[#F3F0EC] text-[#7C7772]"
      }`}
    >
      {tier}
    </span>
  );
}