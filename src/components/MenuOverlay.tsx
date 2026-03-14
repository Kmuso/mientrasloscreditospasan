import { useState, useEffect } from "react";
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

  // APLANAMOS LA ANIMACIÓN: El menú padre ahora controla el tiempo de los hijos
  const menuVars = {
    initial: { scaleY: 0, transformOrigin: "top" },
    animate: { 
      scaleY: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08, // Le dice a los textos que salgan uno tras otro
        delayChildren: 0.3     // Espera a que el fondo baje para empezar a mostrar letras
      } 
    },
    exit: { 
      scaleY: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  const itemVars = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0 } // Desaparecen al instante al cerrar el menú
  };

  return (
    <>
      {/* EL BOTÓN HAMBURGUESA (Mantiene el camuflaje oscuro/claro) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex flex-col gap-[6px] p-2 hover:opacity-70 transition-opacity"
        aria-label="Menú"
      >
        <motion.div 
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} 
          className={`w-8 h-[2px] transition-colors duration-300 ${isOpen ? 'bg-[#FBF9F6]' : 'bg-texto'}`} 
        />
        <motion.div 
          animate={isOpen ? { rotate: -45, y: -0 } : { rotate: 0, y: 0 }} 
          className={`w-8 h-[2px] transition-colors duration-300 ${isOpen ? 'bg-[#FBF9F6]' : 'bg-texto'}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#11161A] text-[#FBF9F6] z-40 flex flex-col p-6 md:p-12 xl:p-20 overflow-y-auto"
          >
            {/* CAMBIO CLAVE: Cambiamos este motion.div por un div normal. 
                De esta forma no cortamos la señal de animación del padre a los textos. */}
            <div className="flex flex-col justify-between h-full min-h-max mt-16 md:mt-0 max-w-7xl mx-auto w-full">
              
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
                <div className="flex flex-col justify-center lg:col-span-5 pt-8 lg:pt-0 pl-0 lg:pl-12">
                  
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
                className="mt-16 lg:mt-auto pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}