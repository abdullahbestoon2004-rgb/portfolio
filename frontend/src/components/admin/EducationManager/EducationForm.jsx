import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, GraduationCap, Calendar, FileText } from 'lucide-react';

const EducationForm = ({ onSave, onCancel, editEducation = null }) => {
    const [formData, setFormData] = useState(editEducation || {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-6 mb-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold tracking-tight">{editEducation ? 'Edit Education' : 'Add New Education'}</h3>
                <button type="button" onClick={onCancel} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">School / University</label>
                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                        <GraduationCap size={18} className="text-white/40" />
                        <input
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            required
                            value={formData.school}
                            onChange={e => setFormData({ ...formData, school: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Degree</label>
                    <input
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        required
                        value={formData.degree}
                        onChange={e => setFormData({ ...formData, degree: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Field of Study</label>
                    <input
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        required
                        value={formData.fieldOfStudy}
                        onChange={e => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Start Year</label>
                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                        <Calendar size={18} className="text-white/40" />
                        <input
                            type="number"
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            required
                            value={formData.startYear}
                            onChange={e => setFormData({ ...formData, startYear: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">End Year (or Present)</label>
                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                        <Calendar size={18} className="text-white/40" />
                        <input
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            required
                            value={formData.endYear}
                            onChange={e => setFormData({ ...formData, endYear: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Description</label>
                    <div className="flex items-start gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                        <FileText size={18} className="text-white/40 mt-1" />
                        <textarea
                            rows={3}
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
                <Save size={18} />
                {editEducation ? 'Update Education' : 'Create Education'}
            </button>
        </form>
    );
};

export default EducationForm;
