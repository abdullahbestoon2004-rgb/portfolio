import { useState, useEffect } from 'react';
import axios from '../../utils/apiClient';
import { Plus, Activity } from 'lucide-react';
import SkillCard from '../../components/admin/SkillsManager/SkillCard';
import SkillForm from '../../components/admin/SkillsManager/SkillForm';
import ConfirmModal from '../../components/admin/shared/ConfirmModal';
import Notification from '../../components/admin/shared/Notification';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: 'success' });

    const fetchSkills = async () => {
        try {
            const res = await axios.get('/api/skills');
            setSkills(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchSkills(); }, []);

    const handleSave = async (data) => {
        try {
            if (editingItem) {
                await axios.put(`/api/skills/${editingItem._id}`, data);
                setNotification({ message: 'Skill updated successfully!', type: 'success' });
            } else {
                await axios.post('/api/skills', data);
                setNotification({ message: 'Skill added successfully!', type: 'success' });
            }
            setIsFormOpen(false);
            setEditingItem(null);
            fetchSkills();
        } catch (error) {
            setNotification({ message: 'Failed to save skill.', type: 'error' });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/skills/${deleteId}`);
            setNotification({ message: 'Skill deleted successfully!', type: 'success' });
            setDeleteId(null);
            fetchSkills();
        } catch (error) {
            setNotification({ message: 'Failed to delete skill.', type: 'error' });
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Manage Skills</h1>
                    <p className="text-white/40 font-light">Showcase your technical expertise and proficiency levels</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                    className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg"
                >
                    <Plus size={18} /> Add New Skill
                </button>
            </div>

            {isFormOpen && (
                <SkillForm
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                    editSkill={editingItem}
                />
            )}

            {skills.length === 0 ? (
                <div className="glass p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                        <Activity className="text-white/20" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No skills added yet</h3>
                    <p className="text-white/40 font-light max-w-xs">Populate your portfolio by adding your technical skills.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map(skill => (
                        <SkillCard
                            key={skill._id}
                            skill={skill}
                            onEdit={(s) => { setEditingItem(s); setIsFormOpen(true); }}
                            onDelete={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Skill"
                message="Are you sure you want to remove this skill? This will affect how your proficiency is displayed on the public site."
            />

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: 'success' })}
            />
        </div>
    );
};

export default ManageSkills;
