import React, {  useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";


function App() {
   const prefersReducedMotion = useReducedMotion();

    const particles = useMemo(
      () =>
        Array.from({ length: 18 }).map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          d: 3 + Math.random() * 2,
          delay: Math.random() * 2,
        })),
      []
    );
  return (
    <div className="w-full xl:w-[1600px] py-32 px-4 lg:px-12 pr-4 lg-pr-32">

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
            animate={{ y: [0, -28, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.delay }}
          />
        ))}
   
      {/* Header */}
      <Header />
      {/* Home Container */}
      <Home />

      {/* About Page */}

      <About />

      {/* Skills */}

      <Skills />

      {/* Projects */}

      <Projects />

     {/* Contact */}

      <Contact />
    </div>
  );
}

export default App;
