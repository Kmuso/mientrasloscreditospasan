/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";

export default function Home() {
  // 1. Variantes de Animación: El "Collins Reveal"
  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const wordVars = {
    initial: { y: "100%" },
    animate: {
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // 2. LÓGICA DE SCROLL (Para el video)
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "center center"] 
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);

  // Datos simulados para la retícula editorial
  const destacados = [
    { title: "El declive del blockbuser", category: "Ensayo", year: "2024", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop" },
    { title: "Anatomía de un plano secuencia", category: "Video", year: "2023", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop" },
    { title: "Manifiesto Clase Z", category: "Proyecto", year: "2017", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1000&auto=format&fit=crop" },
    { title: "La nueva ola asiática", category: "Crítica", year: "2024", img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-cream text-ink selection:bg-ink selection:text-cream">
      
      {/* =========================================
          SECCIÓN 1: EL HERO 
          ========================================= */}
      <section className="relative min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        <header className="flex justify-between items-start z-10 border-b border-ink/10 pb-4">
          <div className="font-mono text-[10px] tracking-widest uppercase opacity-40 font-black">
            Est. 2017 / Colectivo Clase Z
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase opacity-40 text-right hidden sm:block font-black">
            Cine / Crítica / Archivo Audiovisual
          </div>
        </header>

        <motion.main
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="flex-grow flex flex-col items-center justify-center text-center mt-8"
        >
          <div className="overflow-hidden py-2">
            <motion.h1 
              variants={wordVars}
              className="text-[8vw] leading-[0.8] font-black tracking-[-0.05em]"
            >
              mientrasloscréditospasan.com
            </motion.h1>
          </div>
        </motion.main>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-full"
        >
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-8 border-t border-ink/10 pt-6 font-mono text-[10px] uppercase tracking-widest">
            {/* Links generados dinámicamente... */}
            {["Ensayos", "Videos", "Podcast", "Videoclub", "Biblioteca", "Eventos", "Proyecto", "Contacto"].map((name) => (
              <li key={name} className="group">
                <Link to={`/${name.toLowerCase()}`} className="flex flex-col gap-2 hover:text-ink transition-colors opacity-40 group-hover:opacity-100">
                  <span className="text-[8px] opacity-30 group-hover:translate-x-1 transition-transform">0{name.length}</span>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </section>

      {/* =========================================
          SECCIÓN 2: EL VIDEO ESCALABLE 
          ========================================= */}
      <section ref={videoContainerRef} className="h-[150vh] w-full bg-cream relative py-12 px-4 md:px-0 flex flex-col items-center">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12">
          <motion.div
            style={{ scale, borderRadius }}
            className="w-full max-w-[95vw] md:max-w-[80vw] h-full bg-ink relative overflow-hidden shadow-2xl"
          >
            <video
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="font-sans font-black text-cream text-[4vw] md:text-[3vw] mix-blend-difference opacity-80 uppercase tracking-tighter">
                Archivo Visual.
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          SECCIÓN 3: MARQUESINA (TEXTO EN MOVIMIENTO)
          El "Separador Cinematográfico"
          ========================================= */}
      <section className="border-y border-ink/10 overflow-hidden py-4 bg-ink text-cream">
        <motion.div 
          className="flex whitespace-nowrap font-black uppercase text-xl md:text-3xl tracking-tighter"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {/* Repetimos el texto varias veces para crear la ilusión de un loop infinito */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span>Crítica Cinematográfica</span>
              <span className="text-cream/30">•</span>
              <span>Análisis</span>
              <span className="text-cream/30">•</span>
              <span>Colectivo Clase Z</span>
              <span className="text-cream/30">•</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* =========================================
          SECCIÓN 4: RETÍCULA EDITORIAL (DESTACADOS)
          El estilo Collins para mostrar proyectos
          ========================================= */}
      <section className="py-24 px-6 md:px-12 bg-cream">
        <div className="flex justify-between items-end mb-12 border-b border-ink/10 pb-8">
          <h2 className="font-black text-[6vw] md:text-[4vw] uppercase tracking-tighter leading-none">
            Últimas <br/> Publicaciones
          </h2>
          <Link to="/ensayos" className="font-mono text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity hidden md:block">
            Ver todo el archivo [↗]
          </Link>
        </div>

        {/* Grid: 1 columna en móviles, 2 en pantallas medianas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {destacados.map((item, idx) => (
            <Link to="/ensayos" key={idx} className="group cursor-pointer">
              {/* Contenedor de imagen con efecto Zoom en hover */}
              <div className="w-full aspect-[4/3] md:aspect-video overflow-hidden bg-ink/5 mb-6">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
              {/* Metadatos técnicos arriba del título */}
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-50 mb-3">
                <span>{item.category}</span>
                <span>{item.year}</span>
              </div>
              {/* Título Brutalista */}
              <h3 className="font-black text-2xl md:text-4xl uppercase tracking-tighter group-hover:text-ink/70 transition-colors">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================
          SECCIÓN 5: FOOTER GIGANTE BRUTALISTA
          ========================================= */}
      <footer className="bg-ink text-cream pt-24 pb-6 px-6 md:px-12 flex flex-col justify-between min-h-[60vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-4">Sobre nosotros</h4>
            <p className="max-w-xs text-sm font-medium opacity-80 leading-relaxed">
              Un archivo digital dedicado a la exploración, crítica y preservación del cine y la cultura visual.
            </p>
          </div>
          <div className="md:col-span-2 flex justify-start md:justify-end gap-16 font-mono text-[10px] uppercase tracking-widest">
            <ul className="flex flex-col gap-4">
              <li className="opacity-50 mb-2">Social</li>
              <li><a href="#" className="hover:opacity-70">Instagram</a></li>
              <li><a href="#" className="hover:opacity-70">Twitter/X</a></li>
              <li><a href="#" className="hover:opacity-70">YouTube</a></li>
            </ul>
            <ul className="flex flex-col gap-4">
              <li className="opacity-50 mb-2">Legal</li>
              <li><a href="#" className="hover:opacity-70">Privacidad</a></li>
              <li><a href="#" className="hover:opacity-70">Créditos</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-end gap-4">
          <h1 className="font-black text-[12vw] leading-[0.7] tracking-tighter uppercase">
            Clase Z.
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 pb-2">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}