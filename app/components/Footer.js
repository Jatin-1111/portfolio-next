"use client"
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-primary text-textSecondary py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <motion.p
          className="font-body text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          © 2024 MyPortfolio. All Rights Reserved.
        </motion.p>

        {/* Social Media Links */}
        <motion.div
          className="mt-4 flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          {/* GitHub */}
          <motion.a
            href="https://github.com"
            target="_blank"
            className="hover:text-accentBlue transition"
            whileHover={{ scale: 1.1, color: "#1E90FF" }}
          >
            GitHub
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-accentBlue transition"
            whileHover={{ scale: 1.1, color: "#1E90FF" }}
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
}
