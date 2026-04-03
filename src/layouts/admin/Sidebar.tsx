import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import {
    LayoutDashboard,
    Film,
    Users,
    LogOut,
    Theater,
    Calendar,
    Newspaper,
} from 'lucide-react';
import { PATH } from '../../utils/path';
import type { AdminSidebarProps } from '../../types/dashboard.types';

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
            <div className="p-2 flex items-center">
                {isSidebarOpen ? (
                    <div className=" items-center gap-2 cursor-pointer text-center mx-auto" onClick={() => navigate(PATH.USER_LAYOUT)}>
                        <div className="w-20 h-20 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                        </div>

                    </div>
                ) : (
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mx-auto cursor-pointer" onClick={() => navigate(PATH.ADMIN_LAYOUT)}>
                        <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            <nav className="flex-grow px-4 mt-0 space-y-1">
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
