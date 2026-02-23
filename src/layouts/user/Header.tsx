import { Film, Ticket, Newspaper, MapPin, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATH } from '../../utils/path';

function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to={PATH.USER_LAYOUT} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <Film size={24} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter italic text-red-600">CINE<span className="text-red-600">H7</span></span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                    <Link to={PATH.SHOWTIME} className="hover:text-red-500 transition-colors flex items-center gap-2">
                        <Ticket size={18} /> Lịch chiếu
                    </Link>
                    <Link to={PATH.THEATER} className="hover:text-red-500 transition-colors flex items-center gap-2">
                        <MapPin size={18} /> Hệ thống rạp
                    </Link>
                    <Link to={PATH.NEWS_EVENT} className="hover:text-red-500 transition-colors flex items-center gap-2">
                        <Newspaper size={18} /> Khuyến mãi
                    </Link>
                    <Link to={PATH.POLICY} className="hover:text-red-500 transition-colors flex items-center gap-2">
                        <Newspaper size={18} /> Chính sách
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <Link
                        to={PATH.PROFILE}
                        className="flex items-center gap-2 bg-slate-100 text-slate-800 px-5 py-2.5 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm"
                    >
                        <User size={18} />
                        <span>Trang cá nhân</span>
                    </Link>
                </div>
            </div>
        </header>

    );
}

export default Header;