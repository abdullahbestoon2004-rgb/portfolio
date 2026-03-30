import { useState, useEffect } from 'react';
import axios from '../../utils/mockAxios';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';
import EducationForm from '../../components/admin/EducationManager/EducationForm';
import ConfirmModal from '../../components/admin/shared/ConfirmModal';
import Notification from '../../components/admin/shared/Notification';

const ManageEducation = () => {
    const [education, setEducation] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: 'success' });

    const fetchEducation = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/education');
            setEducation(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchEducation(); }, []);

    const handleSave = async (data) => {
        try {
            if (editingItem) {
                await axios.put(`http://localhost:5001/api/education/${editingItem._id}`, data);
                setNotification({ message: 'Education updated successfully!', type: 'success' });
            } else {
                await axios.post('http://localhost:5001/api/education', data);
                setNotification({ message: 'Education added successfully!', type: 'success' });
            }
            setIsFormOpen(false);
            setEditingItem(null);
            fetchEducation();
        } catch (error) {
            setNotification({ message: 'Failed to save education.', type: 'error' });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/education/${deleteId}`);
            setNotification({ message: 'Education deleted successfully!', type: 'success' });
            setDeleteId(null);
            fetchEducation();
        } catch (error) {
            setNotification({ message: 'Failed to delete education.', type: 'error' });
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Education Timeline</h1>
                    <p className="text-white/40 font-light">Manage your academic background and certifications</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                    className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg"
                >
                    <Plus size={18} /> Add Entry
                </button>
            </div>

            {isFormOpen && (
                <EducationForm
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                    editEducation={editingItem}
                />
            )}

            <div className="flex flex-col gap-6">
                {education.length === 0 ? (
                    <div className="glass p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <GraduationCap className="text-white/20" size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No education found</h3>
                        <p className="text-white/40 font-light max-w-xs">Start building your timeline by adding your first academic entry.</p>
                    </div>
                ) : (
                    education.map(edu => (
                        <div key={edu._id} className="glass p-8 rounded-3xl border border-white/5 flex justify-between items-center group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group-hover:text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/10 transition-all">
                                    <GraduationCap size={24} />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[var(--color-accent)] font-bold text-xs tracking-[0.2em] uppercase mb-2 block">{edu.startYear} — {edu.endYear}</span>
                                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{edu.degree}</h3>
                                    <p className="text-white/80 font-medium mb-1">{edu.fieldOfStudy}</p>
                                    <p className="text-white/40 text-sm font-light italic">{edu.school}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <button
                                    onClick={() => { setEditingItem(edu); setIsFormOpen(true); }}
                                    className="w-10 h-10 bg-white/5 hover:bg-white text-white/40 hover:text-black rounded-xl border border-white/10 flex items-center justify-center transition-all"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => setDeleteId(edu._id)}
                                    className="w-10 h-10 bg-red-500/5 hover:bg-red-500 text-red-500/40 hover:text-white rounded-xl border border-red-500/10 flex items-center justify-center transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Education Entry"
                message="Are you sure you want to remove this education entry from your portfolio? This action cannot be undone."
            />

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: 'success' })}
            />
        </div>
    );
};

export default ManageEducation;
