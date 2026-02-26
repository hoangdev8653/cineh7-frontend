import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Film,
    Users,
    LogOut,
    Menu,
    X,
    Bell,
    Theater,
    Calendar,
    Newspaper
} from 'lucide-react';
import { PATH } from '../utils/path';

function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: PATH.ADMIN_LAYOUT },
        { name: 'Movies', icon: Film, path: PATH.MOVIE },
        { name: 'Users', icon: Users, path: PATH.USER },
        { name: 'Theaters', icon: Theater, path: PATH.THEATER_ADMIN },
        { name: 'Showtimes', icon: Calendar, path: PATH.SHOWTIME_ADMIN },
        { name: 'News & Events', icon: Newspaper, path: PATH.NEWS_EVENT_ADMIN },
    ];

    const activeItem = menuItems.find(item => item.path === location.pathname) || menuItems[0];

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && (
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            CineH7 Admin
                        </h1>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-white' : 'group-hover:text-blue-400'}`} />
                                {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button className="w-full flex items-center p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-8 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-lg font-semibold text-gray-200">{activeItem.name}</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-gray-800"></span>
                        </button>
                        <div className="flex items-center space-x-3 border-l border-gray-700 pl-4 ml-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg overflow-hidden border-2 border-gray-700">
                                <img src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" alt="Avatar" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="flex-1 overflow-y-auto p-8 bg-gray-900 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;