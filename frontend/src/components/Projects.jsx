import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from '../utils/mockAxios';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../utils/gsap';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5001/api/projects')
            .then(res => setProjects(res.data))
            .catch(err => console.error('Failed to load projects', err));
    }, []);

    useLayoutEffect(() => {
        const hoverCleanups = [];
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '[data-projects-title], [data-project-card]',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger: 0.14,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                    },
                }
            );

            const cards = gsap.utils.toArray('[data-project-card]');
            cards.forEach((card) => {
                const image = card.querySelector('[data-project-image]');
                const overlay = card.querySelector('[data-project-overlay]');
                const title = card.querySelector('[data-project-title]');
                const mediaReveal = card.querySelector('[data-project-image-reveal]');

                if (!overlay || !title) {
                    return;
                }

                gsap.set(overlay, { opacity: 0 });
                gsap.set(title, { y: 18 });

                if (mediaReveal && image) {
                    gsap.fromTo(
                        mediaReveal,
                        { clipPath: 'inset(0% 0% 100% 0%)' },
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            duration: 1.05,
                            ease: 'expo.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 78%',
                            },
                        }
                    );

                    gsap.fromTo(
                        image,
                        { scale: 1.14 },
                        {
                            scale: 1,
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 78%',
                            },
                        }
                    );

                    gsap.to(image, {
                        yPercent: -8,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
                }

                const onEnter = () => {
                    if (image) {
                        gsap.to(image, { scale: 1.05, duration: 0.65, ease: 'power3.out', overwrite: true });
                    }
                    gsap.to(overlay, { opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: true });
                    gsap.to(title, { y: 0, duration: 0.5, ease: 'power3.out', overwrite: true });
                };

                const onLeave = () => {
                    if (image) {
                        gsap.to(image, { scale: 1, duration: 0.65, ease: 'power3.out', overwrite: true });
                    }
                    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power3.out', overwrite: true });
                    gsap.to(title, { y: 18, duration: 0.45, ease: 'power3.out', overwrite: true });
                };

                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mouseleave', onLeave);

                hoverCleanups.push(() => {
                    card.removeEventListener('mouseenter', onEnter);
                    card.removeEventListener('mouseleave', onLeave);
                });
            });
        }, sectionRef);

        return () => {
            hoverCleanups.forEach((cleanup) => cleanup());
            ctx.revert();
        };
    }, [projects.length]);

    return (
        <section ref={sectionRef} id="projects" className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24">
            <div className="flex justify-between items-end mb-16">
                <h2 data-projects-title className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Selected Works.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.length === 0 && (
                    <div className="col-span-full text-center text-white/50">Loading projects...</div>
                )}

                {projects.map((project, index) => {
                    const imageSrc = project.image || project.imageUrl || '';
                    const technologies = Array.isArray(project.technologies)
                        ? project.technologies
                        : (project.technologies || '').split(',').map((tech) => tech.trim()).filter(Boolean);
                    const projectLink = project.liveLink || project.githubLink || project.link || '';

                    return (
                        <div
                            key={project._id}
                            data-project-card
                            data-cursor-label="View"
                            className={`group relative flex flex-col gap-4 ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden glass p-2 relative">
                                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#111] relative">
                                    <div data-project-image-reveal className="w-full h-full will-change-[clip-path]">
                                        {imageSrc ? (
                                            <img
                                                data-project-image
                                                src={imageSrc}
                                                alt={project.title}
                                                className="w-full h-full object-cover will-change-transform"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10 uppercase tracking-widest text-sm">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <div data-project-overlay className="absolute inset-0 bg-black/45 pointer-events-none" />

                                    <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between pointer-events-none">
                                        <div>
                                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 block mb-2">Featured Project</span>
                                            <h3 data-project-title className="text-2xl font-semibold tracking-tight text-white will-change-transform">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {hoveredIndex === index && projectLink && (
                                        <a
                                            href={projectLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center"
                                        >
                                            <ArrowUpRight size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex gap-2 flex-wrap mb-1">
                                    {technologies.map((tech, techIndex) => (
                                        <span key={`${project._id}-${tech}-${techIndex}`} className="text-[10px] md:text-xs tracking-wider uppercase border border-white/20 text-white/60 px-2 py-1 rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-white/50 font-light text-sm line-clamp-2">{project.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
