/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

// NUEVO: 1. Importa aquí tu componente de navegación. 
// (Asegúrate de que la ruta "./components/Navbar" coincida con tu carpeta y archivo real. 
// Si se llama "Menu", cámbialo a import Menu from "./components/Menu")
import Navbar from "./components/Navbar"; 

// Importación de las páginas
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
  // EL CEREBRO GLOBAL DEL TEMA
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      
{/* EL INTERRUPTOR GLOBAL */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-5 right-36 z-[9999] p-2.5 rounded-full border border-texto text-texto hover:bg-texto hover:text-fondo transition-all duration-300"
        aria-label="Cambiar Tema"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* NUEVO: LA TEXTURA GLOBAL (CUADRÍCULA) PARA TODAS LAS PÁGINAS */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04] transition-opacity duration-700 z-0 mix-blend-difference" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, var(--color-texto) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-texto) 1px, transparent 1px)
          `, 
          backgroundSize: "64px 64px" 
        }}
      ></div>

      {/* AQUÍ COLOCAMOS TU NAVBAR GLOBAL */}
      <Navbar />

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
    </BrowserRouter>
  );
}