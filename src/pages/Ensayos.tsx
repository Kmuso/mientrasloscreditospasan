import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react'; 

export default function Ensayos() {
  const [database, setDatabase] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  // Conexión al Backend
  useEffect(() => {
    fetch('http://localhost:3001/api/ensayos')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setDatabase(datos);
      })
      .catch((error) => console.error("Error en el carrete:", error));
  }, []); 

  const totalPages = Math.ceil(database.length / itemsPerPage) || 1;
  const currentCatalog = database.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="min-h-screen bg-fondo text-texto font-sans selection:bg-cine-red selection:text-white transition-colors duration-700 relative">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="px-6 py-10 md:px-12 flex justify-between items-center max-w-[1440px] mx-auto relative z-20">
        <Link to="/" className="text-[10px] font-mono tracking-[0.2em] uppercase hover:text-cine-red transition-colors flex items-center gap-2">
          <span className="text-cine-red">←</span> Volver al Inicio
        </Link>
        <div className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-50">
          Archivo Textual
        </div>
      </nav>

      {/* HEADER GIGANTE (Animado al scroll) */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 pb-24 text-center flex flex-col items-center justify-center sticky top-0 z-0"
      >
        <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-display font-bold tracking-tighter leading-none mb-8 text-titulo transition-colors duration-700">
          Ensayos
        </h1>
        <p className="max-w-2xl text-base md:text-lg font-serif font-light leading-relaxed opacity-70">
          Un archivo de pensamiento crítico, análisis cinematográfico y textos donde desmenuzamos lo que ocurre en la pantalla, fotograma a fotograma.
        </p>
      </motion.header>

      {/* LISTADO DE ENSAYOS */}
      <main className="max-w-[1440px] mx-auto p-6 md:p-12 relative z-10 bg-fondo transition-colors duration-700 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        
        <div className="mb-16 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cine-red animate-pulse"></div>
          <h2 className="text-[10px] font-mono font-medium tracking-widest uppercase opacity-70">
            Catálogo Principal
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {database.length === 0 && (
            <div className="text-center opacity-50 py-10 font-mono text-xs uppercase tracking-widest">Cargando fotogramas...</div>
          )}

          {currentCatalog.map((ensayo, index) => {
            // Lógica de diseño alterno (Negativo)
            const isInverted = index % 2 === 0;
            const isReverse = index % 2 !== 0;

            const cardStyles = isInverted 
              ? "bg-texto text-fondo shadow-2xl" 
              : "bg-fondo text-texto border border-texto/10 shadow-sm";

            const btnStyles = isInverted
              ? "bg-cine-red text-white hover:opacity-80"
              : "bg-transparent text-texto border border-texto/20 hover:border-cine-red hover:text-cine-red";

            const imageUrl = ensayo.image || `https://picsum.photos/seed/${ensayo.id || index}/800/800`;

            return (
              <motion.article 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                key={ensayo.id} 
                className={`p-6 md:p-12 lg:p-16 flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center rounded-[2.5rem] transition-all duration-700 ${cardStyles}`}
              >
                
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    <span className={`text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full ${isInverted ? 'bg-fondo/20' : 'bg-texto/5'}`}>
                      ID_{ensayo.id?.toString().padStart(3, '0') || "000"}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest uppercase opacity-50">
                      {ensayo.date || "2026"}
                    </span>
                  </div>

                  <h3 className={`text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.05] mb-6 ${isInverted ? 'text-fondo' : 'text-titulo'}`}>
                    {ensayo.title}
                  </h3>
                  
                  <p className="text-base lg:text-lg opacity-70 leading-relaxed font-serif font-light mb-10 max-w-xl">
                    {ensayo.excerpt}
                  </p>

                  <Link 
                    to={`/ensayos/${ensayo.id}`} 
                    className={`w-fit px-8 py-4 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 ${btnStyles}`}
                  >
                    Leer Ensayo
                  </Link>
                </div>

                {/* IMAGEN CON FILTRO NOIR */}
                <div className="w-full lg:w-1/2 aspect-square relative rounded-[2rem] overflow-hidden group">
                  <img 
                    src={imageUrl} 
                    alt={ensayo.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 img-theme-aware"
                  />
                  <div className={`absolute inset-0 mix-blend-overlay opacity-20 transition-opacity duration-500 group-hover:opacity-0 ${isInverted ? 'bg-fondo' : 'bg-cine-red'}`}></div>
                </div>

              </motion.article>
            );
          })}
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-between items-center mt-24 py-10 border-t border-texto/10 transition-colors duration-700">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-cine-red transition-colors disabled:opacity-20"
          >
            ← Anterior
          </button>
          
          <div className="flex gap-3">
             {[...Array(totalPages)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentPage === i + 1 ? 'bg-cine-red scale-125' : 'bg-texto/10'}`}
                />
             ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-cine-red transition-colors disabled:opacity-20"
          >
            Siguiente →
          </button>
        </div>
      </main>
      
    </div>
  );
}