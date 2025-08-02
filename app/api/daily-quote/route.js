// app/api/daily-quote/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
    try {
        // Get current date for caching
        const today = new Date().toDateString();

        // Cache key based on date
        const cacheKey = `daily-quote-${today}`;

        // Check if we have a cached quote for today (you can implement Redis or any caching solution)
        // For now, we'll generate a new quote each time, but you can add caching logic here

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate a single inspiring quote about technology, innovation, creativity, or success. 
        The quote should be:
        - Motivational and professional
        - Between 20-80 characters
        - From a real person (tech leaders, entrepreneurs, innovators, philosophers)
        - Perfect for a developer/designer portfolio
        
        Return ONLY a JSON object with this exact format:
        {
            "quote": "The actual quote text",
            "author": "Author Name"
        }
        
        Do not include any markdown, explanations, or additional text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the JSON response
        let quoteData;
        try {
            // Clean the response text (remove any markdown or extra characters)
            const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
            quoteData = JSON.parse(cleanedText);
        } catch (parseError) {
            // Fallback quote if parsing fails
            quoteData = {
                quote: "The best way to predict the future is to create it.",
                author: "Peter Drucker"
            };
        }

        // Validate the response structure
        if (!quoteData.quote || !quoteData.author) {
            quoteData = {
                quote: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs"
            };
        }

        return NextResponse.json({
            ...quoteData,
            date: today,
            success: true
        }, {
            headers: {
                'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
            }
        });

    } catch (error) {
        console.error('Error generating quote:', error);

        // Return fallback quote
        return NextResponse.json({
            quote: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            date: new Date().toDateString(),
            success: false,
            error: "Failed to generate new quote, using fallback"
        }, {
            status: 200 // Still return 200 with fallback
        });
    }
}