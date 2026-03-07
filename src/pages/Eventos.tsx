import { Link } from "react-router-dom";

export default function Eventos() {
  return (
    <div className="min-h-screen bg-[#fdf5e6] flex flex-col items-center justify-center p-6 text-black selection:bg-black selection:text-[#fdf5e6]">
      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Eventos</h1>
      <p className="text-center max-w-2xl text-lg leading-relaxed mb-8">
        Espacios de encuentro, debate y proyecciones presenciales. Un archivo de nuestras actividades, recordando grandes momentos como la proyección de cortos animados en Casa Darte.
      </p>
      <Link to="/" className="text-sm font-medium tracking-[0.15em] uppercase hover:opacity-50 transition-opacity">
        [ Volver al Inicio ]
      </Link>
    </div>
  );
}