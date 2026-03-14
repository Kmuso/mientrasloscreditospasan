import { motion } from "motion/react";

export default function Podcast() {
  
  // 🎬 TU BASE DE DATOS DE EPISODIOS
  const episodios = [
    {
      id: "03",
      title: "El terror elevado: ¿Mito o realidad?",
      description: "Analizamos la ola de A24, Ari Aster y cómo el terror psicológico y el trauma han desplazado al slasher tradicional de los años 80.",
      date: "12 Mar 2026",
      embedUrl: "https://open.spotify.com/embed/episode/7makk4oTQel546B0PZlVR5?utm_source=generator&theme=0"
    },
    {
      id: "02",
      title: "La poética de la violencia en Tarantino",
      description: "Un viaje a través de la sangre falsa, los diálogos eternos y el pastiche cinematográfico en la filmografía de Quentin.",
      date: "28 Feb 2026",
      embedUrl: "https://open.spotify.com/embed/episode/4K2y43fFfNq2nLp1h8S08Y?utm_source=generator&theme=0"
    },
    {
      id: "01",
      title: "Episodio Piloto: Manifiesto Clase Z",
      description: "Presentamos el colectivo, nuestras intenciones y por qué el cine B merece ser estudiado con la misma rigurosidad que un clásico francés.",
      date: "15 Feb 2026",
      embedUrl: "https://open.spotify.com/embed/episode/3G7a0qT4Z1cQ1H1R8Y2p2X?utm_source=generator&theme=0"
    }
  ];

  return (
    // CAMBIO: Fondo, texto y selección conectados a las variables maestras
    <main className="min-h-screen bg-fondo text-texto px-6 py-12 md:py-20 selection:bg-primario selection:text-fondo transition-colors duration-700 relative z-10 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* =========================================
              LADO IZQUIERDO: Portada y Sinopsis (Hero)
              ========================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12 flex flex-col lg:sticky lg:top-32 h-fit"
          >
            <h2 className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-6">
              Transmisión en curso
            </h2>
            
            {/* CAMBIO: font-serif para el título principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-none mb-8 transition-colors duration-700">
              Ondas <br/>
              <span className="text-primario italic transition-colors duration-500">Clase Z.</span>
            </h1>

            {/* CAMBIO: El Negativo Dinámico en la portada (bg-texto y text-fondo) */}
            <div className="w-full aspect-square bg-texto text-fondo p-8 flex flex-col justify-between mb-8 shadow-2xl relative overflow-hidden group transition-colors duration-700">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop" 
                alt="Portada Podcast" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"
              />
              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-xs uppercase tracking-widest">Estéreo</span>
                <span className="font-mono text-xs uppercase tracking-widest">Vol. 1</span>
              </div>
              <div className="relative z-10">
                {/* font-serif para el título de la portada */}
                <h3 className="text-3xl font-serif font-bold leading-none mb-2">Mientras los<br/>créditos pasan</h3>
                <p className="text-xs font-mono uppercase tracking-widest opacity-70">Un podcast de cine</p>
              </div>
            </div>

            {/* CAMBIO: Borde izquierdo dinámico usando border-primario */}
            <p className="text-lg leading-relaxed opacity-80 font-medium border-l-2 border-primario pl-6 transition-colors duration-500">
              Escucha nuestras disecciones sonoras. Debates de madrugada, análisis de guion y cartas de amor a las películas que nos formaron.
            </p>

            {/* Botones de suscripción adaptados a la paleta */}
            <div className="flex gap-4 mt-8">
              <button className="text-[10px] font-bold uppercase tracking-widest border border-texto/20 px-6 py-3 rounded-full hover:border-texto hover:bg-texto hover:text-fondo transition-all duration-300">
                Spotify
              </button>
              <button className="text-[10px] font-bold uppercase tracking-widest border border-texto/20 px-6 py-3 rounded-full hover:border-texto hover:bg-texto hover:text-fondo transition-all duration-300">
                YouTube
              </button>
            </div>
          </motion.div>

          {/* =========================================
              LADO DERECHO: Lista de Episodios (Tracklist)
              ========================================= */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:w-7/12 flex flex-col mt-12 lg:mt-0"
          >
            {/* CAMBIO: font-serif y bordes dinámicos */}
            <h3 className="text-2xl font-serif font-bold uppercase tracking-tight border-b border-texto/10 pb-6 mb-8 transition-colors duration-700">
              Índice de Episodios
            </h3>

            <div className="flex flex-col gap-12">
              {episodios.map((ep, index) => (
                <motion.div 
                  key={ep.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex flex-col md:flex-row gap-6 md:gap-8 group"
                >
                  {/* Número del episodio (Calluna) */}
                  <div className="text-4xl md:text-5xl font-serif font-bold text-texto/10 group-hover:text-primario transition-colors pt-1 duration-500">
                    {ep.id}
                  </div>
                  
                  {/* Contenido del episodio */}
                  <div className="flex flex-col w-full">
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-2">
                      {ep.date}
                    </span>
                    {/* Título del episodio (Calluna) */}
                    <h4 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-4 group-hover:text-primario transition-colors duration-300">
                      {ep.title}
                    </h4>
                    <p className="text-base font-sans opacity-70 mb-6 leading-relaxed max-w-xl">
                      {ep.description}
                    </p>
                    
                    {/* REPRODUCTOR EMBED DE SPOTIFY */}
                    {/* Adaptamos el fondo de carga a texto/5 para respetar el tema */}
                    <div className="w-full h-[152px] bg-texto/5 rounded-xl overflow-hidden shadow-sm transition-colors duration-700">
                      <iframe 
                        style={{ borderRadius: '12px' }} 
                        src={ep.embedUrl} 
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </main>
  );
}