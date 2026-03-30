import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-[var(--color-bg-dark)] text-white font-sans selection:bg-white/20">
            <CustomCursor />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
