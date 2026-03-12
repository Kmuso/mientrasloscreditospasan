import { Link } from 'react-router-dom';
import MenuOverlay from './MenuOverlay'; 

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F6] border-b border-black/10 py-3 md:py-4">
      
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center h-12">
        
        {/* LADO IZQUIERDO: El Título */}
        <Link 
          to="/" 
          className="text-lg md:text-2xl font-bold tracking-tighter text-[#11161A] hover:text-[#ff4500] transition-colors font-serif lowercase"
        >
          mientrasloscreditospasan.com
        </Link>

        {/* LADO DERECHO: Buscador + Menú */}
        {/* Quitamos h-full y dejamos que 'items-center' haga la magia matemática */}
        <div className="flex items-center gap-8 md:gap-16">
          
          {/* BARRA DE BÚSQUEDA */}
          <div className="hidden md:flex relative items-center group">
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="absolute left-4 w-4 h-4 text-[#11161A] opacity-60 group-hover:opacity-100 transition-opacity"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            <input 
              type="text" 
              placeholder="Buscar archivo..." 
              className="bg-white/50 border border-black/20 text-xs font-medium tracking-widest pl-11 pr-6 py-2.5 rounded-full focus:outline-none focus:border-black focus:bg-white w-56 transition-all duration-300 focus:w-72 shadow-sm text-[#11161A]"
            />
          </div>

          {/* MENÚ HAMBURGUESA (Directo, sin divs envolventes que arruinen el centro) */}
          <MenuOverlay />

        </div>
      </div>
      
    </header>
  );
}