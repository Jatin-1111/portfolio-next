// hooks/useDailyQuote.js
import { useState, useEffect } from 'react';

export const useDailyQuote = () => {
    const [quote, setQuote] = useState({
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchDailyQuote = async () => {
            try {
                // Check localStorage for today's quote first
                const today = new Date().toDateString();
                const cachedQuote = localStorage.getItem('dailyQuote');
                const cachedDate = localStorage.getItem('dailyQuoteDate');

                if (cachedQuote && cachedDate === today) {
                    // Use cached quote if it's from today
                    const parsedQuote = JSON.parse(cachedQuote);
                    setQuote({
                        ...parsedQuote,
                        loading: false,
                        error: null
                    });
                    return;
                }

                // Fetch new quote from API
                const response = await fetch('/api/daily-quote', {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch quote');
                }

                const data = await response.json();

                // Cache the new quote
                localStorage.setItem('dailyQuote', JSON.stringify({
                    quote: data.quote,
                    author: data.author
                }));
                localStorage.setItem('dailyQuoteDate', today);

                setQuote({
                    quote: data.quote,
                    author: data.author,
                    loading: false,
                    error: null
                });

            } catch (error) {
                console.error('Error fetching daily quote:', error);
                setQuote(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load daily quote'
                }));
            }
        };

        fetchDailyQuote();
    }, []);

    const refreshQuote = async () => {
        setQuote(prev => ({ ...prev, loading: true }));

        try {
            // Clear cache and fetch new quote
            localStorage.removeItem('dailyQuote');
            localStorage.removeItem('dailyQuoteDate');

            const response = await fetch('/api/daily-quote', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }

            const data = await response.json();

            // Cache the new quote
            const today = new Date().toDateString();
            localStorage.setItem('dailyQuote', JSON.stringify({
                quote: data.quote,
                author: data.author
            }));
            localStorage.setItem('dailyQuoteDate', today);

            setQuote({
                quote: data.quote,
                author: data.author,
                loading: false,
                error: null
            });

        } catch (error) {
            console.error('Error refreshing quote:', error);
            setQuote(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to refresh quote'
            }));
        }
    };

    return {
        ...quote,
        refreshQuote
    };
};