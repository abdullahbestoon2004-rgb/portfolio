import { useState, useEffect } from 'react';
import axios from '../../utils/apiClient';
import { Image, Activity, FileText, MessageSquare, ExternalLink, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        education: 0,
        messages: 0,
        unreadMessages: 0,
        featuredProjects: 0
    });

    const [recentMessages, setRecentMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [projects, skills, education, messages] = await Promise.all([
                axios.get('/api/projects'),
                axios.get('/api/skills'),
                axios.get('/api/education'),
                axios.get('/api/messages')
            ]);

            setStats({
                projects: projects.data.length,
                skills: skills.data.length,
                education: education.data.length,
                messages: messages.data.length,
                unreadMessages: messages.data.filter(m => !m.read).length,
                featuredProjects: projects.data.filter(p => p.featured).length
            });

            setRecentMessages(messages.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3));
        } catch (error) {
            console.error("Dashboard count error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const statCards = [
        { label: 'Projects', value: stats.projects, icon: Image, color: 'text-blue-400', href: '/admin/projects', detail: `${stats.featuredProjects} Featured` },
        { label: 'Skills', value: stats.skills, icon: Activity, color: 'text-green-400', href: '/admin/skills', detail: 'Total Listed' },
        { label: 'Education', value: stats.education, icon: FileText, color: 'text-purple-400', href: '/admin/education', detail: 'Timeline Items' },
        { label: 'Messages', value: stats.unreadMessages, icon: MessageSquare, color: stats.unreadMessages > 0 ? 'text-red-400' : 'text-white/40', href: '/admin/messages', detail: `${stats.unreadMessages} Unread` }
    ];

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-white/5 border-t-[var(--color-accent)] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
                <p className="text-white/40 font-light">Welcome back! Here is what is happening with your portfolio today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat) => (
                    <Link
                        key={stat.label}
                        to={stat.href}
                        className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 bg-white/5 rounded-2xl group-hover:bg-white group-hover:text-black transition-all ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <ExternalLink size={16} className="text-white/10 group-hover:text-white/40 transition-colors" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-1">{stat.label}</h3>
                        <div className="text-4xl font-bold tracking-tighter mb-2">{stat.value}</div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">{stat.detail}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Messages */}
                <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/5">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-bold tracking-tight">Recent Inquiries</h3>
                        <Link to="/admin/messages" className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] hover:underline">View All</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        {recentMessages.length === 0 ? (
                            <div className="py-12 text-center text-white/20 font-light italic">
                                No recent messages to display.
                            </div>
                        ) : (
                            recentMessages.map(msg => (
                                <div key={msg._id} className="flex items-center gap-6 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white transition-colors">
                                        <MessageSquare size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm truncate">{msg.name}</h4>
                                        <p className="text-xs text-white/40 truncate font-light">{msg.message}</p>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/10">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <h3 className="text-xl font-bold tracking-tight mb-8">CMS Health</h3>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1">
                                <span className="text-white/40">Storage Sync</span>
                                <span className="text-green-400">Stable</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[100%]" />
                            </div>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed font-light">
                            All your data is currently stored locally in your browser. To make sure your changes are live for others, remember to deploy your frontend.
                        </p>
                        <div className="pt-8 flex flex-col gap-3">
                            <Link to="/admin/profile" className="py-3 px-6 bg-white text-black text-center rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all">
                                Update Bio
                            </Link>
                            <Link to="/admin/projects" className="py-3 px-6 bg-white/5 text-white text-center rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5 text-[var(--color-accent)]">
                                Add Project
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
