"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { G_SCRIPT_URL } from "@/utils/googleSheets";

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  guestNames = [], 
  onToggleGuest, 
  onConfirm 
}) {
  const PHONE_NUMBER = "5491136735438"; 

  const [showSummary, setShowSummary] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const asistentes = guestNames.filter(g => g.confirmed).map(g => g.nombre);
  const noAsistentes = guestNames.filter(g => !g.confirmed).map(g => g.nombre);

  const silverButtonBg = `
    bg-gradient-to-b from-[#ffffff] via-[#c0c0c0] to-[#8a8a8a] 
    text-[#1a1a1a] border-t border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.3)]
    active:scale-95 transition-all duration-200
  `;

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShowSummary(false);
        setIsSending(false);
      }, 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isSending) return;
    setShowSummary(false);
    onClose();
  };

  const handleWhatsAppSend = async () => {
    setIsSending(true);

    const dataForSheets = guestNames.map(guest => ({
      idInvitado: guest.idInvitado, 
      asistencia: guest.confirmed ? "confirmado" : "cancelado"
    }));

    try {
      const response = await fetch(G_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(dataForSheets),
      });

      const result = await response.json();

      const textoAsistentes = asistentes.length > 0 
        ? `✅ *Asistirá/n:*%0A- ${asistentes.join("%0A- ")}` 
        : "❌ *No asistirá nadie*";

      const textoNoAsistentes = noAsistentes.length > 0 
        ? `%0A%0A🚫 *No asistirá/n:*%0A- ${noAsistentes.join("%0A- ")}` 
        : "";

      const mensaje = `¡Hola! 👋 Quería confirmar la asistencia:%0A%0A${textoAsistentes}${textoNoAsistentes}`;
      const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${mensaje}`;
      
      window.open(whatsappUrl, "_blank");
      
      if (onConfirm) onConfirm();
      handleClose();

    } catch (error) {
      console.error("Error al guardar asistencia:", error);
      const mensajeFallback = `Confirmación de asistencia enviada.`;
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${mensajeFallback}`, "_blank");
      if (onConfirm) onConfirm();
      handleClose();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6" 
          onClick={handleClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#1a1a1a] border border-[#c0c0c0]/20 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!showSummary ? (
                <motion.div
                  key="selection"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-[#c0c0c0] uppercase tracking-[0.3em] text-[10px] mb-8 font-bold text-center">
                    Confirmar Asistencia
                  </div>

                  <div className="w-full space-y-4 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {guestNames.map((guest, index) => (
                      <div 
                        key={index} 
                        onClick={() => onToggleGuest(guest.nombre)} 
                        className="flex justify-between items-start cursor-pointer group py-3 border-b border-white/5"
                      >
                        <span className={`font-sans text-sm transition-colors duration-300 max-w-[80%] leading-tight break-words ${guest.confirmed ? 'text-white' : 'text-white/30'}`}>
                          {guest.nombre}
                        </span>
                         <div className={`w-5 h-5 border rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${guest.confirmed ? 'bg-white border-white' : 'border-white/20'}`}>
                          {guest.confirmed && (
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowSummary(true)}
                    disabled={guestNames.length === 0}
                    className={`w-full py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold disabled:opacity-50 ${silverButtonBg}`}
                  >
                    Siguiente
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="summary"
                  initial={{ x: 50, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-[#c0c0c0] uppercase tracking-[0.2em] text-[10px] mb-6 font-bold text-center border-b border-white/10 pb-4">
                    Resumen de Invitados
                  </div>

                  <div className="space-y-6 mb-10 text-left min-h-[100px]">
                    {asistentes.length > 0 && (
                      <div>
                        <p className="text-[9px] text-green-400 uppercase tracking-widest mb-1 font-bold">Asistirá/n:</p>
                        <p className="text-white font-sans text-sm leading-relaxed">
                          {asistentes.join(", ")}
                        </p>
                      </div>
                    )}

                    {noAsistentes.length > 0 && (
                      <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1 font-bold">No asistirá/n:</p>
                        <p className="text-white/40 font-sans text-sm leading-relaxed">
                          {noAsistentes.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleWhatsAppSend}
                      disabled={isSending}
                      className={`w-full py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold ${silverButtonBg} disabled:opacity-50`}
                    >
                      {isSending ? "Guardando..." : "Confirmar y enviar"}
                    </button>
                    {!isSending && (
                      <button 
                        onClick={() => setShowSummary(false)}
                        className="w-full py-2 text-[10px] text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors"
                      >
                        ← Volver a editar
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}