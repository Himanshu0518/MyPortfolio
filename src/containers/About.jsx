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
          className="relative flex items-center justify-center"
          variants={itemVariants}
        >
          {/* Floating Image with glow */}
          <motion.div className="relative">
            {/* Glow effect behind image */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{
                  background: "radial-gradient(circle, #3b82f6, transparent 70%)",
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            
            {/* Profile Image */}
            <motion.img
              src={about}
              alt="Profile"
              className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-500/40 shadow-2xl object-cover"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -12, 0],
                    }
              }
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
              }}
            />
          </motion.div>
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
              , <span className="text-blue-300 font-semibold">MLOps</span>, and{" "}
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
              className="block w-fit mx-auto"
            >
              <motion.button
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v4h16v-4"
                  />
                </svg>
                Download CV
              </motion.button>
            </a>

            <motion.a
              href="https://docs.google.com/document/d/1PfkepKJTyZPXimkeFMIXrQqBkjRxR6gwyiC0T6ajrKI/edit?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-full overflow-hidden w-fit mx-auto"
              style={{
                background: "linear-gradient(90deg,#10b981,#3b82f6,#8b5cf6)",
              }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Resume
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
