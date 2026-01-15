"use client";
import { Reveal } from "@/components/Reveal";
import React from "react";

export default function PersonalizedGuest({ guestData }) {
  const isLoading = !guestData || guestData.length === 0;
  const cantidad = guestData?.length || 0;

  return (
    <section className="relative z-30 bg-[#2E2E2E] pt-2 pb-40 px-6 flex flex-col items-center">
      <div className="flex flex-col items-center max-w-sm w-full relative z-10">
        
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-[#c0c0c0]/50 mb-4 font-medium text-center">
            Invitados
          </p>
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 shadow-lg flex items-center justify-center mb-6 mx-auto">
            <span className="text-xl md:text-2xl font-light text-white">
              {cantidad}
            </span>
          </div>
        </Reveal>

        <div className="text-center w-full overflow-visible">
          {isLoading ? (
            <p className="text-white/20 animate-pulse font-serif italic text-xl">Cargando nombres...</p>
          ) : (
            guestData.map((invitado, i) => (
              <React.Fragment key={i}>
                {/* Contenedor con overflow visible forzado para que 
                   la "G" o los remates no se corten nunca. 
                */}
                <div className="relative mb-4 overflow-visible"> 
                  <Reveal delay={0.2 + i * 0.15}>
                    <div className="overflow-visible !visible">
                      <h3 className="font-serif italic text-4xl md:text-5xl bg-gradient-to-b from-[#ffffff] via-[#c0c0c0] to-[#7a7a7a] bg-clip-text text-transparent leading-[1.4] py-2">
                        {invitado.nombre || "Invitado"}
                      </h3>
                    </div>
                  </Reveal>
                </div>
                
                {i < cantidad - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#c0c0c0]/20" />
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {!isLoading && (
          <Reveal delay={0.4 + cantidad * 0.15}>
            <p className="mt-14 font-sans text-[10px] md:text-[11px] tracking-[0.4em] text-[#c0c0c0]/60 leading-relaxed uppercase text-center max-w-[250px]">
              {cantidad === 1 ? (
                <>Me encantaría compartir <br /> esta noche mágica con vos</>
              ) : (
                <>Me encantaría compartir <br /> esta noche mágica con ustedes</>
              )}
            </p>
          </Reveal>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />

      <style jsx global>{`
        /* FORZAMOS a que cualquier contenedor dentro de Reveal 
           no corte los remates de las fuentes itálicas.
        */
        .text-center div {
          overflow: visible !important;
        }
        h3 {
          /* Evita que el navegador corte la parte inferior de letras como la g, j, y, p */
          padding-bottom: 0.2em !important;
          margin-bottom: -0.2em !important;
        }
      `}</style>
    </section>
  );
}