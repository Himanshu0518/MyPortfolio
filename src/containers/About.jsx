import React, {  useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { about } from "../assets";

function About() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="w-full min-h-screen flex justify-center items-center px-6 lg:px-20 py-20 relative overflow-hidden mt-12 pt-4"
    >
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
          <motion.div className="relative">
            <motion.img
              src={about}
              alt="Profile"
              className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-500/40 shadow-xl object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8 text-left"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              About Me
            </motion.h2>

            <motion.div
              className="h-1 bg-blue-500 rounded-full mt-2"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="text-slate-300 text-base lg:text-lg leading-relaxed">
              I'm <span className="text-white font-semibold">Himanshu Singh</span> —
              a passionate{" "}
              <span className="text-blue-400 font-medium">
                3rd year B.Tech student
              </span>{" "}
              at <span className="text-blue-300 font-medium">IIIT Una</span>{" "}
              with a{" "}
              <span className="text-blue-400 font-semibold">CGPA of 8.59</span> in{" "}
              <span className="text-slate-200 font-medium">
                Electronics and Communication Engineering
              </span>
              .
            </div>

            <p className="text-slate-300 text-base lg:text-lg leading-relaxed">
              I specialize in{" "}
              <span className="text-blue-400 font-medium">
                Machine Learning
              </span>
              , <span className="text-blue-300 font-medium">MLOps</span>, and{" "}
              <span className="text-slate-200 font-medium">
                Full Stack Development
              </span>
              , creating intelligent systems that bridge the gap between
              cutting-edge AI research and real-world applications.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={itemVariants}
          >
            <a
              href="https://docs.google.com/document/d/1PfkepKJTyZPXimkeFMIXrQqBkjRxR6gwyiC0T6ajrKI/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit"
            >
              <motion.button
                className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                Download
              </motion.button>
            </a>

            <motion.a
              href="https://docs.google.com/document/d/1PfkepKJTyZPXimkeFMIXrQqBkjRxR6gwyiC0T6ajrKI/edit?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Resume
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
