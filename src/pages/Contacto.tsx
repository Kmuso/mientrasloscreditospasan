import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Contacto() {
  // 1. TIMELINE DE ANIMACIÓN (Variantes)
  // Esto define cómo se comporta el "padre" y cómo le dice a los "hijos" que se animen.
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Cada hijo aparece con 0.2s de diferencia (Efecto cascada)
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-fondo text-texto transition-colors duration-500 font-sans selection:bg-primario selection:text-white flex flex-col">
      
      {/* NAVEGACIÓN */}
      <nav className="p-6 flex justify-between items-center border-b border-texto/10">
        <Link to="/" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-primario transition-colors">
          [ ← Inicio ]
        </Link>
        <h2 className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 italic">
          Contacto & Colaboraciones
        </h2>
      </nav>

      {/* LIENZO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* COLUMNA IZQUIERDA: Hero y Manifiesto */}
          <div className="flex flex-col justify-center">
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
              HABLEMOS<span className="text-primario">.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="font-serif text-xl md:text-2xl opacity-80 leading-relaxed max-w-md">
              ¿Tienes un proyecto, quieres enviarnos un ensayo o colaborar con Clase Z? Nuestra línea está abierta.
            </motion.p>
          </div>

          {/* COLUMNA DERECHA: Puntos de Contacto */}
          <div className="flex flex-col justify-center space-y-8 border-t lg:border-t-0 lg:border-l border-texto/10 pt-8 lg:pt-0 lg:pl-16">
            
            {/* CORREO ELECTRÓNICO */}
            <motion.a 
              variants={itemVariants}
              href="mailto:contacto@mientrasloscreditospasan.com"
              className="group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2 opacity-50 group-hover:text-primario group-hover:opacity-100 transition-all">
                <Mail size={16} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Email</span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-texto/10 group-hover:border-primario pb-4 transition-all">
                <span className="text-2xl md:text-3xl font-black tracking-tight">
                  contacto@<wbr/>mientrasloscreditospasan.com
                </span>
                <ArrowUpRight size={28} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-primario" />
              </div>
            </motion.a>

            {/* TELÉFONO */}
            <motion.a 
              variants={itemVariants}
              href="tel:+51906786005"
              className="group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2 opacity-50 group-hover:text-primario group-hover:opacity-100 transition-all">
                <Phone size={16} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Teléfono / WhatsApp</span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-texto/10 group-hover:border-primario pb-4 transition-all">
                <span className="text-3xl md:text-4xl font-black tracking-tight">
                  +51 906 786 005
                </span>
                <ArrowUpRight size={28} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-primario" />
              </div>
            </motion.a>

            {/* UBICACIÓN */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="flex items-center gap-3 mb-2 opacity-50">
                <MapPin size={16} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Base de Operaciones</span>
              </div>
              <div className="pb-4">
                <span className="text-lg font-medium opacity-80">
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