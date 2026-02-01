"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero({ event }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mantenemos el efecto de movimiento suave
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden z-0 bg-black flex items-start justify-center" 
    >
      <motion.div 
        style={{ y: yImage, opacity: opacity }} 
        className="relative w-full h-full"
      >
        <img 
          src="/hero.jpg" 
          alt="Maitena" 
          // w-full asegura el ancho total
          // object-contain evita que se recorte cualquier parte de la foto vertical
          // object-top la pega al borde superior para que luzca mejor en el inicio
          className="w-full h-full object-contain object-top" 
        />
        
        {/* Overlay opcional por si necesitas que el texto sobre la foto se lea mejor */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </motion.div>
    </section>
  );
}
