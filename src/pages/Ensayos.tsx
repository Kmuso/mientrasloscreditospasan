import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Usaremos este icono para el botón de volver
import database from '../../metadata.json'; 

export default function Ensayos() { 
  return (
    <div className="min-h-screen bg-[#fdf5e6] text-black font-sans selection:bg-black selection:text-[#fdf5e6] p-6 md:p-12">
      
      {/* Navegación superior */}
      <nav className="mb-12 flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-medium tracking-[0.15em] uppercase hover:opacity-50 transition-opacity"
        >
          <ArrowLeft size={16} />
          [ Volver ]
        </Link>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-black/40">
          Archivo de Textos
        </div>
      </nav>

      {/* Título de la sección */}
      <header className="max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
          Ensayos.
        </h1>
        <p className="text-lg md:text-xl text-black/60 max-w-2xl">
          Análisis, críticas y reflexiones sobre el cine que se queda en la cabeza mucho después de que los créditos terminan de pasar.
        </p>
      </header>

      {/* Cuadrícula de Reseñas */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {database.map((ensayo) => (
          <article 
            key={ensayo.id} 
            className="group cursor-pointer flex flex-col border border-black/10 hover:border-black/30 transition-colors duration-300"
          >
            {/* Contenedor de la imagen */}
            <div className="aspect-[4/3] w-full bg-black/5 overflow-hidden relative">
              <img 
                src={ensayo.image} 
                alt={ensayo.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                // Si la imagen falla en cargar (porque el link es falso por ahora), mostramos un color sólido
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Contenido del texto */}
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-bold tracking-widest text-black/40 mb-3 block">
                {ensayo.date}
              </span>
              <h2 className="text-2xl font-black tracking-tight mb-3 group-hover:underline decoration-2 underline-offset-4">
                {ensayo.title}
              </h2>
              <p className="text-sm text-black/70 line-clamp-3 mb-6 flex-grow leading-relaxed">
                {ensayo.excerpt}
              </p>
              
              <div className="text-xs font-medium tracking-[0.15em] uppercase text-black group-hover:translate-x-2 transition-transform duration-300">
                Leer más →
              </div>
            </div>
          </article>
        ))}
      </main>

    </div>
  );
}