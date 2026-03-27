import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, ExternalLink } from "lucide-react";

// 1. DATASET DE ARCHIVOS
const ARCHIVOS_DRIVE = [
  { id: 1, nombre: "A de Almodóvar: Estética y Kitsch", tipo: "PDF", link: "#" },
  { id: 2, nombre: "Bresson y el Modelo en el Cine", tipo: "Documento", link: "#" },
  { id: 3, nombre: "Cine Z: Manifiesto 2017", tipo: "Zine", link: "#" },
  { id: 4, nombre: "Cronenberg: La Nueva Carne", tipo: "Ensayo", link: "#" },
  { id: 5, nombre: "Godard: El lenguaje del corte", tipo: "PDF", link: "#" },
  { id: 6, nombre: "Herzog: Guía de supervivencia", tipo: "Manual", link: "#" },
  { id: 7, nombre: "Inmarcesible: El cine de Tarkovsky", tipo: "Ensayo", link: "#" },
];

const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Biblioteca() {
  const [filtroLetra, setFiltroLetra] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  // 2. LÓGICA DE FILTRADO
  const archivosFiltrados = useMemo(() => {
    return ARCHIVOS_DRIVE.filter((archivo) => {
      const cumpleLetra = filtroLetra ? archivo.nombre.startsWith(filtroLetra) : true;
      const cumpleBusqueda = archivo.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return cumpleLetra && cumpleBusqueda;
    });
  }, [filtroLetra, busqueda]);

  return (
    <div className="min-h-screen bg-fondo text-texto transition-colors duration-700 font-sans selection:bg-cine-red selection:text-white relative z-10">
      
      {/* NAVEGACIÓN */}
      <nav className="p-8 md:p-12 flex justify-between items-center border-b border-texto/10">
        <Link to="/" className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-cine-red transition-colors">
          [ ← INICIO ]
        </Link>
        <h2 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-40 italic">
          Archivo Digital / Drive
        </h2>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-6 text-titulo transition-colors duration-700"
          >
            BIBLIOTECA<span className="text-cine-red">.</span>
          </motion.h1>
          <p className="font-serif text-xl max-w-2xl opacity-70 leading-relaxed font-light">
            Explora nuestro catálogo de ensayos, fanzines y recursos compartidos de la comunidad cinematográfica.
          </p>
        </header>

        {/* CONTROLES: Buscador y Selector A-Z */}
        <section className="space-y-12 mb-20">
          {/* BUSCADOR ESTILO FICHERO */}
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:text-cine-red group-focus-within:opacity-100 transition-all" size={18} />
            <input 
              type="text"
              placeholder="BUSCAR POR TÍTULO..."
              className="w-full bg-transparent border-b border-texto/10 py-6 pl-10 focus:outline-none focus:border-cine-red transition-all text-xl md:text-2xl font-display tracking-tight placeholder:opacity-20"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* SELECTOR A-Z (Clasificador de tipos) */}
          <div className="flex flex-wrap gap-2 border-y border-texto/5 py-8">
            <button 
              onClick={() => setFiltroLetra(null)}
              className={`px-4 py-2 text-[10px] font-mono font-bold rounded-full transition-all ${!filtroLetra ? 'bg-cine-red text-white' : 'hover:bg-texto/10 opacity-50'}`}
            >
              TODOS
            </button>
            {ABECEDARIO.map(letra => (
              <button 
                key={letra}
                onClick={() => setFiltroLetra(letra)}
                className={`w-9 h-9 text-[10px] font-mono font-bold transition-all rounded-full flex items-center justify-center ${filtroLetra === letra ? 'bg-cine-red text-white scale-110 shadow-lg' : 'hover:bg-texto/10 opacity-30 hover:opacity-100'}`}
              >
                {letra}
              </button>
            ))}
          </div>
        </section>

        {/* GRILLA DE RESULTADOS (Cajas de Archivo) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {archivosFiltrados.map((archivo) => (
              <motion.a
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={archivo.id}
                href={archivo.link}
                target="_blank"
                className="group p-8 border border-texto/10 bg-texto/[0.02] hover:bg-cine-red hover:border-cine-red transition-all duration-500 flex flex-col justify-between aspect-[4/3] rounded-2xl relative overflow-hidden"
              >
                {/* Decoración de fondo sutil */}
                <div className="absolute -right-4 -top-4 text-texto/5 font-display text-8xl font-black group-hover:text-white/10 transition-colors">
                  {archivo.tipo[0]}
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase py-1.5 px-3 bg-texto/5 group-hover:bg-white/20 rounded border border-texto/10 group-hover:border-transparent transition-colors">
                      {archivo.tipo}
                    </span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-all text-white -translate-y-2 group-hover:translate-y-0" />
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-[1.1] group-hover:text-white transition-colors">
                    {archivo.nombre}
                  </h3>
                </div>
                
                <div className="relative z-10 flex items-center gap-2 text-[9px] font-mono font-bold tracking-widest group-hover:text-white/80 uppercase mt-8">
                  <span>Drive</span>
                  <div className="h-[1px] flex-1 bg-texto/10 group-hover:bg-white/30" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Abrir ↗</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </section>

        {/* NO RESULTS FEEDBACK */}
        {archivosFiltrados.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
            <p className="font-serif italic text-2xl opacity-20">Ningún archivo coincide con el metraje buscado...</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}