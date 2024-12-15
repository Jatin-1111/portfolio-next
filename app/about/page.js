"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header"; // Include Header if needed

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

  const skills = [
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "React.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Tailwind CSS",
      logo: "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "UI/UX Design",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Performance Optimization",
      logo: "https://cdn-icons-png.flaticon.com/512/159/159704.png",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-primary overflow-hidden">
      {/* Header Section */}
      <Header />

      {/* About Content */}
      <section className="flex-grow px-6 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-20 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {/* Introduction Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-center gap-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Picture */}
          <motion.div
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0 rounded-full overflow-hidden border-4 border-accentBlue shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/img.jpg"
              alt="Jatin's Profile"
              width={384}
              height={384}
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* About Text */}
          <motion.div
            className="mt-8 lg:mt-0 lg:ml-12 max-w-3xl text-center lg:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-header font-semibold text-accentBlue">
              About Me
            </h1>
            <p className="mt-4 text-base sm:text-lg text-textSecondary">
              Hello! I&apos;m Jatin, a passionate web developer with expertise in
              modern frameworks like Next.js and React.js. I specialize in
              crafting beautiful, scalable, and performant web experiences. My
              focus lies in delivering clean and efficient code to meet your
              project needs.
            </p>
            <p className="mt-4 px-3 md:px-0 text-base sm:text-lg text-textSecondary">
              With a strong foundation in UI/UX design and performance
              optimization, I aim to create applications that are not only
              visually appealing but also highly functional and user-friendly.
            </p>
          </motion.div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-header text-accentBlue text-center lg:text-left">
            Education
          </h2>
          <div className="mt-6 space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-primary border border-accentBlue rounded-md p-4 shadow hover:shadow-lg transition-all space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg sm:text-xl font-body text-textMain">
                  {edu.degree}
                </h3>
                <p className="text-sm sm:text-base text-textSecondary">
                  {edu.institution}
                </p>
                <p className="text-sm sm:text-base text-textSecondary">
                  {edu.duration}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-header text-accentBlue text-center lg:text-left">
            My Skills
          </h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-primary border border-accentBlue rounded-md p-4 text-center shadow hover:shadow-lg transition-all flex flex-col items-center space-y-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Skill Logo */}
                <div className="w-12 h-12">
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} Logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                {/* Skill Name */}
                <p className="text-sm sm:text-base font-body text-textMain">
                  {skill.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
