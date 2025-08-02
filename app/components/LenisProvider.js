// components/LenisProvider.js
"use client";
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function LenisProvider({ children }) {
    const lenisRef = useRef();

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false, // Disable on touch devices for better performance
            touchMultiplier: 2,
            wheelMultiplier: 1,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Animation frame function
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    // Expose lenis instance globally for programmatic scrolling
    useEffect(() => {
        if (lenisRef.current) {
            window.lenis = lenisRef.current;
        }

        return () => {
            if (window.lenis) {
                delete window.lenis;
            }
        };
    }, []);

    return <>{children}</>;
}