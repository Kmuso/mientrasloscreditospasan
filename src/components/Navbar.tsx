import { useState } from "react";
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import MenuOverlay from './MenuOverlay'; // Tu componente de menú lateral

export default function Navbar() {
  
  // =========================================
  // EL CEREBRO DEL SCROLL (El Operador de Boom)
  // =========================================
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Si estamos arriba del todo, siempre mostramos el menú
    if (latest <= 50) {
      setIsHidden(false);
      return;
    }
    
    // Si bajamos, ocultamos. Si subimos, mostramos.
    if (latest > previous) {
      setIsHidden(true); 
    } else {
      setIsHidden(false); 
    }
  });

  return (
    <motion.header 
      // Las posiciones clave de nuestra animación
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      // CAMBIO 1: fixed para que la animación fluya, bg-fondo/90 y backdrop-blur para el efecto vidrio
      className="fixed top-0 w-full z-50 bg-fondo/90 backdrop-blur-md border-b border-texto/10 transition-colors duration-700 font-sans"
    >
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LADO IZQUIERDO: Logo */}
        <div className="flex-1 flex justify-start">
          {/* CAMBIO 2: text-texto y hover:text-primario. font-serif para el logo. */}
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-texto hover:text-primario transition-colors font-serif lowercase">
            mientrasloscreditospasan.com
          </Link>
        </div>

        {/* CENTRO: Menú Principal */}
        <nav className="hidden lg:flex justify-center items-center gap-8 xl:gap-12 h-full">
          
          {/* ARCHIVO CON MENÚ DESPLEGABLE (Dropdown) */}
          <div className="relative group h-full flex items-center cursor-pointer">
            <span className="text-[11px] font-bold uppercase tracking-widest text-texto group-hover:text-primario transition-colors flex items-center gap-1.5">
              Archivo
              <svg className="w-2.5 h-2.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>

            {/* CAMBIO 3: bg-fondo y border-texto/10 para la caja desplegable */}
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-56 bg-fondo border border-texto/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col py-4 z-50">
              {/* CAMBIO 4: text-texto/70 y hover:bg-texto/5 para los botones */}
              <Link to="/ensayos" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-texto/70 hover:text-primario hover:bg-texto/5 transition-all">
                Ensayos
              </Link>
              <Link to="/retrospectivas" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-texto/70 hover:text-primario hover:bg-texto/5 transition-all">
                Retrospectivas
              </Link>
              <Link to="/resenas" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-texto/70 hover:text-primario hover:bg-texto/5 transition-all">
                Reseñas
              </Link>
              <Link to="/dossiers" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-texto/70 hover:text-primario hover:bg-texto/5 transition-all">
                Dossiers
              </Link>
            </div>
          </div>

          <Link to="/videoclub" className="text-[11px] font-bold uppercase tracking-widest text-texto/70 hover:text-primario transition-colors flex items-center gap-1.5">
            Videoclub
          </Link>
          <Link to="/podcast" className="text-[11px] font-bold uppercase tracking-widest text-texto/70 hover:text-primario transition-colors flex items-center gap-1.5">
            Podcast
          </Link>
          <Link to="/sobre-el-proyecto" className="text-[11px] font-bold uppercase tracking-widest text-texto/70 hover:text-primario transition-colors flex items-center gap-1.5">
            El Proyecto
          </Link>
        </nav>

        {/* LADO DERECHO: Menú Overlay */}
        <div className="flex-1 flex justify-end items-center">
          <MenuOverlay />
        </div>

      </div>
    </motion.header>
  );
}