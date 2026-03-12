import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function EnsayoIndividual() {
  const { id } = useParams(); 
  const [ensayo, setEnsayo] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/ensayos/${id}`)
      .then(res => res.json())
      .then(data => setEnsayo(data))
      .catch(error => console.error("Error cargando el texto:", error));
  }, [id]);

  // Pantallas de seguridad por si el proyector falla
  if (!ensayo) return <div className="min-h-screen flex items-center justify-center bg-[#FBF9F6]">Cargando proyector...</div>;
  if (ensayo.error) return <div className="min-h-screen flex items-center justify-center bg-[#FBF9F6] text-red-500">Error: {ensayo.error}</div>;

  const imageUrl = ensayo.image || `https://picsum.photos/seed/${ensayo.id}/1200/600`;

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#11161A] font-sans pb-32">
      
      {/* 1. NAVEGACIÓN MINIMALISTA */}
      <nav className="px-6 py-8 max-w-[1440px] mx-auto mb-8 md:mb-16">
        <Link to="/ensayos" className="text-xs font-bold tracking-widest uppercase hover:text-[#ff4500] transition-colors border-b border-transparent hover:border-[#ff4500] pb-1">
          ← Volver al Archivo
        </Link>
      </nav>

      {/* 2. LA COLUMNA DE LECTURA (Aquí ocurre la magia editorial) */}
      <main className="max-w-3xl mx-auto px-6 md:px-0">
        
        {/* TITULAR Y METADATOS */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-[#11161A] mb-8 font-serif leading-none">
            {ensayo.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs font-bold uppercase tracking-widest text-[#11161A]/50 border-y border-black/10 py-4">
            <span className="text-black">Por Clase Z</span>
            <span className="hidden md:inline">•</span>
            <span>Publicado: {ensayo.date || "Fecha desconocida"}</span>
            <span className="hidden md:inline">•</span>
            <span>Crítica Cinematográfica</span>
          </div>
        </header>

        {/* IMAGEN HERO (Formato cine, contenida en la columna) */}
        <figure className="mb-12">
          <div className="w-full aspect-[16/9] bg-black/5 overflow-hidden">
            {/* Truco: La imagen se ve en blanco y negro y toma color al pasar el mouse */}
            <img 
              src={imageUrl} 
              alt={`Fotograma de ${ensayo.title}`} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          <figcaption className="text-right text-[10px] uppercase tracking-widest mt-3 opacity-40 font-mono">
            ID de Archivo: {ensayo.id?.toString().padStart(4, '0')}
          </figcaption>
        </figure>

        {/* CUERPO DEL TEXTO */}
        {/* Usamos font-serif para darle el toque Roger Ebert y un gran interlineado (leading-loose) */}
        <article className="text-lg md:text-xl font-serif text-[#11161A] leading-loose opacity-90 space-y-8">
          
          {/* TRUCO DE DISEÑO: La "Letra Capitular" (Drop Cap) en el primer párrafo */}
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-[#ff4500] first-letter:mr-3 first-letter:float-left first-line:tracking-widest first-line:uppercase">
            {ensayo.excerpt}
          </p>

          {/* Estos párrafos son de relleno para que veas cómo se sentirá el ensayo real */}
          <p>
            (Esta es una simulación visual). El cine no es solo lo que ocurre dentro del encuadre, sino lo que la luz revela sobre nuestra propia condición. Cuando analizamos los cortes, el montaje y la banda sonora, estamos desmenuzando la psique del director.
          </p>
          <p>
            Al igual que en los grandes textos de Roger Ebert, el espacio en blanco alrededor de las palabras es tan importante como las palabras mismas. Permite que el lector respire entre cada argumento. Pronto, conectaremos esta sección a tu base de datos para que puedas escribir párrafos infinitos y se acomoden con esta misma elegancia.
          </p>
        </article>

      </main>
      
    </div>
  );
}