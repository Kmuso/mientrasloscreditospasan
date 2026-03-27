/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "motion/react";

import Navbar from "./components/MenuOverlay"; 
import CameraLens from "./components/CameraLens"; 

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
  // --- CONSOLA DE DIRECCIÓN ---

  // 1. CONTROL DE ESCENOGRAFÍA: Maneja la animación de encoger la página
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. CONTROL DE ILUMINACIÓN: Maneja los filtros de color
  const [epoca, setEpoca] = useState('moderna');

  // 3. EFECTO DE LUZ: Cuando 'epoca' cambia, aplicamos el filtro al <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('theme-moderna', 'theme-technicolor', 'theme-clasico');
    html.classList.add(`theme-${epoca}`);
  }, [epoca]);

  // 4. ANIMACIÓN DEL ESCENARIO 
  const mainStageVariants = {
    closed: { scale: 1, x: 0, borderRadius: "0px" },
    open: { scale: 0.95, x: "-15%", borderRadius: "24px" }
  };

  return (
    <BrowserRouter>
      
      {/* 1. TU TÍTULO / LOGO FLOTANTE */}
      <Link 
        to="/"
        className="fixed top-8 left-6 md:top-12 md:left-12 z-[9999] font-serif font-bold text-lg md:text-xl tracking-tighter text-texto hover:opacity-50 transition-opacity mix-blend-difference"
        aria-label="Volver al inicio"
      >
        mientrasloscréditos<br className="md:hidden"/>pasan.
      </Link>

      {/* 2. SELECTOR DE ÉPOCAS (Lente de Cámara) */}
      <CameraLens 
        currentEpoca={epoca} 
        setEpoca={setEpoca} 
      />

      {/* 3. CAPA DE CELULOIDE (FILM GRAIN) 
          Colocamos esta capa fija por detrás de todo el contenido interactivo
          para darle esa textura orgánica y cinematográfica.
      */}
      <div className="film-grain" />

      {/* 4. MENÚ LATERAL DE NAVEGACIÓN */}
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* 5. EL ESCENARIO ANIMADO (Donde se proyectan las páginas) */}
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