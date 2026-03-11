import { useState, useEffect } from 'react'; // PASO 1: Importamos useEffect
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react'; 

// PASO 2: ELIMINAMOS la importación estática de metadata.json
// import database from '../../metadata.json'; 

export default function Ensayos() {
  // PASO 3: Creamos el "Lienzo" vacío para los datos. 
  // Usamos <any[]> para que TypeScript sepa que aquí vendrán varios datos.
  const [database, setDatabase] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  // PASO 4: El "¡Acción!". Al cargar la página, pedimos los datos al servidor.
  useEffect(() => {
    fetch('http://localhost:3001/api/ensayos')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setDatabase(datos); // Llenamos el lienzo con los datos de SQLite
      })
      .catch((error) => console.error("Error en el carrete:", error));
  }, []); 
  // ^ El array vacío significa: "Haz esto solo 1 vez cuando la página cargue"

  // PASO 5: ¡La magia de React! 
  // Al inicio, database.length es 0. Pero cuando el fetch termina y hace "setDatabase", 
  // React vuelve a leer esta parte y calcula las páginas correctamente.
  const totalPages = Math.ceil(database.length / itemsPerPage) || 1;
  const currentCatalog = database.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#11161A] font-sans selection:bg-[#ff4500] selection:text-white 
      bg-[radial-gradient(#ff450030_1.5px,transparent_1.5px)] bg-[size:36px_36px]">
      
      <nav className="px-6 py-10 md:px-12 flex justify-between items-center max-w-[1440px] mx-auto relative z-20">
        <Link to="/" className="text-xs font-medium tracking-[0.15em] uppercase hover:text-[#ff4500] transition-colors flex items-center gap-2">
          <span className="text-[#ff4500]">←</span> Volver al Inicio
        </Link>
        <div className="text-xs font-medium tracking-[0.15em] uppercase text-[#11161A]/50">
          Archivo Textual
        </div>
      </nav>

      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 pb-24 text-center flex flex-col items-center justify-center sticky top-0 z-0"
      >
        <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-normal tracking-tighter leading-none mb-8 text-[#11161A]">
          Ensayos
        </h1>
        <p className="max-w-2xl text-base md:text-lg lg:text-xl opacity-60 font-light leading-relaxed">
          Un archivo de pensamiento crítico, análisis cinematográfico y textos donde desmenuzamos lo que ocurre en la pantalla, fotograma a fotograma.
        </p>
      </motion.header>

      <main className="max-w-[1440px] mx-auto p-6 md:p-12 relative z-10 bg-[#FBF9F6] rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        
        <div className="mb-16 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ff4500]"></div>
          <h2 className="text-sm font-mono tracking-widest uppercase text-[#11161A]/70">
            Catálogo Principal
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {/* Si aún no han llegado los datos, podemos mostrar un mensaje sutil */}
          {database.length === 0 && (
            <div className="text-center opacity-50 py-10">Cargando fotogramas...</div>
          )}

          {currentCatalog.map((ensayo, index) => {
            const isDark = index % 2 === 0;
            const isReverse = index % 2 !== 0;

            const cardStyles = isDark 
              ? "bg-[#11161A] text-white shadow-xl" 
              : "bg-white text-[#11161A] border border-black/5 shadow-sm";

            const btnStyles = isDark
              ? "bg-[#ff4500] text-white hover:bg-[#e03d00]"
              : "bg-transparent text-[#11161A] border border-black/10 hover:border-[#ff4500] hover:text-[#ff4500]";

            const imageUrl = ensayo.image || `https://picsum.photos/seed/${ensayo.id || index}/800/800`;

            return (
              <motion.article 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                key={ensayo.id} 
                className={`p-6 md:p-12 lg:p-16 flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center rounded-[2.5rem] ${cardStyles}`}
              >
                
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                      ID_{ensayo.id?.toString().padStart(3, '0') || "000"}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">
                      {ensayo.date || "Fecha desconocida"}
                    </span>
                  </div>

                  <h3 className="text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight leading-[1.05] mb-6">
                    {ensayo.title}
                  </h3>
                  
                  <p className="text-base lg:text-lg opacity-70 leading-relaxed font-light mb-10 max-w-xl">
                    {ensayo.excerpt}
                  </p>

                  <button className={`w-fit px-8 py-4 rounded-full text-xs font-medium tracking-widest transition-all duration-300 ${btnStyles}`}>
                    Leer Ensayo
                  </button>
                </div>

                <div className="w-full lg:w-1/2 aspect-square relative rounded-[2rem] overflow-hidden group">
                  <div className="absolute inset-0 bg-black/5 animate-pulse"></div>
                  <img 
                    src={imageUrl} 
                    alt={`Referencia visual para ${ensayo.title}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 mix-blend-overlay opacity-20 transition-opacity duration-500 group-hover:opacity-0 ${isDark ? 'bg-black' : 'bg-[#ff4500]'}`}></div>
                </div>

              </motion.article>
            );
          })}
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-between items-center mt-24 py-6 border-t border-black/10">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-xs font-medium tracking-[0.15em] uppercase hover:text-[#ff4500] transition-colors disabled:opacity-30 disabled:hover:text-[#11161A]"
          >
            ← Atrás
          </button>
          
          <div className="flex gap-2">
             {[...Array(totalPages)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${currentPage === i + 1 ? 'bg-[#ff4500]' : 'bg-black/10'}`}
                />
             ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-xs font-medium tracking-[0.15em] uppercase hover:text-[#ff4500] transition-colors disabled:opacity-30 disabled:hover:text-[#11161A]"
          >
            Siguiente →
          </button>
        </div>
      </main>
      
    </div>
  );
}