import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Save } from 'lucide-react';

const SkillForm = ({ onSave, onCancel, editSkill = null }) => {
    const [formData, setFormData] = useState(editSkill || {
        name: '',
        category: 'Frontend',
        level: 80,
        icon: ''
    });

    const categories = ['Frontend', 'Backend', 'Design', 'Tools', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-6 mb-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold tracking-tight">{editSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
                <button type="button" onClick={onCancel} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Skill Name</label>
                    <input
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        required
                        placeholder="e.g. React"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Category</label>
                    <select
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Level (%)</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        required
                        value={formData.level}
                        onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Icon (Lucide Name)</label>
                    <input
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        placeholder="e.g. Code, Database..."
                        value={formData.icon}
                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
                <Save size={18} />
                {editSkill ? 'Update Skill' : 'Create Skill'}
            </button>
        </form>
    );
};

export default SkillForm;
