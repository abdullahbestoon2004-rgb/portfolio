import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Target, Activity, FileText, Image, MessageSquare, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const { admin, logout } = useAuth();
    const location = useLocation();

    if (!admin) {
        return <Navigate to="/admin" replace />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Projects', href: '/admin/projects', icon: Image },
        { name: 'Skills', href: '/admin/skills', icon: Activity },
        { name: 'Education', href: '/admin/education', icon: FileText },
        { name: 'Profile', href: '/admin/profile', icon: Target },
        { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex select-none">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col h-screen sticky top-0">
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <span className="font-bold tracking-widest text-[var(--color-accent)] uppercase">Admin CMS</span>
                </div>

                <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-[var(--color-accent)] text-white'
                                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-medium text-sm tracking-wide">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 flex flex-col gap-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 w-full text-white/50 hover:bg-white/5 hover:text-white rounded-xl transition-colors"
                    >
                        <LogOut size={18} className="rotate-180" />
                        <span className="font-medium text-sm tracking-wide">Back to Home</span>
                    </Link>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="font-medium text-sm tracking-wide">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
