import { motion } from 'framer-motion';
import { Edit2, Trash2, Github, ExternalLink, Star } from 'lucide-react';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const imageSrc = project.image || project.imageUrl || '';
    const technologies = Array.isArray(project.technologies)
        ? project.technologies
        : (project.technologies || '').split(',').map((tech) => tech.trim()).filter(Boolean);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl border border-white/5 overflow-hidden flex flex-col group h-full"
        >
            <div className="relative h-48 overflow-hidden bg-[#111]">
                {imageSrc ? (
                    <img src={imageSrc} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">No Image</div>
                )}

                {project.featured && (
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
                        <Star size={12} fill="black" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Featured</span>
                    </div>
                )}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <button
                        onClick={() => onEdit(project)}
                        className="w-10 h-10 bg-black/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(project._id)}
                        className="w-10 h-10 bg-red-500/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex-1 mb-6">
                    <h4 className="text-xl font-bold tracking-tight mb-2">{project.title}</h4>
                    <p className="text-sm text-white/50 line-clamp-2 leading-relaxed font-light mb-4">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map(tech => (
                            <span key={tech} className="text-[10px] font-medium uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md text-white/60">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
