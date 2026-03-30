import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Link as LinkIcon, Github } from 'lucide-react';

const createInitialFormData = (project = null) => ({
    title: project?.title || '',
    description: project?.description || '',
    technologies: Array.isArray(project?.technologies)
        ? project.technologies.join(', ')
        : (project?.technologies || ''),
    githubLink: project?.githubLink || '',
    liveLink: project?.liveLink || project?.link || '',
    image: project?.image || project?.imageUrl || '',
    featured: Boolean(project?.featured)
});

const ProjectForm = ({ onSave, onCancel, editProject = null }) => {
    const [formData, setFormData] = useState(() => createInitialFormData(editProject));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            technologies: formData.technologies
                .split(',')
                .map((tech) => tech.trim())
                .filter(Boolean)
                .join(', '),
            githubLink: formData.githubLink.trim(),
            liveLink: formData.liveLink.trim()
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-6 mb-8 overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold tracking-tight">{editProject ? 'Edit Project' : 'Add New Project'}</h3>
                <button type="button" onClick={onCancel} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Project Title</label>
                    <input
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Description</label>
                    <textarea
                        rows={3}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Technologies (Comma separated)</label>
                    <input
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none"
                        placeholder="React, Tailwind, Node.js"
                        value={formData.technologies}
                        onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Featured Project</label>
                    <div className="flex items-center gap-4 py-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                            className={`w-12 h-6 rounded-full transition-all relative ${formData.featured ? 'bg-white' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${formData.featured ? 'right-1 bg-black' : 'left-1 bg-white/40'}`} />
                        </button>
                        <span className="text-sm text-white/60">{formData.featured ? 'Yes' : 'No'}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">GitHub Link</label>
                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                        <Github size={18} className="text-white/40" />
                        <input
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            value={formData.githubLink}
                            onChange={e => setFormData({ ...formData, githubLink: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Live Demo Link</label>
                    <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-3">
                        <LinkIcon size={18} className="text-white/40" />
                        <input
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            value={formData.liveLink}
                            onChange={e => setFormData({ ...formData, liveLink: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-medium">Project Image</label>
                    <div className="flex flex-col gap-4">
                        {formData.image && (
                            <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-2xl border border-white/10" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none file:bg-white/10 file:text-white file:border-none file:rounded-lg file:px-4 file:py-1 file:mr-4"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
                <Save size={18} />
                {editProject ? 'Update Project' : 'Create Project'}
            </button>
        </form>
    );
};

export default ProjectForm;
