"use client";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";

export default function LastPage({ guestData, onOpenConfirm, onOpenMusic }) {
  const saludo = "¡Nos vemos ahí!"
  
  // Base de estilo unificada para dimensiones exactas
  const commonStyles = "w-full py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-light transition-all duration-300 active:scale-95 flex items-center justify-center";
  
  // Estilo específico para Sugerir Canción (Bordeado)
  const buttonStyle = `${commonStyles} bg-transparent border border-[#c0c0c0]/40 text-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black`;
  
  // Estilo específico para Confirmar (Plateado sólido)
  const silverButtonBg = `${commonStyles} bg-gradient-to-b from-[#ffffff] via-[#c0c0c0] to-[#8a8a8a] text-[#1a1a1a] border-t border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.3)]`;

  return (
    <section className="relative z-40 bg-[#2E2E2E] pt-24 pb-24 px-4 flex flex-col items-center overflow-hidden">
      
      {/* Gradiente de entrada */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent opacity-100 z-0" />

      <Reveal>
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mt-4 mb-10">
            <span className="text-white/40 tracking-[0.5em] text-[10px] uppercase font-light mb-8">
              22.03.2026
            </span>

            <div className="flex flex-col gap-2 mb-4">
              <span className="text-2xl md:text-3xl font-serif text-[#c0c0c0] tracking-[0.4em] font-light italic">
                XV
              </span>
              <h2 className="text-6xl md:text-7xl font-serif italic text-white tracking-tight leading-tight">
                Maitena
              </h2>
            </div>

            <span className="text-[#c0c0c0]/30 tracking-[0.6em] text-[10px] uppercase font-light mb-12 block">
              Mis 15 Años
            </span>

            <div className="flex flex-col items-center gap-10 w-full px-4 lg:px-20">
              <p className="text-white/70 text-sm italic font-light leading-relaxed">
                ¡No te olvides de confirmar asistencia <br/> y sugerir una canción!
              </p>
              
              {/* Contenedor de botones con ancho controlado para que sean idénticos */}
              <div className="flex flex-col gap-4 w-full max-w-[260px] mx-auto">
                <button 
                  onClick={onOpenConfirm} 
                  className={silverButtonBg}
                >
                  Confirmar Asistencia
                </button>
                <button 
                  onClick={onOpenMusic} 
                  className={buttonStyle}
                >
                  Sugerir Canción
                </button>
              </div>

              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif italic text-white mt-16 mb-8 font-light"
              >
                {saludo}
              </motion.h3 >
            </div>
          </div>
        </div>
      </Reveal>

      {/* Gradiente de salida */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-100" />
    </section>
  );
}