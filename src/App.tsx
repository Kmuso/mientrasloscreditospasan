/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. IMPORTAMOS TU NUEVA "PUERTA SECRETA"
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Ensayos from "./pages/Ensayos";
import EnsayoIndividual from "./pages/EnsayoIndividual";
import SobreElProyecto from "./pages/SobreElProyecto";
import Videoclub from "./pages/Videoclub";
import Podcast from "./pages/Podcast";
import Videos from "./pages/Videos";
import Contacto from "./pages/Contacto";
import Biblioteca from "./pages/Biblioteca";
import Eventos from "./pages/Eventos";

export default function App() {
  return (
    <BrowserRouter>
      {/* 2. EL MENÚ GLOBAL 
          Al ponerlo aquí, el botón flotará por encima de cualquier página en la que estés. */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ensayos" element={<Ensayos />} />
        <Route path="/ensayos/:id" element={<EnsayoIndividual />} />
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