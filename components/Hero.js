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
        className="relative w-full h-full"
      >
        <img 
          src="/hero.jpg" 
          alt="Maitena" 
          // Cambiamos a h-auto y quitamos h-full para que no intente centrarse verticalmente
          className="w-full h-auto min-h-full object-contain object-top" 
        />
        
        {/* DEGRADADO REFORZADO: Más alto (h-1/2) y con negro puro al final */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/90 to-transparent z-20" />
        
        {/* Overlay extra para oscurecer un poco la base de la foto */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </motion.div>
    </section>
  );
}