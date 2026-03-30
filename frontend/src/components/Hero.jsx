import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from '../utils/gsap';

const Hero = ({ profile }) => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const titleParts = gsap.utils.toArray('[data-hero-title-part]');

            gsap.set(titleParts, { y: 80, opacity: 0 });
            gsap.set('[data-hero-subtext]', { y: 32, opacity: 0 });
            gsap.set('[data-hero-actions]', { scale: 0.96, opacity: 0, y: 24 });
            gsap.set('[data-hero-scroll]', { opacity: 0, y: 16 });

            const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

            heroTimeline
                .fromTo('[data-hero-badge]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 })
                .to(titleParts, { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, '-=0.45')
                .to('[data-hero-subtext]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.65')
                .to('[data-hero-actions]', { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'expo.out' }, '-=0.55')
                .to('[data-hero-scroll]', { opacity: 1, y: 0, duration: 0.8 }, '-=0.35');

            gsap.to('[data-hero-blob="left"]', {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to('[data-hero-blob="right"]', {
                yPercent: 12,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div data-hero-blob="left" className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[128px] animate-gradient" />
                <div data-hero-blob="right" className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] animate-gradient" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col items-start pt-20">
                <div>
                    <p data-hero-badge className="text-[var(--color-accent)] font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
                        Portfolio
                    </p>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 overflow-hidden">
                        <span data-hero-title-part className="block will-change-transform">Creative</span>
                        <span data-hero-title-part className="block text-white/50 will-change-transform">{profile?.name || 'Developer'}</span>
                    </h1>
                    <p data-hero-subtext className="text-xl md:text-2xl text-white/70 max-w-2xl font-light mb-12 will-change-transform">
                        {profile?.subtitle || 'Developer / Designer / Creative Thinker'}
                    </p>
                </div>

                <div data-hero-actions className="flex flex-col sm:flex-row gap-6 will-change-transform">
                    <a href="#projects" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all">
                        View Projects
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#contact" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium backdrop-blur-md transition-all border border-white/10">
                        Contact Me
                    </a>
                </div>
            </div>

            <div data-hero-scroll className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 will-change-transform">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="animate-bounce-subtle">
                    <ChevronDown size={20} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
