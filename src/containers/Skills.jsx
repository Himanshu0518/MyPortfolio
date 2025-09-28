import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";

function Skills() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [activeHighlight, setActiveHighlight] = useState(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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

  // Memoize particles to prevent jumping
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        d: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      gradient: "from-green-400 via-blue-500 to-purple-600",
      skills: ["Python", "C++", "JavaScript"],
      description: "Core programming languages for diverse applications"
    },
    {
      title: "Machine Learning & AI",
      icon: "🤖",
      gradient: "from-emerald-400 via-cyan-500 to-blue-500",
      skills: ["TensorFlow", "Scikit-Learn", "Transformers", "langchain"],
      description: "Advanced ML algorithms and deep learning frameworks"
    },
    {
      title: "Data Science & Analytics",
      icon: "📊",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "NLTK"],
      description: "Data manipulation, visualization and analysis tools"
    },
    {
      title: "MLOps & DevOps",
      icon: "⚙️",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      skills: ["Docker", "MLflow", "DVC", "GitHub Actions"],
      description: "Model deployment, versioning and CI/CD pipelines"
    },
    {
      title: "Web Development",
      icon: "🌐",
      gradient: "from-teal-400 via-emerald-500 to-green-500",
      skills: ["React.js", "Node.js", "FastAPI", "Tailwind CSS", "Framer Motion","Scdcn-ui","firebase"],
      description: "Modern full-stack web development technologies"
    },
    {
      title: "Databases & Cloud",
      icon: "☁️",
      gradient: "from-violet-400 via-purple-500 to-blue-600",
      skills: ["MongoDB", "AWS S3", "AWS EC2", "firestore"],
      description: "Database management and cloud infrastructure"
    }
  ];


  return (
    <section
      id="skills"
      ref={ref}
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 lg:px-20 py-20 relative overflow-hidden"
    >
      {/* Custom Cursor (desktop only) - Same as Home */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full mix-blend-difference pointer-events-none z-50 hidden lg:block"
        style={{
          background: "linear-gradient(90deg, rgba(34,197,94,1), rgba(59,130,246,1))",
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Ambient glows - Consistent with Home */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: "linear-gradient(90deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))",
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 120, 240, 360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-10 -right-10 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: "linear-gradient(90deg, rgba(59,130,246,0.12), rgba(34,197,94,0.12))",
            }}
            animate={{ scale: [1, 1.12, 1], rotate: [360, 240, 120, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
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
              background: "linear-gradient(90deg, rgba(34,197,94,1), rgba(59,130,246,1))",
            }}
            animate={{ y: [0, -28, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.delay }}
          />
        ))}

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          <motion.h2
            className="text-4xl lg:text-6xl font-black mb-4"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Skills & 
            <span
              className="relative inline-block ml-4"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Expertise
            </span>
          </motion.h2>
          
          {!prefersReducedMotion && (
            <motion.div
              className="mx-auto h-1 rounded-full mb-6"
              style={{
                background: "linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)",
              }}
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />
          )}

          <motion.p
            className="text-lg lg:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
            }}
          >
            A comprehensive toolkit spanning{" "}
            <span className="text-green-400 font-semibold">Machine Learning</span>,{" "}
            <span className="text-blue-400 font-semibold">Full-Stack Development</span>, and{" "}
            <span className="text-purple-400 font-semibold">MLOps</span>{" "}
            - enabling end-to-end AI solution development.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              className="relative group h-full"
              variants={itemVariants}
              onMouseEnter={() => {
                setActiveHighlight(i);
                setCursorVariant("text");
              }}
              onMouseLeave={() => {
                setActiveHighlight(null);
                setCursorVariant("default");
              }}
            >
              {/* Card Background with Glass Effect */}
              <motion.div
                className="relative p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden h-full flex flex-col"
                style={{
                  background: activeHighlight === i 
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(51, 65, 85, 0.7))'
                    : 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(51, 65, 85, 0.4))'
                }}
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.02, 
                  y: prefersReducedMotion ? 0 : -5 
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10`}
                  transition={{ duration: 0.3 }}
                />

                {/* Glowing Border Effect */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(90deg, ${category.gradient})`,
                      mask: "radial-gradient(closest-side, transparent 98%, black 99%)",
                      WebkitMask: "radial-gradient(closest-side, transparent 98%, black 99%)",
                    }}
                    animate={{
                      opacity: activeHighlight === i ? [0, 0.5, 0] : 0,
                      rotate: activeHighlight === i ? 360 : 0,
                    }}
                    transition={{ duration: 2, repeat: activeHighlight === i ? Infinity : 0 }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      className="text-3xl"
                      animate={{ 
                        rotate: activeHighlight === i ? [0, 15, -15, 0] : 0,
                        scale: activeHighlight === i ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {category.icon}
                    </motion.span>
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      {category.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                    {category.description}
                  </p>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-800/60 text-slate-200 border border-slate-600/40 backdrop-blur-sm"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                <motion.div
                  className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}
                  animate={{
                    scale: activeHighlight === i ? [1, 1.5, 1] : 1,
                    opacity: activeHighlight === i ? [0.5, 1, 0.5] : 0.4,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: activeHighlight === i && !prefersReducedMotion ? Infinity : 0 
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;