"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2 } from "lucide-react"; // O cualquier librería de iconos que uses

export default function MusicFloatingButton({ audioRef, isStarted }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Sincronizar el estado del botón con el audio real
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateStatus = () => setIsPlaying(!audio.paused);
    
    audio.addEventListener("play", updateStatus);
    audio.addEventListener("pause", updateStatus);

    return () => {
      audio.removeEventListener("play", updateStatus);
      audio.removeEventListener("pause", updateStatus);
    };
  }, [audioRef]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <AnimatePresence>
      {isStarted && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg text-[#c0c0c0] hover:text-white transition-colors"
          style={{ boxShadow: "0 0 15px rgba(192, 192, 192, 0.3)" }}
        >
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
            >
              <Music size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ rotate: 20 }}
              animate={{ rotate: 0 }}
              className="relative"
            >
              <Music size={20} className="opacity-40" />
              {/* Línea cruzada para el efecto "tachado" */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#c0c0c0] rotate-45" />
            </motion.div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}