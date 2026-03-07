import { Link } from "react-router-dom";

// Cambia "Plantilla" por el nombre de tu página (ej. Videoclub, Podcast, etc.)
export default function Plantilla() {
  return (
    <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center p-6 text-black selection:bg-black selection:text-[#fdf5e6]">
      
      {/* Cambia "Plantilla" por el título que quieres que se vea */}
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Plantilla</h1>
      
      <Link to="/" className="text-sm font-medium tracking-[0.15em] uppercase hover:opacity-50 transition-opacity">
        [ Volver al Inicio ]
      </Link>
    </div>
  );
}