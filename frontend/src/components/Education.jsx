import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from '../utils/apiClient';
import { gsap } from '../utils/gsap';

const Education = () => {
    const [educationList, setEducationList] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        axios.get('/api/education')
            .then(res => setEducationList(res.data))
            .catch(err => console.error('Failed to load education', err));
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '[data-education-reveal]',
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
        }, sectionRef);

        return () => ctx.revert();
    }, [educationList.length]);

    return (
        <section ref={sectionRef} id="education" className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24">
            <h2 data-education-reveal className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
                Education.
            </h2>

            <div className="relative pl-8 md:pl-0">
                <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10" />

                {educationList.length === 0 && (
                    <div className="text-white/50 text-center w-full py-10">Loading education or zero records...</div>
                )}

                <div className="flex flex-col gap-12">
                    {educationList.map((edu, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={edu._id}
                                data-education-reveal
                                className={`relative flex md:justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                            >
                                <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 bg-[var(--color-accent)] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                                <div className="w-full md:w-5/12 ml-6 md:ml-0 group perspective-1000">
                                    <div className="glass p-8 rounded-2xl hover:bg-white/[0.03] transition-colors border border-white/5 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <span className="text-[var(--color-accent)] font-medium text-sm tracking-widest uppercase mb-2 block">
                                            {edu.startYear} — {edu.endYear}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-1 text-white">{edu.degree}</h3>
                                        <p className="text-white/60 font-light mb-4">{edu.fieldOfStudy}</p>
                                        <p className="text-white/40 text-sm">{edu.school}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Education;
