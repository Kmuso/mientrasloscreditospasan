import { motion } from "motion/react";

export default function Videoclub() {
  
  // 🎬 LA CARTELERA DEL VIDEOCLUB
  const cortometrajeEstelar = {
    title: "Sombras en el Asfalto",
    director: "Colectivo Clase Z",
    year: "2026",
    duration: "14 min",
    synopsis: "Un thriller neo-noir filmado en las calles vacías a las 3 AM. Nuestro primer experimento formal jugando con la ausencia de luz y el sonido diegético.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0&color=white"
  };

  const archivoVideoclub = [
    {
      id: "03",
      title: "El eco de la habitación",
      director: "Ana Guionista",
      type: "Clase Z Original",
      duration: "08 min",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    },
    {
      id: "02",
      title: "Desvelo",
      director: "Director Invitado: Carlos M.",
      type: "Selección Oficial",
      duration: "12 min",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    },
    {
      id: "01",
      title: "Ensayo sobre la ceguera (Corto)",
      director: "Colectivo Clase Z",
      type: "Clase Z Original",
      duration: "05 min",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    }
  ];

  return (
    // CAMBIO: Conectamos la página a bg-fondo, text-texto y el selection rojo
    <main className="min-h-screen bg-fondo text-texto px-6 py-12 md:py-20 selection:bg-primario selection:text-fondo transition-colors duration-700 relative z-10 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* =========================================
            LA MARQUESINA DE NEÓN
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // CAMBIO: bordes dinámicos
          className="flex flex-col border-b border-texto/10 pb-10 mb-16 transition-colors duration-700"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* CAMBIO: bg-primario para el punto que parpadea */}
            <span className="w-3 h-3 rounded-full bg-primario animate-pulse transition-colors duration-500"></span>
            <h2 className="text-[10px] font-mono tracking-widest uppercase opacity-60">
              Proyección en curso
            </h2>
          </div>
          
          {/* CAMBIO: font-serif para títulos gigantes */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-none mb-6">
            Videoclub <span className="text-primario italic transition-colors duration-500">Z.</span>
          </h1>
          
          <p className="max-w-2xl text-base md:text-lg opacity-70 leading-relaxed font-sans font-medium">
            Nuestro rincón oscuro. Aquí proyectamos cortometrajes propios, experimentos visuales y obras de directores amigos que nos prestan sus latas de celuloide digital. Toma asiento.
          </p>
        </motion.div>

        {/* =========================================
            LA FUNCIÓN PRINCIPAL
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-24"
        >
          {/* El Reproductor (Pantalla Grande) */}
          <div className="w-full aspect-video bg-black rounded-sm shadow-2xl overflow-hidden mb-8 border border-texto/5 transition-colors duration-700">
            <iframe 
              className="w-full h-full"
              src={cortometrajeEstelar.embedUrl} 
              title={cortometrajeEstelar.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Ficha Técnica Estilo Festival */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-texto/10 pt-8 transition-colors duration-700">
            <div className="md:col-span-4 flex flex-col gap-2">
              <h3 className="text-3xl font-serif font-bold">{cortometrajeEstelar.title}</h3>
              <p className="text-[12px] font-mono tracking-widest uppercase opacity-50 mt-2">
                Dirigido por: <span className="text-primario transition-colors duration-500">{cortometrajeEstelar.director}</span>
              </p>
              <div className="flex gap-4 mt-2">
                <span className="text-[10px] font-sans font-medium border border-texto/20 px-2 py-1 rounded-sm opacity-60 transition-colors duration-700">{cortometrajeEstelar.year}</span>
                <span className="text-[10px] font-sans font-medium border border-texto/20 px-2 py-1 rounded-sm opacity-60 transition-colors duration-700">{cortometrajeEstelar.duration}</span>
              </div>
            </div>
            
            <div className="md:col-span-8 lg:col-span-6">
              <p className="text-lg font-sans opacity-80 leading-relaxed font-medium">
                {cortometrajeEstelar.synopsis}
              </p>
            </div>
          </div>
        </motion.div>

        {/* =========================================
            LOS ESTANTES DEL VIDEOCLUB (Catálogo)
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between border-b border-texto/10 pb-4 mb-10 transition-colors duration-700">
            <h3 className="text-xl font-serif font-bold uppercase tracking-tight">
              Catálogo Subterráneo
            </h3>
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-40 hidden md:block">
              {archivoVideoclub.length} Cintas disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            
            {archivoVideoclub.map((corto, idx) => (
              <motion.div 
                key={corto.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex flex-col group cursor-pointer"
              >
                {/* Reproductor Pequeño */}
                <div className="w-full aspect-video bg-black mb-4 border border-texto/10 transition-transform duration-500 group-hover:-translate-y-1 shadow-lg">
                  <iframe 
                    className="w-full h-full pointer-events-none"
                    src={corto.embedUrl} 
                    title={corto.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Metadatos del Corto */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-primario transition-colors duration-500">
                    {corto.type}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
                    {corto.duration}
                  </span>
                </div>
                
                <h4 className="text-xl font-serif font-bold leading-snug mb-1 group-hover:text-primario transition-colors duration-300">
                  {corto.title}
                </h4>
                <p className="text-[11px] font-mono tracking-widest uppercase opacity-50">
                  Dir: {corto.director}
                </p>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </div>
    </main>
  );
}