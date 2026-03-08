import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const ultimasEntradas = [
    { title: "El declive del blockbuster", category: "Ensayo" },
    { title: "Anatomía de un plano", category: "Video" },
    { title: "Manifiesto Clase Z", category: "Proyecto" },
  ];

  const menuVars = {
    initial: { scaleY: 0, transformOrigin: "top" },
    animate: { scaleY: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { scaleY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const containerVars = {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 md:top-12 md:right-12 z-50 flex flex-col gap-[6px] p-2 mix-blend-difference"
      >
        <motion.div 
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-8 h-[2px] bg-white"
        />
        <motion.div 
          animate={isOpen ? { rotate: -45, y: -0 } : { rotate: 0, y: 0 }}
          className="w-8 h-[2px] bg-white"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-ink text-cream z-40 flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
          >
            <motion.div 
              variants={containerVars} 
              initial="initial" 
              animate="animate"
              // Nuestra retícula base de 3 columnas
              className="mt-24 md:mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 h-full content-center"
            >
              
              {/* COLUMNA 1 y 2: Le damos 'lg:col-span-2' para que ocupe 2/3 de la pantalla y empuje la columna derecha */}
              <div className="flex flex-col justify-between h-full lg:col-span-2">
                <motion.p variants={itemVars} className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-12 max-w-xs">
                  Bienvenidos al archivo digital del Colectivo Clase Z. Exploración y crítica cinematográfica.
                </motion.p>
                
                <nav className="flex flex-col gap-4">
                  {["Ensayos", "Eventos", "Biblioteca"].map((item) => (
                    <motion.div key={item} variants={itemVars}>
                      <Link 
                        to={`/${item.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="font-black text-[10vw] md:text-[5vw] uppercase tracking-tighter leading-none hover:opacity-70 transition-opacity"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* COLUMNA 3: Las entradas verticales pegadas a la derecha */}
              <div className="flex flex-col justify-end">
                <motion.h3 variants={itemVars} className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-6 border-b border-cream/20 pb-2">
                  Últimas Entradas
                </motion.h3>
                {/* CAMBIO CLAVE: 'flex-col' en lugar de 'grid' para apilarlos verticalmente */}
                <div className="flex flex-col gap-6">
                  {ultimasEntradas.map((entrada, idx) => (
                    <motion.div key={idx} variants={itemVars} className="group cursor-pointer flex items-center gap-4">
                      {/* Miniatura (Thumbnail) */}
                      <div className="w-24 aspect-video bg-cream/10 group-hover:bg-cream/20 transition-colors flex-shrink-0" />
                      {/* Textos */}
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-widest opacity-50 mb-1">{entrada.category}</p>
                        <h4 className="font-black text-sm uppercase tracking-tighter leading-tight">{entrada.title}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* SECCIÓN INFERIOR: Suscripción y Redes */}
            <motion.div 
              variants={itemVars}
              initial="initial"
              animate="animate"
              className="mt-12 pt-6 border-t border-cream/20 flex flex-col md:flex-row justify-between items-end md:items-center gap-8"
            >
              <div className="w-full md:w-1/2">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-50 block mb-2">
                  Keep up to date
                </label>
                <div className="flex border-b border-cream/50 pb-2">
                  <input 
                    type="email" 
                    placeholder="TU CORREO ELECTRÓNICO" 
                    className="bg-transparent outline-none w-full font-black uppercase placeholder:text-cream/30 text-sm"
                  />
                  <button className="font-mono text-[10px] uppercase tracking-widest hover:opacity-70">→</button>
                </div>
              </div>

              <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
                <a href="#" className="hover:opacity-70">X (Twitter)</a>
                <a href="#" className="hover:opacity-70">Instagram</a>
                <a href="#" className="hover:opacity-70">Facebook</a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}