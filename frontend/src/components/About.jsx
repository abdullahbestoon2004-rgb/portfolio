import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

const About = ({ profile }) => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '[data-about-reveal]',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                    },
                }
            );

            gsap.fromTo(
                '[data-about-image-reveal]',
                { clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '[data-about-image-wrap]',
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo(
                '[data-about-image]',
                { scale: 1.14 },
                {
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '[data-about-image-wrap]',
                        start: 'top 75%',
                    },
                }
            );

            gsap.to('[data-about-parallax]', {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div data-about-reveal data-about-image-wrap className="w-full md:w-5/12 aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden glass p-2">
                    <div className="w-full h-full bg-[#111] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-purple-300 opacity-30 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
                        <div data-about-image-reveal className="w-full h-full will-change-[clip-path]">
                            {profile?.profileImage ? (
                                <img data-about-image data-about-parallax src={profile.profileImage} alt={profile.name} className="block w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 will-change-transform" />
                            ) : (
                                <img data-about-image data-about-parallax src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60" alt="Profile Placeholder" className="block w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 will-change-transform" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-7/12 flex flex-col items-start">
                    <h2 data-about-reveal className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                        {profile?.aboutTitle || 'About Me.'}
                    </h2>

                    <p data-about-reveal className="text-lg md:text-xl text-white/60 leading-relaxed font-light mb-12">
                        {profile?.aboutDescription || 'I am a passionate creative developer building modern web and mobile applications with a focus on premium, interactive experiences. I transform ideas into beautifully crafted digital realities.'}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                        {[
                            { label: 'Years Exp.', value: profile?.yearsOfExperience || 5 },
                            { label: 'Projects', value: profile?.projectsCompleted || 24 },
                            { label: 'Happy Clients', value: profile?.happyClients || '18+' }
                        ].map((stat) => (
                            <div key={stat.label} data-about-reveal className="glass p-6 flex flex-col items-start border border-white/5 rounded-2xl">
                                <span className="text-4xl font-bold text-[var(--color-accent)] mb-2">{stat.value}</span>
                                <span className="text-sm font-medium text-white/50 uppercase tracking-widest">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
