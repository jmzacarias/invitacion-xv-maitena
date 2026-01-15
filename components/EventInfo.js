"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider";
import FrameContainer from "@/components/FrameContainer";
import { Reveal } from "@/components/Reveal";

export default function EventInfo({ attendance, onOpenConfirm }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const silverGradient = "bg-gradient-to-b from-white via-[#c0c0c0] to-[#7a7a7a]";
  const silverColor = "#c0c0c0";
  
  const silverButtonBg = "w-full max-w-[260px] py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-light bg-gradient-to-b from-[#ffffff] via-[#c0c0c0] to-[#8a8a8a] text-[#1a1a1a] border-t border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-200 flex justify-center items-center";

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Tres+Cruces+1915+Rafael+Castillo`;

  return (
    <>
      <section className="relative z-30 py-6 px-6 flex justify-center bg-[#1a1a1a]">
        <FrameContainer>
          <Reveal>
            <div className="flex flex-col items-center w-full max-w-full">
              
              {/* ICONO LUCIDE - Líneas finas y tamaño grande */}
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" 
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={silverColor}
                  strokeWidth="1.0" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-party-popper"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M5.8 11.3 2 22l10.7-3.79" />
                  <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
                  
                  <motion.g
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path d="M4 3h.01" />
                    <path d="M22 8h.01" />
                    <path d="M15 2h.01" />
                    <path d="M22 20h.01" />
                  </motion.g>

                  <motion.path 
                    d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" 
                    animate={{ pathLength: [0.9, 1, 0.9], x: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path 
                    d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" 
                    animate={{ pathLength: [0.8, 1, 0.8], x: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.path 
                    d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" 
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.svg>
              </div>

              <h2 className={`font-serif italic text-4xl md:text-5xl mb-2 tracking-wide text-center bg-clip-text text-transparent ${silverGradient}`}>Fiesta</h2>
              
              <svg viewBox="0 0 362 23" className="w-56 md:w-64 max-w-full h-auto my-4 opacity-60" fill="none">
                <g fill="#c0c0c0">
                  <path d="M181.146 8.81658C181.216 8.81658 181.286 8.80658 181.346 8.77658C181.636 8.66658 181.776 8.34658 181.676 8.05658C181.666 8.01658 181.506 7.45658 182.076 6.65658C183.436 4.78658 188.796 1.63658 209.356 1.63658H361.336C361.646 1.63658 361.906 1.38658 361.906 1.06658C361.906 0.746582 361.656 0.496582 361.336 0.496582H209.356C189.166 0.496582 182.846 3.52658 181.096 6.07658C180.226 7.33658 180.566 8.33658 180.606 8.44658C180.696 8.67658 180.906 8.80658 181.136 8.80658L181.146 8.81658Z" />
                  <path d="M181.316 8.80658C181.546 8.80658 181.756 8.67658 181.836 8.44658C181.876 8.33658 182.216 7.34658 181.346 6.07658C179.596 3.53658 173.276 0.496582 153.086 0.496582H1.11626C0.806265 0.496582 0.546265 0.746582 0.546265 1.06658C0.546265 1.38658 0.796265 1.63658 1.11626 1.63658H153.096C173.656 1.63658 179.016 4.78658 180.376 6.65658C180.966 7.45658 180.786 8.02658 180.776 8.05658C180.686 8.34658 180.836 8.66658 181.126 8.77658C181.186 8.79658 181.256 8.80658 181.316 8.80658Z" />
                </g>
                <path d="M181.146 22.5965L186.516 15.2365L181.146 7.32654L175.566 14.9565L181.146 22.5965Z" fill="#c0c0c0" />
              </svg>

              <div className="grid grid-cols-1 gap-12 w-full max-w-2xl mt-10">
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-[0.5em] text-[#c0c0c0]/40 uppercase mb-3 font-bold">Fecha</span>
                  <div className="min-h-[60px] flex items-center justify-center mb-4">
                    <h3 className="text-sm text-white font-sans">Sábado 21 de marzo, 21hs</h3>
                  </div>
                  <button className={silverButtonBg} onClick={() => setIsCalendarOpen(true)}>Agendar</button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-[0.5em] text-[#c0c0c0]/40 uppercase mb-3 font-bold">Lugar</span>
                  <div className="min-h-[60px] flex items-center justify-center mb-4">
                    <h3 className="text-sm text-white font-sans">Jah Jireh</h3>
                  </div>
                  <button onClick={onOpenConfirm} className={silverButtonBg}>Confirmar Asistencia</button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-[0.5em] text-[#c0c0c0]/40 uppercase mb-3 font-bold">Dirección</span>
                  <div className="min-h-[60px] flex flex-col items-center justify-center mb-4">
                    <h3 className="text-sm text-white font-sans leading-tight">Tres Cruces 1915, Rafael Castillo</h3>
                    <p className="text-[#c0c0c0]/40 text-[11px] italic mt-1">(A dos cuadras de Polledo)</p>
                  </div>
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className={silverButtonBg}>Cómo llegar</a>
                </div>
              </div>
              <div className="mt-12 w-full"><Divider /></div>
            </div>
          </Reveal>
        </FrameContainer>
      </section>

      {/* MODAL DE CALENDARIO ACTUALIZADO */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setIsCalendarOpen(false)}>
          <div className="bg-[#1a1a1a] border border-[#c0c0c0]/20 p-8 rounded-2xl max-w-sm w-full flex flex-col items-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-[#c0c0c0] uppercase tracking-[0.2em] text-xs mb-8 font-bold">Agendar evento</div>
            
            {/* Google Calendar Link */}
            <a 
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=XV+de+Maite+-+Jah+Jireh&dates=20250321T210000/20250322T060000&location=Tres+Cruces+1915,+Rafael+Castillo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full text-center py-4 border-b border-[#c0c0c0]/10 text-white text-sm font-sans"
            >
              Google Calendar
            </a>

            {/* Apple / Outlook Link (Apuntando a tu archivo en public) */}
            <a 
              href="/evento.ics" 
              download="evento.ics"
              className="w-full text-center py-4 border-b border-[#c0c0c0]/10 text-white text-sm font-sans"
              onClick={() => setIsCalendarOpen(false)}
            >
              Apple / Outlook
            </a>

            <button className="mt-8 text-[10px] text-[#c0c0c0]/50 uppercase tracking-[0.3em] font-sans" onClick={() => setIsCalendarOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}