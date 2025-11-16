
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Hero } from "../assets";
import { HomeSocialLinks } from "../components";
import { Socials } from "../utils/helper";

function Home() {


  return (
    <section
      id="home"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 lg:px-20 relative overflow-hidden p-4 mb-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center max-w-7xl mx-auto relative z-10">
        {/* Hero Image - first on mobile */}
        <div className="w-full flex items-center justify-center order-1 lg:order-2 relative">
          <motion.div className="relative z-10">
            <motion.img
              src={Hero}
              alt="hero"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-72 lg:w-[400px] object-contain"
            />
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-start justify-center gap-7 text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Heading */}
          <div className="relative">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold leading-tight relative z-10 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Hi, I'm{" "}
              <span className="text-blue-500">
                Himanshu Singh
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative flex items-center"
          >
            <TypeAnimation
              sequence={[
                "Full Stack AI/ML Developer",
                2000,
                "Machine Learning and MLOPS Enthusiast",
                2000,
                "AI Solution Architect",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-xl lg:text-2xl font-semibold text-slate-300"
            />
          </motion.div>

          {/* Summary */}
          <motion.p
            className="text-base lg:text-lg text-slate-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            I'm a{" "}
            <span className="text-blue-400 font-medium">
              Machine Learning & Data Science
            </span>{" "}
            enthusiast with strong foundations in{" "}
            <span className="text-blue-400 font-medium">MLOps</span>,{" "}
            <span className="text-blue-400 font-medium">NLP</span>, and{" "}
            <span className="text-blue-400 font-medium">
              full-stack engineering
            </span>
            . I design and ship intelligent, production-ready applications by
            combining rigorous modeling with scalable backends and thoughtful
            front-end experiences.
          </motion.p>

          {/* Actions + Socials */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <div className="flex items-center gap-4">
              <AnimatePresence>
                {Socials?.map((item, index) => (
                  <HomeSocialLinks
                    key={item.id || index}
                    data={item}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-slate-700/50"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            {[
              { number: "500+", label: "DSA Problems Solved" },
              { number: "End-to-End", label: "AI + Full-Stack" },
              { number: "MLOps", label: "Deploy • Monitor • Iterate" },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-start"
              >
                <span className="text-2xl lg:text-3xl font-bold text-blue-500">
                  {s.number}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
