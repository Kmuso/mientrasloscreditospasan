import { motion } from "motion/react";

// 1. ACTUALIZACIÓN DE DATOS (Nombres principales solamente)
const EPOCAS = [
  { 
    id: 'clasico', 
    name: 'Noir', // Mantenemos Noir
    colors: ['#111111', '#737373', '#CCCCCC'] 
  },
  { 
    id: 'technicolor', 
    name: 'Technicolor', // Mantenemos Technicolor
    colors: ['#F25749', '#F2C53D', '#7395D9'] 
  },
  { 
    id: 'moderna', 
    name: 'Contemporaneo', // NUEVO NOMBRE: Cambiamos 'Moderna' por 'Contemporaneo'
    colors: ['#0D0000', '#BF2011', '#344326'] 
  }
];

interface Props {
  currentEpoca: string;
  setEpoca: (id: string) => void;
}

export default function CameraLens({ currentEpoca, setEpoca }: Props) {
  return (
    // Mantenemos el tamaño pequeño y elegante que definimos antes
    <div className="fixed top-8 right-20 md:top-12 md:right-28 z-[100] flex h-8 md:h-10 border border-texto/10 rounded-full bg-fondo/80 backdrop-blur-md shadow-sm overflow-hidden transition-colors duration-700">
      
      {EPOCAS.map((epoca) => {
        const isActive = currentEpoca === epoca.id;

        return (
          <motion.button
            layout
            key={epoca.id}
            onClick={() => {
              if (!isActive) setEpoca(epoca.id);
            }}
            className={`relative h-full flex overflow-hidden cursor-pointer group ${
              isActive 
                ? "bg-fondo flex items-center justify-center px-4 md:px-5" 
                : "flex-col w-8 md:w-10 hover:opacity-80 transition-opacity border-r border-texto/10 last:border-r-0"
            }`}
          >
            {isActive ? (
              // VISTA ACTIVA: Solo mostramos el nombre principal (sin "Cine ")
              <motion.span 
                layout="position" 
                className="font-display text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-texto whitespace-nowrap"
              >
                {epoca.name} {/* 2. CAMBIO AQUÍ: Quitamos la palabra estática "Cine " */}
              </motion.span>
            ) : (
              // VISTA INACTIVA: Muestra las franjas de color
              <>
                <div className="w-full h-1/3" style={{ backgroundColor: epoca.colors[0] }} />
                <div className="w-full h-1/3" style={{ backgroundColor: epoca.colors[1] }} />
                <div className="w-full h-1/3" style={{ backgroundColor: epoca.colors[2] }} />
              </>
            )}
          </motion.button>
        );
      })}

    </div>
  );
}