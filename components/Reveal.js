
"use client";
import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={`flex flex-col items-center w-full ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};