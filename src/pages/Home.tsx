/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import database from "../../metadata.json";

export default function Home() {
  const ultimasEntradas = database.slice(0, 4);

  // Datos para Ilustraciones
  const ilustraciones = [
    { id: 1, title: "El Resplandor", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "Blade Runner", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "2001: Odisea", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Parasite", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Vertigo", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop" },
  ];

  // Datos de Navegación (Espejo del MenuOverlay)
  const mainLinks = ["Ensayos", "Videos", "Podcast"];
  const secondaryLinks = [
    { name: "Biblioteca", path: "/biblioteca" },
    { name: "Eventos", path: "/eventos" },
    { name: "Proyecto", path: "/sobre-el-proyecto" },
    { name: "Contacto", path: "/contacto" },
  ];

  // Variantes de Animación del Hero
  const containerVars = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  const wordVars = {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  };

  // Lógica de Scroll (Video)
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoScroll } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "center center"] 
  });
  const scale = useTransform(videoScroll, [0, 1], [0.8, 1]);
  const borderRadius = useTransform(videoScroll, [0, 1], ["40px", "0px"]);

  // Lógica de "Apagón Cinematográfico"
  const darkSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: darkScroll } = useScroll({
    target: darkSectionRef,
    offset: ["start 65%", "start 10%"] 
  });

  const backgroundColor = useTransform(darkScroll, [0, 1], ["#F5F5F0", "#0A0A0A"]); 
  const textColor = useTransform(darkScroll, [0, 1], ["#0A0A0A", "#F5F5F0"]);

  return (
    <motion.div 
      style={{ backgroundColor, color: textColor }} 
      className="transition-colors selection:bg-ink selection:text-cream min-h-screen font-sans"
    >
      
      {/* SECCIÓN 1: EL HERO MINIMALISTA */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
        <motion.main variants={containerVars} initial="initial" animate="animate" className="text-center flex flex-col items-center">
          <div className="overflow-hidden py-2">
            <motion.h1 variants={wordVars} className="text-[4vw] leading-[0.8] font-black tracking-[-0.05em]">
              mientrasloscréditospasan.com
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-6">
            <motion.p variants={wordVars} className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-50 max-w-lg leading-relaxed">
              Archivo digital de exploración y crítica cinematográfica. <br className="hidden md:block"/>
              Transmitiendo desde Cusco, Perú.
            </motion.p>
          </div>
        </motion.main>
      </section>

      {/* SECCIÓN 2: EL VIDEO ESCALABLE */}
      <section ref={videoContainerRef} className="h-[150vh] w-full relative py-12 px-4 md:px-0 flex flex-col items-center">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12">
          <motion.div style={{ scale, borderRadius }} className="w-full max-w-[95vw] md:max-w-[80vw] h-full bg-ink relative overflow-hidden shadow-2xl">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://www.w3schools.com/html/mov_bbb.mp4" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="font-sans font-black text-cream text-[4vw] md:text-[3vw] mix-blend-difference opacity-80 uppercase tracking-tighter">
                Archivo Visual.
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 3: LA LISTA EDITORIAL */}
      <section className="w-full py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col mb-16 gap-8">
          <h2 className="font-serif text-[7vw] md:text-[3.5vw] leading-[1.1] tracking-tight max-w-3xl">
            Últimas anotaciones del archivo audiovisual.
          </h2>
          <Link to="/ensayos" className="bg-ink text-cream px-6 py-2 rounded-full text-sm font-semibold hover:bg-ink/80 transition-colors self-start">
            Explorar Archivo
          </Link>
        </div>
        
        <div className="flex flex-col border-t border-current/20">
          {ultimasEntradas.map((entrada) => (
            <Link key={entrada.id} to="/ensayos" className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-start md:items-center py-6 border-b border-current/20 hover:bg-ink hover:text-cream transition-colors duration-300 px-6 -mx-6 cursor-pointer">
              <h3 className="md:col-span-5 font-sans font-medium text-xl md:text-2xl tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                {entrada.title}
              </h3>
              <div className="md:col-span-7 flex flex-col justify-center">
                <p className="text-sm md:text-base font-normal opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed max-w-2xl">
                  {entrada.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/ensayos" className="text-sm font-medium hover:opacity-50 transition-opacity flex items-center gap-2 w-max">
            Todo el archivo ({database.length}) <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </section>

      {/* =========================================
          SECCIÓN 4: ILUSTRACIONES (Gatillo del Apagón)
          ========================================= */}
      <section ref={darkSectionRef} className="w-full py-32 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <h2 className="font-serif text-[7vw] md:text-[3.5vw] leading-[1.1] tracking-tight max-w-3xl mb-6">
            Ilustraciones Gráficas.
          </h2>
          <p className="text-sm md:text-base font-normal opacity-60 max-w-xl mb-10 leading-relaxed">
            Exploración visual, afiches alternativos y reinterpretaciones gráficas inspiradas en las obras que documentamos.
          </p>
        </div>

        {/* SLIDER REDUCIDO: Mucho más pequeño, con tamaños fijos y aspect-square */}
        <div className="flex gap-4 md:gap-8 px-6 md:px-12 xl:px-[calc((100vw-80rem)/2)] overflow-x-auto snap-x snap-mandatory pb-16 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {ilustraciones.map((ilus) => (
            <div
              key={ilus.id}
              // TAMAÑOS PEQUEÑOS: 'w-40' en móvil, 'w-56' en tablet, 'w-64' en desktop. 
              // Esto las hace al menos 3 veces más pequeñas que antes.
              className="w-40 md:w-56 lg:w-64 aspect-square rounded-xl overflow-hidden relative group snap-center md:snap-start flex-shrink-0 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <img src={ilus.img} alt={ilus.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <h3 className="font-sans font-black text-sm md:text-base uppercase tracking-tighter text-[#F5F5F0] translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {ilus.title}
                </h3>
              </div>
            </div>
          ))}
          {/* Div fantasma para que el último elemento no quede pegado a la pantalla */}
          <div className="min-w-[5vw] md:min-w-[10vw] flex-shrink-0" aria-hidden="true" />
        </div>
      </section>

      {/* =========================================
          SECCIÓN 5: FOOTER (Copia 1:1 de tu MenuOverlay)
          ========================================= */}
      <footer className="w-full pt-16 pb-12 px-6 md:px-12 xl:px-20 border-t border-current/10">
        
        {/* El Paspartú (Contenedor Central) */}
        <div className="flex flex-col justify-between min-h-max max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 flex-grow">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="flex flex-col justify-between h-full lg:col-span-7">
              
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-12 max-w-xs">
                Bienvenidos al archivo digital del Colectivo Clase Z. Exploración y crítica cinematográfica.
              </p>
              
              <div className="mt-auto">
                <nav className="flex flex-col gap-0 mb-12">
                  {mainLinks.map((item) => (
                    <Link 
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="font-sans font-medium text-[12vw] md:text-[6.5vw] lg:text-[5vw] tracking-tight leading-[1.1] hover:text-current/60 transition-colors block"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-wrap items-center gap-6 md:gap-8">
                  <Link
                    to="/videoclub"
                    className="bg-current text-[#0A0A0A] px-8 py-3 rounded-full text-sm md:text-base font-semibold hover:opacity-90 transition-opacity"
                  >
                    Videoclub
                  </Link>

                  {secondaryLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-sm md:text-base font-medium hover:text-current/60 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="flex flex-col justify-end lg:col-span-5 pt-8 lg:pt-0 pl-0 lg:pl-12">
              <div className="flex flex-col gap-6">
                {/* Nota: Asegúrate de usar 'image' o 'img' dependiendo de tu metadata.json */}
                {ultimasEntradas.slice(0, 3).map((entrada, idx) => (
                  <Link key={idx} to="/ensayos" className="group flex items-center gap-6 cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-current/10 rounded overflow-hidden flex-shrink-0">
                      <img src={entrada.image || entrada.img} alt={entrada.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-current/60 text-xs md:text-sm font-medium mb-1">
                        {entrada.date || entrada.category}
                      </span>
                      <h4 className="text-current text-sm md:text-base font-medium leading-tight group-hover:text-current/80 transition-colors">
                        {entrada.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-5 h-5 text-current opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ZONA INFERIOR: Formulario y Redes */}
          <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-current/10">
            <div className="w-full md:w-auto">
              <label className="block text-current text-sm font-medium mb-3">
                Keep up to date
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full md:w-72 bg-transparent border border-current/30 text-current rounded-full px-6 py-3 text-sm focus:outline-none focus:border-current transition-colors placeholder:text-current/30"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-medium text-current">
              <a href="#" className="hover:text-current/60 transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-current/60 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-current/60 transition-colors">Instagram</a>
            </div>
          </div>

        </div>

        {/* MARCA FINAL (Centrada al final de todo) */}
        <div className="flex items-center justify-center flex-col gap-4 mt-24 pt-12 border-t border-current/10 max-w-7xl mx-auto w-full">
          <h1 className="font-black text-[12vw] tracking-tighter uppercase leading-none opacity-10 hover:opacity-100 transition-opacity duration-1000 cursor-default">
            Clase Z.
          </h1>
        </div>

      </footer>

    </motion.div>
  );
}