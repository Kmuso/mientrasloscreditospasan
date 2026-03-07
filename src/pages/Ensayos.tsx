import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// Cambio 1: Ajustamos la ruta para salir de la carpeta pages y llegar al JSON
import database from '../../database.json'; 

// Cambio 2: Cambiamos el nombre de "App" a "Entries" para que no se confunda con el principal
export default function Entries() { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ['Ensayos', 'Videoclub', 'Contacto', 'Eventos', 'Biblioteca'];

  return (
    // ... Todo el resto de tu código de diseño que está excelente ...
    <div className="min-h-screen bg-[#fdf5e6] text-black font-sans selection:bg-black selection:text-[#fdf5e6]">
        {/* Tu código sigue igual aquí abajo */}
    </div>
  );
}