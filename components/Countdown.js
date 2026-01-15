"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider"; 
import { Reveal } from "@/components/Reveal"

export default function Countdown({ date }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const silverColor = "#c0c0c0";

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(date) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  const mainTitle = timeLeft.d === 1 ? "Falta" : "Faltan";
  const dayLabel = timeLeft.d === 1 ? "Día" : "Días";

  const Block = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center min-w-[70px] md:min-w-[110px]">
      {/* Añadimos py-2 (vertical) y px-1 (horizontal) al span.
          'leading-none' asegura que el interlineado no desplace la máscara.
      */}
      <span className="block py-2 px-1 text-3xl md:text-6xl font-serif font-light tracking-tighter bg-gradient-to-b from-[#ffffff] via-[#c0c0c0] to-[#7a7a7a] bg-clip-text text-transparent leading-none">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#c0c0c0]/50 font-light mt-1 md:mt-2 text-center">
        {label}
      </span>
    </div>
  );

  const VerticalDivider = () => (
    <div className="h-8 md:h-12 w-[1px] bg-white/20 mx-0.5 md:mx-2 self-center mb-4 md:mb-6" />
  );

  return (
    <section className="relative z-30 bg-[#2E2E2E] pt-16 pb-12 px-2 md:px-4 flex flex-col items-center overflow-hidden">
      {/* 1. Gradiente de entrada */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#1a1a1a] to-transparent" />
      
      <Reveal>      
        {/* 2. DIVIDER SUPERIOR */}
        <Divider /> 
        
        {/* 3. Título */}
        <div className="flex justify-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-serif italic text-2xl md:text-4xl text-white mb-10 mt-8 tracking-wide relative z-10 text-center"
          >
            {mainTitle}
          </motion.h2>
        </div>

        {/* 4. BLOQUE DE NÚMEROS */}
        <div className="flex flex-row justify-center items-center w-full max-w-[360px] md:max-w-2xl relative z-10 px-2 mx-auto">
          <Block value={timeLeft.d} label={dayLabel} />
          <VerticalDivider />
          <Block value={timeLeft.h} label="Horas" />
          <VerticalDivider />
          <Block value={timeLeft.m} label="Min" />
          <VerticalDivider />
          <Block value={timeLeft.s} label="Seg" />
        </div>

        {/* 5. Reloj de arena */}
        <div className="mt-10 mb-10 flex justify-center items-center relative z-10">
          <motion.div 
            className="relative w-14 h-14 md:w-16 md:h-16 opacity-50"
            animate={{ rotate: [0, 0, 180] }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.85, 1], ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M6 2H18M6 22H18M7 2C7 2 7 9 12 12C17 9 17 2 17 2M7 22C7 22 7 15 12 12C17 15 17 22 17 22" stroke={silverColor} strokeWidth="0.8" strokeLinecap="round" />
              <motion.path d="M8 4C8 4 8 8 12 11C16 8 16 4 16 4H8Z" fill={silverColor} animate={{ scaleY: [1, 0, 0] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.85, 1], ease: "linear" }} style={{ transformOrigin: "bottom" }} />
              <motion.path d="M12 13C8 16 8 20 8 20H16C16 20 16 16 12 13Z" fill={silverColor} animate={{ scaleY: [0, 1, 1] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.85, 1], ease: "linear" }} style={{ transformOrigin: "bottom" }} />
              <motion.line x1="12" y1="11" x2="12" y2="13" stroke={silverColor} strokeWidth="0.5" strokeDasharray="1 2" animate={{ strokeDashoffset: [0, -6], opacity: [1, 0, 0] }} transition={{ strokeDashoffset: { duration: 0.5, repeat: Infinity, ease: "linear" }, opacity: { duration: 5, times: [0, 0.84, 1], repeat: Infinity } }} />
            </svg>
          </motion.div>
        </div>

        {/* 6. DIVIDER INFERIOR */}
        <Divider /> 
      </Reveal>
      
    </section>
  );
}