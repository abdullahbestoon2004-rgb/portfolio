import { motion } from 'framer-motion';
import { Edit2, Trash2, Activity } from 'lucide-react';

const SkillCard = ({ skill, onEdit, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group"
        >
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center text-[var(--color-accent)]">
                    <Activity size={20} />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(skill)}
                        className="p-2 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(skill._id)}
                        className="p-2 bg-red-500/5 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div>
                <h4 className="text-lg font-bold tracking-tight">{skill.name}</h4>
                <p className="text-xs uppercase tracking-widest text-white/30 font-medium">{skill.category}</p>
            </div>

            <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40 uppercase tracking-widest">Mastery</span>
                    <span className="text-white/60">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-white"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default SkillCard;
