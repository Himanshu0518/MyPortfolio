import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Hero } from "../assets";
import { HomeSocialLinks } from "../components";
import { Socials } from "../utils/helper";

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      opacity: 0.9,
    },
    text: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      scale: 1.5,
      opacity: 1,
    },
  };

  // memoize particle positions so they don't jump each render
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
    <section
      id="home"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 lg:px-20 relative overflow-hidden p-4 mb-4"
    >
      {/* Custom Cursor (desktop only) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full mix-blend-difference pointer-events-none z-50 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,197,94,1), rgba(59,130,246,1))",
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Slow-moving ambient glows */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 120, 240, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-10 -right-10 w-96 h-96 rounded-full blur-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(59,130,246,0.18), rgba(34,197,94,0.18))",
            }}
            animate={{ scale: [1, 1.12, 1], rotate: [360, 240, 120, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Floating Particles */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center max-w-7xl mx-auto relative z-10">
        {/* Hero Image - first on mobile */}
        <div className="w-full flex items-center justify-center order-1 lg:order-2 relative">
          {/* Conic gradient ring */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute w-[420px] h-[420px] max-w-[75vw] max-h-[75vw] rounded-full"
              style={{
                mask: "radial-gradient(closest-side, transparent 72%, black 73%)",
                WebkitMask:
                  "radial-gradient(closest-side, transparent 72%, black 73%)",
                filter: "blur(0.5px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          )}

          <motion.div
            className="relative z-10"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <motion.img
              src={Hero}
              initial={{ y: 0, scale: 0.92, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { scale: 1, opacity: 1 }
                  : { y: [-16, 16, -16], scale: 1, opacity: 1 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.6 }
                  : {
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      },
                      scale: { duration: 0.7, delay: 0.1 },
                      opacity: { duration: 0.7, delay: 0.1 },
                    }
              }
              className="w-72 lg:w-[400px] object-contain drop-shadow-[0_0_28px_rgba(34,197,94,0.35)]"
              alt="hero"
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.03, filter: "brightness(1.1) contrast(1.1)" }
              }
            />
          </motion.div>
        </div>

      
        <motion.div
          className="flex flex-col items-start justify-center gap-7 text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Heading */}
          <div className="relative">
            <motion.h1
              className="text-4xl lg:text-7xl font-black leading-tight relative z-10"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Hi, I’m{" "}
              <span
                className="relative inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Himanshu Singh
              </span>
            </motion.h1>
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -bottom-2 left-0 h-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)",
                }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.9, delay: 0.9 }}
              />
            )}
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative flex items-center"
          >
            <TypeAnimation
              sequence={[
                "Full Stack AI/ML Developer",
                2000,
                "Machine Learning Enthusiast",
                2000,
                "Data Science Explorer",
                2000,
                "MLOps Specialist",
                2000,
                "AI Solution Architect",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-purple-600 bg-clip-text text-transparent"
            />
            {!prefersReducedMotion && (
              <motion.span
                className="inline-block w-1 h-8 lg:h-10 bg-green-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Summary (skills-focused, no projects) */}
          <motion.p
            className="text-lg lg:text-xl text-slate-300/90 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            I’m a{" "}
            <span className="text-emerald-400 font-semibold">
              Machine Learning & Data Science
            </span>{" "}
            enthusiast with strong foundations in{" "}
            <span className="text-emerald-400 font-semibold">MLOps</span>,{" "}
            <span className="text-emerald-400 font-semibold">NLP</span>, and{" "}
            <span className="text-emerald-400 font-semibold">
              full-stack engineering
            </span>
            . I design and ship intelligent, production-ready applications by
            combining rigorous modeling with scalable backends and thoughtful
            front-end experiences.
          </motion.p>

          {/* Actions + Socials */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-2"
            initial={{ opacity: 0, y: 28 }}
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

          {/* Stats (subtle) */}
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
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              >
                <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
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
