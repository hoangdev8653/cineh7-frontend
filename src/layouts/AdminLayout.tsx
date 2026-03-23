import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Film,
    Users,
    LogOut,
    Menu,
    Bell,
    Theater,
    Calendar,
    Newspaper,
    Search,
    Clapperboard
} from 'lucide-react';
import { PATH } from '../utils/path';

function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Bảng Điều Khiển', icon: LayoutDashboard, path: PATH.ADMIN_LAYOUT },
        { name: 'Phim', icon: Film, path: PATH.MOVIE },
        { name: 'Người Dùng', icon: Users, path: PATH.USER },
        { name: 'Rạp Chiếu', icon: Theater, path: PATH.THEATER_ADMIN },
        { name: 'Lịch Chiếu', icon: Calendar, path: PATH.SHOWTIME_ADMIN },
        { name: 'Tin Tức & Sự Kiện', icon: Newspaper, path: PATH.NEWS_EVENT_ADMIN },
    ];

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-30 shadow-sm`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                <Clapperboard size={18} strokeWidth={2.5} />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                                Cine-H7
                            </h1>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white mx-auto">
                            <Clapperboard size={18} strokeWidth={2.5} />
                        </div>
                    )}
                </div>

                <nav className="flex-grow px-4 mt-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-white' : 'group-hover:text-indigo-600'}`} />
                                {isSidebarOpen && <span className="ml-4 font-bold text-sm tracking-tight">{item.name}</span>}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 italic">
                    <button className="w-full flex items-center p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-4 font-bold text-sm">Đăng Xuất</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
                    <div className="flex items-center gap-6 flex-1">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="max-w-md w-full relative hidden md:block">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-600/20 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-bold text-slate-400 shadow-sm">
                                ⌘K
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-all relative group">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white group-hover:ring-slate-50"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-2"></div>

                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-none mb-1">Quản Trị Viên</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">admin@example.com</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm border border-indigo-200 transition-transform group-hover:scale-105">
                                AS
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="flex-1 overflow-y-auto p-10 bg-slate-50 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
