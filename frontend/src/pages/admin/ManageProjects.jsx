import { useState, useEffect } from 'react';
import axios from '../../utils/mockAxios';
import { Plus, Image as ImageIcon } from 'lucide-react';
import ProjectCard from '../../components/admin/ProjectsManager/ProjectCard';
import ProjectForm from '../../components/admin/ProjectsManager/ProjectForm';
import ConfirmModal from '../../components/admin/shared/ConfirmModal';
import Notification from '../../components/admin/shared/Notification';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: 'success' });

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/projects');
            setProjects(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSave = async (data) => {
        try {
            if (editingItem) {
                await axios.put(`http://localhost:5001/api/projects/${editingItem._id}`, data);
                setNotification({ message: 'Project updated successfully!', type: 'success' });
            } else {
                await axios.post('http://localhost:5001/api/projects', data);
                setNotification({ message: 'Project added successfully!', type: 'success' });
            }
            setIsFormOpen(false);
            setEditingItem(null);
            fetchProjects();
        } catch (error) {
            setNotification({ message: 'Failed to save project.', type: 'error' });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/projects/${deleteId}`);
            setNotification({ message: 'Project deleted successfully!', type: 'success' });
            setDeleteId(null);
            fetchProjects();
        } catch (error) {
            setNotification({ message: 'Failed to delete project.', type: 'error' });
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Project Portfolio</h1>
                    <p className="text-white/40 font-light">Showcase your best work with detailed descriptions and images</p>
                </div>
                <button
                    onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                    className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg"
                >
                    <Plus size={18} /> Create Project
                </button>
            </div>

            {isFormOpen && (
                <ProjectForm
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                    editProject={editingItem}
                />
            )}

            {projects.length === 0 ? (
                <div className="glass p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                        <ImageIcon className="text-white/20" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No projects yet</h3>
                    <p className="text-white/40 font-light max-w-xs">Your portfolio is empty. Add your first project to wow your visitors.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(project => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onEdit={(p) => { setEditingItem(p); setIsFormOpen(true); }}
                            onDelete={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Project"
                message="Are you sure you want to permanently remove this project? This will remove it from your public portfolio."
            />

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: 'success' })}
            />
        </div>
    );
};

export default ManageProjects;
