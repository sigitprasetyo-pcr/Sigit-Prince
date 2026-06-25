import { useState } from "react";
import {
  FiDollarSign,
  FiGrid,
  FiHome,
  FiLayers,
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
    brand: "Aurelia",
    price: "Rp 850.000",
    stock: 24,
    status: "In Stock",
    icon: "👗",
    description:
      "Dress satin premium untuk koleksi boutique dengan tampilan elegan.",
  },
  {
    id: 2,
    title: "Classic Brown Outer",
    code: "PRD-002",
    category: "Outerwear",
    brand: "Aurelia",
    price: "Rp 690.000",
    stock: 12,
    status: "Low Stock",
    icon: "🧥",
    description:
      "Outer berwarna brown casual yang cocok untuk tampilan boutique.",
  },
  {
    id: 3,
    title: "Gold Mini Handbag",
    code: "PRD-003",
    category: "Bag",
    brand: "Aurelia",
    price: "Rp 750.000",
    stock: 20,
    status: "In Stock",
    icon: "👜",
    description:
      "Tas mini elegan sebagai aksesoris fashion untuk customer boutique.",
  },
];

const sampleCustomer = {
  id: 1,
  name: "Aulia Putri",
  email: "aulia.putri@gmail.com",
  phone: "081234567890",
  tier: "Gold Member",
  totalOrders: 15,
  favorite: "Satin Luxury Dress",
  spend: "Rp 8.750.000",
  lastOrder: "20/05/2026",
  address: "Pekanbaru, Riau",
  image: "https://i.pravatar.cc/150?img=47",
};

function ComponentPreview({ number, title, category, children }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#E7E0D8] bg-white shadow-[0_12px_30px_rgba(45,39,35,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(45,39,35,0.1)]">
      <div className="border-b border-[#EEE7DF] bg-[#FFFDFC] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-[#A98467]">
              {category}
            </p>

            <h2 className="text-[18px] font-medium text-[#2D2723]">
              {title}
            </h2>
          </div>

          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#3A2619] text-[11px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.14)]">
            {number}
          </div>
        </div>
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
}

export default function CrmBreakdown() {
  const [search, setSearch] = useState("");

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <div className="mx-auto w-full max-w-[1320px]">
        <PageHeader
          breadcrumb="CRM COMPONENT"
          title="CRM Component Breakdown"
          description="Halaman ini menampilkan penerapan komponen CRM Boutique yang digunakan pada project Aurelia Boutique."
        />

        <div className="mb-6 overflow-hidden rounded-[24px] border border-[#E7E0D8] bg-white shadow-[0_14px_34px_rgba(45,39,35,0.08)]">
          <div className="relative bg-gradient-to-r from-[#3A2619] via-[#7B5B45] to-[#C7A765] p-7 text-white">
            <div className="absolute right-8 top-8 hidden h-[120px] w-[120px] rounded-full bg-white/10 blur-sm md:block" />
            <div className="absolute bottom-4 right-24 hidden h-[70px] w-[70px] rounded-full bg-white/10 md:block" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                  Aurelia Boutique CRM
                </p>

                <h2 className="mt-2 text-[28px] font-medium">
                  Breakdown Komponen Project
                </h2>

                <p className="mt-3 max-w-[720px] text-[13px] leading-7 text-white/75">
                  Tugas meminta minimal 15 komponen. Pada halaman ini ditampilkan
                  18 komponen yang digunakan pada project CRM Boutique, mulai
                  dari basic component, layout, data display, dashboard, form,
                  sampai feedback component.
                </p>
              </div>

              <div className="rounded-[20px] border border-white/20 bg-white/15 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[16px] bg-white text-[#3A2619]">
                    <FiGrid />
                  </div>

                  <div>
                    <p className="text-[11px] text-white/70">Total Komponen</p>
                    <p className="text-[24px] font-semibold">18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-[#E7E0D8] md:grid-cols-3">
            <SummaryInfo label="Minimal Tugas" value="15 Komponen" />
            <SummaryInfo label="Ditampilkan" value="18 Komponen" />
            <SummaryInfo label="Tema Project" value="CRM Boutique" />
          </div>
        </div>

        <div className="mb-6 rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">
                Kesimpulan Breakdown
              </p>

              <h2 className="mt-2 text-[22px] font-medium text-[#2D2723]">
                Total Komponen Ditampilkan: 18 Komponen
              </h2>

              <p className="mt-2 text-[12px] leading-relaxed text-[#7C7772]">
                Komponen ini digunakan untuk membangun tampilan dashboard,
                produk, customer, transaksi, membership, promo, dan laporan CRM
                Boutique.
              </p>
            </div>

            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] bg-[#EEE8FF] text-[#5B4CE6]">
              <FiLayers />
            </div>
          </div>
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
            <div className="w-[170px]">
              <MenuItem label="Dashboard" path="/dashboard" icon={<FiHome />} />
            </div>
          </ComponentPreview>

          <ComponentPreview
            number="3"
            title="SearchBar.jsx"
            category="Basic Component"
          >
            <SearchBar
              placeholder="Cari produk boutique..."
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
            <div className="overflow-hidden rounded-[16px] border border-[#E7E0D8]">
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
              breadcrumb="Aurelia / Example"
              title="Contoh PageHeader"
              description="Ini adalah contoh penggunaan komponen PageHeader pada halaman CRM Boutique."
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
            <div className="h-[140px] overflow-hidden rounded-[16px] border border-[#E7E0D8]">
              <Loading />
            </div>
          </ComponentPreview>

          <ComponentPreview
            number="18"
            title="Sidebar.jsx"
            category="Layout Component"
          >
            <p className="text-[12px] leading-relaxed text-[#7C7772]">
              Sidebar.jsx tampil pada sisi kiri halaman melalui MainLayout.
              Sidebar berisi menu utama CRM Boutique seperti Dashboard, Katalog
              Produk, Pelanggan, Membership, Interaksi, Pesanan, Aktivitas,
              Promo, Laporan, Komponen CRM, dan Pengaturan.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Dashboard",
                "Katalog Produk",
                "Pelanggan",
                "Membership",
                "Interaksi",
                "Promo",
                "Laporan",
                "Komponen CRM",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#F3E7DF] px-3 py-1 text-[11px] text-[#3A2619]"
                >
                  {item}
                </span>
              ))}
            </div>
          </ComponentPreview>
        </div>
      </div>
    </section>
  );
}

function SummaryInfo({ label, value }) {
  return (
    <div className="border-b border-[#E7E0D8] p-5 text-center md:border-b-0 md:border-r last:md:border-r-0">
      <p className="text-[11px] text-[#7C7772]">{label}</p>
      <p className="mt-1 text-[16px] font-medium text-[#2D2723]">{value}</p>
    </div>
  );
}