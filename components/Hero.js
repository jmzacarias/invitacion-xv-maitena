"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero({ event }) {
  const containerRef = useRef(null);
  
  // Monitoreamos el scroll específicamente de este contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. EFECTO PARALLAX (ya lo tienes)
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // 2. RECUPERAR EL DESVANECIMIENTO
  // A medida que el scroll va de 0 (inicio) a 1 (final del Hero), 
  // la opacidad baja de 1 a 0.
  // He puesto 0.8 para que el desvanecimiento sea total justo antes de que desaparezca.
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