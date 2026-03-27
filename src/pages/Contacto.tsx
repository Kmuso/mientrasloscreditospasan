import { Link } from "react-router-dom";
import { motion } from "motion/react"; // Sincronizado con tu versión de motion
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Contacto() {
  // 1. TIMELINE DE ANIMACIÓN
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-fondo text-texto transition-colors duration-700 font-sans selection:bg-cine-red selection:text-white flex flex-col relative z-10">
      
      {/* NAVEGACIÓN */}
      <nav className="p-8 md:p-12 flex justify-between items-center border-b border-texto/10">
        <Link to="/" className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-cine-red transition-colors">
          [ ← INICIO ]
        </Link>
        <h2 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-40 italic">
          Contacto & Colaboraciones
        </h2>
      </nav>

      {/* LIENZO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* COLUMNA IZQUIERDA: Hero y Manifiesto */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              variants={itemVariants} 
              className="text-7xl md:text-9xl font-display font-black tracking-tighter mb-8 text-titulo transition-colors duration-700"
            >
              HABLEMOS<span className="text-cine-red">.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="font-serif text-xl md:text-2xl opacity-70 leading-relaxed max-w-md font-light">
              ¿Tienes un proyecto, quieres enviarnos un ensayo o colaborar con Clase Z? Nuestra línea está abierta.
            </motion.p>
          </div>

          {/* COLUMNA DERECHA: Puntos de Contacto */}
          <div className="flex flex-col justify-center space-y-12 border-t lg:border-t-0 lg:border-l border-texto/10 pt-12 lg:pt-0 lg:pl-20">
            
            {/* CORREO ELECTRÓNICO */}
            <motion.a 
              variants={itemVariants}
              href="mailto:contacto@mientrasloscreditospasan.com"
              className="group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4 opacity-40 group-hover:text-cine-red group-hover:opacity-100 transition-all duration-500">
                <Mail size={14} />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Email de Redacción</span>
              </div>
              <div className="flex items-center justify-between border-b border-texto/10 group-hover:border-cine-red pb-6 transition-all duration-700">
                <span className="text-xl md:text-3xl font-display font-bold tracking-tight">
                  contacto@<wbr/>mientrasloscreditospasan.com
                </span>
                <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-cine-red" />
              </div>
            </motion.a>

            {/* TELÉFONO */}
            <motion.a 
              variants={itemVariants}
              href="tel:+51906786005"
              className="group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4 opacity-40 group-hover:text-cine-red group-hover:opacity-100 transition-all duration-500">
                <Phone size={14} />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Línea Directa</span>
              </div>
              <div className="flex items-center justify-between border-b border-texto/10 group-hover:border-cine-red pb-6 transition-all duration-700">
                <span className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                  +51 906 786 005
                </span>
                <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-cine-red" />
              </div>
            </motion.a>

            {/* UBICACIÓN */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4 opacity-40">
                <MapPin size={14} />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Base de Operaciones</span>
              </div>
              <div className="pb-4">
                <span className="text-lg font-serif italic opacity-60">
                  Perú — Transmitiendo desde la virtualidad.
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}