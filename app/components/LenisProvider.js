"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function LenisProvider({ children }) {
    const lenisRef = useRef();
    const pathname = usePathname();

    useEffect(() => {
        // Only initialize on desktop for better mobile performance
        const isDesktop = window.innerWidth > 1024;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isDesktop || prefersReducedMotion) {
            return; // Skip Lenis on mobile or for users who prefer reduced motion
        }

        // Dynamic import to reduce initial bundle size
        import('@studio-freight/lenis').then(({ default: Lenis }) => {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                wheelMultiplier: 1,
                infinite: false,
            });

            lenisRef.current = lenis;

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            if (typeof window !== 'undefined') {
                window.lenis = lenis;
            }
        });

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            if (typeof window !== 'undefined' && window.lenis) {
                delete window.lenis;
            }
        };
    }, []);

    // Reset scroll position on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return <>{children}</>;
}