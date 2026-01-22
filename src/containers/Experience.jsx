import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { ExperienceData } from "../utils/helper";

function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-20 py-18 relative overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Work <span className="text-blue-500">Experience</span>
          </motion.h2>

          <motion.p
            className="text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My professional journey in software development and technology
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-700 top-0"></div>

          {ExperienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 z-10 shadow-lg shadow-blue-500/50"></div>

              {/* Content Card */}
              <div className={`w-full lg:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "lg:ml-0" : "lg:ml-auto"
              }`}>
                <motion.div
                  className="relative p-6 rounded-lg bg-slate-800/40 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Current Badge */}
                  {experience.current && (
                    <div className="absolute -top-3 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Current
                    </div>
                  )}

                  {/* Company & Position */}
                  <div className="mb-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                      {experience.position}
                    </h3>
                    <p className="text-blue-400 font-semibold flex items-center gap-2">
                      <FaBriefcase className="text-sm flex-shrink-0" />
                      <span>{experience.company}</span>
                    </p>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-xs flex-shrink-0" />
                      <span className="whitespace-nowrap">{experience.duration}</span>
                      <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs whitespace-nowrap">
                        {experience.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-xs flex-shrink-0" />
                      <span>{experience.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2.5 mb-5 text-slate-300 text-sm leading-relaxed">
                    {experience.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs rounded-full hover:bg-blue-500/30 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;