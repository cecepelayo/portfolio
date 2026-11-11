# Cecilia Pelayo · Diseño gráfico

Portfolio de una sola página de Cecilia Pelayo (CECE), diseñadora gráfica e ilustradora. Concepto: un expositor de coleccionista en el que cada proyecto es una caja de cerillas de una serie numerada.

🌐 **[Ver la web](https://portfolioweb-roan-two.vercel.app/)**

## Características

- Una sola página, sin secciones de navegación: expositor de proyectos, obra personal («Fuera de serie»), servicios y contacto.
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
assets/js/main.js         Idioma, galería del cajón, copiar email, efectos
assets/img/<proyecto>/    Imágenes optimizadas que usa la web (cover.webp, 1.webp…)
source-images/<proyecto>/ Originales en alta, con el mismo nombre que su versión web
PRODUCT.md, DESIGN.md     Contexto de producto y sistema de diseño (Impeccable)
```

`.vercelignore` deja fuera del despliegue `source-images/`, `.impeccable/`, `.claude/` y los `.md`.

## Editar contenido

- **Textos:** en `assets/js/i18n.js`. Cada clave existe en `es` y en `en`.
- **Añadir un proyecto:** duplicar un `<button class="box">` en `index.html` con su `data-project` e imágenes, añadir su ficha en `projects` de ambos idiomas en `assets/js/i18n.js` y colocarlo en la rejilla de `.board` en `assets/css/style.css`.
- **Cenefas:** usan un adorno provisional (`--ornament` en `assets/css/style.css`); se sustituirán por motivos recortados de las ilustraciones.

## Imágenes

Cada imagen publicada sale del original con el mismo nombre: `source-images/buna/1.png` → `assets/img/buna/1.webp`. Para añadir una, guarda el original en `source-images/<proyecto>/`, redúcelo con `sips -Z <lado largo> original.png --out tmp.png` (entre 1000 y 2000 px) y conviértelo con `cwebp -q 80 tmp.png -o assets/img/<proyecto>/<nombre>.webp`.

Excepción: `assets/img/cata-la-lata/box.webp` es un recorte de `source-images/cata-la-lata/2.jpg` (escalado a 2000 px y recortado a la lata: 1160×970 desde 440,290).

En `source-images/` hay tres originales sin versión web: `neil-leifer/street-banner.png`, `colores/shopping-bag.png` y `colores/bookmarks-alt.png`.

## Desarrollo local

```bash
python3 -m http.server 5173
```
