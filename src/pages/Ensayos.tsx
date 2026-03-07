import { useState } from 'react';
import { Link } from 'react-router-dom';
import database from '../../metadata.json'; 

export default function Ensayos() {
  // Configuración de paginación para la lista inferior
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Cuántos ensayos mostrar en la lista inferior por página
  
  // Separamos las 4 primeras entradas gigantes del resto del catálogo
  const featuredEntries = database.slice(0, 4);
  const catalogEntries = database.slice(4);

  // Lógica matemática para la paginación
  const totalPages = Math.ceil(catalogEntries.length / itemsPerPage) || 1;
  const currentCatalog = catalogEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Colores pastel para los fondos gigantes y los puntitos de la lista
  const pastelsBg = ['bg-[#ffd1dc]', 'bg-[#bde0fe]', 'bg-[#d8f3dc]', 'bg-[#fcf6bd]'];
  const dotColors = ['bg-rose-300', 'bg-blue-300', 'bg-emerald-300', 'bg-amber-300', 'bg-purple-300'];

  return (
    <div className="min-h-screen bg-[#fdf5e6] text-black font-sans selection:bg-black selection:text-[#fdf5e6]">
      
      {/* 1. NAVEGACIÓN */}
      <nav className="px-6 py-8 md:px-12 flex justify-between items-center border-b border-black/10">
        <Link to="/" className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity">
          [ ← Volver al Inicio ]
        </Link>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-black/40">
          Ensayos & Críticas
        </div>
      </nav>

      {/* 2. LAS 4 ENTRADAS GIGANTES INTERCALADAS */}
      <div>
        {featuredEntries.map((ensayo, index) => {
          // isEven determina si es par o impar para intercalar el diseño
          const isEven = index % 2 === 0;
          const bgColor = pastelsBg[index % pastelsBg.length];

          return (
            <section key={ensayo.id} className="grid grid-cols-1 lg:grid-cols-2 border-b border-black/10">
              
              {/* Bloque de Texto */}
              {/* Si es par (isEven), el texto va primero (order-1). Si es impar, va segundo en pantallas grandes (lg:order-2) */}
              <div className={`p-8 md:p-16 lg:p-24 flex flex-col justify-center ${bgColor}/40 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}> 
                <span className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-black/50">
                  {index === 0 ? "Ensayo Destacado" : ensayo.date}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-6">
                  {ensayo.title}
                </h2>
                <p className="text-lg text-black/70 mb-10 max-w-md leading-relaxed">
                  {ensayo.excerpt}
                </p>
                <button className="self-start px-8 py-4 bg-black text-[#fdf5e6] text-xs font-bold tracking-[0.2em] uppercase hover:bg-black/80 transition-colors">
                  Leer Ensayo
                </button>
              </div>
              
              {/* Bloque de Imagen */}
              {/* Mantiene el efecto de blanco y negro a color */}
              <div className={`aspect-square lg:aspect-auto w-full relative bg-black/5 overflow-hidden ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <img 
                  src={ensayo.image} 
                  alt={ensayo.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop"; }}
                />
              </div>

            </section>
          );
        })}
      </div>

      {/* 3. LISTA DE ENTRADAS ANTERIORES CON PAGINACIÓN */}
      {catalogEntries.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-black/20 pb-4">
            <h2 className="text-4xl font-black tracking-tighter">
              entradas anteriores.
            </h2>
          </div>

          <div className="flex flex-col">
            {currentCatalog.map((ensayo, index) => {
              const dotColor = dotColors[index % dotColors.length];
              return (
                <article key={ensayo.id} className="group flex flex-col md:flex-row items-start md:items-center py-6 border-b border-black/10 hover:bg-white/40 transition-colors gap-6">
                  <div className="w-full md:w-48 flex-shrink-0 flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
                    <span className="text-lg font-bold tracking-widest uppercase">{ensayo.date}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {ensayo.title}
                    </h3>
                  </div>
                  <div className="w-full md:w-auto flex-shrink-0 mt-2 md:mt-0">
                    <button className="px-6 py-2 border-2 border-black text-xs font-bold tracking-[0.2em] uppercase group-hover:bg-black group-hover:text-[#fdf5e6] transition-colors">
                      Leer
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          {/* 4. NAVEGADOR DE PÁGINAS (Paginación) */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-black/20">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
            >
              [ ← Más Recientes ]
            </button>
            <span className="text-xs font-bold tracking-widest text-black/40">
              Página {currentPage} de {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-xs font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
            >
              [ Más Antiguas → ]
            </button>
          </div>

        </section>
      )}
      
    </div>
  );
}