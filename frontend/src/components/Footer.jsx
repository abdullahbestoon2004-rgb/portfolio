import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-[var(--color-bg-border)] mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm text-white/50">
                    &copy; {new Date().getFullYear()} PORTFOLIO. All Rights Reserved.
                </div>

                <div className="flex gap-6">
                    {['LinkedIn', 'GitHub', 'Twitter'].map((social, idx) => (
                        <motion.a
                            key={idx}
                            whileHover={{ y: -3 }}
                            href="#"
                            className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium"
                        >
                            {social}
                        </motion.a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
