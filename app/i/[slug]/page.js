"use client";
import { useState, useRef, useEffect, Suspense, use } from "react"; 
import { G_SCRIPT_URL } from "@/utils/googleSheets";
import Welcome from "@/components/Welcome";
import Hero from "@/components/Hero";
import FirstPage from "@/components/FirstPage";
import Countdown from "@/components/Countdown";
import EventInfo from "@/components/EventInfo";
import PreloadScreen from "@/components/PreloadScreen";
import PersonalizedGuest from "@/components/PersonalizedGuest";
import MusicSuggestion from "@/components/MusicSuggestion";
import DressCode from "@/components/DressCode";
import LastPage from "@/components/LastPage";
import MusicModal from "@/components/MusicModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import MusicFloatingButton from "@/components/MusicFloatingButton";

function InvitationContent({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug; 

  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [attendance, setAttendance] = useState([]);

  // EXTRAEMOS EL NOMBRE DEL INVITADO PRINCIPAL
  const mainGuestName = attendance.length > 0 ? attendance[0].nombre : "Invitado";

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    async function fetchGuestData() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${G_SCRIPT_URL}?slug=${slug}`);
        
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        
        const data = await response.json();

        if (data && data.length > 0) {
          const formattedData = data.map(inv => {
            const idReal = inv["ID invitado"] || inv["idInvitado"] || inv["IDinvitado"] || inv["ID_invitado"];
            
            return {
              idInvitado: idReal,
              nombre: inv["Nombre Invitado"] || inv["Nombre"] || inv["nombreInvitado"], 
              confirmed: inv["Asistencia"] === "confirmado"
            };
          });
          
          setAttendance(formattedData);
        } else {
          console.warn("No se encontraron invitados para el slug:", slug);
        }
      } catch (err) {
        console.error("Error detallado al cargar invitados:", err);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    }

    fetchGuestData();
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = started ? "auto" : "hidden";
  }, [started]);

  const handleEntry = (withMusic) => {
    setStarted(true);
    if (withMusic && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked"));
    }
  };

  const toggleGuest = (nombre) => {
    setAttendance(prev => 
      prev.map(guest => guest.nombre === nombre ? { ...guest, confirmed: !guest.confirmed } : guest)
    );
  };

  const event = {
      title: "Mis 15 Años",
      name: "Maitena",
      date: "2026-03-21T21:00:00-03:00", 
      place: "Jah Jireh",
      map: "Tres Cruces 1915, Rafael Castillo",
    };

  return (
    <div className="min-h-screen w-full bg-[#3A3A3A] flex justify-center items-start">
      <MusicFloatingButton audioRef={audioRef} isStarted={started} />
      <main className="relative w-full lg:max-w-5xl bg-black lg:shadow-[0_0_80px_rgba(0,0,0,0.8)] min-h-screen lg:rounded-xl lg:my-10">
        
        <PreloadScreen isVisible={isLoading} />
        {!isLoading && <Welcome onEntry={handleEntry} />}
        <audio ref={audioRef} loop src="/musica.mp3" />
        
        <div className={`transition-opacity duration-1000 ${started ? "opacity-100" : "opacity-0"} w-full`}>
          <div className="flex flex-col lg:flex-row w-full bg-black">
            <div className="w-full lg:w-1/2"><Hero event={event} /></div>
            <div className="w-full lg:w-1/2"><FirstPage /></div>
          </div>

          <div className="relative z-30 bg-[#1a1a1a] w-full"> 
            <Countdown date={event.date} />
            <PersonalizedGuest guestData={attendance}/>
            
            <EventInfo 
              attendance={attendance} 
              onToggleGuest={toggleGuest} 
              onOpenConfirm={() => setIsConfirmModalOpen(true)} 
            />

            <div className="flex flex-col lg:flex-row w-full bg-[#1a1a1a] gap-0">
              <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
                {/* PASAMOS EL NOMBRE AL BOTÓN DE SUGERENCIA */}
                <MusicSuggestion 
                  onOpenMusic={() => setIsMusicModalOpen(true)} 
                  guestName={mainGuestName}
                />
              </div>
              <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-start">
                <DressCode />
              </div>
            </div>
            
            <LastPage 
              guestData={attendance}
              onOpenConfirm={() => setIsConfirmModalOpen(true)}
              onOpenMusic={() => setIsMusicModalOpen(true)}
            />
          </div> 
        </div>

        {/* PASAMOS EL NOMBRE AL MODAL DE MÚSICA */}
        <MusicModal 
          isOpen={isMusicModalOpen} 
          onClose={() => setIsMusicModalOpen(false)} 
          guestName={mainGuestName}
        />

        <ConfirmationModal 
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          guestNames={attendance}
          onToggleGuest={toggleGuest}
          onConfirm={() => setIsConfirmModalOpen(false)}
        />
      </main>
    </div>
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <InvitationContent params={params} />
    </Suspense>
  );
}