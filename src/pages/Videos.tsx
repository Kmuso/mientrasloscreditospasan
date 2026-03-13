import { motion } from "motion/react";

export default function Videos() {
  
  // 🎬 TU CATÁLOGO DE VIDEOS
  // Solo necesitas el ID del video de YouTube (lo que va después de "v=" en el enlace)
  // Ejemplo: en https://www.youtube.com/watch?v=dQw4w9WgXcQ, el ID es "dQw4w9WgXcQ"
  
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
      youtubeId: "dQw4w9WgXcQ" // Reemplaza
    },
    {
      id: "02",
      title: "Tarantino y el arte del robo",
      category: "Montaje",
      date: "20 Feb 2026",
      youtubeId: "dQw4w9WgXcQ" // Reemplaza
    },
    {
      id: "01",
      title: "Por qué amamos el Slasher",
      category: "Retrospectiva",
      date: "10 Feb 2026",
      youtubeId: "dQw4w9WgXcQ" // Reemplaza
    }
  ];

  return (
    <main className="min-h-screen bg-[#FBF9F6] text-[#11161A] px-6 py-12 md:py-20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* =========================================
            ENCABEZADO DE LA SALA
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-10 mb-12 gap-6"
        >
          <div>
            <h2 className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-4">
              Sala de Proyección
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-none">
              Ensayos en <span className="text-[#ff4500] italic">Video.</span>
            </h1>
          </div>
          <p className="max-w-xs text-sm font-medium opacity-70 leading-relaxed md:text-right">
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
            {/* 'aspect-video' asegura mágicamente que mantenga la proporción 16:9 sin romperse */}
            <div className="w-full lg:w-3/4 aspect-video bg-[#11161A] shadow-xl">
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
                <span className="text-[10px] font-mono tracking-widest uppercase bg-[#11161A] text-[#FBF9F6] px-3 py-1">
                  Estreno
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">
                  {videoDestacado.date}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-6">
                {videoDestacado.title}
              </h3>
              
              <p className="text-base opacity-80 leading-relaxed font-medium mb-8">
                {videoDestacado.description}
              </p>

              <button className="self-start text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#ff4500] pb-1 hover:text-[#ff4500] transition-colors">
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
          <h3 className="text-xl font-bold uppercase tracking-tight border-b border-black/10 pb-4 mb-8">
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
                className="flex flex-col group"
              >
                {/* Reproductor Pequeño */}
                <div className="w-full aspect-video bg-[#11161A] mb-6 shadow-md transition-transform duration-500 group-hover:-translate-y-1">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Metadatos */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff4500]">
                    {video.category}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-30">
                    / {video.date}
                  </span>
                </div>
                
                <h4 className="text-xl font-serif font-bold leading-snug group-hover:text-[#ff4500] transition-colors">
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