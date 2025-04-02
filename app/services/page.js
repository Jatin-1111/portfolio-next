"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Crafting sophisticated, responsive web applications using modern frameworks like Next.js and React.js. Focusing on clean code architecture and scalable solutions.",
      icon: "💻",
      highlights: ["Next.js & React.js", "Modern Architecture", "Responsive Design"]
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and visually stunning user interfaces that enhance user engagement and deliver exceptional digital experiences.",
      icon: "🎨",
      highlights: ["User Research", "Interface Design", "Interaction Patterns"]
    },
    {
      title: "Performance Optimization",
      description: "Enhancing web application performance through advanced optimization techniques, ensuring fast load times and smooth user experiences.",
      icon: "⚡",
      highlights: ["Load Time Optimization", "Code Splitting", "Resource Management"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm text-blue-400 tracking-wider mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            WHAT I OFFER
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-5xl text-gray-100 font-serif font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Professional Services
          </motion.h1>
          <motion.div
            className="h-px w-20 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Delivering comprehensive web development solutions that combine technical expertise
            with creative innovation to help bring your digital vision to life.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 
                hover:border-blue-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: "0 4px 20px -2px rgba(66, 153, 225, 0.1)"
              }}
            >
              {/* Service Icon */}
              <motion.div
                className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {service.icon}
              </motion.div>

              {/* Service Title */}
              <h2 className="text-xl text-gray-100 font-light mb-4">
                {service.title}
              </h2>

              {/* Service Description */}
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Service Highlights */}
              <div className="space-y-2">
                {service.highlights.map((highlight, hIndex) => (
                  <div
                    key={hIndex}
                    className="flex items-center text-sm text-gray-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                    {highlight}
                  </div>
                ))}
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 font-light mb-8">
            Interested in working together? Let&apos;s discuss your project.
          </p>
          <Link href={'/contact'}>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white 
              shadow-lg shadow-blue-500/20 transition-all duration-300"
              whileHover={{
                y: -2,
                shadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)"
              }}
              whileTap={{ y: 0 }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}