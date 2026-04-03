import {
  Ticket,
  Newspaper,
  MapPin,
  User,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../utils/path";
import { useAuthStore } from "../../store/useAuthStore";
import { logout } from "../../apis/auth";
import { getLocalStorage } from "../../utils/localStorage";
import Logo from '../../assets/logo2.png';

function Header() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const userData = getLocalStorage("user");

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      navigate(PATH.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
      navigate(PATH.LOGIN);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors flex items-center gap-2 ${isActive ? "text-red-600 font-bold" : "text-gray-600 hover:text-red-500"}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to={PATH.USER_LAYOUT} className="flex items-center gap-2 group">
          <img
            src={Logo}
            alt="logo"
            className="w-20 h-20 object-contain mix-blend-multiply"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to={PATH.SHOWTIME} className={navLinkClass}>
            <Ticket size={18} /> Lịch chiếu
          </NavLink>
          <NavLink to={PATH.THEATER} className={navLinkClass}>
            <MapPin size={18} /> Hệ thống rạp
          </NavLink>
          <NavLink to={PATH.EVENT} className={navLinkClass}>
            <Newspaper size={18} /> Sự kiện
          </NavLink>
          <NavLink to={PATH.POLICY} className={navLinkClass}>
            <Newspaper size={18} /> Chính sách
          </NavLink>
        </nav>

        <div className="flex items-center gap-5">
          {userData ? (
            <div className="flex items-center gap-4">
              <Link to={PATH.PROFILE} className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 group-hover:border-red-500 transition-all shadow-sm">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-slate-500" />
                  )}
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                    {userData.name}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {userData.email}
                  </span>
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
