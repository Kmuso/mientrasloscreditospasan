/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 md:p-12 selection:bg-ink selection:text-cream overflow-hidden">
      <div className="flex-1 w-full" />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-[2] flex items-center justify-center w-full"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-center leading-[0.9] text-ink max-w-6xl">
          mientras los creditos pasan
          <span className="text-ink/30 tracking-tight ml-2 md:ml-4 inline-block">.com</span>
        </h1>
      </motion.main>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="flex-1 flex items-end justify-center w-full pb-4 md:pb-8"
      >
        <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-ink/50 max-w-4xl">
          <li><Link to="/ensayos" className="hover:text-ink transition-colors duration-500 py-2">[ Ensayos ]</Link></li>
          <li><Link to="/videos" className="hover:text-ink transition-colors duration-500 py-2">[ Videos ]</Link></li>
          <li><Link to="/podcast" className="hover:text-ink transition-colors duration-500 py-2">[ Podcast ]</Link></li>
          <li>
            <Link to="/videoclub" className="hover:text-ink transition-colors duration-500 py-2 group relative flex items-center justify-center">
              [ Videoclub ]
              <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-widest text-ink/40 pointer-events-none">
                EASTER EGG
              </span>
            </Link>
          </li>
          <li><Link to="/biblioteca" className="hover:text-ink transition-colors duration-500 py-2">[ Biblioteca ]</Link></li>
          <li><Link to="/eventos" className="hover:text-ink transition-colors duration-500 py-2">[ Eventos ]</Link></li>
          <li><Link to="/sobre-el-proyecto" className="hover:text-ink transition-colors duration-500 py-2">[ Sobre el Proyecto ]</Link></li>
          <li><Link to="/contacto" className="hover:text-ink transition-colors duration-500 py-2">[ Contacto ]</Link></li>
        </ul>
      </motion.nav>
    </div>
  );
}