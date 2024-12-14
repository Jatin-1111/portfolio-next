"use client";
import { motion } from "framer-motion";
import Header from "../components/Header"; // Adjust the path based on your file structure

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive and scalable websites using Next.js, React.js, and Tailwind CSS.",
      icon: "💻",
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive and visually appealing user interfaces for web applications.",
      icon: "🎨",
    },
    {
      title: "Performance Optimization",
      description:
        "Improving website speed and responsiveness for a seamless user experience.",
      icon: "⚡",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-primary overflow-hidden">
      {/* Header Section */}
      <Header />

      {/* Services Content */}
      <section className="flex-grow overflow-y-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-12 lg:py-20">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-header text-center text-accentBlue"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Services
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mt-4 text-base sm:text-lg lg:text-xl text-center text-textSecondary max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I offer a range of services to bring your ideas to life, from modern web
          development to performance optimization and UI/UX design.
        </motion.p>

        {/* Services Grid */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-primary border border-accentBlue rounded-lg shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
              <h2 className="text-lg sm:text-xl font-header text-accentBlue">
                {service.title}
              </h2>
              <p className="mt-2 text-textSecondary text-sm sm:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
