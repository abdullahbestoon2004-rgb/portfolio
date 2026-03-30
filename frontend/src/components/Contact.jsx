import { useLayoutEffect, useRef, useState } from 'react';
import axios from '../utils/apiClient';
import { gsap } from '../utils/gsap';

const Contact = ({ profile }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '[data-contact-reveal]',
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await axios.post('/api/messages', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="max-w-7xl mx-auto px-6 md:px-12 w-full py-24 mb-12">
            <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
                <div data-contact-reveal className="w-full lg:w-1/2">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                        Let's work <br />
                        <span className="text-white/40">together.</span>
                    </h2>

                    <div className="flex flex-col gap-6 text-xl text-white/60 font-light">
                        <a href={`mailto:${profile?.email || 'hello@portfolio.com'}`} className="hover:text-white transition-colors">
                            {profile?.email || 'hello@portfolio.com'}
                        </a>

                        <div className="flex gap-6 mt-4">
                            {profile?.linkedinLink && (
                                <a href={profile.linkedinLink} className="text-sm uppercase tracking-widest font-medium hover:text-[var(--color-accent)] transition-colors">
                                    LinkedIn
                                </a>
                            )}
                            {profile?.githubLink && (
                                <a href={profile.githubLink} className="text-sm uppercase tracking-widest font-medium hover:text-[var(--color-accent)] transition-colors">
                                    GitHub
                                </a>
                            )}
                            {profile?.instagramLink && (
                                <a href={profile.instagramLink} className="text-sm uppercase tracking-widest font-medium hover:text-[var(--color-accent)] transition-colors">
                                    Instagram
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div data-contact-reveal className="w-full lg:w-1/2 glass p-8 md:p-12 rounded-3xl border border-white/5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium uppercase tracking-widest text-white/50">Your Name</label>
                            <input
                                type="text"
                                required
                                className="bg-transparent border-b border-white/20 py-3 text-lg text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium uppercase tracking-widest text-white/50">Your Email</label>
                            <input
                                type="email"
                                required
                                className="bg-transparent border-b border-white/20 py-3 text-lg text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium uppercase tracking-widest text-white/50">Message</label>
                            <textarea
                                required
                                rows={4}
                                className="bg-transparent border-b border-white/20 py-3 text-lg text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="mt-4 bg-white text-black py-4 rounded-full font-medium text-lg hover:bg-white/90 transition-all disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent successfully!' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
