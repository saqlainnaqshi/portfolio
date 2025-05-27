"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Portfolio() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [scrolled, setScrolled] = useState(false);

  // Scroll animations
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(darkModeMediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
      darkModeMediaQuery.addEventListener("change", handleChange);
      return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  };

  const handleLinkHover = (hovering: boolean) => setIsHovering(hovering);

  // Projects data
  const projects = {
    work: [
      {
        title: "AI Tour Guide for Kashmir",
        description: "AI-driven travel assistant with itinerary generation and local recommendations",
        tags: ["AI", "LLM", "Langchain", "React Native"],
        link: "https://play.google.com/store/apps/details?id=com.journey.sage",
        image: "/kashmir-ai-guide.jpg",
        type: "mobile"
      },
      {
        title: "Design Platform",
        description: "Social media design upload and sharing platform",
        tags: ["React Native", "Social Media"],
        link: "https://play.google.com/store/apps/details?id=com.palpixel.pixelbot",
        image: "/design-platform.jpg",
        type: "mobile"
      },
      {
        title: "Qadri Stationery",
        description: "E-commerce app for stationery products",
        tags: ["React Native", "E-commerce"],
        link: "https://play.google.com/store/apps/details?id=com.gildware.webView",
        image: "/stationery-app.jpg",
        type: "mobile"
      },
      {
        title: "Project Management SaaS",
        description: "Full-featured project tracking platform",
        tags: ["React", "Node.js", "Postgres", "SaaS"],
        link: "https://pd-f-dev.gildware.com",
        image: "/project-management.jpg",
        type: "web"
      }
    ],
    personal: [
      {
        title: "Kashmir Trains",
        description: "Real-time train tracking with multilingual support",
        tags: ["React Native", "API Integration"],
        link: "https://play.google.com/store/apps/details?id=com.Kashmir.TrainApp",
        image: "/kashmir-trains.jpeg",
        type: "mobile"
      },
      {
        title: "QR Code Generator",
        description: "Offline QR code scanner/generator with history",
        tags: ["React Native"],
        link: "https://play.google.com/store/apps/details?id=com.codeAisic.QRCodeApp",
        image: "/iconqr.png",
        type: "mobile"
      },
      {
        title: "Gulshan Seed",
        description: "E-commerce for agricultural products",
        tags: ["Next.js", "MERN"],
        link: "https://gulshanseed.com/",
        image: "/gulshan-seed.png",
        type: "web"
      },
      {
        title: "Magica Brows & Beauty",
        description: "Booking website for beauty services",
        tags: ["SEO", "Booking System"],
        link: "https://www.magica.ph/",
        image: "/magica.png",
        type: "web"
      },
      {
        title: "KashAttire",
        description: "E-commerce for Kashmiri clothing",
        tags: ["Full-Stack", "E-commerce"],
        link: "https://kashattire.onrender.com/",
        image: "/kash-attire.png",
        type: "web"
      },
      {
        title: "GoFindy",
        description: "Lead generation platform",
        tags: ["SaaS", "Payment Integration"],
        link: "https://gofindy.onrender.com",
        image: "/gofindy.png",
        type: "web"
      }
    ]
  };

  const filteredProjects = activeTab === "all"
    ? [...projects.work, ...projects.personal]
    : activeTab === "work"
      ? projects.work
      : projects.personal;

  return (
    <>
      <Head>
        <title>Saqlain Naqshi | Full-Stack Developer & AI Specialist</title>
        <meta name="description" content="Professional portfolio of Saqlain Naqshi - Full-Stack Web and App Developer, AI solutions and performant applications" />
      </Head>

      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-100 ${isHovering ? 'scale-150 bg-white' : 'scale-100 bg-blue-600'}`}
        style={{
          left: `${cursorPosition.x - 10}px`,
          top: `${cursorPosition.y - 10}px`,
          width: '20px',
          height: '20px',
          transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
        }}
      />

      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        {/* Animated Background */}
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden"
          style={{ y: yBg }}
        >
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`} />
        </motion.div>

        {/* Floating Particles */}
        <div className="fixed inset-0 -z-10 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-white' : 'bg-gray-900'}`}
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className={`fixed w-full py-4 px-6 sm:px-10 transition-all duration-300 z-40 ${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Saqlain Naqshi</span>
            </motion.div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#about" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                <a href="#skills" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
                <a href="#work" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Work</a>
                <a href="#projects" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
                <a href="#contact" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
              </nav>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-sm"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-32 sm:py-40">
          {/* Hero Section */}
          <section id="about" className="min-h-[80vh] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4 inline-block">
                Full-Stack Developer
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                Crafting <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital Experiences</span> with Code & AI
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I build performant web and mobile applications with cutting-edge technologies, AI integration and exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  href="#projects"
                  className="relative rounded-full border border-transparent transition-all flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white gap-2 hover:shadow-lg hover:shadow-blue-500/20 font-medium text-sm sm:text-base h-12 sm:h-14 px-5 sm:px-6 group overflow-hidden"
                >
                  <span className="relative z-10">View My Work</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  href="#contact"
                  className="relative rounded-full border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm sm:text-base h-12 sm:h-14 px-5 sm:px-6 group overflow-hidden"
                >
                  <span className="relative z-10">Contact Me</span>
                </motion.a>
              </div>
            </motion.div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
                  Technical Expertise
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  My toolkit for building exceptional digital experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Frontend Development",
                    icon: "💻",
                    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
                  },
                  {
                    title: "Backend Development",
                    icon: "⚙️",
                    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"]
                  },
                  {
                    title: "Mobile Development",
                    icon: "📱",
                    skills: ["React Native", "Android", "iOS", "Expo", "App Deployment"]
                  },
                  {
                    title: "AI & Machine Learning",
                    icon: "🧠",
                    skills: ["LLMs", "LangChain", "RAG", "OpenAI", "Gemini"]
                  }
                ].map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm hover:shadow-md transition-all`}
                  >
                    <div className="text-3xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, i) => (
                        <li key={i} className="flex items-center">
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`} />
                          <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Work Experience */}
          <section id="work" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
                  Professional Journey
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  My career path and professional experiences
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-6 top-0 h-full w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

                {/* Experience items */}
                <div className="space-y-10">
                  <div className="relative pl-16">
                    <div className={`absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
                      <div className="text-xl">💼</div>
                    </div>
                    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold">Software Engineer</h3>
                          <p className="text-gray-600 dark:text-gray-400">Gildware Technologies Pvt Ltd</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex justify-center items-center ${darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                          Apr 2024 - Apr 2025
                        </div>
                      </div>
                      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>Led full-stack development of 4+ web/mobile apps using React, Node.js, and React Native</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>Engineered RESTful APIs with Express.js and managed databases (MongoDB, PostgreSQL)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>Implemented AI features including chatbots and recommendation systems using LangChain</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>Participated in Agile development processes including sprint planning and retrospectives</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative pl-16">
                    <div className={`absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
                      <div className="text-xl">🎓</div>
                    </div>
                    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold">B.Tech in ECE</h3>
                          <p className="text-gray-600 dark:text-gray-400">University of Kashmir</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex justify-center items-center ${darkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                          Graduated 2023
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Specialized in Electronics and Communication Engineering with coursework in programming, data structures, and computer architecture.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Work Projects */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
                  Work Projects
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  Professional projects developed during my tenure at Gildware Technologies
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.work.map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`group relative overflow-hidden rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm hover:shadow-md transition-all`}
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <span key={i} className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700/80 text-gray-200' : 'bg-white/90 text-gray-800'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                        onMouseEnter={() => handleLinkHover(true)}
                        onMouseLeave={() => handleLinkHover(false)}
                      >
                        {project.type === "mobile" ? "View on Play Store" : "Visit Website"}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Personal Projects */}
          <section id="projects" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
                  Personal Projects
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  Side projects and initiatives showcasing my skills and creativity
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "all" ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  All Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("mobile")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "mobile" ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  Mobile Apps
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("web")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "web" ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  Web Apps
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => !projects.work.includes(p)).map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`group rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm hover:shadow-md transition-all overflow-hidden`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                        onMouseEnter={() => handleLinkHover(true)}
                        onMouseLeave={() => handleLinkHover(false)}
                      >
                        {project.type === "mobile" ? "View on Play Store" : "Visit Website"}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative inline-block">
                Get In Touch
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-12">
                Interested in working together or have questions? I'd love to hear from you.
              </p>

              <div className="w-full max-w-2xl mx-auto">
                <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <a
                      href="mailto:saqlainnaqshi@icloud.com"
                      className={`p-4 rounded-lg flex items-center gap-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      onMouseEnter={() => handleLinkHover(true)}
                      onMouseLeave={() => handleLinkHover(false)}
                    >
                      <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>saqlainnaqshi@icloud.com</p>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/saqlain-naqshi/"
                      target="_blank"
                      className={`p-4 rounded-lg flex items-center gap-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      onMouseEnter={() => handleLinkHover(true)}
                      onMouseLeave={() => handleLinkHover(false)}
                    >
                      <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">LinkedIn</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>saqlain-naqshi</p>
                      </div>
                    </a>
                    <a
                      href="https://github.com/saqlainnaqshi"
                      target="_blank"
                      className={`p-4 rounded-lg flex items-center gap-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      onMouseEnter={() => handleLinkHover(true)}
                      onMouseLeave={() => handleLinkHover(false)}
                    >
                      <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">GitHub</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>saqlainnaqshi</p>
                      </div>
                    </a>
                    <a
                      href="tel:+917006683919"
                      className={`p-4 rounded-lg flex items-center gap-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      onMouseEnter={() => handleLinkHover(true)}
                      onMouseLeave={() => handleLinkHover(false)}
                    >
                      <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+91 7006683919</p>
                      </div>
                    </a>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                        <input
                          type="text"
                          id="name"
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                        <input
                          type="email"
                          id="email"
                          className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Subject"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Your message"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Footer */}
        <footer className={`py-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <span className="text-lg font-bold">Saqlain Naqshi</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/saqlain-naqshi/"
                  target="_blank"
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/saqlainnaqshi"
                  target="_blank"
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} Saqlain Naqshi. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}