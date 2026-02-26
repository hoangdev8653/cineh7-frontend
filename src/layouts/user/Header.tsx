import { Film, Ticket, Newspaper, MapPin, Search, User, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/path';
import { useAuthStore } from '../../store/useAuthStore';
import { logout } from '../../apis/auth';

function Header() {
    const { user, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            clearAuth();
            navigate(PATH.USER_LAYOUT);
        } catch (error) {
            console.error('Logout failed:', error);
            clearAuth();
            navigate(PATH.USER_LAYOUT);
        }
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors flex items-center gap-2 ${isActive ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-red-500'}`;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to={PATH.USER_LAYOUT} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <Film size={24} fill="currentColor" className="text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter italic text-red-600">CINE<span className="text-red-600">H7</span></span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <NavLink to={PATH.SHOWTIME} className={navLinkClass}>
                        <Ticket size={18} /> Lịch chiếu
                    </NavLink>
                    <NavLink to={PATH.THEATER} className={navLinkClass}>
                        <MapPin size={18} /> Hệ thống rạp
                    </NavLink>
                    <NavLink to={PATH.NEWS_EVENT} className={navLinkClass}>
                        <Newspaper size={18} /> Khuyến mãi
                    </NavLink>
                    <NavLink to={PATH.POLICY} className={navLinkClass}>
                        <Newspaper size={18} /> Chính sách
                    </NavLink>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                        <Search size={20} />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to={PATH.PROFILE} className="flex items-center gap-2 group">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-red-500 transition-all shadow-sm">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={20} className="text-slate-500" />
                                    )}
                                </div>
                                <div className="hidden sm:flex flex-col">
                                    <span className="text-xs text-slate-500 font-medium">{user?.full_name}</span>
                                    <span className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">{user.email}</span>
                                </div>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                title="Đăng xuất"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to={PATH.LOGIN}
                            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all shadow-md shadow-red-200 active:scale-95"
                        >
                            <User size={18} />
                            <span>Đăng nhập</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>

    );
}

export default Header;