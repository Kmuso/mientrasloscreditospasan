@AGENTS.md

# mientrasloscreditospasan — Guías de diseño frontend

## Identidad visual

- Blog de crítica cinematográfica. La estética debe evocar **cine, proyección, película fotográfica**.
- Tres temas: `noir` (escala de grises, predeterminado), `contemporary` (limpio, acento rojo), `technicolor` (cálido, sepia).
- Nunca usar colores hardcodeados en componentes — siempre `var(--bg)`, `var(--text)`, `var(--accent)`, `var(--text-muted)`, `var(--border)`.

## Tipografía

- Serif principal: **Crimson Pro** (`var(--font-crimson)`). Usar para todo el cuerpo de texto, títulos, citas.
- Mono: **Courier New** via `font-mono` de Tailwind. Reservado para `scriptMode` y metadatos técnicos (año, duración, ficha técnica).
- Escala tipográfica: preferir tamaños grandes y generosos. Los títulos deben ser prominentes.
- Usar itálica con intención — Crimson Pro tiene itálicas elegantes que deben aprovecharse en citas y nombres de películas.

## Layout y espaciado

- Máximo ancho de columna de lectura: `max-w-2xl` (672px). El texto largo nunca debe ser full-width.
- Espaciado generoso: `leading-relaxed` o `leading-loose` para cuerpo de texto.
- Grid de portada: asimétrico, no uniforme. Evitar grids de tarjetas iguales tipo e-commerce.
- Usar `gap` y `space-y` amplios — la densidad baja es parte de la estética.

## Animaciones

- Librería: **Framer Motion** para transiciones de UI y entradas de elementos.
- Librería: **GSAP** para animaciones de scroll y efectos cinematográficos complejos.
- Las animaciones deben sentirse lentas y deliberadas, no snappy. `duration` mínimo: 0.4s.
- `easeInOut` o curvas personalizadas. Nunca `linear` para entradas.
- En modo `immersive` el header desaparece con fade. En modo `staticMode` todas las animaciones se desactivan.

## Componentes y estructura

- Siempre `'use client'` en componentes que usen el store, animaciones o eventos del browser.
- Leer del store con selectores granulares: `useProjectionStore((s) => s.theme)`, nunca desestructurar el store completo.
- Los componentes de layout (Header, Footer) deben ser livianos — sin lógica de negocio.
- Nombrar archivos de componentes en PascalCase. Páginas y rutas en lowercase.

## Accesibilidad mínima

- Todo elemento interactivo debe tener `focus-visible` estilizado.
- Contraste: en tema `noir` con `filter: grayscale(100%)`, verificar que el texto sea legible.
- `GrainOverlay` tiene `pointer-events: none` — nunca bloqueará interacción.

## Lo que NO hacer

- No usar librerías de componentes (shadcn, MUI, Chakra, etc.). Todo se construye desde cero.
- No usar imágenes de stock genéricas. Los posters de películas son el único elemento visual fotográfico.
- No agregar bordes redondeados excesivos (`rounded-full`, `rounded-xl` en tarjetas). Máximo `rounded-sm` o sin borde.
- No usar sombras `shadow-lg` o superiores — la profundidad se logra con tipografía y espaciado, no con sombras.
- No animar el GrainOverlay con CSS — ya tiene su propio loop en canvas.
