import { Menu, Bell } from 'lucide-react';
import type { AdminHeaderProps } from '../../types/dashboard.types';

const Header = ({ isSidebarOpen, setIsSidebarOpen, user }: AdminHeaderProps) => {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
            <div className="flex items-center gap-6 flex-1">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-all relative group">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white group-hover:ring-slate-50"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{user?.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.email}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm border border-indigo-200 transition-transform group-hover:scale-105">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
