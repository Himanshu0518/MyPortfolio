import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';

import {Socials} from "../utils/helper"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const prefersReducedMotion = useReducedMotion();

  // Particle system
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        d: 5 + Math.random() * 3,
        delay: Math.random() * 3,
        size: Math.random() > 0.5 ? 1 : 2,
        color: Math.random() > 0.5 ? 'green' : 'blue',
      })),
    []
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = () => {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Himanshu Singh'
    };

    emailjs
      .send(
        import.meta.env.VITE_MAIL_SERVICE_ID, 
        import.meta.env.VITE_MAIL_TEMPLATE_ID, 
        templateParams,
        {
          publicKey: import.meta.env.VITE_PUBLIC_MAIL_KEY,
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      sendEmail();
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
       
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: "Email Me",
      value: "himanshu.iiitu2027@gmail.com",
      link: "mailto:himanshu.iiitu2027@gmail.com",
      color: "from-red-400 to-pink-400"
    },
    {
      icon: FaPhone,
      title: "Call Me",
      value: "+91 8188937945",
      link: "tel:+918188937945",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Una, Himachal Pradesh, IN",
      link: "https://maps.google.com/?q=Una,Himachal+Pradesh",
      color: "from-green-400 to-emerald-400"
    },
  ];

  return (
    <section 
      id="contact" 
      className="w-full min-h-screen py-20 px-6 lg:px-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single ambient glow */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background: "radial-gradient(circle, #22c55e, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Floating Particles */}
      {!prefersReducedMotion &&
        particles.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full pointer-events-none`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color === 'green' 
                ? "linear-gradient(45deg, rgba(34,197,94,0.6), rgba(16,185,129,0.4))"
                : "linear-gradient(45deg, rgba(59,130,246,0.6), rgba(6,182,212,0.4))",
              boxShadow: p.color === 'green'
                ? "0 0 10px rgba(34,197,94,0.3)"
                : "0 0 10px rgba(59,130,246,0.3)",
            }}
            animate={{ 
              y: [0, -40, 0],
              x: [0, Math.random() > 0.5 ? 20 : -20, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: p.d, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Let's <span className="text-green-400">Connect</span>
          </h2>
          
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's discuss how we can bring your ideas to life with cutting-edge technology.
          </motion.p>
          
          {/* Simplified decorative line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact <span className="text-green-400">Information</span>
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${method.color} bg-opacity-20 rounded-xl flex items-center justify-center border border-current border-opacity-30`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className={`text-xl bg-gradient-to-r ${method.color} bg-clip-text text-transparent`} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                        {method.title}
                      </h4>
                      <p className="text-slate-400 text-sm">{method.value}</p>
                    </div>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <FaPaperPlane className="text-green-400 text-sm" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-3">
                {Socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 flex items-center justify-center hover:border-green-400/50 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    
                    <social.Icon className="text-slate-400 group-hover:text-green-400 transition-colors duration-300" />
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-700"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {social.label}
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            <h3 className="text-2xl font-bold text-white mb-6">
              Send me a <span className="text-green-400">Message</span>
            </h3>

            <AnimatePresence>
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-400/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaCheckCircle className="text-2xl text-green-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-400">Thank you for reaching out. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 bg-slate-700/30 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300 ${
                          focusedField === 'name' ? 'border-green-400/50' : 'border-slate-600/50'
                        }`}
                        placeholder="Your Name"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 bg-slate-700/30 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300 ${
                          focusedField === 'email' ? 'border-green-400/50' : 'border-slate-600/50'
                        }`}
                        placeholder="Your Email"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-slate-700/30 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300 ${
                        focusedField === 'subject' ? 'border-green-400/50' : 'border-slate-600/50'
                      }`}
                      placeholder="Subject"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: focusedField === 'subject' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 bg-slate-700/30 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-300 resize-none ${
                        focusedField === 'message' ? 'border-green-400/50' : 'border-slate-600/50'
                      }`}
                      placeholder="Your Message"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-slate-400 text-sm">
            Open to opportunities • Available for freelance projects • Response time: 24-48 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;