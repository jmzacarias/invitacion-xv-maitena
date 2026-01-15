"use client";

const CornerAdorno = ({ className, bgColor }) => {
  const strokeColor = "rgba(192, 192, 192, 0.4)";
  const sW = "1.1"; 

  return (
    <svg 
      viewBox="0 0 37 37" 
      className={`absolute w-9 h-9 z-20 ${className}`}
    >
      <g>
        <path d="M37 0H0V37H37V0Z" fill={bgColor} /> 
        <path 
          d="M0.75 37V33.79H3.38C20.18 33.79 33.79 20.17 33.79 3.38V0.75H36.99" 
          stroke={strokeColor}
          strokeWidth={sW}
          fill="none"
        />
        <circle 
          cx="6" 
          cy="6" 
          r="6" 
          fill={strokeColor} 
        />
      </g>
    </svg>
  );
};

export default function FrameContainer({ children, className = "" }) {
  const bgColor = "#1a1a1a";
  const innerBg= "#222222";

  return (
    <div 
      className={`relative w-full max-w-[450px] mx-auto ${className}`}
      style={{
        border: "1.2px solid rgba(192, 192, 192, 0.35)",
        padding: "35px 40px",
        backgroundColor: bgColor
      }}
    >
      <CornerAdorno className="top-[-1.2px] left-[-1.2px]" bgColor={bgColor} />
      <CornerAdorno className="top-[-1.2px] right-[-1.2px] rotate-90" bgColor={bgColor} />
      <CornerAdorno className="bottom-[-1.2px] right-[-1.2px] rotate-180" bgColor={bgColor} />
      <CornerAdorno className="bottom-[-1.2px] left-[-1.2px] -rotate-90" bgColor={bgColor} />

      <div 
        className="relative z-10 w-full h-full py-12 px-6 md:px-10 rounded-lg shadow-inner"
        style={{
          backgroundColor: innerBg,
          border: "1px solid rgba(255, 255, 255, 0.03)",
        }}
      >
        {children}
      </div>
    </div>
  );
}