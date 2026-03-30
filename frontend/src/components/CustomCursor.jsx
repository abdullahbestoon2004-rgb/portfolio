import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '../utils/gsap';

const dotStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '10px',
    height: '10px',
    borderRadius: '9999px',
    background: '#fff',
    boxShadow: '0 0 18px rgba(255,255,255,0.8)',
    pointerEvents: 'none',
    zIndex: 2147483647,
    transform: 'translate(-50%, -50%)',
};

const CustomCursor = () => {
    const dotRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) {
            return undefined;
        }

        const dot = dotRef.current;

        if (!dot) {
            return undefined;
        }

        document.body.classList.add('custom-cursor-enabled');

        const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
        const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

        gsap.set(dot, {
            xPercent: -50,
            yPercent: -50,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            autoAlpha: 1,
            scale: 1,
        });

        const handleMove = (event) => {
            moveDotX(event.clientX);
            moveDotY(event.clientY);
        };

        document.addEventListener('pointermove', handleMove);

        return () => {
            document.body.classList.remove('custom-cursor-enabled');
            document.removeEventListener('pointermove', handleMove);
        };
    }, [mounted]);

    if (!mounted || typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <div ref={dotRef} style={dotStyle} aria-hidden="true" />,
        document.body
    );
};

export default CustomCursor;
