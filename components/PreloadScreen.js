import { motion, AnimatePresence } from "framer-motion";

export default function PreloadScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          /* Transición de salida suave para no cortar la animación de golpe */
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          <div className="w-40 h-40 relative flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              style={{ overflow: 'visible' }}
            >
            
              {/* CORAZÓN CENTRAL: Mismo centro, misma duración */}
              <motion.path
                d="M50 65 C48 65 32 52 32 41 C32 35 36.5 31 42 31 C45 31 48 33 50 35 C52 33 55 31 58 31 C63.5 31 68 35 68 41 C68 52 52 65 50 65 Z"
                stroke="white"
                strokeWidth="1.5"
                fill="white"
                initial={{ scale: 0.7 }}
                animate={{ 
                  scale: [0.7, 1.3, 0.7],
                  fillOpacity: [1, 0, 1], // Se vuelve hueco al llegar al 1.3 de scale
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut" 
                }}
                style={{ originX: "50px", originY: "50px" }}
              />
            </svg>
          </div>
          
          <motion.span 
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="text-white text-[10px] tracking-[0.6em] uppercase mt-10 font-light"
          >
            Maitena
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}