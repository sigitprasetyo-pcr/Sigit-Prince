import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";

const boutiqueCustomers = [
  {
    id: "CST001",
    name: "Aulia Putri",
    email: "aulia@gmail.com",
    phone: "081234567891",
    city: "Pekanbaru",
    membership: "Gold Member",
    totalOrder: 12,
    totalSpend: 2450000,
    lastPurchase: "Dress Satin Premium",
  },
  {
    id: "CST002",
    name: "Nabila Zahra",
    email: "nabila@gmail.com",
    phone: "082233445566",
    city: "Bangkinang",
    membership: "Silver Member",
    totalOrder: 7,
    totalSpend: 1320000,
    lastPurchase: "Blouse Linen Casual",
  },
  {
    id: "CST003",
    name: "Citra Lestari",
    email: "citra@gmail.com",
    phone: "083344556677",
    city: "Dumai",
    membership: "Regular Member",
    totalOrder: 3,
    totalSpend: 640000,
    lastPurchase: "Rok Plisket Cream",
  },
  {
    id: "CST004",
    name: "Salsa Amelia",
    email: "salsa@gmail.com",
    phone: "081377889900",
    city: "Pekanbaru",
    membership: "Gold Member",
    totalOrder: 15,
    totalSpend: 3750000,
    lastPurchase: "Outer Rajut Premium",
  },
  {
    id: "CST005",
    name: "Maya Anggraini",
    email: "maya@gmail.com",
    phone: "085277889911",
    city: "Siak",
    membership: "Platinum Member",
    totalOrder: 20,
    totalSpend: 5200000,
    lastPurchase: "Tunik Elegant Brown",
  },
];

const membershipStyle = {
  "Regular Member": "bg-[#F3F0EC] text-[#7C5F46] border-[#E7E0D8]",
  "Silver Member": "bg-[#EEF2F6] text-[#667085] border-[#D7DEE8]",
  "Gold Member": "bg-[#FFF3DE] text-[#C47A24] border-[#F2D4A7]",
  "Platinum Member": "bg-[#EEE8FF] text-[#6D3FD1] border-[#D9CCFF]",
};

export default function ReactHooksBoutique() {
  // A. useState
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activityInfo, setActivityInfo] = useState(
    "Data customer belum dimuat."
  );

  // C. useRef
  const searchInputRef = useRef(null);
  const tableRef = useRef(null);

  // B. useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(boutiqueCustomers);
      setIsLoading(false);
    }, 700);

    searchInputRef.current?.focus();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (search === "" && membershipFilter === "Semua") {
      setActivityInfo("Menampilkan semua data customer boutique.");
    } else {
      setActivityInfo(
        `Filter aktif: pencarian "${search || "-"}" dan membership "${membershipFilter}".`
      );
    }
  }, [search, membershipFilter]);

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.city.toLowerCase().includes(keyword) ||
      customer.membership.toLowerCase().includes(keyword) ||
      customer.lastPurchase.toLowerCase().includes(keyword);

    const matchMembership =
      membershipFilter === "Semua" ||
      customer.membership === membershipFilter;

    return matchSearch && matchMembership;
  });

  const totalOmzet = filteredCustomers.reduce(
    (total, customer) => total + customer.totalSpend,
    0
  );

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleReset = () => {
    setSearch("");
    setMembershipFilter("Semua");
    setSelectedCustomer(null);
    searchInputRef.current?.focus();
  };

  const handleScrollToTable = () => {
    tableRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Pertemuan 12 / React Hooks"
        title="React Hooks pada Project CRM Boutique"
        description="Penerapan useState, useEffect, dan useRef pada fitur customer management CRM Boutique."
      />

      <div className="rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#A98467]">
          Framework Lanjutan
        </p>

        <h1 className="mt-3 font-display text-[28px] text-[#2D2723]">
          Implementasi React Hooks pada CRM Boutique
        </h1>

        <p className="mt-3 max-w-4xl text-[13px] leading-6 text-[#7C7772]">
          Halaman ini dibuat untuk memenuhi tugas React Hooks. Studi kasus yang
          digunakan adalah pengelolaan data customer boutique, mulai dari
          pencarian customer, filter membership, load data otomatis, detail
          customer, auto focus input, dan scroll ke tabel.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <HookCard
            title="A. useState"
            subtitle="Search, Filter, Detail"
            color="bg-[#4A382E]"
            description="useState digunakan untuk menyimpan data customer, pencarian, filter membership, loading, dan customer yang dipilih."
          />

          <HookCard
            title="B. useEffect"
            subtitle="Load Data Otomatis"
            color="bg-[#244B35]"
            description="useEffect digunakan untuk memuat data saat halaman dibuka dan memperbarui status ketika search atau filter berubah."
          />

          <HookCard
            title="C. useRef"
            subtitle="Auto Focus dan Scroll"
            color="bg-[#5A4820]"
            description="useRef digunakan untuk membuat input pencarian langsung aktif dan mengarahkan halaman ke tabel customer."
          />
        </div>
      </div>

      <div className="mt-6 rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#A98467]">
              Implementasi CRM
            </p>

            <h2 className="mt-2 text-[22px] font-medium text-[#2D2723]">
              Data Customer Boutique
            </h2>

            <p className="mt-1 text-[12px] text-[#7C7772]">
              Fitur ini menjadi bukti penerapan useState, useEffect, dan useRef
              pada project CRM Boutique.
            </p>
          </div>

          <button
            type="button"
            onClick={handleScrollToTable}
            className="rounded-[10px] bg-[#3A2619] px-5 py-3 text-[12px] text-white shadow-[0_8px_18px_rgba(45,39,35,0.14)] transition hover:bg-[#4A3020]"
          >
            Lihat Tabel Customer
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard title="Total Customer" value={customers.length} />
          <SummaryCard title="Data Tampil" value={filteredCustomers.length} />
          <SummaryCard title="Total Omzet" value={formatRupiah(totalOmzet)} />
        </div>

        <div className="mt-6 rounded-[16px] border border-[#E7E0D8] bg-[#FAF9F7] p-4">
          <p className="text-[12px] text-[#7C7772]">
            <span className="font-medium text-[#2D2723]">
              Status useEffect:
            </span>{" "}
            {activityInfo}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px_120px]">
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama, email, kota, atau produk..."
            className="rounded-[12px] border border-[#E6DED6] bg-[#FAF9F7] px-4 py-3 text-[12px] text-[#2D2723] outline-none transition placeholder:text-[#B2A397] focus:border-[#C09B7D] focus:bg-white"
          />

          <select
            value={membershipFilter}
            onChange={(event) => setMembershipFilter(event.target.value)}
            className="rounded-[12px] border border-[#E6DED6] bg-[#FAF9F7] px-4 py-3 text-[12px] text-[#2D2723] outline-none transition focus:border-[#C09B7D] focus:bg-white"
          >
            <option value="Semua">Semua Member</option>
            <option value="Regular Member">Regular Member</option>
            <option value="Silver Member">Silver Member</option>
            <option value="Gold Member">Gold Member</option>
            <option value="Platinum Member">Platinum Member</option>
          </select>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-[12px] border border-[#D8C8BA] px-4 py-3 text-[12px] text-[#7A5C45] transition hover:bg-[#F4EFEA]"
          >
            Reset
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {[
            "Regular Member",
            "Silver Member",
            "Gold Member",
            "Platinum Member",
          ].map((member) => (
            <span
              key={member}
              className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.12em] ${
                membershipStyle[member]
              }`}
            >
              {member}
            </span>
          ))}
        </div>

        {selectedCustomer && (
          <div className="mt-6 rounded-[18px] border border-[#E7E0D8] bg-[#FAF9F7] p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A98467]">
              Customer Dipilih
            </p>

            <h3 className="mt-2 text-[22px] font-medium text-[#2D2723]">
              {selectedCustomer.name}
            </h3>

            <p className="mt-2 text-[13px] leading-6 text-[#7C7772]">
              {selectedCustomer.name} adalah customer dengan membership{" "}
              <span className="font-medium text-[#C47A24]">
                {selectedCustomer.membership}
              </span>
              . Customer ini terakhir membeli{" "}
              <span className="font-medium text-[#C47A24]">
                {selectedCustomer.lastPurchase}
              </span>{" "}
              dengan total belanja{" "}
              <span className="font-medium text-[#C47A24]">
                {formatRupiah(selectedCustomer.totalSpend)}
              </span>
              .
            </p>
          </div>
        )}

        <div
          ref={tableRef}
          className="mt-6 overflow-hidden rounded-[18px] border border-[#E7E0D8]"
        >
          <table className="w-full min-w-[900px] text-left text-[12px]">
            <thead className="bg-[#F4EFEA] text-[#5E5148]">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Kota</th>
                <th className="px-5 py-4">Membership</th>
                <th className="px-5 py-4">Order</th>
                <th className="px-5 py-4">Total Belanja</th>
                <th className="px-5 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-8 text-center text-[#8B7B6D]"
                  >
                    Memuat data customer boutique...
                  </td>
                </tr>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t border-[#EEE7DF] text-[#2D2723] transition hover:bg-[#FBFAF8]"
                  >
                    <td className="px-5 py-4 font-medium">{customer.id}</td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-[11px] text-[#8B7B6D]">
                        {customer.email}
                      </p>
                      <p className="text-[11px] text-[#8B7B6D]">
                        {customer.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4">{customer.city}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] ${
                          membershipStyle[customer.membership]
                        }`}
                      >
                        {customer.membership}
                      </span>
                    </td>

                    <td className="px-5 py-4">{customer.totalOrder}</td>

                    <td className="px-5 py-4 font-medium text-[#3A2619]">
                      {formatRupiah(customer.totalSpend)}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(customer)}
                        className="rounded-[10px] bg-[#C09B7D] px-4 py-2 text-[11px] text-white transition hover:bg-[#A78368]"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-8 text-center text-[#8B7B6D]"
                  >
                    Data customer tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-[22px] border border-[#E7E0D8] bg-white p-6 shadow-[0_12px_30px_rgba(45,39,35,0.07)]">
        <h2 className="text-[22px] font-medium text-[#2D2723]">
          Jawaban 5W + 1H
        </h2>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <AnswerCard
            title="A. useState"
            color="bg-[#4A382E]"
            items={[
              ["What", "useState digunakan untuk menyimpan data yang dapat berubah pada halaman CRM Boutique."],
              ["Why", "useState diperlukan agar search, filter, loading, dan detail customer dapat mengubah tampilan secara langsung."],
              ["Who", "Fitur ini digunakan oleh admin CRM Boutique."],
              ["When", "State berubah saat admin mengetik pencarian, memilih filter membership, menekan reset, atau klik detail."],
              ["Where", "useState digunakan pada halaman React Hooks Boutique bagian customer management."],
              ["How", "Nilai input disimpan melalui setSearch, setMembershipFilter, dan setSelectedCustomer. Setelah state berubah, React memperbarui tampilan."],
            ]}
          />

          <AnswerCard
            title="B. useEffect"
            color="bg-[#244B35]"
            items={[
              ["What", "useEffect digunakan untuk menjalankan proses otomatis setelah halaman ditampilkan."],
              ["Why", "useEffect diperlukan agar data customer dapat dimuat otomatis tanpa menekan tombol."],
              ["Who", "Admin CRM Boutique terbantu karena data langsung muncul saat halaman dibuka."],
              ["When", "useEffect dijalankan saat halaman pertama kali dibuka dan saat nilai search atau filter berubah."],
              ["Where", "useEffect digunakan pada file ReactHooksBoutique.jsx bagian load data dan status filter."],
              ["How", "Dependency array [] membuat proses load data berjalan satu kali, sedangkan [search, membershipFilter] berjalan saat nilai pencarian atau filter berubah."],
            ]}
          />

          <AnswerCard
            title="C. useRef"
            color="bg-[#5A4820]"
            items={[
              ["What", "useRef digunakan untuk mengakses elemen input dan tabel tanpa menyebabkan render ulang."],
              ["Why", "useRef digunakan karena fitur auto focus dan scroll tidak perlu memakai useState."],
              ["Who", "Admin CRM Boutique terbantu karena bisa langsung mengetik pada kolom pencarian."],
              ["When", "useRef digunakan saat halaman dibuka, tombol reset ditekan, dan tombol lihat tabel diklik."],
              ["Where", "useRef diterapkan pada input search dan area tabel customer."],
              ["How", "searchInputRef.current.focus() membuat input aktif, sedangkan tableRef.current.scrollIntoView() mengarahkan halaman ke tabel customer."],
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function HookCard({ title, subtitle, description, color }) {
  return (
    <div className="rounded-[18px] border border-[#E7E0D8] bg-white p-5">
      <div className={`mb-4 rounded-[10px] px-4 py-2 text-white ${color}`}>
        {title}
      </div>

      <h2 className="text-[17px] font-medium text-[#2D2723]">{subtitle}</h2>

      <p className="mt-2 text-[12px] leading-6 text-[#7C7772]">
        {description}
      </p>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-[16px] border border-[#E7E0D8] bg-[#FAF9F7] p-5">
      <p className="text-[11px] text-[#7C7772]">{title}</p>
      <h3 className="mt-2 text-[24px] font-semibold text-[#2D2723]">
        {value}
      </h3>
    </div>
  );
}

function AnswerCard({ title, color, items }) {
  return (
    <div className="rounded-[18px] border border-[#E7E0D8] bg-[#FAF9F7] p-5">
      <h3 className={`rounded-[10px] px-4 py-2 text-white ${color}`}>
        {title}
      </h3>

      <div className="mt-4 space-y-3 text-[12px] leading-6 text-[#5E5148]">
        {items.map(([label, value]) => (
          <p key={label}>
            <b>{label}:</b> {value}
          </p>
        ))}
      </div>
    </div>
  );
}