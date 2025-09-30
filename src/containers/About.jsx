import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { about } from "../assets";

function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        d: 4 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="w-full min-h-screen flex justify-center items-center px-6 lg:px-20 py-20 relative overflow-hidden mt-12 pt-4"
      onMouseMove={handleMouseMove}
    >
    
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
            className="absolute w-1 h-1 rounded-full bg-blue-400/60"
            style={{
              left: p.left,
              top: p.top,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.delay }}
          />
        ))}

      <motion.div
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
       
        <motion.div
          className="w-full flex justify-center items-center relative"
          variants={itemVariants}
        >
          <div className="relative group">
            {/* Single orbiting ring */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 w-80 h-80 -top-4 -left-4"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full border border-blue-400/30" />
                <motion.div
                  className="absolute top-4 left-1/2 w-2 h-2 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}

            {/* Simplified Image Container */}
            <motion.div
              className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-3xl p-1 bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl"
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.05 }
              }
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden bg-slate-800"
              >
                {/* Mouse interaction effect */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #3b82f6 0%, transparent 50%)`,
                  }}
                />

                <img
                  src={about}
                  alt="Profile"
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-blue-400/50 shadow-lg"
                />
              </div>

              {/* Simple status indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content - Simplified */}
        <motion.div
          className="flex flex-col gap-8 text-left"
          variants={itemVariants}
        >
          {/* Simplified Title */}
          <div className="relative">
            <motion.h2
              className="text-4xl lg:text-6xl font-black text-white leading-tight"
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : {
                      color: ["#ffffff", "#3b82f6", "#ffffff"],
                    }
              }
              transition={{ duration: 3, repeat: Infinity }}
            >
              About Me
            </motion.h2>

            <motion.div
              className="h-1 bg-blue-500 rounded-full mt-2"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {/* Simplified Description */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="text-slate-300 text-lg lg:text-xl leading-relaxed">
              I'm <span className="text-white font-bold">Himanshu Singh</span> —
              a passionate{" "}
              <span className="text-blue-400 font-semibold">
                3rd year B.Tech student
              </span>{" "}
              at <span className="text-blue-300 font-semibold">IIIT Una</span>{" "}
              with a{" "}
              <span className="text-blue-400 font-bold">CGPA of 8.59</span> in{" "}
              <span className="text-slate-200 font-semibold">
                Electronics and Communication Engineering
              </span>
              .
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
              I specialize in{" "}
              <span className="text-blue-400 font-semibold">
                Machine Learning
              </span>
              ,{" "}
              <span className="text-blue-300 font-semibold">
                MLOps
              </span>
              , and{" "}
              <span className="text-slate-200 font-semibold">
                Full Stack Development
              </span>
              , creating intelligent systems that bridge the gap between
              cutting-edge AI research and real-world applications.
            </p>
          </motion.div>

          {/* Simplified CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={itemVariants}
          >
            <a
              href="https://docs.google.com/document/d/1PfkepKJTyZPXimkeFMIXrQqBkjRxR6gwyiC0T6ajrKI/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV
              </motion.button>
            </a>
                       <motion.a
                          href="https://docs.google.com/document/d/1PfkepKJTyZPXimkeFMIXrQqBkjRxR6gwyiC0T6ajrKI/edit?usp=drive_link"
                          className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white rounded-full overflow-hidden"
                          style={{
                            background: "linear-gradient(90deg,#10b981,#3b82f6,#8b5cf6)",
                          }}
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                         
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Resume
                            <motion.svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={prefersReducedMotion ? undefined : { x: [0, 6, 0] }}
                              transition={{ duration: 1.4, repeat: Infinity }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </motion.svg>
                          </span>
                          {!prefersReducedMotion && (
                            <motion.div
                              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"
                              style={{
                                background:
                                  "linear-gradient(90deg,#10b981,#3b82f6,#8b5cf6)",
                              }}
                              animate={{ scale: [1, 1.08, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;