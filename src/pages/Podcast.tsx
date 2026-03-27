import { motion } from "motion/react";

export default function Podcast() {
  
  // 🎬 TU BASE DE DATOS DE EPISODIOS
  const episodios = [
    {
      id: "03",
      title: "El terror elevado: ¿Mito o realidad?",
      description: "Analizamos la ola de A24, Ari Aster y cómo el terror psicológico y el trauma han desplazado al slasher tradicional de los años 80.",
      date: "12 Mar 2026",
      embedUrl: "https://open.spotify.com/embed/episode/0" // Ejemplo de URL real
    },
    {
      id: "02",
      title: "La poética de la violencia en Tarantino",
      description: "Un viaje a través de la sangre falsa, los diálogos eternos y el pastiche cinematográfico en la filmografía de Quentin.",
      date: "28 Feb 2026",
      embedUrl: "https://open.spotify.com/embed/episode/1"
    },
    {
      id: "01",
      title: "Episodio Piloto: Manifiesto Clase Z",
      description: "Presentamos el colectivo, nuestras intenciones y por qué el cine B merece ser estudiado con la misma rigurosidad que un clásico francés.",
      date: "15 Feb 2026",
      embedUrl: "https://open.spotify.com/embed/episode/2"
    }
  ];

  return (
    <main className="min-h-screen bg-fondo text-texto px-6 py-12 md:py-20 selection:bg-cine-red selection:text-white transition-colors duration-700 relative z-10 font-sans">
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
            <h2 className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50 mb-6">
              Transmisión en curso
            </h2>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-none mb-8 text-titulo transition-colors duration-700">
              Ondas <br/>
              <span className="text-cine-red italic transition-colors duration-700">Clase Z.</span>
            </h1>

            {/* PORTADA DEL PODCAST */}
            <div className="w-full aspect-square bg-texto text-fondo p-8 flex flex-col justify-between mb-8 shadow-2xl relative overflow-hidden group transition-colors duration-700 rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop" 
                alt="Portada Podcast" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 mix-blend-luminosity img-theme-aware"
              />
              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-[10px] uppercase tracking-widest">Estéreo</span>
                <span className="font-mono text-[10px] uppercase tracking-widest border border-fondo/30 px-2 py-0.5 rounded">Vol. 1</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold leading-none mb-2">Mientras los<br/>créditos pasan</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-70">Un podcast de cine</p>
              </div>
            </div>

            <p className="text-lg leading-relaxed opacity-80 font-serif font-light border-l-2 border-cine-red pl-6 transition-colors duration-700">
              Escucha nuestras disecciones sonoras. Debates de madrugada, análisis de guion y cartas de amor a las películas que nos formaron.
            </p>

            <div className="flex gap-4 mt-10">
              <button className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] border border-texto/20 px-8 py-4 rounded-full hover:border-cine-red hover:bg-cine-red hover:text-white transition-all duration-300">
                Spotify
              </button>
              <button className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] border border-texto/20 px-8 py-4 rounded-full hover:border-cine-red hover:bg-cine-red hover:text-white transition-all duration-300">
                Apple Podcasts
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
            <h3 className="text-xl font-display font-bold uppercase tracking-[0.1em] text-titulo border-b border-texto/10 pb-6 mb-8 transition-colors duration-700">
              Índice de Episodios
            </h3>

            <div className="flex flex-col gap-16">
              {episodios.map((ep, index) => (
                <motion.div 
                  key={ep.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex flex-col md:flex-row gap-6 md:gap-8 group"
                >
                  {/* Número del episodio */}
                  <div className="text-5xl md:text-6xl font-display font-bold text-texto/5 group-hover:text-cine-red transition-colors pt-1 duration-700">
                    {ep.id}
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-40 mb-2">
                      {ep.date}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-4 text-titulo group-hover:text-cine-red transition-colors duration-500">
                      {ep.title}
                    </h4>
                    <p className="text-base font-serif font-light opacity-70 mb-8 leading-relaxed max-w-xl">
                      {ep.description}
                    </p>
                    
                    {/* REPRODUCTOR EMBED DE SPOTIFY */}
                    <div className="w-full h-[152px] bg-texto/5 rounded-2xl overflow-hidden shadow-sm transition-colors duration-700 border border-texto/5">
                      <iframe 
                        style={{ borderRadius: '12px' }} 
                        src={ep.embedUrl} 
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="w-full h-full img-theme-aware transition-all duration-700"
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