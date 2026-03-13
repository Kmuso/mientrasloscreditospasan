import { Link } from 'react-router-dom';
import MenuOverlay from './MenuOverlay'; 

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F6] border-b border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LADO IZQUIERDO: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter text-[#11161A] hover:text-[#ff4500] transition-colors font-serif lowercase">
            mientrasloscreditospasan.com
          </Link>
        </div>

        {/* CENTRO: Menú Principal */}
        <nav className="hidden lg:flex justify-center items-center gap-8 xl:gap-12 h-full">
          
          {/* ARCHIVO CON MENÚ DESPLEGABLE (Dropdown) */}
          <div className="relative group h-full flex items-center cursor-pointer">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#11161A] group-hover:text-[#ff4500] transition-colors flex items-center gap-1.5">
              Archivo
              <svg className="w-2.5 h-2.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>

            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-56 bg-[#FBF9F6] border border-black/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col py-4 z-50">
              <Link to="/ensayos" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#11161A]/70 hover:text-[#ff4500] hover:bg-black/5 transition-all">
                Ensayos
              </Link>
              <Link to="/retrospectivas" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#11161A]/70 hover:text-[#ff4500] hover:bg-black/5 transition-all">
                Retrospectivas
              </Link>
              <Link to="/resenas" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#11161A]/70 hover:text-[#ff4500] hover:bg-black/5 transition-all">
                Reseñas
              </Link>
              <Link to="/dossiers" className="px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#11161A]/70 hover:text-[#ff4500] hover:bg-black/5 transition-all">
                Dossiers
              </Link>
            </div>
          </div>

          <Link to="/videoclub" className="text-[11px] font-bold uppercase tracking-widest text-[#11161A]/70 hover:text-[#ff4500] transition-colors flex items-center gap-1.5">
            Videoclub
          </Link>
          <Link to="/podcast" className="text-[11px] font-bold uppercase tracking-widest text-[#11161A]/70 hover:text-[#ff4500] transition-colors flex items-center gap-1.5">
            Podcast
          </Link>
          <Link to="/sobre-el-proyecto" className="text-[11px] font-bold uppercase tracking-widest text-[#11161A]/70 hover:text-[#ff4500] transition-colors flex items-center gap-1.5">
            El Proyecto
          </Link>
        </nav>

        {/* LADO DERECHO: Menú Overlay */}
        <div className="flex-1 flex justify-end items-center">
          <MenuOverlay />
        </div>

      </div>
    </header>
  );
}