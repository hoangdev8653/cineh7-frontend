import { User, Mail, Phone, MapPin, Calendar, CreditCard, Shield, LogOut, ChevronRight, Settings, Ticket } from 'lucide-react';

function Profile() {
    const user = {
        name: "Hoàng Dev",
        email: "hoangdev8653@gmail.com",
        phone: "0987 654 321",
        rank: "Gold Member",
        points: 2450,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    const bookings = [
        {
            id: "#BH-92831",
            movie: "Captain Marvel",
            date: "23/02/2026",
            theater: "CineH7 Trần Hưng Đạo",
            status: "Sắp tới",
            total: "198,000đ"
        },
        {
            id: "#BH-92830",
            movie: "Avengers: Endgame",
            date: "20/02/2026",
            theater: "CineH7 Hai Bà Trưng",
            status: "Hoàn tất",
            total: "250,000đ"
        },
        {
            id: "#BH-92829",
            movie: "Spider-Man: No Way Home",
            date: "15/02/2026",
            theater: "CineH7 Võ Văn Tần",
            status: "Hoàn tất",
            total: "180,000đ"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-800">
            {/* Profile Header Background */}
            <div className="h-48 bg-slate-900 w-full relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500 via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-32 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Sidebar Info */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                            <div className="p-8 flex flex-col items-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-green-400 to-blue-500 shadow-xl shadow-green-500/20">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover rounded-full border-4 border-white"
                                        />
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-green-500 hover:scale-110 transition-transform cursor-pointer">
                                        <Settings size={16} />
                                    </div>
                                </div>

                                <h1 className="text-2xl font-black text-slate-900 mb-1">{user.name}</h1>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{user.rank}</p>

                                {/* Points Card */}
                                <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between group hover:border-green-500 transition-colors">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Điểm tích lũy</p>
                                        <p className="text-2xl font-black text-slate-900">{user.points.toLocaleString()} <span className="text-xs text-green-500">Pts</span></p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                                        <CreditCard size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Sidebar */}
                            <div className="border-t border-slate-50 p-4 space-y-1">
                                {[
                                    { icon: User, label: "Thông tin cá nhân", active: true },
                                    { icon: Calendar, label: "Lịch sử đặt vé", active: false },
                                    { icon: CreditCard, label: "Thẻ thành viên", active: false },
                                    { icon: Shield, label: "Bảo mật & Đổi mật khẩu", active: false },
                                    { icon: LogOut, label: "Đăng xuất", active: false, danger: true }
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${item.active
                                            ? 'bg-green-50 text-green-600'
                                            : item.danger
                                                ? 'text-red-500 hover:bg-red-50'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon size={20} className={item.active ? "text-green-500" : "text-slate-400"} />
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                        </div>
                                        <ChevronRight size={16} className={item.active ? "text-green-500" : "text-slate-300"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Personal Info Section */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-10">
                                <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Thông tin cá nhân</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Họ và tên</label>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                        <User size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                        <input type="text" defaultValue={user.name} className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                        <Mail size={18} className="text-slate-400" />
                                        <input type="email" defaultValue={user.email} disabled className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-400 cursor-not-allowed" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Số điện thoại</label>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                        <Phone size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                        <input type="text" defaultValue={user.phone} className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Địa chỉ</label>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                        <MapPin size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                        <input type="text" defaultValue="TP. Hồ Chí Minh" className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900" />
                                    </div>
                                </div>
                            </div>

                            <button className="mt-12 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20 active:scale-95">
                                Cập nhật thông tin
                            </button>
                        </div>

                        {/* Recent Bookings Section */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                                    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Lịch sử đặt vé</h2>
                                </div>
                                <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-green-600 transition-colors">Xem tất cả</button>
                            </div>

                            <div className="space-y-4">
                                {bookings.map((booking, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-green-500 group-hover:border-green-100 transition-all">
                                                <Ticket size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{booking.movie}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{booking.date} • {booking.theater}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-12">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mã vé</p>
                                                <p className="font-bold text-slate-900">{booking.id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Trạng thái</p>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${booking.status === "Sắp tới" ? "bg-green-100 text-green-600" : "bg-slate-200 text-slate-500"
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-900 border border-slate-100 hover:border-slate-200 transition-all">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
