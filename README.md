# Cecilia Pelayo · Diseño gráfico

Portfolio de una sola página de Cecilia Pelayo (CECE), diseñadora gráfica e ilustradora. Concepto: un expositor de coleccionista en el que cada proyecto es una caja de cerillas de una serie numerada.

🌐 **[Ver la web](https://portfolioweb-roan-two.vercel.app/)**

## Características

- Una sola página, sin secciones de navegación: expositor de proyectos, «Sobre mí», obra personal («Fuera de serie»), servicios y contacto.
- Bilingüe ES/EN en la misma página: detecta el idioma del navegador y recuerda la elección.
- Galería por proyecto: al pulsar una caja se desliza el cajón y se abre la galería con ficha (año, rol, herramientas, contexto).
- Accesible con teclado y respeta «movimiento reducido».
- Imágenes optimizadas en WebP (`assets/img/`); los originales en alta se guardan en `source-images/` y no se publican.

## Tecnología

HTML, CSS y JavaScript sin dependencias ni proceso de build. Tipografías de Google Fonts (Bodoni Moda, Bricolage Grotesque, DM Mono). Desplegado en Vercel.

## Estructura

```
index.html                Página única
assets/css/style.css      Estilos (tokens de color al inicio)
assets/js/i18n.js         Todos los textos ES/EN, incluidas las fichas de proyecto
assets/js/main.js         Idioma, galería del cajón, cenefas, copiar email, efectos
assets/img/<proyecto>/    Imágenes optimizadas que usa la web (cover.webp, 1.webp…)
source-images/<proyecto>/ Originales en alta, con el mismo nombre que su versión web
scripts/                  Herramientas locales (recorte de los motivos de las cenefas)
PRODUCT.md, DESIGN.md     Contexto de producto y sistema de diseño (Impeccable)
```

`.vercelignore` deja fuera del despliegue `source-images/`, `scripts/`, `.impeccable/`, `.claude/` y los `.md`.

## Editar contenido

- **Textos:** en `assets/js/i18n.js`. Cada clave existe en `es` y en `en`.
- **Añadir un proyecto:** duplicar un `<button class="pack">` en `index.html` con su `data-project`, número de serie e imágenes, añadir su ficha en `projects` de ambos idiomas en `assets/js/i18n.js` y colocarlo en la rejilla de `.board` en `assets/css/style.css` (filas de tres a partir de la cuarta: columnas 1/5, 5/9 y 9/13). Después, actualizar el número del hueco de contacto (siempre el siguiente al último sobre), el recuento del colofón (`ct.colophon`) y los Nº de su servicio.
- **Vídeos en la galería:** en `data-images` va el `.mp4` y, al lado, su cartel `.webp` con el mismo nombre (`video.mp4` y `video.webp`). En la galería se ve el cartel con un botón de reproducir. Para comprimirlo: `ffmpeg -i original.mp4 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart assets/img/<proyecto>/video.mp4`, y el cartel con `ffmpeg -ss <segundo> -i original.mp4 -frames:v 1 cartel.png` + `cwebp`.
- **Cenefas:** las cenefas y el marco de la portada se construyen en `assets/js/main.js` a partir de la lista `MOTIFS` (secuencia fija). Para añadir un motivo: guarda el original con fondo transparente en `source-images/motifs/` con prefijo de orden (`12-nombre.png`), genera su WebP con el script de abajo y añade una línea a `MOTIFS` con su ancho y alto (y, si quieres, escala, inclinación y desplazamiento). La velocidad y la separación de las cenefas en carrusel se ajustan en `CAROUSEL_SPEED` y `CAROUSEL_GAP`, en el mismo fichero; si cambias `CAROUSEL_GAP`, cambia también el `gap` de `.band--moving .motif-run` en `assets/css/style.css`, o el bucle dará un salto en cada vuelta.

## Imágenes

Cada imagen publicada sale del original con el mismo nombre: `source-images/buna/1.png` → `assets/img/buna/1.webp`. Para añadir una, guarda el original en `source-images/<proyecto>/`, redúcelo con `sips -Z <lado largo> original.png --out tmp.png` (entre 1000 y 2000 px) y conviértelo con `cwebp -q 80 tmp.png -o assets/img/<proyecto>/<nombre>.webp`.

Los motivos de las cenefas se recortan al contorno y se convierten con un script (solo necesita `cwebp` y `dwebp`): `python3 -I scripts/build_motifs.py source-images/motifs assets/img/motifs <carpeta temporal>`. Acepta PNG transparentes y SVG con imágenes incrustadas (compone las capas), descarta motas sueltas y saca cada WebP a 160px de alto. Las pegatinas de «Sobre mí» (`assets/img/stickers/`) son dos de esos motivos (estrellas y cóctel) sacados con el mismo script a 280px de alto (cambiando `TARGET_H` en una copia del script), porque se ven hasta a 140px.

Excepciones: `assets/img/personal/me.webp` (el retrato del sobre de «Sobre mí») es un recorte de `source-images/motifs/08-me.png` de la cabeza a las caderas (1040×1100 desde 695,0), sin las motas sueltas del fondo transparente. `assets/img/cata-la-lata/box.webp` es un recorte de `source-images/cata-la-lata/2.jpg` (escalado a 2000 px y recortado a la lata: 1160×970 desde 440,290).

En `source-images/` hay originales sin versión web: `neil-leifer/street-banner.png`, `colores/shopping-bag.png`, `colores/bookmarks-alt.png`, `axon/render.png` (la portada sin rótulo, a menor resolución) y `axon/Revista copia.png` (versión anterior de `axon/6.png`). El cartel `assets/img/axon/video.webp` es el fotograma del segundo 20 de `axon/video.mp4`. Ese vídeo original (42 MB) está en `.gitignore`: no se sube al repositorio y solo existe en local. Lo mismo con `lyric-video/video.mp4` (16 MB): su copia web está comprimida con `-crf 32` (4,9 MB) por el grano de la textura, y sus imágenes son fotogramas del original (cartel y portada `video.webp` en el segundo 10; `1`–`4` en los segundos 15, 22, 27 y 35). Del museo (`museo-artes-decorativas/`) solo se suben la portada y los originales 1–9 que usa la web; el resto de mockups y los PSD (700 MB) se quedan en local por `.gitignore`. Sus WebP están recortados al dispositivo (los mockups tienen fondo transparente) con un margen del 4 %.

## Desarrollo local

```bash
python3 -m http.server 5173
```
