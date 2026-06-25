import React, { useState } from "react";
import { 
  FiShoppingBag, 
  FiStar, 
  FiAward, 
  FiClock, 
  FiHeart, 
  FiGift, 
  FiX, 
  FiCopy, 
  FiCheck, 
  FiTruck,
  FiArrowRight
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : {};

  // State to control modal display
  const [activeModal, setActiveModal] = useState(null); // 'orders' | 'wishlist' | 'vouchers' | null
  const [copiedVoucher, setCopiedVoucher] = useState(null);

  // Mock member data for visual purpose
  const points = 1250;
  const tier = "Gold Member";

  // Mock Order Data
  const orders = [
    { id: "ORD-9921", item: "Celeste Blouse", category: "Tops", price: 329000, date: "25 Juni 2026, 10:30 WIB", status: "Dikirim", courier: "J&T Express (JT12938129381)", image: "https://images.unsplash.com/photo-1534126511673-b6899657816a?w=400&auto=format&fit=crop&q=80" },
    { id: "ORD-9918", item: "Amara Linen Dress", category: "Dress", price: 549000, date: "18 Juni 2026, 14:15 WIB", status: "Selesai", courier: "JNE Reguler (JN88129302912)", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80" }
  ];

  // Mock Wishlist Data
  const wishlistItems = [
    { id: 5, name: "Aurora Satin Dress", category: "Dress", price: 629000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=80" },
    { id: 7, name: "Luna Shoulder Bag", category: "Accessories", price: 449000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80" }
  ];

  // Mock Vouchers
  const vouchers = [
    { code: "AURELIA20", desc: "Diskon 20% khusus Koleksi Terbatas New Season 2026", type: "Diskon 20%" },
    { code: "MEMBERGOLD", desc: "Diskon Tambahan 10% eksklusif bagi pemilik Gold Member Tier", type: "Diskon 10%" },
    { code: "FREEONG500", desc: "Gratis ongkir ke seluruh Indonesia dengan minimal belanja Rp500.000", type: "Gratis Ongkir" }
  ];

  const handleCopyVoucher = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(code);
    setTimeout(() => {
      setCopiedVoucher(null);
    }, 2000);
  };

  return (
    <div className="py-12 px-6 bg-[#FFF9F3] min-h-screen text-[#222222]">
      <div className="mx-auto max-w-[1020px]">
        
        {/* Welcome Banner */}
        <div 
          className="relative overflow-hidden rounded-[32px] p-8 md:p-12 mb-8 shadow-xl border border-white/10"
          style={{ background: "linear-gradient(135deg, #7A2E3A 0%, #4D1821 100%)" }} // Burgundy Gradient
        >
          {/* Shimmer / Glow */}
          <div 
            className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[50px]"
            style={{ background: "#C5A46D" }} // Soft Gold Glow
          />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
               <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#7A2E3A] bg-[#C5A46D]">
                 Exclusive Access
               </span>
               <h1 className="font-display text-[32px] md:text-[42px] font-bold leading-tight text-white mb-2">
                 Selamat Datang,<br/>
                 <span className="text-[#C5A46D]">{user?.name || "Member"}</span>
               </h1>
               <p className="font-body text-white/70 text-sm md:text-base max-w-md leading-relaxed">
                 Nikmati penawaran khusus, akses awal ke produk terbaru, dan kumpulkan poin setiap kali Anda berbelanja di Aurelia Boutique.
               </p>
            </div>
            
            {/* Tier Card */}
            <div className="w-full lg:w-[320px] shrink-0 rounded-[24px] bg-white/5 border border-white/10 p-6 backdrop-blur-md text-center">
               <div className="flex justify-center mb-3">
                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A46D]/20 text-[#C5A46D] text-2xl shadow-inner">
                   <FiAward />
                 </div>
               </div>
               <h3 className="font-display text-white font-bold text-[22px]">{tier}</h3>
               <p className="font-body text-white/50 text-[11px] mb-4">Kumpulkan 750 poin lagi untuk Platinum</p>
               
               <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                   <div className="h-full bg-[#C5A46D] w-[65%] rounded-full"></div>
               </div>
               
               <div className="flex justify-between items-center text-[13px] font-medium font-body">
                   <span className="text-white/70">Total Poin:</span>
                   <span className="text-[#C5A46D] text-[16px] font-bold">{points} pts</span>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { id: "orders", icon: <FiShoppingBag />, title: "Pesanan Saya", desc: "Lacak & riwayat belanja", color: "#7A2E3A", bg: "#FFF2F4" },
            { id: "wishlist", icon: <FiHeart />, title: "Wishlist", desc: "Koleksi impian Anda", color: "#C98F8F", bg: "#FFF5F5" },
            { id: "vouchers", icon: <FiGift />, title: "Voucher & Promo", desc: "Klaim diskon eksklusif", color: "#C5A46D", bg: "#FFFCEB" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className="group flex items-center gap-5 rounded-[24px] bg-white border border-[#EEE7DF] p-5 shadow-[0_8px_24px_rgba(122,46,58,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(122,46,58,0.07)] text-left cursor-pointer"
            >
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-[20px] transition-transform duration-300 group-hover:scale-110 shadow-sm border border-black/[0.02]" 
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="font-display font-bold text-[#222222] text-[15px]">{item.title}</h4>
                <p className="font-body text-muted text-[12px] mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
        
        {/* Recent Activity */}
        <div className="rounded-[28px] bg-white border border-[#EEE7DF] p-6 sm:p-8 shadow-[0_8px_30px_rgba(122,46,58,0.02)]">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-display text-[18px] font-bold text-[#222222]">Aktivitas Terakhir</h3>
             <button 
               onClick={() => setActiveModal("orders")}
               className="font-body text-[13px] font-semibold text-burgundy hover:text-burgundy/80 underline underline-offset-4"
             >
               Lihat Semua
             </button>
           </div>
           
           <div className="space-y-4">
              {[
                { title: "Pesanan #ORD-9921 sedang dikirim", date: "Hari ini, 10:30 WIB", status: "success", icon: <FiTruck /> },
                { title: "Mendapatkan 50 Poin dari pembelian", date: "Kemarin, 14:15 WIB", status: "info", icon: <FiStar /> },
                { title: "Promo Ulang Tahun ditambahkan", date: "3 hari yang lalu", status: "promo", icon: <FiGift /> },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-[18px] bg-[#FFF9F3]/60 border border-[#EEE7DF]/50">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
                    act.status === 'success' ? 'bg-[#7A2E3A]' : act.status === 'info' ? 'bg-[#C5A46D]' : 'bg-[#C98F8F]'
                  }`}>
                     {act.icon}
                  </div>
                  <div className="flex-1 pt-0.5 font-body">
                     <p className="font-semibold text-charcoal text-[14px]">{act.title}</p>
                     <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted">
                        <FiClock />
                        <span>{act.date}</span>
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
        
      </div>

      {/* ========================================================
          MODAL DRAWER: PESANAN SAYA
      ======================================================== */}
      {activeModal === "orders" && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl border border-soft-grey flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-soft-grey flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-burgundy" size={20} />
                <h3 className="font-display text-lg font-bold text-charcoal">Daftar Pesanan Saya</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-soft-grey p-2 rounded-full text-charcoal hover:bg-burgundy hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-soft-grey rounded-[24px] p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-soft-grey pb-3">
                    <div>
                      <span className="text-[10px] text-muted uppercase font-bold tracking-wider">No. Pesanan</span>
                      <p className="font-display font-bold text-charcoal text-sm">{order.id}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Tanggal Transaksi</span>
                      <p className="font-body text-xs text-charcoal">{order.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <img src={order.image} alt={order.item} className="w-14 h-18 object-cover rounded-lg bg-soft-grey" />
                    <div className="flex-grow">
                      <span className="text-[10px] text-soft-gold font-bold uppercase tracking-wider block">{order.category}</span>
                      <h4 className="font-display font-bold text-charcoal text-base">{order.item}</h4>
                      <p className="font-body text-xs text-burgundy font-semibold">Rp {order.price.toLocaleString("id-ID")}</p>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${
                        order.status === "Dikirim" ? "bg-burgundy" : "bg-green-600"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-[#FFF9F3] p-3.5 rounded-xl flex items-center gap-2 border border-soft-gold/20 text-xs">
                    <FiTruck className="text-soft-gold shrink-0" size={16} />
                    <p className="text-charcoal font-body leading-relaxed">
                      <span className="font-bold">Kurir Pengiriman:</span> {order.courier}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL DRAWER: WISHLIST
      ======================================================== */}
      {activeModal === "wishlist" && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl border border-soft-grey flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-soft-grey flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiHeart className="text-burgundy" size={20} />
                <h3 className="font-display text-lg font-bold text-charcoal">Koleksi Wishlist Saya</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-soft-grey p-2 rounded-full text-charcoal hover:bg-burgundy hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12 text-muted">
                  <FiHeart size={40} className="mx-auto mb-3 text-soft-grey" />
                  <p className="font-display text-sm font-semibold">Wishlist Kosong</p>
                  <p className="font-body text-xs mt-1">Belum ada koleksi impian yang Anda tambahkan.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border border-soft-grey rounded-2xl p-4 hover:shadow-md transition">
                      <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-lg bg-soft-grey" />
                      <div className="flex-grow">
                        <span className="text-[9px] text-soft-gold font-bold uppercase tracking-wider block">{item.category}</span>
                        <h4 className="font-display font-bold text-charcoal text-sm">{item.name}</h4>
                        <p className="font-body text-xs text-burgundy font-semibold">Rp {item.price.toLocaleString("id-ID")}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveModal(null);
                          navigate("/");
                          setTimeout(() => {
                            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                          }, 300);
                        }}
                        className="bg-burgundy hover:bg-burgundy/90 text-white font-medium text-xs px-4 py-2.5 rounded-full transition flex items-center gap-1.5"
                      >
                        <span>Beli</span>
                        <FiArrowRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL DRAWER: VOUCHER & PROMO
      ======================================================== */}
      {activeModal === "vouchers" && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl border border-soft-grey flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-soft-grey flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiGift className="text-burgundy" size={20} />
                <h3 className="font-display text-lg font-bold text-charcoal">Klaim Voucher Diskon</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-soft-grey p-2 rounded-full text-charcoal hover:bg-burgundy hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              {vouchers.map((voucher) => {
                const isCopied = copiedVoucher === voucher.code;
                return (
                  <div key={voucher.code} className="border border-soft-gold/30 bg-[#FFFCEB] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#7A2E3A] text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {voucher.type}
                        </span>
                        <span className="font-display text-sm font-bold text-charcoal tracking-wide">
                          {voucher.code}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted leading-relaxed">
                        {voucher.desc}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleCopyVoucher(voucher.code)}
                      className={`w-full sm:w-auto font-body text-xs font-semibold py-2.5 px-4 rounded-full transition flex items-center justify-center gap-1.5 select-none shrink-0 ${
                        isCopied 
                          ? "bg-green-600 text-white" 
                          : "bg-burgundy text-white hover:bg-burgundy/90 shadow-md"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <FiCheck size={14} />
                          <span>Disalin</span>
                        </>
                      ) : (
                        <>
                          <FiCopy size={14} />
                          <span>Salin Kode</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
