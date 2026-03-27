import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Film, MessageCircle, ArrowRight } from "lucide-react";

// 1. DATASET DE PRUEBA (Nuestra Cartelera)
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

const ANOS = ["todos", "2026", "2025", "2024"];

export default function Eventos() {
  const [mesSeleccionado, setMesSeleccionado] = useState("todos");
  const [anoSeleccionado, setAnoSeleccionado] = useState("todos");

  const eventosFuturos = EVENTOS_MOCK.filter(e => e.estado === "futuro");

  const eventosPasados = useMemo(() => {
    return EVENTOS_MOCK.filter(e => {
      if (e.estado !== "pasado") return false;
      const [ano, mes] = e.fecha.split("-");
      const cumpleMes = mesSeleccionado === "todos" || mes === mesSeleccionado;
      const cumpleAno = anoSeleccionado === "todos" || ano === anoSeleccionado;
      return cumpleMes && cumpleAno;
    });
  }, [mesSeleccionado, anoSeleccionado]);

  return (
    <div className="min-h-screen bg-fondo text-texto transition-colors duration-700 font-sans selection:bg-cine-red selection:text-white relative z-10">
      
      {/* NAVEGACIÓN */}
      <nav className="p-8 md:p-12 flex justify-between items-center border-b border-texto/10">
        <Link to="/" className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-cine-red transition-colors">
          [ ← INICIO ]
        </Link>
        <h2 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-40 italic">
          Cartelera & Archivo
        </h2>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-display font-black tracking-tighter mb-6 text-titulo transition-colors duration-700"
          >
            EVENTOS<span className="text-cine-red">.</span>
          </motion.h1>
          <p className="font-serif text-xl opacity-70 max-w-2xl leading-relaxed font-light">
            Proyecciones, debates y encuentros presenciales. Únete a la comunidad de Clase Z en la oscuridad de la sala.
          </p>
        </header>

        {/* SECCIÓN 1: PRÓXIMOS ENCUENTROS */}
        {eventosFuturos.length > 0 && (
          <section className="mb-32">
            <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-40 mb-10 border-b border-texto/10 pb-4">
              Próximos Encuentros
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {eventosFuturos.map((evento, index) => (
                <motion.article 
                  key={evento.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative flex flex-col overflow-hidden bg-texto/[0.02] border border-texto/10 hover:border-cine-red transition-all duration-700 rounded-2xl"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={evento.imagen} 
                      alt={evento.titulo} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 img-theme-aware desaturate group-hover:desaturate-0" 
                    />
                    <div className="absolute top-6 left-6 bg-fondo/90 backdrop-blur-md text-texto px-4 py-1.5 text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 rounded-full border border-texto/10">
                      {evento.tipo === "Proyección" ? <Film size={12}/> : <MessageCircle size={12}/>}
                      {evento.tipo}
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-6 text-[10px] font-mono font-bold tracking-widest uppercase opacity-50 mb-6">
                        <span className="flex items-center gap-2 text-cine-red transition-colors"><Calendar size={14}/> {evento.fecha}</span>
                        <span className="flex items-center gap-2"><MapPin size={14}/> {evento.lugar}</span>
                      </div>
                      <h4 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 group-hover:text-cine-red transition-colors duration-500">
                        {evento.titulo}
                      </h4>
                      <p className="font-serif font-light opacity-60 mb-10 line-clamp-2 text-lg">
                        {evento.sinopsisBreve}
                      </p>
                    </div>
                    <button className="self-start flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.2em] uppercase border-b border-transparent group-hover:border-cine-red pb-1 transition-all">
                      Ver Detalles <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform duration-500"/>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN 2: ARCHIVO HISTÓRICO */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-texto/10 pb-8 mb-12 gap-8">
            <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-40">
              Archivo de Bitácora
            </h3>
            
            <div className="flex gap-4">
              <select 
                value={anoSeleccionado}
                onChange={(e) => setAnoSeleccionado(e.target.value)}
                className="bg-texto/[0.03] border border-texto/10 text-texto text-[10px] font-mono font-bold uppercase tracking-widest p-3 px-5 rounded-full focus:outline-none focus:border-cine-red cursor-pointer transition-all"
              >
                {ANOS.map(ano => <option key={ano} value={ano} className="bg-fondo text-texto">{ano === "todos" ? "Año: Todos" : ano}</option>)}
              </select>

              <select 
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
                className="bg-texto/[0.03] border border-texto/10 text-texto text-[10px] font-mono font-bold uppercase tracking-widest p-3 px-5 rounded-full focus:outline-none focus:border-cine-red cursor-pointer transition-all"
              >
                {MESES.map(mes => <option key={mes.valor} value={mes.valor} className="bg-fondo text-texto">{mes.label.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {eventosPasados.map(evento => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={evento.id}
                  className="group flex flex-col border border-texto/10 bg-texto/[0.02] hover:bg-texto/[0.05] transition-all p-6 rounded-xl cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase py-1.5 px-3 bg-texto/5 text-texto/40 rounded">
                      {evento.fecha}
                    </span>
                    <div className="opacity-20 group-hover:text-cine-red group-hover:opacity-100 transition-all">
                      {evento.tipo === "Proyección" ? <Film size={16}/> : <MessageCircle size={16}/>}
                    </div>
                  </div>
                  <h4 className="text-xl font-display font-bold leading-tight mb-4 group-hover:text-cine-red transition-colors">
                    {evento.titulo}
                  </h4>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-30 flex items-center gap-2 mt-auto pt-6 border-t border-texto/5">
                    <MapPin size={12}/> {evento.lugar}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
            
            {eventosPasados.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <p className="font-serif italic text-2xl opacity-20">Ningún fotograma encontrado en esta fecha...</p>
              </div>
            )}
          </motion.div>
        </section>

      </main>
    </div>
  );
}