'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About me' }
  ];

  const experiences = [
    {
      title: "Frontend Developer",
      company: "UNIQUS EDUTECH SOLUTIONS",
      period: "Jan 2025 - Present • 3 mos",
      location: "Remote",
      description: "Develop responsive web applications using React.js. Implemented UI components with Tailwind CSS and improved site performance.",
      technologies: ["React.js", "Tailwind CSS", "Framer Motion"]
    },
  ];

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

  const skills = [
    {
      category: "Frontend Development",
      items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript", "TypeScript"]
    },
    {
      category: "Backend Development",
      items: ["Express.js", "Node.js", "REST APIs"]
    },
    {
      category: "Database & Tools",
      items: ["MongoDB", "Firebase", "Git", "VS Code", "Figma"]
    }
  ];

  const about = {
    name: "Jatin",
    title: "Full Stack Developer",
    description: "Passionate web developer with expertise in modern frontend frameworks like React.js and Next.js, as well as backend technologies. I specialize in creating beautiful, scalable, and performant web experiences with a strong focus on UI/UX design and performance optimization.",
    interests: ["Web Development", "Open Source", "UI/UX Design", "New Technologies"]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl text-white font-light mb-2">My experience</h2>
              <p className="text-gray-400">Showcasing my journey through diverse development roles</p>
            </div>

            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl text-white font-medium">{exp.title}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                    <p className="text-gray-400 text-sm mt-1">{exp.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 text-sm">{exp.period}</span>
                    <div className="w-8 h-8 bg-gray-700 rounded-full ml-4 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-900/70 text-blue-300 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 'education':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl text-white font-light mb-2">Education Journey</h2>
              <p className="text-gray-400">My academic background and qualifications</p>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all">
                  <h3 className="text-xl text-white font-light mb-2">{edu.degree}</h3>
                  <p className="text-gray-300 mb-2">{edu.institution}</p>
                  <p className="text-blue-400 text-sm">{edu.duration}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl text-white font-light mb-2">Technical Skills</h2>
              <p className="text-gray-400">A comprehensive overview of my technical expertise</p>
            </div>

            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl text-white font-light mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-900/70 text-blue-300 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl text-white font-light mb-2">About Me</h2>
                  <p className="text-blue-400 text-xl">{about.title}</p>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {about.description}
                </p>

                <div>
                  <h3 className="text-white text-lg mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.interests.map((interest, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 text-blue-300 text-sm rounded-full border border-gray-700">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-32 px-10 md:py-44 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Main content with tabs */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with tabs */}
          <div className="md:w-72 space-y-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`w-full py-4 px-6 rounded-lg text-center transition-all ${activeTab === tab.id
                  ? 'bg-blue-400 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;