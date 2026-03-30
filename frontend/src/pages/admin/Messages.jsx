import { useState, useEffect } from 'react';
import axios from '../../utils/mockAxios';
import { MessageSquare, Inbox, Trash2, Mail } from 'lucide-react';
import MessageItem from '../../components/admin/MessagesManager/MessageItem';
import ConfirmModal from '../../components/admin/shared/ConfirmModal';
import Notification from '../../components/admin/shared/Notification';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: 'success' });
    const [filter, setFilter] = useState('all'); // all, unread, read

    const fetchMessages = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/messages');
            setMessages(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleMarkRead = async (id) => {
        try {
            await axios.put(`http://localhost:5001/api/messages/${id}/read`);
            setNotification({ message: 'Message marked as read', type: 'success' });
            fetchMessages();
        } catch (error) {
            setNotification({ message: 'Error updating message', type: 'error' });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/messages/${deleteId}`);
            setNotification({ message: 'Message deleted successfully', type: 'success' });
            setDeleteId(null);
            fetchMessages();
        } catch (error) {
            setNotification({ message: 'Error deleting message', type: 'error' });
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return !msg.read;
        if (filter === 'read') return msg.read;
        return true;
    });

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Inbox</h1>
                    <p className="text-white/40 font-light">Client inquiries and contact form submissions</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                    {['all', 'unread', 'read'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {filteredMessages.length === 0 ? (
                    <div className="glass p-20 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8">
                            <Inbox className="text-white/10" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">Your inbox is clear</h3>
                        <p className="text-white/30 font-light max-w-sm leading-relaxed">
                            {filter === 'all'
                                ? "When somebody contacts you through the portfolio, their message will appear here."
                                : `You have no ${filter} messages at the moment.`}
                        </p>
                    </div>
                ) : (
                    filteredMessages.map(msg => (
                        <MessageItem
                            key={msg._id}
                            message={msg}
                            onMarkRead={handleMarkRead}
                            onDelete={setDeleteId}
                        />
                    ))
                )}
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Message"
                message="Are you sure you want to delete this message? This will remove it permanently from your records."
            />

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: 'success' })}
            />
        </div>
    );
};

export default Messages;
