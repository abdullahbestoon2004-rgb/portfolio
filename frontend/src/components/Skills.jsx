import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from '../utils/mockAxios';
import { gsap } from '../utils/gsap';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5001/api/skills')
            .then(res => setSkills(res.data))
            .catch(err => console.error('Failed to load skills', err));
    }, []);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '[data-skills-title], [data-skill-card]',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                    },
                }
            );

            const cards = gsap.utils.toArray('[data-skill-card]');
            cards.forEach((card, index) => {
                gsap.to(card, {
                    yPercent: index % 2 === 0 ? -6 : 6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            });

            // Preserve the section visually, but turn the desktop card row into a pinned horizontal pass.
            mm.add('(min-width: 1024px)', () => {
                const track = trackRef.current;
                if (!track || cards.length < 3) {
                    return undefined;
                }

                const getScrollDistance = () => Math.max(track.scrollWidth - sectionRef.current.offsetWidth, 0);
                const scrollDistance = getScrollDistance();
                if (scrollDistance <= 0) {
                    return undefined;
                }

                const tween = gsap.to(track, {
                    x: () => -getScrollDistance(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: () => `+=${getScrollDistance()}`,
                        pin: true,
                        scrub: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                return () => tween.scrollTrigger?.kill();
            });
        }, sectionRef);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, [skills.length]);

    return (
        <section ref={sectionRef} id="skills" className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24 overflow-hidden">
            <h2 data-skills-title className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center lg:text-left">
                My Stack.
            </h2>

            <div
                ref={trackRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-nowrap lg:gap-6 lg:w-max gap-6"
            >
                {skills.length === 0 && (
                    <div className="col-span-full text-center text-white/50">Loading skills...</div>
                )}

                {skills.map((skill) => (
                    <div
                        key={skill._id}
                        data-skill-card
                        className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group lg:min-w-[340px] lg:max-w-[340px]"
                    >
                        <div
                            className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"
                            style={{ width: `${skill.level}%` }}
                        />

                        <div className="flex justify-between items-center z-10 relative">
                            <h3 className="text-xl font-medium tracking-wide">{skill.name}</h3>
                            <span className="text-white/40 text-sm">{skill.level}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
