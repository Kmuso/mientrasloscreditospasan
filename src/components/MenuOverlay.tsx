import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquea el scroll del fondo cuando el menú se abre
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const ultimasEntradas = [
    { title: "El declive del blockbuster", category: "Ensayo", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=200&auto=format&fit=crop" },
    { title: "Anatomía de un plano", category: "Video", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200&auto=format&fit=crop" },
    { title: "Manifiesto Clase Z", category: "Proyecto", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=200&auto=format&fit=crop" },
  ];

  const mainLinks = ["Ensayos", "Videos", "Podcast"];
  const secondaryLinks = [
    { name: "Biblioteca", path: "/biblioteca" },
    { name: "Eventos", path: "/eventos" },
    { name: "Proyecto", path: "/sobre-el-proyecto" },
    { name: "Contacto", path: "/contacto" },
  ];

  const overlayVars = {
    initial: { scaleY: 0, transformOrigin: "top" },
    animate: { scaleY: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { scaleY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
  };

  const contentVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } } 
  };

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVars}
          initial="initial"
          animate="animate"
          exit="exit"
          // Z-[100] asegura que esté por encima de absolutamente todo
         // Explicación: Cambiamos 'inset-0' y 'overflow-y-auto' por medidas estrictas (w-full h-[100dvh]) 
// y le ponemos 'overflow-hidden' para que sea una máscara de recorte perfecta.
className="fixed top-0 left-0 w-full h-[100dvh] bg-[#11161A] text-[#FBF9F6] z-[100] flex flex-col overflow-hidden"
        >
          
          {/* NUEVO: LA CABECERA DEL PORTAL (Una copia visual de tu Navbar pero oscura) */}
          <div className="w-full max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between flex-shrink-0">
            {/* Logo Falso (decorativo) */}
            <div className="flex-1 flex justify-start">
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-[#FBF9F6] opacity-50 font-serif lowercase">
                mientrasloscreditospasan.com
              </span>
            </div>
            
            {/* EL BOTÓN DE CERRAR ("X") */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="relative flex flex-col gap-[6px] p-2 hover:opacity-70 transition-opacity z-50"
                aria-label="Cerrar Menú"
              >
                <motion.div 
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: 45, y: 8 }} 
                  className="w-8 h-[2px] bg-[#FBF9F6]" 
                />
                <motion.div 
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: -45, y: -0 }} 
                  className="w-8 h-[2px] bg-[#FBF9F6]" 
                />
              </button>
            </div>
          </div>

          {/* EL LIENZO ELÁSTICO CON EL CONTENIDO */}
          <motion.div 
            variants={contentVars}
            // Cambié el padding-top (pt) porque ahora tenemos la cabecera arriba ocupando espacio
            // Explicación: Quitamos 'min-h-full' que forzaba el crecimiento.
// Agregamos 'flex-1' para que ocupe el espacio sobrante debajo de la cabecera.
// Agregamos 'overflow-y-auto' para que SI la pantalla es pequeñita, el usuario pueda hacer scroll
// solo dentro de esta área, sin mover el botón de cerrar ("X").
className="flex flex-col justify-between flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-20 pt-8 pb-12 gap-16"
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 flex-grow">
              
              {/* COLUMNA IZQUIERDA (Navegación) */}
              <div className="flex flex-col justify-between h-full lg:col-span-7">
                <motion.p variants={itemVars} className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-12 max-w-xs">
                  Bienvenidos al archivo digital. Exploración y crítica cinematográfica.
                </motion.p>
                
                <div className="mt-auto">
                  <nav className="flex flex-col gap-0 mb-12">
                    {mainLinks.map((item) => (
                      <motion.div key={item} variants={itemVars}>
                        <Link 
                          to={`/${item.toLowerCase()}`}
                          onClick={() => setIsOpen(false)}
                          className="font-sans font-medium text-[12vw] md:text-[6.5vw] lg:text-[5vw] tracking-tight leading-[1.1] hover:text-[#FBF9F6]/70 transition-colors block"
                        >
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div variants={itemVars} className="flex flex-wrap items-center gap-6 md:gap-8">
                    <Link
                      to="/videoclub"
                      onClick={() => setIsOpen(false)}
                      className="bg-[#FBF9F6] text-[#11161A] px-8 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-[#FBF9F6]/90 transition-colors"
                    >
                      Videoclub
                    </Link>

                    {secondaryLinks.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="text-sm md:text-base font-medium hover:text-[#FBF9F6]/60 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* COLUMNA DERECHA (Buscador + Entradas) */}
              <div className="flex flex-col justify-center lg:col-span-5 lg:pl-12">
                
                <motion.div variants={itemVars} className="mb-12 relative group">
                  <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FBF9F6] opacity-40 group-focus-within:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Buscar en el archivo..." 
                    className="w-full bg-transparent border-b border-[#FBF9F6]/20 text-[#FBF9F6] text-sm md:text-base py-3 pl-8 focus:outline-none focus:border-[#ff4500] transition-colors placeholder:text-[#FBF9F6]/30"
                  />
                </motion.div>

                <div className="flex flex-col gap-6">
                  <motion.h3 variants={itemVars} className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2">
                    Añadidos Recientemente
                  </motion.h3>
                  
                  {ultimasEntradas.map((entrada, idx) => (
                    <motion.div key={idx} variants={itemVars}>
                      <Link to="/ensayos" onClick={() => setIsOpen(false)} className="group flex items-center gap-6 cursor-pointer">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FBF9F6]/10 rounded overflow-hidden flex-shrink-0">
                          <img src={entrada.img} alt={entrada.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                        </div>
                        <div className="flex flex-col flex-grow">
                          <span className="text-[#FBF9F6]/60 text-xs md:text-sm font-medium mb-1">
                            {entrada.category}
                          </span>
                          <h4 className="text-[#FBF9F6] text-sm md:text-base font-medium leading-tight group-hover:text-[#FBF9F6]/80 transition-colors">
                            {entrada.title}
                          </h4>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#FBF9F6] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ZONA INFERIOR */}
            <motion.div 
              variants={itemVars}
              className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-[#FBF9F6]/10 mt-auto"
            >
              <div className="w-full md:w-auto">
                <label className="block text-[#FBF9F6] text-sm font-medium mb-3">
                  Newsletter
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full md:w-72 bg-transparent border border-[#FBF9F6]/30 text-[#FBF9F6] rounded-full px-6 py-3 text-sm focus:outline-none focus:border-[#ff4500] transition-colors placeholder:text-[#FBF9F6]/30"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm font-medium text-[#FBF9F6]">
                <a href="#" className="hover:text-[#FBF9F6]/60 transition-colors">X (Twitter)</a>
                <a href="#" className="hover:text-[#FBF9F6]/60 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-[#FBF9F6]/60 transition-colors">Instagram</a>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* EL BOTÓN PARA ABRIR (Vive en el Navbar normal) */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex flex-col gap-[6px] p-2 hover:opacity-70 transition-opacity"
        aria-label="Menú"
      >
        <motion.div className="w-8 h-[2px] transition-colors duration-300 bg-texto" />
        <motion.div className="w-8 h-[2px] transition-colors duration-300 bg-texto" />
      </button>

      {/* RENDERIZAMOS EL PORTAL EN EL BODY */}
      {typeof document !== 'undefined' && createPortal(menuContent, document.body)}
    </>
  );
}