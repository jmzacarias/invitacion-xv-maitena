"use client";
import { useState, useEffect } from "react";
import { G_SCRIPT_URL } from "@/utils/googleSheets";

export default function AdminMusicPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos
  const fetchMusic = async () => {
    setLoading(true);
    try {
      // Agregamos un parámetro para que el Apps Script sepa que queremos la música
      const response = await fetch(`${G_SCRIPT_URL}?action=getMusic`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error cargando música:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const silverGradient = "bg-gradient-to-b from-white via-[#c0c0c0] to-[#7a7a7a]";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className={`text-4xl md:text-5xl font-serif italic bg-clip-text text-transparent ${silverGradient}`}>
              Playlist de Invitados
            </h1>
            <p className="text-[#c0c0c0]/40 text-xs uppercase tracking-[0.3em] mt-3">Panel de Administración • Maitena XV</p>
          </div>
          
          <button 
            onClick={fetchMusic}
            className="px-8 py-3 rounded-full border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
          >
            {loading ? "Actualizando..." : "Refrescar Lista"}
          </button>
        </header>

        {/* CONTENIDO */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <div className="w-10 h-10 border-2 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] uppercase tracking-widest">Cargando sugerencias</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.length === 0 ? (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-white/20 font-light italic">No hay canciones sugeridas todavía.</p>
              </div>
            ) : (
              suggestions.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-[#141414] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#333] to-[#111] flex items-center justify-center text-[#c0c0c0] text-xs font-serif italic border border-white/10">
                      {index + 1}
                    </div>
                    <span className="text-[9px] text-white/20 uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">Música sugerida</span>
                  </div>
                  
                  <h3 className="text-lg text-white font-medium mb-1 line-clamp-1 group-hover:text-[#c0c0c0] transition-colors">
                    {item.cancion}
                  </h3>
                  <p className="text-[#c0c0c0]/60 text-sm mb-4 italic">
                    {item.artista}
                  </p>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Por: {item.nombre || "Anónimo"}</span>
                    {item.link && (
                      <a href={item.link} target="_blank" className="text-[10px] text-blue-400 hover:text-blue-300 underline">Link</a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}