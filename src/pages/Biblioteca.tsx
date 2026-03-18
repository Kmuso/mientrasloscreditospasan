import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folderp, ExternalLink } from "lucide-react";

// 1. SIMULACIÓN DE DATOS (DATASET)
// En el futuro, esto podría venir de un JSON o API.
const ARCHIVOS_DRIVE = [
  { id: 1, nombre: "A de Almodóvar: Estética y Kitsch", tipo: "PDF", link: "#" },
  { id: 2, nombre: "Bresson y el Modelo en el Cine", tipo: "Documento", link: "#" },
  { id: 3, nombre: "Cine Z: Manifiesto 2017", tipo: "Zine", link: "#" },
  { id: 4, nombre: "Cronenberg: La Nueva Carne", tipo: "Ensayo", link: "#" },
  { id: 5, nombre: "Godard: El lenguaje del corte", tipo: "PDF", link: "#" },
  // ... añade más para probar el scroll
];

const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Biblioteca() {
  // ESTADOS: Son como nuestros "Controllers" en animación. 
  // Determinan qué se renderiza en cada fotograma.
  const [filtroLetra, setFiltroLetra] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  // 2. LÓGICA DE FILTRADO (useMemo)
  // Es como un pre-render. Solo se recalcula si cambia la búsqueda o el filtro.
  const archivosFiltrados = useMemo(() => {
    return ARCHIVOS_DRIVE.filter((archivo) => {
      const cumpleLetra = filtroLetra ? archivo.nombre.startsWith(filtroLetra) : true;
      const cumpleBusqueda = archivo.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return cumpleLetra && cumpleBusqueda;
    });
  }, [filtroLetra, busqueda]);

  return (
    <div className="min-h-screen bg-fondo text-texto transition-colors duration-500 font-sans selection:bg-primario selection:text-white">
      
      {/* NAVEGACIÓN */}
      <nav className="p-6 flex justify-between items-center border-b border-texto/10">
        <Link to="/" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-primario transition-colors">
          [ ← Inicio ]
        </Link>
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 italic">
          Archivo Digital / Drive
        </h2>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
          >
            BIBLIOTECA<span className="text-primario">.</span>
          </motion.h1>
          <p className="font-serif text-xl max-w-xl opacity-80 leading-relaxed">
            Explora nuestro catálogo de ensayos, fanzines y recursos compartidos de la comunidad.
          </p>
        </header>

        {/* CONTROLES: Buscador y Selector A-Z */}
        <section className="space-y-8 mb-16">
          {/* BUSCADOR */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-primario group-focus-within:opacity-100 transition-all" size={20} />
            <input 
              type="text"
              placeholder="Buscar por título..."
              className="w-full bg-texto/5 border-b-2 border-texto/10 p-4 pl-12 focus:outline-none focus:border-primario transition-all text-lg"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* SELECTOR A-Z (Analogía: El clasificador de tipos móviles) */}
          <div className="flex flex-wrap gap-2 justify-center border-y border-texto/5 py-4">
            <button 
              onClick={() => setFiltroLetra(null)}
              className={`px-3 py-1 text-xs font-black rounded-sm transition-all ${!filtroLetra ? 'bg-primario text-white' : 'hover:bg-texto/10'}`}
            >
              TODOS
            </button>
            {ABECEDARIO.map(letra => (
              <button 
                key={letra}
                onClick={() => setFiltroLetra(letra)}
                className={`w-8 h-8 text-xs font-bold transition-all rounded-full flex items-center justify-center ${filtroLetra === letra ? 'bg-primario text-white scale-125' : 'hover:bg-texto/20 opacity-40 hover:opacity-100'}`}
              >
                {letra}
              </button>
            ))}
          </div>
        </section>

        {/* GRILLA DE RESULTADOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {archivosFiltrados.map((archivo) => (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={archivo.id}
                href={archivo.link}
                target="_blank"
                className="group p-6 border border-texto/10 bg-texto/5 hover:bg-primario hover:border-primario transition-all duration-300 flex flex-col justify-between aspect-video"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-texto/10 group-hover:bg-white/20">
                      {archivo.tipo}
                    </span>
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                  </div>
                  <h3 className="text-xl font-black leading-tight group-hover:text-white">
                    {archivo.nombre}
                  </h3>
                </div>
                <p className="text-[10px] font-bold tracking-tighter group-hover:text-white/60 uppercase">
                  Abrir en Google Drive ↗
                </p>
              </motion.a>
            ))}
          </AnimatePresence>
        </section>

        {/* FEEDBACK SI NO HAY RESULTADOS */}
        {archivosFiltrados.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 opacity-30 italic">
            No se encontraron archivos bajo este criterio.
          </motion.div>
        )}
      </main>
    </div>
  );
}