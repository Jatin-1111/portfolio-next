// components/DailyQuote.js
"use client";
import { motion } from "framer-motion";
import { RefreshCw, Quote } from "lucide-react";
import { useDailyQuote } from "@/hooks/useDailyQuote";

export default function DailyQuote({ className = "", showRefresh = false }) {
    const { quote, author, loading, error, refreshQuote } = useDailyQuote();

    return (
        <div className={`bg-gray-800/30 border border-gray-700/50 rounded-3xl p-6 sm:p-8 backdrop-blur-sm ${className}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-xl">
                        <Quote className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-white">
                        Daily Inspiration
                    </h3>
                </div>

                {showRefresh && (
                    <motion.button
                        onClick={refreshQuote}
                        disabled={loading}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-300 disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Get new quote"
                    >
                        <motion.div
                            animate={loading ? { rotate: 360 } : { rotate: 0 }}
                            transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                        >
                            <RefreshCw className="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {loading ? (
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-700/50 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
                        <div className="h-3 bg-gray-700/50 rounded animate-pulse w-1/2 mt-4"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-sm">
                        {error}
                    </div>
                ) : (
                    <motion.div
                        key={quote} // Re-animate when quote changes
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <blockquote className="text-sm sm:text-base text-gray-400 italic mb-4 leading-relaxed">
                            &quot;{quote}&quot;
                        </blockquote>
                        <cite className="text-xs sm:text-sm text-gray-500 not-italic">
                            — {author}
                        </cite>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}