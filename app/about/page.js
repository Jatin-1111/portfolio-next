'use client'
import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const education = [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "University Institute of Engineering and Technology (UIET), Chandigarh",
      duration: "2024 - Present",
    },
    {
      degree: "Senior Secondary Education (Class 12)",
      institution: "Vivekananda World School",
      duration: "2023 - 2024",
    },
    {
      degree: "High School (Class 10)",
      institution: "D.C. Model International School",
      duration: "2020 - 2021",
    },
  ];

  const skillCategories = [
    {
      title: "Languages",
      description: "Core programming languages I specialize in",
      skills: [
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      ],
    },
    {
      title: "Frontend Development",
      description: "Modern frontend technologies and frameworks",
      skills: [
        { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Tailwind CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Shadcn UI", logo: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
        { name: "Framer Motion", logo: "https://cdn.iconscout.com/icon/free/png-256/free-framer-3628191-3031011.png" },
      ],
    },
    {
      title: "Backend Development",
      description: "Server-side technologies and APIs",
      skills: [
        { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      ],
    },
    {
      title: "Database & Cloud",
      description: "Data storage and cloud infrastructure",
      skills: [
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      ],
    },
    {
      title: "Other Skills",
      description: "Additional technical competencies",
      skills: [
        { name: "UI/UX Design", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Performance Optimization", logo: "https://cdn-icons-png.flaticon.com/512/159/159704.png" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
        {/* Profile Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gradient Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 p-1"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Image Container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
                <Image
                  src="/img.jpg"
                  alt="Jatin's Profile"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.p
                className="text-sm text-blue-400 tracking-wider mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ABOUT ME
              </motion.p>
              <motion.h1
                className="text-4xl lg:text-5xl text-gray-100 font-serif font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Creating Digital Experiences
              </motion.h1>
              <motion.div
                className="h-px w-20 bg-gradient-to-r from-blue-400 to-indigo-500 my-6"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>

            <motion.p
              className="text-lg text-gray-400 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hello! I&apos;m Jatin, a passionate web developer with expertise in
              modern frameworks like Next.js and React.js. I specialize in
              crafting beautiful, scalable, and performant web experiences.
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              With a strong foundation in UI/UX design and performance
              optimization, I aim to create applications that are not only
              visually appealing but also highly functional and user-friendly.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-serif text-gray-100 font-light"
          >
            Education Journey
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid gap-6"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-blue-500/20 
                  transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl text-gray-100 font-light mb-2">
                  {edu.degree}
                </h3>
                <p className="text-gray-400 mb-2">{edu.institution}</p>
                <p className="text-blue-400 text-sm">{edu.duration}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-serif text-gray-100 font-light">
              Technical Expertise
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiencies
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid gap-8"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-gray-900/40 rounded-xl p-8 border border-gray-800"
              >
                <div className="mb-8">
                  <h3 className="text-2xl text-gray-100 font-light mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={itemVariants}
                      className="group"
                    >
                      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 
                        transition-all duration-300 group-hover:border-blue-500/30 
                        group-hover:bg-gray-800/80 group-hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 mb-4 p-2 bg-gray-900/50 rounded-lg">
                            <img
                              src={skill.logo}
                              alt={`${skill.name} Logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-gray-300 text-sm font-medium text-center">
                            {skill.name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}