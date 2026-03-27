import { motion } from "motion/react";

export default function Videos() {
  
  // 🎬 TU CATÁLOGO DE VIDEOS
  const videoDestacado = {
    title: "Anatomía de un Plano: El pasillo de Oldboy",
    category: "Video Ensayo",
    date: "12 Mar 2026",
    description: "Analizamos segundo a segundo cómo Park Chan-wook revolucionó la coreografía de acción utilizando el espacio bidimensional y el agotamiento físico del actor.",
    youtubeId: "dQw4w9WgXcQ" // Reemplaza esto con tu ID real
  };

  const archivoVideos = [
    {
      id: "03",
      title: "El color rojo en Suspiria",
      category: "Análisis Visual",
      date: "05 Mar 2026",
      youtubeId: "dQw4w9WgXcQ" 
    },
    {
      id: "02",
      title: "Tarantino y el arte del robo",
      category: "Montaje",
      date: "20 Feb 2026",
      youtubeId: "dQw4w9WgXcQ" 
    },
    {
      id: "01",
      title: "Por qué amamos el Slasher",
      category: "Retrospectiva",
      date: "10 Feb 2026",
      youtubeId: "dQw4w9WgXcQ" 
    }
  ];

  return (
    // CAMBIO 1: bg-fondo y text-texto para el lienzo general. selection:bg-cine-red para selección de texto.
    <main className="min-h-screen bg-fondo text-texto px-6 py-12 md:py-20 selection:bg-cine-red selection:text-fondo transition-colors duration-700 relative z-10 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* =========================================
            ENCABEZADO DE LA SALA
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-texto/10 pb-10 mb-12 gap-6 transition-colors duration-700"
        >
          <div>
            <h2 className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-4">
              Sala de Proyección
            </h2>
            {/* TÍTULO PRINCIPAL: Cambiamos a 'text-titulo' */}
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-none text-titulo transition-colors duration-700">
              {/* ACENTO ITÁLICO: Cambiamos text-primario por 'text-cine-red' */}
              Ensayos en <span className="text-cine-red italic transition-colors duration-700">Video.</span>
            </h1>
          </div>
          <p className="max-w-xs text-sm font-sans font-medium opacity-70 leading-relaxed md:text-right">
            Nuestros análisis y desgloses visuales. Dale al play y deja que los créditos pasen.
          </p>
        </motion.div>

        {/* =========================================
            ACTO 1: EL ESTRENO (Video Destacado Gigante)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* El Reproductor de YouTube */}
            {/* FONDO DE VIDEO: Usamos 'bg-cine-blue' para que el fondo trasero del iframe cambie sutilmente */}
            <div className="w-full lg:w-3/4 aspect-video bg-cine-blue border border-texto/5 shadow-xl transition-colors duration-700">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoDestacado.youtubeId}?modestbranding=1&rel=0`} 
                title={videoDestacado.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {/* La Ficha Técnica del Estreno */}
            <div className="w-full lg:w-1/4 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                {/* ETIQUETA 'ESTRENO': Fondo 'bg-cine-red' para que salte a la vista */}
                <span className="text-[10px] font-mono tracking-widest uppercase bg-cine-red text-white px-3 py-1 transition-colors duration-700">
                  Estreno
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">
                  {videoDestacado.date}
                </span>
              </div>
              
              {/* TÍTULO DEL ENSAYO: Usamos 'text-titulo' */}
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-titulo leading-tight mb-6 transition-colors duration-700">
                {videoDestacado.title}
              </h3>
              
              <p className="text-base font-sans opacity-80 leading-relaxed font-medium mb-8">
                {videoDestacado.description}
              </p>

              {/* Botón hacia YouTube: Cambiamos text-primario por 'text-cine-red' */}
              <button className="self-start text-[10px] font-bold uppercase tracking-widest border-b-2 border-cine-red pb-1 text-texto hover:text-cine-red transition-colors duration-300">
                Ver en YouTube ↗
              </button>
            </div>
          </div>
        </motion.div>


        {/* =========================================
            ACTO 2: EL CATÁLOGO (Grid de Videos Anteriores)
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* TÍTULO DE SECCIÓN: Usamos 'text-titulo' */}
          <h3 className="text-xl font-serif font-bold text-titulo uppercase tracking-tight border-b border-texto/10 pb-4 mb-8 transition-colors duration-700">
            Archivo Audiovisual
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            {archivoVideos.map((video, idx) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex flex-col group cursor-pointer"
              >
                {/* Reproductor Pequeño */}
                <div className="w-full aspect-video bg-cine-blue border border-texto/5 mb-6 shadow-md transition-all duration-500 group-hover:-translate-y-1">
                  <iframe 
                    className="w-full h-full pointer-events-none"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Metadatos */}
                <div className="flex items-center gap-3 mb-3">
                  {/* CATEGORÍA: Cambiamos text-primario por 'text-cine-red' */}
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cine-red transition-colors duration-700">
                    {video.category}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-30">
                    / {video.date}
                  </span>
                </div>
                
                {/* Título y Hover Effect: Usamos 'text-titulo' y hover en 'text-cine-red' */}
                <h4 className="text-xl font-serif font-bold text-titulo leading-snug group-hover:text-cine-red transition-colors duration-300">
                  {video.title}
                </h4>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </div>
    </main>
  );
}