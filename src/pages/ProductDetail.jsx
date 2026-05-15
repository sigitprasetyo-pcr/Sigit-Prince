import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBox,
  FiHash,
  FiLayers,
  FiPackage,
  FiTag,
} from "react-icons/fi";
import products from "../data/Products";

const statusClass = {
  "In Stock": "bg-[#D8F8E8] text-[#008A50]",
  "Low Stock": "bg-[#FFF0C8] text-[#C96B00]",
  "Out of Stock": "bg-[#FFE0E0] text-[#C0392B]",
};

export default function ProductDetail() {
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
        <div className="rounded-[14px] border border-[#E7E0D8] bg-white p-8 text-center">
          <h1 className="text-[22px] font-medium text-[#2D2723]">
            Produk tidak ditemukan
          </h1>

          <Link
            to="/products"
            className="mt-5 inline-flex rounded-[10px] bg-[#3A2619] px-5 py-3 text-[12px] text-white"
          >
            Kembali ke Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mb-6">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#8B735D]">
          Hejmana / Products / Detail
        </p>

        <h1 className="text-[24px] font-medium text-[#2D2723]">
          Detail Produk
        </h1>
      </div>

      <div className="max-w-[600px] overflow-hidden rounded-[18px] border border-[#E7E0D8] bg-white shadow-[0_8px_22px_rgba(45,39,35,0.06)]">
        <div className="flex items-center gap-6 border-b border-[#E7E0D8] bg-[#FFFDFC] p-7">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[18px] bg-[#E5D7BD] text-[46px] shadow-[0_8px_20px_rgba(45,39,35,0.1)]">
            {product.icon}
          </div>

          <div>
            <span
              className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.12em] ${
                statusClass[product.status] || "bg-[#F3F0EC] text-[#7C7772]"
              }`}
            >
              {product.status}
            </span>

            <h2 className="mt-2 text-[24px] font-medium text-[#2D2723]">
              {product.title}
            </h2>

            <p className="text-[12px] text-[#856F4E]">
              Product ID: #{product.id}
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-7 md:grid-cols-2">
          <InfoItem icon={<FiHash />} label={`Kode: ${product.code}`} />
          <InfoItem icon={<FiLayers />} label={`Kategori: ${product.category}`} />
          <InfoItem icon={<FiTag />} label={`Brand: ${product.brand}`} />
          <InfoItem icon={<FiPackage />} label={`Stok: ${product.stock}`} />
          <InfoItem icon={<FiBox />} label={`Status: ${product.status}`} />

          <div className="md:col-span-2">
            <p className="text-[14px] font-medium text-[#2D2723]">
              Harga: {product.price}
            </p>

            <p className="mt-3 text-[12px] leading-relaxed text-[#6F665F]">
              {product.description}
            </p>
          </div>

          <div className="md:col-span-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#3A2619] px-5 py-3 text-[12px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.14)] transition hover:bg-[#4A3020]"
            >
              <FiArrowLeft />
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 text-[12px] text-[#4F4740]">
      <span className="text-[#C47A24]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}