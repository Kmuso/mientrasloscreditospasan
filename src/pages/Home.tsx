/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react"; // Asegurado que use motion/react
import { ArrowRight } from "lucide-react";

import rawDatabase from "../../metadata.json";

const database: any[] = rawDatabase;

export default function Home() {
  const ultimasEntradas = database.slice(0, 4);

  const ilustraciones = [
    { id: 1, title: "El Resplandor", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "Blade Runner", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "2001: Odisea", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Parasite", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Vertigo", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop" },
  ];

  const mainLinks = ["Ensayos", "Videos", "Podcast"];
  const secondaryLinks = [
    { name: "Biblioteca", path: "/biblioteca" },
    { name: "Eventos", path: "/eventos" },
    { name: "Proyecto", path: "/sobre-el-proyecto" },
    { name: "Contacto", path: "/contacto" },
  ];

  const containerVars = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  const wordVars = {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  };

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoScroll } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "center center"] 
  });
  const scale = useTransform(videoScroll, [0, 1], [0.8, 1]);
  const borderRadius = useTransform(videoScroll, [0, 1], ["40px", "0px"]);

  return (
    // CAMBIO IMPORTANTE: Quitamos min-h-screen de aquí arriba, ya no es necesario
    <div className="bg-fondo text-texto selection:bg-texto selection:text-fondo font-sans transition-colors duration-700">
      
      {/* SECCIÓN 1: EL HERO MINIMALISTA */}
      {/* CAMBIO: Usamos h-screen fijo (100vh virtual) para que siempre mida la pantalla exacta */}
      <section className="relative h-[100vh] w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
        <motion.main variants={containerVars} initial="initial" animate="animate" className="text-center flex flex-col items-center">
          <div className="overflow-hidden py-2">
            <motion.h1 variants={wordVars} className="text-[4vw] leading-[0.8] font-serif font-bold tracking-[-0.05em] text-titulo-hero transition-colors duration-500">
              mientrasloscréditospasan.com
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-6">
            <motion.p variants={wordVars} className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-80 max-w-lg leading-relaxed text-subtitulo-hero transition-colors duration-500">
              Archivo digital de exploración y crítica cinematográfica. <br className="hidden md:block"/>
              Transmitiendo desde Cusco, Perú.
            </motion.p>
          </div>
        </motion.main>
      </section>

      {/* SECCIÓN 2: EL VIDEO ESCALABLE */}
      <section ref={videoContainerRef} className="h-[150vh] w-full relative py-12 px-4 md:px-0 flex flex-col items-center">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12">
          <motion.div style={{ scale, borderRadius }} className="w-full max-w-[95vw] md:max-w-[80vw] h-full bg-texto relative overflow-hidden shadow-2xl">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://www.w3schools.com/html/mov_bbb.mp4" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="font-serif font-black text-fondo text-[4vw] md:text-[3vw] mix-blend-difference opacity-80 uppercase tracking-tighter">
                Archivo Visual.
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 3: LA LISTA EDITORIAL */}
      <section className="w-full py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col mb-16 gap-8">
          <h2 className="font-serif text-[7vw] md:text-[3.5vw] leading-[1.1] tracking-tight max-w-3xl text-texto">
            Últimas anotaciones del archivo audiovisual.
          </h2>
          <Link to="/ensayos" className="bg-texto text-fondo px-6 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity self-start">
            Explorar Archivo
          </Link>
        </div>
        
        <div className="flex flex-col border-t border-texto/20">
          {ultimasEntradas.map((entrada) => (
            <Link key={entrada.id} to="/ensayos" className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-start md:items-center py-6 border-b border-texto/20 hover:bg-texto hover:text-fondo transition-colors duration-300 px-6 -mx-6 cursor-pointer">
              <h3 className="md:col-span-5 font-serif font-medium text-xl md:text-2xl tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {entrada.title}
              </h3>
              <div className="md:col-span-7 flex flex-col justify-center">
                <p className="text-sm md:text-base font-sans font-normal opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed max-w-2xl">
                  {entrada.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/ensayos" className="text-sm font-medium text-secundario hover:opacity-50 transition-opacity flex items-center gap-2 w-max">
            Todo el archivo ({database.length}) <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </section>

      {/* SECCIÓN 4: ILUSTRACIONES */}
      <section className="w-full py-32 overflow-hidden bg-fondo">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <h2 className="font-serif text-[7vw] md:text-[3.5vw] leading-[1.1] tracking-tight max-w-3xl mb-6 text-texto">
            Ilustraciones Gráficas.
          </h2>
          <p className="text-sm md:text-base font-sans font-normal text-texto opacity-60 max-w-xl mb-10 leading-relaxed">
            Exploración visual, afiches alternativos y reinterpretaciones gráficas inspiradas en las obras que documentamos.
          </p>
        </div>

        <div className="flex gap-4 md:gap-8 px-6 md:px-12 xl:px-[calc((100vw-80rem)/2)] overflow-x-auto snap-x snap-mandatory pb-16 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {ilustraciones.map((ilus) => (
            <div
              key={ilus.id}
              className="w-40 md:w-56 lg:w-64 aspect-square rounded-xl overflow-hidden relative group snap-center md:snap-start flex-shrink-0 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <img src={ilus.img} alt={ilus.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <h3 className="font-serif font-black text-sm md:text-base uppercase tracking-tighter text-[#D9C0A3] translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {ilus.title}
                </h3>
              </div>
            </div>
          ))}
          <div className="min-w-[5vw] md:min-w-[10vw] flex-shrink-0" aria-hidden="true" />
        </div>
      </section>

      {/* SECCIÓN 5: FOOTER */}
      <footer className="w-full pt-16 pb-12 px-6 md:px-12 xl:px-20 border-t border-texto/10">
        <div className="flex flex-col justify-between min-h-max max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 flex-grow">
            
            <div className="flex flex-col justify-between h-full lg:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-widest text-texto opacity-50 mb-12 max-w-xs">
                Bienvenidos al archivo digital del Colectivo Clase Z. Exploración y crítica cinematográfica.
              </p>
              
              <div className="mt-auto">
                <nav className="flex flex-col gap-0 mb-12">
                  {mainLinks.map((item) => (
                    <Link 
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="font-serif font-medium text-[12vw] md:text-[6.5vw] lg:text-[5vw] tracking-tight leading-[1.1] text-texto hover:text-primario transition-colors block"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-wrap items-center gap-6 md:gap-8">
                  <Link
                    to="/videoclub"
                    className="bg-texto text-fondo px-8 py-3 rounded-full text-sm md:text-base font-sans font-semibold hover:opacity-90 transition-opacity"
                  >
                    Videoclub
                  </Link>
                  {secondaryLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-sm md:text-base font-sans font-medium text-texto hover:text-terciario transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end lg:col-span-5 pt-8 lg:pt-0 pl-0 lg:pl-12">
              <div className="flex flex-col gap-6">
                {ultimasEntradas.slice(0, 3).map((entrada, idx) => (
                  <Link key={idx} to="/ensayos" className="group flex items-center gap-6 cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-texto/10 rounded overflow-hidden flex-shrink-0">
                      <img src={entrada.image || entrada.img} alt={entrada.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-texto/60 text-xs md:text-sm font-sans font-medium mb-1">
                        {entrada.date || entrada.category}
                      </span>
                      <h4 className="text-texto text-sm md:text-base font-serif font-medium leading-tight group-hover:text-primario transition-colors">
                        {entrada.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-5 h-5 text-texto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-texto/10">
            <div className="w-full md:w-auto">
              <label className="block text-texto text-sm font-sans font-medium mb-3">
                Mantente al día
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  className="w-full md:w-72 bg-transparent border border-texto/30 text-texto rounded-full px-6 py-3 text-sm font-sans focus:outline-none focus:border-texto transition-colors placeholder:text-texto/30"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-sans font-medium text-texto">
              <a href="#" className="hover:text-primario transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-primario transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primario transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col gap-4 mt-24 pt-12 border-t border-texto/10 max-w-7xl mx-auto w-full">
          <h1 className="font-serif font-black text-texto text-[12vw] tracking-tighter uppercase leading-none opacity-10 hover:opacity-100 hover:text-primario transition-all duration-1000 cursor-default">
            Clase Z.
          </h1>
        </div>
      </footer>
    </div>
  );
}