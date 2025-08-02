// hooks/useSmoothScroll.js
"use client";
import { useCallback } from 'react';

export const useSmoothScroll = () => {
    const scrollTo = useCallback((target, options = {}) => {
        if (typeof window !== 'undefined' && window.lenis) {
            const defaultOptions = {
                offset: 0,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                ...options
            };

            if (typeof target === 'string') {
                // Scroll to element by selector
                const element = document.querySelector(target);
                if (element) {
                    window.lenis.scrollTo(element, defaultOptions);
                }
            } else if (typeof target === 'number') {
                // Scroll to position
                window.lenis.scrollTo(target, defaultOptions);
            } else if (target instanceof HTMLElement) {
                // Scroll to element
                window.lenis.scrollTo(target, defaultOptions);
            }
        }
    }, []);

    const scrollToTop = useCallback((options = {}) => {
        scrollTo(0, options);
    }, [scrollTo]);

    const scrollToBottom = useCallback((options = {}) => {
        scrollTo(document.body.scrollHeight, options);
    }, [scrollTo]);

    const start = useCallback(() => {
        if (typeof window !== 'undefined' && window.lenis) {
            window.lenis.start();
        }
    }, []);

    const stop = useCallback(() => {
        if (typeof window !== 'undefined' && window.lenis) {
            window.lenis.stop();
        }
    }, []);

    return {
        scrollTo,
        scrollToTop,
        scrollToBottom,
        start,
        stop
    };
};