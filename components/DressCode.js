"use client";
import { motion } from "framer-motion";
import FrameContainer from "@/components/FrameContainer";
import { Reveal } from "@/components/Reveal";

export default function DressCode() {
  const silverGradient = "bg-gradient-to-b from-white via-[#c0c0c0] to-[#7a7a7a]";
  const DURATION = 7; 

  const drawAnimation = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: [0, 1, 1, 0], 
      opacity: [0, 1, 1, 0] 
    },
    transition: {
      duration: DURATION,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
      times: [0, 0.2, 0.8, 1] 
    }
  });

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

  return (
    <section className="relative z-30 w-full flex justify-center bg-[#1a1a1a] px-6 py-4 lg:px-4 lg:py-10">
      <FrameContainer className="w-full">
        <Reveal className="w-full h-full">
          <div className="flex flex-col items-center text-center py-8 w-full min-h-[400px] lg:h-[480px] justify-between">
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-24 flex items-center justify-center mb-2">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="silver-dress-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#c0c0c0" />
                      <stop offset="100%" stopColor="#7a7a7a" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#silver-dress-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path {...drawAnimation(0)} d="M44 25 C40 18 35 8 18 8 C8 8 3 15 3 25 C3 35 8 42 18 42 C35 42 40 32 44 25 Z" />
                    <motion.path {...drawAnimation(0)} d="M56 25 C60 18 65 8 82 8 C92 8 97 15 97 25 C97 35 92 42 82 42 C65 42 60 32 56 25 Z" />
                    <motion.path {...drawAnimation(0.2)} d="M44 19 C44 17 46 15 50 15 C54 15 56 17 56 19 L56 31 C56 33 54 35 50 35 C46 35 44 33 44 31 Z" />
                  </g>
                </svg>
              </div>

              <h2 className={`font-serif italic text-4xl md:text-5xl mb-2 tracking-wide bg-clip-text text-transparent ${silverGradient}`}>
                Dress Code
              </h2>
              <TitleDivider />
              <p className="font-sans text-[#c0c0c0]/50 text-[10px] md:text-[11px] tracking-[0.2em] uppercase max-w-[280px] mt-6 leading-relaxed">
                Una orientación para <br /> tu vestuario
              </p>
            </div>

            <div className="mb-4 pt-4">
              <p className={`font-sans font-semibold text-xl md:text-2xl tracking-[0.3em] uppercase bg-clip-text text-transparent ${silverGradient}`}>
                Elegante Sport
              </p>
            </div>
          </div>
        </Reveal>
      </FrameContainer>
    </section>
  );
}