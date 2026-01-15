"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { G_SCRIPT_URL } from "@/utils/googleSheets";

export default function MusicModal({ isOpen, onClose, guestName }) {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cancion: "",
    autor: "",
    link: ""
  });

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleClose = () => {
    setShowSuccess(false);
    setIsSending(false);
    setFormData({ cancion: "", autor: "", link: "" });
    onClose();
  };

  const silverButtonBg = `
    bg-gradient-to-b from-[#ffffff] via-[#c0c0c0] to-[#8a8a8a] 
    text-[#1a1a1a] border-t border-white/40 font-bold active:scale-95 transition-all
  `;

  const inputStyle = `
    w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 
    text-white text-sm focus:outline-none focus:border-white/30 transition-colors
    placeholder:text-white/20 font-sans
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const musicData = {
      action: "addMusic",
      values: [
        guestName || "Invitado Desconocido",
        formData.cancion,
        formData.autor,
        formData.link || "-"
      ]
    };

    try {
      await fetch(G_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(musicData),
      });

      setShowSuccess(true);
    } catch (error) {
      console.error("Error al guardar música:", error);
      alert("Hubo un error al registrar tu sugerencia.");
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6" onClick={handleClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-[#c0c0c0] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold text-center">
                    Tu Sugerencia Musical
                  </div>
                  <div className="text-white/40 text-[9px] uppercase tracking-widest text-center mb-6">
                    Sugerencia de: <span className="text-[#c0c0c0]">{guestName}</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      required
                      disabled={isSending}
                      placeholder="Nombre de la canción"
                      className={inputStyle}
                      value={formData.cancion}
                      onChange={(e) => setFormData({...formData, cancion: e.target.value})}
                    />
                    <input 
                      required
                      disabled={isSending}
                      placeholder="Autor / Banda"
                      className={inputStyle}
                      value={formData.autor}
                      onChange={(e) => setFormData({...formData, autor: e.target.value})}
                    />
                    <input 
                      disabled={isSending}
                      placeholder="Link (Opcional)"
                      className={inputStyle}
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                    />

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className={`w-full py-4 rounded-full text-[10px] uppercase tracking-[0.2em] mt-4 ${silverButtonBg} disabled:opacity-50`}
                    >
                      {isSending ? "Registrando..." : "Enviar sugerencia"}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleClose}
                      className="w-full text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-serif italic text-2xl mb-2">¡Gracias {guestName.split(' ')[0]}!</h3>
                  <p className="text-[#c0c0c0]/60 text-xs uppercase tracking-widest leading-relaxed">
                    Ya hemos registrado <br /> tu sugerencia
                  </p>
                  
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-[#c0c0c0]/30"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}