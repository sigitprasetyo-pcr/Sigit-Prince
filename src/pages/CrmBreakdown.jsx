import { useState } from "react";
import {
  FiHome,
  FiDollarSign,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import BrandLogo from "../components/BrandLogo";
import MenuItem from "../components/MenuItem";
import SearchBar from "../components/SearchBar";
import NotificationButton from "../components/NotificationButton";
import UserDropdown from "../components/UserDropdown";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import TierBadge from "../components/TierBadge";
import ProductTable from "../components/ProductTable";
import CustomerCard from "../components/CustomerCard";
import StatCard from "../components/StatCard";
import RevenueOverview from "../components/RevenueOverview";
import TopProductList from "../components/TopProductList";
import RecentOrdersTable from "../components/RecentOrdersTable";
import OrderForm from "../components/OrderForm";
import Loading from "../components/Loading";

const sampleProducts = [
  {
    id: 1,
    title: "Satin Luxury Dress",
    code: "PRD-001",
    category: "Dress",
    brand: "Hejmana",
    price: "Rp 850.000",
    stock: 24,
    status: "In Stock",
    icon: "👗",
  },
  {
    id: 2,
    title: "Classic Brown Outer",
    code: "PRD-002",
    category: "Outerwear",
    brand: "Hejmana",
    price: "Rp 690.000",
    stock: 12,
    status: "Low Stock",
    icon: "🧥",
  },
  {
    id: 3,
    title: "Gold Mini Handbag",
    code: "PRD-003",
    category: "Bag",
    brand: "Hejmana",
    price: "Rp 750.000",
    stock: 20,
    status: "In Stock",
    icon: "👜",
  },
];

const sampleCustomer = {
  id: 1,
  name: "Aulia Putri",
  email: "aulia.putri@gmail.com",
  phone: "081234567890",
  tier: "Gold Member",
  totalOrders: 15,
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
};

function ComponentPreview({ number, title, category, children }) {
  return (
    <div className="rounded-[18px] border border-[#E7E0D8] bg-white p-5 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-[#C7A765]">
            {category}
          </p>

          <h2 className="font-display text-[18px] text-[#2D2723]">
            {title}
          </h2>
        </div>

        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#3A2619] text-[11px] text-white">
          {number}
        </div>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}

export default function CrmBreakdown() {
  const [search, setSearch] = useState("");

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / CRM Breakdown"
        title="CRM Component Breakdown"
        description="Halaman ini menampilkan penerapan komponen CRM Boutique sesuai Pertemuan 10."
      />

      <div className="mb-6 rounded-[14px] border border-[#E7E0D8] bg-white p-6 shadow-[0_6px_16px_rgba(45,39,35,0.05)]">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#C7A765]">
          Kesimpulan Breakdown
        </p>

        <h2 className="text-[20px] font-medium text-[#2D2723]">
          Total Komponen Ditampilkan: 18 Komponen
        </h2>

        <p className="mt-2 text-[12px] leading-relaxed text-[#7C7772]">
          Tugas meminta minimal 15 komponen. Pada halaman ini, komponen CRM
          Hejmana Boutique ditampilkan langsung agar pembagian komponen terlihat jelas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <ComponentPreview
          number="1"
          title="BrandLogo.jsx"
          category="Basic Component"
        >
          <BrandLogo />
        </ComponentPreview>

        <ComponentPreview
          number="2"
          title="MenuItem.jsx"
          category="Basic Component"
        >
          <div className="w-[160px]">
            <MenuItem
              label="Dashboard"
              path="/dashboard"
              icon={<FiHome />}
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          number="3"
          title="SearchBar.jsx"
          category="Basic Component"
        >
          <SearchBar
            placeholder="Cari produk..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </ComponentPreview>

        <ComponentPreview
          number="4"
          title="NotificationButton.jsx"
          category="Basic Component"
        >
          <NotificationButton />
        </ComponentPreview>

        <ComponentPreview
          number="5"
          title="UserDropdown.jsx"
          category="Basic Component"
        >
          <UserDropdown />
        </ComponentPreview>

        <ComponentPreview
          number="6"
          title="StatusBadge.jsx"
          category="Data Display Component"
        >
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="In Stock" />
            <StatusBadge status="Low Stock" />
            <StatusBadge status="Out of Stock" />
          </div>
        </ComponentPreview>

        <ComponentPreview
          number="7"
          title="TierBadge.jsx"
          category="Data Display Component"
        >
          <div className="flex flex-wrap gap-3">
            <TierBadge tier="Platinum Member" />
            <TierBadge tier="Gold Member" />
            <TierBadge tier="Silver Member" />
          </div>
        </ComponentPreview>

        <ComponentPreview
          number="8"
          title="StatCard.jsx"
          category="Dashboard Component"
        >
          <StatCard
            icon={<FiDollarSign />}
            label="Total Revenue"
            value="Rp 45.2M"
            growth="+12.5%"
            color="bg-[#00B67A]"
          />
        </ComponentPreview>

        <ComponentPreview
          number="9"
          title="CustomerCard.jsx"
          category="Data Display Component"
        >
          <CustomerCard customer={sampleCustomer} />
        </ComponentPreview>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <ComponentPreview
          number="10"
          title="Header.jsx"
          category="Layout Component"
        >
          <div className="overflow-hidden rounded-[14px] border border-[#E7E0D8]">
            <Header />
          </div>
        </ComponentPreview>

        <ComponentPreview
          number="11"
          title="ProductTable.jsx"
          category="Data Display Component"
        >
          <ProductTable products={sampleProducts} />
        </ComponentPreview>

        <ComponentPreview
          number="12"
          title="RevenueOverview.jsx"
          category="Dashboard Component"
        >
          <RevenueOverview />
        </ComponentPreview>

        <ComponentPreview
          number="13"
          title="TopProductList.jsx"
          category="Dashboard Component"
        >
          <TopProductList />
        </ComponentPreview>

        <ComponentPreview
          number="14"
          title="RecentOrdersTable.jsx"
          category="Dashboard Component"
        >
          <RecentOrdersTable />
        </ComponentPreview>

        <ComponentPreview
          number="15"
          title="OrderForm.jsx"
          category="Form Component"
        >
          <OrderForm />
        </ComponentPreview>

        <ComponentPreview
          number="16"
          title="PageHeader.jsx"
          category="Layout Component"
        >
          <PageHeader
            breadcrumb="Hejmana / Example"
            title="Contoh PageHeader"
            description="Ini adalah contoh penggunaan komponen PageHeader."
          >
            <button className="rounded-[10px] bg-[#3A2619] px-5 py-3 text-[11px] text-white">
              Action
            </button>
          </PageHeader>
        </ComponentPreview>

        <ComponentPreview
          number="17"
          title="Loading.jsx"
          category="Feedback Component"
        >
          <div className="h-[120px] overflow-hidden rounded-[14px] border border-[#E7E0D8]">
            <Loading />
          </div>
        </ComponentPreview>

        <ComponentPreview
          number="18"
          title="Sidebar.jsx"
          category="Layout Component"
        >
          <p className="text-[12px] leading-relaxed text-[#7C7772]">
            Sidebar.jsx sudah tampil langsung pada sisi kiri halaman melalui
            MainLayout. Komponen ini berisi BrandLogo, MenuItem, dan tombol
            Logout.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#F3E7DF] px-3 py-1 text-[11px] text-[#3A2619]">
              Dashboard
            </span>

            <span className="rounded-full bg-[#F3E7DF] px-3 py-1 text-[11px] text-[#3A2619]">
              Products
            </span>

            <span className="rounded-full bg-[#F3E7DF] px-3 py-1 text-[11px] text-[#3A2619]">
              Orders
            </span>

            <span className="rounded-full bg-[#F3E7DF] px-3 py-1 text-[11px] text-[#3A2619]">
              Customers
            </span>
          </div>
        </ComponentPreview>
      </div>
    </section>
  );
}