import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeSocialLinks = ({ data, index }) => {
  return (
    <motion.a
      key={index}
      href={data.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1.2,
          transition: { duration: 0.3 }
        }}
      />
      
      {/* Main container */}
      <motion.div
        className="relative w-14 h-14 rounded-full flex items-center justify-center
                   bg-gradient-to-br from-slate-800/50 to-slate-900/50 
                   border border-slate-700/50 backdrop-blur-sm
                   shadow-lg shadow-black/25
                   group-hover:border-green-400/50 
                   group-hover:shadow-green-400/20 group-hover:shadow-xl
                   transition-all duration-300"
        whileHover={{
          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
        }}
      >
        <AnimatePresence>
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ rotate: 0 }}
            whileHover={{ 
              rotate: 360,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            <data.Icon 
              className="text-slate-300 group-hover:text-green-400 
                        transition-colors duration-300 text-xl
                        drop-shadow-sm"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Pulse effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400/0 
                     group-hover:border-green-400/30"
          initial={{ scale: 1 }}
          whileHover={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2
                   bg-slate-800 text-white text-sm px-3 py-1 rounded-md
                   opacity-0 group-hover:opacity-100 pointer-events-none
                   border border-slate-700 shadow-lg
                   transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {data.label || data.name}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                       w-2 h-2 bg-slate-800 border-l border-t border-slate-700 
                       rotate-45"></div>
      </motion.div>
    </motion.a>
  );
};

export default HomeSocialLinks;