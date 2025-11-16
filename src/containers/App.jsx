import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import ChatBot from "../components/AskHimanshu";
import { NeuralNetworkBackground } from "../components";

function App() {
  return (
    <>
      {/* Neural Network Background */}
      <NeuralNetworkBackground />
      
      <div className="w-full xl:w-[1600px] py-32 px-4 lg:px-12 pr-4 lg-pr-32 relative z-10">
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

        {/* AskHimanshu ChatBot */}
        <AnimatePresence>
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatBot />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
