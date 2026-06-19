import { FiShoppingBag, FiStar, FiAward, FiClock, FiHeart, FiGift } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function MemberDashboard() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : {};

  // Mock member data for visual purpose
  const points = 1250;
  const tier = "Gold Member";
  
  return (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-[1020px]">
        {/* Welcome Banner */}
        <div 
          className="relative overflow-hidden rounded-[24px] p-8 md:p-12 mb-8"
          style={{ background: "linear-gradient(135deg, #1C1410 0%, #2A2019 100%)" }}
        >
          {/* Shimmer / Glow */}
          <div 
            className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full opacity-20 blur-[50px]"
            style={{ background: "#C7A765" }}
          />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
               <span className="inline-block px-3 py-1 mb-4 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1C1410] bg-[#C7A765]">
                 Exclusive Access
               </span>
               <h1 className="text-[32px] md:text-[42px] font-black leading-tight text-white mb-2">
                 Selamat Datang,<br/>
                 <span className="text-[#C7A765]">{user?.name || "Member"}</span>
               </h1>
               <p className="text-white/60 text-[14px] md:text-[16px] max-w-md">
                 Nikmati penawaran khusus, akses awal ke produk terbaru, dan kumpulkan poin setiap kali Anda berbelanja di Hejmana Boutique.
               </p>
            </div>
            
            {/* Tier Card */}
            <div className="w-full md:w-[320px] shrink-0 rounded-[20px] bg-white/5 border border-white/10 p-6 backdrop-blur-md text-center">
               <div className="flex justify-center mb-3">
                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A765]/20 text-[#C7A765] text-2xl">
                   <FiAward />
                 </div>
               </div>
               <h3 className="text-white font-bold text-[22px]">{tier}</h3>
               <p className="text-white/50 text-[12px] mb-4">Kumpulkan 750 poin lagi untuk Platinum</p>
               
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[#C7A765] w-[65%] rounded-full"></div>
               </div>
               
               <div className="flex justify-between items-center text-[13px] font-medium">
                  <span className="text-white/70">Total Poin:</span>
                  <span className="text-[#C7A765] text-[16px] font-bold">{points} pts</span>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {[
             { icon: <FiShoppingBag />, title: "Pesanan Saya", desc: "Lacak & riwayat belanja", color: "#C7A765", bg: "#FAF8F5" },
             { icon: <FiHeart />, title: "Wishlist", desc: "Koleksi impian Anda", color: "#E05252", bg: "#FFF5F5" },
             { icon: <FiGift />, title: "Voucher & Promo", desc: "Klaim diskon eksklusif", color: "#2E9B5F", bg: "#F0FDF4" },
           ].map((item, i) => (
             <Link to="#" key={i} className="group flex items-center gap-5 rounded-[20px] bg-white border border-[#E7E0D8] p-5 shadow-[0_8px_24px_rgba(45,39,35,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(45,39,35,0.08)]">
               <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-[20px] transition-transform group-hover:scale-110" style={{ backgroundColor: item.bg, color: item.color }}>
                 {item.icon}
               </div>
               <div>
                 <h4 className="font-bold text-[#2D2723] text-[15px]">{item.title}</h4>
                 <p className="text-[#8B7E76] text-[12px] mt-0.5">{item.desc}</p>
               </div>
             </Link>
           ))}
        </div>
        
        {/* Recent Activity */}
        <div className="rounded-[20px] bg-white border border-[#E7E0D8] p-8 shadow-[0_8px_24px_rgba(45,39,35,0.04)]">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-[18px] font-bold text-[#2D2723]">Aktivitas Terakhir</h3>
             <Link to="#" className="text-[13px] font-semibold text-[#C7A765] hover:text-[#9A7D46]">Lihat Semua</Link>
           </div>
           
           <div className="space-y-4">
              {[
                { title: "Pesanan #ORD-9921 dikirim", date: "Hari ini, 10:30 WIB", status: "success", icon: <FiShoppingBag /> },
                { title: "Mendapatkan 50 Poin dari pembelian", date: "Kemarin, 14:15 WIB", status: "info", icon: <FiStar /> },
                { title: "Promo Ulang Tahun ditambahkan", date: "3 hari yang lalu", status: "promo", icon: <FiGift /> },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-[16px] bg-[#FAF8F5] border border-[#F2ECE4]">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${act.status === 'success' ? 'bg-[#2E9B5F]' : act.status === 'info' ? 'bg-[#C7A765]' : 'bg-[#6D5DF6]'}`}>
                     {act.icon}
                  </div>
                  <div className="flex-1 pt-0.5">
                     <p className="font-semibold text-[#2D2723] text-[14px]">{act.title}</p>
                     <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#8B7E76]">
                        <FiClock />
                        <span>{act.date}</span>
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
        
      </div>
    </div>
  );
}
