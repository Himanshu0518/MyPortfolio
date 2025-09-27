import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Hero } from "../assets";

function Home() {
  return (
    <section
      id="home"
      className="w-full h-screen flex flex-col justify-center items-center px-6 lg:px-20 relative bg-gradient-to-br"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
        {/* Hero Image Section - shows first on mobile */}
        <div className="w-full h-full flex items-center justify-center order-1 lg:order-2">
          <motion.img
            src={Hero}
            initial={{ y: 0 }}
            animate={{ y: [-20, 20, -20] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-72 lg:w-[400px] object-contain drop-shadow-2xl"
            alt="hero"
          />
        </div>

        {/* Left Content - shows second on mobile */}
        <motion.div
          className="flex flex-col items-start justify-center gap-6 text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Hi, I’m <span className="text-green-400">Himanshu Singh</span>
          </h1>

          {/* Running Title */}
          <TypeAnimation
            sequence={[
              "Full Stack AI/ML Developer",
              2000,
              "Machine Learning Enthusiast",
              2000,
              "Data Science Explorer",
              2000,
              "Turning Ideas into Reality",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-2xl lg:text-3xl font-semibold text-green-400"
          />

          {/* Short Summary (improved & personalized) */}
          <p className="text-lg text-slate-300 max-w-lg">
            I’m a Machine Learning and Data Science enthusiast with strong
            problem-solving skills and experience in{" "}
            <span className="text-green-400">MLOps</span>,{" "}
            <span className="text-green-400">Machine Learning</span>, and{" "}
            <span className="text-green-400">Natural Language Processing</span>.
            Alongside AI, I can build{" "}
            <span className="text-green-400">Full-Stack Web Applications</span>,
            integrate intelligent models into real products, and design
            scalable, efficient systems. Always curious and driven, I love
            combining modern software development with AI/ML to create impactful
            solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
