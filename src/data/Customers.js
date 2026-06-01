const names = [
  "Amanda Putri",
  "Salsabila Rahma",
  "Nabila Azzahra",
  "Rani Oktavia",
  "Dewi Lestari",
  "Laras Safitri",
  "Maya Anggraini",
  "Citra Permata",
  "Alya Zahra",
  "Intan Maharani",
  "Rizky Pratama",
  "Fajar Nugraha",
  "Andi Saputra",
  "Dimas Ramadhan",
  "Bayu Wijaya",
  "Raka Maulana",
  "Yoga Pranata",
  "Ilham Fauzi",
  "Reza Firmansyah",
  "Rafi Alfarizi",
];

const cities = [
  "Pekanbaru, Riau",
  "Bangkinang, Riau",
  "Dumai, Riau",
  "Siak, Riau",
  "Rengat, Riau",
  "Tembilahan, Riau",
  "Duri, Riau",
  "Payakumbuh, Sumatera Barat",
];

const streets = [
  "Melati",
  "Mawar",
  "Anggrek",
  "Cempaka",
  "Kenanga",
  "Sudirman",
  "Hangtuah",
  "Garuda",
];

const products = [
  "Dress Floral",
  "Blouse Satin",
  "Outer Linen",
  "Rok Plisket",
  "Hijab Voal",
  "Tas Mini",
  "Kulot Premium",
  "Kemeja Wanita",
];

const purchaseHistory = [
  "Dress Floral, Hijab Voal",
  "Blouse Satin, Rok Plisket",
  "Outer Linen, Tas Mini",
  "Dress Casual, Scarf",
  "Kemeja Wanita, Kulot",
  "Hijab Premium, Bros",
];

const campaigns = [
  "Promo Lebaran",
  "New Arrival",
  "Diskon Akhir Bulan",
  "Member Day",
  "Flash Sale Boutique",
];

const chatOptions = [
  "Tanya ukuran dress",
  "Tanya stok blouse",
  "Tanya ongkir",
  "Tanya bahan outer",
  "Tanya promo new arrival",
  "Konfirmasi pembayaran",
];

const complaintOptions = [
  "Tidak ada komplain",
  "Ukuran tidak sesuai",
  "Barang terlambat",
  "Warna berbeda",
  "Stok habis setelah checkout",
  "Respon admin lambat",
];

const feedbackOptions = [
  "Produk bagus dan nyaman",
  "Bahan sesuai deskripsi",
  "Pengiriman cukup cepat",
  "Model baju elegan",
  "Admin ramah",
  "Perlu variasi ukuran lebih banyak",
];

const adminNotes = [
  "Suka warna pastel",
  "Sering beli dress",
  "Lebih suka ukuran M",
  "Tertarik promo bulanan",
  "Sering checkout malam hari",
  "Suka produk new arrival",
];

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const getDateText = (index, year = 2026) => {
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

const getTier = (index) => {
  const tiers = [
    "Regular Member",
    "Silver Member",
    "Gold Member",
    "Platinum Member",
  ];

  return tiers[index % tiers.length];
};

const customers = Array.from({ length: 800 }, (_, index) => {
  const number = index + 1;
  const customerId = `CUS${String(number).padStart(3, "0")}`;
  const name = names[index % names.length];
  const username =
    name.toLowerCase().replaceAll(" ", "") + String(number).padStart(3, "0");

  const tier = getTier(index);
  const isMember = tier !== "Regular Member";
  const totalOrders = ((number * 3) % 10) + 1;
  const totalSpend = totalOrders * (175000 + (index % 7) * 35000);
  const product = products[index % products.length];
  const city = cities[index % cities.length];

  return {
    id: customerId,

    idCustomer: customerId,
    namaLengkap: name,
    username: username,
    jenisKelamin: index % 5 < 3 ? "Perempuan" : "Laki-laki",
    tanggalLahir: getDateText(index, 1997 + (index % 10)),

    nomorHp: `08${(1000000000 + number * 7919).toString().slice(0, 10)}`,
    email: `${username}@gmail.com`,
    alamat: `Jl. ${streets[index % streets.length]} No. ${
      (index % 120) + 1
    }`,
    kotaProvinsi: city,
    mediaSosial: `@${username}`,

    tanggalDaftar: getDateText(index, 2024 + (index % 3)),
    statusMember: isMember ? "Member" : "Non Member",
    levelMembership: isMember ? tier.replace(" Member", "") : "-",
    referralCode: isMember ? `REF${String(number).padStart(3, "0")}` : "-",
    statusAktif: index % 7 === 0 ? "Tidak Aktif" : "Aktif",

    chatCustomerService: chatOptions[index % chatOptions.length],
    riwayatKomplain: complaintOptions[index % complaintOptions.length],
    feedbackReview: feedbackOptions[index % feedbackOptions.length],
    catatanAdmin: adminNotes[index % adminNotes.length],

    riwayatPembelian: purchaseHistory[index % purchaseHistory.length],
    totalTransaksi: totalOrders,
    metodePembayaran: ["Transfer Bank", "QRIS", "COD", "E-Wallet"][index % 4],
    produkItemDibeli: product,
    tanggalTransaksiTerakhir: getDateText(index, 2026),

    loginTerakhir: getDateText(index + 3, 2026),
    deviceDigunakan: ["Android", "iPhone", "Laptop"][index % 3],
    aktivitasDalamAplikasi: [
      "Melihat katalog",
      "Tambah ke wishlist",
      "Checkout produk",
      "Melihat promo",
      "Menghubungi customer service",
    ][index % 5],

    sumberUser: ["Instagram", "TikTok", "WhatsApp", "Referral"][index % 4],
    campaignDiikuti: campaigns[index % campaigns.length],
    emailSmsSubscription: index % 2 === 0 ? "Ya" : "Tidak",
    statusPromo: ["Sudah Klaim", "Belum Klaim", "Tidak Ada Promo"][index % 3],

    name: name,
    phone: `08${(1000000000 + number * 7919).toString().slice(0, 10)}`,
    tier: tier,
    spend: formatRupiah(totalSpend),
    totalOrders: totalOrders,
    favorite: product,
    lastOrder: getDateText(index, 2026),
    address: city,
    image: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
  };
});

export default customers;