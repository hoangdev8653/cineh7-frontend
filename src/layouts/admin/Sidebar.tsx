import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Film,
    Users,
    LogOut,
    Theater,
    Calendar,
    Newspaper,
    Clapperboard
} from 'lucide-react';
import { PATH } from '../../utils/path';

interface AdminSidebarProps {
    isSidebarOpen: boolean;
    handleLogout: () => void;
}

const menuItems = [
    { name: 'Bảng Điều Khiển', icon: LayoutDashboard, path: PATH.ADMIN_LAYOUT },
    { name: 'Phim', icon: Film, path: PATH.MOVIE },
    { name: 'Người Dùng', icon: Users, path: PATH.USER },
    { name: 'Rạp Chiếu', icon: Theater, path: PATH.THEATER_ADMIN },
    { name: 'Lịch Chiếu', icon: Calendar, path: PATH.SHOWTIME_ADMIN },
    { name: 'Tin Tức & Sự Kiện', icon: Newspaper, path: PATH.EVENT_ADMIN },
];

const Sidebar = ({ isSidebarOpen, handleLogout }: AdminSidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
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
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    {isSidebarOpen && <span className="ml-4 font-bold text-sm cursor-pointer">Đăng Xuất</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
