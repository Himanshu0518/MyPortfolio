import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const tooltipVariants = {
  hidden: { opacity: 0, x: 10, scale: 0.95 }, // animate in from right
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 10, scale: 0.95 },
};

const MenuItem = ({ menu, index }) => {
  return (
    <div className="relative group">
      <a
        href={menu.uri}
        title={menu.label || `Menu item ${index + 1}`}
        className="w-12 h-12 rounded-full flex items-center justify-center
                   cursor-pointer hover:bg-gradient-to-br from-green-400 to-green-600 
                   transition-all duration-300 ease-in-out hover:scale-110"
      >
        <menu.Icon className="w-6 h-6 text-gray-200 group-hover:text-white transition-colors duration-300" />
      </a>

      {/* Tooltip (Left Side) */}
      <AnimatePresence>
        <motion.div
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 right-16 -translate-y-1/2 
                     bg-white text-black rounded-md shadow-lg px-3 py-1 
                     text-sm whitespace-nowrap hidden group-hover:block"
                     style={{boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.4)"}}
        >
          {menu?.name}
          {/* Tooltip arrow */}
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 shadow-md" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuItem;
