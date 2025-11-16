import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ProjectsData } from "../utils/helper";

function Projects() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="w-full min-h-screen py-20 px-6 lg:px-20 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            A collection of my work spanning AI/ML, full-stack apps, and modern
            engineering — blending creativity with technology.
          </p>
        </motion.div>

        {/* Grid of projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {ProjectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative rounded-lg overflow-hidden bg-slate-800/40 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Project thumbnail */}
              <div className="relative w-full h-48 overflow-hidden">
                <motion.img
                  src={project.imgSrc || "/placeholder.jpg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                >
                  {project.gitURL && (
                    <a
                      href={project.gitURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-slate-700 text-white hover:text-blue-400 hover:bg-slate-600 transition"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-400 transition"
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.name || "Untitled Project"}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
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
