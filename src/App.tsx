/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
// 1. IMPORTANTE: Agregamos "Link" a esta línea
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

import Navbar from "./components/MenuOverlay"; 

import Home from "./pages/Home";
import Ensayos from "./pages/Ensayos";
import SobreElProyecto from "./pages/SobreElProyecto";
import Videoclub from "./pages/Videoclub";
import Podcast from "./pages/Podcast";
import Videos from "./pages/Videos";
import Contacto from "./pages/Contacto";
import Biblioteca from "./pages/Biblioteca";
import Eventos from "./pages/Eventos";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const mainStageVariants = {
    closed: { scale: 1, x: 0, borderRadius: "0px" },
    open: { scale: 0.95, x: "-15%", borderRadius: "24px" }
  };

  return (
    <BrowserRouter>
      
      {/* NUEVO: TU TÍTULO / LOGO FLOTANTE (ARRIBA A LA IZQUIERDA) */}
      <Link 
        to="/"
        className="fixed top-8 left-6 md:top-12 md:left-12 z-[9999] font-serif font-bold text-lg md:text-xl tracking-tighter text-texto hover:opacity-50 transition-opacity mix-blend-difference"
        aria-label="Volver al inicio"
      >
        mientrasloscréditos<br className="md:hidden"/>pasan.
      </Link>

      {/* EL INTERRUPTOR GLOBAL (Tema oscuro/claro) */}
      {/* Ajustado para no chocar con el título ni con el menú */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-8 right-24 md:top-12 md:right-32 z-[9999] p-2.5 rounded-full border border-texto text-texto hover:bg-texto hover:text-fondo transition-all duration-300 mix-blend-difference"
        aria-label="Cambiar Tema"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04] transition-opacity duration-700 z-0 mix-blend-difference" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, var(--color-texto) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-texto) 1px, transparent 1px)
          `, 
          backgroundSize: "64px 64px" 
        }}
      />

      {/* LE PASAMOS EL ESTADO AL MENÚ */}
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* EL ESCENARIO ANIMADO */}
      <div className="bg-[#0a0a0a] w-full h-screen overflow-hidden">
        <motion.div
          variants={mainStageVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="w-full h-screen bg-fondo origin-center shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-x-hidden overflow-y-auto transition-colors duration-700"
          style={{ pointerEvents: isMenuOpen ? "none" : "auto" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ensayos" element={<Ensayos />} />
            <Route path="/sobre-el-proyecto" element={<SobreElProyecto />} />
            <Route path="/videoclub" element={<Videoclub />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/eventos" element={<Eventos />} />
          </Routes>
        </motion.div>
      </div>
    </BrowserRouter>
  );
}