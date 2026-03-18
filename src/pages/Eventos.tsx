import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Film, MessageCircle, ArrowRight } from "lucide-react";

// 1. DATASET DE PRUEBA (Nuestra Cartelera)
// Usamos formato YYYY-MM-DD para poder filtrar fácilmente por año y mes.
const EVENTOS_MOCK = [
  {
    id: 1,
    titulo: "Proyección: Tetsuo The Iron Man + Debate",
    tipo: "Proyección",
    fecha: "2026-04-15", 
    lugar: "Casa Darte",
    imagen: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
    estado: "futuro",
    sinopsisBreve: "Exploraremos el cyberpunk japonés de Shinya Tsukamoto..."
  },
  {
    id: 2,
    titulo: "Conversatorio: El nuevo terror folk",
    tipo: "Conversatorio",
    fecha: "2026-04-22",
    lugar: "Librería Sur / Virtual",
    imagen: "https://images.unsplash.com/photo-1505686994434-e3f33204cdfc?q=80&w=1000&auto=format&fit=crop",
    estado: "futuro",
    sinopsisBreve: "Análisis de Midsommar, The Witch y la herencia del Wicker Man."
  },
  {
    id: 3,
    titulo: "Ciclo Anime: Perfect Blue",
    tipo: "Proyección",
    fecha: "2025-10-10",
    lugar: "Casa Darte",
    imagen: "https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc5?q=80&w=1000&auto=format&fit=crop",
    estado: "pasado",
    sinopsisBreve: "Satoshi Kon y la disociación de la identidad digital."
  },
  {
    id: 4,
    titulo: "Charla: Cine Z y la Crítica Independiente",
    tipo: "Conversatorio",
    fecha: "2025-08-05",
    lugar: "Centro Cultural",
    imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
    estado: "pasado",
    sinopsisBreve: "Un repaso a nuestra historia desde 2017."
  }
];

const MESES = [
  { valor: "todos", label: "Todos los meses" },
  { valor: "01", label: "Enero" }, { valor: "02", label: "Febrero" },
  { valor: "03", label: "Marzo" }, { valor: "04", label: "Abril" },
  { valor: "05", label: "Mayo" }, { valor: "06", label: "Junio" },
  { valor: "07", label: "Julio" }, { valor: "08", label: "Agosto" },
  { valor: "09", label: "Septiembre" }, { valor: "10", label: "Octubre" },
  { valor: "11", label: "Noviembre" }, { valor: "12", label: "Diciembre" }
];

const ANOS = ["todos", "2026", "2025", "2024", "2023"]; // Puedes generarlos dinámicamente luego

export default function Eventos() {
  // 2. ESTADOS (El Controlador de la Línea de Tiempo)
  const [mesSeleccionado, setMesSeleccionado] = useState("todos");
  const [anoSeleccionado, setAnoSeleccionado] = useState("todos");

  // 3. LÓGICA DE CLASIFICACIÓN
  // Separamos los eventos futuros (Highlights)
  const eventosFuturos = EVENTOS_MOCK.filter(e => e.estado === "futuro");

  // Filtramos los eventos pasados según nuestro "Calendario"
  const eventosPasados = useMemo(() => {
    return EVENTOS_MOCK.filter(e => {
      if (e.estado !== "pasado") return false;
      const [ano, mes] = e.fecha.split("-"); // Extraemos "2026" y "04" de "2026-04-15"
      
      const cumpleMes = mesSeleccionado === "todos" || mes === mesSeleccionado;
      const cumpleAno = anoSeleccionado === "todos" || ano === anoSeleccionado;
      
      return cumpleMes && cumpleAno;
    });
  }, [mesSeleccionado, anoSeleccionado]);

  return (
    <div className="min-h-screen bg-fondo text-texto transition-colors duration-500 font-sans selection:bg-primario selection:text-white">
      
      {/* NAVEGACIÓN */}
      <nav className="p-6 flex justify-between items-center border-b border-texto/10">
        <Link to="/" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-primario transition-colors">
          [ ← Inicio ]
        </Link>
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 italic">
          Cartelera & Archivo
        </h2>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
          >
            EVENTOS<span className="text-primario">.</span>
          </motion.h1>
          <p className="font-serif text-xl opacity-80 max-w-2xl leading-relaxed">
            Proyecciones, debates y encuentros presenciales. Únete a la comunidad de Clase Z.
          </p>
        </header>

        {/* SECCIÓN 1: EVENTOS FUTUROS (Destacados) */}
        {eventosFuturos.length > 0 && (
          <section className="mb-24">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-8 border-b border-texto/10 pb-4">
              Próximos Encuentros
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {eventosFuturos.map((evento, index) => (
                <motion.article 
                  key={evento.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative flex flex-col overflow-hidden bg-texto/5 border border-texto/10 hover:border-primario transition-all duration-500"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={evento.imagen} alt={evento.titulo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    {/* Badge tipo de evento */}
                    <div className="absolute top-4 left-4 bg-fondo text-texto px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      {evento.tipo === "Proyección" ? <Film size={12}/> : <MessageCircle size={12}/>}
                      {evento.tipo}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-4 text-xs font-bold tracking-widest uppercase opacity-60 mb-4">
                        <span className="flex items-center gap-1 text-primario"><Calendar size={14}/> {evento.fecha}</span>
                        <span className="flex items-center gap-1"><MapPin size={14}/> {evento.lugar}</span>
                      </div>
                      <h4 className="text-3xl md:text-4xl font-black tracking-tight mb-4 group-hover:text-primario transition-colors">
                        {evento.titulo}
                      </h4>
                      <p className="font-serif opacity-80 mb-6 line-clamp-2">
                        {evento.sinopsisBreve}
                      </p>
                    </div>
                    {/* Botón (Simulado por ahora, luego irá a la página del evento) */}
                    <button className="self-start flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase border-b-2 border-transparent group-hover:border-primario pb-1 transition-all">
                      Ver Detalles <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN 2: ARCHIVO DE EVENTOS (Con filtro de calendario) */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-texto/10 pb-6 mb-8 gap-6">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-50">
              Archivo Histórico
            </h3>
            
            {/* CONTROLES DE FILTRO (La Moviola) */}
            <div className="flex gap-4">
              <select 
                value={anoSeleccionado}
                onChange={(e) => setAnoSeleccionado(e.target.value)}
                className="bg-transparent border border-texto/20 text-texto text-xs font-bold uppercase tracking-widest p-2 focus:outline-none focus:border-primario cursor-pointer"
              >
                {ANOS.map(ano => <option key={ano} value={ano} className="bg-fondo text-texto">{ano === "todos" ? "Cualquier Año" : ano}</option>)}
              </select>

              <select 
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
                className="bg-transparent border border-texto/20 text-texto text-xs font-bold uppercase tracking-widest p-2 focus:outline-none focus:border-primario cursor-pointer"
              >
                {MESES.map(mes => <option key={mes.valor} value={mes.valor} className="bg-fondo text-texto">{mes.label}</option>)}
              </select>
            </div>
          </div>

          {/* GRILLA DEL ARCHIVO */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {eventosPasados.map(evento => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={evento.id}
                  className="group flex flex-col border border-texto/10 bg-texto/5 hover:bg-texto/10 transition-colors p-4 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-texto/10 text-texto/60">
                      {evento.fecha}
                    </span>
                    {evento.tipo === "Proyección" ? <Film size={16} className="opacity-30"/> : <MessageCircle size={16} className="opacity-30"/>}
                  </div>
                  <h4 className="text-xl font-black leading-tight mb-2 group-hover:text-primario transition-colors">
                    {evento.titulo}
                  </h4>
                  <p className="text-xs opacity-60 flex items-center gap-1 mt-auto pt-4 border-t border-texto/5">
                    <MapPin size={12}/> {evento.lugar}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
            
            {/* ESTADO VACÍO */}
            {eventosPasados.length === 0 && (
              <div className="col-span-full py-12 text-center opacity-40 font-serif italic text-lg">
                No hay registros en esta fecha en nuestra bitácora.
              </div>
            )}
          </motion.div>
        </section>

      </main>
    </div>
  );
}