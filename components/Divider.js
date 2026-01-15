export default function Divider() {
  return (
    <div className="bg-transparent py-4 flex items-center justify-center w-full">
      <div className="flex items-center justify-center w-[70%] max-w-[350px]">
        
        {/* Línea Izquierda - Muy sutil */}
        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-[#c0c0c0]/10 to-[#c0c0c0]/30" />

        {/* Detalle Central Minimalista */}
        <div className="mx-3 flex items-center justify-center">
          {/* Rombo exterior vacío */}
          <div className="w-2 h-2 border-[0.5px] border-[#c0c0c0]/40 rotate-45 flex items-center justify-center">
            {/* Punto central (un solo pixel) */}
            <div className="w-[1.5px] h-[1.5px] bg-[#c0c0c0]/60" />
          </div>
        </div>

        {/* Línea Derecha - Muy sutil */}
        <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-[#c0c0c0]/10 to-[#c0c0c0]/30" />
        
      </div>
    </div>
  );
}