import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/path';
import { getLocalStorage, clearLocalStorage } from "../../utils/localStorage"
import AdminSidebar from './Sidebar';
import Header from './Header';

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const user = getLocalStorage("user");

    const handleLogout = () => {
        clearLocalStorage();
        navigate(PATH.LOGIN);
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                handleLogout={handleLogout}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    user={user}
                />

                <main className="flex-1 overflow-y-auto p-10 bg-slate-50 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
