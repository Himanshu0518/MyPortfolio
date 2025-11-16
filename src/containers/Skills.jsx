import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Skills() {
  const [activeHighlight, setActiveHighlight] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: ["Python", "C++", "JavaScript"],
      description: "Core programming languages for diverse applications"
    },
    {
      title: "Machine Learning & AI",
      icon: "🤖",
      skills: ["TensorFlow", "Scikit-Learn", "Transformers", "langchain"],
      description: "Advanced ML algorithms and deep learning frameworks"
    },
    {
      title: "Data Science & Analytics",
      icon: "📊",
      skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "NLTK"],
      description: "Data manipulation, visualization and analysis tools"
    },
    {
      title: "MLOps & DevOps",
      icon: "⚙️",
      skills: ["Docker", "MLflow", "DVC", "GitHub Actions"],
      description: "Model deployment, versioning and CI/CD pipelines"
    },
    {
      title: "Web Development",
      icon: "🌐",
      skills: ["React.js", "Node.js", "FastAPI", "Tailwind CSS", "Framer Motion","Shadcn-ui","firebase"],
      description: "Modern full-stack web development technologies"
    },
    {
      title: "Databases & Cloud",
      icon: "☁️",
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
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-4 text-white"
          >
            Skills & <span className="text-blue-500">Expertise</span>
          </motion.h2>

          <motion.p
            className="text-base lg:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A comprehensive toolkit spanning{" "}
            <span className="text-blue-400 font-medium">Machine Learning</span>,{" "}
            <span className="text-blue-400 font-medium">Full-Stack Development</span>, and{" "}
            <span className="text-blue-400 font-medium">MLOps</span>{" "}
            - enabling end-to-end AI solution development.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              className="relative group h-full"
              variants={itemVariants}
              onMouseEnter={() => setActiveHighlight(i)}
              onMouseLeave={() => setActiveHighlight(null)}
            >
              {/* Card Background */}
              <motion.div
                className="relative p-6 rounded-lg bg-slate-800/40 border border-slate-700 hover:border-blue-500/50 overflow-hidden h-full flex flex-col transition-all duration-300"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                    {category.description}
                  </p>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-700/60 text-slate-200 border border-slate-600"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
