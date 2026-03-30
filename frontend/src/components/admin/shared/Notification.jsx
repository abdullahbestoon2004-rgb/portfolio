import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <div className="fixed bottom-8 right-8 z-[110]">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`px-6 py-4 rounded-2xl border flex items-center gap-4 shadow-2xl backdrop-blur-xl ${type === 'success'
                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}
                    >
                        {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-medium tracking-wide">{message}</span>
                        <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                            <X size={16} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
