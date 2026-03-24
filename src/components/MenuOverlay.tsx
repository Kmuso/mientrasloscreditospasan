/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 1. LA INTERFAZ: Le decimos a TypeScript qué datos recibimos del Director (App.tsx)
interface MenuProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function MenuOverlay({ isOpen, setIsOpen }: MenuProps) {
  
  // 2. LA ACCIÓN: Cambia el estado y nos avisa en la consola
  const toggleMenu = () => {
    console.log("¡Clic! Cambiando el menú a:", !isOpen);
    setIsOpen(!isOpen);
  };

  // Bloqueamos el scroll de la página de fondo cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // --- LOS DATOS ---
  const mainLinks = [
    { title: "Ensayos", path: "/ensayos" },
    { title: "Videos", path: "/videos" },
    { title: "Podcast", path: "/podcast" },
    { title: "Videoclub", path: "/videoclub" },
    { title: "Biblioteca", path: "/biblioteca" },
    { title: "Proyecto", path: "/sobre-el-proyecto" },
    { title: "Contacto", path: "/contacto" },
  ];

  // --- LAS ANIMACIONES DE FRAMER MOTION ---
  const panelVars = {
    initial: { x: "100%" },
    animate: { x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  const linkVars = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } } 
  };

  // --- EL DISEÑO DEL MENÚ LATERAL (El Portal) ---
  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panelVars}
          initial="initial"
          animate="animate"
          exit="exit"
          // z-[99999] garantiza que esté por encima de absolutamente todo
          className="fixed right-0 top-0 bottom-0 w-full max-w-[450px] bg-[#111] text-white z-[99999] flex flex-col shadow-2xl"
        >
          
{/* EL BOTÓN DE CERRAR FLOTANTE (ARREGLADO CON TU COLOR PRIMARIO) */}
          <button 
            onClick={toggleMenu} 
            // CAMBIO: Usamos 'bg-primario' que es el rojo (#BF2011) de tu CSS.
            // Le damos hover:opacity-80 para que reaccione al pasar el mouse.
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-14 h-14 bg-primario rounded-l-xl items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shadow-[-5px_0_15px_rgba(0,0,0,0.3)] z-20"
            aria-label="Cerrar Menú"
          >
            {/* La X en blanco para que contraste perfectamente */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#FFFFFF] transform hover:rotate-90 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Textura de ruido de fondo sutil */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="relative z-10 flex flex-col h-full px-10 py-12">
            
            {/* Cabecera para celulares */}
            <div className="flex md:hidden justify-between items-center mb-8">
              <span className="font-mono text-xs tracking-widest uppercase text-[#ff0000] font-bold">Clase Z</span>
              <button onClick={toggleMenu} className="p-2 text-zinc-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Lista de enlaces */}
            <div className="flex flex-col gap-6 mt-12 flex-grow">
              {mainLinks.map((item) => (
                <motion.div key={item.title} variants={linkVars} className="flex items-center">
                  {/* BORRAMOS EL SPAN DEL NÚMERO */}
                  <Link 
                    to={item.path}
                    onClick={toggleMenu}
                    className="font-serif text-3xl md:text-4xl text-zinc-300 hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Newsletter anclado al fondo */}
            <motion.div variants={linkVars} className="mt-auto pt-10 border-t border-white/10">
              <label className="block text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">
                Newsletter
              </label>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0047FF] transition-colors"
                />
                <button className="w-full bg-white text-black text-sm font-bold px-4 py-3 rounded-lg hover:bg-zinc-300 transition-colors uppercase tracking-wider">
                  Suscribir
                </button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* BOTÓN HAMBURGUESA GLOBAL */}
      {/* Usamos z-[99999] para asegurar que se pueda hacer clic incluso si hay otras capas */}
      <button
        onClick={toggleMenu}
        className={`fixed top-8 right-6 md:top-12 md:right-12 z-[99999] flex flex-col justify-center items-center w-12 h-12 gap-[6px] hover:opacity-70 transition-opacity mix-blend-difference ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Abrir Menú"
      >
        <div className="w-8 h-[2px] bg-white transition-all duration-300" />
        <div className="w-8 h-[2px] bg-white transition-all duration-300" />
        <div className="w-8 h-[2px] bg-white transition-all duration-300" />
      </button>

      {/* Renderizamos el menú en el body directamente para evadir problemas de z-index de los padres */}
      {typeof document !== 'undefined' && createPortal(menuContent, document.body)}
    </>
  );
}