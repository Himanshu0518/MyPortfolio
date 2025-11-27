import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { blogs } from "../utils/helper";

function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="blogs" className="w-full min-h-screen py-20 px-6 lg:px-20 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="text-blue-500">Blogs</span>
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Insights on AI/ML, data science, and engineering — exploring real-world
            applications and technical deep-dives.
          </p>
        </motion.div>

        {/* Grid of blogs */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={cardVariants}
              className="group relative rounded-lg overflow-hidden bg-slate-800/40 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full"
            >
              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {blog.description}
                </p>

                {/* Read More Link */}
                <div className="pt-4 border-t border-slate-700/50">
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium group/link"
                  >
                    Read Article
                    <FaArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Blog;