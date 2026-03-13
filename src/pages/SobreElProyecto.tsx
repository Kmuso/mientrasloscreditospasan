import { motion } from "motion/react";

export default function SobreElProyecto() {
  return (
    <main className="min-h-screen bg-[#FBF9F6] text-[#11161A] px-6 py-12 md:py-24">
      
      <div className="max-w-[1024px] mx-auto">
        
        {/* =========================================
            ACTO 1: EL ENCABEZADO (HERO)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b border-black/10 pb-12 mb-12"
        >
          <h2 className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-6">
            Acerca del proyecto
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-tight">
            Reivindicando el cine <br className="hidden md:block" />
            <span className="text-[#ff4500] italic">cuando las luces se encienden.</span>
          </h1>
        </motion.div>

        {/* =========================================
            ACTO 2: EL MANIFIESTO (El Autor)
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-black/10 pb-16 mb-16">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:col-span-4"
          >
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">El Manifiesto Clase Z</h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.8 }}
            className="md:col-span-8 flex flex-col gap-6 text-base md:text-lg leading-relaxed opacity-80 font-medium"
          >
            <p>
              "Mientras los créditos pasan" nació de la necesidad de prolongar la conversación. Creo firmemente que la película no termina con la palabra FIN, sino que apenas comienza a proyectarse en la mente del espectador.
            </p>
            <p>
              Bajo el sello <strong>Clase Z</strong>, huyo del esnobismo de la crítica tradicional para abrazar el cine en todas sus formas: desde la obra maestra de autor premiada en festivales, hasta el slasher de bajo presupuesto que solíamos alquilar en VHS.
            </p>
            <p>
              Este es mi archivo personal. Un espacio solitario de ensayo, reflexión y disección visual donde intento explicar por qué el séptimo arte nos mueve, nos aterra y nos fascina irremisiblemente.
            </p>
          </motion.div>
        </div>

        {/* =========================================
            ACTO 3: LOS CRÉDITOS (One-Man Army)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-8">
            Créditos Finales
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            
            {/* Rol 1 */}
            <div className="flex flex-col group">
              <span className="text-xs font-mono uppercase tracking-widest text-black/40 mb-1">
                Dirección y Edición
              </span>
              <span className="font-serif text-2xl font-bold group-hover:text-[#ff4500] transition-colors">
                Tu Nombre
              </span>
            </div>
            
            {/* Rol 2 */}
            <div className="flex flex-col group">
              <span className="text-xs font-mono uppercase tracking-widest text-black/40 mb-1">
                Guion y Ensayos
              </span>
              <span className="font-serif text-2xl font-bold group-hover:text-[#ff4500] transition-colors">
                Tu Nombre
              </span>
            </div>
            
            {/* Rol 3 */}
            <div className="flex flex-col group">
              <span className="text-xs font-mono uppercase tracking-widest text-black/40 mb-1">
                Desarrollo Web
              </span>
              <span className="font-serif text-2xl font-bold group-hover:text-[#ff4500] transition-colors">
                Tu Nombre
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}