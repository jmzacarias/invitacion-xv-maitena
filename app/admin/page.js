"use client";
import { useState, useEffect } from "react";
import { G_SCRIPT_URL } from "@/utils/googleSheets";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const CLAVE_ACCESO = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const [activeTab, setActiveTab] = useState("invitados");
  const [listaGrupos, setListaGrupos] = useState([]);
  const [listaMusica, setListaMusica] = useState([]);
  const [loadingLista, setLoadingLista] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CLAVE_ACCESO) setIsAuthenticated(true);
    else alert("Clave incorrecta");
  };

  const getColorNombre = () => "text-white/70";

  const stats = listaGrupos.reduce((acc, grupo) => {
    grupo.integrantes.forEach(p => {
      const estado = p.estado?.toLowerCase();
      acc.total++;
      if (estado === "confirmado") acc.confirmados++;
      else if (estado === "cancelado") acc.cancelados++;
      else acc.pendientes++;
    });
    return acc;
  }, { confirmados: 0, cancelados: 0, pendientes: 0, total: 0 });

  const cargarInvitados = async () => {
    setLoadingLista(true);
    try {
      const res = await fetch(`${G_SCRIPT_URL}?pass=${password}`);
      const data = await res.json();
      
      if (data.error === "Unauthorized") {
        alert("Sesión no autorizada.");
        setIsAuthenticated(false);
        return;
      }

      const gruposMap = data.reduce((acc, inv) => {
        const getVal = (names) => {
          const key = Object.keys(inv).find(k => names.includes(k.trim()));
          return inv[key];
        };

        const idG = getVal(["ID Grupo", "idGrupo", "id_grupo"]);
        const nombreG = getVal(["Nombre Grupo", "nombreGrupo", "familia"]);
        const tel = getVal(["Teléfono", "telefono", "Telefono"]);
        const slg = getVal(["Slug (URL)", "slug", "Slug"]);
        const nomInv = getVal(["Nombre Invitado", "nombreInvitado", "nombre"]);
        const est = getVal(["Asistencia", "estado", "asistencia"]);
        const idInv = getVal(["ID Invitado", "idInvitado", "id"]);

        if (!idG) return acc;

        if (!acc[idG]) {
          acc[idG] = {
            idGrupo: idG,
            nombreGrupo: nombreG || "Sin Nombre",
            telefono: tel || "",
            slug: slg || "",
            integrantes: []
          };
        }
        
        acc[idG].integrantes.push({
          idInvitado: idInv,
          nombreInvitado: nomInv || "Invitado",
          estado: est || "pendiente"
        });
        
        return acc;
      }, {});

      setListaGrupos(Object.values(gruposMap));
      
    } catch (error) {
      console.error("Error al cargar lista:", error);
    } finally {
      setLoadingLista(false);
    }
  };

  const cargarMusica = async () => {
    setLoadingLista(true);
    try {
      const res = await fetch(`${G_SCRIPT_URL}?action=getMusic&pass=${password}`);
      const data = await res.json();

      if (data.error === "Unauthorized") {
        alert("Sesión no autorizada.");
        setIsAuthenticated(false);
        return;
      }

      setListaMusica(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar música:", error);
    } finally {
      setLoadingLista(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
        if (activeTab === "invitados") cargarInvitados();
        if (activeTab === "musica") cargarMusica();
    }
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-white">
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-2xl border border-white/10 w-full max-w-sm text-center shadow-2xl">
          <h2 className="text-[#c0c0c0] font-serif italic text-2xl mb-6">Acceso Administrador</h2>
          <input type="password" placeholder="Clave de acceso" className="w-full p-3 bg-black border border-white/10 rounded mb-4 text-center outline-none focus:border-[#c0c0c0] text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-[#c0c0c0] text-black py-3 rounded font-bold uppercase tracking-widest hover:bg-white transition-all">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-3 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center border-b border-white/10 pb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-serif italic text-[#c0c0c0]">Panel XV</h1>
            <div className="flex gap-4 mt-2">
                <button 
                    onClick={() => setActiveTab("invitados")}
                    className={`text-[10px] uppercase tracking-widest transition-colors ${activeTab === 'invitados' ? 'text-white border-b border-white' : 'text-white/30'}`}
                >
                    Invitados
                </button>
                <button 
                    onClick={() => setActiveTab("musica")}
                    className={`text-[10px] uppercase tracking-widest transition-colors ${activeTab === 'musica' ? 'text-white border-b border-white' : 'text-white/30'}`}
                >
                    Música Sugerida
                </button>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-[9px] text-white/20 hover:text-white underline uppercase">Salir</button>
        </header>

        {activeTab === "invitados" ? (
          <>
            <div className="grid grid-cols-4 gap-2">
              <StatCard label="Total" value={stats.total} color="text-white" border="border-white/10" />
              <StatCard label="Asistirá" value={stats.confirmados} color="text-green-400" border="border-green-500/20" />
              <StatCard label="No Asistirá" value={stats.cancelados} color="text-red-400" border="border-red-500/20" />
              <StatCard label="Pendiente" value={stats.pendientes} color="text-white/30" border="border-white/5" />
            </div>

            <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-serif italic text-[#c0c0c0]">Lista de Invitados</h2>
                <button onClick={cargarInvitados} disabled={loadingLista} className="text-[9px] bg-white/10 px-3 py-1.5 rounded uppercase font-bold tracking-widest hover:bg-white/20 transition-all">
                  {loadingLista ? "Cargando..." : "Actualizar Lista"}
                </button>
              </div>

              <div className="overflow-x-auto overflow-y-auto max-h-[600px] rounded-lg">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="text-[9px] uppercase tracking-tighter text-white/30 border-b border-white/10">
                      <th className="py-2 px-2 w-auto">Invitados</th>
                      <th className="py-2 px-2 text-right w-24">Estado</th>
                      <th className="py-2 px-2 pl-4 w-32 md:w-48">Grupo Familiar</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {listaGrupos.map((grupo, idx) => (
                      <tr key={idx} className={`border-b border-white/10 ${idx % 2 === 0 ? 'bg-white/[0.06]' : 'bg-white/[0.01]'}`}>
                        <td colSpan="2" className="p-0 align-top">
                          <table className="w-full border-collapse">
                            <tbody className="divide-y divide-white/[0.03]">
                              {grupo.integrantes.map((p, pIdx) => (
                                <tr key={pIdx}>
                                  <td className={`py-3 px-2 text-xs ${getColorNombre()}`}>
                                    {p.nombreInvitado}
                                  </td>
                                  <td className="py-3 px-2 text-right w-24">
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                                      p.estado.toLowerCase() === 'confirmado' ? 'bg-green-500/10 text-green-400' 
                                      : p.estado.toLowerCase() === 'cancelado' ? 'bg-red-500/10 text-red-400' 
                                      : 'bg-white/5 text-white/40'
                                    }`}>
                                      {p.estado.toLowerCase() === 'confirmado' ? 'Asistirá' : p.estado.toLowerCase() === 'cancelado' ? 'No asistirá' : p.estado}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td className="py-3 px-2 pl-4 align-top border-l border-white/10">
                          <p className="font-bold text-white text-[11px] md:text-xs truncate uppercase tracking-tight">{grupo.nombreGrupo}</p>
                          <p className="text-[10px] text-white/30 font-mono mt-0.5">+{grupo.telefono}</p>
                          <div className="mt-3">
                            <a href={`https://wa.me/${grupo.telefono}?text=Invitacion%20XV:%20${typeof window !== 'undefined' ? window.location.origin : ''}/i/${grupo.slug}`} target="_blank" className="text-green-400/60 text-[9px] border border-green-400/20 px-2 py-1 rounded hover:bg-green-400/10 transition-all inline-block uppercase font-bold tracking-tighter">WA Link ↗</a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-serif italic text-[#c0c0c0]">Sugerencias de Música</h2>
              <button onClick={cargarMusica} disabled={loadingLista} className="text-[9px] bg-white/10 px-3 py-1.5 rounded uppercase font-bold tracking-widest">
                {loadingLista ? "Actualizando..." : "Refrescar"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listaMusica.length === 0 ? (
                <p className="col-span-full text-center text-white/20 py-20 italic">No hay sugerencias todavía.</p>
              ) : (
                listaMusica.map((item, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 p-4 rounded-xl group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-[9px] text-[#c0c0c0]/40 uppercase tracking-widest">Sugerido por: {item.nombre || "Anónimo"}</p>
                        <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/20">#{idx + 1}</span>
                    </div>
                    <h3 className="text-white text-sm font-bold group-hover:text-[#c0c0c0] transition-colors">{item.cancion}</h3>
                    <p className="text-[#c0c0c0]/60 text-xs italic">{item.artista}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, border }) {
  return (
    <div className={`bg-white/5 p-2 md:p-3 rounded-xl border ${border} flex flex-col items-center justify-center`}>
      <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
      <p className={`text-lg md:text-xl font-serif ${color}`}>{value}</p>
    </div>
  );
}