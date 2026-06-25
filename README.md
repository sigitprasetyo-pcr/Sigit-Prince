# Aurelia Boutique Landing Page

Aurelia Boutique adalah landing page premium, elegan, dan modern untuk toko butik fashion wanita. Proyek ini dibangun sebagai aplikasi frontend mandiri yang responsif dengan performa tinggi.

Desain visual website ini mengusung karakter feminin yang bersih dan eksklusif dengan palet warna terkurasi (Ivory, Burgundy, Soft Gold, Dusty Rose, dan Charcoal) serta menggunakan Google Fonts (Playfair Display & Inter) untuk memberikan kesan mewah.

---

## 🚀 Fitur Utama & Alur AIDA

Website ini dirancang secara sistematis mengikuti konsep alur pemasaran **AIDA** (Attention, Interest, Desire, Action):

1. **Attention (Perhatian)**:
   - **Announcement Bar**: Informasi promo gratis ongkir dengan background Burgundy yang kontras.
   - **Sticky Navigation Bar**: Header transparan yang berubah menjadi solid dengan soft shadow saat di-scroll. Memiliki menu mobile hamburger yang fungsional.
   - **Hero Section**: Penawaran utama yang menarik disertai model fashion premium dan floating card promosi dengan efek blur kaca (*glassmorphism*).

2. **Interest (Minat)**:
   - **Brand Trust Strip**: 4 pilar kepercayaan (Pelanggan puas, Pengiriman nasional, Kurasi premium, dan Keamanan pembayaran) dengan ikon modern.
   - **Category Section**: Kurasi kategori visual (Dress, Outerwear, Tops, Accessories) yang responsif dengan efek zoom dan overlay saat di-hover. Klik kategori akan otomatis menyaring daftar produk dan scroll ke section terkait.

3. **Desire (Keinginan)**:
   - **New Arrivals / Featured Products**: Grid 8 produk fashion berkualitas tinggi dengan gambar model asli (bukan icon/emoji). Dilengkapi dengan filter interaktif, rating bintang, diskon harga, status badge ("New" / "Sale"), tombol wishlist interaktif, dan tombol penambahan keranjang.
   - **Benefits Section**: 4 alasan keunggulan material, eksklusivitas desain, kecepatan kirim, dan personal service.
   - **Promo Banner**: Banner promosi eksklusif diskon hingga 20% dengan tombol interaktif untuk menyalin kode voucher `AURELIA20` langsung ke clipboard.
   - **Brand Story (About)**: Narasi filosofi Aurelia Boutique dilengkapi statistik pencapaian butik.
   - **Testimonial Section**: Grid ulasan dari pelanggan di berbagai kota beserta inisial avatar dan bintang rating 5.
   - **Instagram Lookbook**: Grid 6 foto inspirasi fashion bergaya feed Instagram dengan interaksi overlay "Lihat Postingan".
   - **FAQ Section**: Accordion tanya jawab interaktif yang dapat diakses dengan keyboard (Aksesibilitas ramah).

4. **Action (Tindakan)**:
   - **Final CTA**: Penutup visual dengan ajakan belanja dan tautan konsultasi WhatsApp instan.
   - **Newsletter**: Form pendaftaran email dengan validasi input (tidak boleh kosong & format harus benar) serta menampilkan pesan sukses bergabung secara dinamis.
   - **Footer**: Navigasi lengkap yang tersusun vertikal pada mobile, dilengkapi informasi alamat, kontak, jam operasional, dan link media sosial.

---

## 🛠️ Teknologi yang Digunakan

- **React** (v19) - Library UI
- **Vite** (v7) - Bundler & Dev Server
- **Tailwind CSS** (v4) - Framework styling modern menggunakan CSS-first theme configuration
- **Lucide React** (Terbaru) - Set ikon minimalis & modern
- **React Icons** (v5) - Ikon tambahan untuk media sosial
- **SweetAlert2** / Local State - Notifikasi & Interaksi

---

## ⚙️ Cara Instalasi & Menjalankan Proyek

### 1. Prasyarat
Pastikan Anda sudah menginstal Node.js di komputer Anda.

### 2. Instalasi Dependensi
Jalankan perintah berikut di terminal pada direktori proyek untuk menginstal semua package yang diperlukan:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Lokal)
Jalankan dev server dengan perintah:
```bash
npm run dev
```
Buka browser Anda dan akses `http://localhost:5173` (atau port lain yang tertera di terminal) untuk melihat website.

### 4. Melakukan Build untuk Produksi
Gunakan perintah berikut untuk menguji build dan menghasilkan file siap sebar di folder `/dist`:
```bash
npm run build
```

---

## 📁 Struktur Folder Utama

```
src/
├── assets/
│   └── tailwind.css         # Konfigurasi Font Google, Variabel Tema Tailwind v4, & Global CSS
├── components/
│   ├── AnnouncementBar.jsx  # Baris informasi promo paling atas
│   ├── Navbar.jsx           # Navigasi sticky & hamburger menu responsif
│   ├── HeroSection.jsx      # Header banner utama dengan model & floating card
│   ├── BrandTrustStrip.jsx  # Poin kepercayaan pelanggan
│   ├── CategorySection.jsx  # Galeri 4 kategori fashion utama
│   ├── ProductSection.jsx   # Grid produk dengan filter, rating, wishlist & cart callback
│   ├── BenefitsSection.jsx  # 4 pilar mengapa memilih Aurelia
│   ├── PromoBanner.jsx      # Banner promo besar & salin kode voucher
│   ├── AboutSection.jsx     # Cerita brand & statistik
│   ├── TestimonialSection.jsx# Ulasan/review pembeli
│   ├── InstagramSection.jsx # Grid inspirasi fashion lookbook
│   ├── FAQSection.jsx       # Accordion pertanyaan sering diajukan
│   ├── FinalCTA.jsx         # Section CTA sebelum footer (WhatsApp & Belanja)
│   ├── NewsletterSection.jsx# Form subskripsi email interaktif
│   └── Footer.jsx           # Navigasi akhir & kontak informasi
├── data/
│   └── products.js          # Database dummy berisi 8 data produk fashion pilihan
├── pages/
│   └── LandingPage.jsx      # Halaman utama orchestrator penampung state (keranjang & search)
├── App.jsx                  # Root router & layout wrapper
└── main.jsx                 # Entry point aplikasi React
```

---

## 📝 Catatan Data Dummy

Proyek landing page **Aurelia Boutique** ini bersifat client-side murni:
- Semua data produk pada `src/data/products.js` menggunakan data dummy dengan gambar beresolusi tinggi langsung dari Unsplash.
- Fitur "Tambah ke Tas" dan "Wishlist" beroperasi menggunakan state React lokal (tidak disimpan ke database permanen). Badge keranjang belanja akan kembali ke angka `0` jika halaman direfresh.
- Form Newsletter memvalidasi keabsahan email secara lokal dan tidak mengirimkan data ke database eksternal.
