import { useState, useRef, useEffect } from 'react';
import { User, Mail, Calendar, CreditCard, Shield, LogOut, ChevronRight, Settings, Ticket, Loader2, Inbox } from 'lucide-react';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorage';
import { PATH } from "../../../utils/path"
import { useOrderMutations } from '../../../hooks/useOrder';
import { formatCurrency } from '../../../utils/date';
import { useUserMutations } from '../../../hooks/useUser';
import { useAuthStore } from '../../../store/useAuthStore';
import { toast } from 'react-toastify';

const formatDate = (dateStr: string) => {
    try {
        const d = new Date(dateStr);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
        return dateStr;
    }
};

const getStatusConfig = (status: string) => {
    switch (status?.toUpperCase()) {
        case 'PAID':
            return { label: 'Đã thanh toán', className: 'bg-green-100 text-green-600' };
        case 'PENDING':
            return { label: 'Chờ thanh toán', className: 'bg-yellow-100 text-yellow-600' };
        case 'CANCELLED':
            return { label: 'Đã hủy', className: 'bg-red-100 text-red-600' };
        case 'EXPIRED':
            return { label: 'Hết hạn', className: 'bg-slate-200 text-slate-500' };
        default:
            return { label: status, className: 'bg-slate-200 text-slate-500' };
    }
};

const getPaymentLabel = (method: string) => {
    switch (method?.toUpperCase()) {
        case 'VNPAY': return 'VNPay';
        case 'MOMO': return 'MoMo';
        case 'CASH': return 'Tiền mặt';
        default: return method || '—';
    }
};

function Profile() {
    const [activeTab, setActiveTab] = useState("Thông tin cá nhân");
    const { user: authUser, setUser } = useAuthStore();
    const storageUser = getLocalStorage("user");
    const currentUser = authUser || storageUser;

    const { getOrderByUserQuery } = useOrderMutations();
    const { updateUser } = useUserMutations();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(currentUser?.name || currentUser?.full_name || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || currentUser.full_name || "");
        }
    }, [currentUser]);

    const orders = getOrderByUserQuery?.data?.data || [];
    const isLoadingOrders = getOrderByUserQuery?.isLoading;

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = PATH.LOGIN;
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async () => {
        if (!currentUser?.id) {
            toast.error("Không tìm thấy thông tin người dùng");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (selectedFile) {
            formData.append("avatar", selectedFile);
        }

        updateUser.mutate(
            formData,
            {
                onSuccess: (response: any) => {
                    const updatedUser = response.data;
                    const newUser = updatedUser.user || updatedUser;

                    setUser(newUser);
                    setLocalStorage("user", newUser);

                    toast.success("Cập nhật thông tin thành công!");
                    setSelectedFile(null);
                },
                onError: (error: any) => {
                    toast.error(error.message || "Đã có lỗi xảy ra khi cập nhật");
                }
            }
        );
    };

    const userDisplay = {
        name: name || "Khách",
        email: currentUser?.email || "Chưa cập nhật",
        phone: currentUser?.phone || "Chưa cập nhật",
        role: currentUser?.role || "USER",
        points: currentUser?.points || 0,
        avatar: avatarPreview || currentUser?.avarta || currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        status: currentUser?.status || "ACTIVE"
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-800">
            <input
                type="file"
                ref={fileInputRef}
                onChange={onAvatarChange}
                className="hidden"
                accept="image/*"
            />
            <div className="h-48 bg-slate-900 w-full relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500 via-transparent to-transparent" />
            </div>
            <div className="container mx-auto px-4 md:px-32 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                            <div className="p-8 flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-green-400 to-blue-500 shadow-xl shadow-green-500/20">
                                        <img
                                            src={userDisplay.avatar}
                                            alt={userDisplay.name}
                                            className="w-full h-full object-cover rounded-full border-4 border-white"
                                        />
                                    </div>
                                    <div
                                        onClick={handleAvatarClick}
                                        className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-green-500 hover:scale-110 transition-transform cursor-pointer"
                                    >
                                        <Settings size={16} />
                                    </div>
                                </div>

                                <h1 className="text-2xl font-black text-slate-900 mb-1">{userDisplay.name}</h1>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">{userDisplay.role}</p>

                                <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between group hover:border-green-500 transition-colors">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Điểm tích lũy</p>
                                        <p className="text-2xl font-black text-slate-900">{userDisplay.points.toLocaleString()} <span className="text-xs text-green-500">Pts</span></p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                                        <CreditCard size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-50 p-4 space-y-1">
                                {[
                                    { icon: User, label: "Thông tin cá nhân" },
                                    { icon: Calendar, label: "Lịch sử đặt vé" },
                                    { icon: Shield, label: "Bảo mật & Đổi mật khẩu" },
                                    { icon: LogOut, label: "Đăng xuất", danger: true }
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (item.label === "Đăng xuất") {
                                                handleLogout();
                                            } else {
                                                setActiveTab(item.label);
                                            }
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === item.label
                                            ? 'bg-green-50 text-green-600'
                                            : item.danger
                                                ? 'text-red-500 hover:bg-red-50'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon size={20} className={activeTab === item.label ? "text-green-500" : "text-slate-400"} />
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                        </div>
                                        <ChevronRight size={16} className={activeTab === item.label ? "text-green-500" : "text-slate-300"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-12">
                        {activeTab === "Thông tin cá nhân" && (
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 animate-in fade-in duration-500">
                                <div className="flex items-center gap-3 mb-10">
                                    <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                                    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Thông tin cá nhân</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Họ và tên</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                            <User size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                            <Mail size={18} className="text-slate-400" />
                                            <input type="email" defaultValue={userDisplay.email} disabled className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-400 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Chức vụ</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                            <Shield size={18} className="text-slate-400" />
                                            <input type="text" defaultValue={userDisplay.role} disabled className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-400 cursor-not-allowed uppercase" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trạng thái</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                            <Shield size={18} className="text-slate-400" />
                                            <input type="text" defaultValue={userDisplay.status} disabled className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-400 cursor-not-allowed uppercase" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={updateUser.isPending}
                                    className="mt-12 px-10 py-4 cursor-pointer bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {updateUser.isPending ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Đang cập nhật...
                                        </>
                                    ) : (
                                        "Cập nhật thông tin"
                                    )}
                                </button>
                            </div>
                        )}

                        {activeTab === "Lịch sử đặt vé" && (
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                                        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Lịch sử đặt vé</h2>
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        {orders.length} đơn hàng
                                    </span>
                                </div>

                                {isLoadingOrders && (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                        <Loader2 size={40} className="animate-spin mb-4 text-green-500" />
                                        <p className="text-sm font-bold uppercase tracking-widest">Đang tải dữ liệu...</p>
                                    </div>
                                )}

                                {!isLoadingOrders && orders.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                                            <Inbox size={36} className="text-slate-300" />
                                        </div>
                                        <p className="font-bold text-slate-500 mb-1">Chưa có đơn hàng nào</p>
                                        <p className="text-xs text-slate-400">Hãy đặt vé xem phim để bắt đầu!</p>
                                    </div>
                                )}

                                {!isLoadingOrders && orders.length > 0 && (
                                    <div className="space-y-4">
                                        {orders.map((order: any) => {
                                            const statusConfig = getStatusConfig(order.status);
                                            const seatNames = order.tickets?.map((t: any) => t.seat_name).filter(Boolean).join(', ') || '—';
                                            const ticketCount = order.tickets?.length || 0;

                                            return (
                                                <div key={order.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-green-500 group-hover:border-green-100 transition-all">
                                                            <Ticket size={24} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">
                                                                {ticketCount} vé • Ghế {seatNames}
                                                            </h4>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                {formatDate(order.created_at)} • {getPaymentLabel(order.payment_method)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between md:justify-end gap-8">
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tổng tiền</p>
                                                            <p className="font-black text-slate-900">{formatCurrency(order.total_amount)}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Trạng thái</p>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${statusConfig.className}`}>
                                                                {statusConfig.label}
                                                            </span>
                                                        </div>
                                                        <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-900 border border-slate-100 hover:border-slate-200 transition-all">
                                                            <ChevronRight size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "Bảo mật & Đổi mật khẩu" && (
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 animate-in fade-in duration-500">
                                <div className="flex items-center gap-3 mb-10">
                                    <span className="w-1.5 h-8 bg-green-500 rounded-full" />
                                    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">Bảo mật</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mật khẩu hiện tại</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                            <Shield size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                            <input type="password" placeholder="••••••••" className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mật khẩu mới</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                            <Shield size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                            <input type="password" placeholder="••••••••" className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Xác nhận mật khẩu mới</label>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-green-500 focus-within:bg-white transition-all group">
                                            <Shield size={18} className="text-slate-400 group-focus-within:text-green-500" />
                                            <input type="password" placeholder="••••••••" className="bg-transparent border-none focus:outline-none w-full font-bold text-slate-900" />
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-12 px-10 py-4 cursor-pointer bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20 active:scale-95">
                                    Cập nhật mật khẩu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
