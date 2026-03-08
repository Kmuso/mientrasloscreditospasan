/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Home() {
  // 1. Variantes de Animación: El "Collins Reveal"
  // Imagina esto como una cortina que sube en el escenario.
  const containerVars = {
    animate: {
      transition: {
        staggerChildren: 0.1, // Las palabras aparecen una tras otra con ritmo
      },
    },
  };

  const wordVars = {
    initial: { y: "100%" }, // Empieza escondido abajo (fuera de su caja)
    animate: {
      y: 0, // Sube a su posición original
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // Un movimiento suave pero con intención
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 md:p-12 bg-cream text-ink selection:bg-ink selection:text-cream overflow-hidden">
      
      {/* 2. HEADER TÉCNICO: Detalles que dan credibilidad visual */}
      <header className="flex justify-between items-start z-10 border-b border-ink/10 pb-4">
        <div className="text-[10px] tracking-[0.3em] uppercase font-black opacity-40">
          Est. 2017 / Colectivo Clase Z
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase font-black opacity-40 text-right hidden sm:block">
          Cine / Crítica / Archivo Audiovisual
        </div>
      </header>

      {/* 3. EL NÚCLEO (HERO): Tipografía como Arquitectura */}
      <motion.main
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="flex-grow flex flex-col items-center justify-center text-center"
      >
        {/* Usamos 'overflow-hidden' en los contenedores para crear el efecto de máscara */}
       
        <div className="overflow-hidden py-2">
          <motion.h1 
            variants={wordVars}
            className="text-[4vw] leading-[0.8] font-black tracking-[-0.05em]"
          >
            mientrasloscréditospasan.com
          </motion.h1>
        </div>
    
      </motion.main>

      {/* 4. NAVEGACIÓN EN GRID: Limpieza y orden editorial */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-full"
      >
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-8 border-t border-ink/10 pt-6 text-[10px] font-black tracking-[0.2em] uppercase">
          {[
            { name: "Ensayos", path: "/ensayos" },
            { name: "Videos", path: "/videos" },
            { name: "Podcast", path: "/podcast" },
            { name: "Videoclub", path: "/videoclub" },
            { name: "Biblioteca", path: "/biblioteca" },
            { name: "Eventos", path: "/eventos" },
            { name: "Proyecto", path: "/sobre-el-proyecto" },
            { name: "Contacto", path: "/contacto" },
          ].map((item) => (
            <li key={item.name} className="group">
              <Link to={item.path} className="flex flex-col gap-2 hover:text-ink transition-colors opacity-40 group-hover:opacity-100">
                <span className="text-[8px] opacity-30 group-hover:translate-x-1 transition-transform">0{item.name.length}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}