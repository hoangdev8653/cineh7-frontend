import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function UserLayout() {
    return (
        <div className="min-h-screen text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default UserLayout;