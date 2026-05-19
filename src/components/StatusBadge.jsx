const statusClass = {
  "In Stock": "bg-[#D8F8E8] text-[#008A50]",
  "Low Stock": "bg-[#FFF0C8] text-[#C96B00]",
  "Out of Stock": "bg-[#FFE0E0] text-[#C0392B]",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] ${
        statusClass[status] || "bg-[#F3F0EC] text-[#7C7772]"
      }`}
    >
      {status}
    </span>
  );
}