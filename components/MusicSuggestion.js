"use client";
import { Reveal } from "@/components/Reveal";
import FrameContainer from "@/components/FrameContainer";
import { motion } from "framer-motion";

const TitleDivider = () => (
  <svg viewBox="0 0 362 23" className="w-56 md:w-64 max-w-full h-auto my-4 opacity-60" fill="none">
    <g fill="#c0c0c0">
      <path d="M181.146 8.81658C181.216 8.81658 181.286 8.80658 181.346 8.77658C181.636 8.66658 181.776 8.34658 181.676 8.05658C181.666 8.01658 181.506 7.45658 182.076 6.65658C183.436 4.78658 188.796 1.63658 209.356 1.63658H361.336C361.646 1.63658 361.906 1.38658 361.906 1.06658C361.906 0.746582 361.656 0.496582 361.336 0.496582H209.356C189.166 0.496582 182.846 3.52658 181.096 6.07658C180.226 7.33658 180.566 8.33658 180.606 8.44658C180.696 8.67658 180.906 8.80658 181.136 8.80658L181.146 8.81658Z" />
      <path d="M181.316 8.80658C181.546 8.80658 181.756 8.67658 181.836 8.44658C181.876 8.33658 182.216 7.34658 181.346 6.07658C179.596 3.53658 173.276 0.496582 153.086 0.496582H1.11626C0.806265 0.496582 0.546265 0.746582 0.546265 1.06658C0.546265 1.38658 0.796265 1.63658 1.11626 1.63658H153.096C173.656 1.63658 179.016 4.78658 180.376 6.65658C180.966 7.45658 180.786 8.02658 180.776 8.05658C180.686 8.34658 180.836 8.66658 181.126 8.77658C181.186 8.79658 181.256 8.80658 181.316 8.80658Z" />
      <path d="M267.326 1.26654C267.326 1.26654 280.216 1.20654 286.586 7.21654C286.586 7.21654 294.516 1.17654 304.986 1.07654L267.316 1.26654H267.326Z" />
      <path d="M95.1363 1.26654C95.1363 1.26654 82.2463 1.20654 75.8763 7.21654C75.8763 7.21654 67.9463 1.17654 57.4763 1.07654L95.1363 1.26654Z" />
    </g>
    <path d="M181.146 22.5965L186.516 15.2365L181.146 7.32654L175.566 14.9565L181.146 22.5965Z" fill="#c0c0c0" />
  </svg>
);

export default function MusicSuggestion({ onOpenMusic, guestName }) {
  const silverGradient = "bg-gradient-to-b from-white via-[#c0c0c0] to-[#7a7a7a]";
  const buttonStyle = "mt-6 px-10 py-4 bg-transparent border border-[#c0c0c0]/40 text-[#c0c0c0] rounded-full text-[10px] uppercase tracking-[0.3em] font-light hover:bg-[#c0c0c0] hover:text-black transition-all duration-300 active:scale-95";

  const drawAnimation = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.4, 0.6, 1] }
  });

  const Star = ({ scale = 1, x = 0, y = 0, delay = 0 }) => (
    <motion.g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <motion.path {...drawAnimation(delay)} strokeWidth={2 / scale} d="M0,-10 C1.5,-3 5,-1.5 8,0 C5,1.5 1.5,3 0,10 C-1.5,3 -5,1.5 -8,0 C-5,-1.5 -1.5,-3 0,-10 Z" />
    </motion.g>
  );

  return (
    <section className="relative z-30 w-full flex justify-center bg-[#1a1a1a] px-6 py-4 lg:px-4 lg:py-10">
      <FrameContainer className="w-full">
        <Reveal className="w-full h-full">
          <div className="flex flex-col items-center text-center py-8 w-full min-h-[400px] lg:h-[480px] justify-between">
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-24 flex items-center justify-center mb-2">
                <svg viewBox="0 0 111 121" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="silver-music-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" /><stop offset="50%" stopColor="#c0c0c0" /><stop offset="100%" stopColor="#7a7a7a" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#silver-music-grad)" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path {...drawAnimation(0)} strokeWidth="1.5" d="M58.63,49.69c-0.48-3.02-5.36-33.76-5.59-35.21c-0.13-0.82-0.6-1.56-1.3-2.02c-0.69-0.46-1.55-0.61-2.36-0.41l-35.5,8.67c-1.5,0.37-2.48,1.85-2.24,3.37c0.02,0.13,4.88,30.82,4.92,31.09c0.13,0.87-0.54,0.79-1.23,0.94c-0.54,0.12-1.06,0.26-1.58,0.44c-1.08,0.37-2.12,0.88-3.08,1.5c-5.49,3.51-7.65,9.97-4.82,14.39c1.41,2.2,3.8,3.56,6.72,3.83s5.9-0.61,8.36-2.19c2.52-1.61,4.6-4.03,5.55-6.89c0.24-0.73,0.41-1.49,0.48-2.26c0.06-0.69,0.04-1.37-0.04-2.05c-0.1-0.83-4.8-17.52-4.87-17.99c-0.07-0.46-0.05-0.58,0.42-0.69l22.64-5.53c0.42-0.1,0.6,0,0.67,0.43c0.53,3.35,2.67,16.85,2.77,17.46c0.17,1.05-0.43,0.9-1.25,1.08c-0.55,0.12-1.09,0.28-1.63,0.46c-1.05,0.37-2.06,0.87-3,1.47c-5.11,3.27-7.33,9.1-5.32,13.45c0.32,0.83,1.15,1.79,1.15,1.79c1.58,1.77,4.6,3.97,9.31,2.67c1.74-0.33,3.46-0.99,5.03-1.99c2.26-1.45,4.16-3.53,5.22-6.01c0.49-1.14,0.79-2.36,0.84-3.6c0.04-1.26-0.17-2.34-0.37-3.58" />
                    <motion.path {...drawAnimation(0.3)} strokeWidth="1.5" d="M102.34,68.53c-0.51-0.66-1.28-1.08-2.1-1.15l-36.41-3.12c-1.54-0.13-2.94,0.96-3.2,2.48c-0.18,1.08-0.37,2.16-0.55,3.24c-0.6,3.55-4.63,27.35-4.71,27.77c-0.14,0.86-0.63,0.61-1.44,0.51c-0.55-0.06-1.11-0.09-1.67-0.09c-1.14,0.01-2.28,0.16-3.39,0.43c-6.32,1.57-10.43,7-9.16,12.1c0.63,2.54,2.46,4.59,5.14,5.78c1.56,0.69,3.3,1.04,5.1,1.04c1.16,0,2.34-0.14,3.52-0.44c2.63-0.65,5.11-2.05,6.91-4.09s2.29-4.37,2.73-6.97c0.16-0.97,4.73-17.89,4.82-18.33c0.13-0.65,0.5-0.55,1.07-0.5c0.8,0.07,22.28,1.91,22.9,1.96c0.2,0.02,0.45,0.08,0.4,0.34c-0.2,1.19-3.02,17.91-3.07,18.11c-0.17,0.67-1.03,0.25-1.51,0.2c-0.54-0.06-1.08-0.08-1.62-0.07c-1.13,0.01-2.25,0.16-3.34,0.43c-3,0.75-5.6,2.37-7.33,4.58c-1.81,2.31-2.46,4.98-1.83,7.52c1.03,4.15,5.32,6.82,10.28,6.82c1.13,0,2.3-0.14,3.48-0.43c4.33-1.08,7.81-4.05,8.97-7.62c0.52-1.59,5.37-30.97,6.27-36.37" />
                    <Star scale={0.7} x={10} y={30} delay={1.0} /><Star scale={0.4} x={65} y={40} delay={1.4} /><Star scale={0.5} x={90} y={40} delay={1.8} /><Star scale={0.4} x={30} y={100} delay={2.2} /><Star scale={0.6} x={110} y={105} delay={0.6} />
                  </g>
                </svg>
              </div>
              <h2 className={`font-serif italic text-4xl md:text-5xl mb-2 bg-clip-text text-transparent ${silverGradient}`}>Música</h2>
              <TitleDivider />
              <p className="text-[#c0c0c0]/50 text-[10px] uppercase tracking-[0.2em] mt-6 leading-relaxed">
                {guestName.split(' ')[0]}, ¿Qué canciones no pueden faltar <br /> en la playlist?
              </p>
            </div>
            <div className="w-full flex justify-center pt-4">
              <button onClick={onOpenMusic} className={buttonStyle}>Sugerir canción</button>
            </div>
          </div>
        </Reveal>
      </FrameContainer>
    </section>
  );
}