import { motion } from 'framer-motion';
import { Mail, Trash2, Calendar, User, Clock, CheckCircle, Circle } from 'lucide-react';

const MessageItem = ({ message, onMarkRead, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass p-6 rounded-2xl border transition-all ${message.read ? 'border-white/5 opacity-60' : 'border-[var(--color-accent)]/20'
                }`}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${message.read ? 'bg-white/5 text-white/20' : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                        }`}>
                        <User size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold tracking-tight">{message.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest font-medium">
                            <Mail size={12} />
                            {message.email}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onMarkRead(message._id)}
                        disabled={message.read}
                        className={`p-2 rounded-lg transition-all ${message.read
                                ? 'bg-green-500/10 text-green-400 cursor-default'
                                : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                            }`}
                        title={message.read ? "Read" : "Mark as read"}
                    >
                        {message.read ? <CheckCircle size={18} /> : <Circle size={18} />}
                    </button>
                    <button
                        onClick={() => onDelete(message._id)}
                        className="p-2 bg-red-500/5 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-black/30 p-4 rounded-xl mb-6 text-sm text-white/70 leading-relaxed font-light italic">
                "{message.message}"
            </div>

            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">
                <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(message.createdAt).toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(message.createdAt).toLocaleDateString()}
                </div>
            </div>
        </motion.div>
    );
};

export default MessageItem;
