import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiShoppingBag } from "react-icons/fi";
import TierBadge from "./TierBadge";

export default function CustomerCard({ customer }) {
  return (
    <div className="rounded-[18px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(45,39,35,0.08)]">
      <div className="flex items-start gap-4">
        <img
          src={customer.image}
          alt={customer.name}
          className="h-[58px] w-[58px] shrink-0 rounded-full border-2 border-white object-cover shadow-[0_8px_16px_rgba(45,39,35,0.14)]"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/customers/${customer.id}`}
              className="truncate text-[15px] font-medium text-[#2D2723] underline decoration-[#2D2723]/40 underline-offset-2 hover:text-[#C47A24]"
            >
              {customer.name}
            </Link>

            <TierBadge tier={customer.tier} />
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-[12px] text-[#7C6B5B]">
        <p className="flex items-center gap-3">
          <FiMail className="text-[#B07A52]" />
          {customer.email}
        </p>

        <p className="flex items-center gap-3">
          <FiPhone className="text-[#B07A52]" />
          {customer.phone}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#F0E8DF] pt-4">
        <div className="flex items-center gap-2 text-[12px] font-medium text-[#B0572B]">
          <FiShoppingBag />
          <span>{customer.totalOrders} Pesanan</span>
        </div>

        <Link
          to={`/customers/${customer.id}`}
          className="text-[12px] font-medium text-[#3A2619] underline decoration-[#3A2619]/40 underline-offset-2 hover:text-[#C47A24]"
        >
          Riwayat
        </Link>
      </div>
    </div>
  );
}