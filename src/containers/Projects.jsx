import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ProjectsData } from "../utils/helper";

function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  // Floating particles
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        d: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 100 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
  };

  return (
    <section id="projects" className="w-full min-h-screen py-20 px-6 lg:px-20 relative">
        {!prefersReducedMotion && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
                  style={{
                    background: "radial-gradient(circle, #3b82f6, transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            )}
      
          
       
      {!prefersReducedMotion &&
        particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: p.left,
              top: p.top,
              background:
                "linear-gradient(90deg, rgba(34,197,94,1), rgba(59,130,246,1))",
            }}
            animate={{ y: [0, -25, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.delay }}
          />
        ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            My <span className="text-green-400">Projects</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A collection of my work spanning AI/ML, full-stack apps, and modern
            engineering — blending creativity with technology.
          </p>
        </motion.div>

        {/* Grid of projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {ProjectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:border-green-400/40 transition-all duration-300 shadow-lg"
            >
              {/* Project thumbnail */}
              <div className="relative w-full h-48 overflow-hidden">
                <motion.img
                  src={project.imgSrc || "/placeholder.jpg"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4"
                >
                  {project.gitURL && (
                    <a
                      href={project.gitURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-slate-800/80 text-white hover:text-green-400 hover:bg-slate-700 transition"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-green-500/90 text-white hover:bg-green-400 transition"
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                  {project.name || "Untitled Project"}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description ||
                    "A modern solution showcasing my expertise in building intelligent, scalable, and user-friendly applications."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
