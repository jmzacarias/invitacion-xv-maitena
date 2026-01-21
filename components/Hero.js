"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero({ event }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  
  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden z-0 bg-black" 
    >
      <motion.div 
        style={{ y: yImage, opacity: opacity }} 
        className="absolute inset-0 h-[120%] w-full"
      >
        <img 
          src="/hero.jpg" 
          alt="Maitena" 
          className="w-full h-full object-cover" 
        />
      </motion.div>
    </section>
  );
}